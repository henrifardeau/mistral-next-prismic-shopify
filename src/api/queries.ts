import { graphql } from './gql';

export const customerQuery = graphql(`
  query Customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      acceptsMarketing
      firstName
      lastName
      displayName
      email
      phone
      createdAt
      updatedAt
      defaultAddress {
        ...MailingAddress
      }
      addresses(first: 20) {
        edges {
          node {
            ...MailingAddress
          }
        }
      }
      orders(first: 20) {
        edges {
          node {
            ...Order
          }
        }
      }
    }
  }
`);

export const cartQuery = graphql(`
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                ...ProductVariant
                product {
                  handle
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`);

export const cartCheckoutURLQuery = graphql(`
  query CartCheckoutURL($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
    }
  }
`);

export const collectionByHandleQuery = graphql(`
  query Collection(
    $handle: String!
    $first: Int!
    $sortKey: ProductCollectionSortKeys!
    $sortReverse: Boolean!
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      products(
        first: $first
        sortKey: $sortKey
        reverse: $sortReverse
        filters: $filters
      ) {
        filters {
          id
          label
          values {
            input
            label
            swatch {
              color
            }
          }
        }
        edges {
          node {
            ...Product
            variants(first: 250) {
              edges {
                node {
                  ...ProductVariant
                }
              }
            }
          }
        }
      }
    }
  }
`);

export const productByHandleQuery = graphql(`
  query Product($handle: String!) {
    product(handle: $handle) {
      ...Product
      variants(first: 250) {
        edges {
          node {
            ...ProductVariant
          }
        }
      }
    }
  }
`);
