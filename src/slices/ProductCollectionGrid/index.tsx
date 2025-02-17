import { FC } from 'react';

import { prismic } from '@/lib/prismic';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { ProductItem, SwitchGridItem } from './components';
import { shopify } from '@/lib/shopify';

/**
 * Props for `ProductCollectionGrid`.
 */
export type ProductCollectionGridProps = SliceComponentProps<
  Content.ProductCollectionGridSlice,
  { sortKey?: string; sortReverse?: boolean }
>;

/**
 * Component for "ProductCollectionGrid" Slices.
 */
const ProductCollectionGrid: FC<ProductCollectionGridProps> = async ({
  slice,
  context,
}) => {
  if (!slice.primary.shopify_collection_handle) {
    return null;
  }

  const shopifyCollection = await shopify.getCollectionByHandle(
    slice.primary.shopify_collection_handle,
    { key: context.sortKey, reverse: context.sortReverse },
  );
  if (!shopifyCollection.collection?.products) {
    return null;
  }

  const products = shopify.reshapeCollectionProducts(shopifyCollection);
  const documents = await prismic.getAllByUIDs(
    'products',
    products.map((p) => p.handle),
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container pb-16"
    >
      <div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(23rem,1fr))]">
        <SwitchGridItem
          products={products}
          documents={documents}
          components={{
            products: ({ document, product }) => (
              <ProductItem document={document} product={product} />
            ),
          }}
        />
      </div>
    </section>
  );
};

export default ProductCollectionGrid;
