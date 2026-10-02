# AGENTS

Este repositorio se gobierna con los archivos de `docs/governance/`.
Al iniciar CUALQUIER sesión, lee en este orden:

1. `docs/governance/PROJECT.md` — alcance y decisiones de producto
2. `docs/governance/RULES.md` — reglas obligatorias de código y seguridad
3. `docs/governance/DESIGN.md` — sistema de diseño, tokens y reglas UX
4. `docs/governance/MEMORY.md` — decisiones y contexto acumulado
5. `docs/governance/TASKS.md` — tarea activa y criterios de aceptación

Reglas mínimas (detalle en RULES.md):
- Una tarea a la vez; no construyas nada fuera del alcance de PROJECT.md.
- Sin secretos en el código. El `user_id` sale de la sesión, nunca del body.
- RLS y `mall_id` en toda tabla. Migraciones solo con `supabase migration new`.
- Antes de cerrar una tarea: `pnpm typecheck`, `pnpm lint`, `pnpm test`.
- Si falta información o hay conflicto entre reglas, pregunta antes de actuar.
