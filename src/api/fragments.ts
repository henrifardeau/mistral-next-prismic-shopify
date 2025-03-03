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

export const Order = graphql(`
  fragment Order on Order {
    id
    name
    orderNumber
    financialStatus
    fulfillmentStatus
    processedAt
  }
`);

export const Product = graphql(`
  fragment Product on Product {
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
  }
`);

export const ProductVariant = graphql(`
  fragment ProductVariant on ProductVariant {
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
`);
