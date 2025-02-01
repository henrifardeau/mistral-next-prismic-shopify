import { SIMULATOR_PRODUCT } from '@/constants/slice-simulator-product';
import {
  getVerifiedOptions,
  getInitialOptions,
  getInitialVariant,
  ProductProvider,
} from '@/hooks/use-product';
import { shopify } from '@/lib/shopify';
import { components } from '@/slices';
import { SliceZone } from '@prismicio/react';
import {
  getSlices,
  SliceSimulator,
  SliceSimulatorParams,
} from '@slicemachine/adapter-next/simulator';

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  const product = shopify.reshapeProduct(SIMULATOR_PRODUCT);

  const productOptions = getVerifiedOptions(product.options);
  const initialOptions = getInitialOptions(productOptions);
  const initialVariant = getInitialVariant(product.variants, initialOptions);

  return (
    <SliceSimulator>
      <ProductProvider
        product={product}
        options={productOptions}
        variants={product.variants}
        initialOptions={initialOptions}
        initialVariant={initialVariant}
      >
        <SliceZone
          slices={slices}
          components={components}
          context={{ simulator: true }}
        />
      </ProductProvider>
    </SliceSimulator>
  );
}
