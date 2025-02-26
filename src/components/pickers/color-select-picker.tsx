import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColorOption } from '@/types/common';

export function ColorSelectPicker({
  option,
  value,
  onValueChange,
}: {
  option: ColorOption;
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
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: optionValue.swatch.color }}
                />
                <span>{optionValue.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
