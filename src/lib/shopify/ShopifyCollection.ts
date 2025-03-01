import { GraphQLClient } from 'graphql-request';

import { DEFAULT_SORTING } from '@/constants/collection';
import { Collection } from '@/types/collection';
import { ValveConfig } from '@/valve.config';

import { GetCollectionByHandleQuery, ProductFilter } from './gql/graphql';
import { getCollectionByHandleQuery } from './queries';
import { ShopifyHelpers } from './ShopifyHelpers';
import { ShopifyProduct } from './ShopifyProduct';
import { CollectionSortKeys, RawCollectionProducts } from './types';

export class ShopifyCollection {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
    private readonly helpers: ShopifyHelpers,
    private readonly product: ShopifyProduct,
  ) {}

  public get filterTypes() {
    return { ...this.config.collection?.filters };
  }

  public async getByHandle(
    handle: string,
    sort?: {
      key?: string;
      reverse?: boolean;
    },
    filters?: string[],
  ): Promise<GetCollectionByHandleQuery> {
    return this.client.request(getCollectionByHandleQuery, {
      handle,
      first: 20,
      sortKey: (sort?.key ?? DEFAULT_SORTING.sortKey) as CollectionSortKeys,
      sortReverse: sort?.reverse ?? DEFAULT_SORTING.sortReverse,
      filters: filters as ProductFilter[],
    });
  }

  public reshape(rawCollection: RawCollectionProducts): Collection {
    if (!rawCollection.collection?.products) {
      throw new Error('Reshap empty products forbidden!');
    }

    return {
      filters: rawCollection.collection.products.filters,
      products: this.helpers
        .removeEdgesAndNodes(rawCollection.collection.products)
        .map((product) => this.product.reshape({ product })),
    };
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
