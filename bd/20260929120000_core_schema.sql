-- =============================================================================
-- Mall OS · Migración 1 · Esquema base multi-mall
-- Principios:
--   * Toda tabla de negocio lleva mall_id.
--   * Las relaciones entre tablas de negocio usan FK COMPUESTAS (id, mall_id)
--     para que sea imposible mezclar datos de dos malls (ej. una oferta del
--     mall A apuntando a una tienda del mall B).
--   * Un usuario tiene UNA cuenta y puede tener membresías en varios malls.
-- =============================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- malls: una fila por centro comercial (instancia)
-- -----------------------------------------------------------------------------
create table public.malls (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique
              check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),          -- ej: 'los-nuevos-teques'
  name        text not null,                                       -- ej: 'Mall OS Los Nuevos Teques'
  branding    jsonb not null default '{}'::jsonb,                  -- colores, logo_url, etc. (se cachea offline)
  currency    text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  locale      text not null default 'es-VE',
  timezone    text not null default 'America/Caracas',
  status      text not null default 'active' check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_malls_updated_at before update on public.malls
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- profiles: datos propios del usuario (el email vive en auth.users)
-- -----------------------------------------------------------------------------
create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  display_name  text,
  phone         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Crea el perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- platform_admins: superadministradores de Mall OS (solo tú). Sin acceso desde clientes.
-- -----------------------------------------------------------------------------
create table public.platform_admins (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- memberships: qué rol tiene un usuario en cada mall
-- Un usuario puede ser 'shopper' en varios malls. Las membresías NO se crean
-- desde el cliente: solo por RPC (shopper) o por service_role/admin (tenant, mall_admin).
-- -----------------------------------------------------------------------------
create table public.memberships (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  mall_id     uuid not null references public.malls (id) on delete cascade,
  role        text not null check (role in ('shopper', 'tenant', 'mall_admin')),
  created_at  timestamptz not null default now(),
  unique (user_id, mall_id, role)
);
create index idx_memberships_mall on public.memberships (mall_id);
create index idx_memberships_user on public.memberships (user_id);

-- -----------------------------------------------------------------------------
-- categories
-- -----------------------------------------------------------------------------
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  mall_id     uuid not null references public.malls (id) on delete cascade,
  slug        text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name        text not null,
  icon        text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  unique (mall_id, slug),
  unique (id, mall_id)                       -- necesario para FKs compuestas
);

-- -----------------------------------------------------------------------------
-- stores: locales del mall
-- can_publish_offers = false para cadenas (McDonald's, supermercado) hasta que
-- consigas su autorización: aparecen en el directorio pero no publican ofertas.
-- opening_hours: {"mon":[["08:00","20:00"]], "tue":[...], ...} (formato acordado)
-- map_ref: {"floor":1,"x":150,"y":300} o id de zona del SVG
-- El filtrado/búsqueda del directorio se hace en el cliente (offline-first, ~30 filas).
-- -----------------------------------------------------------------------------
create table public.stores (
  id                  uuid primary key default gen_random_uuid(),
  mall_id             uuid not null references public.malls (id),
  category_id         uuid,
  name                text not null,
  slug                text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description         text,
  logo_url            text,
  floor               integer not null default 0,
  unit                text,                                   -- número/código de local
  phone               text,
  opening_hours       jsonb not null default '{}'::jsonb,
  map_ref             jsonb,
  status              text not null default 'active' check (status in ('active', 'inactive', 'temporary')),
  can_publish_offers  boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (mall_id, slug),
  unique (id, mall_id),
  foreign key (category_id, mall_id) references public.categories (id, mall_id)
);
create index idx_stores_mall_status   on public.stores (mall_id, status);
create index idx_stores_mall_category on public.stores (mall_id, category_id);
create trigger trg_stores_updated_at before update on public.stores
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- store_users: qué usuarios operan un local (portal tenant)
-- -----------------------------------------------------------------------------
create table public.store_users (
  store_id    uuid not null,
  mall_id     uuid not null,
  user_id     uuid not null references auth.users (id) on delete cascade,
  role        text not null default 'staff' check (role in ('owner', 'staff')),
  created_at  timestamptz not null default now(),
  primary key (store_id, user_id),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete cascade
);
create index idx_store_users_user on public.store_users (user_id);
create index idx_store_users_mall on public.store_users (mall_id);
