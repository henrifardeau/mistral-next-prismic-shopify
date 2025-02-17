import { FC } from 'react';

import { PrismicCarousel } from '@/components/prismic-carousel';
import { ProductVariantImages } from '@/components/product';
import { flatProductImages, flatVariantsImages } from '@/lib/prismic';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import {
  ProductAddToCart,
  ProductAddToCartStick,
  ProductOptionsPickers,
} from './components';

/**
 * Props for `ProductHeader`.
 */
export type ProductHeaderProps =
  SliceComponentProps<Content.ProductHeaderSlice>;

/**
 * Component for "ProductHeader" Slices.
 */
const ProductHeader: FC<ProductHeaderProps> = ({ slice }) => {
  const { thumbnails, variant_thumbnails } = slice.primary;

  const productImages = flatProductImages(thumbnails);
  const variantsImages = flatVariantsImages(variant_thumbnails);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6"
    >
      <header
        id="header"
        className="flex items-start justify-between gap-6 pb-16"
      >
        <div className="sticky top-6 grid grid-cols-2 gap-6">
          <div className="h-full w-full overflow-hidden rounded-xl">
            <PrismicCarousel images={productImages} />
          </div>
          <div className="h-full w-full overflow-hidden rounded-xl">
            <ProductVariantImages variantsImages={variantsImages} />
          </div>
        </div>
        <aside className="w-full max-w-[348px] shrink-0 space-y-6">
          <ProductOptionsPickers />
          <ProductAddToCart />
          <div className="h-96 rounded-xl border border-neutral-100 bg-neutral-50"></div>
          <div className="h-96 rounded-xl border border-neutral-100 bg-neutral-50"></div>
        </aside>
        <ProductAddToCartStick />
      </header>
    </section>
  );
};

export default ProductHeader;
