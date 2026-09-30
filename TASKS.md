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
| T-007 | Crear cuentas: Expo/EAS, Supabase, dominio | TODO | Proyecto Supabase creado; dominio reservado |

## Sprint 1 — Cimientos

| ID | Tarea | Estado | Aceptación |
|---|---|---|---|
| T-101 | Inicializar monorepo pnpm + Turborepo con `apps/` y `packages/` | TODO | `pnpm install` y `pnpm typecheck` corren en vacío sin errores |
| T-102 | `packages/config`: tsconfig base estricto, ESLint, Prettier | TODO | Todas las apps extienden la misma config; lint pasa |
| T-103 | Scripts raíz: `dev`, `build`, `lint`, `typecheck`, `test` | TODO | Cada script funciona desde la raíz vía Turborepo |
| T-104 | `.gitignore`, `.env.example` (sin valores), git-secrets o equivalente | TODO | Ningún `.env` versionado; plantilla presente |
| T-105 | Inicializar Supabase local (`supabase init`) | TODO | `supabase start` levanta el entorno |
| T-106 | Migración: `malls`, `profiles`, `memberships`, `stores`, `categories` con `mall_id` y RLS | TODO | Reset limpio; usuario del mall B no ve tiendas del mall A |
| T-107 | Migración: `offers`, `coupons`, `coupon_redemptions` con RLS | TODO | Políticas acotadas por mall y rol |
| T-108 | RPC transaccional `activate_coupon` (user desde `auth.uid()`, stock con `FOR UPDATE`) | TODO | Prueba con 50 peticiones concurrentes sobre stock de 10: exactamente 10 exitosas |
| T-109 | RPC `redeem_coupon` (valida tenant, marca usado de forma atómica) | TODO | Segundo canje del mismo cupón falla |
| T-110 | `seed.sql` con Los Nuevos Teques y locales de T-003 | TODO | Directorio consultable tras `db reset` |
| T-111 | Generar `packages/types` desde Supabase | TODO | Tipos importables en móvil y web |
| T-112 | `packages/validators`: Zod para oferta, canje, filtros de directorio | TODO | Tests unitarios pasan |
| T-113 | `packages/design-tokens`: colores y tipografía base | TODO | Consumido por móvil y web |
| T-114 | Scaffold `apps/mobile` (Expo Router, tabs vacías, TanStack Query persistido) | TODO | APK de desarrollo instala en un Android real |

## Sprint 2 — Núcleo shopper (resumen; detallar al iniciar)
Selección de mall por deep link/manual · Home · directorio + ficha · mapa SVG por piso · modo avión funcional.

## Sprint 3 — Ofertas, cupones, tenants (resumen)
Ofertas · cupón QR · portal tenant · validación de canje · decisión R-05 · sellos (si se valida).

## Sprint 4 — Concierge, dashboard, landing (resumen)
Edge Function `concierge` · dashboard funnel · landing con privacidad y términos.

## Bloqueos y notas
<!-- Anotar aquí lo que frene una tarea: fecha | tarea | motivo | quién desbloquea -->
