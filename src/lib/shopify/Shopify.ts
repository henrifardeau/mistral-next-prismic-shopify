import { GraphQLClient } from 'graphql-request';
import { ShopifyCart } from './ShopifyCart';
import { ShopifyCollection } from './ShopifyCollection';
import { ShopifyCustomer } from './ShopifyCustomer';
import { ShopifyHelpers } from './ShopifyHelpers';
import { ShopifyProduct } from './ShopifyProduct';

export class Shopify {
  protected readonly storefrontURL: string;

  private readonly shopifyCart: ShopifyCart;
  private readonly shopifyCustomer: ShopifyCustomer;
  private readonly shopifyCollection: ShopifyCollection;
  private readonly shopifyProduct: ShopifyProduct;
  private readonly shopifyHelpers: ShopifyHelpers;

  protected formatterCache = new Map<string, Intl.NumberFormat>();

  constructor(
    domain: string,
    apiVersion: string,
    storefrontToken: string,
    customerCookiePassword: string,
    cartCookiePassword: string,
  ) {
    this.shopifyHelpers = new ShopifyHelpers();

    this.storefrontURL = this.shopifyHelpers.createStorefrontUrl(
      domain,
      apiVersion,
    );

    const client = new GraphQLClient(this.storefrontURL, {
      headers: {
        'x-shopify-storefront-access-token': storefrontToken,
      },
    });

    this.shopifyCart = new ShopifyCart(
      client,
      this.storefrontURL,
      storefrontToken,
      cartCookiePassword,
      this.shopifyHelpers,
    );
    this.shopifyCustomer = new ShopifyCustomer(
      client,
      this.storefrontURL,
      storefrontToken,
      customerCookiePassword,
      this.shopifyHelpers,
    );
    this.shopifyProduct = new ShopifyProduct(
      this.storefrontURL,
      storefrontToken,
      this.shopifyHelpers,
    );
    this.shopifyCollection = new ShopifyCollection(
      this.storefrontURL,
      storefrontToken,
      this.shopifyProduct,
      this.shopifyHelpers,
    );
  }

  public get helpers(): ShopifyHelpers {
    return this.shopifyHelpers;
  }

  public get cart(): ShopifyCart {
    return this.shopifyCart;
  }

  public get customer(): ShopifyCustomer {
    return this.shopifyCustomer;
  }

  public get collection(): ShopifyCollection {
    return this.shopifyCollection;
  }

  public get product(): ShopifyProduct {
    return this.shopifyProduct;
  }
}
