import type { MapFloor, MapStore, NavNode, MapProp } from '../types';
import { LEVEL_FERIA } from './constants';

export const propsSambilFeria: MapProp[] = [
  { id: 'fnt-fer-1', kind: 'fountain', rect: { x: 175, y: 95, w: 12, h: 12 } },
  { id: 'arb-fer1', kind: 'tree', x: 95, y: 235 },
  { id: 'arb-fer2', kind: 'tree', x: 310, y: 220 },
  { id: 'arb-fer3', kind: 'tree', x: 550, y: 120 },
  { id: 'banca-fer1', kind: 'bench', rect: { x: 130, y: 135, w: 14, h: 4 } },
  { id: 'banca-fer2', kind: 'bench', rect: { x: 430, y: 135, w: 14, h: 4 } },
  { id: 'esc-fer1', kind: 'escalator', rect: { x: 135, y: 35, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-fer2', kind: 'escalator', rect: { x: 520, y: 35, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-fer3', kind: 'escalator', rect: { x: 330, y: 280, w: 16, h: 10 }, flow: 'max' },
  { id: 'info-fer1', kind: 'poi', poi: 'info', x: 350, y: 245, z: 18 },
  { id: 'wc-fer1', kind: 'poi', poi: 'wc', x: 50, y: 260, z: 16 },
  { id: 'wc-fer2', kind: 'poi', poi: 'wc', x: 220, y: 20, z: 16 },
  { id: 'atm-fer1', kind: 'poi', poi: 'atm', x: 525, y: 55, z: 16 },
];

export const storesSambilFeria: MapStore[] = [
  // --- GRANDES ANCLAS Y MEGA-LOCALES (Nivel Feria / Plano Oficial) ---
  { id: 'cinex', name: 'Cinex (1.344 m²)', category: 'entertainment', floorId: LEVEL_FERIA, x: 20, y: 20, w: 120, h: 48, height: 16, doorNodeId: 'door-cinex' },
  { id: 'palacio_blumer_feria', name: 'Palacio del Blumer (391 m²)', category: 'fashion', floorId: LEVEL_FERIA, x: 145, y: 20, w: 25, h: 48, height: 10, doorNodeId: 'door-palacioblumer-fer' },
  { id: 'shoe_box', name: 'Shoe Box (133 m²)', category: 'fashion', floorId: LEVEL_FERIA, x: 173, y: 20, w: 22, h: 48, height: 9, doorNodeId: 'door-shoebox' },
  { id: 'farmatodo_feria', name: 'Farmatodo (225 m²)', category: 'services', floorId: LEVEL_FERIA, x: 198, y: 20, w: 30, h: 48, height: 10, doorNodeId: 'door-farmatodo-fer' },
  { id: 'anfiteatro_feria', name: 'Anfiteatro Sambil / Terraza VIP', category: 'entertainment', floorId: LEVEL_FERIA, x: 600, y: 100, w: 110, h: 180, height: 18, doorNodeId: 'door-anfiteatro' },
  { id: 'forever_21', name: 'Forever 21 Flagship', category: 'fashion', floorId: LEVEL_FERIA, x: 208, y: 265, w: 82, h: 45, height: 14, doorNodeId: 'door-forever21' },
  { id: 'mcdonalds_feria', name: "McDonald's Sambil", category: 'food', floorId: LEVEL_FERIA, x: 470, y: 20, w: 45, h: 48, height: 12, doorNodeId: 'door-mcdonalds' },
  { id: 'banesco_feria', name: 'Banesco Banca Universal', category: 'finance', floorId: LEVEL_FERIA, x: 80, y: 265, w: 35, h: 45, height: 11, doorNodeId: 'door-banesco-fer' },

  // --- GALERÍA NORTE & ZONA GOURMET (Locales alineados en fila norte) ---
  { id: 'canon', name: 'Canon', category: 'tech', floorId: LEVEL_FERIA, x: 232, y: 20, w: 16, h: 48, height: 8, doorNodeId: 'door-canon' },
  { id: 'pandora_feria', name: 'Pandora', category: 'fashion', floorId: LEVEL_FERIA, x: 250, y: 20, w: 16, h: 48, height: 8, doorNodeId: 'door-pandora-fer' },
  { id: 'mr_sub_feria', name: 'Mr. Sub', category: 'food', floorId: LEVEL_FERIA, x: 268, y: 20, w: 18, h: 48, height: 8, doorNodeId: 'door-mrsub-fer' },
  { id: 'charles_feria', name: 'Charles', category: 'fashion', floorId: LEVEL_FERIA, x: 288, y: 20, w: 18, h: 48, height: 8, doorNodeId: 'door-charles-fer' },
  { id: 'pollo_dorado', name: 'Pollo Dorado', category: 'food', floorId: LEVEL_FERIA, x: 308, y: 20, w: 20, h: 48, height: 8, doorNodeId: 'door-pollodorado' },
  { id: 'zona_gourmet', name: 'Zona Gourmet Sambil (Bonsai Sushi)', category: 'food', floorId: LEVEL_FERIA, x: 330, y: 20, w: 24, h: 48, height: 12, doorNodeId: 'door-zonagourmet' },
  { id: 'chino_feria', name: 'Comida China Express', category: 'food', floorId: LEVEL_FERIA, x: 356, y: 20, w: 20, h: 48, height: 7, doorNodeId: 'door-chino-fer' },
  { id: 'chicken_grill_feria', name: 'Chicken Grill', category: 'food', floorId: LEVEL_FERIA, x: 378, y: 20, w: 20, h: 48, height: 7, doorNodeId: 'door-chickengrill-fer' },
  { id: 'burritos_feria', name: 'Burritos Mexican Food', category: 'food', floorId: LEVEL_FERIA, x: 400, y: 20, w: 20, h: 48, height: 7, doorNodeId: 'door-burritos-fer' },
  { id: 'burger_shack_feria', name: 'Burger Shack', category: 'food', floorId: LEVEL_FERIA, x: 422, y: 20, w: 22, h: 48, height: 8, doorNodeId: 'door-burgershack-fer' },
  { id: 'pizza_mia_feria', name: 'Pizza Mía', category: 'food', floorId: LEVEL_FERIA, x: 446, y: 20, w: 22, h: 48, height: 7, doorNodeId: 'door-pizzamia-fer' },

  // --- FERIA DE COMIDA RÁPIDA (Isla Central Superior) ---
  { id: 'casio_cubitt', name: 'Casio / Cubitt', category: 'tech', floorId: LEVEL_FERIA, x: 232, y: 78, w: 22, h: 28, height: 7, doorNodeId: 'door-casiocubitt' },
  { id: 'yogy', name: 'Yogy Frozen Yogurt', category: 'food', floorId: LEVEL_FERIA, x: 256, y: 78, w: 20, h: 28, height: 7, doorNodeId: 'door-yogy' },
  { id: 'cuadro_feria', name: 'Cuadro', category: 'fashion', floorId: LEVEL_FERIA, x: 278, y: 78, w: 24, h: 28, height: 7, doorNodeId: 'door-cuadro-fer' },
  { id: 'orange_market', name: 'Orange Market', category: 'services', floorId: LEVEL_FERIA, x: 304, y: 78, w: 26, h: 28, height: 8, doorNodeId: 'door-orangemarket' },
  { id: 'st_jacks_feria', name: 'St. Jacks', category: 'fashion', floorId: LEVEL_FERIA, x: 332, y: 78, w: 24, h: 28, height: 7, doorNodeId: 'door-stjacks-fer' },
  { id: 'gelateria_4d', name: '4D Gelatería', category: 'food', floorId: LEVEL_FERIA, x: 358, y: 78, w: 20, h: 28, height: 7, doorNodeId: 'door-gelateria4d' },
  { id: 'chop_chop', name: 'Chop Chop Wok', category: 'food', floorId: LEVEL_FERIA, x: 380, y: 78, w: 20, h: 28, height: 7, doorNodeId: 'door-chopchop' },
  { id: 'caracas_burger', name: 'Caracas Burger', category: 'food', floorId: LEVEL_FERIA, x: 402, y: 78, w: 22, h: 28, height: 8, doorNodeId: 'door-caracasburger' },
  { id: 'beijing', name: 'Beijing Express', category: 'food', floorId: LEVEL_FERIA, x: 426, y: 78, w: 22, h: 28, height: 7, doorNodeId: 'door-beijing' },
  { id: 'full_pizza', name: 'Full Pizza', category: 'food', floorId: LEVEL_FERIA, x: 450, y: 78, w: 20, h: 28, height: 7, doorNodeId: 'door-fullpizza' },

  // --- ALA OESTE & PLAZA JARDÍN ---
  { id: 'covas', name: 'Covas', category: 'fashion', floorId: LEVEL_FERIA, x: 80, y: 80, w: 28, h: 24, height: 7, doorNodeId: 'door-covas' },
  { id: 'athletic_feria', name: 'Athletic', category: 'fashion', floorId: LEVEL_FERIA, x: 80, y: 106, w: 28, h: 24, height: 7, doorNodeId: 'door-athletic-fer' },
  { id: 'moda_colors', name: 'Moda Colors', category: 'fashion', floorId: LEVEL_FERIA, x: 80, y: 132, w: 28, h: 24, height: 7, doorNodeId: 'door-modacolors' },
  { id: 'dezuca', name: 'Dezuca', category: 'fashion', floorId: LEVEL_FERIA, x: 80, y: 158, w: 28, h: 24, height: 7, doorNodeId: 'door-dezuca' },
  { id: 'galaxy_feria', name: 'Galaxy', category: 'tech', floorId: LEVEL_FERIA, x: 80, y: 184, w: 28, h: 24, height: 8, doorNodeId: 'door-galaxy-fer' },
  { id: 'optica_hd', name: 'Óptica HD', category: 'health', floorId: LEVEL_FERIA, x: 80, y: 210, w: 28, h: 24, height: 7, doorNodeId: 'door-opticahd' },
  { id: 'everlast_feria', name: 'Everlast', category: 'fashion', floorId: LEVEL_FERIA, x: 20, y: 135, w: 45, h: 22, height: 8, doorNodeId: 'door-everlast-fer' },
  { id: 'roselab', name: 'Roselab', category: 'health', floorId: LEVEL_FERIA, x: 20, y: 160, w: 45, h: 22, height: 7, doorNodeId: 'door-roselab' },
  { id: 'la_nota', name: 'La Nota', category: 'fashion', floorId: LEVEL_FERIA, x: 20, y: 185, w: 45, h: 22, height: 7, doorNodeId: 'door-lanota' },
  { id: 'kfc_feria', name: 'KFC Sambil', category: 'food', floorId: LEVEL_FERIA, x: 20, y: 260, w: 35, h: 22, height: 9, doorNodeId: 'door-kfc-fer' },
  { id: 'jr_petare', name: 'Jr. Petare', category: 'food', floorId: LEVEL_FERIA, x: 20, y: 285, w: 35, h: 22, height: 8, doorNodeId: 'door-jrpetare' },
  { id: 'sportline_feria', name: 'Sportline', category: 'fashion', floorId: LEVEL_FERIA, x: 20, y: 310, w: 35, h: 22, height: 8, doorNodeId: 'door-sportline-fer' },
  { id: 'levis_feria', name: "Levi's Store", category: 'fashion', floorId: LEVEL_FERIA, x: 120, y: 265, w: 25, h: 45, height: 8, doorNodeId: 'door-levis-fer' },
  { id: 'seac', name: 'SEAC', category: 'fashion', floorId: LEVEL_FERIA, x: 150, y: 265, w: 20, h: 45, height: 8, doorNodeId: 'door-seac' },
  { id: 'american_eagle', name: 'American Eagle', category: 'fashion', floorId: LEVEL_FERIA, x: 175, y: 265, w: 28, h: 45, height: 9, doorNodeId: 'door-americaneagle' },

  // --- BLOQUE COMERCIAL CENTRAL ---
  { id: 'carters', name: "Carter's", category: 'fashion', floorId: LEVEL_FERIA, x: 185, y: 115, w: 26, h: 22, height: 7, doorNodeId: 'door-carters' },
  { id: 'zona_tech', name: 'Zona Tech', category: 'tech', floorId: LEVEL_FERIA, x: 213, y: 115, w: 24, h: 22, height: 8, doorNodeId: 'door-zonatech' },
  { id: 'opticolor_feria', name: 'Opticolor', category: 'health', floorId: LEVEL_FERIA, x: 239, y: 115, w: 24, h: 22, height: 7, doorNodeId: 'door-opticolor-fer' },
  { id: 'arg_store', name: 'Arg Store', category: 'fashion', floorId: LEVEL_FERIA, x: 185, y: 145, w: 20, h: 30, height: 7, doorNodeId: 'door-argstore' },
  { id: 'childrens_place', name: "The Children's Place", category: 'fashion', floorId: LEVEL_FERIA, x: 207, y: 145, w: 20, h: 30, height: 8, doorNodeId: 'door-childrensplace' },
  { id: 'latin_lover_feria', name: 'Latin Lover', category: 'fashion', floorId: LEVEL_FERIA, x: 229, y: 145, w: 20, h: 30, height: 7, doorNodeId: 'door-latinlover-fer' },
  { id: 'casa_plus', name: 'Casa Plus', category: 'home', floorId: LEVEL_FERIA, x: 251, y: 145, w: 20, h: 30, height: 8, doorNodeId: 'door-casaplus' },
  { id: 'mimi_joyeria', name: 'Mimi Joyería', category: 'fashion', floorId: LEVEL_FERIA, x: 273, y: 145, w: 20, h: 30, height: 7, doorNodeId: 'door-mimijoyeria' },
  { id: 'swarovski_feria', name: 'Swarovski', category: 'fashion', floorId: LEVEL_FERIA, x: 295, y: 145, w: 22, h: 30, height: 9, doorNodeId: 'door-swarovski-fer' },
  { id: 'uppomi', name: 'Uppomi', category: 'fashion', floorId: LEVEL_FERIA, x: 319, y: 145, w: 20, h: 30, height: 7, doorNodeId: 'door-uppomi' },
  { id: 'armi_colombia', name: 'Armi de Colombia', category: 'fashion', floorId: LEVEL_FERIA, x: 341, y: 145, w: 24, h: 30, height: 8, doorNodeId: 'door-armicolombia' },
  { id: 'istore_feria', name: 'Istore Apple Premium', category: 'tech', floorId: LEVEL_FERIA, x: 367, y: 145, w: 22, h: 30, height: 9, doorNodeId: 'door-istore-fer' },
  { id: 'original_penguin', name: 'Original Penguin', category: 'fashion', floorId: LEVEL_FERIA, x: 391, y: 145, w: 22, h: 30, height: 8, doorNodeId: 'door-penguin' },
  { id: 'nine_west', name: 'Nine West', category: 'fashion', floorId: LEVEL_FERIA, x: 415, y: 145, w: 22, h: 30, height: 8, doorNodeId: 'door-ninewest' },
  { id: 'scalpers_feria', name: 'Scalpers', category: 'fashion', floorId: LEVEL_FERIA, x: 439, y: 145, w: 20, h: 30, height: 8, doorNodeId: 'door-scalpers-fer' },
  { id: 'hugo_boss', name: 'BOSS (Hugo Boss)', category: 'fashion', floorId: LEVEL_FERIA, x: 461, y: 145, w: 24, h: 30, height: 10, doorNodeId: 'door-hugoboss' },
  { id: 'sambil_online', name: 'Sambil Online Point', category: 'services', floorId: LEVEL_FERIA, x: 487, y: 145, w: 24, h: 30, height: 8, doorNodeId: 'door-sambilonline' },
  { id: 'altana_feria', name: 'Altana', category: 'fashion', floorId: LEVEL_FERIA, x: 535, y: 180, w: 26, h: 22, height: 7, doorNodeId: 'door-altana-fer' },
  { id: 'tumi_feria', name: 'TUMI', category: 'fashion', floorId: LEVEL_FERIA, x: 535, y: 205, w: 26, h: 22, height: 8, doorNodeId: 'door-tumi-fer' },

  // --- PASILLO SUR (Plaza Central y Este) ---
  { id: 'samsung_clx', name: 'Samsung / CLX', category: 'tech', floorId: LEVEL_FERIA, x: 295, y: 265, w: 28, h: 45, height: 9, doorNodeId: 'door-samsungclx' },
  { id: 'skechers_feria', name: 'Skechers', category: 'fashion', floorId: LEVEL_FERIA, x: 325, y: 265, w: 24, h: 45, height: 8, doorNodeId: 'door-skechers-fer' },
  { id: 'arturo_calle', name: 'Arturo Calle', category: 'fashion', floorId: LEVEL_FERIA, x: 351, y: 265, w: 24, h: 45, height: 8, doorNodeId: 'door-arturocalle' },
  { id: 'amira_fuad', name: 'Amira Fuad', category: 'fashion', floorId: LEVEL_FERIA, x: 377, y: 265, w: 24, h: 45, height: 7, doorNodeId: 'door-amirafuad' },
  { id: 'acuario_tienda', name: 'Acuario', category: 'services', floorId: LEVEL_FERIA, x: 403, y: 265, w: 26, h: 45, height: 8, doorNodeId: 'door-acuariotienda' },
  { id: 'carolina_herrera', name: 'Carolina Herrera', category: 'fashion', floorId: LEVEL_FERIA, x: 431, y: 265, w: 26, h: 45, height: 10, doorNodeId: 'door-carolinaherrera' },
  { id: 'cortefiel_feria', name: 'Cortefiel', category: 'fashion', floorId: LEVEL_FERIA, x: 459, y: 265, w: 35, h: 45, height: 9, doorNodeId: 'door-cortefiel-fer' },
];

export const floorFeriaData: MapFloor = {
  id: LEVEL_FERIA,
  name: 'Nivel Feria / Anfiteatro',
  level: 4,
  width: 720,
  height: 360,
  areas: [
    { id: 'corridor-arc-4', kind: 'corridor', rect: { x: 40, y: 60, w: 640, h: 220 } },
    { id: 'plaza-jardin-4', kind: 'plaza', rect: { x: 50, y: 220, w: 60, h: 60 } },
    { id: 'plaza-fuente-4', kind: 'plaza', rect: { x: 150, y: 50, w: 60, h: 60 } },
    { id: 'plaza-central-4', kind: 'plaza', rect: { x: 320, y: 220, w: 60, h: 60 } },
    { id: 'plaza-arte-4', kind: 'plaza', rect: { x: 500, y: 50, w: 60, h: 60 } },
    { id: 'plaza-musica-4', kind: 'plaza', rect: { x: 560, y: 220, w: 60, h: 60 } },
  ],
  obstacles: [],
  props: propsSambilFeria,
};

export const nodesFeria: NavNode[] = [
  // 5 Plazas Principales
  { id: `pj-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 72, y: 250, kind: 'entrance', connections: [`cw-s-${LEVEL_FERIA}`, `cw-far-s-${LEVEL_FERIA}`, `cs-1-${LEVEL_FERIA}`, 'v-pj-4', 'door-lanota', 'door-kfc-fer'] },
  { id: `plf-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 175, y: 73, kind: 'corridor', connections: [`cw-n-${LEVEL_FERIA}`, `cn-1-${LEVEL_FERIA}`, `ca-1-${LEVEL_FERIA}`, 'v-plf-4', 'door-cinex', 'door-palacioblumer-fer', 'door-shoebox', 'door-farmatodo-fer'] },
  { id: `pc-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 350, y: 250, kind: 'corridor', connections: [`cs-3-${LEVEL_FERIA}`, `cs-4-${LEVEL_FERIA}`, `ce-diag-3-${LEVEL_FERIA}`, 'v-pc-4'] },
  { id: `pea-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 530, y: 73, kind: 'corridor', connections: [`cn-4-${LEVEL_FERIA}`, `ce-1-${LEVEL_FERIA}`, `ce-diag-1-${LEVEL_FERIA}`, 'v-pea-4', 'door-mcdonalds'] },
  { id: `plm-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 584, y: 250, kind: 'corridor', connections: [`ce-3-${LEVEL_FERIA}`, `cs-6-${LEVEL_FERIA}`, 'v-plm-4', 'door-anfiteatro'] },

  // Corredor Oeste (x = 72)
  { id: `cw-n-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 72, y: 73, kind: 'corridor', connections: [`plf-${LEVEL_FERIA}`, `cw-mid-${LEVEL_FERIA}`, 'door-covas', 'door-athletic-fer'] },
  { id: `cw-mid-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 72, y: 160, kind: 'corridor', connections: [`cw-n-${LEVEL_FERIA}`, `cw-s-${LEVEL_FERIA}`, 'door-modacolors', 'door-dezuca', 'door-everlast-fer', 'door-roselab'] },
  { id: `cw-s-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 72, y: 220, kind: 'corridor', connections: [`cw-mid-${LEVEL_FERIA}`, `pj-${LEVEL_FERIA}`, 'door-galaxy-fer', 'door-opticahd'] },
  { id: `cw-far-s-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 60, y: 290, kind: 'corridor', connections: [`pj-${LEVEL_FERIA}`, 'door-jrpetare', 'door-sportline-fer'] },

  // Corredor Norte (y = 73)
  { id: `cn-1-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 250, y: 73, kind: 'corridor', connections: [`plf-${LEVEL_FERIA}`, `cn-2-${LEVEL_FERIA}`, 'door-canon', 'door-pandora-fer', 'door-casiocubitt', 'door-yogy'] },
  { id: `cn-2-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 310, y: 73, kind: 'corridor', connections: [`cn-1-${LEVEL_FERIA}`, `cn-3-${LEVEL_FERIA}`, 'door-mrsub-fer', 'door-charles-fer', 'door-pollodorado', 'door-cuadro-fer', 'door-orangemarket', 'door-stjacks-fer'] },
  { id: `cn-3-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 390, y: 73, kind: 'corridor', connections: [`cn-2-${LEVEL_FERIA}`, `cn-4-${LEVEL_FERIA}`, 'door-zonagourmet', 'door-chino-fer', 'door-chickengrill-fer', 'door-burritos-fer', 'door-gelateria4d', 'door-chopchop', 'door-caracasburger'] },
  { id: `cn-4-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 460, y: 73, kind: 'corridor', connections: [`cn-3-${LEVEL_FERIA}`, `pea-${LEVEL_FERIA}`, 'door-burgershack-fer', 'door-pizzamia-fer', 'door-beijing', 'door-fullpizza'] },

  // Pasillo Central Superior (y = 108)
  { id: `ca-1-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 175, y: 108, kind: 'corridor', connections: [`plf-${LEVEL_FERIA}`, `ca-2-${LEVEL_FERIA}`, `cb-1-${LEVEL_FERIA}`, 'door-carters'] },
  { id: `ca-2-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 240, y: 108, kind: 'corridor', connections: [`ca-1-${LEVEL_FERIA}`, `ca-3-${LEVEL_FERIA}`, 'door-zonatech', 'door-opticolor-fer'] },
  { id: `ca-3-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 325, y: 108, kind: 'corridor', connections: [`ca-2-${LEVEL_FERIA}`, `cb-3-${LEVEL_FERIA}`] },

  // Pasillo Central Inferior (y = 142)
  { id: `cb-1-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 175, y: 142, kind: 'corridor', connections: [`ca-1-${LEVEL_FERIA}`, `cb-2-${LEVEL_FERIA}`, `cs-1-${LEVEL_FERIA}`, 'door-argstore'] },
  { id: `cb-2-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 240, y: 142, kind: 'corridor', connections: [`cb-1-${LEVEL_FERIA}`, `cb-3-${LEVEL_FERIA}`, 'door-childrensplace', 'door-latinlover-fer', 'door-casaplus'] },
  { id: `cb-3-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 325, y: 142, kind: 'corridor', connections: [`cb-2-${LEVEL_FERIA}`, `cb-4-${LEVEL_FERIA}`, `ca-3-${LEVEL_FERIA}`, 'door-mimijoyeria', 'door-swarovski-fer', 'door-uppomi', 'door-armicolombia'] },
  { id: `cb-4-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 400, y: 142, kind: 'corridor', connections: [`cb-3-${LEVEL_FERIA}`, `cb-5-${LEVEL_FERIA}`, 'door-istore-fer', 'door-penguin', 'door-ninewest', 'door-scalpers-fer'] },
  { id: `cb-5-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 520, y: 142, kind: 'corridor', connections: [`cb-4-${LEVEL_FERIA}`, `ce-diag-2-${LEVEL_FERIA}`, 'door-hugoboss', 'door-sambilonline'] },

  // Diagonal Este (x = 520)
  { id: `ce-diag-1-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 520, y: 115, kind: 'corridor', connections: [`pea-${LEVEL_FERIA}`, `ce-diag-2-${LEVEL_FERIA}`] },
  { id: `ce-diag-2-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 520, y: 180, kind: 'corridor', connections: [`ce-diag-1-${LEVEL_FERIA}`, `ce-diag-3-${LEVEL_FERIA}`, `cb-5-${LEVEL_FERIA}`, 'door-altana-fer'] },
  { id: `ce-diag-3-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 520, y: 215, kind: 'corridor', connections: [`ce-diag-2-${LEVEL_FERIA}`, `pc-${LEVEL_FERIA}`, `cs-5-${LEVEL_FERIA}`, 'door-tumi-fer'] },

  // Corredor Este (x = 584)
  { id: `ce-1-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 584, y: 73, kind: 'corridor', connections: [`pea-${LEVEL_FERIA}`, `ce-2-${LEVEL_FERIA}`] },
  { id: `ce-2-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 584, y: 130, kind: 'corridor', connections: [`ce-1-${LEVEL_FERIA}`, `ce-3-${LEVEL_FERIA}`] },
  { id: `ce-3-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 584, y: 180, kind: 'corridor', connections: [`ce-2-${LEVEL_FERIA}`, `plm-${LEVEL_FERIA}`] },

  // Corredor Sur (y = 250)
  { id: `cs-1-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 150, y: 250, kind: 'corridor', connections: [`pj-${LEVEL_FERIA}`, `cs-2-${LEVEL_FERIA}`, `cb-1-${LEVEL_FERIA}`, 'door-banesco-fer', 'door-levis-fer', 'door-seac'] },
  { id: `cs-2-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 210, y: 250, kind: 'corridor', connections: [`cs-1-${LEVEL_FERIA}`, `cs-3-${LEVEL_FERIA}`, 'door-americaneagle', 'door-forever21'] },
  { id: `cs-3-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 280, y: 250, kind: 'corridor', connections: [`cs-2-${LEVEL_FERIA}`, `pc-${LEVEL_FERIA}`, 'door-samsungclx', 'door-skechers-fer'] },
  { id: `cs-4-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 420, y: 250, kind: 'corridor', connections: [`pc-${LEVEL_FERIA}`, `cs-5-${LEVEL_FERIA}`, 'door-arturocalle', 'door-amirafuad', 'door-acuariotienda'] },
  { id: `cs-5-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 485, y: 250, kind: 'corridor', connections: [`cs-4-${LEVEL_FERIA}`, `cs-6-${LEVEL_FERIA}`, `ce-diag-3-${LEVEL_FERIA}`, 'door-carolinaherrera', 'door-cortefiel-fer'] },
  { id: `cs-6-${LEVEL_FERIA}`, floorId: LEVEL_FERIA, x: 560, y: 250, kind: 'corridor', connections: [`cs-5-${LEVEL_FERIA}`, `plm-${LEVEL_FERIA}`] },

  // Puertas Nivel Feria
  { id: 'door-cinex', floorId: LEVEL_FERIA, x: 140, y: 68, kind: 'door', connections: [`plf-${LEVEL_FERIA}`] },
  { id: 'door-palacioblumer-fer', floorId: LEVEL_FERIA, x: 157, y: 68, kind: 'door', connections: [`plf-${LEVEL_FERIA}`] },
  { id: 'door-shoebox', floorId: LEVEL_FERIA, x: 184, y: 68, kind: 'door', connections: [`plf-${LEVEL_FERIA}`] },
  { id: 'door-farmatodo-fer', floorId: LEVEL_FERIA, x: 213, y: 68, kind: 'door', connections: [`plf-${LEVEL_FERIA}`] },
  { id: 'door-anfiteatro', floorId: LEVEL_FERIA, x: 600, y: 230, kind: 'door', connections: [`plm-${LEVEL_FERIA}`] },
  { id: 'door-forever21', floorId: LEVEL_FERIA, x: 250, y: 265, kind: 'door', connections: [`cs-2-${LEVEL_FERIA}`] },
  { id: 'door-mcdonalds', floorId: LEVEL_FERIA, x: 495, y: 68, kind: 'door', connections: [`pea-${LEVEL_FERIA}`] },
  { id: 'door-banesco-fer', floorId: LEVEL_FERIA, x: 95, y: 265, kind: 'door', connections: [`cs-1-${LEVEL_FERIA}`] },

  { id: 'door-canon', floorId: LEVEL_FERIA, x: 240, y: 68, kind: 'door', connections: [`cn-1-${LEVEL_FERIA}`] },
  { id: 'door-pandora-fer', floorId: LEVEL_FERIA, x: 258, y: 68, kind: 'door', connections: [`cn-1-${LEVEL_FERIA}`] },
  { id: 'door-mrsub-fer', floorId: LEVEL_FERIA, x: 277, y: 68, kind: 'door', connections: [`cn-2-${LEVEL_FERIA}`] },
  { id: 'door-charles-fer', floorId: LEVEL_FERIA, x: 297, y: 68, kind: 'door', connections: [`cn-2-${LEVEL_FERIA}`] },
  { id: 'door-pollodorado', floorId: LEVEL_FERIA, x: 318, y: 68, kind: 'door', connections: [`cn-2-${LEVEL_FERIA}`] },

  { id: 'door-zonagourmet', floorId: LEVEL_FERIA, x: 342, y: 68, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-chino-fer', floorId: LEVEL_FERIA, x: 366, y: 68, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-chickengrill-fer', floorId: LEVEL_FERIA, x: 388, y: 68, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-burritos-fer', floorId: LEVEL_FERIA, x: 410, y: 68, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-burgershack-fer', floorId: LEVEL_FERIA, x: 433, y: 68, kind: 'door', connections: [`cn-4-${LEVEL_FERIA}`] },
  { id: 'door-pizzamia-fer', floorId: LEVEL_FERIA, x: 457, y: 68, kind: 'door', connections: [`cn-4-${LEVEL_FERIA}`] },

  { id: 'door-casiocubitt', floorId: LEVEL_FERIA, x: 243, y: 78, kind: 'door', connections: [`cn-1-${LEVEL_FERIA}`] },
  { id: 'door-yogy', floorId: LEVEL_FERIA, x: 266, y: 78, kind: 'door', connections: [`cn-1-${LEVEL_FERIA}`] },
  { id: 'door-cuadro-fer', floorId: LEVEL_FERIA, x: 290, y: 78, kind: 'door', connections: [`cn-2-${LEVEL_FERIA}`] },
  { id: 'door-orangemarket', floorId: LEVEL_FERIA, x: 317, y: 78, kind: 'door', connections: [`cn-2-${LEVEL_FERIA}`] },
  { id: 'door-stjacks-fer', floorId: LEVEL_FERIA, x: 344, y: 78, kind: 'door', connections: [`cn-2-${LEVEL_FERIA}`] },
  { id: 'door-gelateria4d', floorId: LEVEL_FERIA, x: 368, y: 78, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-chopchop', floorId: LEVEL_FERIA, x: 390, y: 78, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-caracasburger', floorId: LEVEL_FERIA, x: 413, y: 78, kind: 'door', connections: [`cn-3-${LEVEL_FERIA}`] },
  { id: 'door-beijing', floorId: LEVEL_FERIA, x: 437, y: 78, kind: 'door', connections: [`cn-4-${LEVEL_FERIA}`] },
  { id: 'door-fullpizza', floorId: LEVEL_FERIA, x: 460, y: 78, kind: 'door', connections: [`cn-4-${LEVEL_FERIA}`] },

  { id: 'door-covas', floorId: LEVEL_FERIA, x: 80, y: 92, kind: 'door', connections: [`cw-n-${LEVEL_FERIA}`] },
  { id: 'door-athletic-fer', floorId: LEVEL_FERIA, x: 80, y: 118, kind: 'door', connections: [`cw-n-${LEVEL_FERIA}`] },
  { id: 'door-modacolors', floorId: LEVEL_FERIA, x: 80, y: 144, kind: 'door', connections: [`cw-mid-${LEVEL_FERIA}`] },
  { id: 'door-dezuca', floorId: LEVEL_FERIA, x: 80, y: 170, kind: 'door', connections: [`cw-mid-${LEVEL_FERIA}`] },
  { id: 'door-galaxy-fer', floorId: LEVEL_FERIA, x: 80, y: 196, kind: 'door', connections: [`cw-s-${LEVEL_FERIA}`] },
  { id: 'door-opticahd', floorId: LEVEL_FERIA, x: 80, y: 222, kind: 'door', connections: [`cw-s-${LEVEL_FERIA}`] },
  { id: 'door-everlast-fer', floorId: LEVEL_FERIA, x: 65, y: 146, kind: 'door', connections: [`cw-mid-${LEVEL_FERIA}`] },
  { id: 'door-roselab', floorId: LEVEL_FERIA, x: 65, y: 171, kind: 'door', connections: [`cw-mid-${LEVEL_FERIA}`] },
  { id: 'door-lanota', floorId: LEVEL_FERIA, x: 65, y: 196, kind: 'door', connections: [`pj-${LEVEL_FERIA}`] },
  { id: 'door-kfc-fer', floorId: LEVEL_FERIA, x: 55, y: 271, kind: 'door', connections: [`pj-${LEVEL_FERIA}`] },
  { id: 'door-jrpetare', floorId: LEVEL_FERIA, x: 55, y: 296, kind: 'door', connections: [`cw-far-s-${LEVEL_FERIA}`] },
  { id: 'door-sportline-fer', floorId: LEVEL_FERIA, x: 55, y: 321, kind: 'door', connections: [`cw-far-s-${LEVEL_FERIA}`] },
  { id: 'door-levis-fer', floorId: LEVEL_FERIA, x: 134, y: 265, kind: 'door', connections: [`cs-1-${LEVEL_FERIA}`] },
  { id: 'door-seac', floorId: LEVEL_FERIA, x: 161, y: 265, kind: 'door', connections: [`cs-1-${LEVEL_FERIA}`] },
  { id: 'door-americaneagle', floorId: LEVEL_FERIA, x: 189, y: 265, kind: 'door', connections: [`cs-2-${LEVEL_FERIA}`] },

  { id: 'door-carters', floorId: LEVEL_FERIA, x: 198, y: 115, kind: 'door', connections: [`ca-1-${LEVEL_FERIA}`] },
  { id: 'door-zonatech', floorId: LEVEL_FERIA, x: 225, y: 115, kind: 'door', connections: [`ca-2-${LEVEL_FERIA}`] },
  { id: 'door-opticolor-fer', floorId: LEVEL_FERIA, x: 251, y: 115, kind: 'door', connections: [`ca-2-${LEVEL_FERIA}`] },
  { id: 'door-argstore', floorId: LEVEL_FERIA, x: 195, y: 145, kind: 'door', connections: [`cb-1-${LEVEL_FERIA}`] },
  { id: 'door-childrensplace', floorId: LEVEL_FERIA, x: 217, y: 145, kind: 'door', connections: [`cb-2-${LEVEL_FERIA}`] },
  { id: 'door-latinlover-fer', floorId: LEVEL_FERIA, x: 239, y: 145, kind: 'door', connections: [`cb-2-${LEVEL_FERIA}`] },
  { id: 'door-casaplus', floorId: LEVEL_FERIA, x: 261, y: 145, kind: 'door', connections: [`cb-2-${LEVEL_FERIA}`] },
  { id: 'door-mimijoyeria', floorId: LEVEL_FERIA, x: 283, y: 145, kind: 'door', connections: [`cb-3-${LEVEL_FERIA}`] },
  { id: 'door-swarovski-fer', floorId: LEVEL_FERIA, x: 306, y: 145, kind: 'door', connections: [`cb-3-${LEVEL_FERIA}`] },
  { id: 'door-uppomi', floorId: LEVEL_FERIA, x: 329, y: 145, kind: 'door', connections: [`cb-3-${LEVEL_FERIA}`] },
  { id: 'door-armicolombia', floorId: LEVEL_FERIA, x: 353, y: 145, kind: 'door', connections: [`cb-3-${LEVEL_FERIA}`] },
  { id: 'door-istore-fer', floorId: LEVEL_FERIA, x: 378, y: 145, kind: 'door', connections: [`cb-4-${LEVEL_FERIA}`] },
  { id: 'door-penguin', floorId: LEVEL_FERIA, x: 402, y: 145, kind: 'door', connections: [`cb-4-${LEVEL_FERIA}`] },
  { id: 'door-ninewest', floorId: LEVEL_FERIA, x: 426, y: 145, kind: 'door', connections: [`cb-4-${LEVEL_FERIA}`] },
  { id: 'door-scalpers-fer', floorId: LEVEL_FERIA, x: 451, y: 145, kind: 'door', connections: [`cb-4-${LEVEL_FERIA}`] },
  { id: 'door-hugoboss', floorId: LEVEL_FERIA, x: 474, y: 145, kind: 'door', connections: [`cb-5-${LEVEL_FERIA}`] },
  { id: 'door-sambilonline', floorId: LEVEL_FERIA, x: 501, y: 145, kind: 'door', connections: [`cb-5-${LEVEL_FERIA}`] },
  { id: 'door-altana-fer', floorId: LEVEL_FERIA, x: 535, y: 191, kind: 'door', connections: [`ce-diag-2-${LEVEL_FERIA}`] },
  { id: 'door-tumi-fer', floorId: LEVEL_FERIA, x: 535, y: 216, kind: 'door', connections: [`ce-diag-3-${LEVEL_FERIA}`] },

  { id: 'door-samsungclx', floorId: LEVEL_FERIA, x: 309, y: 265, kind: 'door', connections: [`cs-3-${LEVEL_FERIA}`] },
  { id: 'door-skechers-fer', floorId: LEVEL_FERIA, x: 337, y: 265, kind: 'door', connections: [`cs-3-${LEVEL_FERIA}`] },
  { id: 'door-arturocalle', floorId: LEVEL_FERIA, x: 363, y: 265, kind: 'door', connections: [`cs-4-${LEVEL_FERIA}`] },
  { id: 'door-amirafuad', floorId: LEVEL_FERIA, x: 389, y: 265, kind: 'door', connections: [`cs-4-${LEVEL_FERIA}`] },
  { id: 'door-acuariotienda', floorId: LEVEL_FERIA, x: 416, y: 265, kind: 'door', connections: [`cs-4-${LEVEL_FERIA}`] },
  { id: 'door-carolinaherrera', floorId: LEVEL_FERIA, x: 444, y: 265, kind: 'door', connections: [`cs-5-${LEVEL_FERIA}`] },
  { id: 'door-cortefiel-fer', floorId: LEVEL_FERIA, x: 476, y: 265, kind: 'door', connections: [`cs-5-${LEVEL_FERIA}`] },
];
