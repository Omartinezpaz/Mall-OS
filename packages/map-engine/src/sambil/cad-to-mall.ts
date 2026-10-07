import type { MallMapData, MapFloor, MapStore, NavNode, MapArea, MapProp } from '../types';
import {
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
} from './constants';

const LEVEL_MAP: Record<string, string> = {
  autopista: LEVEL_AUTOPISTA,
  acuario: LEVEL_ACUARIO,
  libertador: LEVEL_LIBERTADOR,
  feria: LEVEL_FERIA,
  diversion: LEVEL_DIVERSION,
};

const LEVEL_NUMBERS: Record<string, number> = {
  autopista: 1,
  acuario: 2,
  libertador: 3,
  feria: 4,
  diversion: 5,
};

export interface CadExportData {
  meta?: {
    level?: string;
    levelName?: string;
    floorId?: string;
    metersPerUnit?: number;
    targetWidth?: number;
    targetHeight?: number;
    schemaVersion?: number;
  };
  footprint?: { x: number; y: number }[];
  plazas?: {
    id: string;
    label?: string;
    color?: string;
    center?: { x: number; y: number };
    radius?: number;
  }[];
  corridors?: {
    id: string;
    polygon?: { x: number; y: number }[];
  }[];
  cores?: {
    id: string;
    x: number;
    y: number;
    size?: number;
    kind: 'stairs' | 'elevator';
  }[];
  stores?: {
    id: string;
    name: string;
    category?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    height?: number;
    doorNodeId?: string;
    polygon?: { x: number; y: number }[];
    labelPos?: { x: number; y: number };
  }[];
  nodes?: {
    id: string;
    x: number;
    y: number;
    kind?: string;
    connections?: string[];
  }[];
}

/**
 * Convierte una exportación estructurada del Sambil CAD al modelo MallMapData de @mallos/map-engine
 */
export function cadToMallMap(cadExport: CadExportData, defaultLevelKey: string = 'autopista'): MallMapData {
  const levelKey = (cadExport.meta?.level || defaultLevelKey).toLowerCase();
  const floorId = cadExport.meta?.floorId || LEVEL_MAP[levelKey] || `floor-${levelKey}`;
  const levelNumber = LEVEL_NUMBERS[levelKey] || 1;
  const metersPerUnit = cadExport.meta?.metersPerUnit ?? 0.52;

  // Compilar áreas (Plazas + Pasillos)
  const areas: MapArea[] = [
    ...(cadExport.corridors || []).map((c) => ({
      id: c.id,
      kind: 'corridor' as const,
      polygon: c.polygon,
    })),
    ...(cadExport.plazas || []).map((p) => ({
      id: p.id,
      kind: 'plaza' as const,
      center: p.center,
      radius: p.radius,
      color: p.color,
      label: p.label,
    })),
  ];

  // Compilar elementos de mobiliario / props (Núcleos verticales)
  const props: MapProp[] = (cadExport.cores || []).map((c) => {
    const size = c.size || 14;
    return {
      id: c.id,
      kind: c.kind === 'elevator' ? ('elevator' as const) : ('escalator' as const),
      rect: {
        x: c.x - size / 2,
        y: c.y - size / 2,
        w: size,
        h: size,
      },
    };
  });

  const floor: MapFloor = {
    id: floorId,
    name: cadExport.meta?.levelName || `Nivel ${levelKey.charAt(0).toUpperCase() + levelKey.slice(1)}`,
    level: levelNumber,
    width: cadExport.meta?.targetWidth || 720,
    height: cadExport.meta?.targetHeight || 360,
    footprint: cadExport.footprint,
    areas,
    obstacles: [],
    props,
  };

  const stores: MapStore[] = (cadExport.stores || []).map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category || 'fashion',
    floorId,
    x: s.x,
    y: s.y,
    w: s.w,
    h: s.h,
    height: s.height ?? 12,
    doorNodeId: s.doorNodeId || `door-${s.id}`,
    polygon: s.polygon,
    labelPos: s.labelPos,
  }));

  const nodes: NavNode[] = (cadExport.nodes || []).map((n) => ({
    id: n.id,
    floorId,
    x: n.x,
    y: n.y,
    kind: n.kind === 'door' ? 'door' : (n.kind === 'stairs' ? 'stairs' : (n.kind === 'elevator' ? 'elevator' : 'corridor')),
    connections: n.connections ?? [],
  }));

  return {
    schemaVersion: 1,
    mallSlug: 'sambil-chacao',
    metersPerUnit,
    floors: [floor],
    stores,
    nodes,
  };
}
