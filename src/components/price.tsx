import { formatPrice } from '@/lib/utils';

interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: string | number;
  currencyCode: string;
  quantity?: number;
}

export function Price({
  amount,
  currencyCode,
  quantity = 1,
  className,
  ...props
}: PriceProps) {
  return (
    <span className={className} {...props}>
      {formatPrice(amount, currencyCode, quantity)}
    </span>
  );
}
