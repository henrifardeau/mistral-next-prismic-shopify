import { IMAGES_OPTIONS } from '@/constants/option-images';
import { COLOR_TYPE, IMAGE_TYPE, SIZE_TYPE } from '@/constants/option-types';
import {
  ProductColorOption,
  ProductImageOption,
  ProductOption,
  ProductSelectOption,
  ProductSizeOption,
  ProductVariant,
  ProductVerifiedOption,
} from '@/types/product';

function hasSwatchForEveryOption(option: ProductOption) {
  return option.optionValues.every(
    (value) => value.swatch && typeof value.swatch.color === 'string',
  );
}

function hasImageForEveryOption(option: ProductOption) {
  const imageNames = Object.keys(IMAGES_OPTIONS);

  return option.optionValues.every((optionValue) =>
    imageNames.includes(optionValue.name),
  );
}

export function getVerifiedOptions(options: ProductOption[]) {
  return options.map((option) => {
    if (
      COLOR_TYPE.includes(option.name.toLowerCase()) &&
      hasSwatchForEveryOption(option)
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

    if (
      IMAGE_TYPE.includes(option.name.toLowerCase()) &&
      hasImageForEveryOption(option)
    ) {
      return {
        type: 'image',
        name: option.name,
        optionValues: option.optionValues.map((value) => ({
          name: value.name,
          image: {
            src: IMAGES_OPTIONS[value.name].src,
            alt: IMAGES_OPTIONS[value.name].alt,
          },
        })),
      } as ProductImageOption;
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
    } as ProductSelectOption;
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
  variants: ProductVariant[],
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
  variants: ProductVariant[],
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
