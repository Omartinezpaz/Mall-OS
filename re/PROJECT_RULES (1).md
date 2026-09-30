# PROJECT RULES — Mall OS

## 1. Propósito
Reglas maestras de producto, arquitectura, seguridad, calidad y ejecución para Mall OS.

## 2. Principios no negociables
- Construir primero el producto mínimo que pueda probarse y venderse.
- Priorizar impacto comercial sobre cantidad de funcionalidades.
- No introducir complejidad técnica antes de que exista una necesidad demostrada.
- Toda funcionalidad debe tener usuario, problema y KPI.
- La arquitectura debe ser multi-tenant desde el inicio.
- La seguridad y el aislamiento entre malls son requisitos desde el primer día.
- No presentar cifras de mercado, adopción o ROI como hechos sin verificación.
- La IA nunca debe inventar disponibilidad, precios, promociones, horarios o reservas.
- El servidor es la autoridad para identidad, permisos y operaciones sensibles.

## 3. Alcance del MVP
Home, directorio, mapa 2D básico, ofertas/cupones, activación/canje QR o código, AI Concierge con datos reales, portal tenant básico, dashboard mall básico, analytics y notificaciones básicas.

Fuera del MVP: live shopping, red social, AR, find friends, delivery, valet, checkout universal, beacons, POS/CRM avanzado, analítica predictiva e integraciones complejas.

## 4. Prioridad
1. Validación comercial
2. Adopción
3. Conversión
4. Valor para tenants
5. Monetización
6. Retención
7. Escalabilidad

Pregunta central: **¿Puede un mall generar ingresos adicionales y medibles gracias a Mall OS?**

## 5. Arquitectura
- Next.js + React + TypeScript + PWA.
- Route Handlers para el MVP.
- Supabase + PostgreSQL + Auth.
- RLS obligatorio.
- Multi-tenancy mediante `mall_id`.
- Zod para validación.
- Secretos exclusivamente server-side.
- Identidad derivada de la sesión; nunca confiar en `usuarioId` del cliente.
- Operaciones de cupones atómicas e idempotentes.
- Redis, AWS, microservicios, colas, Pinecone y similares solo cuando una necesidad real lo justifique.

## 6. Modelo de datos base
`malls`, `users`, `memberships`, `stores`, `store_users`, `categories`, `offers`, `coupons`, `coupon_redemptions`, `points_ledger`, `analytics_events`.

## 7. Seguridad
Roles mínimos: `shopper`, `tenant`, `mall_admin`, `platform_admin`.
RLS debe impedir acceso cruzado entre tenants y malls. Las operaciones sensibles deben autorizarse en servidor. Aplicar rate limiting en endpoints sensibles y registrar eventos necesarios para auditoría y anti-fraude.

## 8. IA
El Concierge debe consultar datos reales y herramientas controladas: `searchStores()`, `searchOffers()`, `getDirections()`, `getEvents()`, `createReservation()`, `activateCoupon()`, `buildItinerary()`. Si un dato no está disponible, debe declararse.

## 9. Mapas
MVP: SVG/2D o Mapbox y navegación simple. Beacons/BLE y posicionamiento preciso son posteriores.

## 10. Analytics
Eventos mínimos: `app_open`, `directory_view`, `store_view`, `offer_view`, `coupon_activate`, `coupon_redeem`, `ai_query`, `tenant_login`, `offer_created`, `dashboard_view`.

## 11. Calidad
TypeScript sin errores, lint limpio, tests relevantes, RLS verificado, estados loading/empty/error, mobile-first, accesibilidad razonable, logs sin secretos y cero TODOs críticos.

## 12. Git
Commits pequeños y descriptivos. No mezclar refactors grandes con features. No cambiar arquitectura sin justificar impacto. Actualizar documentación cuando cambie el comportamiento.

## 13. Definition of Done del MVP
Mall piloto configurado; descubrimiento de stores/ofertas; activación y canje; Concierge con datos reales; tenant capaz de crear ofertas y consultar resultados; admin con KPIs; aislamiento RLS; despliegue reproducible; analytics principales; piloto de 90 días ejecutable.

## 14. Regla de oro
**No construyas Mall OS para demostrar que puedes construir Mall OS. Constrúyelo para responder: ¿Puede un mall ganar dinero adicional gracias a Mall OS?**
