import { IMAGES_OPTIONS } from '@/constants/option-images';
import {
  COLLECTION_PRODUCT_COLOR_TYPE,
  COLLECTION_PRODUCT_IMAGE_TYPE,
} from '@/constants/option-types';
import { CollectionProductFilter } from '@/types/collection';
import {
  ColorOption,
  ImageOption,
  ListOption,
  VerifiedOption,
} from '@/types/common';

function hasSwatchForEveryOption(option: CollectionProductFilter) {
  return option.values.every(
    (value) => value.swatch && typeof value.swatch.color === 'string',
  );
}

function hasImageForEveryOption(option: CollectionProductFilter) {
  const imageNames = Object.keys(IMAGES_OPTIONS);

  return option.values.every((optionValue) =>
    imageNames.includes(optionValue.label),
  );
}

export function getVerifiedFilters(
  options: CollectionProductFilter[],
): VerifiedOption[] {
  return options.map((option) => {
    if (
      COLLECTION_PRODUCT_COLOR_TYPE.includes(option.id.toLowerCase()) &&
      hasSwatchForEveryOption(option)
    ) {
      return {
        type: 'color',
        mode: 'multiple',
        name: option.label,
        optionValues: option.values.map((value) => ({
          name: value.label,
          value: value.input,
          swatch: {
            color: value.swatch!.color || '',
          },
        })),
      } satisfies ColorOption;
    }

    if (
      COLLECTION_PRODUCT_IMAGE_TYPE.includes(option.id.toLowerCase()) &&
      hasImageForEveryOption(option)
    ) {
      return {
        type: 'image',
        mode: 'multiple',
        name: option.label,
        optionValues: option.values.map((value) => ({
          name: value.label,
          value: value.input,
          image: {
            src: IMAGES_OPTIONS[value.label].src,
            alt: IMAGES_OPTIONS[value.label].alt,
          },
        })),
      } satisfies ImageOption;
    }

    return {
      type: 'list',
      mode: 'multiple',
      name: option.label,
      optionValues: option.values.map((value) => ({
        name: value.label,
        value: value.input,
      })),
    } satisfies ListOption;
  });
}

export function getInitialFilters(
  filters: VerifiedOption[],
  initialFilters: Record<string, string[]> = {},
) {
  return filters.reduce(
    (acc, cur) => {
      acc[cur.name] = initialFilters[cur.name] ?? [];
      return acc;
    },
    {} as Record<string, string[]>,
  );
}
