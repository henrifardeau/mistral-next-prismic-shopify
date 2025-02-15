'use client';

import Image from 'next/image';

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemButton,
} from '@/components/ui/radio-group';
import { ProductImageOption } from '@/types/product';

export function ProductImagePicker({
  option,
  value,
  onValueChange,
}: {
  option: ProductImageOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <RadioGroupItem key={optionValue.name} value={optionValue.name}>
          <RadioGroupItemButton
            value={optionValue.name}
            className="min-h-auto min-w-auto"
          >
            <Image
              src={optionValue.image.src}
              alt={optionValue.image.alt || ''}
              width={28}
              height={36}
            />
          </RadioGroupItemButton>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
