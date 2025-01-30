import { CompareAtPrice, Price } from './common';

export type SelectedOptions = Record<string, string>;

export type Product = {
  id: string;
  handle: string;
  options: Option[];
  variants: Variant[];
};

export type Option = {
  id: string;
  name: string;
  optionValues: OptionValue[];
};

export type OptionValue = {
  swatch?: {
    color?: string;
  } | null;
  name: string;
  id: string;
};

export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  compareAtPrice?: CompareAtPrice;
  price: Price;
  selectedOptions: {
    name: string;
    value: string;
  }[];
};
