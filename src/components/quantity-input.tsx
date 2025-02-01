import { Minus, Plus } from 'lucide-react';

export function QuantityInput({
  quantity,
  updateQuantity,
}: {
  quantity: number;
  updateQuantity: (n: number) => void;
}) {
  const handleInputChange = (value: string | number) => {
    const n = typeof value === 'string' ? Number(value) : value;

    if (n !== quantity) {
      updateQuantity(!Number.isNaN(n) && n >= 1 ? n : 1);
    }
  };

  return (
    <div className="flex items-center border p-1">
      <button
        aria-label="Decrement"
        onClick={() => handleInputChange(quantity - 1)}
        disabled={quantity <= 1}
        className="cursor-pointer p-3 transition-colors hover:bg-neutral-100 focus:hover:bg-neutral-100 disabled:cursor-default disabled:bg-transparent disabled:opacity-30"
      >
        <Minus className="size-4" />
      </button>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => handleInputChange(e.target.value)}
        className="mx-1 w-8 [appearance:textfield] text-center text-lg font-medium focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        aria-label="Increment"
        onClick={() => handleInputChange(quantity + 1)}
        disabled={quantity >= 99}
        className="cursor-pointer p-3 transition-colors hover:bg-neutral-100 focus:hover:bg-neutral-100 disabled:cursor-default disabled:bg-transparent disabled:opacity-30"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
