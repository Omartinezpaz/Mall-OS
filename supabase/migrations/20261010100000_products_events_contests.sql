-- =============================================================================
-- Mall OS · Migración 5 · Catálogo de Conversión, Eventos, Concursos y Suite B2B
-- Fecha: 2026-10-10
-- Principios:
--   * Migración aditiva y no destructiva: no modifica ni borra tablas existentes.
--   * Toda tabla de negocio lleva mall_id y RLS estricto multi-tenant.
--   * FKs compuestas (store_id, mall_id) para garantizar integridad referencial.
--   * Constraints en JSONB (arrays de tallas, colores e imágenes) y rangos de precio.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Ampliación de tabla events existente
-- -----------------------------------------------------------------------------
alter table public.events
  add column if not exists location_zone text;

-- -----------------------------------------------------------------------------
-- 2. products: Catálogo de productos con rangos referenciales y variantes
-- -----------------------------------------------------------------------------
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  mall_id      uuid not null references public.malls (id) on delete cascade,
  store_id     uuid not null,
  name         text not null,
  slug         text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description  text,
  price_min    numeric(10,2) not null check (price_min >= 0),
  price_max    numeric(10,2) not null check (price_max >= price_min),
  image_url    text,
  images_json  jsonb not null default '[]'::jsonb check (jsonb_typeof(images_json) = 'array'),
  sizes_json   jsonb not null default '[]'::jsonb check (jsonb_typeof(sizes_json) = 'array'),
  colors_json  jsonb not null default '[]'::jsonb check (jsonb_typeof(colors_json) = 'array'),
  tags_json    jsonb not null default '[]'::jsonb check (jsonb_typeof(tags_json) = 'array'),
  is_active    boolean not null default true,
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (store_id, slug),
  unique (id, mall_id),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete cascade
);

create index if not exists idx_products_mall_active on public.products (mall_id, is_active);
create index if not exists idx_products_store        on public.products (store_id);
create index if not exists idx_products_price_range  on public.products (mall_id, price_min, price_max);

create trigger trg_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 3. contests: Concursos, sorteos y activaciones en plazas del mall
-- -----------------------------------------------------------------------------
create table if not exists public.contests (
  id           uuid primary key default gen_random_uuid(),
  mall_id      uuid not null references public.malls (id) on delete cascade,
  store_id     uuid,
  title        text not null,
  description  text not null,
  prize        text not null,
  terms        text,
  image_url    text,
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  status       text not null default 'active' check (status in ('draft', 'active', 'ended', 'cancelled')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  check (ends_at > starts_at),
  unique (id, mall_id),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete set null
);

create index if not exists idx_contests_mall_status on public.contests (mall_id, status, ends_at);

create trigger trg_contests_updated_at before update on public.contests
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. concierge_notifications: Notificaciones humanizadas emitidas por el Conserje
-- -----------------------------------------------------------------------------
create table if not exists public.concierge_notifications (
  id               uuid primary key default gen_random_uuid(),
  mall_id          uuid not null references public.malls (id) on delete cascade,
  store_id         uuid,
  title            text not null,
  message_body     text not null,
  target_audience  text not null default 'all',
  scheduled_at     timestamptz not null default now(),
  sent_at          timestamptz,
  created_at       timestamptz not null default now(),
  unique (id, mall_id),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete set null
);

create index if not exists idx_concierge_notifs_mall on public.concierge_notifications (mall_id, scheduled_at);

-- -----------------------------------------------------------------------------
-- 5. audit_log: Trazabilidad inmutable de acciones corporativas B2B
-- -----------------------------------------------------------------------------
create table if not exists public.audit_log (
  id           uuid primary key default gen_random_uuid(),
  actor_id     uuid references auth.users (id) on delete set null,
  actor_role   text not null,
  action       text not null,
  target_type  text not null,
  target_id    uuid,
  mall_id      uuid references public.malls (id) on delete cascade,
  metadata     jsonb not null default '{}'::jsonb check (pg_column_size(metadata) < 4096),
  ip_address   inet,
  user_agent   text,
  created_at   timestamptz not null default now()
);

create index if not exists idx_audit_log_mall_time on public.audit_log (mall_id, created_at desc);
create index if not exists idx_audit_log_actor     on public.audit_log (actor_id);

-- -----------------------------------------------------------------------------
-- 6. invitations: Flujo de invitación formal de administradores y gerentes B2B
-- -----------------------------------------------------------------------------
create table if not exists public.invitations (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  role         text not null check (role in ('store_manager', 'mall_admin')),
  mall_id      uuid not null references public.malls (id) on delete cascade,
  store_id     uuid,
  invited_by   uuid references auth.users (id) on delete set null,
  token        text not null unique check (length(token) >= 32),
  expires_at   timestamptz not null,
  accepted_at  timestamptz,
  created_at   timestamptz not null default now(),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete cascade
);

create index if not exists idx_invitations_token on public.invitations (token);
create index if not exists idx_invitations_mall  on public.invitations (mall_id, email);

-- -----------------------------------------------------------------------------
-- 7. mall_settings: Configuraciones operativas, módulos activos y contacto por mall
-- -----------------------------------------------------------------------------
create table if not exists public.mall_settings (
  mall_id        uuid primary key references public.malls (id) on delete cascade,
  features_json  jsonb not null default '{"catalog": true, "events": true, "contests": true, "kids_mode": true, "concierge": true}'::jsonb,
  branding_json  jsonb not null default '{}'::jsonb,
  contact_json   jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger trg_mall_settings_updated_at before update on public.mall_settings
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 8. Seguridad, Privilegios y Políticas RLS Multi-Tenant
-- -----------------------------------------------------------------------------
alter table public.products                enable row level security; alter table public.products                force row level security;
alter table public.contests                enable row level security; alter table public.contests                force row level security;
alter table public.concierge_notifications enable row level security; alter table public.concierge_notifications force row level security;
alter table public.audit_log               enable row level security; alter table public.audit_log               force row level security;
alter table public.invitations             enable row level security; alter table public.invitations             force row level security;
alter table public.mall_settings           enable row level security; alter table public.mall_settings           force row level security;

-- Concesión de privilegios mínimos a roles de Supabase
grant select on public.products, public.contests, public.concierge_notifications, public.mall_settings to anon, authenticated;
grant select on public.audit_log, public.invitations to authenticated;

grant insert, update, delete on public.products to authenticated;
grant insert, update, delete on public.contests, public.concierge_notifications to authenticated;
grant insert on public.audit_log to authenticated;
grant insert, update, delete on public.invitations to authenticated;
grant update on public.mall_settings to authenticated;

-- ---------- POLÍTICAS RLS: products ----------
-- Visitantes solo ven productos de malls activos (seguridad multi-tenant aislada)
create policy products_select on public.products for select to anon, authenticated
  using (
    (is_active = true and public.mall_is_active(mall_id))
    or public.is_store_staff(store_id)
    or public.has_mall_role(mall_id, array['mall_admin'])
  );

-- Gerentes de tienda solo gestionan sus propios productos
create policy products_insert on public.products for insert to authenticated
  with check (
    public.is_store_staff(store_id)
    or public.has_mall_role(mall_id, array['mall_admin'])
  );

create policy products_update on public.products for update to authenticated
  using (
    public.is_store_staff(store_id)
    or public.has_mall_role(mall_id, array['mall_admin'])
  )
  with check (
    public.is_store_staff(store_id)
    or public.has_mall_role(mall_id, array['mall_admin'])
  );

create policy products_delete on public.products for delete to authenticated
  using (
    public.is_store_staff(store_id)
    or public.has_mall_role(mall_id, array['mall_admin'])
  );

-- ---------- POLÍTICAS RLS: contests ----------
create policy contests_select on public.contests for select to anon, authenticated
  using (
    (status = 'active' and public.mall_is_active(mall_id))
    or public.has_mall_role(mall_id, array['mall_admin'])
  );

create policy contests_admin on public.contests for all to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- POLÍTICAS RLS: concierge_notifications ----------
create policy concierge_notifs_select on public.concierge_notifications for select to anon, authenticated
  using (public.mall_is_active(mall_id));

create policy concierge_notifs_admin on public.concierge_notifications for all to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- POLÍTICAS RLS: audit_log ----------
create policy audit_log_insert on public.audit_log for insert to authenticated
  with check (true);

create policy audit_log_select on public.audit_log for select to authenticated
  using (
    public.is_platform_admin()
    or (mall_id is not null and public.has_mall_role(mall_id, array['mall_admin']))
  );

-- ---------- POLÍTICAS RLS: invitations ----------
create policy invitations_admin on public.invitations for all to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));

-- ---------- POLÍTICAS RLS: mall_settings ----------
create policy mall_settings_select on public.mall_settings for select to anon, authenticated
  using (public.mall_is_active(mall_id) or public.has_mall_role(mall_id, array['mall_admin']));

create policy mall_settings_update on public.mall_settings for update to authenticated
  using (public.has_mall_role(mall_id, array['mall_admin']))
  with check (public.has_mall_role(mall_id, array['mall_admin']));
