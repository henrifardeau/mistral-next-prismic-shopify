import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  assignProductImages,
  assignVariantsImages,
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

import {
  ProductImages,
  ProductOptionPicker,
  ProductVariantImages,
} from './components';

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

  const { thumbnails, variant_thumbnails } = page.data;
  const { variants, options } = shopify.reshapeProduct(shopifyProduct);

  const productImages = assignProductImages(thumbnails);
  const productOptions = getVerifiedOptions(options);
  const productVariants = assignVariantsImages(variants, variant_thumbnails);
  const initialOptions = getInitialOptions(productOptions);
  const initialVariant = getInitialVariant(productVariants, initialOptions);

  return (
    <ProductProvider
      images={productImages}
      options={productOptions}
      variants={productVariants}
      initialOptions={initialOptions}
      initialVariant={initialVariant}
    >
      <section className="px-6">
        <div className="flex flex-col items-start justify-between gap-16 pb-20 sm:flex-row lg:gap-24">
          <div className="sticky top-6 grid grid-cols-2 gap-6">
            <ProductImages />
            <ProductVariantImages />
          </div>
          <aside className="w-full max-w-[348px] shrink-0">
            <ProductOptionPicker />
          </aside>
        </div>
      </section>
      <SliceZone slices={page.data.slices} components={components} />
    </ProductProvider>
  );
}
