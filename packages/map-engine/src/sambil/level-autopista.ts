import type { MapFloor, MapStore, NavNode, MapProp } from '../types';
import { LEVEL_AUTOPISTA } from './constants';

export const propsSambilAutopista: MapProp[] = [
  { id: 'fnt-auto-1', kind: 'fountain', rect: { x: 152, y: 52, w: 14, h: 14 } },
  { id: 'arb-sa1', kind: 'tree', x: 90, y: 235 },
  { id: 'arb-sa2', kind: 'tree', x: 310, y: 220 },
  { id: 'arb-sa3', kind: 'tree', x: 550, y: 235 },
  { id: 'banca-sa1', kind: 'bench', rect: { x: 130, y: 135, w: 14, h: 4 } },
  { id: 'banca-sa2', kind: 'bench', rect: { x: 430, y: 135, w: 14, h: 4 } },
  { id: 'esc-sa1', kind: 'escalator', rect: { x: 135, y: 35, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-sa2', kind: 'escalator', rect: { x: 515, y: 35, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-sa3', kind: 'escalator', rect: { x: 330, y: 280, w: 16, h: 10 }, flow: 'max' },
  { id: 'info-sa1', kind: 'poi', poi: 'info', x: 350, y: 245, z: 18 },
  { id: 'wc-sa1', kind: 'poi', poi: 'wc', x: 72, y: 260, z: 16 },
  { id: 'wc-sa2', kind: 'poi', poi: 'wc', x: 584, y: 260, z: 16 },
  { id: 'atm-sa1', kind: 'poi', poi: 'atm', x: 540, y: 55, z: 16 },
];

export const storesSambilAutopista: MapStore[] = [
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

  // --- ALA OESTE: EXTERIOR ---
  { id: 'palacio_blumer', name: 'Palacio del Blumer', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 135, w: 45, h: 22, height: 8, doorNodeId: 'door-blumer' },
  { id: 'bath_body', name: 'Bath & Body Works', category: 'health', floorId: LEVEL_AUTOPISTA, x: 20, y: 160, w: 45, h: 22, height: 9, doorNodeId: 'door-bath' },
  { id: 'banco_tesoro', name: 'Banco del Tesoro', category: 'finance', floorId: LEVEL_AUTOPISTA, x: 20, y: 185, w: 45, h: 22, height: 8, doorNodeId: 'door-btesoro' },
  { id: 'estivaneli', name: 'Estivaneli', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 210, w: 45, h: 22, height: 8, doorNodeId: 'door-estivaneli' },
  { id: 'big_shoes', name: 'Big Shoes', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 235, w: 45, h: 22, height: 7, doorNodeId: 'door-bigshoes' },
  { id: 'fit_body_care', name: 'Fit Body Care', category: 'health', floorId: LEVEL_AUTOPISTA, x: 20, y: 260, w: 40, h: 22, height: 7, doorNodeId: 'door-fitbody' },
  { id: 'pets_planet', name: 'Pets Planet', category: 'home', floorId: LEVEL_AUTOPISTA, x: 20, y: 285, w: 40, h: 22, height: 7, doorNodeId: 'door-pets' },
  { id: 'mc_cafe', name: 'MC. Café', category: 'food', floorId: LEVEL_AUTOPISTA, x: 20, y: 310, w: 40, h: 22, height: 7, doorNodeId: 'door-mccafe' },
  { id: 'sandro', name: 'Sandro', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 20, y: 335, w: 40, h: 22, height: 7, doorNodeId: 'door-sandro' },

  // --- ALA OESTE: INTERIOR ---
  { id: 'yuju', name: 'Yuju', category: 'entertainment', floorId: LEVEL_AUTOPISTA, x: 80, y: 135, w: 26, h: 22, height: 7, doorNodeId: 'door-yuju' },
  { id: 'pawnee', name: 'Pawnee', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 80, y: 160, w: 26, h: 22, height: 7, doorNodeId: 'door-pawnee' },
  { id: 'la_corte', name: 'La Corte', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 80, y: 185, w: 26, h: 22, height: 7, doorNodeId: 'door-lacorte' },
  { id: 'el_king_gourmet', name: 'El King Gourmet', category: 'food', floorId: LEVEL_AUTOPISTA, x: 114, y: 135, w: 28, h: 22, height: 7, doorNodeId: 'door-elking' },
  { id: 'mini_good', name: 'Mini Good', category: 'home', floorId: LEVEL_AUTOPISTA, x: 114, y: 160, w: 28, h: 22, height: 7, doorNodeId: 'door-minigood' },
  { id: 'heladeria_4d', name: 'Heladería 4D', category: 'food', floorId: LEVEL_AUTOPISTA, x: 114, y: 185, w: 28, h: 22, height: 7, doorNodeId: 'door-heladeria4d' },
  { id: 'piedy', name: 'Piedy', category: 'health', floorId: LEVEL_AUTOPISTA, x: 75, y: 285, w: 25, h: 22, height: 7, doorNodeId: 'door-piedy' },
  { id: 'holic_shop', name: 'Holic Shop', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 75, y: 310, w: 25, h: 22, height: 7, doorNodeId: 'door-holic' },

  // --- GALERÍA NORTE: EXTERIOR ---
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

  // --- GALERÍA NORTE: INTERIOR ---
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

  // --- ALA ESTE: EXTERIOR ---
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

  // --- PASILLO SUR: EXTERIOR ---
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

  // --- BLOQUE CENTRAL INTERIOR ---
  { id: 'mng', name: 'MNG (Mango)', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 185, y: 155, w: 24, h: 25, height: 9, doorNodeId: 'door-mng' },
  { id: 'james_bark', name: 'James Bark', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 212, y: 155, w: 24, h: 25, height: 8, doorNodeId: 'door-jamesbark' },
  { id: 'rs', name: 'RS', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 239, y: 155, w: 24, h: 25, height: 8, doorNodeId: 'door-rs' },
  { id: 'boom_shoes', name: 'Boom Shoes', category: 'fashion', floorId: LEVEL_AUTOPISTA, x: 330, y: 150, w: 24, h: 28, height: 8, doorNodeId: 'door-boomshoes' },
  { id: 'salome', name: 'Salome Makeup', category: 'health', floorId: LEVEL_AUTOPISTA, x: 357, y: 150, w: 24, h: 28, height: 8, doorNodeId: 'door-salome' },
  { id: 'prime_bodegon', name: 'Prime Bodegón', category: 'food', floorId: LEVEL_AUTOPISTA, x: 384, y: 150, w: 26, h: 28, height: 8, doorNodeId: 'door-primebodegon' },
];

export const floorAutopistaData: MapFloor = {
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
};

export const nodesAutopista: NavNode[] = [
  // 5 Plazas Principales
  { id: `pj-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 72, y: 250, kind: 'entrance', connections: [`cw-s-${LEVEL_AUTOPISTA}`, `cw-far-s-${LEVEL_AUTOPISTA}`, `cs-1-${LEVEL_AUTOPISTA}`, 'v-pj-1', 'door-btesoro', 'door-estivaneli', 'door-lacorte'] },
  { id: `plf-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 180, y: 73, kind: 'corridor', connections: [`cw-n-${LEVEL_AUTOPISTA}`, `cn-1-${LEVEL_AUTOPISTA}`, `cc-w1-${LEVEL_AUTOPISTA}`, 'v-plf-1', 'door-macuto', 'door-planetasport', 'door-hollywood', 'door-bellagio'] },
  { id: `pc-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 350, y: 250, kind: 'corridor', connections: [`cs-3-${LEVEL_AUTOPISTA}`, `cs-4-${LEVEL_AUTOPISTA}`, `cc-w3-${LEVEL_AUTOPISTA}`, `cc-e3-${LEVEL_AUTOPISTA}`, 'v-pc-1', 'door-reinaldosport', 'door-juventus', 'door-salome', 'door-boomshoes'] },
  { id: `pea-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 530, y: 73, kind: 'corridor', connections: [`cn-4-${LEVEL_AUTOPISTA}`, `ce-1-${LEVEL_AUTOPISTA}`, `cc-e1-${LEVEL_AUTOPISTA}`, 'v-pea-1', 'door-sportland'] },
  { id: `plm-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 584, y: 250, kind: 'corridor', connections: [`ce-3-${LEVEL_AUTOPISTA}`, `cs-6-${LEVEL_AUTOPISTA}`, 'v-plm-1', 'door-cines'] },

  // Corredor Oeste (x = 72)
  { id: `cw-n-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 72, y: 73, kind: 'corridor', connections: [`plf-${LEVEL_AUTOPISTA}`, `cw-mid-${LEVEL_AUTOPISTA}`, 'door-tijerazo', 'door-waikiki'] },
  { id: `cw-mid-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 72, y: 160, kind: 'corridor', connections: [`cw-n-${LEVEL_AUTOPISTA}`, `cw-s-${LEVEL_AUTOPISTA}`, 'door-blumer', 'door-bath', 'door-pawnee', 'door-yuju'] },
  { id: `cw-s-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 72, y: 220, kind: 'corridor', connections: [`cw-mid-${LEVEL_AUTOPISTA}`, `pj-${LEVEL_AUTOPISTA}`] },
  { id: `cw-far-s-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 65, y: 290, kind: 'corridor', connections: [`pj-${LEVEL_AUTOPISTA}`, 'door-bigshoes', 'door-fitbody', 'door-pets', 'door-mccafe', 'door-sandro', 'door-piedy', 'door-holic'] },
  { id: `cw-inner-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 150, y: 160, kind: 'corridor', connections: [`cs-1-${LEVEL_AUTOPISTA}`, 'door-elking', 'door-minigood', 'door-heladeria4d'] },

  // Corredor Norte (y = 73)
  { id: `cn-1-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 250, y: 73, kind: 'corridor', connections: [`plf-${LEVEL_AUTOPISTA}`, `cn-2-${LEVEL_AUTOPISTA}`, 'door-jump', 'door-hgfashion', 'door-movinet', 'door-vmagic', 'door-glameclat', 'door-lucy'] },
  { id: `cn-2-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 330, y: 73, kind: 'corridor', connections: [`cn-1-${LEVEL_AUTOPISTA}`, `cn-3-${LEVEL_AUTOPISTA}`, 'door-harem', 'door-converse', 'door-euphoria', 'door-londonjeans', 'door-jeepcat', 'door-maral'] },
  { id: `cn-3-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 400, y: 73, kind: 'corridor', connections: [`cn-2-${LEVEL_AUTOPISTA}`, `cn-4-${LEVEL_AUTOPISTA}`, 'door-apolo', 'door-canguro', 'door-panots', 'door-villas', 'door-granvia'] },
  { id: `cn-4-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 470, y: 73, kind: 'corridor', connections: [`cn-3-${LEVEL_AUTOPISTA}`, `pea-${LEVEL_AUTOPISTA}`, 'door-line', 'door-springfield'] },

  // Corredor Este (x = 584)
  { id: `ce-1-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 584, y: 73, kind: 'corridor', connections: [`pea-${LEVEL_AUTOPISTA}`, `ce-2-${LEVEL_AUTOPISTA}`, 'door-bnc', 'door-fashionlook', 'door-opticabilli'] },
  { id: `ce-2-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 584, y: 130, kind: 'corridor', connections: [`ce-1-${LEVEL_AUTOPISTA}`, `ce-3-${LEVEL_AUTOPISTA}`, 'door-womensecret', 'door-stradivarius', 'door-urbanmarket', 'door-mookshield'] },
  { id: `ce-3-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 584, y: 180, kind: 'corridor', connections: [`ce-2-${LEVEL_AUTOPISTA}`, `plm-${LEVEL_AUTOPISTA}`, 'door-bershka', 'door-jasis', 'door-crocs'] },

  // Corredor Sur (y = 250)
  { id: `cs-1-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 150, y: 250, kind: 'corridor', connections: [`pj-${LEVEL_AUTOPISTA}`, `cs-2-${LEVEL_AUTOPISTA}`, `cw-inner-${LEVEL_AUTOPISTA}`, 'door-vs', 'door-bhype'] },
  { id: `cs-2-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 210, y: 250, kind: 'corridor', connections: [`cs-1-${LEVEL_AUTOPISTA}`, `cs-3-${LEVEL_AUTOPISTA}`, 'door-psycobunny', 'door-aishop', 'door-jadu'] },
  { id: `cs-3-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 280, y: 250, kind: 'corridor', connections: [`cs-2-${LEVEL_AUTOPISTA}`, `pc-${LEVEL_AUTOPISTA}`, 'door-xc2', 'door-skechers', 'door-libbylu', 'door-usajeans'] },
  { id: `cs-4-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 420, y: 250, kind: 'corridor', connections: [`pc-${LEVEL_AUTOPISTA}`, `cs-5-${LEVEL_AUTOPISTA}`, 'door-sportmarket', 'door-farmatodo', 'door-primebodegon'] },
  { id: `cs-5-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 480, y: 250, kind: 'corridor', connections: [`cs-4-${LEVEL_AUTOPISTA}`, `cs-6-${LEVEL_AUTOPISTA}`, 'door-algiorno'] },
  { id: `cs-6-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 550, y: 250, kind: 'corridor', connections: [`cs-5-${LEVEL_AUTOPISTA}`, `plm-${LEVEL_AUTOPISTA}`, 'door-pullbear'] },

  // Diagonales Centrales
  { id: `cc-w1-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 175, y: 135, kind: 'corridor', connections: [`plf-${LEVEL_AUTOPISTA}`, `cc-w2-${LEVEL_AUTOPISTA}`, 'door-mng', 'door-jamesbark', 'door-rs'] },
  { id: `cc-w2-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 267, y: 135, kind: 'corridor', connections: [`cc-w1-${LEVEL_AUTOPISTA}`, `cc-w3-${LEVEL_AUTOPISTA}`] },
  { id: `cc-w3-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 267, y: 200, kind: 'corridor', connections: [`cc-w2-${LEVEL_AUTOPISTA}`, `pc-${LEVEL_AUTOPISTA}`, 'door-tommy'] },
  { id: `cc-e1-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 495, y: 115, kind: 'corridor', connections: [`pea-${LEVEL_AUTOPISTA}`, `cc-e2-${LEVEL_AUTOPISTA}`] },
  { id: `cc-e2-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 495, y: 160, kind: 'corridor', connections: [`cc-e1-${LEVEL_AUTOPISTA}`, `cc-e3-${LEVEL_AUTOPISTA}`, 'door-opticolor-auto', 'door-lucchi', 'door-brandsshop', 'door-calzafex'] },
  { id: `cc-e3-${LEVEL_AUTOPISTA}`, floorId: LEVEL_AUTOPISTA, x: 495, y: 215, kind: 'corridor', connections: [`cc-e2-${LEVEL_AUTOPISTA}`, `pc-${LEVEL_AUTOPISTA}`, 'door-topten18', 'door-mariohernandez'] },

  // Puertas Autopista
  { id: 'door-tijerazo', floorId: LEVEL_AUTOPISTA, x: 72, y: 68, kind: 'door', connections: [`cw-n-${LEVEL_AUTOPISTA}`] },
  { id: 'door-macuto', floorId: LEVEL_AUTOPISTA, x: 160, y: 68, kind: 'door', connections: [`plf-${LEVEL_AUTOPISTA}`] },
  { id: 'door-waikiki', floorId: LEVEL_AUTOPISTA, x: 70, y: 105, kind: 'door', connections: [`cw-n-${LEVEL_AUTOPISTA}`] },
  { id: 'door-cines', floorId: LEVEL_AUTOPISTA, x: 600, y: 238, kind: 'door', connections: [`plm-${LEVEL_AUTOPISTA}`] },
  { id: 'door-pullbear', floorId: LEVEL_AUTOPISTA, x: 553, y: 265, kind: 'door', connections: [`cs-6-${LEVEL_AUTOPISTA}`] },
  { id: 'door-bershka', floorId: LEVEL_AUTOPISTA, x: 600, y: 174, kind: 'door', connections: [`ce-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-stradivarius', floorId: LEVEL_AUTOPISTA, x: 600, y: 133, kind: 'door', connections: [`ce-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-farmatodo', floorId: LEVEL_AUTOPISTA, x: 467, y: 265, kind: 'door', connections: [`cs-4-${LEVEL_AUTOPISTA}`] },
  { id: 'door-tommy', floorId: LEVEL_AUTOPISTA, x: 275, y: 166, kind: 'door', connections: [`cc-w3-${LEVEL_AUTOPISTA}`] },

  { id: 'door-blumer', floorId: LEVEL_AUTOPISTA, x: 65, y: 146, kind: 'door', connections: [`cw-mid-${LEVEL_AUTOPISTA}`] },
  { id: 'door-bath', floorId: LEVEL_AUTOPISTA, x: 65, y: 171, kind: 'door', connections: [`cw-mid-${LEVEL_AUTOPISTA}`] },
  { id: 'door-btesoro', floorId: LEVEL_AUTOPISTA, x: 65, y: 196, kind: 'door', connections: [`pj-${LEVEL_AUTOPISTA}`] },
  { id: 'door-estivaneli', floorId: LEVEL_AUTOPISTA, x: 65, y: 221, kind: 'door', connections: [`pj-${LEVEL_AUTOPISTA}`] },
  { id: 'door-bigshoes', floorId: LEVEL_AUTOPISTA, x: 65, y: 246, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },
  { id: 'door-fitbody', floorId: LEVEL_AUTOPISTA, x: 60, y: 271, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },
  { id: 'door-pets', floorId: LEVEL_AUTOPISTA, x: 60, y: 296, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },
  { id: 'door-mccafe', floorId: LEVEL_AUTOPISTA, x: 60, y: 321, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },
  { id: 'door-sandro', floorId: LEVEL_AUTOPISTA, x: 60, y: 346, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },

  { id: 'door-lacorte', floorId: LEVEL_AUTOPISTA, x: 80, y: 196, kind: 'door', connections: [`pj-${LEVEL_AUTOPISTA}`] },
  { id: 'door-pawnee', floorId: LEVEL_AUTOPISTA, x: 80, y: 171, kind: 'door', connections: [`cw-mid-${LEVEL_AUTOPISTA}`] },
  { id: 'door-yuju', floorId: LEVEL_AUTOPISTA, x: 80, y: 146, kind: 'door', connections: [`cw-mid-${LEVEL_AUTOPISTA}`] },
  { id: 'door-elking', floorId: LEVEL_AUTOPISTA, x: 142, y: 146, kind: 'door', connections: [`cw-inner-${LEVEL_AUTOPISTA}`] },
  { id: 'door-minigood', floorId: LEVEL_AUTOPISTA, x: 142, y: 171, kind: 'door', connections: [`cw-inner-${LEVEL_AUTOPISTA}`] },
  { id: 'door-heladeria4d', floorId: LEVEL_AUTOPISTA, x: 142, y: 196, kind: 'door', connections: [`cw-inner-${LEVEL_AUTOPISTA}`] },
  { id: 'door-planetasport', floorId: LEVEL_AUTOPISTA, x: 158, y: 78, kind: 'door', connections: [`plf-${LEVEL_AUTOPISTA}`] },
  { id: 'door-piedy', floorId: LEVEL_AUTOPISTA, x: 75, y: 296, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },
  { id: 'door-holic', floorId: LEVEL_AUTOPISTA, x: 75, y: 321, kind: 'door', connections: [`cw-far-s-${LEVEL_AUTOPISTA}`] },

  { id: 'door-hollywood', floorId: LEVEL_AUTOPISTA, x: 207, y: 68, kind: 'door', connections: [`plf-${LEVEL_AUTOPISTA}`] },
  { id: 'door-jump', floorId: LEVEL_AUTOPISTA, x: 239, y: 68, kind: 'door', connections: [`cn-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-movinet', floorId: LEVEL_AUTOPISTA, x: 269, y: 68, kind: 'door', connections: [`cn-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-glameclat', floorId: LEVEL_AUTOPISTA, x: 294, y: 68, kind: 'door', connections: [`cn-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-harem', floorId: LEVEL_AUTOPISTA, x: 319, y: 68, kind: 'door', connections: [`cn-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-euphoria', floorId: LEVEL_AUTOPISTA, x: 344, y: 68, kind: 'door', connections: [`cn-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-jeepcat', floorId: LEVEL_AUTOPISTA, x: 374, y: 68, kind: 'door', connections: [`cn-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-apolo', floorId: LEVEL_AUTOPISTA, x: 406, y: 68, kind: 'door', connections: [`cn-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-villas', floorId: LEVEL_AUTOPISTA, x: 441, y: 68, kind: 'door', connections: [`cn-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-springfield', floorId: LEVEL_AUTOPISTA, x: 480, y: 68, kind: 'door', connections: [`cn-4-${LEVEL_AUTOPISTA}`] },
  { id: 'door-sportland', floorId: LEVEL_AUTOPISTA, x: 520, y: 68, kind: 'door', connections: [`pea-${LEVEL_AUTOPISTA}`] },
  { id: 'door-bnc', floorId: LEVEL_AUTOPISTA, x: 561, y: 68, kind: 'door', connections: [`ce-1-${LEVEL_AUTOPISTA}`] },

  { id: 'door-bellagio', floorId: LEVEL_AUTOPISTA, x: 207, y: 78, kind: 'door', connections: [`plf-${LEVEL_AUTOPISTA}`] },
  { id: 'door-hgfashion', floorId: LEVEL_AUTOPISTA, x: 234, y: 78, kind: 'door', connections: [`cn-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-vmagic', floorId: LEVEL_AUTOPISTA, x: 261, y: 78, kind: 'door', connections: [`cn-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-lucy', floorId: LEVEL_AUTOPISTA, x: 288, y: 78, kind: 'door', connections: [`cn-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-converse', floorId: LEVEL_AUTOPISTA, x: 315, y: 78, kind: 'door', connections: [`cn-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-londonjeans', floorId: LEVEL_AUTOPISTA, x: 342, y: 78, kind: 'door', connections: [`cn-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-maral', floorId: LEVEL_AUTOPISTA, x: 369, y: 78, kind: 'door', connections: [`cn-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-canguro', floorId: LEVEL_AUTOPISTA, x: 396, y: 78, kind: 'door', connections: [`cn-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-panots', floorId: LEVEL_AUTOPISTA, x: 424, y: 78, kind: 'door', connections: [`cn-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-granvia', floorId: LEVEL_AUTOPISTA, x: 452, y: 78, kind: 'door', connections: [`cn-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-line', floorId: LEVEL_AUTOPISTA, x: 480, y: 78, kind: 'door', connections: [`cn-4-${LEVEL_AUTOPISTA}`] },

  { id: 'door-fashionlook', floorId: LEVEL_AUTOPISTA, x: 600, y: 34, kind: 'door', connections: [`ce-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-opticabilli', floorId: LEVEL_AUTOPISTA, x: 600, y: 66, kind: 'door', connections: [`ce-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-womensecret', floorId: LEVEL_AUTOPISTA, x: 600, y: 98, kind: 'door', connections: [`ce-2-${LEVEL_AUTOPISTA}`] },

  { id: 'door-urbanmarket', floorId: LEVEL_AUTOPISTA, x: 568, y: 127, kind: 'door', connections: [`ce-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-mookshield', floorId: LEVEL_AUTOPISTA, x: 568, y: 154, kind: 'door', connections: [`ce-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-jasis', floorId: LEVEL_AUTOPISTA, x: 568, y: 181, kind: 'door', connections: [`ce-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-crocs', floorId: LEVEL_AUTOPISTA, x: 568, y: 208, kind: 'door', connections: [`ce-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-mariohernandez', floorId: LEVEL_AUTOPISTA, x: 505, y: 184, kind: 'door', connections: [`cc-e3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-brandsshop', floorId: LEVEL_AUTOPISTA, x: 505, y: 157, kind: 'door', connections: [`cc-e2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-lucchi', floorId: LEVEL_AUTOPISTA, x: 505, y: 130, kind: 'door', connections: [`cc-e2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-opticolor-auto', floorId: LEVEL_AUTOPISTA, x: 484, y: 142, kind: 'door', connections: [`cc-e2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-calzafex', floorId: LEVEL_AUTOPISTA, x: 484, y: 169, kind: 'door', connections: [`cc-e2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-topten18', floorId: LEVEL_AUTOPISTA, x: 484, y: 196, kind: 'door', connections: [`cc-e3-${LEVEL_AUTOPISTA}`] },

  { id: 'door-vs', floorId: LEVEL_AUTOPISTA, x: 124, y: 265, kind: 'door', connections: [`cs-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-bhype', floorId: LEVEL_AUTOPISTA, x: 159, y: 265, kind: 'door', connections: [`cs-1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-psycobunny', floorId: LEVEL_AUTOPISTA, x: 186, y: 265, kind: 'door', connections: [`cs-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-aishop', floorId: LEVEL_AUTOPISTA, x: 213, y: 265, kind: 'door', connections: [`cs-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-jadu', floorId: LEVEL_AUTOPISTA, x: 240, y: 265, kind: 'door', connections: [`cs-2-${LEVEL_AUTOPISTA}`] },
  { id: 'door-xc2', floorId: LEVEL_AUTOPISTA, x: 267, y: 265, kind: 'door', connections: [`cs-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-skechers', floorId: LEVEL_AUTOPISTA, x: 295, y: 265, kind: 'door', connections: [`cs-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-libbylu', floorId: LEVEL_AUTOPISTA, x: 322, y: 265, kind: 'door', connections: [`cs-3-${LEVEL_AUTOPISTA}`] },
  { id: 'door-usajeans', floorId: LEVEL_AUTOPISTA, x: 348, y: 265, kind: 'door', connections: [`cs-3-${LEVEL_AUTOPISTA}`] },

  { id: 'door-reinaldosport', floorId: LEVEL_AUTOPISTA, x: 377, y: 265, kind: 'door', connections: [`pc-${LEVEL_AUTOPISTA}`] },
  { id: 'door-juventus', floorId: LEVEL_AUTOPISTA, x: 404, y: 265, kind: 'door', connections: [`pc-${LEVEL_AUTOPISTA}`] },
  { id: 'door-sportmarket', floorId: LEVEL_AUTOPISTA, x: 431, y: 265, kind: 'door', connections: [`cs-4-${LEVEL_AUTOPISTA}`] },
  { id: 'door-algiorno', floorId: LEVEL_AUTOPISTA, x: 507, y: 265, kind: 'door', connections: [`cs-5-${LEVEL_AUTOPISTA}`] },

  { id: 'door-mng', floorId: LEVEL_AUTOPISTA, x: 197, y: 155, kind: 'door', connections: [`cc-w1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-jamesbark', floorId: LEVEL_AUTOPISTA, x: 224, y: 155, kind: 'door', connections: [`cc-w1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-rs', floorId: LEVEL_AUTOPISTA, x: 251, y: 155, kind: 'door', connections: [`cc-w1-${LEVEL_AUTOPISTA}`] },
  { id: 'door-boomshoes', floorId: LEVEL_AUTOPISTA, x: 342, y: 178, kind: 'door', connections: [`pc-${LEVEL_AUTOPISTA}`] },
  { id: 'door-salome', floorId: LEVEL_AUTOPISTA, x: 369, y: 178, kind: 'door', connections: [`pc-${LEVEL_AUTOPISTA}`] },
  { id: 'door-primebodegon', floorId: LEVEL_AUTOPISTA, x: 397, y: 178, kind: 'door', connections: [`cs-4-${LEVEL_AUTOPISTA}`] },
];
