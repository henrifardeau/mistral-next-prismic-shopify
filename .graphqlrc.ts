import type { CodegenConfig } from '@graphql-codegen/cli';

import valveConfig from './src/valve.config';

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: [
    {
      [valveConfig.shopify.endpoint]: {
        headers: {
          'x-shopify-storefront-access-token':
            valveConfig.shopify.storefrontToken,
        },
      },
    },
  ],
  documents: './src/**/*.{ts,tsx}',
  generates: {
    './src/api/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
    },
  },
};

export default config;
