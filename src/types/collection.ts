import { Product } from './product';

export type Collection = {
  filters: CollectionProductFilter[];
  products: Product[];
};

export type CollectionProductFilter = {
  id: string;
  label: string;
  type: string;
  presentation?: string | null;
  values: {
    id: string;
    count: number;
    input: string;
    label: string;
    swatch?: {
      color?: string | null;
    } | null;
  }[];
};
