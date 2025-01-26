import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN: z.string().nonempty(),
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
