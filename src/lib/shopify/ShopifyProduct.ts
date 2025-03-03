import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

import { ValveConfig } from '@/valve.config';

export class ShopifyProduct {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
  ) {}

  public get optionTypes() {
    return {
      ...this.config.product?.options,
    };
  }

  public async getByHandle<T>(input: {
    query: DocumentNode;
    variables: {
      handle: string;
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      handle: input.variables.handle,
    });
  }

  private customClient(
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): GraphQLClient {
    return new GraphQLClient(this.config.shopify.endpoint, {
      headers: {
        'x-shopify-storefront-access-token':
          this.config.shopify.storefrontToken,
      },
      cache,
      next,
    });
  }
}
