import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemButtonColor,
} from '@/components/ui/radio-group';
import { ColorOption } from '@/types/common';

export function ColorSwatchPicker({
  option,
  value,
  onValueChange,
}: {
  option: ColorOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <RadioGroupItem key={optionValue.name} value={optionValue.name}>
          <RadioGroupItemButtonColor
            value={optionValue.name}
            color={optionValue.swatch.color}
          >
            {optionValue.name}
          </RadioGroupItemButtonColor>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
