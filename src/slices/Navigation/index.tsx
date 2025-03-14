import Link from 'next/link';
import { FC } from 'react';

import { CartButton } from '@/components/cart';
import { AccountButton } from '@/components/customer';
import { MenuButton } from '@/components/menu';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Navigation`.
 */
export type NavigationProps = SliceComponentProps<Content.NavigationSlice>;

/**
 * Component for "Navigation" Slices.
 */
const Navigation: FC<NavigationProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <nav className="relative flex h-32 items-center justify-between px-6">
        <div className="grid w-full grid-cols-3 lg:grid-cols-[340px_1fr_340px]">
          <div className="flex items-center justify-start">
            <ol className="flex items-center justify-center">
              <li>
                <MenuButton />
              </li>
            </ol>
          </div>
          <div className="flex items-center justify-center justify-self-center">
            <Link href="/">Mistral</Link>
          </div>
          <div className="flex items-center justify-end gap-4">
            <AccountButton />
            <CartButton />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
