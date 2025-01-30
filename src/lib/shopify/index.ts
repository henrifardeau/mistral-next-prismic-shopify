import { ShopifyInstance } from './ShopifyInstance';

export * from './actions';
export * from './types';

// const globalForShopify = global as unknown as {
//   shopify: ShopifyInstance;
// };

// export const shopify =
//   globalForShopify.shopify ||
//   new ShopifyInstance(
//     process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN!,
//     process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION!,
//     process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
//   );

// if (process.env.NODE_ENV !== 'production') globalForShopify.shopify = shopify;

export const shopify = new ShopifyInstance(
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN!,
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION!,
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
);
