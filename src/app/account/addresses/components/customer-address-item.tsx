'use client';

import { CustomerAddress } from '@/types/customer';

import { CustomerRemoveAddress } from './customer-remove-adress';
import { CustomerUpdateAddress } from './customer-update-address';
import { CustomerUpdateDefaultAddress } from './customer-update-default-adress';

export function CustomerAddressItem({ address }: { address: CustomerAddress }) {
  return (
    <li className="flex min-h-80 flex-col justify-between space-y-4 border p-8">
      <div>
        {address.default && <span className="uppercase">Default address</span>}
        <h4>{address.address1}</h4>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {!address.default && (
          <div className="col-span-2">
            <CustomerUpdateDefaultAddress address={address} />
          </div>
        )}
        <CustomerUpdateAddress address={address} />
        <CustomerRemoveAddress address={address} />
      </div>
    </li>
  );
}
