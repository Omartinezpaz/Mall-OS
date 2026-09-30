-- =============================================================================
-- Mall OS · Seed Data · Centro Comercial Los Nuevos Teques
-- =============================================================================

-- 1. Mall principal del piloto
insert into public.malls (id, slug, name, branding, currency, locale, timezone, status)
values (
  'a0000000-0000-0000-0000-000000000001',
  'los-nuevos-teques',
  'Mall OS Los Nuevos Teques',
  '{
    "primary_color": "#0F172A",
    "accent_color": "#10B981",
    "logo_url": "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=200",
    "cover_url": "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800"
  }'::jsonb,
  'USD',
  'es-VE',
  'America/Caracas',
  'active'
) on conflict (id) do nothing;

-- 2. Categorías
insert into public.categories (id, mall_id, slug, name, icon, sort_order) values
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'supermercados', 'Supermercados', 'shopping-cart', 1),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'gastronomia',   'Gastronomía y Café', 'coffee', 2),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'alimentos',     'Charcutería y Víveres', 'shopping-bag', 3),
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'salud',         'Farmacia y Salud', 'heart-pulse', 4),
  ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'deportes',      'Gimnasio y Deportes', 'dumbbell', 5),
  ('c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'bancos',        'Bancos y Servicios', 'landmark', 6),
  ('c0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'hogar',         'Hogar y Mueblería', 'home', 7)
on conflict (id) do nothing;

-- 3. Locales del CC Los Nuevos Teques
insert into public.stores (id, mall_id, category_id, name, slug, description, floor, unit, phone, opening_hours, map_ref, status, can_publish_offers) values
  ('s0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001',
   'Supermercado San Diego', 'supermercado-san-diego', 'Cadena de supermercados con víveres, carnes y frescos.', 0, 'PB-01', '+584120000001',
   '{"mon":[["08:00","20:00"]],"tue":[["08:00","20:00"]],"wed":[["08:00","20:00"]],"thu":[["08:00","20:00"]],"fri":[["08:00","20:00"]],"sat":[["08:00","20:00"]],"sun":[["09:00","18:00"]]}'::jsonb,
   '{"floor":0,"x":100,"y":150}'::jsonb, 'active', false),

  ('s0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002',
   'Panadería y Pastelería Los Cedros', 'panaderia-los-cedros', 'Panadería artesanal, desayunos, café express y dulces.', 0, 'PB-02', '+584120000002',
   '{"mon":[["06:30","20:00"]],"tue":[["06:30","20:00"]],"wed":[["06:30","20:00"]],"thu":[["06:30","20:00"]],"fri":[["06:30","20:00"]],"sat":[["06:30","20:00"]],"sun":[["07:00","14:00"]]}'::jsonb,
   '{"floor":0,"x":200,"y":150}'::jsonb, 'active', true),

  ('s0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003',
   'Charcutería La Estancia', 'charcuteria-la-estancia', 'Quesos nacionales e importados, embutidos y delicateses.', 0, 'PB-03', '+584120000003',
   '{"mon":[["08:00","19:00"]],"tue":[["08:00","19:00"]],"wed":[["08:00","19:00"]],"thu":[["08:00","19:00"]],"fri":[["08:00","19:00"]],"sat":[["08:00","19:00"]]}'::jsonb,
   '{"floor":0,"x":250,"y":150}'::jsonb, 'active', true),

  ('s0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004',
   'Farmacia SAAS', 'farmacia-saas', 'Medicamentos, artículos de cuidado personal y primeros auxilios.', 0, 'PB-04', '+584120000004',
   '{"mon":[["08:00","21:00"]],"tue":[["08:00","21:00"]],"wed":[["08:00","21:00"]],"thu":[["08:00","21:00"]],"fri":[["08:00","21:00"]],"sat":[["08:00","21:00"]],"sun":[["09:00","19:00"]]}'::jsonb,
   '{"floor":0,"x":300,"y":150}'::jsonb, 'active', false),

  ('s0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000005',
   'Fitness Club Los Teques', 'fitness-club-los-teques', 'Centro de entrenamiento, pesas, cardio y clases dirigidas.', 1, 'P1-01', '+584120000006',
   '{"mon":[["06:00","21:00"]],"tue":[["06:00","21:00"]],"wed":[["06:00","21:00"]],"thu":[["06:00","21:00"]],"fri":[["06:00","21:00"]],"sat":[["08:00","16:00"]]}'::jsonb,
   '{"floor":1,"x":100,"y":150}'::jsonb, 'active', true)
on conflict (id) do nothing;

-- 4. Ofertas activas iniciales para el piloto
insert into public.offers (id, mall_id, store_id, title, description, benefit_label, starts_at, ends_at, total_coupons, per_user_limit, status) values
  ('o0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000002',
   'Combo Café con Leche + Pastel', 'Disfruta un café con leche grande y pastel de hojaldre de cortesía.', 'Combo Especial',
   now() - interval '1 day', now() + interval '30 days', 50, 1, 'active'),

  ('o0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 's0000000-0000-0000-0000-000000000005',
   'Pase de Cortesía 1 Día de Entrenamiento', 'Entrena gratis un día completo en nuestras instalaciones.', 'Pase 1 Día Gratis',
   now() - interval '1 day', now() + interval '30 days', 30, 1, 'active')
on conflict (id) do nothing;

-- 5. Eventos iniciales
insert into public.events (id, mall_id, title, description, starts_at, ends_at, status) values
  ('e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001',
   'Jornada de Salud y Bienestar en PB', 'Revisión preventiva de tensión y glucosa en pasillo central.',
   now() - interval '1 day', now() + interval '7 days', 'published')
on conflict (id) do nothing;
