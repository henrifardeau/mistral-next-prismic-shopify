'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { shopify } from '@/lib/shopify';
import { removeEdgesAndNodes, safeJSON } from '@/lib/utils';
import {
  AddToCartLine,
  Cart,
  RemoveToCartLine,
  UpdateToCartLine,
} from '@/types/cart';

const cartCookieSchema = z.object({
  cartId: z.string().nonempty(),
  cartCheckoutUrl: z.string().nonempty(),
});

export async function getCart(): Promise<Cart | undefined> {
  const cookiesStore = await cookies();

  const existingCart = cookiesStore.get(shopify.cartCookieName);
  if (!existingCart?.value) {
    return undefined;
  }

  const existingCartValue = safeJSON(existingCart.value);
  if (!existingCartValue) {
    return undefined;
  }

  const parsedCartFromCookie = cartCookieSchema.safeParse(existingCartValue);
  if (!parsedCartFromCookie.success) {
    return undefined;
  }

  const shopifyCart = await shopify.getCart(parsedCartFromCookie.data.cartId);
  // Old carts becomes `null` when you checkout.
  if (!shopifyCart.cart) {
    return undefined;
  }

  return {
    ...shopifyCart.cart,
    lines: removeEdgesAndNodes(shopifyCart.cart.lines),
  };
}

export async function createCart(): Promise<Cart> {
  const cookiesStore = await cookies();

  const shopifyCart = await shopify.createCart();
  if (!shopifyCart.cartCreate?.cart) {
    throw new Error('Fail to create cart');
  }

  cookiesStore.set({
    name: shopify.cartCookieName,
    value: JSON.stringify({
      cartId: shopifyCart.cartCreate.cart.id,
      cartCheckoutUrl: shopifyCart.cartCreate.cart.checkoutUrl,
    } as z.infer<typeof cartCookieSchema>),
    ...shopify.cartCookieOptions,
  });

  return {
    ...shopifyCart.cartCreate.cart,
    lines: removeEdgesAndNodes(shopifyCart.cartCreate.cart.lines),
  };
}

export async function getOrCreateCart(): Promise<Cart> {
  const cookiesStore = await cookies();

  const existingCart = cookiesStore.get(shopify.cartCookieName);
  if (existingCart?.value) {
    const existingCartValue = safeJSON(existingCart.value);
    if (existingCartValue) {
      const cartFromCookie = cartCookieSchema.safeParse(existingCartValue);
      if (cartFromCookie.success) {
        const shopifyCart = await shopify.getCart(cartFromCookie.data.cartId);
        if (shopifyCart.cart) {
          return {
            ...shopifyCart.cart,
            lines: removeEdgesAndNodes(shopifyCart.cart.lines),
          };
        }
      }
    }
  }

  const shopifyCart = await shopify.createCart();
  if (!shopifyCart.cartCreate?.cart) {
    throw new Error('Failed to create cart');
  }

  cookiesStore.set({
    name: shopify.cartCookieName,
    value: JSON.stringify({
      cartId: shopifyCart.cartCreate.cart.id,
      cartCheckoutUrl: shopifyCart.cartCreate.cart.checkoutUrl,
    } as z.infer<typeof cartCookieSchema>),
    ...shopify.cartCookieOptions,
  });

  return {
    ...shopifyCart.cartCreate.cart,
    lines: removeEdgesAndNodes(shopifyCart.cartCreate.cart.lines),
  };
}

export async function addVariantToCart(lines: AddToCartLine[]) {
  try {
    const cookiesStore = await cookies();

    const existingCart = cookiesStore.get(shopify.cartCookieName);
    const parsedCartFromCookie = cartCookieSchema.parse(existingCart?.value);

    await shopify.addVariantToCart(parsedCartFromCookie.cartId, lines);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateVariantToCart(lines: UpdateToCartLine[]) {
  try {
    const cookiesStore = await cookies();

    const existingCart = cookiesStore.get(shopify.cartCookieName);
    const parsedCartFromCookie = cartCookieSchema.parse(existingCart?.value);

    await shopify.updateVariantToCart(parsedCartFromCookie.cartId, lines);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function removeVariantToCart(lines: RemoveToCartLine[]) {
  try {
    const cookiesStore = await cookies();

    const existingCart = cookiesStore.get(shopify.cartCookieName);
    const parsedCartFromCookie = cartCookieSchema.parse(existingCart?.value);

    await shopify.removeVariantToCart(parsedCartFromCookie.cartId, lines);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function redirectToCheckout() {
  const cookiesStore = await cookies();

  const existingCart = cookiesStore.get(shopify.cartCookieName);
  if (!existingCart) {
    console.error('Cart not found');
    return;
  }

  const existingCartValue = safeJSON(existingCart.value);
  if (!existingCartValue) {
    console.error('Cart malformated');
    return;
  }

  const { success, data } = cartCookieSchema.safeParse(existingCartValue);
  if (!success) {
    console.error('Cart malformated');
    return;
  }

  redirect(data.cartCheckoutUrl);
}
