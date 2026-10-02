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
    storeId: 's0000000-0000-0000-0000-000000000002',
    storeName: 'Panadería y Pastelería Los Cedros',
    storeUnit: 'PB-02',
    storeFloor: 0,
    title: 'Combo Café con Leche Grande + Pastel de Cortesía',
    description: 'Disfruta de un exquisito café con leche y tu pastel dulce o salado preferido de la casa.',
    benefitLabel: 'Café + Pastel Gratis',
    terms: 'Válido un cupón por persona por día. No acumulable con otras promociones.',
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
    storeId: 's0000000-0000-0000-0000-000000000005',
    storeName: 'Fitness Club Los Teques',
    storeUnit: 'P1-01',
    storeFloor: 1,
    title: 'Pase de Cortesía 1 Día de Entrenamiento',
    description: 'Acceso total por 1 día a zona de pesas, cardio, máquinas y vestuarios con asesoría de instructor.',
    benefitLabel: '1 Día de Gym Gratis',
    terms: 'Válido para nuevos miembros y residentes de los Altos Mirandinos. Requiere ropa deportiva.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 30,
    remainingCoupons: 19,
    perUserLimit: 1,
    status: 'active',
  },
  {
    id: 'o0000000-0000-0000-0000-000000000003',
    mallId: 'a0000000-0000-0000-0000-000000000001',
    storeId: 's0000000-0000-0000-0000-000000000003',
    storeName: 'Charcutería La Estancia',
    storeUnit: 'PB-03',
    storeFloor: 0,
    title: 'Descuento Especial en Combo Quesero Delicateses',
    description: 'Ahorro directo en la compra de combo de queso amarillo nacional + jamón superior.',
    benefitLabel: '20% en Combo Charcutero',
    terms: 'Sujeto a disponibilidad de inventario diario en tienda física.',
    startsAt: new Date(Date.now() - 86400000).toISOString(),
    endsAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    totalCoupons: 40,
    remainingCoupons: 27,
    perUserLimit: 1,
    status: 'active',
  },
];
