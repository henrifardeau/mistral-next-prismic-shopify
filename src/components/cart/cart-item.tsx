'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCartLine } from '@/hooks/use-cart-line';
import { cn } from '@/lib/cn';
import { formatPrice, toNumber } from '@/lib/utils';

import { QuantityInput } from '../quantity-input';

export const CartItem = () => {
  return (
    <li className="space-y-6 not-first:pt-4 not-last:pb-4">
      <div className="grid grid-cols-[112px_1fr] gap-2">
        <CartItemThumbnail />
        <div className="flex flex-col justify-between">
          <CartItemHeader>
            <CartItemTitle />
            <CartItemDescription />
          </CartItemHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <CartItemQuantitySelect />
              <CartItemRemoveButton />
            </div>
            <CartItemPrice />
          </div>
        </div>
      </div>
    </li>
  );
};
CartItem.displayName = 'CartItem';

const CartItemThumbnail = () => {
  const { line } = useCartLine();

  return (
    <Link
      href={`/products/${line?.product.handle}`}
      className="flex items-center justify-center"
    >
      <Image
        width={112}
        height={112}
        src={line?.variant.image.src || 'https://placehold.co/112x112'}
        alt={line?.variant.image.altText || 'Placeholder image'}
      />
    </Link>
  );
};
CartItemThumbnail.displayName = 'CartItemThumbnail';

const CartItemHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props} />
);
CartItemHeader.displayName = 'CartItemHeader';

const CartItemTitle = () => {
  const { line } = useCartLine();

  return (
    <Link
      href={`/products/${line?.product.handle}`}
      className="flex flex-col hover:underline"
    >
      <h2>{line?.product.title}</h2>
    </Link>
  );
};
CartItemTitle.displayName = 'CartItemTitle';

const CartItemDescription = () => {
  const { line } = useCartLine();

  return <span>{line?.variant.title}</span>;
};
CartItemDescription.displayName = 'CartItemDescription';

const CartItemQuantitySelect = ({ as }: { as?: 'input' | 'select' }) => {
  const { line, updateCartLine } = useCartLine();

  const handleUpdate = async (value: number) => {
    updateCartLine(value);
  };

  const handleSelectChange = (value: string) => {
    handleUpdate(toNumber(value));
  };

  if (as === 'select') {
    return (
      <Select
        name="quantity"
        value={`${line?.quantity || 0}`}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="w-16">
          <SelectValue placeholder="1" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((option) => (
            <SelectItem key={option} value={`${option}`}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <QuantityInput
      quantity={line?.quantity || 0}
      updateQuantity={handleUpdate}
    />
  );
};
CartItemQuantitySelect.displayName = 'CartItemQuantitySelect';

const CartItemRemoveButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { removeCartLine } = useCartLine();

  return (
    <form action={removeCartLine}>
      <button
        className={cn('bg-black px-2 py-4 text-xs text-white', className)}
        {...props}
      >
        Remove
      </button>
    </form>
  );
};
CartItemRemoveButton.displayName = 'CartItemRemoveButton';

const CartItemPrice = () => {
  const { line } = useCartLine();

  const totalPrice = useCallback(() => {
    try {
      return formatPrice(
        line?.variant.price.amount || 0,
        line?.variant.price.currencyCode || 'EUR',
        line?.quantity || 0,
      );
    } catch (err) {
      console.error(err);
      return 'NaN';
    }
  }, [
    line?.quantity,
    line?.variant.price.amount,
    line?.variant.price.currencyCode,
  ]);

  return (
    <div>
      <span className="font-medium">{totalPrice()}</span>
      <span className="sr-only">
        {line?.product.title} {line?.variant.title} total cost : {totalPrice()}
      </span>
    </div>
  );
};
CartItemPrice.displayName = 'CartItemPrice';
