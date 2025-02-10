import { GroupField, isFilled } from '@prismicio/client';

import { Product, ProductDoc } from './types';

export function getProductIds(products: GroupField<Product>) {
  return products.flatMap((product) =>
    isFilled.contentRelationship(product.product) ? [product.product.id] : [],
  );
}

export function mergeProductsRefs(
  products: GroupField<Product>,
  refs: ProductDoc[],
) {
  return products
    .map((product) => {
      if (!isFilled.contentRelationship(product.product)) {
        return undefined;
      }

      const { id } = product.product;
      const ref = refs.find((source) => source.id === id);
      if (!ref) {
        return undefined;
      }

      return {
        ...product,
        product: ref,
      };
    })
    .filter((d) => d !== undefined);
}
