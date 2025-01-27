'use server';

import { shopify } from '@/lib/shopify';

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
) {
  try {
    await shopify.updateCart({ cartId, lines });
  } catch (err) {
    console.error(err);
    return null;
  }
}
