import { env } from '@/env';

import { ShopifyInstance } from './ShopifyInstance';

const globalForShopify = global as unknown as {
  shopify: ShopifyInstance;
};

export const shopify =
  globalForShopify.shopify ||
  new ShopifyInstance(
    env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN,
    env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
    env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN,
  );

if (process.env.NODE_ENV !== 'production') globalForShopify.shopify = shopify;
