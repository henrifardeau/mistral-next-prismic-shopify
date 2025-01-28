import { GraphQLClient } from 'graphql-request';

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

  protected client(next?: NextFetchRequestConfig, cache?: RequestCache) {
    return new GraphQLClient(this.storefrontURL, {
      headers: {
        'x-shopify-storefront-access-token': this.token,
      },
      cache,
      next,
    });
  }
}
