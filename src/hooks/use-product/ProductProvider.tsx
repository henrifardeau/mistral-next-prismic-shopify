'use client';

import { useCallback, useMemo, useState } from 'react';

import { Product, SelectedOptions } from '@/types/product';

import { ProductContext } from './ProductContext';

type ProductProviderProps = {
  product: Product;
  initialOptions: SelectedOptions;
  children: React.ReactNode;
};

export function ProductProvider({
  product,
  initialOptions,
  children,
}: ProductProviderProps) {
  const [currentOptions, setCurrentOption] = useState(initialOptions);

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
      productOptions: product.options,
      currentOptions,
      currentVariant,
      updateOption,
    };
  }, [product.variants, product.options, currentOptions, updateOption]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
