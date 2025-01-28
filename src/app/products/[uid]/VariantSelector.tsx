'use client';

import { LongProductByIdQuery } from '@/lib/shopify/gql/graphql';
import { useMemo, useState } from 'react';

function getOptions(shopifyProduct: LongProductByIdQuery) {
  if (!shopifyProduct.product?.variants) {
    return [];
  }

  const map = shopifyProduct.product.variants.nodes.reduce(
    (options, variant) => {
      if (!variant.selectedOptions) {
        throw new Error(`'getOptions' requires 'variant.selectedOptions'`);
      }

      variant.selectedOptions.forEach((opt) => {
        if (!options[opt.name]) {
          options[opt.name] = new Set();
        }

        options[opt.name].add(opt.value);
      });

      return options;
    },
    {} as Record<string, Set<string>>,
  );

  return Object.keys(map).map((option) => {
    return {
      name: option,
      values: Array.from(map[option]),
    };
  });
}

function initialOptions(
  options: {
    name: string;
    values: string[];
  }[],
) {
  return options.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.name]: cur.values[0],
    };
  }, {});
}

function findVariant(
  shopifyProduct: LongProductByIdQuery,
  options: Record<string, string>,
) {
  return shopifyProduct.product?.variants.nodes.find((variant) =>
    variant.selectedOptions.every((opt) => options[opt.name] === opt.value),
  );
}

export default function VariantSelector({
  shopifyProduct,
}: {
  shopifyProduct: LongProductByIdQuery;
}) {
  const options = useMemo(() => getOptions(shopifyProduct), [shopifyProduct]);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(initialOptions(options));

  const [selectedVariant, setSelectedVariant] = useState<
    { id: string } | null | undefined
  >(findVariant(shopifyProduct, selectedOptions));

  const onSelectOption = (optionName: string, optionValue: string) => {
    const updatedOptions = { ...selectedOptions, [optionName]: optionValue };
    setSelectedOptions(updatedOptions);

    const matchingVariant = findVariant(shopifyProduct, updatedOptions);
    setSelectedVariant(matchingVariant || null);
  };

  return (
    <div>
      <h2>{shopifyProduct.product?.title}</h2>
      {options.map((option) => (
        <div key={option.name}>
          {option.values.map((optionValue) => (
            <div key={optionValue}>
              <input
                type="radio"
                id={optionValue}
                name={option.name}
                value={optionValue}
                checked={selectedOptions[option.name] === optionValue}
                onChange={() => onSelectOption(option.name, optionValue)}
              />
              <label htmlFor={optionValue}>{optionValue}</label>
            </div>
          ))}
        </div>
      ))}
      {selectedVariant && (
        <button className="rounded-full bg-black px-4 py-2 text-white">
          Add to cart
        </button>
      )}
    </div>
  );
}
