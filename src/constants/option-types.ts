/**
 * Used to render a color picker instead of the default radio
 * * (/!\ Option Value must have a swatch.color property /!\)
 */
export const COLLECTION_PRODUCT_COLOR_TYPE = [
  'filter.v.t.shopify.color-pattern',
];

/**
 * Used to render a radio image picker instead of the default radio
 * * (/!\ Option Value must have an image assign (see: src/constants/option-images) /!\)
 */
export const COLLECTION_PRODUCT_IMAGE_TYPE = ['filter.v.option.layout'];

/**
 * Used to render a range slider picker instead of the default radio
 */
export const COLLECTION_PRODUCT_RANGE_TYPE = ['filter.v.price'];

/**
 * Used to render a color picker instead of the default select
 * * (/!\ Option Value must have a swatch.color property /!\)
 */
export const PRODUCT_COLOR_TYPE = ['color'];

/**
 * Used to render a radio image picker instead of the default select
 * * (/!\ Option Value must have an image assign (see: src/constants/option-images) /!\)
 */
export const PRODUCT_IMAGE_TYPE = ['layout'];

/**
 * Used to render a radio list picker instead of the default select
 */
export const PRODUCT_LIST_TYPE = ['size'];
