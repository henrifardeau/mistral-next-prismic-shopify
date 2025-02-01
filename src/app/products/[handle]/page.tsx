import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getInitialOptions,
  getInitialVariant,
  getVerifiedOptions,
  ProductProvider,
} from '@/hooks/use-product';
import { prismic } from '@/lib/prismic';
import { shopify } from '@/lib/shopify';
import { components } from '@/slices';
import { asImageSrc, isFilled } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

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

  const [page, shopifyProduct] = await Promise.all([
    prismic.getByUID('products', handle),
    shopify.getLongProductByHandle(handle),
  ]);

  if (!shopifyProduct.product) {
    return notFound();
  }

  const { variants, options } = shopify.reshapeProduct(shopifyProduct);

  const productOptions = getVerifiedOptions(options);
  const initialOptions = getInitialOptions(productOptions);
  const initialVariant = getInitialVariant(variants, initialOptions);

  return (
    <ProductProvider
      options={productOptions}
      variants={variants}
      initialOptions={initialOptions}
      initialVariant={initialVariant}
    >
      <SliceZone slices={page.data.slices} components={components} />
    </ProductProvider>
  );
}
