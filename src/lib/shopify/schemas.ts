import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInPayload = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema.extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  acceptsMarketing: z.boolean().default(false).optional(),
});
export type SignUpPayload = z.infer<typeof signUpSchema>;

export const recoverSchema = z.object({
  email: z.string().email(),
});
export type RecoverPayload = z.infer<typeof recoverSchema>;

export const addressSchema = z.object({
  address1: z.string().nonempty(),
  address2: z.string().optional(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  city: z.string().nonempty(),
  province: z.string().nonempty(),
  zip: z.string().nonempty(),
  country: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  markAsDefault: z.boolean().default(false),
});
export type AddressPayload = z.infer<typeof addressSchema>;
