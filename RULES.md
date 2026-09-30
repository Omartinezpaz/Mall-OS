# RULES — Reglas de desarrollo (obligatorias)

> Para humanos y agentes (Antigravity con Sonnet o Gemini). Leer ANTES de escribir código.
> Orden de lectura: `PROJECT.md` → `RULES.md` → `MEMORY.md` → `TASKS.md`.
> Si una regla choca con lo que te piden, DETENTE y pregunta.

## 1. Proceso
1. Trabaja UNA tarea de `TASKS.md` por vez. No abras tareas nuevas por iniciativa propia.
2. No agregues funciones fuera del alcance de `PROJECT.md` (sección 3). Lo demás es "Future Mall OS".
3. Cambios pequeños y verificables. Un commit por tarea, mensaje `tipo(scope): descripción` (feat, fix, chore, docs, refactor, test).
4. Si falta información (datos del mall, credenciales, decisiones), pregunta. No inventes datos, métricas ni precios.
5. Al terminar: actualiza `TASKS.md` (estado) y, si hubo decisión relevante, `MEMORY.md`.

## 2. TypeScript
- `strict: true`. Prohibido `any` (usa `unknown` + validación Zod).
- Prohibido `@ts-ignore`; si es inevitable, `@ts-expect-error` con comentario explicando por qué.
- Tipos de base de datos SOLO desde `packages/types` (generados). No escribir a mano tipos de tablas.
- Todo dato externo (requests, respuestas de IA, JSON de DB) se valida con Zod de `packages/validators`.
- JSDoc en funciones exportadas no triviales y en tipos exportados.

## 3. Seguridad (no negociable)
- **Cero secretos en el código.** Todo por variables de entorno. `.env*` en `.gitignore`. Mantener `.env.example` sin valores reales.
- `SUPABASE_SERVICE_ROLE_KEY` y la clave de IA: SOLO en servidor (Edge Functions / Route Handlers). NUNCA en `apps/mobile` ni con prefijo `NEXT_PUBLIC_`/`EXPO_PUBLIC_`.
- **El `user_id` sale de la sesión autenticada en el servidor. Jamás del body del request.**
- **El contexto de la IA lo arma el servidor** (nunca confiar en `contextoMall` enviado por el cliente).
- RLS habilitado y forzado en TODA tabla. Políticas siempre acotadas por `mall_id` y rol.
- Operaciones con stock/contadores (canjes, sellos, puntos) van en una **función RPC transaccional** con bloqueo (`SELECT ... FOR UPDATE`) para evitar condiciones de carrera.
- Puntos/sellos: modelo de **ledger** (append-only), nunca un campo contador editable.
- Rate limit en endpoints públicos y en el Concierge.

## 4. Base de datos
- Migraciones SOLO por `supabase migration new`. Nombres con timestamp. Nunca editar una migración ya aplicada: crear una nueva.
- Toda tabla de negocio: `mall_id uuid not null references malls(id)`, `created_at`, índices en llaves de búsqueda.
- Probar RLS con roles `anon` y `authenticated` de distintos malls antes de cerrar una tarea de DB.
- `seed.sql` sin datos personales reales de usuarios.

## 5. Móvil (Expo)
- **Offline-first:** lectura desde caché persistida (TanStack Query); la app debe abrir y mostrar directorio y mapa sin red.
- Mapas SVG empaquetados en la app, no descargados en runtime.
- Acceso anónimo: directorio y ofertas visibles sin login; pedir registro solo al activar cupón.
- Rendimiento: pensado para Android gama media/baja. Listas virtualizadas, imágenes optimizadas, sin librerías pesadas sin justificación.
- Sin precios de productos en pantalla (solo porcentajes/beneficios).
- Textos en español; strings centralizados (preparar i18n).
- Solo ubicación "mientras se usa la app". Prohibida la ubicación en segundo plano en el piloto.

## 6. Web (Next.js)
- App Router, Server Components por defecto; `"use client"` solo cuando sea necesario.
- Autorización verificada en servidor, no solo ocultando UI.
- Formularios validados con los mismos Zod que la app móvil.

## 7. IA (Concierge)
- Proveedor detrás de una interfaz propia (`AiProvider`) para poder cambiarlo.
- Tool calling con esquemas Zod: `searchStores`, `searchOffers`, `getStoreInfo`, `getEvents`. Sin herramientas que muten datos en el piloto.
- Respuestas ancladas a datos del mall. Si no hay dato: decir que no lo sabe. Límite de tokens que no corte respuestas útiles.

## 8. Calidad — Definition of Done
Una tarea está terminada solo si:
1. `pnpm typecheck` sin errores.
2. `pnpm lint` sin errores.
3. `pnpm test` pasa (si la tarea tiene lógica; obligatorio para RPCs y validadores).
4. Migraciones aplican limpias con `supabase db reset`.
5. Sin secretos en el diff.
6. Criterios de aceptación de la tarea cumplidos y verificados manualmente.
7. `TASKS.md` actualizado.

## 9. Instrucciones específicas para agentes
- Antes de codificar, di qué archivos vas a tocar y por qué. Espera confirmación si son más de 5.
- No hagas refactors masivos ni renombres no pedidos.
- No instales dependencias sin justificarlo (peso, mantenimiento, alternativa nativa).
- No borres archivos ni migraciones sin confirmación.
- Si dos modelos trabajan el mismo repo: `MEMORY.md` y `TASKS.md` son el único canal de continuidad. Léelos al iniciar cada sesión.
- Ante duda entre "rápido" y "seguro/correcto" en temas de datos, seguridad o canjes: elige lo seguro y avisa.
