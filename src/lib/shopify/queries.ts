import { graphql } from './gql';

export const productsQuery = graphql(`
  query Products {
    products(first: 10) {
      edges {
        node {
          id
        }
      }
    }
  }
`);
