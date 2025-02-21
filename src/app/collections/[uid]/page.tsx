import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CollectionSortSelect } from '@/components/collection';
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
  params: Params<{ uid: string }>;
}): Promise<Metadata> {
  const { uid } = await params;

  const page = await prismic
    .getByUID('collections', uid)
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
  params: Params<{ uid: string }>;
  searchParams: SearchParams;
}) {
  const { uid } = await params;
  const { sort } = await parseSearch(searchParams);

  const page = await prismic
    .getByUID('collections', uid)
    .catch(() => notFound());

  return (
    <>
      <div className="container py-4">
        <div className="flex items-center justify-end">
          <CollectionSortSelect sort={sort} />
        </div>
      </div>
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={{ sortKey: sort.sortKey, sortReverse: sort.sortReverse }}
      />
    </>
  );
}
