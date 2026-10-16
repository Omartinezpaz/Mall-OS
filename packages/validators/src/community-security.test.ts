import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  canAccessCommunityLocation,
  isCommunityPresenceExpired,
  isCommunityPresenceActive,
  validateRedeemCommunityInvite,
  simulateRevokeCommunityContact,
  type CommunityLocationRecord,
  type CommunityContactRecord,
  type CommunityInviteRecord,
} from './community-security';
import {
  addCommunityContactSchema,
  updateCommunityLocationSchema,
  communityPrivacyToggleSchema,
} from './community.schema';

// IDs de prueba para multi-tenant y usuarios
const MALL_SAMBIL_CHACAO = 'b0000000-0000-4000-8000-000000000001';
const MALL_LOS_NUEVOS_TEQUES = 'b0000000-0000-4000-8000-000000000002';

const USER_ALICE = 'u0000000-0000-4000-8000-000000000001';
const USER_BOB = 'u0000000-0000-4000-8000-000000000002';
const USER_CARLOS = 'u0000000-0000-4000-8000-000000000003';

// ---------------------------------------------------------------------------
// 1. Pruebas de Políticas RLS: Aislamiento Multi-Tenant y Privacidad
// ---------------------------------------------------------------------------

test('RLS: Usuario puede ver la ubicación de un contacto en el mismo mall si comparte', () => {
  const contacts: CommunityContactRecord[] = [
    {
      id: 'c-1',
      user_id: USER_ALICE,
      contact_user_id: USER_BOB,
      nickname: 'Bob',
      relation: 'friend',
      status: 'accepted',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
  ];

  const bobLocation: CommunityLocationRecord = {
    user_id: USER_BOB,
    mall_id: MALL_SAMBIL_CHACAO,
    floor_id: 'nivel_autopista',
    zone_store_id: 'zara',
    zone_name: 'ZARA',
    is_in_mall: true,
    is_kids_mode_active: false,
    is_sharing: true,
    updated_at: new Date().toISOString(),
  };

  const canAccess = canAccessCommunityLocation(USER_ALICE, MALL_SAMBIL_CHACAO, bobLocation, contacts);
  assert.equal(canAccess, true, 'Alice debe poder consultar la ubicación de Bob en el mismo mall');
});

test('RLS [Seguridad]: Bloquea acceso a contactos si están en distinto mall (Multi-Tenant)', () => {
  const contacts: CommunityContactRecord[] = [
    {
      id: 'c-1',
      user_id: USER_ALICE,
      contact_user_id: USER_BOB,
      nickname: 'Bob',
      relation: 'friend',
      status: 'accepted',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
  ];

  // Bob está en Los Nuevos Teques, Alice está en Sambil Chacao
  const bobLocationInDifferentMall: CommunityLocationRecord = {
    user_id: USER_BOB,
    mall_id: MALL_LOS_NUEVOS_TEQUES,
    floor_id: 'pb',
    zone_store_id: 'local_1',
    zone_name: 'Panadería',
    is_in_mall: true,
    is_kids_mode_active: false,
    is_sharing: true,
    updated_at: new Date().toISOString(),
  };

  const canAccess = canAccessCommunityLocation(
    USER_ALICE,
    MALL_SAMBIL_CHACAO,
    bobLocationInDifferentMall,
    contacts
  );
  assert.equal(canAccess, false, 'La política RLS debe impedir ver ubicaciones de otro mall');
});

test('RLS [Privacidad]: Bloquea acceso si el contacto desactivó compartir (is_sharing = false)', () => {
  const contacts: CommunityContactRecord[] = [
    {
      id: 'c-1',
      user_id: USER_ALICE,
      contact_user_id: USER_BOB,
      nickname: 'Bob',
      relation: 'friend',
      status: 'accepted',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
  ];

  const bobLocationPrivate: CommunityLocationRecord = {
    user_id: USER_BOB,
    mall_id: MALL_SAMBIL_CHACAO,
    floor_id: 'nivel_autopista',
    zone_store_id: 'zara',
    zone_name: 'ZARA',
    is_in_mall: true,
    is_kids_mode_active: false,
    is_sharing: false, // Privacidad activada
    updated_at: new Date().toISOString(),
  };

  const canAccess = canAccessCommunityLocation(
    USER_ALICE,
    MALL_SAMBIL_CHACAO,
    bobLocationPrivate,
    contacts
  );
  assert.equal(canAccess, false, 'No se debe divulgar ubicación si is_sharing es falso');
});

test('RLS [Seguridad]: Bloquea acceso si visible_to_contact = false o status != accepted', () => {
  const pendingContact: CommunityContactRecord[] = [
    {
      id: 'c-1',
      user_id: USER_ALICE,
      contact_user_id: USER_BOB,
      nickname: 'Bob',
      relation: 'friend',
      status: 'pending',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
  ];

  const bobLocation: CommunityLocationRecord = {
    user_id: USER_BOB,
    mall_id: MALL_SAMBIL_CHACAO,
    floor_id: 'nivel_autopista',
    zone_store_id: 'zara',
    zone_name: 'ZARA',
    is_in_mall: true,
    is_kids_mode_active: false,
    is_sharing: true,
    updated_at: new Date().toISOString(),
  };

  assert.equal(
    canAccessCommunityLocation(USER_ALICE, MALL_SAMBIL_CHACAO, bobLocation, pendingContact),
    false,
    'Un contacto pendiente no debe exponer su ubicación'
  );

  const hiddenContact: CommunityContactRecord[] = [
    {
      id: 'c-2',
      user_id: USER_ALICE,
      contact_user_id: USER_BOB,
      nickname: 'Bob',
      relation: 'friend',
      status: 'accepted',
      visible_to_contact: false, // Oculto específicamente
      created_at: new Date().toISOString(),
    },
  ];

  assert.equal(
    canAccessCommunityLocation(USER_ALICE, MALL_SAMBIL_CHACAO, bobLocation, hiddenContact),
    false,
    'Si visible_to_contact es false, se bloquea el acceso'
  );
});

test('RLS: El propietario siempre tiene acceso completo a su propio registro de ubicación', () => {
  const aliceLocation: CommunityLocationRecord = {
    user_id: USER_ALICE,
    mall_id: MALL_SAMBIL_CHACAO,
    floor_id: 'nivel_autopista',
    zone_store_id: 'farmatodo',
    zone_name: 'Farmatodo',
    is_in_mall: true,
    is_kids_mode_active: false,
    is_sharing: false,
    updated_at: new Date().toISOString(),
  };

  assert.equal(
    canAccessCommunityLocation(USER_ALICE, MALL_SAMBIL_CHACAO, aliceLocation, []),
    true,
    'El propietario siempre puede gestionar su ubicación'
  );
});

// ---------------------------------------------------------------------------
// 2. Pruebas de Expiración de Presencia por Inactividad (Umbral de 15 Minutos)
// ---------------------------------------------------------------------------

test('Expiración: Señal reciente (< 15 minutos) permanece activa', () => {
  const now = Date.now();
  const fiveMinutesAgo = now - 5 * 60 * 1000;
  const fourteenMinutesAgo = now - 14 * 60 * 1000;

  assert.equal(isCommunityPresenceExpired(fiveMinutesAgo, now, 15), false);
  assert.equal(isCommunityPresenceExpired(fourteenMinutesAgo, now, 15), false);
  assert.equal(isCommunityPresenceActive({ isInMall: true, minutesAgo: 8 }, 15), true);
});

test('Expiración: Señal inactiva (>= 15 minutos) expira automáticamente', () => {
  const now = Date.now();
  const fifteenMinutesOneSecondAgo = now - (15 * 60 * 1000 + 1000);
  const twoHoursAgo = now - 120 * 60 * 1000;

  assert.equal(isCommunityPresenceExpired(fifteenMinutesOneSecondAgo, now, 15), true);
  assert.equal(isCommunityPresenceExpired(twoHoursAgo, now, 15), true);
  assert.equal(isCommunityPresenceActive({ isInMall: true, minutesAgo: 16 }, 15), false);
});

test('Expiración: Presencia marcada fuera del mall no se considera activa', () => {
  assert.equal(isCommunityPresenceActive({ isInMall: false, minutesAgo: 2 }, 15), false);
});

// ---------------------------------------------------------------------------
// 3. Pruebas del Procedimiento Atómico: Canje de Invitaciones (RPC)
// ---------------------------------------------------------------------------

test('RPC Invitaciones: Canje válido con cupo disponible tiene éxito', () => {
  const invite: CommunityInviteRecord = {
    id: 'inv-1',
    from_user_id: USER_BOB,
    code: 'BOB-8X2P',
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    accepted_by: null,
    created_at: new Date().toISOString(),
  };

  const result = validateRedeemCommunityInvite(USER_ALICE, invite, 1, {
    user_id: USER_ALICE,
    tier: 'free',
    max_contacts: 3,
  });

  assert.equal(result.success, true);
});

test('RPC Invitaciones [Seguridad]: Rechaza código vencido o ya aceptado', () => {
  const expiredInvite: CommunityInviteRecord = {
    id: 'inv-expired',
    from_user_id: USER_BOB,
    code: 'BOB-VENCIDO',
    expires_at: new Date(Date.now() - 3600000).toISOString(), // Venció hace 1 hora
    accepted_by: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  };

  const resExpired = validateRedeemCommunityInvite(USER_ALICE, expiredInvite, 0, null);
  assert.equal(resExpired.success, false);
  assert.ok(resExpired.error?.includes('inválido, ha expirado o ya fue utilizado'));

  const usedInvite: CommunityInviteRecord = {
    id: 'inv-used',
    from_user_id: USER_BOB,
    code: 'BOB-USADO',
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    accepted_by: USER_CARLOS, // Ya fue aceptado por Carlos
    created_at: new Date().toISOString(),
  };

  const resUsed = validateRedeemCommunityInvite(USER_ALICE, usedInvite, 0, null);
  assert.equal(resUsed.success, false);
  assert.ok(resUsed.error?.includes('inválido, ha expirado o ya fue utilizado'));
});

test('RPC Invitaciones [Seguridad]: Rechaza auto-canje (no puedes agregarte a ti mismo)', () => {
  const myOwnInvite: CommunityInviteRecord = {
    id: 'inv-self',
    from_user_id: USER_ALICE,
    code: 'ALICE-SELF',
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    accepted_by: null,
    created_at: new Date().toISOString(),
  };

  const result = validateRedeemCommunityInvite(USER_ALICE, myOwnInvite, 0, null);
  assert.equal(result.success, false);
  assert.equal(result.error, 'No puedes canjear tu propio código de invitación.');
});

test('RPC Invitaciones [Negocio]: Límite Freemium bloquea el 4to contacto en plan gratuito', () => {
  const invite: CommunityInviteRecord = {
    id: 'inv-4',
    from_user_id: USER_CARLOS,
    code: 'CARLOS-4',
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    accepted_by: null,
    created_at: new Date().toISOString(),
  };

  // Usuario free con 3 contactos ya ocupados
  const resFreeFull = validateRedeemCommunityInvite(USER_ALICE, invite, 3, {
    user_id: USER_ALICE,
    tier: 'free',
    max_contacts: 3,
  });

  assert.equal(resFreeFull.success, false);
  assert.ok(resFreeFull.error?.includes('Has alcanzado el límite de 3 contactos'));

  // Mismo caso pero con tier Premium: no tiene límite
  const resPremium = validateRedeemCommunityInvite(USER_ALICE, invite, 3, {
    user_id: USER_ALICE,
    tier: 'premium',
    max_contacts: 9999,
  });

  assert.equal(resPremium.success, true, 'El plan premium debe permitir superar el límite');
});

// ---------------------------------------------------------------------------
// 4. Pruebas de Revocación de Contacto (RPC revoke_community_contact)
// ---------------------------------------------------------------------------

test('RPC Revocación: Elimina la relación en ambos sentidos de manera atómica', () => {
  const initialContacts: CommunityContactRecord[] = [
    {
      id: 'c-ab',
      user_id: USER_ALICE,
      contact_user_id: USER_BOB,
      nickname: 'Bob',
      relation: 'friend',
      status: 'accepted',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'c-ba',
      user_id: USER_BOB,
      contact_user_id: USER_ALICE,
      nickname: 'Alice',
      relation: 'friend',
      status: 'accepted',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'c-ac',
      user_id: USER_ALICE,
      contact_user_id: USER_CARLOS,
      nickname: 'Carlos',
      relation: 'family',
      status: 'accepted',
      visible_to_contact: true,
      created_at: new Date().toISOString(),
    },
  ];

  const updatedContacts = simulateRevokeCommunityContact(USER_ALICE, USER_BOB, initialContacts);

  assert.equal(updatedContacts.length, 1);
  assert.equal(updatedContacts[0]?.contact_user_id, USER_CARLOS);
  assert.equal(
    updatedContacts.some((c) => c.contact_user_id === USER_BOB || c.user_id === USER_BOB),
    false,
    'Debe eliminar el enlace bidireccional'
  );
});

// ---------------------------------------------------------------------------
// 5. Pruebas de Esquemas de Validación Zod
// ---------------------------------------------------------------------------

test('Zod: addCommunityContactSchema normaliza a mayúsculas y valida longitud', () => {
  const parsed = addCommunityContactSchema.parse({
    inviteCode: '  oscar-7k2p  ',
    myNickname: 'Esposa',
    myRelation: 'partner',
  });

  assert.equal(parsed.inviteCode, 'OSCAR-7K2P');
  assert.equal(parsed.myRelation, 'partner');

  // Código muy corto
  assert.throws(() => {
    addCommunityContactSchema.parse({
      inviteCode: 'ABC',
    });
  });

  // Relación inválida
  assert.throws(() => {
    addCommunityContactSchema.parse({
      inviteCode: 'OSCAR-7K2P',
      myRelation: 'unauthorized_role',
    });
  });
});

test('Zod: updateCommunityLocationSchema valida UUID de mall y campos requeridos', () => {
  const valid = updateCommunityLocationSchema.parse({
    mallId: MALL_SAMBIL_CHACAO,
    floorId: 'nivel_autopista',
    zoneName: 'ZARA',
    isInMall: true,
    isSharing: true,
  });

  assert.equal(valid.mallId, MALL_SAMBIL_CHACAO);
  assert.equal(valid.isKidsModeActive, false);

  // Mall ID no UUID
  assert.throws(() => {
    updateCommunityLocationSchema.parse({
      mallId: 'not-a-uuid',
      floorId: 'pb',
      zoneName: 'Local 1',
    });
  });
});

test('Zod: communityPrivacyToggleSchema valida boolean estricto', () => {
  const valid = communityPrivacyToggleSchema.parse({ isSharing: false });
  assert.equal(valid.isSharing, false);

  assert.throws(() => {
    communityPrivacyToggleSchema.parse({ isSharing: 'invalid' });
  });
});

// ---------------------------------------------------------------------------
// 6. Auditoría Estática de Seguridad en Migraciones SQL
// ---------------------------------------------------------------------------

test('Auditoría SQL: Verifica ENABLE ROW LEVEL SECURITY y SECURITY DEFINER en migraciones', () => {
  const rootDir = path.resolve(__dirname, '../../..');
  const migrationPath = path.resolve(
    rootDir,
    'supabase/migrations/20261014100000_community.sql'
  );
  const presenceMigrationPath = path.resolve(
    rootDir,
    'supabase/migrations/20261014110000_community_presence_expiration.sql'
  );
  const stableMigrationPath = path.resolve(
    rootDir,
    'supabase/migrations/20261014120000_community_presence_stable_and_cron.sql'
  );
  const postgresSmokeTestPath = path.resolve(
    rootDir,
    'supabase/tests/community_rls_smoke.sql'
  );

  assert.ok(fs.existsSync(migrationPath), 'Debe existir la migración base de comunidad');
  assert.ok(fs.existsSync(presenceMigrationPath), 'Debe existir la migración de expiración');
  assert.ok(fs.existsSync(stableMigrationPath), 'Debe existir la migración de corrección STABLE y cron');
  assert.ok(fs.existsSync(postgresSmokeTestPath), 'Debe existir el script nativo de pruebas SQL en Postgres');

  const sql1 = fs.readFileSync(migrationPath, 'utf8');
  const sql2 = fs.readFileSync(presenceMigrationPath, 'utf8');
  const sql3 = fs.readFileSync(stableMigrationPath, 'utf8');
  const sqlSmoke = fs.readFileSync(postgresSmokeTestPath, 'utf8');

  // 1. RLS habilitado en todas las tablas
  assert.ok(sql1.includes('ALTER TABLE public.community_contacts ENABLE ROW LEVEL SECURITY;'));
  assert.ok(sql1.includes('ALTER TABLE public.community_invites ENABLE ROW LEVEL SECURITY;'));
  assert.ok(sql1.includes('ALTER TABLE public.community_locations ENABLE ROW LEVEL SECURITY;'));
  assert.ok(sql1.includes('ALTER TABLE public.community_tiers ENABLE ROW LEVEL SECURITY;'));

  // 2. RPCs con SECURITY DEFINER y búsqueda protegida (SET search_path = public, pg_temp)
  assert.ok(sql1.includes('SECURITY DEFINER'));
  assert.ok(sql1.includes('SET search_path = public, pg_temp'));
  assert.ok(sql2.includes('SECURITY DEFINER'));
  assert.ok(sql2.includes('SET search_path = public, pg_temp'));
  assert.ok(sql3.includes('SECURITY DEFINER'));
  assert.ok(sql3.includes('SET search_path = public, pg_temp'));

  // 3. Volatilidad STABLE (Postgres): is_community_presence_active evalúa now()
  assert.ok(sql3.includes('LANGUAGE sql\nSTABLE') || sql3.includes('STABLE'), 'is_community_presence_active debe ser STABLE (nunca IMMUTABLE con now())');
  assert.ok(!sql3.includes('LANGUAGE sql\nIMMUTABLE'), 'La migración correctiva no debe definir la función como IMMUTABLE');


  // 4. Regla de 15 minutos presente en SQL
  assert.ok(sql2.includes("interval '15 minutes'"));
  assert.ok(sql3.includes("p_max_minutes INT DEFAULT 15"));

  // 5. Smoke test nativo en Postgres contiene asserts de aislamiento
  assert.ok(sqlSmoke.includes('set local role authenticated;'));
  assert.ok(sqlSmoke.includes('FALLO DE AISLAMIENTO'));
  assert.ok(sqlSmoke.includes('contact_limit_reached'));
});

