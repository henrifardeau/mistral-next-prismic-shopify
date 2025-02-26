'use client';

import { useMemo } from 'react';

import {
  ColorSwatchPicker,
  ImagePicker,
  ListPicker,
  SwitchPickers,
  SwitchPickersProps,
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
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDrawer } from '@/hooks/use-drawer';
import { VerifiedOption } from '@/types/common';

type SwitchComponents = SwitchPickersProps['components'];

export function CollectionFilterDrawer({
  filters,
}: {
  filters: VerifiedOption[];
}) {
  const filterOpen = useDrawer((state) => state.filter);
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);

  const switchComponents: SwitchComponents = useMemo(() => {
    return {
      color: ({ option, value, onValueChange }) => (
        <AccordionItem value={option.name}>
          <AccordionTrigger>{option.name}</AccordionTrigger>
          <AccordionContent>
            <ColorSwatchPicker
              option={option}
              value={value}
              onValueChange={onValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      ),
      image: ({ option, value, onValueChange }) => (
        <AccordionItem value={option.name}>
          <AccordionTrigger>{option.name}</AccordionTrigger>
          <AccordionContent>
            <ImagePicker
              option={option}
              value={value}
              onValueChange={onValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      ),
      list: ({ option, value, onValueChange }) => (
        <AccordionItem value={option.name}>
          <AccordionTrigger>{option.name}</AccordionTrigger>
          <AccordionContent>
            <ListPicker
              option={option}
              value={value}
              onValueChange={onValueChange}
            />
          </AccordionContent>
        </AccordionItem>
      ),
      select: () => null,
    };
  }, []);

  return (
    <Drawer open={filterOpen} onOpenChange={setDrawerOpen('filter')}>
      <DrawerContent className="w-full max-w-96 overflow-x-hidden">
        <DrawerHeader className="pb-12">
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Accordion type="multiple" className="w-full">
            <SwitchPickers
              options={filters}
              currentOptions={{}}
              onValueChange={(name: string, value: string) => {
                console.log({ name, value });
              }}
              components={switchComponents}
            />
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
