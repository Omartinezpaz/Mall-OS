/**
 * Motor de Seguridad, RLS y Reglas de Negocio para Mi Comunidad
 *
 * Implementa de forma pura y verificable las políticas Row Level Security (RLS)
 * y procedimientos almacenados (RPC) definidos en las migraciones de Supabase:
 * - 20261014100000_community.sql
 * - 20261014110000_community_presence_expiration.sql
 */

export const COMMUNITY_PRESENCE_EXPIRATION_MINUTES = 15;
export const COMMUNITY_FREE_TIER_MAX_CONTACTS = 3;

export interface CommunityLocationRecord {
  user_id: string;
  mall_id: string;
  floor_id: string;
  zone_store_id?: string | null;
  zone_name: string;
  is_in_mall: boolean;
  is_kids_mode_active: boolean;
  kids_mode_challenge?: string | null;
  is_sharing: boolean;
  updated_at: string | Date;
}

export interface CommunityContactRecord {
  id: string;
  user_id: string;
  contact_user_id: string;
  nickname: string;
  relation: 'family' | 'friend' | 'partner' | 'child';
  status: 'pending' | 'accepted' | 'blocked';
  visible_to_contact: boolean;
  created_at: string | Date;
}

export interface CommunityInviteRecord {
  id: string;
  from_user_id: string;
  code: string;
  expires_at: string | Date;
  accepted_by?: string | null;
  accepted_at?: string | Date | null;
  created_at: string | Date;
}

export interface CommunityTierRecord {
  user_id: string;
  tier: 'free' | 'premium';
  max_contacts: number;
}

/**
 * Evalúa si una presencia en el mall ha expirado por inactividad (> 15 minutos sin emitir señal).
 */
export function isCommunityPresenceExpired(
  updatedAt: string | Date | number,
  nowInput: string | Date | number = Date.now(),
  maxMinutes: number = COMMUNITY_PRESENCE_EXPIRATION_MINUTES
): boolean {
  const updatedTime = typeof updatedAt === 'number' ? updatedAt : new Date(updatedAt).getTime();
  const nowTime = typeof nowInput === 'number' ? nowInput : new Date(nowInput).getTime();
  const diffMs = nowTime - updatedTime;
  const maxMs = maxMinutes * 60 * 1000;
  return diffMs > maxMs;
}

/**
 * Determina si la presencia de un contacto está activa en el mall y no ha expirado.
 */
export function isCommunityPresenceActive(
  location: Pick<CommunityLocationRecord, 'is_in_mall' | 'updated_at'> | { isInMall: boolean; minutesAgo?: number },
  maxMinutes: number = COMMUNITY_PRESENCE_EXPIRATION_MINUTES
): boolean {
  if ('isInMall' in location) {
    return Boolean(location.isInMall && (location.minutesAgo ?? 0) < maxMinutes);
  }

  if (!location.is_in_mall) {
    return false;
  }

  return !isCommunityPresenceExpired(location.updated_at, Date.now(), maxMinutes);
}

/**
 * Valida la política RLS: "community_locations_contacts_same_mall"
 *
 * Exige:
 * 1. Ambos usuarios deben estar registrados en el mismo mall (mall_id coincide).
 * 2. El objetivo debe ser un contacto aceptado con visible_to_contact = true.
 * 3. El objetivo debe tener el interruptor de compartir activo (is_sharing = true).
 */
export function canAccessCommunityLocation(
  viewerUserId: string,
  viewerMallId: string,
  targetLocation: CommunityLocationRecord,
  contacts: CommunityContactRecord[]
): boolean {
  // Propietario siempre puede acceder a su propia ubicación
  if (targetLocation.user_id === viewerUserId) {
    return true;
  }

  // 1. Aislamiento estricto multi-tenant por centro comercial
  if (targetLocation.mall_id !== viewerMallId) {
    return false;
  }

  // 2. Privacidad del contacto (is_sharing)
  if (!targetLocation.is_sharing) {
    return false;
  }

  // 3. Relación de contacto aceptada y visible
  const hasAcceptedContact = contacts.some(
    (c) =>
      c.user_id === viewerUserId &&
      c.contact_user_id === targetLocation.user_id &&
      c.status === 'accepted' &&
      c.visible_to_contact === true
  );

  return hasAcceptedContact;
}

/**
 * Valida y procesa las reglas del RPC atómico redeem_community_invite
 */
export function validateRedeemCommunityInvite(
  callerUserId: string,
  invite: CommunityInviteRecord,
  existingAcceptedContactsCount: number,
  callerTier: CommunityTierRecord | null,
  nowInput: Date | number = Date.now()
): { success: boolean; error?: string } {
  const nowTime = typeof nowInput === 'number' ? nowInput : nowInput.getTime();
  const inviteExpiry = new Date(invite.expires_at).getTime();

  // 1. Validar expiración o reutilización
  if (inviteExpiry <= nowTime || invite.accepted_by !== null) {
    return {
      success: false,
      error: 'El código de invitación es inválido, ha expirado o ya fue utilizado.',
    };
  }

  // 2. Auto-invitación no permitida
  if (invite.from_user_id === callerUserId) {
    return {
      success: false,
      error: 'No puedes canjear tu propio código de invitación.',
    };
  }

  // 3. Control de cupo Freemium (Plan Free: máx 3 contactos)
  const isFreeTier = !callerTier || callerTier.tier === 'free';
  const maxAllowed = isFreeTier ? COMMUNITY_FREE_TIER_MAX_CONTACTS : (callerTier?.max_contacts ?? 9999);

  if (isFreeTier && existingAcceptedContactsCount >= maxAllowed) {
    return {
      success: false,
      error: `Has alcanzado el límite de ${maxAllowed} contactos del plan gratuito.`,
    };
  }

  return { success: true };
}

/**
 * Simula el RPC atómico revoke_community_contact
 */
export function simulateRevokeCommunityContact(
  callerUserId: string,
  contactUserId: string,
  contacts: CommunityContactRecord[]
): CommunityContactRecord[] {
  return contacts.filter(
    (c) =>
      !(
        (c.user_id === callerUserId && c.contact_user_id === contactUserId) ||
        (c.user_id === contactUserId && c.contact_user_id === callerUserId)
      )
  );
}
