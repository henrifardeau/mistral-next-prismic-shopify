import {
  ProductsDocumentDataThumbnailsItem,
  ProductsDocumentDataVariantThumbnailsItem,
} from '../../prismicio-types';
import { CompareAtPrice, Image, Price } from './common';

export type ProductImage = ProductsDocumentDataThumbnailsItem;
export type ProductVariantImage = ProductsDocumentDataVariantThumbnailsItem;

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

export type ProductVerifiedOption =
  | ProductOtherOption
  | ProductSizeOption
  | ProductColorOption;

export type ProductOtherOption = {
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
  selectedOptions: {
    name: string;
    value: string;
  }[];
};

export type ExtendedProductVariant = ProductVariant & { images: Image[] };
