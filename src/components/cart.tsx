import { CircleX } from 'lucide-react';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import { cn } from '@/lib/cn';
import { useCallback } from 'react';
import { toNumber } from '@/lib/utils';
import { redirectToCheckout, shopify } from '@/lib/shopify';
import Link from 'next/link';

export const CartSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) => {
  return <hr className={cn('border-black', className)} {...props} />;
};
CartSeparator.displayName = 'CartSeparator';

export const CartHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[auto_auto_1fr] items-center gap-6 pt-5 pb-6',
        className,
      )}
      {...props}
    />
  );
};
CartHeader.displayName = 'CartHeader';

interface CartLengthProps extends React.HTMLAttributes<HTMLSpanElement> {
  suffix?: string;
}

export const CartLength = ({
  className,
  suffix = 'items',
}: CartLengthProps) => {
  const { cartLength } = useCartStore();

  return (
    <span
      className={cn(
        'mt-1 rounded-full border border-black px-2 py-1 text-xs uppercase',
        className,
      )}
    >
      {cartLength} {suffix}
    </span>
  );
};
CartLength.displayName = 'CartLength';

export const CartClose = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { closeCart } = useCartDrawer();

  return (
    <button
      onClick={props.onClick || closeCart}
      className={cn('justify-self-end rounded-full', className)}
    >
      <CircleX />
      <span className="sr-only">Close your cart</span>
    </button>
  );
};
CartClose.displayName = 'CartClose';

export const CartContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('flex grow flex-col justify-between space-y-4', className)}
      {...props}
    />
  );
};
CartContent.displayName = 'CartContent';

export const CartLines = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  return <ul className={cn('space-y-4', className)} {...props} />;
};
CartLines.displayName = 'CartLines';

interface CartLineProps {
  product: {
    title: string;
    handle: string;
  };
  variant: {
    title: string;
  };
  quantity: number;
  price: string;
  currencyCode: string;
  incrementAction: () => Promise<void>;
  decrementAction: () => Promise<void>;
  removeAction: () => Promise<void>;
  closeCart: () => void;
}

export const CartLine = ({
  product,
  variant,
  quantity,
  price,
  currencyCode,
  incrementAction,
  decrementAction,
  removeAction,
  closeCart,
}: CartLineProps) => {
  const totalPrice = useCallback(() => {
    try {
      const priceAsNumber = toNumber(price);

      return shopify.formatPrice(priceAsNumber * quantity, currencyCode);
    } catch (err) {
      console.error(err);
      return 'NaN';
    }
  }, [quantity, price, currencyCode]);

  return (
    <li className="space-y-2 border p-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <Link href={`/products/${product.handle}`} onClick={closeCart}>
            {product.title}
          </Link>
          <span>{variant.title}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="rounded-full bg-black p-2 text-white">
            {quantity}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <form action={decrementAction}>
            <button className="rounded-full bg-black p-2 text-xs text-white">
              Minus
            </button>
          </form>
          <form action={incrementAction}>
            <button className="rounded-full bg-black p-2 text-xs text-white">
              Plus
            </button>
          </form>
          <form action={removeAction}>
            <button className="rounded-full bg-black p-2 text-xs text-white">
              Remove
            </button>
          </form>
        </div>
        <span>{totalPrice()}</span>
      </div>
    </li>
  );
};
CartLine.displayName = 'CartLine';

export const CartSummary = ({ children }: { children: React.ReactNode }) => {
  const { cartSubTotal } = useCartStore();

  return (
    <div className="pt-5">
      <div className="flex items-center justify-between text-sm uppercase">
        <span>Subtotal</span>
        <span>{cartSubTotal}</span>
      </div>
      {children}
    </div>
  );
};
CartSummary.displayName = 'CartSummary';

export const CartCheckout = ({ disabled }: { disabled: boolean }) => {
  return (
    <form action={redirectToCheckout} className="pt-4">
      <button
        type="submit"
        disabled={disabled}
        className="flex w-full items-center justify-center rounded-full bg-black p-4 text-xs text-white uppercase disabled:opacity-50"
      >
        Continue to Checkout
      </button>
    </form>
  );
};
CartCheckout.displayName = 'CartCheckout';
