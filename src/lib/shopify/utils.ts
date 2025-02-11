import { toNumber } from '../utils';

const formatterCache = new Map<string, Intl.NumberFormat>();

function getLazyFormatter(
  locale: string,
  options?: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const key = JSON.stringify([locale, options]);

  let formatter = formatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    formatterCache.set(key, formatter);
  }

  return formatter;
}

export function formatPrice(
  price: number | string,
  currencyCode: string,
  quantity: number = 1,
  options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencyCode,
  },
): string {
  const formatter = getLazyFormatter('fr-CA', options);
  const priceNumber =
    typeof price === 'string' ? toNumber(price) * quantity : price * quantity;

  return formatter.format(priceNumber);
}
