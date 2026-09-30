import { z } from 'zod';

export const createOfferSchema = z.object({
  title: z
    .string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  description: z.string().max(500, 'La descripción no puede exceder 500 caracteres').optional(),
  benefit_label: z
    .string()
    .min(2, 'El beneficio es obligatorio (ej. 20% OFF, 2x1)')
    .max(50, 'El beneficio es demasiado largo'),
  terms: z.string().max(1000, 'Los términos no pueden exceder 1000 caracteres').optional(),
  image_url: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  starts_at: z.string().datetime('Fecha de inicio inválida'),
  ends_at: z.string().datetime('Fecha de fin inválida'),
  total_coupons: z
    .number()
    .int('Debe ser un número entero')
    .min(1, 'Debe haber al menos 1 cupón disponible')
    .max(10000, 'El límite máximo es 10,000 cupones'),
  per_user_limit: z
    .number()
    .int('Debe ser un número entero')
    .min(1, 'El límite por usuario debe ser al menos 1')
    .max(10, 'El límite máximo por usuario es 10'),
  store_id: z.string().uuid('ID de tienda inválido'),
  mall_id: z.string().uuid('ID de mall inválido'),
}).refine((data) => new Date(data.ends_at) > new Date(data.starts_at), {
  message: 'La fecha de fin debe ser posterior a la fecha de inicio',
  path: ['ends_at'],
});

export type CreateOfferInput = z.infer<typeof createOfferSchema>;
