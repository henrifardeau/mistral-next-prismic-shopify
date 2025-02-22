import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { clamp } from '@/lib/utils';

export function QuantityInput({
  quantity,
  minQuantity = 1,
  maxQuantity = 99,
  updateQuantity,
}: {
  quantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  updateQuantity: (n: number) => void;
}) {
  const [inputQuantity, setInputQuantity] = useState(quantity);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!editing) {
      setInputQuantity(quantity);
    }
  }, [quantity, editing]);

  const handleQuantityChange = (delta: number) => {
    updateQuantity(clamp(quantity + delta, minQuantity, maxQuantity));
  };

  const handleInputChange = (value: string) => {
    if (value.trim() === '') {
      return;
    }

    const n = parseInt(value, 10);
    if (!isNaN(n) && n !== inputQuantity) {
      setInputQuantity(n);
    }
  };

  const handleInputBlur = (value: string) => {
    setEditing(false);

    const n = parseInt(value, 10);
    if (!isNaN(n)) {
      const clampedValue = clamp(n, minQuantity, maxQuantity);
      if (clampedValue !== quantity) {
        updateQuantity(clampedValue);
      }
    } else {
      setInputQuantity(quantity);
    }
  };

  return (
    <div className="flex items-center border p-1">
      <button
        type="button"
        aria-label="Decrement"
        onClick={() => handleQuantityChange(-1)}
        disabled={quantity <= minQuantity}
        aria-disabled={quantity <= minQuantity}
        className="cursor-pointer p-3 transition-colors hover:bg-neutral-100 focus:hover:bg-neutral-100 disabled:cursor-default disabled:bg-transparent disabled:opacity-30"
      >
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        min={minQuantity}
        max={maxQuantity}
        value={inputQuantity}
        onFocus={() => setEditing(true)}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={(e) => handleInputBlur(e.target.value)}
        className="mx-1 w-8 [appearance:textfield] text-center text-lg font-medium focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label="Increment"
        onClick={() => handleQuantityChange(1)}
        disabled={quantity >= maxQuantity}
        aria-disabled={quantity >= maxQuantity}
        className="cursor-pointer p-3 transition-colors hover:bg-neutral-100 focus:hover:bg-neutral-100 disabled:cursor-default disabled:bg-transparent disabled:opacity-30"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
