import { graphql } from './gql';

export const getCartQuery = graphql(`
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                availableForSale
                compareAtPrice {
                  amount
                  currencyCode
                }
                price {
                  amount
                  currencyCode
                }
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

export const shortProductByHandleQuery = graphql(`
  query ShortProductById($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
    }
  }
`);

export const longProductByHandleQuery = graphql(`
  query LongProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
          compareAtPrice {
            amount
            currencyCode
          }
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`);
