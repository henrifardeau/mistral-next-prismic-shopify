'use client';

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
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDrawer } from '@/hooks/use-drawer';
import { VerifiedOption } from '@/types/common';

type Filters = Record<string, string[]>;
type SwitchComponents = SwitchPickersMultipleProps['components'];

export function CollectionFilterDrawer({
  filters,
}: {
  filters: VerifiedOption[];
}) {
  const filterOpen = useDrawer((state) => state.filter);
  const setDrawerOpen = useDrawer((state) => state.setDrawerOpen);

  const [currentFilters, setCurrentFilters] = useState<Filters>({});

  const handleOptionChange = (name: string, value: string[]) => {
    console.log('New option selected', name, value);
    setCurrentFilters((prev) => ({ ...prev, [name]: value }));
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
    <Drawer open={filterOpen} onOpenChange={setDrawerOpen('filter')}>
      <DrawerContent className="w-full max-w-96 overflow-x-hidden">
        <DrawerHeader className="pb-12">
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Accordion type="multiple" className="w-full">
            <SwitchPickers
              mode="multiple"
              options={filters}
              currentOptions={currentFilters}
              onValueChange={handleOptionChange}
              components={switchComponents}
            />
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
