import { GraphQLClient } from 'graphql-request';

import { ValveConfig } from '@/valve.config';

import { ShopifyCart } from './ShopifyCart';
import { ShopifyCollection } from './ShopifyCollection';
import { ShopifyCustomer } from './ShopifyCustomer';
import { ShopifyHelpers } from './ShopifyHelpers';
import { ShopifyProduct } from './ShopifyProduct';

export class Shopify {
  private readonly shopifyCartInstance: ShopifyCart;
  private readonly shopifyCustomerInstance: ShopifyCustomer;
  private readonly shopifyCollectionInstance: ShopifyCollection;
  private readonly shopifyProductInstance: ShopifyProduct;
  private readonly shopifyHelpersInstance: ShopifyHelpers;

  protected formatterCache = new Map<string, Intl.NumberFormat>();

  constructor(config: ValveConfig) {
    const client = new GraphQLClient(config.shopify.endpoint, {
      headers: {
        'x-shopify-storefront-access-token': config.shopify.storefrontToken,
      },
    });

    this.shopifyHelpersInstance = new ShopifyHelpers(config);

    this.shopifyCartInstance = new ShopifyCart(
      config,
      client,
      this.shopifyHelpersInstance,
    );
    this.shopifyCustomerInstance = new ShopifyCustomer(config, client);
    this.shopifyCollectionInstance = new ShopifyCollection(config, client);
    this.shopifyProductInstance = new ShopifyProduct(config, client);
  }

  public get helpers(): ShopifyHelpers {
    return this.shopifyHelpersInstance;
  }

  public get cart(): ShopifyCart {
    return this.shopifyCartInstance;
  }

  public get customer(): ShopifyCustomer {
    return this.shopifyCustomerInstance;
  }

  public get collection(): ShopifyCollection {
    return this.shopifyCollectionInstance;
  }

  public get product(): ShopifyProduct {
    return this.shopifyProductInstance;
  }
}
