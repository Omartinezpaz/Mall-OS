import { distance, distanceToRectPerimeter, pointInRectInterior, rectsOverlap, segmentCrossesRectInterior } from './geometry';
import { listEdges } from './routing';
import type { MallMapData, MapProp, Rect } from './types';

export type IssueSeverity = 'error' | 'warning';

export interface MapIssue {
  severity: IssueSeverity;
  code: string;
  message: string;
  ref?: string;
}

/** Tolerancia máxima para considerar que una puerta toca la cara del local (unidades del plano). */
const DOOR_PERIMETER_TOLERANCE = 1.0;
/** Desplazamiento horizontal máximo recomendado entre núcleos verticales conectados (escalera/ascensor). */
const MAX_VERTICAL_CORE_OFFSET = 50;

/** Huella rectangular de un detalle del plano, o null si no ocupa espacio. */
export function propRect(p: MapProp): Rect | null {
  switch (p.kind) {
    case 'tree':
      return { x: p.x - 3, y: p.y - 3, w: 6, h: 6 };
    case 'trash':
      return { x: p.x - 1.5, y: p.y - 1.5, w: 3, h: 3 };
    case 'lamp':
      return { x: p.x - 1, y: p.y - 1, w: 2, h: 2 };
    case 'bench':
    case 'planter':
    case 'lounge':
    case 'elevator':
    case 'fountain':
    case 'escalator':
      return p.rect;
    case 'glass':
    case 'railing':
      return {
        x: Math.min(p.from.x, p.to.x) - 0.5,
        y: Math.min(p.from.y, p.to.y) - 0.5,
        w: Math.abs(p.from.x - p.to.x) + 1,
        h: Math.abs(p.from.y - p.to.y) + 1,
      };
    case 'poi':
    case 'sign':
      return null;
  }
}

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const id of ids) (seen.has(id) ? dup : seen).add(id);
  return [...dup];
}

/**
 * Valida la calidad e integridad de los datos de un mapa (Map Engine Authoring Foundation).
 * Un mapa con errores bloqueantes NO debe publicarse; las advertencias indican mejoras topológicas.
 */
export function validateMapData(map: MallMapData): MapIssue[] {
  const issues: MapIssue[] = [];
  const err = (code: string, message: string, ref?: string) =>
    issues.push({ severity: 'error', code, message, ...(ref ? { ref } : {}) });
  const warn = (code: string, message: string, ref?: string) =>
    issues.push({ severity: 'warning', code, message, ...(ref ? { ref } : {}) });

  // --- Versionado del Esquema ---
  if (map.schemaVersion !== undefined && (!Number.isInteger(map.schemaVersion) || map.schemaVersion <= 0)) {
    err('INVALID_SCHEMA_VERSION', `schemaVersion debe ser un entero positivo mayor o igual a 1 (recibido: ${map.schemaVersion})`);
  }

  // --- Escala del plano ---
  if (!map.metersPerUnit || map.metersPerUnit <= 0) {
    err('INVALID_METERS_PER_UNIT', 'La escala metersPerUnit debe ser un número positivo mayor que cero');
  }

  // --- Pisos ---
  for (const id of duplicates(map.floors.map((f) => f.id))) err('DUPLICATE_ID', `Piso repetido: ${id}`, id);
  for (const id of duplicates(map.stores.map((s) => s.id))) err('DUPLICATE_ID', `Local repetido: ${id}`, id);
  for (const id of duplicates(map.nodes.map((n) => n.id))) err('DUPLICATE_ID', `Nodo repetido: ${id}`, id);

  const floors = new Map(map.floors.map((f) => [f.id, f] as const));
  const nodes = new Map(map.nodes.map((n) => [n.id, n] as const));

  for (const floor of map.floors) {
    if (!floor.width || floor.width <= 0 || !floor.height || floor.height <= 0) {
      err('INVALID_FLOOR_DIMENSIONS', `El piso "${floor.id}" tiene dimensiones inválidas (width: ${floor.width}, height: ${floor.height})`, floor.id);
    }

    // Áreas
    for (const area of floor.areas ?? []) {
      if (area.rect.w <= 0 || area.rect.h <= 0) {
        err('INVALID_AREA_DIMENSIONS', `El área "${area.id}" tiene dimensiones no positivas (w: ${area.rect.w}, h: ${area.rect.h})`, area.id);
      }
    }

    // Obstáculos
    for (const obs of floor.obstacles ?? []) {
      if (obs.rect.w <= 0 || obs.rect.h <= 0) {
        err('INVALID_OBSTACLE_DIMENSIONS', `El obstáculo "${obs.id}" tiene dimensiones no positivas (w: ${obs.rect.w}, h: ${obs.rect.h})`, obs.id);
      } else if (obs.rect.x < 0 || obs.rect.y < 0 || obs.rect.x + obs.rect.w > floor.width || obs.rect.y + obs.rect.h > floor.height) {
        err('OBSTACLE_OUT_OF_BOUNDS', `El obstáculo "${obs.id}" se sale de los límites del piso "${floor.id}"`, obs.id);
      }
    }

    // Props
    for (const p of floor.props ?? []) {
      const r = propRect(p);
      if (r) {
        if (r.w <= 0 || r.h <= 0) {
          err('INVALID_PROP_DIMENSIONS', `El elemento "${p.id}" tiene ancho o alto no positivo (w: ${r.w}, h: ${r.h})`, p.id);
        } else if (r.x < 0 || r.y < 0 || r.x + r.w > floor.width || r.y + r.h > floor.height) {
          err('PROP_OUT_OF_BOUNDS', `El elemento "${p.id}" se sale de los límites del piso "${floor.id}"`, p.id);
        }
      }
    }
  }

  // --- Locales ---
  for (const s of map.stores) {
    const floor = floors.get(s.floorId);
    if (!floor) {
      err('MISSING_FLOOR', `El local "${s.id}" apunta a un piso inexistente (${s.floorId})`, s.id);
      continue;
    }
    if (s.w <= 0 || s.h <= 0) {
      err('INVALID_STORE_DIMENSIONS', `El local "${s.id}" tiene ancho o alto no positivo (w: ${s.w}, h: ${s.h})`, s.id);
    }
    if (s.x < 0 || s.y < 0 || s.x + s.w > floor.width || s.y + s.h > floor.height) {
      err('OUT_OF_BOUNDS', `El local "${s.id}" se sale del plano`, s.id);
    }
    const door = nodes.get(s.doorNodeId);
    if (!door) {
      err('MISSING_DOOR_NODE', `El local "${s.id}" usa una puerta inexistente (${s.doorNodeId})`, s.id);
    } else {
      if (door.floorId !== s.floorId) {
        err('DOOR_WRONG_FLOOR', `La puerta de "${s.id}" está en otro piso`, s.id);
      } else if (pointInRectInterior(door, s)) {
        err('DOOR_NODE_BLOCKED', `La puerta "${door.id}" está dentro del local "${s.id}". Debe ubicarse sobre el perímetro exterior.`, s.id);
      } else {
        const perimeterDistance = distanceToRectPerimeter(door, s);
        if (perimeterDistance > DOOR_PERIMETER_TOLERANCE) {
          warn('DOOR_NOT_AT_STORE', `La puerta "${door.id}" no toca directamente ninguna cara del local "${s.id}" (distancia al perímetro: ${perimeterDistance.toFixed(2)})`, s.id);
        }
      }
    }
  }

  const byFloor = new Map<string, typeof map.stores>();
  for (const s of map.stores) byFloor.set(s.floorId, [...(byFloor.get(s.floorId) ?? []), s]);
  for (const list of byFloor.values()) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        if (a && b && rectsOverlap(a, b)) err('STORES_OVERLAP', `Los locales "${a.id}" y "${b.id}" se solapan`, a.id);
      }
    }
  }

  // --- Nodos y conexiones ---
  const obstaclesOf = (floorId: string): Array<{ id: string; rect: Rect }> => [
    ...map.stores.filter((s) => s.floorId === floorId).map((s) => ({ id: s.id, rect: s as Rect })),
    ...(floors.get(floorId)?.obstacles ?? []).map((o) => ({ id: o.id, rect: o.rect })),
    ...(floors.get(floorId)?.props ?? []).flatMap((p) => {
      const r = propRect(p);
      return r ? [{ id: p.id, rect: r }] : [];
    }),
  ];

  for (const n of map.nodes) {
    const floor = floors.get(n.floorId);
    if (!floor) {
      err('MISSING_FLOOR', `El nodo "${n.id}" apunta a un piso inexistente`, n.id);
      continue;
    }
    if (n.x < 0 || n.y < 0 || n.x > floor.width || n.y > floor.height) {
      err('NODE_OUT_OF_BOUNDS', `El nodo "${n.id}" (${n.x}, ${n.y}) está fuera de los límites del piso "${n.floorId}"`, n.id);
    }
    if (n.connections.length === 0) {
      warn('DISCONNECTED_NODE', `El nodo "${n.id}" no tiene conexiones con ningún otro nodo`, n.id);
    }
    for (const c of n.connections) {
      const other = nodes.get(c);
      if (!other) err('MISSING_NODE_REF', `El nodo "${n.id}" se conecta con un nodo inexistente (${c})`, n.id);
      else if (!other.connections.includes(n.id)) warn('ASYMMETRIC_CONNECTION', `Conexión declarada solo en un sentido: ${n.id} → ${c}`, n.id);
    }
    for (const o of obstaclesOf(n.floorId)) {
      if (pointInRectInterior(n, o.rect)) err('NODE_BLOCKED', `El nodo "${n.id}" está dentro de "${o.id}"`, n.id);
    }
  }

  for (const [a, b] of listEdges(map)) {
    if (a.floorId !== b.floorId) {
      const okKind = (k: string) => k === 'stairs' || k === 'elevator';
      if (!okKind(a.kind) || !okKind(b.kind)) {
        err('BAD_VERTICAL_LINK', `Solo escaleras o ascensores pueden unir pisos: ${a.id} ↔ ${b.id}`, a.id);
      } else if (a.kind !== b.kind) {
        err('INVALID_VERTICAL_LINK', `Incompatibilidad vertical: no se puede conectar "${a.kind}" (${a.id}) con "${b.kind}" (${b.id})`, `${a.id}|${b.id}`);
      } else {
        const offset = distance(a, b);
        if (offset > MAX_VERTICAL_CORE_OFFSET) {
          warn('VERTICAL_CORE_MISALIGNED', `El núcleo vertical ${a.id} ↔ ${b.id} tiene un desplazamiento horizontal grande (${offset.toFixed(1)} u)`, `${a.id}|${b.id}`);
        }
      }
      continue;
    }
    for (const o of obstaclesOf(a.floorId)) {
      if (segmentCrossesRectInterior(a, b, o.rect)) err('EDGE_CROSSES_OBSTACLE', `El tramo ${a.id} ↔ ${b.id} atraviesa "${o.id}"`, `${a.id}|${b.id}`);
    }
  }

  // --- Alcanzabilidad desde las entradas ---
  const entrances = map.nodes.filter((n) => n.kind === 'entrance');
  if (entrances.length === 0) {
    err('NO_ENTRANCE', 'El mapa no tiene ningún nodo de tipo "entrance"');
  } else {
    const adj = new Map<string, string[]>(map.nodes.map((n) => [n.id, [] as string[]] as const));
    for (const [a, b] of listEdges(map)) {
      adj.get(a.id)?.push(b.id);
      adj.get(b.id)?.push(a.id);
    }
    const reached = new Set<string>(entrances.map((e) => e.id));
    const queue = [...reached];
    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur === undefined) break;
      for (const nxt of adj.get(cur) ?? []) {
        if (!reached.has(nxt)) {
          reached.add(nxt);
          queue.push(nxt);
        }
      }
    }
    for (const s of map.stores) {
      if (nodes.has(s.doorNodeId) && !reached.has(s.doorNodeId)) err('STORE_UNREACHABLE', `No hay camino desde ninguna entrada hasta "${s.id}"`, s.id);
    }
    for (const n of map.nodes) {
      if (n.connections.length > 0 && !reached.has(n.id)) {
        warn('UNREACHABLE_NODE', `El nodo "${n.id}" no es alcanzable desde ninguna entrada principal`, n.id);
      }
    }
  }

  return issues;
}

/** Devuelve true si el mapa tiene al menos un error (bloqueante para publicar). */
export function hasErrors(issues: MapIssue[]): boolean {
  return issues.some((i) => i.severity === 'error');
}
