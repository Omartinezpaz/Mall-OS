/**
 * Valores para superficies con glassmorphism.
 * El blur real se aplica en el componente `<GlassSurface>`.
 * Estos valores son el fallback sólido para Android <12 y la base de color.
 */
export const glass = {
  /** Superficie oscura (HUD, vitrina, headers) */
  dark: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
  },
  /** Superficie clara (modales, sheets) */
  light: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderWidth: 1,
  },
  /** Intensidad de blur (0-100) */
  intensity: {
    subtle: 40,
    normal: 70,
    strong: 90,
  },
} as const;

/** Detecta si el dispositivo soporta blur nativo sin romper en entornos Node/Web. */
export const supportsNativeBlur = (platform?: { OS: string; Version?: number | string }): boolean => {
  if (typeof platform !== 'undefined') {
    if (platform.OS === 'ios') return true;
    if (platform.OS === 'android') {
      const v = typeof platform.Version === 'number' ? platform.Version : parseInt(String(platform.Version), 10);
      return !isNaN(v) && v >= 31;
    }
    return false;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Platform } = require('react-native');
    if (Platform.OS === 'ios') return true;
    if (Platform.OS === 'android' && typeof Platform.Version === 'number') {
      return Platform.Version >= 31;
    }
  } catch {
    return false;
  }
  return false;
};
