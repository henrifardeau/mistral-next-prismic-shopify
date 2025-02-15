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
        <div className="space-y-2">
          <div className="flex space-x-2 text-sm">
            <span>{option.name} :</span>
            <span>{value}</span>
          </div>
          <ProductColorSwatchPicker
            option={option}
            value={value}
            onValueChange={onValueChange}
          />
        </div>
      ),
      image: ({ option, value, onValueChange }) => (
        <div className="space-y-2">
          <div className="flex space-x-2 text-sm">
            <span>{option.name} :</span>
            <span>{value}</span>
          </div>
          <ProductImagePicker
            option={option}
            value={value}
            onValueChange={onValueChange}
          />
        </div>
      ),
      size: ({ option, value, onValueChange }) => (
        <div className="space-y-2">
          <div className="flex text-sm">
            <span>{option.name} :</span>
          </div>
          <ProductSizePicker
            option={option}
            value={value}
            onValueChange={onValueChange}
          />
        </div>
      ),
      select: ({ option, value, onValueChange }) => (
        <div className="space-y-2">
          <div className="flex text-sm">
            <span>{option.name} :</span>
          </div>
          <ProductSelectPicker
            option={option}
            value={value}
            onValueChange={onValueChange}
          />
        </div>
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
