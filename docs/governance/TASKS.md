# TASKS — Backlog activo

> Estados: `TODO` · `DOING` · `BLOCKED` · `DONE`. Una sola tarea en `DOING` a la vez.
> Cada tarea tiene criterios de aceptación verificables. Ver RULES.md §8 (Definition of Done).
> Al terminar una tarea: cambiar estado, anotar fecha y el modelo usado.

## Sprint 0 — Preparación (no es código)

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-001 | Contactar a la junta y agendar reunión | TODO | Fecha confirmada en agenda de la junta |
| T-002 | Redactar carta de intención de 1 página | TODO | Documento en `docs/pilot/` con alcance, 90 días, métricas, qué se pide a la junta |
| T-003 | Levantar lista de los ~30 locales (nombre, categoría, piso, horario, contacto, ¿publica ofertas?) | TODO | Archivo CSV en `docs/pilot/locales.csv` |
| T-004 | Conseguir plano por piso (imagen o PDF) | TODO | Archivo en `docs/pilot/planos/` |
| T-005 | Intentar inscripción en Apple Developer y registrar resultado | TODO | Resultado anotado en MEMORY.md (no bloquea el piloto) |
| T-006 | Verificar disponibilidad del proveedor de IA (país de cuenta y facturación) | TODO | Decisión anotada en MEMORY.md |
| T-007 | Crear cuentas: Expo/EAS, Supabase, dominio | DONE | Proyecto Supabase Cloud creado: `bgncghyhyosugfnraoqm.supabase.co`; credenciales en `.env` local |

## Sprint 1 — Cimientos

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-101 | Inicializar monorepo pnpm + Turborepo con `apps/` y `packages/` | DONE | Monorepo funciona; Supabase cloud y EAS vinculados |
| T-102 | `packages/config`: tsconfig base estricto, ESLint, Prettier | DONE | Todas las apps extienden la misma config; lint pasa |
| T-103 | Scripts raíz: `dev`, `build`, `lint`, `typecheck`, `test` | DONE | Cada script funciona desde la raíz vía Turborepo |
| T-104 | `.gitignore`, `.env.example` (sin valores), git-secrets o equivalente | DONE | Ningún `.env` versionado; plantilla presente |
| T-105 | Inicializar Supabase Cloud / local | DONE | Proyecto cloud enlazado; variables en `.env` y `.env.local` |
| T-106 | Migración: `malls`, `profiles`, `memberships`, `stores`, `categories` con `mall_id` y RLS | DONE | 20260929100000_core_tables.sql creado |
| T-107 | Migración: `offers`, `coupons`, `coupon_redemptions` con RLS | DONE | 20260929100100_business_tables.sql + 20260929100200_rls_policies.sql |
| T-108 | RPC transaccional `activate_coupon` (user desde `auth.uid()`, stock con `FOR UPDATE`) | DONE | En 20260929100300_atomic_rpc.sql |
| T-109 | RPC `redeem_coupon` (valida tenant, marca usado de forma atómica) | DONE | En 20260929100300_atomic_rpc.sql |
| T-110 | `seed.sql` con Los Nuevos Teques y locales de T-003 | DONE | supabase/seed.sql poblado con datos del piloto |
| T-111 | Generar `packages/types` desde Supabase | DONE | types exportados y listos para consumo |
| T-112 | `packages/validators`: Zod para oferta, canje, filtros de directorio | DONE | offer, redemption y directory schemas |
| T-113 | `packages/design-tokens`: colores, tipografía, espaciado, sombras | DONE | Alineado con DESIGN.md |
| T-114 | Scaffold `apps/mobile` (Expo Router, tabs vacías, EAS build) | DONE | Configurado y build inicial generado |

## Sprint 2 — Núcleo shopper

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-201 | Resolución de Mall por Deep Link y manual (`m/[slug].tsx` + cache del mall activo) | DONE | Resuelve 'los-nuevos-teques', guarda en storage y redirige al Home con contexto |
| T-202 | Home Shopper (`app/(tabs)/index.tsx`) con diseño DESIGN.md | DONE | Top bar, banner de bienvenida, buscador, categorías, accesos directos y CTA Concierge |
| T-203 | Directorio de tiendas (`app/(tabs)/directorio.tsx`) con búsqueda y filtros offline | DONE | Búsqueda por texto, filtro por categoría y piso, lista optimizada para gama baja |
| T-204 | Ficha detallada de local (`app/local/[id].tsx`) | DONE | Nombre, categoría, piso, horario, teléfono/WhatsApp, ofertas activas y botón al mapa |
| T-205 | Mapa SVG por piso (`app/(tabs)/mapa.tsx`) interactivo | DONE | Selector de piso (PB, P1), renderizado SVG local, highlight del local seleccionado |
| T-206 | Verificación de Modo Avión / Offline en toda la navegación shopper | DONE | App abre sin conexión y permite ver directorio, mapa y fichas cacheadas |

## Sprint 3 — Ofertas, cupones y tenants

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-301 | Pantalla de Ofertas (`apps/mobile/app/(tabs)/ofertas.tsx`) | DONE | Listado de ofertas activas con beneficio, stock, vigencia y botón para activar |
| T-302 | Flujo de activación de cupón (RPC `activate_coupon`) | DONE | Descuenta stock atómicamente y genera código de 8 caracteres con expiración |
| T-303 | Pantalla de Cupón con QR dinámico (`apps/mobile/app/cupon/[id].tsx`) | DONE | Código legible, temporizador regresivo y QR renderizado para mostrar en caja |
| T-304 | Portal Tenant — Validación y Canje (`apps/admin/app/(tenant)/canje/page.tsx`) | DONE | Formulario con input de código de 8 caracteres y validación atómica |
| T-305 | Portal Tenant — Gestión de Ofertas (`apps/admin/app/(tenant)/mis-ofertas/page.tsx`) | DONE | Crear oferta en estado borrador/pendiente para revisión del administrador (D-017) |
| T-306 | Portal Mall Admin — Aprobación de Ofertas (`apps/admin/app/(mall)/ofertas-revision/page.tsx`) | DONE | Vista de moderación para activar o rechazar ofertas de locales |

## Sprint 4 — Concierge, dashboard, landing

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-401 | Edge Function Concierge IA con Tool Calling | DONE | Responde preguntas sobre locales, horarios y ofertas con datos de la DB |
| T-402 | Pantalla Concierge en móvil (`apps/mobile/app/concierge.tsx`) | DONE | Chat interactivo con chips rápidos y respuestas contextuales sobre el mall |
| T-403 | Dashboard Funnel Mall Admin (`apps/admin/app/(mall)/metricas/page.tsx`) | DONE | Embudo completo de conversión, KPIs y desglose por tienda |
| T-404 | Landing Page Oficial + Legal (`apps/landing/app/page.tsx`) | DONE | Presentación del mall, descarga APK, términos y privacidad |

## Sprint 5 — Experiencia Integral Light Luxury y Motor Isométrico 2.5D (Tiempo y Espacio)

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-501 | Rediseño de las 8 pantallas shopper con tema Light Luxury oficial | DONE | `#F8FAFC`, `#0F172A`, `#4F46E5`, logos 3D ribbon y micro-interacciones fluidas |
| T-502 | Motor Isométrico 2.5D interactivo (`IsometricMap.tsx`) | DONE | Gestos pan/pinch, cálculo Dijkstra de rutas animadas, fijación de posición manual ("Estoy aquí") |
| T-503 | Filtro dinámico de Tiempo y Espacio | DONE | Atenuación en gris de locales cerrados por hora real/simulada y snapping a pasillos |
| T-504 | Armonización del dataset de locales piloto | DONE | Locales del mapa y del directorio sincronizados sin discrepancias de IDs |
| T-505 | Vitrina Virtual Digital HUD (`StorefrontHUD.tsx` y `storefront-data.ts`) | DONE | Catálogo de vitrina de 10 locales, beneficios, WhatsApp directo, métodos de pago y cupones flash |
| T-506 | Simulación de Caminata y Seguimiento de Cámara en Tiempo Real | DONE | Recorrido suave a 1.2 m/s interpolando waypoints, heading de avatar, followUser y trigger de llegada |

## Sprint 6 — Centro Comercial Sambil Chacao (4 Niveles) y Expansión Multi-Venue

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-601 | Modelado arquitectónico de los 4 niveles de Sambil Chacao en `@mallos/map-engine` | DONE | `floor-autopista`, `floor-acuario`, `floor-libertador`, `floor-diversion` con geometría exacta, 5 plazas icónicas y tiendas ancla |
| T-602 | Grafo de navegación multimodal y puertas para Sambil Chacao | DONE | Nodos de pasillo, entradas por Plaza Jardín y Plaza La Fuente, puertas de anclas y cálculo de ruta |
| T-603 | Catálogo de Vitrinas Digitales HUD de Sambil Chacao | DONE | Vitrinas para ZARA (2.500 m²), Tijerazo, Mango Bajito (2.136 m²), Nike, Miniso, Samsung, Bonsai Sushi, Anfiteatro VIP |
| T-604 | Selector de 4 niveles en App Móvil (`apps/mobile/app/(tabs)/mapa.tsx`) | DONE | Switcher interactivo de pisos (L1 Autopista, L2 Acuario, L3 Libertador, L4 Diversión) con recálculo dinámico |
| T-605 | Suite de pruebas unitarias automatizadas del motor para 4 niveles | DONE | 46 pruebas en `packages/map-engine` pasando al 100% |
## Sprint 7 — Suite B2B de Doble Repositorio, Portales Web y Catálogo de Conversión

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-701 | Migración Supabase Aditiva: `products`, `events`, `contests`, `notifications`, `audit_log`, `invitations`, `mall_settings` | DONE | 20261010100000_products_events_contests.sql creada con RLS multi-tenant, FKs compuestas, tipos en `@mallos/types` y Zod en `@mallos/validators` |
| T-702 | Inicialización del Repositorio B2B `mall-os-portals` | DOING | Creación del proyecto Next.js 14 App Router con Tailwind CSS, shadcn/ui, `@supabase/ssr` y cliente TypeScript |
| T-703 | Seguridad B2B y Blindaje de Pitch Mode Switcher | TODO | Login corporativo seguro (email/password/2FA) + Switcher de demo restringido a `NEXT_PUBLIC_DEMO_MODE=true` con banner de advertencia |
| T-704 | Store OS Desktop (`/store`): Perfil y CRUD de Catálogo | TODO | Gestión de tienda y formulario de productos con rangos referenciales (`price_min`, `price_max`), tags de tallas, colores y fotos |
| T-705 | Mall Executive OS (`/admin`) y Super Admin (`/root`) | TODO | Directorio comercial multi-tienda, módulo de eventos/concursos, emisor de avisos del Conserje y visor de `audit_log` |
| T-706 | Integración Mobile (`mall-os`): Vitrina y Búsqueda en Conserje | TODO | App móvil consume catálogo en vivo desde Supabase y el Conserje responde a consultas de tallas, colores y rangos |

## Bloqueos y notas
<!-- Anotar aquí lo que frene una tarea: fecha | tarea | motivo | quién desbloquea -->

