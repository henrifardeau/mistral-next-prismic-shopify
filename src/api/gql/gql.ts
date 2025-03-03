/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment MailingAddress on MailingAddress {\n    id\n    address1\n    address2\n    city\n    company\n    country\n    firstName\n    lastName\n    phone\n    province\n    zip\n  }\n": typeof types.MailingAddressFragmentDoc,
    "\n  fragment Order on Order {\n    id\n    name\n    orderNumber\n    financialStatus\n    fulfillmentStatus\n    processedAt\n  }\n": typeof types.OrderFragmentDoc,
    "\n  fragment Product on Product {\n    id\n    handle\n    title\n    options {\n      id\n      name\n      optionValues {\n        swatch {\n          color\n        }\n        name\n        id\n      }\n    }\n  }\n": typeof types.ProductFragmentDoc,
    "\n  fragment ProductVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n    }\n    selectedOptions {\n      name\n      value\n    }\n  }\n": typeof types.ProductVariantFragmentDoc,
    "\n  mutation CreateCustomer($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n    }\n  }\n": typeof types.CreateCustomerDocument,
    "\n  mutation CreateCustomerToken($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n": typeof types.CreateCustomerTokenDocument,
    "\n  mutation CreateCustomerAddress(\n    $customerAccessToken: String!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressCreate(\n      customerAccessToken: $customerAccessToken\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n": typeof types.CreateCustomerAddressDocument,
    "\n  mutation UpdateCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCustomerAddressDocument,
    "\n  mutation UpdateDefaultCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerDefaultAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      addressId: $addressId\n    ) {\n      customer {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDefaultCustomerAddressDocument,
    "\n  mutation RemoveCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerAddressDelete(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n    ) {\n      deletedCustomerAddressId\n    }\n  }\n": typeof types.RemoveCustomerAddressDocument,
    "\n  mutation CreateCart($input: CartInput) {\n    cartCreate(input: $input) {\n      cart {\n        id\n        checkoutUrl\n        lines(first: 100) {\n          edges {\n            node {\n              id\n              quantity\n              merchandise {\n                ... on ProductVariant {\n                  ...ProductVariant\n                  product {\n                    title\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.CreateCartDocument,
    "\n  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": typeof types.AddCartLinesDocument,
    "\n  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": typeof types.UpdateCartLinesDocument,
    "\n  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": typeof types.RemoveCartLinesDocument,
    "\n  mutation UpdateCartBuyerIdentity(\n    $cartId: ID!\n    $buyerIdentity: CartBuyerIdentityInput!\n  ) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": typeof types.UpdateCartBuyerIdentityDocument,
    "\n  query Customer($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      id\n      acceptsMarketing\n      firstName\n      lastName\n      displayName\n      email\n      phone\n      createdAt\n      updatedAt\n      defaultAddress {\n        ...MailingAddress\n      }\n      addresses(first: 20) {\n        edges {\n          node {\n            ...MailingAddress\n          }\n        }\n      }\n      orders(first: 20) {\n        edges {\n          node {\n            ...Order\n          }\n        }\n      }\n    }\n  }\n": typeof types.CustomerDocument,
    "\n  query Cart($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      lines(first: 100) {\n        edges {\n          node {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                ...ProductVariant\n                product {\n                  handle\n                  title\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.CartDocument,
    "\n  query Collection(\n    $handle: String!\n    $first: Int!\n    $sortKey: ProductCollectionSortKeys!\n    $sortReverse: Boolean!\n    $filters: [ProductFilter!]\n  ) {\n    collection(handle: $handle) {\n      id\n      products(\n        first: $first\n        sortKey: $sortKey\n        reverse: $sortReverse\n        filters: $filters\n      ) {\n        filters {\n          id\n          label\n          values {\n            input\n            label\n            swatch {\n              color\n            }\n          }\n        }\n        edges {\n          node {\n            ...Product\n            variants(first: 250) {\n              edges {\n                node {\n                  ...ProductVariant\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.CollectionDocument,
    "\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n      variants(first: 250) {\n        edges {\n          node {\n            ...ProductVariant\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProductDocument,
};
const documents: Documents = {
    "\n  fragment MailingAddress on MailingAddress {\n    id\n    address1\n    address2\n    city\n    company\n    country\n    firstName\n    lastName\n    phone\n    province\n    zip\n  }\n": types.MailingAddressFragmentDoc,
    "\n  fragment Order on Order {\n    id\n    name\n    orderNumber\n    financialStatus\n    fulfillmentStatus\n    processedAt\n  }\n": types.OrderFragmentDoc,
    "\n  fragment Product on Product {\n    id\n    handle\n    title\n    options {\n      id\n      name\n      optionValues {\n        swatch {\n          color\n        }\n        name\n        id\n      }\n    }\n  }\n": types.ProductFragmentDoc,
    "\n  fragment ProductVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n    }\n    selectedOptions {\n      name\n      value\n    }\n  }\n": types.ProductVariantFragmentDoc,
    "\n  mutation CreateCustomer($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n    }\n  }\n": types.CreateCustomerDocument,
    "\n  mutation CreateCustomerToken($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n": types.CreateCustomerTokenDocument,
    "\n  mutation CreateCustomerAddress(\n    $customerAccessToken: String!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressCreate(\n      customerAccessToken: $customerAccessToken\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n": types.CreateCustomerAddressDocument,
    "\n  mutation UpdateCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n": types.UpdateCustomerAddressDocument,
    "\n  mutation UpdateDefaultCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerDefaultAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      addressId: $addressId\n    ) {\n      customer {\n        id\n      }\n    }\n  }\n": types.UpdateDefaultCustomerAddressDocument,
    "\n  mutation RemoveCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerAddressDelete(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n    ) {\n      deletedCustomerAddressId\n    }\n  }\n": types.RemoveCustomerAddressDocument,
    "\n  mutation CreateCart($input: CartInput) {\n    cartCreate(input: $input) {\n      cart {\n        id\n        checkoutUrl\n        lines(first: 100) {\n          edges {\n            node {\n              id\n              quantity\n              merchandise {\n                ... on ProductVariant {\n                  ...ProductVariant\n                  product {\n                    title\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CreateCartDocument,
    "\n  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": types.AddCartLinesDocument,
    "\n  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": types.UpdateCartLinesDocument,
    "\n  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": types.RemoveCartLinesDocument,
    "\n  mutation UpdateCartBuyerIdentity(\n    $cartId: ID!\n    $buyerIdentity: CartBuyerIdentityInput!\n  ) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": types.UpdateCartBuyerIdentityDocument,
    "\n  query Customer($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      id\n      acceptsMarketing\n      firstName\n      lastName\n      displayName\n      email\n      phone\n      createdAt\n      updatedAt\n      defaultAddress {\n        ...MailingAddress\n      }\n      addresses(first: 20) {\n        edges {\n          node {\n            ...MailingAddress\n          }\n        }\n      }\n      orders(first: 20) {\n        edges {\n          node {\n            ...Order\n          }\n        }\n      }\n    }\n  }\n": types.CustomerDocument,
    "\n  query Cart($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      lines(first: 100) {\n        edges {\n          node {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                ...ProductVariant\n                product {\n                  handle\n                  title\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CartDocument,
    "\n  query Collection(\n    $handle: String!\n    $first: Int!\n    $sortKey: ProductCollectionSortKeys!\n    $sortReverse: Boolean!\n    $filters: [ProductFilter!]\n  ) {\n    collection(handle: $handle) {\n      id\n      products(\n        first: $first\n        sortKey: $sortKey\n        reverse: $sortReverse\n        filters: $filters\n      ) {\n        filters {\n          id\n          label\n          values {\n            input\n            label\n            swatch {\n              color\n            }\n          }\n        }\n        edges {\n          node {\n            ...Product\n            variants(first: 250) {\n              edges {\n                node {\n                  ...ProductVariant\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CollectionDocument,
    "\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n      variants(first: 250) {\n        edges {\n          node {\n            ...ProductVariant\n          }\n        }\n      }\n    }\n  }\n": types.ProductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MailingAddress on MailingAddress {\n    id\n    address1\n    address2\n    city\n    company\n    country\n    firstName\n    lastName\n    phone\n    province\n    zip\n  }\n"): (typeof documents)["\n  fragment MailingAddress on MailingAddress {\n    id\n    address1\n    address2\n    city\n    company\n    country\n    firstName\n    lastName\n    phone\n    province\n    zip\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Order on Order {\n    id\n    name\n    orderNumber\n    financialStatus\n    fulfillmentStatus\n    processedAt\n  }\n"): (typeof documents)["\n  fragment Order on Order {\n    id\n    name\n    orderNumber\n    financialStatus\n    fulfillmentStatus\n    processedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Product on Product {\n    id\n    handle\n    title\n    options {\n      id\n      name\n      optionValues {\n        swatch {\n          color\n        }\n        name\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Product on Product {\n    id\n    handle\n    title\n    options {\n      id\n      name\n      optionValues {\n        swatch {\n          color\n        }\n        name\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n    }\n    selectedOptions {\n      name\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment ProductVariant on ProductVariant {\n    id\n    title\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    price {\n      amount\n      currencyCode\n    }\n    image {\n      url\n      altText\n    }\n    selectedOptions {\n      name\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCustomer($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomer($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCustomerToken($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomerToken($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCustomerAddress(\n    $customerAccessToken: String!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressCreate(\n      customerAccessToken: $customerAccessToken\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCustomerAddress(\n    $customerAccessToken: String!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressCreate(\n      customerAccessToken: $customerAccessToken\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n    $address: MailingAddressInput!\n  ) {\n    customerAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n      address: $address\n    ) {\n      customerAddress {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDefaultCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerDefaultAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      addressId: $addressId\n    ) {\n      customer {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDefaultCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerDefaultAddressUpdate(\n      customerAccessToken: $customerAccessToken\n      addressId: $addressId\n    ) {\n      customer {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerAddressDelete(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n    ) {\n      deletedCustomerAddressId\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCustomerAddress(\n    $customerAccessToken: String!\n    $addressId: ID!\n  ) {\n    customerAddressDelete(\n      customerAccessToken: $customerAccessToken\n      id: $addressId\n    ) {\n      deletedCustomerAddressId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCart($input: CartInput) {\n    cartCreate(input: $input) {\n      cart {\n        id\n        checkoutUrl\n        lines(first: 100) {\n          edges {\n            node {\n              id\n              quantity\n              merchandise {\n                ... on ProductVariant {\n                  ...ProductVariant\n                  product {\n                    title\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCart($input: CartInput) {\n    cartCreate(input: $input) {\n      cart {\n        id\n        checkoutUrl\n        lines(first: 100) {\n          edges {\n            node {\n              id\n              quantity\n              merchandise {\n                ... on ProductVariant {\n                  ...ProductVariant\n                  product {\n                    title\n                    handle\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCartBuyerIdentity(\n    $cartId: ID!\n    $buyerIdentity: CartBuyerIdentityInput!\n  ) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCartBuyerIdentity(\n    $cartId: ID!\n    $buyerIdentity: CartBuyerIdentityInput!\n  ) {\n    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Customer($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      id\n      acceptsMarketing\n      firstName\n      lastName\n      displayName\n      email\n      phone\n      createdAt\n      updatedAt\n      defaultAddress {\n        ...MailingAddress\n      }\n      addresses(first: 20) {\n        edges {\n          node {\n            ...MailingAddress\n          }\n        }\n      }\n      orders(first: 20) {\n        edges {\n          node {\n            ...Order\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Customer($customerAccessToken: String!) {\n    customer(customerAccessToken: $customerAccessToken) {\n      id\n      acceptsMarketing\n      firstName\n      lastName\n      displayName\n      email\n      phone\n      createdAt\n      updatedAt\n      defaultAddress {\n        ...MailingAddress\n      }\n      addresses(first: 20) {\n        edges {\n          node {\n            ...MailingAddress\n          }\n        }\n      }\n      orders(first: 20) {\n        edges {\n          node {\n            ...Order\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Cart($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      lines(first: 100) {\n        edges {\n          node {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                ...ProductVariant\n                product {\n                  handle\n                  title\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Cart($cartId: ID!) {\n    cart(id: $cartId) {\n      id\n      checkoutUrl\n      lines(first: 100) {\n        edges {\n          node {\n            id\n            quantity\n            merchandise {\n              ... on ProductVariant {\n                ...ProductVariant\n                product {\n                  handle\n                  title\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Collection(\n    $handle: String!\n    $first: Int!\n    $sortKey: ProductCollectionSortKeys!\n    $sortReverse: Boolean!\n    $filters: [ProductFilter!]\n  ) {\n    collection(handle: $handle) {\n      id\n      products(\n        first: $first\n        sortKey: $sortKey\n        reverse: $sortReverse\n        filters: $filters\n      ) {\n        filters {\n          id\n          label\n          values {\n            input\n            label\n            swatch {\n              color\n            }\n          }\n        }\n        edges {\n          node {\n            ...Product\n            variants(first: 250) {\n              edges {\n                node {\n                  ...ProductVariant\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Collection(\n    $handle: String!\n    $first: Int!\n    $sortKey: ProductCollectionSortKeys!\n    $sortReverse: Boolean!\n    $filters: [ProductFilter!]\n  ) {\n    collection(handle: $handle) {\n      id\n      products(\n        first: $first\n        sortKey: $sortKey\n        reverse: $sortReverse\n        filters: $filters\n      ) {\n        filters {\n          id\n          label\n          values {\n            input\n            label\n            swatch {\n              color\n            }\n          }\n        }\n        edges {\n          node {\n            ...Product\n            variants(first: 250) {\n              edges {\n                node {\n                  ...ProductVariant\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n      variants(first: 250) {\n        edges {\n          node {\n            ...ProductVariant\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Product($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n      variants(first: 250) {\n        edges {\n          node {\n            ...ProductVariant\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;