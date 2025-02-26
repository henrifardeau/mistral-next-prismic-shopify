import { FC } from 'react';

import { DEFAULT_SORTING } from '@/constants/collection';
import { prismic } from '@/lib/prismic';
import { shopify } from '@/lib/shopify';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import {
  CollectionFilterButton,
  CollectionFilterDrawer,
  CollectionSortSelect,
  ProductItem,
  SwitchGridItem,
} from './components';
import { getVerifiedOptions } from './utils';

/**
 * Props for `ProductCollectionGrid`.
 */
export type ProductCollectionGridProps = SliceComponentProps<
  Content.ProductCollectionGridSlice,
  {
    sort?: {
      name: string;
      slug: string;
      sortKey: string;
      sortReverse: boolean;
    };
  }
>;

/**
 * Component for "ProductCollectionGrid" Slices.
 */
const ProductCollectionGrid: FC<ProductCollectionGridProps> = async ({
  slice,
  context,
}) => {
  const { sort } = context;
  if (!slice.primary.shopify_collection_handle) {
    return null;
  }

  const shopifyCollection = await shopify.collection.getByHandle(
    slice.primary.shopify_collection_handle,
    {
      key: sort?.sortKey || DEFAULT_SORTING.sortKey,
      reverse: sort?.sortReverse || DEFAULT_SORTING.sortReverse,
    },
  );
  if (!shopifyCollection.collection?.products) {
    return null;
  }

  const collection = shopify.collection.reshape(shopifyCollection);
  const documents = await prismic.getAllByUIDs(
    'products',
    collection.products.map((p) => p.handle),
  );

  const filters = getVerifiedOptions(collection.filters);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pb-16"
    >
      <div className="py-4">
        <div className="flex items-center justify-between">
          <CollectionFilterButton />
          <CollectionSortSelect
            sort={{
              name: sort?.name || DEFAULT_SORTING.name,
              slug: sort?.slug || DEFAULT_SORTING.slug,
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(23rem,1fr))]">
        <SwitchGridItem
          products={collection.products}
          documents={documents}
          components={{
            products: ({ document, product }) => (
              <ProductItem document={document} product={product} />
            ),
          }}
        />
      </div>
      <CollectionFilterDrawer filters={filters} />
    </section>
  );
};

export default ProductCollectionGrid;
