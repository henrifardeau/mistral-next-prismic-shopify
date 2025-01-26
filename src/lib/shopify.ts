import { env } from '@/env';

const API_VERSION = '2025-01';

class Shopify {
  constructor(
    private readonly domain: string,
    private readonly token: string,
  ) {}

  get storefrontDomain() {
    return this.domain;
  }

  get storefrontURL() {
    return this.domain.startsWith('https://')
      ? this.domain + `/api/${API_VERSION}/graphql`
      : 'https://' + this.domain + `/api/${API_VERSION}/graphql`;
  }

  get storefrontToken() {
    return this.token;
  }
}

const globalForShopify = global as unknown as {
  shopify: Shopify;
};

export const shopify =
  globalForShopify.shopify ||
  new Shopify(
    env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN,
    env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
  );

if (process.env.NODE_ENV !== 'production') globalForShopify.shopify = shopify;
