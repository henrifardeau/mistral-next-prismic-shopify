import valveConfig from '@/valve.config';

// import { Shopify } from './Shopify';

import { Shopify } from '@valve-storefront/shopify';

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

export const shopify = new Shopify(valveConfig);
