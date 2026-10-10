/**
 * Paleta por categoría de local (mapa, chips, iconos).
 * fill = relleno suave · stroke = borde/ícono · ink = texto sobre el relleno.
 * Regla: el mapa NUNCA depende solo del color; cada categoría lleva también un ícono.
 */
export type CategoryKey =
  | 'food' // panaderías, restaurantes, charcutería, comida rápida
  | 'fresh' // supermercado, mercado
  | 'health' // farmacias
  | 'fitness' // gimnasio
  | 'home' // mueblería, hogar
  | 'finance' // bancos
  | 'fashion'
  | 'entertainment'
  | 'services'
  | 'other';

export interface CategoryColor {
  readonly fill: string;
  readonly stroke: string;
  readonly ink: string;
}

export const categoryColors: Readonly<Record<CategoryKey, CategoryColor>> = {
  food: { fill: '#FEF9EE', stroke: '#CBD5E1', ink: '#92400E' },
  fresh: { fill: '#F0FDF4', stroke: '#CBD5E1', ink: '#166534' },
  health: { fill: '#F0FDFA', stroke: '#CBD5E1', ink: '#115E59' },
  fitness: { fill: '#FFF7ED', stroke: '#CBD5E1', ink: '#9A3412' },
  home: { fill: '#FFF1F2', stroke: '#CBD5E1', ink: '#9F1239' },
  finance: { fill: '#EFF6FF', stroke: '#CBD5E1', ink: '#1E40AF' },
  fashion: { fill: '#FDF2F8', stroke: '#CBD5E1', ink: '#9D174D' },
  entertainment: { fill: '#F5F3FF', stroke: '#CBD5E1', ink: '#5B21B6' },
  services: { fill: '#F8FAFC', stroke: '#CBD5E1', ink: '#1E293B' },
  other: { fill: '#F8FAFC', stroke: '#CBD5E1', ink: '#334155' },
};

/** Convierte el `slug` de categoría de la base de datos a una clave de paleta. */
export function categoryKeyFromSlug(slug: string): CategoryKey {
  return slug in categoryColors ? (slug as CategoryKey) : 'other';
}

/** Alias para el motor de mapas y componentes isométricos */
export const categoryPalette = categoryColors;
export type CategoryPalette = typeof categoryPalette;
