import {
  ColorOption,
  ImageOption,
  ListOption,
  SelectOption,
  VerifiedOption,
} from '@/types/common';

interface ComponentSingleProps<T> {
  mode: 'single';
  option: T;
  value: string;
  onValueChange: (value: string) => void;
}

interface ComponentMultipleProps<T> {
  mode: 'multiple';
  option: T;
  value: string[];
  onValueChange: (value: string[]) => void;
}

export interface SwitchPickersSingleProps {
  mode: 'single';
  options: VerifiedOption[];
  currentOptions: Record<string, string>;
  onValueChange: (name: string, value: string) => void;
  components: {
    color: React.FC<ComponentSingleProps<ColorOption>>;
    image: React.FC<ComponentSingleProps<ImageOption>>;
    list: React.FC<ComponentSingleProps<ListOption>>;
    select: React.FC<ComponentSingleProps<SelectOption>>;
  };
}

export interface SwitchPickersMultipleProps {
  mode: 'multiple';
  options: VerifiedOption[];
  currentOptions: Record<string, string[]>;
  onValueChange: (name: string, value: string[]) => void;
  components: {
    color: React.FC<ComponentMultipleProps<ColorOption>>;
    image: React.FC<ComponentMultipleProps<ImageOption>>;
    list: React.FC<ComponentMultipleProps<ListOption>>;
  };
}

export function SwitchPickers({
  mode,
  options,
  currentOptions,
  onValueChange,
  components,
}: SwitchPickersSingleProps | SwitchPickersMultipleProps) {
  return options.map((option, index) => {
    switch (option.type) {
      case 'color': {
        if (mode === 'single') {
          return (
            <components.color
              key={index}
              mode={'single'}
              option={option}
              value={currentOptions[option.name]}
              onValueChange={(v) => onValueChange(option.name, v)}
            />
          );
        }

        return (
          <components.color
            key={index}
            mode={'multiple'}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
      case 'image': {
        if (mode === 'single') {
          return (
            <components.image
              key={index}
              mode={'single'}
              option={option}
              value={currentOptions[option.name]}
              onValueChange={(v) => onValueChange(option.name, v)}
            />
          );
        }

        return (
          <components.image
            key={index}
            mode={'multiple'}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
      case 'list': {
        if (mode === 'single') {
          return (
            <components.list
              key={index}
              mode={'single'}
              option={option}
              value={currentOptions[option.name]}
              onValueChange={(v) => onValueChange(option.name, v)}
            />
          );
        }

        return (
          <components.list
            key={index}
            mode={'multiple'}
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
      case 'select': {
        if (mode === 'multiple') {
          console.error('Select picker doesnt support multiple mode');
          return null;
        }

        return (
          <components.select
            key={index}
            mode="single"
            option={option}
            value={currentOptions[option.name]}
            onValueChange={(v) => onValueChange(option.name, v)}
          />
        );
      }
    }
  });
}
