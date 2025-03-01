import {
  ColorOption,
  ImageOption,
  ListOption,
  SelectOption,
  VerifiedOption,
} from '@/types/common';
import { ProductOption, ProductVariant } from '@/types/product';

type Images = Record<
  string,
  {
    src: string;
    alt?: string;
  }
>;

function hasSwatchForEveryOption(option: ProductOption) {
  return option.optionValues.every((value) => {
    const has = value.swatch && typeof value.swatch.color === 'string';
    if (!has) {
      console.error(option.name, value.name, 'missing swatch.');
    }

    return has;
  });
}

function hasImageForEveryOption(option: ProductOption, images: Images) {
  const imageNames = Object.keys(images);

  return option.optionValues.every((optionValue) => {
    const included = imageNames.includes(optionValue.name);
    if (!included) {
      console.error(
        option.name,
        optionValue.name,
        'missing image. Availables:',
        imageNames.join(', '),
      );
    }

    return included;
  });
}

export function getVerifiedOptions(
  options: ProductOption[],
  optionTypes?: {
    color?: {
      names: string[];
    };
    image?: {
      names: string[];
      images: Images;
    };
    list?: {
      names: string[];
    };
  },
): VerifiedOption[] {
  return options.map((option) => {
    if (
      optionTypes?.color?.names.includes(option.name.toLowerCase()) &&
      hasSwatchForEveryOption(option)
    ) {
      return {
        type: 'color',
        mode: 'single',
        name: option.name,
        optionValues: option.optionValues.map((value) => ({
          name: value.name,
          value: value.name,
          swatch: {
            color: value.swatch!.color || '',
          },
        })),
      } satisfies ColorOption;
    }

    if (
      optionTypes?.image?.names.includes(option.name.toLowerCase()) &&
      hasImageForEveryOption(option, optionTypes?.image?.images)
    ) {
      return {
        type: 'image',
        mode: 'single',
        name: option.name,
        optionValues: option.optionValues.map((value) => ({
          name: value.name,
          value: value.name,
          image: {
            src: optionTypes?.image?.images[value.name].src || '',
            alt: optionTypes?.image?.images[value.name].alt || '',
          },
        })),
      } satisfies ImageOption;
    }

    if (optionTypes?.list?.names.includes(option.name.toLowerCase())) {
      return {
        type: 'list',
        mode: 'single',
        name: option.name,
        optionValues: option.optionValues.map((value) => ({
          name: value.name,
          value: value.name,
        })),
      } satisfies ListOption;
    }

    return {
      type: 'select',
      mode: 'single',
      name: option.name,
      optionValues: option.optionValues.map((value) => ({
        name: value.name,
        value: value.name,
      })),
    } satisfies SelectOption;
  });
}

export function getInitialOptions(
  options: VerifiedOption[],
  initialFilters: Record<string, string> = {},
) {
  return Object.fromEntries(
    options.map((option) => [
      option.name,
      option.optionValues.find((v) => v.name === initialFilters[option.name])
        ?.name ?? option.optionValues[0].name,
    ]),
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
