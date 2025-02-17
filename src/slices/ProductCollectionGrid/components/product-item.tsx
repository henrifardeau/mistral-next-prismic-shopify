import Link from 'next/link';

import {
  ProductColorSwatchOptionPicker,
  ProductVariantImages,
} from '@/components/product';
import { ProductPrice } from '@/components/product/product-price';
import {
  getInitialOptions,
  getInitialVariant,
  getVerifiedOptions,
  ProductProvider,
} from '@/hooks/use-product';
import { flatProductImages, flatVariantsImages } from '@/lib/prismic';
import { Product } from '@/types/product';
import { Content } from '@prismicio/client';

function getProductSlice(product: Content.ProductsDocument) {
  return product.data.slices.find((s) => s.slice_type === 'product_header');
}

export function ProductItem({
  document,
  product,
}: {
  document: Content.ProductsDocument;
  product: Product;
}) {
  const productSlice = getProductSlice(document);
  if (!productSlice) {
    console.error('Missing product header slice for product', document.id);
    return null;
  }

  const { thumbnails, variant_thumbnails } = productSlice.primary;

  const productImages = flatProductImages(thumbnails);
  const variantsImages = flatVariantsImages(variant_thumbnails);

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
        <Link
          href={`/products/${document.uid}`}
          className="h-0 grow select-none"
        >
          <ProductVariantImages
            variantsImages={variantsImages}
            productImages={productImages}
          />
        </Link>
        <div className="shrink-0 space-y-4 p-6">
          <h2 className="overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap">
            {document.data.title}
          </h2>
          <ProductColorSwatchOptionPicker />
          <ProductPrice />
        </div>
      </article>
    </ProductProvider>
  );
}
