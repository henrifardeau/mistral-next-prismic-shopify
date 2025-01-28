'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { shopify } from '@/lib/shopify';
import { safeJSON } from '@/lib/utils';
import {
  AddToCartLine,
  Cart,
  RemoveToCartLine,
  UpdateToCartLine,
} from '@/types/cart';
import { revalidateTag } from 'next/cache';

type CartCookie = z.infer<typeof cartCookieSchema>;

const cartCookieSchema = z.object({
  cartId: z.string().nonempty(),
  cartCheckoutUrl: z.string().nonempty(),
});

function revalidateCart() {
  revalidateTag('getCart');
}

async function getCartCookie(): Promise<CartCookie | undefined> {
  const cookiesStore = await cookies();

  const existingCart = cookiesStore.get(shopify.cartCookieName);
  if (!existingCart) {
    return undefined;
  }

  const existingCartValue = safeJSON(existingCart.value);
  if (!existingCartValue) {
    console.error('Cart malformated');
    return undefined;
  }

  try {
    return cartCookieSchema.parse(existingCartValue);
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function getCart(): Promise<Cart | undefined> {
  const cartFromCookie = await getCartCookie();
  if (!cartFromCookie) {
    return undefined;
  }

  const shopifyCart = await shopify.getCart(cartFromCookie.cartId, {
    tags: ['getCart'],
  });
  // Old carts becomes `null` when you checkout.
  if (!shopifyCart.cart) {
    return undefined;
  }

  return shopify.reshapeCart(shopifyCart.cart);
}

export async function createCart(lines?: AddToCartLine[]): Promise<Cart> {
  const cookiesStore = await cookies();

  const shopifyCart = await shopify.createCart(lines || []);
  if (!shopifyCart.cartCreate?.cart) {
    throw new Error('Fail to create cart');
  }

  cookiesStore.set({
    name: shopify.cartCookieName,
    value: JSON.stringify({
      cartId: shopifyCart.cartCreate.cart.id,
      cartCheckoutUrl: shopifyCart.cartCreate.cart.checkoutUrl,
    } as CartCookie),
    ...shopify.cartCookieOptions,
  });

  return shopify.reshapeCart(shopifyCart.cartCreate.cart);
}

export async function addVariantToCart(lines: AddToCartLine[]) {
  try {
    const existingCart = (await getCart()) as { id: string };
    if (existingCart) {
      await shopify.addVariantToCart(existingCart.id, lines);
    } else {
      await createCart(lines);
    }

    revalidateCart();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateVariantToCart(lines: UpdateToCartLine[]) {
  try {
    const cartFromCookie = await getCartCookie();
    if (!cartFromCookie) {
      throw new Error('Cart not found');
    }

    await shopify.updateVariantToCart(cartFromCookie.cartId, lines);

    revalidateCart();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function removeVariantToCart(lines: RemoveToCartLine[]) {
  try {
    const cartFromCookie = await getCartCookie();
    if (!cartFromCookie) {
      throw new Error('Cart not found');
    }

    await shopify.removeVariantToCart(cartFromCookie.cartId, lines);

    revalidateCart();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function redirectToCheckout() {
  const cartFromCookie = await getCartCookie();
  if (!cartFromCookie) {
    throw new Error('Cart not found');
  }

  redirect(cartFromCookie.cartCheckoutUrl);
}
