import Link from 'next/link';
import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
} from 'react';

import { useCartDrawer } from '@/hooks/use-cart-drawer';
import { cn } from '@/lib/cn';
import { shopify } from '@/lib/shopify';
import { toNumber } from '@/lib/utils';
import { CartLine } from '@/types/cart';

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
        <div className="grid grid-cols-[112px_1fr] grid-rows-[144px] gap-2">
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
      className="flex items-center justify-center bg-gray-100"
    >
      Image
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

const CartItemQuantitySelect = () => {
  const { line, updateAction } = useCartItem();

  const [, startUpdate] = useTransition();
  const [quantity, setQuantity] = useState<number>(line.quantity);

  const handleChange = async (value: string) => {
    setQuantity(toNumber(value));
    startUpdate(async () => {
      await updateAction(toNumber(value));
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Select
        name="quantity"
        value={`${quantity}`}
        onValueChange={handleChange}
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
        className={cn('h-10 bg-black p-2 text-xs text-white', className)}
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
      const priceAsNumber = toNumber(line.variant.price.amount);

      return shopify.formatPrice(
        priceAsNumber * line.quantity,
        line.variant.price.currencyCode,
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
