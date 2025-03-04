import { graphql } from './gql';

export const createCustomerMutation = graphql(`
  mutation CreateCustomer($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
    }
  }
`);

export const updateCustomerMutation = graphql(`
  mutation UpdateCustomer(
    $customerAccessToken: String!
    $firstName: String
    $lastName: String
    $phone: String
    $acceptsMarketing: Boolean
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: {
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        acceptsMarketing: $acceptsMarketing
      }
    ) {
      customer {
        id
      }
    }
  }
`);

export const createCustomerTokenMutation = graphql(`
  mutation CreateCustomerToken($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`);

export const removeCustomerTokenMutation = graphql(`
  mutation RemoveCustomerToken($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
    }
  }
`);

export const createCustomerAddressMutation = graphql(`
  mutation CreateCustomerAddress(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
    }
  }
`);

export const updateCustomerAddressMutation = graphql(`
  mutation UpdateCustomerAddress(
    $customerAccessToken: String!
    $addressId: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $addressId
      address: $address
    ) {
      customerAddress {
        id
      }
    }
  }
`);

export const updateDefaultCustomerAddressMutation = graphql(`
  mutation UpdateDefaultCustomerAddress(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customer {
        id
      }
    }
  }
`);

export const removeCustomerAddressMutation = graphql(`
  mutation RemoveCustomerAddress(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerAddressDelete(
      customerAccessToken: $customerAccessToken
      id: $addressId
    ) {
      deletedCustomerAddressId
    }
  }
`);

export const createCartMutation = graphql(`
  mutation CreateCart($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  ...ProductVariant
                  product {
                    title
                    handle
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

export const addCartLinesMutation = graphql(`
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`);

export const updateCartLinesMutation = graphql(`
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
    }
  }
`);

export const removeCartLinesMutation = graphql(`
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
    }
  }
`);

export const updateCartBuyerIdentityMutation = graphql(`
  mutation UpdateCartBuyerIdentity(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
  ) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
      }
    }
  }
`);
