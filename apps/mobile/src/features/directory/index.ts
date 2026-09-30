import type { Store } from '@mallos/types';

export function filterStores(stores: Store[], search: string, categoryId?: string): Store[] {
  const query = search.trim().toLowerCase();
  return stores.filter((store) => {
    const matchesSearch =
      query === '' ||
      store.name.toLowerCase().includes(query) ||
      (store.description && store.description.toLowerCase().includes(query)) ||
      (store.unit && store.unit.toLowerCase().includes(query));

    const matchesCategory = !categoryId || store.category_id === categoryId;

    return matchesSearch && matchesCategory;
  });
}
