import { graphql } from './gql';

export const shortProductByIdQuery = graphql(`
  query ProductById($id: ID!) {
    product(id: $id) {
      title
    }
  }
`);
