# ROADMAP — Piloto Mall OS

> Tiempo completo. Estimaciones en semanas desde el inicio (S1 = primera semana de trabajo).
> Cada fase termina en una **puerta (gate)**: si no se cumple, se para y se ajusta antes de seguir.

## Fase 0 — Validación comercial (S1–S2, en paralelo a Fase 1)
- Conseguir reunión con la junta de propietarios.
- Carta de intención de 1 página (alcance, 90 días, métricas, qué necesita de la junta).
- Levantar datos reales: lista de los ~30 locales, horarios, pisos, planos, quién puede publicar ofertas.
- Demo clicable con datos reales del mall.
**Gate 0 (fin S2):** reunión hecha y respuesta de la junta (sí / condiciones / no). Si "no" o silencio total en S3, replantear enfoque antes de invertir más.

## Fase 1 — Cimientos (S1–S2)
- Repo, monorepo, CI local (typecheck, lint, test).
- Supabase: esquema multi-mall, RLS, RPC de canje, seed del piloto.
- Paquetes `types`, `validators`, `design-tokens`.
- Cuentas: Expo/EAS, Supabase, dominio, proveedor de IA (verificar disponibilidad).
**Gate 1:** `supabase db reset` limpio; RLS probada con roles distintos y con dos malls de prueba.

## Fase 2 — Núcleo shopper offline-first (S3–S4)
- Selección de mall (deep link/QR + manual) y branding remoto cacheado.
- Home, directorio con búsqueda/filtros, ficha de local.
- Mapa SVG por piso.
- Caché persistida; app usable sin red.
**Gate 2:** APK instalado en 3 teléfonos Android reales; directorio y mapa funcionan en modo avión.

## Fase 3 — Ofertas, cupones y tenants (S4–S5)
- Ofertas y cupón QR (registro solo al activar).
- Admin: login, portal tenant (perfil, crear oferta, validar canje).
- Modelo de validación offline decidido (R-05) e implementado.
- Tarjeta de sellos si la junta/locales la validan (D-013).
**Gate 3:** flujo completo probado con 3 locales reales: crear oferta → activar → canjear → ver en dashboard. Sin doble canje ni carrera en pruebas de concurrencia.

## Fase 4 — Concierge y Dashboards (`apps/admin`) (S5–S6)
- Edge Function `concierge` con tool calling y contexto armado en servidor.
- Portal Gerente de Tienda (`apps/admin/app/(tenant)`): perfil, vitrina digital, creación de ofertas y canje de cupones.
- Portal Back-office Mall (`apps/admin/app/(mall)`): directorio, aprobación de ofertas y dashboard ejecutivo del funnel.
- Landing page oficial (`apps/landing`) con aviso de privacidad y términos.
**Gate 4:** Concierge responde solo con datos reales del mall; dashboards de tienda y de mall 100% navegables.

## Fase 5 — Pitch Comercial y Validación de Plataforma (S6–S7)
- Pitch ejecutivo para juntas directivas y cadenas (Grupo La Cascada / Sambil):
  - Demostración de App Móvil nativa en Android (Mapa 2.5D, vitrinas, canje, modo niño y concierge).
  - Demostración en vivo de Web Gerente de Tienda (portal locatario).
  - Demostración en vivo de Web Administración del Mall (panel ejecutivo de ROI y flujos).
- Carta de intención / acuerdo de piloto comercial con los 5-10 primeros comercios.
- Capacitación de 10 min a cada local aliado.
**Gate 5:** Demostración integral de 3 capas aprobada por junta directiva; firma de acuerdo piloto.

## Fase 6 — Despliegue Piloto y Operación (S7–S8)
- Activación con QR en accesos, mesas y cajas de locales aliados; incentivo de bienvenida.
- Canal de soporte y telemetría en producción.
- Revisión de métricas de funnel a 30, 60 y 90 días vs PROJECT.md §2.

## Después del piloto (no comprometido)
Si las métricas se cumplen: propuesta de contrato anual, segundo mall/hotel de la cadena, iOS (al habilitar cuenta Apple), Google Play Store, notificaciones push automáticas, ledger de puntos extendido y publicidad programática para tenants.
Mucho más adelante: beacons BLE, integración directa con POS/ERP, reservas de restaurantes, live shopping.
