'use server';

import { getIronSession, IronSession } from 'iron-session';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';

import { shopify } from '@/lib/shopify';

import {
  AddCartLine,
  CartSession,
  CustomerSession,
  RemoveCartLine,
  UpdateCartLine,
} from '../types';

function revalidateCart(cartId: string) {
  revalidateTag(cartId);
}

async function getCartSession() {
  return await getIronSession<CartSession>(
    await cookies(),
    shopify.cart.sessionOptions,
  );
}

async function ensureCartSession() {
  const cartSession = await getCartSession();

  invariant(cartSession.cartId, 'Cart id is undefined');

  return cartSession;
}

export async function getCart() {
  const cartSession = await getCartSession();
  if (!cartSession.cartId) {
    return undefined;
  }

  const shopifyCart = await shopify.cart.get(cartSession.cartId, {
    tags: [cartSession.cartId],
  });
  // Old carts becomes `null` when you checkout.
  if (!shopifyCart.cart) {
    return undefined;
  }

  return shopify.cart.reshape(shopifyCart);
}

export async function createCart(lines?: AddCartLine[]) {
  const cookieStore = await cookies();

  const [customerSession, cartSession] = await Promise.all([
    getIronSession<CustomerSession>(
      cookieStore,
      shopify.customer.sessionOptions,
    ),
    getIronSession<CartSession>(cookieStore, shopify.cart.sessionOptions),
  ]);

  const shopifyCart = await shopify.cart.create(
    lines || [],
    customerSession.accessToken,
  );

  invariant(shopifyCart.cartCreate?.cart, 'Fail to create cart');

  cartSession.cartId = shopifyCart.cartCreate.cart.id;
  cartSession.cartCheckoutUrl = shopifyCart.cartCreate.cart.checkoutUrl;
  await cartSession.save();

  return shopify.cart.reshape(shopifyCart.cartCreate);
}

export async function addCartLines(lines: AddCartLine[]) {
  const shopifyCart = await getCart();

  let cartId: string = '';
  if (shopifyCart?.id) {
    await shopify.cart.addLines(shopifyCart.id, lines);

    cartId = shopifyCart.id;
  } else {
    const createdCart = await createCart(lines);

    invariant(createdCart.id, 'Fail to create cart');

    cartId = createdCart.id;
  }

  revalidateCart(cartId);
}

export async function updateCartLines(lines: UpdateCartLine[]) {
  const cartSession = await ensureCartSession();

  await shopify.cart.updateLines(cartSession.cartId, lines);

  revalidateCart(cartSession.cartId);
}

export async function removeCartLines(lines: RemoveCartLine[]) {
  const cartSession = await ensureCartSession();

  await shopify.cart.removeLines(cartSession.cartId, lines);

  revalidateCart(cartSession.cartId);
}

export async function redirectToCheckout() {
  const cartSession = await ensureCartSession();

  invariant(cartSession.cartCheckoutUrl, 'Checkout URL is undefined');

  redirect(cartSession.cartCheckoutUrl);
}

export async function updateCartCustomer(
  cartSession: IronSession<CartSession>,
  customerSession: IronSession<CustomerSession>,
) {
  const shopifyCart = await shopify.cart.updateCustomer(
    cartSession.cartId,
    customerSession.accessToken,
  );

  invariant(shopifyCart.cartBuyerIdentityUpdate?.cart, 'Fail to update cart');

  cartSession.cartId = shopifyCart.cartBuyerIdentityUpdate.cart.id;
  cartSession.cartCheckoutUrl =
    shopifyCart.cartBuyerIdentityUpdate.cart.checkoutUrl;
  await cartSession.save();

  return shopifyCart;
}
