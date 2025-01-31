'use client';

import { useProduct } from '@/hooks/use-product';
import { cn } from '@/lib/cn';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useMemo } from 'react';

const useOptionHandler = (name: string) => {
  const { currentOptions, updateOption } = useProduct();

  const currentOptionValue = useMemo(() => {
    return currentOptions[name];
  }, [currentOptions, name]);

  const handleOptionUpdate = (optionValue: string) => {
    updateOption(name, optionValue);
  };

  return { currentOptionValue, handleOptionUpdate };
};

const ProductOptionSelect = ({
  name,
  values,
}: {
  name: string;
  values: {
    name: string;
  }[];
}) => {
  const { currentOptionValue, handleOptionUpdate } = useOptionHandler(name);

  return (
    <Select
      name={name}
      value={currentOptionValue}
      onValueChange={handleOptionUpdate}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((optionValue) => (
            <SelectItem key={optionValue.name} value={optionValue.name}>
              {optionValue.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
ProductOptionSelect.displayName = 'ProductOptionSelect';

const ProductOptionColorSelect = ({
  name,
  values,
}: {
  name: string;
  values: {
    name: string;
    swatch: {
      color: string;
    };
  }[];
}) => {
  const { currentOptionValue, handleOptionUpdate } = useOptionHandler(name);

  return (
    <ul role="radiogroup" className="flex flex-wrap gap-2">
      {values.map((optionValue) => {
        const isSelected = currentOptionValue === optionValue.name;

        return (
          <li key={optionValue.name} className="relative">
            <input
              id={`${name}_${optionValue.name}`}
              type="radio"
              name={name}
              value={optionValue.name}
              onChange={(e) => handleOptionUpdate(e.target.value)}
              className="peer absolute appearance-none"
            />
            <label
              htmlFor={`${name}_${optionValue.name}`}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border border-transparent p-2 text-transparent transition-colors peer-focus:border-black hover:border-black',
                isSelected && 'border-black',
              )}
            >
              <span
                className="h-full w-full rounded-full"
                style={{
                  backgroundColor: optionValue.swatch.color,
                }}
              >
                {optionValue.name}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
ProductOptionColorSelect.displayName = 'ProductOptionColorSelect';

const ProductOptionSizeSelect = ({
  name,
  values,
}: {
  name: string;
  values: {
    name: string;
  }[];
}) => {
  const { currentOptionValue, handleOptionUpdate } = useOptionHandler(name);

  return (
    <ul role="radiogroup" className="flex flex-wrap gap-2">
      {values.map((optionValue) => {
        const isSelected = currentOptionValue === optionValue.name;

        return (
          <li key={optionValue.name} className="relative">
            <input
              id={`${name}_${optionValue.name}`}
              type="radio"
              name={name}
              value={optionValue.name}
              onChange={(e) => handleOptionUpdate(e.target.value)}
              className="peer absolute appearance-none"
            />
            <label
              htmlFor={`${name}_${optionValue.name}`}
              className={cn(
                'flex min-h-8 min-w-14 items-center justify-center rounded-full border border-black font-medium ring ring-transparent transition-colors peer-focus:ring-black hover:ring-black',
                isSelected && 'bg-black text-white',
              )}
            >
              {optionValue.name}
            </label>
          </li>
        );
      })}
    </ul>
  );
};
ProductOptionSizeSelect.displayName = 'ProductOptionSizeSelect';

export {
  ProductOptionSelect,
  ProductOptionColorSelect,
  ProductOptionSizeSelect,
};
