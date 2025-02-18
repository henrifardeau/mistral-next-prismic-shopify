import { destroyCustomer } from '@/lib/shopify/actions';

export default function Page() {
  return (
    <div>
      <form action={destroyCustomer}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
