import {
  ProductColorOption,
  ProductImageOption,
  ProductSelectOption,
  ProductSizeOption,
  ProductVerifiedOption,
} from '@/types/product';

interface ComponentProps<T> {
  option: T;
  value: string;
  onValueChange: (value: string) => void;
}

export interface ProductSwitchOptionPickerProps {
  options: ProductVerifiedOption[];
  currentOptions: Record<string, string>;
  onValueChange: (name: string, value: string) => void;
  components: {
    color: React.FC<ComponentProps<ProductColorOption>>;
    image: React.FC<ComponentProps<ProductImageOption>>;
    size: React.FC<ComponentProps<ProductSizeOption>>;
    select: React.FC<ComponentProps<ProductSelectOption>>;
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
