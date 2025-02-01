'use client';

import { useCartStore } from '@/hooks/use-cart-store';
import { useProduct } from '@/hooks/use-product';
import { addCartLines, shopify } from '@/lib/shopify';

export function ProductAddToCart() {
  const { addCartLine } = useCartStore();

  const product = useProduct((state) => state.product);
  const variant = useProduct((state) => state.currentVariant);

  return (
    <form
      action={async () => {
        addCartLine({ product, variant });
        await addCartLines([{ variantId: variant.id }]);
      }}
    >
      <button className="w-full cursor-pointer space-x-2 bg-black py-4 font-medium text-white transition-colors hover:bg-neutral-700 focus:bg-neutral-700">
        <span>Add to cart</span>
        <span>-</span>
        <span>
          {shopify.formatPrice(
            variant.price.amount,
            variant.price.currencyCode,
          )}
        </span>
      </button>
    </form>
  );
}
