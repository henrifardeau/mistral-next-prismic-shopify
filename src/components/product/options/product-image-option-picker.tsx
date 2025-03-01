'use client';

import { ImagePicker } from '@/components/pickers';
import { useProduct } from '@/hooks/use-product';

export function ProductImageOptionPicker() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const option = options.find((option) => option.type === 'image');
  if (!option) {
    return null;
  }

  return (
    <ImagePicker
      mode="single"
      option={option}
      value={currentOptions[option.name]}
      onValueChange={(v) => updateOption(option.name, v)}
    />
  );
}
