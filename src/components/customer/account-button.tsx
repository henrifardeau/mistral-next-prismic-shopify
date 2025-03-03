'use client';

import Link from 'next/link';

import { useCustomerStore } from '@/hooks/use-customer';
import { useDrawer } from '@/hooks/use-drawer';

export function AccountButton() {
  const openDrawer = useDrawer((state) => state.openDrawer);

  const { optimisticCustomer } = useCustomerStore();

  if (optimisticCustomer.authenticated) {
    return (
      <Link
        href="/account"
        className="flex h-10 w-10 items-center justify-center text-black"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current">
          <path d="M16.78 13.75C16.1 12.27 15.12 11.49 13.94 11.49H5.53C4.37 11.49 3.41 12.26 2.76 13.72C2.28 14.79 2 16.19 2 17.48C2 19.47 2.68 19.76 3.09 19.76H16.49C16.9 19.76 17.59 19.47 17.59 17.55C17.59 16.29 17.28 14.84 16.79 13.76L16.78 13.75Z" />
          <path d="M9.79 9.32C12.5293 9.32 14.75 7.23365 14.75 4.66C14.75 2.08635 12.5293 0 9.79 0C7.05067 0 4.83 2.08635 4.83 4.66C4.83 7.23365 7.05067 9.32 9.79 9.32Z" />
        </svg>
      </Link>
    );
  }

  return (
    <button
      onClick={openDrawer('account')}
      className="flex h-10 w-10 items-center justify-center text-black"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0122 1.95822C7.93466 1.95822 6.37084 3.48269 6.37084 5.29962C6.37084 7.00208 8.01887 8.54102 10.0122 8.54102C12.0056 8.54102 13.6536 7.00208 13.6536 5.29962C13.6536 3.48964 11.9973 1.95822 10.0122 1.95822ZM5.45364 5.29962C5.45364 2.91655 7.48981 1.04102 10.0122 1.04102C12.4271 1.04102 14.5708 2.90959 14.5708 5.29962C14.5708 7.59715 12.4189 9.45822 10.0122 9.45822C7.6056 9.45822 5.45364 7.59715 5.45364 5.29962ZM4.01324 12.6699C4.49339 11.976 5.18596 11.441 6.11224 11.441H13.8122C14.7401 11.441 15.4382 11.9841 15.9257 12.6824C16.411 13.3774 16.7287 14.2768 16.911 15.1426C17.0937 16.0104 17.1492 16.8869 17.081 17.557C17.0474 17.8866 16.9805 18.203 16.8592 18.4482C16.7462 18.6764 16.5052 18.9825 16.0957 18.9582H3.91224C3.50621 18.9582 3.2737 18.6488 3.1604 18.4183C3.03873 18.1706 2.96723 17.854 2.92857 17.5213C2.85026 16.8471 2.89236 15.9737 3.06228 15.111C3.23173 14.2507 3.53653 13.3589 4.01324 12.6699ZM3.99777 18.041C3.99352 18.0333 3.98878 18.0243 3.9836 18.0138C3.92794 17.9005 3.87287 17.7015 3.83965 17.4154C3.77421 16.8521 3.80711 16.0756 3.96219 15.2882C4.11774 14.4985 4.38794 13.7403 4.76749 13.1918C5.14359 12.6482 5.58851 12.3582 6.11224 12.3582H13.8122C14.3343 12.3582 14.7863 12.6526 15.1737 13.2075C15.5634 13.7656 15.8458 14.5349 16.0135 15.3316C16.1808 16.1263 16.2253 16.9061 16.1685 17.4641C16.1396 17.7483 16.0878 17.9389 16.0373 18.041H3.99777ZM4.02389 18.0797C4.02383 18.08 4.02202 18.0784 4.01861 18.074C4.02223 18.0772 4.02394 18.0794 4.02389 18.0797ZM16.0089 18.0896C16.0089 18.0895 16.0099 18.0882 16.0119 18.086C16.0099 18.0887 16.0089 18.0898 16.0089 18.0896Z"
        />
      </svg>
    </button>
  );
}
