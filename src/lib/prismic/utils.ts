import { GroupField, isFilled } from '@prismicio/client';
import { Collection, CollectionDoc, Product, ProductDoc } from './types';

export function getCollectionIds(collections: GroupField<Collection>) {
  return collections.flatMap((collection) =>
    isFilled.contentRelationship(collection.collection)
      ? [collection.collection.id]
      : [],
  );
}

export function getProductIds(products: GroupField<Product>) {
  return products.flatMap((product) =>
    isFilled.contentRelationship(product.product) ? [product.product.id] : [],
  );
}

export function mergeCollectionsRefs(
  collections: GroupField<Collection>,
  refs: CollectionDoc[],
) {
  return collections
    .map((collection) => {
      if (!isFilled.contentRelationship(collection.collection)) {
        return undefined;
      }

      const { id } = collection.collection;
      const ref = refs.find((source) => source.id === id);
      if (!ref) {
        return undefined;
      }

      return {
        ...collection,
        collection: ref,
      };
    })
    .filter((d) => d !== undefined);
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
