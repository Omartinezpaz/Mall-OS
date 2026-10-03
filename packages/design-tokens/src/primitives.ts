/**
 * Primitivos: valores crudos. NO se usan directamente en componentes;
 * los componentes consumen tokens semánticos (theme.ts).
 */
import type { Hex } from './contrast';

/** Escala índigo de marca. */
export const indigo = {
  50: '#EEF2FF',
  100: '#E0E7FF',
  200: '#C7D2FE',
  500: '#6366F1',
  600: '#4F46E5',
  700: '#4338CA',
  800: '#3730A3',
  900: '#312E81',
} as const satisfies Record<number, Hex>;

export const violet = { 600: '#7C3AED', 700: '#6D28D9' } as const satisfies Record<number, Hex>;

/** Neutros (slate). */
export const slate = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  800: '#1E293B',
  900: '#0F172A',
} as const satisfies Record<number, Hex>;

export const white = '#FFFFFF' as const satisfies Hex;

/** Estados. Cada uno trae color fuerte (iconos/bordes), texto accesible y fondo suave. */
export const status = {
  success: { strong: '#16A34A', text: '#166534', soft: '#DCFCE7' },
  warning: { strong: '#D97706', text: '#92400E', soft: '#FEF3C7' },
  danger: { strong: '#DC2626', text: '#991B1B', soft: '#FEE2E2' },
} as const;

/**
 * Gradiente de marca. SOLO para logo y splash.
 * No usar en botones, tarjetas ni fondos de pantalla (rendimiento y sobriedad).
 */
export const brandGradient = ['#3B82F6', '#7C3AED'] as const;
