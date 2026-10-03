/**
 * Tema semántico y tema por mall.
 * Cada mall aporta color primario (y opcionalmente secundario y fondo).
 * createMallTheme GARANTIZA contraste mínimo: ajusta lo que haga falta y avisa qué ajustó.
 */
import { contrastRatio, ensureContrast, isHex, mix, normalizeHex, readableOn, type Hex } from './contrast';
import { indigo, slate, status, violet, white } from './primitives';

/** Datos que aporta cada mall (vienen de `malls.branding`). */
export interface MallThemeInput {
  primary: string;
  secondary?: string;
  background?: string;
}

/** Tokens semánticos que consumen los componentes. */
export interface SemanticColors {
  // Marca
  primary: Hex;
  primaryPressed: Hex;
  /** Texto/ícono sobre `primary`. */
  onPrimary: Hex;
  /** Fondo suave de marca (chips activos, banners). */
  primarySoft: Hex;
  /** Texto/ícono sobre `primarySoft` y enlaces sobre fondo claro. */
  onPrimarySoft: Hex;
  secondary: Hex;
  // Superficies
  background: Hex;
  surface: Hex;
  surfaceMuted: Hex;
  border: Hex;
  // Texto
  textPrimary: Hex;
  textSecondary: Hex;
  // Foco visible (accesibilidad)
  focusRing: Hex;
  // Estados
  success: Hex;
  onSuccessSoft: Hex;
  successSoft: Hex;
  warning: Hex;
  onWarningSoft: Hex;
  warningSoft: Hex;
  danger: Hex;
  onDangerSoft: Hex;
  dangerSoft: Hex;
  // Pantalla inversa (cupón/QR): oscura para marcar el momento del canje
  inverseBackground: Hex;
  inverseSurface: Hex;
  inverseText: Hex;
}

export interface MallThemeResult {
  colors: SemanticColors;
  /** Ajustes automáticos realizados (en español, para el panel de administración). */
  warnings: string[];
}

/** Umbrales WCAG usados por el sistema. */
export const CONTRAST = { text: 4.5, ui: 3, strongText: 7 } as const;

const DEFAULT_BG = slate[50];

/**
 * Crea el tema de un mall validando contraste.
 * Nunca lanza por colores inválidos: usa los valores por defecto y lo informa en `warnings`.
 */
export function createMallTheme(input: MallThemeInput): MallThemeResult {
  const warnings: string[] = [];

  // --- Fondo ---
  let background: Hex = DEFAULT_BG;
  if (input.background !== undefined) {
    if (!isHex(input.background)) {
      warnings.push('Fondo inválido: se usó el fondo por defecto.');
    } else if (contrastRatio(slate[900], input.background) < 12) {
      warnings.push('Fondo demasiado oscuro para el modo claro: se usó el fondo por defecto.');
    } else {
      background = normalizeHex(input.background);
    }
  }

  // --- Primario: debe sostener texto blanco (botones) con 4.5:1 y destacar sobre el fondo con 3:1 ---
  let primary: Hex = indigo[600];
  if (!isHex(input.primary)) {
    warnings.push('Color primario inválido: se usó el índigo de Mall OS.');
  } else {
    primary = normalizeHex(input.primary);
  }
  const needText = ensureContrast(primary, white, CONTRAST.text);
  const needUi = ensureContrast(primary, background, CONTRAST.ui);
  const adjusted = contrastRatio(needText, background) >= contrastRatio(needUi, background) ? needText : needUi;
  // Se toma el más oscuro de los dos ajustes para cumplir ambos criterios a la vez.
  const finalPrimary = ensureContrast(adjusted, white, CONTRAST.text);
  if (finalPrimary !== primary) {
    warnings.push(`El color primario ${primary} se oscureció a ${finalPrimary} para garantizar legibilidad.`);
    primary = finalPrimary;
  }

  // --- Secundario ---
  let secondary: Hex = violet[600];
  if (input.secondary !== undefined) {
    if (!isHex(input.secondary)) {
      warnings.push('Color secundario inválido: se usó el violeta por defecto.');
    } else {
      secondary = normalizeHex(input.secondary);
    }
  }
  const secondaryOk = ensureContrast(secondary, background, CONTRAST.ui);
  if (secondaryOk !== secondary) {
    warnings.push(`El color secundario ${secondary} se oscureció a ${secondaryOk} para destacar sobre el fondo.`);
    secondary = secondaryOk;
  }

  const primarySoft = mix(primary, white, 0.9);
  const colors: SemanticColors = {
    primary,
    primaryPressed: mix(primary, '#000000', 0.15),
    onPrimary: readableOn(primary),
    primarySoft,
    onPrimarySoft: ensureContrast(primary, primarySoft, CONTRAST.text),
    secondary,
    background,
    surface: white,
    surfaceMuted: slate[100],
    border: slate[200],
    textPrimary: slate[900],
    textSecondary: ensureContrast(slate[600], background, CONTRAST.text),
    focusRing: ensureContrast(primary, background, CONTRAST.ui),
    success: status.success.strong,
    onSuccessSoft: status.success.text,
    successSoft: status.success.soft,
    warning: status.warning.strong,
    onWarningSoft: status.warning.text,
    warningSoft: status.warning.soft,
    danger: status.danger.strong,
    onDangerSoft: status.danger.text,
    dangerSoft: status.danger.soft,
    inverseBackground: slate[900],
    inverseSurface: slate[800],
    inverseText: white,
  };

  return { colors, warnings };
}

/** Tema por defecto de Mall OS (índigo). */
export const defaultTheme: SemanticColors = createMallTheme({ primary: indigo[600] }).colors;
