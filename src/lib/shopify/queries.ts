import { graphql } from './gql';

export const MailingAddress = graphql(`
  fragment MailingAddress on MailingAddress {
    id
    address1
    address2
    city
    company
    country
    firstName
    lastName
    phone
    province
    zip
  }
`);

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

export const getCollectionByHandleQuery = graphql(`
  query GetCollectionByHandle(
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

export const getProductByHandleQuery = graphql(`
  query GetProductByHandle($handle: String!) {
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
