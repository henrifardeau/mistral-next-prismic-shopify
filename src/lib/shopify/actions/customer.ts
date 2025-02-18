'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

import { shopify } from '@/lib/shopify';

import { SignInPayload, SignUpPayload } from '../schemas';
import { CartSession, CustomerSession } from '../types';
import { updateCartCustomer } from './cart';
import { redirect } from 'next/navigation';

export async function getCustomer() {
  const cookieStore = await cookies();

  const customerSession = await getIronSession<CustomerSession>(
    cookieStore,
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    return shopify.reshapeCustomer({
      authenticated: false,
    });
  }

  return shopify.reshapeCustomer({
    authenticated: true,
  });
}

export async function createCustomer(payload: SignUpPayload) {
  await shopify.createCustomer(payload);
  await getCustomerAccessToken(payload);
}

export async function getCustomerAccessToken(payload: SignInPayload) {
  const { customerAccessTokenCreate } = await shopify.createCustomerToken({
    email: payload.email,
    password: payload.password,
  });

  if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    throw new Error('Fail to create access token');
  }

  const cookieStore = await cookies();
  const { accessToken } = customerAccessTokenCreate.customerAccessToken;

  const [customerSession, cartSession] = await Promise.all([
    getIronSession<CustomerSession>(
      cookieStore,
      shopify.customerSessionOptions,
    ),
    getIronSession<CartSession>(cookieStore, shopify.cartSessionOptions),
  ]);

  customerSession.authenticated = true;
  customerSession.accessToken = accessToken;
  await customerSession.save();

  if (cartSession.cartId) {
    await updateCartCustomer(cartSession, customerSession);
  }
}

export async function destroyCustomer() {
  const cookieStore = await cookies();

  const customerSession = await getIronSession<CustomerSession>(
    cookieStore,
    shopify.customerSessionOptions,
  );

  customerSession.destroy();

  redirect('/');
}
