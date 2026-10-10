import { DEMO_SAMBIL_OFFERS } from '@mallos/map-engine';
import type { MallOsIconId } from '@mallos/design-tokens';

export type ParentCategoryId =
  | 'moda'
  | 'tecnologia'
  | 'gastronomia'
  | 'calzado'
  | 'deportes'
  | 'belleza'
  | 'salud'
  | 'entretenimiento'
  | 'servicios'
  | 'hogar'
  | 'ninos'
  | 'regalos_papeleria';

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  priceRange: { min: number; max: number };
  iconId: MallOsIconId;
  tags: string[];
  highlights?: string[];
  mockSizes?: string[];
  mockColors?: string[];
  imageUrl?: string;
  images?: Array<{ url: string; label?: string; colorHex?: string }>;
}

export interface CatalogStoreOption {
  storeId: string;
  storeName: string;
  highlight?: string;
  targetNodeId: string;
  floorLabel?: string;
  brandColor?: string;
  brandAccent?: string;
  brandMonogram?: string;
  brandTone?: 'minimal' | 'vibrant' | 'warm' | 'tech' | 'premium';
  logoUrl?: string;
  products: CatalogProduct[];
}

export interface ParentCategory {
  id: ParentCategoryId;
  label: string;
  iconId: MallOsIconId;
  description: string;
  subcategoryIds: string[];
}

export interface Subcategory {
  id: string;
  parentId: ParentCategoryId;
  label: string;
  iconId: MallOsIconId;
  keywords: string[];
  synonyms: string[];
  storeIds: string[];
  followUpQuestion?: string;
  searchableText: string;
}

function buildSearchable(label: string, keywords: string[], synonyms: string[]): string {
  return [label, ...keywords, ...synonyms]
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// ==========================================
// 1. LAS 12 CATEGORÍAS PADRE OFICIALES
// ==========================================
export const PARENT_CATEGORIES: ParentCategory[] = [
  {
    id: 'moda',
    label: 'Moda y Ropa',
    iconId: 'moda',
    description: 'Ropa formal, casual, jeans y lencería internacional.',
    subcategoryIds: ['moda_camisas', 'moda_pantalones', 'moda_intima', 'moda_vestidos'],
  },
  {
    id: 'tecnologia',
    label: 'Tecnología y Móviles',
    iconId: 'tecnologia',
    description: 'Smartphones, audio de alta fidelidad, laptops y accesorios.',
    subcategoryIds: ['tech_celulares', 'tech_audio', 'tech_computacion'],
  },
  {
    id: 'gastronomia',
    label: 'Gastronomía y Café',
    iconId: 'restaurantes',
    description: 'Cafeterías de especialidad, comida rápida y postres.',
    subcategoryIds: ['gastro_cafe', 'gastro_rapida', 'gastro_postres'],
  },
  {
    id: 'calzado',
    label: 'Calzado y Cuero',
    iconId: 'moda',
    description: 'Zapatos de vestir, sandalias, botas y calzado casual.',
    subcategoryIds: ['calzado_formal', 'calzado_casual'],
  },
  {
    id: 'deportes',
    label: 'Deportes y Fitness',
    iconId: 'deportes',
    description: 'Calzado running, ropa de entrenamiento y accesorios gym.',
    subcategoryIds: ['deportes_calzado', 'deportes_ropa'],
  },
  {
    id: 'belleza',
    label: 'Belleza y Cuidado',
    iconId: 'belleza',
    description: 'Fragancias, cuidado de piel, maquillaje y estética spa.',
    subcategoryIds: ['belleza_fragancias', 'belleza_skincare', 'belleza_spa'],
  },
  {
    id: 'salud',
    label: 'Salud y Farmacia',
    iconId: 'salud',
    description: 'Medicamentos, dermocosmética, vitaminas y conveniencia.',
    subcategoryIds: ['salud_farmacia', 'salud_vitaminas'],
  },
  {
    id: 'entretenimiento',
    label: 'Cine y Diversión',
    iconId: 'entretenimiento',
    description: 'Salas IMAX, películas de estreno, confitería y arcade.',
    subcategoryIds: ['cine_peliculas', 'cine_confiteria'],
  },
  {
    id: 'servicios',
    label: 'Bancos y Finanzas',
    iconId: 'finanzas',
    description: 'Cajeros automáticos multiservicio y taquillas bancarias.',
    subcategoryIds: ['banca_servicios', 'banca_cajeros'],
  },
  {
    id: 'hogar',
    label: 'Hogar y Decoración',
    iconId: 'hogar',
    description: 'Lencería de cama, toallas, velas aromáticas y ambientación.',
    subcategoryIds: ['hogar_textil', 'hogar_aromas'],
  },
  {
    id: 'ninos',
    label: 'Juguetes y Niños',
    iconId: 'bebes',
    description: 'Moda infantil, bebés, juguetes didácticos y juegos de mesa.',
    subcategoryIds: ['ninos_moda', 'ninos_juguetes'],
  },
  {
    id: 'regalos_papeleria',
    label: 'Regalos y Novedades',
    iconId: 'regalos',
    description: 'Detalles únicos, papelería fina, bolsos y accesorios de regalo.',
    subcategoryIds: ['regalos_detalles', 'regalos_papeleria_sub'],
  },
];

// ==========================================
// 2. SUBCATEGORÍAS ESTRUCTURADAS (~30)
// ==========================================
export const SUBCATEGORIES: Subcategory[] = [
  // MODA
  {
    id: 'moda_camisas',
    parentId: 'moda',
    label: 'Camisas y Blusas',
    iconId: 'moda',
    keywords: ['camisa', 'blusa', 'camiseta', 'polo', 'shirt'],
    synonyms: ['camisas', 'blusas', 'tops', 'chemise', 'ropa'],
    storeIds: ['zara', 'local_115', 'local_42', 'local_4'],
    followUpQuestion: '¿Buscas algo casual para el día a día o formal para una ocasión especial?',
    searchableText: buildSearchable('Camisas y Blusas', ['camisa', 'blusa', 'camiseta', 'polo', 'shirt'], ['camisas', 'blusas', 'tops', 'chemise', 'ropa', 'tijerazo', 'zara', 'bershka']),
  },
  {
    id: 'moda_pantalones',
    parentId: 'moda',
    label: 'Pantalones y Jeans',
    iconId: 'moda',
    keywords: ['pantalon', 'jeans', 'pantalon de vestir', 'denim', 'cargo'],
    synonyms: ['pantalones', 'vaqueros', 'chinos', 'bermudas'],
    storeIds: ['zara', 'local_4', 'local_42'],
    followUpQuestion: '¿Prefieres corte recto, slim o diseño holgado de temporada?',
    searchableText: buildSearchable('Pantalones y Jeans', ['pantalon', 'jeans', 'pantalon de vestir', 'denim'], ['vaqueros', 'chinos', 'pantalones', 'zara', 'tijerazo']),
  },
  {
    id: 'moda_intima',
    parentId: 'moda',
    label: 'Ropa Íntima y Pijamas',
    iconId: 'moda',
    keywords: ['intima', 'pijama', 'lenceria', 'brasier', 'boxer', 'blumer'],
    synonyms: ['ropa interior', 'pijamas', 'conjunto intimo', 'ropa para dormir'],
    storeIds: ['palacio_del_blumer', 'local_4'],
    followUpQuestion: '¿Buscas conjuntos de algodón para descanso o piezas de lencería especial?',
    searchableText: buildSearchable('Ropa Íntima y Pijamas', ['intima', 'pijama', 'lenceria', 'brasier', 'boxer', 'blumer'], ['palacio del blumer', 'tijerazo']),
  },
  {
    id: 'moda_vestidos',
    parentId: 'moda',
    label: 'Vestidos y Faldas',
    iconId: 'moda',
    keywords: ['vestido', 'falda', 'gala', 'coctel', 'elegante'],
    synonyms: ['vestidos', 'faldas', 'traje', 'enterizo'],
    storeIds: ['zara', 'local_115'],
    followUpQuestion: '¿Es para un evento de día o una celebración de noche?',
    searchableText: buildSearchable('Vestidos y Faldas', ['vestido', 'falda', 'gala', 'coctel'], ['vestidos', 'faldas', 'zara', 'stradivarius']),
  },

  // TECNOLOGÍA
  {
    id: 'tech_celulares',
    parentId: 'tecnologia',
    label: 'Celulares y Smartphones',
    iconId: 'tecnologia',
    keywords: ['celular', 'smartphone', 'iphone', 'samsung', 'xiaomi', 'telefono'],
    synonyms: ['movil', 'gama alta', 'telefono', 'apple', 'clx'],
    storeIds: ['samsung_clx', 'istore_feria'],
    followUpQuestion: '¿Te interesa alguna marca en particular como Apple o Samsung Galaxy?',
    searchableText: buildSearchable('Celulares y Smartphones', ['celular', 'smartphone', 'iphone', 'samsung'], ['apple', 'galaxy', 'istore', 'clx']),
  },
  {
    id: 'tech_audio',
    parentId: 'tecnologia',
    label: 'Audífonos y Altavoces',
    iconId: 'tecnologia',
    keywords: ['audifonos', 'auriculares', 'airpods', 'galaxy buds', 'corneta', 'altavoz', 'bluetooth'],
    synonyms: ['earbuds', 'headset', 'parlante', 'bocina'],
    storeIds: ['samsung_clx', 'istore_feria'],
    followUpQuestion: '¿Buscas cancelación activa de ruido o audífonos deportivos resistentes al sudor?',
    searchableText: buildSearchable('Audífonos y Altavoces', ['audifonos', 'auriculares', 'airpods', 'bluetooth'], ['buds', 'corneta', 'altavoz']),
  },
  {
    id: 'tech_computacion',
    parentId: 'tecnologia',
    label: 'Laptops y Tablets',
    iconId: 'tecnologia',
    keywords: ['laptop', 'macbook', 'ipad', 'tablet', 'computadora', 'cargador'],
    synonyms: ['portatil', 'tableta', 'notebook'],
    storeIds: ['istore_feria', 'samsung_clx'],
    followUpQuestion: '¿La necesitas para trabajo profesional, estudio o entretenimiento?',
    searchableText: buildSearchable('Laptops y Tablets', ['laptop', 'macbook', 'ipad', 'tablet'], ['computadora', 'portatil', 'istore']),
  },

  // GASTRONOMÍA
  {
    id: 'gastro_cafe',
    parentId: 'gastronomia',
    label: 'Café de Especialidad',
    iconId: 'restaurantes',
    keywords: ['cafe', 'capuchino', 'latte', 'desayuno', 'merienda', 'espresso'],
    synonyms: ['cafeteria', 'coffee', 'bebida caliente', 'frappe'],
    storeIds: ['local_13'],
    followUpQuestion: '¿Prefieres un café para llevar o sentarte a disfrutarlo?',
    searchableText: buildSearchable('Café de Especialidad', ['cafe', 'capuchino', 'latte', 'espresso'], ['mccafe', 'cafeteria']),
  },
  {
    id: 'gastro_rapida',
    parentId: 'gastronomia',
    label: 'Comida Rápida y Combos',
    iconId: 'comida-rapida',
    keywords: ['hamburguesa', 'pollo', 'papas', 'refresco', 'almuerzo', 'combo'],
    synonyms: ['comida rapida', 'fast food', 'crispy', 'nuggets'],
    storeIds: ['local_38', 'local_39'],
    followUpQuestion: '¿Prefieres hamburguesas con queso o pollo crujiente tradicional?',
    searchableText: buildSearchable('Comida Rápida y Combos', ['hamburguesa', 'pollo', 'papas', 'combo'], ['mcdonalds', 'arturos', 'feria']),
  },
  {
    id: 'gastro_postres',
    parentId: 'gastronomia',
    label: 'Helados y Postres',
    iconId: 'restaurantes',
    keywords: ['helado', 'postre', 'mcflurry', 'sundae', 'torta', 'dulce'],
    synonyms: ['cono', 'heladeria', 'merengada'],
    storeIds: ['local_38', 'local_13'],
    followUpQuestion: '¿Se te antoja un McFlurry con galletas o una torta con café?',
    searchableText: buildSearchable('Helados y Postres', ['helado', 'postre', 'mcflurry', 'sundae', 'torta'], ['dulces', 'mccafe']),
  },

  // CALZADO
  {
    id: 'calzado_formal',
    parentId: 'calzado',
    label: 'Calzado Formal y Cuero',
    iconId: 'moda',
    keywords: ['zapatos de vestir', 'mocasines', 'tacones', 'cuero', 'elegante'],
    synonyms: ['calzado formal', 'stilettos', 'oxford'],
    storeIds: ['sansa', 'zara'],
    followUpQuestion: '¿Buscas calzado masculino o femenino para oficina o fiesta?',
    searchableText: buildSearchable('Calzado Formal y Cuero', ['zapatos de vestir', 'mocasines', 'tacones', 'cuero'], ['sansa', 'zara']),
  },
  {
    id: 'calzado_casual',
    parentId: 'calzado',
    label: 'Sandalias y Casual',
    iconId: 'moda',
    keywords: ['sandalias', 'calzado comodo', 'plataformas', 'flats', 'alpargatas'],
    synonyms: ['zapatos diarios', 'sandalias verano'],
    storeIds: ['sansa', 'local_4'],
    followUpQuestion: '¿Prefieres modelos de piso o con tacón cómodo?',
    searchableText: buildSearchable('Sandalias y Casual', ['sandalias', 'calzado comodo', 'flats'], ['sansa', 'tijerazo']),
  },

  // DEPORTES
  {
    id: 'deportes_calzado',
    parentId: 'deportes',
    label: 'Zapatillas de Running & Training',
    iconId: 'deportes',
    keywords: ['zapatillas', 'sneakers', 'running', 'tenis', 'gimnasio', 'nike'],
    synonyms: ['calzado deportivo', 'deportivos', 'air max', 'pegasus'],
    storeIds: ['st_pb_02'],
    followUpQuestion: '¿Son para correr sobre asfalto, entrenamiento en gym o estilo urbano?',
    searchableText: buildSearchable('Zapatillas de Running', ['zapatillas', 'sneakers', 'running', 'tenis', 'nike'], ['pegasus', 'air max']),
  },
  {
    id: 'deportes_ropa',
    parentId: 'deportes',
    label: 'Ropa Deportiva & Dri-FIT',
    iconId: 'deportes',
    keywords: ['licra', 'short deportivo', 'franela dry fit', 'leggings', 'mono deportivo'],
    synonyms: ['indumentaria fitness', 'ropa deportiva', 'sweatshirt'],
    storeIds: ['st_pb_02'],
    followUpQuestion: '¿Buscas conjuntos de compresión o prendas frescas transpirables?',
    searchableText: buildSearchable('Ropa Deportiva Dri-FIT', ['licra', 'short deportivo', 'franela', 'leggings', 'nike'], ['dri-fit']),
  },

  // BELLEZA
  {
    id: 'belleza_fragancias',
    parentId: 'belleza',
    label: 'Fragancias y Mists Corporales',
    iconId: 'belleza',
    keywords: ['perfume', 'colonia', 'body mist', 'fragancia', 'locion aromatica'],
    synonyms: ['aromas', 'splash', 'bodyspray'],
    storeIds: ['bath_body_works', 'local_40'],
    followUpQuestion: '¿Te inclinas por notas florales frescas, cítricas o amaderadas?',
    searchableText: buildSearchable('Fragancias y Mists Corporales', ['perfume', 'colonia', 'body mist', 'fragancia'], ['bath body works', 'farmatodo']),
  },
  {
    id: 'belleza_skincare',
    parentId: 'belleza',
    label: 'Cuidado Facial y Bloqueadores',
    iconId: 'belleza',
    keywords: ['protector solar', 'serum', 'crema hidratante', 'acido hialuronico', 'limpiador facial'],
    synonyms: ['skincare', 'rutina facial', 'dermatologia'],
    storeIds: ['local_40', 'bath_body_works'],
    followUpQuestion: '¿Tu tipo de piel es mixta, grasa o sensible?',
    searchableText: buildSearchable('Cuidado Facial y Bloqueadores', ['protector solar', 'serum', 'crema hidratante', 'skincare'], ['farmatodo', 'la roche posay']),
  },
  {
    id: 'belleza_spa',
    parentId: 'belleza',
    label: 'Spa, Manicura y Relajación',
    iconId: 'belleza',
    keywords: ['masaje', 'spa', 'manicura', 'pedicura', 'limpieza facial', 'unas'],
    synonyms: ['estetica', 'relajacion', 'faciales'],
    storeIds: ['liah_spa'],
    followUpQuestion: '¿Deseas una sesión relajante de masajes o servicio completo de uñas?',
    searchableText: buildSearchable('Spa, Manicura y Relajación', ['masaje', 'spa', 'manicura', 'pedicura', 'limpieza facial'], ['liah spa']),
  },

  // SALUD
  {
    id: 'salud_farmacia',
    parentId: 'salud',
    label: 'Medicamentos y Primeros Auxilios',
    iconId: 'salud',
    keywords: ['medicina', 'pastillas', 'analgesico', 'antibiotico', 'jarabe', 'curitas'],
    synonyms: ['farmacia', 'recetario', 'salud'],
    storeIds: ['local_40'],
    followUpQuestion: '¿Cuentas con récipe médico para medicamentos de prescripción?',
    searchableText: buildSearchable('Medicamentos y Primeros Auxilios', ['medicina', 'pastillas', 'analgesico', 'jarabe'], ['farmatodo']),
  },
  {
    id: 'salud_vitaminas',
    parentId: 'salud',
    label: 'Vitaminas y Suplementos',
    iconId: 'salud',
    keywords: ['vitamina c', 'magnesio', 'colageno', 'zinc', 'omega 3', 'multivitaminico'],
    synonyms: ['suplementos', 'nutricion', 'defensas'],
    storeIds: ['local_40'],
    followUpQuestion: '¿Buscas energía diaria o fortalecimiento de defensas?',
    searchableText: buildSearchable('Vitaminas y Suplementos', ['vitamina c', 'magnesio', 'colageno', 'omega 3'], ['farmatodo']),
  },

  // ENTRETENIMIENTO
  {
    id: 'cine_peliculas',
    parentId: 'entretenimiento',
    label: 'Salas de Cine y Cartelera',
    iconId: 'entretenimiento',
    keywords: ['cine', 'pelicula', 'cartelera', 'estreno', 'imax', 'sala 3d'],
    synonyms: ['cines unidos', 'boletos', 'entradas'],
    storeIds: ['local_43'],
    followUpQuestion: '¿Quieres función en sala tradicional o experiencia premium IMAX?',
    searchableText: buildSearchable('Salas de Cine y Cartelera', ['cine', 'pelicula', 'cartelera', 'estreno', 'imax'], ['cines unidos']),
  },
  {
    id: 'cine_confiteria',
    parentId: 'entretenimiento',
    label: 'Cotufas y Confitería',
    iconId: 'entretenimiento',
    keywords: ['cotufas', 'palomitas', 'refresco cine', 'tequenos', 'nachos', 'dulces'],
    synonyms: ['combo cine', 'confiteria'],
    storeIds: ['local_43'],
    followUpQuestion: '¿Cotufas extragrandes con mantequilla o prefieres tequeños calientes?',
    searchableText: buildSearchable('Cotufas y Confitería', ['cotufas', 'palomitas', 'tequenos', 'nachos'], ['cines unidos combo']),
  },

  // SERVICIOS / BANCOS
  {
    id: 'banca_servicios',
    parentId: 'servicios',
    label: 'Taquilla Bancaria y Divisas',
    iconId: 'finanzas',
    keywords: ['banco', 'taquilla', 'deposito', 'cuenta bancaria', 'divisas', 'tarjeta'],
    synonyms: ['banca', 'apertura cuenta', 'pago movil'],
    storeIds: ['local_bnc', 'provincial', 'banco_tesoro'],
    followUpQuestion: '¿En qué entidad bancaria requieres atención presencial hoy?',
    searchableText: buildSearchable('Taquilla Bancaria y Divisas', ['banco', 'taquilla', 'deposito', 'cuenta bancaria', 'divisas'], ['bnc', 'provincial', 'tesoro']),
  },
  {
    id: 'banca_cajeros',
    parentId: 'servicios',
    label: 'Cajeros Automáticos 24/7',
    iconId: 'cajero',
    keywords: ['cajero', 'atm', 'efectivo', 'retiro', 'dolares en efectivo'],
    synonyms: ['dispensador', 'cajeros automaticos'],
    storeIds: ['local_bnc', 'provincial', 'banco_tesoro'],
    followUpQuestion: '¿Requieres retiro en bolívares o en divisas en efectivo?',
    searchableText: buildSearchable('Cajeros Automáticos 24/7', ['cajero', 'atm', 'efectivo', 'retiro'], ['bnc', 'provincial', 'tesoro']),
  },

  // HOGAR
  {
    id: 'hogar_textil',
    parentId: 'hogar',
    label: 'Lencería de Cama y Baño',
    iconId: 'hogar',
    keywords: ['sabanas', 'edredon', 'toallas', 'almohadas', 'cobija', 'cortinas'],
    synonyms: ['ropa de cama', 'blancos', 'textil hogar'],
    storeIds: ['local_4', 'palacio_del_blumer'],
    followUpQuestion: '¿Qué medida de cama buscas: individual, matrimonial, queen o king?',
    searchableText: buildSearchable('Lencería de Cama y Baño', ['sabanas', 'edredon', 'toallas', 'almohadas'], ['tijerazo', 'palacio del blumer']),
  },
  {
    id: 'hogar_aromas',
    parentId: 'hogar',
    label: 'Velas Aromáticas y Decoración',
    iconId: 'hogar',
    keywords: ['velas aromaticas', 'difusor', 'ambientador', 'aromatizante', 'velas 3 mechas'],
    synonyms: ['aromas para casa', 'decoracion hogar'],
    storeIds: ['bath_body_works', 'local_4'],
    followUpQuestion: '¿Prefieres velas aromáticas de 3 mechas o difusores continuos para pared?',
    searchableText: buildSearchable('Velas Aromáticas y Decoración', ['velas aromaticas', 'difusor', 'ambientador'], ['bath body works']),
  },

  // NIÑOS
  {
    id: 'ninos_moda',
    parentId: 'ninos',
    label: 'Moda Infantil y Bebés',
    iconId: 'bebes',
    keywords: ['ropa de nino', 'ropa de nina', 'bebe', 'mameluco', 'conjunto infantil'],
    synonyms: ['moda infantil', 'ropita', 'zara kids'],
    storeIds: ['zara', 'local_4'],
    followUpQuestion: '¿Para qué edad buscas prendas: recién nacido, infantil o pre-adolescente?',
    searchableText: buildSearchable('Moda Infantil y Bebés', ['ropa de nino', 'ropa de nina', 'bebe', 'mameluco'], ['zara kids', 'tijerazo']),
  },
  {
    id: 'ninos_juguetes',
    parentId: 'ninos',
    label: 'Juguetes Didácticos y Juegos',
    iconId: 'regalos',
    keywords: ['juguetes', 'muneca', 'carritos', 'legos', 'juegos de mesa', 'peluches'],
    synonyms: ['jugueteria', 'juegos para ninos'],
    storeIds: ['local_4'],
    followUpQuestion: '¿Buscas juguetes de construcción tipo bloques o juegos de mesa familiares?',
    searchableText: buildSearchable('Juguetes Didácticos y Juegos', ['juguetes', 'muneca', 'carritos', 'legos', 'juegos de mesa'], ['tijerazo jugueteria']),
  },

  // REGALOS
  {
    id: 'regalos_detalles',
    parentId: 'regalos_papeleria',
    label: 'Detalles, Bolsos y Regalos',
    iconId: 'regalos',
    keywords: ['regalo', 'bolso de regalo', 'billetera', 'cartera', 'reloj', 'detalle'],
    synonyms: ['obsequio', 'souvenir', 'presente'],
    storeIds: ['local_4', 'sansa', 'bath_body_works'],
    followUpQuestion: '¿Buscas un obsequio para dama, caballero o para una ocasión festiva?',
    searchableText: buildSearchable('Detalles, Bolsos y Regalos', ['regalo', 'bolso', 'billetera', 'cartera', 'reloj'], ['tijerazo', 'sansa', 'bbw']),
  },
];

// ==========================================
// 3. MAPEO BASE CON PRODUCTOS POR TIENDA
// ==========================================
export const BASE_CATALOG_OPTIONS: Record<string, CatalogStoreOption[]> = {
  // MODA
  moda_camisas: [
    {
      storeId: 'zara',
      storeName: 'ZARA',
      highlight: 'Nueva colección de temporada · Camisas Oxford y Lino',
      targetNodeId: 'door-zara',
      floorLabel: 'Nivel Acuario (L2)',
      brandColor: '#0F172A',
      brandAccent: '#E2E8F0',
      brandMonogram: 'Z',
      brandTone: 'minimal',
      products: [
        {
          id: 'z-cam-1',
          name: 'Camisa Oxford Slim Fit',
          description: 'Algodón peinado 100%, cuello italiano estructurado',
          priceRange: { min: 25, max: 45 },
          iconId: 'moda',
          tags: ['formal', 'oficina', 'slim-fit'],
          highlights: ['Algodón 100%', 'Corte Slim', 'Temporada 2024'],
          mockSizes: ['S', 'M', 'L', 'XL'],
          mockColors: ['Blanco Puro', 'Azul Celeste', 'Gris Perla'],
        },
        {
          id: 'z-cam-2',
          name: 'Camisa de Lino Cuello Mao',
          description: 'Tejido transpirable de lino europeo, tacto suave',
          priceRange: { min: 35, max: 55 },
          iconId: 'moda',
          tags: ['casual', 'verano', 'lino'],
          highlights: ['Lino Europeo', 'Cuello Mao', 'Fresco'],
          mockSizes: ['M', 'L', 'XL'],
          mockColors: ['Beige Natural', 'Oliva Suave', 'Blanco'],
        },
      ],
    },
    {
      storeId: 'local_4',
      storeName: 'Tiendas Tijerazo',
      highlight: 'Básicos de calidad a precios de departamento',
      targetNodeId: 'door-tijerazo',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#DC2626',
      brandAccent: '#FEF2F2',
      brandMonogram: 'T',
      brandTone: 'vibrant',
      products: [
        {
          id: 'tj-cam-1',
          name: 'Camisa Formal Clásica Comfort',
          description: 'Mezcla algodón-poliéster resistente con planchado fácil',
          priceRange: { min: 14, max: 24 },
          iconId: 'moda',
          tags: ['formal', 'diario', 'resistente'],
          highlights: ['Planchado Fácil', 'Doble Costura', 'Bolsillo Frontal'],
          mockSizes: ['S', 'M', 'L', 'XL', 'XXL'],
          mockColors: ['Blanco', 'Azul Marino', 'Vino Tinto'],
        },
      ],
    },
  ],

  moda_pantalones: [
    {
      storeId: 'zara',
      storeName: 'ZARA',
      highlight: 'Denim europeo y pantalones chinos de alta sastrería',
      targetNodeId: 'door-zara',
      floorLabel: 'Nivel Acuario (L2)',
      brandColor: '#0F172A',
      brandAccent: '#E2E8F0',
      brandMonogram: 'Z',
      brandTone: 'minimal',
      products: [
        {
          id: 'z-pant-1',
          name: 'Pantalón Chino Regular Fit',
          description: 'Algodón elástico con acabado satinado suave',
          priceRange: { min: 35, max: 50 },
          iconId: 'moda',
          tags: ['chino', 'oficina', 'casual'],
          highlights: ['Algodón Elástico', 'Cintura Ajustable'],
          mockSizes: ['30', '32', '34', '36'],
          mockColors: ['Kaki', 'Azul Marino', 'Negro'],
        },
      ],
    },
  ],

  moda_intima: [
    {
      storeId: 'palacio_del_blumer',
      storeName: 'Palacio del Blumer',
      highlight: 'Gran reapertura Nivel Autopista · 20% DCTO',
      targetNodeId: 'node-74',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#DB2777',
      brandAccent: '#FCE7F3',
      brandMonogram: 'P',
      brandTone: 'warm',
      products: [
        {
          id: 'pb-int-1',
          name: 'Pijama de Satén Soft Touch',
          description: 'Conjunto de dos piezas con ribetes en contraste y satén térmico',
          priceRange: { min: 18, max: 28 },
          iconId: 'moda',
          tags: ['satén', 'descanso', 'suave'],
          highlights: ['Satén Premium', 'Corte Holgado', 'Botones Nácar'],
          mockSizes: ['S', 'M', 'L'],
          mockColors: ['Rosa Palo', 'Azul Medianoche', 'Champaña'],
        },
        {
          id: 'pb-int-2',
          name: 'Pack x3 Boxer Seamless Algodón',
          description: 'Tejido sin costuras con pretina ergonómica anti-marcas',
          priceRange: { min: 10, max: 16 },
          iconId: 'moda',
          tags: ['seamless', 'algodón', 'básico'],
          highlights: ['Cero Costuras', 'Algodón Transpirable', 'Pack Económico'],
          mockSizes: ['M', 'L', 'XL'],
          mockColors: ['Surtido Negro/Gris/Azul'],
        },
      ],
    },
  ],

  moda_vestidos: [
    {
      storeId: 'zara',
      storeName: 'ZARA',
      highlight: 'Vestidos de fiesta y corte midi para eventos',
      targetNodeId: 'door-zara',
      floorLabel: 'Nivel Acuario (L2)',
      brandColor: '#0F172A',
      brandAccent: '#E2E8F0',
      brandMonogram: 'Z',
      brandTone: 'minimal',
      products: [
        {
          id: 'z-ves-1',
          name: 'Vestido Midi Plisado Satén',
          description: 'Escote en pico con detalle de cinturón coordinado',
          priceRange: { min: 45, max: 75 },
          iconId: 'moda',
          tags: ['elegante', 'midi', 'fiesta'],
          highlights: ['Satén Plisado', 'Cinturón Ajustable'],
          mockSizes: ['XS', 'S', 'M', 'L'],
          mockColors: ['Esmeralda', 'Borgoña', 'Negro'],
        },
      ],
    },
  ],

  // TECNOLOGÍA
  tech_celulares: [
    {
      storeId: 'samsung_clx',
      storeName: 'Samsung CLX',
      highlight: 'Distribuidor oficial Samsung · Galaxy AI Experiencia',
      targetNodeId: 'door-samsung',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#002984',
      brandAccent: '#38BDF8',
      brandMonogram: 'S',
      brandTone: 'tech',
      products: [
        {
          id: 's-ph-1',
          name: 'Samsung Galaxy S24 Ultra',
          description: 'Titanio, cámara 200MP, S-Pen integrado y Galaxy AI',
          priceRange: { min: 1100, max: 1350 },
          iconId: 'tecnologia',
          tags: ['flagship', 'galaxy-ai', 'titanio'],
          highlights: ['Marco de Titanio', 'Zoom Óptico 100x', 'S-Pen Incluido'],
          mockSizes: ['256 GB', '512 GB'],
          mockColors: ['Gris Titanio', 'Negro Titanio', 'Violeta Titanio'],
        },
        {
          id: 's-ph-2',
          name: 'Samsung Galaxy A55 5G',
          description: 'Pantalla Super AMOLED 120Hz y resistencia IP67 al agua',
          priceRange: { min: 320, max: 390 },
          iconId: 'tecnologia',
          tags: ['gama-media', '5g', 'amoled'],
          highlights: ['Batería 5000 mAh', 'Pantalla 120Hz', 'Cámara 50MP'],
          mockSizes: ['128 GB', '256 GB'],
          mockColors: ['Azul Hielo', 'Lila', 'Grafito'],
        },
      ],
    },
    {
      storeId: 'istore_feria',
      storeName: 'iStore Premium',
      highlight: 'Apple Authorized Reseller · iPhone y Mac',
      targetNodeId: 'door-istore',
      floorLabel: 'Nivel Feria (L4)',
      brandColor: '#18181B',
      brandAccent: '#E4E4E7',
      brandMonogram: '',
      brandTone: 'minimal',
      products: [
        {
          id: 'a-ph-1',
          name: 'iPhone 15 Pro Max',
          description: 'Chip A17 Pro, carcasa de titanio y botón de acción',
          priceRange: { min: 1200, max: 1450 },
          iconId: 'tecnologia',
          tags: ['flagship', 'apple', 'titanio'],
          highlights: ['Chip A17 Pro', 'Titanio Aeroespacial', 'Cámara Teleobjetivo 5x'],
          mockSizes: ['256 GB', '512 GB', '1 TB'],
          mockColors: ['Titanio Natural', 'Titanio Azul', 'Titanio Negro'],
        },
      ],
    },
  ],

  tech_audio: [
    {
      storeId: 'samsung_clx',
      storeName: 'Samsung CLX',
      highlight: 'Audio inalámbrico con sonido AKG de 24 bits',
      targetNodeId: 'door-samsung',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#002984',
      brandAccent: '#38BDF8',
      brandMonogram: 'S',
      brandTone: 'tech',
      products: [
        {
          id: 's-aud-1',
          name: 'Galaxy Buds2 Pro',
          description: 'Cancelación de ruido inteligente y audio 360 grados',
          priceRange: { min: 140, max: 190 },
          iconId: 'tecnologia',
          tags: ['audio', 'anc', 'akg'],
          highlights: ['Audio 24-bit Hi-Fi', 'Cancelación ANC Inteligente', 'Resistente IPX7'],
          mockSizes: ['Estándar con 3 pares de gomas'],
          mockColors: ['Grafito', 'Blanco', 'Bora Purple'],
        },
      ],
    },
  ],

  tech_computacion: [
    {
      storeId: 'istore_feria',
      storeName: 'iStore Premium',
      highlight: 'Equipos Mac y iPad para estudio y producción creativa',
      targetNodeId: 'door-istore',
      floorLabel: 'Nivel Feria (L4)',
      brandColor: '#18181B',
      brandAccent: '#E4E4E7',
      brandMonogram: '',
      brandTone: 'minimal',
      products: [
        {
          id: 'a-mac-1',
          name: 'MacBook Air M3 (13 pulgadas)',
          description: 'Diseño ultrafino, chip M3 y batería de hasta 18 horas',
          priceRange: { min: 1100, max: 1350 },
          iconId: 'tecnologia',
          tags: ['laptop', 'chip-m3', 'ultrafina'],
          highlights: ['Chip Apple M3', '18h Batería', 'Cero Ventiladores'],
          mockSizes: ['256 GB / 8GB RAM', '512 GB / 16GB RAM'],
          mockColors: ['Medianoche', 'Luz de Estrella', 'Plata'],
        },
      ],
    },
  ],

  // GASTRONOMÍA
  gastro_cafe: [
    {
      storeId: 'local_13',
      storeName: 'McCafé',
      highlight: 'Cafetería de especialidad y bollería recién horneada',
      targetNodeId: 'node-67',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#451A03',
      brandAccent: '#F59E0B',
      brandMonogram: 'M',
      brandTone: 'warm',
      products: [
        {
          id: 'm-cof-1',
          name: 'Espresso Tradicional',
          description: 'Extracción pura de café premium arábica con crema avellana densa',
          priceRange: { min: 1.5, max: 1.5 },
          iconId: 'cafeteria',
          tags: ['caliente', 'clasico', 'espresso'],
          highlights: ['Grano Arábica 100%', 'Crema Avellana', 'Tueste Medio'],
          mockSizes: ['Simple (30ml)', 'Doble (60ml)'],
          mockColors: ['Taza Porcelana', 'Vaso para Llevar'],
        },
        {
          id: 'm-cof-2',
          name: 'Cappuccino Clásico',
          description: 'Espresso doble, leche vaporizada y sedosa espuma espolvoreada',
          priceRange: { min: 2.75, max: 2.75 },
          iconId: 'cafeteria',
          tags: ['caliente', 'cremoso', 'clasico'],
          highlights: ['Espuma Sedosa', 'Espolvoreado Canela'],
          mockSizes: ['Mediano (12oz)', 'Grande (16oz)'],
          mockColors: ['Canela', 'Cacao en Polvo'],
        },
        {
          id: 'm-cof-3',
          name: 'Frappé de Moca & Cacao',
          description: 'Café batido con hielo frappé, sirope de chocolate y chantilly',
          priceRange: { min: 4.5, max: 4.5 },
          iconId: 'bebidas',
          tags: ['frio', 'frappe', 'dulce'],
          highlights: ['Hielo Frappé', 'Crema Chantilly', 'Sirope Chocolate'],
          mockSizes: ['Regular (16oz)', 'Mega (24oz)'],
          mockColors: ['Chispas de Chocolate', 'Caramelo Drizzle'],
        },
      ],
    },
  ],

  gastro_rapida: [
    {
      storeId: 'local_38',
      storeName: "McDonald's",
      highlight: 'El clásico sabor de hamburguesas y papitas calientes',
      targetNodeId: 'door-mcdonalds',
      floorLabel: 'Nivel Feria (L4)',
      brandColor: '#B91C1C',
      brandAccent: '#FBBF24',
      brandMonogram: 'M',
      brandTone: 'vibrant',
      products: [
        {
          id: 'mc-com-1',
          name: 'Combo Cuarto de Libra con Queso',
          description: 'Carne jugosa 100% de res, doble queso cheddar, papitas y gaseosa',
          priceRange: { min: 6.5, max: 8.5 },
          iconId: 'comida-rapida',
          tags: ['hamburguesa', 'combo', 'clasico'],
          highlights: ['Carne 100% Res', 'Papas Grandes', 'Bebida Mediana'],
          mockSizes: ['Mediano', 'Grande'],
          mockColors: ['Con Queso Extra', 'Tradicional'],
        },
      ],
    },
    {
      storeId: 'local_39',
      storeName: "Arturo's",
      highlight: 'El pollo frito más crujiente y tradicional de Venezuela',
      targetNodeId: 'door-arturos',
      floorLabel: 'Nivel Feria (L4)',
      brandColor: '#C2410C',
      brandAccent: '#FEF08A',
      brandMonogram: 'A',
      brandTone: 'warm',
      products: [
        {
          id: 'art-com-1',
          name: 'Super Combo 2 Piezas',
          description: 'Pollo frito crispy tradicional, panecillo suave y ensalada cole slaw',
          priceRange: { min: 5.5, max: 7.5 },
          iconId: 'comida-rapida',
          tags: ['pollo', 'crispy', 'ensalada'],
          highlights: ['Receta Crujiente Original', 'Ensalada Fresca', 'Panecillo'],
          mockSizes: ['2 Piezas', '3 Piezas'],
          mockColors: ['Pechuga/Ala', 'Muslo/Contramuslo'],
        },
      ],
    },
  ],

  gastro_postres: [
    {
      storeId: 'local_38',
      storeName: "McDonald's Postres",
      highlight: 'Helados cremosos, barquillas y McFlurry recién servidos',
      targetNodeId: 'door-mcdonalds',
      floorLabel: 'Nivel Feria (L4)',
      brandColor: '#B91C1C',
      brandAccent: '#FBBF24',
      brandMonogram: 'M',
      brandTone: 'vibrant',
      products: [
        {
          id: 'mc-fl-1',
          name: 'McFlurry de Oreo & Fudge',
          description: 'Helado de vainilla suave batido con galletas Oreo crujientes',
          priceRange: { min: 3.0, max: 3.5 },
          iconId: 'bebidas',
          tags: ['helado', 'oreo', 'postre'],
          highlights: ['Galleta Oreo', 'Fudge Caliente'],
          mockSizes: ['Estándar'],
          mockColors: ['Chocolate Fudge', 'Caramelo'],
        },
      ],
    },
  ],

  // CALZADO
  calzado_formal: [
    {
      storeId: 'sansa',
      storeName: 'Sansa Calzado',
      highlight: 'Tradición y diseño en calzado de cuero para toda ocasión',
      targetNodeId: 'door-sansa',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#78350F',
      brandAccent: '#FDE68A',
      brandMonogram: 'S',
      brandTone: 'warm',
      products: [
        {
          id: 'san-cz-1',
          name: 'Mocasines de Cuero Genuino Náutico',
          description: 'Suela antideslizante cosida a mano y plantilla acolchada',
          priceRange: { min: 45, max: 65 },
          iconId: 'moda',
          tags: ['cuero', 'mocasines', 'confort'],
          highlights: ['100% Cuero Genuino', 'Cosido Artesanal', 'Plantilla Confort'],
          mockSizes: ['39', '40', '41', '42', '43'],
          mockColors: ['Marrón Café', 'Azul Marino', 'Negro'],
        },
        {
          id: 'san-cz-2',
          name: 'Stilettos Clásicos Tacón 7cm',
          description: 'Diseño refinado con acabado en gamuza y puntera fina',
          priceRange: { min: 40, max: 60 },
          iconId: 'moda',
          tags: ['tacon', 'elegante', 'oficina'],
          highlights: ['Tacón 7cm Ergonómico', 'Gamuza Premium'],
          mockSizes: ['36', '37', '38', '39'],
          mockColors: ['Negro Mate', 'Nude', 'Rojo Vino'],
        },
      ],
    },
  ],

  calzado_casual: [
    {
      storeId: 'sansa',
      storeName: 'Sansa Calzado',
      highlight: 'Sandalias y calzado ligero para días de paseo',
      targetNodeId: 'node-64',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#78350F',
      brandAccent: '#FDE68A',
      brandMonogram: 'S',
      brandTone: 'warm',
      products: [
        {
          id: 'san-snd-1',
          name: 'Sandalia Plataforma Esparto',
          description: 'Tiras de cuero suave y plataforma ligera con amortiguación',
          priceRange: { min: 30, max: 45 },
          iconId: 'moda',
          tags: ['sandalias', 'verano', 'plataforma'],
          highlights: ['Plataforma Esparto', 'Tiras Ajustables'],
          mockSizes: ['36', '37', '38', '39', '40'],
          mockColors: ['Dorado Suave', 'Marrón Cuero', 'Blanco'],
        },
      ],
    },
  ],

  // DEPORTES
  deportes_calzado: [
    {
      storeId: 'st_pb_02',
      storeName: 'Nike Store',
      highlight: 'Últimos lanzamientos mundiales en rendimiento y estilo',
      targetNodeId: 'door-nike',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#111827',
      brandAccent: '#F97316',
      brandMonogram: 'N',
      brandTone: 'vibrant',
      products: [
        {
          id: 'nk-rn-1',
          name: 'Nike Air Zoom Pegasus 40',
          description: 'Zapatilla de running con amortiguación reactiva React y Zoom Air',
          priceRange: { min: 130, max: 160 },
          iconId: 'deportes',
          tags: ['running', 'zoom-air', 'react'],
          highlights: ['Espuma Nike React', 'Unidad Zoom Air Dual', 'Malla Transpirable'],
          mockSizes: ['40', '41', '42', '43', '44'],
          mockColors: ['Negro/Blanco', 'Azul Eléctrico', 'Gris Platino'],
        },
        {
          id: 'nk-rn-2',
          name: 'Nike Dunk Low Retro',
          description: 'Icono del baloncesto de los 80 adaptado al estilo urbano diario',
          priceRange: { min: 115, max: 140 },
          iconId: 'deportes',
          tags: ['lifestyle', 'dunk-low', 'retro'],
          highlights: ['Cuero Premium', 'Suela de Goma Antideslizante'],
          mockSizes: ['39', '40', '41', '42', '43'],
          mockColors: ['Panda (Blanco/Negro)', 'Azul Costa', 'Gris'],
        },
      ],
    },
  ],

  deportes_ropa: [
    {
      storeId: 'st_pb_02',
      storeName: 'Nike Store',
      highlight: 'Tecnología textil Dri-FIT para máximo rendimiento físico',
      targetNodeId: 'door-nike',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#111827',
      brandAccent: '#F97316',
      brandMonogram: 'N',
      brandTone: 'vibrant',
      products: [
        {
          id: 'nk-dr-1',
          name: 'Camiseta Dri-FIT Legend',
          description: 'Tejido absorbente de sudor que mantiene la frescura en todo entrenamiento',
          priceRange: { min: 25, max: 35 },
          iconId: 'deportes',
          tags: ['dri-fit', 'gym', 'training'],
          highlights: ['Absorción de Sudor', 'Tacto Suave', 'Anti-Olor'],
          mockSizes: ['S', 'M', 'L', 'XL'],
          mockColors: ['Negro', 'Gris Carbón', 'Rojo Universitario'],
        },
      ],
    },
  ],

  // BELLEZA
  belleza_fragancias: [
    {
      storeId: 'bath_body_works',
      storeName: 'Bath & Body Works',
      highlight: 'Mists aromáticos icónicos, lociones y geles de baño',
      targetNodeId: 'node-73',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#1D4ED8',
      brandAccent: '#BFDBFE',
      brandMonogram: 'B',
      brandTone: 'vibrant',
      products: [
        {
          id: 'bbw-fr-1',
          name: 'Fine Fragrance Mist "Into the Night"',
          description: 'Notas de frambuesa oscura, ámbar y pétalos de rosa aterciopelados',
          priceRange: { min: 14, max: 19 },
          iconId: 'belleza',
          tags: ['mist', 'floral', 'nocturno'],
          highlights: ['236 ml de Larga Duración', 'Sin Parabenos', 'Aroma Icónico'],
          mockSizes: ['Full Size (236ml)', 'Travel Size (75ml)'],
          mockColors: ['Frasco Glitter Ébano'],
        },
        {
          id: 'bbw-fr-2',
          name: 'Loción Corporal Hidratante "Warm Vanilla Sugar"',
          description: 'Manteca de karité pura y aceite de coco con aroma a vainilla cremosa',
          priceRange: { min: 14, max: 18 },
          iconId: 'belleza',
          tags: ['hidratante', 'vainilla', 'karite'],
          highlights: ['24h de Hidratación', 'Absorción Rápida'],
          mockSizes: ['236 ml'],
          mockColors: ['Crema Sedosa'],
        },
      ],
    },
  ],

  belleza_skincare: [
    {
      storeId: 'local_40',
      storeName: 'Farmatodo',
      highlight: 'Dermocosmética especializada y asesoría facial profesional',
      targetNodeId: 'node-136',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#0047AB',
      brandAccent: '#DBEAFE',
      brandMonogram: 'F',
      brandTone: 'warm',
      products: [
        {
          id: 'ft-sk-1',
          name: 'Protector Solar Facial Toque Seco FPS 50+',
          description: 'Fórmula ultra ligera con acabado mate antibrillo resistente al sudor',
          priceRange: { min: 16, max: 24 },
          iconId: 'salud',
          tags: ['solar', 'fps50', 'toque-seco'],
          highlights: ['Protección UVA/UVB', 'Acabado Mate', 'No Comedogénico'],
          mockSizes: ['50 ml'],
          mockColors: ['Incoloro', 'Con Color Claro'],
        },
      ],
    },
  ],

  belleza_spa: [
    {
      storeId: 'liah_spa',
      storeName: 'Liah Spa & Estética',
      highlight: 'Refugio de relajación, masajes y estética premium en Nivel Autopista',
      targetNodeId: 'node-64',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#701A75',
      brandAccent: '#FBCFE8',
      brandMonogram: 'L',
      brandTone: 'premium',
      products: [
        {
          id: 'ls-sp-1',
          name: 'Masaje Relajante con Piedras Calientes (60 min)',
          description: 'Terapia con aceites esenciales botánicos y piedras volcánicas de basalto',
          priceRange: { min: 35, max: 50 },
          iconId: 'belleza',
          tags: ['spa', 'masaje', 'relajacion'],
          highlights: ['Aromaterapia Incluida', 'Cabina Climatizada', 'Infusión de Cortesía'],
          mockSizes: ['Sesión 60 minutos', 'Sesión 90 minutos'],
          mockColors: ['Aceite Lavanda', 'Aceite Eucalipto'],
        },
      ],
    },
  ],

  // SALUD
  salud_farmacia: [
    {
      storeId: 'local_40',
      storeName: 'Farmatodo',
      highlight: 'Tu farmacia 24/7 con disponibilidad completa de medicamentos',
      targetNodeId: 'door-farmatodo',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#0047AB',
      brandAccent: '#DBEAFE',
      brandMonogram: 'F',
      brandTone: 'warm',
      products: [
        {
          id: 'ft-med-1',
          name: 'Analgésico Ibuprofeno 400mg x 10 Cápsulas Blandas',
          description: 'Alivio rápido de dolor e inflamación con cápsulas líquidas',
          priceRange: { min: 2.5, max: 4.5 },
          iconId: 'salud',
          tags: ['analgesico', 'alivio', 'capsulas'],
          highlights: ['Acción Rápida', 'Cápsula Blanda'],
          mockSizes: ['Caja 10 Cápsulas', 'Caja 20 Cápsulas'],
          mockColors: ['Cápsula Ámbar'],
        },
      ],
    },
  ],

  salud_vitaminas: [
    {
      storeId: 'local_40',
      storeName: 'Farmatodo',
      highlight: 'Suplementos nutricionales y vitaminas para energía activa',
      targetNodeId: 'door-farmatodo',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#0047AB',
      brandAccent: '#DBEAFE',
      brandMonogram: 'F',
      brandTone: 'warm',
      products: [
        {
          id: 'ft-vit-1',
          name: 'Citrato de Magnesio Puro 400mg x 60 Cápsulas',
          description: 'Apoyo para relajación muscular, descanso nocturno y sistema nervioso',
          priceRange: { min: 14, max: 20 },
          iconId: 'salud',
          tags: ['magnesio', 'suplemento', 'descanso'],
          highlights: ['Alta Biodisponibilidad', '60 Dosis'],
          mockSizes: ['Frasco 60 cápsulas'],
          mockColors: ['Blanco'],
        },
      ],
    },
  ],

  // ENTRETENIMIENTO
  cine_peliculas: [
    {
      storeId: 'local_43',
      storeName: 'Cines Unidos',
      highlight: 'Experiencia cinematográfica con salas IMAX y sonido Dolby Atmos',
      targetNodeId: 'door-cines_unidos',
      floorLabel: 'Nivel Diversión (L5)',
      brandColor: '#1E1B4B',
      brandAccent: '#F59E0B',
      brandMonogram: 'C',
      brandTone: 'premium',
      products: [
        {
          id: 'cu-ent-1',
          name: 'Entrada Sala Digital 3D',
          description: 'Boleto numerado para sala digital de alta definición con lentes 3D',
          priceRange: { min: 4.0, max: 6.0 },
          iconId: 'entretenimiento',
          tags: ['cine', 'boleto', '3d'],
          highlights: ['Asientos Reclinables', 'Sonido Envolvente'],
          mockSizes: ['General Adulto', 'Niños y Senior'],
          mockColors: ['Digital 2D', 'Digital 3D'],
        },
      ],
    },
  ],

  cine_confiteria: [
    {
      storeId: 'local_43',
      storeName: 'Cines Unidos Confitería',
      highlight: 'Cotufas calientes con mantequilla, tequeños y bebidas frías',
      targetNodeId: 'door-cines_unidos',
      floorLabel: 'Nivel Diversión (L5)',
      brandColor: '#1E1B4B',
      brandAccent: '#F59E0B',
      brandMonogram: 'C',
      brandTone: 'premium',
      products: [
        {
          id: 'cu-cmb-1',
          name: 'Combo Dúo: Cotufa Extragrande + 2 Refrescos',
          description: 'Cotufa recién salida con mantequilla dorada y dos bebidas de 32oz',
          priceRange: { min: 9.0, max: 12.0 },
          iconId: 'entretenimiento',
          tags: ['cotufas', 'combo', 'dulce-salada'],
          highlights: ['Cotufa Extragrande', 'Doble Refresco 32oz'],
          mockSizes: ['Combo Mediano', 'Combo Extragrande'],
          mockColors: ['Mantequilla Tradicional', 'Caramelo Dulce'],
        },
      ],
    },
  ],

  // SERVICIOS / BANCOS
  banca_servicios: [
    {
      storeId: 'local_bnc',
      storeName: 'Banco Nac. de Crédito (BNC)',
      highlight: 'Atención personalizada, apertura de cuentas y operaciones de divisas',
      targetNodeId: 'node-91',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#1E3A8A',
      brandAccent: '#60A5FA',
      brandMonogram: 'B',
      brandTone: 'premium',
      products: [
        {
          id: 'bnc-srv-1',
          name: 'Apertura de Cuenta Digital y Tarjeta Débito Mastercard',
          description: 'Gestión inmediata de cuenta corriente y entrega de tarjeta contactless',
          priceRange: { min: 0, max: 0 },
          iconId: 'finanzas',
          tags: ['cuenta', 'tarjeta', 'debito'],
          highlights: ['Entrega Inmediata', 'Sin Depósito Mínimo', 'Pago Móvil Activo'],
          mockSizes: ['Cuenta Natural'],
          mockColors: ['Tarjeta Contactless'],
        },
      ],
    },
    {
      storeId: 'provincial',
      storeName: 'Banco Provincial BBVA',
      highlight: 'Soluciones financieras ágiles y plataforma internacional',
      targetNodeId: 'node-50',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#004481',
      brandAccent: '#00A9E0',
      brandMonogram: 'P',
      brandTone: 'premium',
      products: [
        {
          id: 'bp-srv-1',
          name: 'Asesoría de Crédito y Servicios de Divisas BBVA',
          description: 'Atención corporativa y de personas para compra/venta de divisas',
          priceRange: { min: 0, max: 0 },
          iconId: 'finanzas',
          tags: ['banca', 'divisas', 'credito'],
          highlights: ['Plataforma Segura', 'Atención en Taquilla'],
          mockSizes: ['Atención Integral'],
          mockColors: ['Azul Provincial'],
        },
      ],
    },
  ],

  banca_cajeros: [
    {
      storeId: 'local_bnc',
      storeName: 'Cajeros Automáticos BNC 24/7',
      highlight: 'Dispensadores de efectivo continuo en Nivel Autopista',
      targetNodeId: 'node-91',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#1E3A8A',
      brandAccent: '#60A5FA',
      brandMonogram: 'B',
      brandTone: 'premium',
      products: [
        {
          id: 'bnc-atm-1',
          name: 'Retiro de Efectivo y Consulta Multiservicio',
          description: 'Dispensador de billetes de alta denominación con lector chip y contactless',
          priceRange: { min: 0, max: 0 },
          iconId: 'cajero',
          tags: ['atm', 'efectivo', 'retiro'],
          highlights: ['Servicio 24/7', 'Lector Contactless', 'Impresión de Ticket'],
          mockSizes: ['Retiro Estándar'],
          mockColors: ['Pantalla Táctil'],
        },
      ],
    },
  ],

  // HOGAR
  hogar_textil: [
    {
      storeId: 'local_4',
      storeName: 'Tiendas Tijerazo Hogar',
      highlight: 'El departamento más completo de lencería y ropa de cama',
      targetNodeId: 'door-tijerazo',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#DC2626',
      brandAccent: '#FEF2F2',
      brandMonogram: 'T',
      brandTone: 'vibrant',
      products: [
        {
          id: 'tj-hg-1',
          name: 'Juego de Sábanas 1800 Hilos Microfibra King',
          description: 'Tacto sedoso hipoalergénico con elástico perimetral profundo',
          priceRange: { min: 18, max: 28 },
          iconId: 'hogar',
          tags: ['sabanas', 'king', 'microfibra'],
          highlights: ['1800 Hilos Suavidad', 'Hipoalergénico', 'No Destiñe'],
          mockSizes: ['Individual', 'Matrimonial', 'Queen', 'King'],
          mockColors: ['Blanco Hotel', 'Gris Plata', 'Azul Marino'],
        },
      ],
    },
  ],

  hogar_aromas: [
    {
      storeId: 'bath_body_works',
      storeName: 'Bath & Body Works Hogar',
      highlight: 'Velas aromáticas de 3 mechas con aceites esenciales botánicos',
      targetNodeId: 'node-73',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#1D4ED8',
      brandAccent: '#BFDBFE',
      brandMonogram: 'B',
      brandTone: 'vibrant',
      products: [
        {
          id: 'bbw-vl-1',
          name: 'Vela Aromática 3 Mechas "Mahogany Teakwood"',
          description: 'Mezcla rica de caoba oscura, madera de teca negra y lavanda helada',
          priceRange: { min: 24, max: 28 },
          iconId: 'hogar',
          tags: ['vela', 'aroma', '3-mechas'],
          highlights: ['Hasta 45 Horas de Duración', 'Aceites Esenciales Naturales'],
          mockSizes: ['411 gramos'],
          mockColors: ['Frasco Vidrio Grabado'],
        },
      ],
    },
  ],

  // NIÑOS
  ninos_moda: [
    {
      storeId: 'zara',
      storeName: 'ZARA Kids',
      highlight: 'Moda contemporánea y resistente para niños y bebés',
      targetNodeId: 'door-zara',
      floorLabel: 'Nivel Acuario (L2)',
      brandColor: '#0F172A',
      brandAccent: '#E2E8F0',
      brandMonogram: 'Z',
      brandTone: 'minimal',
      products: [
        {
          id: 'zk-md-1',
          name: 'Conjunto Sudadera y Jogger Algodón Orgánico',
          description: 'Tejido afelpado cálido y resistente para juegos diarios',
          priceRange: { min: 25, max: 38 },
          iconId: 'bebes',
          tags: ['ninos', 'organico', 'comodo'],
          highlights: ['Algodón Orgánico 100%', 'Cintura Ajustable'],
          mockSizes: ['3-4 Años', '5-6 Años', '7-8 Años', '9-10 Años'],
          mockColors: ['Gris Vigoré', 'Azul Nube', 'Menta'],
        },
      ],
    },
  ],

  ninos_juguetes: [
    {
      storeId: 'local_4',
      storeName: 'Tiendas Tijerazo Juguetería',
      highlight: 'Gran mundo de juguetes, juegos de mesa y muñecas',
      targetNodeId: 'door-tijerazo',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#DC2626',
      brandAccent: '#FEF2F2',
      brandMonogram: 'T',
      brandTone: 'vibrant',
      products: [
        {
          id: 'tj-jg-1',
          name: 'Bloques de Construcción Ciudad Creativa (250 piezas)',
          description: 'Piezas compatibles con marcas principales para desarrollo espacial',
          priceRange: { min: 12, max: 20 },
          iconId: 'regalos',
          tags: ['bloques', 'didactico', 'creatividad'],
          highlights: ['250 Piezas', 'Plástico Libre de BPA', 'Caja Organizadora'],
          mockSizes: ['Caja 250 Piezas'],
          mockColors: ['Multicolor'],
        },
      ],
    },
  ],

  // REGALOS
  regalos_detalles: [
    {
      storeId: 'bath_body_works',
      storeName: 'Bath & Body Works Gifts',
      highlight: 'Sets de regalo con estuche de lujo listos para obsequiar',
      targetNodeId: 'node-73',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#1D4ED8',
      brandAccent: '#BFDBFE',
      brandMonogram: 'B',
      brandTone: 'vibrant',
      products: [
        {
          id: 'bbw-st-1',
          name: 'Set de Regalo "A Thousand Wishes" (Mist + Crema + Gel)',
          description: 'Trío aromático en caja decorativa con cinta de seda',
          priceRange: { min: 35, max: 45 },
          iconId: 'regalos',
          tags: ['set', 'regalo', 'lujo'],
          highlights: ['Caja de Regalo Lista', 'Trío Completo de Cuidado'],
          mockSizes: ['Caja Trío Full Size'],
          mockColors: ['Estuche Rosado Festivo'],
        },
      ],
    },
    {
      storeId: 'sansa',
      storeName: 'Sansa Accesorios',
      highlight: 'Billeteras de cuero y accesorios para ocasiones especiales',
      targetNodeId: 'door-sansa',
      floorLabel: 'Nivel Autopista (L1)',
      brandColor: '#78350F',
      brandAccent: '#FDE68A',
      brandMonogram: 'S',
      brandTone: 'warm',
      products: [
        {
          id: 'san-ac-1',
          name: 'Billetera de Cuero Clásica Bifold',
          description: 'Compartimento para billetes, 8 ranuras para tarjetas y forro RFID',
          priceRange: { min: 18, max: 28 },
          iconId: 'regalos',
          tags: ['billetera', 'cuero', 'rfid'],
          highlights: ['100% Cuero Vacuno', 'Bloqueo RFID Anti-Clonación'],
          mockSizes: ['Bifold Estándar'],
          mockColors: ['Negro Mate', 'Café Oscuro', 'Caramelo'],
        },
      ],
    },
  ],
};

// ==========================================
// 4. FUNCIONES DE BÚSQUEDA Y RESOLUCIÓN
// ==========================================
export function getCatalogOptionsForSubcategory(subcategoryId: string): CatalogStoreOption[] {
  const baseOptions = BASE_CATALOG_OPTIONS[subcategoryId] || [];

  return baseOptions.map((opt) => {
    const activeOffer = DEMO_SAMBIL_OFFERS.find((o) => o.storeId === opt.storeId);
    if (activeOffer) {
      return {
        ...opt,
        highlight: `Promo: ${activeOffer.badge} · ${activeOffer.title}`,
      };
    }
    return opt;
  });
}
