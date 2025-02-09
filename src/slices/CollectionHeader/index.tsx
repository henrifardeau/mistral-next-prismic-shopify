import { ChevronRight } from 'lucide-react';
import { FC } from 'react';

import {
  CollectionDoc,
  getCollectionIds,
  mergeCollectionsRefs,
  prismic,
} from '@/lib/prismic';
import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';
import Link from 'next/link';

/**
 * Props for `CollectionHeader`.
 */
export type CollectionHeaderProps =
  SliceComponentProps<Content.CollectionHeaderSlice>;

/**
 * Component for "CollectionHeader" Slices.
 */
const CollectionHeader: FC<CollectionHeaderProps> = async ({ slice }) => {
  const { links, title } = slice.primary;

  const collectionIds = getCollectionIds(slice.primary.collections);

  const rawCollections =
    await prismic.getAllByIDs<CollectionDoc>(collectionIds);
  const collections = mergeCollectionsRefs(
    slice.primary.collections,
    rawCollections,
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-6 pb-12"
    >
      <nav aria-label="breadcrumb">
        <ol className="flex items-center overflow-x-auto overflow-y-hidden">
          {links.map((link, index) => {
            const isLast = index === links.length - 1;

            return (
              <li
                key={index}
                aria-current={isLast ? 'page' : undefined}
                className="flex items-center text-xs text-neutral-700 uppercase"
              >
                {!isLast ? (
                  <PrismicNextLink
                    field={link}
                    className="hover:underline focus:underline focus:outline-hidden"
                  />
                ) : (
                  <span>{link.text}</span>
                )}

                {!isLast && (
                  <span className="mx-1">
                    <ChevronRight className="size-4" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <h1 className="text-4xl font-medium">{title}</h1>
      <ul className="grid auto-cols-[minmax(0,200px)] grid-flow-col gap-4 pt-6">
        {collections.map((collection) => (
          <li key={collection.collection.uid}>
            <Link
              href={collection.collection.url!}
              className="flex h-full flex-col items-center justify-center border px-4 py-2"
            >
              <PrismicNextImage
                field={collection.thumbnail}
                fallbackAlt=""
                className="size-14"
              />
              <span>
                {collection.link_text
                  ? collection.link_text
                  : collection.collection.data.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CollectionHeader;
