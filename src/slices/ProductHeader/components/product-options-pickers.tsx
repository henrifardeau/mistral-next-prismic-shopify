'use client';

import { useMemo } from 'react';

import {
  ColorSwatchPicker,
  ImagePicker,
  SelectPicker,
  ListPicker,
  SwitchPickers,
  SwitchPickersSingleProps,
} from '@/components/pickers';
import { useProduct } from '@/hooks/use-product';

type SwitchComponents = SwitchPickersSingleProps['components'];

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
          <ColorSwatchPicker
            mode="single"
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
          <ImagePicker
            mode="single"
            option={option}
            value={value}
            onValueChange={onValueChange}
          />
        </div>
      ),
      list: ({ option, value, onValueChange }) => (
        <div className="space-y-2">
          <div className="flex text-sm">
            <span>{option.name} :</span>
          </div>
          <ListPicker
            mode="single"
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
          <SelectPicker
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
    <SwitchPickers
      mode="single"
      options={options}
      currentOptions={currentOptions}
      onValueChange={updateOption}
      components={switchComponents}
    />
  );
}
