-- =============================================================================
-- Mall OS · Migración 3 · Helpers de autorización, RLS y privilegios
-- Estrategia:
--   1) Se retiran los privilegios por defecto a anon/authenticated y se otorgan
--      explícitamente solo los necesarios (mínimo privilegio).
--   2) RLS habilitado y forzado en TODAS las tablas.
--   3) Los helpers son SECURITY DEFINER con search_path vacío para evitar
--      recursión de RLS y secuestro de esquema.
-- =============================================================================

-- ---------- Privilegios: partir de cero ----------
alter default privileges for role postgres in schema public revoke all on tables    from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on functions from anon, authenticated;
revoke all on all tables    in schema public from anon, authenticated;
revoke all on all functions in schema public from anon, authenticated;

-- ---------- Helpers ----------
create or replace function public.is_platform_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.platform_admins pa where pa.user_id = (select auth.uid()));
$$;

create or replace function public.has_mall_role(p_mall_id uuid, p_roles text[])
returns boolean
language sql stable security definer set search_path = ''
as $$
  select public.is_platform_admin()
      or exists (
        select 1 from public.memberships m
        where m.user_id = (select auth.uid())
          and m.mall_id = p_mall_id
          and m.role = any (p_roles)
      );
$$;

create or replace function public.is_store_staff(p_store_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.store_users su
    where su.store_id = p_store_id and su.user_id = (select auth.uid())
  );
$$;

create or replace function public.is_offer_staff(p_offer_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.offers o
    join public.store_users su on su.store_id = o.store_id
    where o.id = p_offer_id and su.user_id = (select auth.uid())
  );
$$;

create or replace function public.store_can_publish(p_store_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.stores s
    where s.id = p_store_id and s.status = 'active' and s.can_publish_offers
  );
$$;

create or replace function public.mall_is_active(p_mall_id uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.malls m where m.id = p_mall_id and m.status = 'active');
$$;

revoke all on function
  public.is_platform_admin(), public.has_mall_role(uuid, text[]), public.is_store_staff(uuid),
  public.is_offer_staff(uuid), public.store_can_publish(uuid), public.mall_is_active(uuid)
from public;
grant execute on function
  public.is_platform_admin(), public.has_mall_role(uuid, text[]), public.is_store_staff(uuid),
  public.is_offer_staff(uuid), public.store_can_publish(uuid), public.mall_is_active(uuid)
to anon, authenticated;

-- ---------- Habilitar y forzar RLS ----------
alter table public.malls              enable row level security; alter table public.malls              force row level security;
alter table public.profiles           enable row level security; alter table public.profiles           force row level security;
alter table public.platform_admins    enable row level security; alter table public.platform_admins    force row level security;
alter table public.memberships        enable row level security; alter table public.memberships        force row level security;
alter table public.categories         enable row level security; alter table public.categories         force row level security;
alter table public.stores             enable row level security; alter table public.stores             force row level security;
alter table public.store_users        enable row level security; alter table public.store_users        force row level security;
alter table public.offers             enable row level security; alter table public.offers             force row level security;
alter table public.coupons            enable row level security; alter table public.coupons            force row level security;
alter table public.coupon_redemptions enable row level security; alter table public.coupon_redemptions force row level security;
alter table public.events             enable row level security; alter table public.events             force row level security;
alter table public.analytics_events   enable row level security; alter table public.analytics_events   force row level security;

-- ---------- Privilegios explícitos por tabla ----------
grant select on public.malls, public.categories, public.stores, public.offers, public.events to anon, authenticated;
grant select on public.profiles, public.memberships, public.store_users,
                public.coupons, public.coupon_redemptions, public.analytics_events to authenticated;

grant update (name, branding)                   on public.malls    to authenticated;
grant update (display_name, phone)              on public.profiles to authenticated;
grant insert, update, delete                    on public.categories to authenticated;
grant insert, delete                            on public.stores     to authenticated;
grant update (name, category_id, description, logo_url, floor, unit, phone,
              opening_hours, map_ref, status, can_publish_offers)
                                                on public.stores     to authenticated;
grant insert, delete                            on public.store_users to authenticated;
grant insert, update, delete                    on public.events     to authenticated;

-- offers: columnas explícitas. Los contadores y mall_id/store_id NO son editables por el cliente.
grant insert (mall_id, store_id, title, description, benefit_label, terms, image_url,
              starts_at, ends_at, total_coupons, per_user_limit, status)
                                                on public.offers to authenticated;
grant update (title, description, benefit_label, terms, image_url,
              starts_at, ends_at, total_coupons, per_user_limit, status)
                                                on public.offers to authenticated;

-- =============================================================================
-- POLÍTICAS
-- =============================================================================

-- ---------- malls ----------
create policy malls_select on public.malls for select to anon, authenticated
  using (status = 'active' or public.has_mall_role(id, array['mall_admin']));
create policy malls_update_admin on public.malls for update to authenticated
  using (public.has_mall_role(id, array['mall_admin']))
  with check (public.has_mall_role(id, array['mall_admin']));

-- ---------- profiles ----------
create policy profiles_select_own on public.profiles for select to authenticated
  using (id = (select auth.uid()));
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- ---------- memberships (solo lectura; se escriben por RPC/service_role) ----------
create policy memberships_select on public.memberships for select to authenticated
  using (user_id = (select auth.uid()) or public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- categories ----------
create policy categories_select on public.categories for select to anon, authenticated
  using (public.mall_is_active(mall_id));
create policy categories_admin_write on public.categories for all to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- stores ----------
create policy stores_select_public on public.stores for select to anon, authenticated
  using (status = 'active' and public.mall_is_active(mall_id));
create policy stores_select_staff on public.stores for select to authenticated
  using (public.is_store_staff(id) or public.has_mall_role(mall_id, array['mall_admin']));
create policy stores_insert_admin on public.stores for insert to authenticated
  with check (public.has_mall_role(mall_id, array['mall_admin']));
create policy stores_delete_admin on public.stores for delete to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']));
create policy stores_update on public.stores for update to authenticated
  using (public.is_store_staff(id) or public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.is_store_staff(id) or public.has_mall_role(mall_id, array['mall_admin']));

-- Un tenant solo puede cambiar datos de presentación; lo estructural es del mall_admin.
create or replace function public.guard_store_update()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if (select auth.uid()) is not null
     and not public.has_mall_role(old.mall_id, array['mall_admin']) then
    if new.name is distinct from old.name
       or new.category_id is distinct from old.category_id
       or new.floor is distinct from old.floor
       or new.unit is distinct from old.unit
       or new.status is distinct from old.status
       or new.can_publish_offers is distinct from old.can_publish_offers
       or new.map_ref is distinct from old.map_ref
       or new.mall_id is distinct from old.mall_id
       or new.slug is distinct from old.slug then
      raise exception 'store_field_not_editable';
    end if;
  end if;
  return new;
end;
$$;
create trigger trg_stores_guard before update on public.stores
  for each row execute function public.guard_store_update();

-- ---------- store_users ----------
create policy store_users_select on public.store_users for select to authenticated
  using (user_id = (select auth.uid()) or public.has_mall_role(mall_id, array['mall_admin']));
create policy store_users_insert_admin on public.store_users for insert to authenticated
  with check (public.has_mall_role(mall_id, array['mall_admin']));
create policy store_users_delete_admin on public.store_users for delete to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- offers ----------
create policy offers_select_public on public.offers for select to anon, authenticated
  using (
    status = 'active'
    and starts_at <= now() and ends_at >= now()
    and public.mall_is_active(mall_id)
    and public.store_can_publish(store_id)
  );
create policy offers_select_staff on public.offers for select to authenticated
  using (public.is_store_staff(store_id) or public.has_mall_role(mall_id, array['mall_admin']));

create policy offers_insert_tenant on public.offers for insert to authenticated
  with check (
    public.is_store_staff(store_id)
    and public.store_can_publish(store_id)
    and status in ('draft', 'pending')
  );
create policy offers_insert_admin on public.offers for insert to authenticated
  with check (public.has_mall_role(mall_id, array['mall_admin']));

create policy offers_update_tenant on public.offers for update to authenticated
  using (public.is_store_staff(store_id))
  with check (public.is_store_staff(store_id) and status in ('draft', 'pending', 'paused', 'ended'));
create policy offers_update_admin on public.offers for update to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- coupons (lectura) ----------
create policy coupons_select_own on public.coupons for select to authenticated
  using (user_id = (select auth.uid()));
create policy coupons_select_staff on public.coupons for select to authenticated
  using (public.is_offer_staff(offer_id) or public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- coupon_redemptions (lectura) ----------
create policy redemptions_select_staff on public.coupon_redemptions for select to authenticated
  using (public.is_store_staff(store_id) or public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- events ----------
create policy events_select_public on public.events for select to anon, authenticated
  using (status = 'published' and ends_at >= now() and public.mall_is_active(mall_id));
create policy events_select_admin on public.events for select to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']));
create policy events_admin_write on public.events for all to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- analytics_events (solo lectura para el mall_admin) ----------
create policy analytics_select_admin on public.analytics_events for select to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']));
