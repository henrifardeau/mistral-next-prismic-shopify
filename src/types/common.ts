import { FilledImageFieldImage } from '@prismicio/client';

export type Image = FilledImageFieldImage;

export type CompareAtPrice = Price | null;

export type Price = {
  amount: string;
  currencyCode: string;
};
