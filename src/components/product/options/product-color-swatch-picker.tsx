'use client';

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemColor,
} from '@/components/ui/radio-group';
import { ProductColorOption } from '@/types/product';

export function ProductColorSwatchPicker({
  option,
  value,
  onValueChange,
}: {
  option: ProductColorOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <RadioGroupItem key={optionValue.name} value={optionValue.name}>
          <RadioGroupItemColor
            value={optionValue.name}
            color={optionValue.swatch.color}
          >
            {optionValue.name}
          </RadioGroupItemColor>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
