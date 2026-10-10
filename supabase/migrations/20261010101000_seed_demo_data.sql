-- =============================================================================
-- MALL OS · SQL MAESTRO DE DEMO Y MIGRACIÓN UNIFICADA (IDEMPOTENTE)
-- Proyecto: Sambil Chacao (Mall OS Suite B2B)
-- Compatible con: Supabase Cloud SQL Editor & CLI
-- =============================================================================

-- 1. EXTENSIONES Y FUNCIONES BASE
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

-- 2. TABLAS BASE DEL ECOSISTEMA MALL OS
create table if not exists public.malls (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  branding    jsonb not null default '{}'::jsonb,
  currency    text not null default 'USD',
  locale      text not null default 'es-VE',
  timezone    text not null default 'America/Caracas',
  status      text not null default 'active' check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create or replace function public.mall_is_active(target_mall_id uuid)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1 from public.malls
    where id = target_mall_id and status = 'active'
  );
$$;

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  mall_id     uuid not null references public.malls (id) on delete cascade,
  slug        text not null,
  name        text not null,
  icon        text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  unique (mall_id, slug),
  unique (id, mall_id)
);

create table if not exists public.stores (
  id                  uuid primary key default gen_random_uuid(),
  mall_id             uuid not null references public.malls (id) on delete cascade,
  category_id         uuid,
  name                text not null,
  slug                text not null,
  description         text,
  logo_url            text,
  floor               integer not null default 0,
  unit                text,
  phone               text,
  opening_hours       jsonb not null default '{}'::jsonb,
  map_ref             jsonb,
  status              text not null default 'active' check (status in ('active', 'inactive', 'temporary')),
  can_publish_offers  boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (mall_id, slug),
  unique (id, mall_id)
);

create table if not exists public.offers (
  id                uuid primary key default gen_random_uuid(),
  mall_id           uuid not null,
  store_id          uuid not null,
  title             text not null,
  description       text,
  benefit_label     text not null,
  terms             text,
  image_url         text,
  starts_at         timestamptz not null,
  ends_at           timestamptz not null,
  total_coupons     integer not null default 100 check (total_coupons > 0),
  per_user_limit    integer not null default 1 check (per_user_limit > 0),
  activated_count   integer not null default 0 check (activated_count >= 0),
  redeemed_count    integer not null default 0 check (redeemed_count >= 0),
  status            text not null default 'active' check (status in ('draft', 'pending', 'active', 'paused', 'ended')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (id, mall_id),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete cascade
);

create table if not exists public.coupons (
  id            uuid primary key default gen_random_uuid(),
  mall_id       uuid not null,
  offer_id      uuid not null,
  user_id       uuid,
  code          text not null unique,
  status        text not null default 'active' check (status in ('active', 'redeemed', 'expired')),
  activated_at  timestamptz not null default now(),
  expires_at    timestamptz not null,
  redeemed_at   timestamptz,
  created_at    timestamptz not null default now(),
  unique (id, mall_id),
  foreign key (offer_id, mall_id) references public.offers (id, mall_id) on delete cascade
);

create table if not exists public.coupon_redemptions (
  id           uuid primary key default gen_random_uuid(),
  mall_id      uuid not null,
  coupon_id    uuid not null,
  store_id     uuid not null,
  redeemed_by  uuid,
  redeemed_at  timestamptz not null default now(),
  unique (coupon_id),
  foreign key (coupon_id, mall_id) references public.coupons (id, mall_id) on delete cascade,
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete cascade
);

create table if not exists public.events (
  id             uuid primary key default gen_random_uuid(),
  mall_id        uuid not null references public.malls (id) on delete cascade,
  store_id       uuid,
  title          text not null,
  description    text,
  image_url      text,
  location_zone  text,
  starts_at      timestamptz not null,
  ends_at        timestamptz not null,
  status         text not null default 'published' check (status in ('draft', 'published')),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete set null
);

create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  mall_id      uuid not null references public.malls (id) on delete cascade,
  store_id     uuid not null,
  name         text not null,
  slug         text not null,
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
  status       text not null default 'active' check (status in ('draft', 'active', 'ended')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete set null
);

create table if not exists public.concierge_notifications (
  id          uuid primary key default gen_random_uuid(),
  mall_id     uuid not null references public.malls (id) on delete cascade,
  title       text not null,
  message     text not null,
  category    text not null default 'general',
  target_url  text,
  is_sent     boolean not null default false,
  sent_at     timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.audit_log (
  id          bigint generated always as identity primary key,
  mall_id     uuid not null references public.malls (id) on delete cascade,
  user_id     uuid,
  action      text not null,
  table_name  text not null,
  record_id   uuid,
  old_data    jsonb,
  new_data    jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists public.invitations (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  role        text not null check (role in ('store_manager', 'mall_admin')),
  mall_id     uuid not null references public.malls (id) on delete cascade,
  store_id    uuid,
  invited_by  uuid,
  token       text not null unique,
  expires_at  timestamptz not null,
  accepted_at timestamptz,
  created_at  timestamptz not null default now(),
  foreign key (store_id, mall_id) references public.stores (id, mall_id) on delete cascade
);

create table if not exists public.mall_settings (
  mall_id        uuid primary key references public.malls (id) on delete cascade,
  features_json  jsonb not null default '{}'::jsonb,
  branding_json  jsonb not null default '{}'::jsonb,
  contact_json   jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id           bigint generated always as identity primary key,
  mall_id      uuid not null references public.malls (id) on delete cascade,
  user_id      uuid,
  session_id   uuid,
  event_type   text not null,
  entity_type  text,
  entity_id    uuid,
  properties   jsonb not null default '{}'::jsonb,
  occurred_at  timestamptz not null default now()
);

-- 3. HABILITACIÓN DE RLS
alter table public.malls enable row level security;
alter table public.categories enable row level security;
alter table public.stores enable row level security;
alter table public.offers enable row level security;
alter table public.coupons enable row level security;
alter table public.coupon_redemptions enable row level security;
alter table public.events enable row level security;
alter table public.products enable row level security;
alter table public.contests enable row level security;
alter table public.concierge_notifications enable row level security;
alter table public.audit_log enable row level security;
alter table public.analytics_events enable row level security;

-- Políticas de lectura pública para datos activos
do $$ begin
  create policy "malls_select_public" on public.malls for select using (status = 'active');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "categories_select_public" on public.categories for select using (public.mall_is_active(mall_id));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "stores_select_public" on public.stores for select using (public.mall_is_active(mall_id) and status = 'active');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "offers_select_public" on public.offers for select using (public.mall_is_active(mall_id) and status = 'active');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "events_select_public" on public.events for select using (public.mall_is_active(mall_id) and status = 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "products_select_public" on public.products for select using (public.mall_is_active(mall_id) and is_active = true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "contests_select_public" on public.contests for select using (public.mall_is_active(mall_id) and status = 'active');
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "coupons_select_authenticated" on public.coupons for select using (public.mall_is_active(mall_id));
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "analytics_select_public" on public.analytics_events for select using (public.mall_is_active(mall_id));
exception when duplicate_object then null; end $$;


-- =============================================================================
-- 4. SEED MAESTRO: SAMBIL CHACAO & SUITE COMERCIAL
-- =============================================================================

-- 4.1. Mall Principal
insert into public.malls (id, slug, name, branding, currency, locale, timezone, status)
values (
  'a0000000-0000-0000-0000-000000000002',
  'sambil-chacao',
  'Sambil Chacao',
  '{
    "primary_color": "#0B52BA",
    "accent_color": "#F59E0B",
    "logo_url": "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=200",
    "cover_url": "https://images.unsplash.com/photo-1567449303078-57ad995bd301?w=1200&q=80"
  }'::jsonb,
  'USD',
  'es-VE',
  'America/Caracas',
  'active'
) on conflict (id) do nothing;

-- 4.2. Categorías Comerciales
insert into public.categories (id, mall_id, slug, name, icon, sort_order) values
  ('c0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000002', 'moda',           'Moda y Calzado',          'shirt',      1),
  ('c0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000002', 'departamentos',  'Departamentos y Hogar',   'shopping-bag', 2),
  ('c0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000002', 'tecnologia',     'Tecnología y Móviles',    'smartphone', 3),
  ('c0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000002', 'gastronomia',    'Gastronomía y Café',      'coffee',     4),
  ('c0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000002', 'entretenimiento', 'Cine y Diversión',       'film',       5)
on conflict (id) do nothing;

-- 4.3. Tiendas Ancla y Pilotos
insert into public.stores (id, mall_id, category_id, name, slug, description, floor, unit, phone, opening_hours, map_ref, status, can_publish_offers) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000010',
   'ZARA', 'zara', 'Moda internacional masculina, femenina y calzado de última colección.', 1, 'Local AC-10 · Nivel Autopista', '+582129590001',
   '{"mon":[["10:00","21:00"]],"tue":[["10:00","21:00"]],"wed":[["10:00","21:00"]],"thu":[["10:00","21:00"]],"fri":[["10:00","21:00"]],"sat":[["10:00","21:00"]],"sun":[["12:00","20:00"]]}'::jsonb,
   '{"floor":1,"x":120,"y":200}'::jsonb, 'active', true),

  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000010',
   'Bershka', 'bershka', 'Tendencias juveniles, streetwear y accesorios urbanos.', 2, 'Local AQ-20 · Nivel Acuario', '+582129590002',
   '{"mon":[["10:00","21:00"]],"tue":[["10:00","21:00"]],"wed":[["10:00","21:00"]],"thu":[["10:00","21:00"]],"fri":[["10:00","21:00"]],"sat":[["10:00","21:00"]],"sun":[["12:00","20:00"]]}'::jsonb,
   '{"floor":2,"x":220,"y":180}'::jsonb, 'active', true),

  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000011',
   'Tiendas Tijerazo', 'tijerazo', 'Gran tienda por departamentos: moda familiar, ropa de cama, hogar y electrodomésticos.', 1, 'Local AC-01 · Nivel Autopista', '+582129590003',
   '{"mon":[["09:00","20:00"]],"tue":[["09:00","20:00"]],"wed":[["09:00","20:00"]],"thu":[["09:00","20:00"]],"fri":[["09:00","20:00"]],"sat":[["09:00","20:00"]],"sun":[["10:00","19:00"]]}'::jsonb,
   '{"floor":1,"x":80,"y":300}'::jsonb, 'active', true),

  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000012',
   'Samsung Store', 'samsung', 'Tienda oficial Samsung: Galaxy Series, tablets, smartwatches y ecosistema inteligente.', 2, 'Local AQ-05 · Nivel Acuario', '+582129590004',
   '{"mon":[["10:00","20:00"]],"tue":[["10:00","20:00"]],"wed":[["10:00","20:00"]],"thu":[["10:00","20:00"]],"fri":[["10:00","20:00"]],"sat":[["10:00","20:00"]],"sun":[["11:00","19:00"]]}'::jsonb,
   '{"floor":2,"x":300,"y":120}'::jsonb, 'active', true),

  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000013',
   'McCafé & Postres', 'mccafe', 'Café de grano recién tostado, frappés, repostería y helados artesanales.', 1, 'Plaza La Fuente · Nivel Autopista', '+582129590005',
   '{"mon":[["08:00","22:00"]],"tue":[["08:00","22:00"]],"wed":[["08:00","22:00"]],"thu":[["08:00","22:00"]],"fri":[["08:00","23:00"]],"sat":[["08:00","23:00"]],"sun":[["09:00","21:00"]]}'::jsonb,
   '{"floor":1,"x":190,"y":250}'::jsonb, 'active', true)
on conflict (id) do nothing;


-- 4.4. Catálogo de Productos con Galería de Fotos por Color (D-086)
insert into public.products (id, mall_id, store_id, name, slug, description, price_min, price_max, image_url, sizes_json, colors_json, tags_json, is_active, is_featured) values
  -- ZARA (4 productos)
  ('p0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Blazer Entallado Lino', 'blazer-entallado-lino', 'Blazer estructurado en mezcla de lino transpirable, solapas de muesca y forro satinado.', 45.00, 55.00,
   'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
   '["S","M","L","XL"]'::jsonb,
   '[
     {"name":"Beige Arena","hex":"#D7C4B7","images":["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80","https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?w=800&q=80"]},
     {"name":"Negro Clásico","hex":"#1E1E1E","images":["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80","https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&q=80"]}
   ]'::jsonb,
   '["Formal","Verano","Premium"]'::jsonb, true, true),

  ('p0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Vestido Midi Plisado', 'vestido-midi-plisado', 'Falda plisada soleil con caída ligera y cinturón elástico desmontable.', 48.00, 60.00,
   'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
   '["XS","S","M"]'::jsonb,
   '[
     {"name":"Verde Esmeralda","hex":"#059669","images":["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80","https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"]},
     {"name":"Terracota Cálido","hex":"#C2410C","images":["https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"]}
   ]'::jsonb,
   '["Coctel","Elegante"]'::jsonb, true, true),

  ('p0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Camisa Oxford Popelín', 'camisa-oxford-popelin', 'Camisa básica de corte regular en 100% algodón hilado peinado.', 32.00, 38.00,
   'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
   '["S","M","L","XL","XXL"]'::jsonb,
   '[
     {"name":"Blanco Puro","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80"]},
     {"name":"Celeste Cielo","hex":"#93C5FD","images":["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80"]}
   ]'::jsonb,
   '["Casual","Oficina"]'::jsonb, true, false),

  ('p0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Pantalón Slim Cropped', 'pantalon-slim-cropped', 'Pantalón tobillero con pinzas delanteras y tejido elástico confort.', 39.00, 46.00,
   'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
   '["38","40","42","44"]'::jsonb,
   '[
     {"name":"Azul Marino","hex":"#1E293B","images":["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"]},
     {"name":"Gris Carbón","hex":"#475569","images":["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"]}
   ]'::jsonb,
   '["Formal","Slim"]'::jsonb, true, false),

  -- Bershka (3 productos)
  ('p0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002',
   'Pantalón Cargo Baggy Street', 'cargo-baggy-street', 'Pantalón multiebolsillos tiro medio con caída ancha estilo Y2K.', 34.00, 42.00,
   'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80',
   '["34","36","38","40"]'::jsonb,
   '[
     {"name":"Verde Militar","hex":"#3F4F3D","images":["https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80"]},
     {"name":"Negro Asfalto","hex":"#18181B","images":["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"]}
   ]'::jsonb,
   '["Streetwear","Urbano"]'::jsonb, true, true),

  ('p0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002',
   'Hoodie Oversize Gráfico', 'hoodie-oversize-grafico', 'Sudadera con capucha y felpa interior cálida, estampado tipográfico.', 28.00, 35.00,
   'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
   '["S","M","L"]'::jsonb,
   '[
     {"name":"Gris Jaspe","hex":"#94A3B8","images":["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"]},
     {"name":"Crema Vainilla","hex":"#FEF3C7","images":["https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80"]}
   ]'::jsonb,
   '["Hoodie","Invierno"]'::jsonb, true, false),

  ('p0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002',
   'Top Ribbed Halter', 'top-ribbed-halter', 'Top acanalado sin mangas con cuello halter estilizado.', 15.00, 20.00,
   'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
   '["XS","S","M"]'::jsonb,
   '[
     {"name":"Blanco Nieve","hex":"#F8FAFC","images":["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"]},
     {"name":"Coral Sunset","hex":"#FB7185","images":["https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80"]}
   ]'::jsonb,
   '["Verano","Básico"]'::jsonb, true, false),

  -- Tijerazo (3 productos)
  ('p0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003',
   'Vaqueros Denim Clásicos', 'vaqueros-denim-clasicos', 'Jeans de mezclilla 100% algodón con costuras reforzadas.', 22.00, 28.00,
   'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
   '["30","32","34","36","38"]'::jsonb,
   '[
     {"name":"Azul Claro Vintage","hex":"#8DA4C4","images":["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"]},
     {"name":"Azul Marino Profundo","hex":"#1E293B","images":["https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80"]}
   ]'::jsonb,
   '["Denim","Oferta"]'::jsonb, true, true),

  ('p0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003',
   'Juego de Sábanas 300 Hilos', 'juego-sabanas-300-hilos', 'Sábanas tacto seda hipoalergénicas para cama matrimonial y king.', 25.00, 32.00,
   'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
   '["Matrimonial","Queen","King"]'::jsonb,
   '[
     {"name":"Blanco Hotel","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80"]},
     {"name":"Gris Perla","hex":"#CBD5E1","images":["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"]}
   ]'::jsonb,
   '["Hogar","Confort"]'::jsonb, true, false),

  ('p0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003',
   'Edredón Plumón Reversible', 'edredon-plumon-reversible', 'Relleno de microfibra de alta retención térmica capitoneado.', 35.00, 45.00,
   'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
   '["Matrimonial","King"]'::jsonb,
   '[
     {"name":"Azul Marino / Gris","hex":"#1E3A8A","images":["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"]},
     {"name":"Terracota / Arena","hex":"#9A3412","images":["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"]}
   ]'::jsonb,
   '["Dormitorio","Ahorro"]'::jsonb, true, false),

  -- Samsung (3 productos)
  ('p0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004',
   'Galaxy S24 Ultra 256GB', 'galaxy-s24-ultra', 'Pantalla Dynamic AMOLED 2X, procesador Snapdragon 8 Gen 3 y Galaxy AI.', 1150.00, 1250.00,
   'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
   '["256GB","512GB"]'::jsonb,
   '[
     {"name":"Titanium Gray","hex":"#6B7280","images":["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"]},
     {"name":"Titanium Black","hex":"#111827","images":["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80"]}
   ]'::jsonb,
   '["Smartphone","Galaxy AI","Flagship"]'::jsonb, true, true),

  ('p0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004',
   'Galaxy Z Flip 5 5G', 'galaxy-z-flip-5', 'Diseño plegable compacto con Flex Window de 3.4 pulgadas.', 780.00, 850.00,
   'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
   '["256GB","512GB"]'::jsonb,
   '[
     {"name":"Menta Pastel","hex":"#A7F3D0","images":["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80"]},
     {"name":"Grafito Elegante","hex":"#374151","images":["https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&q=80"]}
   ]'::jsonb,
   '["Plegable","Diseño"]'::jsonb, true, false),

  ('p0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004',
   'Galaxy Buds FE Pro', 'galaxy-buds-fe', 'Cancelación activa de ruido (ANC), graves enriquecidos y batería de 30 horas.', 90.00, 110.00,
   'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
   '["Estándar"]'::jsonb,
   '[
     {"name":"Blanco Glaciar","hex":"#F8FAFC","images":["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"]},
     {"name":"Grafito Humo","hex":"#1F2937","images":["https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80"]}
   ]'::jsonb,
   '["Audio","Wireless","ANC"]'::jsonb, true, false),

  -- McCafé (2 productos)
  ('p0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000005',
   'Combo Espresso Doble + Croissant', 'combo-espresso-croissant', 'Espresso de grano arábica venezolano tostado medio con croissant de mantequilla hojaldrado.', 4.50, 6.00,
   'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80',
   '["Normal","Grande"]'::jsonb,
   '[
     {"name":"Café Dorado","hex":"#78350F","images":["https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80"]}
   ]'::jsonb,
   '["Café","Desayuno","Merienda"]'::jsonb, true, true),

  ('p0000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000005',
   'Frappé Caramelo & Nuez', 'frappe-caramelo-nuez', 'Bebida helada cremosa batida con sirope de caramelo, topping de crema y trocitos de nuez tostada.', 5.00, 6.50,
   'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
   '["Mediano (16oz)","Grande (24oz)"]'::jsonb,
   '[
     {"name":"Caramelo Caramelo","hex":"#D97706","images":["https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80"]}
   ]'::jsonb,
   '["Bebida Fría","Postre"]'::jsonb, true, false)
on conflict (id) do nothing;


-- 4.5. Eventos y Concursos Oficiales
insert into public.events (id, mall_id, store_id, title, description, image_url, location_zone, starts_at, ends_at, status) values
  ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Fashion Week Sambil Chacao 2026', 'Desfile exclusivo de nuevas colecciones de primavera-verano con las principales marcas de moda del país.',
   'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
   'Plaza Central · Nivel Autopista', now() + interval '2 days', now() + interval '5 days', 'published'),

  ('e0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004',
   'Samsung Galaxy AI Tour', 'Zona interactiva para experimentar traducción en vivo, edición fotográfica generativa y cámaras nocturnas.',
   'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=800&q=80',
   'Plaza La Fuente · Nivel Autopista', now() - interval '1 day', now() + interval '8 days', 'published'),

  ('e0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', null,
   'Búsqueda del Tesoro Infantil (Modo Niño)', 'Circuito guiado para niños con acertijos por el mall, sellos digitales y premios de cortesía en plaza.',
   'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
   'Plaza Jardín y Nivel Diversión', now() - interval '2 days', now() + interval '12 days', 'published')
on conflict (id) do nothing;

insert into public.contests (id, mall_id, store_id, title, description, prize, terms, starts_at, ends_at, status) values
  ('t0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Gran Sorteo Verano ZARA Sambil', 'Registra tu visita en la app y participa por un certificado de compra para renovar tu armario completo.',
   'Certificado de $200 en ZARA Sambil Chacao', 'Válido para compras en tienda física. Anuncio del ganador vía Conserje IA el 30 del mes.',
   now() - interval '1 day', now() + interval '20 days', 'active'),

  ('t0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004',
   'Desafío Samsung Galaxy Play', 'Demuestra tu habilidad en el circuito de fotografía nocturna en Plaza La Fuente y gana los nuevos audífonos.',
   'Unos Galaxy Buds FE Pro inalámbricos', 'Abierto a todos los visitantes con la app instalada.',
   now() - interval '3 days', now() + interval '15 days', 'active')
on conflict (id) do nothing;


-- 4.6. Ofertas Activas y Cupones de Demostración para el Validador de Caja
insert into public.offers (id, mall_id, store_id, title, description, benefit_label, starts_at, ends_at, total_coupons, per_user_limit, activated_count, redeemed_count, status) values
  ('o0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001',
   'Especial de Temporada: Colección Lino', 'Obtén 20% de descuento directo en cualquier blazer o prenda de lino seleccionada.',
   '-20% OFF en Lino', now() - interval '2 days', now() + interval '15 days', 100, 1, 14, 5, 'active'),

  ('o0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000003',
   'Gran Liquidación Hogar Tijerazo', 'Descuento flash en edredones y sábanas de 300 hilos presentando tu cupón digital en caja.',
   '-30% OFF Hogar', now() - interval '1 day', now() + interval '10 days', 80, 1, 26, 12, 'active'),

  ('o0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000005',
   '2x1 en Cappuccino Italiano McCafé', 'Compra un café mediano o grande y recibe el segundo completamente gratis.',
   '2x1 Hoy', now() - interval '3 days', now() + interval '14 days', 150, 1, 45, 28, 'active')
on conflict (id) do nothing;

-- Cupones activos para probar el Validador de Tienda en vivo
insert into public.coupons (id, mall_id, offer_id, code, status, activated_at, expires_at) values
  ('k0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000010', 'ZARA-2026', 'active', now() - interval '2 hours', now() + interval '24 hours'),
  ('k0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000011', 'TIJE-HOGR', 'active', now() - interval '1 hour', now() + interval '24 hours'),
  ('k0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000012', 'CAFE-2X1S', 'active', now() - interval '30 mins', now() + interval '24 hours'),
  -- Cupón ya canjeado para probar validación negativa (ya usado)
  ('k0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'o0000000-0000-0000-0000-000000000010', 'ZARA-USAD', 'redeemed', now() - interval '3 hours', now() + interval '21 hours')
on conflict (id) do nothing;


-- 4.7. Eventos de Analítica para los Dashboards Ejecutivos (~80 eventos)
insert into public.analytics_events (mall_id, event_type, entity_type, entity_id, properties, occurred_at)
select
  'a0000000-0000-0000-0000-000000000002'::uuid,
  case (g % 6)
    when 0 then 'store_view'
    when 1 then 'product_view'
    when 2 then 'coupon_activated'
    when 3 then 'coupon_redeemed'
    when 4 then 'route_started'
    else 'concierge_search'
  end,
  case (g % 3)
    when 0 then 'store'
    when 1 then 'product'
    else 'offer'
  end,
  case (g % 5)
    when 0 then 'b0000000-0000-0000-0000-000000000001'::uuid
    when 1 then 'b0000000-0000-0000-0000-000000000002'::uuid
    when 2 then 'b0000000-0000-0000-0000-000000000003'::uuid
    when 3 then 'b0000000-0000-0000-0000-000000000004'::uuid
    else 'b0000000-0000-0000-0000-000000000005'::uuid
  end,
  jsonb_build_object(
    'source', 'app_mobile',
    'query', case (g % 4) when 0 then 'vestidos zara' when 1 then 'donde comer cafe' when 2 then 'samsung s24' else 'tijerazo sabanas' end,
    'dwell_time_seconds', 25 + (g * 3)
  ),
  now() - ((g * 1.8) || ' hours')::interval
from generate_series(1, 80) as g;
