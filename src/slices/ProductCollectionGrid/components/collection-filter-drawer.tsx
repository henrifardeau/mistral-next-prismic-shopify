'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  ColorSwatchPicker,
  ImagePicker,
  ListPicker,
  SwitchPickers,
  SwitchPickersMultipleProps,
} from '@/components/pickers';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDrawer } from '@/hooks/use-drawer';
import { VerifiedOption } from '@/types/common';

type Filters = Record<string, string[]>;
type SwitchComponents = SwitchPickersMultipleProps['components'];

export function CollectionFilterDrawer({
  filters,
  initialFilters,
}: {
  filters: VerifiedOption[];
  initialFilters: Filters;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterOpen = useDrawer((state) => state.filter);
  const closeDrawer = useDrawer((state) => state.closeDrawer);

  const [nextFilters, setNextFilters] = useState<Filters>(initialFilters);

  const handleOptionChange = (name: string, value: string[]) => {
    setNextFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionCancel = () => {
    closeDrawer('filter')();
    setNextFilters(initialFilters);
  };

  const handleOptionApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (Object.values(nextFilters).some((e) => e.length > 0)) {
      params.set('filters', btoa(JSON.stringify(nextFilters)));
    } else {
      params.delete('filters');
    }

    router.push(`${pathname}?${params.toString()}`);
    closeDrawer('filter')();
  };

  const switchComponents: SwitchComponents = useMemo(() => {
    return {
      color: ({ mode, option, value, onValueChange }) => (
        <AccordionItem value={option.name}>
          <AccordionTrigger>{option.name}</AccordionTrigger>
          <AccordionContent>
            <ColorSwatchPicker
              mode={mode}
              option={option}
              value={value}
              onValueChange={onValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      ),
      image: ({ mode, option, value, onValueChange }) => (
        <AccordionItem value={option.name}>
          <AccordionTrigger>{option.name}</AccordionTrigger>
          <AccordionContent>
            <ImagePicker
              mode={mode}
              option={option}
              value={value}
              onValueChange={onValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      ),
      list: ({ mode, option, value, onValueChange }) => (
        <AccordionItem value={option.name}>
          <AccordionTrigger>{option.name}</AccordionTrigger>
          <AccordionContent>
            <ListPicker
              mode={mode}
              option={option}
              value={value}
              onValueChange={onValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      ),
    };
  }, []);

  return (
    <Drawer open={filterOpen} onOpenChange={handleOptionCancel}>
      <DrawerContent className="w-full max-w-96 overflow-x-hidden">
        <DrawerHeader className="pb-12">
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Accordion type="multiple" className="w-full">
            <SwitchPickers
              mode="multiple"
              options={filters}
              currentOptions={nextFilters}
              onValueChange={handleOptionChange}
              components={switchComponents}
            />
          </Accordion>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex items-center justify-between space-x-2">
            <button
              type="button"
              className="w-full rounded-full bg-neutral-100 px-4 py-2 text-black"
              onClick={handleOptionCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full rounded-full bg-black px-4 py-2 text-white"
              onClick={handleOptionApply}
            >
              Apply
            </button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
