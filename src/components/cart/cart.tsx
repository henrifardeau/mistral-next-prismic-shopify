import { CircleX } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export const CartHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'grid grid-cols-[auto_auto_1fr] items-center gap-6 border-t border-black pt-5 pb-6',
      className,
    )}
    {...props}
  />
);
CartHeader.displayName = 'CartHeader';

export const CartLength = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'mt-1 rounded-full border border-black px-2 py-1 text-xs uppercase',
      className,
    )}
    {...props}
  />
);
CartLength.displayName = 'CartLength';

export const CartClose = ({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    className={cn('justify-self-end rounded-full', className)}
    {...props}
  >
    <CircleX />
    <span className="sr-only">Close your cart</span>
  </button>
);
CartClose.displayName = 'CartClose';

export const CartSummary = ({
  subTotal,
  children,
}: PropsWithChildren<{ subTotal: string }>) => (
  <div className="space-y-4 border-t border-black pt-5">
    <div className="flex items-center justify-between text-sm uppercase">
      <span>Subtotal</span>
      <span>{subTotal}</span>
    </div>
    {children}
  </div>
);
CartSummary.displayName = 'CartSummary';

interface CartCheckout extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action: () => Promise<void>;
}

export const CartCheckout = ({
  action,
  className,
  disabled,
  ...props
}: CartCheckout) => (
  <form action={action}>
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center rounded-full bg-black p-4 text-xs text-white uppercase transition-opacity disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </form>
);

CartCheckout.displayName = 'CartCheckout';

export const CartContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex grow flex-col justify-between space-y-4', className)}
    {...props}
  />
);
CartContent.displayName = 'CartContent';

export const CartList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={className} {...props} />
);
CartList.displayName = 'CartList';
