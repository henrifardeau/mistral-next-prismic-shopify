import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

import { ValveConfig } from '@/valve.config';

export class ShopifyCollection {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
  ) {}

  public get filterTypes() {
    return {
      ...this.config.collection?.filters,
    };
  }

  public async getByHandle<T>(input: {
    query: DocumentNode;
    variables: {
      handle: string;
      first?: number;
      sort?: {
        key?: string;
        reverse?: boolean;
      };
      filters?: string[];
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      handle: input.variables.handle,
      first: input.variables.first || 20,
      sortKey:
        input.variables.sort?.key ??
        this.config.collection.sorting.default.sortKey,
      sortReverse:
        input.variables.sort?.reverse ??
        this.config.collection.sorting.default.sortReverse,
      filters: input.variables.filters,
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
