import { CircleX } from 'lucide-react';
import { PropsWithChildren, useCallback } from 'react';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { useCartStore } from '@/hooks/use-cart-store';
import { cn } from '@/lib/cn';
import { redirectToCheckout } from '@/lib/shopify';

export const CartHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[auto_auto_1fr] items-center gap-6 border-t border-black pt-5 pb-6',
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

export const CartSummary = ({ children }: PropsWithChildren) => {
  const { cartSubTotal } = useCartStore();

  return (
    <div className="border-t border-black pt-5">
      <div className="flex items-center justify-between text-sm uppercase">
        <span>Subtotal</span>
        <span>{cartSubTotal}</span>
      </div>
      {children}
    </div>
  );
};
CartSummary.displayName = 'CartSummary';

export const CartCheckout = () => {
  const { optimisticCart } = useCartStore();

  const disableCheckout = useCallback(() => {
    return !optimisticCart?.lines.length || optimisticCart.state !== 'idle';
  }, [optimisticCart?.lines.length, optimisticCart?.state]);

  return (
    <form action={redirectToCheckout} className="pt-4">
      <button
        type="submit"
        disabled={disableCheckout()}
        className="flex w-full items-center justify-center rounded-full bg-black p-4 text-xs text-white uppercase transition-opacity disabled:opacity-50"
      >
        Continue to Checkout
      </button>
    </form>
  );
};
CartCheckout.displayName = 'CartCheckout';

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

export const CartList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => {
  return <ul className={className} {...props} />;
};
CartList.displayName = 'CartList';
