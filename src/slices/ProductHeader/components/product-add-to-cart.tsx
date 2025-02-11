'use client';

import { useState } from 'react';

import { QuantityInput } from '@/components/quantity-input';
import { useCartStore } from '@/hooks/use-cart-store';
import { useProduct } from '@/hooks/use-product';
import { addCartLines } from '@/lib/shopify/actions';
import { formatPrice } from '@/lib/shopify/utils';

export function ProductAddToCart() {
  const { addCartLine } = useCartStore();

  const product = useProduct((state) => state.product);
  const variant = useProduct((state) => state.currentVariant);

  const [quantity, setQuantity] = useState<number>(1);

  return (
    <form
      action={async () => {
        addCartLine({ product, variant, quantity });
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
        <span>
          {formatPrice(
            variant.price.amount,
            variant.price.currencyCode,
            quantity,
          )}
        </span>
      </button>
    </form>
  );
}
