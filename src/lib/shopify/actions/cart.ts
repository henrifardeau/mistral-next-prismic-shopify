'use server';

import { getIronSession, IronSession } from 'iron-session';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { shopify } from '@/lib/shopify';

import {
  AddCartLine,
  CartSession,
  CustomerSession,
  RemoveCartLine,
  UpdateCartLine,
} from '../types';

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
    tags: ['getCart', cartSession.cartId],
  });
  // Old carts becomes `null` when you checkout.
  if (!shopifyCart.cart) {
    return undefined;
  }

  return shopify.reshapeCart(shopifyCart);
}

export async function createCart(lines?: AddCartLine[]) {
  const cookieStore = await cookies();

  const [customerSession, cartSession] = await Promise.all([
    getIronSession<CustomerSession>(
      cookieStore,
      shopify.customerSessionOptions,
    ),
    getIronSession<CartSession>(cookieStore, shopify.cartSessionOptions),
  ]);

  const shopifyCart = await shopify.createCart(
    lines || [],
    customerSession.accessToken,
  );
  if (!shopifyCart.cartCreate?.cart) {
    throw new Error('Fail to create cart');
  }

  cartSession.cartId = shopifyCart.cartCreate.cart.id;
  cartSession.cartCheckoutUrl = shopifyCart.cartCreate.cart.checkoutUrl;

  await cartSession.save();

  return shopify.reshapeCart(shopifyCart.cartCreate);
}

export async function addCartLines(lines: AddCartLine[]) {
  const existingCart = (await getCart()) as { id: string };
  if (existingCart) {
    await shopify.addCartLines(existingCart.id, lines);
  } else {
    await createCart(lines);
  }

  revalidateCart();
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

export async function updateCartCustomer(
  cartSession: IronSession<CartSession>,
  customerSession: IronSession<CustomerSession>,
) {
  const shopifyCart = await shopify.updateCartCustomer(
    cartSession.cartId,
    customerSession.accessToken,
  );

  if (!shopifyCart.cartBuyerIdentityUpdate?.cart) {
    throw new Error('Fail to update cart');
  }

  cartSession.cartId = shopifyCart.cartBuyerIdentityUpdate.cart.id;
  cartSession.cartCheckoutUrl =
    shopifyCart.cartBuyerIdentityUpdate.cart.checkoutUrl;

  await cartSession.save();

  return shopifyCart;
}
