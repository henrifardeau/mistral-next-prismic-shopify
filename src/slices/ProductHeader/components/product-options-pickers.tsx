'use client';

import { useMemo } from 'react';

import {
  ProductColorSwatchPicker,
  ProductImagePicker,
  ProductSelectPicker,
  ProductSizePicker,
  ProductSwitchOptionPicker,
  ProductSwitchOptionPickerProps,
} from '@/components/product';
import { useProduct } from '@/hooks/use-product';

type SwitchComponents = ProductSwitchOptionPickerProps['components'];

export function ProductOptionsPickers() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const switchComponents: SwitchComponents = useMemo(() => {
    return {
      color: ({ option, value, onValueChange }) => (
        <ProductColorSwatchPicker
          option={option}
          value={value}
          onValueChange={onValueChange}
        />
      ),
      image: ({ option, value, onValueChange }) => (
        <ProductImagePicker
          option={option}
          value={value}
          onValueChange={onValueChange}
        />
      ),
      size: ({ option, value, onValueChange }) => (
        <ProductSizePicker
          option={option}
          value={value}
          onValueChange={onValueChange}
        />
      ),
      select: ({ option, value, onValueChange }) => (
        <ProductSelectPicker
          option={option}
          value={value}
          onValueChange={onValueChange}
        />
      ),
    };
  }, []);

  if (
    !options.length ||
    (options.length === 1 && options[0]?.optionValues.length === 1)
  ) {
    return null;
  }

  return (
    <ProductSwitchOptionPicker
      options={options}
      currentOptions={currentOptions}
      onValueChange={updateOption}
      components={switchComponents}
    />
  );
}
