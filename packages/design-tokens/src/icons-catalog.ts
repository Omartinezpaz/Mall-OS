/**
 * Mall OS - Sistema Oficial de Iconos y Catálogo de Assets Vectoriales (v2)
 * Tipado estricto con `as const`, kebab-case unificado y soporte dual (base + badge).
 */

export type MallOsIconGroup = 'category' | 'mall' | 'map' | 'navigation';

export interface MallOsIconDefinition {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly color: string;
  readonly symbolId: string;
  readonly badgeSymbolId: string;
  readonly group: MallOsIconGroup;
  readonly path: string;
}

/** Alias para compatibilidad */
export type MallOsIconMeta = MallOsIconDefinition;

export const MALLOS_ICONS = {
  // === CATEGORÍAS COMERCIALES ===
  moda: {
    id: 'moda',
    name: 'Moda y Ropa',
    category: 'Categorías',
    color: '#3B5AF1',
    symbolId: 'mallos-moda',
    badgeSymbolId: 'mallos-moda-badge',
    group: 'category',
    path: '<path d="M16 20L24 14L32 20L32 22L16 22Z M24 14C24 10 21 10 21 12" />',
  },
  restaurantes: {
    id: 'restaurantes',
    name: 'Restaurantes',
    category: 'Categorías',
    color: '#F97316',
    symbolId: 'mallos-restaurantes',
    badgeSymbolId: 'mallos-restaurantes-badge',
    group: 'category',
    path: '<path d="M19 14V22M16 14V22M22 14V22M16 22C16 25 22 25 22 22M19 25V34M28 14V34M28 14C31 14 31 18 28 18" />',
  },
  entretenimiento: {
    id: 'entretenimiento',
    name: 'Entretenimiento y Cines',
    category: 'Categorías',
    color: '#EC4899',
    symbolId: 'mallos-entretenimiento',
    badgeSymbolId: 'mallos-entretenimiento-badge',
    group: 'category',
    path: '<path d="M14 18H34V30H14Z M14 21C16 21 16 27 14 27 M34 21C32 21 32 27 34 27 M22 24H26" />',
  },
  belleza: {
    id: 'belleza',
    name: 'Belleza y Cosmética',
    category: 'Categorías',
    color: '#A855F7',
    symbolId: 'mallos-belleza',
    badgeSymbolId: 'mallos-belleza-badge',
    group: 'category',
    path: '<path d="M24 30C24 30 16 28 16 22C16 18 20 16 24 22C28 16 32 18 32 22C32 28 24 30 24 30Z M19 24C19 24 14 26 14 20C14 17 17 18 19 21 M29 24C29 24 34 26 34 20C34 17 31 18 29 21" />',
  },
  tecnologia: {
    id: 'tecnologia',
    name: 'Tecnología y Móviles',
    category: 'Categorías',
    color: '#06B6D4',
    symbolId: 'mallos-tecnologia',
    badgeSymbolId: 'mallos-tecnologia-badge',
    group: 'category',
    path: '<rect x="18" y="14" width="12" height="20" rx="2" /><path d="M24 30V30.01" />',
  },
  deportes: {
    id: 'deportes',
    name: 'Deportes y Fitness',
    category: 'Categorías',
    color: '#22C55E',
    symbolId: 'mallos-deportes',
    badgeSymbolId: 'mallos-deportes-badge',
    group: 'category',
    path: '<path d="M14 20V28M17 22V26M34 20V28M31 22V26M14 24H34" />',
  },
  hogar: {
    id: 'hogar',
    name: 'Hogar y Decoración',
    category: 'Categorías',
    color: '#14B8A6',
    symbolId: 'mallos-hogar',
    badgeSymbolId: 'mallos-hogar-badge',
    group: 'category',
    path: '<path d="M14 22L24 14L34 22 M18 20V32H30V20 M22 32V26H26V32" />',
  },
  salud: {
    id: 'salud',
    name: 'Salud y Farmacia',
    category: 'Categorías',
    color: '#EF4444',
    symbolId: 'mallos-salud',
    badgeSymbolId: 'mallos-salud-badge',
    group: 'category',
    path: '<path d="M24 16V32 M16 24H32" />',
  },
  servicios: {
    id: 'servicios',
    name: 'Servicios Generales',
    category: 'Categorías',
    color: '#64748B',
    symbolId: 'mallos-servicios',
    badgeSymbolId: 'mallos-servicios-badge',
    group: 'category',
    path: '<circle cx="24" cy="24" r="4" /><path d="M24 16V14 M24 34V32 M16 24H14 M34 24H32 M18.5 18.5L17 17 M29.5 29.5L31 31 M18.5 29.5L17 31 M29.5 18.5L31 17" />',
  },
  finanzas: {
    id: 'finanzas',
    name: 'Bancos y Finanzas',
    category: 'Categorías',
    color: '#F59E0B',
    symbolId: 'mallos-finanzas',
    badgeSymbolId: 'mallos-finanzas-badge',
    group: 'category',
    path: '<rect x="14" y="16" width="20" height="16" rx="2" /><path d="M14 22H34 M18 26H22" />',
  },
  supermercado: {
    id: 'supermercado',
    name: 'Supermercado',
    category: 'Categorías',
    color: '#3B82F6',
    symbolId: 'mallos-supermercado',
    badgeSymbolId: 'mallos-supermercado-badge',
    group: 'category',
    path: '<path d="M14 16H18L20 26H30L32 16H18 M21 30A1 1 0 1021 32 1 1 0 1021 30 M29 30A1 1 0 1029 32 1 1 0 1029 30" />',
  },
  'comida-rapida': {
    id: 'comida-rapida',
    name: 'Comida Rápida',
    category: 'Categorías',
    color: '#F43F5E',
    symbolId: 'mallos-comida-rapida',
    badgeSymbolId: 'mallos-comida-rapida-badge',
    group: 'category',
    path: '<path d="M14 26H34 M24 16C19 16 16 20 16 26 M32 26C32 20 29 16 24 16 M24 16V14" />',
  },
  libreria: {
    id: 'libreria',
    name: 'Librería y Papelería',
    category: 'Categorías',
    color: '#4F46E5',
    symbolId: 'mallos-libreria',
    badgeSymbolId: 'mallos-libreria-badge',
    group: 'category',
    path: '<path d="M24 16V30 M24 16C20 16 16 18 16 18V32C16 32 20 30 24 30 M24 16C28 16 32 18 32 18V32C32 32 28 30 24 30" />',
  },
  mascotas: {
    id: 'mascotas',
    name: 'Mascotas',
    category: 'Categorías',
    color: '#10B981',
    symbolId: 'mallos-mascotas',
    badgeSymbolId: 'mallos-mascotas-badge',
    group: 'category',
    path: '<path d="M24 28C21 28 18 25 18 22C18 19 21 18 24 18C27 18 30 19 30 22C30 25 27 28 24 28Z M19 16C18 16 16 17 16 19 M23 15C22 15 21 16 21 17 M25 15C26 15 27 16 27 17 M29 16C30 16 32 17 32 19" />',
  },
  automotriz: {
    id: 'automotriz',
    name: 'Automotriz',
    category: 'Categorías',
    color: '#0EA5E9',
    symbolId: 'mallos-automotriz',
    badgeSymbolId: 'mallos-automotriz-badge',
    group: 'category',
    path: '<path d="M16 22L18 18H30L32 22 M14 22H34V26H14Z M18 26V28H20V26 M28 26V28H30V26" />',
  },
  viajes: {
    id: 'viajes',
    name: 'Viajes y Turismo',
    category: 'Categorías',
    color: '#8B5CF6',
    symbolId: 'mallos-viajes',
    badgeSymbolId: 'mallos-viajes-badge',
    group: 'category',
    path: '<path d="M28 16L24 20L16 20L20 24L18 28L24 26L30 28L28 24L32 20L24 20Z" />',
  },
  regalos: {
    id: 'regalos',
    name: 'Regalos y Novedades',
    category: 'Comercio',
    color: '#E879F9',
    symbolId: 'mallos-regalos',
    badgeSymbolId: 'mallos-regalos-badge',
    group: 'category',
    path: '<rect x="16" y="20" width="16" height="12" /><path d="M14 20H34V24H14Z M24 20V32 M24 20C24 16 18 16 18 20C18 22 24 20 24 20Z M24 20C24 16 30 16 30 20C30 22 24 20 24 20Z" />',
  },
  fotografia: {
    id: 'fotografia',
    name: 'Fotografía y Óptica',
    category: 'Comercio',
    color: '#00BED0',
    symbolId: 'mallos-fotografia',
    badgeSymbolId: 'mallos-fotografia-badge',
    group: 'category',
    path: '<path d="M16 18H20L22 16H26L28 18H32V30H16Z M24 28C21.79 28 20 26.21 20 24C20 21.79 21.79 20 24 20C26.21 20 28 21.79 28 24C28 26.21 26.21 28 24 28Z" />',
  },
  'arte-cultura': {
    id: 'arte-cultura',
    name: 'Arte y Cultura',
    category: 'Comercio',
    color: '#F97316',
    symbolId: 'mallos-arte-cultura',
    badgeSymbolId: 'mallos-arte-cultura-badge',
    group: 'category',
    path: '<path d="M24 16C19.58 16 16 19.58 16 24C16 28.42 19.58 32 24 32C28.42 32 32 29 32 26C32 24.5 30 24.5 30 23C30 21.5 32 21.5 32 20C32 17.79 28.42 16 24 16Z M19 22V22.01 M21 19V19.01 M25 19V19.01 M28 22V22.01" />',
  },
  bebes: {
    id: 'bebes',
    name: 'Bebés y Maternidad',
    category: 'Comercio',
    color: '#6366F1',
    symbolId: 'mallos-bebes',
    badgeSymbolId: 'mallos-bebes-badge',
    group: 'category',
    path: '<circle cx="24" cy="24" r="7" /><path d="M24 17C24 14 24 14 24 14 M21 23V23.01 M27 23V23.01 M23 27H25" />',
  },
  otros: {
    id: 'otros',
    name: 'Otros Comercios',
    category: 'General',
    color: '#10B981',
    symbolId: 'mallos-otros',
    badgeSymbolId: 'mallos-otros-badge',
    group: 'category',
    path: '<circle cx="18" cy="24" r="1.5" fill="white" stroke="none"/><circle cx="24" cy="24" r="1.5" fill="white" stroke="none"/><circle cx="30" cy="24" r="1.5" fill="white" stroke="none"/>',
  },

  // === INFRAESTRUCTURA Y SERVICIOS DEL MALL ===
  escaleras: {
    id: 'escaleras',
    name: 'Escaleras',
    category: 'Mall',
    color: '#1E293B',
    symbolId: 'mallos-escaleras',
    badgeSymbolId: 'mallos-escaleras-badge',
    group: 'mall',
    path: '<path d="M16 30H20L26 22H30 M24 18V18.01" />',
  },
  'escalera-mecanica': {
    id: 'escalera-mecanica',
    name: 'Escalera Mecánica',
    category: 'Mall',
    color: '#0284C7',
    symbolId: 'mallos-escalera-mecanica',
    badgeSymbolId: 'mallos-escalera-mecanica-badge',
    group: 'mall',
    path: '<path d="M14 30H18L26 18H30 M20 22L24 18 M16 26L20 22" />',
  },
  ascensor: {
    id: 'ascensor',
    name: 'Ascensor',
    category: 'Mall',
    color: '#2563EB',
    symbolId: 'mallos-ascensor',
    badgeSymbolId: 'mallos-ascensor-badge',
    group: 'mall',
    path: '<rect x="16" y="14" width="16" height="20" rx="2" /><path d="M24 14V34 M20 24L20 20L18 22 M20 20L22 22 M28 24L28 20L26 22 M28 20L30 22" />',
  },
  banos: {
    id: 'banos',
    name: 'Baños Públicos',
    category: 'Mall',
    color: '#4ADE80',
    symbolId: 'mallos-banos',
    badgeSymbolId: 'mallos-banos-badge',
    group: 'mall',
    path: '<path d="M18 16V16.01 M26 16V16.01 M16 20H20V32H18V26H16Z M24 20L28 20L29 26H27V32H25V26H23L24 20Z" />',
  },
  cajero: {
    id: 'cajero',
    name: 'Cajero Automático (ATM)',
    category: 'Mall',
    color: '#64748B',
    symbolId: 'mallos-cajero',
    badgeSymbolId: 'mallos-cajero-badge',
    group: 'mall',
    path: '<rect x="16" y="16" width="16" height="16" rx="2" /><path d="M16 20H32 M20 26H24 M20 28H28" />',
  },
  seguridad: {
    id: 'seguridad',
    name: 'Puesto de Seguridad',
    category: 'Mall',
    color: '#475569',
    symbolId: 'mallos-seguridad',
    badgeSymbolId: 'mallos-seguridad-badge',
    group: 'mall',
    path: '<path d="M24 16L18 18V24C18 28 20 31 24 32C28 31 30 28 30 24V18L24 16Z M21 24L23 26L27 22" />',
  },
  informacion: {
    id: 'informacion',
    name: 'Módulo de Información',
    category: 'Mall',
    color: '#F43F5E',
    symbolId: 'mallos-informacion',
    badgeSymbolId: 'mallos-informacion-badge',
    group: 'mall',
    path: '<circle cx="24" cy="24" r="8" /><path d="M24 20V20.01 M24 22V28" />',
  },
  entrada: {
    id: 'entrada',
    name: 'Entrada Principal',
    category: 'Mall',
    color: '#10B981',
    symbolId: 'mallos-entrada',
    badgeSymbolId: 'mallos-entrada-badge',
    group: 'mall',
    path: '<path d="M16 16V32H24V24H28V32H32V16L24 12Z M20 24H20.01" />',
  },
  salida: {
    id: 'salida',
    name: 'Salida de Emergencia',
    category: 'Mall',
    color: '#DC2626',
    symbolId: 'mallos-salida',
    badgeSymbolId: 'mallos-salida-badge',
    group: 'mall',
    path: '<path d="M18 16H28V32H18 M24 24L32 24M28 20L32 24L28 28" />',
  },
  parking: {
    id: 'parking',
    name: 'Estacionamiento',
    category: 'Mall',
    color: '#3B82F6',
    symbolId: 'mallos-parking',
    badgeSymbolId: 'mallos-parking-badge',
    group: 'mall',
    path: '<rect x="16" y="14" width="16" height="20" rx="3" /><path d="M22 18H26C27.5 18 28.5 19 28.5 20.5C28.5 22 27.5 23 26 23H22V29" />',
  },

  // === NAVEGACIÓN Y USUARIO ===
  ubicacion: {
    id: 'ubicacion',
    name: 'Ubicación / POI',
    category: 'Navegación',
    color: '#3B82F6',
    symbolId: 'mallos-ubicacion',
    badgeSymbolId: 'mallos-ubicacion-badge',
    group: 'navigation',
    path: '<path d="M24 16C20.69 16 18 18.69 18 22C18 27 24 32 24 32C24 32 30 27 30 22C30 18.69 27.31 16 24 16Z M24 24C22.9 24 22 23.1 22 22C22 20.9 22.9 20 24 20C25.1 20 26 20.9 26 22C26 23.1 25.1 24 24 24Z" />',
  },
  'user-location': {
    id: 'user-location',
    name: 'Posición del Usuario',
    category: 'Navegación',
    color: '#6366F1',
    symbolId: 'mallos-user-location',
    badgeSymbolId: 'mallos-user-location-badge',
    group: 'navigation',
    path: '<circle cx="24" cy="24" r="5" /><circle cx="24" cy="24" r="9" stroke-dasharray="2 2" />',
  },
  'tu-cuenta': {
    id: 'tu-cuenta',
    name: 'Tu Cuenta / Perfil',
    category: 'Usuario',
    color: '#A5B4FC',
    symbolId: 'mallos-tu-cuenta',
    badgeSymbolId: 'mallos-tu-cuenta-badge',
    group: 'navigation',
    path: '<circle cx="24" cy="20" r="4" /><path d="M16 32C16 28 20 26 24 26C28 26 32 28 32 32" />',
  },
  promociones: {
    id: 'promociones',
    name: 'Promociones y Ofertas',
    category: 'Beneficios',
    color: '#EF4444',
    symbolId: 'mallos-promociones',
    badgeSymbolId: 'mallos-promociones-badge',
    group: 'navigation',
    path: '<path d="M24 16L26.47 21.02L32 21.82L28 25.72L28.94 31.22L24 28.62L19.06 31.22L20 25.72L16 21.82L21.53 21.02L24 16Z" />',
  },
  descuentos: {
    id: 'descuentos',
    name: 'Cupones de Descuento',
    category: 'Beneficios',
    color: '#8B5CF6',
    symbolId: 'mallos-descuentos',
    badgeSymbolId: 'mallos-descuentos-badge',
    group: 'navigation',
    path: '<path d="M16 20L20 16H28L32 20V28L28 32H20L16 28V20Z M20 22L28 26 M21 26V26.01 M27 22V22.01" />',
  },
  sostenibilidad: {
    id: 'sostenibilidad',
    name: 'Sostenibilidad',
    category: 'General',
    color: '#10B981',
    symbolId: 'mallos-sostenibilidad',
    badgeSymbolId: 'mallos-sostenibilidad-badge',
    group: 'navigation',
    path: '<path d="M16 24C16 18 20 16 26 16C32 16 32 22 32 28C32 34 26 34 26 34C20 34 16 30 16 24Z M16 34L26 24" />',
  },

  // === ELEMENTOS DEL ENTORNO DEL MAPA (2D / POI) ===
  arbol: {
    id: 'arbol',
    name: 'Árbol / Jardinera',
    category: 'Entorno',
    color: '#10B981',
    symbolId: 'mallos-arbol',
    badgeSymbolId: 'mallos-arbol-badge',
    group: 'map',
    path: '<circle cx="24" cy="20" r="6" /><path d="M24 26V32M21 29L24 26L27 29" />',
  },
  'banco-asiento': {
    id: 'banco-asiento',
    name: 'Banco de Descanso',
    category: 'Entorno',
    color: '#78716C',
    symbolId: 'mallos-banco-asiento',
    badgeSymbolId: 'mallos-banco-asiento-badge',
    group: 'map',
    path: '<path d="M16 24H32 M16 20H32 M18 24V29 M30 24V29 M16 20V29 M32 20V29" />',
  },
  fuente: {
    id: 'fuente',
    name: 'Fuente / Atrio',
    category: 'Entorno',
    color: '#0284C7',
    symbolId: 'mallos-fuente',
    badgeSymbolId: 'mallos-fuente-badge',
    group: 'map',
    path: '<ellipse cx="24" cy="28" rx="10" ry="4" /><path d="M24 28V16 M20 20C20 16 24 16 24 16C24 16 28 16 28 20" />',
  },
  papelera: {
    id: 'papelera',
    name: 'Punto Limpio / Papelera',
    category: 'Entorno',
    color: '#64748B',
    symbolId: 'mallos-papelera',
    badgeSymbolId: 'mallos-papelera-badge',
    group: 'map',
    path: '<path d="M18 18H30L28 30H20L18 18Z M16 18H32 M22 15H26" />',
  },
} as const;

/** Identificador tipado exhaustivo de todos los iconos oficiales Mall OS */
export type MallOsIconId = keyof typeof MALLOS_ICONS;

/** Lista estructurada para renderizado en galerías, filtros y selectores */
export const MALLOS_ICONS_LIST: readonly MallOsIconDefinition[] = Object.values(MALLOS_ICONS);

/** Diccionario de colores indexado */
export const MALLOS_ICON_COLORS: Record<MallOsIconId, string> = Object.fromEntries(
  Object.entries(MALLOS_ICONS).map(([k, v]) => [k as MallOsIconId, v.color])
) as Record<MallOsIconId, string>;

/** Diccionario de paths vectoriales indexado */
export const MALLOS_ICON_PATHS: Record<MallOsIconId, string> = Object.fromEntries(
  Object.entries(MALLOS_ICONS).map(([k, v]) => [k as MallOsIconId, v.path])
) as Record<MallOsIconId, string>;

/**
 * Normaliza nombres o identificadores heredados (snake_case o con prefijo) al identificador canónico kebab-case.
 */
export function normalizeMallOsIconId(rawId: string): MallOsIconId {
  const clean = rawId
    .toLowerCase()
    .replace(/^mallos-/, '')
    .replace(/_/g, '-');

  if (clean in MALLOS_ICONS) {
    return clean as MallOsIconId;
  }

  // Alias comunes de compatibilidad
  if (clean === 'comida' || clean === 'comidas') return 'restaurantes';
  if (clean === 'cuenta' || clean === 'perfil') return 'tu-cuenta';
  if (clean === 'farmacia') return 'salud';
  if (clean === 'banco') return 'finanzas';
  if (clean === 'parking-discapacitados') return 'parking';

  return 'otros';
}

/**
 * Obtiene la definición completa de un icono con validación de tipo.
 */
export function getMallOsIcon(id: string): MallOsIconDefinition {
  const canonicalId = normalizeMallOsIconId(id);
  return MALLOS_ICONS[canonicalId];
}

/**
 * Genera el string SVG para un icono base (solo trazo vectorial transparente).
 */
export function getIconSymbolSvg(
  id: string,
  strokeColor: string = 'currentColor',
  size: number = 24
): string {
  const icon = getMallOsIcon(id);
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${icon.path}
  </g>
</svg>`;
}

/**
 * Genera el string SVG para un icono badge (símbolo sobre círculo de color de categoría).
 */
export function getIconBadgeSvg(
  id: string,
  customBgColor?: string,
  strokeColor: string = '#FFFFFF',
  size: number = 48
): string {
  const icon = getMallOsIcon(id);
  const bg = customBgColor || icon.color;
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="22" fill="${bg}" />
  <g stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${icon.path}
  </g>
</svg>`;
}
