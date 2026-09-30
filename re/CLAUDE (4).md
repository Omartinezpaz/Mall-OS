# CLAUDE.md — Mall OS

## Contexto del proyecto
Mall OS es una infraestructura digital para centros comerciales que conecta Shopper, Tenant y Mall Administration.

### Posicionamiento
> **Mall OS es la infraestructura digital que convierte un centro comercial en una plataforma medible, personalizada y monetizable.**

## Objetivo inmediato
Conseguir un piloto pagado de 90 días y producir evidencia de adopción, interacción con ofertas, activaciones/canjes, adopción por tenants, conversión atribuible, monetización y retención.

## Roadmap
### MVP
Home, Directory, Map, Offers, Coupons, AI Concierge, Tenant Portal básico, Mall Dashboard básico, Analytics y Notifications básicas.

### V1
Rewards/points, campañas avanzadas, portal tenant ampliado, retail media y automatizaciones.

### V2+
Beacons, reservas, pagos, parking/EV, live shopping, social, AR y agentes avanzados.

## Stack
Next.js, React, TypeScript, PWA, Tailwind CSS, Route Handlers, Supabase, PostgreSQL, Supabase Auth/Storage, OpenAI API, SVG/Mapbox y Vercel + Supabase para el piloto.

Evitar arquitectura distribuida prematura.

## Arquitectura multi-tenant
Toda funcionalidad de negocio debe diseñarse para múltiples malls. Usar `mall_id` y RLS para aislamiento.

Roles: `shopper`, `tenant`, `mall_admin`, `platform_admin`.

## Reglas de implementación
1. Inspeccionar el código existente antes de modificarlo.
2. Reutilizar componentes/utilidades cuando sea razonable.
3. No introducir dependencias nuevas sin necesidad.
4. Validar inputs con Zod.
5. Nunca confiar en IDs de usuario enviados desde el cliente.
6. Derivar identidad y permisos de la sesión.
7. Mantener secretos exclusivamente en servidor.
8. Las operaciones críticas deben ser atómicas.
9. La IA no debe inventar datos.
10. Toda feature debe tener loading/empty/error.
11. UX mobile-first.
12. Añadir analytics a cada flujo relevante.
13. Proteger endpoints sensibles.
14. Justificar infraestructura avanzada antes de incorporarla.

## AI Concierge
Debe funcionar sobre información real del mall. Nunca afirmar disponibilidad, precios, horarios, reservas o promociones no confirmados. Ante incertidumbre, declarar la limitación.

## Cupones
Flujo: autenticación → validación server-side → activación → QR/código → validación del tenant → redención atómica → analytics.
Nunca aceptar `usuarioId` como autoridad del cliente.

## Testing mínimo
Unit tests, integration/API tests, RLS, auth/authorization, concurrencia de cupones y smoke test del flujo principal.

## Criterio de priorización
Ante dos alternativas, elegir la que reduzca tiempo al piloto, produzca datos comerciales, reduzca complejidad y mantenga capacidad de evolución.

## No hacer todavía
No implementar por defecto microservicios, event bus, Kubernetes, Redis central, vector DB, beacons, pagos, delivery, red social, AR o POS/CRM avanzado. Solo incorporarlos con justificación de producto y datos.

## Definition of Done
Una tarea está completa cuando funciona en el flujo real, maneja errores, cumple permisos/RLS, tiene tests adecuados, registra analytics cuando corresponde, no expone secretos y documenta cambios relevantes.
