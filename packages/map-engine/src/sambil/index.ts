import type { MallMapData, NavNode } from '../types';
import { LEVEL_AUTOPISTA, LEVEL_ACUARIO, LEVEL_LIBERTADOR, LEVEL_DIVERSION } from './constants';
import { floorAutopistaData, storesSambilAutopista, nodesAutopista } from './level-autopista';
import { floorAcuarioData, storesSambilAcuario, nodesAcuario } from './level-acuario';
import { floorLibertadorData, storesSambilLibertador, nodesLibertador } from './level-libertador';
import { floorDiversionData, storesSambilDiversion, nodesDiversion } from './level-diversion';

export * from './constants';
export * from './level-autopista';
export * from './level-acuario';
export * from './level-libertador';
export * from './level-diversion';
export * from './quality-report';

/** Nodos verticales (escaleras y ascensores) que interconectan los 4 niveles a través de las 5 plazas icónicas */
export const verticalCoreNodes: NavNode[] = [
  // Nivel Autopista (Piso 1)
  { id: 'v-pj-1', floorId: LEVEL_AUTOPISTA, x: 72, y: 250, kind: 'stairs', connections: [`pj-${LEVEL_AUTOPISTA}`, 'v-pj-2'] },
  { id: 'v-plf-1', floorId: LEVEL_AUTOPISTA, x: 180, y: 73, kind: 'stairs', connections: [`plf-${LEVEL_AUTOPISTA}`, 'v-plf-2'] },
  { id: 'v-pc-1', floorId: LEVEL_AUTOPISTA, x: 350, y: 250, kind: 'stairs', connections: [`pc-${LEVEL_AUTOPISTA}`, 'v-pc-2'] },
  { id: 'v-pea-1', floorId: LEVEL_AUTOPISTA, x: 530, y: 73, kind: 'stairs', connections: [`pea-${LEVEL_AUTOPISTA}`, 'v-pea-2'] },
  { id: 'v-plm-1', floorId: LEVEL_AUTOPISTA, x: 584, y: 250, kind: 'stairs', connections: [`plm-${LEVEL_AUTOPISTA}`, 'v-plm-2'] },

  // Nivel Acuario (Piso 2)
  { id: 'v-pj-2', floorId: LEVEL_ACUARIO, x: 72, y: 250, kind: 'stairs', connections: ['v-pj-1', `pj-${LEVEL_ACUARIO}`, 'v-pj-3'] },
  { id: 'v-plf-2', floorId: LEVEL_ACUARIO, x: 180, y: 73, kind: 'stairs', connections: ['v-plf-1', `plf-${LEVEL_ACUARIO}`, 'v-plf-3'] },
  { id: 'v-pc-2', floorId: LEVEL_ACUARIO, x: 350, y: 250, kind: 'stairs', connections: ['v-pc-1', `pc-${LEVEL_ACUARIO}`, 'v-pc-3'] },
  { id: 'v-pea-2', floorId: LEVEL_ACUARIO, x: 530, y: 73, kind: 'stairs', connections: ['v-pea-1', `pea-${LEVEL_ACUARIO}`, 'v-pea-3'] },
  { id: 'v-plm-2', floorId: LEVEL_ACUARIO, x: 584, y: 250, kind: 'stairs', connections: ['v-plm-1', `plm-${LEVEL_ACUARIO}`, 'v-plm-3'] },

  // Nivel Libertador (Piso 3)
  { id: 'v-pj-3', floorId: LEVEL_LIBERTADOR, x: 72, y: 250, kind: 'stairs', connections: ['v-pj-2', `pj-${LEVEL_LIBERTADOR}`, 'v-pj-4'] },
  { id: 'v-plf-3', floorId: LEVEL_LIBERTADOR, x: 180, y: 73, kind: 'stairs', connections: ['v-plf-2', `plf-${LEVEL_LIBERTADOR}`, 'v-plf-4'] },
  { id: 'v-pc-3', floorId: LEVEL_LIBERTADOR, x: 350, y: 250, kind: 'stairs', connections: ['v-pc-2', `pc-${LEVEL_LIBERTADOR}`, 'v-pc-4'] },
  { id: 'v-pea-3', floorId: LEVEL_LIBERTADOR, x: 530, y: 73, kind: 'stairs', connections: ['v-pea-2', `pea-${LEVEL_LIBERTADOR}`, 'v-pea-4'] },
  { id: 'v-plm-3', floorId: LEVEL_LIBERTADOR, x: 584, y: 250, kind: 'stairs', connections: ['v-plm-2', `plm-${LEVEL_LIBERTADOR}`, 'v-plm-4'] },

  // Nivel Diversión (Piso 4)
  { id: 'v-pj-4', floorId: LEVEL_DIVERSION, x: 72, y: 250, kind: 'stairs', connections: ['v-pj-3', `pj-${LEVEL_DIVERSION}`] },
  { id: 'v-plf-4', floorId: LEVEL_DIVERSION, x: 180, y: 73, kind: 'stairs', connections: ['v-plf-3', `plf-${LEVEL_DIVERSION}`] },
  { id: 'v-pc-4', floorId: LEVEL_DIVERSION, x: 350, y: 250, kind: 'stairs', connections: ['v-pc-3', `pc-${LEVEL_DIVERSION}`] },
  { id: 'v-pea-4', floorId: LEVEL_DIVERSION, x: 530, y: 73, kind: 'stairs', connections: ['v-pea-3', `pea-${LEVEL_DIVERSION}`] },
  { id: 'v-plm-4', floorId: LEVEL_DIVERSION, x: 584, y: 250, kind: 'stairs', connections: ['v-plm-3', `plm-${LEVEL_DIVERSION}`] },
];

export const sambilMall: MallMapData = {
  schemaVersion: 1,
  mallSlug: 'sambil-chacao',
  metersPerUnit: 0.35,
  floors: [
    floorAutopistaData,
    floorAcuarioData,
    floorLibertadorData,
    floorDiversionData,
  ],
  stores: [
    ...storesSambilAutopista,
    ...storesSambilAcuario,
    ...storesSambilLibertador,
    ...storesSambilDiversion,
  ],
  nodes: [
    ...nodesAutopista,
    ...nodesAcuario,
    ...nodesLibertador,
    ...nodesDiversion,
    ...verticalCoreNodes,
  ],
};
