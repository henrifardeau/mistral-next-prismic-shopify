import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

import { ValveConfig } from '@/valve.config';

import { ShopifyHelpers } from './ShopifyHelpers';

export class ShopifyCart {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
    private readonly helpers: ShopifyHelpers,
  ) {}

  public get sessionOptions() {
    return {
      password: this.config.cart.session.password,
      cookieName: this.config.cart.session.key,
      cookieOptions: {
        maxAge: this.config.cart.session.duration || 7 * 24 * 60 * 60, // 7 days,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
      },
    };
  }

  public async get<T>(input: {
    query: DocumentNode;
    variables: {
      cartId: string;
    };
    next?: NextFetchRequestConfig;
    cache?: RequestCache;
  }): Promise<T> {
    const id = this.helpers.addPrefix('cart', input.variables.cartId);

    return this.customClient(input.next, input.cache).request(input.query, {
      cartId: id,
    });
  }

  public async create<T>(input: {
    query: DocumentNode;
    variables: {
      cartLines: {
        variantId: string;
        quantity?: number;
      }[];
      customerAccessToken?: string;
    };
  }): Promise<T> {
    const lines = input.variables.cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.helpers.addPrefix('variant', line.variantId),
    }));

    return this.client.request(input.query, {
      input: {
        lines,
        buyerIdentity: {
          customerAccessToken: input.variables.customerAccessToken,
        },
      },
    });
  }

  public async addLines<T>(input: {
    query: DocumentNode;
    variables: {
      cartId: string;
      cartLines: {
        variantId: string;
        quantity?: number;
      }[];
    };
  }): Promise<T> {
    const id = this.helpers.addPrefix('cart', input.variables.cartId);
    const lines = input.variables.cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.helpers.addPrefix('variant', line.variantId),
    }));

    return this.client.request(input.query, {
      cartId: id,
      lines,
    });
  }

  public async updateLines<T>(input: {
    query: DocumentNode;
    variables: {
      cartId: string;
      cartLines: {
        lineId: string;
        quantity?: number;
      }[];
    };
  }): Promise<T> {
    const id = this.helpers.addPrefix('cart', input.variables.cartId);
    const lines = input.variables.cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      id: this.helpers.addPrefix('line', line.lineId),
    }));

    return this.client.request(input.query, {
      cartId: id,
      lines,
    });
  }

  public async removeLines<T>(input: {
    query: DocumentNode;
    variables: {
      cartId: string;
      cartLines: {
        lineId: string;
      }[];
    };
  }): Promise<T> {
    const id = this.helpers.addPrefix('cart', input.variables.cartId);
    const lineIds = input.variables.cartLines.reduce((acc, cur) => {
      const prefixedCur = this.helpers.addPrefix('line', cur.lineId);

      return acc.includes(prefixedCur) ? acc : [...acc, prefixedCur];
    }, [] as string[]);

    return this.client.request(input.query, {
      cartId: id,
      lineIds,
    });
  }

  public async updateCustomer<T>(input: {
    query: DocumentNode;
    variables: {
      cartId: string;
      customerAccessToken: string;
    };
  }): Promise<T> {
    const id = this.helpers.addPrefix('cart', input.variables.cartId);

    return this.client.request(input.query, {
      cartId: id,
      buyerIdentity: {
        customerAccessToken: input.variables.customerAccessToken,
      },
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
