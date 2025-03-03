import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductQuery } from '@/api/gql/graphql';
import { productByHandleQuery } from '@/api/queries';
import { reshapeProduct } from '@/api/utils';
import {
  getInitialOptions,
  getInitialVariant,
  getVerifiedOptions,
  ProductProvider,
} from '@/hooks/use-product';
import { prismic } from '@/lib/prismic';
import { shopify } from '@/lib/shopify';
import { components } from '@/slices';
import { Params, SearchParams } from '@/types/common';
import { asImageSrc, isFilled } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

async function parseSearch(searchParams: SearchParams) {
  const params = await searchParams;

  const parsedParams = Object.entries(params).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  );

  return Object.fromEntries(parsedParams);
}

export async function generateMetadata({
  params,
}: {
  params: Params<{ handle: string }>;
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
  searchParams,
}: {
  params: Params<{ handle: string }>;
  searchParams: SearchParams;
}) {
  const { handle } = await params;
  const options = await parseSearch(searchParams);

  const [page, shopifyProduct] = await Promise.all([
    prismic.getByUID('products', handle),
    shopify.product.getByHandle<ProductQuery>({
      query: productByHandleQuery,
      variables: {
        handle,
      },
    }),
  ]);

  if (!shopifyProduct.product) {
    return notFound();
  }

  const product = reshapeProduct(shopifyProduct);

  const productOptions = getVerifiedOptions(
    product.options,
    shopify.product.optionTypes,
  );
  const initialOptions = getInitialOptions(productOptions, options);
  const initialVariant = getInitialVariant(product.variants, initialOptions);

  return (
    <ProductProvider
      product={product}
      options={productOptions}
      variants={product.variants}
      initialOptions={initialOptions}
      initialVariant={initialVariant}
    >
      <SliceZone slices={page.data.slices} components={components} />
    </ProductProvider>
  );
}
