import { GraphQLClient } from 'graphql-request';

import { Product } from '@/types/product';
import { ValveConfig } from '@/valve.config';

import { GetProductByHandleQuery } from './gql/graphql';
import { getProductByHandleQuery } from './queries';
import { ShopifyHelpers } from './ShopifyHelpers';
import { RawProduct } from './types';

export class ShopifyProduct {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
    private readonly helpers: ShopifyHelpers,
  ) {}

  public get optionTypes() {
    return { ...this.config.product?.options };
  }

  public async getByHandle(handle: string): Promise<GetProductByHandleQuery> {
    return this.client.request(getProductByHandleQuery, {
      handle,
    });
  }

  public reshape(rawProduct: RawProduct): Product {
    if (!rawProduct.product) {
      throw new Error('Reshap empty product forbidden!');
    }

    return {
      id: rawProduct.product.id,
      handle: rawProduct.product.handle,
      title: rawProduct.product.title,
      options: rawProduct.product.options,
      variants: this.helpers
        .removeEdgesAndNodes(rawProduct.product.variants)
        .map((variant) => ({
          ...variant,
          image: {
            src: variant.image?.url,
            alt: variant.image?.altText,
          },
        })),
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
