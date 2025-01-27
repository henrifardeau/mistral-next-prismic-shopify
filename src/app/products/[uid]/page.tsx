import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { prismic } from '@/lib/prismic';
import { components } from '@/slices';
import { asImageSrc, isFilled } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import { shopify } from '@/lib/shopify';
import VariantSelector from './VariantSelector';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
}): Promise<Metadata> {
  const { uid } = await params;

  const page = await prismic.getByUID('products', uid).catch(() => notFound());

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
  params: Promise<{ uid: string }>;
}) {
  const { uid } = await params;

  const page = await prismic.getByUID('products', uid).catch(() => notFound());

  if (!isFilled.keyText(page.data.shopify_product_id)) {
    throw Error('Product is not linked with Shopify');
  }

  const shopifyProduct = await shopify.getLongProductById(
    page.data.shopify_product_id,
  );

  return (
    <div>
      <h2>
        {page.data.title} | {page.data.shopify_product_id}
      </h2>
      <VariantSelector shopifyProduct={shopifyProduct} />
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}
