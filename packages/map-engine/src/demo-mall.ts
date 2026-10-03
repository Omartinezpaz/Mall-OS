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
// 2. CENTRO COMERCIAL SAMBIL CHACAO (4 NIVELES OFICIALES)
// =============================================================
export const LEVEL_AUTOPISTA = 'floor-autopista';
export const LEVEL_ACUARIO = 'floor-acuario';
export const LEVEL_LIBERTADOR = 'floor-libertador';
export const LEVEL_DIVERSION = 'floor-diversion';

const propsSambilAutopista: MapProp[] = [
  tree('arb-sa1', 80, 200),
  tree('arb-sa2', 180, 90),
  tree('arb-sa3', 300, 200),
  tree('arb-sa4', 420, 90),
  tree('arb-sa5', 520, 200),
  { id: 'banca-sa1', kind: 'bench', rect: { x: 170, y: 130, w: 14, h: 4 } },
  { id: 'banca-sa2', kind: 'bench', rect: { x: 410, y: 130, w: 14, h: 4 } },
  { id: 'esc-sa1', kind: 'escalator', rect: { x: 174, y: 115, w: 12, h: 20 }, flow: 'max' },
  { id: 'esc-sa2', kind: 'escalator', rect: { x: 414, y: 115, w: 12, h: 20 }, flow: 'max' },
  { id: 'jardinera-sa1', kind: 'planter', rect: { x: 280, y: 80, w: 20, h: 5 } },
  { id: 'jardinera-sa2', kind: 'planter', rect: { x: 280, y: 225, w: 20, h: 5 } },
  { id: 'info-sa1', kind: 'poi', poi: 'info', x: 300, y: 230, z: 18 },
  { id: 'wc-sa1', kind: 'poi', poi: 'wc', x: 80, y: 240, z: 16 },
  { id: 'wc-sa2', kind: 'poi', poi: 'wc', x: 520, y: 240, z: 16 },
  { id: 'atm-sa1', kind: 'poi', poi: 'atm', x: 100, y: 170, z: 16 },
];

const propsSambilAcuario: MapProp[] = [
  tree('arb-ac1', 80, 200),
  tree('arb-ac2', 300, 200),
  tree('arb-ac3', 520, 200),
  { id: 'banca-ac1', kind: 'bench', rect: { x: 180, y: 130, w: 14, h: 4 } },
  { id: 'banca-ac2', kind: 'bench', rect: { x: 400, y: 130, w: 14, h: 4 } },
  { id: 'esc-ac1', kind: 'escalator', rect: { x: 174, y: 115, w: 12, h: 20 }, flow: 'max' },
  { id: 'esc-ac2', kind: 'escalator', rect: { x: 414, y: 115, w: 12, h: 20 }, flow: 'max' },
  { id: 'jardinera-ac1', kind: 'planter', rect: { x: 200, y: 80, w: 24, h: 5 } },
  { id: 'jardinera-ac2', kind: 'planter', rect: { x: 380, y: 80, w: 24, h: 5 } },
  { id: 'info-ac1', kind: 'poi', poi: 'info', x: 300, y: 230, z: 18 },
  { id: 'wc-ac1', kind: 'poi', poi: 'wc', x: 80, y: 240, z: 16 },
  { id: 'atm-ac1', kind: 'poi', poi: 'atm', x: 520, y: 240, z: 16 },
];

const storesSambilAutopista: MapStore[] = [
  { id: 'tijerazo', name: 'Tiendas Tijerazo', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 60, y: 30, w: 100, h: 60, height: 12, doorNodeId: 'door-tijerazo' },
  { id: 'macuto', name: 'Macuto', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 180, y: 30, w: 80, h: 60, height: 12, doorNodeId: 'door-macuto' },
  { id: 'cines_unidos', name: 'Cines Unidos', category: 'entertainment', floorId: LEVEL_AUTOPISTA, x: 480, y: 210, w: 110, h: 80, height: 16, doorNodeId: 'door-cines' },
  { id: 'lc_waikiki', name: 'LC Waikiki', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 30, y: 100, w: 70, h: 50, height: 10, doorNodeId: 'door-waikiki' },
  { id: 'bath_body', name: 'Bath & Body Works', category: 'health', floorId: LEVEL_AUTOPISTA, x: 30, y: 160, w: 60, h: 40, height: 9, doorNodeId: 'door-bath' },
  { id: 'estivaneli', name: 'Estivaneli', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 30, y: 210, w: 50, h: 40, height: 8, doorNodeId: 'door-estivaneli' },
  { id: 'mng', name: 'MNG Mango', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 150, y: 180, w: 45, h: 40, height: 9, doorNodeId: 'door-mng' },
  { id: 'michael_kors', name: 'Michael Kors', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 200, y: 180, w: 40, h: 40, height: 9, doorNodeId: 'door-mk' },
  { id: 'tommy', name: 'Tommy Hilfiger', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 245, y: 170, w: 45, h: 40, height: 9, doorNodeId: 'door-tommy' },
  { id: 'springfield', name: 'Springfield', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 350, y: 30, w: 50, h: 50, height: 9, doorNodeId: 'door-springfield' },
  { id: 'las_villas', name: 'Las Villas Perfumería', category: 'health', floorId: LEVEL_AUTOPISTA, x: 310, y: 30, w: 40, h: 50, height: 8, doorNodeId: 'door-villas' },
  { id: 'stradivarius', name: 'Stradivarius', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 440, y: 60, w: 55, h: 50, height: 9, doorNodeId: 'door-stradivarius' },
  { id: 'bershka', name: 'Bershka', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 470, y: 120, w: 60, h: 50, height: 10, doorNodeId: 'door-bershka' },
  { id: 'pull_bear', name: 'Pull&Bear', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 420, y: 240, w: 60, h: 50, height: 10, doorNodeId: 'door-pullbear' },
  { id: 'farmatodo', name: 'Farmatodo', category: 'health', floorId: LEVEL_AUTOPISTA, x: 360, y: 240, w: 50, h: 50, height: 9, doorNodeId: 'door-farmatodo' },
  { id: 'victoria_secret', name: "Victoria's Secret", category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 110, y: 240, w: 50, h: 50, height: 9, doorNodeId: 'door-vs' },
  { id: 'skechers', name: 'Skechers', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 210, y: 240, w: 45, h: 50, height: 8, doorNodeId: 'door-skechers' },
];

const storesSambilAcuario: MapStore[] = [
  { id: 'zara', name: 'ZARA (2.500 m²)', category: 'fashion', floorId: LEVEL_ACUARIO, x: 50, y: 30, w: 120, h: 70, height: 14, doorNodeId: 'door-zara' },
  { id: 'megan', name: 'Megan', category: 'fashion', floorId: LEVEL_ACUARIO, x: 30, y: 110, w: 55, h: 45, height: 8, doorNodeId: 'door-megan' },
  { id: 'parfois', name: 'Parfois', category: 'fashion', floorId: LEVEL_ACUARIO, x: 90, y: 110, w: 45, h: 45, height: 8, doorNodeId: 'door-parfois' },
  { id: 'swatch', name: 'Isla Swatch+', category: 'fashion', floorId: LEVEL_ACUARIO, x: 140, y: 175, w: 35, h: 30, height: 7, doorNodeId: 'door-swatch' },
  { id: 'optica_caroni', name: 'Óptica Caroní', category: 'health', floorId: LEVEL_ACUARIO, x: 180, y: 175, w: 40, h: 35, height: 8, doorNodeId: 'door-caroni' },
  { id: 'ninja_park', name: 'Ninja Park Aventura', category: 'entertainment', floorId: LEVEL_ACUARIO, x: 480, y: 220, w: 110, h: 70, height: 14, doorNodeId: 'door-ninja' },
  { id: 'nike_sambil', name: 'Nike Store Sambil', category: 'fashion', floorId: LEVEL_ACUARIO, x: 420, y: 230, w: 60, h: 60, height: 11, doorNodeId: 'door-nike' },
  { id: 'miniso', name: 'Miniso', category: 'home', floorId: LEVEL_ACUARIO, x: 360, y: 240, w: 50, h: 50, height: 9, doorNodeId: 'door-miniso' },
  { id: 'adidas', name: 'Adidas Originals', category: 'fashion', floorId: LEVEL_ACUARIO, x: 450, y: 90, w: 50, h: 45, height: 9, doorNodeId: 'door-adidas' },
  { id: 'reebok', name: 'Reebok', category: 'fashion', floorId: LEVEL_ACUARIO, x: 420, y: 40, w: 45, h: 45, height: 8, doorNodeId: 'door-reebok' },
  { id: 'tecniciencia', name: 'Tecni-Ciencia Libros', category: 'services', floorId: LEVEL_ACUARIO, x: 230, y: 170, w: 55, h: 45, height: 9, doorNodeId: 'door-libros' },
  { id: 'timberland', name: 'Timberland', category: 'fashion', floorId: LEVEL_ACUARIO, x: 30, y: 170, w: 50, h: 45, height: 8, doorNodeId: 'door-timberland' },
  { id: 'guess', name: 'Guess', category: 'fashion', floorId: LEVEL_ACUARIO, x: 190, y: 240, w: 45, h: 50, height: 9, doorNodeId: 'door-guess' },
  { id: 'us_polo', name: 'U.S. Polo Assn.', category: 'fashion', floorId: LEVEL_ACUARIO, x: 290, y: 240, w: 45, h: 50, height: 8, doorNodeId: 'door-uspolo' },
  { id: 'columbia', name: 'Columbia Sportswear', category: 'fashion', floorId: LEVEL_ACUARIO, x: 230, y: 40, w: 50, h: 45, height: 8, doorNodeId: 'door-columbia' },
  { id: 'pawer', name: 'Pawer', category: 'fashion', floorId: LEVEL_ACUARIO, x: 285, y: 40, w: 40, h: 45, height: 8, doorNodeId: 'door-pawer' },
];

const storesSambilLibertador: MapStore[] = [
  { id: 'samsung', name: 'Samsung Experience Store', category: 'tech', floorId: LEVEL_LIBERTADOR, x: 70, y: 40, w: 80, h: 60, height: 11, doorNodeId: 'door-samsung' },
  { id: 'apple_reseller', name: 'Mundo Mac Apple Premium', category: 'tech', floorId: LEVEL_LIBERTADOR, x: 170, y: 40, w: 70, h: 60, height: 11, doorNodeId: 'door-apple' },
  { id: 'balu', name: 'Balú Moda', category: 'fashion', floorId: LEVEL_LIBERTADOR, x: 420, y: 50, w: 80, h: 60, height: 10, doorNodeId: 'door-balu' },
  { id: 'aldo', name: 'Aldo Shoes', category: 'fashion', floorId: LEVEL_LIBERTADOR, x: 30, y: 160, w: 50, h: 50, height: 8, doorNodeId: 'door-aldo' },
  { id: 'joyeria_branger', name: 'Joyería Branger', category: 'fashion', floorId: LEVEL_LIBERTADOR, x: 230, y: 170, w: 50, h: 45, height: 9, doorNodeId: 'door-branger' },
  { id: 'opticolor', name: 'Opticolor Óptica', category: 'health', floorId: LEVEL_LIBERTADOR, x: 360, y: 240, w: 50, h: 50, height: 8, doorNodeId: 'door-opticolor' },
  { id: 'xiaomi', name: 'Xiaomi Store', category: 'tech', floorId: LEVEL_LIBERTADOR, x: 430, y: 230, w: 60, h: 60, height: 10, doorNodeId: 'door-xiaomi' },
];

const storesSambilDiversion: MapStore[] = [
  { id: 'mango_bajito', name: 'Mango Bajito (2.136 m²)', category: 'home', floorId: LEVEL_DIVERSION, x: 40, y: 30, w: 120, h: 80, height: 14, doorNodeId: 'door-mango' },
  { id: 'anfiteatro', name: 'Anfiteatro Terrazas VIP', category: 'entertainment', floorId: LEVEL_DIVERSION, x: 380, y: 30, w: 160, h: 120, height: 14, doorNodeId: 'door-anfi' },
  { id: 'bonsai_sushi', name: 'Bonsai Sushi Bar & Lounge', category: 'food', floorId: LEVEL_DIVERSION, x: 210, y: 160, w: 45, h: 40, height: 8, doorNodeId: 'door-bonsai' },
  { id: 'migas_cafe', name: "Miga's Café", category: 'food', floorId: LEVEL_DIVERSION, x: 90, y: 230, w: 50, h: 50, height: 9, doorNodeId: 'door-migas' },
  { id: 'pizza_hut', name: 'Pizza Hut Sambil', category: 'food', floorId: LEVEL_DIVERSION, x: 150, y: 230, w: 45, h: 50, height: 8, doorNodeId: 'door-pizzahut' },
  { id: 'burger_king', name: 'Burger King', category: 'food', floorId: LEVEL_DIVERSION, x: 30, y: 230, w: 45, h: 50, height: 8, doorNodeId: 'door-bk' },
  { id: 'allegre', name: 'Allegre Trattoria', category: 'food', floorId: LEVEL_DIVERSION, x: 270, y: 230, w: 45, h: 50, height: 8, doorNodeId: 'door-allegre' },
  { id: 'tibon_grill', name: 'Tibón Grill Steakhouse', category: 'food', floorId: LEVEL_DIVERSION, x: 330, y: 230, w: 50, h: 50, height: 9, doorNodeId: 'door-tibon' },
];

const nSambil = (id: string, floorId: string, x: number, y: number, kind: NavNodeKind, connections: string[]): NavNode => ({
  id,
  floorId,
  x,
  y,
  kind,
  connections,
});

function createSambilNodes(floorId: string): NavNode[] {
  return [
    nSambil(`pj-${floorId}`, floorId, 80, 220, 'entrance', [`corridor-w-${floorId}`, `south-w-${floorId}`]),
    nSambil(`plf-${floorId}`, floorId, 180, 110, 'corridor', [`corridor-w-${floorId}`, `corridor-n-${floorId}`, `center-link-w-${floorId}`]),
    nSambil(`pc-${floorId}`, floorId, 300, 220, 'corridor', [`center-link-w-${floorId}`, `center-link-e-${floorId}`, `south-w-${floorId}`, `south-e-${floorId}`]),
    nSambil(`pea-${floorId}`, floorId, 420, 110, 'corridor', [`corridor-n-${floorId}`, `corridor-e-${floorId}`, `center-link-e-${floorId}`]),
    nSambil(`plm-${floorId}`, floorId, 520, 220, 'corridor', [`corridor-e-${floorId}`, `south-e-${floorId}`]),

    nSambil(`corridor-w-${floorId}`, floorId, 125, 160, 'corridor', [`pj-${floorId}`, `plf-${floorId}`]),
    nSambil(`corridor-n-${floorId}`, floorId, 300, 85, 'corridor', [`plf-${floorId}`, `pea-${floorId}`]),
    nSambil(`corridor-e-${floorId}`, floorId, 475, 160, 'corridor', [`pea-${floorId}`, `plm-${floorId}`]),
    nSambil(`south-w-${floorId}`, floorId, 190, 220, 'corridor', [`pj-${floorId}`, `pc-${floorId}`]),
    nSambil(`south-e-${floorId}`, floorId, 410, 220, 'corridor', [`pc-${floorId}`, `plm-${floorId}`]),
    nSambil(`center-link-w-${floorId}`, floorId, 240, 165, 'corridor', [`plf-${floorId}`, `pc-${floorId}`]),
    nSambil(`center-link-e-${floorId}`, floorId, 360, 165, 'corridor', [`pea-${floorId}`, `pc-${floorId}`]),
  ];
}

export const sambilMall: MallMapData = {
  schemaVersion: 1,
  mallSlug: 'sambil-chacao',
  metersPerUnit: 0.35,
  floors: [
    {
      id: LEVEL_AUTOPISTA,
      name: 'Nivel Autopista',
      level: 1,
      width: 620,
      height: 320,
      areas: [
        { id: 'corridor-arc-1', kind: 'corridor', rect: { x: 60, y: 70, w: 500, h: 180 } },
        { id: 'plaza-jardin-1', kind: 'plaza', rect: { x: 60, y: 190, w: 60, h: 60 } },
        { id: 'plaza-fuente-1', kind: 'plaza', rect: { x: 150, y: 80, w: 60, h: 60 } },
        { id: 'plaza-central-1', kind: 'plaza', rect: { x: 270, y: 190, w: 60, h: 60 } },
        { id: 'plaza-arte-1', kind: 'plaza', rect: { x: 390, y: 80, w: 60, h: 60 } },
        { id: 'plaza-musica-1', kind: 'plaza', rect: { x: 490, y: 190, w: 60, h: 60 } },
      ],
      obstacles: [{ id: 'fountain-1', kind: 'fountain', rect: { x: 165, y: 95, w: 30, h: 30 } }],
      props: propsSambilAutopista,
    },
    {
      id: LEVEL_ACUARIO,
      name: 'Nivel Acuario',
      level: 2,
      width: 620,
      height: 320,
      areas: [
        { id: 'corridor-arc-2', kind: 'corridor', rect: { x: 60, y: 70, w: 500, h: 180 } },
        { id: 'plaza-jardin-2', kind: 'plaza', rect: { x: 60, y: 190, w: 60, h: 60 } },
        { id: 'plaza-fuente-2', kind: 'plaza', rect: { x: 150, y: 80, w: 60, h: 60 } },
        { id: 'plaza-central-2', kind: 'plaza', rect: { x: 270, y: 190, w: 60, h: 60 } },
        { id: 'plaza-arte-2', kind: 'plaza', rect: { x: 390, y: 80, w: 60, h: 60 } },
        { id: 'plaza-musica-2', kind: 'plaza', rect: { x: 490, y: 190, w: 60, h: 60 } },
      ],
      obstacles: [{ id: 'fountain-2', kind: 'fountain', rect: { x: 165, y: 95, w: 30, h: 30 } }],
      props: propsSambilAcuario,
    },
    {
      id: LEVEL_LIBERTADOR,
      name: 'Nivel Libertador',
      level: 3,
      width: 620,
      height: 320,
      areas: [
        { id: 'corridor-arc-3', kind: 'corridor', rect: { x: 60, y: 70, w: 500, h: 180 } },
        { id: 'plaza-jardin-3', kind: 'plaza', rect: { x: 60, y: 190, w: 60, h: 60 } },
        { id: 'plaza-fuente-3', kind: 'plaza', rect: { x: 150, y: 80, w: 60, h: 60 } },
        { id: 'plaza-central-3', kind: 'plaza', rect: { x: 270, y: 190, w: 60, h: 60 } },
        { id: 'plaza-arte-3', kind: 'plaza', rect: { x: 390, y: 80, w: 60, h: 60 } },
        { id: 'plaza-musica-3', kind: 'plaza', rect: { x: 490, y: 190, w: 60, h: 60 } },
      ],
      obstacles: [],
      props: [],
    },
    {
      id: LEVEL_DIVERSION,
      name: 'Nivel Diversión / Terrazas',
      level: 4,
      width: 620,
      height: 320,
      areas: [
        { id: 'corridor-arc-4', kind: 'corridor', rect: { x: 60, y: 70, w: 500, h: 180 } },
        { id: 'plaza-jardin-4', kind: 'plaza', rect: { x: 60, y: 190, w: 60, h: 60 } },
        { id: 'plaza-fuente-4', kind: 'plaza', rect: { x: 150, y: 80, w: 60, h: 60 } },
        { id: 'plaza-central-4', kind: 'plaza', rect: { x: 270, y: 190, w: 60, h: 60 } },
        { id: 'plaza-arte-4', kind: 'plaza', rect: { x: 390, y: 80, w: 60, h: 60 } },
        { id: 'plaza-musica-4', kind: 'plaza', rect: { x: 490, y: 190, w: 60, h: 60 } },
      ],
      obstacles: [],
      props: [],
    },
  ],
  stores: [
    ...storesSambilAutopista,
    ...storesSambilAcuario,
    ...storesSambilLibertador,
    ...storesSambilDiversion,
  ],
  nodes: [
    ...createSambilNodes(LEVEL_AUTOPISTA),
    ...createSambilNodes(LEVEL_ACUARIO),
    ...createSambilNodes(LEVEL_LIBERTADOR),
    ...createSambilNodes(LEVEL_DIVERSION),

    // Puertas Autopista
    nSambil('door-tijerazo', LEVEL_AUTOPISTA, 110, 90, 'door', [`plf-${LEVEL_AUTOPISTA}`]),
    nSambil('door-macuto', LEVEL_AUTOPISTA, 210, 90, 'door', [`plf-${LEVEL_AUTOPISTA}`]),
    nSambil('door-cines', LEVEL_AUTOPISTA, 480, 220, 'door', [`plm-${LEVEL_AUTOPISTA}`]),
    nSambil('door-waikiki', LEVEL_AUTOPISTA, 100, 125, 'door', [`corridor-w-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bath', LEVEL_AUTOPISTA, 90, 160, 'door', [`corridor-w-${LEVEL_AUTOPISTA}`]),
    nSambil('door-estivaneli', LEVEL_AUTOPISTA, 80, 210, 'door', [`pj-${LEVEL_AUTOPISTA}`]),
    nSambil('door-mng', LEVEL_AUTOPISTA, 190, 180, 'door', [`center-link-w-${LEVEL_AUTOPISTA}`]),
    nSambil('door-mk', LEVEL_AUTOPISTA, 200, 180, 'door', [`center-link-w-${LEVEL_AUTOPISTA}`]),
    nSambil('door-tommy', LEVEL_AUTOPISTA, 240, 170, 'door', [`center-link-w-${LEVEL_AUTOPISTA}`]),
    nSambil('door-springfield', LEVEL_AUTOPISTA, 375, 80, 'door', [`pea-${LEVEL_AUTOPISTA}`]),
    nSambil('door-villas', LEVEL_AUTOPISTA, 330, 80, 'door', [`corridor-n-${LEVEL_AUTOPISTA}`]),
    nSambil('door-stradivarius', LEVEL_AUTOPISTA, 440, 110, 'door', [`pea-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bershka', LEVEL_AUTOPISTA, 475, 160, 'door', [`corridor-e-${LEVEL_AUTOPISTA}`]),
    nSambil('door-pullbear', LEVEL_AUTOPISTA, 420, 240, 'door', [`south-e-${LEVEL_AUTOPISTA}`]),
    nSambil('door-farmatodo', LEVEL_AUTOPISTA, 360, 240, 'door', [`south-e-${LEVEL_AUTOPISTA}`]),
    nSambil('door-vs', LEVEL_AUTOPISTA, 135, 240, 'door', [`south-w-${LEVEL_AUTOPISTA}`]),
    nSambil('door-skechers', LEVEL_AUTOPISTA, 210, 240, 'door', [`south-w-${LEVEL_AUTOPISTA}`]),

    // Puertas Acuario
    nSambil('door-zara', LEVEL_ACUARIO, 110, 100, 'door', [`plf-${LEVEL_ACUARIO}`]),
    nSambil('door-megan', LEVEL_ACUARIO, 60, 135, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
    nSambil('door-parfois', LEVEL_ACUARIO, 110, 135, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
    nSambil('door-swatch', LEVEL_ACUARIO, 155, 175, 'door', [`center-link-w-${LEVEL_ACUARIO}`]),
    nSambil('door-caroni', LEVEL_ACUARIO, 200, 175, 'door', [`center-link-w-${LEVEL_ACUARIO}`]),
    nSambil('door-ninja', LEVEL_ACUARIO, 480, 220, 'door', [`plm-${LEVEL_ACUARIO}`]),
    nSambil('door-nike', LEVEL_ACUARIO, 420, 230, 'door', [`south-e-${LEVEL_ACUARIO}`]),
    nSambil('door-miniso', LEVEL_ACUARIO, 360, 240, 'door', [`south-e-${LEVEL_ACUARIO}`]),
    nSambil('door-adidas', LEVEL_ACUARIO, 450, 110, 'door', [`pea-${LEVEL_ACUARIO}`]),
    nSambil('door-reebok', LEVEL_ACUARIO, 420, 85, 'door', [`pea-${LEVEL_ACUARIO}`]),
    nSambil('door-libros', LEVEL_ACUARIO, 240, 170, 'door', [`center-link-w-${LEVEL_ACUARIO}`]),
    nSambil('door-timberland', LEVEL_ACUARIO, 80, 170, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
    nSambil('door-guess', LEVEL_ACUARIO, 190, 240, 'door', [`south-w-${LEVEL_ACUARIO}`]),
    nSambil('door-uspolo', LEVEL_ACUARIO, 290, 240, 'door', [`pc-${LEVEL_ACUARIO}`]),
    nSambil('door-columbia', LEVEL_ACUARIO, 255, 85, 'door', [`corridor-n-${LEVEL_ACUARIO}`]),
    nSambil('door-pawer', LEVEL_ACUARIO, 305, 85, 'door', [`corridor-n-${LEVEL_ACUARIO}`]),

    // Puertas Libertador
    nSambil('door-samsung', LEVEL_LIBERTADOR, 110, 100, 'door', [`plf-${LEVEL_LIBERTADOR}`]),
    nSambil('door-apple', LEVEL_LIBERTADOR, 205, 100, 'door', [`plf-${LEVEL_LIBERTADOR}`]),
    nSambil('door-balu', LEVEL_LIBERTADOR, 420, 110, 'door', [`pea-${LEVEL_LIBERTADOR}`]),
    nSambil('door-aldo', LEVEL_LIBERTADOR, 80, 160, 'door', [`corridor-w-${LEVEL_LIBERTADOR}`]),
    nSambil('door-branger', LEVEL_LIBERTADOR, 240, 170, 'door', [`center-link-w-${LEVEL_LIBERTADOR}`]),
    nSambil('door-opticolor', LEVEL_LIBERTADOR, 360, 240, 'door', [`south-e-${LEVEL_LIBERTADOR}`]),
    nSambil('door-xiaomi', LEVEL_LIBERTADOR, 430, 230, 'door', [`south-e-${LEVEL_LIBERTADOR}`]),

    // Puertas Diversión
    nSambil('door-mango', LEVEL_DIVERSION, 110, 110, 'door', [`plf-${LEVEL_DIVERSION}`]),
    nSambil('door-anfi', LEVEL_DIVERSION, 420, 110, 'door', [`pea-${LEVEL_DIVERSION}`]),
    nSambil('door-bonsai', LEVEL_DIVERSION, 240, 165, 'door', [`center-link-w-${LEVEL_DIVERSION}`]),
    nSambil('door-migas', LEVEL_DIVERSION, 90, 230, 'door', [`pj-${LEVEL_DIVERSION}`]),
    nSambil('door-pizzahut', LEVEL_DIVERSION, 150, 230, 'door', [`south-w-${LEVEL_DIVERSION}`]),
    nSambil('door-bk', LEVEL_DIVERSION, 75, 230, 'door', [`pj-${LEVEL_DIVERSION}`]),
    nSambil('door-allegre', LEVEL_DIVERSION, 270, 230, 'door', [`pc-${LEVEL_DIVERSION}`]),
    nSambil('door-tibon', LEVEL_DIVERSION, 330, 230, 'door', [`pc-${LEVEL_DIVERSION}`]),
  ],
};
