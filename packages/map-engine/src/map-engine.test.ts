import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildScene,
  demoMall,
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
  findRoute,
  findRouteToStore,
  findNearestNode,
  hasErrors,
  polylineLength,
  samplePolyline,
  sceneToSvg,
  segmentCrossesRectInterior,
  smoothPolyline,
  validateMapData,
  distanceToRectPerimeter,
  project,
  unproject,
  DEFAULT_ISO,
  extrudePolygon,
  extrudeFlatPolygon,
  projectBounds,
  generateMallQualityReport,
  generateNavigationPlan,
} from './index';
import type { MallMapData, NavNode } from './index';

const clone = (m: MallMapData): MallMapData => structuredClone(m);
const palette = { food: { fill: '#FEF3C7', ink: '#92400E' }, other: { fill: '#F1F5F9', ink: '#1E293B' } };
const codes = (m: MallMapData) => validateMapData(m).filter((i) => i.severity === 'error').map((i) => i.code);

// ---------- Validación ----------
test('el mapa demo no tiene errores ni avisos', () => {
  assert.deepEqual(validateMapData(demoMall), []);
});

test('detecta ids duplicados', () => {
  const m = clone(demoMall);
  m.stores.push({ ...m.stores[0]! });
  assert.ok(codes(m).includes('DUPLICATE_ID'));
});

test('detecta local con puerta inexistente', () => {
  const m = clone(demoMall);
  m.stores[0]!.doorNodeId = 'no-existe';
  assert.ok(codes(m).includes('MISSING_DOOR_NODE'));
});

test('detecta conexión a nodo inexistente', () => {
  const m = clone(demoMall);
  m.nodes[0]!.connections.push('fantasma');
  assert.ok(codes(m).includes('MISSING_NODE_REF'));
});

test('avisa de conexiones declaradas en un solo sentido', () => {
  const m = clone(demoMall);
  const door = m.nodes.find((x) => x.id === 'door-banco')!;
  door.connections = [];
  const w = validateMapData(m).filter((i) => i.code === 'ASYMMETRIC_CONNECTION');
  assert.ok(w.length >= 1);
});

test('detecta locales solapados', () => {
  const m = clone(demoMall);
  m.stores.find((s) => s.id === 'charcuteria')!.x = 150;
  assert.ok(codes(m).includes('STORES_OVERLAP'));
});

test('detecta local fuera del plano', () => {
  const m = clone(demoMall);
  m.stores.find((s) => s.id === 'banco')!.x = 380;
  assert.ok(codes(m).includes('OUT_OF_BOUNDS'));
});

test('detecta tramo que atraviesa un local (la ruta no puede cruzar paredes)', () => {
  const m = clone(demoMall);
  // Una puerta del Banco unida directo a la Farmacia atravesaría el local.
  m.nodes.find((x) => x.id === 'door-banco')!.connections.push('door-farmacia');
  m.nodes.find((x) => x.id === 'door-farmacia')!.connections.push('door-banco');
  m.nodes.find((x) => x.id === 'door-banco')!.y = 40; // ahora está dentro del Banco
  assert.ok(codes(m).includes('NODE_BLOCKED') || codes(m).includes('EDGE_CROSSES_OBSTACLE') || codes(m).includes('DOOR_NODE_BLOCKED'));
});

test('detecta tramo que atraviesa la fuente', () => {
  const m = clone(demoMall);
  m.nodes.find((x) => x.id === 'sp-200')!.y = 130;
  m.nodes.find((x) => x.id === 'sp-265')!.y = 130;
  assert.ok(codes(m).includes('EDGE_CROSSES_OBSTACLE'));
});

test('detecta local inalcanzable desde las entradas', () => {
  const m = clone(demoMall);
  m.nodes.find((x) => x.id === 'sp-115')!.connections = ['door-super', 'door-gym'];
  m.nodes.find((x) => x.id === 'sp-160')!.connections = ['sp-180', 'door-panaderia'];
  assert.ok(codes(m).includes('STORE_UNREACHABLE'));
});

test('exige al menos una entrada', () => {
  const m = clone(demoMall);
  m.nodes.find((x) => x.id === 'entrance')!.kind = 'corridor';
  assert.ok(codes(m).includes('NO_ENTRANCE'));
});

test('solo escaleras/ascensores pueden unir pisos', () => {
  const m = clone(demoMall);
  m.floors.push({ ...m.floors[0]!, id: 'floor-2', level: 2, areas: [], obstacles: [] });
  const up: NavNode = { id: 'p2', floorId: 'floor-2', x: 100, y: 148, kind: 'corridor', connections: ['sp-115'] };
  m.nodes.push(up);
  m.nodes.find((x) => x.id === 'sp-115')!.connections.push('p2');
  assert.ok(codes(m).includes('BAD_VERTICAL_LINK'));
});

// ---------- Geometría ----------
test('segmento que solo toca el borde no cuenta como cruce', () => {
  const r = { x: 0, y: 0, w: 10, h: 10 };
  assert.equal(segmentCrossesRectInterior({ x: 10, y: -5 }, { x: 10, y: 15 }, r), false);
  assert.equal(segmentCrossesRectInterior({ x: -5, y: 5 }, { x: 15, y: 5 }, r), true);
});

// ---------- Rutas ----------
test('ruta entrada → farmacia: camino y distancia esperados', () => {
  const r = findRouteToStore(demoMall, 'entrance', 'farmacia')!;
  assert.deepEqual(r.nodeIds, ['entrance', 'sp-370', 'sp-357', 'sp-322', 'sp-290', 'door-farmacia']);
  assert.ok(Math.abs(r.distanceUnits - 163) < 0.001, `unidades: ${r.distanceUnits}`);
  assert.ok(Math.abs(r.distanceMeters - 32.6) < 0.01);
  assert.equal(r.walkingMinutes, 1);
});

test('desde la entrada se llega a TODOS los locales', () => {
  for (const s of demoMall.stores) {
    assert.ok(findRouteToStore(demoMall, 'entrance', s.id), `sin ruta a ${s.id}`);
  }
});

test('la ruta es simétrica en distancia', () => {
  const a = findRoute(demoMall, 'door-gym', 'door-banco')!;
  const b = findRoute(demoMall, 'door-banco', 'door-gym')!;
  assert.ok(Math.abs(a.distanceUnits - b.distanceUnits) < 1e-9);
});

test('Dijkstra elige menor DISTANCIA aunque tenga más saltos', () => {
  const m: MallMapData = {
    mallSlug: 't',
    metersPerUnit: 1,
    floors: [{ id: 'f', name: 'f', level: 1, width: 500, height: 500, areas: [], obstacles: [] }],
    stores: [],
    nodes: [
      { id: 'A', floorId: 'f', x: 0, y: 0, kind: 'entrance', connections: ['C', 'D'] },
      { id: 'C', floorId: 'f', x: 400, y: 0, kind: 'corridor', connections: ['A', 'B'] }, // directo pero largo: 400 + 100
      { id: 'D', floorId: 'f', x: 0, y: 30, kind: 'corridor', connections: ['A', 'E'] },
      { id: 'E', floorId: 'f', x: 0, y: 60, kind: 'corridor', connections: ['D', 'F'] },
      { id: 'F', floorId: 'f', x: 0, y: 90, kind: 'corridor', connections: ['E', 'B'] }, // 4 saltos, 120 en total
      { id: 'B', floorId: 'f', x: 30, y: 90, kind: 'corridor', connections: ['C', 'F'] },
    ],
  };
  const r = findRoute(m, 'A', 'B')!;
  assert.deepEqual(r.nodeIds, ['A', 'D', 'E', 'F', 'B']);
  assert.ok(Math.abs(r.distanceUnits - 120) < 1e-9);
});

test('ruta inexistente o a nodo desconocido devuelve null', () => {
  assert.equal(findRoute(demoMall, 'entrance', 'no-existe'), null);
  const m = clone(demoMall);
  m.nodes.find((x) => x.id === 'sp-115')!.connections = ['door-super', 'door-gym'];
  m.nodes.find((x) => x.id === 'sp-160')!.connections = ['sp-180', 'door-panaderia'];
  assert.equal(findRoute(m, 'entrance', 'door-gym'), null);
});

test('multi-piso: cambiar de piso cuesta (escalera) y se enruta', () => {
  const m = clone(demoMall);
  m.floors.push({ ...m.floors[0]!, id: 'floor-2', level: 2, areas: [], obstacles: [] });
  m.nodes.find((x) => x.id === 'sp-115')!.connections.push('stairs-1');
  m.nodes.push({ id: 'stairs-1', floorId: 'floor-1', x: 115, y: 140, kind: 'stairs', connections: ['sp-115', 'stairs-2'] });
  m.nodes.push({ id: 'stairs-2', floorId: 'floor-2', x: 115, y: 140, kind: 'stairs', connections: ['stairs-1'] });
  const r = findRoute(m, 'entrance', 'stairs-2')!;
  assert.equal(r.nodeIds.at(-1), 'stairs-2');
  assert.ok(r.distanceMeters > 15, 'incluye el coste vertical');
});

// ---------- Escena y SVG ----------
test('la escena marca el local seleccionado y la ruta', () => {
  const route = findRouteToStore(demoMall, 'entrance', 'farmacia')!;
  const scene = buildScene(demoMall, { floorId: 'floor-1', palette, selectedStoreId: 'farmacia', routeNodeIds: route.nodeIds });
  assert.ok(scene.items.some((i) => i.kind === 'pin'));
  const thick = scene.items.filter((i) => i.kind === 'polyline' && i.strokeWidth >= 8);
  assert.equal(thick.length, 3, 'resplandor + borde + cinta');
  const farm = scene.items.filter((i) => 'storeId' in i && i.storeId === 'farmacia');
  assert.ok(farm.length >= 4, 'caras + etiqueta (+ fachada)');
  assert.ok(farm.some((i) => i.kind === 'text'));
});

test('la escena es determinista', () => {
  const a = sceneToSvg(buildScene(demoMall, { floorId: 'floor-1', palette }));
  const b = sceneToSvg(buildScene(demoMall, { floorId: 'floor-1', palette }));
  assert.equal(a, b);
});

test('el SVG escapa nombres con caracteres especiales', () => {
  const m = clone(demoMall);
  m.stores[0]!.name = 'Pan & Café <"X">';
  const svg = sceneToSvg(buildScene(m, { floorId: 'floor-1', palette }));
  assert.ok(svg.includes('Pan &amp; Café &lt;&quot;X&quot;&gt;'));
  assert.ok(!svg.includes('<"X">'));
});

test('piso inexistente lanza error claro', () => {
  assert.throws(() => buildScene(demoMall, { floorId: 'nada', palette }), /Piso inexistente/);
});

test('labels="none" no emite textos', () => {
  const scene = buildScene(demoMall, { floorId: 'floor-1', palette, labels: 'none' });
  assert.equal(scene.items.filter((i) => i.kind === 'text').length, 0);
});

test('hasErrors distingue avisos de errores', () => {
  assert.equal(hasErrors([{ severity: 'warning', code: 'X', message: 'm' }]), false);
  assert.equal(hasErrors([{ severity: 'error', code: 'X', message: 'm' }]), true);
});

// ---------- Detalles (props) y cinta de ruta ----------
test('un tramo de ruta no puede atravesar un árbol', () => {
  const m = clone(demoMall);
  m.floors[0]!.props = [...(m.floors[0]!.props ?? []), { id: 'arbol-malo', kind: 'tree', x: 225, y: 148 }];
  assert.ok(codes(m).includes('EDGE_CROSSES_OBSTACLE') || codes(m).includes('NODE_BLOCKED'));
});

test('las insignias (poi) no bloquean rutas', () => {
  const m = clone(demoMall);
  m.floors[0]!.props = [...(m.floors[0]!.props ?? []), { id: 'poi-x', kind: 'poi', poi: 'info', x: 225, y: 148 }];
  assert.deepEqual(validateMapData(m), []);
});

test('detail="full" añade sombras, baldosas y detalles; "lite" no; "medium" es equilibrado', () => {
  const full = buildScene(demoMall, { floorId: 'floor-1', palette, detail: 'full' });
  const med = buildScene(demoMall, { floorId: 'floor-1', palette, detail: 'medium' });
  const lite = buildScene(demoMall, { floorId: 'floor-1', palette, detail: 'lite' });

  assert.ok(full.items.length > med.items.length);
  assert.ok(med.items.length > lite.items.length);
  assert.equal(lite.items.filter((i) => i.kind === 'circle').length, 0);
  assert.equal(lite.items.filter((i) => i.kind === 'ellipse').length, 0);
  assert.ok(full.items.filter((i) => i.kind === 'circle').length > 20, 'copas de árboles y macetas');
});

test('validador: detecta NODE_OUT_OF_BOUNDS si un nodo está fuera del piso', () => {
  const m = clone(demoMall);
  m.nodes.push({ id: 'node-afuera', floorId: 'floor-1', kind: 'corridor', x: 999, y: 999, connections: [] });
  assert.ok(codes(m).includes('NODE_OUT_OF_BOUNDS'));
});

test('validador: detecta PROP_OUT_OF_BOUNDS si un prop se sale de los límites del plano', () => {
  const m = clone(demoMall);
  m.floors[0]!.props = [...(m.floors[0]!.props ?? []), { id: 'tree-afuera', kind: 'tree', x: -1, y: 50 }];
  assert.ok(codes(m).includes('PROP_OUT_OF_BOUNDS'));
});

test('validador: detecta DOOR_NODE_BLOCKED si la puerta está en el interior del local', () => {
  const m = clone(demoMall);
  const store = m.stores[0]!;
  const door = m.nodes.find((n) => n.id === store.doorNodeId)!;
  door.x = store.x + store.w / 2;
  door.y = store.y + store.h / 2;
  assert.ok(codes(m).includes('DOOR_NODE_BLOCKED'));
});

test('validador: detecta DISCONNECTED_NODE si un nodo no tiene conexiones', () => {
  const m = clone(demoMall);
  m.nodes.push({ id: 'node-solitario', floorId: 'floor-1', kind: 'corridor', x: 100, y: 100, connections: [] });
  const allCodes = validateMapData(m).map((i) => i.code);
  assert.ok(allCodes.includes('DISCONNECTED_NODE'));
});

test('validador: detecta INVALID_VERTICAL_LINK si se conecta un ascensor con una escalera', () => {
  const m = clone(demoMall);
  m.floors.push({ id: 'floor-2', name: 'Nivel 2', level: 2, width: 400, height: 260, areas: [], obstacles: [] });
  m.nodes.push(
    { id: 'stairs-f1', floorId: 'floor-1', kind: 'stairs', x: 200, y: 150, connections: ['elevator-f2'] },
    { id: 'elevator-f2', floorId: 'floor-2', kind: 'elevator', x: 200, y: 150, connections: ['stairs-f1'] }
  );
  assert.ok(codes(m).includes('INVALID_VERTICAL_LINK'));
});

test('las insignias se dibujan también en modo lite', () => {
  const lite = buildScene(demoMall, { floorId: 'floor-1', palette, detail: 'lite' });
  assert.equal(lite.items.filter((i) => i.kind === 'badge').length, 3);
});

test('smoothPolyline conserva extremos y redondea esquinas', () => {
  const a = { x: 0, y: 0 };
  const c = { x: 100, y: 100 };
  const out = smoothPolyline([a, { x: 100, y: 0 }, c], 2);
  assert.deepEqual(out[0], a);
  assert.deepEqual(out.at(-1), c);
  assert.ok(out.length > 3);
  assert.ok(polylineLength(out) < 200, 'cortar esquinas acorta el trazo');
});

test('samplePolyline: separación regular y fase desplaza las muestras', () => {
  const line = [{ x: 0, y: 0 }, { x: 100, y: 0 }];
  const s0 = samplePolyline(line, 25, 0);
  assert.deepEqual(s0.map((s) => Math.round(s.x)), [0, 25, 50, 75, 100]);
  const s1 = samplePolyline(line, 25, 0.4);
  assert.deepEqual(s1.map((s) => Math.round(s.x)), [10, 35, 60, 85]);
  assert.ok(s1.every((s) => s.angle === 0));
});

test('la ruta dibuja flechas y animar la fase las desplaza', () => {
  const route = findRouteToStore(demoMall, 'entrance', 'farmacia')!;
  const chevrons = (phase: number) =>
    buildScene(demoMall, { floorId: 'floor-1', palette, routeNodeIds: route.nodeIds, routePhase: phase }).items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 2.2);
  assert.ok(chevrons(0).length >= 5);
  assert.notDeepEqual(chevrons(0)[0], chevrons(0.5)[0]);
});

test('el SVG incluye insignias y círculos', () => {
  const svg = sceneToSvg(buildScene(demoMall, { floorId: 'floor-1', palette }));
  assert.ok(svg.includes('<circle'));
  assert.ok(svg.includes('>WC</text>'));
});

// ---------- Paquete de acabado (fachadas, elevación, halo, escaleras) ----------
const withId = (scene: ReturnType<typeof buildScene>, id: string) => scene.items.filter((i) => 'storeId' in i && i.storeId === id);

test('fachada: solo los locales con puerta en cara visible (sur/este) llevan vidrio y puerta', () => {
  const scene = buildScene(demoMall, { floorId: 'floor-1', palette });
  assert.equal(withId(scene, 'comida').length, 4, 'puerta al norte (oculta): 3 caras + etiqueta, sin fachada');
  assert.ok(withId(scene, 'banco').length > 4, 'puerta al sur (visible): con fachada');
  assert.ok(withId(scene, 'gym').length > 4, 'puerta al este (visible): con fachada');
});

test('fachada: el modo lite no la dibuja', () => {
  const scene = buildScene(demoMall, { floorId: 'floor-1', palette, detail: 'lite' });
  assert.equal(withId(scene, 'banco').length, 4);
});

test('el local seleccionado se eleva (selectedLift) y el resplandor no captura toques', () => {
  const top = (lift: number) => {
    const sc = buildScene(demoMall, { floorId: 'floor-1', palette, selectedStoreId: 'banco', selectedLift: lift });
    const polys = withId(sc, 'banco').filter((i) => i.kind === 'polygon');
    return Math.min(...polys.flatMap((i) => (i.kind === 'polygon' ? i.points.map((p) => p.y) : [])));
  };
  assert.ok(top(3) < top(0), 'más arriba en pantalla = y menor');
  const sc = buildScene(demoMall, { floorId: 'floor-1', palette, selectedStoreId: 'banco' });
  const glow = sc.items.filter((i) => i.kind === 'polygon' && i.opacity === 0.18);
  assert.equal(glow.length, 1);
  assert.ok(glow.every((g) => !('storeId' in g && g.storeId)));
});

test('etiquetas de locales llevan halo del color del techo; la seleccionada no', () => {
  const sc = buildScene(demoMall, { floorId: 'floor-1', palette: { ...palette, fresh: { fill: '#DCFCE7', ink: '#166534' } }, selectedStoreId: 'banco' });
  const texts = sc.items.filter((i) => i.kind === 'text' && i.storeId);
  assert.ok(texts.length === 10);
  assert.ok(texts.filter((t) => t.kind === 'text' && t.halo).length === 9);
  const svg = sceneToSvg(sc);
  assert.ok(svg.includes('paint-order="stroke"'));
});

test('escalera con flow dibuja flechas; sin flow no', () => {
  const arrows = (m: MallMapData) => buildScene(m, { floorId: 'floor-1', palette }).items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 1.2).length;
  assert.equal(arrows(demoMall), 2);
  const m = clone(demoMall);
  const esc = m.floors[0]!.props!.find((p) => p.kind === 'escalator')!;
  if (esc.kind === 'escalator') delete esc.flow;
  assert.equal(arrows(m), 0);
});

test('presupuesto de primitivas del demo (guarda contra el crecimiento descontrolado)', () => {
  const full = buildScene(demoMall, { floorId: 'floor-1', palette, selectedStoreId: 'farmacia', routeNodeIds: findRouteToStore(demoMall, 'entrance', 'farmacia')!.nodeIds });
  const lite = buildScene(demoMall, { floorId: 'floor-1', palette, detail: 'lite' });
  assert.ok(full.items.length <= 260, `full: ${full.items.length}`);
  assert.ok(lite.items.length <= 90, `lite: ${lite.items.length}`);
});

// ---------- Capas interactivas (Touch, Horarios, Proyección) ----------
test('unproject y project son operaciones inversas en el plano base z=0', () => {
  const origX = 250;
  const origY = 160;
  const iso = project(origX, origY, 0, DEFAULT_ISO);
  const unproj = unproject(iso.x, iso.y, 0, DEFAULT_ISO);
  assert.ok(Math.abs(unproj.x - origX) < 0.001);
  assert.ok(Math.abs(unproj.y - origY) < 0.001);
});

test('findNearestNode localiza el nodo de pasillo o entrada más cercano al toque', () => {
  const touchNearEntrance = { x: 390, y: 145 };
  const nearest = findNearestNode(demoMall, 'floor-1', touchNearEntrance, ['corridor', 'entrance']);
  assert.ok(nearest);
  assert.equal(nearest.id, 'entrance');
});

test('dimmedStoreIds atenúa locales cerrados con paleta desaturada', () => {
  const sc = buildScene(demoMall, {
    floorId: 'floor-1',
    palette,
    dimmedStoreIds: ['banco', 'muebleria'],
  });
  const bancoItems = withId(sc, 'banco').filter((i) => i.kind === 'polygon');
  assert.ok(bancoItems.length > 0);
  assert.ok(bancoItems.some((i) => i.kind === 'polygon' && i.fill === '#E2E8F0'));
});

test('routePhase anima la fase de las flechas desplazando las muestras de posición', () => {
  const route = findRouteToStore(demoMall, 'entrance', 'super')!;
  const sc1 = buildScene(demoMall, { floorId: 'floor-1', palette, routeNodeIds: route.nodeIds, routePhase: 0 });
  const sc2 = buildScene(demoMall, { floorId: 'floor-1', palette, routeNodeIds: route.nodeIds, routePhase: 0.5 });
  const arrows1 = sc1.items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 2.2);
  const arrows2 = sc2.items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 2.2);
  assert.ok(arrows1.length > 0);
  assert.ok(arrows2.length > 0);
  const firstPt1 = (arrows1[0] as { points: { x: number }[] }).points[0]!.x;
  const firstPt2 = (arrows2[0] as { points: { x: number }[] }).points[0]!.x;
  assert.notEqual(firstPt1, firstPt2);
});

test('routeMode distingue estado preview (punteado sin flechas) de active (cinta con flechas)', () => {
  const route = findRouteToStore(demoMall, 'entrance', 'super')!;
  const scPreview = buildScene(demoMall, { floorId: 'floor-1', palette, routeNodeIds: route.nodeIds, routeMode: 'preview' });
  const scActive = buildScene(demoMall, { floorId: 'floor-1', palette, routeNodeIds: route.nodeIds, routeMode: 'active' });

  const dashedPolyline = scPreview.items.filter((i) => i.kind === 'polyline' && i.dash === '6,6');
  const previewArrows = scPreview.items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 2.2);
  assert.equal(dashedPolyline.length, 1);
  assert.equal(previewArrows.length, 0);

  const solidRibbon = scActive.items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 8);
  const activeArrows = scActive.items.filter((i) => i.kind === 'polyline' && i.strokeWidth === 2.2);
  assert.equal(solidRibbon.length, 1);
  assert.ok(activeArrows.length > 0);
});

// ---------- Sambil Chacao (5 Niveles) ----------
test('sambilMall tiene exactamente 5 niveles oficiales configurados', () => {
  assert.equal(sambilMall.floors.length, 5);
  const floorIds = sambilMall.floors.map((f) => f.id);
  assert.deepEqual(floorIds, [
    LEVEL_AUTOPISTA,
    LEVEL_ACUARIO,
    LEVEL_LIBERTADOR,
    LEVEL_FERIA,
    LEVEL_DIVERSION,
  ]);
});

test('sambilMall contiene las tiendas ancla principales en sus niveles correctos', () => {
  const tijerazo = sambilMall.stores.find((s) => s.id === 'local_4' || s.slug === 'tijerazo');
  const cines = sambilMall.stores.find((s) => s.id === 'local_43' || s.slug === 'cines_unidos');
  const macuto = sambilMall.stores.find((s) => s.id === 'local_5' || s.slug === 'macuto');
  const farmatodo = sambilMall.stores.find((s) => s.id === 'local_40' || s.slug === 'farmatodo');

  assert.ok(tijerazo && tijerazo.floorId === LEVEL_AUTOPISTA);
  assert.ok(cines && cines.floorId === LEVEL_AUTOPISTA);
  assert.ok(macuto && macuto.floorId === LEVEL_AUTOPISTA);
  assert.ok(farmatodo && farmatodo.floorId === LEVEL_AUTOPISTA);
});

test('sambilMall supera la validación estructural sin errores bloqueantes', () => {
  const issues = validateMapData(sambilMall);
  const errors = issues.filter((i) => i.severity === 'error');
  if (errors.length > 0) {
    console.log('=== ALL VALIDATION ERRORS ===');
    errors.forEach(e => console.log(`${e.code}: ${e.message} (ref: ${e.ref})`));
  }
  const summary = errors.slice(0, 5).map(e => `${e.code}: ${e.message}`).join(' | ');
  assert.equal(errors.length, 0, `(${errors.length} errores) Primeros: ${summary}`);
});

test('sambilMall Nivel Autopista incluye todas las tiendas y anclas del plano arquitectónico', () => {
  const autopistaStores = sambilMall.stores.filter((s) => s.floorId === LEVEL_AUTOPISTA);
  assert.ok(autopistaStores.length >= 50, `Se esperaban >= 50 locales en Nivel Autopista, encontrados: ${autopistaStores.length}`);

  // Anclas y tiendas emblemáticas
  const expectedKeys = [
    'tijerazo', 'macuto', 'lc_waikiki', 'cines_unidos', 'pull_bear', 'bershka',
    'stradivarius', 'farmatodo', 'tommy', 'bath_body', 'victoria_secret',
    'springfield', 'las_villas', 'estivaneli', 'mng', 'skechers', 'bellagio',
    'jump', 'sportland', 'crocs', 'mario_hernandez'
  ];

  for (const key of expectedKeys) {
    const store = autopistaStores.find((s) => s.id === key || s.slug === key || s.aliases?.includes(key));
    assert.ok(store, `Falta la tienda esperada: ${key} en Nivel Autopista`);
  }
});

test('sambilMall Nivel Acuario incluye todas las tiendas y anclas del plano arquitectónico oficial', () => {
  const acuarioStores = sambilMall.stores.filter((s) => s.floorId === LEVEL_ACUARIO);
  assert.ok(acuarioStores.length >= 45, `Se esperaban >= 45 locales en Nivel Acuario, encontrados: ${acuarioStores.length}`);

  // Anclas y tiendas del plano
  const expectedAcuarioKeys = [
    'zara', 'megan', 'ninja_park', 'nike', 'miniso', 'adidas', 'reebok',
    'madio', 'tecniciencia', 'parfois', 'timberland', 'piso_uno', 'creso',
    'mr_price', 'imagine', 'epk', 'columbia', 'pawer', 'box', 'travel_shop',
    'super_juguetes', 'perfumes_factory', 'she_ccs', 'filioptic', 'liah',
    'kickers', 'lili_pink', 'mundo_escolar', 'piccadilly', 'guess', 'us_polo',
    'tiendas_rori', 'ovejita', 'alby', 'clarks', 'wonka_toys', 'hero'
  ];

  for (const key of expectedAcuarioKeys) {
    const store = acuarioStores.find((s) => s.id === key);
    assert.ok(store, `Falta la tienda esperada: ${key} en Nivel Acuario`);
  }
});

test('sambilMall Nivel Libertador incluye todas las tiendas y anclas del plano arquitectónico oficial', () => {
  const libertadorStores = sambilMall.stores.filter((s) => s.floorId === LEVEL_LIBERTADOR);
  assert.ok(libertadorStores.length >= 45, `Se esperaban >= 45 locales en Nivel Libertador, encontrados: ${libertadorStores.length}`);

  // Anclas y tiendas del plano
  const expectedLibertadorKeys = [
    'zara_lib', 'balu', 'adidas_lib', 'hm_sambil', 'aldo', 'planeta_sports',
    'bancaribe', 'ax_armani', 'crocs_lib', 'yuju_lib', 'fashion_look_lib',
    'fashion_look_shoes', 'oboticario', 'granier', 'solo_chicas', 'byrichh',
    'habitu', 'motarro', 'sport_way', 'lucy_lingerie_lib', 'calzados_beba',
    'maxi_pets', 'sunrisa', 'estivaneli_lib', 'rs_moda', 'movistar_lib',
    'contexto', 'emporio_fumador', 'unico_lib', 'bambino', 'kicks',
    'camelo_cosmetic', 'camisisima', 'ceo_lib', 'box_lib', 'fountain_store',
    'lafayette', 'sensacion_23', 'joyeria_reims', 'evas_store', 'hummer_jeans',
    'new_balance', 'jump_lib', 'diesel_lib', 'radical', 'twins', 'depofit',
    'kenneth_cole', 'dasher', 'samsonite', 'adventure_sport', 'siete_camicie',
    'retro_king', 'sandro_lib', 'ciudad_alternativa', 'womensecret_lib',
    'joan_david', 'calvin_klein', 'cole_haan', 'moixi', 'saks_avenue',
    'champion', 'apolo_lib', 'mercantil', 'shana', 'only_for_kids'
  ];

  for (const key of expectedLibertadorKeys) {
    const store = libertadorStores.find((s) => s.id === key);
    assert.ok(store, `Falta la tienda esperada: ${key} en Nivel Libertador`);
  }
});

test('sambilMall Nivel Feria incluye todas las tiendas y anclas del plano arquitectónico oficial', () => {
  const feriaStores = sambilMall.stores.filter((s) => s.floorId === LEVEL_FERIA);
  assert.ok(feriaStores.length >= 45, `Se esperaban >= 45 locales en Nivel Feria, encontrados: ${feriaStores.length}`);

  // Anclas y tiendas del plano
  const expectedFeriaKeys = [
    'cinex', 'palacio_blumer_feria', 'shoe_box', 'farmatodo_feria', 'anfiteatro_feria',
    'forever_21', 'mcdonalds_feria', 'banesco_feria', 'canon', 'pandora_feria',
    'mr_sub_feria', 'charles_feria', 'pollo_dorado', 'zona_gourmet', 'chino_feria', 'chicken_grill_feria',
    'burritos_feria', 'burger_shack_feria', 'pizza_mia_feria', 'casio_cubitt', 'yogy', 'cuadro_feria',
    'orange_market', 'st_jacks_feria', 'gelateria_4d', 'chop_chop', 'caracas_burger',
    'beijing', 'full_pizza', 'covas', 'athletic_feria', 'moda_colors', 'dezuca',
    'galaxy_feria', 'optica_hd', 'everlast_feria', 'roselab', 'la_nota', 'kfc_feria',
    'jr_petare', 'sportline_feria', 'levis_feria', 'seac', 'american_eagle',
    'carters', 'zona_tech', 'opticolor_feria', 'arg_store', 'childrens_place',
    'latin_lover_feria', 'casa_plus', 'mimi_joyeria', 'swarovski_feria', 'uppomi',
    'armi_colombia', 'istore_feria', 'original_penguin', 'nine_west', 'scalpers_feria',
    'hugo_boss', 'sambil_online', 'altana_feria', 'tumi_feria', 'samsung_clx', 'skechers_feria',
    'arturo_calle', 'amira_fuad', 'acuario_tienda', 'carolina_herrera', 'cortefiel_feria'
  ];

  for (const key of expectedFeriaKeys) {
    const store = feriaStores.find((s) => s.id === key);
    assert.ok(store, `Falta la tienda esperada: ${key} en Nivel Feria`);
  }
});

test('sambilMall Nivel Diversión incluye locales de entretenimiento, terrazas y gastronomía', () => {
  const diversionStores = sambilMall.stores.filter((s) => s.floorId === LEVEL_DIVERSION);
  assert.ok(diversionStores.length >= 10, `Se esperaban >= 10 locales en Nivel Diversión, encontrados: ${diversionStores.length}`);

  const expectedDiversionKeys = [
    'hard_rock_cafe', 'lidotel_sambil', 'bowling_sambil', 'magic_park',
    'sambil_arena_events', 'cinex_vip_diversion', 'valet_vip_diversion'
  ];

  for (const key of expectedDiversionKeys) {
    const store = diversionStores.find((s) => s.id === key);
    assert.ok(store, `Falta el local esperado: ${key} en Nivel Diversión`);
  }
});

test('generateMallQualityReport genera reporte de calidad 100% aprobado para Sambil Chacao', () => {
  const report = generateMallQualityReport(sambilMall);
  assert.equal(report.isValid, true, `Reporte falló con ${report.navigationErrors.unreachableStores} inalcanzables y ${report.rawValidationIssuesCount} issues`);
  assert.equal(report.floorsCount, 5);
  assert.ok(report.storesCount >= 200, `Total locales >= 200, encontrados: ${report.storesCount}`);
  assert.equal(report.geometryErrors.outOfBounds, 0);
  assert.equal(report.geometryErrors.overlaps, 0);
  assert.equal(report.navigationErrors.unreachableStores, 0);
  assert.ok(report.formattedSummary.includes('PASSED'));
});


test('sambilMall calcula rutas exitosas entre plazas y tiendas en todos los sectores de Autopista', () => {
  // Desde Plaza Jardín hacia anclas y extremos
  const rTijerazo = findRouteToStore(sambilMall, 'node-plaza Jardin', 'tijerazo');
  assert.ok(rTijerazo && rTijerazo.nodeIds.length >= 2);

  const rCines = findRouteToStore(sambilMall, 'node-plaza Jardin', 'cines_unidos');
  assert.ok(rCines && rCines.nodeIds.length >= 2);

  const rTommy = findRouteToStore(sambilMall, 'node-plaza Jardin', 'tommy');
  assert.ok(rTommy && rTommy.nodeIds.length >= 2);

  const rBershka = findRouteToStore(sambilMall, 'node-plaza la Fuente', 'bershka');
  assert.ok(rBershka && rBershka.nodeIds.length >= 2);

  const rFarmatodo = findRouteToStore(sambilMall, 'node-plaza  el Arte', 'farmatodo');
  assert.ok(rFarmatodo && rFarmatodo.nodeIds.length >= 2);

  // Rutas en otros niveles
  const routeAcuario = findRouteToStore(sambilMall, `pj-${LEVEL_ACUARIO}`, 'zara');
  assert.ok(routeAcuario && routeAcuario.nodeIds.length >= 2);

  const routeLibertador = findRouteToStore(sambilMall, `pj-${LEVEL_LIBERTADOR}`, 'balu');
  assert.ok(routeLibertador && routeLibertador.nodeIds.length >= 2);

  const routeDiversion = findRouteToStore(sambilMall, `pj-${LEVEL_DIVERSION}`, 'cinex');
  assert.ok(routeDiversion && routeDiversion.nodeIds.length >= 2);
});

test('generateNavigationPlan produce instrucciones paso a paso con hitos y giros semánticos', () => {
  const rTijerazo = findRouteToStore(sambilMall, 'node-plaza Jardin', 'local_4');
  assert.ok(rTijerazo);

  const plan = generateNavigationPlan(sambilMall, rTijerazo, 'local_4');
  assert.ok(plan.steps.length > 0, 'Debe generar al menos un paso de navegación');
  assert.ok(plan.destinationName.includes('Tijerazo'));
  assert.ok(plan.totalDistanceMeters > 0);
  assert.equal(plan.steps[plan.steps.length - 1]?.icon, 'arrival');
});



test('renderiza correctamente la suite de elementos de ambiente 2.5D (fuentes, luminarias, bancas, ascensores)', () => {
  const testMall: MallMapData = {
    mallSlug: 'test-props-mall',
    metersPerUnit: 1,
    floors: [
      {
        id: 'floor-test',
        name: 'Nivel Props',
        level: 1,
        width: 100,
        height: 100,
        areas: [{ id: 'corr-1', kind: 'corridor', rect: { x: 10, y: 10, w: 80, h: 80 } }],
        obstacles: [],
        props: [
          { id: 'tree-1', kind: 'tree', x: 20, y: 20 },
          { id: 'bench-1', kind: 'bench', rect: { x: 30, y: 20, w: 6, h: 2 } },
          { id: 'planter-1', kind: 'planter', rect: { x: 40, y: 20, w: 4, h: 4 } },
          { id: 'lounge-1', kind: 'lounge', rect: { x: 50, y: 20, w: 8, h: 6 } },
          { id: 'trash-1', kind: 'trash', x: 25, y: 25 },
          { id: 'lamp-1', kind: 'lamp', x: 35, y: 25 },
          { id: 'railing-1', kind: 'railing', from: { x: 10, y: 40 }, to: { x: 30, y: 40 } },
          { id: 'elevator-1', kind: 'elevator', rect: { x: 60, y: 20, w: 6, h: 6 } },
          { id: 'fountain-1', kind: 'fountain', rect: { x: 40, y: 40, w: 10, h: 10 } },
          { id: 'sign-1', kind: 'sign', x: 50, y: 50, text: 'N1' },
        ],
      },
    ],
    stores: [
      {
        id: 'tienda-test',
        name: 'Tienda Test',
        category: 'fashion',
        floorId: 'floor-test',
        height: 12,
        x: 70,
        y: 70,
        w: 15,
        h: 15,
        doorNodeId: 'node-test',
      },
    ],
    nodes: [
      { id: 'node-test', floorId: 'floor-test', kind: 'door', x: 70, y: 70, connections: [] },
    ],
  };

  const scene = buildScene(testMall, { floorId: 'floor-test', palette, detail: 'full' });
  assert.ok(scene.items.length > 30);
  assert.ok(scene.items.some((i) => i.kind === 'text' && i.text === '🛗'));
  assert.ok(scene.items.some((i) => i.kind === 'text' && i.text === 'N1'));
});

// ---------- v0.4.1 Authoring Foundation Tests ----------
test('geometría: distanceToRectPerimeter mide con precisión la distancia a las 4 caras del local', () => {
  const rect = { x: 10, y: 10, w: 20, h: 20 }; // x in [10, 30], y in [10, 30]

  // Directamente sobre las 4 caras
  assert.equal(distanceToRectPerimeter({ x: 20, y: 10 }, rect), 0, 'cara norte');
  assert.equal(distanceToRectPerimeter({ x: 20, y: 30 }, rect), 0, 'cara sur');
  assert.equal(distanceToRectPerimeter({ x: 10, y: 20 }, rect), 0, 'cara oeste');
  assert.equal(distanceToRectPerimeter({ x: 30, y: 20 }, rect), 0, 'cara este');

  // En las 4 esquinas
  assert.equal(distanceToRectPerimeter({ x: 10, y: 10 }, rect), 0);
  assert.equal(distanceToRectPerimeter({ x: 30, y: 30 }, rect), 0);

  // Fuera del local
  assert.ok(Math.abs(distanceToRectPerimeter({ x: 20, y: 5 }, rect) - 5) < 0.001);
  assert.ok(Math.abs(distanceToRectPerimeter({ x: 35, y: 20 }, rect) - 5) < 0.001);
});

test('validador: valida schemaVersion (debe ser entero positivo >= 1)', () => {
  const m = clone(demoMall);
  m.schemaVersion = -1;
  assert.ok(codes(m).includes('INVALID_SCHEMA_VERSION'));

  const m2 = clone(demoMall);
  m2.schemaVersion = 1.5;
  assert.ok(codes(m2).includes('INVALID_SCHEMA_VERSION'));

  const m3 = clone(demoMall);
  m3.schemaVersion = 1;
  assert.equal(codes(m3).includes('INVALID_SCHEMA_VERSION'), false);
});

test('validador: valida metersPerUnit positivo', () => {
  const m = clone(demoMall);
  m.metersPerUnit = 0;
  assert.ok(codes(m).includes('INVALID_METERS_PER_UNIT'));

  const mNegative = clone(demoMall);
  mNegative.metersPerUnit = -0.5;
  assert.ok(codes(mNegative).includes('INVALID_METERS_PER_UNIT'));
});

test('validador: valida dimensiones positivas de piso (width > 0, height > 0)', () => {
  const m = clone(demoMall);
  m.floors[0]!.width = 0;
  assert.ok(codes(m).includes('INVALID_FLOOR_DIMENSIONS'));
});

test('validador: valida dimensiones positivas de locales (w > 0, h > 0)', () => {
  const m = clone(demoMall);
  m.stores[0]!.w = -10;
  assert.ok(codes(m).includes('INVALID_STORE_DIMENSIONS'));
});

test('validador: valida dimensiones y límites de obstáculos', () => {
  const m = clone(demoMall);
  m.floors[0]!.obstacles = [{ id: 'obs-invalido', kind: 'fountain', rect: { x: 10, y: 10, w: 0, h: 20 } }];
  assert.ok(codes(m).includes('INVALID_OBSTACLE_DIMENSIONS'));

  const m2 = clone(demoMall);
  m2.floors[0]!.obstacles = [{ id: 'obs-fuera', kind: 'fountain', rect: { x: 390, y: 250, w: 50, h: 50 } }];
  assert.ok(codes(m2).includes('OBSTACLE_OUT_OF_BOUNDS'));
});

test('validador: advierte con DOOR_NOT_AT_STORE si la puerta no toca la cara del local', () => {
  const m = clone(demoMall);
  const store = m.stores.find((s) => s.id === 'farmacia')!;
  const door = m.nodes.find((n) => n.id === store.doorNodeId)!;
  door.y = 120; // local termina en y=90, puerta en y=120 (30 unidades de distancia)
  const issues = validateMapData(m);
  assert.ok(issues.some((i) => i.code === 'DOOR_NOT_AT_STORE'));
});

test('validador: advierte VERTICAL_CORE_MISALIGNED si un núcleo vertical tiene desalineación horizontal severa', () => {
  const m = clone(demoMall);
  m.floors.push({ id: 'floor-2', name: 'Nivel 2', level: 2, width: 400, height: 260, areas: [], obstacles: [] });
  m.nodes.push(
    { id: 'stairs-f1', floorId: 'floor-1', kind: 'stairs', x: 20, y: 20, connections: ['stairs-f2'] },
    { id: 'stairs-f2', floorId: 'floor-2', kind: 'stairs', x: 350, y: 200, connections: ['stairs-f1'] }
  );
  const issues = validateMapData(m);
  assert.ok(issues.some((i) => i.code === 'VERTICAL_CORE_MISALIGNED'));
});

test('extrudePolygon genera caras de techo, base, paredes visibles e iluminación 2.5D', () => {
  const polygon = [
    { x: 20, y: 20 },
    { x: 160, y: 20 },
    { x: 160, y: 48 },
    { x: 135, y: 68 },
    { x: 20, y: 68 },
  ];
  const extruded = extrudePolygon(polygon, 0, 14);
  assert.strictEqual(extruded.roof.length, 5);
  assert.strictEqual(extruded.base.length, 5);
  assert.ok(extruded.walls.length > 0);
  assert.ok(extruded.labelPos.x !== 0 && extruded.labelPos.y !== 0);
});

test('extrudeFlatPolygon genera extrusión 2.5D cenital con paredes sombreadas hacia el sur', () => {
  const polygon = [
    { x: 10, y: 10 },
    { x: 50, y: 10 },
    { x: 50, y: 40 },
    { x: 10, y: 40 },
  ];
  const extruded = extrudeFlatPolygon(polygon, { height: 4 });
  assert.strictEqual(extruded.roof.length, 4);
  assert.strictEqual(extruded.base.length, 4);
  assert.ok(extruded.walls.length > 0);

  // La pared sur (hacia el pasillo) debe existir y tener faceType 'south'
  const southWall = extruded.walls.find((w) => w.faceType === 'south');
  assert.ok(southWall, 'Debe generar pared frontal sur');
  assert.strictEqual(southWall?.points.length, 4);
  assert.ok(southWall?.shadeFactor < 0.6, 'La pared sur debe tener sombra marcada');
});

test('projectBounds calcula límites exactos para auto-fit', () => {
  const pts = [
    { x: 0, y: 0 },
    { x: 100, y: 50 },
    { x: -50, y: 80 },
  ];
  const bounds = projectBounds(pts);
  assert.strictEqual(bounds.minX, -50);
  assert.strictEqual(bounds.maxX, 100);
  assert.strictEqual(bounds.minY, 0);
  assert.strictEqual(bounds.maxY, 80);
  assert.strictEqual(bounds.width, 150);
  assert.strictEqual(bounds.height, 80);
});

test('buildScene renderiza footprint de piso, plazas circulares de colores y locales con chaflán', () => {
  const scene = buildScene(sambilMall, {
    floorId: LEVEL_LIBERTADOR,
    palette: { fashion: { fill: '#F8FAFC', ink: '#0F172A' }, other: { fill: '#F1F5F9', ink: '#1E293B' } },
  });
  assert.ok(scene.items.length > 50);

  // Comprueba que existen círculos para las plazas oficiales
  const circles = scene.items.filter((it) => it.kind === 'circle');
  assert.ok(circles.length >= 8); // plazas + props

  // Comprueba que ZARA tiene polígonos dibujados
  const zaraItems = scene.items.filter((it) => 'storeId' in it && it.storeId === 'zara_lib');
  assert.ok(zaraItems.length > 0);
});

test('buildScene renderiza capa de presencia del usuario (userPin, visionCone, userTrail)', () => {
  const scene = buildScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette: { fashion: { fill: '#F8FAFC', ink: '#0F172A' }, other: { fill: '#F1F5F9', ink: '#1E293B' } },
    userPosition: { x: 150, y: 350 },
    userHeading: Math.PI / 4,
    userTrail: [
      { x: 130, y: 350 },
      { x: 140, y: 350 },
      { x: 150, y: 350 },
    ],
  });

  const pin = scene.items.find((i) => i.kind === 'userPin');
  assert.ok(pin, 'Debe incluir userPin');
  assert.strictEqual(pin.kind, 'userPin');
  assert.strictEqual(pin.radius, 6);

  const cone = scene.items.find((i) => i.kind === 'visionCone');
  assert.ok(cone, 'Debe incluir visionCone cuando hay userHeading');
  assert.strictEqual(cone.kind, 'visionCone');
  assert.ok(cone.arc.length > 0);

  const trail = scene.items.find((i) => i.kind === 'userTrail');
  assert.ok(trail, 'Debe incluir userTrail');
  assert.strictEqual(trail.kind, 'userTrail');
  assert.ok(trail.segments.length > 0);
});

test('buildScene oculta visionCone cuando el usuario está detenido (userHeading undefined)', () => {
  const scene = buildScene(sambilMall, {
    floorId: LEVEL_AUTOPISTA,
    palette: { fashion: { fill: '#F8FAFC', ink: '#0F172A' }, other: { fill: '#F1F5F9', ink: '#1E293B' } },
    userPosition: { x: 150, y: 350 },
  });

  const pin = scene.items.find((i) => i.kind === 'userPin');
  assert.ok(pin, 'Debe incluir userPin');
  const cone = scene.items.find((i) => i.kind === 'visionCone');
  assert.strictEqual(cone, undefined, 'No debe generar visionCone si está detenido');
});

test('Modo Accesible: findRoute elige ascensor y evita escaleras entre pisos', () => {
  const m: MallMapData = {
    mallSlug: 'test-accessible',
    metersPerUnit: 1,
    floors: [
      { id: 'f1', name: 'Piso 1', level: 1, width: 200, height: 200, areas: [], obstacles: [] },
      { id: 'f2', name: 'Piso 2', level: 2, width: 200, height: 200, areas: [], obstacles: [] },
    ],
    stores: [],
    nodes: [
      { id: 'start', floorId: 'f1', x: 10, y: 10, kind: 'corridor', connections: ['stairs-1', 'elev-1'] },
      // Escalera: muy cerca (distancia 5)
      { id: 'stairs-1', floorId: 'f1', x: 15, y: 10, kind: 'stairs', connections: ['start', 'stairs-2'] },
      { id: 'stairs-2', floorId: 'f2', x: 15, y: 10, kind: 'stairs', connections: ['stairs-1', 'goal'] },
      // Ascensor: más lejos (distancia 40)
      { id: 'elev-1', floorId: 'f1', x: 50, y: 10, kind: 'elevator', connections: ['start', 'elev-2'] },
      { id: 'elev-2', floorId: 'f2', x: 50, y: 10, kind: 'elevator', connections: ['elev-1', 'goal'] },
      { id: 'goal', floorId: 'f2', x: 70, y: 10, kind: 'corridor', connections: ['stairs-2', 'elev-2'] },
    ],
  };

  // En modo normal, Dijkstra elige la ruta más corta (escalera)
  const normalRoute = findRoute(m, 'start', 'goal')!;
  assert.ok(normalRoute.nodeIds.includes('stairs-1'));
  assert.ok(!normalRoute.nodeIds.includes('elev-1'));

  // En modo accesible, Dijkstra descarta escaleras y elige obligatoriamente ascensor
  const accessibleRoute = findRoute(m, 'start', 'goal', { accessibleOnly: true })!;
  assert.ok(accessibleRoute.nodeIds.includes('elev-1'));
  assert.ok(accessibleRoute.nodeIds.includes('elev-2'));
  assert.ok(!accessibleRoute.nodeIds.includes('stairs-1'));
  assert.ok(!accessibleRoute.nodeIds.includes('stairs-2'));
});

test('Modo Accesible: findRoute devuelve null si solo existen escaleras para llegar', () => {
  const mOnlyStairs: MallMapData = {
    mallSlug: 'test-stairs-only',
    metersPerUnit: 1,
    floors: [
      { id: 'f1', name: 'Piso 1', level: 1, width: 200, height: 200, areas: [], obstacles: [] },
      { id: 'f2', name: 'Piso 2', level: 2, width: 200, height: 200, areas: [], obstacles: [] },
    ],
    stores: [],
    nodes: [
      { id: 'start', floorId: 'f1', x: 10, y: 10, kind: 'corridor', connections: ['stairs-1'] },
      { id: 'stairs-1', floorId: 'f1', x: 15, y: 10, kind: 'stairs', connections: ['start', 'stairs-2'] },
      { id: 'stairs-2', floorId: 'f2', x: 15, y: 10, kind: 'stairs', connections: ['stairs-1', 'goal'] },
      { id: 'goal', floorId: 'f2', x: 20, y: 10, kind: 'corridor', connections: ['stairs-2'] },
    ],
  };

  const route = findRoute(mOnlyStairs, 'start', 'goal', { accessibleOnly: true });
  assert.strictEqual(route, null, 'Debe devolver null si no hay camino accesible');
});

// ---------- Tests de Regresión TDD: Integridad y Reporte de Calidad ----------
test('Regresión Topológica: Autopista tiene al menos un nodo entrance oficial', () => {
  const autopistaEntrances = sambilMall.nodes.filter(
    (n) => n.floorId === LEVEL_AUTOPISTA && n.kind === 'entrance'
  );
  assert.ok(
    autopistaEntrances.length >= 1,
    'El Nivel Autopista debe tener al menos un nodo con kind === entrance para sembrar correctamente el grafo'
  );
  assert.ok(
    autopistaEntrances.some((n) => n.id === 'node-entrada A1'),
    'El nodo-entrada A1 debe estar catalogado como entrance'
  );
});

test('Regresión Topológica: quality-report enruta desde la entrada de Autopista', () => {
  const report = generateMallQualityReport(sambilMall);
  // La entrada seleccionada en Autopista debe alcanzar los locales
  assert.strictEqual(report.navigationErrors.unreachableStores, 0);
  assert.deepStrictEqual(report.unreachableStoreIds, []);
});

test('Regresión Topológica: generateMallQualityReport es válido en Sambil Chacao', () => {
  const report = generateMallQualityReport(sambilMall);
  assert.strictEqual(report.isValid, true, 'El reporte de calidad debe ser válido (isValid: true)');
});

test('Regresión Property-Based: consistencia matemática exacta entre quality-report y validateMapData', () => {
  const report = generateMallQualityReport(sambilMall);
  const allIssues = validateMapData(sambilMall);
  const errors = allIssues.filter((i) => i.severity === 'error');

  // Invariante 1: Solapes geométricos
  const expectedOverlaps = errors.filter((e) => e.code === 'STORES_OVERLAP').length;
  assert.strictEqual(
    report.geometryErrors.overlaps,
    expectedOverlaps,
    'report.geometryErrors.overlaps debe coincidir con STORES_OVERLAP'
  );

  // Invariante 2: Dimensiones inválidas
  const expectedInvalidDims = errors.filter(
    (e) =>
      e.code === 'INVALID_STORE_DIMENSIONS' ||
      e.code === 'INVALID_FLOOR_DIMENSIONS' ||
      e.code === 'INVALID_AREA_DIMENSIONS' ||
      e.code === 'INVALID_OBSTACLE_DIMENSIONS' ||
      e.code === 'INVALID_PROP_DIMENSIONS'
  ).length;
  assert.strictEqual(
    report.geometryErrors.invalidRectangles,
    expectedInvalidDims,
    'report.geometryErrors.invalidRectangles debe coincidir con los códigos reales de dimensiones'
  );

  // Invariante 3: Fuera de límites
  const expectedOutOfBounds = errors.filter(
    (e) =>
      e.code === 'NODE_OUT_OF_BOUNDS' ||
      e.code === 'OUT_OF_BOUNDS' ||
      e.code === 'PROP_OUT_OF_BOUNDS' ||
      e.code === 'OBSTACLE_OUT_OF_BOUNDS'
  ).length;
  assert.strictEqual(
    report.geometryErrors.outOfBounds,
    expectedOutOfBounds,
    'report.geometryErrors.outOfBounds debe coincidir con códigos de out of bounds'
  );

  // Invariante 4: Aristas rotas y colisiones de grafo
  const expectedBrokenEdges = allIssues.filter(
    (i) =>
      i.code === 'DISCONNECTED_NODE' ||
      i.code === 'MISSING_NODE_REF' ||
      i.code === 'EDGE_CROSSES_OBSTACLE' ||
      i.code === 'MISSING_DOOR_NODE'
  ).length;
  assert.strictEqual(
    report.navigationErrors.brokenEdges,
    expectedBrokenEdges,
    'report.navigationErrors.brokenEdges debe coincidir con aristas rotas y cruces de obstáculos'
  );
});
