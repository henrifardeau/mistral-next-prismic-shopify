import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `NavigationAnnoncement`.
 */
export type NavigationAnnoncementProps =
  SliceComponentProps<Content.NavigationAnnoncementSlice>;

/**
 * Component for "NavigationAnnoncement" Slices.
 */
const NavigationAnnoncement: FC<NavigationAnnoncementProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid gap-8 px-6 pt-2 md:grid-cols-[150px_1fr_150px]"
    >
      <div className="hidden items-center justify-start md:flex">
        <span className="text-xs font-medium text-black uppercase">
          For the Restless
        </span>
      </div>
      <div className="w-full max-w-xl justify-self-center overflow-hidden">
        {slice.primary.annoncement && (
          <div className="flex w-full items-center justify-center rounded-full bg-black p-2">
            <span className="text-xs font-medium whitespace-nowrap text-white uppercase">
              {slice.primary.annoncement}
            </span>
          </div>
        )}
      </div>
      <div className="hidden items-center justify-end md:flex">
        <span className="text-xs font-medium text-black uppercase">
          Los Angeles 02:46 PST
        </span>
      </div>
    </section>
  );
};

export default NavigationAnnoncement;
