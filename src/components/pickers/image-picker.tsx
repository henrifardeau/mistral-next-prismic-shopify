import Image from 'next/image';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ImageOption } from '@/types/common';

type SingleProps = {
  mode: 'single';
  option: ImageOption;
  value: string;
  onValueChange: (value: string) => void;
};

type MultipleProps = {
  mode: 'multiple';
  option: ImageOption;
  value: string[];
  onValueChange: (value: string[]) => void;
};

export function ImagePicker({
  mode,
  option,
  value,
  onValueChange,
}: SingleProps | MultipleProps) {
  if (mode === 'multiple') {
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={onValueChange}>
        {option.optionValues.map((optionValue) => (
          <ToggleGroupItem
            key={optionValue.name}
            value={optionValue.value}
            variant="outline"
            className="min-h-auto min-w-auto p-1"
          >
            <Image
              src={optionValue.image.src}
              alt={optionValue.image.alt || ''}
              width={28}
              height={36}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }

  return (
    <ToggleGroup type="single" value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <ToggleGroupItem
          key={optionValue.name}
          value={optionValue.value}
          variant="outline"
          className="min-h-auto min-w-auto p-1"
        >
          <Image
            src={optionValue.image.src}
            alt={optionValue.image.alt || ''}
            width={28}
            height={36}
          />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
