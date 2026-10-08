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
    storeId: 'local_farmatodo',
    storeName: 'Farmatodo',
    storeUnit: 'Nivel Autopista · Local AT-12',
    storeFloor: 1,
    title: '2x1 en Cuidado Personal & Belleza',
    description: 'Aprovecha 2x1 en productos de cuidado capilar y dermatológico seleccionados presentando tu código en caja.',
    benefitLabel: '2x1 Cuidado Personal',
    terms: 'Válido un cupón por persona por día en Farmatodo Sambil Chacao. No acumulable.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 50,
    remainingCoupons: 34,
    perUserLimit: 1,
    status: 'active',
  },
  {
    id: 'o0000000-0000-0000-0000-000000000002',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'st_pb_01',
    storeName: 'ZARA',
    storeUnit: 'Nivel Autopista · Local ZR-01',
    storeFloor: 1,
    title: '30% OFF en Segunda Prenda',
    description: 'Descuento especial del 30% en la segunda prenda de menor valor de la colección actual.',
    benefitLabel: '30% en 2da Prenda',
    terms: 'Válido en caja física de ZARA Sambil Chacao. Sujeto a disponibilidad.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 40,
    remainingCoupons: 22,
    perUserLimit: 1,
    status: 'active',
  },
  {
    id: 'o0000000-0000-0000-0000-000000000003',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'st_pb_02',
    storeName: 'Nike Store',
    storeUnit: 'Nivel Autopista · Local NK-08',
    storeFloor: 1,
    title: '20% OFF en Calzado Deportivo',
    description: 'Descuento del 20% en modelos seleccionados de calzado para running y training.',
    benefitLabel: '20% en Calzado',
    terms: 'Válido exclusivamente en la tienda oficial Nike Sambil Chacao.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 30,
    remainingCoupons: 14,
    perUserLimit: 1,
    status: 'active',
  },
  {
    id: 'o0000000-0000-0000-0000-000000000004',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 'local_cines_unidos',
    storeName: 'Cines Unidos',
    storeUnit: 'Nivel Diversión · Terraza Cines',
    storeFloor: 5,
    title: 'Combo Cotufas Grande + 2 Bebidas Gratis',
    description: 'Presenta este cupón en caramelería al comprar 2 entradas para cualquier función.',
    benefitLabel: 'Combo Cotufas Gratis',
    terms: 'Válido de lunes a jueves en Cines Unidos Sambil Chacao.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 60,
    remainingCoupons: 45,
    perUserLimit: 1,
    status: 'active',
  },
];
