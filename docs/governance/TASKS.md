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

## Bloqueos y notas
<!-- Anotar aquí lo que frene una tarea: fecha | tarea | motivo | quién desbloquea -->
