import { z } from 'zod';

import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  STOREFRONT_TOKEN: z.string().nonempty(),
  SESSION_CUSTOMER_PASSWORD: z.string().min(32),
  SESSION_CART_PASSWORD: z.string().min(32),
});

export const env = envSchema.parse(process.env);
