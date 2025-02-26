import Image from 'next/image';

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemButton,
} from '@/components/ui/radio-group';
import { ImageOption } from '@/types/common';

export function ImagePicker({
  option,
  value,
  onValueChange,
}: {
  option: ImageOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <RadioGroupItem key={optionValue.name} value={optionValue.value}>
          <RadioGroupItemButton
            value={optionValue.value}
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
