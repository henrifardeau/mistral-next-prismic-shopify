'use client';

import { useProduct } from '@/hooks/use-product';

import { Price } from '../price';

export function ProductPrice() {
  const variant = useProduct((state) => state.currentVariant);

  return (
    <div className="flex items-center justify-start space-x-2">
      <Price
        amount={variant.price.amount}
        currencyCode={variant.price.currencyCode}
      />
      {variant.compareAtPrice && (
        <Price
          className="line-through"
          amount={variant.compareAtPrice.amount}
          currencyCode={variant.compareAtPrice.currencyCode}
        />
      )}
    </div>
  );
}
