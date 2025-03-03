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
  const formatter = getLazyFormatter('fr-FR', options);
  const priceNumber =
    typeof price === 'string' ? toNumber(price) * quantity : price * quantity;

  return formatter.format(priceNumber);
}

export function clamp(target: number, min: number, max: number): number {
  return Math.max(min, Math.min(target, max));
}

export function toNumber(n: string): number {
  return parseFloat(n);
}
