// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type CollectionsDocumentDataSlicesSlice = ProductCollectionGridSlice;

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

/**
 * Item in *Menu → Primary Links*
 */
export interface MenuDocumentDataPrimaryLinksItem {
  /**
   * UID field in *Menu → Primary Links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.primary_links[].uid
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  uid: prismic.KeyTextField;

  /**
   * Link field in *Menu → Primary Links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.primary_links[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;

  /**
   * Icon field in *Menu → Primary Links*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.primary_links[].icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  icon: prismic.ImageField<never>;
}

/**
 * Item in *Menu → Secondary Links*
 */
export interface MenuDocumentDataSecondaryLinksItem {
  /**
   * Parent UID field in *Menu → Secondary Links*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.secondary_links[].parent_uid
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  parent_uid: prismic.KeyTextField;

  /**
   * Link field in *Menu → Secondary Links*
   *
   * - **Field Type**: Link
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.secondary_links[].link
   * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
   */
  link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;

  /**
   * Icon field in *Menu → Secondary Links*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.secondary_links[].icon
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  icon: prismic.ImageField<never>;
}

/**
 * Content for Menu documents
 */
interface MenuDocumentData {
  /**
   * Primary Links field in *Menu*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.primary_links[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  primary_links: prismic.GroupField<Simplify<MenuDocumentDataPrimaryLinksItem>>;

  /**
   * Secondary Links field in *Menu*
   *
   * - **Field Type**: Group
   * - **Placeholder**: *None*
   * - **API ID Path**: menu.secondary_links[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#group
   */
  secondary_links: prismic.GroupField<
    Simplify<MenuDocumentDataSecondaryLinksItem>
  >;
}

/**
 * Menu document from Prismic
 *
 * - **API ID**: `menu`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MenuDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<Simplify<MenuDocumentData>, 'menu', Lang>;

type NavigationDocumentDataSlicesSlice =
  | NavigationSlice
  | NavigationAnnoncementSlice;

/**
 * Content for Navigation documents
 */
interface NavigationDocumentData {
  /**
   * Slice Zone field in *Navigation*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<NavigationDocumentDataSlicesSlice>;
}

/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<NavigationDocumentData>,
    'navigation',
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
  | MenuDocument
  | NavigationDocument
  | ProductsDocument
  | SettingsDocument;

/**
 * Default variation for Navigation Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NavigationSliceDefault = prismic.SharedSliceVariation<
  'default',
  Record<string, never>,
  never
>;

/**
 * Slice variation for *Navigation*
 */
type NavigationSliceVariation = NavigationSliceDefault;

/**
 * Navigation Shared Slice
 *
 * - **API ID**: `navigation`
 * - **Description**: Navigation
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NavigationSlice = prismic.SharedSlice<
  'navigation',
  NavigationSliceVariation
>;

/**
 * Primary content in *Annoncement → Default → Primary*
 */
export interface NavigationAnnoncementSliceDefaultPrimary {
  /**
   * Annoncement field in *Annoncement → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: navigation_annoncement.default.primary.annoncement
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  annoncement: prismic.KeyTextField;
}

/**
 * Default variation for Annoncement Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NavigationAnnoncementSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<NavigationAnnoncementSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Annoncement*
 */
type NavigationAnnoncementSliceVariation = NavigationAnnoncementSliceDefault;

/**
 * Annoncement Shared Slice
 *
 * - **API ID**: `navigation_annoncement`
 * - **Description**: NavigationAnnoncement
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NavigationAnnoncementSlice = prismic.SharedSlice<
  'navigation_annoncement',
  NavigationAnnoncementSliceVariation
>;

/**
 * Primary content in *ProductCollectionGrid → Default → Primary*
 */
export interface ProductCollectionGridSliceDefaultPrimary {
  /**
   * Shopify Collection Handle field in *ProductCollectionGrid → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: product_collection_grid.default.primary.shopify_collection_handle
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  shopify_collection_handle: prismic.KeyTextField;

  /**
   * Page Size field in *ProductCollectionGrid → Default → Primary*
   *
   * - **Field Type**: Number
   * - **Placeholder**: *None*
   * - **API ID Path**: product_collection_grid.default.primary.page_size
   * - **Documentation**: https://prismic.io/docs/field#number
   */
  page_size: prismic.NumberField;
}

/**
 * Default variation for ProductCollectionGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductCollectionGridSliceDefault = prismic.SharedSliceVariation<
  'default',
  Simplify<ProductCollectionGridSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *ProductCollectionGrid*
 */
type ProductCollectionGridSliceVariation = ProductCollectionGridSliceDefault;

/**
 * ProductCollectionGrid Shared Slice
 *
 * - **API ID**: `product_collection_grid`
 * - **Description**: ProductCollectionGrid
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ProductCollectionGridSlice = prismic.SharedSlice<
  'product_collection_grid',
  ProductCollectionGridSliceVariation
>;

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
      CollectionsDocumentDataSlicesSlice,
      HomepageDocument,
      HomepageDocumentData,
      HomepageDocumentDataSlicesSlice,
      MenuDocument,
      MenuDocumentData,
      MenuDocumentDataPrimaryLinksItem,
      MenuDocumentDataSecondaryLinksItem,
      NavigationDocument,
      NavigationDocumentData,
      NavigationDocumentDataSlicesSlice,
      ProductsDocument,
      ProductsDocumentData,
      ProductsDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      AllDocumentTypes,
      NavigationSlice,
      NavigationSliceVariation,
      NavigationSliceDefault,
      NavigationAnnoncementSlice,
      NavigationAnnoncementSliceDefaultPrimary,
      NavigationAnnoncementSliceVariation,
      NavigationAnnoncementSliceDefault,
      ProductCollectionGridSlice,
      ProductCollectionGridSliceDefaultPrimary,
      ProductCollectionGridSliceVariation,
      ProductCollectionGridSliceDefault,
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
