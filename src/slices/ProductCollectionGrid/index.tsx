import { FC } from 'react';

import { CollectionQuery } from '@/api/gql/graphql';
import { collectionByHandleQuery } from '@/api/queries';
import { reshapeCollection } from '@/api/utils';
import { prismic } from '@/lib/prismic';
import { shopify } from '@/lib/shopify';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import {
  CollectionFilterButton,
  CollectionFilterDrawer,
  CollectionSortSelect,
  ProductItem,
} from './components';
import { computeContext, getInitialFilters, getVerifiedFilters } from './utils';
import { CollectionPagination } from './components/collection-pagination';

/**
 * Props for `ProductCollectionGrid`.
 */
export type ProductCollectionGridProps = SliceComponentProps<
  Content.ProductCollectionGridSlice,
  {
    cursor?: string;
    sort?: {
      name: string;
      slug: string;
      sortKey: string;
      sortReverse: boolean;
    };
    filters?: Record<string, string[]>;
  }
>;

/**
 * Component for "ProductCollectionGrid" Slices.
 */
const ProductCollectionGrid: FC<ProductCollectionGridProps> = async ({
  slice,
  context,
}) => {
  const { cursor, sort, shopifySort, filters, shopifyFilters } =
    computeContext(context);

  if (!slice.primary.shopify_collection_handle) {
    return null;
  }

  const shopifyCollection =
    await shopify.collection.getByHandle<CollectionQuery>({
      query: collectionByHandleQuery,
      variables: {
        after: cursor,
        handle: slice.primary.shopify_collection_handle,
        sort: shopifySort,
        filters: shopifyFilters,
      },
    });
  if (!shopifyCollection.collection?.products) {
    return null;
  }

  const collection = reshapeCollection(shopifyCollection);
  const documents = await prismic.getAllByUIDs(
    'products',
    collection.products.map((p) => p.handle),
  );

  const collectionFilters = getVerifiedFilters(
    collection.filters,
    shopify.collection.filterTypes,
  );
  const initialFilters = getInitialFilters(collectionFilters, filters);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pb-16"
    >
      <div className="flex items-center justify-between py-4">
        <CollectionFilterButton />
        <CollectionSortSelect sort={sort} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(23rem,1fr))]">
        {collection.products.map((product) => (
          <ProductItem
            key={product.id}
            document={documents.find((d) => d.uid === product.handle)}
            product={product}
          />
        ))}
      </div>
      <CollectionPagination
        cursor={collection.pageInfo.endCursor}
        hasNext={collection.pageInfo.hasNextPage}
      />
      <CollectionFilterDrawer
        filters={collectionFilters}
        initialFilters={initialFilters}
      />
    </section>
  );
};

export default ProductCollectionGrid;
