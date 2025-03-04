'use client';

import { useTransition } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

import { UpdateCustomerPayload, updateCustomerSchema } from '@/api/schemas';
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
import { zodResolver } from '@hookform/resolvers/zod';

export function CustomerUpdateDialog({
  open,
  defaultValues,
  onOpenChange,
  submitAction,
}: {
  open: boolean;
  defaultValues?: DefaultValues<UpdateCustomerPayload>;
  onOpenChange: (open: boolean) => void;
  submitAction: (data: UpdateCustomerPayload) => Promise<void>;
}) {
  const [, startTransition] = useTransition();

  const form = useForm<UpdateCustomerPayload>({
    resolver: zodResolver(updateCustomerSchema),
    defaultValues: {
      firstName: defaultValues?.firstName ?? '',
      lastName: defaultValues?.lastName ?? '',
      phone: defaultValues?.phone ?? '',
      acceptsMarketing: defaultValues?.acceptsMarketing ?? false,
    },
  });

  const beforeClose = () => {
    onOpenChange(false);
    form.reset();
  };

  const onSubmit = async (data: UpdateCustomerPayload) => {
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
