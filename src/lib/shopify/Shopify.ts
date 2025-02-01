import { GraphQLClient } from 'graphql-request';

import { Cart } from '@/types/cart';
import { Connection } from '@/types/gql';
import { Product } from '@/types/product';

import { RawCart, RawProduct } from './types';

const PREFIXES = Object.freeze({
  cart: 'gid://shopify/Cart/',
  collection: 'gid://shopify/Collection/',
  product: 'gid://shopify/Product/',
  variant: 'gid://shopify/ProductVariant/',
  line: 'gid://shopify/CartLine/',
});

export class Shopify {
  protected readonly storefrontURL: string;

  protected formatterCache = new Map<string, Intl.NumberFormat>();

  constructor(
    private readonly domain: string,
    private readonly apiVersion: string,
    private readonly token: string,
  ) {
    this.storefrontURL = this.domain.startsWith('https://')
      ? this.domain + `/api/${this.apiVersion}/graphql`
      : 'https://' + this.domain + `/api/${this.apiVersion}/graphql`;
  }

  protected client(next?: NextFetchRequestConfig, cache?: RequestCache) {
    return new GraphQLClient(this.storefrontURL, {
      headers: {
        'x-shopify-storefront-access-token': this.token,
      },
      cache,
      next,
    });
  }

  public get cartCookieName() {
    return 'mistral_shopify_cart';
  }

  public get cartCookieOptions() {
    return {
      maxAge: 7 * 24 * 60 * 60, // 7 days,
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
    };
  }

  public addPrefix(prefix: keyof typeof PREFIXES, val: string) {
    return val.startsWith(PREFIXES[prefix]) ? val : PREFIXES[prefix] + val;
  }

  public removePrefix(prefix: keyof typeof PREFIXES, val: string) {
    return val.startsWith(PREFIXES[prefix])
      ? val.slice(PREFIXES[prefix].length)
      : val;
  }

  public reshapeCart(rawCart: RawCart): Cart {
    if (!rawCart?.cart) {
      throw new Error('Reshap empty cart forbidden!');
    }

    const { cart } = rawCart;

    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      state: 'idle',
      lines: this.removeEdgesAndNodes(cart.lines).map((line) => ({
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
        },
      })),
    };
  }

  public reshapeProduct(rawProdct: RawProduct): Product {
    if (!rawProdct.product) {
      throw new Error('Reshap empty product forbidden!');
    }

    const { product } = rawProdct;

    return {
      id: product.id,
      handle: product.handle,
      options: product.options,
      variants: this.removeEdgesAndNodes(product.variants),
    };
  }

  public removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
  }

  public formatPrice(
    price: number,
    currencyCode: string,
    options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyCode,
    },
  ): string {
    const formatter = this.getLazyFormatter('fr-CA', options);

    return formatter.format(price);
  }

  private getLazyFormatter(
    locale: string,
    options?: Intl.NumberFormatOptions,
  ): Intl.NumberFormat {
    const key = JSON.stringify([locale, options]);

    let formatter = this.formatterCache.get(key);
    if (!formatter) {
      formatter = new Intl.NumberFormat(locale, options);
      this.formatterCache.set(key, formatter);
    }

    return formatter;
  }
}
