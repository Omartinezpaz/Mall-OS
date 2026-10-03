/**
 * Mall OS - Generador Oficial de Iconos y SVG Sprites (v2)
 *
 * Genera:
 * 1. Iconos base (solo símbolo vectorial sin círculo de fondo)
 * 2. Iconos badge (símbolo + círculo de color de categoría)
 * 3. SVG Sprite oficial (`mall-os-icons.svg`) con <symbol id="mallos-..."> y <symbol id="mallos-...-badge">
 * 4. Distribución en carpetas por categoría (categories, mall, map, navigation)
 */

const fs = require('fs');
const path = require('path');

// Iconos oficiales tipados y organizados
const ICONS = {
  // === CATEGORÍAS ===
  moda: {
    name: 'Moda y Ropa',
    category: 'categories',
    color: '#3B5AF1',
    symbolId: 'mallos-moda',
    path: '<path d="M16 20L24 14L32 20L32 22L16 22Z M24 14C24 10 21 10 21 12" />',
  },
  restaurantes: {
    name: 'Restaurantes',
    category: 'categories',
    color: '#F97316',
    symbolId: 'mallos-restaurantes',
    path: '<path d="M19 14V22M16 14V22M22 14V22M16 22C16 25 22 25 22 22M19 25V34M28 14V34M28 14C31 14 31 18 28 18" />',
  },
  entretenimiento: {
    name: 'Entretenimiento y Cines',
    category: 'categories',
    color: '#EC4899',
    symbolId: 'mallos-entretenimiento',
    path: '<path d="M14 18H34V30H14Z M14 21C16 21 16 27 14 27 M34 21C32 21 32 27 34 27 M22 24H26" />',
  },
  belleza: {
    name: 'Belleza y Cosmética',
    category: 'categories',
    color: '#A855F7',
    symbolId: 'mallos-belleza',
    path: '<path d="M24 30C24 30 16 28 16 22C16 18 20 16 24 22C28 16 32 18 32 22C32 28 24 30 24 30Z M19 24C19 24 14 26 14 20C14 17 17 18 19 21 M29 24C29 24 34 26 34 20C34 17 31 18 29 21" />',
  },
  tecnologia: {
    name: 'Tecnología y Móviles',
    category: 'categories',
    color: '#06B6D4',
    symbolId: 'mallos-tecnologia',
    path: '<rect x="18" y="14" width="12" height="20" rx="2" /><path d="M24 30V30.01" />',
  },
  deportes: {
    name: 'Deportes y Fitness',
    category: 'categories',
    color: '#22C55E',
    symbolId: 'mallos-deportes',
    path: '<path d="M14 20V28M17 22V26M34 20V28M31 22V26M14 24H34" />',
  },
  hogar: {
    name: 'Hogar y Decoración',
    category: 'categories',
    color: '#14B8A6',
    symbolId: 'mallos-hogar',
    path: '<path d="M14 22L24 14L34 22 M18 20V32H30V20 M22 32V26H26V32" />',
  },
  salud: {
    name: 'Salud y Farmacia',
    category: 'categories',
    color: '#EF4444',
    symbolId: 'mallos-salud',
    path: '<path d="M24 16V32 M16 24H32" />',
  },
  servicios: {
    name: 'Servicios Generales',
    category: 'categories',
    color: '#64748B',
    symbolId: 'mallos-servicios',
    path: '<circle cx="24" cy="24" r="4" /><path d="M24 16V14 M24 34V32 M16 24H14 M34 24H32 M18.5 18.5L17 17 M29.5 29.5L31 31 M18.5 29.5L17 31 M29.5 18.5L31 17" />',
  },
  finanzas: {
    name: 'Bancos y Finanzas',
    category: 'categories',
    color: '#F59E0B',
    symbolId: 'mallos-finanzas',
    path: '<rect x="14" y="16" width="20" height="16" rx="2" /><path d="M14 22H34 M18 26H22" />',
  },
  supermercado: {
    name: 'Supermercado',
    category: 'categories',
    color: '#3B82F6',
    symbolId: 'mallos-supermercado',
    path: '<path d="M14 16H18L20 26H30L32 16H18 M21 30A1 1 0 1021 32 1 1 0 1021 30 M29 30A1 1 0 1029 32 1 1 0 1029 30" />',
  },
  'comida-rapida': {
    name: 'Comida Rápida',
    category: 'categories',
    color: '#F43F5E',
    symbolId: 'mallos-comida-rapida',
    path: '<path d="M14 26H34 M24 16C19 16 16 20 16 26 M32 26C32 20 29 16 24 16 M24 16V14" />',
  },
  libreria: {
    name: 'Librería y Papelería',
    category: 'categories',
    color: '#4F46E5',
    symbolId: 'mallos-libreria',
    path: '<path d="M24 16V30 M24 16C20 16 16 18 16 18V32C16 32 20 30 24 30 M24 16C28 16 32 18 32 18V32C32 32 28 30 24 30" />',
  },
  mascotas: {
    name: 'Mascotas',
    category: 'categories',
    color: '#10B981',
    symbolId: 'mallos-mascotas',
    path: '<path d="M24 28C21 28 18 25 18 22C18 19 21 18 24 18C27 18 30 19 30 22C30 25 27 28 24 28Z M19 16C18 16 16 17 16 19 M23 15C22 15 21 16 21 17 M25 15C26 15 27 16 27 17 M29 16C30 16 32 17 32 19" />',
  },
  automotriz: {
    name: 'Automotriz',
    category: 'categories',
    color: '#0EA5E9',
    symbolId: 'mallos-automotriz',
    path: '<path d="M16 22L18 18H30L32 22 M14 22H34V26H14Z M18 26V28H20V26 M28 26V28H30V26" />',
  },
  viajes: {
    name: 'Viajes y Turismo',
    category: 'categories',
    color: '#8B5CF6',
    symbolId: 'mallos-viajes',
    path: '<path d="M28 16L24 20L16 20L20 24L18 28L24 26L30 28L28 24L32 20L24 20Z" />',
  },
  regalos: {
    name: 'Regalos y Novedades',
    category: 'categories',
    color: '#E879F9',
    symbolId: 'mallos-regalos',
    path: '<rect x="16" y="20" width="16" height="12" /><path d="M14 20H34V24H14Z M24 20V32 M24 20C24 16 18 16 18 20C18 22 24 20 24 20Z M24 20C24 16 30 16 30 20C30 22 24 20 24 20Z" />',
  },
  fotografia: {
    name: 'Fotografía y Óptica',
    category: 'categories',
    color: '#00BED0',
    symbolId: 'mallos-fotografia',
    path: '<path d="M16 18H20L22 16H26L28 18H32V30H16Z M24 28C21.79 28 20 26.21 20 24C20 21.79 21.79 20 24 20C26.21 20 28 21.79 28 24C28 26.21 26.21 28 24 28Z" />',
  },
  'arte-cultura': {
    name: 'Arte y Cultura',
    category: 'categories',
    color: '#F97316',
    symbolId: 'mallos-arte-cultura',
    path: '<path d="M24 16C19.58 16 16 19.58 16 24C16 28.42 19.58 32 24 32C28.42 32 32 29 32 26C32 24.5 30 24.5 30 23C30 21.5 32 21.5 32 20C32 17.79 28.42 16 24 16Z M19 22V22.01 M21 19V19.01 M25 19V19.01 M28 22V22.01" />',
  },
  bebes: {
    name: 'Bebés y Maternidad',
    category: 'categories',
    color: '#6366F1',
    symbolId: 'mallos-bebes',
    path: '<circle cx="24" cy="24" r="7" /><path d="M24 17C24 14 24 14 24 14 M21 23V23.01 M27 23V23.01 M23 27H25" />',
  },
  otros: {
    name: 'Otros Comercios',
    category: 'categories',
    color: '#10B981',
    symbolId: 'mallos-otros',
    path: '<circle cx="18" cy="24" r="1.5" fill="white" stroke="none"/><circle cx="24" cy="24" r="1.5" fill="white" stroke="none"/><circle cx="30" cy="24" r="1.5" fill="white" stroke="none"/>',
  },

  // === INFRAESTRUCTURA DEL MALL ===
  escaleras: {
    name: 'Escaleras',
    category: 'mall',
    color: '#1E293B',
    symbolId: 'mallos-escaleras',
    path: '<path d="M16 30H20L26 22H30 M24 18V18.01" />',
  },
  'escalera-mecanica': {
    name: 'Escalera Mecánica',
    category: 'mall',
    color: '#0284C7',
    symbolId: 'mallos-escalera-mecanica',
    path: '<path d="M14 30H18L26 18H30 M20 22L24 18 M16 26L20 22" />',
  },
  ascensor: {
    name: 'Ascensor',
    category: 'mall',
    color: '#2563EB',
    symbolId: 'mallos-ascensor',
    path: '<rect x="16" y="14" width="16" height="20" rx="2" /><path d="M24 14V34 M20 24L20 20L18 22 M20 20L22 22 M28 24L28 20L26 22 M28 20L30 22" />',
  },
  banos: {
    name: 'Baños Públicos',
    category: 'mall',
    color: '#4ADE80',
    symbolId: 'mallos-banos',
    path: '<path d="M18 16V16.01 M26 16V16.01 M16 20H20V32H18V26H16Z M24 20L28 20L29 26H27V32H25V26H23L24 20Z" />',
  },
  cajero: {
    name: 'Cajero Automático',
    category: 'mall',
    color: '#64748B',
    symbolId: 'mallos-cajero',
    path: '<rect x="16" y="16" width="16" height="16" rx="2" /><path d="M16 20H32 M20 26H24 M20 28H28" />',
  },
  seguridad: {
    name: 'Seguridad',
    category: 'mall',
    color: '#475569',
    symbolId: 'mallos-seguridad',
    path: '<path d="M24 16L18 18V24C18 28 20 31 24 32C28 31 30 28 30 24V18L24 16Z M21 24L23 26L27 22" />',
  },
  informacion: {
    name: 'Información',
    category: 'mall',
    color: '#F43F5E',
    symbolId: 'mallos-informacion',
    path: '<circle cx="24" cy="24" r="8" /><path d="M24 20V20.01 M24 22V28" />',
  },
  entrada: {
    name: 'Entrada Principal',
    category: 'mall',
    color: '#10B981',
    symbolId: 'mallos-entrada',
    path: '<path d="M16 16V32H24V24H28V32H32V16L24 12Z M20 24H20.01" />',
  },
  salida: {
    name: 'Salida',
    category: 'mall',
    color: '#DC2626',
    symbolId: 'mallos-salida',
    path: '<path d="M18 16H28V32H18 M24 24L32 24M28 20L32 24L28 28" />',
  },
  parking: {
    name: 'Estacionamiento',
    category: 'mall',
    color: '#3B82F6',
    symbolId: 'mallos-parking',
    path: '<rect x="16" y="14" width="16" height="20" rx="3" /><path d="M22 18H26C27.5 18 28.5 19 28.5 20.5C28.5 22 27.5 23 26 23H22V29" />',
  },

  // === NAVEGACIÓN ===
  ubicacion: {
    name: 'Ubicación',
    category: 'navigation',
    color: '#3B82F6',
    symbolId: 'mallos-ubicacion',
    path: '<path d="M24 16C20.69 16 18 18.69 18 22C18 27 24 32 24 32C24 32 30 27 30 22C30 18.69 27.31 16 24 16Z M24 24C22.9 24 22 23.1 22 22C22 20.9 22.9 20 24 20C25.1 20 26 20.9 26 22C26 23.1 25.1 24 24 24Z" />',
  },
  'user-location': {
    name: 'Posición Usuario',
    category: 'navigation',
    color: '#6366F1',
    symbolId: 'mallos-user-location',
    path: '<circle cx="24" cy="24" r="5" /><circle cx="24" cy="24" r="9" stroke-dasharray="2 2" />',
  },
  'tu-cuenta': {
    name: 'Tu Cuenta',
    category: 'navigation',
    color: '#A5B4FC',
    symbolId: 'mallos-tu-cuenta',
    path: '<circle cx="24" cy="20" r="4" /><path d="M16 32C16 28 20 26 24 26C28 26 32 28 32 32" />',
  },
  promociones: {
    name: 'Promociones',
    category: 'navigation',
    color: '#EF4444',
    symbolId: 'mallos-promociones',
    path: '<path d="M24 16L26.47 21.02L32 21.82L28 25.72L28.94 31.22L24 28.62L19.06 31.22L20 25.72L16 21.82L21.53 21.02L24 16Z" />',
  },
  descuentos: {
    name: 'Descuentos',
    category: 'navigation',
    color: '#8B5CF6',
    symbolId: 'mallos-descuentos',
    path: '<path d="M16 20L20 16H28L32 20V28L28 32H20L16 28V20Z M20 22L28 26 M21 26V26.01 M27 22V22.01" />',
  },
  sostenibilidad: {
    name: 'Sostenibilidad',
    category: 'navigation',
    color: '#10B981',
    symbolId: 'mallos-sostenibilidad',
    path: '<path d="M16 24C16 18 20 16 26 16C32 16 32 22 32 28C32 34 26 34 26 34C20 34 16 30 16 24Z M16 34L26 24" />',
  },

  // === ENTORNO DEL MAPA ===
  arbol: {
    name: 'Árbol',
    category: 'map',
    color: '#10B981',
    symbolId: 'mallos-arbol',
    path: '<circle cx="24" cy="20" r="6" /><path d="M24 26V32M21 29L24 26L27 29" />',
  },
  'banco-asiento': {
    name: 'Banco de Descanso',
    category: 'map',
    color: '#78716C',
    symbolId: 'mallos-banco-asiento',
    path: '<path d="M16 24H32 M16 20H32 M18 24V29 M30 24V29 M16 20V29 M32 20V29" />',
  },
  fuente: {
    name: 'Fuente',
    category: 'map',
    color: '#0284C7',
    symbolId: 'mallos-fuente',
    path: '<ellipse cx="24" cy="28" rx="10" ry="4" /><path d="M24 28V16 M20 20C20 16 24 16 24 16C24 16 28 16 28 20" />',
  },
  papelera: {
    name: 'Papelera',
    category: 'map',
    color: '#64748B',
    symbolId: 'mallos-papelera',
    path: '<path d="M18 18H30L28 30H20L18 18Z M16 18H32 M22 15H26" />',
  },
};

const rootDir = path.join(__dirname, '..');

const targetRoots = [
  path.join(rootDir, 'packages', 'design-tokens', 'icons'),
  path.join(rootDir, 'apps', 'landing', 'public', 'icons'),
  path.join(rootDir, 'apps', 'mobile', 'assets', 'icons'),
];

// 1. Crear estructura de carpetas
const subfolders = ['base', 'badges', 'categories', 'mall', 'map', 'navigation'];

targetRoots.forEach((baseDir) => {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  subfolders.forEach((sub) => {
    const fullSub = path.join(baseDir, sub);
    if (!fs.existsSync(fullSub)) {
      fs.mkdirSync(fullSub, { recursive: true });
    }
  });
});

let generatedCount = 0;
const spriteSymbols = [];

Object.entries(ICONS).forEach(([key, icon]) => {
  // A. SVG Base (símbolo transparente con trazo)
  const baseSvg = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${icon.path}
  </g>
</svg>
`;

  // B. SVG Badge (círculo coloreado + trazo blanco)
  const badgeSvg = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="22" fill="${icon.color}" />
  <g stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${icon.path}
  </g>
</svg>
`;

  // C. Guardar archivos individuales
  targetRoots.forEach((baseDir) => {
    // Archivo en raíz de icons para retrocompatibilidad
    fs.writeFileSync(path.join(baseDir, `${key}.svg`), badgeSvg);

    // Archivo en base/
    fs.writeFileSync(path.join(baseDir, 'base', `${key}.svg`), baseSvg);

    // Archivo en badges/
    fs.writeFileSync(path.join(baseDir, 'badges', `${key}.svg`), badgeSvg);

    // Archivo en carpeta temática (ej. categories/moda.svg)
    fs.writeFileSync(path.join(baseDir, icon.category, `${key}.svg`), badgeSvg);
  });

  // D. Símbolos para el SVG Sprite
  spriteSymbols.push(`  <symbol id="${icon.symbolId}" viewBox="0 0 48 48">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${icon.path}
    </g>
  </symbol>`);

  spriteSymbols.push(`  <symbol id="${icon.symbolId}-badge" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="22" fill="${icon.color}" />
    <g fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${icon.path}
    </g>
  </symbol>`);

  generatedCount++;
});

// 2. Construir SVG Sprite completo
const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
${spriteSymbols.join('\n')}
</svg>
`;

// 3. Escribir sprite oficial en todos los destinos
targetRoots.forEach((baseDir) => {
  fs.writeFileSync(path.join(baseDir, 'mall-os-icons.svg'), spriteContent);
  fs.writeFileSync(path.join(baseDir, 'mall-os-category-icons-sprite.svg'), spriteContent);
});

// También en public directo de landing y assets directo de mobile
fs.writeFileSync(path.join(rootDir, 'apps', 'landing', 'public', 'mall-os-icons.svg'), spriteContent);
fs.writeFileSync(path.join(rootDir, 'apps', 'landing', 'public', 'mall-os-category-icons-sprite.svg'), spriteContent);
fs.writeFileSync(path.join(rootDir, 'apps', 'mobile', 'assets', 'mall-os-icons.svg'), spriteContent);
fs.writeFileSync(path.join(rootDir, 'apps', 'mobile', 'assets', 'mall-os-category-icons-sprite.svg'), spriteContent);

console.log(`✅ ¡${generatedCount} iconos procesados exitosamente!`);
console.log(`📦 Generados:`);
console.log(`   - Iconos Base (solo glifo / stroke)`);
console.log(`   - Iconos Badges (glifo + círculo de color)`);
console.log(`   - SVG Sprite unificado (mall-os-icons.svg con <symbol id="mallos-...">)`);
console.log(`   - Carpetas temáticas: categories/, mall/, map/, navigation/`);
