'use client';

import { OptionGroup } from '@/components/product';
import { useProduct } from '@/hooks/use-product';

export function ProductOptionPicker() {
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  return (
    <div className="grid gap-4">
      {options.map((groupOption) => (
        <OptionGroup
          key={groupOption.name}
          groupOption={groupOption}
          groupValue={currentOptions[groupOption.name]}
          updateOption={updateOption}
        />
      ))}
    </div>
  );
}
