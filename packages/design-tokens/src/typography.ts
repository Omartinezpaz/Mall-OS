export const webTypography = {
  fontFamilies: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

/**
 * Tipografía para React Native. Escalas numéricas para fontSize.
 * En RN, los tamaños son px lógicos, no rem.
 */
export const typography = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: -0.4,
    normal: 0,
    wide: 0.4,
  },
  fontFamily: {
    sans: 'Inter-Regular',
    sansMedium: 'Inter-Medium',
    sansSemibold: 'Inter-SemiBold',
    sansBold: 'Inter-Bold',
    display: 'SpaceGrotesk-SemiBold',
    displayBold: 'SpaceGrotesk-Bold',
  },
} as const;
