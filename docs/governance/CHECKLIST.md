# CHECKLIST — Verificaciones

## A. Antes de cada commit / cierre de tarea
- [ ] `pnpm typecheck` OK
- [ ] `pnpm lint` OK
- [ ] `pnpm test` OK (obligatorio en RPCs y validadores)
- [ ] Sin secretos en el diff (`git diff --staged` revisado)
- [ ] Sin `any`, sin `@ts-ignore`
- [ ] Criterios de aceptación de la tarea verificados
- [ ] `TASKS.md` actualizado; `MEMORY.md` si hubo decisión

## B. Cambios de base de datos
- [ ] Migración creada con `supabase migration new` (timestamp)
- [ ] `mall_id` y RLS en toda tabla nueva
- [ ] `supabase db reset` aplica limpio
- [ ] Probado como `anon`, `authenticated` (mall A), `authenticated` (mall B): mall B no ve datos de A
- [ ] Tipos regenerados en `packages/types`
- [ ] Índices en columnas de filtro/unión

## C. Seguridad
- [ ] `user_id` obtenido de la sesión, no del body
- [ ] Service role y clave de IA solo en servidor
- [ ] Canje/sellos vía RPC transaccional (prueba con peticiones concurrentes)
- [ ] Rate limit en Concierge y endpoints públicos
- [ ] Contexto de la IA armado en servidor
- [ ] Dependencias sin vulnerabilidades críticas (`pnpm audit`)

## D. Antes de entregar un APK
- [ ] Versión y `versionCode` incrementados
- [ ] Variables de entorno de producción configuradas en EAS (no en el repo)
- [ ] Probado en 3 Android reales (al menos 1 de gama baja)
- [ ] App abre y muestra directorio/mapa sin red
- [ ] Flujo: registro → activar cupón → mostrar QR funciona
- [ ] Tamaño del APK razonable; sin logs sensibles
- [ ] Aviso de privacidad accesible desde la app

## E. Antes de lanzar el piloto
- [ ] Datos reales de los ~30 locales cargados y revisados por el mall
- [ ] Al menos 8 locales capacitados y con acceso al portal
- [ ] Acuerdo de piloto de 1 página firmado (alcance, 90 días, métricas, responsabilidades, renovación)
- [ ] Aviso de privacidad y términos publicados en la landing
- [ ] Materiales: QR de descarga en accesos, cajas y locales aliados
- [ ] Canal de soporte y persona responsable definidos
- [ ] Métricas base medibles desde el día 1 (eventos de analítica funcionando)

## F. Legal y datos (verificar con abogado local)
- [ ] Aviso de privacidad y consentimiento de datos y ubicación
- [ ] Contrato deja claro: el mall es dueño de los datos, Mall OS es procesador
- [ ] Responsabilidad del mall/locales sobre la veracidad de las ofertas
