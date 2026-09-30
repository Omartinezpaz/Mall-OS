-- =============================================================================
-- Mall OS · Migración 4 · RPC transaccionales
-- Reglas:
--   * El usuario SIEMPRE sale de auth.uid(); ninguna RPC recibe user_id.
--   * activate_coupon bloquea la fila de la oferta (FOR NO KEY UPDATE): dos
--     activaciones simultáneas se serializan y el stock nunca se excede.
--   * redeem_coupon bloquea la fila del cupón: un cupón no se canjea dos veces.
--   * Los errores son mensajes estables que el cliente mapea a textos:
--       auth_required, offer_not_found, offer_not_available, offer_sold_out,
--       limit_reached, coupon_not_found, already_redeemed, coupon_expired
--   * redeem_coupon es idempotente a nivel de resultado: reintentar un canje ya
--     hecho devuelve 'already_redeemed' (base para la cola de reintentos offline, R-05).
--   * Un cupón activado se honra hasta su expires_at aunque la oferta se pause después.
-- =============================================================================

-- Código legible de 8 caracteres sin ambiguos (sin 0,O,1,I,L). 31 símbolos.
create or replace function public.generate_coupon_code()
returns text
language plpgsql volatile set search_path = ''
as $$
declare
  v_alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';  -- 31 símbolos
  v_bytes    bytea := uuid_send(gen_random_uuid());
  v_out      text := '';
  v_len      int := length(v_alphabet);
  i          int;
begin
  for i in 0..7 loop
    v_out := v_out || substr(v_alphabet, (get_byte(v_bytes, i) % v_len) + 1, 1);
  end loop;
  return v_out;
end;
$$;

-- ---------------------------------------------------------------------------
-- track_event: registro de eventos del funnel con lista permitida
-- ---------------------------------------------------------------------------
create or replace function public.track_event(
  p_mall_id     uuid,
  p_event_type  text,
  p_entity_type text default null,
  p_entity_id   uuid default null,
  p_session_id  uuid default null,
  p_properties  jsonb default '{}'::jsonb
)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if p_event_type not in (
    'app_open', 'mall_selected', 'store_view', 'offer_view',
    'search', 'map_open', 'concierge_message'
  ) then
    raise exception 'invalid_event_type';
  end if;
  if not public.mall_is_active(p_mall_id) then
    raise exception 'mall_not_found';
  end if;

  insert into public.analytics_events (mall_id, user_id, session_id, event_type, entity_type, entity_id, properties)
  values (p_mall_id, (select auth.uid()), p_session_id, p_event_type, p_entity_type, p_entity_id,
          coalesce(p_properties, '{}'::jsonb));
end;
$$;

-- ---------------------------------------------------------------------------
-- activate_coupon
-- ---------------------------------------------------------------------------
create or replace function public.activate_coupon(p_offer_id uuid)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_uid     uuid := (select auth.uid());
  v_offer   public.offers%rowtype;
  v_count   int;
  v_code    text;
  v_coupon  public.coupons%rowtype;
  v_tries   int := 0;
  v_done    boolean := false;
begin
  -- Registro obligatorio solo aquí (acceso anónimo en el resto de la app)
  if v_uid is null or coalesce((select auth.jwt()) ->> 'is_anonymous', 'false')::boolean then
    raise exception 'auth_required';
  end if;

  -- Bloqueo de la oferta: serializa activaciones concurrentes
  select o.* into v_offer from public.offers o where o.id = p_offer_id for no key update;
  if not found then
    raise exception 'offer_not_found';
  end if;

  if v_offer.status <> 'active'
     or now() < v_offer.starts_at or now() > v_offer.ends_at
     or not public.mall_is_active(v_offer.mall_id)
     or not public.store_can_publish(v_offer.store_id) then
    raise exception 'offer_not_available';
  end if;

  if v_offer.activated_count >= v_offer.total_coupons then
    raise exception 'offer_sold_out';
  end if;

  select count(*) into v_count
  from public.coupons c
  where c.offer_id = p_offer_id and c.user_id = v_uid and c.status <> 'cancelled';
  if v_count >= v_offer.per_user_limit then
    raise exception 'limit_reached';
  end if;

  -- Membresía de shopper en este mall (una cuenta, varios malls)
  insert into public.memberships (user_id, mall_id, role)
  values (v_uid, v_offer.mall_id, 'shopper')
  on conflict (user_id, mall_id, role) do nothing;

  -- Generar cupón con reintento ante colisión de código
  while not v_done loop
    v_tries := v_tries + 1;
    v_code := public.generate_coupon_code();
    begin
      insert into public.coupons (mall_id, offer_id, user_id, code, expires_at)
      values (v_offer.mall_id, v_offer.id, v_uid, v_code, v_offer.ends_at)
      returning * into v_coupon;
      v_done := true;
    exception when unique_violation then
      if v_tries >= 5 then
        raise exception 'code_generation_failed';
      end if;
    end;
  end loop;

  update public.offers set activated_count = activated_count + 1 where id = v_offer.id;

  insert into public.analytics_events (mall_id, user_id, event_type, entity_type, entity_id)
  values (v_offer.mall_id, v_uid, 'coupon_activated', 'offer', v_offer.id);

  return jsonb_build_object(
    'coupon_id',  v_coupon.id,
    'code',       v_coupon.code,
    'expires_at', v_coupon.expires_at,
    'offer_id',   v_offer.id,
    'mall_id',    v_offer.mall_id
  );
end;
$$;

-- ---------------------------------------------------------------------------
-- redeem_coupon: lo ejecuta el personal del local (o mall_admin)
-- ---------------------------------------------------------------------------
create or replace function public.redeem_coupon(p_code text)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_uid     uuid := (select auth.uid());
  v_coupon  public.coupons%rowtype;
  v_offer   public.offers%rowtype;
  v_store   public.stores%rowtype;
begin
  if v_uid is null then
    raise exception 'auth_required';
  end if;

  -- Bloqueo del cupón: evita doble canje simultáneo
  select c.* into v_coupon
  from public.coupons c
  where c.code = upper(btrim(p_code))
  for update;

  if not found then
    raise exception 'coupon_not_found';
  end if;

  select o.* into v_offer from public.offers o where o.id = v_coupon.offer_id;
  if not (public.is_store_staff(v_offer.store_id)
          or public.has_mall_role(v_coupon.mall_id, array['mall_admin'])) then
    raise exception 'coupon_not_found';
  end if;

  if v_coupon.status = 'redeemed' then
    raise exception 'already_redeemed';
  end if;
  if v_coupon.status <> 'active' or now() > v_coupon.expires_at then
    raise exception 'coupon_expired';
  end if;

  update public.coupons set status = 'redeemed', redeemed_at = now() where id = v_coupon.id;

  insert into public.coupon_redemptions (mall_id, coupon_id, store_id, redeemed_by)
  values (v_coupon.mall_id, v_coupon.id, v_offer.store_id, v_uid);

  update public.offers set redeemed_count = redeemed_count + 1 where id = v_offer.id;

  insert into public.analytics_events (mall_id, user_id, event_type, entity_type, entity_id)
  values (v_coupon.mall_id, v_coupon.user_id, 'coupon_redeemed', 'offer', v_offer.id);

  select s.* into v_store from public.stores s where s.id = v_offer.store_id;

  return jsonb_build_object(
    'coupon_id',     v_coupon.id,
    'offer_title',   v_offer.title,
    'benefit_label', v_offer.benefit_label,
    'store_name',    v_store.name,
    'redeemed_at',   now()
  );
end;
$$;

-- ---------- Permisos de ejecución ----------
revoke all on function public.generate_coupon_code() from public;
revoke all on function public.track_event(uuid, text, text, uuid, uuid, jsonb) from public;
revoke all on function public.activate_coupon(uuid) from public;
revoke all on function public.redeem_coupon(text) from public;

grant execute on function public.track_event(uuid, text, text, uuid, uuid, jsonb) to anon, authenticated;
grant execute on function public.activate_coupon(uuid) to authenticated;
grant execute on function public.redeem_coupon(text)   to authenticated;
