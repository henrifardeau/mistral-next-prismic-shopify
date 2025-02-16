import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  SHOPIFY_STOREFRONT_DOMAIN: z.string().nonempty(),
  SHOPIFY_STOREFRONT_API_VERSION: z.string().nonempty(),
  SHOPIFY_STOREFRONT_API_TOKEN: z.string().nonempty(),
  SHOPIFY_CART_COOKIE_PASSWORD: z.string().min(32),
  SHOPIFY_CUSTOMER_COOKIE_PASSWORD: z.string().min(32),
});

export const env = envSchema.parse(process.env);
