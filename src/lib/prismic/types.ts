import { Content } from '@prismicio/client';

import { Simplify } from '../../../prismicio-types';

export type ProductDoc = Content.ProductsDocument;
export type Product =
  Simplify<Content.ProductGridSliceDefaultPrimaryProductsItem>;
