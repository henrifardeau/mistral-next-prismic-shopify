import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemButton,
} from '@/components/ui/radio-group';
import { ListOption } from '@/types/common';

export function ListPicker({
  option,
  value,
  onValueChange,
}: {
  option: ListOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <RadioGroupItem key={optionValue.name} value={optionValue.value}>
          <RadioGroupItemButton value={optionValue.value}>
            {optionValue.name}
          </RadioGroupItemButton>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
