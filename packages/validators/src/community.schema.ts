import { z } from 'zod';

export const communityRelationSchema = z.enum(['family', 'friend', 'partner', 'child']);

export const addCommunityContactSchema = z.object({
  inviteCode: z
    .string()
    .min(6, 'El código debe tener al menos 6 caracteres')
    .max(16, 'Código demasiado extenso')
    .transform((val) => val.trim().toUpperCase()),
  myNickname: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede exceder 30 caracteres')
    .default('Familiar'),
  myRelation: communityRelationSchema.default('family'),
});

export const updateCommunityLocationSchema = z.object({
  mallId: z.string().uuid(),
  floorId: z.string().min(1),
  zoneStoreId: z.string().nullable().optional(),
  zoneName: z.string().min(2),
  isInMall: z.boolean().default(true),
  isKidsModeActive: z.boolean().default(false),
  kidsModeChallenge: z.string().nullable().optional(),
  isSharing: z.boolean().default(true),
});

export const communityPrivacyToggleSchema = z.object({
  isSharing: z.boolean(),
});

export type AddCommunityContactInput = z.infer<typeof addCommunityContactSchema>;
export type UpdateCommunityLocationInput = z.infer<typeof updateCommunityLocationSchema>;
export type CommunityPrivacyToggleInput = z.infer<typeof communityPrivacyToggleSchema>;
