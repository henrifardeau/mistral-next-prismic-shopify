import { GraphQLClient } from 'graphql-request';
import { SessionOptions } from 'iron-session';

import { Cart } from '@/types/cart';
import { Connection } from '@/types/gql';
import { Product } from '@/types/product';

import { RawCart, RawCollectionProducts, RawProduct } from './types';

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
    private readonly customerCookiePassword: string,
    private readonly cartCookiePassword: string,
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

  public get customerSessionOptions(): SessionOptions {
    return {
      password: this.customerCookiePassword,
      cookieName: '_psp_customer',
      cookieOptions: {
        maxAge: 7 * 24 * 60 * 60, // 7 days,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
      },
    };
  }

  public get cartSessionOptions(): SessionOptions {
    return {
      password: this.cartCookiePassword,
      cookieName: '_psp_cart',
      cookieOptions: {
        maxAge: 7 * 24 * 60 * 60, // 7 days,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
      },
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
          image: {
            src: line.merchandise.image?.url,
            alt: line.merchandise.image?.altText,
          },
        },
      })),
    };
  }

  public reshapeCollectionProducts(
    rawProducts: RawCollectionProducts,
  ): Product[] {
    if (!rawProducts.collection?.products) {
      throw new Error('Reshap empty products forbidden!');
    }

    const { products } = rawProducts.collection;

    return this.removeEdgesAndNodes(products).map((product) =>
      this.reshapeProduct({ product }),
    );
  }

  public reshapeProduct(rawProduct: RawProduct): Product {
    if (!rawProduct.product) {
      throw new Error('Reshap empty product forbidden!');
    }

    const { product } = rawProduct;

    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      options: product.options,
      variants: this.removeEdgesAndNodes(product.variants).map((variant) => ({
        ...variant,
        image: {
          src: variant.image?.url,
          alt: variant.image?.altText,
        },
      })),
    };
  }

  public removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
  }
}
