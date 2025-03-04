'use client';

import { removeCartLines, updateCartLines } from '@/api/actions';
import { useCart } from '@/hooks/use-cart';
import { CartLineProvider, useCartLine } from '@/hooks/use-cart-line';

export default function Page() {
  const { optimisticCart } = useCart();

  return (
    <ul>
      {optimisticCart?.lines.map((line) => (
        <CartLineProvider
          key={line.id}
          line={line}
          onLineIncrement={(lineId: string) => {
            console.log('Line Increment', lineId);
          }}
          onLineDecrement={(lineId: string) => {
            console.log('Line Decrement', lineId);
          }}
          onLineUpdate={async (lineId: string, quantity: number) => {
            console.log('Call to update cart line');
            await updateCartLines([{ lineId, quantity }]);
          }}
          onLineRemove={async (lineId: string) => {
            await removeCartLines([{ lineId }]);
          }}
        >
          <CartLine />
        </CartLineProvider>
      ))}
    </ul>
  );
}

function CartLine() {
  const { line, updateCartLine, removeCartLine } = useCartLine();

  return (
    <div>
      <h4>
        {line?.product.title} - {line?.variant.title} | {line?.quantity}
      </h4>
      <div className="space-x-4">
        <button
          onClick={() => updateCartLine((line?.quantity || 0) + 2)}
          className="bg-black p-2 text-white"
        >
          Add
        </button>
        <button
          onClick={() => removeCartLine()}
          className="bg-black p-2 text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
