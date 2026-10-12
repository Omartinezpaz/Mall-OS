import { Skia, type SkPath } from '@shopify/react-native-skia';
import type {
  FlatScene,
  FlatCorridor,
  FlatStore,
  FlatPlaza,
  FlatZone,
  FlatRoute,
  FlatUserPin,
  FlatVisionCone,
  FlatUserTrail,
  FlatDestinationPin,
  FlatLabel,
  FlatOfferBadge,
  FlatProp,
  FlatPoi,
  FlatPedestrian,
  Point,
  Rect,
} from '@mallos/map-engine';
import { extrudeFlatPolygon } from '@mallos/map-engine';

export interface CompiledFlatCorridor {
  id: string;
  path: SkPath;
  fill: string;
}

export interface CompiledExtrudedWall {
  path: SkPath;
  fill: string;
  stroke: string;
}

export interface CompiledFlatStore {
  id: string;
  path: SkPath;
  roofPath: SkPath;
  walls: CompiledExtrudedWall[];
  fill: string;
  stroke: string;
  isDestination: boolean;
  isVisible: boolean;
}

export interface CompiledFlatZone {
  id: string;
  label: string;
  path: SkPath;
  color: string;
  cardinal?: 'north' | 'south' | 'east' | 'west' | 'center';
}

export interface CompiledFlatRoute {
  fullPath: SkPath | null;
  immediatePath: SkPath | null;
  remainingPath: SkPath | null;
  points: Point[];
  chevrons: Array<{
    path: SkPath;
    isImmediate: boolean;
  }>;
}

export interface CompiledFlatVisionCone {
  path: SkPath;
  opacity: number;
}

export interface CompiledFlatUserTrailSegment {
  path: SkPath;
  opacity: number;
}

export interface CompiledFlatScene {
  footprintPath: SkPath | null;
  corridors: CompiledFlatCorridor[];
  zones: CompiledFlatZone[];
  stores: CompiledFlatStore[];
  plazas: FlatPlaza[];
  props: FlatProp[];
  pois: FlatPoi[];
  pedestrians: FlatPedestrian[];
  routes: CompiledFlatRoute[];
  visionCones: CompiledFlatVisionCone[];
  userTrails: CompiledFlatUserTrailSegment[][];
  userPins: FlatUserPin[];
  destinationPins: FlatDestinationPin[];
  labels: FlatLabel[];
  offerBadges: FlatOfferBadge[];
  viewBox: Rect;
  meta: FlatScene['meta'];
}

function pointsToSkPath(pts: Point[], close = true): SkPath | null {
  if (pts.length < 2) return null;
  const path = Skia.Path.Make();
  path.moveTo(pts[0]!.x, pts[0]!.y);
  for (let i = 1; i < pts.length; i++) {
    path.lineTo(pts[i]!.x, pts[i]!.y);
  }
  if (close) {
    path.close();
  }
  return path;
}

function makeChevronPath(x: number, y: number, angle: number, size = 6.2): SkPath {
  const path = Skia.Path.Make();
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Vértice frontal (punta ancha del chevron hacia adelante)
  const tipX = x + cos * (size * 0.95);
  const tipY = y + sin * (size * 0.95);

  // Ala izquierda (retrocedida y extendida lateralmente por el pasillo)
  const leftX = x - cos * (size * 0.65) - sin * (size * 0.85);
  const leftY = y - sin * (size * 0.65) + cos * (size * 0.85);

  // Muesca central interior
  const notchX = x - cos * (size * 0.15);
  const notchY = y - sin * (size * 0.15);

  // Ala derecha (retrocedida y extendida lateralmente por el pasillo)
  const rightX = x - cos * (size * 0.65) + sin * (size * 0.85);
  const rightY = y - sin * (size * 0.65) - cos * (size * 0.85);

  path.moveTo(tipX, tipY);
  path.lineTo(leftX, leftY);
  path.lineTo(notchX, notchY);
  path.lineTo(rightX, rightY);
  path.close();
  return path;
}

/**
 * Compila una FlatScene a primitivas Skia 2D inmutables en memoria GPU.
 * Se ejecuta una sola vez cuando cambian los datos o filtros de la escena.
 */
export function compileFlatScene(scene: FlatScene): CompiledFlatScene {
  const corridors: CompiledFlatCorridor[] = [];
  const zones: CompiledFlatZone[] = [];
  const stores: CompiledFlatStore[] = [];
  const plazas: FlatPlaza[] = [];
  const props: FlatProp[] = [];
  const pois: FlatPoi[] = [];
  const pedestrians: FlatPedestrian[] = [];
  const routes: CompiledFlatRoute[] = [];
  const visionCones: CompiledFlatVisionCone[] = [];
  const userTrails: CompiledFlatUserTrailSegment[][] = [];
  const userPins: FlatUserPin[] = [];
  const destinationPins: FlatDestinationPin[] = [];
  const labels: FlatLabel[] = [];
  const offerBadges: FlatOfferBadge[] = [];

  for (const item of scene.items) {
    switch (item.kind) {
      case 'corridor': {
        const path = pointsToSkPath(item.points, true);
        if (path) {
          corridors.push({ id: item.id, path, fill: item.fill });
        }
        break;
      }
      case 'zone': {
        const path = pointsToSkPath(item.points, true);
        if (path) {
          zones.push({
            id: item.id,
            label: item.label,
            path,
            color: item.color,
            cardinal: item.cardinal,
          });
        }
        break;
      }
      case 'store': {
        const path = pointsToSkPath(item.points, true);
        if (path) {
          const extruded = extrudeFlatPolygon(item.points, { height: 4.2 });
          const roofPath = pointsToSkPath(extruded.roof, true) ?? path;
          const compiledWalls: CompiledExtrudedWall[] = [];

          for (const wall of extruded.walls) {
            const wallPath = pointsToSkPath(wall.points, true);
            if (wallPath) {
              let wallFill = '#94A3B8';
              let wallStroke = '#64748B';

              if (item.isDestination) {
                // Tienda destino: caras extruidas iluminadas con gradación zafiro
                if (wall.faceType === 'south') {
                  wallFill = '#1E40AF';
                  wallStroke = '#1E3A8A';
                } else if (wall.faceType === 'east') {
                  wallFill = '#2563EB';
                  wallStroke = '#1D4ED8';
                } else {
                  wallFill = '#3B82F6';
                  wallStroke = '#2563EB';
                }
              } else {
                // Tienda regular: paredes arquitectónicas sombreadas según orientación
                if (wall.faceType === 'south') {
                  // Cara frontal orientada al pasillo / sur (sombra marcada como en la captura)
                  wallFill = '#64748B';
                  wallStroke = '#475569';
                } else if (wall.faceType === 'east') {
                  // Cara lateral derecha
                  wallFill = '#94A3B8';
                  wallStroke = '#64748B';
                } else {
                  // Cara lateral izquierda
                  wallFill = '#CBD5E1';
                  wallStroke = '#94A3B8';
                }
              }

              compiledWalls.push({
                path: wallPath,
                fill: wallFill,
                stroke: wallStroke,
              });
            }
          }

          stores.push({
            id: item.id,
            path,
            roofPath,
            walls: compiledWalls,
            fill: item.fill,
            stroke: item.stroke,
            isDestination: item.isDestination,
            isVisible: item.isVisible,
          });
        }
        break;
      }
      case 'plaza': {
        plazas.push(item);
        break;
      }
      case 'prop': {
        props.push(item);
        break;
      }
      case 'poi': {
        pois.push(item);
        break;
      }
      case 'pedestrian': {
        pedestrians.push(item);
        break;
      }
      case 'route': {
        const immPts = item.points.slice(0, item.immediatePointCount);
        const remPts = item.points.slice(Math.max(0, item.immediatePointCount - 1));
        const fullPath = pointsToSkPath(item.points, false);
        const immPath = pointsToSkPath(immPts, false);
        const remPath = pointsToSkPath(remPts, false);

        const compiledChevrons: Array<{ path: SkPath; isImmediate: boolean }> = [];
        if (item.chevrons) {
          for (const ch of item.chevrons) {
            const cp = makeChevronPath(ch.x, ch.y, ch.angle, 3.8);
            compiledChevrons.push({
              path: cp,
              isImmediate: ch.isImmediate,
            });
          }
        }

        routes.push({
          fullPath,
          immediatePath: immPath,
          remainingPath: remPath,
          points: item.points,
          chevrons: compiledChevrons,
        });
        break;
      }
      case 'visionCone': {
        const p = Skia.Path.Make();
        p.moveTo(item.apex.x, item.apex.y);
        for (const pt of item.arc) {
          p.lineTo(pt.x, pt.y);
        }
        p.close();
        visionCones.push({ path: p, opacity: item.opacity });
        break;
      }
      case 'userTrail': {
        const segs: CompiledFlatUserTrailSegment[] = [];
        for (const seg of item.segments) {
          const sp = pointsToSkPath(seg.points, false);
          if (sp) {
            segs.push({ path: sp, opacity: seg.opacity });
          }
        }
        if (segs.length > 0) {
          userTrails.push(segs);
        }
        break;
      }
      case 'userPin': {
        userPins.push(item);
        break;
      }
      case 'destinationPin': {
        destinationPins.push(item);
        break;
      }
      case 'label': {
        labels.push(item);
        break;
      }
      case 'offerBadge': {
        offerBadges.push(item);
        break;
      }
    }
  }

  const footprintPath = scene.footprint ? pointsToSkPath(scene.footprint, true) : null;

  return {
    footprintPath,
    corridors,
    zones,
    stores,
    plazas,
    props,
    pois,
    pedestrians,
    routes,
    visionCones,
    userTrails,
    userPins,
    destinationPins,
    labels,
    offerBadges,
    viewBox: scene.viewBox,
    meta: scene.meta,
  };
}

