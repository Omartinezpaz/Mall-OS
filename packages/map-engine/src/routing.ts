import { distance } from './geometry';
import type { MallMapData, NavNode, NavNodeKind } from './types';

/** Velocidad de marcha para estimar tiempo (m/s). */
export const WALK_SPEED_M_S = 1.2;
/** Coste (en metros) de cambiar de piso por escalera o ascensor. */
export const VERTICAL_COST_METERS = 15;

export interface RouteResult {
  nodeIds: string[];
  distanceUnits: number;
  /** Depende de `metersPerUnit`: solo es fiable si el plano está calibrado. */
  distanceMeters: number;
  walkingMinutes: number;
}

interface Edge {
  to: string;
  cost: number;
}

/** Aristas únicas (no dirigidas) entre nodos existentes. Útil para validar y para dibujar. */
export function listEdges(map: MallMapData): Array<[NavNode, NavNode]> {
  const byId = new Map(map.nodes.map((n) => [n.id, n] as const));
  const seen = new Set<string>();
  const out: Array<[NavNode, NavNode]> = [];
  for (const a of map.nodes) {
    for (const bId of a.connections) {
      const b = byId.get(bId);
      if (!b || b.id === a.id) continue;
      const key = a.id < b.id ? `${a.id}|${b.id}` : `${b.id}|${a.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push([a, b]);
    }
  }
  return out;
}

/** Coste de la arista a–b en unidades del plano. */
export function edgeCost(map: MallMapData, a: NavNode, b: NavNode): number {
  if (a.floorId !== b.floorId) return VERTICAL_COST_METERS / map.metersPerUnit;
  return distance(a, b);
}

function buildAdjacency(map: MallMapData): Map<string, Edge[]> {
  const adj = new Map<string, Edge[]>(map.nodes.map((n) => [n.id, []] as const));
  for (const [a, b] of listEdges(map)) {
    const cost = edgeCost(map, a, b);
    adj.get(a.id)?.push({ to: b.id, cost });
    adj.get(b.id)?.push({ to: a.id, cost });
  }
  return adj;
}

/**
 * Ruta más corta por DISTANCIA real (Dijkstra), no por número de saltos.
 * O(n²): suficiente para un mall (cientos de nodos). Si crece, cambiar por montículo.
 * Devuelve null si algún nodo no existe o no hay camino.
 */
export function findRoute(map: MallMapData, fromNodeId: string, toNodeId: string): RouteResult | null {
  const adj = buildAdjacency(map);
  if (!adj.has(fromNodeId) || !adj.has(toNodeId)) return null;

  const dist = new Map<string, number>([[fromNodeId, 0]]);
  const prev = new Map<string, string>();
  const done = new Set<string>();

  for (;;) {
    let current: string | null = null;
    let best = Infinity;
    for (const [id, d] of dist) {
      if (!done.has(id) && d < best) {
        best = d;
        current = id;
      }
    }
    if (current === null) return null;
    if (current === toNodeId) break;
    done.add(current);
    for (const edge of adj.get(current) ?? []) {
      const next = best + edge.cost;
      if (next < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, next);
        prev.set(edge.to, current);
      }
    }
  }

  const nodeIds: string[] = [toNodeId];
  let cursor = toNodeId;
  while (cursor !== fromNodeId) {
    const p = prev.get(cursor);
    if (p === undefined) return null;
    nodeIds.unshift(p);
    cursor = p;
  }

  const distanceUnits = dist.get(toNodeId) ?? 0;
  const distanceMeters = distanceUnits * map.metersPerUnit;
  return {
    nodeIds,
    distanceUnits,
    distanceMeters,
    walkingMinutes: Math.max(1, Math.ceil(distanceMeters / (WALK_SPEED_M_S * 60))),
  };
}

/** Ruta desde un nodo hasta la puerta de un local. */
export function findRouteToStore(map: MallMapData, fromNodeId: string, storeId: string): RouteResult | null {
  const store = map.stores.find((s) => s.id === storeId);
  return store ? findRoute(map, fromNodeId, store.doorNodeId) : null;
}

/** Encuentra el nodo más cercano en un piso dado, opcionalmente filtrando por tipos de nodo. */
export function findNearestNode(
  map: MallMapData,
  floorId: string,
  point: { x: number; y: number },
  kinds?: NavNodeKind[]
): NavNode | null {
  let bestNode: NavNode | null = null;
  let bestDist = Infinity;
  for (const node of map.nodes) {
    if (node.floorId !== floorId || (kinds && !kinds.includes(node.kind))) continue;
    const d = distance(node, point);
    if (d < bestDist) {
      bestDist = d;
      bestNode = node;
    }
  }
  return bestNode;
}
