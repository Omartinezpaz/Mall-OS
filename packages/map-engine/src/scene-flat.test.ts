import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFlatScene } from './scene-flat';
import { demoMall, sambilMall, LEVEL_AUTOPISTA } from './demo-mall';
import type { Palette } from './scene';

const palette: Palette = {
  food: { fill: '#FEF3C7', ink: '#92400E' },
  fashion: { fill: '#FFFFFF', ink: '#CBD5E1' },
  other: { fill: '#F1F5F9', ink: '#1E293B' },
};

// ---------------------------------------------------------------------------
// Tests con demoMall (datos controlados)
// ---------------------------------------------------------------------------

test('buildFlatScene: sin viewport usa el centro del piso', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    zoom: 1,
  });
  // El viewBox debe estar centrado en el piso
  assert.equal(scene.viewBox.x + scene.viewBox.w / 2, 200);
  assert.equal(scene.viewBox.y + scene.viewBox.h / 2, 130);
});

test('buildFlatScene: con userPosition usa esa posición como centro', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    userPosition: { x: 100, y: 50 },
    zoom: 1,
  });
  assert.equal(scene.viewBox.x + scene.viewBox.w / 2, 100);
  assert.equal(scene.viewBox.y + scene.viewBox.h / 2, 50);
});

test('buildFlatScene: culling oculta locales fuera del viewport', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    userPosition: { x: 100, y: 100 },
    viewport: { center: { x: 100, y: 100 }, radius: 30 },
    zoom: 1,
  });
  const stores = scene.items.filter((i) => i.kind === 'store');
  // Solo el supermercado (x: 10-110, y: 10-110) debería estar visible
  assert.ok(stores.length > 0);
  assert.ok(stores.length < 10, 'Debería ocultar locales lejanos');
});

test('buildFlatScene: el destino siempre se renderiza aunque esté fuera del viewport', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    userPosition: { x: 100, y: 100 },
    viewport: { center: { x: 100, y: 100 }, radius: 20 },
    selectedStoreId: 'banco', // x: 325-390, muy lejos
    zoom: 1,
  });
  const banco = scene.items.find((i) => i.kind === 'store' && i.id === 'banco');
  assert.ok(banco, 'El destino debe estar presente');
  assert.equal((banco as any).isDestination, true);
});

test('buildFlatScene: genera pin de usuario y de destino', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    userPosition: { x: 100, y: 100 },
    userHeading: Math.PI / 4,
    selectedStoreId: 'farmacia',
    zoom: 1,
  });
  const userPin = scene.items.find((i) => i.kind === 'userPin');
  const destPin = scene.items.find((i) => i.kind === 'destinationPin');
  assert.ok(userPin);
  assert.ok(destPin);
  assert.equal((userPin as any).heading, Math.PI / 4);
  assert.equal((destPin as any).storeId, 'farmacia');
});

test('buildFlatScene: la ruta se divide en tramo inmediato y resto', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    userPosition: { x: 395, y: 148 },
    routeNodeIds: ['entrance', 'sp-370', 'sp-357', 'sp-322', 'sp-290', 'door-farmacia'],
    zoom: 1,
  });
  const route = scene.items.find((i) => i.kind === 'route') as any;
  assert.ok(route);
  assert.ok(route.immediatePointCount >= 2);
  assert.ok(route.immediatePointCount <= route.points.length);
});

test('buildFlatScene: anti-solapamiento reduce etiquetas superpuestas', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    labels: 'all',
    zoom: 3,
  });
  const labels = scene.items.filter((i) => i.kind === 'label');
  // Con 10 locales + plazas, no debería haber más de 12 etiquetas aceptadas
  assert.ok(labels.length <= 12, `Demasiadas etiquetas: ${labels.length}`);
});

test('buildFlatScene: el destino tiene prioridad 1 de etiqueta', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    selectedStoreId: 'farmacia',
    userPosition: { x: 200, y: 130 },
    zoom: 3,
  });
  const destLabel = scene.items.find(
    (i) => i.kind === 'label' && (i as any).storeId === 'farmacia'
  ) as any;
  assert.ok(destLabel);
  assert.equal(destLabel.priority, 1);
});

test('buildFlatScene: modo labels=none no genera etiquetas', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    labels: 'none',
    zoom: 3,
  });
  const labels = scene.items.filter((i) => i.kind === 'label');
  assert.equal(labels.length, 0);
});

// ---------------------------------------------------------------------------
// Tests con Sambil Autopista (datos reales)
// ---------------------------------------------------------------------------

test('buildFlatScene: Sambil Autopista con usuario en Plaza Jardín', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    userPosition: { x: 111, y: 322 }, // Plaza Jardín
    viewport: { center: { x: 111, y: 322 }, radius: 60 },
    zoom: 2,
  });
  assert.ok(scene.items.length > 20);
  assert.ok(scene.meta.visibleStoreCount > 0);
  assert.ok(scene.meta.visibleStoreCount < 116, 'No debería mostrar los 116');
});

test('buildFlatScene: Sambil Autopista con ruta a Cines Unidos', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    userPosition: { x: 111, y: 322 },
    routeNodeIds: [
      'node-plaza Jardin',
      'node-pasillo E1',
      'node-pasillo E2',
      'node-pasillo E3',
      'node-pasillo E4',
      'node-pasillo E5',
      'node-plaza Central',
      'node-pasillo G1',
      'node-pasillo G2',
      'node-pasillo G3',
      'node-entrada A2',
      'node-146',
    ],
    selectedStoreId: 'local_43',
    zoom: 1.8,
  });
  const route = scene.items.find((i) => i.kind === 'route') as any;
  assert.ok(route);
  assert.ok(route.points.length >= 10);
  const destPin = scene.items.find((i) => i.kind === 'destinationPin');
  assert.ok(destPin);
});

test('buildFlatScene: viewBox se expande si el viewport es grande', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    viewport: { center: { x: 360, y: 270 }, radius: 500 }, // más grande que el piso
    zoom: 1,
  });
  // El radio se clampea a MAX_VIEWBOX_RADIUS_UNITS (400)
  assert.equal(scene.viewBox.w, 800);
  assert.equal(scene.viewBox.h, 800);
});

test('buildFlatScene: incluye zonas y orientación en meta para Sambil Autopista', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    zoom: 1,
  });
  const zones = scene.items.filter((i) => i.kind === 'zone');
  assert.ok(zones.length >= 2, 'Debe incluir zonas temáticas');
  assert.equal(scene.meta.northAngle, -2.356194);
});

test('buildFlatScene: genera visionCone y userTrail cuando están presentes en options', () => {
  const scene = buildFlatScene(demoMall, {
    floorId: 'floor-1',
    palette,
    userPosition: { x: 100, y: 100 },
    userHeading: Math.PI / 2,
    userTrail: [
      { x: 90, y: 100 },
      { x: 95, y: 100 },
      { x: 100, y: 100 },
    ],
    zoom: 1,
  });
  const cone = scene.items.find((i) => i.kind === 'visionCone') as any;
  const trail = scene.items.find((i) => i.kind === 'userTrail') as any;

  assert.ok(cone, 'Debe generar visionCone');
  assert.equal(cone.heading, Math.PI / 2);
  assert.ok(cone.arc.length > 5);

  assert.ok(trail, 'Debe generar userTrail');
  assert.ok(trail.segments.length > 0);
});

test('buildFlatScene: locales resaltados por filtro siempre se renderizan', () => {
  const scene = buildFlatScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette,
    zoom: 2,
    viewport: { x: 50, y: 50, w: 100, h: 100 },
    highlightedStoreIds: ['local_110'], // BNC al norte, lejos del viewport
  });

  const bncStore = scene.items.find((i) => i.kind === 'store' && i.id === 'local_110');
  assert.ok(bncStore, 'El local resaltado debe renderizarse siempre');
});



