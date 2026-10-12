import type { Point } from './types';

export interface IsoOptions {
  /** Píxeles por unidad del plano. */
  scale: number;
  /** Píxeles por unidad de altura. */
  heightScale: number;
  /** Ángulo de inclinación visual en radianes (por defecto PI/6 = 30°). Menor ángulo = cámara más a ras de piso. */
  pitchAngle?: number;
}

/** Cámara estándar isométrica (30° de inclinación) */
export const ISO_STANDARD: IsoOptions = { scale: 1.7, heightScale: 1.7, pitchAngle: Math.PI / 6 };

/** Cámara inmersiva a ras de piso (20° de inclinación, paredes con mayor presencia vertical) */
export const ISO_GROUND: IsoOptions = { scale: 1.85, heightScale: 2.3, pitchAngle: Math.PI / 9 };

/** Cámara aérea de planta (38° de inclinación) */
export const ISO_AERIAL: IsoOptions = { scale: 1.5, heightScale: 1.2, pitchAngle: Math.PI / 4.8 };

export const DEFAULT_ISO: IsoOptions = ISO_GROUND;

/** Proyecta un punto del plano (x, y) a pantalla con altura z. */
export function project(x: number, y: number, z = 0, iso: IsoOptions = DEFAULT_ISO): Point {
  const angle = iso.pitchAngle ?? (Math.PI / 6);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return {
    x: (x - y) * cosA * iso.scale,
    y: (x + y) * sinA * iso.scale - z * iso.heightScale,
  };
}

/** Desproyecta un punto de pantalla (screenX, screenY) a coordenadas del plano (x, y) a altura z. */
export function unproject(screenX: number, screenY: number, z = 0, iso: IsoOptions = DEFAULT_ISO): Point {
  const angle = iso.pitchAngle ?? (Math.PI / 6);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const u = screenX / (cosA * iso.scale);
  const v = (screenY + z * iso.heightScale) / (sinA * iso.scale);
  return {
    x: (v + u) / 2,
    y: (v - u) / 2,
  };
}

/** Proyecta un array de puntos del plano a isométrico a una altura dada. */
export function projectPolygon(points: Point[], z = 0, iso: IsoOptions = DEFAULT_ISO): Point[] {
  return points.map((p) => project(p.x, p.y, z, iso));
}

/** Calcula el bounding box proyectado en pantalla de un array de puntos. */
export function projectBounds(points: Point[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
} {
  if (points.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

export interface ExtrudedWall {
  points: Point[];
  edgeIndex: number;
  faceType: 'south' | 'east' | 'front';
}

export interface ExtrudedPolygonResult {
  roof: Point[];
  base: Point[];
  walls: ExtrudedWall[];
  labelPos: Point;
}

/**
 * Extruye un polígono 2D a 2.5D isométrico calculando techo, base y paredes visibles.
 */
export function extrudePolygon(
  polygon: Point[],
  z0 = 0,
  z1 = 12,
  iso: IsoOptions = DEFAULT_ISO
): ExtrudedPolygonResult {
  if (polygon.length < 3) {
    throw new Error('El polígono debe tener al menos 3 vértices');
  }

  const roof = projectPolygon(polygon, z1, iso);
  const base = projectPolygon(polygon, z0, iso);
  const walls: ExtrudedWall[] = [];

  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const nextIdx = (i + 1) % n;
    const pTop1 = roof[i]!;
    const pTop2 = roof[nextIdx]!;
    const pBase2 = base[nextIdx]!;
    const pBase1 = base[i]!;

    // Prueba de visibilidad en pantalla (producto cruzado 2D del cuadrilátero proyectado)
    const v1x = pTop2.x - pTop1.x;
    const v1y = pTop2.y - pTop1.y;
    const v2x = pBase1.x - pTop1.x;
    const v2y = pBase1.y - pTop1.y;
    const crossZ = v1x * v2y - v1y * v2x;

    // Si crossZ > 0 en pantalla, la cara está orientada hacia el observador
    if (crossZ > 0.001) {
      const origP1 = polygon[i]!;
      const origP2 = polygon[nextIdx]!;
      const dx = origP2.x - origP1.x;
      const dy = origP2.y - origP1.y;

      let faceType: 'south' | 'east' | 'front' = 'front';
      if (Math.abs(dx) >= Math.abs(dy)) {
        faceType = dx > 0 ? 'south' : 'east';
      } else {
        faceType = dy > 0 ? 'east' : 'south';
      }

      walls.push({
        points: [pTop1, pTop2, pBase2, pBase1],
        edgeIndex: i,
        faceType,
      });
    }
  }

  // Centroide para etiqueta
  const cx = polygon.reduce((sum, p) => sum + p.x, 0) / n;
  const cy = polygon.reduce((sum, p) => sum + p.y, 0) / n;
  const labelPos = project(cx, cy, z1 + 1, iso);

  return {
    roof,
    base,
    walls,
    labelPos,
  };
}

export const ELEMENT_HEIGHTS = {
  floor: 0,
  corridor: 0,
  plaza: 0,
  smallStore: 8,
  mediumStore: 10,
  anchorStore: 14,
  kiosk: 6,
  escalator: 6,
  elevator: 18,
  tree: 10,
  fountain: 5,
  bench: 2,
} as const;

export interface ExtrudedFlatWall {
  points: [Point, Point, Point, Point];
  edgeIndex: number;
  faceType: 'south' | 'east' | 'west';
  shadeFactor: number;
}

export interface ExtrudedFlatPolygonResult {
  roof: Point[];
  base: Point[];
  walls: ExtrudedFlatWall[];
}

export interface ExtrudeFlatOptions {
  /** Altura aparente de la extrusión 2.5D en unidades del plano (default: 3.8) */
  height?: number;
  /** Desplazamiento horizontal relativo por ángulo oblicuo (default: 0.15 * height) */
  dx?: number;
  /** Desplazamiento vertical de la base respecto al techo (default: 0.98 * height) */
  dy?: number;
}

/**
 * Extruye un polígono 2D a una proyección arquitectónica 2.5D (cenital oblicua).
 * Calcula el techo, la base y las paredes visibles con sombreado según la normal.
 */
export function extrudeFlatPolygon(
  polygon: Point[],
  opts?: ExtrudeFlatOptions
): ExtrudedFlatPolygonResult {
  if (!polygon || polygon.length < 3) {
    return { roof: polygon ?? [], base: polygon ?? [], walls: [] };
  }

  // 1. Filtrar puntos duplicados consecutivos
  const cleaned: Point[] = [];
  for (let i = 0; i < polygon.length; i++) {
    const cur = polygon[i]!;
    const prev = cleaned[cleaned.length - 1];
    if (!prev || Math.hypot(cur.x - prev.x, cur.y - prev.y) > 0.05) {
      cleaned.push(cur);
    }
  }
  // Si el último coincide con el primero, quitarlo para trabajar como anillo simple
  if (
    cleaned.length > 2 &&
    Math.hypot(
      cleaned[0]!.x - cleaned[cleaned.length - 1]!.x,
      cleaned[0]!.y - cleaned[cleaned.length - 1]!.y
    ) <= 0.05
  ) {
    cleaned.pop();
  }

  const n = cleaned.length;
  if (n < 3) {
    return { roof: polygon, base: polygon, walls: [] };
  }

  // 2. Comprobar si el orden es horario (CW) o antihorario (CCW)
  let area = 0;
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    area += cleaned[i]!.x * cleaned[next]!.y - cleaned[next]!.x * cleaned[i]!.y;
  }
  // En coordenadas de pantalla (Y hacia abajo), area > 0 es CW. Si es < 0, invertimos a CW.
  const pts = area < 0 ? [...cleaned].reverse() : [...cleaned];

  const height = opts?.height ?? 3.8;
  const dx = opts?.dx ?? height * 0.15;
  const dy = opts?.dy ?? height * 0.98;

  const roof: Point[] = pts.map((p) => ({ x: p.x, y: p.y }));
  const base: Point[] = pts.map((p) => ({ x: p.x + dx, y: p.y + dy }));
  const walls: ExtrudedFlatWall[] = [];

  for (let i = 0; i < n; i++) {
    const nextIdx = (i + 1) % n;
    const pTop1 = roof[i]!;
    const pTop2 = roof[nextIdx]!;
    const pBase2 = base[nextIdx]!;
    const pBase1 = base[i]!;

    const ex = pTop2.x - pTop1.x;
    const ey = pTop2.y - pTop1.y;
    const len = Math.hypot(ex, ey);
    if (len < 0.15) continue;

    // Normal exterior (en polígono CW con Y abajo: normal exterior es (ey/len, -ex/len))
    const nx = ey / len;
    const ny = -ex / len;

    // Dot product con la dirección de proyección (dx, dy)
    // Si la pared exterior mira hacia la dirección de proyección, es visible al observador
    const dot = nx * dx + ny * dy;
    if (dot > 0.001) {
      let faceType: 'south' | 'east' | 'west' = 'south';
      let shadeFactor = 0.40;

      if (ny > 0.35) {
        // Mira hacia el sur (frontal inferior)
        faceType = 'south';
        shadeFactor = 0.45;
      } else if (nx > 0.35) {
        // Mira hacia el este (lateral derecho)
        faceType = 'east';
        shadeFactor = 0.60;
      } else {
        // Mira hacia el oeste u oblicuo
        faceType = 'west';
        shadeFactor = 0.75;
      }

      walls.push({
        points: [pTop1, pTop2, pBase2, pBase1],
        edgeIndex: i,
        faceType,
        shadeFactor,
      });
    }
  }

  return { roof, base, walls };
}

