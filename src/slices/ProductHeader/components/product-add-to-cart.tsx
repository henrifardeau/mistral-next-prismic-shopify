'use client';

import { useState } from 'react';

import { addCartLines } from '@/api/actions';
import { Price } from '@/components/price';
import { QuantityInput } from '@/components/quantity-input';
import { useCart } from '@/hooks/use-cart';
import { useProduct } from '@/hooks/use-product';

export function ProductAddToCart() {
  const { optimisticAddCartLine } = useCart();

  const product = useProduct((state) => state.product);
  const variant = useProduct((state) => state.currentVariant);

  const [quantity, setQuantity] = useState<number>(1);

  return (
    <form
      action={async () => {
        optimisticAddCartLine({ product, variant, quantity });
        await addCartLines([{ variantId: variant.id, quantity }]);
      }}
      className="flex space-x-4"
    >
      <QuantityInput
        quantity={quantity}
        updateQuantity={(quantity: number) => setQuantity(quantity)}
      />
      <button
        type="submit"
        className="w-full cursor-pointer space-x-2 bg-black px-3 py-3 font-medium text-white transition-colors hover:bg-neutral-700 focus:bg-neutral-700"
      >
        <span>Add to cart</span>
        <span>-</span>
        <Price
          amount={variant.price.amount}
          currencyCode={variant.price.currencyCode}
          quantity={quantity}
        />
      </button>
    </form>
  );
}
