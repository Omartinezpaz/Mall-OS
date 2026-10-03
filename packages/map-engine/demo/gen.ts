/**
 * Genera el SVG del mapa de demostración.
 * Uso:  npx tsx demo/gen.ts [--to=farmacia] [--from=entrance]
 * Falla (código de salida 1) si los datos del mapa tienen errores de validación.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { categoryColors } from '../../design-tokens/src/index';
import { buildScene, demoMall, findRouteToStore, hasErrors, sceneToSvg, validateMapData } from '../src/index';

const arg = (name: string, fallback: string): string => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const to = arg('to', 'farmacia');
const from = arg('from', 'entrance');

const issues = validateMapData(demoMall);
for (const i of issues) console.log(`${i.severity === 'error' ? 'ERROR' : 'aviso'} [${i.code}] ${i.message}`);
if (hasErrors(issues)) process.exit(1);

const route = findRouteToStore(demoMall, from, to);
if (!route) {
  console.error(`No hay ruta de "${from}" a "${to}"`);
  process.exit(1);
}

const scene = buildScene(demoMall, {
  floorId: 'floor-1',
  palette: categoryColors,
  selectedStoreId: to,
  routeNodeIds: route.nodeIds,
});

// fileURLToPath (no URL.pathname): funciona en Windows y con espacios en la ruta (ej. "D:\OS-A MALL").
const out = fileURLToPath(new URL('./out/demo-isometric.svg', import.meta.url));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, sceneToSvg(scene, { caption: 'Demo generada desde datos · plano ficticio' }), 'utf8');

console.log(`Ruta ${from} → ${to}: ${route.distanceMeters.toFixed(0)} m · ~${route.walkingMinutes} min · ${route.nodeIds.length} nodos`);
console.log(`Escena: ${scene.items.length} primitivas · SVG escrito en ${out}`);
