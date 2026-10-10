export interface OfferItem {
  id: string;
  mallId: string;
  storeId: string;
  storeName: string;
  storeUnit: string;
  storeFloor: number;
  title: string;
  description: string;
  benefitLabel: string;
  terms: string;
  startsAt: string;
  endsAt: string;
  totalCoupons: number;
  remainingCoupons: number;
  perUserLimit: number;
  status: 'active' | 'paused' | 'ended';
  // Campos de presentación enriquecidos y compartidos con el Carrusel
  badge: string;
  category: 'fashion' | 'sports' | 'tech' | 'food' | 'health' | 'entertainment';
  icon: string;
  glowColor: string;
  badgeColor: string;
  imageUrl?: string;
  logo?: any;
}

export interface ActivatedCoupon {
  id: string;
  offerId: string;
  offerTitle: string;
  storeName: string;
  storeUnit: string;
  benefitLabel: string;
  terms: string;
  code: string;
  activatedAt: string;
  expiresAt: string;
  status: 'active' | 'redeemed' | 'expired';
}

export const PILOT_OFFERS: OfferItem[] = [
  {
    id: 'o0000000-0000-0000-0000-000000000001',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'zara',
    storeName: 'Tiendas del Mall',
    storeUnit: 'Nivel 1 · Tiendas Participantes',
    storeFloor: 1,
    title: '¡Gran Oportunidad! Hasta 30% OFF',
    description: 'Consigue tu oferta especial con descuentos del 5%, 10%, 20% y 30% en tiendas y productos seleccionados presentando tu código en caja.',
    benefitLabel: 'Hasta 30% OFF',
    badge: '30% OFF',
    category: 'fashion',
    icon: 'promociones',
    glowColor: '#2563EB',
    badgeColor: '#2563EB',
    terms: 'Válido un cupón por persona por día en tiendas participantes. No acumulable.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 100,
    remainingCoupons: 68,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'o0000000-0000-0000-0000-000000000008',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'local_8',
    storeName: 'Palacio del Blumer',
    storeUnit: 'Nivel Autopista · Local 8',
    storeFloor: 1,
    title: '¡Renovación de Tienda! 20% DCTO',
    description: '¡Palacio del Blumer renueva su tienda en Sambil Chacao, nivel Autopista! Fin de semana 20% DCTO por apertura y muchas sorpresas. ¡No faltes!',
    benefitLabel: '20% DCTO Apertura',
    badge: '20% DCTO',
    category: 'fashion',
    icon: 'moda',
    glowColor: '#EC4899',
    badgeColor: '#DB2777',
    terms: 'Válido durante el fin de semana de reapertura en Palacio del Blumer Sambil Chacao, Nivel Autopista (Local 8). No acumulable con otras promociones.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 50,
    remainingCoupons: 35,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_palacio_del_blumer.png'),
  },
  {
    id: 'o0000000-0000-0000-0000-000000000002',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'zara',
    storeName: 'ZARA',
    storeUnit: 'Nivel Acuario · Local ZARA (2.500 m²)',
    storeFloor: 2,
    title: '30% OFF en abrigos',
    description: 'Colección de temporada y descuento en segunda prenda de menor valor.',
    benefitLabel: '30% OFF',
    badge: '30% OFF',
    category: 'fashion',
    icon: 'moda',
    glowColor: '#E11D48',
    badgeColor: '#E11D48',
    terms: 'Válido en caja física de ZARA Sambil Chacao. Sujeto a disponibilidad de prendas.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 50,
    remainingCoupons: 34,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_zara.png'),
  },
  {
    id: 'o0000000-0000-0000-0000-000000000003',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'nike',
    storeName: 'Nike Store',
    storeUnit: 'Nivel Acuario · Local Nike Flagship',
    storeFloor: 2,
    title: 'Nuevas zapatillas y calzado',
    description: 'Air Max 2026 y modelos running seleccionados en stock con 20% de descuento.',
    benefitLabel: '20% en Calzado',
    badge: '20% OFF',
    category: 'sports',
    icon: 'otros',
    glowColor: '#D97706',
    badgeColor: '#D97706',
    terms: 'Válido exclusivamente en la tienda oficial Nike Sambil Chacao.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 40,
    remainingCoupons: 18,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_nike.jpg'),
  },
  {
    id: 'o0000000-0000-0000-0000-000000000004',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'local_40',
    storeName: 'Farmatodo',
    storeUnit: 'Nivel Autopista · Local 40',
    storeFloor: 1,
    title: 'Cuidado Personal & Skincare',
    description: 'Lleva 2 productos seleccionados de dermocosmética y bienestar pagando solo uno.',
    benefitLabel: '2x1 PROMO',
    badge: '2x1 PROMO',
    category: 'health',
    icon: 'salud',
    glowColor: '#10B981',
    badgeColor: '#059669',
    terms: 'Válido en departamento de cuidado personal de Farmatodo Sambil Chacao.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 60,
    remainingCoupons: 42,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_farmatodo.png'),
  },
  {
    id: 'o0000000-0000-0000-0000-000000000005',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'local_4',
    storeName: 'Tiendas Tijerazo',
    storeUnit: 'Nivel Autopista · Local 4',
    storeFloor: 1,
    title: '25% OFF en Moda y Hogar',
    description: 'Toda la colección de temporada y departamento del hogar con descuento.',
    benefitLabel: '25% OFF',
    badge: '25% OFF',
    category: 'fashion',
    icon: 'moda',
    glowColor: '#DC2626',
    badgeColor: '#DC2626',
    terms: 'Válido en cajas de Tiendas Tijerazo Sambil Chacao presentando el cupón.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 45,
    remainingCoupons: 26,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_tijerazo.jpg'),
  },
  {
    id: 'o0000000-0000-0000-0000-000000000006',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'local_9',
    storeName: 'Bath & Body Works',
    storeUnit: 'Nivel Autopista · Local 9',
    storeFloor: 1,
    title: 'Fragancias y Velas: 2x1 Exclusivo',
    description: 'Aplica en aromas clásicos y nueva colección aromática de temporada.',
    benefitLabel: '2x1 EXCLUSIVO',
    badge: '2x1 EXCLUSIVO',
    category: 'health',
    icon: 'salud',
    glowColor: '#0284C7',
    badgeColor: '#0284C7',
    terms: 'Válido en tienda física Bath & Body Works Sambil Chacao.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 35,
    remainingCoupons: 19,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-2e1189311681?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_bath_body_works.png'),
  },
  {
    id: 'o0000000-0000-0000-0000-000000000007',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'local_43',
    storeName: 'Cines Unidos',
    storeUnit: 'Nivel Diversión · Terraza Cines',
    storeFloor: 5,
    title: 'Combo Cotufas Grande + Bebidas Gratis',
    description: 'Presenta este cupón en caramelería al comprar 2 entradas para cualquier función.',
    benefitLabel: 'Combo Cotufas Gratis',
    badge: 'COMBO VIP',
    category: 'entertainment',
    icon: 'otros',
    glowColor: '#9333EA',
    badgeColor: '#9333EA',
    terms: 'Válido de lunes a jueves en Cines Unidos Sambil Chacao.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 60,
    remainingCoupons: 45,
    perUserLimit: 1,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    logo: require('../../../assets/stores/logo_cines_unidos.jpg'),
  },
];
