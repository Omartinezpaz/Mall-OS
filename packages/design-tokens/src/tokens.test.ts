import test from 'node:test';
import assert from 'node:assert/strict';
import { contrastRatio, ensureContrast, isHex, normalizeHex, readableOn } from './contrast';
import { categoryColors, categoryKeyFromSlug } from './categories';
import { createMallTheme, defaultTheme, CONTRAST } from './theme';
import { status } from './primitives';

test('contraste: negro sobre blanco = 21', () => {
  assert.ok(Math.abs(contrastRatio('#000000', '#FFFFFF') - 21) < 0.01);
});

test('hex: valida y normaliza', () => {
  assert.equal(isHex('#4f46e5'), true);
  assert.equal(isHex('azul'), false);
  assert.equal(normalizeHex('#abc'), '#AABBCC');
});

test('ensureContrast alcanza el mínimo', () => {
  const out = ensureContrast('#FDE047', '#FFFFFF', 4.5);
  assert.ok(contrastRatio(out, '#FFFFFF') >= 4.5);
});

test('readableOn elige texto legible', () => {
  assert.equal(readableOn('#4F46E5'), '#FFFFFF');
  assert.equal(readableOn('#FDE047'), '#0F172A');
});

test('tema por defecto cumple todos los pares de texto', () => {
  const c = defaultTheme;
  const pairs: Array<[string, string, string]> = [
    ['onPrimary/primary', c.onPrimary, c.primary],
    ['onPrimarySoft/primarySoft', c.onPrimarySoft, c.primarySoft],
    ['textPrimary/background', c.textPrimary, c.background],
    ['textPrimary/surface', c.textPrimary, c.surface],
    ['textSecondary/background', c.textSecondary, c.background],
    ['textSecondary/surface', c.textSecondary, c.surface],
    ['onSuccessSoft/successSoft', c.onSuccessSoft, c.successSoft],
    ['onWarningSoft/warningSoft', c.onWarningSoft, c.warningSoft],
    ['onDangerSoft/dangerSoft', c.onDangerSoft, c.dangerSoft],
    ['inverseText/inverseBackground', c.inverseText, c.inverseBackground],
    ['inverseText/inverseSurface', c.inverseText, c.inverseSurface],
  ];
  for (const [name, fg, bg] of pairs) {
    assert.ok(contrastRatio(fg, bg) >= CONTRAST.text, `${name} = ${contrastRatio(fg, bg).toFixed(2)}`);
  }
  assert.ok(contrastRatio(c.primary, c.background) >= CONTRAST.ui, 'primary sobre background (UI)');
  assert.ok(contrastRatio(c.focusRing, c.background) >= CONTRAST.ui, 'focusRing');
});

test('estados: fuerte sobre fondo claro cumple 3:1 como UI', () => {
  for (const s of [status.success, status.warning, status.danger]) {
    assert.ok(contrastRatio(s.strong, '#FFFFFF') >= CONTRAST.ui, s.strong);
  }
});

test('categorías: tinta sobre relleno cumple 4.5:1', () => {
  for (const [key, c] of Object.entries(categoryColors)) {
    assert.ok(contrastRatio(c.ink, c.fill) >= CONTRAST.text, `${key} = ${contrastRatio(c.ink, c.fill).toFixed(2)}`);
  }
});

test('categoryKeyFromSlug: desconocidos van a "other"', () => {
  assert.equal(categoryKeyFromSlug('food'), 'food');
  assert.equal(categoryKeyFromSlug('mueblería-rara'), 'other');
});

test('mall con primario amarillo claro: se oscurece y avisa', () => {
  const { colors, warnings } = createMallTheme({ primary: '#FDE047' });
  assert.ok(contrastRatio('#FFFFFF', colors.primary) >= CONTRAST.text);
  assert.ok(warnings.length >= 1);
});

test('mall con color inválido: usa el por defecto y avisa', () => {
  const { colors, warnings } = createMallTheme({ primary: 'no-es-color' });
  assert.equal(colors.primary, '#4F46E5');
  assert.ok(warnings.some((w) => w.includes('inválido')));
});

test('mall con fondo oscuro: se rechaza (modo claro)', () => {
  const { colors, warnings } = createMallTheme({ primary: '#4F46E5', background: '#111111' });
  assert.equal(colors.background, '#F8FAFC');
  assert.ok(warnings.length >= 1);
});

test('mall con tema válido: sin avisos', () => {
  const { warnings } = createMallTheme({ primary: '#4338CA' });
  assert.deepEqual(warnings, []);
});

test('para cualquier primario hex, los pares críticos cumplen', () => {
  const samples = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF9900', '#7C3AED', '#14B8A6', '#F472B6'];
  for (const s of samples) {
    const { colors } = createMallTheme({ primary: s });
    assert.ok(contrastRatio(colors.onPrimary, colors.primary) >= CONTRAST.text, `onPrimary con ${s}`);
    assert.ok(contrastRatio(colors.onPrimarySoft, colors.primarySoft) >= CONTRAST.text, `onPrimarySoft con ${s}`);
    assert.ok(contrastRatio(colors.primary, colors.background) >= CONTRAST.ui, `primary/bg con ${s}`);
  }
});
