/**
 * Modelos de datos del mapa para Mall OS.
 * 
 * 1. demoMall: Mall de referencia calibrado (1 piso, 10 locales, suite de validación y benchmarking).
 * 2. sambilMall: Centro Comercial Sambil Chacao oficial (4 niveles, 5 plazas icónicas y tiendas ancla).
 */
import type { MallMapData, MapProp, MapStore, NavNode, NavNodeKind } from './types';

// =============================================================
// 1. DEMO MALL (Benchmark oficial de pruebas)
// =============================================================
const F1 = 'floor-1';
const tree = (id: string, x: number, y: number): MapProp => ({ id, kind: 'tree', x, y });

const demoProps: MapProp[] = [
  tree('arbol-1', 140, 108),
  tree('arbol-2', 178, 108),
  tree('arbol-3', 240, 104),
  tree('arbol-4', 322, 108),
  tree('arbol-5', 150, 158),
  tree('arbol-6', 215, 158),
  tree('arbol-7', 300, 158),
  { id: 'banca-1', kind: 'bench', rect: { x: 204, y: 110, w: 14, h: 4 } },
  { id: 'banca-2', kind: 'bench', rect: { x: 241, y: 110, w: 14, h: 4 } },
  { id: 'jardinera-1', kind: 'planter', rect: { x: 340, y: 102, w: 12, h: 6 } },
  { id: 'escalera-1', kind: 'escalator', rect: { x: 122, y: 100, w: 13, h: 34 }, flow: 'max' },
  { id: 'vidrio-1', kind: 'glass', from: { x: 165, y: 99 }, to: { x: 195, y: 99 } },
  { id: 'info-1', kind: 'poi', poi: 'info', x: 225, y: 130, z: 20 },
  { id: 'wc-1', kind: 'poi', poi: 'wc', x: 322.5, y: 210, z: 16 },
  { id: 'atm-1', kind: 'poi', poi: 'atm', x: 357.5, y: 50, z: 22 },
];

const nDemo = (id: string, x: number, y: number, kind: NavNodeKind, connections: string[]): NavNode => ({
  id,
  floorId: F1,
  x,
  y,
  kind,
  connections,
});

export const demoMall: MallMapData = {
  schemaVersion: 1,
  mallSlug: 'demo',
  metersPerUnit: 0.2,
  floors: [
    {
      id: F1,
      name: 'Nivel 1',
      level: 1,
      width: 400,
      height: 260,
      areas: [
        { id: 'pasillo', kind: 'corridor', rect: { x: 112, y: 98, w: 288, h: 64 } },
        { id: 'plaza', kind: 'plaza', rect: { x: 190, y: 108, w: 70, h: 44 } },
        { id: 'entrada', kind: 'entrance', rect: { x: 390, y: 136, w: 10, h: 24 } },
      ],
      obstacles: [{ id: 'fuente', kind: 'fountain', rect: { x: 211, y: 116, w: 28, h: 28 } }],
      props: demoProps,
    },
  ],
  stores: [
    { id: 'super', name: 'Supermercado', category: 'fresh', floorId: F1, x: 10, y: 10, w: 100, h: 100, height: 14, doorNodeId: 'door-super' },
    { id: 'gym', name: 'Gimnasio', category: 'fitness', floorId: F1, x: 10, y: 150, w: 100, h: 100, height: 14, doorNodeId: 'door-gym' },
    { id: 'panaderia', name: 'Panadería', category: 'food', floorId: F1, x: 130, y: 10, w: 60, h: 80, height: 9, doorNodeId: 'door-panaderia' },
    { id: 'charcuteria', name: 'Charcutería', category: 'food', floorId: F1, x: 195, y: 10, w: 60, h: 80, height: 9, doorNodeId: 'door-charcuteria' },
    { id: 'farmacia', name: 'Farmacia', category: 'health', floorId: F1, x: 260, y: 10, w: 60, h: 80, height: 9, doorNodeId: 'door-farmacia' },
    { id: 'banco', name: 'Banco', category: 'finance', floorId: F1, x: 325, y: 10, w: 65, h: 80, height: 9, doorNodeId: 'door-banco' },
    { id: 'muebleria', name: 'Mueblería', category: 'home', floorId: F1, x: 130, y: 170, w: 100, h: 80, height: 9, doorNodeId: 'door-muebleria' },
    { id: 'comida', name: 'Comida rápida', category: 'food', floorId: F1, x: 235, y: 170, w: 60, h: 80, height: 9, doorNodeId: 'door-comida' },
    { id: 'banos', name: 'Baños', category: 'services', floorId: F1, x: 300, y: 170, w: 45, h: 80, height: 7, doorNodeId: 'door-banos' },
    { id: 'servicios', name: 'Servicios', category: 'services', floorId: F1, x: 350, y: 170, w: 40, h: 80, height: 7, doorNodeId: 'door-servicios' },
  ],
  nodes: [
    nDemo('entrance', 395, 148, 'entrance', ['sp-370']),
    nDemo('sp-370', 370, 148, 'corridor', ['entrance', 'sp-357', 'door-servicios']),
    nDemo('sp-357', 357.5, 148, 'corridor', ['sp-370', 'sp-322', 'door-banco']),
    nDemo('sp-322', 322.5, 148, 'corridor', ['sp-357', 'sp-290', 'door-banos']),
    nDemo('sp-290', 290, 148, 'corridor', ['sp-322', 'sp-265', 'door-farmacia']),
    nDemo('sp-265', 265, 148, 'corridor', ['sp-290', 'sp-200', 'door-comida']),
    nDemo('sp-200', 200, 148, 'corridor', ['sp-265', 'sp-180', 'door-charcuteria']),
    nDemo('sp-180', 180, 148, 'corridor', ['sp-200', 'sp-160', 'door-muebleria']),
    nDemo('sp-160', 160, 148, 'corridor', ['sp-180', 'sp-115', 'door-panaderia']),
    nDemo('sp-115', 115, 148, 'corridor', ['sp-160', 'door-super', 'door-gym']),
    nDemo('door-servicios', 370, 170, 'door', ['sp-370']),
    nDemo('door-banco', 357.5, 90, 'door', ['sp-357']),
    nDemo('door-banos', 322.5, 170, 'door', ['sp-322']),
    nDemo('door-farmacia', 290, 90, 'door', ['sp-290']),
    nDemo('door-comida', 265, 170, 'door', ['sp-265']),
    nDemo('door-charcuteria', 200, 90, 'door', ['sp-200']),
    nDemo('door-muebleria', 180, 170, 'door', ['sp-180']),
    nDemo('door-panaderia', 160, 90, 'door', ['sp-160']),
    nDemo('door-super', 110, 105, 'door', ['sp-115']),
    nDemo('door-gym', 110, 155, 'door', ['sp-115']),
  ],
};

// =============================================================
// 2. CENTRO COMERCIAL SAMBIL CHACAO (Dataset Modularizado)
// =============================================================
export {
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_DIVERSION,
} from './sambil';

