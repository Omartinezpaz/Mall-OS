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
