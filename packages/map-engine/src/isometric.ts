import type { Point } from './types';

export interface IsoOptions {
  /** Píxeles por unidad del plano. */
  scale: number;
  /** Píxeles por unidad de altura. */
  heightScale: number;
}

export const DEFAULT_ISO: IsoOptions = { scale: 1.7, heightScale: 1.7 };

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

/** Proyecta un punto del plano (x, y) a pantalla con altura z. +x va a la derecha-abajo, +y a la izquierda-abajo. */
export function project(x: number, y: number, z = 0, iso: IsoOptions = DEFAULT_ISO): Point {
  return {
    x: (x - y) * COS30 * iso.scale,
    y: (x + y) * SIN30 * iso.scale - z * iso.heightScale,
  };
}

/** Desproyecta un punto de pantalla (screenX, screenY) a coordenadas del plano (x, y) a altura z. */
export function unproject(screenX: number, screenY: number, z = 0, iso: IsoOptions = DEFAULT_ISO): Point {
  const u = screenX / (COS30 * iso.scale);
  const v = ((screenY + z * iso.heightScale) * 2) / iso.scale;
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
