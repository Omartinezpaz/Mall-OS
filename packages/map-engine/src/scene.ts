/**
 * Escena isométrica: una lista de primitivas ya proyectadas (polígonos, líneas, círculos, textos, insignias).
 * Es independiente del formato de salida: hoy se serializa a SVG (svg.ts); en la app se mapea a
 * <Polygon>/<Polyline>/<Circle>/<Text> de react-native-svg con el mismo resultado.
 * Los elementos de un local llevan `storeId` para la selección por toque.
 */
import { project, DEFAULT_ISO, type IsoOptions } from './isometric';
import { samplePolyline, smoothPolyline } from './path';
import type { MallMapData, MapFloor, MapProp, MapStore, Point, PoiKind, Rect } from './types';

export interface PaletteEntry {
  fill: string;
  ink: string;
}

export type Palette = Readonly<Record<string, PaletteEntry>>;

export type SceneItem =
  | { kind: 'polygon'; points: Point[]; fill: string; stroke: string; strokeWidth: number; opacity?: number; storeId?: string }
  | { kind: 'polyline'; points: Point[]; stroke: string; strokeWidth: number; dash?: string; opacity?: number }
  | { kind: 'circle'; x: number; y: number; r: number; fill: string; stroke?: string; strokeWidth?: number; opacity?: number }
  | { kind: 'ellipse'; x: number; y: number; rx: number; ry: number; fill: string; opacity?: number }
  | { kind: 'text'; x: number; y: number; text: string; size: number; weight: number; fill: string; halo?: string; storeId?: string }
  | { kind: 'badge'; x: number; y: number; size: number; fill: string; glyph: PoiKind }
  | { kind: 'pin'; x: number; y: number; fill: string };

export interface Scene {
  items: SceneItem[];
  viewBox: { x: number; y: number; w: number; h: number };
}

export interface SceneTheme {
  primary: string;
  primaryDark: string;
  slab: string;
  slabStroke: string;
  corridor: string;
  corridorStroke: string;
  tile: string;
  plaza: string;
  plazaStroke: string;
  water: string;
  waterStroke: string;
  leaf: string;
  leafDark: string;
  leafLight: string;
  trunk: string;
  wood: string;
  badge: string;
}

export interface SceneOptions {
  floorId: string;
  palette: Palette;
  selectedStoreId?: string;
  /** IDs de locales cerrados o no coincidentes para atenuarlos visualmente */
  dimmedStoreIds?: string[];
  /** Nodos de la ruta (se dibujan solo los del piso mostrado). */
  routeNodeIds?: string[];
  /** Estado visual de la ruta: 'preview' (atenuada/punteada) o 'active' (sólida con flechas animadas). Por defecto 'active'. */
  routeMode?: 'preview' | 'active';
  /** Desplazamiento (0..1) de las flechas de la ruta; variarlo en el tiempo las anima. */
  routePhase?: number;
  labels?: 'all' | 'selected' | 'none';
  /**
   * 'full': sombras, baldosas y mobiliario completo (árboles, bancas, luminarias, fuentes…).
   * 'medium': locales, POI, vegetación principal y escaleras (sin baldosas pesadas).
   * 'lite': solo locales, ruta y etiquetas; para zoom lejano o teléfonos lentos.
   */
  detail?: 'full' | 'medium' | 'lite';
  /** Cuánto se eleva (unidades de altura) el local seleccionado. Por defecto 3. */
  selectedLift?: number;
  iso?: IsoOptions;
  theme?: Partial<SceneTheme>;
  /** Capa a generar: 'all' (por defecto), 'base' (sin ruta), 'route' (solo ruta). */
  layer?: 'all' | 'base' | 'route';
}

const DEFAULT_THEME: SceneTheme = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  slab: '#F1F5F9',
  slabStroke: '#CBD5E1',
  corridor: '#FFFFFF',
  corridorStroke: '#E2E8F0',
  tile: '#E8EDF4',
  plaza: '#EEF2FF',
  plazaStroke: '#C7D2FE',
  water: '#C7D2FE',
  waterStroke: '#818CF8',
  leaf: '#22C55E',
  leafDark: '#16A34A',
  leafLight: '#4ADE80',
  trunk: '#8B6B4A',
  wood: '#B7916B',
  badge: '#312E81',
};

const SLAB_DEPTH = 9;
const TILE_SIZE = 16;
const CHEVRON_SPACING = 26;

/** Oscurece un color hex mezclándolo con negro. */
function darken(hex: string, amount: number): string {
  const m = /^#([0-9a-fA-F]{6})$/.exec(hex);
  if (!m || !m[1]) return hex;
  const n = parseInt(m[1], 16);
  const ch = (v: number) => Math.round(v * (1 - amount)).toString(16).padStart(2, '0');
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`.toUpperCase();
}

const centerOf = (r: Rect): Point => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });

interface Drawable {
  depth: number;
  items: SceneItem[];
}

/**
 * Construye la escena de un piso.
 * Orden de pintado: algoritmo del pintor por profundidad (x+y) del centro, mezclando locales y detalles.
 * LIMITACIÓN: correcto para locales rectangulares que no se solapan (lo comprueba validateMapData).
 */
export function buildScene(map: MallMapData, opts: SceneOptions): Scene {
  const floor: MapFloor | undefined = map.floors.find((f) => f.id === opts.floorId);
  if (!floor) throw new Error(`Piso inexistente: ${opts.floorId}`);

  const iso = opts.iso ?? DEFAULT_ISO;
  const th: SceneTheme = { ...DEFAULT_THEME, ...opts.theme };
  const full = (opts.detail ?? 'full') === 'full';
  const P = (x: number, y: number, z = 0): Point => project(x, y, z, iso);
  const items: SceneItem[] = [];

  const quad = (pts: Point[], fill: string, stroke: string, sw = 0.8, extra: { opacity?: number; storeId?: string } = {}): SceneItem => ({
    kind: 'polygon',
    points: pts,
    fill,
    stroke,
    strokeWidth: sw,
    ...(extra.opacity !== undefined ? { opacity: extra.opacity } : {}),
    ...(extra.storeId ? { storeId: extra.storeId } : {}),
  });

  const flat = (r: Rect, z: number, fill: string, stroke: string, storeId?: string): SceneItem =>
    quad([P(r.x, r.y, z), P(r.x + r.w, r.y, z), P(r.x + r.w, r.y + r.h, z), P(r.x, r.y + r.h, z)], fill, stroke, 0.8, storeId ? { storeId } : {});

  /** Caja: dos paredes visibles (izquierda y derecha) y tapa. */
  const box = (r: Rect, z0: number, z1: number, top: string, stroke: string, storeId?: string): SceneItem[] => {
    const { x, y, w, h } = r;
    const sid = storeId ? { storeId } : {};
    return [
      quad([P(x, y + h, z0), P(x + w, y + h, z0), P(x + w, y + h, z1), P(x, y + h, z1)], darken(top, 0.14), stroke, 0.8, sid),
      quad([P(x + w, y, z0), P(x + w, y + h, z0), P(x + w, y + h, z1), P(x + w, y, z1)], darken(top, 0.26), stroke, 0.8, sid),
      flat(r, z1, top, stroke, storeId),
    ];
  };

  const ellipseOn = (c: Point, rx: number, ry: number, opacity: number): SceneItem => ({ kind: 'ellipse', x: c.x, y: c.y, rx, ry, fill: '#0F172A', opacity });

  // ---------- Base y áreas transitables ----------
  items.push(...box({ x: 0, y: 0, w: floor.width, h: floor.height }, -SLAB_DEPTH, 0, th.slab, th.slabStroke));
  for (const a of floor.areas) {
    if (a.kind === 'corridor') items.push(flat(a.rect, 0.2, th.corridor, th.corridorStroke));
    else if (a.kind === 'plaza') items.push(flat(a.rect, 0.4, th.plaza, th.plazaStroke));
    else items.push(flat(a.rect, 0.6, th.primary, th.primary));
  }

  // Baldosas: líneas finas sobre los pasillos (sensación de piso real)
  if (full) {
    for (const a of floor.areas) {
      if (a.kind !== 'corridor') continue;
      const { x, y, w, h } = a.rect;
      for (let gx = Math.ceil(x / TILE_SIZE) * TILE_SIZE; gx < x + w; gx += TILE_SIZE) {
        items.push({ kind: 'polyline', points: [P(gx, y, 0.3), P(gx, y + h, 0.3)], stroke: th.tile, strokeWidth: 0.6 });
      }
      for (let gy = Math.ceil(y / TILE_SIZE) * TILE_SIZE; gy < y + h; gy += TILE_SIZE) {
        items.push({ kind: 'polyline', points: [P(x, gy, 0.3), P(x + w, gy, 0.3)], stroke: th.tile, strokeWidth: 0.6 });
      }
    }
  }

  // Fuente y obstáculos
  for (const o of floor.obstacles) {
    if (o.kind === 'fountain') {
      const c = centerOf(o.rect);
      const ring = (r: number, z: number): Point[] =>
        Array.from({ length: 32 }, (_, i) => {
          const a = (i / 32) * Math.PI * 2;
          return P(c.x + r * Math.cos(a), c.y + r * Math.sin(a) * 0.9, z);
        });
      items.push(quad(ring(o.rect.w / 2, 0.6), th.water, th.waterStroke, 1));
      items.push(quad(ring(o.rect.w / 4, 4), '#E0E7FF', th.waterStroke, 1));
    } else {
      items.push(...box(o.rect, 0, 5, '#E2E8F0', '#FFFFFF'));
    }
  }

  // Sombras proyectadas por los locales sobre el piso (luz desde arriba-izquierda)
  const stores = map.stores.filter((s) => s.floorId === opts.floorId);
  if (full) {
    for (const s of stores) {
      const d = s.height * 0.5;
      items.push(
        quad([P(s.x + d, s.y + d, 0.5), P(s.x + s.w + d, s.y + d, 0.5), P(s.x + s.w + d, s.y + s.h + d, 0.5), P(s.x + d, s.y + s.h + d, 0.5)], '#0F172A', 'none', 0, { opacity: 0.07 }),
      );
    }
  }

  // ---------- Locales y detalles, mezclados y ordenados por profundidad ----------
  const drawables: Drawable[] = [];
  const lift = opts.selectedLift ?? 3;
  const dimmedSet = new Set(opts.dimmedStoreIds ?? []);

  const getStorePalette = (s: MapStore) => {
    if (dimmedSet.has(s.id)) {
      return { fill: '#E2E8F0', ink: '#64748B' };
    }
    return opts.palette[s.category] ?? opts.palette['other'] ?? { fill: '#F1F5F9', ink: '#1E293B' };
  };

  /**
   * Fachada: vidrio y hueco de puerta en la cara visible (sur o este) donde está la puerta del local.
   * Si la puerta mira a una cara oculta (norte u oeste), no se dibuja nada: no se vería.
   */
  const facade = (s: MapStore, h: number): SceneItem[] => {
    const door = map.nodes.find((n) => n.id === s.doorNodeId);
    if (!door) return [];
    const south = Math.abs(door.y - (s.y + s.h)) < 1.5 && door.x >= s.x && door.x <= s.x + s.w;
    const east = Math.abs(door.x - (s.x + s.w)) < 1.5 && door.y >= s.y && door.y <= s.y + s.h;
    if (!south && !east) return [];
    const a0 = south ? s.x : s.y;
    const a1 = south ? s.x + s.w : s.y + s.h;
    const at = south ? door.x : door.y;
    const face = (a: number, b: number, z0: number, z1: number): Point[] =>
      south
        ? [P(a, s.y + s.h, z0), P(b, s.y + s.h, z0), P(b, s.y + s.h, z1), P(a, s.y + s.h, z1)]
        : [P(s.x + s.w, a, z0), P(s.x + s.w, b, z0), P(s.x + s.w, b, z1), P(s.x + s.w, a, z1)];
    const out: SceneItem[] = [];
    const inset = 4;
    const gap = 3.5;
    const segments: Array<[number, number]> = [[a0 + inset, at - gap], [at + gap, a1 - inset]];
    for (const [a, b] of segments) {
      if (b - a >= 6) out.push(quad(face(a, b, h * 0.3, h * 0.78), '#DBEAFE', '#FFFFFF', 0.5, { opacity: 0.75, storeId: s.id }));
    }
    out.push(quad(face(at - gap, at + gap, 0, h * 0.7), '#1E293B', 'none', 0, { opacity: 0.55, storeId: s.id }));
    return out;
  };

  for (const s of stores) {
    const selected = s.id === opts.selectedStoreId;
    const colors = getStorePalette(s);
    const h = selected ? s.height + lift : s.height;
    drawables.push({
      depth: s.x + s.w / 2 + s.y + s.h / 2,
      items: [
        ...(selected ? [quad([P(s.x - 2, s.y - 2, 0.6), P(s.x + s.w + 2, s.y - 2, 0.6), P(s.x + s.w + 2, s.y + s.h + 2, 0.6), P(s.x - 2, s.y + s.h + 2, 0.6)], th.primary, 'none', 0, { opacity: 0.18 })] : []),
        ...box(s, 0, h, selected ? th.primary : colors.fill, selected ? th.primaryDark : '#FFFFFF', s.id),
        ...(full ? facade(s, h) : []),
      ],
    });
  }

  const propDrawable = (p: MapProp): Drawable | null => {
    switch (p.kind) {
      case 'tree': {
        const base = P(p.x, p.y, 0);
        const crown = P(p.x, p.y, 11);
        return {
          depth: p.x + p.y,
          items: [
            ellipseOn(P(p.x + 2, p.y + 2, 0), 7, 3.4, 0.16), // sombra suave en suelo
            { kind: 'polyline', points: [base, P(p.x, p.y, 7.5)], stroke: th.trunk, strokeWidth: 2.8 },
            { kind: 'circle', x: crown.x, y: crown.y, r: 8.5, fill: th.leafDark },
            { kind: 'circle', x: crown.x - 4.5, y: crown.y + 2, r: 6.5, fill: th.leaf },
            { kind: 'circle', x: crown.x + 4.5, y: crown.y + 1, r: 7, fill: th.leaf },
            { kind: 'circle', x: crown.x - 1, y: crown.y - 3, r: 5.5, fill: th.leafLight },
            { kind: 'circle', x: crown.x + 1.5, y: crown.y - 1.5, r: 2.5, fill: '#86EFAC', opacity: 0.6 }, // reflejo de luz
          ],
        };
      }
      case 'bench': {
        const r = p.rect;
        const alongY = r.h >= r.w;
        const depth = r.x + r.w / 2 + r.y + r.h / 2;
        const items: SceneItem[] = [
          ellipseOn(P(r.x + r.w / 2 + 1, r.y + r.h / 2 + 1, 0), r.w * 0.9, r.h * 0.5, 0.12),
          ...box(r, 0.8, 2.2, th.wood, '#FFFFFF'),
          ...(alongY
            ? box({ x: r.x, y: r.y, w: 0.8, h: r.h }, 2.2, 4.2, '#92400E', '#FFFFFF')
            : box({ x: r.x, y: r.y, w: r.w, h: 0.8 }, 2.2, 4.2, '#92400E', '#FFFFFF')),
        ];
        return { depth, items };
      }
      case 'planter': {
        const c = centerOf(p.rect);
        const top = P(c.x, c.y, 6);
        return {
          depth: c.x + c.y,
          items: [
            ellipseOn(P(c.x + 1, c.y + 1, 0), p.rect.w * 0.8, p.rect.h * 0.45, 0.12),
            ...box(p.rect, 0, 3.2, '#E2E8F0', '#CBD5E1'),
            { kind: 'circle', x: top.x, y: top.y, r: 6, fill: th.leafDark },
            { kind: 'circle', x: top.x - 2, y: top.y + 1, r: 4.5, fill: th.leaf },
            { kind: 'circle', x: top.x + 2.5, y: top.y - 2, r: 4, fill: th.leafLight },
          ],
        };
      }
      case 'lounge': {
        const r = p.rect;
        const c = centerOf(r);
        return {
          depth: c.x + c.y,
          items: [
            ellipseOn(P(c.x + 1, c.y + 1, 0), r.w * 0.9, r.h * 0.5, 0.14),
            ...box(r, 0, 2.5, '#475569', '#334155'),
            ...box({ x: r.x + 1, y: r.y + 1, w: r.w - 2, h: r.h - 2 }, 2.5, 3.8, '#3B82F6', '#60A5FA'),
          ],
        };
      }
      case 'trash': {
        const base = P(p.x, p.y, 0);
        const top = P(p.x, p.y, 3.5);
        return {
          depth: p.x + p.y,
          items: [
            ellipseOn(P(p.x + 0.5, p.y + 0.5, 0), 2.2, 1.2, 0.15),
            { kind: 'polyline', points: [base, top], stroke: '#64748B', strokeWidth: 3.5 },
            { kind: 'circle', x: top.x, y: top.y, r: 2.2, fill: '#334155', stroke: '#94A3B8', strokeWidth: 0.8 },
          ],
        };
      }
      case 'lamp': {
        const base = P(p.x, p.y, 0);
        const top = P(p.x, p.y, 13);
        return {
          depth: p.x + p.y,
          items: [
            ellipseOn(P(p.x + 1, p.y + 1, 0), 3, 1.6, 0.1),
            { kind: 'polyline', points: [base, top], stroke: '#334155', strokeWidth: 1.8 },
            { kind: 'circle', x: top.x, y: top.y, r: 6, fill: '#FEF08A', opacity: 0.25 },
            { kind: 'circle', x: top.x, y: top.y, r: 3, fill: '#FFFFFF', stroke: '#FACC15', strokeWidth: 1 },
          ],
        };
      }
      case 'railing': {
        const h = p.height ?? 4.5;
        const depth = (p.from.x + p.to.x) / 2 + (p.from.y + p.to.y) / 2;
        return {
          depth,
          items: [
            quad([P(p.from.x, p.from.y, 0), P(p.to.x, p.to.y, 0), P(p.to.x, p.to.y, h), P(p.from.x, p.from.y, h)], '#BAE6FD', '#7DD3FC', 0.6, { opacity: 0.45 }),
            { kind: 'polyline', points: [P(p.from.x, p.from.y, h), P(p.to.x, p.to.y, h)], stroke: '#0F172A', strokeWidth: 1.8 },
            { kind: 'polyline', points: [P(p.from.x, p.from.y, 0), P(p.from.x, p.from.y, h)], stroke: '#64748B', strokeWidth: 1.2 },
            { kind: 'polyline', points: [P(p.to.x, p.to.y, 0), P(p.to.x, p.to.y, h)], stroke: '#64748B', strokeWidth: 1.2 },
          ],
        };
      }
      case 'elevator': {
        const r = p.rect;
        const h = p.height ?? 16;
        const depth = r.x + r.w / 2 + r.y + r.h / 2;
        const c = centerOf(r);
        const signPt = P(c.x, c.y, h + 2);
        return {
          depth,
          items: [
            ...box(r, 0, h, '#F8FAFC', '#94A3B8'),
            quad([P(r.x + 1, r.y + r.h, 1), P(r.x + r.w - 1, r.y + r.h, 1), P(r.x + r.w - 1, r.y + r.h, h - 2), P(r.x + 1, r.y + r.h, h - 2)], '#BAE6FD', '#38BDF8', 0.8, { opacity: 0.6 }),
            { kind: 'circle', x: signPt.x, y: signPt.y, r: 5, fill: '#2563EB' },
            { kind: 'text', x: signPt.x, y: signPt.y + 3, text: '🛗', size: 8, weight: 700, fill: '#FFFFFF' },
          ],
        };
      }
      case 'fountain': {
        const r = p.rect;
        const c = centerOf(r);
        const depth = c.x + c.y;
        const jet = P(c.x, c.y, 9);
        return {
          depth,
          items: [
            ellipseOn(P(c.x + 1.5, c.y + 1.5, 0), r.w * 0.95, r.h * 0.5, 0.15),
            ...box(r, 0, 2.5, '#E2E8F0', '#CBD5E1'),
            quad([P(r.x + 0.8, r.y + 0.8, 2.2), P(r.x + r.w - 0.8, r.y + 0.8, 2.2), P(r.x + r.w - 0.8, r.y + r.h - 0.8, 2.2), P(r.x + 0.8, r.y + r.h - 0.8, 2.2)], th.water, th.waterStroke, 0.8, { opacity: 0.85 }),
            { kind: 'polyline', points: [P(c.x, c.y, 2.2), jet], stroke: '#FFFFFF', strokeWidth: 2 },
            { kind: 'circle', x: jet.x, y: jet.y, r: 3, fill: '#E0F2FE', opacity: 0.8 },
          ],
        };
      }
      case 'sign': {
        const base = P(p.x, p.y, 0);
        const signPt = P(p.x, p.y, 12);
        return {
          depth: p.x + p.y + 10,
          items: [
            { kind: 'polyline', points: [base, signPt], stroke: '#475569', strokeWidth: 1.5 },
            { kind: 'circle', x: signPt.x, y: signPt.y, r: 8, fill: '#0F172A', stroke: '#38BDF8', strokeWidth: 1.2 },
            { kind: 'text', x: signPt.x, y: signPt.y + 3, text: p.text.substring(0, 3), size: 7, weight: 800, fill: '#FFFFFF' },
          ],
        };
      }
      case 'escalator': {
        const r = p.rect;
        const alongY = r.h >= r.w;
        const out: SceneItem[] = [...box(r, 0, 2, '#94A3B8', '#FFFFFF')];
        const step = 3;
        if (alongY) {
          for (let gy = r.y + step; gy < r.y + r.h; gy += step) out.push({ kind: 'polyline', points: [P(r.x, gy, 2.1), P(r.x + r.w, gy, 2.1)], stroke: '#475569', strokeWidth: 0.8 });
          out.push(...box({ x: r.x, y: r.y, w: 1.2, h: r.h }, 2, 5, '#1E293B', '#FFFFFF'));
          out.push(...box({ x: r.x + r.w - 1.2, y: r.y, w: 1.2, h: r.h }, 2, 5, '#1E293B', '#FFFFFF'));
        } else {
          for (let gx = r.x + step; gx < r.x + r.w; gx += step) out.push({ kind: 'polyline', points: [P(gx, r.y, 2.1), P(gx, r.y + r.h, 2.1)], stroke: '#475569', strokeWidth: 0.8 });
          out.push(...box({ x: r.x, y: r.y, w: r.w, h: 1.2 }, 2, 5, '#1E293B', '#FFFFFF'));
          out.push(...box({ x: r.x, y: r.y + r.h - 1.2, w: r.w, h: 1.2 }, 2, 5, '#1E293B', '#FFFFFF'));
        }
        if (p.flow) {
          const len = alongY ? r.h : r.w;
          const sign = p.flow === 'min' ? -1 : 1;
          const cx = r.x + r.w / 2;
          const cy = r.y + r.h / 2;
          for (const f of [0.35, 0.65]) {
            const px = alongY ? cx : r.x + len * f;
            const py = alongY ? r.y + len * f : cy;
            const a = P(px - (alongY ? 0 : sign), py - (alongY ? sign : 0), 2.2);
            const b = P(px + (alongY ? 0 : sign), py + (alongY ? sign : 0), 2.2);
            const ang = Math.atan2(b.y - a.y, b.x - a.x);
            const c = P(px, py, 2.2);
            const co = Math.cos(ang);
            const si = Math.sin(ang);
            const at = (u: number, v: number): Point => ({ x: c.x + u * co - v * si, y: c.y + u * si + v * co });
            out.push({ kind: 'polyline', points: [at(-1.6, -2), at(1.2, 0), at(-1.6, 2)], stroke: '#FFFFFF', strokeWidth: 1.2 });
          }
        }
        return { depth: r.x + r.w / 2 + r.y + r.h / 2, items: out };
      }
      case 'glass':
        return {
          depth: (p.from.x + p.to.x) / 2 + (p.from.y + p.to.y) / 2,
          items: [quad([P(p.from.x, p.from.y, 0), P(p.to.x, p.to.y, 0), P(p.to.x, p.to.y, 8), P(p.from.x, p.from.y, 8)], '#BAE6FD', '#7DD3FC', 0.8, { opacity: 0.4 })],
        };
      case 'poi':
        return null; // las insignias se dibujan al final, por encima de todo
    }
  };

  const detailMode = opts.detail ?? 'full';
  const showProps = detailMode !== 'lite';

  if (showProps) {
    for (const p of floor.props ?? []) {
      // En modo 'medium', filtrar props secundarios si fuera necesario
      if (detailMode === 'medium' && (p.kind === 'trash' || p.kind === 'lamp' || p.kind === 'lounge')) continue;
      const d = propDrawable(p);
      if (d) drawables.push(d);
    }
  }

  drawables.sort((a, b) => a.depth - b.depth);
  for (const d of drawables) items.push(...d.items);

  const baseCount = items.length;
  const routeItems: SceneItem[] = [];

  // ---------- Ruta: cinta con halo, esquinas redondeadas y flechas de dirección ----------
  if (opts.routeNodeIds && opts.routeNodeIds.length > 1) {
    const byId = new Map(map.nodes.map((n) => [n.id, n] as const));
    const raw = opts.routeNodeIds
      .map((id) => byId.get(id))
      .filter((n): n is NonNullable<typeof n> => n !== undefined && n.floorId === opts.floorId)
      .map((n) => P(n.x, n.y, 1.5));
    if (raw.length > 1) {
      const path = smoothPolyline(raw, 3);
      const isPreview = opts.routeMode === 'preview';

      if (isPreview) {
        // Estado A — Preview: línea azul atenuada con trazo punteado
        routeItems.push({ kind: 'polyline', points: path, stroke: th.primary, strokeWidth: 10, opacity: 0.12 });
        routeItems.push({ kind: 'polyline', points: path, stroke: th.primary, strokeWidth: 3.5, dash: '6,6', opacity: 0.85 });
        const start = raw[0] as Point;
        routeItems.push({ kind: 'circle', x: start.x, y: start.y, r: 8, fill: th.primary, opacity: 0.3 });
        routeItems.push({ kind: 'circle', x: start.x, y: start.y, r: 4.5, fill: th.primary, stroke: '#FFFFFF', strokeWidth: 2 });
      } else {
        // Estado B — Navegación activa: cinta sólida con resplandor, borde blanco y flechas animadas
        routeItems.push({ kind: 'polyline', points: path, stroke: th.primary, strokeWidth: 20, opacity: 0.16 }); // resplandor
        routeItems.push({ kind: 'polyline', points: path, stroke: '#FFFFFF', strokeWidth: 12 }); // borde
        routeItems.push({ kind: 'polyline', points: path, stroke: th.primary, strokeWidth: 8 }); // cinta
        for (const s of samplePolyline(path, CHEVRON_SPACING, opts.routePhase ?? 0)) {
          const c = Math.cos(s.angle);
          const n = Math.sin(s.angle);
          const at = (u: number, v: number): Point => ({ x: s.x + u * c - v * n, y: s.y + u * n + v * c });
          routeItems.push({ kind: 'polyline', points: [at(-3.2, -3.4), at(1.8, 0), at(-3.2, 3.4)], stroke: '#FFFFFF', strokeWidth: 2.2 });
        }
        const start = raw[0] as Point;
        routeItems.push({ kind: 'circle', x: start.x, y: start.y, r: 14, fill: th.primary, opacity: 0.2 });
        routeItems.push({ kind: 'circle', x: start.x, y: start.y, r: 6.5, fill: th.primary, stroke: '#FFFFFF', strokeWidth: 2.5 });
      }
    }
  }

  // ---------- Etiquetas, insignias, rótulos de entrada y pin ----------
  const labels = opts.labels ?? 'all';
  if (labels !== 'none') {
    for (const s of stores) {
      const selected = s.id === opts.selectedStoreId;
      if (labels === 'selected' && !selected) continue;
      const colors = getStorePalette(s);
      const c = centerOf(s);
      const p = P(c.x, c.y, selected ? s.height + lift : s.height);
      // Halo del color del techo: invisible sobre el techo, protege la lectura si algo (ruta, línea) cruza la etiqueta.
      items.push({ kind: 'text', x: p.x, y: p.y + 4, text: s.name, size: selected ? 11 : 10, weight: 700, fill: selected ? '#FFFFFF' : colors.ink, ...(selected ? {} : { halo: colors.fill }), storeId: s.id });
    }
    for (const a of floor.areas) {
      if (a.kind !== 'entrance') continue;
      const c = centerOf(a.rect);
      const p = P(c.x, c.y, 9);
      items.push({ kind: 'text', x: p.x, y: p.y, text: 'Entrada', size: 10, weight: 700, fill: th.primary, halo: '#FFFFFF' });
    }
  }
  for (const p of floor.props ?? []) {
    if (p.kind !== 'poi') continue;
    const at = P(p.x, p.y, p.z ?? 14);
    items.push({ kind: 'badge', x: at.x, y: at.y, size: 20, fill: th.badge, glyph: p.poi });
  }

  const sel = stores.find((s) => s.id === opts.selectedStoreId);
  if (sel) {
    const c = centerOf(sel);
    const p = P(c.x, c.y, sel.height + lift + 14);
    items.push({ kind: 'pin', x: p.x, y: p.y - 8, fill: th.primary });
  }

  // ---------- Encuadre ----------
  const maxH = Math.max(0, ...stores.map((s) => s.height)) + 34;
  const corners = [
    P(0, 0, -SLAB_DEPTH), P(0, 0, maxH),
    P(floor.width, 0, -SLAB_DEPTH), P(floor.width, 0, maxH),
    P(floor.width, floor.height, -SLAB_DEPTH), P(floor.width, floor.height, maxH),
    P(0, floor.height, -SLAB_DEPTH), P(0, floor.height, maxH),
  ];
  const minX = Math.min(...corners.map((p) => p.x)) - 30;
  const maxX = Math.max(...corners.map((p) => p.x)) + 30;
  const minY = Math.min(...corners.map((p) => p.y)) - 30;
  const maxY = Math.max(...corners.map((p) => p.y)) + 40;

  const layer = opts.layer ?? 'all';
  const finalItems =
    layer === 'route'
      ? routeItems
      : layer === 'base'
      ? items
      : [...items.slice(0, baseCount), ...routeItems, ...items.slice(baseCount)];

  return { items: finalItems, viewBox: { x: minX, y: minY, w: maxX - minX, h: maxY - minY } };
}
