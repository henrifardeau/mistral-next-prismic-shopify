'use server';

import { getIronSession } from 'iron-session';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { shopify } from '@/lib/shopify';

import { AddressPayload, SignInPayload, SignUpPayload } from '../schemas';
import { CartSession, CustomerSession } from '../types';
import { updateCartCustomer } from './cart';

function revalidateCustomer(customerAccessToken: string) {
  revalidateTag(customerAccessToken);
}

export async function getCustomer() {
  const customerSession = await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    return shopify.reshapeCustomer({});
  }

  const shopifyCustomer = await shopify.getCustomer(
    customerSession.accessToken,
    { tags: [customerSession.accessToken] },
  );
  if (!shopifyCustomer.customer) {
    return shopify.reshapeCustomer({});
  }

  return shopify.reshapeCustomer(shopifyCustomer, customerSession.accessToken);
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
  const customerSession = await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    throw new Error('Customer is not login');
  }

  customerSession.destroy();

  redirect('/');
}

export async function createCustomerAddress(payload: AddressPayload) {
  const customerSession = await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    throw new Error('Customer is not login');
  }

  await shopify.createCustomerAddress(customerSession.accessToken, payload);

  revalidateCustomer(customerSession.accessToken);
}

export async function updateCustomerAddress(
  addressId: string,
  payload: AddressPayload,
) {
  const customerSession = await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    throw new Error('Customer is not login');
  }

  await shopify.updateCustomerAddress(
    customerSession.accessToken,
    addressId,
    payload,
  );

  revalidateCustomer(customerSession.accessToken);
}

export async function updateDefaultCustomerAddress(addressId: string) {
  const customerSession = await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    throw new Error('Customer is not login');
  }

  await shopify.updateDefaultCustomerAddress(
    customerSession.accessToken,
    addressId,
  );

  revalidateCustomer(customerSession.accessToken);
}

export async function removeCustomerAddress(addressId: string) {
  const customerSession = await getIronSession<CustomerSession>(
    await cookies(),
    shopify.customerSessionOptions,
  );
  if (!customerSession.authenticated) {
    throw new Error('Customer is not login');
  }

  await shopify.removeCustomerAddress(customerSession.accessToken, addressId);

  revalidateCustomer(customerSession.accessToken);
}
