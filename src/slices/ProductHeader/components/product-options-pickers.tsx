'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  ColorSwatchPicker,
  ImagePicker,
  ListPicker,
  SelectPicker,
  SwitchPickers,
  SwitchPickersSingleProps,
} from '@/components/pickers';
import { useProduct } from '@/hooks/use-product';

type SwitchComponents = SwitchPickersSingleProps['components'];

export function ProductOptionsPickers() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  const updateOptionInterceptor = (name: string, value: string) => {
    if (!value) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`);

    updateOption(name, value);
  };

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
          <div className="flex space-x-2 text-sm">
            <span>{option.name} :</span>
            <span>{value}</span>
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
      onValueChange={updateOptionInterceptor}
      components={switchComponents}
    />
  );
}
