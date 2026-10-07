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
  /** Viewport visible. Si no se pasa, se calcula desde el usuario. */
  viewport?: FlatViewport;
  /** Store seleccionado como destino. */
  selectedStoreId?: string;
  /** Nodos de la ruta activa (IDs del grafo). */
  routeNodeIds?: string[];
  /** Posición del usuario en coordenadas del plano. */
  userPosition?: Point;
  /** Heading del usuario en radianes. undefined = detenido. */
  userHeading?: number;
  /** Zoom actual del renderer. Determina qué etiquetas se muestran. */
  zoom: number;
  /** Modo de etiquetas: 'auto' aplica las reglas de zoom, 'all'/'none' fuerzan. */
  labels?: 'auto' | 'all' | 'none';
  /** Ofertas y promociones activas para renderizar en los locales (Modo 2). */
  offers?: StoreOffer[];
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

export interface FlatRoute {
  kind: 'route';
  /** Puntos de la ruta en coords del plano. */
  points: Point[];
  /** Segmentos con opacidad diferenciada (inmediato vs resto). */
  immediatePointCount: number;
}

export interface FlatUserPin {
  kind: 'userPin';
  x: number;
  y: number;
  /** Heading en radianes. undefined = detenido (sin cono). */
  heading?: number;
}

export interface FlatDestinationPin {
  kind: 'destinationPin';
  x: number;
  y: number;
  storeId: string;
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
  | FlatDestinationPin
  | FlatLabel
  | FlatOfferBadge;

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

/** Radio de visibilidad principal. Fuera de este radio, opacidad reducida. */
const FOCUS_RADIUS_UNITS = 50;

/** Radio máximo del viewBox. */
const MAX_VIEWBOX_RADIUS_UNITS = 400;

/** Distancia mínima entre etiquetas para evitar solapamiento (en unidades del plano). */
const LABEL_MIN_DISTANCE_UNITS = 25;

/** Colores base del modo guía. */
const FLAT_COLORS = {
  background: '#F8FAFC',
  corridor: '#FFFFFF',
  corridorStroke: '#E2E8F0',
  storeFill: '#FFFFFF',
  storeStroke: '#CBD5E1',
  storeDimmed: '#F1F5F9',
  destinationFill: '#DBEAFE',
  destinationStroke: '#2563EB',
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
      const approxRadius = (cand.size + acc.size) * 0.6;
      if (dx < minDistance && dy < approxRadius * 1.5) {
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

  // --- 1. Calcular viewport ---
  const center: Point = opts.viewport?.center
    ?? opts.userPosition
    ?? { x: floor.width / 2, y: floor.height / 2 };
  const radius = Math.min(
    opts.viewport?.radius ?? FOCUS_RADIUS_UNITS,
    MAX_VIEWBOX_RADIUS_UNITS,
  );
  const viewBox: Rect = {
    x: center.x - radius,
    y: center.y - radius,
    w: radius * 2,
    h: radius * 2,
  };
  const focusBox = expandRect(viewBox, radius * 0.5); // margen para "casi visible"

  // --- 2. Culling de locales ---
  const stores = map.stores.filter((s) => s.floorId === opts.floorId);
  const destination = opts.selectedStoreId
    ? stores.find((s) => s.id === opts.selectedStoreId || s.slug === opts.selectedStoreId)
    : undefined;

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

  // --- 4. Locales con visibilidad calculada ---
  const visibleStores: MapStore[] = [];
  for (const s of stores) {
    const bounds = storeBounds(s);
    const c = storeCenter(s);
    const inside = pointInRect(c, focusBox);

    // Solo renderizar locales dentro del foco (o el destino siempre)
    if (!inside && s.id !== destination?.id) continue;

    visibleStores.push(s);

    const isDestination = s.id === destination?.id;
    const colors = opts.palette[s.category] ?? opts.palette['other'] ?? { fill: '#F1F5F9', ink: '#1E293B' };

    const points = s.polygon && s.polygon.length >= 3
      ? s.polygon
      : [
          { x: s.x, y: s.y },
          { x: s.x + s.w, y: s.y },
          { x: s.x + s.w, y: s.y + s.h },
          { x: s.x, y: s.y + s.h },
        ];

    items.push({
      kind: 'store',
      id: s.id,
      points,
      fill: isDestination ? FLAT_COLORS.destinationFill : colors.fill,
      stroke: isDestination ? FLAT_COLORS.destinationStroke : colors.ink,
      isDestination,
      isVisible: inside,
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
      const userPos = opts.userPosition ?? routePoints[0]!;
      let immediateCount = 1;
      let accum = 0;
      const IMMEDIATE_DISTANCE_UNITS = 50;
      for (let i = 1; i < routePoints.length; i++) {
        accum += distance(routePoints[i - 1]!, routePoints[i]!);
        immediateCount = i + 1;
        if (accum >= IMMEDIATE_DISTANCE_UNITS) break;
      }

      items.push({
        kind: 'route',
        points: routePoints,
        immediatePointCount: immediateCount,
      });
    }
  }

  // --- 7. Usuario y destino ---
  if (opts.userPosition) {
    items.push({
      kind: 'userPin',
      x: opts.userPosition.x,
      y: opts.userPosition.y,
      heading: opts.userHeading,
    });
  }

  if (destination) {
    const c = storeCenter(destination);
    items.push({
      kind: 'destinationPin',
      x: c.x,
      y: c.y,
      storeId: destination.id,
    });
  }

  // --- 8. Etiquetas con anti-solapamiento ---
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

    // Locales en ruta (prioridad 3) — solo los que están a <20m de la ruta
    if (opts.routeNodeIds && opts.routeNodeIds.length > 1) {
      const byId = new Map(map.nodes.map((n) => [n.id, n] as const));
      const routePts: Point[] = [];
      for (const id of opts.routeNodeIds) {
        const n = byId.get(id);
        if (n) routePts.push({ x: n.x, y: n.y });
      }
      for (const s of visibleStores) {
        if (s.id === destination?.id) continue;
        const c = storeCenter(s);
        let nearRoute = false;
        for (const rp of routePts) {
          if (distance(c, rp) < 20) { nearRoute = true; break; }
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

    // Reglas de zoom para el resto
    const zoom = opts.zoom;
    if (labelsMode === 'all' || zoom >= 1.5) {
      // Anclas (prioridad 4): categorías importantes o locales grandes
      for (const s of visibleStores) {
        if (candidates.some((c) => c.storeId === s.id)) continue;
        const isAnchor = ['entertainment', 'pharmacy', 'department_store', 'sports'].includes(s.category)
          || s.w * s.h > 1500;
        if (isAnchor) {
          const c = storeCenter(s);
          candidates.push({
            text: s.name,
            x: c.x,
            y: c.y,
            size: 8,
            priority: 4,
            storeId: s.id,
          });
        }
      }

      // Resto (prioridad 5): solo con zoom alto
      if (labelsMode === 'all' || zoom >= 3) {
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

  return {
    items,
    viewBox,
    meta: {
      visibleStoreCount: visibleStores.length,
      viewportRadius: radius,
      northAngle: floor.orientation?.northAngle,
    },
  };
}

