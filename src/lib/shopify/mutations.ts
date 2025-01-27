import { graphql } from './gql';

export const createCartMutation = graphql(`
  mutation CreateCart {
    cartCreate {
      cart {
        id
        checkoutUrl
        lines(first: 250) {
          nodes {
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                selectedOptions {
                  name
                  value
                }
                product {
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

export const updateCartMutation = graphql(`
  mutation UpdateCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        checkoutUrl
        id
      }
    }
  }
`);
