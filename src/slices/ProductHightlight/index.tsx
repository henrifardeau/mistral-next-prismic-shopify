import { Content } from '@prismicio/client';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ProductHightlight`.
 */
export type ProductHightlightProps =
  SliceComponentProps<Content.ProductHightlightSlice>;

/**
 * Component for "ProductHightlight" Slices.
 */
export default function ProductHightlight({ slice }: ProductHightlightProps) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-24"
    >
      <div className="px-16">
        <div className="border-t border-black pt-6 pb-8">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-4xl font-medium">{children}</h2>
              ),
            }}
          />
        </div>
        <ul className="grid auto-cols-[1fr] grid-flow-row gap-5 md:grid-cols-[1fr_1fr] lg:grid-flow-col">
          {slice.primary.products.map((item, index) => (
            <li key={index}>
              <article className="grid grid-flow-row items-start gap-5">
                <PrismicNextLink field={item.link}>
                  <PrismicNextImage field={item.thumbnail} alt="" />
                </PrismicNextLink>
                <div>
                  <PrismicNextLink
                    field={item.link}
                    className="inline-flex items-center justify-center rounded-full border border-black px-3 py-1 text-xs whitespace-nowrap uppercase"
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
