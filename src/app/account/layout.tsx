import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { NavLink } from '@/components/nav-link';
import { destroyCustomer, getCustomer } from '@/api/actions';

export function generateMetadata(): Metadata {
  return {
    robots: {
      index: false,
      follow: false,
      googleBot: {
        follow: false,
        index: false,
      },
    },
  };
}

export default async function AccountLayout({ children }: PropsWithChildren) {
  const customer = await getCustomer();

  if (!customer.authenticated) {
    return redirect('/');
  }

  return (
    <div className="container divide-y">
      <header className="space-y-4 border-t py-4">
        {(customer.firstName || customer.lastName) && (
          <div>
            <h2 className="text-4xl font-semibold capitalize">
              {customer.firstName} {customer.lastName}
            </h2>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase">{customer.email}</span>
            <span className="text-xs uppercase">
              Customer since {new Date(customer.createdAt).getFullYear()}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center justify-center rounded-full border px-4 py-1 text-sm uppercase"
          >
            Update profile
          </button>
        </div>
      </header>

      <main className="space-y-12 pb-12">
        <nav className="flex items-center gap-4">
          <NavLink
            href="/account"
            className="py-4 text-3xl font-semibold text-neutral-500 data-[active=true]:text-black"
          >
            Profile
          </NavLink>
          <NavLink
            href="/account/orders"
            className="py-4 text-3xl font-semibold text-neutral-500 data-[active=true]:text-black"
          >
            Order History
          </NavLink>
          <NavLink
            href="/account/addresses"
            className="py-4 text-3xl font-semibold text-neutral-500 data-[active=true]:text-black"
          >
            Address Book
          </NavLink>
        </nav>

        {children}
      </main>

      <footer className="py-4">
        <form action={destroyCustomer}>
          <button
            type="submit"
            className="flex items-center justify-center rounded-full border px-4 py-1 text-sm uppercase"
          >
            Log out
          </button>
        </form>
      </footer>
    </div>
  );
}
