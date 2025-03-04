'use client';

import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { destroyCustomer } from '@/api/actions';
import { NavLink } from '@/components/nav-link';

import { CustomerUpdate } from './components';
import { useCustomer } from '@/hooks/use-customer';

export default function AccountLayout({ children }: PropsWithChildren) {
  const { optimisticCustomer } = useCustomer();

  if (!optimisticCustomer.authenticated) {
    return redirect('/');
  }

  return (
    <div className="container divide-y">
      <header className="space-y-4 border-t py-4">
        {(optimisticCustomer.firstName || optimisticCustomer.lastName) && (
          <div>
            <h2 className="text-4xl font-semibold capitalize">
              {optimisticCustomer.firstName} {optimisticCustomer.lastName}
            </h2>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase">
              {optimisticCustomer.email}
            </span>
            <span className="text-xs uppercase">
              Customer since{' '}
              {new Date(optimisticCustomer.createdAt).getFullYear()}
            </span>
          </div>

          <CustomerUpdate />
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
