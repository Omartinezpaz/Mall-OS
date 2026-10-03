/** Utilidades de trazado en espacio de pantalla (para la cinta de ruta). */
import type { Point } from './types';

/**
 * Suaviza una polilínea redondeando sus esquinas (corte de esquinas de Chaikin).
 * Conserva el primer y el último punto. Cada iteración duplica aprox. los puntos.
 */
export function smoothPolyline(points: Point[], iterations = 2): Point[] {
  let pts = points;
  for (let it = 0; it < iterations; it++) {
    if (pts.length < 3) return pts;
    const out: Point[] = [pts[0] as Point];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i] as Point;
      const b = pts[i + 1] as Point;
      out.push({ x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y });
      out.push({ x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y });
    }
    out.push(pts[pts.length - 1] as Point);
    pts = out;
  }
  return pts;
}

export interface PathSample {
  x: number;
  y: number;
  /** Ángulo de la tangente en radianes (0 = hacia +x de pantalla). */
  angle: number;
}

/** Longitud total de una polilínea. */
export function polylineLength(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1] as Point;
    const b = points[i] as Point;
    total += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return total;
}

/**
 * Toma muestras a distancia regular a lo largo de la polilínea.
 * `phase` (0..1) desplaza el inicio una fracción de `spacing`: variándolo en el tiempo
 * se animan las flechas de dirección.
 */
export function samplePolyline(points: Point[], spacing: number, phase = 0): PathSample[] {
  const out: PathSample[] = [];
  if (points.length < 2 || spacing <= 0) return out;
  const wrapped = ((phase % 1) + 1) % 1;
  let target = wrapped * spacing;
  let walked = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1] as Point;
    const b = points[i] as Point;
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len === 0) continue;
    const angle = Math.atan2(b.y - a.y, b.x - a.x);
    while (target <= walked + len) {
      const t = (target - walked) / len;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, angle });
      target += spacing;
    }
    walked += len;
  }
  return out;
}
