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
  bano_a: 'local_118',
  bano_b: 'local_117',
};

export const propsSambilAutopista: MapProp[] = [
  {
    "id": "v-pj-1",
    "kind": "stairs",
    "rect": {
      "x": 72,
      "y": 250,
      "w": 14,
      "h": 14
    }
  },
  {
    "id": "v-plf-1",
    "kind": "stairs",
    "rect": {
      "x": 180,
      "y": 73,
      "w": 14,
      "h": 14
    }
  },
  {
    "id": "v-pc-1",
    "kind": "stairs",
    "rect": {
      "x": 350,
      "y": 250,
      "w": 14,
      "h": 14
    }
  },
  {
    "id": "v-pea-1",
    "kind": "stairs",
    "rect": {
      "x": 530,
      "y": 73,
      "w": 14,
      "h": 14
    }
  },
  {
    "id": "v-plm-1",
    "kind": "stairs",
    "rect": {
      "x": 584,
      "y": 250,
      "w": 14,
      "h": 14
    }
  }
];

export const storesSambilAutopista: MapStore[] = [
  {
    "id": "local_1",
    "name": "Liah Spa",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 34,
    "y": 397,
    "w": 36,
    "h": 21,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 35,
        "y": 397
      },
      {
        "x": 50,
        "y": 397
      },
      {
        "x": 64,
        "y": 397
      },
      {
        "x": 70,
        "y": 404
      },
      {
        "x": 67,
        "y": 404
      },
      {
        "x": 67,
        "y": 418
      },
      {
        "x": 34,
        "y": 418
      }
    ],
    "labelPos": {
      "x": 55,
      "y": 405
    }
  },
  {
    "id": "local_2",
    "name": "no legible 1",
    "category": "services",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 67,
    "y": 404,
    "w": 15,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 67,
        "y": 404
      },
      {
        "x": 82,
        "y": 404
      },
      {
        "x": 82,
        "y": 418
      },
      {
        "x": 67,
        "y": 418
      }
    ],
    "labelPos": {
      "x": 75,
      "y": 411
    }
  },
  {
    "id": "local_3",
    "name": "no legible 2",
    "category": "food",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 82,
    "y": 404,
    "w": 15,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 82,
        "y": 418
      },
      {
        "x": 97,
        "y": 418
      },
      {
        "x": 97,
        "y": 405
      },
      {
        "x": 82,
        "y": 404
      }
    ],
    "labelPos": {
      "x": 90,
      "y": 411
    }
  },
  {
    "id": "local_4",
    "name": "Tiendas Tijerazo",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 59,
    "y": 70,
    "w": 141,
    "h": 131,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 64,
        "y": 70
      },
      {
        "x": 155,
        "y": 70
      },
      {
        "x": 155,
        "y": 120
      },
      {
        "x": 200,
        "y": 165
      },
      {
        "x": 192,
        "y": 175
      },
      {
        "x": 190,
        "y": 182
      },
      {
        "x": 191,
        "y": 194
      },
      {
        "x": 183,
        "y": 201
      },
      {
        "x": 126,
        "y": 144
      },
      {
        "x": 59,
        "y": 142
      }
    ],
    "labelPos": {
      "x": 152,
      "y": 146
    }
  },
  {
    "id": "local_5",
    "name": "Macuto",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 155,
    "y": 71,
    "w": 82,
    "h": 94,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 155,
        "y": 71
      },
      {
        "x": 237,
        "y": 72
      },
      {
        "x": 237,
        "y": 110
      },
      {
        "x": 223,
        "y": 110
      },
      {
        "x": 223,
        "y": 155
      },
      {
        "x": 210,
        "y": 157
      },
      {
        "x": 200,
        "y": 165
      },
      {
        "x": 155,
        "y": 120
      }
    ],
    "labelPos": {
      "x": 205,
      "y": 120
    }
  },
  {
    "id": "local_6",
    "name": "LC Waikiki",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 55,
    "y": 142,
    "w": 128,
    "h": 80,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 59,
        "y": 142
      },
      {
        "x": 55,
        "y": 196
      },
      {
        "x": 136,
        "y": 197
      },
      {
        "x": 159,
        "y": 222
      },
      {
        "x": 183,
        "y": 201
      },
      {
        "x": 126,
        "y": 144
      }
    ],
    "labelPos": {
      "x": 120,
      "y": 184
    }
  },
  {
    "id": "local_7",
    "name": "Hollywood Star",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 223,
    "y": 110,
    "w": 14,
    "h": 49,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 223,
        "y": 110
      },
      {
        "x": 237,
        "y": 110
      },
      {
        "x": 237,
        "y": 159
      },
      {
        "x": 232,
        "y": 157
      },
      {
        "x": 228,
        "y": 156
      },
      {
        "x": 223,
        "y": 155
      }
    ],
    "labelPos": {
      "x": 230,
      "y": 141
    }
  },
  {
    "id": "local_8",
    "name": "Palacio del Blumer",
    "category": "beauty",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 103,
    "y": 204,
    "w": 51,
    "h": 38,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 103,
        "y": 204
      },
      {
        "x": 131,
        "y": 204
      },
      {
        "x": 154,
        "y": 228
      },
      {
        "x": 150,
        "y": 232
      },
      {
        "x": 146,
        "y": 237
      },
      {
        "x": 142,
        "y": 242
      },
      {
        "x": 140,
        "y": 240
      }
    ],
    "labelPos": {
      "x": 138,
      "y": 227
    }
  },
  {
    "id": "local_9",
    "name": "Bath & Body Works",
    "category": "beauty",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 60,
    "y": 203,
    "w": 82,
    "h": 71,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 121,
        "y": 274
      },
      {
        "x": 65,
        "y": 216
      },
      {
        "x": 60,
        "y": 216
      },
      {
        "x": 61,
        "y": 203
      },
      {
        "x": 103,
        "y": 204
      },
      {
        "x": 142,
        "y": 242
      },
      {
        "x": 133,
        "y": 254
      },
      {
        "x": 127,
        "y": 263
      }
    ],
    "labelPos": {
      "x": 102,
      "y": 234
    }
  },
  {
    "id": "local_10",
    "name": "Sansa",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 35,
    "y": 378,
    "w": 36,
    "h": 19,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 35,
        "y": 397
      },
      {
        "x": 37,
        "y": 378
      },
      {
        "x": 62,
        "y": 379
      },
      {
        "x": 71,
        "y": 388
      },
      {
        "x": 64,
        "y": 397
      }
    ],
    "labelPos": {
      "x": 54,
      "y": 388
    }
  },
  {
    "id": "local_11",
    "name": "Romano",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 37,
    "y": 363,
    "w": 33,
    "h": 17,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 70,
        "y": 372
      },
      {
        "x": 63,
        "y": 380
      },
      {
        "x": 62,
        "y": 379
      },
      {
        "x": 37,
        "y": 378
      },
      {
        "x": 39,
        "y": 363
      },
      {
        "x": 62,
        "y": 363
      }
    ],
    "labelPos": {
      "x": 56,
      "y": 373
    }
  },
  {
    "id": "local_12",
    "name": "Sandro",
    "category": "beauty",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 39,
    "y": 351,
    "w": 38,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 64,
        "y": 365
      },
      {
        "x": 62,
        "y": 363
      },
      {
        "x": 39,
        "y": 363
      },
      {
        "x": 40,
        "y": 351
      },
      {
        "x": 73,
        "y": 351
      },
      {
        "x": 77,
        "y": 356
      }
    ],
    "labelPos": {
      "x": 59,
      "y": 358
    }
  },
  {
    "id": "local_13",
    "name": "McCafé",
    "category": "food",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 40,
    "y": 334,
    "w": 42,
    "h": 17,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 40,
        "y": 351
      },
      {
        "x": 42,
        "y": 334
      },
      {
        "x": 78,
        "y": 334
      },
      {
        "x": 82,
        "y": 341
      },
      {
        "x": 73,
        "y": 351
      }
    ],
    "labelPos": {
      "x": 63,
      "y": 342
    }
  },
  {
    "id": "local_14",
    "name": "Pets Planet",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 50,
    "y": 320,
    "w": 34,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 78,
        "y": 334
      },
      {
        "x": 84,
        "y": 332
      },
      {
        "x": 82,
        "y": 326
      },
      {
        "x": 82,
        "y": 320
      },
      {
        "x": 51,
        "y": 320
      },
      {
        "x": 50,
        "y": 334
      }
    ],
    "labelPos": {
      "x": 71,
      "y": 328
    }
  },
  {
    "id": "local_15",
    "name": "Pit Body Care",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 51,
    "y": 306,
    "w": 33,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 80,
        "y": 307
      },
      {
        "x": 84,
        "y": 309
      },
      {
        "x": 83,
        "y": 311
      },
      {
        "x": 82,
        "y": 316
      },
      {
        "x": 82,
        "y": 320
      },
      {
        "x": 51,
        "y": 320
      },
      {
        "x": 52,
        "y": 306
      }
    ],
    "labelPos": {
      "x": 73,
      "y": 313
    }
  },
  {
    "id": "local_16",
    "name": "Big Shoes",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 52,
    "y": 266,
    "w": 38,
    "h": 43,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 87,
        "y": 304
      },
      {
        "x": 84,
        "y": 309
      },
      {
        "x": 80,
        "y": 307
      },
      {
        "x": 52,
        "y": 306
      },
      {
        "x": 56,
        "y": 266
      },
      {
        "x": 59,
        "y": 266
      },
      {
        "x": 90,
        "y": 301
      }
    ],
    "labelPos": {
      "x": 73,
      "y": 294
    }
  },
  {
    "id": "local_17",
    "name": "Estivaneli",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 56,
    "y": 242,
    "w": 45,
    "h": 59,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 96,
        "y": 298
      },
      {
        "x": 91,
        "y": 301
      },
      {
        "x": 59,
        "y": 266
      },
      {
        "x": 56,
        "y": 266
      },
      {
        "x": 58,
        "y": 242
      },
      {
        "x": 62,
        "y": 242
      },
      {
        "x": 98,
        "y": 280
      },
      {
        "x": 101,
        "y": 295
      }
    ],
    "labelPos": {
      "x": 78,
      "y": 274
    }
  },
  {
    "id": "local_18",
    "name": "Banco del Tesoro",
    "category": "services",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 58,
    "y": 216,
    "w": 63,
    "h": 79,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 109,
        "y": 292
      },
      {
        "x": 105,
        "y": 293
      },
      {
        "x": 101,
        "y": 295
      },
      {
        "x": 98,
        "y": 280
      },
      {
        "x": 62,
        "y": 242
      },
      {
        "x": 58,
        "y": 242
      },
      {
        "x": 60,
        "y": 216
      },
      {
        "x": 65,
        "y": 216
      },
      {
        "x": 121,
        "y": 274
      },
      {
        "x": 112,
        "y": 292
      }
    ],
    "labelPos": {
      "x": 89,
      "y": 264
    }
  },
  {
    "id": "local_19",
    "name": "Holic Shop",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 104,
    "y": 398,
    "w": 16,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 104,
        "y": 398
      },
      {
        "x": 120,
        "y": 398
      },
      {
        "x": 120,
        "y": 412
      },
      {
        "x": 104,
        "y": 412
      }
    ],
    "labelPos": {
      "x": 112,
      "y": 405
    }
  },
  {
    "id": "local_20",
    "name": "Jesus Morales",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 94,
    "y": 379,
    "w": 26,
    "h": 19,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 120,
        "y": 398
      },
      {
        "x": 120,
        "y": 379
      },
      {
        "x": 101,
        "y": 379
      },
      {
        "x": 94,
        "y": 388
      },
      {
        "x": 104,
        "y": 398
      }
    ],
    "labelPos": {
      "x": 108,
      "y": 388
    }
  },
  {
    "id": "local_21",
    "name": "Piedy",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 95,
    "y": 366,
    "w": 25,
    "h": 13,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 120,
        "y": 379
      },
      {
        "x": 101,
        "y": 379
      },
      {
        "x": 95,
        "y": 373
      },
      {
        "x": 102,
        "y": 366
      },
      {
        "x": 120,
        "y": 366
      }
    ],
    "labelPos": {
      "x": 108,
      "y": 373
    }
  },
  {
    "id": "local_22",
    "name": "Victoria's Secret",
    "category": "beauty",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 94,
    "y": 354,
    "w": 12,
    "h": 14,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 106,
        "y": 356
      },
      {
        "x": 102,
        "y": 354
      },
      {
        "x": 94,
        "y": 362
      },
      {
        "x": 100,
        "y": 368
      },
      {
        "x": 102,
        "y": 366
      },
      {
        "x": 106,
        "y": 366
      }
    ],
    "labelPos": {
      "x": 102,
      "y": 362
    }
  },
  {
    "id": "local_23",
    "name": "Local 23",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 106,
    "y": 356,
    "w": 6,
    "h": 6,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 106,
        "y": 362
      },
      {
        "x": 106,
        "y": 356
      },
      {
        "x": 112,
        "y": 356
      },
      {
        "x": 112,
        "y": 362
      }
    ],
    "labelPos": {
      "x": 109,
      "y": 359
    }
  },
  {
    "id": "local_23_copia",
    "name": "Local 23 (copia)",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 112,
    "y": 355,
    "w": 8,
    "h": 7,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 112,
        "y": 362
      },
      {
        "x": 112,
        "y": 356
      },
      {
        "x": 119,
        "y": 355
      },
      {
        "x": 120,
        "y": 362
      }
    ],
    "labelPos": {
      "x": 116,
      "y": 359
    }
  },
  {
    "id": "local_25",
    "name": "Holic Shop",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 119,
    "y": 346,
    "w": 14,
    "h": 66,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 133,
        "y": 346
      },
      {
        "x": 130,
        "y": 349
      },
      {
        "x": 127,
        "y": 351
      },
      {
        "x": 124,
        "y": 353
      },
      {
        "x": 119,
        "y": 355
      },
      {
        "x": 120,
        "y": 360
      },
      {
        "x": 120,
        "y": 379
      },
      {
        "x": 120,
        "y": 412
      },
      {
        "x": 132,
        "y": 412
      }
    ],
    "labelPos": {
      "x": 125,
      "y": 369
    }
  },
  {
    "id": "local_26",
    "name": "Victoria's Secret",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 130,
    "y": 332,
    "w": 43,
    "h": 81,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 173,
        "y": 333
      },
      {
        "x": 172,
        "y": 388
      },
      {
        "x": 163,
        "y": 388
      },
      {
        "x": 163,
        "y": 402
      },
      {
        "x": 172,
        "y": 402
      },
      {
        "x": 172,
        "y": 413
      },
      {
        "x": 132,
        "y": 412
      },
      {
        "x": 133,
        "y": 346
      },
      {
        "x": 130,
        "y": 342
      },
      {
        "x": 134,
        "y": 339
      },
      {
        "x": 137,
        "y": 335
      },
      {
        "x": 137,
        "y": 332
      }
    ],
    "labelPos": {
      "x": 152,
      "y": 369
    }
  },
  {
    "id": "local_27",
    "name": "Bhype",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 178,
    "y": 333,
    "w": 14,
    "h": 52,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 179,
        "y": 333
      },
      {
        "x": 178,
        "y": 384
      },
      {
        "x": 191,
        "y": 385
      },
      {
        "x": 192,
        "y": 333
      }
    ],
    "labelPos": {
      "x": 185,
      "y": 359
    }
  },
  {
    "id": "local_28",
    "name": "Psyco Bunny",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 191,
    "y": 333,
    "w": 16,
    "h": 69,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 192,
        "y": 333
      },
      {
        "x": 191,
        "y": 385
      },
      {
        "x": 198,
        "y": 385
      },
      {
        "x": 198,
        "y": 402
      },
      {
        "x": 206,
        "y": 402
      },
      {
        "x": 207,
        "y": 333
      }
    ],
    "labelPos": {
      "x": 199,
      "y": 373
    }
  },
  {
    "id": "local_29",
    "name": "Aishop",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 206,
    "y": 333,
    "w": 27,
    "h": 69,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 224,
        "y": 333
      },
      {
        "x": 224,
        "y": 374
      },
      {
        "x": 233,
        "y": 374
      },
      {
        "x": 232,
        "y": 402
      },
      {
        "x": 206,
        "y": 402
      },
      {
        "x": 207,
        "y": 333
      }
    ],
    "labelPos": {
      "x": 221,
      "y": 370
    }
  },
  {
    "id": "local_30",
    "name": "Jadu Cosmetics",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 224,
    "y": 333,
    "w": 19,
    "h": 41,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 224,
        "y": 333
      },
      {
        "x": 224,
        "y": 374
      },
      {
        "x": 243,
        "y": 374
      },
      {
        "x": 243,
        "y": 360
      },
      {
        "x": 239,
        "y": 360
      },
      {
        "x": 239,
        "y": 333
      }
    ],
    "labelPos": {
      "x": 235,
      "y": 356
    }
  },
  {
    "id": "local_31",
    "name": "XC2",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 232,
    "y": 334,
    "w": 28,
    "h": 68,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 249,
        "y": 360
      },
      {
        "x": 243,
        "y": 360
      },
      {
        "x": 243,
        "y": 374
      },
      {
        "x": 233,
        "y": 374
      },
      {
        "x": 232,
        "y": 402
      },
      {
        "x": 260,
        "y": 402
      },
      {
        "x": 260,
        "y": 334
      },
      {
        "x": 249,
        "y": 334
      }
    ],
    "labelPos": {
      "x": 246,
      "y": 368
    }
  },
  {
    "id": "local_32",
    "name": "Skechers",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 260,
    "y": 334,
    "w": 15,
    "h": 68,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 267,
        "y": 402
      },
      {
        "x": 260,
        "y": 402
      },
      {
        "x": 260,
        "y": 334
      },
      {
        "x": 275,
        "y": 334
      },
      {
        "x": 274,
        "y": 383
      },
      {
        "x": 267,
        "y": 383
      }
    ],
    "labelPos": {
      "x": 267,
      "y": 373
    }
  },
  {
    "id": "local_33",
    "name": "Libby Lu",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 274,
    "y": 334,
    "w": 15,
    "h": 49,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 274,
        "y": 383
      },
      {
        "x": 288,
        "y": 383
      },
      {
        "x": 289,
        "y": 334
      },
      {
        "x": 275,
        "y": 334
      }
    ],
    "labelPos": {
      "x": 282,
      "y": 359
    }
  },
  {
    "id": "local_34",
    "name": "USA Jeans Wear",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 282,
    "y": 334,
    "w": 28,
    "h": 70,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 289,
        "y": 334
      },
      {
        "x": 288,
        "y": 395
      },
      {
        "x": 282,
        "y": 395
      },
      {
        "x": 282,
        "y": 404
      },
      {
        "x": 309,
        "y": 404
      },
      {
        "x": 310,
        "y": 334
      }
    ],
    "labelPos": {
      "x": 293,
      "y": 378
    }
  },
  {
    "id": "local_35",
    "name": "Reinaldo Sport",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 315,
    "y": 334,
    "w": 31,
    "h": 71,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 322,
        "y": 334
      },
      {
        "x": 316,
        "y": 334
      },
      {
        "x": 315,
        "y": 405
      },
      {
        "x": 343,
        "y": 405
      },
      {
        "x": 344,
        "y": 365
      },
      {
        "x": 346,
        "y": 361
      },
      {
        "x": 322,
        "y": 337
      }
    ],
    "labelPos": {
      "x": 330,
      "y": 363
    }
  },
  {
    "id": "local_36",
    "name": "Juventus",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 343,
    "y": 361,
    "w": 26,
    "h": 44,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 344,
        "y": 365
      },
      {
        "x": 346,
        "y": 361
      },
      {
        "x": 367,
        "y": 361
      },
      {
        "x": 369,
        "y": 366
      },
      {
        "x": 368,
        "y": 397
      },
      {
        "x": 364,
        "y": 397
      },
      {
        "x": 364,
        "y": 405
      },
      {
        "x": 343,
        "y": 405
      }
    ],
    "labelPos": {
      "x": 358,
      "y": 382
    }
  },
  {
    "id": "local_37",
    "name": "Jadu Cosmetics",
    "category": "beauty",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 364,
    "y": 350,
    "w": 20,
    "h": 55,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 383,
        "y": 405
      },
      {
        "x": 364,
        "y": 405
      },
      {
        "x": 364,
        "y": 397
      },
      {
        "x": 368,
        "y": 397
      },
      {
        "x": 369,
        "y": 366
      },
      {
        "x": 367,
        "y": 361
      },
      {
        "x": 373,
        "y": 355
      },
      {
        "x": 379,
        "y": 350
      },
      {
        "x": 384,
        "y": 354
      }
    ],
    "labelPos": {
      "x": 372,
      "y": 377
    }
  },
  {
    "id": "local_38",
    "name": "Sport Market",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 379,
    "y": 335,
    "w": 46,
    "h": 84,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 424,
        "y": 419
      },
      {
        "x": 404,
        "y": 419
      },
      {
        "x": 404,
        "y": 405
      },
      {
        "x": 383,
        "y": 405
      },
      {
        "x": 384,
        "y": 354
      },
      {
        "x": 379,
        "y": 350
      },
      {
        "x": 390,
        "y": 339
      },
      {
        "x": 390,
        "y": 335
      },
      {
        "x": 415,
        "y": 336
      },
      {
        "x": 415,
        "y": 373
      },
      {
        "x": 425,
        "y": 373
      }
    ],
    "labelPos": {
      "x": 401,
      "y": 373
    }
  },
  {
    "id": "local_39",
    "name": "Al Giorno",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 415,
    "y": 336,
    "w": 19,
    "h": 37,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 415,
        "y": 336
      },
      {
        "x": 415,
        "y": 373
      },
      {
        "x": 434,
        "y": 373
      },
      {
        "x": 434,
        "y": 337
      }
    ],
    "labelPos": {
      "x": 425,
      "y": 355
    }
  },
  {
    "id": "local_40",
    "name": "Farmatodo",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 424,
    "y": 337,
    "w": 56,
    "h": 84,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 434,
        "y": 337
      },
      {
        "x": 434,
        "y": 373
      },
      {
        "x": 425,
        "y": 373
      },
      {
        "x": 424,
        "y": 419
      },
      {
        "x": 479,
        "y": 421
      },
      {
        "x": 480,
        "y": 413
      },
      {
        "x": 463,
        "y": 413
      },
      {
        "x": 463,
        "y": 408
      },
      {
        "x": 458,
        "y": 408
      },
      {
        "x": 458,
        "y": 402
      },
      {
        "x": 466,
        "y": 402
      },
      {
        "x": 466,
        "y": 338
      }
    ],
    "labelPos": {
      "x": 454,
      "y": 392
    }
  },
  {
    "id": "local_41",
    "name": "Make Waves",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 466,
    "y": 338,
    "w": 13,
    "h": 61,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 466,
        "y": 338
      },
      {
        "x": 466,
        "y": 399
      },
      {
        "x": 479,
        "y": 399
      },
      {
        "x": 479,
        "y": 338
      }
    ],
    "labelPos": {
      "x": 473,
      "y": 369
    }
  },
  {
    "id": "local_42",
    "name": "Pull&Bear",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 486,
    "y": 338,
    "w": 67,
    "h": 84,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 486,
        "y": 338
      },
      {
        "x": 488,
        "y": 342
      },
      {
        "x": 486,
        "y": 421
      },
      {
        "x": 548,
        "y": 422
      },
      {
        "x": 549,
        "y": 357
      },
      {
        "x": 553,
        "y": 353
      },
      {
        "x": 548,
        "y": 349
      },
      {
        "x": 545,
        "y": 344
      },
      {
        "x": 544,
        "y": 339
      }
    ],
    "labelPos": {
      "x": 527,
      "y": 363
    }
  },
  {
    "id": "local_43",
    "name": "Cines Unidos",
    "category": "entertainment",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 562,
    "y": 316,
    "w": 157,
    "h": 104,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 610,
        "y": 330
      },
      {
        "x": 647,
        "y": 316
      },
      {
        "x": 648,
        "y": 320
      },
      {
        "x": 652,
        "y": 319
      },
      {
        "x": 659,
        "y": 345
      },
      {
        "x": 719,
        "y": 347
      },
      {
        "x": 718,
        "y": 410
      },
      {
        "x": 644,
        "y": 409
      },
      {
        "x": 644,
        "y": 420
      },
      {
        "x": 569,
        "y": 418
      },
      {
        "x": 569,
        "y": 415
      },
      {
        "x": 562,
        "y": 415
      },
      {
        "x": 564,
        "y": 361
      },
      {
        "x": 571,
        "y": 363
      },
      {
        "x": 578,
        "y": 364
      },
      {
        "x": 587,
        "y": 363
      },
      {
        "x": 594,
        "y": 360
      },
      {
        "x": 601,
        "y": 354
      },
      {
        "x": 606,
        "y": 347
      },
      {
        "x": 609,
        "y": 341
      }
    ],
    "labelPos": {
      "x": 618,
      "y": 366
    }
  },
  {
    "id": "local_44",
    "name": "Calzedonia",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 532,
    "y": 303,
    "w": 25,
    "h": 16,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 557,
        "y": 303
      },
      {
        "x": 532,
        "y": 303
      },
      {
        "x": 532,
        "y": 319
      },
      {
        "x": 544,
        "y": 319
      },
      {
        "x": 546,
        "y": 314
      },
      {
        "x": 550,
        "y": 309
      }
    ],
    "labelPos": {
      "x": 544,
      "y": 311
    }
  },
  {
    "id": "local_45",
    "name": "ORO Today",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 522,
    "y": 295,
    "w": 10,
    "h": 24,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 532,
        "y": 319
      },
      {
        "x": 532,
        "y": 295
      },
      {
        "x": 522,
        "y": 295
      },
      {
        "x": 522,
        "y": 319
      }
    ],
    "labelPos": {
      "x": 527,
      "y": 307
    }
  },
  {
    "id": "local_46",
    "name": "Ross ",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 507,
    "y": 295,
    "w": 15,
    "h": 24,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 522,
        "y": 319
      },
      {
        "x": 522,
        "y": 295
      },
      {
        "x": 507,
        "y": 295
      },
      {
        "x": 507,
        "y": 319
      }
    ],
    "labelPos": {
      "x": 515,
      "y": 307
    }
  },
  {
    "id": "local_47",
    "name": "Mario Hernandez",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 487,
    "y": 283,
    "w": 20,
    "h": 36,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 504,
        "y": 295
      },
      {
        "x": 507,
        "y": 295
      },
      {
        "x": 507,
        "y": 319
      },
      {
        "x": 487,
        "y": 319
      },
      {
        "x": 487,
        "y": 291
      },
      {
        "x": 495,
        "y": 283
      }
    ],
    "labelPos": {
      "x": 498,
      "y": 300
    }
  },
  {
    "id": "local_48",
    "name": "Crocs",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 537,
    "y": 280,
    "w": 20,
    "h": 23,
    "doorNodeId": "door-local_48",
    "polygon": [
      {
        "x": 557,
        "y": 303
      },
      {
        "x": 553,
        "y": 295
      },
      {
        "x": 548,
        "y": 286
      },
      {
        "x": 545,
        "y": 280
      },
      {
        "x": 537,
        "y": 285
      },
      {
        "x": 537,
        "y": 303
      }
    ],
    "labelPos": {
      "x": 546,
      "y": 292
    }
  },
  {
    "id": "local_49",
    "name": "Joalini",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 508,
    "y": 264,
    "w": 37,
    "h": 25,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 545,
        "y": 280
      },
      {
        "x": 537,
        "y": 285
      },
      {
        "x": 537,
        "y": 289
      },
      {
        "x": 508,
        "y": 288
      },
      {
        "x": 533,
        "y": 264
      },
      {
        "x": 539,
        "y": 272
      }
    ],
    "labelPos": {
      "x": 533,
      "y": 280
    }
  },
  {
    "id": "local_50",
    "name": "Panots",
    "category": "food",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 496,
    "y": 250,
    "w": 37,
    "h": 38,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 533,
        "y": 264
      },
      {
        "x": 523,
        "y": 250
      },
      {
        "x": 496,
        "y": 276
      },
      {
        "x": 508,
        "y": 288
      }
    ],
    "labelPos": {
      "x": 515,
      "y": 270
    }
  },
  {
    "id": "local_51",
    "name": "Brookfield",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 487,
    "y": 240,
    "w": 36,
    "h": 36,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 523,
        "y": 250
      },
      {
        "x": 496,
        "y": 276
      },
      {
        "x": 487,
        "y": 266
      },
      {
        "x": 514,
        "y": 240
      }
    ],
    "labelPos": {
      "x": 505,
      "y": 258
    }
  },
  {
    "id": "local_52",
    "name": "Urban Market",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 481,
    "y": 221,
    "w": 28,
    "h": 41,
    "doorNodeId": "door-local_52",
    "polygon": [
      {
        "x": 509,
        "y": 235
      },
      {
        "x": 494,
        "y": 221
      },
      {
        "x": 482,
        "y": 234
      },
      {
        "x": 481,
        "y": 262
      }
    ],
    "labelPos": {
      "x": 492,
      "y": 238
    }
  },
  {
    "id": "local_53",
    "name": "Gran Vía",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 468,
    "y": 215,
    "w": 26,
    "h": 47,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 494,
        "y": 221
      },
      {
        "x": 482,
        "y": 234
      },
      {
        "x": 481,
        "y": 262
      },
      {
        "x": 468,
        "y": 262
      },
      {
        "x": 469,
        "y": 222
      },
      {
        "x": 475,
        "y": 221
      },
      {
        "x": 480,
        "y": 220
      },
      {
        "x": 484,
        "y": 218
      },
      {
        "x": 488,
        "y": 215
      }
    ],
    "labelPos": {
      "x": 480,
      "y": 231
    }
  },
  {
    "id": "local_54",
    "name": "Line",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 448,
    "y": 221,
    "w": 21,
    "h": 41,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 461,
        "y": 221
      },
      {
        "x": 465,
        "y": 222
      },
      {
        "x": 469,
        "y": 222
      },
      {
        "x": 468,
        "y": 262
      },
      {
        "x": 461,
        "y": 262
      },
      {
        "x": 461,
        "y": 246
      },
      {
        "x": 448,
        "y": 236
      }
    ],
    "labelPos": {
      "x": 462,
      "y": 239
    }
  },
  {
    "id": "local_55",
    "name": "Baccio di Latte",
    "category": "food",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 438,
    "y": 236,
    "w": 23,
    "h": 26,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 448,
        "y": 236
      },
      {
        "x": 461,
        "y": 246
      },
      {
        "x": 461,
        "y": 262
      },
      {
        "x": 449,
        "y": 262
      },
      {
        "x": 449,
        "y": 255
      },
      {
        "x": 438,
        "y": 247
      }
    ],
    "labelPos": {
      "x": 451,
      "y": 251
    }
  },
  {
    "id": "local_56",
    "name": "Opticolor",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 429,
    "y": 247,
    "w": 20,
    "h": 21,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 449,
        "y": 255
      },
      {
        "x": 449,
        "y": 262
      },
      {
        "x": 447,
        "y": 261
      },
      {
        "x": 441,
        "y": 268
      },
      {
        "x": 429,
        "y": 258
      },
      {
        "x": 438,
        "y": 247
      }
    ],
    "labelPos": {
      "x": 442,
      "y": 259
    }
  },
  {
    "id": "local_57",
    "name": "GrachI",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 420,
    "y": 258,
    "w": 21,
    "h": 21,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 429,
        "y": 258
      },
      {
        "x": 441,
        "y": 268
      },
      {
        "x": 432,
        "y": 279
      },
      {
        "x": 420,
        "y": 269
      }
    ],
    "labelPos": {
      "x": 431,
      "y": 269
    }
  },
  {
    "id": "local_58",
    "name": "Tous / Top Ten",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 410,
    "y": 274,
    "w": 18,
    "h": 17,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 416,
        "y": 274
      },
      {
        "x": 428,
        "y": 284
      },
      {
        "x": 422,
        "y": 291
      },
      {
        "x": 410,
        "y": 281
      }
    ],
    "labelPos": {
      "x": 419,
      "y": 283
    }
  },
  {
    "id": "local_59",
    "name": "Calzedonia",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 399,
    "y": 281,
    "w": 23,
    "h": 23,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 410,
        "y": 281
      },
      {
        "x": 422,
        "y": 291
      },
      {
        "x": 411,
        "y": 304
      },
      {
        "x": 399,
        "y": 294
      }
    ],
    "labelPos": {
      "x": 411,
      "y": 293
    }
  },
  {
    "id": "local_60",
    "name": "Top Ten 18",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 389,
    "y": 294,
    "w": 26,
    "h": 23,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 399,
        "y": 294
      },
      {
        "x": 389,
        "y": 305
      },
      {
        "x": 392,
        "y": 306
      },
      {
        "x": 391,
        "y": 316
      },
      {
        "x": 410,
        "y": 317
      },
      {
        "x": 410,
        "y": 314
      },
      {
        "x": 415,
        "y": 308
      }
    ],
    "labelPos": {
      "x": 401,
      "y": 309
    }
  },
  {
    "id": "local_61",
    "name": "Brands Shop Damas",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 410,
    "y": 297,
    "w": 15,
    "h": 20,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 425,
        "y": 297
      },
      {
        "x": 425,
        "y": 317
      },
      {
        "x": 410,
        "y": 317
      },
      {
        "x": 410,
        "y": 314
      }
    ],
    "labelPos": {
      "x": 418,
      "y": 311
    }
  },
  {
    "id": "local_62",
    "name": "Lucchi",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 425,
    "y": 267,
    "w": 28,
    "h": 50,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 453,
        "y": 267
      },
      {
        "x": 450,
        "y": 267
      },
      {
        "x": 425,
        "y": 297
      },
      {
        "x": 425,
        "y": 317
      },
      {
        "x": 452,
        "y": 317
      }
    ],
    "labelPos": {
      "x": 441,
      "y": 293
    }
  },
  {
    "id": "local_63",
    "name": "Brands Shop Damas",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 452,
    "y": 267,
    "w": 39,
    "h": 50,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 480,
        "y": 267
      },
      {
        "x": 491,
        "y": 279
      },
      {
        "x": 480,
        "y": 288
      },
      {
        "x": 480,
        "y": 317
      },
      {
        "x": 452,
        "y": 317
      },
      {
        "x": 453,
        "y": 267
      }
    ],
    "labelPos": {
      "x": 473,
      "y": 289
    }
  },
  {
    "id": "local_64",
    "name": "Apolo",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 420,
    "y": 181,
    "w": 26,
    "h": 34,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 442,
        "y": 215
      },
      {
        "x": 446,
        "y": 211
      },
      {
        "x": 443,
        "y": 207
      },
      {
        "x": 441,
        "y": 203
      },
      {
        "x": 439,
        "y": 198
      },
      {
        "x": 438,
        "y": 194
      },
      {
        "x": 438,
        "y": 191
      },
      {
        "x": 439,
        "y": 187
      },
      {
        "x": 423,
        "y": 181
      },
      {
        "x": 420,
        "y": 199
      }
    ],
    "labelPos": {
      "x": 437,
      "y": 199
    }
  },
  {
    "id": "local_65",
    "name": "Las Villas Perfumería",
    "category": "beauty",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 414,
    "y": 199,
    "w": 28,
    "h": 24,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 414,
        "y": 206
      },
      {
        "x": 420,
        "y": 199
      },
      {
        "x": 442,
        "y": 215
      },
      {
        "x": 434,
        "y": 223
      }
    ],
    "labelPos": {
      "x": 428,
      "y": 211
    }
  },
  {
    "id": "local_66",
    "name": "Target UP",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 404,
    "y": 176,
    "w": 19,
    "h": 30,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 423,
        "y": 181
      },
      {
        "x": 407,
        "y": 176
      },
      {
        "x": 407,
        "y": 194
      },
      {
        "x": 404,
        "y": 198
      },
      {
        "x": 414,
        "y": 206
      },
      {
        "x": 420,
        "y": 199
      }
    ],
    "labelPos": {
      "x": 413,
      "y": 192
    }
  },
  {
    "id": "local_67",
    "name": "New York Silver",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 395,
    "y": 198,
    "w": 39,
    "h": 35,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 404,
        "y": 198
      },
      {
        "x": 434,
        "y": 223
      },
      {
        "x": 426,
        "y": 233
      },
      {
        "x": 395,
        "y": 208
      }
    ],
    "labelPos": {
      "x": 415,
      "y": 216
    }
  },
  {
    "id": "local_68",
    "name": "Panots",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 386,
    "y": 208,
    "w": 40,
    "h": 36,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 395,
        "y": 208
      },
      {
        "x": 426,
        "y": 233
      },
      {
        "x": 417,
        "y": 244
      },
      {
        "x": 386,
        "y": 220
      }
    ],
    "labelPos": {
      "x": 406,
      "y": 226
    }
  },
  {
    "id": "local_69",
    "name": "Gran Via",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 378,
    "y": 220,
    "w": 39,
    "h": 37,
    "doorNodeId": "door-local_69",
    "polygon": [
      {
        "x": 386,
        "y": 220
      },
      {
        "x": 417,
        "y": 244
      },
      {
        "x": 405,
        "y": 257
      },
      {
        "x": 378,
        "y": 234
      },
      {
        "x": 378,
        "y": 230
      }
    ],
    "labelPos": {
      "x": 393,
      "y": 237
    }
  },
  {
    "id": "local_70",
    "name": "Line",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 373,
    "y": 246,
    "w": 29,
    "h": 28,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 384,
        "y": 246
      },
      {
        "x": 402,
        "y": 262
      },
      {
        "x": 392,
        "y": 274
      },
      {
        "x": 373,
        "y": 259
      }
    ],
    "labelPos": {
      "x": 388,
      "y": 260
    }
  },
  {
    "id": "local_71",
    "name": "Radical",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 372,
    "y": 259,
    "w": 20,
    "h": 32,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 392,
        "y": 274
      },
      {
        "x": 373,
        "y": 259
      },
      {
        "x": 372,
        "y": 260
      },
      {
        "x": 372,
        "y": 285
      },
      {
        "x": 375,
        "y": 288
      },
      {
        "x": 377,
        "y": 291
      }
    ],
    "labelPos": {
      "x": 377,
      "y": 276
    }
  },
  {
    "id": "local_72",
    "name": "Prime Bodegon",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 359,
    "y": 238,
    "w": 25,
    "h": 47,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 384,
        "y": 246
      },
      {
        "x": 372,
        "y": 260
      },
      {
        "x": 372,
        "y": 285
      },
      {
        "x": 359,
        "y": 285
      },
      {
        "x": 360,
        "y": 247
      },
      {
        "x": 371,
        "y": 247
      },
      {
        "x": 371,
        "y": 240
      },
      {
        "x": 372,
        "y": 238
      },
      {
        "x": 374,
        "y": 238
      }
    ],
    "labelPos": {
      "x": 371,
      "y": 254
    }
  },
  {
    "id": "local_73",
    "name": "Salome",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 344,
    "y": 247,
    "w": 16,
    "h": 38,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 360,
        "y": 247
      },
      {
        "x": 345,
        "y": 247
      },
      {
        "x": 344,
        "y": 285
      },
      {
        "x": 359,
        "y": 285
      }
    ],
    "labelPos": {
      "x": 352,
      "y": 266
    }
  },
  {
    "id": "local_74",
    "name": "Boom Shoes",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 318,
    "y": 247,
    "w": 27,
    "h": 68,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 345,
        "y": 247
      },
      {
        "x": 344,
        "y": 285
      },
      {
        "x": 323,
        "y": 304
      },
      {
        "x": 323,
        "y": 315
      },
      {
        "x": 318,
        "y": 315
      },
      {
        "x": 319,
        "y": 247
      }
    ],
    "labelPos": {
      "x": 329,
      "y": 286
    }
  },
  {
    "id": "local_75",
    "name": "Tommy",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 272,
    "y": 246,
    "w": 47,
    "h": 69,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 319,
        "y": 247
      },
      {
        "x": 318,
        "y": 315
      },
      {
        "x": 272,
        "y": 314
      },
      {
        "x": 272,
        "y": 246
      }
    ],
    "labelPos": {
      "x": 295,
      "y": 281
    }
  },
  {
    "id": "local_76",
    "name": "RS Performan",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 253,
    "y": 246,
    "w": 19,
    "h": 68,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 263,
        "y": 246
      },
      {
        "x": 272,
        "y": 246
      },
      {
        "x": 272,
        "y": 314
      },
      {
        "x": 253,
        "y": 314
      },
      {
        "x": 253,
        "y": 263
      },
      {
        "x": 263,
        "y": 263
      }
    ],
    "labelPos": {
      "x": 263,
      "y": 274
    }
  },
  {
    "id": "local_77",
    "name": "Banco Provincial",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 235,
    "y": 263,
    "w": 18,
    "h": 51,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 253,
        "y": 263
      },
      {
        "x": 253,
        "y": 314
      },
      {
        "x": 235,
        "y": 314
      },
      {
        "x": 235,
        "y": 263
      }
    ],
    "labelPos": {
      "x": 244,
      "y": 289
    }
  },
  {
    "id": "local_78",
    "name": "James Bark",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 221,
    "y": 263,
    "w": 14,
    "h": 51,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 221,
        "y": 263
      },
      {
        "x": 235,
        "y": 263
      },
      {
        "x": 235,
        "y": 314
      },
      {
        "x": 221,
        "y": 314
      }
    ],
    "labelPos": {
      "x": 228,
      "y": 289
    }
  },
  {
    "id": "local_79",
    "name": "Mango MNG",
    "category": "sports",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 180,
    "y": 263,
    "w": 41,
    "h": 51,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 221,
        "y": 263
      },
      {
        "x": 221,
        "y": 314
      },
      {
        "x": 180,
        "y": 313
      },
      {
        "x": 180,
        "y": 279
      },
      {
        "x": 199,
        "y": 263
      }
    ],
    "labelPos": {
      "x": 200,
      "y": 286
    }
  },
  {
    "id": "local_80",
    "name": "RS Performance",
    "category": "sports",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 166,
    "y": 279,
    "w": 14,
    "h": 34,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 175,
        "y": 286
      },
      {
        "x": 180,
        "y": 279
      },
      {
        "x": 180,
        "y": 313
      },
      {
        "x": 166,
        "y": 313
      },
      {
        "x": 166,
        "y": 286
      }
    ],
    "labelPos": {
      "x": 173,
      "y": 295
    }
  },
  {
    "id": "local_81",
    "name": "La Corte",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 130,
    "y": 275,
    "w": 36,
    "h": 38,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 166,
        "y": 286
      },
      {
        "x": 166,
        "y": 313
      },
      {
        "x": 138,
        "y": 312
      },
      {
        "x": 136,
        "y": 307
      },
      {
        "x": 133,
        "y": 303
      },
      {
        "x": 130,
        "y": 298
      },
      {
        "x": 141,
        "y": 275
      },
      {
        "x": 152,
        "y": 280
      },
      {
        "x": 153,
        "y": 286
      }
    ],
    "labelPos": {
      "x": 146,
      "y": 296
    }
  },
  {
    "id": "local_82",
    "name": "Panisse",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 143,
    "y": 256,
    "w": 32,
    "h": 24,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 143,
        "y": 272
      },
      {
        "x": 152,
        "y": 280
      },
      {
        "x": 171,
        "y": 280
      },
      {
        "x": 175,
        "y": 275
      },
      {
        "x": 155,
        "y": 256
      }
    ],
    "labelPos": {
      "x": 159,
      "y": 273
    }
  },
  {
    "id": "local_83",
    "name": "Centro Piramedal y Mineral",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 155,
    "y": 242,
    "w": 33,
    "h": 33,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 155,
        "y": 255
      },
      {
        "x": 176,
        "y": 275
      },
      {
        "x": 188,
        "y": 264
      },
      {
        "x": 166,
        "y": 242
      }
    ],
    "labelPos": {
      "x": 171,
      "y": 259
    }
  },
  {
    "id": "local_84",
    "name": "Yuju",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 173,
    "y": 229,
    "w": 28,
    "h": 31,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 201,
        "y": 248
      },
      {
        "x": 201,
        "y": 255
      },
      {
        "x": 198,
        "y": 255
      },
      {
        "x": 192,
        "y": 260
      },
      {
        "x": 173,
        "y": 238
      },
      {
        "x": 182,
        "y": 229
      }
    ],
    "labelPos": {
      "x": 191,
      "y": 248
    }
  },
  {
    "id": "local_85",
    "name": "El King Gourmet",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 182,
    "y": 217,
    "w": 26,
    "h": 38,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 208,
        "y": 255
      },
      {
        "x": 201,
        "y": 255
      },
      {
        "x": 201,
        "y": 248
      },
      {
        "x": 182,
        "y": 229
      },
      {
        "x": 195,
        "y": 217
      },
      {
        "x": 208,
        "y": 229
      }
    ],
    "labelPos": {
      "x": 199,
      "y": 239
    }
  },
  {
    "id": "local_86",
    "name": "Mini Good",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 195,
    "y": 210,
    "w": 27,
    "h": 45,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 195,
        "y": 217
      },
      {
        "x": 208,
        "y": 229
      },
      {
        "x": 208,
        "y": 255
      },
      {
        "x": 222,
        "y": 255
      },
      {
        "x": 222,
        "y": 218
      },
      {
        "x": 218,
        "y": 218
      },
      {
        "x": 213,
        "y": 216
      },
      {
        "x": 209,
        "y": 214
      },
      {
        "x": 204,
        "y": 210
      }
    ],
    "labelPos": {
      "x": 211,
      "y": 226
    }
  },
  {
    "id": "local_87",
    "name": "Heladería 4D",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 222,
    "y": 215,
    "w": 14,
    "h": 40,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 222,
        "y": 218
      },
      {
        "x": 222,
        "y": 255
      },
      {
        "x": 236,
        "y": 255
      },
      {
        "x": 236,
        "y": 215
      },
      {
        "x": 233,
        "y": 216
      }
    ],
    "labelPos": {
      "x": 230,
      "y": 232
    }
  },
  {
    "id": "local_88",
    "name": "Planeta Sport",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 236,
    "y": 195,
    "w": 27,
    "h": 60,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 252,
        "y": 195
      },
      {
        "x": 263,
        "y": 200
      },
      {
        "x": 263,
        "y": 238
      },
      {
        "x": 256,
        "y": 238
      },
      {
        "x": 256,
        "y": 255
      },
      {
        "x": 236,
        "y": 255
      },
      {
        "x": 236,
        "y": 215
      },
      {
        "x": 239,
        "y": 213
      },
      {
        "x": 243,
        "y": 210
      },
      {
        "x": 246,
        "y": 207
      }
    ],
    "labelPos": {
      "x": 249,
      "y": 223
    }
  },
  {
    "id": "local_89",
    "name": "Joyeria Bellagio",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 252,
    "y": 179,
    "w": 25,
    "h": 59,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 252,
        "y": 195
      },
      {
        "x": 253,
        "y": 191
      },
      {
        "x": 254,
        "y": 186
      },
      {
        "x": 253,
        "y": 183
      },
      {
        "x": 266,
        "y": 179
      },
      {
        "x": 277,
        "y": 191
      },
      {
        "x": 277,
        "y": 238
      },
      {
        "x": 263,
        "y": 238
      },
      {
        "x": 263,
        "y": 200
      }
    ],
    "labelPos": {
      "x": 262,
      "y": 200
    }
  },
  {
    "id": "local_90",
    "name": "HG Fashion",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 266,
    "y": 172,
    "w": 25,
    "h": 66,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 291,
        "y": 172
      },
      {
        "x": 291,
        "y": 238
      },
      {
        "x": 277,
        "y": 238
      },
      {
        "x": 277,
        "y": 191
      },
      {
        "x": 266,
        "y": 179
      },
      {
        "x": 273,
        "y": 177
      },
      {
        "x": 283,
        "y": 174
      }
    ],
    "labelPos": {
      "x": 280,
      "y": 196
    }
  },
  {
    "id": "local_91",
    "name": "VMagic",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 291,
    "y": 168,
    "w": 19,
    "h": 70,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 310,
        "y": 168
      },
      {
        "x": 309,
        "y": 238
      },
      {
        "x": 291,
        "y": 238
      },
      {
        "x": 291,
        "y": 172
      }
    ],
    "labelPos": {
      "x": 300,
      "y": 204
    }
  },
  {
    "id": "local_92",
    "name": "Lucy Lingerie",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 309,
    "y": 167,
    "w": 28,
    "h": 72,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 310,
        "y": 168
      },
      {
        "x": 320,
        "y": 167
      },
      {
        "x": 323,
        "y": 172
      },
      {
        "x": 328,
        "y": 172
      },
      {
        "x": 328,
        "y": 231
      },
      {
        "x": 337,
        "y": 231
      },
      {
        "x": 337,
        "y": 239
      },
      {
        "x": 309,
        "y": 238
      }
    ],
    "labelPos": {
      "x": 324,
      "y": 202
    }
  },
  {
    "id": "local_93",
    "name": "Converse",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 328,
    "y": 172,
    "w": 18,
    "h": 59,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 346,
        "y": 172
      },
      {
        "x": 345,
        "y": 231
      },
      {
        "x": 328,
        "y": 231
      },
      {
        "x": 328,
        "y": 172
      }
    ],
    "labelPos": {
      "x": 337,
      "y": 202
    }
  },
  {
    "id": "local_94",
    "name": "London Jeans",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 345,
    "y": 172,
    "w": 15,
    "h": 59,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 346,
        "y": 172
      },
      {
        "x": 360,
        "y": 172
      },
      {
        "x": 359,
        "y": 231
      },
      {
        "x": 345,
        "y": 231
      }
    ],
    "labelPos": {
      "x": 353,
      "y": 202
    }
  },
  {
    "id": "local_95",
    "name": "Marbel Joyeros",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 359,
    "y": 172,
    "w": 15,
    "h": 59,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 360,
        "y": 172
      },
      {
        "x": 374,
        "y": 174
      },
      {
        "x": 373,
        "y": 231
      },
      {
        "x": 359,
        "y": 231
      }
    ],
    "labelPos": {
      "x": 367,
      "y": 202
    }
  },
  {
    "id": "local_96",
    "name": "Canguro",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 373,
    "y": 171,
    "w": 13,
    "h": 55,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 374,
        "y": 174
      },
      {
        "x": 382,
        "y": 175
      },
      {
        "x": 386,
        "y": 171
      },
      {
        "x": 386,
        "y": 210
      },
      {
        "x": 373,
        "y": 226
      }
    ],
    "labelPos": {
      "x": 380,
      "y": 191
    }
  },
  {
    "id": "local_97",
    "name": "Onity",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 386,
    "y": 171,
    "w": 15,
    "h": 39,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 386,
        "y": 171
      },
      {
        "x": 401,
        "y": 174
      },
      {
        "x": 401,
        "y": 192
      },
      {
        "x": 386,
        "y": 210
      }
    ],
    "labelPos": {
      "x": 394,
      "y": 187
    }
  },
  {
    "id": "local_98",
    "name": "Jump",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 238,
    "y": 119,
    "w": 36,
    "h": 45,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 243,
        "y": 164
      },
      {
        "x": 238,
        "y": 159
      },
      {
        "x": 238,
        "y": 129
      },
      {
        "x": 261,
        "y": 130
      },
      {
        "x": 261,
        "y": 122
      },
      {
        "x": 265,
        "y": 122
      },
      {
        "x": 265,
        "y": 119
      },
      {
        "x": 274,
        "y": 119
      },
      {
        "x": 274,
        "y": 154
      },
      {
        "x": 269,
        "y": 155
      },
      {
        "x": 254,
        "y": 160
      }
    ],
    "labelPos": {
      "x": 258,
      "y": 139
    }
  },
  {
    "id": "local_99",
    "name": "Monivet",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 281,
    "y": 120,
    "w": 11,
    "h": 32,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 292,
        "y": 120
      },
      {
        "x": 292,
        "y": 149
      },
      {
        "x": 287,
        "y": 150
      },
      {
        "x": 281,
        "y": 152
      },
      {
        "x": 281,
        "y": 120
      }
    ],
    "labelPos": {
      "x": 287,
      "y": 138
    }
  },
  {
    "id": "local_100",
    "name": "Glam Eclat",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 292,
    "y": 120,
    "w": 12,
    "h": 29,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 304,
        "y": 120
      },
      {
        "x": 304,
        "y": 147
      },
      {
        "x": 297,
        "y": 148
      },
      {
        "x": 292,
        "y": 149
      },
      {
        "x": 292,
        "y": 120
      }
    ],
    "labelPos": {
      "x": 298,
      "y": 137
    }
  },
  {
    "id": "local_101",
    "name": "Harem Shoes",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 304,
    "y": 112,
    "w": 16,
    "h": 35,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 304,
        "y": 120
      },
      {
        "x": 306,
        "y": 120
      },
      {
        "x": 306,
        "y": 112
      },
      {
        "x": 317,
        "y": 112
      },
      {
        "x": 317,
        "y": 118
      },
      {
        "x": 320,
        "y": 118
      },
      {
        "x": 320,
        "y": 145
      },
      {
        "x": 312,
        "y": 146
      },
      {
        "x": 304,
        "y": 147
      }
    ],
    "labelPos": {
      "x": 312,
      "y": 126
    }
  },
  {
    "id": "local_102",
    "name": "Biphoria",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 320,
    "y": 119,
    "w": 18,
    "h": 26,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 325,
        "y": 140
      },
      {
        "x": 320,
        "y": 145
      },
      {
        "x": 320,
        "y": 119
      },
      {
        "x": 338,
        "y": 119
      },
      {
        "x": 338,
        "y": 139
      }
    ],
    "labelPos": {
      "x": 328,
      "y": 132
    }
  },
  {
    "id": "local_103",
    "name": "Hang Ten",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 338,
    "y": 119,
    "w": 18,
    "h": 21,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 338,
        "y": 119
      },
      {
        "x": 356,
        "y": 119
      },
      {
        "x": 356,
        "y": 140
      },
      {
        "x": 338,
        "y": 139
      }
    ],
    "labelPos": {
      "x": 347,
      "y": 129
    }
  },
  {
    "id": "local_104",
    "name": "Nokn",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 356,
    "y": 119,
    "w": 19,
    "h": 22,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 356,
        "y": 119
      },
      {
        "x": 375,
        "y": 119
      },
      {
        "x": 375,
        "y": 141
      },
      {
        "x": 356,
        "y": 139
      }
    ],
    "labelPos": {
      "x": 366,
      "y": 130
    }
  },
  {
    "id": "local_105",
    "name": "Jeep / CAT",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 372,
    "y": 89,
    "w": 17,
    "h": 60,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 388,
        "y": 149
      },
      {
        "x": 382,
        "y": 142
      },
      {
        "x": 375,
        "y": 141
      },
      {
        "x": 375,
        "y": 119
      },
      {
        "x": 372,
        "y": 119
      },
      {
        "x": 372,
        "y": 89
      },
      {
        "x": 389,
        "y": 91
      }
    ],
    "labelPos": {
      "x": 379,
      "y": 121
    }
  },
  {
    "id": "local_106",
    "name": "Apolo",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 388,
    "y": 91,
    "w": 15,
    "h": 59,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 389,
        "y": 91
      },
      {
        "x": 399,
        "y": 92
      },
      {
        "x": 399,
        "y": 97
      },
      {
        "x": 403,
        "y": 97
      },
      {
        "x": 401,
        "y": 150
      },
      {
        "x": 396,
        "y": 149
      },
      {
        "x": 392,
        "y": 149
      },
      {
        "x": 388,
        "y": 149
      }
    ],
    "labelPos": {
      "x": 396,
      "y": 122
    }
  },
  {
    "id": "local_107",
    "name": "Las Villas Perfumeria",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 401,
    "y": 97,
    "w": 30,
    "h": 61,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 401,
        "y": 150
      },
      {
        "x": 403,
        "y": 97
      },
      {
        "x": 417,
        "y": 99
      },
      {
        "x": 431,
        "y": 103
      },
      {
        "x": 431,
        "y": 148
      },
      {
        "x": 429,
        "y": 148
      },
      {
        "x": 427,
        "y": 158
      },
      {
        "x": 414,
        "y": 154
      }
    ],
    "labelPos": {
      "x": 419,
      "y": 132
    }
  },
  {
    "id": "local_108",
    "name": "Springfield",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 427,
    "y": 103,
    "w": 34,
    "h": 65,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 431,
        "y": 103
      },
      {
        "x": 458,
        "y": 113
      },
      {
        "x": 456,
        "y": 150
      },
      {
        "x": 461,
        "y": 160
      },
      {
        "x": 457,
        "y": 162
      },
      {
        "x": 454,
        "y": 164
      },
      {
        "x": 451,
        "y": 166
      },
      {
        "x": 449,
        "y": 168
      },
      {
        "x": 427,
        "y": 158
      },
      {
        "x": 429,
        "y": 148
      },
      {
        "x": 431,
        "y": 148
      }
    ],
    "labelPos": {
      "x": 446,
      "y": 149
    }
  },
  {
    "id": "local_109",
    "name": "Sportland",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 456,
    "y": 113,
    "w": 30,
    "h": 48,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 458,
        "y": 113
      },
      {
        "x": 485,
        "y": 124
      },
      {
        "x": 486,
        "y": 149
      },
      {
        "x": 480,
        "y": 161
      },
      {
        "x": 476,
        "y": 159
      },
      {
        "x": 470,
        "y": 159
      },
      {
        "x": 466,
        "y": 159
      },
      {
        "x": 461,
        "y": 160
      },
      {
        "x": 456,
        "y": 150
      }
    ],
    "labelPos": {
      "x": 471,
      "y": 148
    }
  },
  {
    "id": "local_110",
    "name": "Banco Nacional de Credito",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 480,
    "y": 125,
    "w": 37,
    "h": 44,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 485,
        "y": 125
      },
      {
        "x": 510,
        "y": 137
      },
      {
        "x": 507,
        "y": 142
      },
      {
        "x": 517,
        "y": 148
      },
      {
        "x": 492,
        "y": 169
      },
      {
        "x": 489,
        "y": 167
      },
      {
        "x": 487,
        "y": 165
      },
      {
        "x": 484,
        "y": 163
      },
      {
        "x": 480,
        "y": 161
      },
      {
        "x": 486,
        "y": 149
      }
    ],
    "labelPos": {
      "x": 494,
      "y": 153
    }
  },
  {
    "id": "local_111",
    "name": "Fashion Look",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 492,
    "y": 148,
    "w": 49,
    "h": 36,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 492,
        "y": 169
      },
      {
        "x": 517,
        "y": 148
      },
      {
        "x": 541,
        "y": 163
      },
      {
        "x": 533,
        "y": 170
      },
      {
        "x": 500,
        "y": 184
      },
      {
        "x": 497,
        "y": 176
      }
    ],
    "labelPos": {
      "x": 513,
      "y": 168
    }
  },
  {
    "id": "local_112",
    "name": "Optica Billi",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 499,
    "y": 163,
    "w": 51,
    "h": 44,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 541,
        "y": 163
      },
      {
        "x": 550,
        "y": 171
      },
      {
        "x": 511,
        "y": 207
      },
      {
        "x": 499,
        "y": 198
      },
      {
        "x": 501,
        "y": 194
      },
      {
        "x": 501,
        "y": 190
      },
      {
        "x": 500,
        "y": 184
      },
      {
        "x": 533,
        "y": 170
      }
    ],
    "labelPos": {
      "x": 517,
      "y": 185
    }
  },
  {
    "id": "local_113",
    "name": "Women´s Secret",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 511,
    "y": 171,
    "w": 51,
    "h": 49,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 550,
        "y": 171
      },
      {
        "x": 562,
        "y": 184
      },
      {
        "x": 524,
        "y": 220
      },
      {
        "x": 511,
        "y": 207
      }
    ],
    "labelPos": {
      "x": 537,
      "y": 196
    }
  },
  {
    "id": "local_114",
    "name": "Stradivarius",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 530,
    "y": 194,
    "w": 68,
    "h": 72,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 563,
        "y": 194
      },
      {
        "x": 572,
        "y": 203
      },
      {
        "x": 576,
        "y": 201
      },
      {
        "x": 598,
        "y": 230
      },
      {
        "x": 582,
        "y": 243
      },
      {
        "x": 585,
        "y": 249
      },
      {
        "x": 560,
        "y": 266
      },
      {
        "x": 548,
        "y": 248
      },
      {
        "x": 530,
        "y": 225
      }
    ],
    "labelPos": {
      "x": 568,
      "y": 229
    }
  },
  {
    "id": "local_115",
    "name": "Bershka",
    "category": "fashion",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 560,
    "y": 229,
    "w": 74,
    "h": 82,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 585,
        "y": 249
      },
      {
        "x": 582,
        "y": 243
      },
      {
        "x": 598,
        "y": 229
      },
      {
        "x": 613,
        "y": 250
      },
      {
        "x": 619,
        "y": 248
      },
      {
        "x": 634,
        "y": 280
      },
      {
        "x": 611,
        "y": 292
      },
      {
        "x": 612,
        "y": 297
      },
      {
        "x": 608,
        "y": 304
      },
      {
        "x": 612,
        "y": 308
      },
      {
        "x": 604,
        "y": 311
      },
      {
        "x": 600,
        "y": 306
      },
      {
        "x": 597,
        "y": 303
      },
      {
        "x": 593,
        "y": 301
      },
      {
        "x": 587,
        "y": 298
      },
      {
        "x": 581,
        "y": 297
      },
      {
        "x": 575,
        "y": 297
      },
      {
        "x": 560,
        "y": 266
      }
    ],
    "labelPos": {
      "x": 598,
      "y": 282
    }
  },
  {
    "id": "local_116",
    "name": "Jasi's",
    "category": "food",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 608,
    "y": 280,
    "w": 32,
    "h": 28,
    "doorNodeId": "",
    "polygon": [
      {
        "x": 612,
        "y": 308
      },
      {
        "x": 608,
        "y": 304
      },
      {
        "x": 612,
        "y": 297
      },
      {
        "x": 611,
        "y": 292
      },
      {
        "x": 634,
        "y": 280
      },
      {
        "x": 639,
        "y": 291
      },
      {
        "x": 637,
        "y": 292
      },
      {
        "x": 640,
        "y": 298
      }
    ],
    "labelPos": {
      "x": 624,
      "y": 295
    }
  },
  {
    "id": "local_117",
    "name": "baño B",
    "category": "services",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 172,
    "y": 384,
    "w": 26,
    "h": 29,
    "doorNodeId": "door-local_117",
    "polygon": [
      {
        "x": 172,
        "y": 405
      },
      {
        "x": 178,
        "y": 405
      },
      {
        "x": 178,
        "y": 384
      },
      {
        "x": 198,
        "y": 385
      },
      {
        "x": 198,
        "y": 413
      },
      {
        "x": 172,
        "y": 413
      }
    ],
    "labelPos": {
      "x": 183,
      "y": 401
    }
  },
  {
    "id": "local_118",
    "name": "baño A",
    "category": "services",
    "floorId": "floor-autopista",
    "height": 13,
    "x": 237,
    "y": 89,
    "w": 131,
    "h": 41,
    "doorNodeId": "door-local_118",
    "polygon": [
      {
        "x": 274,
        "y": 119
      },
      {
        "x": 265,
        "y": 119
      },
      {
        "x": 265,
        "y": 122
      },
      {
        "x": 261,
        "y": 122
      },
      {
        "x": 261,
        "y": 130
      },
      {
        "x": 238,
        "y": 129
      },
      {
        "x": 237,
        "y": 110
      },
      {
        "x": 269,
        "y": 94
      },
      {
        "x": 337,
        "y": 90
      },
      {
        "x": 368,
        "y": 89
      },
      {
        "x": 368,
        "y": 119
      },
      {
        "x": 318,
        "y": 119
      },
      {
        "x": 317,
        "y": 111
      },
      {
        "x": 306,
        "y": 112
      },
      {
        "x": 305,
        "y": 120
      },
      {
        "x": 282,
        "y": 121
      }
    ],
    "labelPos": {
      "x": 292,
      "y": 114
    }
  }
];

export const floorAutopistaData: MapFloor = {
  "id": "floor-autopista",
  "name": "Autopista (P1)",
  "level": 1,
  "width": 720,
  "height": 540,
  "footprint": [
    {
      "x": 61,
      "y": 40
    },
    {
      "x": 250,
      "y": 45
    },
    {
      "x": 380,
      "y": 80
    },
    {
      "x": 490,
      "y": 115
    },
    {
      "x": 605,
      "y": 210
    },
    {
      "x": 660,
      "y": 320
    },
    {
      "x": 720,
      "y": 320
    },
    {
      "x": 715,
      "y": 432
    },
    {
      "x": 567,
      "y": 431
    },
    {
      "x": 160,
      "y": 420
    },
    {
      "x": 30,
      "y": 420
    },
    {
      "x": 44,
      "y": 282
    },
    {
      "x": 44,
      "y": 281
    },
    {
      "x": 53,
      "y": 193
    },
    {
      "x": 61,
      "y": 40
    }
  ],
  "areas": [
    {
      "id": "pasillo plaza la fuente",
      "kind": "corridor",
      "polygon": [
        {
          "x": 236,
          "y": 167
        },
        {
          "x": 253,
          "y": 161
        },
        {
          "x": 270,
          "y": 155
        },
        {
          "x": 321,
          "y": 145
        },
        {
          "x": 325,
          "y": 140
        },
        {
          "x": 353,
          "y": 139
        },
        {
          "x": 381,
          "y": 143
        },
        {
          "x": 388,
          "y": 150
        },
        {
          "x": 414,
          "y": 154
        },
        {
          "x": 440,
          "y": 165
        },
        {
          "x": 454,
          "y": 170
        },
        {
          "x": 446,
          "y": 191
        },
        {
          "x": 425,
          "y": 180
        },
        {
          "x": 410,
          "y": 175
        },
        {
          "x": 386,
          "y": 171
        },
        {
          "x": 382,
          "y": 175
        },
        {
          "x": 360,
          "y": 172
        },
        {
          "x": 324,
          "y": 171
        },
        {
          "x": 320,
          "y": 166
        },
        {
          "x": 300,
          "y": 169
        },
        {
          "x": 266,
          "y": 178
        },
        {
          "x": 245,
          "y": 185
        }
      ]
    },
    {
      "id": "pasillo plaza central",
      "kind": "corridor",
      "polygon": [
        {
          "x": 121,
          "y": 312
        },
        {
          "x": 175,
          "y": 314
        },
        {
          "x": 228,
          "y": 315
        },
        {
          "x": 325,
          "y": 316
        },
        {
          "x": 326,
          "y": 305
        },
        {
          "x": 345,
          "y": 288
        },
        {
          "x": 370,
          "y": 288
        },
        {
          "x": 377,
          "y": 293
        },
        {
          "x": 389,
          "y": 307
        },
        {
          "x": 389,
          "y": 317
        },
        {
          "x": 558,
          "y": 321
        },
        {
          "x": 558,
          "y": 338
        },
        {
          "x": 388,
          "y": 334
        },
        {
          "x": 366,
          "y": 358
        },
        {
          "x": 357,
          "y": 358
        },
        {
          "x": 346,
          "y": 358
        },
        {
          "x": 324,
          "y": 333
        },
        {
          "x": 226,
          "y": 331
        },
        {
          "x": 119,
          "y": 329
        }
      ]
    },
    {
      "id": "pasillo plaza el arte",
      "kind": "corridor",
      "polygon": [
        {
          "x": 497,
          "y": 199
        },
        {
          "x": 512,
          "y": 211
        },
        {
          "x": 530,
          "y": 228
        },
        {
          "x": 543,
          "y": 243
        },
        {
          "x": 555,
          "y": 260
        },
        {
          "x": 567,
          "y": 281
        },
        {
          "x": 578,
          "y": 303
        },
        {
          "x": 563,
          "y": 312
        },
        {
          "x": 552,
          "y": 290
        },
        {
          "x": 538,
          "y": 268
        },
        {
          "x": 532,
          "y": 259
        },
        {
          "x": 523,
          "y": 249
        },
        {
          "x": 513,
          "y": 238
        },
        {
          "x": 500,
          "y": 225
        },
        {
          "x": 483,
          "y": 212
        }
      ]
    },
    {
      "id": "pasillo plazas la fuente y jardin",
      "kind": "corridor",
      "polygon": [
        {
          "x": 109,
          "y": 300
        },
        {
          "x": 121,
          "y": 274
        },
        {
          "x": 140,
          "y": 245
        },
        {
          "x": 168,
          "y": 215
        },
        {
          "x": 196,
          "y": 191
        },
        {
          "x": 209,
          "y": 204
        },
        {
          "x": 180,
          "y": 228
        },
        {
          "x": 158,
          "y": 253
        },
        {
          "x": 140,
          "y": 277
        },
        {
          "x": 126,
          "y": 304
        }
      ]
    },
    {
      "id": "pasillo final plaza jardin",
      "kind": "corridor",
      "polygon": [
        {
          "x": 108,
          "y": 337
        },
        {
          "x": 83,
          "y": 335
        },
        {
          "x": 83,
          "y": 342
        },
        {
          "x": 76,
          "y": 351
        },
        {
          "x": 80,
          "y": 356
        },
        {
          "x": 69,
          "y": 367
        },
        {
          "x": 73,
          "y": 372
        },
        {
          "x": 64,
          "y": 379
        },
        {
          "x": 73,
          "y": 388
        },
        {
          "x": 65,
          "y": 396
        },
        {
          "x": 69,
          "y": 404
        },
        {
          "x": 103,
          "y": 405
        },
        {
          "x": 103,
          "y": 398
        },
        {
          "x": 94,
          "y": 388
        },
        {
          "x": 100,
          "y": 379
        },
        {
          "x": 94,
          "y": 373
        },
        {
          "x": 99,
          "y": 368
        },
        {
          "x": 93,
          "y": 362
        },
        {
          "x": 102,
          "y": 353
        },
        {
          "x": 130,
          "y": 347
        },
        {
          "x": 128,
          "y": 340
        }
      ]
    },
    {
      "id": "pasillo baño B",
      "kind": "corridor",
      "polygon": [
        {
          "x": 179,
          "y": 326
        },
        {
          "x": 173,
          "y": 327
        },
        {
          "x": 172,
          "y": 405
        },
        {
          "x": 178,
          "y": 405
        }
      ]
    },
    {
      "id": "pasillo baño A",
      "kind": "corridor",
      "polygon": [
        {
          "x": 274,
          "y": 115
        },
        {
          "x": 281,
          "y": 115
        },
        {
          "x": 281,
          "y": 157
        },
        {
          "x": 274,
          "y": 157
        }
      ]
    },
    {
      "id": "pasillo plaza musica",
      "kind": "corridor",
      "polygon": [
        {
          "x": 589,
          "y": 317
        },
        {
          "x": 642,
          "y": 297
        },
        {
          "x": 648,
          "y": 315
        },
        {
          "x": 593,
          "y": 336
        }
      ]
    },
    {
      "id": "pasillo",
      "kind": "corridor",
      "polygon": [
        {
          "x": 450,
          "y": 208
        },
        {
          "x": 465,
          "y": 215
        },
        {
          "x": 387,
          "y": 306
        },
        {
          "x": 376,
          "y": 293
        }
      ]
    },
    {
      "id": "pl-fuente",
      "label": "Plaza La Fuente",
      "kind": "plaza",
      "center": {
        "x": 222,
        "y": 187
      },
      "radius": 27,
      "color": "#DC2626"
    },
    {
      "id": "pl-jardin",
      "label": "Plaza Jardin",
      "kind": "plaza",
      "center": {
        "x": 111,
        "y": 322
      },
      "radius": 25,
      "color": "#2563EB"
    },
    {
      "id": "pl-central",
      "label": "Plaza Central",
      "kind": "plaza",
      "center": {
        "x": 358,
        "y": 322
      },
      "radius": 27,
      "color": "#EA580C"
    },
    {
      "id": "pl-arte",
      "label": "Plaza El Arte",
      "kind": "plaza",
      "center": {
        "x": 470,
        "y": 190
      },
      "radius": 26,
      "color": "#7C3AED"
    },
    {
      "id": "pl-musica",
      "label": "Plaza La Musica",
      "kind": "plaza",
      "center": {
        "x": 578,
        "y": 330
      },
      "radius": 27,
      "color": "#1D4ED8"
    }
  ],
  "obstacles": [],
  "props": [
    {
      "id": "v-pj-1",
      "kind": "stairs",
      "rect": {
        "x": 72,
        "y": 250,
        "w": 14,
        "h": 14
      }
    },
    {
      "id": "v-plf-1",
      "kind": "stairs",
      "rect": {
        "x": 180,
        "y": 73,
        "w": 14,
        "h": 14
      }
    },
    {
      "id": "v-pc-1",
      "kind": "stairs",
      "rect": {
        "x": 350,
        "y": 250,
        "w": 14,
        "h": 14
      }
    },
    {
      "id": "v-pea-1",
      "kind": "stairs",
      "rect": {
        "x": 530,
        "y": 73,
        "w": 14,
        "h": 14
      }
    },
    {
      "id": "v-plm-1",
      "kind": "stairs",
      "rect": {
        "x": 584,
        "y": 250,
        "w": 14,
        "h": 14
      }
    }
  ]
};

export const nodesAutopista: NavNode[] = [
  {
    "id": "node-pasillo B3",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 354,
    "y": 153,
    "connections": [
      "node-pasillo B4",
      "node-pasillo B2",
      "node-85",
      "node-115",
      "node-116",
      "node-117",
      "node-84",
      "node-83",
      "node-118"
    ]
  },
  {
    "id": "node-entrada A1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 646,
    "y": 304,
    "connections": [
      "node-entrada A2"
    ]
  },
  {
    "id": "node-plaza musica",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 575,
    "y": 328,
    "connections": [
      "node-entrada A2",
      "node-pasillo A1",
      "node-pasillo G5",
      "node-146"
    ]
  },
  {
    "id": "node-plaza  el Arte",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 471,
    "y": 189,
    "connections": [
      "node-pasillo B1",
      "node-pasillo A5",
      "node-pasillo F2",
      "node-92",
      "node-91",
      "node-90",
      "node-89"
    ]
  },
  {
    "id": "node-pasillo B2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 396,
    "y": 159,
    "connections": [
      "node-pasillo B3",
      "node-pasillo B1",
      "node-87",
      "node-113",
      "node-86",
      "node-114"
    ]
  },
  {
    "id": "node-plaza la Fuente",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 220,
    "y": 182,
    "connections": [
      "node-pasillo C1",
      "node-pasillo B5",
      "node-78",
      "node-77",
      "node-122",
      "node-123",
      "node-124",
      "node-76"
    ]
  },
  {
    "id": "node-plaza Jardin",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 116,
    "y": 320,
    "connections": [
      "node-pasillo D1",
      "node-68",
      "node-69",
      "node-56",
      "node-55",
      "node-70",
      "node-71",
      "node-72",
      "node-pasillo E1",
      "node-pasillo C3"
    ]
  },
  {
    "id": "node-plaza Central",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 358,
    "y": 325,
    "connections": [
      "node-pasillo G1",
      "node-pasillo E5",
      "node-pasillo F1",
      "node-141",
      "node-142",
      "node-140",
      "node-143",
      "node-139",
      "node-144"
    ]
  },
  {
    "id": "node-pasillo G2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 428,
    "y": 328,
    "connections": [
      "node-pasillo G3",
      "node-pasillo G1",
      "node-137",
      "node-129",
      "node-130"
    ]
  },
  {
    "id": "node-pasillo B1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 429,
    "y": 171,
    "connections": [
      "node-pasillo B2",
      "node-plaza  el Arte",
      "node-111",
      "node-112",
      "node-88"
    ]
  },
  {
    "id": "node-pasillo E1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 171,
    "y": 321,
    "connections": [
      "node-plaza Jardin",
      "node-54",
      "node-37-victoria secret",
      "node-53",
      "node-pasillo E2",
      "node-38-bhype",
      "node-pasillo-baño-B"
    ]
  },
  {
    "id": "node-pasillo C1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 184,
    "y": 210,
    "connections": [
      "node-pasillo C2",
      "node-plaza la Fuente",
      "node-75",
      "node-125",
      "node-126"
    ]
  },
  {
    "id": "node-pasillo D1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 86,
    "y": 355,
    "connections": [
      "node-pasillo D2",
      "node-66",
      "node-57",
      "node-67",
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-pasillo A2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 554,
    "y": 277,
    "connections": [
      "node-pasillo A3",
      "node-pasillo A1",
      "node-148"
    ]
  },
  {
    "id": "node-pasillo A1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 565,
    "y": 296,
    "connections": [
      "node-pasillo A2",
      "node-plaza musica",
      "node-149",
      "node-154"
    ]
  },
  {
    "id": "node-pasillo F2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 436,
    "y": 234,
    "connections": [
      "node-pasillo F1",
      "node-plaza  el Arte",
      "node-108",
      "node-100",
      "node-99",
      "node-109",
      "node-110",
      "node-98"
    ]
  },
  {
    "id": "node-pasillo F1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 401,
    "y": 276,
    "connections": [
      "node-pasillo F2",
      "node-plaza Central",
      "node-105",
      "node-104",
      "node-103",
      "node-102",
      "node-106",
      "node-107",
      "node-101"
    ]
  },
  {
    "id": "node-pasillo G1",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 397,
    "y": 328,
    "connections": [
      "node-pasillo G2",
      "node-plaza Central",
      "node-138"
    ]
  },
  {
    "id": "node-pasillo E2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 208,
    "y": 322,
    "connections": [
      "node-pasillo E3",
      "node-pasillo E1",
      "node-52",
      "node-39-bunny",
      "node-40-aishop"
    ]
  },
  {
    "id": "node-pasillo C2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 164,
    "y": 237,
    "connections": [
      "node-pasillo C3",
      "node-pasillo C1",
      "node-74",
      "node-127"
    ]
  },
  {
    "id": "node-Baño B",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 179,
    "y": 405,
    "connections": [
      "node-pasillo-baño-B"
    ]
  },
  {
    "id": "node-baño A",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 277,
    "y": 109,
    "connections": [
      "node-155"
    ]
  },
  {
    "id": "node-pasillo B4",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 310,
    "y": 155,
    "connections": [
      "node-pasillo B5",
      "node-pasillo B3",
      "node-82",
      "node-81",
      "node-80",
      "node-119",
      "node-120"
    ]
  },
  {
    "id": "node-pasillo B5",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 262,
    "y": 168,
    "connections": [
      "node-plaza la Fuente",
      "node-pasillo B4",
      "node-79",
      "node-121",
      "node-155"
    ]
  },
  {
    "id": "node-pasillo C3",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 136,
    "y": 267,
    "connections": [
      "node-plaza Jardin",
      "node-pasillo C2",
      "node-128",
      "node-73"
    ]
  },
  {
    "id": "node-pasillo E3",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 242,
    "y": 323,
    "connections": [
      "node-44",
      "node-pasillo E4",
      "node-pasillo E2",
      "node-51",
      "node-50",
      "node-41",
      "node-42",
      "node-43"
    ]
  },
  {
    "id": "node-pasillo E4",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 273,
    "y": 326,
    "connections": [
      "node-pasillo E5",
      "node-pasillo E3",
      "node-49",
      "node-46"
    ]
  },
  {
    "id": "node-pasillo E5",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 309,
    "y": 326,
    "connections": [
      "node-plaza Central",
      "node-pasillo E4",
      "node-48",
      "node-47"
    ]
  },
  {
    "id": "node-pasillo G3",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 456,
    "y": 330,
    "connections": [
      "node-pasillo G4",
      "node-pasillo G2",
      "node-130",
      "node-136",
      "node-131",
      "node-135"
    ]
  },
  {
    "id": "node-pasillo G4",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 495,
    "y": 330,
    "connections": [
      "node-pasillo G5",
      "node-pasillo G3",
      "node-132",
      "node-134"
    ]
  },
  {
    "id": "node-pasillo G5",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 527,
    "y": 329,
    "connections": [
      "node-plaza musica",
      "node-pasillo G4",
      "node-133",
      "node-151",
      "node-150"
    ]
  },
  {
    "id": "node-pasillo A3",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 543,
    "y": 258,
    "connections": [
      "node-pasillo A4",
      "node-pasillo A2",
      "node-153",
      "node-147"
    ]
  },
  {
    "id": "node-pasillo A4",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 526,
    "y": 238,
    "connections": [
      "node-pasillo A5",
      "node-pasillo A3",
      "node-152",
      "node-94"
    ]
  },
  {
    "id": "node-pasillo A5",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 505,
    "y": 217,
    "connections": [
      "node-plaza  el Arte",
      "node-pasillo A4",
      "node-95",
      "node-96",
      "node-93"
    ]
  },
  {
    "id": "node-entrada A2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 618,
    "y": 314,
    "connections": [
      "node-entrada A1",
      "node-plaza musica",
      "node-146"
    ]
  },
  {
    "id": "node-pasillo D2",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 82,
    "y": 383,
    "connections": [
      "node-62",
      "node-61",
      "node-60",
      "node-59",
      "node-58",
      "node-63",
      "node-64",
      "node-65",
      "node-pasillo D1"
    ]
  },
  {
    "id": "node-37-victoria secret",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 154,
    "y": 332,
    "connections": [
      "node-pasillo E1"
    ]
  },
  {
    "id": "node-38-bhype",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 185,
    "y": 331,
    "connections": [
      "node-pasillo E1"
    ]
  },
  {
    "id": "node-39-bunny",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 199,
    "y": 332,
    "connections": [
      "node-pasillo E2"
    ]
  },
  {
    "id": "node-40-aishop",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 216,
    "y": 332,
    "connections": [
      "node-pasillo E2"
    ]
  },
  {
    "id": "node-41",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 231,
    "y": 332,
    "connections": [
      "node-pasillo E3"
    ]
  },
  {
    "id": "node-42",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 244,
    "y": 333,
    "connections": [
      "node-pasillo E3"
    ]
  },
  {
    "id": "node-43",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 255,
    "y": 333,
    "connections": [
      "node-pasillo E3"
    ]
  },
  {
    "id": "node-44",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 268,
    "y": 333,
    "connections": [
      "node-pasillo E3"
    ]
  },
  {
    "id": "node-46",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 282,
    "y": 333,
    "connections": [
      "node-pasillo E4"
    ]
  },
  {
    "id": "node-47",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 298,
    "y": 333,
    "connections": [
      "node-pasillo E5"
    ]
  },
  {
    "id": "node-48",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 294,
    "y": 315,
    "connections": [
      "node-pasillo E5"
    ]
  },
  {
    "id": "node-49",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 262,
    "y": 313,
    "connections": [
      "node-pasillo E4"
    ]
  },
  {
    "id": "node-50",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 244,
    "y": 311,
    "connections": [
      "node-pasillo E3"
    ]
  },
  {
    "id": "node-51",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 226,
    "y": 312,
    "connections": [
      "node-pasillo E3"
    ]
  },
  {
    "id": "node-52",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 196,
    "y": 313,
    "connections": [
      "node-pasillo E2"
    ]
  },
  {
    "id": "node-53",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 172,
    "y": 312,
    "connections": [
      "node-pasillo E1"
    ]
  },
  {
    "id": "node-54",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 149,
    "y": 313,
    "connections": [
      "node-pasillo E1"
    ]
  },
  {
    "id": "node-55",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 127,
    "y": 353,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-56",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 112,
    "y": 359,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-57",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 99,
    "y": 357,
    "connections": [
      "node-pasillo D1"
    ]
  },
  {
    "id": "node-58",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 99,
    "y": 376,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-59",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 98,
    "y": 390,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-60",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 108,
    "y": 405,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-61",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 90,
    "y": 405,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-62",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 77,
    "y": 405,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-63",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 65,
    "y": 399,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-64",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 69,
    "y": 387,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-65",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 66,
    "y": 372,
    "connections": [
      "node-pasillo D2"
    ]
  },
  {
    "id": "node-66",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 72,
    "y": 358,
    "connections": [
      "node-pasillo D1"
    ]
  },
  {
    "id": "node-67",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 75,
    "y": 344,
    "connections": [
      "node-pasillo D1"
    ]
  },
  {
    "id": "node-68",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 80,
    "y": 328,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-69",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 80,
    "y": 315,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-70",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 87,
    "y": 303,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-71",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 96,
    "y": 295,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-72",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 114,
    "y": 285,
    "connections": [
      "node-plaza Jardin"
    ]
  },
  {
    "id": "node-73",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 130,
    "y": 253,
    "connections": [
      "node-pasillo C3"
    ]
  },
  {
    "id": "node-74",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 149,
    "y": 234,
    "connections": [
      "node-pasillo C2"
    ]
  },
  {
    "id": "node-75",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 169,
    "y": 211,
    "connections": [
      "node-pasillo C1"
    ]
  },
  {
    "id": "node-76",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 189,
    "y": 195,
    "connections": [
      "node-plaza la Fuente"
    ]
  },
  {
    "id": "node-77",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 215,
    "y": 155,
    "connections": [
      "node-plaza la Fuente"
    ]
  },
  {
    "id": "node-78",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 232,
    "y": 154,
    "connections": [
      "node-plaza la Fuente"
    ]
  },
  {
    "id": "node-79",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 260,
    "y": 156,
    "connections": [
      "node-pasillo B5"
    ]
  },
  {
    "id": "node-80",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 286,
    "y": 150,
    "connections": [
      "node-pasillo B4"
    ]
  },
  {
    "id": "node-81",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 298,
    "y": 146,
    "connections": [
      "node-pasillo B4"
    ]
  },
  {
    "id": "node-82",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 312,
    "y": 145,
    "connections": [
      "node-pasillo B4"
    ]
  },
  {
    "id": "node-83",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 329,
    "y": 141,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-84",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 347,
    "y": 137,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-85",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 365,
    "y": 138,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-86",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 382,
    "y": 141,
    "connections": [
      "node-pasillo B2"
    ]
  },
  {
    "id": "node-87",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 399,
    "y": 148,
    "connections": [
      "node-pasillo B2"
    ]
  },
  {
    "id": "node-88",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 416,
    "y": 152,
    "connections": [
      "node-pasillo B1"
    ]
  },
  {
    "id": "node-89",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 443,
    "y": 160,
    "connections": [
      "node-plaza  el Arte"
    ]
  },
  {
    "id": "node-90",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 471,
    "y": 157,
    "connections": [
      "node-plaza  el Arte"
    ]
  },
  {
    "id": "node-91",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 490,
    "y": 164,
    "connections": [
      "node-plaza  el Arte"
    ]
  },
  {
    "id": "node-92",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 502,
    "y": 177,
    "connections": [
      "node-plaza  el Arte"
    ]
  },
  {
    "id": "node-93",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 506,
    "y": 200,
    "connections": [
      "node-pasillo A5"
    ]
  },
  {
    "id": "node-94",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 517,
    "y": 245,
    "connections": [
      "node-pasillo A4"
    ]
  },
  {
    "id": "node-95",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 500,
    "y": 228,
    "connections": [
      "node-pasillo A5"
    ]
  },
  {
    "id": "node-96",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 488,
    "y": 220,
    "connections": [
      "node-pasillo A5"
    ]
  },
  {
    "id": "node-97",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 462,
    "y": 224,
    "connections": []
  },
  {
    "id": "node-98",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 455,
    "y": 234,
    "connections": [
      "node-pasillo F2"
    ]
  },
  {
    "id": "node-99",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 444,
    "y": 243,
    "connections": [
      "node-pasillo F2"
    ]
  },
  {
    "id": "node-100",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 436,
    "y": 254,
    "connections": [
      "node-pasillo F2"
    ]
  },
  {
    "id": "node-101",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 428,
    "y": 267,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-102",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 415,
    "y": 278,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-103",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 406,
    "y": 289,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-104",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 397,
    "y": 300,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-105",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 382,
    "y": 279,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-106",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 399,
    "y": 266,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-107",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 411,
    "y": 251,
    "connections": [
      "node-pasillo F1"
    ]
  },
  {
    "id": "node-108",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 420,
    "y": 238,
    "connections": [
      "node-pasillo F2"
    ]
  },
  {
    "id": "node-109",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 428,
    "y": 228,
    "connections": [
      "node-pasillo F2"
    ]
  },
  {
    "id": "node-110",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 437,
    "y": 219,
    "connections": [
      "node-pasillo F2"
    ]
  },
  {
    "id": "node-111",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 432,
    "y": 186,
    "connections": [
      "node-pasillo B1"
    ]
  },
  {
    "id": "node-112",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 414,
    "y": 181,
    "connections": [
      "node-pasillo B1"
    ]
  },
  {
    "id": "node-113",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 395,
    "y": 175,
    "connections": [
      "node-pasillo B2"
    ]
  },
  {
    "id": "node-114",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 380,
    "y": 176,
    "connections": [
      "node-pasillo B2"
    ]
  },
  {
    "id": "node-115",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 369,
    "y": 176,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-116",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 354,
    "y": 175,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-117",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 340,
    "y": 176,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-118",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 322,
    "y": 170,
    "connections": [
      "node-pasillo B3"
    ]
  },
  {
    "id": "node-119",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 303,
    "y": 174,
    "connections": [
      "node-pasillo B4"
    ]
  },
  {
    "id": "node-120",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 282,
    "y": 178,
    "connections": [
      "node-pasillo B4"
    ]
  },
  {
    "id": "node-121",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 260,
    "y": 183,
    "connections": [
      "node-pasillo B5"
    ]
  },
  {
    "id": "node-122",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 248,
    "y": 208,
    "connections": [
      "node-plaza la Fuente"
    ]
  },
  {
    "id": "node-123",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 229,
    "y": 220,
    "connections": [
      "node-plaza la Fuente"
    ]
  },
  {
    "id": "node-124",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 203,
    "y": 214,
    "connections": [
      "node-plaza la Fuente"
    ]
  },
  {
    "id": "node-125",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 189,
    "y": 221,
    "connections": [
      "node-pasillo C1"
    ]
  },
  {
    "id": "node-126",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 179,
    "y": 233,
    "connections": [
      "node-pasillo C1"
    ]
  },
  {
    "id": "node-127",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 162,
    "y": 252,
    "connections": [
      "node-pasillo C2"
    ]
  },
  {
    "id": "node-128",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 150,
    "y": 265,
    "connections": [
      "node-pasillo C3"
    ]
  },
  {
    "id": "node-129",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 422,
    "y": 317,
    "connections": [
      "node-pasillo G2"
    ]
  },
  {
    "id": "node-130",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 439,
    "y": 315,
    "connections": [
      "node-pasillo G3",
      "node-pasillo G2"
    ]
  },
  {
    "id": "node-131",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 464,
    "y": 318,
    "connections": [
      "node-pasillo G3"
    ]
  },
  {
    "id": "node-132",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 499,
    "y": 317,
    "connections": [
      "node-pasillo G4"
    ]
  },
  {
    "id": "node-133",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 516,
    "y": 317,
    "connections": [
      "node-pasillo G5"
    ]
  },
  {
    "id": "node-134",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 509,
    "y": 340,
    "connections": [
      "node-pasillo G4"
    ]
  },
  {
    "id": "node-135",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 475,
    "y": 340,
    "connections": [
      "node-pasillo G3"
    ]
  },
  {
    "id": "node-136",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 450,
    "y": 340,
    "connections": [
      "node-pasillo G3"
    ]
  },
  {
    "id": "node-137",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 427,
    "y": 339,
    "connections": [
      "node-pasillo G2"
    ]
  },
  {
    "id": "node-138",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 406,
    "y": 338,
    "connections": [
      "node-pasillo G1"
    ]
  },
  {
    "id": "node-139",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 375,
    "y": 358,
    "connections": [
      "node-plaza Central"
    ]
  },
  {
    "id": "node-140",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 354,
    "y": 363,
    "connections": [
      "node-plaza Central"
    ]
  },
  {
    "id": "node-141",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 332,
    "y": 349,
    "connections": [
      "node-plaza Central"
    ]
  },
  {
    "id": "node-142",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 331,
    "y": 294,
    "connections": [
      "node-plaza Central"
    ]
  },
  {
    "id": "node-143",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 352,
    "y": 283,
    "connections": [
      "node-plaza Central"
    ]
  },
  {
    "id": "node-144",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 367,
    "y": 282,
    "connections": [
      "node-plaza Central"
    ]
  },
  {
    "id": "node-145",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 631,
    "y": 296,
    "connections": []
  },
  {
    "id": "node-146",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 619,
    "y": 335,
    "connections": [
      "node-plaza musica",
      "node-entrada A2"
    ]
  },
  {
    "id": "node-147",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 528,
    "y": 257,
    "connections": [
      "node-pasillo A3"
    ]
  },
  {
    "id": "node-148",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 540,
    "y": 273,
    "connections": [
      "node-pasillo A2"
    ]
  },
  {
    "id": "node-149",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 552,
    "y": 294,
    "connections": [
      "node-pasillo A1"
    ]
  },
  {
    "id": "node-150",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 542,
    "y": 318,
    "connections": [
      "node-pasillo G5"
    ]
  },
  {
    "id": "node-151",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 527,
    "y": 319,
    "connections": [
      "node-pasillo G5"
    ]
  },
  {
    "id": "node-152",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 520,
    "y": 214,
    "connections": [
      "node-pasillo A4"
    ]
  },
  {
    "id": "node-153",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 548,
    "y": 245,
    "connections": [
      "node-pasillo A3"
    ]
  },
  {
    "id": "node-154",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 571,
    "y": 284,
    "connections": [
      "node-pasillo A1"
    ]
  },
  {
    "id": "node-pasillo-baño-B",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 175,
    "y": 360,
    "connections": [
      "node-pasillo E1",
      "node-Baño B"
    ]
  },
  {
    "id": "node-pasillo-baño A",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 280,
    "y": 155,
    "connections": [
      "node-pasillo B5",
      "node-baño A"
    ]
  },
  {
    "id": "node-156",
    "floorId": "floor-autopista",
    "kind": "corridor",
    "x": 175,
    "y": 360,
    "connections": []
  },
  {
    "id": "door-local_117",
    "floorId": "floor-autopista",
    "kind": "door",
    "x": 177,
    "y": 400,
    "connections": [
      "node-Baño B"
    ]
  },
  {
    "id": "door-local_69",
    "floorId": "floor-autopista",
    "kind": "door",
    "x": 411,
    "y": 252,
    "connections": [
      "node-107"
    ]
  },
  {
    "id": "door-local_52",
    "floorId": "floor-autopista",
    "kind": "door",
    "x": 501,
    "y": 228,
    "connections": [
      "node-95"
    ]
  },
  {
    "id": "door-local_48",
    "floorId": "floor-autopista",
    "kind": "door",
    "x": 551,
    "y": 291,
    "connections": [
      "node-149"
    ]
  },
  {
    "id": "door-local_118",
    "floorId": "floor-autopista",
    "kind": "door",
    "x": 278,
    "y": 120,
    "connections": [
      "node-baño A"
    ]
  }
];
