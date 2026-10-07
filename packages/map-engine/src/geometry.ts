import type { Point, Rect } from './types';

/** Tolerancia para comparaciones geométricas (unidades del plano). */
export const EPS = 0.01;

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Distancia de un punto a un rectángulo (0 si está dentro o sobre el borde). */
export function distanceToRect(p: Point, r: Rect): number {
  const dx = Math.max(r.x - p.x, 0, p.x - (r.x + r.w));
  const dy = Math.max(r.y - p.y, 0, p.y - (r.y + r.h));
  return Math.hypot(dx, dy);
}

/**
 * Distancia de un punto al perímetro (las 4 caras / bordes exteriores) de un local o rectángulo.
 * Si el punto se sitúa exactamente sobre una de las 4 caras, devuelve 0.
 */
export function distanceToRectPerimeter(p: Point, r: Rect): number {
  const distToSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number): number => {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    const t = Math.max(0, Math.min(1, ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2));
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);
    return Math.hypot(px - projX, py - projY);
  };

  const top = distToSegment(p.x, p.y, r.x, r.y, r.x + r.w, r.y);
  const bottom = distToSegment(p.x, p.y, r.x, r.y + r.h, r.x + r.w, r.y + r.h);
  const left = distToSegment(p.x, p.y, r.x, r.y, r.x, r.y + r.h);
  const right = distToSegment(p.x, p.y, r.x + r.w, r.y, r.x + r.w, r.y + r.h);

  return Math.min(top, bottom, left, right);
}

/** True si el punto está ESTRICTAMENTE dentro del rectángulo (el borde no cuenta). */
export function pointInRectInterior(p: Point, r: Rect, eps = EPS): boolean {
  return p.x > r.x + eps && p.x < r.x + r.w - eps && p.y > r.y + eps && p.y < r.y + r.h - eps;
}

/** True si dos rectángulos se solapan (tocarse por el borde no cuenta). */
export function rectsOverlap(a: Rect, b: Rect, eps = EPS): boolean {
  return a.x + eps < b.x + b.w && b.x + eps < a.x + a.w && a.y + eps < b.y + b.h && b.y + eps < a.y + a.h;
}

/**
 * True si el segmento a–b atraviesa el INTERIOR del rectángulo (Liang–Barsky).
 * Tocar el borde o terminar sobre él NO cuenta: así una puerta puede estar en el muro del local.
 */
export function segmentCrossesRectInterior(a: Point, b: Point, r: Rect, eps = EPS): boolean {
  const xmin = r.x + eps;
  const xmax = r.x + r.w - eps;
  const ymin = r.y + eps;
  const ymax = r.y + r.h - eps;
  if (xmin >= xmax || ymin >= ymax) return false;

  let t0 = 0;
  let t1 = 1;
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  const clip = (p: number, q: number): boolean => {
    if (p === 0) return q >= 0;
    const t = q / p;
    if (p < 0) {
      if (t > t1) return false;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return false;
      if (t < t1) t1 = t;
    }
    return true;
  };

  return clip(-dx, a.x - xmin) && clip(dx, xmax - a.x) && clip(-dy, a.y - ymin) && clip(dy, ymax - a.y) && t0 <= t1;
}

/** True si el punto está ESTRICTAMENTE dentro del polígono (el perímetro no cuenta). */
export function pointInPolygonInterior(p: Point, poly: Point[], eps = EPS): boolean {
  if (poly.length < 3) return false;
  // Si está sobre cualquier arista dentro de la tolerancia, es borde, no interior estricto
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i]!.x;
    const yi = poly[i]!.y;
    const xj = poly[j]!.x;
    const yj = poly[j]!.y;
    const l2 = (xj - xi) ** 2 + (yj - yi) ** 2;
    if (l2 > 0) {
      const t = Math.max(0, Math.min(1, ((p.x - xi) * (xj - xi) + (p.y - yi) * (yj - yi)) / l2));
      const projX = xi + t * (xj - xi);
      const projY = yi + t * (yj - yi);
      if (Math.hypot(p.x - projX, p.y - projY) <= eps) {
        return false;
      }
    }
  }

  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i]!.x;
    const yi = poly[i]!.y;
    const xj = poly[j]!.x;
    const yj = poly[j]!.y;
    const intersect = yi > p.y !== yj > p.y && p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Distancia mínima de un punto al perímetro exterior de un polígono. */
export function distanceToPolygonPerimeter(p: Point, poly: Point[]): number {
  if (poly.length === 0) return 0;
  let minDist = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i]!.x;
    const yi = poly[i]!.y;
    const xj = poly[j]!.x;
    const yj = poly[j]!.y;
    const l2 = (xj - xi) ** 2 + (yj - yi) ** 2;
    if (l2 === 0) {
      minDist = Math.min(minDist, Math.hypot(p.x - xi, p.y - yi));
    } else {
      const t = Math.max(0, Math.min(1, ((p.x - xi) * (xj - xi) + (p.y - yi) * (yj - yi)) / l2));
      const projX = xi + t * (xj - xi);
      const projY = yi + t * (yj - yi);
      minDist = Math.min(minDist, Math.hypot(p.x - projX, p.y - projY));
    }
  }
  return minDist;
}

/** True si dos segmentos se cruzan en forma de X estricta (no colineales ni solo tocando extremos o esquinas). */
export function segmentsCrossStrict(a: Point, b: Point, c: Point, d: Point): boolean {
  const ccw = (p1: Point, p2: Point, p3: Point) => (p3.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p3.x - p1.x);
  const d1 = ccw(c, d, a);
  const d2 = ccw(c, d, b);
  const d3 = ccw(a, b, c);
  const d4 = ccw(a, b, d);
  return (
    ((d1 > 3.0 && d2 < -3.0) || (d1 < -3.0 && d2 > 3.0)) &&
    ((d3 > 3.0 && d4 < -3.0) || (d3 < -3.0 && d4 > 3.0))
  );
}

/** True si el segmento a-b atraviesa el interior del polígono. */
export function segmentCrossesPolygonInterior(a: Point, b: Point, poly: Point[], eps = 0.5): boolean {
  if (poly.length < 3) return false;

  const minSegX = Math.min(a.x, b.x) - eps;
  const maxSegX = Math.max(a.x, b.x) + eps;
  const minSegY = Math.min(a.y, b.y) - eps;
  const maxSegY = Math.max(a.y, b.y) + eps;

  let minPolyX = Infinity, maxPolyX = -Infinity, minPolyY = Infinity, maxPolyY = -Infinity;
  for (const p of poly) {
    if (p.x < minPolyX) minPolyX = p.x;
    if (p.x > maxPolyX) maxPolyX = p.x;
    if (p.y < minPolyY) minPolyY = p.y;
    if (p.y > maxPolyY) maxPolyY = p.y;
  }

  if (maxSegX < minPolyX || minSegX > maxPolyX || maxSegY < minPolyY || minSegY > maxPolyY) {
    return false;
  }

  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  if (pointInPolygonInterior(mid, poly, eps)) return true;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    if (segmentsCrossStrict(a, b, poly[i]!, poly[j]!)) {
      return true;
    }
  }
  return false;
}

/** True si dos polígonos se solapan en sus áreas interiores. */
export function polygonsOverlap(polyA: Point[], polyB: Point[]): boolean {
  if (polyA.length < 3 || polyB.length < 3) return false;

  // Bounding-box early exit
  let minAx = Infinity, maxAx = -Infinity, minAy = Infinity, maxAy = -Infinity;
  for (const p of polyA) {
    if (p.x < minAx) minAx = p.x;
    if (p.x > maxAx) maxAx = p.x;
    if (p.y < minAy) minAy = p.y;
    if (p.y > maxAy) maxAy = p.y;
  }
  let minBx = Infinity, maxBx = -Infinity, minBy = Infinity, maxBy = -Infinity;
  for (const p of polyB) {
    if (p.x < minBx) minBx = p.x;
    if (p.x > maxBx) maxBx = p.x;
    if (p.y < minBy) minBy = p.y;
    if (p.y > maxBy) maxBy = p.y;
  }

  if (maxAx <= minBx + 1.0 || maxBx <= minAx + 1.0 || maxAy <= minBy + 1.0 || maxBy <= minAy + 1.0) {
    return false;
  }

  const centroidA = {
    x: polyA.reduce((sum, p) => sum + p.x, 0) / polyA.length,
    y: polyA.reduce((sum, p) => sum + p.y, 0) / polyA.length,
  };
  if (pointInPolygonInterior(centroidA, polyB, 3.0)) return true;

  const centroidB = {
    x: polyB.reduce((sum, p) => sum + p.x, 0) / polyB.length,
    y: polyB.reduce((sum, p) => sum + p.y, 0) / polyB.length,
  };
  if (pointInPolygonInterior(centroidB, polyA, 3.0)) return true;

  for (let i = 0, j = polyA.length - 1; i < polyA.length; j = i++) {
    for (let k = 0, l = polyB.length - 1; k < polyB.length; l = k++) {
      if (segmentsCrossStrict(polyA[i]!, polyA[j]!, polyB[k]!, polyB[l]!)) {
        const edgeMidA = { x: (polyA[i]!.x + polyA[j]!.x) / 2, y: (polyA[i]!.y + polyA[j]!.y) / 2 };
        const edgeMidB = { x: (polyB[k]!.x + polyB[l]!.x) / 2, y: (polyB[k]!.y + polyB[l]!.y) / 2 };
        if (distance(edgeMidA, edgeMidB) > 3.0) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Rota un punto 2D respecto a un centro pivote.
 */
export function rotatePoint(p: Point, angleRad: number, pivot: Point = { x: 0, y: 0 }): Point {
  if (angleRad === 0) return p;
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  const dx = p.x - pivot.x;
  const dy = p.y - pivot.y;
  return {
    x: pivot.x + dx * cos - dy * sin,
    y: pivot.y + dx * sin + dy * cos,
  };
}

/**
 * Calcula el centroide de un polígono 2D para ubicar etiquetas o puntos clave.
 */
export function polygonCentroid(points: Point[]): Point {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0]!;
  if (points.length === 2) return { x: (points[0]!.x + points[1]!.x) / 2, y: (points[0]!.y + points[1]!.y) / 2 };

  let signedArea = 0;
  let cx = 0;
  let cy = 0;

  for (let i = 0; i < points.length; i++) {
    const p0 = points[i]!;
    const p1 = points[(i + 1) % points.length]!;
    const a = p0.x * p1.y - p1.x * p0.y;
    signedArea += a;
    cx += (p0.x + p1.x) * a;
    cy += (p0.y + p1.y) * a;
  }

  signedArea *= 0.5;
  if (Math.abs(signedArea) < 1e-6) {
    // Fallback al promedio simple si es colineal o degenerado
    const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
    return { x: sum.x / points.length, y: sum.y / points.length };
  }

  return {
    x: cx / (6 * signedArea),
    y: cy / (6 * signedArea),
  };
}

