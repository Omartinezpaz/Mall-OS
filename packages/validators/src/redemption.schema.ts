import { z } from 'zod';

export const redeemCouponSchema = z.object({
  code: z
    .string()
    .min(8, 'El código debe tener 8 caracteres')
    .max(8, 'El código debe tener 8 caracteres')
    .regex(/^[A-Za-z2-9]{8}$/, 'Formato de código inválido'),
});

export type RedeemCouponInput = z.infer<typeof redeemCouponSchema>;
