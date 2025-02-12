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
                image {
                  url
                  altText
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

export const productByHandleQuery = graphql(`
  query productByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      options {
        id
        name
        optionValues {
          swatch {
            color
          }
          name
          id
        }
      }
      variants(first: 250) {
        edges {
          node {
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
            image {
              url
              altText
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`);
