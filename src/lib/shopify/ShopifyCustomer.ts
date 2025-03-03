import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

import { ValveConfig } from '@/valve.config';

export class ShopifyCustomer {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
  ) {}

  public get sessionOptions() {
    return {
      password: this.config.customer.session.password,
      cookieName: this.config.customer.session.key,
      cookieOptions: {
        maxAge: this.config.customer.session.duration || 7 * 24 * 60 * 60, // 7 days,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
      },
    };
  }

  public async get<T>(input: {
    query: DocumentNode;
    variables: {
      customerAccessToken: string;
    };
    next?: NextFetchRequestConfig;
    cache?: RequestCache;
  }): Promise<T> {
    return this.customClient(input.next, input.cache).request(input.query, {
      customerAccessToken: input.variables.customerAccessToken,
    });
  }

  public async create<T>(input: {
    query: DocumentNode;
    variables: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      acceptsMarketing?: boolean;
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      input: {
        email: input.variables.email,
        password: input.variables.password,
        firstName: input.variables?.firstName,
        lastName: input.variables?.lastName,
        phone: input.variables?.phone,
        acceptsMarketing: input.variables?.acceptsMarketing,
      },
    });
  }

  public async createToken<T>(input: {
    query: DocumentNode;
    variables: {
      email: string;
      password: string;
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      input: {
        email: input.variables.email,
        password: input.variables.password,
      },
    });
  }

  public async removeToken<T>(input: {
    query: DocumentNode;
    variables: {
      customerAccessToken: string;
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      customerAccessToken: input.variables.customerAccessToken,
    });
  }

  public async createAddress<T>(input: {
    query: DocumentNode;
    variables: {
      customerAccessToken: string;
      address: {
        address1: string;
        address2?: string;
        city?: string;
        company?: string;
        country?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        province?: string;
        zip?: string;
      };
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      customerAccessToken: input.variables.customerAccessToken,
      address: {
        address1: input.variables.address.address1,
        address2: input.variables.address?.address2,
        city: input.variables.address?.city,
        company: input.variables.address?.company,
        country: input.variables.address?.country,
        firstName: input.variables.address?.firstName,
        lastName: input.variables.address?.lastName,
        phone: input.variables.address?.phone,
        province: input.variables.address?.province,
        zip: input.variables.address?.zip,
      },
    });
  }

  public async updateAddress<T>(input: {
    query: DocumentNode;
    variables: {
      customerAccessToken: string;
      addressId: string;
      address: {
        address1: string;
        address2?: string;
        city?: string;
        company?: string;
        country?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        province?: string;
        zip?: string;
      };
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      customerAccessToken: input.variables.customerAccessToken,
      addressId: input.variables.addressId,
      address: {
        address1: input.variables.address.address1,
        address2: input.variables.address?.address2,
        city: input.variables.address?.city,
        company: input.variables.address?.company,
        country: input.variables.address?.country,
        firstName: input.variables.address?.firstName,
        lastName: input.variables.address?.lastName,
        phone: input.variables.address?.phone,
        province: input.variables.address?.province,
        zip: input.variables.address?.zip,
      },
    });
  }

  public async updateDefaultAddress<T>(input: {
    query: DocumentNode;
    variables: {
      customerAccessToken: string;
      addressId: string;
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      customerAccessToken: input.variables.customerAccessToken,
      addressId: input.variables.addressId,
    });
  }

  public async removeAddress<T>(input: {
    query: DocumentNode;
    variables: {
      customerAccessToken: string;
      addressId: string;
    };
  }): Promise<T> {
    return this.client.request(input.query, {
      customerAccessToken: input.variables.customerAccessToken,
      addressId: input.variables.addressId,
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
