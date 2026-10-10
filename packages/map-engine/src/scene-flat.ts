/**
 * Motor de escena plana cenital (Modo 1: Guía de Ubicación).
 *
 * A diferencia de `buildScene` (isométrico 2.5D), esta escena:
 * - Proyecta x,y directos sin transformación.
 * - Oculta locales fuera del viewport de interés.
 * - Aplica jerarquía estricta de etiquetas con anti-solapamiento.
 * - Genera rutas con stroke constante en pantalla (compensado por zoom).
 *
 * El renderer (FlatMapCanvas) consume `FlatScene` y lo pinta en Skia o SVG 2D.
 */
import type { MallMapData, MapStore, Point, Rect } from './types';
import type { Palette, PaletteEntry } from './scene';
import type { StoreOffer, OfferType } from './offers';
import { smoothPolyline } from './path';

// ============================================================================
// Tipos de la escena plana
// ============================================================================

export interface FlatViewport {
  /** Centro del viewport en coordenadas del plano. */
  center: Point;
  /** Radio de interés en unidades del plano. */
  radius: number;
}

export interface FlatSceneOptions {
  floorId: string;
  /** Paleta por categoría de local. */
  palette: Palette;
  /** Viewport visible. Si no se pasa, se calcula desde el usuario o centro del piso. */
  viewport?: FlatViewport;
  /** Store seleccionado como destino. */
  selectedStoreId?: string;
  /** IDs de tiendas a resaltar (ej: por búsqueda o filtro de categoría). */
  highlightedStoreIds?: string[];
  /** IDs de tiendas a atenuar. */
  dimmedStoreIds?: string[];
  /** Nodos de la ruta activa (IDs del grafo). */
  routeNodeIds?: string[];
  /** Posición del usuario en coordenadas del plano. */
  userPosition?: Point;
  /** Heading del usuario en radianes. undefined = detenido. */
  userHeading?: number;
  /** Rastro de posiciones recientes del usuario (trail). */
  userTrail?: Point[];
  /** Longitud del cono de visión en unidades del plano (default: 35). */
  visionConeLength?: number;
  /** Amplitud angular del cono de visión en radianes (default: PI/5). */
  visionConeSpread?: number;
  /** Zoom actual del renderer. Determina qué etiquetas se muestran. */
  zoom: number;
  /** Modo de etiquetas: 'auto' aplica las reglas de zoom, 'all'/'none' fuerzan. */
  labels?: 'auto' | 'all' | 'none';
  /** Ofertas y promociones activas para renderizar en los locales (Modo 2). */
  offers?: StoreOffer[];
  /** Modo accesible global: destaca ascensores y baños accesibles adaptados */
  accessibleOnly?: boolean;
}

// ============================================================================
// Items de la escena plana (coordenadas del plano, no de pantalla)
// ============================================================================

export interface FlatCorridor {
  kind: 'corridor';
  id: string;
  /** Polígono del pasillo, en coords del plano. */
  points: Point[];
  fill: string;
}

export interface FlatStore {
  kind: 'store';
  id: string;
  /** Polígono del local. */
  points: Point[];
  fill: string;
  stroke: string;
  /** Si es el destino seleccionado. */
  isDestination: boolean;
  /** Si está dentro del viewport de interés. */
  isVisible: boolean;
}

export interface FlatPlaza {
  kind: 'plaza';
  id: string;
  cx: number;
  cy: number;
  r: number;
  fill: string;
  label: string;
}

export interface FlatRouteSegment {
  from: Point;
  to: Point;
  angle: number;
  length: number;
  isImmediate: boolean;
}

export interface FlatChevron {
  x: number;
  y: number;
  angle: number;
  isImmediate: boolean;
}

export interface FlatRoute {
  kind: 'route';
  /** Puntos de la ruta en coords del plano. */
  points: Point[];
  /** Segmentos con opacidad diferenciada (inmediato vs resto). */
  immediatePointCount: number;
  /** Segmentos descompuestos con ángulo y longitud */
  segments?: FlatRouteSegment[];
  /** Posiciones y ángulos para dibujar chevrons direccionales */
  chevrons?: FlatChevron[];
}

export interface FlatUserPin {
  kind: 'userPin';
  x: number;
  y: number;
  /** Heading en radianes. undefined = detenido (sin cono). */
  heading?: number;
}

export interface FlatVisionCone {
  kind: 'visionCone';
  apex: Point;
  arc: Point[];
  heading: number;
  opacity: number;
}

export interface FlatUserTrail {
  kind: 'userTrail';
  segments: Array<{ points: Point[]; opacity: number }>;
}

export interface FlatDestinationPin {
  kind: 'destinationPin';
  x: number;
  y: number;
  storeId: string;
  category?: string;
}

export interface FlatLabel {
  kind: 'label';
  /** Posición del texto en coords del plano. */
  x: number;
  y: number;
  text: string;
  /** Tamaño en unidades del plano (renderer compensa zoom). */
  size: number;
  /** Prioridad: 1 = máxima (destino), 5 = mínima. */
  priority: 1 | 2 | 3 | 4 | 5;
  /** Referencia al store si aplica. */
  storeId?: string;
  /** Referencia a plaza si aplica. */
  plazaId?: string;
}

export interface FlatZone {
  kind: 'zone';
  id: string;
  label: string;
  points: Point[];
  color: string;
  cardinal?: 'north' | 'south' | 'east' | 'west' | 'center';
}

export interface FlatProp {
  kind: 'prop';
  id: string;
  propKind: 'bench' | 'planter' | 'tree';
  x: number;
  y: number;
  w?: number;
  h?: number;
  angle?: number;
}

export interface FlatPoi {
  kind: 'poi';
  id: string;
  poiKind: 'wc' | 'atm' | 'info' | 'escalator' | 'elevator';
  x: number;
  y: number;
  label?: string;
}

export interface FlatPedestrian {
  kind: 'pedestrian';
  id: string;
  x: number;
  y: number;
  heading?: number;
  color?: string;
}

export interface FlatOfferBadge {
  kind: 'offerBadge';
  storeId: string;
  x: number;
  y: number;
  text: string;
  type: OfferType;
  discountPercentage?: number;
}

export type FlatSceneItem =
  | FlatCorridor
  | FlatStore
  | FlatPlaza
  | FlatZone
  | FlatRoute
  | FlatUserPin
  | FlatVisionCone
  | FlatUserTrail
  | FlatDestinationPin
  | FlatLabel
  | FlatOfferBadge
  | FlatProp
  | FlatPoi
  | FlatPedestrian;

export interface FlatScene {
  items: FlatSceneItem[];
  /** ViewBox en coords del plano. El renderer lo proyecta a pantalla. */
  viewBox: Rect;
  /** Metadatos para el HUD y orientación. */
  meta: {
    /** Cantidad de locales visibles en el viewport. */
    visibleStoreCount: number;
    /** Radio efectivo del viewport. */
    viewportRadius: number;
    /** Ángulo del norte arquitectónico en radianes. */
    northAngle?: number;
  };
}


// ============================================================================
// Constantes de diseño
// ============================================================================

/** Radio de visibilidad principal cuando no se especifica viewport. */
const FOCUS_RADIUS_UNITS = 50;

/** Radio máximo del viewBox. */
const MAX_VIEWBOX_RADIUS_UNITS = 400;

/** Distancia mínima entre etiquetas para evitar solapamiento (en unidades del plano). */
const LABEL_MIN_DISTANCE_UNITS = 34;

/** Colores base del modo guía de alto contraste y estilo Apple Maps limpio. */
const FLAT_COLORS = {
  background: '#F8FAFC',
  corridor: '#FFFFFF',
  corridorStroke: '#E2E8F0',
  storeFill: '#F8FAFC',
  storeStroke: '#CBD5E1',
  storeDimmed: '#F1F5F9',
  destinationFill: '#FEF3C7',
  destinationStroke: '#F59E0B',
  routePrimary: '#2563EB',
  routeSecondary: '#93C5FD',
  userPin: '#2563EB',
  userPinHalo: '#BFDBFE',
  labelInk: '#0F172A',
  labelInkSoft: '#475569',
  labelHalo: '#FFFFFF',
} as const;

// ============================================================================
// Helpers geométricos
// ============================================================================

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pointInRect(p: Point, r: Rect): boolean {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

function expandRect(r: Rect, margin: number): Rect {
  return { x: r.x - margin, y: r.y - margin, w: r.w + margin * 2, h: r.h + margin * 2 };
}

function storeRect(s: MapStore): Rect {
  return { x: s.x, y: s.y, w: s.w, h: s.h };
}

function storeBounds(s: MapStore): Rect {
  if (s.polygon && s.polygon.length >= 3) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of s.polygon) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }
  return storeRect(s);
}

function storeCenter(s: MapStore): Point {
  if (s.labelPos) return s.labelPos;
  if (s.polygon && s.polygon.length >= 3) {
    let cx = 0, cy = 0;
    for (const p of s.polygon) { cx += p.x; cy += p.y; }
    return { x: cx / s.polygon.length, y: cy / s.polygon.length };
  }
  return { x: s.x + s.w / 2, y: s.y + s.h / 2 };
}

// ============================================================================
// Algoritmo de etiquetas anti-solapamiento
// ============================================================================

interface LabelCandidate {
  text: string;
  x: number;
  y: number;
  size: number;
  priority: 1 | 2 | 3 | 4 | 5;
  storeId?: string;
  plazaId?: string;
}

/**
 * Aplica anti-solapamiento a las etiquetas candidatas.
 * Reglas:
 * - Se ordenan por prioridad (1 = máxima).
 * - Se recorren en orden; si una etiqueta choca con una ya aceptada, se descarta.
 * - El "choque" se mide por distancia entre centros (aprox. bounding box).
 */
function resolveLabels(candidates: LabelCandidate[], minDistance: number): LabelCandidate[] {
  const sorted = [...candidates].sort((a, b) => a.priority - b.priority);
  const accepted: LabelCandidate[] = [];
  for (const cand of sorted) {
    let collides = false;
    for (const acc of accepted) {
      const dx = Math.abs(cand.x - acc.x);
      const dy = Math.abs(cand.y - acc.y);
      const approxRadius = (cand.size + acc.size) * 0.7;
      if (dx < minDistance && dy < approxRadius * 1.6) {
        collides = true;
        break;
      }
    }
    if (!collides) accepted.push(cand);
  }
  return accepted;
}

// ============================================================================
// Constructor principal
// ============================================================================

export function buildFlatScene(map: MallMapData, opts: FlatSceneOptions): FlatScene {
  const floor = map.floors.find((f) => f.id === opts.floorId);
  if (!floor) throw new Error(`Piso inexistente: ${opts.floorId}`);

  // --- 1. Calcular Bounding Box real del plano completo del piso ---
  let minX = 0;
  let minY = 0;
  let maxX = floor.width;
  let maxY = floor.height;

  const floorStores = map.stores.filter((s) => s.floorId === opts.floorId);
  if (floorStores.length > 0) {
    let sMinX = Infinity, sMinY = Infinity, sMaxX = -Infinity, sMaxY = -Infinity;
    for (const s of floorStores) {
      const b = storeBounds(s);
      if (b.x < sMinX) sMinX = b.x;
      if (b.y < sMinY) sMinY = b.y;
      if (b.x + b.w > sMaxX) sMaxX = b.x + b.w;
      if (b.y + b.h > sMaxY) sMaxY = b.y + b.h;
    }
    for (const a of floor.areas) {
      if (a.polygon) {
        for (const p of a.polygon) {
          if (p.x < sMinX) sMinX = p.x;
          if (p.y < sMinY) sMinY = p.y;
          if (p.x > sMaxX) sMaxX = p.x;
          if (p.y > sMaxY) sMaxY = p.y;
        }
      }
    }
    if (sMinX < sMaxX && sMinY < sMaxY) {
      minX = sMinX;
      minY = sMinY;
      maxX = sMaxX;
      maxY = sMaxY;
    }
  }

  let viewBox: Rect;
  if (opts.viewport) {
    const radius = Math.min(opts.viewport.radius, 400);
    viewBox = {
      x: opts.viewport.center.x - radius,
      y: opts.viewport.center.y - radius,
      w: radius * 2,
      h: radius * 2,
    };
  } else {
    const PADDING_UNITS = 18;
    viewBox = {
      x: minX - PADDING_UNITS,
      y: minY - PADDING_UNITS,
      w: (maxX - minX) + PADDING_UNITS * 2,
      h: (maxY - minY) + PADDING_UNITS * 2,
    };
  }
  const focusBox = expandRect(viewBox, 18);

  // --- 2. Culling de locales ---
  const stores = map.stores.filter((s) => s.floorId === opts.floorId);
  const destination = opts.selectedStoreId
    ? stores.find((s) => s.id === opts.selectedStoreId || s.slug === opts.selectedStoreId)
    : undefined;

  const hasFilter = Boolean(opts.highlightedStoreIds && opts.highlightedStoreIds.length > 0);

  // --- 3. Áreas (pasillos y plazas) ---
  const items: FlatSceneItem[] = [];

  // Pasillos como polígonos planos
  for (const area of floor.areas) {
    if (area.kind === 'corridor' && area.polygon && area.polygon.length >= 3) {
      items.push({
        kind: 'corridor',
        id: area.id,
        points: area.polygon,
        fill: FLAT_COLORS.corridor,
      });
    } else if (area.kind === 'corridor' && area.rect) {
      const r = area.rect;
      items.push({
        kind: 'corridor',
        id: area.id,
        points: [
          { x: r.x, y: r.y },
          { x: r.x + r.w, y: r.y },
          { x: r.x + r.w, y: r.y + r.h },
          { x: r.x, y: r.y + r.h },
        ],
        fill: FLAT_COLORS.corridor,
      });
    }
  }

  // --- 4. Locales con visibilidad calculada y filtros ---
  const visibleStores: MapStore[] = [];
  for (const s of stores) {
    const c = storeCenter(s);
    const inside = pointInRect(c, focusBox);

    const isDestination = s.id === destination?.id;
    const isHighlighted = hasFilter && opts.highlightedStoreIds!.includes(s.id);

    // Solo renderizar locales dentro del foco (o el destino o los resaltados por filtro siempre)
    if (!inside && !isDestination && !isHighlighted) continue;

    visibleStores.push(s);

    const isDimmed = (hasFilter && !isHighlighted && !isDestination) || (opts.dimmedStoreIds?.includes(s.id) ?? false);

    const colors = opts.palette[s.category] ?? opts.palette['other'] ?? { fill: '#F1F5F9', ink: '#1E293B' };

    const points = s.polygon && s.polygon.length >= 3
      ? s.polygon
      : [
          { x: s.x, y: s.y },
          { x: s.x + s.w, y: s.y },
          { x: s.x + s.w, y: s.y + s.h },
          { x: s.x, y: s.y + s.h },
        ];

    let fill = colors.fill || FLAT_COLORS.storeFill;
    let stroke = colors.stroke || FLAT_COLORS.storeStroke;

    if (isDestination) {
      fill = FLAT_COLORS.destinationFill;
      stroke = FLAT_COLORS.destinationStroke;
    } else if (isHighlighted) {
      fill = '#DBEAFE';
      stroke = '#2563EB';
    } else if (isDimmed) {
      fill = '#F8FAFC';
      stroke = '#E2E8F0';
    }

    items.push({
      kind: 'store',
      id: s.id,
      points,
      fill,
      stroke,
      isDestination,
      isVisible: !isDimmed,
    });
  }

  // --- 5. Plazas ---
  const plazas = floor.areas.filter((a) => a.kind === 'plaza' && a.center && a.radius);
  for (const p of plazas) {
    items.push({
      kind: 'plaza',
      id: p.id,
      cx: p.center!.x,
      cy: p.center!.y,
      r: p.radius!,
      fill: p.color ?? '#EEF2FF',
      label: p.label ?? 'Plaza',
    });
  }

  // --- 5.1 Zonas temáticas y cardinales ---
  if (floor.zones) {
    for (const z of floor.zones) {
      items.push({
        kind: 'zone',
        id: z.id,
        label: z.label,
        points: z.polygon,
        color: z.color,
        cardinal: z.cardinal,
      });
    }
  }

  // --- 6. Ruta ---
  if (opts.routeNodeIds && opts.routeNodeIds.length > 1) {
    const byId = new Map(map.nodes.map((n) => [n.id, n] as const));
    const routePoints: Point[] = [];
    for (const id of opts.routeNodeIds) {
      const n = byId.get(id);
      if (n && n.floorId === opts.floorId) {
        routePoints.push({ x: n.x, y: n.y });
      }
    }
    if (routePoints.length > 1) {
      // Determinar cuántos puntos son "inmediatos" (primeros 50m o 30% de la ruta)
      let immediateCount = 1;
      let accum = 0;
      const IMMEDIATE_DISTANCE_UNITS = 50;
      for (let i = 1; i < routePoints.length; i++) {
        accum += distance(routePoints[i - 1]!, routePoints[i]!);
        immediateCount = i + 1;
        if (accum >= IMMEDIATE_DISTANCE_UNITS) break;
      }

      // Calcular segmentos y chevrons direccionales (flechas)
      const segments: FlatRouteSegment[] = [];
      const chevrons: FlatChevron[] = [];
      const CHEVRON_INTERVAL = 35; // Distancia ideal entre chevrons
      let distSinceLastChevron = CHEVRON_INTERVAL * 0.4;

      for (let i = 1; i < routePoints.length; i++) {
        const p1 = routePoints[i - 1]!;
        const p2 = routePoints[i]!;
        const segLen = distance(p1, p2);
        if (segLen <= 0.001) continue;

        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const isImmediate = i < immediateCount;

        segments.push({
          from: p1,
          to: p2,
          angle: ang,
          length: segLen,
          isImmediate,
        });

        // Distribuir chevrons a lo largo del segmento
        let progress = CHEVRON_INTERVAL - distSinceLastChevron;
        while (progress <= segLen) {
          const t = progress / segLen;
          chevrons.push({
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t,
            angle: ang,
            isImmediate,
          });
          progress += CHEVRON_INTERVAL;
        }
        distSinceLastChevron = segLen - (progress - CHEVRON_INTERVAL);
      }

      // Garantizar al menos un chevron en el primer segmento si no se generó por longitud
      if (chevrons.length === 0 && segments.length > 0) {
        const first = segments[0]!;
        chevrons.push({
          x: (first.from.x + first.to.x) / 2,
          y: (first.from.y + first.to.y) / 2,
          angle: first.angle,
          isImmediate: true,
        });
      }

      items.push({
        kind: 'route',
        points: routePoints,
        immediatePointCount: immediateCount,
        segments,
        chevrons,
      });
    }
  }

  // --- 7. Capa de presencia del usuario (Trail, Cono, Avatar y Destino) ---

  // 7.1 Trail de migas del recorrido
  if (opts.userTrail && opts.userTrail.length >= 2) {
    const smooth = smoothPolyline(opts.userTrail, 2);
    const N = 4;
    const segments: Array<{ points: Point[]; opacity: number }> = [];
    for (let i = 0; i < N; i++) {
      const start = Math.floor((i * (smooth.length - 1)) / N);
      const end = Math.floor(((i + 1) * (smooth.length - 1)) / N);
      const slice = smooth.slice(start, end + 1);
      if (slice.length >= 2) {
        const opacity = 0.45 - (0.35 * i) / (N - 1);
        segments.push({ points: slice, opacity });
      }
    }
    if (segments.length > 0) {
      items.push({ kind: 'userTrail', segments });
    }
  }

  // 7.2 Cono de visión direccional
  if (opts.userPosition && typeof opts.userHeading === 'number') {
    const length = opts.visionConeLength ?? 35;
    const spread = opts.visionConeSpread ?? Math.PI / 5;
    const heading = opts.userHeading;
    const startAngle = heading - spread / 2;
    const endAngle = heading + spread / 2;
    const apex = { x: opts.userPosition.x, y: opts.userPosition.y };

    const ARC_SAMPLES = 12;
    const arc: Point[] = [];
    for (let i = 0; i <= ARC_SAMPLES; i++) {
      const t = i / ARC_SAMPLES;
      const angle = startAngle + (endAngle - startAngle) * t;
      const x = opts.userPosition.x + length * Math.cos(angle);
      const y = opts.userPosition.y + length * Math.sin(angle);
      arc.push({ x, y });
    }

    items.push({
      kind: 'visionCone',
      apex,
      arc,
      heading,
      opacity: 0.25,
    });
  }

  // 7.3 Pin del usuario
  if (opts.userPosition) {
    items.push({
      kind: 'userPin',
      x: opts.userPosition.x,
      y: opts.userPosition.y,
      heading: opts.userHeading,
    });
  }

  // 7.4 Pin del destino
  if (destination) {
    const c = storeCenter(destination);
    items.push({
      kind: 'destinationPin',
      x: c.x,
      y: c.y,
      storeId: destination.id,
      category: destination.category,
    });
  }

  // --- 8. Etiquetas con anti-solapamiento y LOD ---
  const labelsMode = opts.labels ?? 'auto';
  if (labelsMode !== 'none') {
    const candidates: LabelCandidate[] = [];

    // Plazas: siempre (prioridad 2)
    for (const p of plazas) {
      candidates.push({
        text: p.label ?? 'Plaza',
        x: p.center!.x,
        y: p.center!.y,
        size: 8,
        priority: 2,
        plazaId: p.id,
      });
    }

    // Destino: siempre (prioridad 1)
    if (destination) {
      const c = storeCenter(destination);
      candidates.push({
        text: destination.name,
        x: c.x,
        y: c.y,
        size: 10,
        priority: 1,
        storeId: destination.id,
      });
    }

    // Tiendas resaltadas por búsqueda o filtro (prioridad 2)
    if (hasFilter) {
      for (const s of visibleStores) {
        if (opts.highlightedStoreIds!.includes(s.id) && s.id !== destination?.id) {
          const c = storeCenter(s);
          candidates.push({
            text: s.name,
            x: c.x,
            y: c.y,
            size: 8.5,
            priority: 2,
            storeId: s.id,
          });
        }
      }
    }

    // Locales en ruta (prioridad 3) — los que están a <25m de la ruta
    if (opts.routeNodeIds && opts.routeNodeIds.length > 1) {
      const byId = new Map(map.nodes.map((n) => [n.id, n] as const));
      const routePts: Point[] = [];
      for (const id of opts.routeNodeIds) {
        const n = byId.get(id);
        if (n) routePts.push({ x: n.x, y: n.y });
      }
      for (const s of visibleStores) {
        if (s.id === destination?.id || candidates.some((c) => c.storeId === s.id)) continue;
        const c = storeCenter(s);
        let nearRoute = false;
        for (const rp of routePts) {
          if (distance(c, rp) < 25) { nearRoute = true; break; }
        }
        if (nearRoute) {
          candidates.push({
            text: s.name,
            x: c.x,
            y: c.y,
            size: 8,
            priority: 3,
            storeId: s.id,
          });
        }
      }
    }

    // Reglas de zoom para el resto (LOD limpio) - Solo cuando no hay filtro activo
    const zoom = opts.zoom;
    if (!hasFilter && (labelsMode === 'all' || zoom >= 1.2)) {
      // Anclas (prioridad 4): categorías clave o locales grandes
      for (const s of visibleStores) {
        if (candidates.some((c) => c.storeId === s.id)) continue;
        const isAnchor = [
          'entertainment',
          'pharmacy',
          'department_store',
          'finance',
          'supermarket',
        ].includes(s.category) || (s.w * s.h > 1200);

        if (isAnchor) {
          const c = storeCenter(s);
          candidates.push({
            text: s.name,
            x: c.x,
            y: c.y,
            size: 7.5,
            priority: 4,
            storeId: s.id,
          });
        }
      }

      // Resto (prioridad 5): solo visible con zoom cercano (zoom >= 1.8)
      if (labelsMode === 'all' || zoom >= 1.8) {
        for (const s of visibleStores) {
          if (candidates.some((c) => c.storeId === s.id)) continue;
          const c = storeCenter(s);
          candidates.push({
            text: s.name,
            x: c.x,
            y: c.y,
            size: 7,
            priority: 5,
            storeId: s.id,
          });
        }
      }
    }

    // Resolver anti-solapamiento
    const resolved = resolveLabels(candidates, LABEL_MIN_DISTANCE_UNITS);
    for (const cand of resolved) {
      items.push({
        kind: 'label',
        x: cand.x,
        y: cand.y,
        text: cand.text,
        size: cand.size,
        priority: cand.priority,
        ...(cand.storeId ? { storeId: cand.storeId } : {}),
        ...(cand.plazaId ? { plazaId: cand.plazaId } : {}),
      });
    }
  }

  // --- 9. Badges de ofertas comerciales (Modo 2: Gamificación & Promociones) ---
  if (opts.offers && opts.offers.length > 0) {
    const storeMap = new Map(stores.map((s) => [s.id, s]));
    for (const offer of opts.offers) {
      const targetStore = storeMap.get(offer.storeId);
      if (targetStore) {
        const c = storeCenter(targetStore);
        items.push({
          kind: 'offerBadge',
          storeId: offer.storeId,
          x: c.x,
          y: c.y - 6, // Ligeramente elevado sobre el centro del local
          text: offer.badge,
          type: offer.type,
          discountPercentage: offer.discountPercentage,
        });
      }
    }
  }

  // --- 10. Mobiliario arquitectónico: Bancos (asientos) y Jardineras (plantas) en Plazas ---
  for (const p of plazas) {
    const angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    for (let i = 0; i < angles.length; i++) {
      const a = angles[i]!;
      // Jardineras en las diagonales exteriores
      const px = p.center!.x + Math.cos(a) * (p.radius! * 1.08);
      const py = p.center!.y + Math.sin(a) * (p.radius! * 1.08);
      items.push({
        kind: 'prop',
        id: `planter-${p.id}-${i}`,
        propKind: 'planter',
        x: px,
        y: py,
      });

      // Bancos/asientos en los puntos cardinales interiores
      const cardAngle = (i * Math.PI) / 2;
      const bx = p.center!.x + Math.cos(cardAngle) * (p.radius! * 0.78);
      const by = p.center!.y + Math.sin(cardAngle) * (p.radius! * 0.78);
      items.push({
        kind: 'prop',
        id: `bench-${p.id}-${i}`,
        propKind: 'bench',
        x: bx,
        y: by,
        angle: cardAngle + Math.PI / 2,
      });
    }
  }

  // --- 11. Puntos de Interés / Servicios: Símbolos de Baños (WC) y Ascensores ---
  const isAccessible = opts.accessibleOnly ?? false;
  const floorWcs = [
    { id: 'poi-wc-1', poiKind: 'wc' as const, x: 200, y: 78, label: isAccessible ? 'WC Accesible' : 'Baños' },
    { id: 'poi-wc-2', poiKind: 'wc' as const, x: 495, y: 78, label: isAccessible ? 'WC Accesible' : 'Baños' },
    { id: 'poi-wc-3', poiKind: 'wc' as const, x: 358, y: 395, label: isAccessible ? 'WC Accesible' : 'Baños' },
    { id: 'poi-wc-4', poiKind: 'wc' as const, x: 630, y: 320, label: isAccessible ? 'WC Accesible' : 'Baños' },
  ];
  for (const wc of floorWcs) {
    items.push({
      kind: 'poi',
      ...wc,
    });
  }

  if (isAccessible) {
    const floorElevs = [
      { id: 'poi-elev-1', poiKind: 'elevator' as const, x: 352, y: 248, label: 'Ascensor' },
      { id: 'poi-elev-2', poiKind: 'elevator' as const, x: 74, y: 248, label: 'Ascensor' },
      { id: 'poi-elev-3', poiKind: 'elevator' as const, x: 586, y: 248, label: 'Ascensor' },
    ];
    for (const el of floorElevs) {
      items.push({
        kind: 'poi',
        ...el,
      });
    }
  }

  // --- 12. Personas / Siluetas de Peatones en Pasillos ---
  const corridorPeds = [
    { id: 'ped-1', x: 165, y: 265, heading: 0.1, color: '#3B82F6' },
    { id: 'ped-2', x: 195, y: 245, heading: -0.2, color: '#EC4899' },
    { id: 'ped-3', x: 260, y: 250, heading: 0.05, color: '#10B981' },
    { id: 'ped-4', x: 310, y: 260, heading: -0.1, color: '#6366F1' },
    { id: 'ped-5', x: 400, y: 255, heading: 0.2, color: '#F59E0B' },
    { id: 'ped-6', x: 440, y: 245, heading: -0.3, color: '#8B5CF6' },
    { id: 'ped-7', x: 520, y: 265, heading: 0.15, color: '#14B8A6' },
    { id: 'ped-8', x: 550, y: 250, heading: -0.1, color: '#F43F5E' },
    { id: 'ped-9', x: 230, y: 322, heading: 0, color: '#3B82F6' },
    { id: 'ped-10', x: 285, y: 322, heading: 3.14, color: '#64748B' },
    { id: 'ped-11', x: 420, y: 322, heading: 0, color: '#10B981' },
    { id: 'ped-12', x: 500, y: 325, heading: 3.14, color: '#F59E0B' },
  ];
  for (const ped of corridorPeds) {
    items.push({
      kind: 'pedestrian',
      ...ped,
    });
  }

  return {
    items,
    viewBox,
    meta: {
      visibleStoreCount: visibleStores.length,
      viewportRadius: Math.max(viewBox.w, viewBox.h) / 2,
      northAngle: floor.orientation?.northAngle,
    },
  };
}
