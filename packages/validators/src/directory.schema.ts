import { z } from 'zod';

export const directoryFilterSchema = z.object({
  query: z.string().max(100).optional().default(''),
  category_id: z.string().uuid('ID de categoría inválido').optional(),
  floor: z.string().max(20).optional(),
  is_active: z.boolean().optional().default(true),
  has_active_offers: z.boolean().optional(),
});

export type DirectoryFilterInput = z.infer<typeof directoryFilterSchema>;
