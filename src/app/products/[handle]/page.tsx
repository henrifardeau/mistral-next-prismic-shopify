import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { prismic } from '@/lib/prismic';
import { shopify } from '@/lib/shopify';
import { components } from '@/slices';
import { asImageSrc, isFilled } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

import VariantSelector from './VariantSelector';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;

  const page = await prismic
    .getByUID('products', handle)
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
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const [page, product] = await Promise.all([
    prismic.getByUID('products', handle),
    shopify.getLongProductByHandle(handle),
  ]);

  return (
    <div>
      <h2>
        {page.data.title} | {page.data.shopify_handle}
      </h2>
      <VariantSelector shopifyProduct={product} />
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}
