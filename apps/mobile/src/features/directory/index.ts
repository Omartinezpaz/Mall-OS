import { PILOT_STORES, LocalStoreItem } from './data';

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

export function getStoreById(id: string): LocalStoreItem | undefined {
  return PILOT_STORES.find((s) => s.id === id || s.slug === id);
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
