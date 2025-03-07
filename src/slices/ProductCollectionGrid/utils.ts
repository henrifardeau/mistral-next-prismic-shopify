import { DEFAULT_SORTING } from '@/constants/collection';
import { CollectionProductFilter } from '@/types/collection';
import {
  ColorOption,
  ImageOption,
  ListOption,
  VerifiedOption,
} from '@/types/common';

type Images = Record<
  string,
  {
    src: string;
    alt?: string;
  }
>;

export function computeContext(context: {
  cursor?: string;
  sort?: {
    name: string;
    slug: string;
    sortKey: string;
    sortReverse: boolean;
  };
  filters?: Record<string, string[]>;
}) {
  const { cursor, sort = DEFAULT_SORTING, filters = {} } = context;

  const shopifySort = {
    key: sort.sortKey,
    reverse: sort.sortReverse,
  };

  const shopifyFilters = Object.values(filters)
    .flat()
    .map((e) => JSON.parse(e));

  return { cursor, sort, shopifySort, filters, shopifyFilters };
}

function hasSwatchForEveryOption(option: CollectionProductFilter) {
  return option.values.every((value) => {
    const has = value.swatch && typeof value.swatch.color === 'string';
    if (!has) {
      console.error(option.label, value.label, 'missing swatch.');
    }

    return has;
  });
}

function hasImageForEveryOption(
  option: CollectionProductFilter,
  images: Images,
) {
  const imageNames = Object.keys(images);

  return option.values.every((optionValue) => {
    const included = imageNames.includes(optionValue.label);
    if (!included) {
      console.error(
        option.label,
        optionValue.label,
        'missing image. Availables:',
        imageNames.join(', '),
      );
    }

    return included;
  });
}

export function getVerifiedFilters(
  options: CollectionProductFilter[],
  optionTypes?: {
    color?: {
      ids: string[];
    };
    image?: {
      ids: string[];
      images: Images;
    };
    range?: {
      ids: string[];
    };
  },
): VerifiedOption[] {
  return options.map((option) => {
    if (
      optionTypes?.color?.ids.includes(option.id.toLowerCase()) &&
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
      optionTypes?.image?.ids.includes(option.id.toLowerCase()) &&
      hasImageForEveryOption(option, optionTypes?.image?.images)
    ) {
      return {
        type: 'image',
        mode: 'multiple',
        name: option.label,
        optionValues: option.values.map((value) => ({
          name: value.label,
          value: value.input,
          image: {
            src: optionTypes?.image?.images[value.label].src || '',
            alt: optionTypes?.image?.images[value.label].alt || '',
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
  options: VerifiedOption[],
  initialFilters: Record<string, string[]> = {},
) {
  return options.reduce(
    (acc, cur) => {
      acc[cur.name] = initialFilters[cur.name] ?? [];
      return acc;
    },
    {} as Record<string, string[]>,
  );
}
