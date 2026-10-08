import type { MallOsIconId } from '../../components/MallOsSpriteIcon';

export interface ConciergeStoreSuggestion {
  storeId: string;
  storeName: string;
  floorName: string;
  category: string;
  badge?: string;
  dealHighlight?: string;
}

export interface ConciergeIntent {
  id: string;
  title: string;
  icon: string;
  keywords: string[];
  replyMessage: string;
  stores?: ConciergeStoreSuggestion[];
  actionCta?: {
    label: string;
    actionType: 'navigate' | 'kids_mode' | 'offers' | 'directory';
    targetId?: string;
  };
}

export interface ConciergeQuickReply {
  id: string;
  label: string;
  icon: string;
  query: string;
}

export const CONCIERGE_QUICK_REPLIES: ConciergeQuickReply[] = [
  { id: 'qr_food', label: '🍔 ¿Dónde comer?', icon: 'fast-food', query: '¿Dónde puedo comer hamburguesas o comida rápida?' },
  { id: 'qr_offers', label: '🏷️ Ofertas de hoy', icon: 'pricetag', query: '¿Cuáles son las mejores ofertas y descuentos de hoy?' },
  { id: 'qr_wc', label: '🚻 Baños cercanos', icon: 'water', query: '¿Dónde están los baños y sanitarios?' },
  { id: 'qr_kids', label: '🎮 Modo Niño', icon: 'game-controller', query: '¿Cómo funciona el juego de búsqueda del tesoro para niños?' },
  { id: 'qr_cinema', label: '🍿 Cine y películas', icon: 'film', query: '¿Dónde está el cine y qué funciones hay?' },
  { id: 'qr_parking', label: '🚗 Estacionamiento', icon: 'car', query: '¿Dónde está el estacionamiento y cómo pago el ticket?' },
  { id: 'qr_wifi', label: '📶 Clave Wi-Fi', icon: 'wifi', query: '¿Cuál es la red Wi-Fi y contraseña del mall?' },
];

export const CONCIERGE_INTENTS: ConciergeIntent[] = [
  {
    id: 'intent_fast_food',
    title: 'Gastronomía & Comida Rápida',
    icon: 'fast-food',
    keywords: ['hamburguesa', 'comer', 'comida', 'restaurante', 'almuerzo', 'cena', 'pizza', 'pollo', 'papas', 'cafe', 'feria'],
    replyMessage: '¡Tienes deliciosas opciones gastronómicas en el Nivel Feria y Nivel Autopista! Aquí te recomiendo los favoritos:',
    stores: [
      {
        storeId: 'local_38',
        storeName: "McDonald's",
        floorName: 'Nivel Feria (L4)',
        category: 'Comida Rápida',
        badge: 'Top Ventas',
        dealHighlight: 'Combo Cuarto de Libra $5.99',
      },
      {
        storeId: 'local_39',
        storeName: 'Burger King',
        floorName: 'Nivel Feria (L4)',
        category: 'Comida Rápida',
        badge: '2x1 Whopper',
        dealHighlight: 'Whopper Jr + Bebida $4.50',
      },
      {
        storeId: 'local_37',
        storeName: "Arturo's",
        floorName: 'Nivel Feria (L4)',
        category: 'Pollo Frito',
        badge: 'Familiar',
        dealHighlight: 'Combo 2 Piezas $3.99',
      },
    ],
    actionCta: {
      label: 'Ver Zona Gourmet en Mapa',
      actionType: 'navigate',
      targetId: 'local_38',
    },
  },
  {
    id: 'intent_bathroom',
    title: 'Baños y Sanitarios',
    icon: 'water',
    keywords: ['bano', 'banos', 'sanitario', 'sanitarios', 'wc', 'bano publico', 'orinar', 'lavamanos', 'tocador'],
    replyMessage: 'Los módulos de baños públicos están ubicados estratégicamente cerca de las escaleras mecánicas y plazas principales de cada nivel, con acceso para personas con movilidad reducida.',
    stores: [
      {
        storeId: 'local_4',
        storeName: 'Baños Plaza Jardín',
        floorName: 'Nivel Autopista (L1)',
        category: 'Servicios Públicos',
        badge: 'Abierto',
        dealHighlight: 'Módulo Central con cambiador de bebés',
      },
      {
        storeId: 'local_38',
        storeName: 'Baños Nivel Feria',
        floorName: 'Nivel Feria (L4)',
        category: 'Servicios Públicos',
        badge: 'Alto Tráfico',
        dealHighlight: 'Junto a la zona de mesas este',
      },
    ],
    actionCta: {
      label: 'Trazar ruta al baño más cercano',
      actionType: 'navigate',
      targetId: 'local_4',
    },
  },
  {
    id: 'intent_offers',
    title: 'Ofertas y Promociones Activas',
    icon: 'pricetag',
    keywords: ['oferta', 'ofertas', 'descuento', 'descuentos', 'promo', 'promocion', 'promociones', 'rebaja', 'rebajas', 'barato', 'cupon'],
    replyMessage: '¡Hoy tenemos promociones destacadas en tiendas de moda, tecnología y belleza! Estas son las más atractivas:',
    stores: [
      {
        storeId: 'local_40',
        storeName: 'Farmatodo',
        floorName: 'Nivel Autopista (L1)',
        category: 'Farmacia & Cuidado',
        badge: '2x1 Hoy',
        dealHighlight: '2x1 en Skincare y Protector Solar',
      },
      {
        storeId: 'local_2',
        storeName: 'ZARA',
        floorName: 'Nivel Autopista (L1)',
        category: 'Moda Internacional',
        badge: '30% OFF',
        dealHighlight: 'Hasta 30% en colección primavera',
      },
      {
        storeId: 'local_12',
        storeName: 'Bershka',
        floorName: 'Nivel Acuario (L2)',
        category: 'Moda Juvenil',
        badge: 'Micro-Deal',
        dealHighlight: 'Accesorios y tote bags desde $2.50',
      },
    ],
    actionCta: {
      label: 'Explorar catálogo de Ofertas',
      actionType: 'offers',
    },
  },
  {
    id: 'intent_hours',
    title: 'Horarios de Atención',
    icon: 'time',
    keywords: ['horario', 'horarios', 'hora', 'abre', 'abren', 'cierra', 'cierran', 'abierto', 'cerrado', 'atencion'],
    replyMessage: '🕒 El centro comercial opera de Lunes a Sábado de 10:00 AM a 9:00 PM, y Domingos de 12:00 PM a 8:00 PM. La Feria de Comida y Cines extienden su horario hasta las 11:00 PM.',
    actionCta: {
      label: 'Ver Directorio Completo',
      actionType: 'directory',
    },
  },
  {
    id: 'intent_pharmacy',
    title: 'Farmacia & Salud',
    icon: 'medkit',
    keywords: ['farmacia', 'medicina', 'medicamento', 'pastilla', 'dolor', 'farmatodo', 'locatel', 'salud', 'remedio'],
    replyMessage: 'Encuentras la farmacia principal en Nivel Autopista, con atención continua, recetario, cuidado personal y conveniencia.',
    stores: [
      {
        storeId: 'local_40',
        storeName: 'Farmatodo',
        floorName: 'Nivel Autopista (L1)',
        category: 'Farmacia & Belleza',
        badge: 'Turno Completo',
        dealHighlight: '2x1 en Vitaminas y cuidado diario',
      },
    ],
    actionCta: {
      label: 'Trazar ruta a Farmatodo',
      actionType: 'navigate',
      targetId: 'local_40',
    },
  },
  {
    id: 'intent_cinema',
    title: 'Cine & Entretenimiento',
    icon: 'film',
    keywords: ['cine', 'cines', 'pelicula', 'peliculas', 'cartelera', 'cines unidos', 'imax', 'sala', 'cotufas', 'estreno'],
    replyMessage: '🍿 Cines Unidos está ubicado en el Nivel Diversión (L5). Cuenta con salas digitales 3D, sonido Dolby Atmos y área VIP con cotufas gourmet.',
    stores: [
      {
        storeId: 'local_43',
        storeName: 'Cines Unidos',
        floorName: 'Nivel Diversión (L5)',
        category: 'Entretenimiento & Cine',
        badge: 'IMAX & 3D',
        dealHighlight: 'Combo Mediano + Entrada en Promo',
      },
    ],
    actionCta: {
      label: 'Trazar ruta a Cines Unidos',
      actionType: 'navigate',
      targetId: 'local_43',
    },
  },
  {
    id: 'intent_parking',
    title: 'Estacionamiento & Tarifas',
    icon: 'car',
    keywords: ['estacionamiento', 'estacionar', 'parqueo', 'parking', 'carro', 'auto', 'vehiculo', 'ticket', 'pagar estacionamiento'],
    replyMessage: '🚗 El estacionamiento cuenta con 4 niveles subterráneos y guiado óptico inteligente. Puedes pagar tu ticket en los cajeros automáticos de Plaza Jardín o mediante la app.',
    actionCta: {
      label: 'Ver Accesos de Estacionamiento',
      actionType: 'navigate',
      targetId: 'local_4',
    },
  },
  {
    id: 'intent_wifi',
    title: 'Conectividad Wi-Fi Gratuita',
    icon: 'wifi',
    keywords: ['wifi', 'wi-fi', 'internet', 'conexion', 'red', 'clave', 'password', 'datos'],
    replyMessage: '📶 La red pública gratuita de alta velocidad es **"MALL-GUEST-FREE"**. No requiere clave; solo selecciona la red y acepta los términos en el portal de bienvenida.',
  },
  {
    id: 'intent_atm',
    title: 'Bancos y Cajeros Automáticos',
    icon: 'cash',
    keywords: ['cajero', 'cajeros', 'banco', 'bancos', 'atm', 'efectivo', 'dinero', 'bnc', 'bancamiga', 'mercantil', 'banesco', 'dolares'],
    replyMessage: 'Encuentras la zona financiera en el Nivel Autopista (L1), con cajeros automáticos multiservicio para retiro en Bs y divisas.',
    stores: [
      {
        storeId: 'local_bnc',
        storeName: 'Banco Nac. de Crédito (BNC)',
        floorName: 'Nivel Autopista (L1)',
        category: 'Banca & Finanzas',
        badge: 'Cajeros 24/7',
        dealHighlight: 'Dispensadores de efectivo y taquilla',
      },
    ],
    actionCta: {
      label: 'Trazar ruta a Zona Bancaria',
      actionType: 'navigate',
      targetId: 'local_bnc',
    },
  },
  {
    id: 'intent_kids_mode',
    title: 'Modo Niño: Búsqueda del Tesoro',
    icon: 'game-controller',
    keywords: ['nino', 'ninos', 'juego', 'juegos', 'tesoro', 'kids', 'explorador', 'premio nino', 'acertijo', 'reto'],
    replyMessage: '🎮 ¡El juego "Exploradores del Mall" te desafía a recorrer 5 estaciones, escanear productos con código QR, resolver acertijos y ganar premios reales como helados y cotufas gratis!',
    actionCta: {
      label: '¡Abrir Búsqueda del Tesoro! 🏆',
      actionType: 'kids_mode',
    },
  },
  {
    id: 'intent_fashion',
    title: 'Moda y Ropa',
    icon: 'shirt',
    keywords: ['ropa', 'moda', 'zara', 'bershka', 'stradivarius', 'camisa', 'pantalon', 'vestido', 'zapatos', 'tiendas de ropa', 'tijerazo'],
    replyMessage: '👗 Encuentra las mejores marcas de moda y retail en Nivel Autopista y Nivel Acuario:',
    stores: [
      {
        storeId: 'local_2',
        storeName: 'ZARA',
        floorName: 'Nivel Autopista (L1)',
        category: 'Moda Internacional',
        badge: 'Nueva Colección',
        dealHighlight: 'Moda masculina, femenina e infantil',
      },
      {
        storeId: 'local_12',
        storeName: 'Bershka',
        floorName: 'Nivel Acuario (L2)',
        category: 'Moda Urbana',
        badge: 'Tendencias',
        dealHighlight: 'Ropa juvenil y accesorios',
      },
      {
        storeId: 'local_4',
        storeName: 'Tiendas Tijerazo',
        floorName: 'Nivel Autopista (L1)',
        category: 'Tienda por Dept.',
        badge: 'Gran Formato',
        dealHighlight: 'Hogar, ropa y juguetería',
      },
    ],
    actionCta: {
      label: 'Ver Tiendas de Moda en Mapa',
      actionType: 'navigate',
      targetId: 'local_2',
    },
  },
  {
    id: 'intent_sports',
    title: 'Deportes y Calzado',
    icon: 'football',
    keywords: ['deporte', 'deportes', 'nike', 'adidas', 'sportland', 'zapato', 'zapatos', 'sneakers', 'gimnasio', 'fitness'],
    replyMessage: '👟 Para calzado deportivo, indumentaria y accesorios de entrenamiento, estas son las tiendas líderes:',
    stores: [
      {
        storeId: 'st_pb_02',
        storeName: 'Nike Store',
        floorName: 'Nivel Autopista (L1)',
        category: 'Calzado & Deporte',
        badge: 'Oficial',
        dealHighlight: 'Lanzamientos de calzado running y training',
      },
    ],
    actionCta: {
      label: 'Trazar ruta a Nike Store',
      actionType: 'navigate',
      targetId: 'st_pb_02',
    },
  },
  {
    id: 'intent_tech',
    title: 'Tecnología & Celulares',
    icon: 'phone-portrait',
    keywords: ['tecnologia', 'celular', 'celulares', 'apple', 'iphone', 'samsung', 'computadora', 'laptop', 'cargador', 'audifonos'],
    replyMessage: '📱 En Nivel Acuario y Nivel Libertador encuentras tiendas especializadas en telefonía, accesorios certificados y servicio técnico.',
    stores: [
      {
        storeId: 'local_12',
        storeName: 'Zona Tech Acuario',
        floorName: 'Nivel Acuario (L2)',
        category: 'Tecnología',
        badge: 'Accesorios',
        dealHighlight: 'Cables, fundas y servicio express',
      },
    ],
    actionCta: {
      label: 'Ver Zona Tech en Mapa',
      actionType: 'navigate',
      targetId: 'local_12',
    },
  },
  {
    id: 'intent_help',
    title: 'Información y Seguridad',
    icon: 'help-buoy',
    keywords: ['seguridad', 'perdi', 'perdida', 'informacion', 'ayuda', 'modulo', 'emergencia', 'policia', 'enfermeria'],
    replyMessage: '🛡️ El módulo central de Atención al Visitante y Seguridad está ubicado en Plaza Central (Nivel Autopista). También puedes notificar a cualquier oficial de seguridad identificado en los pasillos.',
    actionCta: {
      label: 'Trazar ruta a Información Central',
      actionType: 'navigate',
      targetId: 'local_4',
    },
  },
  {
    id: 'intent_beauty',
    title: 'Belleza & Cuidado Personal',
    icon: 'sparkles',
    keywords: ['peluqueria', 'belleza', 'barberia', 'spa', 'maquillaje', 'perfume', 'perfumeria', 'unas', 'cabello'],
    replyMessage: '✨ Encuentra servicios de peluquería, barbería, fragancias importadas y cuidado cosmético en Nivel Libertador y Nivel Autopista.',
    stores: [
      {
        storeId: 'local_40',
        storeName: 'Farmatodo Beauty Bar',
        floorName: 'Nivel Autopista (L1)',
        category: 'Cosmética & Fragancias',
        badge: 'Asesoría Gratis',
        dealHighlight: 'Probadores y marcas internacionales',
      },
    ],
    actionCta: {
      label: 'Ver Locales de Belleza',
      actionType: 'navigate',
      targetId: 'local_40',
    },
  },
];

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function findMatchingIntent(query: string): ConciergeIntent | null {
  const normalized = normalizeText(query);
  if (!normalized) return null;

  // 1. Coincidencia exacta o parcial de keywords
  let bestMatch: ConciergeIntent | null = null;
  let maxScore = 0;

  for (const intent of CONCIERGE_INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      const normKw = normalizeText(kw);
      if (normalized.includes(normKw)) {
        score += normKw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  }

  return maxScore > 0 ? bestMatch : null;
}
