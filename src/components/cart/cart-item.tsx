import Image from 'next/image';
import Link from 'next/link';
import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
  useTransition,
} from 'react';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/lib/shopify/utils';
import { toNumber } from '@/lib/utils';
import { CartLine } from '@/types/cart';

import { QuantityInput } from '../quantity-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CartItemContextProps {
  line: CartLine;
  updateAction: (newQuantity: number) => Promise<void>;
  removeAction: () => Promise<void>;
}

const CartItemContext = createContext<CartItemContextProps | undefined>(
  undefined,
);

const useCartItem = () => {
  const context = useContext(CartItemContext);

  if (context === undefined) {
    throw new Error('useCartItem must be used within a CartItemProvider');
  }

  return context;
};

export const CartItem = ({
  line,
  updateAction,
  removeAction,
}: CartItemContextProps) => {
  const value = useMemo(() => {
    return {
      line,
      updateAction,
      removeAction,
    };
  }, [line, updateAction, removeAction]);

  return (
    <CartItemContext.Provider value={value}>
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
    </CartItemContext.Provider>
  );
};
CartItem.displayName = 'CartItem';

const CartItemThumbnail = () => {
  const closeCart = useCartDrawer((state) => state.closeCart);
  const { line } = useCartItem();

  return (
    <Link
      href={`/products/${line.product.handle}`}
      onClick={closeCart}
      className="flex items-center justify-center"
    >
      <Image
        width={112}
        height={112}
        src={line.variant.image.src || 'https://placehold.co/112x112'}
        alt={line.variant.image.altText || 'Placeholder image'}
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
  const closeCart = useCartDrawer((state) => state.closeCart);
  const { line } = useCartItem();

  return (
    <Link
      href={`/products/${line.product.handle}`}
      onClick={closeCart}
      className="flex flex-col hover:underline"
    >
      <h2>{line.product.title}</h2>
    </Link>
  );
};
CartItemTitle.displayName = 'CartItemTitle';

const CartItemDescription = () => {
  const { line } = useCartItem();

  return <span>{line.variant.title}</span>;
};
CartItemDescription.displayName = 'CartItemDescription';

const CartItemQuantitySelect = ({ as }: { as?: 'input' | 'select' }) => {
  const [, startUpdate] = useTransition();
  const { line, updateAction } = useCartItem();

  const handleUpdate = async (value: number) => {
    startUpdate(async () => {
      await updateAction(value);
    });
  };

  const handleSelectChange = (value: string) => {
    handleUpdate(toNumber(value));
  };

  if (as === 'select') {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Select
          name="quantity"
          value={`${line.quantity}`}
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
      </form>
    );
  }

  return (
    <QuantityInput quantity={line.quantity} updateQuantity={handleUpdate} />
  );
};
CartItemQuantitySelect.displayName = 'CartItemQuantitySelect';

const CartItemRemoveButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [, startRemove] = useTransition();
  const { removeAction } = useCartItem();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startRemove(async () => {
      await removeAction();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
  const { line } = useCartItem();

  const totalPrice = useCallback(() => {
    try {
      return formatPrice(
        line.variant.price.amount,
        line.variant.price.currencyCode,
        line.quantity,
      );
    } catch (err) {
      console.error(err);
      return 'NaN';
    }
  }, [
    line.quantity,
    line.variant.price.amount,
    line.variant.price.currencyCode,
  ]);

  return (
    <div>
      <span className="font-medium">{totalPrice()}</span>
      <span className="sr-only">
        {line.product.title} {line.variant.title} total cost : {totalPrice()}
      </span>
    </div>
  );
};
CartItemPrice.displayName = 'CartItemPrice';
