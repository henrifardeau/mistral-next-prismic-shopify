'use server';

import { getIronSession } from 'iron-session';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import invariant from 'tiny-invariant';

import { shopify } from '@/lib/shopify';

import { AddressPayload, SignInPayload, SignUpPayload } from '../schemas';
import { CartSession, CustomerSession } from '../types';
import { updateCartCustomer } from './cart';

function revalidateCustomer(customerAccessToken: string) {
  revalidateTag(customerAccessToken);
}

async function getCustomerSession() {
  return await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customer.sessionOptions,
  );
}

async function ensureCustomerSession() {
  const customerSession = await getCustomerSession();

  invariant(customerSession.authenticated, 'Customer is not login');

  return customerSession;
}

export async function getCustomer() {
  const customerSession = await getCustomerSession();
  if (!customerSession.authenticated) {
    return shopify.helpers.reshapeCustomer({});
  }

  const shopifyCustomer = await shopify.customer.get(
    customerSession.accessToken,
    { tags: [customerSession.accessToken] },
  );
  if (!shopifyCustomer.customer) {
    return shopify.helpers.reshapeCustomer({});
  }

  return shopify.helpers.reshapeCustomer(
    shopifyCustomer,
    customerSession.accessToken,
  );
}

export async function getCustomerAccessToken(payload: SignInPayload) {
  const { customerAccessTokenCreate } = await shopify.customer.createToken({
    email: payload.email,
    password: payload.password,
  });

  invariant(
    customerAccessTokenCreate?.customerAccessToken?.accessToken,
    'Fail to create access token',
  );

  const cookieStore = await cookies();
  const { accessToken } = customerAccessTokenCreate.customerAccessToken;

  const [customerSession, cartSession] = await Promise.all([
    getIronSession<CustomerSession>(
      cookieStore,
      shopify.customer.sessionOptions,
    ),
    getIronSession<CartSession>(cookieStore, shopify.cart.sessionOptions),
  ]);

  customerSession.authenticated = true;
  customerSession.accessToken = accessToken;
  await customerSession.save();

  if (cartSession.cartId) {
    await updateCartCustomer(cartSession, customerSession);
  }
}

export async function createCustomer(payload: SignUpPayload) {
  await shopify.customer.create(payload);
  await getCustomerAccessToken(payload);
}

export async function destroyCustomer() {
  const customerSession = await ensureCustomerSession();

  customerSession.destroy();

  redirect('/');
}

export async function createCustomerAddress(payload: AddressPayload) {
  const customerSession = await ensureCustomerSession();

  await shopify.customer.createAddress(customerSession.accessToken, payload);

  revalidateCustomer(customerSession.accessToken);
}

export async function updateCustomerAddress(
  addressId: string,
  payload: AddressPayload,
) {
  const customerSession = await ensureCustomerSession();

  await shopify.customer.updateAddress(
    customerSession.accessToken,
    addressId,
    payload,
  );

  revalidateCustomer(customerSession.accessToken);
}

export async function updateDefaultCustomerAddress(addressId: string) {
  const customerSession = await ensureCustomerSession();

  await shopify.customer.updateDefaultAddress(
    customerSession.accessToken,
    addressId,
  );

  revalidateCustomer(customerSession.accessToken);
}

export async function removeCustomerAddress(addressId: string) {
  const customerSession = await ensureCustomerSession();

  await shopify.customer.removeAddress(customerSession.accessToken, addressId);

  revalidateCustomer(customerSession.accessToken);
}
