'use client';

import { ProductSizePicker } from '@/components/product';
import { useProduct } from '@/hooks/use-product';

export function ProductSizeOptionPicker() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const option = options.find((option) => option.type === 'size');
  if (!option) {
    return null;
  }

  return (
    <ProductSizePicker
      option={option}
      value={currentOptions[option.name]}
      onValueChange={(v) => updateOption(option.name, v)}
    />
  );
}
