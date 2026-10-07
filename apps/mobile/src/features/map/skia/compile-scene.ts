import { Skia, type SkPath } from '@shopify/react-native-skia';
import type { Scene, SceneItem } from '@mallos/map-engine';

export interface CompiledPolygon {
  id: string;
  path: SkPath;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  storeId?: string;
}

export interface CompiledScene {
  polygons: CompiledPolygon[];
  viewBox: Scene['viewBox'];
}

/**
 * Compila la escena UNA SOLA VEZ cuando cambia la escena (no la cámara).
 * Los SkPath son inmutables en memoria GPU, así que la cámara
 * aplica transformaciones sin reconstruir paths ni generar allocations por frame.
 */
export function compileScene(scene: Scene): CompiledScene {
  const polygons: CompiledPolygon[] = [];
  let idx = 0;

  for (const item of scene.items) {
    if (item.kind !== 'polygon') continue;

    const pts = item.points;
    if (pts.length < 3) continue;

    const path = Skia.Path.Make();
    path.moveTo(pts[0]!.x, pts[0]!.y);
    for (let i = 1; i < pts.length; i++) {
      path.lineTo(pts[i]!.x, pts[i]!.y);
    }
    path.close();

    polygons.push({
      id: `poly-${idx++}`,
      path,
      fill: item.fill,
      stroke: item.stroke,
      strokeWidth: item.strokeWidth,
      opacity: item.opacity ?? 1,
      storeId: item.storeId,
    });
  }

  return { polygons, viewBox: scene.viewBox };
}
