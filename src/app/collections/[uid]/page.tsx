import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { prismic } from '@/lib/prismic';
import { chunk, clamp } from '@/lib/utils';
import {
  asImageSrc,
  ContentRelationshipField,
  isFilled,
} from '@prismicio/client';

import ProductCard from './ProductCard';

function paginate<T extends { product: ContentRelationshipField<'products'> }>(
  array: T[],
  pageIndex: number = 1,
  pageSize: number = 20,
) {
  const productPages = chunk(array, pageSize);
  const targetPage = clamp(pageIndex, 1, productPages.length) - 1;

  return productPages[targetPage]
    .map((ref) => {
      if (isFilled.contentRelationship(ref.product) && ref.product.uid) {
        return ref.product.uid;
      }
    })
    .filter((e) => e !== undefined);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>;
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
  params: Promise<{ uid: string }>;
  searchParams: Promise<{ p?: number }>;
}) {
  const { uid } = await params;
  const { p } = await searchParams;

  const page = await prismic
    .getByUID('collections', uid)
    .catch(() => notFound());

  const products = await prismic.getAllByUIDs(
    'products',
    paginate(page.data.products, p),
  );

  return (
    <div>
      <ul>
        {products
          .filter((product) => !!product)
          .map((product) => (
            <li key={product.id}>
              <Suspense fallback={<div>Loading</div>}>
                <ProductCard
                  title={product.data.title}
                  shopifyHandle={product.data.shopify_handle}
                />
              </Suspense>
            </li>
          ))}
      </ul>
    </div>
  );
}
