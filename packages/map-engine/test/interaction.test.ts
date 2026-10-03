import test from 'node:test';
import assert from 'node:assert/strict';
import {
  baseScreen,
  buildWalkTrack,
  cameraCentering,
  computeFit,
  demoMall,
  buildScene,
  findRouteToStore,
  pickStoreAt,
  pointAtProgress,
  project,
  screenToSvg,
  svgToScreen,
  walkDurationMs,
  zoomAround,
} from '../src/index';
import type { Scene } from '../src/index';

const near = (a: number, b: number, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≉ ${b}`);
const vb = { x: -100, y: 0, w: 400, h: 200 };

test('encuadre: escala UNIFORME (no w/vw y h/vh por separado) y centrado', () => {
  const fit = computeFit(vb, 200, 500); // contenedor alto y angosto
  near(fit.scale, 0.5); // min(200/400, 500/200) = 0.5
  const c = baseScreen({ x: fit.cx, y: fit.cy }, fit);
  near(c.x, 100); near(c.y, 250);
});

test('screenToSvg es la inversa de svgToScreen con cualquier cámara', () => {
  const fit = computeFit(vb, 360, 640);
  const cam = { zoom: 2.3, tx: -41, ty: 87 };
  for (const p of [{ x: 0, y: 0 }, { x: 150, y: 120 }, { x: -90, y: 190 }]) {
    const q = screenToSvg(svgToScreen(p, fit, cam), fit, cam);
    near(q.x, p.x, 1e-9); near(q.y, p.y, 1e-9);
  }
});

test('cameraCentering deja el punto en el centro de la pantalla', () => {
  const fit = computeFit(vb, 360, 640);
  const p = { x: 123, y: 45 };
  const s = svgToScreen(p, fit, cameraCentering(p, fit, 1.7));
  near(s.x, 180); near(s.y, 320);
});

test('zoomAround mantiene fijo el punto bajo los dedos', () => {
  const fit = computeFit(vb, 360, 640);
  const cam = { zoom: 1.4, tx: 30, ty: -20 };
  const anchor = { x: 90, y: 400 };
  const before = screenToSvg(anchor, fit, cam);
  const after = screenToSvg(anchor, fit, zoomAround(cam, anchor, 3.1, fit));
  near(before.x, after.x, 1e-9); near(before.y, after.y, 1e-9);
});

const scene = (): Scene => buildScene(demoMall, { floorId: 'floor-1', palette: {}, selectedStoreId: 'farmacia' });

test('pickStoreAt: tocar la tapa de un local lo devuelve; el vacío no', () => {
  const top = project(290, 50, 9 + 3); // centro de Farmacia a la altura de su tapa (elevada)
  assert.equal(pickStoreAt(scene(), top), 'farmacia');
  const wall = project(290, 90, 4); // cara visible (sur) de Farmacia
  assert.equal(pickStoreAt(scene(), wall), 'farmacia');
  assert.equal(pickStoreAt(scene(), { x: -5000, y: -5000 }), null);
});

test('pickStoreAt: gana el local dibujado encima', () => {
  const sc: Scene = {
    viewBox: { x: 0, y: 0, w: 10, h: 10 },
    items: [
      { kind: 'polygon', points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }], fill: '#000', stroke: '#000', strokeWidth: 1, storeId: 'atras' },
      { kind: 'polygon', points: [{ x: 4, y: 4 }, { x: 8, y: 4 }, { x: 8, y: 8 }, { x: 4, y: 8 }], fill: '#000', stroke: '#000', strokeWidth: 1, storeId: 'frente' },
    ],
  };
  assert.equal(pickStoreAt(sc, { x: 5, y: 5 }), 'frente');
  assert.equal(pickStoreAt(sc, { x: 1, y: 1 }), 'atras');
});

test('buildWalkTrack: entrada → farmacia (6 vértices, 163 unidades, ~32.6 m)', () => {
  const route = findRouteToStore(demoMall, 'entrance', 'farmacia')!;
  const tr = buildWalkTrack(demoMall, route.nodeIds, 'floor-1')!;
  assert.equal(tr.xs.length, 6);
  near(tr.totalUnits, 163, 1e-6);
  near(tr.totalMeters, 32.6, 1e-6);
  assert.equal(tr.inputRange[0], 0);
  near(tr.inputRange[tr.inputRange.length - 1] as number, 1);
  assert.ok(tr.inputRange.every((v, i, a) => i === 0 || v >= (a[i - 1] as number)), 'monótono');
});

test('buildWalkTrack: nulo si no hay dos puntos distintos o el piso no coincide', () => {
  assert.equal(buildWalkTrack(demoMall, ['entrance'], 'floor-1'), null);
  assert.equal(buildWalkTrack(demoMall, ['entrance', 'entrance'], 'floor-1'), null);
  assert.equal(buildWalkTrack(demoMall, ['entrance', 'sp-370'], 'otro-piso'), null);
});

test('pointAtProgress: extremos y punto intermedio', () => {
  const route = findRouteToStore(demoMall, 'entrance', 'farmacia')!;
  const tr = buildWalkTrack(demoMall, route.nodeIds, 'floor-1')!;
  const first = pointAtProgress(tr, 0), last = pointAtProgress(tr, 1);
  near(first.x, tr.xs[0] as number); near(last.y, tr.ys[tr.ys.length - 1] as number);
  const mid = pointAtProgress(tr, 0.5);
  assert.ok(mid.x !== first.x || mid.y !== first.y);
  assert.deepEqual(pointAtProgress(tr, 7), last); // fuera de rango se acota
});

test('walkDurationMs: 33 m a 1.2 m/s ≈ 27.5 s; el doble de velocidad, la mitad', () => {
  near(walkDurationMs(33), 27500, 1e-6);
  near(walkDurationMs(33, 2), 13750, 1e-6);
});
