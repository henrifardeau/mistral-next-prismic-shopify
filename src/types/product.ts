import { CompareAtPrice, Price } from './common';

export type Product = {
  id: string;
  handle: string;
  title: string;
  options: ProductOption[];
  variants: ProductVariant[];
};

export type ProductOption = {
  name: string;
  optionValues: {
    name: string;
    swatch?: {
      color?: string;
    } | null;
  }[];
};

export type ProductVerifiedOption =
  | ProductSelectOption
  | ProductSizeOption
  | ProductColorOption;

export type ProductSelectOption = {
  type: 'select';
  name: string;
  optionValues: {
    name: string;
  }[];
};

export type ProductSizeOption = {
  type: 'size';
  name: string;
  optionValues: {
    name: string;
  }[];
};

export type ProductColorOption = {
  type: 'color';
  name: string;
  optionValues: {
    name: string;
    swatch: {
      color: string;
    };
  }[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  compareAtPrice?: CompareAtPrice;
  price: Price;
  image: {
    src?: string;
    altText?: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
};
