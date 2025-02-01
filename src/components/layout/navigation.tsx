import Link from 'next/link';

import { CartButton } from '../cart-button';

export function Navigation() {
  return (
    <nav className="flex h-20 items-center justify-between px-6">
      <div className="grid w-full grid-cols-[44px_1fr_44px]">
        <div>
          <svg
            viewBox="0 0 24 24"
            className="size-6 fill-none stroke-current stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <Link href="/">Mistral</Link>
        </div>
        <div>
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
