/**
 * Modelo de datos del mapa. Es lo ÚNICO que cambia por mall.
 * Separa "la tienda real" (base de datos) de "su geometría en el plano" (aquí).
 * `MapStore.id` debe coincidir con el `slug` del local en la tabla `stores`.
 */

export interface Point {
  x: number;
  y: number;
}

/** Rectángulo en unidades del plano (no en píxeles). */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type NavNodeKind = 'corridor' | 'door' | 'entrance' | 'stairs' | 'elevator';

/** Punto del grafo de navegación. Las conexiones se interpretan como NO dirigidas. */
export interface NavNode extends Point {
  id: string;
  floorId: string;
  kind: NavNodeKind;
  connections: string[];
}

/** Local dibujado en el plano. `height` es solo visual (altura de la caja isométrica). */
export interface MapStore extends Rect {
  id: string;
  name: string;
  /** Clave de categoría (ej. 'food'); la paleta se inyecta al renderizar. */
  category: string;
  floorId: string;
  height: number;
  /** Nodo del grafo por donde se entra al local. Debe tocar el borde del local. */
  doorNodeId: string;
  /** Polígono 2D opcional para locales con forma irregular o chaflanes (en coordenadas del plano). */
  polygon?: Point[];
  /** Posición personalizada para el centro de etiqueta. */
  labelPos?: Point;
}

export type AreaKind = 'corridor' | 'plaza' | 'entrance';

export interface MapArea {
  id: string;
  kind: AreaKind;
  rect?: Rect;
  /** Polígono opcional para áreas orgánicas */
  polygon?: Point[];
  /** Centro para plazas circulares */
  center?: Point;
  /** Radio para plazas circulares */
  radius?: number;
  /** Color temático distintivo (ej. plazas de Sambil: rojo, azul, naranja, morado) */
  color?: string;
  /** Nombre o etiqueta visible */
  label?: string;
}

export type ObstacleKind = 'fountain' | 'column' | 'planter';

/** Objeto no transitable que no es un local (fuente, columna, jardinera). */
export interface MapObstacle {
  id: string;
  kind: ObstacleKind;
  rect: Rect;
}

export type PoiKind = 'info' | 'wc' | 'atm' | 'stairs' | 'elevator';

/**
 * Detalles del plano y mobiliario del mall (acabado visual 2.5D).
 * Salvo 'poi' y 'sign', todos ocupan espacio para validación de rutas.
 */
export type MapProp =
  | { id: string; kind: 'tree'; x: number; y: number }
  | { id: string; kind: 'bench' | 'planter' | 'lounge'; rect: Rect }
  | { id: string; kind: 'trash' | 'lamp'; x: number; y: number }
  | { id: string; kind: 'railing'; from: Point; to: Point; height?: number }
  | { id: string; kind: 'elevator'; rect: Rect; height?: number }
  | { id: string; kind: 'fountain'; rect: Rect }
  | { id: string; kind: 'sign'; x: number; y: number; text: string; direction?: 'left' | 'right' | 'up' | 'down' }
  /** `flow`: extremo del eje largo hacia el que se mueven los peldaños ('min' = coordenada menor, 'max' = mayor). */
  | { id: string; kind: 'escalator'; rect: Rect; flow?: 'min' | 'max' }
  | { id: string; kind: 'glass'; from: Point; to: Point }
  /** Insignia flotante (baños, información, cajero…). No ocupa espacio. */
  | { id: string; kind: 'poi'; poi: PoiKind; x: number; y: number; z?: number };

export interface MapFloor {
  id: string;
  name: string;
  level: number;
  width: number;
  height: number;
  /** Contorno perimetral real del piso (ej. herradura / silueta curva del centro comercial). */
  footprint?: Point[];
  areas: MapArea[];
  obstacles: MapObstacle[];
  /** Árboles, bancas, jardineras, escaleras mecánicas, vidrios e insignias. Opcional. */
  props?: MapProp[];
}

export interface MallMapData {
  /** Versión del esquema del modelo de mapa (por defecto 1). */
  schemaVersion?: number;
  mallSlug: string;
  /** Escala real del plano: metros por unidad. Debe calibrarse con el plano del mall. */
  metersPerUnit: number;
  floors: MapFloor[];
  stores: MapStore[];
  nodes: NavNode[];
}
