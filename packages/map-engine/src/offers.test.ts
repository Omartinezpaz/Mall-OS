import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sambilMall,
  LEVEL_AUTOPISTA,
  buildFlatScene,
  DEMO_SAMBIL_OFFERS,
  getOffersForStore,
  INITIAL_LOYALTY_STATE,
  type FlatOfferBadge,
} from './index';

const palette = {
  food: { fill: '#FEF3C7', ink: '#92400E' },
  fashion: { fill: '#FCE7F3', ink: '#9D174D' },
  services: { fill: '#E0F2FE', ink: '#0369A1' },
  beauty: { fill: '#F3E8FF', ink: '#6B21A8' },
  sports: { fill: '#DCFCE7', ink: '#15803D' },
  tech: { fill: '#E0E7FF', ink: '#3730A3' },
  other: { fill: '#F1F5F9', ink: '#1E293B' },
};

test('offers: filtra ofertas por storeId correctamente', () => {
  const tijerazoOffers = getOffersForStore(DEMO_SAMBIL_OFFERS, 'local_4');
  assert.ok(tijerazoOffers.length > 0);
  assert.equal(tijerazoOffers[0]?.badge, '30% OFF');
  assert.equal(tijerazoOffers[0]?.discountPercentage, 30);

  const nonExistent = getOffersForStore(DEMO_SAMBIL_OFFERS, 'local_inexistente');
  assert.equal(nonExistent.length, 0);
});

test('offers: INITIAL_LOYALTY_STATE tiene puntos base y logros configurados', () => {
  assert.equal(INITIAL_LOYALTY_STATE.points, 150);
  assert.equal(INITIAL_LOYALTY_STATE.level, 1);
  assert.ok(INITIAL_LOYALTY_STATE.achievements.length >= 3);
});

test('buildFlatScene: renderiza FlatOfferBadge en locales con ofertas activas', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    zoom: 2.0,
    offers: DEMO_SAMBIL_OFFERS,
  });

  const offerBadges = scene.items.filter((i): i is FlatOfferBadge => i.kind === 'offerBadge');
  assert.ok(offerBadges.length > 0, 'Debe generar al menos un FlatOfferBadge');

  const tijerazoBadge = offerBadges.find((b) => b.storeId === 'local_4');
  assert.ok(tijerazoBadge, 'Debe contener el badge de Tijerazo');
  assert.equal(tijerazoBadge.text, '30% OFF');
  assert.equal(tijerazoBadge.type, 'discount');
});

test('buildFlatScene: no renderiza badges si options.offers está vacío', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    zoom: 2.0,
    offers: [],
  });

  const offerBadges = scene.items.filter((i) => i.kind === 'offerBadge');
  assert.equal(offerBadges.length, 0);
});
