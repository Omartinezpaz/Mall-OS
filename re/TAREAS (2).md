# TAREAS.md — Mall OS

## Objetivo
Ejecutar Mall OS desde validación comercial hasta piloto pagado, evitando construir funcionalidades prematuras.

# FASE 0 — VALIDACIÓN COMERCIAL

## Demo y oferta
- [ ] Definir mall ficticio de referencia.
- [ ] Crear 10–15 tenants demo.
- [ ] Preparar branding básico.
- [ ] Preparar landing/demo navegable.
- [ ] Preparar dashboard comercial.
- [ ] Definir piloto de 90 días.
- [ ] Definir alcance, entregables y exclusiones.
- [ ] Preparar pricing y condiciones.

## Validación
- [ ] Entrevistar responsables de malls.
- [ ] Validar problema prioritario.
- [ ] Validar disposición de pago.
- [ ] Identificar decisor/sponsor.
- [ ] Registrar objeciones.
- [ ] Convertir feedback en cambios priorizados.

**GATE:** no avanzar a construcción extensa sin evidencia de interés comercial real.

# FASE 1 — MVP PILOTO (4–6 SEMANAS)

## Semana 1 — Foundation
- [ ] Next.js + TypeScript
- [ ] Tailwind
- [ ] Supabase
- [ ] Migraciones PostgreSQL
- [ ] Crear `malls`
- [ ] Crear `users`
- [ ] Crear `memberships`
- [ ] Crear `stores`
- [ ] Crear `store_users`
- [ ] Crear `categories`
- [ ] Crear `offers`
- [ ] Crear `coupons`
- [ ] Crear `coupon_redemptions`
- [ ] Crear `analytics_events`
- [ ] Auth
- [ ] RLS
- [ ] Seed del mall demo
- [ ] CI/checks básicos

## Semana 2 — Shopper
- [ ] Home
- [ ] Directory
- [ ] Store detail
- [ ] Categorías
- [ ] Búsqueda
- [ ] Mapa SVG/2D
- [ ] Ubicación del tenant
- [ ] Responsive mobile-first
- [ ] Loading/empty/error states

## Semana 3 — Offers + Coupons + AI
- [ ] Lista y detalle de ofertas
- [ ] Activación de cupón
- [ ] QR/código
- [ ] Validación de canje
- [ ] Redención atómica
- [ ] Protección contra doble canje
- [ ] `/api/coupons/activate`
- [ ] `/api/coupons/redeem`
- [ ] `/api/concierge`
- [ ] Grounding con datos reales
- [ ] Analytics
- [ ] Rate limiting básico

## Semana 4 — Tenant Portal
- [ ] Login tenant
- [ ] Perfil tenant
- [ ] Crear oferta
- [ ] Editar/desactivar oferta
- [ ] Ver activaciones
- [ ] Ver canjes
- [ ] KPIs básicos
- [ ] Permisos tenant
- [ ] Tests de aislamiento

## Semana 5 — Mall Dashboard
- [ ] Dashboard admin
- [ ] Usuarios activos
- [ ] Store views
- [ ] Offer views
- [ ] Activaciones
- [ ] Canjes
- [ ] Tenants activos
- [ ] Conversión básica
- [ ] Filtros por periodo
- [ ] Exportación básica si es necesaria

## Semana 6 — Hardening + Pilot
- [ ] QA end-to-end
- [ ] Tests RLS
- [ ] Tests de autorización
- [ ] Tests de concurrencia de cupones
- [ ] Typecheck
- [ ] Lint
- [ ] Smoke tests
- [ ] Performance básica
- [ ] Accesibilidad básica
- [ ] Logs y monitoring
- [ ] Deploy reproducible
- [ ] Dominio del piloto
- [ ] Onboarding de tenants
- [ ] Capacitación del mall
- [ ] Go-live

**GATE:** piloto ejecutable y medible.

# FASE 2 — MONETIZACIÓN
- [ ] Medir resultados del piloto.
- [ ] Construir caso de éxito.
- [ ] Definir plan anual.
- [ ] Implementar pricing por tier.
- [ ] Sponsored placement.
- [ ] Sponsored search.
- [ ] Sponsored offers.
- [ ] Campañas patrocinadas.
- [ ] Medir retail media revenue.
- [ ] Definir revenue share.

**GATE:** demostrar willingness-to-pay y ROI basado en datos reales.

# FASE 3 — INTELLIGENCE
- [ ] Personalización básica.
- [ ] Recommendations.
- [ ] Segmentación.
- [ ] Campañas automatizadas.
- [ ] Concierge con tools.
- [ ] `searchStores()`
- [ ] `searchOffers()`
- [ ] `getDirections()`
- [ ] `getEvents()`
- [ ] `buildItinerary()`
- [ ] RAG solo si el volumen/calidad lo exige.
- [ ] Analytics avanzadas.
- [ ] Predicción cuando existan datos suficientes.

# FASE 4 — PHYSICAL LAYER
- [ ] Evaluar indoor positioning.
- [ ] Evaluar BLE/beacons.
- [ ] Indoor navigation avanzada.
- [ ] Parking.
- [ ] EV charging.
- [ ] Valet.
- [ ] Integraciones operativas.

**REGLA:** cada integración debe tener caso de negocio y sponsor.

# FASE 5 — ECOSYSTEM
- [ ] Reservations.
- [ ] Payments.
- [ ] Live Shopping.
- [ ] Community/social.
- [ ] AR.
- [ ] Kids mode avanzado.
- [ ] Delivery.
- [ ] POS/CRM integrations.
- [ ] Partner ecosystem.

# BACKLOG — NO PRIORITARIO
- [ ] Red social
- [ ] Find friends
- [ ] Live Shopping
- [ ] AR
- [ ] Delivery
- [ ] Checkout universal
- [ ] Beacons
- [ ] POS/CRM avanzado
- [ ] Predictive analytics
- [ ] ESG avanzado
- [ ] Microservicios
- [ ] Kubernetes
- [ ] Infraestructura cloud compleja

# KPIs

## Adquisición
- usuarios nuevos
- usuarios activados

## Engagement
- WAU
- sesiones
- búsquedas
- store views
- AI queries

## Conversión
- offer views
- coupon activations
- coupon redemptions
- activation → redemption

## Tenant
- tenants activos
- ofertas creadas
- tenant retention
- resultados por tenant

## Negocio
- ingresos del piloto
- SaaS MRR/ARR
- retail media revenue
- revenue por mall
- CAC
- retención

## KPI NORTE
**Ingresos incrementales y medibles generados para el mall mediante Mall OS.**

# RELEASE CHECKLIST
- [ ] Typecheck OK
- [ ] Lint OK
- [ ] Tests OK
- [ ] RLS verificado
- [ ] Authorization verificada
- [ ] No secrets en cliente
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Mobile UX
- [ ] Accessibility básica
- [ ] Analytics
- [ ] Monitoring
- [ ] Documentation
- [ ] Rollback plan

# REGLA DE EJECUCIÓN
Cada tarea debe responder:
1. ¿Qué problema resuelve?
2. ¿Para quién?
3. ¿Cómo se mide?
4. ¿Es necesaria para el piloto?
5. ¿Cuál es la implementación más simple que funciona?

Si una tarea no ayuda al piloto, monetización o aprendizaje, debe pasar al backlog.
