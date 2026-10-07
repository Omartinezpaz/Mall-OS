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
  Point,
  Rect,
} from '@mallos/map-engine';

export interface CompiledFlatCorridor {
  id: string;
  path: SkPath;
  fill: string;
}

export interface CompiledFlatStore {
  id: string;
  path: SkPath;
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
  immediatePath: SkPath | null;
  remainingPath: SkPath | null;
  points: Point[];
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
  corridors: CompiledFlatCorridor[];
  zones: CompiledFlatZone[];
  stores: CompiledFlatStore[];
  plazas: FlatPlaza[];
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

/**
 * Compila una FlatScene a primitivas Skia 2D inmutables en memoria GPU.
 * Se ejecuta una sola vez cuando cambian los datos o filtros de la escena.
 */
export function compileFlatScene(scene: FlatScene): CompiledFlatScene {
  const corridors: CompiledFlatCorridor[] = [];
  const zones: CompiledFlatZone[] = [];
  const stores: CompiledFlatStore[] = [];
  const plazas: FlatPlaza[] = [];
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
          stores.push({
            id: item.id,
            path,
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
      case 'route': {
        const immPts = item.points.slice(0, item.immediatePointCount);
        const remPts = item.points.slice(Math.max(0, item.immediatePointCount - 1));
        routes.push({
          immediatePath: pointsToSkPath(immPts, false),
          remainingPath: pointsToSkPath(remPts, false),
          points: item.points,
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

  return {
    corridors,
    zones,
    stores,
    plazas,
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

