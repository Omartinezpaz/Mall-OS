-- =============================================================================
-- Prueba de humo nativa en PostgreSQL: Mi Comunidad, RLS, Aislamiento y Expiración
-- Ejecutar en entorno Supabase/Postgres:  psql / supabase test db
-- Todo corre en una transacción y termina con ROLLBACK: no deja datos residuales.
-- =============================================================================
begin;

-- ---------- 1. Datos de prueba base (como postgres: sin RLS) ----------
insert into public.malls (id, slug, name) values
  ('11111111-aaaa-0000-0000-000000000001', 'sambil-chacao', 'Sambil Chacao'),
  ('22222222-bbbb-0000-0000-000000000001', 'sambil-caracas', 'Sambil La Candelaria')
on conflict (id) do nothing;

insert into auth.users (id, email, aud, role) values
  ('aaaaaaaa-1111-0000-0000-000000000001', 'papa@test.local',      'authenticated', 'authenticated'),
  ('aaaaaaaa-2222-0000-0000-000000000002', 'esposa@test.local',    'authenticated', 'authenticated'),
  ('aaaaaaaa-3333-0000-0000-000000000003', 'hijo_mateo@test.local', 'authenticated', 'authenticated'),
  ('aaaaaaaa-4444-0000-0000-000000000004', 'amigo_carlos@test.local', 'authenticated', 'authenticated'),
  ('bbbbbbbb-5555-0000-0000-000000000005', 'primo_candelaria@test.local', 'authenticated', 'authenticated'),
  ('aaaaaaaa-6666-0000-0000-000000000006', 'privado@test.local',   'authenticated', 'authenticated')
on conflict (id) do nothing;

-- Tiers: Papá es free (límite 3), Amigo Carlos es premium (límite 999)
insert into public.community_tiers (user_id, tier, max_contacts) values
  ('aaaaaaaa-1111-0000-0000-000000000001', 'free', 3),
  ('aaaaaaaa-4444-0000-0000-000000000004', 'premium', 999)
on conflict (user_id) do update set tier = excluded.tier, max_contacts = excluded.max_contacts;

-- Ubicaciones iniciales
-- Esposa: Sambil Chacao, compartiendo activo, actualizada hace 2 min (activa)
insert into public.community_locations (
  user_id, mall_id, floor_id, zone_store_id, zone_name, is_in_mall, is_sharing, updated_at
) values (
  'aaaaaaaa-2222-0000-0000-000000000002',
  '11111111-aaaa-0000-0000-000000000001',
  'floor-autopista',
  'store-zara',
  'ZARA (Nivel Autopista)',
  true,
  true,
  now() - interval '2 minutes'
);

-- Hijo Mateo: Sambil Chacao, Modo Niño activo, actualizada hace 5 min (activo)
insert into public.community_locations (
  user_id, mall_id, floor_id, zone_store_id, zone_name, is_in_mall, is_kids_mode_active, kids_mode_challenge, is_sharing, updated_at
) values (
  'aaaaaaaa-3333-0000-0000-000000000003',
  '11111111-aaaa-0000-0000-000000000001',
  'floor-diversion',
  'store-lego',
  'Lego Store (Nivel Diversión)',
  true,
  true,
  'Encuentra el dragón dorado',
  true,
  now() - interval '5 minutes'
);

-- Amigo Carlos: Sambil Chacao, pero inactivo hace 30 min (expirado)
insert into public.community_locations (
  user_id, mall_id, floor_id, zone_store_id, zone_name, is_in_mall, is_sharing, updated_at
) values (
  'aaaaaaaa-4444-0000-0000-000000000004',
  '11111111-aaaa-0000-0000-000000000001',
  'floor-acuario',
  'store-starbucks',
  'Starbucks (Nivel Acuario)',
  true,
  true,
  now() - interval '30 minutes'
);

-- Primo Candelaria: en SAMBIL LA CANDELARIA (mall distinto!), compartiendo activo
insert into public.community_locations (
  user_id, mall_id, floor_id, zone_store_id, zone_name, is_in_mall, is_sharing, updated_at
) values (
  'bbbbbbbb-5555-0000-0000-000000000005',
  '22222222-bbbb-0000-0000-000000000001',
  'floor-1',
  'store-candelaria-1',
  'Plaza Central Candelaria',
  true,
  true,
  now() - interval '1 minute'
);

-- Usuario Privado: en Sambil Chacao, pero is_sharing = FALSE
insert into public.community_locations (
  user_id, mall_id, floor_id, zone_store_id, zone_name, is_in_mall, is_sharing, updated_at
) values (
  'aaaaaaaa-6666-0000-0000-000000000006',
  '11111111-aaaa-0000-0000-000000000001',
  'floor-libertador',
  'store-cinex',
  'Cinex (Nivel Libertador)',
  true,
  false,
  now() - interval '3 minutes'
);

-- Ubicación de Papá en Sambil Chacao (para cumplir "ambos en el mismo mall")
insert into public.community_locations (
  user_id, mall_id, floor_id, zone_store_id, zone_name, is_in_mall, is_sharing, updated_at
) values (
  'aaaaaaaa-1111-0000-0000-000000000001',
  '11111111-aaaa-0000-0000-000000000001',
  'floor-autopista',
  'store-plaza-jardin',
  'Plaza Jardín',
  true,
  true,
  now()
);

-- Relaciones de contacto aceptadas para Papá:
-- 1. Esposa (accepted, visible)
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-1111-0000-0000-000000000001', 'aaaaaaaa-2222-0000-0000-000000000002', 'María', 'Esposa', 'accepted', true);
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-2222-0000-0000-000000000002', 'aaaaaaaa-1111-0000-0000-000000000001', 'Papá', 'Esposo', 'accepted', true);

-- 2. Hijo Mateo (accepted, visible)
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-1111-0000-0000-000000000001', 'aaaaaaaa-3333-0000-0000-000000000003', 'Mateo', 'Hijo', 'accepted', true);
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-3333-0000-0000-000000000003', 'aaaaaaaa-1111-0000-0000-000000000001', 'Papá', 'Padre', 'accepted', true);

-- 3. Amigo Carlos (accepted, visible) -> con esto Papá tiene 3 contactos (tope de Free)
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-1111-0000-0000-000000000001', 'aaaaaaaa-4444-0000-0000-000000000004', 'Carlos', 'Amigo', 'accepted', true);
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-4444-0000-0000-000000000004', 'aaaaaaaa-1111-0000-0000-000000000001', 'Papá', 'Amigo', 'accepted', true);

-- 4. Primo Candelaria (accepted, pero está en otro mall)
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-1111-0000-0000-000000000001', 'bbbbbbbb-5555-0000-0000-000000000005', 'Primo', 'Familiar', 'accepted', true);
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('bbbbbbbb-5555-0000-0000-000000000005', 'aaaaaaaa-1111-0000-0000-000000000001', 'Papá', 'Primo', 'accepted', true);

-- 5. Usuario Privado (accepted, pero tiene is_sharing = false)
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-1111-0000-0000-000000000001', 'aaaaaaaa-6666-0000-0000-000000000006', 'Privado', 'Colega', 'accepted', true);
insert into public.community_contacts (user_id, contact_user_id, nickname, relation, status, visible_to_contact)
values ('aaaaaaaa-6666-0000-0000-000000000006', 'aaaaaaaa-1111-0000-0000-000000000001', 'Papá', 'Colega', 'accepted', true);


-- =============================================================================
-- TEST 1: RLS NATIVO - Aislamiento Multi-Mall y Privacidad (Como Usuario Papá)
-- =============================================================================
select set_config('request.jwt.claims',
  '{"sub":"aaaaaaaa-1111-0000-0000-000000000001","role":"authenticated"}', true);
set local role authenticated;

do $$
declare
  v_count int;
  v_sees_primo boolean;
  v_sees_privado boolean;
begin
  -- 1.1: Papá solo debe ver su propia ubicación + contactos aceptados, compartiendo y en el MISMO mall
  -- Esposa (Chacao, sharing=true) -> VISIBLE
  -- Mateo (Chacao, sharing=true) -> VISIBLE
  -- Carlos (Chacao, sharing=true) -> VISIBLE en tabla, aunque expirado
  -- Propia ubicación -> VISIBLE
  -- Primo (Candelaria) -> BLOQUEADO POR RLS (diferente mall_id)
  -- Privado (sharing=false) -> BLOQUEADO POR RLS (is_sharing es false)
  
  select exists(select 1 from public.community_locations where user_id = 'bbbbbbbb-5555-0000-0000-000000000005')
  into v_sees_primo;
  assert v_sees_primo = false, 'FALLO DE AISLAMIENTO: Usuario de Mall A pudo leer ubicación de contacto en Mall B';

  select exists(select 1 from public.community_locations where user_id = 'aaaaaaaa-6666-0000-0000-000000000006')
  into v_sees_privado;
  assert v_sees_privado = false, 'FALLO DE PRIVACIDAD: Usuario pudo ver ubicación de contacto con is_sharing=false';

  -- En total debe ver exactamente 4 filas: él mismo + Esposa + Mateo + Carlos
  select count(*) from public.community_locations into v_count;
  assert v_count = 4, 'FALLO RLS: Papá debe ver exactamente 4 ubicaciones (propia + 3 contactos en Sambil Chacao)';
end $$;
reset role;


-- =============================================================================
-- TEST 2: Función STABLE y RPC de Expiración tras 15 minutos
-- =============================================================================
select set_config('request.jwt.claims',
  '{"sub":"aaaaaaaa-1111-0000-0000-000000000001","role":"authenticated"}', true);
set local role authenticated;

do $$
declare
  v_contacts record;
  v_carlos_active boolean;
  v_esposa_active boolean;
  v_mateo_kids boolean;
  v_expire_res jsonb;
begin
  -- 2.1: Verificar que is_community_presence_active devuelve false para >15 min
  assert public.is_community_presence_active(now() - interval '20 minutes', 15) = false,
    'FALLO STABLE: is_community_presence_active(now() - 20 min) debió ser false';
  assert public.is_community_presence_active(now() - interval '5 minutes', 15) = true,
    'FALLO STABLE: is_community_presence_active(now() - 5 min) debió ser true';

  -- 2.2: RPC get_visible_community_contacts
  select is_presence_active from public.get_visible_community_contacts('11111111-aaaa-0000-0000-000000000001')
  where contact_user_id = 'aaaaaaaa-4444-0000-0000-000000000004'
  into v_carlos_active;
  assert v_carlos_active = false, 'FALLO: Carlos inactivo hace 30 min debe tener is_presence_active = false';

  select is_presence_active from public.get_visible_community_contacts('11111111-aaaa-0000-0000-000000000001')
  where contact_user_id = 'aaaaaaaa-2222-0000-0000-000000000002'
  into v_esposa_active;
  assert v_esposa_active = true, 'FALLO: Esposa activa hace 2 min debe tener is_presence_active = true';

  select is_kids_mode_active from public.get_visible_community_contacts('11111111-aaaa-0000-0000-000000000001')
  where contact_user_id = 'aaaaaaaa-3333-0000-0000-000000000003'
  into v_mateo_kids;
  assert v_mateo_kids = true, 'FALLO: Mateo debe reflejar is_kids_mode_active = true';

  -- 2.3: Ejecución de expire_stale_community_presence(15)
  v_expire_res := public.expire_stale_community_presence(15);
  assert (v_expire_res ->> 'success')::boolean = true, 'RPC expire_stale_community_presence debe reportar éxito';
  assert (v_expire_res ->> 'expired_count')::int >= 1, 'RPC debió marcar como expirado al menos a Carlos';
end $$;
reset role;


-- =============================================================================
-- TEST 3: RPC redeem_community_invite - Control de Cupo Freemium y Expiración
-- =============================================================================
-- Crear invitaciones de prueba (como postgres)
insert into public.community_invites (
  id, creator_user_id, code, relation_suggestion, expires_at, max_uses, uses_count
) values
  ('ffffffff-0001-0000-0000-000000000001', 'aaaaaaaa-4444-0000-0000-000000000004', 'VALID888', 'Amigo', now() + interval '7 days', 1, 0),
  ('ffffffff-0002-0000-0000-000000000002', 'aaaaaaaa-4444-0000-0000-000000000004', 'EXPIRED1', 'Amigo', now() - interval '1 hour', 1, 0),
  ('ffffffff-0003-0000-0000-000000000003', 'aaaaaaaa-4444-0000-0000-000000000004', 'USEDONCE', 'Amigo', now() + interval '7 days', 1, 1),
  ('ffffffff-0004-0000-0000-000000000004', 'aaaaaaaa-1111-0000-0000-000000000001', 'SELFINV1', 'Familia', now() + interval '7 days', 1, 0);

-- 3.1: Papá (Free, ya tiene 3 contactos aceptados) intenta canjear VALID888
select set_config('request.jwt.claims',
  '{"sub":"aaaaaaaa-1111-0000-0000-000000000001","role":"authenticated"}', true);
set local role authenticated;

do $$
begin
  begin
    perform public.redeem_community_invite('VALID888');
    raise exception 'FALLO: Usuario en plan Free superó el límite de 3 contactos';
  exception when others then
    if sqlerrm <> 'contact_limit_reached' then raise; end if;
  end;
end $$;
reset role;

-- 3.2: Reutilización de código agotado (USEDONCE)
select set_config('request.jwt.claims',
  '{"sub":"aaaaaaaa-2222-0000-0000-000000000002","role":"authenticated"}', true);
set local role authenticated;

do $$
begin
  begin
    perform public.redeem_community_invite('USEDONCE');
    raise exception 'FALLO: Código agotado fue aceptado';
  exception when others then
    if sqlerrm <> 'invite_already_redeemed' then raise; end if;
  end;

  -- 3.3: Código expirado (EXPIRED1)
  begin
    perform public.redeem_community_invite('EXPIRED1');
    raise exception 'FALLO: Código expirado fue aceptado';
  exception when others then
    if sqlerrm <> 'invite_expired' then raise; end if;
  end;
end $$;
reset role;

-- 3.4: Auto-canje (Papá intenta canjear su propio código SELFINV1)
select set_config('request.jwt.claims',
  '{"sub":"aaaaaaaa-1111-0000-0000-000000000001","role":"authenticated"}', true);
set local role authenticated;

do $$
begin
  begin
    perform public.redeem_community_invite('SELFINV1');
    raise exception 'FALLO: Usuario pudo auto-canjear su propia invitación';
  exception when others then
    if sqlerrm <> 'cannot_invite_self' then raise; end if;
  end;
end $$;
reset role;

-- =============================================================================
-- RESULTADO FINAL
-- =============================================================================
select 'TODAS LAS PRUEBAS DE SEGURIDAD, AISLAMIENTO Y RLS EN POSTGRES PASARON' as resultado;
rollback;
