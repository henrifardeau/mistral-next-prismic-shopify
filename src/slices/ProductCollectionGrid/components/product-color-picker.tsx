'use client';

import { useProduct } from '@/hooks/use-product';
import { cn } from '@/lib/cn';

export function ProductColorPicker() {
  const product = useProduct((state) => state.product);
  const options = useProduct((state) => state.options);
  const currentOptions = useProduct((state) => state.currentOptions);
  const updateOption = useProduct((state) => state.updateOption);

  if (
    !options.length ||
    (options.length === 1 && options[0]?.optionValues.length === 1)
  ) {
    return null;
  }

  const colorOptions = options.find((opts) => opts.type === 'color');
  if (!colorOptions) {
    return null;
  }

  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {colorOptions.optionValues.map((optionValue) => (
        <div key={optionValue.name}>
          <input
            id={`${product.id}_${colorOptions.name}_${optionValue.name}`}
            type="radio"
            name={colorOptions.name}
            value={optionValue.name}
            onChange={() => updateOption(colorOptions.name, optionValue.name)}
            className="peer absolute appearance-none"
          />
          <label
            htmlFor={`${product.id}_${colorOptions.name}_${optionValue.name}`}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border border-black p-1 font-medium ring ring-transparent transition-colors peer-focus:ring-black hover:ring-black',
              currentOptions[colorOptions.name] === optionValue.name &&
                'ring-black',
            )}
          >
            <span
              className="h-full w-full rounded-full text-transparent"
              style={{
                backgroundColor: optionValue.swatch.color,
              }}
            >
              <span className="sr-only">{optionValue.name}</span>
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}
