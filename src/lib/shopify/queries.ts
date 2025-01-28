import { graphql } from './gql';

export const cartByIdQuery = graphql(`
  query CartById($id: ID!) {
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
              }
            }
          }
        }
      }
    }
  }
`);

export const shortProductByIdQuery = graphql(`
  query ShortProductById($id: ID!) {
    product(id: $id) {
      title
    }
  }
`);

export const longProductByIdQuery = graphql(`
  query LongProductById($id: ID!) {
    product(id: $id) {
      id
      title
      variants(first: 20) {
        nodes {
          id
          title
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`);
