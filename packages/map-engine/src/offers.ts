/**
 * Modelo de ofertas comerciales, cupones y estado de gamificación (Modo 2).
 */

export type OfferType = 'discount' | 'gift' | 'coupon' | 'event';

export interface StoreOffer {
  id: string;
  storeId: string;
  title: string;
  description: string;
  type: OfferType;
  /** Texto corto destacado: "20% OFF", "2x1", "Gratis", "VIP" */
  badge: string;
  /** Descuento numérico opcional (ej: 20 para 20%) */
  discountPercentage?: number;
  /** Código alfanumérico para canje en caja */
  promoCode?: string;
  /** Puntos que otorga al usuario por visitar o canjear */
  rewardPoints?: number;
  /** Fecha límite de validez (ISO string) */
  expiresAt?: string;
  /** Si requiere estar físicamente en la tienda para activarse */
  requiresCheckIn: boolean;
}

export interface Coupon {
  id: string;
  offerId: string;
  storeId: string;
  title: string;
  code: string;
  claimedAt: string;
  expiresAt: string;
  isUsed: boolean;
  discountBadge: string;
}

export interface LoyaltyAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requiredCheckIns?: number;
  pointsReward: number;
}

export interface LoyaltyState {
  points: number;
  level: number;
  visitedStoreIds: string[];
  activeCoupons: Coupon[];
  achievements: LoyaltyAchievement[];
}

export const INITIAL_LOYALTY_STATE: LoyaltyState = {
  points: 150,
  level: 1,
  visitedStoreIds: [],
  activeCoupons: [],
  achievements: [
    {
      id: 'first-visit',
      title: 'Explorador Novato',
      description: 'Haz check-in en tu primera tienda',
      icon: 'compass',
      pointsReward: 50,
    },
    {
      id: 'shopaholic-5',
      title: 'Cazador de Ofertas',
      description: 'Visita 5 tiendas con descuentos activos',
      icon: 'tag',
      pointsReward: 150,
    },
    {
      id: 'gourmet-master',
      title: 'Paladar Sambil',
      description: 'Prueba 3 locales de la Zona Gastronómica',
      icon: 'utensils',
      pointsReward: 200,
    },
  ],
};

/**
 * Ofertas de demostración en vivo para Sambil Chacao
 */
export const DEMO_SAMBIL_OFFERS: StoreOffer[] = [
  {
    id: 'off-tijerazo-1',
    storeId: 'local_4', // Tiendas Tijerazo
    title: '30% en Departamento de Ropa',
    description: 'Aplica en toda la colección de temporada con cualquier método de pago.',
    type: 'discount',
    badge: '30% OFF',
    discountPercentage: 30,
    promoCode: 'TIJERA30',
    rewardPoints: 40,
    requiresCheckIn: true,
  },
  {
    id: 'off-farmatodo-1',
    storeId: 'local_40', // Farmatodo
    title: '2x1 en Cuidado Personal & Skincare',
    description: 'Lleva 2 productos seleccionados y paga solo el de mayor valor.',
    type: 'gift',
    badge: '2x1',
    promoCode: 'FARMA2X1',
    rewardPoints: 25,
    requiresCheckIn: true,
  },
  {
    id: 'off-stradivarius-1',
    storeId: 'local_114', // Stradivarius
    title: 'Cupón Exclusivo $10 por compras > $50',
    description: 'Válido para miembros de Mall OS Rewards.',
    type: 'coupon',
    badge: '$10 OFF',
    promoCode: 'STRADI10',
    rewardPoints: 50,
    requiresCheckIn: false,
  },
  {
    id: 'off-bershka-1',
    storeId: 'local_115', // Bershka
    title: 'Flash Sale: 20% en Denim & Jackets',
    description: 'Solo por hoy en el Nivel Autopista.',
    type: 'discount',
    badge: '20% OFF',
    discountPercentage: 20,
    promoCode: 'DENIM20',
    rewardPoints: 30,
    requiresCheckIn: true,
  },
  {
    id: 'off-cines-1',
    storeId: 'local_43', // Cines Unidos
    title: 'Combo Popcorn Grande + Bebida',
    description: '20% de descuento mostrando tu app en taquilla.',
    type: 'event',
    badge: 'COMBO VIP',
    promoCode: 'CINE20',
    rewardPoints: 35,
    requiresCheckIn: false,
  },
  {
    id: 'off-bath-1',
    storeId: 'local_9', // Bath & Body Works
    title: 'Fragancias y Velas: Compra 2 lleva 1 Gratis',
    description: 'Aplica en aromas clásicos y nueva colección.',
    type: 'gift',
    badge: 'GRATIS',
    promoCode: 'BATHFREE',
    rewardPoints: 30,
    requiresCheckIn: true,
  },
];

/**
 * Filtra ofertas activas para un local específico
 */
export function getOffersForStore(offers: StoreOffer[], storeId: string): StoreOffer[] {
  return offers.filter((o) => o.storeId === storeId);
}
