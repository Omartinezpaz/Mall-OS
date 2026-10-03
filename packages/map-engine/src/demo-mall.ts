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
  // Árboles en plazas y zonas abiertas
  tree('arb-sa1', 115, 235),
  tree('arb-sa2', 120, 45),
  tree('arb-sa3', 350, 215),
  tree('arb-sa4', 530, 45),
  tree('arb-sa5', 645, 220),
  tree('arb-sa6', 125, 125),
  tree('arb-sa7', 620, 140),
  
  // Mobiliario: Bancas y Jardineras
  { id: 'banca-sa1', kind: 'bench', rect: { x: 155, y: 130, w: 12, h: 4 } },
  { id: 'banca-sa2', kind: 'bench', rect: { x: 515, y: 130, w: 12, h: 4 } },
  { id: 'banca-sa3', kind: 'bench', rect: { x: 345, y: 185, w: 12, h: 4 } },
  { id: 'jardinera-sa1', kind: 'planter', rect: { x: 295, y: 92, w: 16, h: 4 } },
  { id: 'jardinera-sa2', kind: 'planter', rect: { x: 425, y: 92, w: 16, h: 4 } },

  // Escaleras mecánicas
  { id: 'esc-sa1', kind: 'escalator', rect: { x: 135, y: 40, w: 8, h: 14 }, flow: 'max' },
  { id: 'esc-sa2', kind: 'escalator', rect: { x: 515, y: 40, w: 8, h: 14 }, flow: 'max' },
  { id: 'esc-sa3', kind: 'escalator', rect: { x: 350, y: 280, w: 8, h: 14 }, flow: 'max' },

  // Puntos de interés (Insignias POI)
  { id: 'info-sa1', kind: 'poi', poi: 'info', x: 350, y: 250, z: 18 },
  { id: 'info-sa2', kind: 'poi', poi: 'info', x: 72, y: 250, z: 18 },
  { id: 'wc-sa1', kind: 'poi', poi: 'wc', x: 210, y: 40, z: 16 },
  { id: 'wc-sa2', kind: 'poi', poi: 'wc', x: 95, y: 310, z: 16 },
  { id: 'wc-sa3', kind: 'poi', poi: 'wc', x: 620, y: 260, z: 16 },
  { id: 'atm-sa1', kind: 'poi', poi: 'atm', x: 560, y: 40, z: 16 },
  { id: 'atm-sa2', kind: 'poi', poi: 'atm', x: 20, y: 195, z: 16 },
];

const propsSambilAcuario: MapProp[] = [
  tree('arb-ac1', 80, 240),
  tree('arb-ac2', 300, 200),
  tree('arb-ac3', 520, 200),
  { id: 'banca-ac1', kind: 'bench', rect: { x: 165, y: 135, w: 14, h: 4 } },
  { id: 'banca-ac2', kind: 'bench', rect: { x: 410, y: 135, w: 14, h: 4 } },
  { id: 'esc-ac1', kind: 'escalator', rect: { x: 135, y: 40, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-ac2', kind: 'escalator', rect: { x: 515, y: 40, w: 10, h: 16 }, flow: 'max' },
  { id: 'jardinera-ac1', kind: 'planter', rect: { x: 200, y: 90, w: 18, h: 4 } },
  { id: 'jardinera-ac2', kind: 'planter', rect: { x: 370, y: 90, w: 18, h: 4 } },
  { id: 'info-ac1', kind: 'poi', poi: 'info', x: 300, y: 230, z: 18 },
  { id: 'wc-ac1', kind: 'poi', poi: 'wc', x: 80, y: 240, z: 16 },
  { id: 'atm-ac1', kind: 'poi', poi: 'atm', x: 520, y: 240, z: 16 },
];

const storesSambilAutopista: MapStore[] = [
  // --- ANCLAS PRINCIPALES ---
  { id: 'tijerazo', name: 'Tiendas Tijerazo (1.418 m²)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 20, w: 85, h: 48, height: 14, doorNodeId: 'door-tijerazo' },
  { id: 'macuto', name: 'Macuto (795 m²)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 115, y: 20, w: 75, h: 48, height: 13, doorNodeId: 'door-macuto' },
  { id: 'lc_waikiki', name: 'LC Waikiki (1.418 m²)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 80, w: 50, h: 50, height: 13, doorNodeId: 'door-waikiki' },
  { id: 'cines_unidos', name: 'Cines Unidos (1.650 m²)', category: 'entertainment', floorId: LEVEL_AUTOPISTA, x: 600, y: 198, w: 95, h: 80, height: 16, doorNodeId: 'door-cines' },
  { id: 'pull_bear', name: 'Pull&Bear (798 m²)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 526, y: 265, w: 55, h: 45, height: 11, doorNodeId: 'door-pullbear' },
  { id: 'bershka', name: 'Bershka (705 m²)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 600, y: 155, w: 50, h: 38, height: 11, doorNodeId: 'door-bershka' },
  { id: 'stradivarius', name: 'Stradivarius (520 m²)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 600, y: 116, w: 45, h: 35, height: 10, doorNodeId: 'door-stradivarius' },
  { id: 'farmatodo', name: 'Farmatodo (475 m²)', category: 'health', floorId: LEVEL_AUTOPISTA, x: 446, y: 265, w: 42, h: 45, height: 10, doorNodeId: 'door-farmatodo' },
  { id: 'tommy', name: 'Tommy Hilfiger', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 275, y: 150, w: 45, h: 32, height: 10, doorNodeId: 'door-tommy' },

  // --- ALA OESTE: EXTERIOR (Izquierda de Plaza Jardín a Plaza La Fuente) ---
  { id: 'palacio_blumer', name: 'Palacio del Blumer', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 135, w: 45, h: 22, height: 8, doorNodeId: 'door-blumer' },
  { id: 'bath_body', name: 'Bath & Body Works', category: 'health', floorId: LEVEL_AUTOPISTA, x: 20, y: 160, w: 45, h: 22, height: 9, doorNodeId: 'door-bath' },
  { id: 'banco_tesoro', name: 'Banco del Tesoro', category: 'finance', floorId: LEVEL_AUTOPISTA, x: 20, y: 185, w: 45, h: 22, height: 8, doorNodeId: 'door-btesoro' },
  { id: 'estivaneli', name: 'Estivaneli', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 210, w: 45, h: 22, height: 8, doorNodeId: 'door-estivaneli' },
  { id: 'big_shoes', name: 'Big Shoes', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 235, w: 45, h: 22, height: 7, doorNodeId: 'door-bigshoes' },
  { id: 'fit_body_care', name: 'Fit Body Care', category: 'health', floorId: LEVEL_AUTOPISTA, x: 20, y: 260, w: 40, h: 22, height: 7, doorNodeId: 'door-fitbody' },
  { id: 'pets_planet', name: 'Pets Planet', category: 'home', floorId: LEVEL_AUTOPISTA, x: 20, y: 285, w: 40, h: 22, height: 7, doorNodeId: 'door-pets' },
  { id: 'mc_cafe', name: 'MC. Café', category: 'food', floorId: LEVEL_AUTOPISTA, x: 20, y: 310, w: 40, h: 22, height: 7, doorNodeId: 'door-mccafe' },
  { id: 'sandro', name: 'Sandro', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 335, w: 40, h: 22, height: 7, doorNodeId: 'door-sandro' },

  // --- ALA OESTE: INTERIOR (Fachada hacia pasillo oeste y Plaza La Fuente) ---
  { id: 'yuju', name: 'Yuju', category: 'entertainment', floorId: LEVEL_AUTOPISTA, x: 80, y: 135, w: 26, h: 22, height: 7, doorNodeId: 'door-yuju' },
  { id: 'pawnee', name: 'Pawnee', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 80, y: 160, w: 26, h: 22, height: 7, doorNodeId: 'door-pawnee' },
  { id: 'la_corte', name: 'La Corte', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 80, y: 185, w: 26, h: 22, height: 7, doorNodeId: 'door-lacorte' },
  { id: 'el_king_gourmet', name: 'El King Gourmet', category: 'food', floorId: LEVEL_AUTOPISTA, x: 114, y: 135, w: 28, h: 22, height: 7, doorNodeId: 'door-elking' },
  { id: 'mini_good', name: 'Mini Good', category: 'home', floorId: LEVEL_AUTOPISTA, x: 114, y: 160, w: 28, h: 22, height: 7, doorNodeId: 'door-minigood' },
  { id: 'heladeria_4d', name: 'Heladería 4D', category: 'food', floorId: LEVEL_AUTOPISTA, x: 114, y: 185, w: 28, h: 22, height: 7, doorNodeId: 'door-heladeria4d' },
  { id: 'piedy', name: 'Piedy', category: 'health', floorId: LEVEL_AUTOPISTA, x: 75, y: 285, w: 25, h: 22, height: 7, doorNodeId: 'door-piedy' },
  { id: 'holic_shop', name: 'Holic Shop', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 75, y: 310, w: 25, h: 22, height: 7, doorNodeId: 'door-holic' },

  // --- GALERÍA NORTE: FILA SUPERIOR EXTERIOR (Plaza La Fuente a Plaza El Arte) ---
  { id: 'hollywood_star', name: 'Hollywood Star', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 195, y: 20, w: 25, h: 48, height: 8, doorNodeId: 'door-hollywood' },
  { id: 'jump', name: 'Jump', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 225, y: 20, w: 28, h: 48, height: 8, doorNodeId: 'door-jump' },
  { id: 'movinet', name: 'Movinet', category: 'tech', floorId: LEVEL_AUTOPISTA, x: 258, y: 20, w: 22, h: 48, height: 8, doorNodeId: 'door-movinet' },
  { id: 'glam_eclat', name: 'Glam Eclat', category: 'health', floorId: LEVEL_AUTOPISTA, x: 283, y: 20, w: 22, h: 48, height: 8, doorNodeId: 'door-glameclat' },
  { id: 'harem_shoes', name: 'Harem Shoes', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 308, y: 20, w: 22, h: 48, height: 8, doorNodeId: 'door-harem' },
  { id: 'euphoria', name: 'Euphoria', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 333, y: 20, w: 22, h: 48, height: 8, doorNodeId: 'door-euphoria' },
  { id: 'jeep_cat', name: 'Jeep / CAT', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 360, y: 20, w: 28, h: 48, height: 8, doorNodeId: 'door-jeepcat' },
  { id: 'apolo', name: 'Apolo', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 392, y: 20, w: 28, h: 48, height: 8, doorNodeId: 'door-apolo' },
  { id: 'las_villas', name: 'Las Villas Perfumería', category: 'health', floorId: LEVEL_AUTOPISTA, x: 425, y: 20, w: 32, h: 48, height: 8, doorNodeId: 'door-villas' },
  { id: 'springfield', name: 'Springfield', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 462, y: 20, w: 35, h: 48, height: 9, doorNodeId: 'door-springfield' },
  { id: 'sportland', name: 'Sportland', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 502, y: 20, w: 35, h: 48, height: 8, doorNodeId: 'door-sportland' },
  { id: 'bnc', name: 'Banco Nacional de Crédito', category: 'finance', floorId: LEVEL_AUTOPISTA, x: 542, y: 20, w: 38, h: 48, height: 8, doorNodeId: 'door-bnc' },

  // --- GALERÍA NORTE: FILA INFERIOR INTERIOR (Joyerías y Moda) ---
  { id: 'planeta_sport', name: 'Planeta Sport', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 145, y: 78, w: 26, h: 28, height: 8, doorNodeId: 'door-planetasport' },
  { id: 'bellagio', name: 'Joyería Bellagio', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 195, y: 78, w: 24, h: 28, height: 7, doorNodeId: 'door-bellagio' },
  { id: 'hg_fashion', name: 'HG Fashion', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 222, y: 78, w: 24, h: 28, height: 7, doorNodeId: 'door-hgfashion' },
  { id: 'vmagic', name: 'VMagic', category: 'health', floorId: LEVEL_AUTOPISTA, x: 249, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-vmagic' },
  { id: 'lucy_lingerie', name: 'Lucy Lingerie', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 276, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-lucy' },
  { id: 'converse', name: 'Converse', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 303, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-converse' },
  { id: 'london_jeans', name: 'London Jeans', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 330, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-londonjeans' },
  { id: 'maral_joyeros', name: 'Maral Joyeros', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 357, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-maral' },
  { id: 'canguro', name: 'Canguro', category: 'tech', floorId: LEVEL_AUTOPISTA, x: 384, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-canguro' },
  { id: 'panots', name: 'Panots', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 412, y: 78, w: 24, h: 30, height: 7, doorNodeId: 'door-panots' },
  { id: 'gran_via', name: 'Gran Vía', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 440, y: 78, w: 25, h: 30, height: 7, doorNodeId: 'door-granvia' },
  { id: 'line', name: 'Line', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 468, y: 78, w: 25, h: 30, height: 7, doorNodeId: 'door-line' },

  // --- ALA ESTE: EXTERIOR (Noreste a Sureste) ---
  { id: 'fashion_look', name: 'Fashion Look', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 600, y: 20, w: 35, h: 28, height: 7, doorNodeId: 'door-fashionlook' },
  { id: 'optica_billi', name: 'Óptica Billi', category: 'health', floorId: LEVEL_AUTOPISTA, x: 600, y: 52, w: 35, h: 28, height: 7, doorNodeId: 'door-opticabilli' },
  { id: 'womens_secret', name: "Women's Secret", category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 600, y: 84, w: 35, h: 28, height: 8, doorNodeId: 'door-womensecret' },

  // --- ALA ESTE: INTERIOR / DIAGONAL ---
  { id: 'urban_market', name: 'Urban Market', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 540, y: 115, w: 28, h: 24, height: 7, doorNodeId: 'door-urbanmarket' },
  { id: 'mookshield', name: 'Mookshield', category: 'tech', floorId: LEVEL_AUTOPISTA, x: 540, y: 142, w: 28, h: 24, height: 7, doorNodeId: 'door-mookshield' },
  { id: 'jasis', name: "Jasi's", category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 540, y: 169, w: 28, h: 24, height: 7, doorNodeId: 'door-jasis' },
  { id: 'crocs', name: 'Crocs', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 540, y: 196, w: 28, h: 24, height: 7, doorNodeId: 'door-crocs' },
  { id: 'mario_hernandez', name: 'Mario Hernández', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 505, y: 184, w: 26, h: 24, height: 8, doorNodeId: 'door-mariohernandez' },
  { id: 'brands_shop', name: 'Brands Shop', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 505, y: 157, w: 26, h: 24, height: 7, doorNodeId: 'door-brandsshop' },
  { id: 'lucchi', name: 'Lucchi', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 505, y: 130, w: 26, h: 24, height: 7, doorNodeId: 'door-lucchi' },
  { id: 'opticolor_auto', name: 'Opticolor', category: 'health', floorId: LEVEL_AUTOPISTA, x: 460, y: 130, w: 24, h: 24, height: 7, doorNodeId: 'door-opticolor-auto' },
  { id: 'calza_fex', name: 'Calza Fex', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 460, y: 157, w: 24, h: 24, height: 7, doorNodeId: 'door-calzafex' },
  { id: 'top_ten_18', name: 'Top Ten 18', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 460, y: 184, w: 24, h: 24, height: 7, doorNodeId: 'door-topten18' },

  // --- PASILLO SUR: EXTERIOR (Plaza Jardín a Plaza Central y Plaza La Música) ---
  { id: 'victoria_secret', name: "Victoria's Secret", category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 105, y: 265, w: 38, h: 45, height: 9, doorNodeId: 'door-vs' },
  { id: 'bhype', name: 'Bhype', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 147, y: 265, w: 24, h: 45, height: 8, doorNodeId: 'door-bhype' },
  { id: 'psyco_bunny', name: 'Psycho Bunny', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 174, y: 265, w: 24, h: 45, height: 8, doorNodeId: 'door-psycobunny' },
  { id: 'aishop', name: 'Aishop', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 201, y: 265, w: 24, h: 45, height: 8, doorNodeId: 'door-aishop' },
  { id: 'jadu_cosmetics', name: 'Jadu Cosmetics', category: 'health', floorId: LEVEL_AUTOPISTA, x: 228, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-jadu' },
  { id: 'xc2', name: 'XC2', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 255, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-xc2' },
  { id: 'skechers', name: 'Skechers', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 282, y: 265, w: 26, h: 45, height: 8, doorNodeId: 'door-skechers' },
  { id: 'libby_lu', name: 'Libby Lu', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 311, y: 265, w: 22, h: 45, height: 7, doorNodeId: 'door-libbylu' },
  { id: 'usa_jeans', name: 'USA Jeans Wear', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 336, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-usajeans' },

  { id: 'reinaldo_sport', name: 'Reinaldo Sport', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 365, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-reinaldosport' },
  { id: 'juventus', name: 'Juventus', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 392, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-juventus' },
  { id: 'sport_market', name: 'Sport Market', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 419, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-sportmarket' },
  { id: 'al_giorno', name: 'Al Giorno', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 491, y: 265, w: 32, h: 45, height: 8, doorNodeId: 'door-algiorno' },

  // --- BLOQUE CENTRAL INTERIOR (Frente a Tommy & Plaza Central) ---
  { id: 'mng', name: 'MNG (Mango)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 185, y: 155, w: 24, h: 25, height: 9, doorNodeId: 'door-mng' },
  { id: 'james_bark', name: 'James Bark', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 212, y: 155, w: 24, h: 25, height: 8, doorNodeId: 'door-jamesbark' },
  { id: 'rs', name: 'RS', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 239, y: 155, w: 24, h: 25, height: 8, doorNodeId: 'door-rs' },
  { id: 'boom_shoes', name: 'Boom Shoes', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 330, y: 150, w: 24, h: 28, height: 8, doorNodeId: 'door-boomshoes' },
  { id: 'salome', name: 'Salome Makeup', category: 'health', floorId: LEVEL_AUTOPISTA, x: 357, y: 150, w: 24, h: 28, height: 8, doorNodeId: 'door-salome' },
  { id: 'prime_bodegon', name: 'Prime Bodegón', category: 'food', floorId: LEVEL_AUTOPISTA, x: 384, y: 150, w: 26, h: 28, height: 8, doorNodeId: 'door-primebodegon' },
];

const storesSambilAcuario: MapStore[] = [
  { id: 'zara', name: 'ZARA (2.500 m²)', category: 'fashion', floorId: LEVEL_ACUARIO, x: 50, y: 30, w: 120, h: 70, height: 14, doorNodeId: 'door-zara' },
  { id: 'megan', name: 'Megan', category: 'fashion', floorId: LEVEL_ACUARIO, x: 30, y: 110, w: 45, h: 45, height: 8, doorNodeId: 'door-megan' },
  { id: 'parfois', name: 'Parfois', category: 'fashion', floorId: LEVEL_ACUARIO, x: 30, y: 160, w: 45, h: 45, height: 8, doorNodeId: 'door-parfois' },
  { id: 'swatch', name: 'Isla Swatch+', category: 'fashion', floorId: LEVEL_ACUARIO, x: 110, y: 175, w: 35, h: 30, height: 7, doorNodeId: 'door-swatch' },
  { id: 'optica_caroni', name: 'Óptica Caroní', category: 'health', floorId: LEVEL_ACUARIO, x: 155, y: 175, w: 40, h: 35, height: 8, doorNodeId: 'door-caroni' },
  { id: 'ninja_park', name: 'Ninja Park Aventura', category: 'entertainment', floorId: LEVEL_ACUARIO, x: 480, y: 220, w: 110, h: 70, height: 14, doorNodeId: 'door-ninja' },
  { id: 'nike_sambil', name: 'Nike Store Sambil', category: 'fashion', floorId: LEVEL_ACUARIO, x: 420, y: 230, w: 60, h: 60, height: 11, doorNodeId: 'door-nike' },
  { id: 'miniso', name: 'Miniso', category: 'home', floorId: LEVEL_ACUARIO, x: 360, y: 240, w: 50, h: 50, height: 9, doorNodeId: 'door-miniso' },
  { id: 'adidas', name: 'Adidas Originals', category: 'fashion', floorId: LEVEL_ACUARIO, x: 450, y: 90, w: 50, h: 45, height: 9, doorNodeId: 'door-adidas' },
  { id: 'reebok', name: 'Reebok', category: 'fashion', floorId: LEVEL_ACUARIO, x: 420, y: 40, w: 45, h: 45, height: 8, doorNodeId: 'door-reebok' },
  { id: 'tecniciencia', name: 'Tecni-Ciencia Libros', category: 'services', floorId: LEVEL_ACUARIO, x: 235, y: 170, w: 55, h: 45, height: 9, doorNodeId: 'door-libros' },
  { id: 'timberland', name: 'Timberland', category: 'fashion', floorId: LEVEL_ACUARIO, x: 30, y: 210, w: 45, h: 45, height: 8, doorNodeId: 'door-timberland' },
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
  if (floorId !== LEVEL_AUTOPISTA) {
    const isAcuario = floorId === LEVEL_ACUARIO;
    const isLib = floorId === LEVEL_LIBERTADOR;
    const isDiv = floorId === LEVEL_DIVERSION;

    return [
      nSambil(`pj-${floorId}`, floorId, 80, 220, 'entrance', [
        `corridor-w-${floorId}`, `south-w-${floorId}`,
        ...(isDiv ? ['door-migas', 'door-bk'] : [])
      ]),
      nSambil(`plf-${floorId}`, floorId, 180, 115, 'corridor', [
        `corridor-w-${floorId}`, `corridor-n-${floorId}`, `center-link-w-${floorId}`,
        ...(isAcuario ? ['door-zara'] : isLib ? ['door-samsung', 'door-apple'] : ['door-mango'])
      ]),
      nSambil(`pc-${floorId}`, floorId, 300, 220, 'corridor', [
        `center-link-w-mid-${floorId}`, `center-link-e-${floorId}`, `south-w-${floorId}`, `south-e-${floorId}`,
        ...(isAcuario ? ['door-uspolo'] : isDiv ? ['door-allegre', 'door-tibon'] : [])
      ]),
      nSambil(`pea-${floorId}`, floorId, isDiv ? 360 : 420, isDiv ? 160 : 115, 'corridor', [
        `corridor-n-${floorId}`, `corridor-e-${floorId}`, `center-link-e-${floorId}`,
        ...(isAcuario ? ['door-adidas', 'door-reebok'] : isLib ? ['door-balu'] : ['door-anfi'])
      ]),
      nSambil(`plm-${floorId}`, floorId, 480, 220, 'corridor', [
        `corridor-e-${floorId}`, `south-e-${floorId}`,
        ...(isAcuario ? ['door-ninja'] : [])
      ]),

      nSambil(`corridor-w-${floorId}`, floorId, 85, 165, 'corridor', [
        `pj-${floorId}`, `plf-${floorId}`,
        ...(isAcuario ? ['door-megan', 'door-parfois', 'door-timberland', 'door-swatch'] : isLib ? ['door-aldo'] : [])
      ]),
      nSambil(`corridor-n-${floorId}`, floorId, 300, 115, 'corridor', [
        `plf-${floorId}`, `pea-${floorId}`,
        ...(isAcuario ? ['door-columbia', 'door-pawer'] : [])
      ]),
      nSambil(`corridor-e-${floorId}`, floorId, 480, 165, 'corridor', [
        `pea-${floorId}`, `plm-${floorId}`
      ]),
      nSambil(`south-w-${floorId}`, floorId, 190, 220, 'corridor', [
        `pj-${floorId}`, `pc-${floorId}`,
        ...(isAcuario ? ['door-guess'] : isDiv ? ['door-pizzahut'] : [])
      ]),
      nSambil(`south-e-${floorId}`, floorId, 390, 220, 'corridor', [
        `pc-${floorId}`, `plm-${floorId}`,
        ...(isAcuario ? ['door-nike', 'door-miniso'] : isLib ? ['door-opticolor', 'door-xiaomi'] : [])
      ]),
      nSambil(`center-link-w-${floorId}`, floorId, 210, 140, 'corridor', [
        `plf-${floorId}`, `center-link-w-mid-${floorId}`,
        ...(isAcuario ? ['door-caroni', 'door-libros'] : isLib ? ['door-branger'] : ['door-bonsai'])
      ]),
      nSambil(`center-link-w-mid-${floorId}`, floorId, 210, 220, 'corridor', [
        `center-link-w-${floorId}`, `pc-${floorId}`
      ]),
      nSambil(`center-link-e-${floorId}`, floorId, 360, 175, 'corridor', [
        `pea-${floorId}`, `pc-${floorId}`
      ]),
    ];
  }

  // --- Grafo de Corredores de Alto Detalle para Nivel Autopista ---
  return [
    // 5 Plazas Principales
    nSambil(`pj-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 72, 250, 'entrance', [
      `cw-s-${LEVEL_AUTOPISTA}`, `cw-far-s-${LEVEL_AUTOPISTA}`, `cs-1-${LEVEL_AUTOPISTA}`,
      'door-btesoro', 'door-estivaneli', 'door-lacorte'
    ]),
    nSambil(`plf-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 180, 73, 'corridor', [
      `cw-n-${LEVEL_AUTOPISTA}`, `cn-1-${LEVEL_AUTOPISTA}`, `cc-w1-${LEVEL_AUTOPISTA}`,
      'door-macuto', 'door-planetasport', 'door-hollywood', 'door-bellagio'
    ]),
    nSambil(`pc-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 350, 250, 'corridor', [
      `cs-3-${LEVEL_AUTOPISTA}`, `cs-4-${LEVEL_AUTOPISTA}`, `cc-w3-${LEVEL_AUTOPISTA}`, `cc-e3-${LEVEL_AUTOPISTA}`,
      'door-reinaldosport', 'door-juventus', 'door-salome', 'door-boomshoes'
    ]),
    nSambil(`pea-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 530, 73, 'corridor', [
      `cn-4-${LEVEL_AUTOPISTA}`, `ce-1-${LEVEL_AUTOPISTA}`, `cc-e1-${LEVEL_AUTOPISTA}`,
      'door-sportland'
    ]),
    nSambil(`plm-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 584, 250, 'corridor', [
      `ce-3-${LEVEL_AUTOPISTA}`, `cs-6-${LEVEL_AUTOPISTA}`,
      'door-cines'
    ]),

    // Corredor Oeste (Spine Vertical x = 72)
    nSambil(`cw-n-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 72, 73, 'corridor', [
      `plf-${LEVEL_AUTOPISTA}`, `cw-mid-${LEVEL_AUTOPISTA}`, 'door-tijerazo', 'door-waikiki'
    ]),
    nSambil(`cw-mid-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 72, 160, 'corridor', [
      `cw-n-${LEVEL_AUTOPISTA}`, `cw-s-${LEVEL_AUTOPISTA}`,
      'door-blumer', 'door-bath', 'door-pawnee', 'door-yuju'
    ]),
    nSambil(`cw-s-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 72, 220, 'corridor', [
      `cw-mid-${LEVEL_AUTOPISTA}`, `pj-${LEVEL_AUTOPISTA}`
    ]),
    nSambil(`cw-far-s-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 65, 290, 'corridor', [
      `pj-${LEVEL_AUTOPISTA}`,
      'door-bigshoes', 'door-fitbody', 'door-pets', 'door-mccafe', 'door-sandro', 'door-piedy', 'door-holic'
    ]),
    nSambil(`cw-inner-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 150, 160, 'corridor', [
      `cs-1-${LEVEL_AUTOPISTA}`,
      'door-elking', 'door-minigood', 'door-heladeria4d'
    ]),

    // Corredor Norte (Spine Horizontal y = 73)
    nSambil(`cn-1-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 250, 73, 'corridor', [
      `plf-${LEVEL_AUTOPISTA}`, `cn-2-${LEVEL_AUTOPISTA}`,
      'door-jump', 'door-hgfashion', 'door-movinet', 'door-vmagic', 'door-glameclat', 'door-lucy'
    ]),
    nSambil(`cn-2-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 330, 73, 'corridor', [
      `cn-1-${LEVEL_AUTOPISTA}`, `cn-3-${LEVEL_AUTOPISTA}`,
      'door-harem', 'door-converse', 'door-euphoria', 'door-londonjeans', 'door-jeepcat', 'door-maral'
    ]),
    nSambil(`cn-3-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 400, 73, 'corridor', [
      `cn-2-${LEVEL_AUTOPISTA}`, `cn-4-${LEVEL_AUTOPISTA}`,
      'door-apolo', 'door-canguro', 'door-panots', 'door-villas', 'door-granvia'
    ]),
    nSambil(`cn-4-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 470, 73, 'corridor', [
      `cn-3-${LEVEL_AUTOPISTA}`, `pea-${LEVEL_AUTOPISTA}`,
      'door-line', 'door-springfield'
    ]),

    // Corredor Este (Spine Vertical x = 584)
    nSambil(`ce-1-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 584, 73, 'corridor', [
      `pea-${LEVEL_AUTOPISTA}`, `ce-2-${LEVEL_AUTOPISTA}`,
      'door-bnc', 'door-fashionlook', 'door-opticabilli'
    ]),
    nSambil(`ce-2-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 584, 130, 'corridor', [
      `ce-1-${LEVEL_AUTOPISTA}`, `ce-3-${LEVEL_AUTOPISTA}`,
      'door-womensecret', 'door-stradivarius', 'door-urbanmarket', 'door-mookshield'
    ]),
    nSambil(`ce-3-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 584, 180, 'corridor', [
      `ce-2-${LEVEL_AUTOPISTA}`, `plm-${LEVEL_AUTOPISTA}`,
      'door-bershka', 'door-jasis', 'door-crocs'
    ]),

    // Corredor Sur (Spine Horizontal y = 250)
    nSambil(`cs-1-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 150, 250, 'corridor', [
      `pj-${LEVEL_AUTOPISTA}`, `cs-2-${LEVEL_AUTOPISTA}`, `cw-inner-${LEVEL_AUTOPISTA}`,
      'door-vs', 'door-bhype'
    ]),
    nSambil(`cs-2-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 210, 250, 'corridor', [
      `cs-1-${LEVEL_AUTOPISTA}`, `cs-3-${LEVEL_AUTOPISTA}`,
      'door-psycobunny', 'door-aishop', 'door-jadu'
    ]),
    nSambil(`cs-3-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 280, 250, 'corridor', [
      `cs-2-${LEVEL_AUTOPISTA}`, `pc-${LEVEL_AUTOPISTA}`,
      'door-xc2', 'door-skechers', 'door-libbylu', 'door-usajeans'
    ]),
    nSambil(`cs-4-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 420, 250, 'corridor', [
      `pc-${LEVEL_AUTOPISTA}`, `cs-5-${LEVEL_AUTOPISTA}`,
      'door-sportmarket', 'door-farmatodo', 'door-primebodegon'
    ]),
    nSambil(`cs-5-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 480, 250, 'corridor', [
      `cs-4-${LEVEL_AUTOPISTA}`, `cs-6-${LEVEL_AUTOPISTA}`,
      'door-algiorno'
    ]),
    nSambil(`cs-6-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 550, 250, 'corridor', [
      `cs-5-${LEVEL_AUTOPISTA}`, `plm-${LEVEL_AUTOPISTA}`,
      'door-pullbear'
    ]),

    // Conectores Diagonales Centrales
    nSambil(`cc-w1-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 175, 135, 'corridor', [
      `plf-${LEVEL_AUTOPISTA}`, `cc-w2-${LEVEL_AUTOPISTA}`,
      'door-mng', 'door-jamesbark', 'door-rs'
    ]),
    nSambil(`cc-w2-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 267, 135, 'corridor', [
      `cc-w1-${LEVEL_AUTOPISTA}`, `cc-w3-${LEVEL_AUTOPISTA}`,
    ]),
    nSambil(`cc-w3-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 267, 200, 'corridor', [
      `cc-w2-${LEVEL_AUTOPISTA}`, `pc-${LEVEL_AUTOPISTA}`,
      'door-tommy'
    ]),
    nSambil(`cc-e1-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 495, 115, 'corridor', [
      `pea-${LEVEL_AUTOPISTA}`, `cc-e2-${LEVEL_AUTOPISTA}`,
    ]),
    nSambil(`cc-e2-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 495, 160, 'corridor', [
      `cc-e1-${LEVEL_AUTOPISTA}`, `cc-e3-${LEVEL_AUTOPISTA}`,
      'door-opticolor-auto', 'door-lucchi', 'door-brandsshop', 'door-calzafex'
    ]),
    nSambil(`cc-e3-${LEVEL_AUTOPISTA}`, LEVEL_AUTOPISTA, 495, 215, 'corridor', [
      `cc-e2-${LEVEL_AUTOPISTA}`, `pc-${LEVEL_AUTOPISTA}`,
      'door-topten18', 'door-mariohernandez'
    ]),
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
      width: 720,
      height: 360,
      areas: [
        { id: 'corridor-arc-1', kind: 'corridor', rect: { x: 40, y: 60, w: 640, h: 220 } },
        { id: 'plaza-jardin-1', kind: 'plaza', rect: { x: 50, y: 220, w: 60, h: 60 } },
        { id: 'plaza-fuente-1', kind: 'plaza', rect: { x: 150, y: 50, w: 60, h: 60 } },
        { id: 'plaza-central-1', kind: 'plaza', rect: { x: 320, y: 220, w: 60, h: 60 } },
        { id: 'plaza-arte-1', kind: 'plaza', rect: { x: 500, y: 50, w: 60, h: 60 } },
        { id: 'plaza-musica-1', kind: 'plaza', rect: { x: 560, y: 220, w: 60, h: 60 } },
      ],
      obstacles: [],
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
      obstacles: [],
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

    // ==========================================
    // PUERTAS NIVEL AUTOPISTA (Conectores perimetrales exactos)
    // ==========================================
    // Anclas
    nSambil('door-tijerazo', LEVEL_AUTOPISTA, 72, 68, 'door', [`cw-n-${LEVEL_AUTOPISTA}`]),
    nSambil('door-macuto', LEVEL_AUTOPISTA, 160, 68, 'door', [`plf-${LEVEL_AUTOPISTA}`]),
    nSambil('door-waikiki', LEVEL_AUTOPISTA, 70, 105, 'door', [`cw-n-${LEVEL_AUTOPISTA}`]),
    nSambil('door-cines', LEVEL_AUTOPISTA, 600, 238, 'door', [`plm-${LEVEL_AUTOPISTA}`]),
    nSambil('door-pullbear', LEVEL_AUTOPISTA, 553, 265, 'door', [`cs-6-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bershka', LEVEL_AUTOPISTA, 600, 174, 'door', [`ce-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-stradivarius', LEVEL_AUTOPISTA, 600, 133, 'door', [`ce-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-farmatodo', LEVEL_AUTOPISTA, 467, 265, 'door', [`cs-4-${LEVEL_AUTOPISTA}`]),
    nSambil('door-tommy', LEVEL_AUTOPISTA, 275, 166, 'door', [`cc-w3-${LEVEL_AUTOPISTA}`]),

    // Ala Oeste: Exterior
    nSambil('door-blumer', LEVEL_AUTOPISTA, 65, 146, 'door', [`cw-mid-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bath', LEVEL_AUTOPISTA, 65, 171, 'door', [`cw-mid-${LEVEL_AUTOPISTA}`]),
    nSambil('door-btesoro', LEVEL_AUTOPISTA, 65, 196, 'door', [`pj-${LEVEL_AUTOPISTA}`]),
    nSambil('door-estivaneli', LEVEL_AUTOPISTA, 65, 221, 'door', [`pj-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bigshoes', LEVEL_AUTOPISTA, 65, 246, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),
    nSambil('door-fitbody', LEVEL_AUTOPISTA, 60, 271, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),
    nSambil('door-pets', LEVEL_AUTOPISTA, 60, 296, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),
    nSambil('door-mccafe', LEVEL_AUTOPISTA, 60, 321, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),
    nSambil('door-sandro', LEVEL_AUTOPISTA, 60, 346, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),

    // Ala Oeste: Interior
    nSambil('door-lacorte', LEVEL_AUTOPISTA, 80, 196, 'door', [`pj-${LEVEL_AUTOPISTA}`]),
    nSambil('door-pawnee', LEVEL_AUTOPISTA, 80, 171, 'door', [`cw-mid-${LEVEL_AUTOPISTA}`]),
    nSambil('door-yuju', LEVEL_AUTOPISTA, 80, 146, 'door', [`cw-mid-${LEVEL_AUTOPISTA}`]),
    nSambil('door-elking', LEVEL_AUTOPISTA, 142, 146, 'door', [`cw-inner-${LEVEL_AUTOPISTA}`]),
    nSambil('door-minigood', LEVEL_AUTOPISTA, 142, 171, 'door', [`cw-inner-${LEVEL_AUTOPISTA}`]),
    nSambil('door-heladeria4d', LEVEL_AUTOPISTA, 142, 196, 'door', [`cw-inner-${LEVEL_AUTOPISTA}`]),
    nSambil('door-planetasport', LEVEL_AUTOPISTA, 158, 78, 'door', [`plf-${LEVEL_AUTOPISTA}`]),
    nSambil('door-piedy', LEVEL_AUTOPISTA, 75, 296, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),
    nSambil('door-holic', LEVEL_AUTOPISTA, 75, 321, 'door', [`cw-far-s-${LEVEL_AUTOPISTA}`]),

    // Galería Norte: Superior
    nSambil('door-hollywood', LEVEL_AUTOPISTA, 207, 68, 'door', [`plf-${LEVEL_AUTOPISTA}`]),
    nSambil('door-jump', LEVEL_AUTOPISTA, 239, 68, 'door', [`cn-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-movinet', LEVEL_AUTOPISTA, 269, 68, 'door', [`cn-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-glameclat', LEVEL_AUTOPISTA, 294, 68, 'door', [`cn-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-harem', LEVEL_AUTOPISTA, 319, 68, 'door', [`cn-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-euphoria', LEVEL_AUTOPISTA, 344, 68, 'door', [`cn-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-jeepcat', LEVEL_AUTOPISTA, 374, 68, 'door', [`cn-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-apolo', LEVEL_AUTOPISTA, 406, 68, 'door', [`cn-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-villas', LEVEL_AUTOPISTA, 441, 68, 'door', [`cn-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-springfield', LEVEL_AUTOPISTA, 480, 68, 'door', [`cn-4-${LEVEL_AUTOPISTA}`]),
    nSambil('door-sportland', LEVEL_AUTOPISTA, 520, 68, 'door', [`pea-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bnc', LEVEL_AUTOPISTA, 561, 68, 'door', [`ce-1-${LEVEL_AUTOPISTA}`]),

    // Galería Norte: Interior
    nSambil('door-bellagio', LEVEL_AUTOPISTA, 207, 78, 'door', [`plf-${LEVEL_AUTOPISTA}`]),
    nSambil('door-hgfashion', LEVEL_AUTOPISTA, 234, 78, 'door', [`cn-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-vmagic', LEVEL_AUTOPISTA, 261, 78, 'door', [`cn-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-lucy', LEVEL_AUTOPISTA, 288, 78, 'door', [`cn-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-converse', LEVEL_AUTOPISTA, 315, 78, 'door', [`cn-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-londonjeans', LEVEL_AUTOPISTA, 342, 78, 'door', [`cn-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-maral', LEVEL_AUTOPISTA, 369, 78, 'door', [`cn-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-canguro', LEVEL_AUTOPISTA, 396, 78, 'door', [`cn-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-panots', LEVEL_AUTOPISTA, 424, 78, 'door', [`cn-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-granvia', LEVEL_AUTOPISTA, 452, 78, 'door', [`cn-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-line', LEVEL_AUTOPISTA, 480, 78, 'door', [`cn-4-${LEVEL_AUTOPISTA}`]),

    // Ala Este: Exterior
    nSambil('door-fashionlook', LEVEL_AUTOPISTA, 600, 34, 'door', [`ce-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-opticabilli', LEVEL_AUTOPISTA, 600, 66, 'door', [`ce-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-womensecret', LEVEL_AUTOPISTA, 600, 98, 'door', [`ce-2-${LEVEL_AUTOPISTA}`]),

    // Ala Este: Interior / Diagonal
    nSambil('door-urbanmarket', LEVEL_AUTOPISTA, 568, 127, 'door', [`ce-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-mookshield', LEVEL_AUTOPISTA, 568, 154, 'door', [`ce-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-jasis', LEVEL_AUTOPISTA, 568, 181, 'door', [`ce-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-crocs', LEVEL_AUTOPISTA, 568, 208, 'door', [`ce-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-mariohernandez', LEVEL_AUTOPISTA, 505, 184, 'door', [`cc-e3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-brandsshop', LEVEL_AUTOPISTA, 505, 157, 'door', [`cc-e2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-lucchi', LEVEL_AUTOPISTA, 505, 130, 'door', [`cc-e2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-opticolor-auto', LEVEL_AUTOPISTA, 484, 142, 'door', [`cc-e2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-calzafex', LEVEL_AUTOPISTA, 484, 169, 'door', [`cc-e2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-topten18', LEVEL_AUTOPISTA, 484, 196, 'door', [`cc-e3-${LEVEL_AUTOPISTA}`]),

    // Pasillo Sur: Exterior
    nSambil('door-vs', LEVEL_AUTOPISTA, 124, 265, 'door', [`cs-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-bhype', LEVEL_AUTOPISTA, 159, 265, 'door', [`cs-1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-psycobunny', LEVEL_AUTOPISTA, 186, 265, 'door', [`cs-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-aishop', LEVEL_AUTOPISTA, 213, 265, 'door', [`cs-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-jadu', LEVEL_AUTOPISTA, 240, 265, 'door', [`cs-2-${LEVEL_AUTOPISTA}`]),
    nSambil('door-xc2', LEVEL_AUTOPISTA, 267, 265, 'door', [`cs-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-skechers', LEVEL_AUTOPISTA, 295, 265, 'door', [`cs-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-libbylu', LEVEL_AUTOPISTA, 322, 265, 'door', [`cs-3-${LEVEL_AUTOPISTA}`]),
    nSambil('door-usajeans', LEVEL_AUTOPISTA, 348, 265, 'door', [`cs-3-${LEVEL_AUTOPISTA}`]),

    nSambil('door-reinaldosport', LEVEL_AUTOPISTA, 377, 265, 'door', [`pc-${LEVEL_AUTOPISTA}`]),
    nSambil('door-juventus', LEVEL_AUTOPISTA, 404, 265, 'door', [`pc-${LEVEL_AUTOPISTA}`]),
    nSambil('door-sportmarket', LEVEL_AUTOPISTA, 431, 265, 'door', [`cs-4-${LEVEL_AUTOPISTA}`]),
    nSambil('door-algiorno', LEVEL_AUTOPISTA, 507, 265, 'door', [`cs-5-${LEVEL_AUTOPISTA}`]),

    // Bloque Central Interior
    nSambil('door-mng', LEVEL_AUTOPISTA, 197, 155, 'door', [`cc-w1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-jamesbark', LEVEL_AUTOPISTA, 224, 155, 'door', [`cc-w1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-rs', LEVEL_AUTOPISTA, 251, 155, 'door', [`cc-w1-${LEVEL_AUTOPISTA}`]),
    nSambil('door-boomshoes', LEVEL_AUTOPISTA, 342, 178, 'door', [`pc-${LEVEL_AUTOPISTA}`]),
    nSambil('door-salome', LEVEL_AUTOPISTA, 369, 178, 'door', [`pc-${LEVEL_AUTOPISTA}`]),
    nSambil('door-primebodegon', LEVEL_AUTOPISTA, 397, 178, 'door', [`cs-4-${LEVEL_AUTOPISTA}`]),

    // Puertas Acuario
    nSambil('door-zara', LEVEL_ACUARIO, 110, 100, 'door', [`plf-${LEVEL_ACUARIO}`]),
    nSambil('door-megan', LEVEL_ACUARIO, 75, 132, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
    nSambil('door-parfois', LEVEL_ACUARIO, 75, 182, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
    nSambil('door-swatch', LEVEL_ACUARIO, 110, 190, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
    nSambil('door-caroni', LEVEL_ACUARIO, 195, 192, 'door', [`center-link-w-${LEVEL_ACUARIO}`]),
    nSambil('door-ninja', LEVEL_ACUARIO, 480, 220, 'door', [`plm-${LEVEL_ACUARIO}`]),
    nSambil('door-nike', LEVEL_ACUARIO, 420, 230, 'door', [`south-e-${LEVEL_ACUARIO}`]),
    nSambil('door-miniso', LEVEL_ACUARIO, 360, 240, 'door', [`south-e-${LEVEL_ACUARIO}`]),
    nSambil('door-adidas', LEVEL_ACUARIO, 450, 90, 'door', [`pea-${LEVEL_ACUARIO}`]),
    nSambil('door-reebok', LEVEL_ACUARIO, 420, 85, 'door', [`pea-${LEVEL_ACUARIO}`]),
    nSambil('door-libros', LEVEL_ACUARIO, 235, 192, 'door', [`center-link-w-${LEVEL_ACUARIO}`]),
    nSambil('door-timberland', LEVEL_ACUARIO, 75, 232, 'door', [`corridor-w-${LEVEL_ACUARIO}`]),
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
    nSambil('door-anfi', LEVEL_DIVERSION, 380, 150, 'door', [`pea-${LEVEL_DIVERSION}`]),
    nSambil('door-bonsai', LEVEL_DIVERSION, 210, 160, 'door', [`center-link-w-${LEVEL_DIVERSION}`]),
    nSambil('door-migas', LEVEL_DIVERSION, 90, 230, 'door', [`pj-${LEVEL_DIVERSION}`]),
    nSambil('door-pizzahut', LEVEL_DIVERSION, 150, 230, 'door', [`south-w-${LEVEL_DIVERSION}`]),
    nSambil('door-bk', LEVEL_DIVERSION, 75, 230, 'door', [`pj-${LEVEL_DIVERSION}`]),
    nSambil('door-allegre', LEVEL_DIVERSION, 270, 230, 'door', [`pc-${LEVEL_DIVERSION}`]),
    nSambil('door-tibon', LEVEL_DIVERSION, 330, 230, 'door', [`pc-${LEVEL_DIVERSION}`]),
  ],
};
