/**
 * @mallos/design-tokens - Mall OS Complete Illustrations & Graphic Elements
 * Catálogo maestro de ilustraciones, elementos isométricos 2.5D, iconografía de señalética y estados de tiendas.
 */

export interface MallGraphicElement {
  id: string;
  name: string;
  category: 'isometric' | 'signage' | 'ui' | 'texture' | 'status';
  description: string;
}

export const GRAPHIC_ELEMENTS_CATALOG: MallGraphicElement[] = [
  // Elementos Isométricos 2.5D
  {
    id: 'iso_mall_overview',
    name: 'Centro Comercial (Vista Isométrica)',
    category: 'isometric',
    description: 'Renderizado isométrico multicapa del centro comercial con tiendas, pasillos y atrio central.',
  },
  {
    id: 'iso_elevator',
    name: 'Ascensor Panorámico de Cristal',
    category: 'isometric',
    description: 'Torre de cristal con cápsulas de elevador iluminadas en azul.',
  },
  {
    id: 'iso_escalator',
    name: 'Escaleras Mecánicas 2.5D',
    category: 'isometric',
    description: 'Escaleras mecánicas en ángulo con barandillas de vidrio templado y pasamanos oscuros.',
  },
  {
    id: 'iso_fountain',
    name: 'Fuente Central de Agua',
    category: 'isometric',
    description: 'Pileta circular con agua azul celeste, chorros de agua y jardineras en las esquinas.',
  },
  {
    id: 'iso_shop',
    name: 'Local Comercial 3D',
    category: 'isometric',
    description: 'Fachada de tienda con toldo azul, vitrina iluminada y rótulo SHOP.',
  },
  {
    id: 'iso_trees_planters',
    name: 'Jardineras y Árboles',
    category: 'isometric',
    description: 'Cajas de madera con vegetación y árboles ornamentales para pasillos.',
  },
  {
    id: 'iso_benches',
    name: 'Bancas de Descanso',
    category: 'isometric',
    description: 'Bancas de madera con estructura metálica para áreas comunes.',
  },
  {
    id: 'iso_route',
    name: 'Línea de Ruta y Chevrons',
    category: 'isometric',
    description: 'Camino punteado con flechas chevrons de navegación y marcador de destino.',
  },

  // Señalética Circular del Mall
  {
    id: 'sign_restroom',
    name: 'Señalética: Baños / Sanitarios',
    category: 'signage',
    description: 'Icono circular de servicios higiénicos para damas y caballeros.',
  },
  {
    id: 'sign_escalator',
    name: 'Señalética: Escaleras',
    category: 'signage',
    description: 'Icono circular de escaleras fijas y mecánicas.',
  },
  {
    id: 'sign_elevator',
    name: 'Señalética: Ascensor',
    category: 'signage',
    description: 'Icono circular de elevadores accesibles.',
  },
  {
    id: 'sign_entrance',
    name: 'Señalética: Entrada Principal',
    category: 'signage',
    description: 'Icono circular de acceso y puertas del mall.',
  },
];

export const STORE_STATUS_SAMPLES = [
  {
    id: 'st_nike',
    brand: 'Nike',
    category: 'Moda & Calzado',
    logo: '👟',
    status: 'open',
    statusText: 'Abierto',
    dotColor: '#10B981',
  },
  {
    id: 'st_zara',
    brand: 'ZARA',
    category: 'Moda',
    logo: '👗',
    status: 'open',
    statusText: 'Abierto',
    dotColor: '#10B981',
  },
  {
    id: 'st_apple',
    brand: 'Apple',
    category: 'Tecnología',
    logo: '🍎',
    status: 'closed',
    statusText: 'Cerrado',
    dotColor: '#EF4444',
  },
  {
    id: 'st_hm',
    brand: 'H&M',
    category: 'Moda',
    logo: '🛍️',
    status: 'open',
    statusText: 'Abierto',
    dotColor: '#10B981',
  },
];
