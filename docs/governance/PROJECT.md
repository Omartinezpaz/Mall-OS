# PROJECT — Mall OS

> Fuente de verdad del alcance. Si algo no está aquí, no se construye.
> Última actualización: 2026-09-29

## 1. Qué es
Plataforma digital multi-mall que conecta **shoppers**, **tenants (locales)** y **administración del mall**.
Una sola app móvil para todos los malls. Cada mall es una instancia: "Mall OS Los Nuevos Teques", "Mall OS El Recreo", etc.

## 2. Prototipo Insignia y Piloto Comercial
- **Prototipo Activo:** Sambil Chacao (Caracas, Venezuela) — Plano esquemático ilustrativo 2.5D (4 niveles, plazas icónicas, tiendas ancla) como prototipo avanzado de venta y demostración comercial de alta fidelidad.
- **Mall Piloto Original (Congelado):** Centro Comercial Los Nuevos Teques — En pausa ante falta de planos e insumos de la junta.
- **Pipeline / Oportunidad Abierta:** Grupo La Cascada (Hotel, Maturín) — Oportunidad abierta; sin desarrollo específico hasta recibir requisitos formales y planos arquitectónicos.
- **Precio / Modelo Comercial:** Prototipo demostrativo orientado a venta B2B para juntas directivas y administraciones de centros comerciales.

### Métricas de Éxito del Prototipo Comercial
| Métrica | Meta inicial |
|---|---|
| Demostración fluida en Android | 60 FPS en pan/zoom y simulación de ruta |
| Vitrina Offline | 100% operable sin conexión a internet |
| Fidelidad de Marca | Cumplimiento 80/15/5 y 0 precios en USD |
| Validación de Canje | Flujo atómico demostrable (`activate_coupon` / `redeem_coupon`) |
Funnel a medir: visita → registro → cupón activado → cupón canjeado. No prometer atribución de ventas (sin integración POS no se puede medir).

## 3. Alcance del piloto (CONGELADO)
**Shopper (app Expo, Android-first):** selección de mall, directorio, mapa SVG por piso, ofertas, cupón QR, tarjeta de sellos (hipótesis a validar), Concierge IA, acceso anónimo (registro solo al activar cupón).
**Tenant (Admin web):** login, perfil del local, crear oferta, validar canje (cámara o código), ver redenciones.
**Mall (Admin web):** gestión de locales, dashboard del funnel.
**Landing:** venta B2B, aviso de privacidad, términos.

## 4. Fuera de alcance (Future Mall OS)
Modo Niño, Live Shopping, red social, AR, "encuentra a tus amigos", beacons, pagos en app, reservas, delivery, valet, EV, integración POS/CRM, iOS, geolocalización en segundo plano, precios de productos en pantalla.

## 5. Restricciones del contexto (Venezuela)
- Conectividad intermitente → **offline-first**.
- Predomina Android de gama media/baja → rendimiento y tamaño de APK importan.
- Cadenas (McDonald's, supermercado) probablemente NO pueden publicar ofertas: entran como fichas del directorio.
- Sin pagos en la app. Sin Stripe/Mercado Pago.
- Moneda: no mostrar precios; solo porcentajes/beneficios. Guardar `currency` por mall.

## 6. Stack
| Capa | Tecnología |
|---|---|
| Monorepo | pnpm + Turborepo |
| Móvil | Expo (Router) + React Native + TypeScript estricto |
| Landing / Admin | Next.js (App Router) + TypeScript |
| Datos | Supabase (Postgres + RLS + Auth + Storage) |
| Validación | Zod compartido (`packages/validators`) |
| Tipos DB | Generados de Supabase (`packages/types`) |
| Caché offline | TanStack Query persistido |
| IA | Edge Function `concierge` + tool calling; proveedor detrás de una interfaz propia |
| Builds | EAS Build (APK directo para el piloto) |

## 7. Modelo de datos base (multi-mall desde el día 1)
Toda tabla de negocio lleva `mall_id`. Tablas iniciales:
`malls` (slug, nombre, branding jsonb, currency, locale) · `profiles` · `memberships` (user, mall, rol) · `stores` · `store_users` · `categories` · `offers` · `coupons` · `coupon_redemptions` · `stamp_cards` · `events` · `analytics_events` · `points_ledger` (fase posterior).
Roles por mall: `shopper`, `tenant`, `mall_admin`, `platform_admin`.

## 8. Multi-mall en una sola app
- Bundle ID: `com.mallos.app`.
- El mall se resuelve por: (1) deep link/QR del mall (`https://mallos.app/m/{slug}`), (2) selección manual.
- Branding (nombre, colores, logo) viene de la tabla `malls` y se cachea offline.

## 9. Pendientes por verificar (no asumir)
- Cuenta de Apple Developer desde Venezuela (iOS fuera del piloto hasta resolverlo).
- Disponibilidad del proveedor de IA según país de la cuenta/facturación.
- Requisitos vigentes de Google Play para cuentas personales (el piloto usa APK directo).
- Marco legal local de datos personales (consultar abogado). Mantener aviso de privacidad y consentimiento igualmente.
- Número real de locales activos y cuáles aceptan publicar ofertas.
