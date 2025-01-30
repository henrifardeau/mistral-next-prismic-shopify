'use client';

import clsx from 'clsx';

import { useProduct } from '@/hooks/use-product';
import { cn } from '@/lib/cn';

export default function VariantSelector() {
  const { productOptions, currentOptions, currentVariant, updateOption } =
    useProduct();

  return (
    <div className="space-y-2">
      {productOptions.map((option) => (
        <ul
          key={option.id}
          className="flex items-center justify-center space-x-2"
        >
          {option.optionValues.map((optionValue) => (
            <li key={optionValue.id}>
              <button
                onClick={() => updateOption(option.name, optionValue.name)}
                className={cn(
                  'rounded-full border border-black px-3 py-1',
                  clsx(
                    currentOptions[option.name] === optionValue.name &&
                      'bg-black text-white',
                  ),
                )}
              >
                {optionValue.name}
              </button>
            </li>
          ))}
        </ul>
      ))}
      {currentVariant.id}
    </div>
  );
}
