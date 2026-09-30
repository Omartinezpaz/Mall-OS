-- =============================================================================
-- Prueba de humo: aislamiento multi-mall, RLS y RPC de cupones.
-- Ejecutar en entorno LOCAL:  supabase db reset  y luego pegar en el SQL Editor
-- (o: psql "$(supabase status -o env | grep DB_URL | cut -d= -f2 | tr -d '"')" -f supabase/tests/smoke_rls_rpc.sql)
-- Todo corre en una transacción y termina con ROLLBACK: no deja datos.
-- Si algún ASSERT falla, el script se detiene con el mensaje del fallo.
-- La prueba de CONCURRENCIA (50 peticiones, stock 10) va aparte, en TypeScript (T-108).
-- =============================================================================
begin;

-- ---------- Datos de prueba (como postgres: sin RLS) ----------
insert into public.malls (id, slug, name) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'mall-a', 'Mall A'),
  ('bbbbbbbb-0000-0000-0000-000000000001', 'mall-b', 'Mall B');

insert into public.stores (id, mall_id, name, slug, can_publish_offers) values
  ('aaaaaaaa-1111-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'Panadería A', 'panaderia-a', true),
  ('aaaaaaaa-1111-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'Cadena A',     'cadena-a',     false),
  ('bbbbbbbb-1111-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'Gym B',        'gym-b',        true);

insert into auth.users (id, email, aud, role) values
  ('11111111-0000-0000-0000-000000000001', 'tenant-a@test.local',   'authenticated', 'authenticated'),
  ('11111111-0000-0000-0000-000000000002', 'shopper1@test.local',   'authenticated', 'authenticated'),
  ('11111111-0000-0000-0000-000000000003', 'shopper2@test.local',   'authenticated', 'authenticated'),
  ('11111111-0000-0000-0000-000000000004', 'tenant-b@test.local',   'authenticated', 'authenticated'),
  ('11111111-0000-0000-0000-000000000005', 'admin-a@test.local',    'authenticated', 'authenticated');

insert into public.store_users (store_id, mall_id, user_id) values
  ('aaaaaaaa-1111-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001'),
  ('bbbbbbbb-1111-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000004');

insert into public.memberships (user_id, mall_id, role) values
  ('11111111-0000-0000-0000-000000000005', 'aaaaaaaa-0000-0000-0000-000000000001', 'mall_admin');

-- Oferta activa con stock 1 (para probar agotamiento) y una en borrador
insert into public.offers (id, mall_id, store_id, title, benefit_label, starts_at, ends_at, total_coupons, per_user_limit, status) values
  ('aaaaaaaa-2222-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-1111-0000-0000-000000000001',
   'Pan del día', '2x1', now() - interval '1 hour', now() + interval '1 day', 1, 1, 'active'),
  ('aaaaaaaa-2222-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-1111-0000-0000-000000000001',
   'Borrador', '10% OFF', now(), now() + interval '1 day', 10, 1, 'draft'),
  ('bbbbbbbb-2222-0000-0000-000000000001', 'bbbbbbbb-0000-0000-0000-000000000001', 'bbbbbbbb-1111-0000-0000-000000000001',
   'Gym B', '1 semana gratis', now() - interval '1 hour', now() + interval '1 day', 10, 1, 'active');

-- ---------- 1. Anónimo: solo ve lo público y activo ----------
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;
do $$
begin
  assert (select count(*) from public.stores) = 3, 'anon debe ver las 3 tiendas activas de ambos malls';
  -- ofertas visibles: la activa de A y la activa de B; NO el borrador
  assert (select count(*) from public.offers) = 2, 'anon solo ve ofertas activas y vigentes';
  assert (select count(*) from public.coupons) = 0, 'anon no ve cupones';
exception when insufficient_privilege then
  -- coupons no tiene SELECT para anon: es el comportamiento correcto
  null;
end $$;
reset role;

-- ---------- 2. Tenant A: aislamiento y límites ----------
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000001","role":"authenticated"}', true);
set local role authenticated;
do $$
declare v_ok boolean;
begin
  -- Ve su borrador, no ve nada del mall B que no sea público
  assert (select count(*) from public.offers where mall_id = 'aaaaaaaa-0000-0000-0000-000000000001') = 2,
    'tenant A ve sus 2 ofertas (activa + borrador)';

  -- No puede crear oferta ACTIVA
  begin
    insert into public.offers (mall_id, store_id, title, benefit_label, starts_at, ends_at, status)
    values ('aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-1111-0000-0000-000000000001',
            'Auto-activada', '50% OFF', now(), now() + interval '1 day', 'active');
    raise exception 'FALLO: el tenant pudo crear una oferta activa';
  exception when insufficient_privilege or check_violation then null; -- RLS bloquea (esperado)
  end;

  -- No puede crear oferta en una tienda que no puede publicar (cadena)
  begin
    insert into public.offers (mall_id, store_id, title, benefit_label, starts_at, ends_at, status)
    values ('aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-1111-0000-0000-000000000002',
            'Cadena', '10% OFF', now(), now() + interval '1 day', 'pending');
    raise exception 'FALLO: el tenant pudo crear oferta en tienda ajena/no autorizada';
  exception when insufficient_privilege or check_violation then null;
  end;

  -- Sí puede crear una oferta pending en su tienda
  insert into public.offers (mall_id, store_id, title, benefit_label, starts_at, ends_at, status)
  values ('aaaaaaaa-0000-0000-0000-000000000001', 'aaaaaaaa-1111-0000-0000-000000000001',
          'Pendiente', '15% OFF', now(), now() + interval '1 day', 'pending');

  -- No puede tocar contadores (privilegio de columna)
  begin
    update public.offers set activated_count = 5 where id = 'aaaaaaaa-2222-0000-0000-000000000001';
    raise exception 'FALLO: el tenant pudo modificar contadores';
  exception when insufficient_privilege then null;
  end;

  -- No puede cambiar campos estructurales de su tienda
  begin
    update public.stores set can_publish_offers = false where id = 'aaaaaaaa-1111-0000-0000-000000000001';
    raise exception 'FALLO: el tenant pudo cambiar can_publish_offers';
  exception when others then
    if sqlerrm = 'store_field_not_editable' then null; else raise; end if;
  end;
end $$;
reset role;

-- ---------- 3. Shopper 1: activar cupón, límite y agotamiento ----------
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000002","role":"authenticated","is_anonymous":false}', true);
set local role authenticated;
do $$
declare v_res jsonb;
begin
  v_res := public.activate_coupon('aaaaaaaa-2222-0000-0000-000000000001');
  assert (v_res ->> 'code') ~ '^[A-Z2-9]{8}$', 'código con formato válido';
  assert (select count(*) from public.coupons) = 1, 'shopper ve solo su cupón';

  -- Segunda activación del mismo usuario: límite
  begin
    perform public.activate_coupon('aaaaaaaa-2222-0000-0000-000000000001');
    raise exception 'FALLO: superó per_user_limit';
  exception when others then
    if sqlerrm not in ('limit_reached', 'offer_sold_out') then raise; end if;
  end;

  -- No puede canjear su propio cupón (no es personal del local)
  begin
    perform public.redeem_coupon(v_res ->> 'code');
    raise exception 'FALLO: un shopper pudo canjear';
  exception when others then
    if sqlerrm <> 'coupon_not_found' then raise; end if;
  end;

  -- Guardar el código para los pasos siguientes
  perform set_config('test.code', v_res ->> 'code', true);
end $$;
reset role;

-- ---------- 4. Shopper 2: stock agotado (total_coupons = 1) ----------
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000003","role":"authenticated","is_anonymous":false}', true);
set local role authenticated;
do $$
begin
  begin
    perform public.activate_coupon('aaaaaaaa-2222-0000-0000-000000000001');
    raise exception 'FALLO: activó con stock agotado';
  exception when others then
    if sqlerrm <> 'offer_sold_out' then raise; end if;
  end;

  -- Oferta en borrador no se puede activar
  begin
    perform public.activate_coupon('aaaaaaaa-2222-0000-0000-000000000002');
    raise exception 'FALLO: activó una oferta en borrador';
  exception when others then
    if sqlerrm <> 'offer_not_available' then raise; end if;
  end;
end $$;

-- Usuario anónimo no puede activar
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000003","role":"authenticated","is_anonymous":true}', true);
do $$
begin
  begin
    perform public.activate_coupon('bbbbbbbb-2222-0000-0000-000000000001');
    raise exception 'FALLO: un anónimo activó un cupón';
  exception when others then
    if sqlerrm <> 'auth_required' then raise; end if;
  end;
end $$;
reset role;

-- ---------- 5. Canje: tenant equivocado, tenant correcto, doble canje ----------
-- Tenant B (otro mall) no puede canjear cupones del mall A
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000004","role":"authenticated"}', true);
set local role authenticated;
do $$
begin
  begin
    perform public.redeem_coupon(current_setting('test.code'));
    raise exception 'FALLO: tenant de otro mall canjeó';
  exception when others then
    if sqlerrm <> 'coupon_not_found' then raise; end if;
  end;
end $$;
reset role;

-- Tenant A canjea
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000001","role":"authenticated"}', true);
set local role authenticated;
do $$
declare v_res jsonb;
begin
  v_res := public.redeem_coupon(lower(current_setting('test.code')));  -- también acepta minúsculas
  assert v_res ->> 'store_name' = 'Panadería A', 'canje devuelve la tienda';

  begin
    perform public.redeem_coupon(current_setting('test.code'));
    raise exception 'FALLO: doble canje permitido';
  exception when others then
    if sqlerrm <> 'already_redeemed' then raise; end if;
  end;
end $$;
reset role;

-- ---------- 6. Contadores y bitácora coherentes (como postgres) ----------
do $$
begin
  assert (select activated_count from public.offers where id = 'aaaaaaaa-2222-0000-0000-000000000001') = 1, 'activated_count = 1';
  assert (select redeemed_count  from public.offers where id = 'aaaaaaaa-2222-0000-0000-000000000001') = 1, 'redeemed_count = 1';
  assert (select count(*) from public.coupon_redemptions) = 1, 'una fila en la bitácora de canjes';
  assert (select count(*) from public.analytics_events where event_type = 'coupon_activated') = 1, 'evento de activación';
  assert (select count(*) from public.analytics_events where event_type = 'coupon_redeemed')  = 1, 'evento de canje';
end $$;

-- ---------- 7. Admin del mall A: ve analítica de A, nada de B ----------
select set_config('request.jwt.claims',
  '{"sub":"11111111-0000-0000-0000-000000000005","role":"authenticated"}', true);
set local role authenticated;
do $$
begin
  assert (select count(*) from public.analytics_events) = 2, 'admin A ve los 2 eventos de su mall';
  assert (select count(*) from public.analytics_events where mall_id = 'bbbbbbbb-0000-0000-0000-000000000001') = 0,
    'admin A no ve analítica del mall B';
end $$;
reset role;

select 'TODAS LAS PRUEBAS PASARON' as resultado;
rollback;
