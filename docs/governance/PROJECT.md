# PROJECT — Mall OS

> Fuente de verdad del alcance. Si algo no está aquí, no se construye.
> Última actualización: 2026-09-29

## 1. Qué es
Suite empresarial de centros comerciales tipo "Sistema Operativo de Centros Comerciales" estructurada en una arquitectura de **Doble Repositorio B2B** conectada a un núcleo compartido en Supabase Cloud:
1. **Repo 1 (`mall-os` · Mobile):** App de visitantes en Expo/React Native con motor isométrico 2.5D en GPU Skia, navegación Turn-by-Turn, Concierge IA, Modo Niño, fidelización y **onboarding ultra-rápido con Google OAuth 1-tap** para adquisición masiva de shoppers (visión de superar la base de usuarios de apps líderes como Ridery y Yummy).
2. **Repo 2 (`mall-os-portals` · Web Desktop B2B):** Plataforma web corporativa en Next.js 14 App Router orientada al trabajo de oficina de retail con ratón, teclado y pantallas de 24":
   - **Store OS (`/store`):** CRUD de catálogo de alta conversión (`price_min`, `price_max`, `sizes_json`, `colors_json`), ofertas y validador rápido de canjes QR.
   - **Mall Executive OS (`/admin`):** Gestión multi-tienda, auditoría, agenda de eventos, concursos y emisor de avisos del Concierge.
   - **Mall OS Platform Admin (`/root`):** Panel interno para creación de malls, administración de suscripciones, métricas y soporte.
   - **Seguridad B2B estricta:** Email corporativo, contraseña compleja, 2FA/Magic Link e invitaciones firmadas, con **Pitch Mode Switcher blindado por `NEXT_PUBLIC_DEMO_MODE=true`**.
3. **Backend Cloud (`bgncghyhyosugfnraoqm.supabase.co`):** Esquema aditivo y no destructivo con Postgres RLS multi-tenant por `mall_id` y `store_id`, storage de fotos de catálogo y generador de tipos compartido.

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
**1. App Visitante (Expo, Android-first):**
- Selección de mall, directorio de tiendas, mapa 2.5D Skia por piso con navegación Turn-by-Turn.
- **Catálogo y Fichas de Productos de Alta Conversión (>75% decisión de compra):** Fotos, nombre, descripción, rangos de precio referenciales (`price_min`, `price_max`), tallas (`sizes_json`) y colores (`colors_json`) para consulta y búsqueda semántica.
- **Concierge IA & Centro de Notificaciones:** Asistente conversacional con búsqueda de tiendas y productos por talla/color/presupuesto, emisor de alertas proactivas, eventos del día y promociones relámpago.
- **Eventos y Concursos del Mall:** Agenda de conciertos, firmas, desfiles y dinámicas comerciales en plazas.
- Modo Niño (Exploradores del Mall), vitrina de ofertas, cupón QR y acceso anónimo.

**2. Web Gerente de Tienda (Portal de Escritorio Locatario):**
- Acceso de escritorio para equipos de retail y mercadeo de tienda.
- Perfil de local, horarios y banners oficiales.
- **CRUD de Catálogo de Productos:** Carga de artículos con rangos de precio (`price_min`, `price_max`), tallas, colores, fotos y tags para visibilidad en el buscador del Concierge.
- Creación de ofertas y promociones flash (sujetas a aprobación del mall).
- Escáner y formulario de validación atómica de canje de cupones.
- Dashboard de tienda: visitas, productos más consultados y cupones canjeados.

**3. Web Back-office Mall (Panel Ejecutivo de Consorcio):**
- Gestión centralizada multi-tienda y multi-mall para consorcios comerciales (Sambil, La Cascada, etc.).
- Directorio de locales, categorías y asignación de niveles/zonas.
- Moderación y aprobación de campañas y ofertas locales.
- **Gestor de Eventos y Concursos:** Programación de activaciones en plazas y dinámicas de fidelización.
- **Emisión de Avisos del Concierge:** Segmentación y programación de notificaciones proactivas para visitantes.
- Dashboard ejecutivo de ROI: flujos peatonales, funnel de conversión, tiendas más consultadas y canjes.

**4. Landing Page (`apps/landing`):** Pitch B2B para consorcios, descarga de APK, términos y privacidad.

## 4. Fuera de alcance (Future Mall OS)
Pasarelas de pago y carritos de compra e-commerce directo en app (el pago se hace físicamente en el local comercial), Live Shopping, red social abierta, realidad aumentada (AR), beacons físicos, delivery, integración directa con POS/ERP, y geolocalización invasiva en segundo plano.

## 5. Restricciones del contexto (Venezuela)
- Conectividad intermitente → **offline-first** para la navegación y mapas del visitante.
- Predomina Android de gama media/baja → rendimiento y tamaño de APK importan.
- Precios de productos gestionados mediante **rangos referenciales (`price_min`, `price_max`)** para no desfasar precios ante ajustes cambiarios y no requerir integración compleja a POS.
- Sin pagos directos en la app. Sin Stripe/Mercado Pago en el piloto. Moneda guardada por mall (`USD` / `VES`).

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
