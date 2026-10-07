import type { MallMapData, NavNode } from '../types';
import { LEVEL_AUTOPISTA, LEVEL_ACUARIO, LEVEL_LIBERTADOR, LEVEL_FERIA, LEVEL_DIVERSION } from './constants';
import { floorAutopistaData, storesSambilAutopista, nodesAutopista } from './level-autopista';
import { floorAcuarioData, storesSambilAcuario, nodesAcuario } from './level-acuario';
import { floorLibertadorData, storesSambilLibertador, nodesLibertador } from './level-libertador';
import { floorFeriaData, storesSambilFeria, nodesFeria } from './level-feria';
import { floorDiversionData, storesSambilDiversion, nodesDiversion } from './level-diversion';

export * from './constants';
export * from './level-autopista';
export * from './level-acuario';
export * from './level-libertador';
export * from './level-feria';
export * from './level-diversion';
export * from './quality-report';
export * from './cad-to-mall';
export * from './cad-dataset';

/** Nodos verticales (escaleras y ascensores) que interconectan los 5 niveles a través de las 5 plazas icónicas */
export const verticalCoreNodes: NavNode[] = [
  // Nivel Autopista (Piso 1)
  { id: 'v-pj-1', floorId: LEVEL_AUTOPISTA, x: 72, y: 250, kind: 'stairs', connections: ['node-plaza Jardin', 'v-pj-2'] },
  { id: 'v-plf-1', floorId: LEVEL_AUTOPISTA, x: 180, y: 73, kind: 'stairs', connections: ['node-plaza la Fuente', 'v-plf-2'] },
  { id: 'v-pc-1', floorId: LEVEL_AUTOPISTA, x: 350, y: 250, kind: 'stairs', connections: ['node-plaza Central', 'v-pc-2'] },
  { id: 'v-pea-1', floorId: LEVEL_AUTOPISTA, x: 530, y: 73, kind: 'stairs', connections: ['node-plaza  el Arte', 'v-pea-2'] },
  { id: 'v-plm-1', floorId: LEVEL_AUTOPISTA, x: 584, y: 250, kind: 'stairs', connections: ['node-plaza musica', 'v-plm-2'] },

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

  // Nivel Feria (Piso 4)
  { id: 'v-pj-4', floorId: LEVEL_FERIA, x: 72, y: 250, kind: 'stairs', connections: ['v-pj-3', `pj-${LEVEL_FERIA}`, 'v-pj-5'] },
  { id: 'v-plf-4', floorId: LEVEL_FERIA, x: 180, y: 73, kind: 'stairs', connections: ['v-plf-3', `plf-${LEVEL_FERIA}`, 'v-plf-5'] },
  { id: 'v-pc-4', floorId: LEVEL_FERIA, x: 350, y: 250, kind: 'stairs', connections: ['v-pc-3', `pc-${LEVEL_FERIA}`, 'v-pc-5'] },
  { id: 'v-pea-4', floorId: LEVEL_FERIA, x: 530, y: 73, kind: 'stairs', connections: ['v-pea-3', `pea-${LEVEL_FERIA}`, 'v-pea-5'] },
  { id: 'v-plm-4', floorId: LEVEL_FERIA, x: 584, y: 250, kind: 'stairs', connections: ['v-plm-3', `plm-${LEVEL_FERIA}`, 'v-plm-5'] },

  // Nivel Diversión (Piso 5)
  { id: 'v-pj-5', floorId: LEVEL_DIVERSION, x: 72, y: 250, kind: 'stairs', connections: ['v-pj-4', `pj-${LEVEL_DIVERSION}`] },
  { id: 'v-plf-5', floorId: LEVEL_DIVERSION, x: 180, y: 73, kind: 'stairs', connections: ['v-plf-4', `plf-${LEVEL_DIVERSION}`] },
  { id: 'v-pc-5', floorId: LEVEL_DIVERSION, x: 350, y: 250, kind: 'stairs', connections: ['v-pc-4', `pc-${LEVEL_DIVERSION}`] },
  { id: 'v-pea-5', floorId: LEVEL_DIVERSION, x: 530, y: 73, kind: 'stairs', connections: ['v-pea-4', `pea-${LEVEL_DIVERSION}`] },
  { id: 'v-plm-5', floorId: LEVEL_DIVERSION, x: 584, y: 250, kind: 'stairs', connections: ['v-plm-4', `plm-${LEVEL_DIVERSION}`] },
];

export const sambilMall: MallMapData = {
  schemaVersion: 1,
  mallSlug: 'sambil-chacao',
  metersPerUnit: 0.52,
  floors: [
    floorAutopistaData,
    floorAcuarioData,
    floorLibertadorData,
    floorFeriaData,
    floorDiversionData,
  ],
  stores: [
    ...storesSambilAutopista,
    ...storesSambilAcuario,
    ...storesSambilLibertador,
    ...storesSambilFeria,
    ...storesSambilDiversion,
  ],
  nodes: [
    ...nodesAutopista,
    ...nodesAcuario,
    ...nodesLibertador,
    ...nodesFeria,
    ...nodesDiversion,
    ...verticalCoreNodes,
  ],
};
