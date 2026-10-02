import { PILOT_OFFERS, OfferItem, ActivatedCoupon } from './data';

export * from './data';

// Generador de código alfanumérico limpio de 8 caracteres (alfabeto Crockford-safe: sin 0/O, 1/I/L)
const SAFE_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
export function generateCouponCode(): string {
  let code = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * SAFE_CHARS.length);
    code += SAFE_CHARS[randomIndex];
  }
  return code;
}

// Registro local en memoria/caché de cupones activados en el dispositivo
const ACTIVATED_COUPONS_MAP = new Map<string, ActivatedCoupon>();

export function getOffers(): OfferItem[] {
  return PILOT_OFFERS.filter((o) => o.status === 'active' && o.remainingCoupons > 0);
}

export function getOfferById(id: string): OfferItem | undefined {
  return PILOT_OFFERS.find((o) => o.id === id);
}

export function activateLocalCoupon(offerId: string): ActivatedCoupon {
  const offer = getOfferById(offerId);
  if (!offer) {
    throw new Error('La oferta seleccionada no existe.');
  }

  if (offer.remainingCoupons <= 0) {
    throw new Error('Lo sentimos, los cupones para esta oferta se han agotado.');
  }

  // Verifica si el usuario ya activó un cupón para esta oferta en el dispositivo
  const existing = Array.from(ACTIVATED_COUPONS_MAP.values()).find(
    (c) => c.offerId === offerId && c.status === 'active'
  );
  if (existing) {
    return existing;
  }

  // Decrementa stock local
  offer.remainingCoupons = Math.max(0, offer.remainingCoupons - 1);

  const couponId = `c_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const code = generateCouponCode();
  const activatedAt = new Date().toISOString();
  // El cupón vence en 24 horas o cuando termine la oferta (lo que ocurra primero)
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const coupon: ActivatedCoupon = {
    id: couponId,
    offerId: offer.id,
    offerTitle: offer.title,
    storeName: offer.storeName,
    storeUnit: offer.storeUnit,
    benefitLabel: offer.benefitLabel,
    terms: offer.terms,
    code,
    activatedAt,
    expiresAt,
    status: 'active',
  };

  ACTIVATED_COUPONS_MAP.set(couponId, coupon);
  return coupon;
}

export function getCouponByIdOrOfferId(id: string): ActivatedCoupon | undefined {
  // Busca por id de cupón directo o por id de oferta
  if (ACTIVATED_COUPONS_MAP.has(id)) {
    return ACTIVATED_COUPONS_MAP.get(id);
  }
  return Array.from(ACTIVATED_COUPONS_MAP.values()).find((c) => c.offerId === id);
}

export function getAllActiveCoupons(): ActivatedCoupon[] {
  return Array.from(ACTIVATED_COUPONS_MAP.values());
}
