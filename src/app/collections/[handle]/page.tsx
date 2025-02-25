import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DEFAULT_SORTING, SORTING } from '@/constants/collection';
import { prismic } from '@/lib/prismic';
import { components } from '@/slices';
import { Params, SearchParams } from '@/types/common';
import { asImageSrc, isFilled } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

async function parseSearch(searchParams: SearchParams) {
  const params = await searchParams;

  const sort =
    typeof params.sort === 'string'
      ? SORTING.find((s) => s.slug === params.sort)
      : undefined;

  return {
    sort: sort ?? DEFAULT_SORTING,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;

  const page = await prismic
    .getByUID('collections', handle)
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Params<{ handle: string }>;
  searchParams: SearchParams;
}) {
  const { handle } = await params;
  const { sort } = await parseSearch(searchParams);

  const page = await prismic
    .getByUID('collections', handle)
    .catch(() => notFound());

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ sort }}
    />
  );
}
