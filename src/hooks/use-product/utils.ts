import { COLOR_TYPE, SIZE_TYPE } from '@/constants/option-types';
import {
  Product,
  ProductColorOption,
  ProductOtherOption,
  ProductSizeOption,
  ProductVariant,
} from '@/types/product';

export function getVerifiedOptions(product: Product) {
  return product.options.map((option) => {
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

export function getInitialOptions(product: Product) {
  const options = getVerifiedOptions(product);

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

export function getInitialVariant(product: Product) {
  const initialOptions = getInitialOptions(product);

  const variant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === initialOptions[option.name],
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
