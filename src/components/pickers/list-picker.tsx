import { ListOption } from '@/types/common';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type SingleProps = {
  mode: 'single';
  option: ListOption;
  value: string;
  onValueChange: (value: string) => void;
};

type MultipleProps = {
  mode: 'multiple';
  option: ListOption;
  value: string[];
  onValueChange: (value: string[]) => void;
};

export function ListPicker({
  mode,
  option,
  value,
  onValueChange,
}: SingleProps | MultipleProps) {
  if (mode === 'multiple') {
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={onValueChange}>
        {option.optionValues.map((optionValue) => (
          <ToggleGroupItem key={optionValue.name} value={optionValue.value}>
            {optionValue.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => {
        if (v) {
          onValueChange(v);
        }
      }}
    >
      {option.optionValues.map((optionValue) => (
        <ToggleGroupItem key={optionValue.name} value={optionValue.value}>
          {optionValue.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
