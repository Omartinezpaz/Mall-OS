# MEMORY — Decisiones y contexto persistente

> Memoria del proyecto entre sesiones y entre modelos. Solo se AÑADE; no se reescribe el historial.
> Formato: `ID | fecha | decisión | motivo | estado`.
> Actualizar cuando se tome una decisión que afecte arquitectura, alcance, negocio o legal.

## Contexto fijo
- Fundador/desarrollador: Oscar. Preferencia por TypeScript. Trabaja a tiempo completo en el proyecto.
- Entorno: Windows. Agente de desarrollo: Antigravity (modelos Sonnet y Gemini).
- Piloto: Centro Comercial Los Nuevos Teques, Los Teques (Venezuela). ~30 locales. Decide la junta de propietarios; el contacto de Oscar pertenece a la junta.

## Decisiones

| ID | Fecha | Decisión | Motivo | Estado |
|---|---|---|---|---|
| D-001 | 2026-09-29 | Monorepo pnpm + Turborepo | Compartir tipos y validadores entre móvil, admin y landing | Vigente |
| D-002 | 2026-09-29 | Expo + React Native + TS (no Flutter) | Un solo lenguaje; preferencia del fundador | Vigente |
| D-003 | 2026-09-29 | Android-first; iOS fuera del piloto | Predomina Android; cuenta Apple desde Venezuela incierta | Vigente |
| D-004 | 2026-09-29 | Distribución del piloto por APK directo (EAS Build) | Evita fricción de tiendas | Vigente |
| D-005 | 2026-09-29 | Una sola app multi-mall, bundle `com.mallos.app` | Escalar a otros malls sin builds nuevos | Vigente |
| D-006 | 2026-09-29 | Marca: "Mall OS" + nombre del mall (Mall OS Los Nuevos Teques) | Coherencia comercial | Vigente |
| D-007 | 2026-09-29 | Supabase (Postgres + RLS) con `mall_id` en todas las tablas | Multi-tenant desde el día 1 | Vigente |
| D-008 | 2026-09-29 | IA en Edge Function con tool calling; proveedor abstraído | Clave en servidor; disponibilidad por país no verificada | Vigente |
| D-009 | 2026-09-29 | Offline-first (TanStack Query persistido, mapa SVG empaquetado) | Conectividad intermitente | Vigente |
| D-010 | 2026-09-29 | Acceso anónimo; registro solo al activar cupón | Reducir fricción | Vigente |
| D-011 | 2026-09-29 | Sin pagos en app; sin precios en pantalla | Contexto económico y de pagos | Vigente |
| D-012 | 2026-09-29 | Piloto gratis/simbólico; NO usar pricing de USD 999–1,499/mes | No aplica al mercado local | Vigente |
| D-013 | 2026-09-29 | Hipótesis: tarjeta de sellos digital para comercios de compra diaria | Mix del mall (panadería, charcutería, gym) | A validar con la junta |
| D-014 | 2026-09-29 | Modo Niño, Live, social, AR, beacons, pagos, reservas fuera del piloto | Foco en validar ROI | Vigente |
| D-015 | 2026-09-29 | Una cuenta por usuario, membresías por mall (`memberships` con rol `shopper`/`tenant`/`mall_admin`); `platform_admins` aparte | Un usuario puede usar varios malls | Vigente |
| D-016 | 2026-09-29 | FKs compuestas `(id, mall_id)` entre tablas de negocio | Imposible mezclar datos de dos malls a nivel de base de datos | Vigente |
| D-017 | 2026-09-29 | Tenant no puede activar ofertas: crea `draft`/`pending`, aprueba `mall_admin`; editar una oferta activa la devuelve a `pending` | Control del mall sobre ofertas falsas | Vigente |
| D-018 | 2026-09-29 | Contadores, cupones, canjes y analítica solo se escriben por RPC (`activate_coupon`, `redeem_coupon`, `track_event`); cero escritura directa | Anti-fraude y sin condiciones de carrera | Vigente |
| D-019 | 2026-09-29 | Cupón activado se honra hasta `expires_at` aunque la oferta se pause | Simplicidad; revisar con la junta | A validar |
| D-020 | 2026-09-29 | Búsqueda/filtros del directorio en el cliente (~30 locales, offline-first); sin tsvector por ahora | Funciona sin red | Vigente |
| D-021 | 2026-09-29 | Sellos (`stamp_cards`) y `points_ledger` NO están en el esquema inicial | Se añaden si la junta/locales validan la hipótesis | Pendiente |
| D-022 | 2026-09-29 | Proyecto Supabase Cloud: `bgncghyhyosugfnraoqm.supabase.co` | Piloto en producción cloud; entorno local para dev con `supabase start` | Vigente |
| D-023 | 2026-09-29 | EAS Project: owner `osmalls-team`, slug `osmall`, Project ID `15776f99-b12a-45bb-85cd-5fca8a4a5c4a` | Distribución APK directa (D-004); buildType apk configurado | Vigente |
| D-024 | 2026-09-29 | GitHub repo: `https://github.com/osmallss202-ops/mall-os.git` | Control de versiones del monorepo | Vigente |
| D-025 | 2026-10-01 | Integración de manual de identidad visual y brand assets oficiales | Logos 3D ribbon, 10 categorías vectoriales, elementos isométricos 2.5D para mapas, carrusel de onboarding splash y app.json assets | Vigente |
| D-026 | 2026-10-02 | Alineación con Documento Maestro v2.0.0 y Motor Isométrico 2.5D de Tiempo y Espacio | Motor isométrico con pan/pinch, cálculo Dijkstra de rutas animadas, fijación de posición manual ("Estoy aquí") y atenuación de locales por hora; armonización del dataset de locales piloto | Vigente |
| D-027 | 2026-10-02 | Etiquetado estricto de Demostración (`isDemo`), exclusión de precios absolutos en USD (solo porcentajes/beneficios) y vitrina 100% offline | Cumplimiento estricto de RULES.md y DESIGN.md: evitar falsas expectativas de PDR/GPS hardware en presentaciones, proteger licenciamiento de marcas y asegurar funcionamiento en modo avión | Vigente |
| D-028 | 2026-10-02 | Adopción de Sambil Chacao (4 niveles oficiales) como mall insignia y expansión multi-venue para Hotel La Cascada (Maturín) | Planos oficiales de Sambil Chacao incorporados al motor (Autopista, Acuario, Libertador, Diversión/Terrazas con sus 5 plazas icónicas); validación de la arquitectura multi-tenant para hotelería y centros comerciales | Vigente |
| D-029 | 2026-10-02 | Map Engine v0.4.1 Authoring Foundation e Icon System v2 | Estandarización de 41 iconos oficiales en kebab-case con soporte Base/Badge/Sprite SVG, integración de expo-clipboard en Icon Lab, versionado de mapa (`schemaVersion: 1`), y validación exhaustiva de geometrías, caras perimetrales de puertas y enlaces verticales | Vigente |

## Riesgos abiertos
- R-01 Aprobación de la junta puede ser lenta (decisión colegiada).
- R-02 Cadenas (McDonald's, supermercado) probablemente no pueden publicar ofertas.
- R-03 Acceso a API de IA según país de cuenta/facturación: verificar.
- R-04 Sin integración POS no hay atribución de ventas: medir cupones, no dinero.
- R-05 Validación de canje sin señal: definir modelo (online con cola de reintento vs token firmado offline).

## Preguntas abiertas
- ¿Cuántos locales aceptarán publicar ofertas?
- ¿Qué gasta hoy el mall en promoción? (ancla de precio futuro)
- ¿Qué requiere la junta para firmar el piloto?
- Modelo de validación de cupón offline (ver R-05).

## Log de sesiones
<!-- Añadir al final: fecha | modelo usado | qué se hizo | qué queda pendiente -->
- 2026-09-29 | Gemini 3.7 Flash | Inicialización del monorepo Turborepo + pnpm, gobernanza y migraciones base Supabase | Configuración de packages y apps |
- 2026-10-01 | Gemini 3.7 Flash | Implementación de Sprint 2: Directorio offline, fichas de locales, mapas por pisos PB/P1, tokens de diseño y validadores | Sprint 3: Flujo de activación y canje de cupones |
- 2026-10-01 | Gemini 3.7 Flash | Implementación de Sprint 3: Ofertas, activación de cupones con código Crockford de 8 chars, visor de tickets con QR, portal de canje para tenants y cola de aprobación para Mall Admin | Sprint 4: Concierge IA y Landing |
- 2026-10-01 | Gemini 3.7 Flash | Implementación de Sprint 4: Concierge IA conversacional en Edge Function y App Móvil, Dashboard analítico de conversión para Mall Admin, y Landing Page oficial con descarga APK y enlaces legales | Plataforma lista para validación con la junta del mall |
- 2026-10-01 | Gemini 3.7 Flash | Integración del Brand Board oficial: Generación de App Icon 1024x1024, Splash Onboarding multipaso, Componente MallOsLogo SVG, 10 Categorías oficiales y elementos escénicos isométricos 2.5D | Verificación y despliegue |
- 2026-10-02 | Gemini 2.5 Flash | Alineación integral con Documento Maestro v2.0: Implementación completa del mapa isométrico 2.5D (Tiempo y Espacio) con gestos pan/pinch, wayfinding animado y snapping de posición; armonización del dataset de locales piloto | Listo para pruebas en dispositivo y build de previsualización |
- 2026-10-02 | Gemini 2.5 Flash | Corrección y ajuste riguroso del mapa: modularización de `mapa.tsx` (< 290 líneas con hooks `useWalkSimulation` y `useMallTime`), aviso visible `[SIMULACIÓN]` y `[MODO DEMOSTRACIÓN]`, vitrina offline sin URLs remotas ni marcas ajenas, 0 precios en USD (solo porcentajes), y suite de 43 pruebas del motor pasando al 100% | Validación en dispositivo Android físico en modo avión |
- 2026-10-02 | Gemini 2.5 Flash | Modelado completo de los 4 niveles oficiales de Sambil Chacao (Autopista, Acuario, Libertador, Diversión/Terrazas), 5 plazas icónicas, tiendas ancla (ZARA 2500m², Tijerazo, Mango Bajito 2136m², Samsung, Nike, Cines Unidos), vitrinas digitales sincronizadas y suite de 46 pruebas automatizadas | Listo para presentación de alto impacto y expansión Hotel La Cascada |
- 2026-10-02 | Gemini 2.5 Flash | Mall OS Map Engine v0.4.1 (Authoring Foundation) & Icon System v2: Validación dimensional de pisos, locales, obstáculos y áreas; distancia exacta al perímetro de puertas (`distanceToRectPerimeter`); validación rigurosa de enlaces y alineación vertical; versionado `schemaVersion: 1`; Toolbar de copiado reactivo en Icon Lab con `expo-clipboard`; suite expandida a 61 pruebas unitarias | Siguiente etapa: Map Editor en `@mallos/admin` |


