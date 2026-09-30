-- =============================================================================
-- Mall OS · Migración 2 · Ofertas, cupones, canjes, eventos y analítica
-- Los contadores (activated_count, redeemed_count) y el estado de los cupones
-- solo cambian dentro de las RPC (migración 4), nunca desde el cliente.
-- Sin precios: solo beneficio en texto (ej. '30% OFF', '2x1').
-- =============================================================================

-- -----------------------------------------------------------------------------
-- offers
-- Ciclo de estados: draft -> pending -> active (aprueba mall_admin) -> paused/ended
-- El tenant NO puede poner 'active'. Editar una oferta activa la devuelve a 'pending'.
-- -----------------------------------------------------------------------------
create table public.offers (
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
  status            text not null default 'pending'
                    check (status in ('draft', 'pending', 'active', 'paused', 'ended')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  check (ends_at > starts_at),
  check (activated_count <= total_coupons),
  check (redeemed_count <= activated_count),
  unique (id, mall_id),
  foreign key (store_id, mall_id) references public.stores (id, mall_id)
);
create index idx_offers_mall_status_end on public.offers (mall_id, status, ends_at);
create index idx_offers_store           on public.offers (store_id);
create trigger trg_offers_updated_at before update on public.offers
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- coupons: un cupón activado por un usuario. 'code' es lo que va en el QR.
-- -----------------------------------------------------------------------------
create table public.coupons (
  id            uuid primary key default gen_random_uuid(),
  mall_id       uuid not null,
  offer_id      uuid not null,
  user_id       uuid not null references auth.users (id) on delete cascade,
  code          text not null unique check (code ~ '^[A-Z2-9]{8}$'),
  status        text not null default 'active' check (status in ('active', 'redeemed', 'expired', 'cancelled')),
  activated_at  timestamptz not null default now(),
  expires_at    timestamptz not null,
  redeemed_at   timestamptz,
  unique (id, mall_id),
  foreign key (offer_id, mall_id) references public.offers (id, mall_id)
);
create index idx_coupons_user  on public.coupons (user_id);
create index idx_coupons_offer on public.coupons (offer_id);
create index idx_coupons_mall  on public.coupons (mall_id, status);

-- -----------------------------------------------------------------------------
-- coupon_redemptions: bitácora inmutable de canjes (auditoría)
-- -----------------------------------------------------------------------------
create table public.coupon_redemptions (
  id            uuid primary key default gen_random_uuid(),
  mall_id       uuid not null,
  coupon_id     uuid not null unique,               -- un cupón se canjea una sola vez
  store_id      uuid not null,
  redeemed_by   uuid not null references auth.users (id),
  redeemed_at   timestamptz not null default now(),
  foreign key (coupon_id, mall_id) references public.coupons (id, mall_id),
  foreign key (store_id, mall_id)  references public.stores (id, mall_id)
);
create index idx_redemptions_mall_time on public.coupon_redemptions (mall_id, redeemed_at);
create index idx_redemptions_store     on public.coupon_redemptions (store_id);

-- -----------------------------------------------------------------------------
-- events: "Hoy en el Mall" (carrusel del Home)
-- -----------------------------------------------------------------------------
create table public.events (
  id           uuid primary key default gen_random_uuid(),
  mall_id      uuid not null references public.malls (id) on delete cascade,
  store_id     uuid,                                  -- opcional
  title        text not null,
  description  text,
  image_url    text,
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  check (ends_at > starts_at),
  foreign key (store_id, mall_id) references public.stores (id, mall_id)
);
create index idx_events_mall_time on public.events (mall_id, status, ends_at);
create trigger trg_events_updated_at before update on public.events
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- analytics_events: base del funnel (visita -> registro -> activado -> canjeado)
-- Se escribe SOLO vía RPC track_event / dentro de las RPC de cupones.
-- -----------------------------------------------------------------------------
create table public.analytics_events (
  id           bigint generated always as identity primary key,
  mall_id      uuid not null references public.malls (id) on delete cascade,
  user_id      uuid references auth.users (id) on delete set null,
  session_id   uuid,
  event_type   text not null,
  entity_type  text,
  entity_id    uuid,
  properties   jsonb not null default '{}'::jsonb check (pg_column_size(properties) < 2048),
  occurred_at  timestamptz not null default now()
);
create index idx_analytics_mall_time on public.analytics_events (mall_id, occurred_at);
create index idx_analytics_mall_type on public.analytics_events (mall_id, event_type, occurred_at);
