import type { MapFloor, MapStore, NavNode, MapProp } from '../types';
import { LEVEL_AUTOPISTA } from './constants';

export const AUTOPISTA_ALIASES: Record<string, string> = {
  tijerazo: 'local_4',
  macuto: 'local_5',
  lc_waikiki: 'local_6',
  cines_unidos: 'local_43',
  pull_bear: 'local_42',
  bershka: 'local_115',
  stradivarius: 'local_114',
  farmatodo: 'local_40',
  tommy: 'local_75',
  bath_body: 'local_9',
  victoria_secret: 'local_26',
  banco_provincial: 'local_77',
  provincial: 'local_77',
  bbva: 'local_77',
  bnc: 'local_110',
  banco_nacional_de_credito: 'local_110',
  banco_del_tesoro: 'local_18',
  springfield: 'local_108',
  sportland: 'local_109',
  estivaneli: 'local_17',
  mng: 'local_79',
  mango: 'local_79',
  james_bark: 'local_78',
  skechers: 'local_32',
  bellagio: 'local_89',
  joyeria_bellagio: 'local_89',
  jump: 'local_98',
  crocs: 'local_48',
  mario_hernandez: 'local_47',
  converse: 'local_93',
  hang_ten: 'local_103',
  las_villas: 'local_107',
  optica_billi: 'local_112',
  womens_secret: 'local_113',
};

export const propsSambilAutopista: MapProp[] = [
  { id: 'fnt-auto-1', kind: 'fountain', rect: { x: 222, y: 187, w: 14, h: 14 } },
  { id: 'arb-sa1', kind: 'tree', x: 111, y: 322 },
  { id: 'arb-sa2', kind: 'tree', x: 358, y: 322 },
  { id: 'arb-sa3', kind: 'tree', x: 578, y: 330 },
  { id: 'esc-sa1', kind: 'escalator', rect: { x: 180, y: 73, w: 14, h: 14 }, flow: 'max' },
  { id: 'esc-sa2', kind: 'escalator', rect: { x: 530, y: 73, w: 14, h: 14 }, flow: 'max' },
  { id: 'esc-sa3', kind: 'escalator', rect: { x: 350, y: 250, w: 14, h: 14 }, flow: 'max' },
  { id: 'info-sa1', kind: 'poi', poi: 'info', x: 358, y: 322, z: 18 },
  { id: 'wc-sa1', kind: 'poi', poi: 'wc', x: 187, y: 400, z: 16 },
  { id: 'wc-sa2', kind: 'poi', poi: 'wc', x: 252, y: 119, z: 16 },
  { id: 'atm-sa1', kind: 'poi', poi: 'atm', x: 58, y: 216, z: 16 },
];

export const storesSambilAutopista: MapStore[] = [
  {
    id: "local_1", name: "Liah Spa", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 34, y: 397, w: 36, h: 21, doorNodeId: "node-64", slug: "liah_spa", aliases: ["liah_spa", "liah", "liah-spa"],
    polygon: [{ x: 35, y: 397 }, { x: 50, y: 397 }, { x: 64, y: 397 }, { x: 70, y: 404 }, { x: 67, y: 404 }, { x: 67, y: 418 }, { x: 34, y: 418 }],
    labelPos: { x: 55, y: 405 }
  },
  {
    id: "local_2", name: "no legible 1", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 67, y: 404, w: 15, h: 14, doorNodeId: "node-62",
    polygon: [{ x: 67, y: 404 }, { x: 82, y: 404 }, { x: 82, y: 418 }, { x: 67, y: 418 }],
    labelPos: { x: 75, y: 411 }
  },
  {
    id: "local_3", name: "no legible 2", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 82, y: 404, w: 15, h: 14, doorNodeId: "node-61",
    polygon: [{ x: 82, y: 418 }, { x: 97, y: 418 }, { x: 97, y: 404 }, { x: 82, y: 404 }],
    labelPos: { x: 90, y: 411 }
  },
  {
    id: "local_4", name: "Tiendas Tijerazo", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 14,
    x: 59, y: 70, w: 141, h: 131, doorNodeId: "node-75", slug: "tijerazo", aliases: ["tijerazo", "tiendas_tijerazo"],
    polygon: [{ x: 64, y: 70 }, { x: 155, y: 70 }, { x: 155, y: 120 }, { x: 200, y: 165 }, { x: 192, y: 175 }, { x: 190, y: 182 }, { x: 191, y: 194 }, { x: 183, y: 201 }, { x: 126, y: 144 }, { x: 59, y: 142 }],
    labelPos: { x: 152, y: 146 }
  },
  {
    id: "local_5", name: "Macuto", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 155, y: 71, w: 82, h: 94, doorNodeId: "node-77", slug: "macuto", aliases: ["macuto"],
    polygon: [{ x: 155, y: 71 }, { x: 237, y: 72 }, { x: 237, y: 104 }, { x: 223, y: 108 }, { x: 223, y: 155 }, { x: 210, y: 157 }, { x: 200, y: 165 }, { x: 155, y: 120 }],
    labelPos: { x: 205, y: 119 }
  },
  {
    id: "local_6", name: "LC Waikiki", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 55, y: 142, w: 128, h: 80, doorNodeId: "node-75", slug: "lc_waikiki", aliases: ["lc_waikiki", "lcwaikiki"],
    polygon: [{ x: 59, y: 142 }, { x: 55, y: 196 }, { x: 136, y: 197 }, { x: 159, y: 222 }, { x: 183, y: 201 }, { x: 126, y: 144 }],
    labelPos: { x: 120, y: 184 }
  },
  {
    id: "local_7", name: "Hollywood Star", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 223, y: 110, w: 14, h: 49, doorNodeId: "node-78",
    polygon: [{ x: 223, y: 110 }, { x: 237, y: 110 }, { x: 237, y: 159 }, { x: 232, y: 157 }, { x: 228, y: 156 }, { x: 223, y: 155 }],
    labelPos: { x: 230, y: 141 }
  },
  {
    id: "local_8", name: "Palacio del Blumer", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 103, y: 204, w: 51, h: 38, doorNodeId: "node-74", slug: "palacio_del_blumer", aliases: ["palacio_del_blumer", "palacio-del-blumer", "palacio_blumer"],
    polygon: [{ x: 103, y: 204 }, { x: 131, y: 204 }, { x: 154, y: 228 }, { x: 150, y: 232 }, { x: 146, y: 237 }, { x: 142, y: 242 }, { x: 140, y: 240 }],
    labelPos: { x: 138, y: 227 }
  },
  {
    id: "local_9", name: "Bath & Body Works", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 60, y: 203, w: 82, h: 71, doorNodeId: "node-73", slug: "bath_body", aliases: ["bath_body", "bath_and_body_works", "bath_body_works", "bath-body-works", "bbw"],
    polygon: [{ x: 121, y: 274 }, { x: 65, y: 216 }, { x: 60, y: 216 }, { x: 61, y: 203 }, { x: 103, y: 204 }, { x: 142, y: 242 }, { x: 133, y: 254 }, { x: 127, y: 263 }],
    labelPos: { x: 102, y: 234 }
  },
  {
    id: "local_10", name: "Sansa", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 35, y: 378, w: 36, h: 19, doorNodeId: "node-64", slug: "sansa", aliases: ["sansa"],
    polygon: [{ x: 35, y: 397 }, { x: 37, y: 378 }, { x: 62, y: 379 }, { x: 71, y: 388 }, { x: 64, y: 397 }],
    labelPos: { x: 54, y: 388 }
  },
  {
    id: "local_11", name: "Romano", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 37, y: 363, w: 33, h: 17, doorNodeId: "node-65",
    polygon: [{ x: 70, y: 372 }, { x: 63, y: 380 }, { x: 62, y: 379 }, { x: 37, y: 378 }, { x: 39, y: 363 }, { x: 62, y: 363 }],
    labelPos: { x: 56, y: 373 }
  },
  {
    id: "local_12", name: "Sandro", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 39, y: 351, w: 38, h: 14, doorNodeId: "node-66",
    polygon: [{ x: 64, y: 365 }, { x: 62, y: 363 }, { x: 39, y: 363 }, { x: 40, y: 351 }, { x: 73, y: 351 }, { x: 77, y: 356 }],
    labelPos: { x: 59, y: 358 }
  },
  {
    id: "local_13", name: "McCafé", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 40, y: 334, w: 42, h: 17, doorNodeId: "node-67",
    polygon: [{ x: 40, y: 351 }, { x: 42, y: 334 }, { x: 78, y: 334 }, { x: 82, y: 341 }, { x: 73, y: 351 }],
    labelPos: { x: 63, y: 342 }
  },
  {
    id: "local_14", name: "Pets Planet", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 50, y: 320, w: 34, h: 14, doorNodeId: "node-68",
    polygon: [{ x: 78, y: 334 }, { x: 84, y: 332 }, { x: 82, y: 326 }, { x: 82, y: 320 }, { x: 51, y: 320 }, { x: 50, y: 334 }],
    labelPos: { x: 71, y: 328 }
  },
  {
    id: "local_15", name: "Pit Body Care", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 51, y: 306, w: 33, h: 14, doorNodeId: "node-69",
    polygon: [{ x: 80, y: 307 }, { x: 84, y: 309 }, { x: 83, y: 311 }, { x: 82, y: 316 }, { x: 82, y: 320 }, { x: 51, y: 320 }, { x: 52, y: 306 }],
    labelPos: { x: 73, y: 313 }
  },
  {
    id: "local_16", name: "Big Shoes", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 52, y: 266, w: 38, h: 43, doorNodeId: "node-70",
    polygon: [{ x: 87, y: 304 }, { x: 84, y: 309 }, { x: 80, y: 307 }, { x: 52, y: 306 }, { x: 56, y: 266 }, { x: 59, y: 266 }, { x: 90, y: 301 }],
    labelPos: { x: 73, y: 294 }
  },
  {
    id: "local_17", name: "Estivaneli", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 56, y: 242, w: 45, h: 59, doorNodeId: "node-71", slug: "estivaneli", aliases: ["estivaneli"],
    polygon: [{ x: 96, y: 298 }, { x: 91, y: 301 }, { x: 59, y: 266 }, { x: 56, y: 266 }, { x: 58, y: 242 }, { x: 62, y: 242 }, { x: 98, y: 280 }, { x: 101, y: 295 }],
    labelPos: { x: 78, y: 274 }
  },
  {
    id: "local_18", name: "Banco del Tesoro", category: "finance", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 58, y: 216, w: 63, h: 79, doorNodeId: "node-72", slug: "banco_del_tesoro", aliases: ["banco_del_tesoro", "tesoro"],
    polygon: [{ x: 109, y: 292 }, { x: 105, y: 293 }, { x: 101, y: 295 }, { x: 98, y: 280 }, { x: 62, y: 242 }, { x: 58, y: 242 }, { x: 60, y: 216 }, { x: 65, y: 216 }, { x: 121, y: 274 }, { x: 112, y: 292 }],
    labelPos: { x: 89, y: 264 }
  },
  {
    id: "local_19", name: "Local 19", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 104, y: 398, w: 15, h: 14, doorNodeId: "node-60",
    polygon: [{ x: 104, y: 398 }, { x: 119, y: 398 }, { x: 119, y: 412 }, { x: 104, y: 412 }],
    labelPos: { x: 112, y: 405 }
  },
  {
    id: "local_20", name: "Jesus Morales", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 94, y: 379, w: 25, h: 19, doorNodeId: "node-59",
    polygon: [{ x: 119, y: 398 }, { x: 119, y: 379 }, { x: 101, y: 379 }, { x: 94, y: 388 }, { x: 104, y: 398 }],
    labelPos: { x: 107, y: 388 }
  },
  {
    id: "local_21", name: "Piedy", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 95, y: 366, w: 24, h: 13, doorNodeId: "node-58",
    polygon: [{ x: 119, y: 379 }, { x: 101, y: 379 }, { x: 95, y: 373 }, { x: 102, y: 366 }, { x: 119, y: 366 }],
    labelPos: { x: 107, y: 373 }
  },
  {
    id: "local_22", name: "Local 22", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 94, y: 354, w: 12, h: 14, doorNodeId: "node-57",
    polygon: [{ x: 106, y: 356 }, { x: 102, y: 354 }, { x: 94, y: 362 }, { x: 100, y: 368 }, { x: 102, y: 366 }, { x: 106, y: 366 }],
    labelPos: { x: 102, y: 362 }
  },
  {
    id: "local_23", name: "Local 23", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 106, y: 356, w: 6, h: 6, doorNodeId: "node-56",
    polygon: [{ x: 106, y: 362 }, { x: 106, y: 356 }, { x: 112, y: 356 }, { x: 112, y: 362 }],
    labelPos: { x: 109, y: 359 }
  },
  {
    id: "local_23_copia", name: "Local 23 (copia)", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 112, y: 356, w: 6, h: 6, doorNodeId: "node-56",
    polygon: [{ x: 112, y: 362 }, { x: 112, y: 356 }, { x: 118, y: 356 }, { x: 118, y: 362 }],
    labelPos: { x: 115, y: 359 }
  },
  {
    id: "local_25", name: "Holic Shop", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 119, y: 346, w: 14, h: 66, doorNodeId: "node-55",
    polygon: [{ x: 133, y: 346 }, { x: 130, y: 349 }, { x: 127, y: 351 }, { x: 123, y: 353 }, { x: 119, y: 354 }, { x: 120, y: 361 }, { x: 120, y: 379 }, { x: 120, y: 412 }, { x: 132, y: 412 }],
    labelPos: { x: 125, y: 369 }
  },
  {
    id: "local_26", name: "Victoria's Secret", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 130, y: 331, w: 43, h: 82, doorNodeId: "node-37-victoria secret", slug: "victoria_secret", aliases: ["victoria_secret", "victorias_secret"],
    polygon: [{ x: 173, y: 331 }, { x: 172, y: 388 }, { x: 163, y: 388 }, { x: 163, y: 402 }, { x: 172, y: 402 }, { x: 172, y: 413 }, { x: 133, y: 413 }, { x: 134, y: 345 }, { x: 130, y: 342 }, { x: 134, y: 339 }, { x: 137, y: 335 }, { x: 137, y: 331 }],
    labelPos: { x: 152, y: 369 }
  },
  {
    id: "local_27", name: "Bhype", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 179, y: 331, w: 13, h: 53, doorNodeId: "node-38-bhype",
    polygon: [{ x: 179, y: 332 }, { x: 179, y: 384 }, { x: 191, y: 384 }, { x: 192, y: 331 }],
    labelPos: { x: 185, y: 358 }
  },
  {
    id: "local_28", name: "Psyco Bunny", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 192, y: 332, w: 13, h: 70, doorNodeId: "node-39-bunny", aliases: ["psycho_bunny", "psyco_bunny"],
    polygon: [{ x: 193, y: 332 }, { x: 192, y: 382 }, { x: 199, y: 382 }, { x: 198, y: 402 }, { x: 205, y: 402 }, { x: 205, y: 333 }],
    labelPos: { x: 199, y: 372 }
  },
  {
    id: "local_29", name: "Aishop", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 206, y: 332, w: 27, h: 70, doorNodeId: "node-40-aishop",
    polygon: [{ x: 224, y: 333 }, { x: 224, y: 373 }, { x: 233, y: 374 }, { x: 232, y: 402 }, { x: 206, y: 402 }, { x: 207, y: 332 }],
    labelPos: { x: 221, y: 369 }
  },
  {
    id: "local_30", name: "Jadu Cosmetics", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 225, y: 333, w: 17, h: 39, doorNodeId: "node-41",
    polygon: [{ x: 225, y: 333 }, { x: 225, y: 372 }, { x: 242, y: 372 }, { x: 241, y: 360 }, { x: 239, y: 360 }, { x: 240, y: 333 }],
    labelPos: { x: 235, y: 355 }
  },
  {
    id: "local_31", name: "XC2", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 234, y: 333, w: 26, h: 70, doorNodeId: "node-42",
    polygon: [{ x: 249, y: 360 }, { x: 243, y: 360 }, { x: 243, y: 374 }, { x: 234, y: 374 }, { x: 234, y: 402 }, { x: 260, y: 403 }, { x: 260, y: 334 }, { x: 249, y: 333 }],
    labelPos: { x: 247, y: 368 }
  },
  {
    id: "local_32", name: "Skechers", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 260, y: 333, w: 15, h: 70, doorNodeId: "node-44", slug: "skechers", aliases: ["skechers"],
    polygon: [{ x: 267, y: 403 }, { x: 260, y: 403 }, { x: 262, y: 333 }, { x: 275, y: 334 }, { x: 274, y: 383 }, { x: 267, y: 383 }],
    labelPos: { x: 268, y: 373 }
  },
  {
    id: "local_33", name: "Libby Lu", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 274, y: 334, w: 14, h: 49, doorNodeId: "node-46",
    polygon: [{ x: 274, y: 383 }, { x: 287, y: 383 }, { x: 288, y: 334 }, { x: 275, y: 334 }],
    labelPos: { x: 281, y: 359 }
  },
  {
    id: "local_34", name: "USA Jeans Wear", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 282, y: 333, w: 28, h: 71, doorNodeId: "node-47",
    polygon: [{ x: 289, y: 334 }, { x: 288, y: 395 }, { x: 282, y: 395 }, { x: 283, y: 404 }, { x: 309, y: 404 }, { x: 310, y: 333 }],
    labelPos: { x: 294, y: 378 }
  },
  {
    id: "local_35", name: "Reinaldo Sport", category: "sports", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 315, y: 334, w: 29, h: 71, doorNodeId: "node-141",
    polygon: [{ x: 322, y: 334 }, { x: 316, y: 334 }, { x: 315, y: 405 }, { x: 342, y: 405 }, { x: 343, y: 366 }, { x: 344, y: 360 }, { x: 322, y: 337 }],
    labelPos: { x: 329, y: 363 }
  },
  {
    id: "local_36", name: "Juventus", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 343, y: 361, w: 26, h: 45, doorNodeId: "node-140",
    polygon: [{ x: 344, y: 365 }, { x: 347, y: 361 }, { x: 367, y: 361 }, { x: 369, y: 366 }, { x: 368, y: 397 }, { x: 364, y: 397 }, { x: 364, y: 406 }, { x: 343, y: 405 }],
    labelPos: { x: 358, y: 382 }
  },
  {
    id: "local_37", name: "Local 37", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 364, y: 350, w: 20, h: 56, doorNodeId: "node-139",
    polygon: [{ x: 383, y: 406 }, { x: 364, y: 405 }, { x: 364, y: 397 }, { x: 370, y: 397 }, { x: 370, y: 365 }, { x: 368, y: 360 }, { x: 373, y: 355 }, { x: 379, y: 350 }, { x: 384, y: 354 }],
    labelPos: { x: 373, y: 377 }
  },
  {
    id: "local_38", name: "Sport Market", category: "sports", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 379, y: 335, w: 46, h: 84, doorNodeId: "node-138",
    polygon: [{ x: 424, y: 419 }, { x: 404, y: 419 }, { x: 404, y: 405 }, { x: 384, y: 406 }, { x: 384, y: 354 }, { x: 379, y: 349 }, { x: 391, y: 339 }, { x: 391, y: 335 }, { x: 415, y: 336 }, { x: 415, y: 372 }, { x: 425, y: 373 }],
    labelPos: { x: 401, y: 373 }
  },
  {
    id: "local_39", name: "Al Giorno", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 416, y: 336, w: 18, h: 36, doorNodeId: "node-137",
    polygon: [{ x: 416, y: 336 }, { x: 416, y: 372 }, { x: 433, y: 372 }, { x: 434, y: 337 }],
    labelPos: { x: 425, y: 354 }
  },
  {
    id: "local_40", name: "Farmatodo", category: "pharmacy", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 424, y: 337, w: 56, h: 84, doorNodeId: "node-136", slug: "farmatodo", aliases: ["farmatodo"],
    polygon: [{ x: 434, y: 337 }, { x: 434, y: 373 }, { x: 426, y: 373 }, { x: 424, y: 419 }, { x: 479, y: 421 }, { x: 480, y: 413 }, { x: 463, y: 413 }, { x: 463, y: 408 }, { x: 458, y: 408 }, { x: 458, y: 402 }, { x: 466, y: 402 }, { x: 466, y: 337 }],
    labelPos: { x: 454, y: 392 }
  },
  {
    id: "local_41", name: "Make Waves", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 467, y: 337, w: 13, h: 63, doorNodeId: "node-135",
    polygon: [{ x: 467, y: 337 }, { x: 467, y: 400 }, { x: 480, y: 399 }, { x: 479, y: 338 }],
    labelPos: { x: 473, y: 369 }
  },
  {
    id: "local_42", name: "Pull&Bear", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 486, y: 338, w: 67, h: 84, doorNodeId: "node-134", slug: "pull_bear", aliases: ["pull_bear", "pull_and_bear"],
    polygon: [{ x: 486, y: 338 }, { x: 488, y: 342 }, { x: 486, y: 421 }, { x: 548, y: 422 }, { x: 549, y: 357 }, { x: 553, y: 353 }, { x: 548, y: 349 }, { x: 546, y: 345 }, { x: 544, y: 340 }],
    labelPos: { x: 528, y: 363 }
  },
  {
    id: "local_43", name: "Cines Unidos", category: "entertainment", floorId: LEVEL_AUTOPISTA, height: 16,
    x: 562, y: 316, w: 157, h: 104, doorNodeId: "node-146", slug: "cines_unidos", aliases: ["cines_unidos"],
    polygon: [{ x: 610, y: 330 }, { x: 648, y: 316 }, { x: 648, y: 320 }, { x: 652, y: 319 }, { x: 659, y: 345 }, { x: 719, y: 347 }, { x: 718, y: 410 }, { x: 643, y: 409 }, { x: 644, y: 420 }, { x: 569, y: 418 }, { x: 569, y: 414 }, { x: 562, y: 415 }, { x: 564, y: 361 }, { x: 571, y: 363 }, { x: 578, y: 364 }, { x: 587, y: 363 }, { x: 594, y: 359 }, { x: 602, y: 354 }, { x: 607, y: 347 }, { x: 611, y: 340 }],
    labelPos: { x: 618, y: 366 }
  },
  {
    id: "local_44", name: "Calzedonia", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 533, y: 303, w: 24, h: 17, doorNodeId: "node-150",
    polygon: [{ x: 557, y: 303 }, { x: 533, y: 303 }, { x: 533, y: 319 }, { x: 544, y: 320 }, { x: 546, y: 317 }, { x: 550, y: 309 }],
    labelPos: { x: 544, y: 312 }
  },
  {
    id: "local_45", name: "ORO Today", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 522, y: 295, w: 11, h: 25, doorNodeId: "node-151",
    polygon: [{ x: 533, y: 320 }, { x: 532, y: 295 }, { x: 523, y: 296 }, { x: 522, y: 320 }],
    labelPos: { x: 528, y: 308 }
  },
  {
    id: "local_46", name: "Ross ", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 508, y: 295, w: 15, h: 25, doorNodeId: "node-133",
    polygon: [{ x: 523, y: 320 }, { x: 523, y: 296 }, { x: 509, y: 295 }, { x: 508, y: 319 }],
    labelPos: { x: 516, y: 308 }
  },
  {
    id: "local_47", name: "Mario Hernandez", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 486, y: 283, w: 23, h: 36, doorNodeId: "node-132", slug: "mario_hernandez", aliases: ["mario_hernandez"],
    polygon: [{ x: 505, y: 295 }, { x: 509, y: 296 }, { x: 507, y: 319 }, { x: 486, y: 318 }, { x: 487, y: 291 }, { x: 495, y: 283 }],
    labelPos: { x: 498, y: 300 }
  },
  {
    id: "local_48", name: "Crocs", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 537, y: 280, w: 20, h: 22, doorNodeId: "node-149", slug: "crocs", aliases: ["crocs"],
    polygon: [{ x: 557, y: 302 }, { x: 553, y: 294 }, { x: 548, y: 286 }, { x: 545, y: 280 }, { x: 538, y: 286 }, { x: 537, y: 302 }],
    labelPos: { x: 546, y: 292 }
  },
  {
    id: "local_49", name: "Joalini", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 510, y: 264, w: 35, h: 25, doorNodeId: "node-148",
    polygon: [{ x: 545, y: 280 }, { x: 537, y: 285 }, { x: 537, y: 289 }, { x: 510, y: 288 }, { x: 535, y: 264 }, { x: 539, y: 271 }],
    labelPos: { x: 534, y: 280 }
  },
  {
    id: "local_50", name: "Local 50", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 498, y: 248, w: 38, h: 40, doorNodeId: "node-147",
    polygon: [{ x: 536, y: 263 }, { x: 522, y: 248 }, { x: 498, y: 276 }, { x: 508, y: 288 }],
    labelPos: { x: 516, y: 269 }
  },
  {
    id: "local_51", name: "Brookfield", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 487, y: 240, w: 36, h: 36, doorNodeId: "node-153",
    polygon: [{ x: 522, y: 248 }, { x: 498, y: 276 }, { x: 487, y: 266 }, { x: 514, y: 240 }],
    labelPos: { x: 505, y: 258 }
  },
  {
    id: "local_52", name: "Urban Market", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 482, y: 222, w: 27, h: 39, doorNodeId: "node-94",
    polygon: [{ x: 509, y: 235 }, { x: 495, y: 222 }, { x: 483, y: 235 }, { x: 482, y: 261 }],
    labelPos: { x: 492, y: 238 }
  },
  {
    id: "local_53", name: "Local 53", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 468, y: 215, w: 26, h: 47, doorNodeId: "node-95",
    polygon: [{ x: 494, y: 221 }, { x: 482, y: 234 }, { x: 481, y: 262 }, { x: 468, y: 262 }, { x: 469, y: 222 }, { x: 475, y: 221 }, { x: 480, y: 220 }, { x: 484, y: 218 }, { x: 488, y: 215 }],
    labelPos: { x: 480, y: 231 }
  },
  {
    id: "local_54", name: "Local 54", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 449, y: 220, w: 20, h: 41, doorNodeId: "node-96",
    polygon: [{ x: 462, y: 220 }, { x: 466, y: 221 }, { x: 469, y: 221 }, { x: 468, y: 261 }, { x: 461, y: 261 }, { x: 461, y: 246 }, { x: 449, y: 236 }],
    labelPos: { x: 462, y: 238 }
  },
  {
    id: "local_55", name: "Local 55", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 440, y: 236, w: 21, h: 26, doorNodeId: "node-98",
    polygon: [{ x: 448, y: 236 }, { x: 461, y: 246 }, { x: 460, y: 262 }, { x: 449, y: 262 }, { x: 449, y: 255 }, { x: 440, y: 248 }],
    labelPos: { x: 451, y: 252 }
  },
  {
    id: "local_56", name: "Opticolor", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 429, y: 247, w: 20, h: 20, doorNodeId: "node-99",
    polygon: [{ x: 449, y: 255 }, { x: 449, y: 262 }, { x: 442, y: 267 }, { x: 429, y: 258 }, { x: 438, y: 247 }],
    labelPos: { x: 441, y: 258 }
  },
  {
    id: "local_57", name: "GrachI", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 420, y: 258, w: 21, h: 21, doorNodeId: "node-100",
    polygon: [{ x: 429, y: 258 }, { x: 441, y: 268 }, { x: 432, y: 279 }, { x: 420, y: 269 }],
    labelPos: { x: 431, y: 269 }
  },
  {
    id: "local_58", name: "Local 58", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 410, y: 273, w: 18, h: 18, doorNodeId: "node-101",
    polygon: [{ x: 416, y: 273 }, { x: 428, y: 284 }, { x: 422, y: 291 }, { x: 410, y: 281 }],
    labelPos: { x: 419, y: 282 }
  },
  {
    id: "local_59", name: "Local 59", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 399, y: 282, w: 23, h: 21, doorNodeId: "node-102",
    polygon: [{ x: 410, y: 282 }, { x: 422, y: 291 }, { x: 411, y: 303 }, { x: 399, y: 294 }],
    labelPos: { x: 411, y: 293 }
  },
  {
    id: "local_60", name: "Top Ten 18", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 389, y: 294, w: 26, h: 22, doorNodeId: "node-104",
    polygon: [{ x: 398, y: 294 }, { x: 389, y: 305 }, { x: 392, y: 306 }, { x: 391, y: 316 }, { x: 408, y: 316 }, { x: 409, y: 313 }, { x: 415, y: 307 }],
    labelPos: { x: 400, y: 308 }
  },
  {
    id: "local_61", name: "Local 61", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 410, y: 297, w: 15, h: 20, doorNodeId: "node-104",
    polygon: [{ x: 425, y: 297 }, { x: 425, y: 317 }, { x: 410, y: 317 }, { x: 410, y: 314 }],
    labelPos: { x: 418, y: 311 }
  },
  {
    id: "local_62", name: "Lucchi", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 425, y: 267, w: 29, h: 50, doorNodeId: "node-101",
    polygon: [{ x: 454, y: 267 }, { x: 450, y: 267 }, { x: 426, y: 296 }, { x: 425, y: 317 }, { x: 452, y: 317 }],
    labelPos: { x: 441, y: 293 }
  },
  {
    id: "local_63", name: "Brands Shop Damas", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 453, y: 267, w: 38, h: 51, doorNodeId: "node-108",
    polygon: [{ x: 480, y: 267 }, { x: 491, y: 279 }, { x: 481, y: 288 }, { x: 480, y: 318 }, { x: 453, y: 317 }, { x: 454, y: 267 }],
    labelPos: { x: 473, y: 289 }
  },
  {
    id: "local_64", name: "Local 64", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 421, y: 181, w: 25, h: 34, doorNodeId: "node-110",
    polygon: [{ x: 442, y: 215 }, { x: 446, y: 211 }, { x: 443, y: 207 }, { x: 441, y: 203 }, { x: 439, y: 198 }, { x: 438, y: 194 }, { x: 438, y: 191 }, { x: 439, y: 187 }, { x: 423, y: 181 }, { x: 421, y: 197 }],
    labelPos: { x: 437, y: 198 }
  },
  {
    id: "local_65", name: "Local 65", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 414, y: 199, w: 26, h: 24, doorNodeId: "node-110",
    polygon: [{ x: 414, y: 205 }, { x: 420, y: 199 }, { x: 440, y: 216 }, { x: 434, y: 223 }],
    labelPos: { x: 427, y: 211 }
  },
  {
    id: "local_66", name: "Target UP", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 404, y: 176, w: 18, h: 28, doorNodeId: "node-112",
    polygon: [{ x: 422, y: 180 }, { x: 407, y: 176 }, { x: 407, y: 194 }, { x: 404, y: 197 }, { x: 414, y: 205 }, { x: 420, y: 199 }],
    labelPos: { x: 413, y: 192 }
  },
  {
    id: "local_67", name: "New York Silver", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 395, y: 198, w: 39, h: 35, doorNodeId: "node-109",
    polygon: [{ x: 404, y: 198 }, { x: 434, y: 225 }, { x: 426, y: 233 }, { x: 395, y: 208 }],
    labelPos: { x: 415, y: 216 }
  },
  {
    id: "local_68", name: "Panots", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 386, y: 209, w: 40, h: 36, doorNodeId: "node-108",
    polygon: [{ x: 394, y: 209 }, { x: 426, y: 234 }, { x: 417, y: 245 }, { x: 386, y: 220 }],
    labelPos: { x: 406, y: 227 }
  },
  {
    id: "local_69", name: "Gran Via", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 379, y: 220, w: 37, h: 36, doorNodeId: "node-107",
    polygon: [{ x: 386, y: 220 }, { x: 417, y: 245 }, { x: 407, y: 256 }, { x: 379, y: 234 }, { x: 379, y: 229 }],
    labelPos: { x: 393, y: 237 }
  },
  {
    id: "local_70", name: "Line", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 374, y: 246, w: 27, h: 27, doorNodeId: "node-106",
    polygon: [{ x: 384, y: 246 }, { x: 401, y: 262 }, { x: 392, y: 273 }, { x: 374, y: 259 }],
    labelPos: { x: 388, y: 260 }
  },
  {
    id: "local_71", name: "Radical", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 372, y: 260, w: 20, h: 31, doorNodeId: "node-105",
    polygon: [{ x: 392, y: 274 }, { x: 374, y: 260 }, { x: 372, y: 260 }, { x: 372, y: 286 }, { x: 374, y: 288 }, { x: 377, y: 291 }],
    labelPos: { x: 377, y: 277 }
  },
  {
    id: "local_72", name: "Prime Bodegon", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 361, y: 239, w: 23, h: 47, doorNodeId: "node-143",
    polygon: [{ x: 384, y: 246 }, { x: 374, y: 259 }, { x: 373, y: 286 }, { x: 361, y: 286 }, { x: 361, y: 248 }, { x: 373, y: 247 }, { x: 374, y: 240 }, { x: 375, y: 239 }, { x: 377, y: 239 }],
    labelPos: { x: 372, y: 255 }
  },
  {
    id: "local_73", name: "Salome", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 345, y: 246, w: 14, h: 39, doorNodeId: "node-143",
    polygon: [{ x: 358, y: 247 }, { x: 346, y: 246 }, { x: 345, y: 284 }, { x: 359, y: 285 }],
    labelPos: { x: 352, y: 266 }
  },
  {
    id: "local_74", name: "Boom Shoes", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 318, y: 246, w: 26, h: 69, doorNodeId: "node-142",
    polygon: [{ x: 344, y: 246 }, { x: 344, y: 285 }, { x: 323, y: 304 }, { x: 323, y: 315 }, { x: 318, y: 315 }, { x: 320, y: 246 }],
    labelPos: { x: 329, y: 285 }
  },
  {
    id: "local_75", name: "Tommy", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 271, y: 245, w: 48, h: 71, doorNodeId: "node-48", slug: "tommy", aliases: ["tommy", "tommy_hilfiger"],
    polygon: [{ x: 319, y: 245 }, { x: 318, y: 316 }, { x: 271, y: 314 }, { x: 274, y: 245 }],
    labelPos: { x: 296, y: 280 }
  },
  {
    id: "local_76", name: "RS Performan", category: "sports", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 254, y: 244, w: 18, h: 70, doorNodeId: "node-49",
    polygon: [{ x: 263, y: 244 }, { x: 272, y: 244 }, { x: 270, y: 314 }, { x: 254, y: 313 }, { x: 255, y: 263 }, { x: 263, y: 264 }],
    labelPos: { x: 263, y: 274 }
  },
  {
    id: "local_77", name: "Banco Provincial", category: "finance", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 235, y: 262, w: 19, h: 50, doorNodeId: "node-50", slug: "banco_provincial", aliases: ["banco_provincial", "provincial", "bbva"],
    polygon: [{ x: 254, y: 262 }, { x: 253, y: 312 }, { x: 235, y: 312 }, { x: 235, y: 262 }],
    labelPos: { x: 244, y: 287 }
  },
  {
    id: "local_78", name: "James Bark", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 220, y: 262, w: 15, h: 51, doorNodeId: "node-51", slug: "james_bark", aliases: ["james_bark"],
    polygon: [{ x: 221, y: 262 }, { x: 235, y: 262 }, { x: 234, y: 313 }, { x: 220, y: 313 }],
    labelPos: { x: 228, y: 288 }
  },
  {
    id: "local_79", name: "Mango MNG", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 180, y: 261, w: 42, h: 51, doorNodeId: "node-52", slug: "mng", aliases: ["mng", "mango", "mango_mng"],
    polygon: [{ x: 222, y: 262 }, { x: 220, y: 312 }, { x: 180, y: 312 }, { x: 180, y: 279 }, { x: 200, y: 261 }],
    labelPos: { x: 200, y: 285 }
  },
  {
    id: "local_80", name: "Local 80", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 167, y: 279, w: 13, h: 33, doorNodeId: "node-53",
    polygon: [{ x: 174, y: 285 }, { x: 179, y: 279 }, { x: 180, y: 312 }, { x: 167, y: 312 }, { x: 167, y: 285 }],
    labelPos: { x: 173, y: 295 }
  },
  {
    id: "local_81", name: "La Corte", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 130, y: 275, w: 36, h: 37, doorNodeId: "node-54",
    polygon: [{ x: 166, y: 286 }, { x: 166, y: 312 }, { x: 138, y: 312 }, { x: 136, y: 307 }, { x: 133, y: 303 }, { x: 130, y: 298 }, { x: 141, y: 275 }, { x: 152, y: 280 }, { x: 153, y: 286 }],
    labelPos: { x: 146, y: 295 }
  },
  {
    id: "local_82", name: "Panisse", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 143, y: 256, w: 32, h: 24, doorNodeId: "node-128",
    polygon: [{ x: 143, y: 272 }, { x: 152, y: 280 }, { x: 171, y: 280 }, { x: 175, y: 275 }, { x: 155, y: 256 }],
    labelPos: { x: 159, y: 273 }
  },
  {
    id: "local_83", name: "Centro Piramedal y Mineral", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 155, y: 242, w: 33, h: 33, doorNodeId: "node-127",
    polygon: [{ x: 155, y: 255 }, { x: 176, y: 275 }, { x: 188, y: 264 }, { x: 166, y: 242 }],
    labelPos: { x: 171, y: 259 }
  },
  {
    id: "local_84", name: "Yuju", category: "entertainment", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 173, y: 229, w: 28, h: 31, doorNodeId: "node-126",
    polygon: [{ x: 201, y: 248 }, { x: 201, y: 255 }, { x: 198, y: 255 }, { x: 192, y: 260 }, { x: 173, y: 238 }, { x: 182, y: 229 }],
    labelPos: { x: 191, y: 248 }
  },
  {
    id: "local_85", name: "El King Gourmet", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 182, y: 217, w: 26, h: 38, doorNodeId: "node-125",
    polygon: [{ x: 208, y: 255 }, { x: 202, y: 255 }, { x: 202, y: 248 }, { x: 182, y: 228 }, { x: 195, y: 217 }, { x: 208, y: 229 }],
    labelPos: { x: 200, y: 239 }
  },
  {
    id: "local_86", name: "Mini Good", category: "home", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 197, y: 210, w: 25, h: 46, doorNodeId: "node-76",
    polygon: [{ x: 197, y: 216 }, { x: 210, y: 229 }, { x: 209, y: 255 }, { x: 221, y: 256 }, { x: 222, y: 218 }, { x: 218, y: 218 }, { x: 213, y: 216 }, { x: 209, y: 214 }, { x: 204, y: 210 }],
    labelPos: { x: 211, y: 226 }
  },
  {
    id: "local_87", name: "Heladería 4D", category: "food", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 222, y: 215, w: 13, h: 41, doorNodeId: "node-124",
    polygon: [{ x: 223, y: 218 }, { x: 222, y: 256 }, { x: 235, y: 255 }, { x: 235, y: 215 }, { x: 233, y: 216 }],
    labelPos: { x: 230, y: 232 }
  },
  {
    id: "local_88", name: "Planeta Sport", category: "sports", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 236, y: 196, w: 27, h: 60, doorNodeId: "node-123",
    polygon: [{ x: 251, y: 196 }, { x: 262, y: 201 }, { x: 263, y: 238 }, { x: 256, y: 238 }, { x: 256, y: 256 }, { x: 236, y: 256 }, { x: 236, y: 215 }, { x: 239, y: 213 }, { x: 243, y: 210 }, { x: 246, y: 207 }],
    labelPos: { x: 249, y: 223 }
  },
  {
    id: "local_89", name: "Joyeria Bellagio", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 252, y: 179, w: 25, h: 60, doorNodeId: "node-122", slug: "bellagio", aliases: ["bellagio", "joyeria_bellagio"],
    polygon: [{ x: 252, y: 195 }, { x: 253, y: 191 }, { x: 254, y: 186 }, { x: 252, y: 183 }, { x: 266, y: 179 }, { x: 277, y: 191 }, { x: 276, y: 238 }, { x: 263, y: 239 }, { x: 263, y: 200 }],
    labelPos: { x: 262, y: 200 }
  },
  {
    id: "local_90", name: "HG Fashion", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 267, y: 172, w: 24, h: 67, doorNodeId: "node-121",
    polygon: [{ x: 291, y: 172 }, { x: 290, y: 239 }, { x: 277, y: 238 }, { x: 278, y: 190 }, { x: 267, y: 179 }, { x: 275, y: 176 }, { x: 283, y: 173 }],
    labelPos: { x: 280, y: 195 }
  },
  {
    id: "local_91", name: "VMagic", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 291, y: 169, w: 19, h: 70, doorNodeId: "node-120",
    polygon: [{ x: 310, y: 169 }, { x: 309, y: 239 }, { x: 291, y: 239 }, { x: 291, y: 173 }],
    labelPos: { x: 300, y: 205 }
  },
  {
    id: "local_92", name: "Lucy Lingerie", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 310, y: 167, w: 28, h: 72, doorNodeId: "node-119",
    polygon: [{ x: 311, y: 168 }, { x: 320, y: 167 }, { x: 323, y: 172 }, { x: 327, y: 172 }, { x: 327, y: 232 }, { x: 337, y: 233 }, { x: 338, y: 239 }, { x: 310, y: 239 }],
    labelPos: { x: 324, y: 203 }
  },
  {
    id: "local_93", name: "Converse", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 328, y: 171, w: 18, h: 62, doorNodeId: "node-118", slug: "converse", aliases: ["converse"],
    polygon: [{ x: 346, y: 171 }, { x: 345, y: 233 }, { x: 328, y: 231 }, { x: 328, y: 172 }],
    labelPos: { x: 337, y: 202 }
  },
  {
    id: "local_94", name: "London Jeans", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 346, y: 172, w: 14, h: 60, doorNodeId: "node-117",
    polygon: [{ x: 346, y: 172 }, { x: 360, y: 173 }, { x: 360, y: 232 }, { x: 346, y: 231 }],
    labelPos: { x: 353, y: 202 }
  },
  {
    id: "local_95", name: "Marbel Joyeros", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 361, y: 172, w: 12, h: 60, doorNodeId: "node-116",
    polygon: [{ x: 362, y: 172 }, { x: 373, y: 174 }, { x: 373, y: 232 }, { x: 361, y: 232 }],
    labelPos: { x: 367, y: 203 }
  },
  {
    id: "local_96", name: "Canguro", category: "tech", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 374, y: 170, w: 12, h: 56, doorNodeId: "node-115",
    polygon: [{ x: 375, y: 174 }, { x: 382, y: 175 }, { x: 386, y: 170 }, { x: 386, y: 210 }, { x: 374, y: 226 }],
    labelPos: { x: 381, y: 191 }
  },
  {
    id: "local_97", name: "Onity", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 387, y: 170, w: 15, h: 39, doorNodeId: "node-114",
    polygon: [{ x: 387, y: 170 }, { x: 401, y: 174 }, { x: 402, y: 191 }, { x: 387, y: 209 }],
    labelPos: { x: 394, y: 186 }
  },
  {
    id: "local_98", name: "Jump", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 238, y: 118, w: 38, h: 46, doorNodeId: "node-79", slug: "jump", aliases: ["jump"],
    polygon: [{ x: 243, y: 164 }, { x: 238, y: 159 }, { x: 238, y: 129 }, { x: 261, y: 130 }, { x: 261, y: 122 }, { x: 265, y: 122 }, { x: 265, y: 118 }, { x: 276, y: 119 }, { x: 273, y: 154 }, { x: 264, y: 157 }, { x: 257, y: 159 }],
    labelPos: { x: 258, y: 139 }
  },
  {
    id: "local_99", name: "Monivet", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 281, y: 119, w: 11, h: 33, doorNodeId: "node-80",
    polygon: [{ x: 292, y: 120 }, { x: 291, y: 149 }, { x: 287, y: 150 }, { x: 281, y: 152 }, { x: 281, y: 119 }],
    labelPos: { x: 286, y: 138 }
  },
  {
    id: "local_100", name: "Glam Eclat", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 292, y: 120, w: 12, h: 29, doorNodeId: "node-81",
    polygon: [{ x: 304, y: 121 }, { x: 303, y: 147 }, { x: 300, y: 148 }, { x: 292, y: 149 }, { x: 292, y: 120 }],
    labelPos: { x: 298, y: 137 }
  },
  {
    id: "local_101", name: "Harem Shoes", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 304, y: 112, w: 16, h: 35, doorNodeId: "node-82",
    polygon: [{ x: 304, y: 121 }, { x: 306, y: 120 }, { x: 307, y: 112 }, { x: 317, y: 112 }, { x: 317, y: 118 }, { x: 320, y: 118 }, { x: 319, y: 145 }, { x: 312, y: 146 }, { x: 304, y: 147 }],
    labelPos: { x: 312, y: 127 }
  },
  {
    id: "local_102", name: "Biphoria", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 320, y: 118, w: 18, h: 27, doorNodeId: "node-83",
    polygon: [{ x: 325, y: 140 }, { x: 320, y: 145 }, { x: 320, y: 118 }, { x: 338, y: 118 }, { x: 338, y: 139 }],
    labelPos: { x: 328, y: 132 }
  },
  {
    id: "local_103", name: "Hang Ten", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 338, y: 118, w: 18, h: 22, doorNodeId: "node-84", slug: "hang_ten", aliases: ["hang_ten"],
    polygon: [{ x: 338, y: 118 }, { x: 356, y: 119 }, { x: 356, y: 140 }, { x: 338, y: 139 }],
    labelPos: { x: 347, y: 129 }
  },
  {
    id: "local_104", name: "Nokn", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 356, y: 119, w: 19, h: 22, doorNodeId: "node-85",
    polygon: [{ x: 356, y: 119 }, { x: 375, y: 119 }, { x: 374, y: 140 }, { x: 356, y: 141 }],
    labelPos: { x: 365, y: 130 }
  },
  {
    id: "local_105", name: "Jeep / CAT", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 371, y: 89, w: 18, h: 60, doorNodeId: "node-86",
    polygon: [{ x: 387, y: 149 }, { x: 382, y: 143 }, { x: 374, y: 140 }, { x: 375, y: 119 }, { x: 372, y: 118 }, { x: 371, y: 89 }, { x: 389, y: 91 }],
    labelPos: { x: 378, y: 121 }
  },
  {
    id: "local_106", name: "Apolo", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 388, y: 89, w: 15, h: 61, doorNodeId: "node-87",
    polygon: [{ x: 389, y: 89 }, { x: 399, y: 92 }, { x: 399, y: 97 }, { x: 403, y: 97 }, { x: 401, y: 150 }, { x: 396, y: 149 }, { x: 393, y: 150 }, { x: 388, y: 149 }],
    labelPos: { x: 396, y: 122 }
  },
  {
    id: "local_107", name: "Las Villas Perfumeria", category: "beauty", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 403, y: 96, w: 28, h: 61, doorNodeId: "node-88", slug: "las_villas", aliases: ["las_villas", "perfumeria_las_villas"],
    polygon: [{ x: 403, y: 151 }, { x: 404, y: 96 }, { x: 417, y: 99 }, { x: 431, y: 103 }, { x: 430, y: 149 }, { x: 429, y: 149 }, { x: 426, y: 157 }, { x: 414, y: 154 }],
    labelPos: { x: 419, y: 132 }
  },
  {
    id: "local_108", name: "Springfield", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 427, y: 104, w: 34, h: 64, doorNodeId: "node-89", slug: "springfield", aliases: ["springfield"],
    polygon: [{ x: 432, y: 104 }, { x: 458, y: 113 }, { x: 456, y: 150 }, { x: 461, y: 161 }, { x: 457, y: 162 }, { x: 454, y: 164 }, { x: 451, y: 166 }, { x: 449, y: 168 }, { x: 427, y: 158 }, { x: 429, y: 148 }, { x: 431, y: 148 }],
    labelPos: { x: 446, y: 149 }
  },
  {
    id: "local_109", name: "Sportland", category: "sports", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 457, y: 113, w: 28, h: 48, doorNodeId: "node-90", slug: "sportland", aliases: ["sportland"],
    polygon: [{ x: 458, y: 113 }, { x: 485, y: 124 }, { x: 485, y: 149 }, { x: 480, y: 161 }, { x: 476, y: 161 }, { x: 471, y: 159 }, { x: 464, y: 159 }, { x: 462, y: 160 }, { x: 457, y: 149 }],
    labelPos: { x: 471, y: 148 }
  },
  {
    id: "local_110", name: "Banco Nacional de Credito", category: "finance", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 482, y: 125, w: 34, h: 44, doorNodeId: "node-91", slug: "bnc", aliases: ["bnc", "banco_nacional_de_credito", "local_bnc"],
    polygon: [{ x: 485, y: 125 }, { x: 510, y: 136 }, { x: 507, y: 142 }, { x: 516, y: 147 }, { x: 492, y: 169 }, { x: 489, y: 167 }, { x: 487, y: 165 }, { x: 484, y: 163 }, { x: 482, y: 162 }, { x: 486, y: 149 }],
    labelPos: { x: 494, y: 153 }
  },
  {
    id: "local_111", name: "Fashion Look", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 492, y: 148, w: 49, h: 36, doorNodeId: "node-92",
    polygon: [{ x: 492, y: 169 }, { x: 517, y: 148 }, { x: 541, y: 163 }, { x: 534, y: 170 }, { x: 500, y: 184 }, { x: 498, y: 177 }],
    labelPos: { x: 514, y: 169 }
  },
  {
    id: "local_112", name: "Optica Billi", category: "services", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 499, y: 163, w: 51, h: 44, doorNodeId: "node-93", slug: "optica_billi", aliases: ["optica_billi"],
    polygon: [{ x: 541, y: 163 }, { x: 550, y: 171 }, { x: 511, y: 207 }, { x: 499, y: 198 }, { x: 501, y: 194 }, { x: 501, y: 190 }, { x: 500, y: 184 }, { x: 533, y: 170 }],
    labelPos: { x: 517, y: 185 }
  },
  {
    id: "local_113", name: "Women´s Secret", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 510, y: 172, w: 52, h: 48, doorNodeId: "node-93", slug: "womens_secret", aliases: ["womens_secret", "women_secret"],
    polygon: [{ x: 550, y: 171 }, { x: 562, y: 184 }, { x: 524, y: 220 }, { x: 511, y: 207 }],
    labelPos: { x: 537, y: 196 }
  },
  {
    id: "local_114", name: "Stradivarius", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 14,
    x: 530, y: 194, w: 68, h: 72, doorNodeId: "node-154", slug: "stradivarius", aliases: ["stradivarius"],
    polygon: [{ x: 563, y: 194 }, { x: 572, y: 203 }, { x: 576, y: 201 }, { x: 598, y: 230 }, { x: 582, y: 243 }, { x: 585, y: 249 }, { x: 560, y: 266 }, { x: 548, y: 248 }, { x: 530, y: 225 }],
    labelPos: { x: 568, y: 229 }
  },
  {
    id: "local_115", name: "Bershka", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 14,
    x: 561, y: 229, w: 73, h: 82, doorNodeId: "node-154", slug: "bershka", aliases: ["bershka"],
    polygon: [{ x: 560, y: 266 }, { x: 585, y: 249 }, { x: 582, y: 243 }, { x: 598, y: 230 }, { x: 613, y: 250 }, { x: 619, y: 248 }, { x: 634, y: 280 }, { x: 611, y: 292 }, { x: 612, y: 297 }, { x: 608, y: 304 }, { x: 613, y: 307 }, { x: 604, y: 311 }, { x: 600, y: 307 }, { x: 597, y: 303 }, { x: 593, y: 300 }, { x: 587, y: 299 }, { x: 581, y: 297 }, { x: 575, y: 297 }],
    labelPos: { x: 599, y: 282 }
  },
  {
    id: "local_116", name: "Local 116", category: "fashion", floorId: LEVEL_AUTOPISTA, height: 13,
    x: 609, y: 280, w: 31, h: 27, doorNodeId: "node-146",
    polygon: [{ x: 614, y: 307 }, { x: 609, y: 303 }, { x: 613, y: 297 }, { x: 611, y: 292 }, { x: 635, y: 280 }, { x: 640, y: 290 }, { x: 637, y: 292 }, { x: 640, y: 298 }],
    labelPos: { x: 625, y: 295 }
  }
];

export const floorAutopistaData: MapFloor = {
  id: LEVEL_AUTOPISTA,
  name: 'Nivel Autopista (P1)',
  level: 1,
  width: 720,
  height: 540,
  orientation: {
    northAngle: -2.356194, // -3*Math.PI/4 hacia Tijerazo (Arriba-Izquierda)
  },
  zones: [
    {
      id: 'zone-norte',
      label: 'Zona Norte (Tijerazo)',
      cardinal: 'north',
      color: '#3B82F6',
      polygon: [{ x: 50, y: 50 }, { x: 250, y: 50 }, { x: 250, y: 220 }, { x: 50, y: 220 }],
    },
    {
      id: 'zone-sur',
      label: 'Zona Sur (Cines / Entrada A)',
      cardinal: 'south',
      color: '#EF4444',
      polygon: [{ x: 550, y: 300 }, { x: 720, y: 300 }, { x: 720, y: 440 }, { x: 550, y: 440 }],
    },
    {
      id: 'zone-central',
      label: 'Plaza Central',
      cardinal: 'center',
      color: '#F59E0B',
      polygon: [{ x: 300, y: 260 }, { x: 420, y: 260 }, { x: 420, y: 380 }, { x: 300, y: 380 }],
    },
  ],
  footprint: [
    { x: 61, y: 40 }, { x: 250, y: 45 }, { x: 380, y: 80 }, { x: 490, y: 115 },
    { x: 605, y: 210 }, { x: 660, y: 320 }, { x: 720, y: 320 }, { x: 715, y: 432 },
    { x: 567, y: 431 }, { x: 160, y: 420 }, { x: 30, y: 420 }, { x: 44, y: 282 },
    { x: 53, y: 193 }
  ],
  areas: [
    {
      id: 'corr-north',
      kind: 'corridor',
      polygon: [
        { x: 247, y: 159 }, { x: 305, y: 149 }, { x: 365, y: 147 }, { x: 415, y: 153 },
        { x: 453, y: 165 }, { x: 453, y: 183 }, { x: 415, y: 171 }, { x: 365, y: 165 },
        { x: 305, y: 167 }, { x: 247, y: 179 }
      ]
    },
    {
      id: 'corr-south',
      kind: 'corridor',
      polygon: [
        { x: 127, y: 320 }, { x: 330, y: 320 }, { x: 380, y: 320 }, { x: 547, y: 328 },
        { x: 547, y: 342 }, { x: 380, y: 334 }, { x: 330, y: 334 }, { x: 127, y: 334 }
      ]
    },
    {
      id: 'corr-east',
      kind: 'corridor',
      polygon: [
        { x: 511, y: 219 }, { x: 560, y: 250 }, { x: 587, y: 277 },
        { x: 571, y: 289 }, { x: 545, y: 263 }, { x: 497, y: 229 }
      ]
    },
    {
      id: 'corr-west',
      kind: 'corridor',
      polygon: [
        { x: 95, y: 278 }, { x: 180, y: 220 }, { x: 193, y: 230 }, { x: 107, y: 288 }
      ]
    },
    { id: 'pl-fuente', label: 'Plaza La Fuente', kind: 'plaza', center: { x: 222, y: 187 }, radius: 27, color: '#DC2626' },
    { id: 'pl-jardin', label: 'Plaza Jardin', kind: 'plaza', center: { x: 111, y: 322 }, radius: 25, color: '#2563EB' },
    { id: 'pl-central', label: 'Plaza Central', kind: 'plaza', center: { x: 358, y: 322 }, radius: 27, color: '#EA580C' },
    { id: 'pl-arte', label: 'Plaza El Arte', kind: 'plaza', center: { x: 470, y: 190 }, radius: 26, color: '#7C3AED' },
    { id: 'pl-musica', label: 'Plaza La Musica', kind: 'plaza', center: { x: 578, y: 330 }, radius: 27, color: '#1D4ED8' }
  ],
  obstacles: [],
  props: propsSambilAutopista
};

export const nodesAutopista: NavNode[] = [
  { id: 'node-pasillo B3', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 354, y: 153, connections: ['node-pasillo B4', 'node-pasillo B2', 'node-85', 'node-115', 'node-116', 'node-117', 'node-84', 'node-83', 'node-118'] },
  { id: 'node-entrada A1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 646, y: 304, connections: ['node-entrada A2', 'node-145'] },
  { id: 'node-plaza musica', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 575, y: 328, connections: ['node-entrada A2', 'node-pasillo A1', 'node-pasillo G5', 'node-146', 'v-plm-1'] },
  { id: 'node-plaza  el Arte', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 471, y: 189, connections: ['node-pasillo B1', 'node-pasillo A5', 'node-pasillo F2', 'node-92', 'node-91', 'node-90', 'node-89', 'v-pea-1'] },
  { id: 'node-pasillo B2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 396, y: 159, connections: ['node-pasillo B3', 'node-pasillo B1', 'node-87', 'node-113', 'node-86', 'node-114'] },
  { id: 'node-plaza la Fuente', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 220, y: 182, connections: ['node-pasillo C1', 'node-pasillo B5', 'node-78', 'node-77', 'node-122', 'node-123', 'node-124', 'node-76', 'v-plf-1'] },
  { id: 'node-plaza Jardin', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 116, y: 320, connections: ['node-pasillo D1', 'node-68', 'node-69', 'node-56', 'node-55', 'node-70', 'node-71', 'node-72', 'node-pasillo E1', 'node-pasillo C3', 'v-pj-1'] },
  { id: 'node-plaza Central', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 358, y: 325, connections: ['node-pasillo G1', 'node-pasillo E5', 'node-pasillo F1', 'node-141', 'node-142', 'node-140', 'node-143', 'node-139', 'node-144', 'v-pc-1'] },
  { id: 'node-pasillo G2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 428, y: 328, connections: ['node-pasillo G3', 'node-pasillo G1', 'node-137', 'node-129', 'node-130'] },
  { id: 'node-pasillo B1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 429, y: 171, connections: ['node-pasillo B2', 'node-plaza  el Arte', 'node-111', 'node-112', 'node-88'] },
  { id: 'node-pasillo E1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 171, y: 321, connections: ['node-plaza Jardin', 'node-54', 'node-37-victoria secret', 'node-53', 'node-pasillo E2', 'node-38-bhype', 'node-pasillo-baño-B'] },
  { id: 'node-pasillo C1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 184, y: 210, connections: ['node-pasillo C2', 'node-plaza la Fuente', 'node-75', 'node-125', 'node-126'] },
  { id: 'node-pasillo D1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 86, y: 355, connections: ['node-pasillo D2', 'node-66', 'node-57', 'node-67', 'node-plaza Jardin'] },
  { id: 'node-pasillo A2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 554, y: 277, connections: ['node-pasillo A3', 'node-pasillo A1', 'node-148'] },
  { id: 'node-pasillo A1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 565, y: 296, connections: ['node-pasillo A2', 'node-plaza musica', 'node-149', 'node-154'] },
  { id: 'node-pasillo F2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 436, y: 234, connections: ['node-pasillo F1', 'node-plaza  el Arte', 'node-108', 'node-100', 'node-99', 'node-109', 'node-110', 'node-98', 'node-97'] },
  { id: 'node-pasillo F1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 401, y: 276, connections: ['node-pasillo F2', 'node-plaza Central', 'node-105', 'node-104', 'node-103', 'node-102', 'node-106', 'node-107', 'node-101'] },
  { id: 'node-pasillo G1', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 397, y: 328, connections: ['node-pasillo G2', 'node-plaza Central', 'node-138'] },
  { id: 'node-pasillo E2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 208, y: 322, connections: ['node-pasillo E3', 'node-pasillo E1', 'node-52', 'node-39-bunny', 'node-40-aishop'] },
  { id: 'node-pasillo C2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 164, y: 237, connections: ['node-pasillo C3', 'node-pasillo C1', 'node-74', 'node-127'] },
  { id: 'node-Baño B', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 187, y: 400, connections: ['node-pasillo-baño-B'] },
  { id: 'node-baño A', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 252, y: 119, connections: ['node-pasillo-baño A'] },
  { id: 'node-pasillo B4', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 310, y: 155, connections: ['node-pasillo B5', 'node-pasillo B3', 'node-82', 'node-81', 'node-80', 'node-119', 'node-120'] },
  { id: 'node-pasillo B5', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 262, y: 168, connections: ['node-plaza la Fuente', 'node-pasillo B4', 'node-79', 'node-121', 'node-pasillo-baño A'] },
  { id: 'node-pasillo C3', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 136, y: 267, connections: ['node-plaza Jardin', 'node-pasillo C2', 'node-128', 'node-73'] },
  { id: 'node-pasillo E3', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 242, y: 323, connections: ['node-44', 'node-pasillo E4', 'node-pasillo E2', 'node-51', 'node-50', 'node-41', 'node-42', 'node-43'] },
  { id: 'node-pasillo E4', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 273, y: 326, connections: ['node-pasillo E5', 'node-pasillo E3', 'node-49', 'node-46'] },
  { id: 'node-pasillo E5', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 309, y: 326, connections: ['node-plaza Central', 'node-pasillo E4', 'node-48', 'node-47'] },
  { id: 'node-pasillo G3', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 456, y: 330, connections: ['node-pasillo G4', 'node-pasillo G2', 'node-130', 'node-136', 'node-131', 'node-135'] },
  { id: 'node-pasillo G4', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 495, y: 330, connections: ['node-pasillo G5', 'node-pasillo G3', 'node-132', 'node-134'] },
  { id: 'node-pasillo G5', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 527, y: 329, connections: ['node-plaza musica', 'node-pasillo G4', 'node-133', 'node-151', 'node-150'] },
  { id: 'node-pasillo A3', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 543, y: 258, connections: ['node-pasillo A4', 'node-pasillo A2', 'node-153', 'node-147'] },
  { id: 'node-pasillo A4', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 526, y: 238, connections: ['node-pasillo A5', 'node-pasillo A3', 'node-152', 'node-94'] },
  { id: 'node-pasillo A5', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 505, y: 217, connections: ['node-plaza  el Arte', 'node-pasillo A4', 'node-95', 'node-96', 'node-93', 'node-97'] },
  { id: 'node-entrada A2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 618, y: 314, connections: ['node-entrada A1', 'node-plaza musica', 'node-146', 'node-145'] },
  { id: 'node-pasillo D2', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 82, y: 383, connections: ['node-62', 'node-61', 'node-60', 'node-59', 'node-58', 'node-63', 'node-64', 'node-65', 'node-pasillo D1'] },
  { id: 'node-37-victoria secret', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 154, y: 332, connections: ['node-pasillo E1'] },
  { id: 'node-38-bhype', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 185, y: 331, connections: ['node-pasillo E1'] },
  { id: 'node-39-bunny', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 199, y: 332, connections: ['node-pasillo E2'] },
  { id: 'node-40-aishop', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 216, y: 332, connections: ['node-pasillo E2'] },
  { id: 'node-41', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 231, y: 332, connections: ['node-pasillo E3'] },
  { id: 'node-42', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 244, y: 333, connections: ['node-pasillo E3'] },
  { id: 'node-43', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 255, y: 333, connections: ['node-pasillo E3'] },
  { id: 'node-44', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 268, y: 333, connections: ['node-pasillo E3'] },
  { id: 'node-46', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 282, y: 333, connections: ['node-pasillo E4'] },
  { id: 'node-47', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 298, y: 333, connections: ['node-pasillo E5'] },
  { id: 'node-48', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 294, y: 315, connections: ['node-pasillo E5'] },
  { id: 'node-49', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 262, y: 313, connections: ['node-pasillo E4'] },
  { id: 'node-50', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 244, y: 311, connections: ['node-pasillo E3'] },
  { id: 'node-51', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 226, y: 312, connections: ['node-pasillo E3'] },
  { id: 'node-52', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 196, y: 313, connections: ['node-pasillo E2'] },
  { id: 'node-53', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 172, y: 312, connections: ['node-pasillo E1'] },
  { id: 'node-54', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 149, y: 313, connections: ['node-pasillo E1'] },
  { id: 'node-55', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 127, y: 353, connections: ['node-plaza Jardin'] },
  { id: 'node-56', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 112, y: 359, connections: ['node-plaza Jardin'] },
  { id: 'node-57', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 99, y: 357, connections: ['node-pasillo D1'] },
  { id: 'node-58', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 99, y: 376, connections: ['node-pasillo D2'] },
  { id: 'node-59', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 98, y: 390, connections: ['node-pasillo D2'] },
  { id: 'node-60', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 108, y: 405, connections: ['node-pasillo D2'] },
  { id: 'node-61', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 90, y: 405, connections: ['node-pasillo D2'] },
  { id: 'node-62', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 77, y: 405, connections: ['node-pasillo D2'] },
  { id: 'node-63', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 65, y: 399, connections: ['node-pasillo D2'] },
  { id: 'node-64', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 69, y: 387, connections: ['node-pasillo D2'] },
  { id: 'node-65', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 66, y: 372, connections: ['node-pasillo D2'] },
  { id: 'node-66', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 72, y: 358, connections: ['node-pasillo D1'] },
  { id: 'node-67', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 75, y: 344, connections: ['node-pasillo D1'] },
  { id: 'node-68', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 80, y: 328, connections: ['node-plaza Jardin'] },
  { id: 'node-69', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 80, y: 315, connections: ['node-plaza Jardin'] },
  { id: 'node-70', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 87, y: 303, connections: ['node-plaza Jardin'] },
  { id: 'node-71', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 96, y: 295, connections: ['node-plaza Jardin'] },
  { id: 'node-72', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 114, y: 285, connections: ['node-plaza Jardin'] },
  { id: 'node-73', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 130, y: 253, connections: ['node-pasillo C3'] },
  { id: 'node-74', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 149, y: 234, connections: ['node-pasillo C2'] },
  { id: 'node-75', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 169, y: 211, connections: ['node-pasillo C1'] },
  { id: 'node-76', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 189, y: 195, connections: ['node-plaza la Fuente'] },
  { id: 'node-77', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 215, y: 155, connections: ['node-plaza la Fuente'] },
  { id: 'node-78', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 232, y: 154, connections: ['node-plaza la Fuente'] },
  { id: 'node-79', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 260, y: 166, connections: ['node-pasillo B5'] },
  { id: 'node-80', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 286, y: 150, connections: ['node-pasillo B4'] },
  { id: 'node-81', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 298, y: 146, connections: ['node-pasillo B4'] },
  { id: 'node-82', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 312, y: 145, connections: ['node-pasillo B4'] },
  { id: 'node-83', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 329, y: 141, connections: ['node-pasillo B3'] },
  { id: 'node-84', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 347, y: 137, connections: ['node-pasillo B3'] },
  { id: 'node-85', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 365, y: 138, connections: ['node-pasillo B3'] },
  { id: 'node-86', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 382, y: 141, connections: ['node-pasillo B2'] },
  { id: 'node-87', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 399, y: 148, connections: ['node-pasillo B2'] },
  { id: 'node-88', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 416, y: 152, connections: ['node-pasillo B1'] },
  { id: 'node-89', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 443, y: 160, connections: ['node-plaza  el Arte'] },
  { id: 'node-90', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 471, y: 157, connections: ['node-plaza  el Arte'] },
  { id: 'node-91', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 490, y: 164, connections: ['node-plaza  el Arte'] },
  { id: 'node-92', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 502, y: 177, connections: ['node-plaza  el Arte'] },
  { id: 'node-93', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 506, y: 200, connections: ['node-pasillo A5'] },
  { id: 'node-94', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 517, y: 245, connections: ['node-pasillo A4'] },
  { id: 'node-95', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 500, y: 228, connections: ['node-pasillo A5'] },
  { id: 'node-96', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 488, y: 220, connections: ['node-pasillo A5'] },
  { id: 'node-97', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 462, y: 224, connections: ['node-pasillo F2', 'node-pasillo A5'] },
  { id: 'node-98', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 455, y: 234, connections: ['node-pasillo F2'] },
  { id: 'node-99', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 444, y: 243, connections: ['node-pasillo F2'] },
  { id: 'node-100', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 436, y: 254, connections: ['node-pasillo F2'] },
  { id: 'node-101', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 428, y: 267, connections: ['node-pasillo F1'] },
  { id: 'node-102', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 415, y: 278, connections: ['node-pasillo F1'] },
  { id: 'node-103', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 406, y: 289, connections: ['node-pasillo F1'] },
  { id: 'node-104', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 397, y: 300, connections: ['node-pasillo F1'] },
  { id: 'node-105', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 382, y: 279, connections: ['node-pasillo F1'] },
  { id: 'node-106', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 399, y: 266, connections: ['node-pasillo F1'] },
  { id: 'node-107', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 411, y: 251, connections: ['node-pasillo F1'] },
  { id: 'node-108', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 420, y: 238, connections: ['node-pasillo F2'] },
  { id: 'node-109', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 428, y: 228, connections: ['node-pasillo F2'] },
  { id: 'node-110', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 437, y: 219, connections: ['node-pasillo F2'] },
  { id: 'node-111', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 432, y: 186, connections: ['node-pasillo B1'] },
  { id: 'node-112', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 414, y: 181, connections: ['node-pasillo B1'] },
  { id: 'node-113', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 395, y: 175, connections: ['node-pasillo B2'] },
  { id: 'node-114', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 380, y: 176, connections: ['node-pasillo B2'] },
  { id: 'node-115', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 369, y: 176, connections: ['node-pasillo B3'] },
  { id: 'node-116', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 354, y: 175, connections: ['node-pasillo B3'] },
  { id: 'node-117', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 340, y: 176, connections: ['node-pasillo B3'] },
  { id: 'node-118', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 322, y: 170, connections: ['node-pasillo B3'] },
  { id: 'node-119', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 303, y: 174, connections: ['node-pasillo B4'] },
  { id: 'node-120', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 282, y: 178, connections: ['node-pasillo B4'] },
  { id: 'node-121', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 260, y: 183, connections: ['node-pasillo B5'] },
  { id: 'node-122', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 248, y: 208, connections: ['node-plaza la Fuente'] },
  { id: 'node-123', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 229, y: 220, connections: ['node-plaza la Fuente'] },
  { id: 'node-124', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 203, y: 214, connections: ['node-plaza la Fuente'] },
  { id: 'node-125', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 189, y: 221, connections: ['node-pasillo C1'] },
  { id: 'node-126', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 179, y: 233, connections: ['node-pasillo C1'] },
  { id: 'node-127', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 162, y: 252, connections: ['node-pasillo C2'] },
  { id: 'node-128', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 150, y: 265, connections: ['node-pasillo C3'] },
  { id: 'node-129', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 422, y: 317, connections: ['node-pasillo G2'] },
  { id: 'node-130', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 439, y: 315, connections: ['node-pasillo G3', 'node-pasillo G2'] },
  { id: 'node-131', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 464, y: 318, connections: ['node-pasillo G3'] },
  { id: 'node-132', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 499, y: 317, connections: ['node-pasillo G4'] },
  { id: 'node-133', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 516, y: 317, connections: ['node-pasillo G5'] },
  { id: 'node-134', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 509, y: 340, connections: ['node-pasillo G4'] },
  { id: 'node-135', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 475, y: 340, connections: ['node-pasillo G3'] },
  { id: 'node-136', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 450, y: 334, connections: ['node-pasillo G3'] },
  { id: 'node-137', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 427, y: 339, connections: ['node-pasillo G2'] },
  { id: 'node-138', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 406, y: 338, connections: ['node-pasillo G1'] },
  { id: 'node-139', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 375, y: 358, connections: ['node-plaza Central'] },
  { id: 'node-140', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 354, y: 363, connections: ['node-plaza Central'] },
  { id: 'node-141', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 332, y: 349, connections: ['node-plaza Central'] },
  { id: 'node-142', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 331, y: 294, connections: ['node-plaza Central'] },
  { id: 'node-143', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 352, y: 283, connections: ['node-plaza Central'] },
  { id: 'node-144', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 367, y: 282, connections: ['node-plaza Central'] },
  { id: 'node-145', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 631, y: 296, connections: ['node-entrada A1', 'node-entrada A2'] },
  { id: 'node-146', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 618, y: 326, connections: ['node-plaza musica', 'node-entrada A2'] },
  { id: 'node-147', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 528, y: 257, connections: ['node-pasillo A3'] },
  { id: 'node-148', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 540, y: 273, connections: ['node-pasillo A2'] },
  { id: 'node-149', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 552, y: 294, connections: ['node-pasillo A1'] },
  { id: 'node-150', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 542, y: 318, connections: ['node-pasillo G5'] },
  { id: 'node-151', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 527, y: 319, connections: ['node-pasillo G5'] },
  { id: 'node-152', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 520, y: 214, connections: ['node-pasillo A4'] },
  { id: 'node-153', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 548, y: 245, connections: ['node-pasillo A3'] },
  { id: 'node-154', floorId: LEVEL_AUTOPISTA, kind: 'door', x: 570, y: 292, connections: ['node-pasillo A1'] },
  { id: 'node-pasillo-baño-B', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 175, y: 360, connections: ['node-pasillo E1', 'node-Baño B'] },
  { id: 'node-pasillo-baño A', floorId: LEVEL_AUTOPISTA, kind: 'corridor', x: 280, y: 145, connections: ['node-pasillo B5', 'node-baño A'] }
];
