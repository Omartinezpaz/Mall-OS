/** Escalas no cromáticas: espaciado, radios, tipografía, elevación y movimiento. */

/** Espaciado en múltiplos de 4. */
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 } as const;

export const radius = { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 } as const;

/** Tamaño mínimo de objetivo táctil en Android (dp). */
export const minTouchTarget = 48;

/**
 * Tipografía para móvil. Fuente del sistema en el piloto (Roboto en Android):
 * cero peso añadido al APK y cero parpadeo de carga. Una fuente propia es decisión posterior.
 */
export const scaleTypography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '700' },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  bodyLg: { fontSize: 17, lineHeight: 26, fontWeight: '400' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodySm: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
} as const;

export type TypographyScaleToken = keyof typeof scaleTypography;


/** Elevación compatible con React Native (iOS shadow* + Android elevation). Sombras suaves, nunca negras intensas. */
export const elevation = {
  none: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
  sm: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
  md: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  lg: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.12, shadowRadius: 24, elevation: 8 },
} as const;

/** Duraciones en ms. Con "reducir movimiento" activo, usar 0. */
export const motion = {
  micro: 120,
  standard: 220,
  complex: 360,
  /** Sello del canje (momento firma). */
  stamp: 450,
} as const;
