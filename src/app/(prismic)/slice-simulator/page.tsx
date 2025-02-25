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

function wrapWithProduct(slices: { slice_type: string }[]) {
  return !!slices.find((s) => s.slice_type === 'product_header');
}

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  if (wrapWithProduct(slices)) {
    const shopifyProduct = process.env.PRISMIC_MOCK_PRODUCT
      ? await shopify.product.getByHandle(process.env.PRISMIC_MOCK_PRODUCT)
      : SIMULATOR_PRODUCT;

    const product = shopify.product.reshape(shopifyProduct);

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
          <SliceZone slices={slices} components={components} />
        </ProductProvider>
      </SliceSimulator>
    );
  }

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
