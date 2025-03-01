import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ColorOption } from '@/types/common';

type SingleProps = {
  mode: 'single';
  option: ColorOption;
  value: string;
  onValueChange: (value: string) => void;
};

type MultipleProps = {
  mode: 'multiple';
  option: ColorOption;
  value: string[];
  onValueChange: (value: string[]) => void;
};

export function ColorSwatchPicker({
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
            size="icon"
            className="rounded-full p-1"
          >
            <span
              className="h-full w-full rounded-full text-transparent"
              style={{
                backgroundColor: optionValue.swatch.color,
              }}
            >
              <span className="sr-only">{value}</span>
            </span>
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
        <ToggleGroupItem
          key={optionValue.name}
          value={optionValue.value}
          variant="outline"
          size="icon"
          className="rounded-full p-1"
        >
          <span
            className="h-full w-full rounded-full text-transparent"
            style={{
              backgroundColor: optionValue.swatch.color,
            }}
          >
            <span className="sr-only">{value}</span>
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
