import {
  FilledImageFieldImage,
  ImageField,
  isFilled,
  KeyTextField,
} from '@prismicio/client';

import { shopify } from '../shopify';

export function flatProductImages(images: { thumbnail: ImageField }[]) {
  return (images || []).reduce((acc, cur) => {
    if (!isFilled.image(cur.thumbnail)) {
      return acc;
    }
    acc.push(cur.thumbnail);

    return acc;
  }, [] as FilledImageFieldImage[]);
}

export function flatVariantsImages(
  variantsImages: {
    shopify_variant_ids: KeyTextField;
    thumbnail: ImageField;
  }[],
) {
  return (variantsImages || []).reduce(
    (acc, cur) => {
      if (!isFilled.keyText(cur.shopify_variant_ids)) {
        return acc;
      }

      cur.shopify_variant_ids.split('_').forEach((id) => {
        const variantId = shopify.addPrefix('variant', id);

        if (isFilled.image(cur.thumbnail)) {
          (acc[variantId] ||= []).push(cur.thumbnail);
        }
      });

      return acc;
    },
    {} as Record<string, FilledImageFieldImage[]>,
  );
}
