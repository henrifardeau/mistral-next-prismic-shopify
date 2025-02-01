import { COLOR_TYPE, SIZE_TYPE } from '@/constants/option-types';
import { shopify } from '@/lib/shopify';
import {
  ExtendedProductVariant,
  ProductColorOption,
  ProductImage,
  ProductOption,
  ProductOtherOption,
  ProductSizeOption,
  ProductVariant,
  ProductVariantImage,
  ProductVerifiedOption,
} from '@/types/product';
import { ImageField, isFilled } from '@prismicio/client';

export function assignProductImages(images: ProductImage[]) {
  return images
    .filter((img) => isFilled.image(img.thumbnail))
    .map((img) => img.thumbnail);
}

export function assignVariantsImages(
  variants: ProductVariant[],
  variantsImages: ProductVariantImage[],
) {
  const variantsImagesMap = variantsImages.reduce(
    (acc, cur) => {
      if (
        !isFilled.keyText(cur.shopify_variant_ids) ||
        !isFilled.image(cur.thumbnail)
      ) {
        return acc;
      }

      cur.shopify_variant_ids.split('_').forEach((id) => {
        const variantId = shopify.addPrefix('variant', id);
        (acc[variantId] ||= []).push(cur.thumbnail);
      });

      return acc;
    },
    {} as Record<string, ImageField[]>,
  );

  return variants.map((v) => ({
    ...v,
    images: variantsImagesMap[v.id] ?? [],
  }));
}

export function getVerifiedOptions(options: ProductOption[]) {
  return options.map((option) => {
    if (
      COLOR_TYPE.includes(option.name.toLowerCase()) &&
      option.optionValues.every(
        (value) => value.swatch && typeof value.swatch.color === 'string',
      )
    ) {
      return {
        type: 'color',
        name: option.name,
        optionValues: option.optionValues.map((value) => ({
          name: value.name,
          swatch: { color: value.swatch!.color },
        })),
      } as ProductColorOption;
    }

    if (SIZE_TYPE.includes(option.name.toLowerCase())) {
      return {
        type: 'size',
        name: option.name,
        optionValues: option.optionValues.map((value) => ({
          name: value.name,
        })),
      } as ProductSizeOption;
    }

    return {
      type: 'select',
      name: option.name,
      optionValues: option.optionValues.map((value) => ({ name: value.name })),
    } as ProductOtherOption;
  });
}

export function getInitialOptions(options: ProductVerifiedOption[]) {
  return options.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.name]: cur.optionValues[0].name,
      };
    },
    {} as Record<string, string>,
  );
}

export function getInitialVariant(
  variants: ExtendedProductVariant[],
  options: Record<string, string>,
) {
  const variant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === options[option.name],
    ),
  );

  if (!variant) {
    throw new Error('Invalid Options/Variants tuple');
  }

  return variant;
}

export function getVariantForOptions(
  variants: ExtendedProductVariant[],
  options: Record<string, string>,
) {
  const variant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === options[option.name],
    ),
  );

  if (!variant) {
    throw new Error('Invalid Options/Variants tuple');
  }

  return variant;
}
