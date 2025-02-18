'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

import { shopify } from '@/lib/shopify';

import { SignUpPayload } from '../schemas';
import { CartSession, CustomerSession } from '../types';
import { updateCartCustomer } from './cart';

export async function createCustomer(payload: SignUpPayload) {
  await shopify.createCustomer(payload);
  const { customerAccessTokenCreate } = await shopify.createCustomerToken(
    payload.email,
    payload.password,
  );

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
    updateCartCustomer(cartSession.cartId, accessToken);
  }
}
