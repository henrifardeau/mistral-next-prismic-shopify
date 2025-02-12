import { FC } from 'react';

import { prismic } from '@/lib/prismic';
import {
  Content,
  FilledContentRelationshipField,
  GroupField,
  isFilled,
} from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Simplify } from '../../../prismicio-types';
import {
  CollectionGridItem,
  ProductGridItem,
  SwitchGridItem,
} from './components';

/**
 * Props for `ProductCollectionGrid`.
 */
export type ProductCollectionGridProps =
  SliceComponentProps<Content.ProductCollectionGridSlice>;

function filterItems(
  items: GroupField<
    Simplify<Content.ProductCollectionGridSliceDefaultPrimaryItemsItem>
  >,
) {
  const filledItems: FilledContentRelationshipField<
    'collections' | 'products',
    string,
    unknown
  >[] = [];

  items.forEach((item) => {
    if (
      item.item.link_type === 'Document' &&
      isFilled.contentRelationship(item.item)
    ) {
      filledItems.push(item.item);
    }
  });

  return filledItems;
}

function getItemIds(
  items: FilledContentRelationshipField<
    'collections' | 'products',
    string,
    unknown
  >[],
) {
  return items.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.type]: [...acc[cur.type], cur.id],
      };
    },
    { collections: [], products: [] } as Record<
      'collections' | 'products',
      string[]
    >,
  );
}

function mergeItemRefs(
  items: FilledContentRelationshipField<
    'collections' | 'products',
    string,
    unknown
  >[],
  productRefs: Content.ProductsDocument[],
  collectionsRef: Content.CollectionsDocument[],
) {
  return items
    .map((item) =>
      item.type === 'products'
        ? productRefs.find((ref) => ref.id === item.id)
        : collectionsRef.find((ref) => ref.id === item.id),
    )
    .filter((item) => item !== undefined);
}

/**
 * Component for "ProductCollectionGrid" Slices.
 */
const ProductCollectionGrid: FC<ProductCollectionGridProps> = async ({
  slice,
}) => {
  const rawItems = filterItems(slice.primary.items);
  const itemIds = getItemIds(rawItems);

  const itemsRef = await Promise.all([
    prismic.getAllByIDs<Content.ProductsDocument>(itemIds.products),
    prismic.getAllByIDs<Content.CollectionsDocument>(itemIds.collections),
  ]);

  const items = mergeItemRefs(rawItems, itemsRef[0], itemsRef[1]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pb-16"
    >
      <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(23rem,1fr))]">
        <SwitchGridItem
          items={items}
          components={{
            products: ({ data }) => <ProductGridItem product={data} />,
            collections: ({ data }) => <CollectionGridItem collection={data} />,
          }}
        />
      </div>
    </section>
  );
};

export default ProductCollectionGrid;
