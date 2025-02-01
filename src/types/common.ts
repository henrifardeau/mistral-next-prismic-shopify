import { ImageField } from '@prismicio/client';

export type Image = ImageField;

export type CompareAtPrice = Price | null;

export type Price = {
  amount: string;
  currencyCode: string;
};
