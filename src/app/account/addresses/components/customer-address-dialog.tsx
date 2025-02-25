'use client';

import { useTransition } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AddressPayload, addressSchema } from '@/lib/shopify/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export function CustomerAddressDialog({
  open,
  defaultValues,
  onOpenChange,
  submitAction,
}: {
  open: boolean;
  defaultValues?: DefaultValues<AddressPayload>;
  onOpenChange: (open: boolean) => void;
  submitAction: (data: AddressPayload) => Promise<void>;
}) {
  const [, startTransition] = useTransition();

  const form = useForm<AddressPayload>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address1: defaultValues?.address1 ?? '',
      address2: defaultValues?.address2 ?? '',
      city: defaultValues?.city ?? 'Paris',
      company: defaultValues?.company ?? '',
      country: defaultValues?.country ?? 'France',
      firstName: defaultValues?.firstName ?? 'Paul',
      lastName: defaultValues?.lastName ?? 'Po',
      phone: defaultValues?.phone ?? '',
      province: defaultValues?.province ?? 'France',
      zip: defaultValues?.zip ?? '75000',
    },
  });

  const beforeClose = () => {
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = async (data: AddressPayload) => {
    beforeClose();
    startTransition(async () => {
      await submitAction(data);
    });
  };

  return (
    <Dialog open={open} onOpenChange={beforeClose}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader className="hidden">
          <DialogTitle>Addresse management</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="given-name"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="familly-name"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="address-line1"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App. Suit. Etc.</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="address-line2"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="address-level2"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="postal-code"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="country"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="address-level1"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="tel"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="organization"
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="button"
              onClick={beforeClose}
              className="w-full bg-neutral-500 py-2 text-white transition-colors hover:bg-black/75 disabled:pointer-events-none disabled:opacity-75"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-black py-2 text-white transition-colors hover:bg-black/75 disabled:pointer-events-none disabled:opacity-75"
            >
              Submit
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
