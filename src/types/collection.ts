import { Product } from './product';

export type Collection = {
  filters: CollectionProductFilter[];
  products: Product[];
};

export type CollectionProductFilter = {
  id: string;
  label: string;
  values: {
    input: string;
    label: string;
    swatch?: {
      color?: string | null;
    } | null;
  }[];
};
