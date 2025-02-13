import {
  ProductColorOption,
  ProductSelectOption,
  ProductSizeOption,
  ProductVerifiedOption,
} from '@/types/product';

export interface ProductSwitchOptionPickerProps {
  options: ProductVerifiedOption[];
  currentOptions: Record<string, string>;
  onValueChange: (name: string, value: string) => void;
  components: {
    color: React.FC<{
      option: ProductColorOption;
      value: string;
      onValueChange: (value: string) => void;
    }>;
    size: React.FC<{
      option: ProductSizeOption;
      value: string;
      onValueChange: (value: string) => void;
    }>;
    select: React.FC<{
      option: ProductSelectOption;
      value: string;
      onValueChange: (value: string) => void;
    }>;
  };
}

export function ProductSwitchOptionPicker({
  options,
  currentOptions,
  onValueChange,
  components,
}: ProductSwitchOptionPickerProps) {
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
      case 'size': {
        return (
          <components.size
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
