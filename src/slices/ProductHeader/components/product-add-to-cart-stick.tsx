'use client';

import { useProduct } from '@/hooks/use-product';

import { ProductAddToCart } from './product-add-to-cart';

export function ProductAddToCartStick() {
  const product = useProduct((state) => state.product);
  const variant = useProduct((state) => state.currentVariant);

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 translate-y-full border-t bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col space-y-1">
          <span>{product.title}</span>
          <span className="text-neutral-600">{variant.title}</span>
        </div>
        <div className="flex gap-8">
          {variant.selectedOptions.map((option) => (
            <div key={option.name} className="flex flex-col justify-center">
              <span className="text-neutral-600">{option.name}:</span>
              <span>{option.value}</span>
            </div>
          ))}
        </div>
        <ProductAddToCart />
      </div>
    </aside>
  );
}
