import { Product } from './product';

export type Collection = {
  filters: CollectionProductFilter[];
  products: Product[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor?: string | null;
  };
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
