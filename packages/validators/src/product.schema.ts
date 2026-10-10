import { z } from 'zod';

export const productColorSchema = z.object({
  name: z.string().min(1, 'El nombre del color es obligatorio'),
  hex: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Color hexadecimal inválido').optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug inválido (solo minúsculas y guiones)'),
  description: z.string().max(1000).optional().nullable(),
  price_min: z.number().min(0, 'El precio mínimo debe ser mayor o igual a 0'),
  price_max: z.number().min(0, 'El precio máximo debe ser mayor o igual a 0'),
  image_url: z.string().url('URL de imagen inválida').optional().nullable(),
  images_json: z.array(z.string().url()).default([]),
  sizes_json: z.array(z.string().min(1)).default([]),
  colors_json: z.array(z.union([productColorSchema, z.string().min(1)])).default([]),
  tags_json: z.array(z.string().min(1)).default([]),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
}).refine((data) => data.price_max >= data.price_min, {
  message: 'El precio máximo no puede ser menor que el precio mínimo',
  path: ['price_max'],
});

export type ProductInput = z.infer<typeof productSchema>;
