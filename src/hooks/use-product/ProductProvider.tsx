'use client';

import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { Product, ProductOption } from '@/types/product';

import { ProductContext } from './ProductContext';

function selectInitialOptions(options: ProductOption[]) {
  return options.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.name]: cur.optionValues[0].name,
      };
    },
    {} as Record<string, string>,
  );
}

export function ProductProvider({
  product,
  children,
}: PropsWithChildren<{
  product: Product;
}>) {
  const [currentOptions, setCurrentOption] = useState(
    selectInitialOptions(product.options),
  );

  const productOptions = useMemo(() => {
    if (
      product.options.length === 0 ||
      product.options.some((opt) => opt.optionValues.length <= 1)
    ) {
      return [];
    }

    return product.options;
  }, [product.options]);

  const updateOption = useCallback(
    (optionName: string, optionValue: string) => {
      setCurrentOption((prevOptions) => ({
        ...prevOptions,
        [optionName]: optionValue,
      }));
    },
    [],
  );

  const value = useMemo(() => {
    const currentVariant = product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => option.value === currentOptions[option.name],
      ),
    );

    if (!currentVariant) {
      throw new Error('Invalid Options/Variants tuple');
    }

    return {
      productVariants: product.variants,
      productOptions,
      currentOptions,
      currentVariant,
      updateOption,
    };
  }, [product.variants, productOptions, currentOptions, updateOption]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
