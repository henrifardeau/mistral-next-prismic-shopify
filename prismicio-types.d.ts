// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *Collections → Products*
 */
export interface CollectionsDocumentDataProductsItem {
  /**
   * Product field in *Collections → Products*
   *
   * - **Field Type**: Content Relationship
   * - **Placeholder**: *None*
   * - **API ID Path**: collections.products[].product
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  product: prismic.ContentRelationshipField<'products'>;
}

type CollectionsDocumentDataSlicesSlice = ProductHightlightSlice;

/**
 * Content for Collections documents
 */
interface CollectionsDocumentData {
  /**
   * Title field in *Collections*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: collections.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Products field in *Collections*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: collections.products[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  products: prismic.GroupField<Simplify<CollectionsDocumentDataProductsItem>>;

  /**
   * Slice Zone field in *Collections*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: collections.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<CollectionsDocumentDataSlicesSlice> /**
   * Meta Title field in *Collections*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: collections.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Collections*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: collections.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Collections*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: collections.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Collections document from Prismic
 *
 * - **API ID**: `collections`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CollectionsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<CollectionsDocumentData>,
    'collections',
    Lang
  >;

type HomepageDocumentDataSlicesSlice = ProductHightlightSlice;

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
  /**
   * Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Slice Zone field in *Homepage*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
   * Meta Title field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: homepage.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Homepage*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: homepage.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Homepage*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: homepage.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<HomepageDocumentData>,
    'homepage',
    Lang
  >;

type ProductsDocumentDataSlicesSlice = ProductHeaderSlice;

/**
 * Content for Products documents
 */
interface ProductsDocumentData {
  /**
   * Shopify Handle field in *Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products.shopify_handle
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  shopify_handle: prismic.KeyTextField;

  /**
   * Shopify Product Id field in *Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products.shopify_product_id
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  shopify_product_id: prismic.KeyTextField;

  /**
   * Title field in *Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: products.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Slice Zone field in *Products*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: products.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<ProductsDocumentDataSlicesSlice> /**
   * Meta Title field in *Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: products.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Products*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: products.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *Products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: products.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Products document from Prismic
 *
 * - **API ID**: `products`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProductsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    Simplify<ProductsDocumentData>,
    'products',
    Lang
  >;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Meta title field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta image field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    'settings',
    Lang
  >;

export type AllDocumentTypes =
  | CollectionsDocument
  | HomepageDocument
  | ProductsDocument
  | SettingsDocument;

/**
 * Item in *ProductHeader → Default → Primary → Thumbnails*
 */
export interface ProductHeaderSliceDefaultPrimaryThumbnailsItem {
  /**
   * Thumbnail field in *ProductHeader → Default → Primary → Thumbnails*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: product_header.default.primary.thumbnails[].thumbnail
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  thumbnail: prismic.ImageField<never>;
}

/**
 * Item in *ProductHeader → Default → Primary → Variant Thumbnails*
 */
export interface ProductHeaderSliceDefaultPrimaryVariantThumbnailsItem {
  /**
   * Shopify Variant Ids field in *ProductHeader → Default → Primary → Variant Thumbnails*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: product_header.default.primary.variant_thumbnails[].shopify_variant_ids
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  shopify_variant_ids: prismic.KeyTextField;

  /**
   * Thumbnail field in *ProductHeader → Default → Primary → Variant Thumbnails*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: product_header.default.primary.variant_thumbnails[].thumbnail
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  thumbnail: prismic.ImageField<never>;
}

/**
 * Primary content in *ProductHeader → Default → Primary*
 */
export interface ProductHeaderSliceDefaultPrimary {
  /**
   * Title field in *ProductHeader → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: product_header.default.primary.title
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Thumbnails field in *ProductHeader → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: product_header.default.primary.thumbnails[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  thumbnails: prismic.GroupField<
    Simplify<ProductHeaderSliceDefaultPrimaryThumbnailsItem>
  >;

  /**
   * Variant Thumbnails field in *ProductHeader → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: product_header.default.primary.variant_thumbnails[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  variant_thumbnails: prismic.GroupField<
    Simplify<ProductHeaderSliceDefaultPrimaryVariantThumbnailsItem>
  >;
}

/**
 * Default variation for ProductHeader Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductHeaderSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProductHeaderSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ProductHeader*
 */
type ProductHeaderSliceVariation = ProductHeaderSliceDefault;

/**
 * ProductHeader Shared Slice
 *
 * - **API ID**: `product_header`
 * - **Description**: ProductHeader
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductHeaderSlice = prismic.SharedSlice<
  'product_header',
  ProductHeaderSliceVariation
>;

/**
 * Item in *ProductHightlight → Default → Primary → Products*
 */
export interface ProductHightlightSliceDefaultPrimaryProductsItem {
  /**
   * Thumbnail field in *ProductHightlight → Default → Primary → Products*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: product_hightlight.default.primary.products[].thumbnail
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  thumbnail: prismic.ImageField<never>;

  /**
   * Link field in *ProductHightlight → Default → Primary → Products*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: product_hightlight.default.primary.products[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *ProductHightlight → Default → Primary*
 */
export interface ProductHightlightSliceDefaultPrimary {
  /**
   * Heading field in *ProductHightlight → Default → Primary*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: product_hightlight.default.primary.heading
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  heading: prismic.RichTextField;

  /**
   * Products field in *ProductHightlight → Default → Primary*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: product_hightlight.default.primary.products[]
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  products: prismic.GroupField<
    Simplify<ProductHightlightSliceDefaultPrimaryProductsItem>
  >;
}

/**
 * Default variation for ProductHightlight Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductHightlightSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProductHightlightSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ProductHightlight*
 */
type ProductHightlightSliceVariation = ProductHightlightSliceDefault;

/**
 * ProductHightlight Shared Slice
 *
 * - **API ID**: `product_hightlight`
 * - **Description**: ProductHightlight
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductHightlightSlice = prismic.SharedSlice<
  'product_hightlight',
  ProductHightlightSliceVariation
>;

declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  interface CreateWriteClient {
    (
      repositoryNameOrEndpoint: string,
      options: prismic.WriteClientConfig,
    ): prismic.WriteClient<AllDocumentTypes>;
  }

  interface CreateMigration {
    (): prismic.Migration<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      CollectionsDocument,
      CollectionsDocumentData,
      CollectionsDocumentDataProductsItem,
      CollectionsDocumentDataSlicesSlice,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      ProductsDocument,
      ProductsDocumentData,
      ProductsDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      AllDocumentTypes,
      ProductHeaderSlice,
      ProductHeaderSliceDefaultPrimaryThumbnailsItem,
      ProductHeaderSliceDefaultPrimaryVariantThumbnailsItem,
      ProductHeaderSliceDefaultPrimary,
      ProductHeaderSliceVariation,
      ProductHeaderSliceDefault,
      ProductHightlightSlice,
      ProductHightlightSliceDefaultPrimaryProductsItem,
      ProductHightlightSliceDefaultPrimary,
      ProductHightlightSliceVariation,
      ProductHightlightSliceDefault,
    };
  }
}
