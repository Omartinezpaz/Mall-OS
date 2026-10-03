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
