import { env } from './env';

export type ValveConfig = {
  shopify: {
    endpoint: string;
    storefrontToken: string;
    gid: {
      cart: string;
      collection: string;
      product: string;
      variant: string;
      line: string;
    };
  };
  customer: {
    session: {
      key: string;
      password: string;
      duration?: number;
    };
  };
  cart: {
    session: {
      key: string;
      password: string;
      duration?: number;
    };
  };
  collection: {
    sorting: {
      default: {
        name: string;
        slug: string;
        sortKey: string;
        sortReverse: boolean;
      };
      options: {
        name: string;
        slug: string;
        sortKey: string;
        sortReverse: boolean;
      }[];
    };
    filters?: {
      color?: {
        ids: string[];
      };
      image?: {
        ids: string[];
        images: {
          [key: string]: {
            src: string;
            alt: string;
          };
        };
      };
      range?: {
        ids: string[];
      };
    };
  };
  product?: {
    options?: {
      color?: {
        names: string[];
      };
      image?: {
        names: string[];
        images: {
          [key: string]: {
            src: string;
            alt: string;
          };
        };
      };
      list?: {
        names: string[];
      };
    };
  };
};

const valveConfig = {
  shopify: {
    endpoint: 'https://mistral-prismic.myshopify.com/api/2025-04/graphql',
    storefrontToken: env.STOREFRONT_TOKEN,
    gid: {
      cart: 'gid://shopify/Cart/',
      collection: 'gid://shopify/Collection/',
      product: 'gid://shopify/Product/',
      variant: 'gid://shopify/ProductVariant/',
      line: 'gid://shopify/CartLine/',
    },
  },
  customer: {
    session: {
      key: '__customer',
      password: env.SESSION_CUSTOMER_PASSWORD,
    },
  },
  cart: {
    session: {
      key: '__cart',
      password: env.SESSION_CART_PASSWORD,
    },
  },
  collection: {
    sorting: {
      default: {
        name: 'Relevance',
        slug: 'default',
        sortKey: 'COLLECTION_DEFAULT',
        sortReverse: false,
      },
      options: [
        {
          name: 'Relevance',
          slug: 'default',
          sortKey: 'COLLECTION_DEFAULT',
          sortReverse: false,
        },
        {
          name: 'Trending',
          slug: 'trending-desc',
          sortKey: 'BEST_SELLING',
          sortReverse: false,
        },
        {
          name: 'Latest arrivals',
          slug: 'latest-desc',
          sortKey: 'CREATED',
          sortReverse: true,
        },
        {
          name: 'Price: Low to high',
          slug: 'price-asc',
          sortKey: 'PRICE',
          sortReverse: false,
        },
        {
          name: 'Price: High to low',
          slug: 'price-desc',
          sortKey: 'PRICE',
          sortReverse: true,
        },
      ],
    },
    filters: {
      color: {
        ids: ['filter.v.t.shopify.color-pattern'],
      },
      image: {
        ids: ['filter.v.option.layout'],
        images: {
          'Time-block': {
            src: '/time-block.svg',
            alt: 'Time Block',
          },
          Frames: {
            src: '/frames.svg',
            alt: 'Frames',
          },
        },
      },
      range: {
        ids: ['filter.v.price'],
      },
    },
  },
  product: {
    options: {
      color: {
        names: ['color'],
      },
      image: {
        names: ['layout'],
        images: {
          'Time-block': {
            src: '/time-block.svg',
            alt: 'Time Block',
          },
          Frames: {
            src: '/frames.svg',
            alt: 'Frames',
          },
        },
      },
      list: {
        names: ['size'],
      },
    },
  },
} satisfies ValveConfig;

export default valveConfig;
