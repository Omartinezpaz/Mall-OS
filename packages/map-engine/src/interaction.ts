/**
 * Matemática de interacción del mapa (pura, sin React): encuadre, cámara, toques, recorrido.
 * Convención: el <Svg> ocupa todo el contenedor con su viewBox y alineación centrada ("meet").
 * La cámara se aplica sobre ese lienzo con la misma semántica que un `transform` de React Native:
 *   pantalla = centro + zoom * (base - centro) + (tx, ty)      [la traslación NO se escala]
 */
import { DEFAULT_ISO, project, type IsoOptions } from './isometric';
import type { Scene } from './scene';
import type { MallMapData, Point } from './types';

export interface ViewBox { x: number; y: number; w: number; h: number }
export interface Fit { W: number; H: number; scale: number; cx: number; cy: number }
export interface Camera { zoom: number; tx: number; ty: number }

/** Cómo encaja el viewBox del mapa en un contenedor de W×H píxeles (escala UNIFORME, centrado). */
export function computeFit(vb: ViewBox, W: number, H: number): Fit {
  return { W, H, scale: Math.min(W / vb.w, H / vb.h), cx: vb.x + vb.w / 2, cy: vb.y + vb.h / 2 };
}

/** Posición en pantalla, sin cámara, de un punto en coordenadas del viewBox. */
export function baseScreen(p: Point, fit: Fit): Point {
  return { x: fit.W / 2 + (p.x - fit.cx) * fit.scale, y: fit.H / 2 + (p.y - fit.cy) * fit.scale };
}

export function svgToScreen(p: Point, fit: Fit, cam: Camera): Point {
  const b = baseScreen(p, fit);
  return { x: fit.W / 2 + cam.zoom * (b.x - fit.W / 2) + cam.tx, y: fit.H / 2 + cam.zoom * (b.y - fit.H / 2) + cam.ty };
}

/** Inversa de `svgToScreen`: de un toque en pantalla a coordenadas del viewBox. */
export function screenToSvg(pt: Point, fit: Fit, cam: Camera): Point {
  const bx = fit.W / 2 + (pt.x - fit.W / 2 - cam.tx) / cam.zoom;
  const by = fit.H / 2 + (pt.y - fit.H / 2 - cam.ty) / cam.zoom;
  return { x: fit.cx + (bx - fit.W / 2) / fit.scale, y: fit.cy + (by - fit.H / 2) / fit.scale };
}

/** Cámara que deja el punto `p` (coordenadas del viewBox) en el centro de la pantalla. */
export function cameraCentering(p: Point, fit: Fit, zoom: number): Camera {
  const b = baseScreen(p, fit);
  return { zoom, tx: -zoom * (b.x - fit.W / 2), ty: -zoom * (b.y - fit.H / 2) };
}

/** Cambia el zoom manteniendo fijo el punto del mapa que está bajo `anchor` (pantalla). Sirve para el pellizco. */
export function zoomAround(cam: Camera, anchor: Point, newZoom: number, fit: Fit): Camera {
  const k = newZoom / cam.zoom;
  const ax = anchor.x - fit.W / 2;
  const ay = anchor.y - fit.H / 2;
  return { zoom: newZoom, tx: ax - k * (ax - cam.tx), ty: ay - k * (ay - cam.ty) };
}

function pointInPolygon(p: Point, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i] as Point;
    const b = poly[j] as Point;
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/**
 * Qué local hay bajo un punto (coordenadas del viewBox). Recorre la escena de adelante hacia atrás,
 * así que gana el local dibujado encima. Es independiente de la plataforma: no usa onPress nativo.
 */
export function pickStoreAt(scene: Scene, p: Point): string | null {
  for (let i = scene.items.length - 1; i >= 0; i--) {
    const it = scene.items[i];
    if (it && it.kind === 'polygon' && it.storeId && pointInPolygon(p, it.points)) return it.storeId;
  }
  return null;
}

export interface WalkTrack {
  /** Progreso normalizado (0..1) en cada vértice, por distancia recorrida en el plano. */
  inputRange: number[];
  /** Vértices en coordenadas del viewBox. */
  xs: number[];
  ys: number[];
  totalUnits: number;
  /** Depende de `metersPerUnit`: fiable solo con el plano calibrado. */
  totalMeters: number;
}

/**
 * Convierte una ruta (ids de nodos) en un recorrido animable. Solo usa los nodos del piso indicado
 * y descarta vértices repetidos. Devuelve null si no hay al menos dos puntos distintos.
 */
export function buildWalkTrack(map: MallMapData, nodeIds: string[], floorId: string, iso: IsoOptions = DEFAULT_ISO, z = 1.5): WalkTrack | null {
  const byId = new Map(map.nodes.map((n) => [n.id, n] as const));
  const plane: Point[] = [];
  for (const id of nodeIds) {
    const n = byId.get(id);
    if (!n || n.floorId !== floorId) continue;
    const last = plane[plane.length - 1];
    if (last && Math.hypot(n.x - last.x, n.y - last.y) < 1e-6) continue;
    plane.push({ x: n.x, y: n.y });
  }
  if (plane.length < 2) return null;
  const cum: number[] = [0];
  for (let i = 1; i < plane.length; i++) {
    const a = plane[i - 1] as Point;
    const b = plane[i] as Point;
    cum.push((cum[i - 1] as number) + Math.hypot(b.x - a.x, b.y - a.y));
  }
  const total = cum[cum.length - 1] as number;
  const pts = plane.map((p) => project(p.x, p.y, z, iso));
  return { inputRange: cum.map((c) => c / total), xs: pts.map((p) => p.x), ys: pts.map((p) => p.y), totalUnits: total, totalMeters: total * map.metersPerUnit };
}

/** Punto (viewBox) del recorrido para un progreso 0..1. */
export function pointAtProgress(t: WalkTrack, v: number): Point {
  const c = Math.min(1, Math.max(0, v));
  for (let i = 1; i < t.inputRange.length; i++) {
    const a = t.inputRange[i - 1] as number;
    const b = t.inputRange[i] as number;
    if (c <= b) {
      const f = b === a ? 0 : (c - a) / (b - a);
      const x0 = t.xs[i - 1] as number, x1 = t.xs[i] as number, y0 = t.ys[i - 1] as number, y1 = t.ys[i] as number;
      return { x: x0 + (x1 - x0) * f, y: y0 + (y1 - y0) * f };
    }
  }
  return { x: t.xs[t.xs.length - 1] as number, y: t.ys[t.ys.length - 1] as number };
}

/** Duración de un recorrido a velocidad de marcha (1.2 m/s por defecto) por un multiplicador de velocidad. */
export function walkDurationMs(meters: number, speedMultiplier = 1, speedMps = 1.2): number {
  return (meters / (speedMps * speedMultiplier)) * 1000;
}

// ============================================================================
// Cámara fluida para renderizado en tiempo real (Nivel 2 - Mapa Vivo)
// ============================================================================

export interface SmoothCameraOptions {
  current: Camera;
  target: Point;
  fit: Fit;
  zoom: number;
  /** Delta time en segundos. El caller DEBE clampearlo a [1/240, 1/20]. */
  dt: number;
  /** Rigidez del resorte (mayor = más rápido). Default 8. */
  stiffness?: number;
}

/**
 * Interpolación exponencial estable a dt variable.
 * Convergencia independiente del frame rate.
 */
export function cameraFollowSmooth(opts: SmoothCameraOptions): Camera {
  const desired = cameraCentering(opts.target, opts.fit, opts.zoom);
  const stiffness = opts.stiffness ?? 8;
  const alpha = 1 - Math.exp(-stiffness * opts.dt);

  return {
    zoom: opts.current.zoom + (desired.zoom - opts.current.zoom) * alpha,
    tx: opts.current.tx + (desired.tx - opts.current.tx) * alpha,
    ty: opts.current.ty + (desired.ty - opts.current.ty) * alpha,
  };
}

export interface SpringCameraState {
  camera: Camera;
  velocity: { tx: number; ty: number; zoom: number };
}

/**
 * Resorte crítico amortiguado con integrador semi-implícito.
 * Reservado para Fase 2 (overshoot físico al cambiar destino).
 */
export function cameraSpringTo(
  state: SpringCameraState,
  target: Point,
  fit: Fit,
  zoom: number,
  dt: number,
  damping = 15,
  stiffness = 90
): SpringCameraState {
  const desired = cameraCentering(target, fit, zoom);
  const { camera, velocity } = state;

  const accelTx = -stiffness * (camera.tx - desired.tx) - damping * velocity.tx;
  const accelTy = -stiffness * (camera.ty - desired.ty) - damping * velocity.ty;
  const accelZoom = -stiffness * (camera.zoom - desired.zoom) - damping * velocity.zoom;

  const newVelTx = velocity.tx + accelTx * dt;
  const newVelTy = velocity.ty + accelTy * dt;
  const newVelZoom = velocity.zoom + accelZoom * dt;

  return {
    camera: {
      tx: camera.tx + newVelTx * dt,
      ty: camera.ty + newVelTy * dt,
      zoom: camera.zoom + newVelZoom * dt,
    },
    velocity: { tx: newVelTx, ty: newVelTy, zoom: newVelZoom },
  };
}
