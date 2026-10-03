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
  food: { fill: '#FEF3C7', stroke: '#D97706', ink: '#92400E' },
  fresh: { fill: '#DCFCE7', stroke: '#16A34A', ink: '#166534' },
  health: { fill: '#CCFBF1', stroke: '#0D9488', ink: '#115E59' },
  fitness: { fill: '#FFEDD5', stroke: '#EA580C', ink: '#9A3412' },
  home: { fill: '#FFE4E6', stroke: '#E11D48', ink: '#9F1239' },
  finance: { fill: '#DBEAFE', stroke: '#2563EB', ink: '#1E40AF' },
  fashion: { fill: '#FCE7F3', stroke: '#DB2777', ink: '#9D174D' },
  entertainment: { fill: '#EDE9FE', stroke: '#7C3AED', ink: '#5B21B6' },
  services: { fill: '#F1F5F9', stroke: '#475569', ink: '#1E293B' },
  other: { fill: '#F1F5F9', stroke: '#475569', ink: '#1E293B' },
};

/** Convierte el `slug` de categoría de la base de datos a una clave de paleta. */
export function categoryKeyFromSlug(slug: string): CategoryKey {
  return slug in categoryColors ? (slug as CategoryKey) : 'other';
}

/** Alias para el motor de mapas y componentes isométricos */
export const categoryPalette = categoryColors;
export type CategoryPalette = typeof categoryPalette;
