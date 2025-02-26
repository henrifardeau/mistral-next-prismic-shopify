import {
  ColorOption,
  ImageOption,
  ListOption,
  SelectOption,
  VerifiedOption,
} from '@/types/common';

interface ComponentProps<T> {
  option: T;
  value: string;
  onValueChange: (value: string) => void;
}

export interface SwitchPickersProps {
  options: VerifiedOption[];
  currentOptions: Record<string, string>;
  onValueChange: (name: string, value: string) => void;
  components: {
    color: React.FC<ComponentProps<ColorOption>>;
    image: React.FC<ComponentProps<ImageOption>>;
    list: React.FC<ComponentProps<ListOption>>;
    select: React.FC<ComponentProps<SelectOption>>;
  };
}

export function SwitchPickers({
  options,
  currentOptions,
  onValueChange,
  components,
}: SwitchPickersProps) {
  return options.map((option, index) => {
    switch (option.type) {
      case 'color': {
        return (
          <components.color
            key={index}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
      case 'image': {
        return (
          <components.image
            key={index}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
      case 'list': {
        return (
          <components.list
            key={index}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
      case 'select': {
        return (
          <components.select
            key={index}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
    }
  });
}
