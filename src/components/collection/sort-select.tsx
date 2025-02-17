'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SORTING } from '@/constants/collection';

export function SortSelect({ sort }: { sort: { name: string; slug: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (sortSlug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortSlug === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sortSlug);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={sort.slug} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={sort.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SORTING.map((sort) => (
            <SelectItem key={sort.slug} value={sort.slug}>
              {sort.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
