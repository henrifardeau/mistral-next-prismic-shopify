import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductOptionPicker } from '@/components/product';
import { ProductProvider } from '@/hooks/use-product';
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

  return (
    <ProductProvider product={shopify.reshapeProduct(shopifyProduct)}>
      <section className="container mx-auto">
        <div className="flex flex-col items-start justify-between gap-16 pb-20 sm:flex-row lg:gap-24">
          <h2>
            {page.data.title} | {page.data.shopify_handle}
          </h2>
          <aside className="w-full shrink-0 sm:max-w-[348px] sm:grow-0 sm:basis-[348px]">
            <ProductOptionPicker />
          </aside>
        </div>
      </section>
      <SliceZone slices={page.data.slices} components={components} />
    </ProductProvider>
  );
}
