import Link from 'next/link';

import { ProductVariantImages } from '@/components/product';
import {
  getInitialOptions,
  getInitialVariant,
  getVerifiedOptions,
  ProductProvider,
} from '@/hooks/use-product';
import { flatProductImages, flatVariantsImages } from '@/lib/prismic';
import { shopify } from '@/lib/shopify';
import { Content, isFilled } from '@prismicio/client';

import { ProductColorPicker } from './product-color-picker';

function getProductSlice(product: Content.ProductsDocument) {
  return product.data.slices.find((s) => s.slice_type === 'product_header');
}

export async function ProductGridItem({
  item,
}: {
  item: Content.ProductsDocument;
}) {
  const { shopify_handle } = item.data;
  if (!isFilled.keyText(shopify_handle)) {
    console.error('Missing Shopify Handle for product', item.id);
    return null;
  }

  const productSlice = getProductSlice(item);
  if (!productSlice) {
    console.error('Missing product header slice for product', item.id);
    return null;
  }

  const shopifyProduct = await shopify.getProductByHandle(shopify_handle);
  if (!shopifyProduct.product) {
    console.error('Shopify product not found', shopify_handle);
    return null;
  }

  const { thumbnails, variant_thumbnails } = productSlice.primary;

  const productImages = flatProductImages(thumbnails);
  const variantsImages = flatVariantsImages(variant_thumbnails);

  const product = shopify.reshapeProduct(shopifyProduct);

  const productOptions = getVerifiedOptions(product.options);
  const initialOptions = getInitialOptions(productOptions);
  const initialVariant = getInitialVariant(product.variants, initialOptions);

  return (
    <ProductProvider
      product={product}
      options={productOptions}
      variants={product.variants}
      initialOptions={initialOptions}
      initialVariant={initialVariant}
    >
      <article className="flex h-[29rem] flex-col overflow-hidden rounded-xl bg-white sm:min-w-[19rem] xl:h-[40rem]">
        <Link href={`/products/${item.uid}`} className="h-0 grow select-none">
          <ProductVariantImages
            variantsImages={variantsImages}
            productImages={productImages}
          />
        </Link>
        <div className="shrink-0 space-y-4 p-6">
          <h2 className="overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap">
            {item.data.title}
          </h2>
          <ProductColorPicker />
        </div>
      </article>
    </ProductProvider>
  );
}
