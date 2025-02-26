import {
  ProductColorOption,
  ProductImageOption,
  ProductSelectOption,
  ProductListOption,
  ProductVerifiedOption,
} from '@/types/product';

interface ComponentProps<T> {
  option: T;
  value: string;
  onValueChange: (value: string) => void;
}

export interface SwitchPickersProps {
  options: ProductVerifiedOption[];
  currentOptions: Record<string, string>;
  onValueChange: (name: string, value: string) => void;
  components: {
    color: React.FC<ComponentProps<ProductColorOption>>;
    image: React.FC<ComponentProps<ProductImageOption>>;
    list: React.FC<ComponentProps<ProductListOption>>;
    select: React.FC<ComponentProps<ProductSelectOption>>;
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
