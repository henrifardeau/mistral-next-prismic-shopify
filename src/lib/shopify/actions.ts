'use server';

import { getIronSession } from 'iron-session';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { shopify } from '@/lib/shopify';

import {
  AddCartLine,
  CartSession,
  RemoveCartLine,
  UpdateCartLine,
} from './types';

function revalidateCart() {
  revalidateTag('getCart');
}

export async function getCart() {
  const cartSession = await getIronSession<CartSession>(
    await cookies(),
    shopify.cartSessionOptions,
  );
  if (!cartSession.cartId) {
    return undefined;
  }

  const shopifyCart = await shopify.getCart(cartSession.cartId, {
    tags: ['getCart'],
  });
  // Old carts becomes `null` when you checkout.
  if (!shopifyCart.cart) {
    return undefined;
  }

  return shopify.reshapeCart(shopifyCart);
}

export async function createCart(lines?: AddCartLine[]) {
  const cartSession = await getIronSession<CartSession>(
    await cookies(),
    shopify.cartSessionOptions,
  );

  const shopifyCart = await shopify.createCart(lines || []);
  if (!shopifyCart.cartCreate?.cart) {
    throw new Error('Fail to create cart');
  }

  cartSession.cartId = shopifyCart.cartCreate.cart.id;
  cartSession.cartCheckoutUrl = shopifyCart.cartCreate.cart.checkoutUrl;

  await cartSession.save();

  return shopify.reshapeCart(shopifyCart.cartCreate);
}

export async function addCartLines(lines: AddCartLine[]) {
  try {
    const existingCart = (await getCart()) as { id: string };
    if (existingCart) {
      await shopify.addCartLines(existingCart.id, lines);
    } else {
      await createCart(lines);
    }

    revalidateCart();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateCartLines(lines: UpdateCartLine[]) {
  const cartSession = await getIronSession<CartSession>(
    await cookies(),
    shopify.cartSessionOptions,
  );
  if (!cartSession.cartId) {
    throw new Error('Cart not found');
  }

  await shopify.updateCartLines(cartSession.cartId, lines);

  revalidateCart();
}

export async function removeCartLines(lines: RemoveCartLine[]) {
  const cartSession = await getIronSession<CartSession>(
    await cookies(),
    shopify.cartSessionOptions,
  );
  if (!cartSession.cartId) {
    throw new Error('Cart not found');
  }

  await shopify.removeCartLines(cartSession.cartId, lines);

  revalidateCart();
}

export async function redirectToCheckout() {
  const cartSession = await getIronSession<CartSession>(
    await cookies(),
    shopify.cartSessionOptions,
  );
  if (!cartSession.cartId) {
    throw new Error('Cart not found');
  }

  redirect(cartSession.cartCheckoutUrl);
}
