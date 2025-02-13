'use client';

import { ProductColorSelectPicker } from '@/components/product';
import { useProduct } from '@/hooks/use-product';

export function ProductColorSelectOptionPicker() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const option = options.find((option) => option.type === 'color');
  if (!option) {
    return null;
  }

  return (
    <ProductColorSelectPicker
      option={option}
      value={currentOptions[option.name]}
      onValueChange={(v) => updateOption(option.name, v)}
    />
  );
}
