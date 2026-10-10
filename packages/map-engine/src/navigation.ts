import type { MallMapData, NavNode, MapFloor, CardinalDirection } from './types';
import type { RouteResult } from './routing';
import { distance } from './geometry';

export type NavInstructionIcon =
  | 'straight'
  | 'turn-left'
  | 'turn-right'
  | 'slight-left'
  | 'slight-right'
  | 'stairs-up'
  | 'stairs-down'
  | 'elevator-up'
  | 'elevator-down'
  | 'arrival';

export interface NavStepInstruction {
  index: number;
  icon: NavInstructionIcon;
  primaryText: string;
  secondaryText: string;
  distanceMeters: number;
  floorId: string;
  targetNodeId: string;
  landmark?: string;
  cardinalDirection?: CardinalDirection;
}

export interface NavigationPlan {
  steps: NavStepInstruction[];
  totalDistanceMeters: number;
  walkingMinutes: number;
  destinationName: string;
  destinationFloorName: string;
}

const CARDINAL_NAMES: Record<number, { name: string; dir: CardinalDirection }> = {
  0: { name: 'este', dir: 'east' },
  1: { name: 'sureste', dir: 'southeast' },
  2: { name: 'sur', dir: 'south' },
  3: { name: 'suroeste', dir: 'southwest' },
  4: { name: 'oeste', dir: 'west' },
  5: { name: 'noroeste', dir: 'northwest' },
  6: { name: 'norte', dir: 'north' },
  7: { name: 'noreste', dir: 'northeast' },
};

/**
 * Obtiene el nombre y dirección cardinal ajustados al norte arquitectónico del piso.
 * @param movementAngleRad Ángulo de movimiento en el plano (Math.atan2(dy, dx))
 * @param northAngleRad Ángulo hacia donde apunta el norte del plano (ej. -2.356 rad)
 */
export function getCardinalDirection(
  movementAngleRad: number,
  northAngleRad: number = 0
): { name: string; cardinal: CardinalDirection } {
  const relativeAngle = movementAngleRad - northAngleRad;
  const normalized = ((relativeAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const octant = Math.round(normalized / (Math.PI / 4)) % 8;
  return {
    name: CARDINAL_NAMES[octant]?.name ?? 'norte',
    cardinal: CARDINAL_NAMES[octant]?.dir ?? 'north',
  };
}

export function getCardinalDirectionName(movementAngleRad: number, northAngleRad: number = 0): string {
  return getCardinalDirection(movementAngleRad, northAngleRad).name;
}

const LANDMARK_NAMES: Record<string, string> = {
  pj: 'Plaza Jardín',
  plf: 'Plaza La Fuente',
  pc: 'Plaza Central',
  pea: 'Plaza El Arte',
  plm: 'Plaza Música',
  cn: 'Galería Norte',
  cs: 'Pasillo Sur',
  cw: 'Corredor Oeste',
  ce: 'Corredor Este',
  cb: 'Pasillo Central',
  ca: 'Pasillo Superior',
};

function getLandmarkName(nodeId: string): string | undefined {
  const prefix = nodeId.split('-')[0];
  if (prefix && LANDMARK_NAMES[prefix]) {
    return LANDMARK_NAMES[prefix];
  }
  return undefined;
}

function getFloorLevel(floor: MapFloor | undefined): number {
  if (!floor) return 1;
  return typeof floor.level === 'number' ? floor.level : 1;
}

/**
 * Genera la secuencia estructurada de instrucciones giro a giro e hitos semánticos
 * para guiar al usuario paso a paso con máxima inmersión.
 */
export interface NavigationPlanOptions {
  accessibleOnly?: boolean;
}

export function generateNavigationPlan(
  mall: MallMapData,
  route: RouteResult,
  targetStoreId?: string,
  options?: NavigationPlanOptions
): NavigationPlan {
  const nodeMap = new Map<string, NavNode>(mall.nodes.map((n) => [n.id, n]));
  const floorMap = new Map<string, MapFloor>(mall.floors.map((f) => [f.id, f]));
  const targetStore = targetStoreId
    ? mall.stores.find(
        (s) =>
          s.id === targetStoreId ||
          s.slug === targetStoreId ||
          s.aliases?.includes(targetStoreId)
      )
    : undefined;


  const destinationName = targetStore?.name ?? 'Destino';
  const destinationFloor = targetStore
    ? floorMap.get(targetStore.floorId)?.name ?? 'Nivel Comercial'
    : 'Nivel Comercial';

  const routeNodes: NavNode[] = route.nodeIds
    .map((id) => nodeMap.get(id))
    .filter((n): n is NavNode => n !== undefined);

  if (routeNodes.length === 0) {
    return {
      steps: [],
      totalDistanceMeters: Math.round(route.distanceMeters),
      walkingMinutes: route.walkingMinutes,
      destinationName,
      destinationFloorName: destinationFloor,
    };
  }

  const rawSteps: NavStepInstruction[] = [];

  for (let i = 0; i < routeNodes.length; i++) {
    const curr = routeNodes[i]!;
    const next = routeNodes[i + 1];
    const prev = routeNodes[i - 1];

    if (!next) {
      // Último nodo (Llegada)
      rawSteps.push({
        index: rawSteps.length,
        icon: 'arrival',
        primaryText: `Llegada a ${destinationName}`,
        secondaryText: `Tu destino está en frente · ${destinationFloor}`,
        distanceMeters: 0,
        floorId: curr.floorId,
        targetNodeId: curr.id,
        landmark: getLandmarkName(curr.id),
      });
      break;
    }

    const stepDistMeters = Math.round(distance(curr, next) * mall.metersPerUnit);
    const currFloor = floorMap.get(curr.floorId);
    const nextFloor = floorMap.get(next.floorId);
    const currLevel = getFloorLevel(currFloor);
    const nextLevel = getFloorLevel(nextFloor);

    // Transición Vertical (Escaleras o Ascensor)
    if (curr.floorId !== next.floorId || curr.kind === 'stairs' || curr.kind === 'elevator') {
      const isUp = nextLevel > currLevel;
      const isElevator = curr.kind === 'elevator' || next.kind === 'elevator';
      const isAccessible = options?.accessibleOnly || isElevator;
      const icon: NavInstructionIcon = isAccessible
        ? isUp ? 'elevator-up' : 'elevator-down'
        : isUp ? 'stairs-up' : 'stairs-down';

      const targetFloorName = nextFloor?.name ?? `Nivel ${nextLevel}`;
      const lm = getLandmarkName(curr.id) ?? getLandmarkName(next.id) ?? 'Núcleo Central';

      rawSteps.push({
        index: rawSteps.length,
        icon,
        primaryText: isUp
          ? `Sube al ${targetFloorName}`
          : `Baja al ${targetFloorName}`,
        secondaryText: `Por ${isAccessible ? 'ascensor panorámico accesible' : 'escaleras mecánicas'} en ${lm}`,
        distanceMeters: Math.max(stepDistMeters, 15),
        floorId: curr.floorId,
        targetNodeId: next.id,
        landmark: lm,
      });
      continue;
    }

    // Cálculo de Giro 2D
    let icon: NavInstructionIcon = 'straight';
    let turnAction = 'Sigue recto';

    if (prev && prev.floorId === curr.floorId) {
      const v1x = curr.x - prev.x;
      const v1y = curr.y - prev.y;
      const v2x = next.x - curr.x;
      const v2y = next.y - curr.y;

      const cross = v1x * v2y - v1y * v2x;
      const dot = v1x * v2x + v1y * v2y;
      const angle = (Math.atan2(cross, dot) * 180) / Math.PI;

      if (angle > 65) {
        icon = 'turn-right';
        turnAction = 'Gira a la derecha';
      } else if (angle >= 25) {
        icon = 'slight-right';
        turnAction = 'Gira suavemente a la derecha';
      } else if (angle < -65) {
        icon = 'turn-left';
        turnAction = 'Gira a la izquierda';
      } else if (angle <= -25) {
        icon = 'slight-left';
        turnAction = 'Gira suavemente a la izquierda';
      }
    }

    const landmark = getLandmarkName(next.id) ?? getLandmarkName(curr.id);
    const landmarkText = landmark ? `hacia ${landmark}` : 'por el corredor';
    const moveAngle = Math.atan2(next.y - curr.y, next.x - curr.x);
    const { cardinal } = getCardinalDirection(moveAngle, currFloor?.orientation?.northAngle ?? 0);

    rawSteps.push({
      index: rawSteps.length,
      icon,
      primaryText: `${turnAction} ${landmarkText}`,
      secondaryText: `${stepDistMeters} metros restantes en este tramo`,
      distanceMeters: stepDistMeters,
      floorId: curr.floorId,
      targetNodeId: next.id,
      landmark,
      cardinalDirection: cardinal,
    });
  }


  // Agrupamos pasos continuos idénticos para no saturar al usuario
  const consolidatedSteps: NavStepInstruction[] = [];
  for (let i = 0; i < rawSteps.length; i++) {
    const current = rawSteps[i]!;
    const prev = consolidatedSteps[consolidatedSteps.length - 1];

    if (
      prev &&
      prev.icon === 'straight' &&
      current.icon === 'straight' &&
      prev.floorId === current.floorId &&
      current.landmark === prev.landmark
    ) {
      prev.distanceMeters += current.distanceMeters;
      prev.secondaryText = `${prev.distanceMeters} metros restantes en este tramo`;
      prev.targetNodeId = current.targetNodeId;
    } else {
      current.index = consolidatedSteps.length;
      consolidatedSteps.push(current);
    }
  }

  return {
    steps: consolidatedSteps,
    totalDistanceMeters: Math.round(route.distanceMeters),
    walkingMinutes: route.walkingMinutes,
    destinationName,
    destinationFloorName: destinationFloor,
  };
}
