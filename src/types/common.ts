export type Params<T> = Promise<T>;

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type CompareAtPrice = Price | null;

export type Price = {
  amount: string;
  currencyCode: string;
};

export type VerifiedOption =
  | SelectOption
  | ListOption
  | ImageOption
  | ColorOption;

export type SelectOption = {
  type: 'select';
  mode: 'single';
  name: string;
  optionValues: {
    name: string;
    value: string;
  }[];
};

export type ListOption = {
  type: 'list';
  mode: 'multiple' | 'single';
  name: string;
  optionValues: {
    name: string;
    value: string;
  }[];
};

export type ImageOption = {
  type: 'image';
  mode: 'multiple' | 'single';
  name: string;
  optionValues: {
    name: string;
    value: string;
    image: {
      src: string;
      alt?: string;
    };
  }[];
};

export type ColorOption = {
  type: 'color';
  mode: 'multiple' | 'single';
  name: string;
  optionValues: {
    name: string;
    value: string;
    swatch: {
      color: string;
    };
  }[];
};
