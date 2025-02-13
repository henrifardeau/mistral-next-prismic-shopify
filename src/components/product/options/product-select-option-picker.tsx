'use client';

import { ProductSelectPicker } from '@/components/product';
import { useProduct } from '@/hooks/use-product';

export function ProductSelectOptionPicker() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const option = options.find((option) => option.type === 'select');
  if (!option) {
    return null;
  }

  return (
    <ProductSelectPicker
      option={option}
      value={currentOptions[option.name]}
      onValueChange={(v) => updateOption(option.name, v)}
    />
  );
}
