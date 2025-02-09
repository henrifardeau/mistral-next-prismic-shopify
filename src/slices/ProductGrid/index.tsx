import { FC } from 'react';

import {
  getProductIds,
  mergeProductsRefs,
  prismic,
  ProductDoc,
} from '@/lib/prismic';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { ProductGridItem } from './components';

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid: FC<ProductGridProps> = async ({ slice }) => {
  const productIds = getProductIds(slice.primary.products);

  const rawProducts = await prismic.getAllByIDs<ProductDoc>(productIds);
  const products = mergeProductsRefs(slice.primary.products, rawProducts);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid grid-cols-4 gap-4 px-6 pb-6">
        {products.map((product) => (
          <ProductGridItem key={product.product.id} product={product.product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
