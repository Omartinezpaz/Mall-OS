import type { MapFloor, MapStore, NavNode, MapProp } from '../types';
import { LEVEL_DIVERSION } from './constants';

export const propsSambilDiversion: MapProp[] = [
  { id: 'fnt-div-1', kind: 'fountain', rect: { x: 152, y: 52, w: 14, h: 14 } },
  { id: 'arb-div1', kind: 'tree', x: 90, y: 235 },
  { id: 'arb-div2', kind: 'tree', x: 310, y: 220 },
  { id: 'arb-div3', kind: 'tree', x: 550, y: 235 },
  { id: 'banca-div1', kind: 'bench', rect: { x: 130, y: 135, w: 14, h: 4 } },
  { id: 'banca-div2', kind: 'bench', rect: { x: 430, y: 135, w: 14, h: 4 } },
  { id: 'esc-div1', kind: 'escalator', rect: { x: 135, y: 35, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-div2', kind: 'escalator', rect: { x: 515, y: 35, w: 10, h: 16 }, flow: 'max' },
  { id: 'esc-div3', kind: 'escalator', rect: { x: 330, y: 280, w: 16, h: 10 }, flow: 'max' },
  { id: 'info-div1', kind: 'poi', poi: 'info', x: 350, y: 245, z: 18 },
  { id: 'wc-div1', kind: 'poi', poi: 'wc', x: 72, y: 260, z: 16 },
  { id: 'atm-div1', kind: 'poi', poi: 'atm', x: 540, y: 55, z: 16 },
];

export const storesSambilDiversion: MapStore[] = [
  { id: 'mango_bajito', name: 'Mango Bajito (2.136 m²)', category: 'home', floorId: LEVEL_DIVERSION, x: 20, y: 20, w: 140, h: 48, height: 14, doorNodeId: 'door-mango' },
  { id: 'anfiteatro', name: 'Anfiteatro Terrazas VIP', category: 'entertainment', floorId: LEVEL_DIVERSION, x: 480, y: 20, w: 110, h: 48, height: 14, doorNodeId: 'door-anfi' },
  { id: 'bonsai_sushi', name: 'Bonsai Sushi Bar & Lounge', category: 'food', floorId: LEVEL_DIVERSION, x: 185, y: 155, w: 24, h: 25, height: 8, doorNodeId: 'door-bonsai' },
  { id: 'bk', name: 'Burger King', category: 'food', floorId: LEVEL_DIVERSION, x: 20, y: 260, w: 40, h: 22, height: 8, doorNodeId: 'door-bk' },
  { id: 'migas_cafe', name: "Miga's Café", category: 'food', floorId: LEVEL_DIVERSION, x: 20, y: 285, w: 40, h: 22, height: 9, doorNodeId: 'door-migas' },
  { id: 'pizza_hut', name: 'Pizza Hut Sambil', category: 'food', floorId: LEVEL_DIVERSION, x: 105, y: 265, w: 38, h: 45, height: 8, doorNodeId: 'door-pizzahut' },
  { id: 'allegre', name: 'Allegre Trattoria', category: 'food', floorId: LEVEL_DIVERSION, x: 365, y: 265, w: 24, h: 45, height: 8, doorNodeId: 'door-allegre' },
  { id: 'tibon_grill', name: 'Tibón Grill Steakhouse', category: 'food', floorId: LEVEL_DIVERSION, x: 392, y: 265, w: 24, h: 45, height: 9, doorNodeId: 'door-tibon' },
];

export const floorDiversionData: MapFloor = {
  id: LEVEL_DIVERSION,
  name: 'Nivel Diversión / Terrazas',
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
  props: propsSambilDiversion,
};

export const nodesDiversion: NavNode[] = [
  { id: `pj-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 72, y: 250, kind: 'entrance', connections: [`cw-s-${LEVEL_DIVERSION}`, `cw-far-s-${LEVEL_DIVERSION}`, `cs-1-${LEVEL_DIVERSION}`, 'v-pj-4'] },
  { id: `plf-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 180, y: 73, kind: 'corridor', connections: [`cw-n-${LEVEL_DIVERSION}`, `cn-1-${LEVEL_DIVERSION}`, `cc-w1-${LEVEL_DIVERSION}`, 'v-plf-4', 'door-mango'] },
  { id: `pc-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 350, y: 250, kind: 'corridor', connections: [`cs-3-${LEVEL_DIVERSION}`, `cs-4-${LEVEL_DIVERSION}`, `cc-w3-${LEVEL_DIVERSION}`, `cc-e3-${LEVEL_DIVERSION}`, 'v-pc-4', 'door-allegre', 'door-tibon'] },
  { id: `pea-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 530, y: 73, kind: 'corridor', connections: [`cn-4-${LEVEL_DIVERSION}`, `ce-1-${LEVEL_DIVERSION}`, `cc-e1-${LEVEL_DIVERSION}`, 'v-pea-4', 'door-anfi'] },
  { id: `plm-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 584, y: 250, kind: 'corridor', connections: [`ce-3-${LEVEL_DIVERSION}`, `cs-6-${LEVEL_DIVERSION}`, 'v-plm-4'] },

  { id: `cw-n-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 72, y: 73, kind: 'corridor', connections: [`plf-${LEVEL_DIVERSION}`, `cw-mid-${LEVEL_DIVERSION}`] },
  { id: `cw-mid-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 72, y: 160, kind: 'corridor', connections: [`cw-n-${LEVEL_DIVERSION}`, `cw-s-${LEVEL_DIVERSION}`] },
  { id: `cw-s-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 72, y: 220, kind: 'corridor', connections: [`cw-mid-${LEVEL_DIVERSION}`, `pj-${LEVEL_DIVERSION}`] },
  { id: `cw-far-s-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 65, y: 290, kind: 'corridor', connections: [`pj-${LEVEL_DIVERSION}`, 'door-bk', 'door-migas'] },

  { id: `cn-1-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 250, y: 73, kind: 'corridor', connections: [`plf-${LEVEL_DIVERSION}`, `cn-2-${LEVEL_DIVERSION}`] },
  { id: `cn-2-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 330, y: 73, kind: 'corridor', connections: [`cn-1-${LEVEL_DIVERSION}`, `cn-3-${LEVEL_DIVERSION}`] },
  { id: `cn-3-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 400, y: 73, kind: 'corridor', connections: [`cn-2-${LEVEL_DIVERSION}`, `cn-4-${LEVEL_DIVERSION}`] },
  { id: `cn-4-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 470, y: 73, kind: 'corridor', connections: [`cn-3-${LEVEL_DIVERSION}`, `pea-${LEVEL_DIVERSION}`] },

  { id: `ce-1-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 584, y: 73, kind: 'corridor', connections: [`pea-${LEVEL_DIVERSION}`, `ce-2-${LEVEL_DIVERSION}`] },
  { id: `ce-2-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 584, y: 130, kind: 'corridor', connections: [`ce-1-${LEVEL_DIVERSION}`, `ce-3-${LEVEL_DIVERSION}`] },
  { id: `ce-3-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 584, y: 180, kind: 'corridor', connections: [`ce-2-${LEVEL_DIVERSION}`, `plm-${LEVEL_DIVERSION}`] },

  { id: `cs-1-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 150, y: 250, kind: 'corridor', connections: [`pj-${LEVEL_DIVERSION}`, `cs-2-${LEVEL_DIVERSION}`, 'door-pizzahut'] },
  { id: `cs-2-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 210, y: 250, kind: 'corridor', connections: [`cs-1-${LEVEL_DIVERSION}`, `cs-3-${LEVEL_DIVERSION}`] },
  { id: `cs-3-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 280, y: 250, kind: 'corridor', connections: [`cs-2-${LEVEL_DIVERSION}`, `pc-${LEVEL_DIVERSION}`] },
  { id: `cs-4-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 420, y: 250, kind: 'corridor', connections: [`pc-${LEVEL_DIVERSION}`, `cs-5-${LEVEL_DIVERSION}`] },
  { id: `cs-5-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 480, y: 250, kind: 'corridor', connections: [`cs-4-${LEVEL_DIVERSION}`, `cs-6-${LEVEL_DIVERSION}`] },
  { id: `cs-6-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 550, y: 250, kind: 'corridor', connections: [`cs-5-${LEVEL_DIVERSION}`, `plm-${LEVEL_DIVERSION}`] },

  { id: `cc-w1-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 175, y: 135, kind: 'corridor', connections: [`plf-${LEVEL_DIVERSION}`, `cc-w2-${LEVEL_DIVERSION}`, 'door-bonsai'] },
  { id: `cc-w2-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 267, y: 135, kind: 'corridor', connections: [`cc-w1-${LEVEL_DIVERSION}`, `cc-w3-${LEVEL_DIVERSION}`] },
  { id: `cc-w3-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 267, y: 200, kind: 'corridor', connections: [`cc-w2-${LEVEL_DIVERSION}`, `pc-${LEVEL_DIVERSION}`] },
  { id: `cc-e1-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 495, y: 115, kind: 'corridor', connections: [`pea-${LEVEL_DIVERSION}`, `cc-e2-${LEVEL_DIVERSION}`] },
  { id: `cc-e2-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 495, y: 160, kind: 'corridor', connections: [`cc-e1-${LEVEL_DIVERSION}`, `cc-e3-${LEVEL_DIVERSION}`] },
  { id: `cc-e3-${LEVEL_DIVERSION}`, floorId: LEVEL_DIVERSION, x: 495, y: 215, kind: 'corridor', connections: [`cc-e2-${LEVEL_DIVERSION}`, `pc-${LEVEL_DIVERSION}`] },

  { id: 'door-mango', floorId: LEVEL_DIVERSION, x: 160, y: 68, kind: 'door', connections: [`plf-${LEVEL_DIVERSION}`] },
  { id: 'door-anfi', floorId: LEVEL_DIVERSION, x: 530, y: 68, kind: 'door', connections: [`pea-${LEVEL_DIVERSION}`] },
  { id: 'door-bonsai', floorId: LEVEL_DIVERSION, x: 197, y: 155, kind: 'door', connections: [`cc-w1-${LEVEL_DIVERSION}`] },
  { id: 'door-bk', floorId: LEVEL_DIVERSION, x: 60, y: 271, kind: 'door', connections: [`cw-far-s-${LEVEL_DIVERSION}`] },
  { id: 'door-migas', floorId: LEVEL_DIVERSION, x: 60, y: 296, kind: 'door', connections: [`cw-far-s-${LEVEL_DIVERSION}`] },
  { id: 'door-pizzahut', floorId: LEVEL_DIVERSION, x: 124, y: 265, kind: 'door', connections: [`cs-1-${LEVEL_DIVERSION}`] },
  { id: 'door-allegre', floorId: LEVEL_DIVERSION, x: 377, y: 265, kind: 'door', connections: [`pc-${LEVEL_DIVERSION}`] },
  { id: 'door-tibon', floorId: LEVEL_DIVERSION, x: 404, y: 265, kind: 'door', connections: [`pc-${LEVEL_DIVERSION}`] },
];
