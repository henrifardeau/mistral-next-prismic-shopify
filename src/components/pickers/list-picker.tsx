import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemButton,
} from '@/components/ui/radio-group';
import { ProductListOption } from '@/types/product';

export function ListPicker({
  option,
  value,
  onValueChange,
}: {
  option: ProductListOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {option.optionValues.map((optionValue) => (
        <RadioGroupItem key={optionValue.name} value={optionValue.name}>
          <RadioGroupItemButton value={optionValue.name}>
            {optionValue.name}
          </RadioGroupItemButton>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
