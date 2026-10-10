import { PILOT_STORES, LocalStoreItem } from './data';
import {
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
} from '@mallos/map-engine';

export * from './data';

export function filterStores(
  stores: LocalStoreItem[],
  search: string,
  categorySlug?: string,
  floor?: number,
): LocalStoreItem[] {
  const query = search.trim().toLowerCase();
  return stores.filter((store) => {
    const matchesSearch =
      query === '' ||
      store.name.toLowerCase().includes(query) ||
      store.description.toLowerCase().includes(query) ||
      store.unit.toLowerCase().includes(query) ||
      store.category.toLowerCase().includes(query);

    const matchesCategory = !categorySlug || store.categorySlug === categorySlug;
    const matchesFloor = floor === undefined || store.floor === floor;

    return matchesSearch && matchesCategory && matchesFloor;
  });
}

export * from './storeAssets';

const STORE_ID_ALIASES: Record<string, string> = {
  local_farmatodo: 'farmatodo',
  local_40: 'farmatodo',
  st_pb_01: 'zara',
  st_pb_02: 'nike_sambil',
  nike: 'nike_sambil',
  local_cines_unidos: 'cines_unidos',
  local_43: 'cines_unidos',
  local_4: 'tijerazo',
  local_110: 'local_bnc',
  bnc: 'local_bnc',
  local_77: 'local_77',
  banco_provincial: 'local_77',
  provincial: 'local_77',
  local_18: 'local_18',
  banco_del_tesoro: 'local_18',
  local_8: 'local_8',
  palacio_del_blumer: 'local_8',
  local_1: 'local_1',
  liah_spa: 'local_1',
  local_10: 'local_10',
  sansa: 'local_10',
  local_9: 'local_9',
  bath_body: 'local_9',
};

export function getStoreById(id?: string): LocalStoreItem | undefined {
  if (!id) return undefined;

  const targetId = STORE_ID_ALIASES[id] || id;

  // 1. Buscar coincidencia exacta o por slug en PILOT_STORES
  const pilot = PILOT_STORES.find(
    (s) => s.id === id || s.slug === id || s.id === targetId || s.slug === targetId
  );
  if (pilot) return pilot;

  // 2. Buscar en sambilMall.stores (locales del mapa interactivo CAD)
  const mallStore = sambilMall.stores.find(
    (s) =>
      s.id === id ||
      s.slug === id ||
      s.id === targetId ||
      s.slug === targetId ||
      (s as any).aliases?.includes(id) ||
      (s as any).aliases?.includes(targetId)
  );

  if (mallStore) {
    let floorNum = 1;
    let floorName = 'Nivel Autopista';
    if (mallStore.floorId === LEVEL_ACUARIO) {
      floorNum = 2;
      floorName = 'Nivel Acuario';
    } else if (mallStore.floorId === LEVEL_LIBERTADOR) {
      floorNum = 3;
      floorName = 'Nivel Libertador';
    } else if (mallStore.floorId === LEVEL_FERIA) {
      floorNum = 4;
      floorName = 'Nivel Feria';
    } else if (mallStore.floorId === LEVEL_DIVERSION) {
      floorNum = 5;
      floorName = 'Nivel Diversión';
    }

    const rawName = mallStore.name || '';
    const isLegible = !rawName.toLowerCase().includes('no legible') && rawName.trim().length > 0;
    const cleanName = isLegible ? rawName : `Local ${mallStore.id.toUpperCase()}`;

    return {
      id: mallStore.id,
      slug: mallStore.slug || mallStore.id,
      name: cleanName,
      description: `${cleanName} es una de las principales tiendas en Sambil. Su modelo abarca el diseño, calidad y atención personalizada para toda la familia.`,
      category: mallStore.category
        ? mallStore.category.charAt(0).toUpperCase() + mallStore.category.slice(1)
        : 'Moda y Calzado',
      categorySlug: mallStore.category || 'fashion',
      floor: floorNum,
      floorName,
      unit: `Local ${mallStore.id.toUpperCase()}`,
      phone: '+582120000000',
      openingHours: {
        mon: [['10:00', '21:00']],
        tue: [['10:00', '21:00']],
        wed: [['10:00', '21:00']],
        thu: [['10:00', '21:00']],
        fri: [['10:00', '22:30']],
        sat: [['10:00', '22:30']],
        sun: [['11:00', '20:00']],
      },
      canPublishOffers: true,
      hasActiveOffers: true,
    };
  }

  return undefined;
}

export function getCategories() {
  const map = new Map<string, { slug: string; name: string; count: number }>();
  PILOT_STORES.forEach((s) => {
    const existing = map.get(s.categorySlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(s.categorySlug, { slug: s.categorySlug, name: s.category, count: 1 });
    }
  });
  return Array.from(map.values());
}
