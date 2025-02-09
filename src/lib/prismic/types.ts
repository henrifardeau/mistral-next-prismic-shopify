import { Content } from '@prismicio/client';

import { Simplify } from '../../../prismicio-types';

export type CollectionDoc = Content.CollectionsDocument;
export type Collection =
  Simplify<Content.CollectionHeaderSliceDefaultPrimaryCollectionsItem>;

export type ProductDoc = Content.ProductsDocument;
export type Product =
  Simplify<Content.ProductGridSliceDefaultPrimaryProductsItem>;
