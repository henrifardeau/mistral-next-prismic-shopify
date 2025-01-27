import { graphql } from './gql';

export const productByIdQuery = graphql(`
  query ProductById($id: ID!) {
    product(id: $id) {
      title
    }
  }
`);
