/**
 * Utilidades de color y contraste (WCAG 2.x).
 * Sin dependencias: corre igual en React Native, Next.js y Node.
 */

/** Color hexadecimal normalizado: '#RRGGBB' en mayúsculas. */
export type Hex = `#${string}`;

/** Convierte '#RGB' o '#RRGGBB' en [r,g,b]. Devuelve null si el formato es inválido. */
export function parseHex(input: string): [number, number, number] | null {
  const m = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(input.trim());
  if (!m || !m[1]) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** True si el texto es un color hexadecimal válido. */
export function isHex(input: string): boolean {
  return parseHex(input) !== null;
}

/** Normaliza a '#RRGGBB'. Lanza si el formato es inválido. */
export function normalizeHex(input: string): Hex {
  const rgb = parseHex(input);
  if (!rgb) throw new Error(`Color inválido: "${input}"`);
  return toHex(rgb[0], rgb[1], rgb[2]);
}

/** Construye '#RRGGBB' desde canales 0–255 (se redondean y acotan). */
export function toHex(r: number, g: number, b: number): Hex {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase() as Hex;
}

/** Luminancia relativa WCAG (0 = negro, 1 = blanco). */
export function relativeLuminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) throw new Error(`Color inválido: "${hex}"`);
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Razón de contraste WCAG entre dos colores (1 a 21). */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Mezcla dos colores. t = peso de `b` (0 → a, 1 → b). */
export function mix(a: string, b: string, t: number): Hex {
  const ra = parseHex(a);
  const rb = parseHex(b);
  if (!ra || !rb) throw new Error(`Color inválido: "${!ra ? a : b}"`);
  const k = Math.max(0, Math.min(1, t));
  return toHex(ra[0] + (rb[0] - ra[0]) * k, ra[1] + (rb[1] - ra[1]) * k, ra[2] + (rb[2] - ra[2]) * k);
}

/** Elige el color de texto (claro u oscuro) con mejor contraste sobre `bg`. */
export function readableOn(bg: string, light: string = '#FFFFFF', dark: string = '#0F172A'): Hex {
  return normalizeHex(contrastRatio(bg, light) >= contrastRatio(bg, dark) ? light : dark);
}

/**
 * Ajusta `fg` (acercándolo a negro o blanco, según el fondo) hasta alcanzar `min` de contraste sobre `bg`.
 * Conserva el matiz lo más posible. Si ni siquiera negro/blanco alcanzan, devuelve el extremo.
 */
export function ensureContrast(fg: string, bg: string, min: number): Hex {
  const start = normalizeHex(fg);
  if (contrastRatio(start, bg) >= min) return start;
  const target = relativeLuminance(bg) > 0.5 ? '#000000' : '#FFFFFF';
  for (let step = 1; step <= 100; step++) {
    const candidate = mix(start, target, step / 100);
    if (contrastRatio(candidate, bg) >= min) return candidate;
  }
  return normalizeHex(target);
}
