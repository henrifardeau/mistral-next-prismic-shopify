import { PrismicCarousel } from '@/components/prismic-carousel';
import { shopify } from '@/lib/shopify';
import {
  Content,
  FilledImageFieldImage,
  ImageField,
  isFilled,
  KeyTextField,
} from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import {
  ProductAddToCart,
  ProductAddToCartStick,
  ProductOptionPicker,
  ProductVariantImages,
} from './components';

type ProductImages = { thumbnail: ImageField }[];
type VariantsImages = {
  shopify_variant_ids: KeyTextField;
  thumbnail: ImageField;
}[];

/**
 * Props for `ProductHeader`.
 */
export type ProductHeaderProps = SliceComponentProps<
  Content.ProductHeaderSlice,
  { simulator?: boolean }
>;

function flatProductImages(images: ProductImages) {
  return (images || []).reduce((acc, cur) => {
    if (!isFilled.image(cur.thumbnail)) {
      return acc;
    }
    acc.push(cur.thumbnail);

    return acc;
  }, [] as FilledImageFieldImage[]);
}

function flatVariantsImages(variantsImages: VariantsImages) {
  return (variantsImages || []).reduce(
    (acc, cur) => {
      if (!isFilled.keyText(cur.shopify_variant_ids)) {
        return acc;
      }

      cur.shopify_variant_ids.split('_').forEach((id) => {
        const variantId = shopify.addPrefix('variant', id);

        if (isFilled.image(cur.thumbnail)) {
          (acc[variantId] ||= []).push(cur.thumbnail);
        }
      });

      return acc;
    },
    {} as Record<string, FilledImageFieldImage[]>,
  );
}

/**
 * Component for "ProductHeader" Slices.
 */
const ProductHeader = ({ slice, context }: ProductHeaderProps) => {
  const { thumbnails, variant_thumbnails } = slice.primary;

  const productImages = flatProductImages(thumbnails);
  const variantsImages = flatVariantsImages(variant_thumbnails);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6"
      style={{ marginTop: context?.simulator ? '24px' : '0px' }}
    >
      <header
        id="header"
        className="flex items-start justify-between gap-6 pb-16"
      >
        <div
          className="sticky top-6 grid grid-cols-2 gap-6"
          style={{ height: context?.simulator ? '768px' : 'auto' }}
        >
          <PrismicCarousel images={productImages} />
          <ProductVariantImages imagesMap={variantsImages} />
        </div>
        <aside className="w-full max-w-[348px] shrink-0 space-y-6">
          <ProductOptionPicker />
          <ProductAddToCart />
        </aside>
        <ProductAddToCartStick />
      </header>
    </section>
  );
};

export default ProductHeader;
