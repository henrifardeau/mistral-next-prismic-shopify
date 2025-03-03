import { shopify } from '@/lib/shopify';
import { Cart } from '@/types/cart';
import { Collection } from '@/types/collection';
import { Customer } from '@/types/customer';
import { Product } from '@/types/product';

import {
  RawCart,
  RawCollectionProducts,
  RawCustomer,
  RawProduct,
} from './types';

export function reshapeCustomer(
  rawCustomer: RawCustomer,
  accessToken?: string,
): Customer {
  if (!rawCustomer.customer || !accessToken) {
    return {
      authenticated: false,
    };
  }

  return {
    authenticated: true,
    accessToken,
    ...rawCustomer.customer,
    addresses: shopify.helpers
      .removeEdgesAndNodes(rawCustomer.customer.addresses)
      .map((address) => ({
        ...address,
        default: rawCustomer.customer?.defaultAddress?.id === address.id,
      })),
    orders: shopify.helpers
      .removeEdgesAndNodes(rawCustomer.customer.orders)
      .map((order) => ({ ...order })),
  };
}

export function reshapeCart(rawCart: RawCart): Cart {
  if (!rawCart?.cart) {
    throw new Error('Reshap empty cart forbidden!');
  }

  return {
    id: rawCart.cart.id,
    state: 'idle',
    lines: shopify.helpers
      .removeEdgesAndNodes(rawCart.cart.lines)
      .map((line) => ({
        id: line.id,
        quantity: line.quantity,
        availableForSale: line.merchandise.availableForSale,
        product: {
          handle: line.merchandise.product.handle,
          title: line.merchandise.product.title,
        },
        variant: {
          id: line.merchandise.id,
          title: line.merchandise.title,
          compareAtPrice: line.merchandise.compareAtPrice,
          price: line.merchandise.price,
          image: {
            src: line.merchandise.image?.url,
            alt: line.merchandise.image?.altText,
          },
        },
      })),
  };
}

export function reshapeCollection(
  rawCollection: RawCollectionProducts,
): Collection {
  if (!rawCollection.collection?.products) {
    throw new Error('Reshap empty products forbidden!');
  }

  return {
    filters: rawCollection.collection.products.filters,
    products: shopify.helpers
      .removeEdgesAndNodes(rawCollection.collection.products)
      .map((product) => reshapeProduct({ product })),
  };
}

export function reshapeProduct(rawProduct: RawProduct): Product {
  if (!rawProduct.product) {
    throw new Error('Reshap empty product forbidden!');
  }

  return {
    id: rawProduct.product.id,
    handle: rawProduct.product.handle,
    title: rawProduct.product.title,
    options: rawProduct.product.options,
    variants: shopify.helpers
      .removeEdgesAndNodes(rawProduct.product.variants)
      .map((variant) => ({
        ...variant,
        image: {
          src: variant.image?.url,
          alt: variant.image?.altText,
        },
      })),
  };
}
