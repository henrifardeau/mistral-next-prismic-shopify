import { ShopifyInstance } from './ShopifyInstance';

import { env } from '@/env';

// const globalForShopify = global as unknown as {
//   shopify: ShopifyInstance;
// };

// export const shopify =
//   globalForShopify.shopify ||
//   new ShopifyInstance(
//     env.SHOPIFY_STOREFRONT_DOMAIN!,
//     env.SHOPIFY_STOREFRONT_API_VERSION!,
//     env.SHOPIFY_STOREFRONT_API_TOKEN!,
//   );

// if (env.NODE_ENV !== 'production') globalForShopify.shopify = shopify;

export const shopify = new ShopifyInstance(
  env.SHOPIFY_STOREFRONT_DOMAIN,
  env.SHOPIFY_STOREFRONT_API_VERSION,
  env.SHOPIFY_STOREFRONT_API_TOKEN,
  env.SHOPIFY_CUSTOMER_COOKIE_PASSWORD,
  env.SHOPIFY_CART_COOKIE_PASSWORD,
);
