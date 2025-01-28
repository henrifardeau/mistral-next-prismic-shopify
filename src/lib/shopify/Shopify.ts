import { GraphQLClient } from 'graphql-request';

import { Cart, RawCart } from '@/types/cart';
import { Connection } from '@/types/gql';

export class Shopify {
  protected readonly storefrontURL: string;

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

  public reshapeCart(rawCart: RawCart): Cart {
    return {
      ...rawCart,
      lines: this.removeEdgesAndNodes(rawCart.lines),
    };
  }

  public removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
  }
}
