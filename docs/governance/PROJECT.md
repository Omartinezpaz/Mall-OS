# PROJECT — Mall OS

> Fuente de verdad del alcance. Si algo no está aquí, no se construye.
> Última actualización: 2026-09-29

## 1. Qué es
Plataforma digital multi-mall tipo "Sistema Operativo de Centros Comerciales" estructurada en **3 capas clave**:
1. **Capa 1 — App Móvil del Visitante (`apps/mobile`):** Experiencia inmersiva en Expo/React Native con mapa 2.5D, navegación Turn-by-Turn, Concierge IA, Modo Niño y vitrina de ofertas offline-first.
2. **Capa 2 — Portal Web del Gerente de Tienda (`apps/admin` con rol `tenant`):** Perfil de tienda, vitrina digital de productos/novedades (sin precios absolutos), gestión de ofertas locales y validación atómica de canjes QR.
3. **Capa 3 — Back-office Web de la Administración del Mall (`apps/admin` con rol `mall_admin`):** Directorio comercial, moderación/aprobación de ofertas, gestión de categorías y dashboard ejecutivo del funnel (visitas, búsquedas, canjes y ROI).

## 2. Prototipo Insignia y Piloto Comercial
- **Prototipo Activo:** Sambil Chacao (Caracas, Venezuela) — Plano esquemático ilustrativo 2.5D (4 niveles, plazas icónicas, tiendas ancla) como prototipo avanzado de venta y demostración comercial de alta fidelidad.
- **Pipeline Comercial Principal:** Grupo La Cascada (Maturín / Hoteles y Malls) — Propuesta de plataforma integral (App Visitante + Dashboard Tienda + Dashboard Mall) orientada a pitch ejecutivo.
- **Mall Piloto Original (Congelado):** Centro Comercial Los Nuevos Teques — En pausa ante falta de planos e insumos de la junta.
- **Precio / Modelo Comercial:** Venta B2B de suscripción a centros comerciales y complejos mixtos (hoteles/malls).

### Métricas de Éxito del Prototipo Comercial
| Métrica | Meta inicial |
|---|---|
| Demostración fluida en Android | 60 FPS en pan/zoom y simulación de ruta |
| Vitrina Offline | 100% operable sin conexión a internet |
| Fidelidad de Marca | Cumplimiento 80/15/5 y 0 precios en USD |
| Validación de Canje | Flujo atómico demostrable (`activate_coupon` / `redeem_coupon`) |
| Suite de Dashboards | Portal Tenant y Portal Mall navegables en alta fidelidad |
Funnel a medir: visita → registro → cupón activado → cupón canjeado. No prometer atribución de ventas (sin integración POS no se puede medir).

## 3. Alcance de la Plataforma
**1. App Visitante (Expo, Android-first):** Selección de mall, directorio, mapa 2.5D Skia por piso, búsqueda, vitrinas de tiendas, ofertas, cupón QR, tarjeta de fidelidad, Concierge IA, Modo Niño gamificado y acceso anónimo.
**2. Web Gerente de Tienda (`apps/admin` - Tenant):** Login, perfil del local, vitrina digital de novedades/productos destacados (fotos, descripciones y beneficios; sin gestión de stock SKU ni pasarela de pago), creación de ofertas (pendientes de aprobación), escáner/código de validación y métricas de su tienda.
**3. Web Back-office Mall (`apps/admin` - Mall Admin):** Gestión de locales, moderación de promociones, categorías, accesibilidad, configuración del mall y dashboard ejecutivo de métricas globales.
**4. Landing Page (`apps/landing`):** Pitch B2B, descarga de APK, términos y privacidad.

## 4. Fuera de alcance (Future Mall OS)
E-commerce transaccional completo (carritos de compra, inventario SKU con tallas/colores, pagos en app), Live Shopping, red social abierta, realidad aumentada (AR), beacons físicos, delivery, integración directa con POS/ERP, versión iOS (hasta resolver cuenta Apple desde Venezuela), geolocalización invasiva en segundo plano, y precios de productos en pantalla (se muestran beneficios y descuentos porcentuales).

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
