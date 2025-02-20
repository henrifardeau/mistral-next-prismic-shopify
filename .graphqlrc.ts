import { loadEnvConfig } from '@next/env';
import type { CodegenConfig } from '@graphql-codegen/cli';

loadEnvConfig(process.cwd());

const URL = () => {
  const domain = process.env.SHOPIFY_STOREFRONT_DOMAIN!;
  const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION!;

  return domain.startsWith('https://')
    ? domain + `/api/${apiVersion}/graphql`
    : 'https://' + domain + `/api/${apiVersion}/graphql`;
};

const TOKEN = () => process.env.SHOPIFY_STOREFRONT_API_TOKEN!;

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [URL()]: {
        headers: {
          'x-shopify-storefront-access-token': TOKEN(),
        },
      },
    },
  ],
  documents: './src/**/*.{ts,tsx}',
  generates: {
    './src/lib/shopify/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
    },
  },
};

export default config;
