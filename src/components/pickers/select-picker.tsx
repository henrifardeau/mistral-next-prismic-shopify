import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectOption } from '@/types/common';

export function SelectPicker({
  option,
  value,
  onValueChange,
}: {
  option: SelectOption;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={option.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {option.optionValues.map((optionValue) => (
            <SelectItem key={optionValue.name} value={optionValue.value}>
              {optionValue.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
