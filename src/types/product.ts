import { CompareAtPrice, Price } from './common';

export type Product = {
  id: string;
  handle: string;
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

export type ProductVariant = {
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
