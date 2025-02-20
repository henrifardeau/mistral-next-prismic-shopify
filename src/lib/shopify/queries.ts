import { graphql } from './gql';

export const getCustomerQuery = graphql(`
  query GetCustomer($customerAccessToken: String!) {
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
    }
  }
`);

export const getCartQuery = graphql(`
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      buyerIdentity {
        email
        customer {
          email
        }
      }
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

export const collectionByHandleQuery = graphql(`
  query CollectionByHandle(
    $handle: String!
    $first: Int!
    $sortKey: ProductCollectionSortKeys!
    $sortReverse: Boolean!
  ) {
    collection(handle: $handle) {
      id
      products(first: $first, sortKey: $sortKey, reverse: $sortReverse) {
        edges {
          node {
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
      }
    }
  }
`);

export const productByHandleQuery = graphql(`
  query ProductByHandle($handle: String!) {
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
