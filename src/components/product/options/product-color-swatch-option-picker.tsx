'use client';

import { ProductColorSwatchPicker } from '@/components/product';
import { useProduct } from '@/hooks/use-product';

export function ProductColorSwatchOptionPicker() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const option = options.find((option) => option.type === 'color');
  if (!option) {
    return null;
  }

  return (
    <ProductColorSwatchPicker
      option={option}
      value={currentOptions[option.name]}
      onValueChange={(v) => updateOption(option.name, v)}
    />
  );
}
