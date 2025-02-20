import { redirect } from 'next/navigation';

import { destroyCustomer, getCustomer } from '@/lib/shopify/actions';

export default async function Page() {
  const customer = await getCustomer();

  if (!customer.authenticated) {
    return redirect('/');
  }

  return (
    <div>
      <form action={destroyCustomer}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
