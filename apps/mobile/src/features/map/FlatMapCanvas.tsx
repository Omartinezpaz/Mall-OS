import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  PanResponder,
  Platform,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';
import {
  Canvas,
  Group,
  Path,
  Circle,
  matchFont,
  Text as SkiaText,
  RoundedRect,
  useImage,
  Image as SkiaImage,
  Rect as SkiaRect,
  LinearGradient,
  RadialGradient,
  vec,
  Skia,
  DashPathEffect,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  useFrameCallback,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type FlatScene, type Point, LEVEL_AUTOPISTA } from '@mallos/map-engine';
import { compileFlatScene } from './skia/compile-flat-scene';
import { getStoreLogo } from '../directory';

export interface FlatMapCanvasHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  recenterOnUser: () => void;
}

export interface FlatMapCanvasProps {
  scene: FlatScene;
  floorId?: string;
  userPosition?: Point;
  userHeading?: number;
  userTrail?: Point[];
  selectedStoreId?: string;
  onStorePress?: (storeId: string) => void;
  onResetNorth?: () => void;
  cameraMode?: 'north-up' | 'heading-up';
  onToggleCameraMode?: () => void;
  showCompass?: boolean;
  followUser?: boolean;
  isNavigating?: boolean;
  walkProgress?: number;
}

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 3.5;
const NAV_BASE_ZOOM = 1.50; // Zoom inicial al comenzar la ruta (se aprecian pasillos y tiendas vecinas)
const NAV_ARRIVAL_ZOOM = 2.25; // Zoom cercano al aproximarse y llegar al destino (se aprecia fachada, logo y puerta)
const PADDING = 20;

const fontFamily = Platform.select({ ios: 'Helvetica', default: 'sans-serif' });
const fontDest = matchFont({
  fontFamily,
  fontSize: 10,
  fontWeight: 'bold',
});
const fontStore = matchFont({
  fontFamily,
  fontSize: 7.5,
  fontWeight: '600',
});
const fontPlaza = matchFont({
  fontFamily,
  fontSize: 9,
  fontWeight: 'bold',
});
const fontPoi = matchFont({
  fontFamily,
  fontSize: 7.5,
  fontWeight: 'bold',
});

/** Paleta temática pastel y armónica para plazas */
function getPlazaTheme(label: string = '', id: string = '') {
  const norm = `${label} ${id}`.toLowerCase();
  if (norm.includes('fuente') || norm.includes('water')) {
    return {
      fill: '#E0F2FE', // Azul agua pastel suave
      stroke: '#38BDF8', // Celeste nítido
      glow: 'rgba(56, 189, 248, 0.22)',
      ink: '#0369A1',
    };
  }
  if (norm.includes('jardin') || norm.includes('jardín') || norm.includes('garden')) {
    return {
      fill: '#DCFCE7', // Verde menta pastel suave
      stroke: '#4ADE80', // Verde fresco
      glow: 'rgba(74, 222, 128, 0.22)',
      ink: '#15803D',
    };
  }
  if (norm.includes('central') || norm.includes('centro') || norm.includes('feria')) {
    return {
      fill: '#FEF3C7', // Ámbar cálido pastel suave
      stroke: '#FBBF24', // Ámbar dorado
      glow: 'rgba(251, 191, 36, 0.22)',
      ink: '#B45309',
    };
  }
  if (norm.includes('arte') || norm.includes('art')) {
    return {
      fill: '#EDE9FE', // Lavanda pastel suave
      stroke: '#A78BFA', // Violeta claro
      glow: 'rgba(167, 139, 250, 0.22)',
      ink: '#6D28D9',
    };
  }
  if (norm.includes('musica') || norm.includes('música') || norm.includes('music')) {
    return {
      fill: '#E0E7FF', // Índigo pastel suave
      stroke: '#818CF8', // Azul índigo claro
      glow: 'rgba(129, 140, 248, 0.22)',
      ink: '#4338CA',
    };
  }
  return {
    fill: '#F1F5F9',
    stroke: '#94A3B8',
    glow: 'rgba(148, 163, 184, 0.18)',
    ink: '#334155',
  };
}

/** Paleta temática para el Pin 3D estilo Google Maps según la categoría del local destino */
export interface PinTheme {
  fill: string;
  bevel: string;
  stroke: string;
}

export function getCategoryPinTheme(category: string = ''): PinTheme {
  const norm = category.toLowerCase().trim();

  if (norm.includes('food') || norm.includes('comida') || norm.includes('restaurante') || norm.includes('cafe') || norm.includes('café') || norm.includes('grill') || norm.includes('pizza') || norm.includes('burger') || norm.includes('sushi') || norm.includes('panaderia') || norm.includes('charcuteria')) {
    return {
      fill: '#EF4444', // Rojo Coral Gastronomía
      bevel: '#FCA5A5',
      stroke: '#B91C1C',
    };
  }
  if (norm.includes('fashion') || norm.includes('moda') || norm.includes('ropa') || norm.includes('shoes') || norm.includes('jeans') || norm.includes('calzado')) {
    return {
      fill: '#2563EB', // Azul Real Moda
      bevel: '#93C5FD',
      stroke: '#1D4ED8',
    };
  }
  if (norm.includes('beauty') || norm.includes('belleza') || norm.includes('spa') || norm.includes('cosmetics') || norm.includes('perfum')) {
    return {
      fill: '#EC4899', // Rosa Vibrante Belleza & Cuidado
      bevel: '#F472B6',
      stroke: '#BE185D',
    };
  }
  if (norm.includes('pharmacy') || norm.includes('farmacia') || norm.includes('salud') || norm.includes('health') || norm.includes('optica') || norm.includes('óptica')) {
    return {
      fill: '#10B981', // Verde Menta Salud & Farmacia
      bevel: '#6EE7B7',
      stroke: '#047857',
    };
  }
  if (norm.includes('finance') || norm.includes('banco') || norm.includes('bank') || norm.includes('atm') || norm.includes('finanzas')) {
    return {
      fill: '#0D9488', // Teal / Verde Azulado Finanzas
      bevel: '#5EEAD4',
      stroke: '#0F766E',
    };
  }
  if (norm.includes('entertainment') || norm.includes('cine') || norm.includes('cines') || norm.includes('diversion') || norm.includes('diversión') || norm.includes('park') || norm.includes('kids')) {
    return {
      fill: '#9333EA', // Púrpura Real Entretenimiento & Cines
      bevel: '#D8B4FE',
      stroke: '#7E22CE',
    };
  }
  if (norm.includes('tech') || norm.includes('tecnologia') || norm.includes('tecnología') || norm.includes('electronics') || norm.includes('apple') || norm.includes('samsung') || norm.includes('xiaomi')) {
    return {
      fill: '#0284C7', // Azul Eléctrico Tecnología
      bevel: '#7DD3FC',
      stroke: '#0369A1',
    };
  }
  if (norm.includes('sports') || norm.includes('deporte') || norm.includes('deportes') || norm.includes('gym') || norm.includes('fitness')) {
    return {
      fill: '#059669', // Verde Esmeralda Deportes
      bevel: '#34D399',
      stroke: '#065F46',
    };
  }
  if (norm.includes('home') || norm.includes('hogar') || norm.includes('mueble') || norm.includes('muebleria') || norm.includes('deco')) {
    return {
      fill: '#F59E0B', // Ámbar / Dorado Cálido Hogar & Decoración
      bevel: '#FDE047',
      stroke: '#D97706',
    };
  }
  if (norm.includes('services') || norm.includes('servicio') || norm.includes('servicios')) {
    return {
      fill: '#6366F1', // Índigo Servicios
      bevel: '#A5B4FC',
      stroke: '#4338CA',
    };
  }

  // Por defecto: Pin rojo clásico oficial Google Maps
  return {
    fill: '#EA4335',
    bevel: '#FF6B6B',
    stroke: '#B91C1C',
  };
}

/** Ray Casting Point-in-Polygon */
function isPointInsidePolygon(point: Point, polygon: Point[]): boolean {
  if (!polygon || polygon.length < 3) return false;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]!.x, yi = polygon[i]!.y;
    const xj = polygon[j]!.x, yj = polygon[j]!.y;
    const intersect = ((yi > point.y) !== (yj > point.y))
      && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

interface FlatMapUserAvatarWithEffectsProps {
  x: number;
  y: number;
  userHeading?: number;
  destination?: { x: number; y: number };
  nextRoutePoint?: Point;
  currentScale: number;
  pulse: SharedValue<number>;
  userAvatarImage?: any;
}

export const FlatMapUserAvatarWithEffects: React.FC<FlatMapUserAvatarWithEffectsProps> = React.memo(
  function FlatMapUserAvatarWithEffects({
    x,
    y,
    userHeading,
    destination,
    nextRoutePoint,
    currentScale,
    pulse,
    userAvatarImage,
  }) {
    // 1. Calcular ángulo direccional hacia rumbo actual, próximo punto de ruta o destino
    let effectiveHeading = userHeading;
    if (effectiveHeading === undefined && nextRoutePoint) {
      effectiveHeading = Math.atan2(nextRoutePoint.y - y, nextRoutePoint.x - x);
    } else if (effectiveHeading === undefined && destination) {
      const distToDest = Math.hypot(destination.x - x, destination.y - y);
      if (distToDest > 2) {
        effectiveHeading = Math.atan2(destination.y - y, destination.x - x);
      }
    }
    if (effectiveHeading === undefined) {
      effectiveHeading = -Math.PI / 2; // Arriba / Norte por defecto
    }

    // 2. Ondas Expansivas de Radar estilo Gota de Agua (Ripple Effect)
    // Tres ondas concéntricas desfasadas (0, 0.33, 0.66) que nacen en el centro y se expanden hacia afuera de forma continua
    const rMin = 7.5 / currentScale;
    const rMax = 54 / currentScale;

    // Onda 1
    const r1 = useDerivedValue(() => {
      const p = pulse.value;
      return rMin + p * (rMax - rMin);
    });
    const op1 = useDerivedValue(() => {
      const p = pulse.value;
      return Math.max(0, (1 - p) * 0.85);
    });
    const fillOp1 = useDerivedValue(() => {
      const p = pulse.value;
      return Math.max(0, (1 - p) * 0.16);
    });

    // Onda 2 (desfasada 33%)
    const r2 = useDerivedValue(() => {
      const p = (pulse.value + 0.333) % 1;
      return rMin + p * (rMax - rMin);
    });
    const op2 = useDerivedValue(() => {
      const p = (pulse.value + 0.333) % 1;
      return Math.max(0, (1 - p) * 0.85);
    });
    const fillOp2 = useDerivedValue(() => {
      const p = (pulse.value + 0.333) % 1;
      return Math.max(0, (1 - p) * 0.16);
    });

    // Onda 3 (desfasada 66%)
    const r3 = useDerivedValue(() => {
      const p = (pulse.value + 0.666) % 1;
      return rMin + p * (rMax - rMin);
    });
    const op3 = useDerivedValue(() => {
      const p = (pulse.value + 0.666) % 1;
      return Math.max(0, (1 - p) * 0.85);
    });
    const fillOp3 = useDerivedValue(() => {
      const p = (pulse.value + 0.666) % 1;
      return Math.max(0, (1 - p) * 0.16);
    });

    // 3. Efecto Linterna: Haz de luz potente y visible que ilumina el pasillo hacia el destino
    const beamLength = 80;
    const halfSpread = 0.44; // ~25° hacia cada lado (apertura total de 50°)
    const startAngle = effectiveHeading - halfSpread;
    const endAngle = effectiveHeading + halfSpread;
    const SAMPLES = 16;

    const flashlightPath = useMemo(() => {
      const p = Skia.Path.Make();
      p.moveTo(x, y);
      for (let s = 0; s <= SAMPLES; s++) {
        const a = startAngle + (endAngle - startAngle) * (s / SAMPLES);
        p.lineTo(x + beamLength * Math.cos(a), y + beamLength * Math.sin(a));
      }
      p.close();
      return p;
    }, [x, y, startAngle, endAngle]);

    // Haz central de alta potencia (High-Beam core focalizado)
    const innerBeamLength = 105;
    const innerHalfSpread = 0.18; // ~10° hacia cada lado
    const innerStartAngle = effectiveHeading - innerHalfSpread;
    const innerEndAngle = effectiveHeading + innerHalfSpread;

    const innerBeamPath = useMemo(() => {
      const p = Skia.Path.Make();
      p.moveTo(x, y);
      for (let s = 0; s <= SAMPLES; s++) {
        const a = innerStartAngle + (innerEndAngle - innerStartAngle) * (s / SAMPLES);
        p.lineTo(x + innerBeamLength * Math.cos(a), y + innerBeamLength * Math.sin(a));
      }
      p.close();
      return p;
    }, [x, y, innerStartAngle, innerEndAngle]);

    // Líneas de contorno de haz para dar definición de haz de linterna nítido
    const beamRayPath = useMemo(() => {
      const p = Skia.Path.Make();
      p.moveTo(x, y);
      p.lineTo(x + beamLength * Math.cos(startAngle), y + beamLength * Math.sin(startAngle));
      p.moveTo(x, y);
      p.lineTo(x + beamLength * Math.cos(endAngle), y + beamLength * Math.sin(endAngle));
      return p;
    }, [x, y, startAngle, endAngle]);

    // 4. Flecha Direccional de Cabecera (Chevron blanco de precisión)
    const tipLen = 14 / currentScale;
    const wingLen = 7.5 / currentScale;
    const tipX = x + Math.cos(effectiveHeading) * tipLen;
    const tipY = y + Math.sin(effectiveHeading) * tipLen;
    const leftX = x + Math.cos(effectiveHeading + 2.5) * wingLen;
    const leftY = y + Math.sin(effectiveHeading + 2.5) * wingLen;
    const rightX = x + Math.cos(effectiveHeading - 2.5) * wingLen;
    const rightY = y + Math.sin(effectiveHeading - 2.5) * wingLen;
    const arrowPath = `M ${tipX} ${tipY} L ${leftX} ${leftY} L ${x} ${y} L ${rightX} ${rightY} Z`;

    return (
      <Group>
        {/* A. Linterna: Haz amplio ambiental con degradado luminoso */}
        <Path path={flashlightPath}>
          <RadialGradient
            c={vec(x, y)}
            r={beamLength}
            colors={[
              'rgba(186, 230, 254, 0.85)',
              'rgba(56, 189, 248, 0.50)',
              'rgba(37, 99, 235, 0.18)',
              'transparent',
            ]}
          />
        </Path>

        {/* B. Linterna: Haz central de alta potencia que alcanza el corredor */}
        <Path path={innerBeamPath}>
          <RadialGradient
            c={vec(x, y)}
            r={innerBeamLength}
            colors={[
              'rgba(255, 255, 255, 0.98)',
              'rgba(125, 211, 252, 0.85)',
              'rgba(56, 189, 248, 0.45)',
              'rgba(37, 99, 235, 0.12)',
              'transparent',
            ]}
          />
        </Path>

        {/* C. Linterna: Rayos de luz nítidos que definen el cono de la linterna */}
        <Path
          path={beamRayPath}
          color="rgba(56, 189, 248, 0.65)"
          style="stroke"
          strokeWidth={1.2 / currentScale}
        />

        {/* D. Linterna: Bombilla / Destello en el origen del avatar */}
        <Circle cx={x} cy={y} r={14 / currentScale}>
          <RadialGradient
            c={vec(x, y)}
            r={14 / currentScale}
            colors={[
              '#FFFFFF',
              'rgba(56, 189, 248, 0.90)',
              'rgba(37, 99, 235, 0.35)',
              'transparent',
            ]}
          />
        </Circle>

        {/* E. Radar: Ondas concéntricas estilo gota de agua en expansión constante */}
        {/* Onda 3 (exterior en ciclo) */}
        <Circle cx={x} cy={y} r={r3} color="#0284C7" style="fill" opacity={fillOp3} />
        <Circle cx={x} cy={y} r={r3} color="#0284C7" style="stroke" strokeWidth={1.8 / currentScale} opacity={op3} />

        {/* Onda 2 (media en ciclo) */}
        <Circle cx={x} cy={y} r={r2} color="#0284C7" style="fill" opacity={fillOp2} />
        <Circle cx={x} cy={y} r={r2} color="#0284C7" style="stroke" strokeWidth={1.8 / currentScale} opacity={op2} />

        {/* Onda 1 (naciente en ciclo) */}
        <Circle cx={x} cy={y} r={r1} color="#0284C7" style="fill" opacity={fillOp1} />
        <Circle cx={x} cy={y} r={r1} color="#0284C7" style="stroke" strokeWidth={1.8 / currentScale} opacity={op1} />

        {/* F. Avatar Pin con Foto Real y Puntero al Suelo (Efecto 3D Google Maps / AR) */}
        {/* 1. Sombra elíptica en el suelo */}
        <Circle
          cx={x}
          cy={y + 1.2 / currentScale}
          r={7.5 / currentScale}
          color="rgba(15, 23, 42, 0.32)"
          style="fill"
        />

        {/* 2. Puntero triangular que baja del círculo hacia el punto exacto en el suelo */}
        <Path
          path={`M ${x} ${y} L ${x - 4.8 / currentScale} ${y - 6.5 / currentScale} L ${x + 4.8 / currentScale} ${y - 6.5 / currentScale} Z`}
          color="#2563EB"
          style="fill"
        />
        <Path
          path={`M ${x} ${y} L ${x - 4.8 / currentScale} ${y - 6.5 / currentScale} L ${x + 4.8 / currentScale} ${y - 6.5 / currentScale} Z`}
          color="#1D4ED8"
          style="stroke"
          strokeWidth={0.8 / currentScale}
        />

        {/* 3. Anillo circular exterior azul cobalto de alta visibilidad */}
        <Circle
          cx={x}
          cy={y - 9.5 / currentScale}
          r={10.2 / currentScale}
          color="#2563EB"
          style="fill"
        />
        <Circle
          cx={x}
          cy={y - 9.5 / currentScale}
          r={10.2 / currentScale}
          color="#1D4ED8"
          style="stroke"
          strokeWidth={1.2 / currentScale}
        />

        {/* 4. Marco blanco interior nítido */}
        <Circle
          cx={x}
          cy={y - 9.5 / currentScale}
          r={9.0 / currentScale}
          color="#FFFFFF"
          style="fill"
        />

        {/* 5. Foto del Avatar del Usuario (Renderizado GPU Skia con recorte circular) */}
        {userAvatarImage ? (
          <Group
            clip={(() => {
              const p = Skia.Path.Make();
              p.addCircle(x, y - 9.5 / currentScale, 8.2 / currentScale);
              return p;
            })()}
          >
            <SkiaImage
              image={userAvatarImage}
              x={x - 8.2 / currentScale}
              y={y - 9.5 / currentScale - 8.2 / currentScale}
              width={(8.2 / currentScale) * 2}
              height={(8.2 / currentScale) * 2}
              fit="cover"
            />
          </Group>
        ) : (
          <>
            {/* Fallback de alta tecnología si no hay foto */}
            <Circle
              cx={x}
              cy={y - 9.5 / currentScale}
              r={8.0 / currentScale}
              color="#2563EB"
              style="fill"
            />
            <Circle
              cx={x}
              cy={y - 9.5 / currentScale}
              r={4.5 / currentScale}
              color="#38BDF8"
              style="fill"
              opacity={0.8}
            />
          </>
        )}

        {/* 6. Flecha direccional blanca orientada al rumbo de navegación */}
        <Path
          path={arrowPath}
          color="#FFFFFF"
          style="fill"
        />
        <Path
          path={arrowPath}
          color="#1D4ED8"
          style="stroke"
          strokeWidth={0.5 / currentScale}
        />
      </Group>
    );
  }
);

export const FlatMapCanvas = React.forwardRef<FlatMapCanvasHandle, FlatMapCanvasProps>(function FlatMapCanvas(
  {
    scene,
    floorId,
    userPosition,
    userHeading,
    userTrail,
    selectedStoreId,
    onStorePress,
    onResetNorth,
    cameraMode = 'north-up',
    onToggleCameraMode,
    showCompass = true,
    followUser = true,
    isNavigating = false,
    walkProgress = 0,
  },
  ref
) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [isFollowingUser, setIsFollowingUser] = useState<boolean>(followUser);

  // Capa de fondo arquitectónica 3D (Nivel Autopista render a 30% opacidad)
  const autopistaImage = useImage(require('../../../assets/maps/nivel_autopista_render.png'));
  const isAutopista = !floorId || floorId === LEVEL_AUTOPISTA || floorId === 'floor-autopista' || floorId === 'floor_1';

  // Sincronizar si cambia followUser externo
  useEffect(() => {
    setIsFollowingUser(followUser);
  }, [followUser]);

  // 1. Compilar la escena plana a primitivas GPU
  const compiled = useMemo(() => compileFlatScene(scene), [scene]);

  // 2. Escala y ajuste inicial al área segura visible (entre NavigationHUD superior y DestinationBar inferior)
  const topSafeMargin = Math.max(insets.top, 24) + 128;
  const bottomSafeMargin = 175;
  const safeVisibleHeight = Math.max(120, screenHeight - topSafeMargin - bottomSafeMargin);
  const safeCenterY = topSafeMargin + safeVisibleHeight / 2;

  const { scale: baseScale, offsetX: initialOffsetX, offsetY: initialOffsetY } = useMemo(() => {
    const availW = Math.max(100, screenWidth - 36);
    const availH = safeVisibleHeight;
    const s = Math.min(availW / compiled.viewBox.w, availH / compiled.viewBox.h);
    const ox = (screenWidth - compiled.viewBox.w * s) / 2 - compiled.viewBox.x * s;
    const oy = topSafeMargin + (safeVisibleHeight - compiled.viewBox.h * s) / 2 - compiled.viewBox.y * s;
    return { scale: s, offsetX: ox, offsetY: oy };
  }, [compiled.viewBox, screenWidth, safeVisibleHeight, topSafeMargin]);

  // 3. Variables compartidas de cámara y animación
  const cameraX = useSharedValue(initialOffsetX);
  const cameraY = useSharedValue(initialOffsetY);
  const INITIAL_ZOOM = 1.0;
  const zoom = useSharedValue(INITIAL_ZOOM);
  const pulse = useSharedValue(0);
  const routeDashPhase = useSharedValue(0);
  const dashPhase = useDerivedValue(() => {
    const s = baseScale * zoom.value;
    return routeDashPhase.value / (s > 0 ? s : 1);
  });

  // Zoom dinámico de aproximación al destino (Dynamic Approach Zoom estilo Google Maps)
  const targetNavZoom = useMemo(() => {
    if (!isNavigating) return 1.0;
    const progress = Math.max(0, Math.min(1, walkProgress ?? 0));
    // Interpolación continua y suave de NAV_BASE_ZOOM (1.50x) a NAV_ARRIVAL_ZOOM (2.25x)
    return NAV_BASE_ZOOM + progress * (NAV_ARRIVAL_ZOOM - NAV_BASE_ZOOM);
  }, [isNavigating, walkProgress]);

  // Logo oficial de la tienda destino para renderizado en mapa
  const targetLogoSource = useMemo(() => {
    if (!selectedStoreId) return null;
    return getStoreLogo(selectedStoreId);
  }, [selectedStoreId]);
  const destLogoImage = useImage(targetLogoSource);

  // Foto real del avatar del usuario para pin de navegación
  const userAvatarImage = useImage(require('../../../assets/avatar_user.png'));

  const dragStartX = useRef(initialOffsetX);
  const dragStartY = useRef(initialOffsetY);
  const lastPinchDist = useRef<number | null>(null);
  const lastPinchAngle = useRef<number | null>(null);
  const manualRotation = useSharedValue(0);
  const isPanning = useRef<boolean>(false);
  const panPauseUntilRef = useRef<number>(0);
  const hasInitialized = useRef<boolean>(false);
  const prevIsNavigatingRef = useRef<boolean>(false);

  // 4. Animaciones continuas a 60fps (pulso del avatar y flujo de ruta hacia el destino)
  useFrameCallback((frameInfo) => {
    const dt = 1 / 60;
    pulse.value = (pulse.value + dt * 0.35) % 1;
    // Flujo continuo hacia el destino (velocidad media y armónica)
    routeDashPhase.value = (routeDashPhase.value - dt * 36) % 1000;
  });

  // Centrado inicial solo si no se encuentra en navegación activa
  useEffect(() => {
    if (!isNavigating) {
      cameraX.value = initialOffsetX;
      cameraY.value = initialOffsetY;
      zoom.value = 1.0;
    }
  }, [initialOffsetX, initialOffsetY, cameraX, cameraY, zoom, isNavigating]);

  // Transición suave al entrar o salir de navegación
  useEffect(() => {
    if (isNavigating && !prevIsNavigatingRef.current) {
      // Al iniciar navegación: reactivar seguimiento y aplicar zoom de navegación cómodo
      panPauseUntilRef.current = 0;
      setIsFollowingUser(true);
      zoom.value = withSpring(targetNavZoom, { damping: 22, stiffness: 80 });
    } else if (!isNavigating && prevIsNavigatingRef.current) {
      // Al salir de navegación: restaurar suavemente vista general del piso completo
      panPauseUntilRef.current = 0;
      zoom.value = withSpring(1.0, { damping: 20, stiffness: 90 });
      cameraX.value = withSpring(initialOffsetX, { damping: 22, stiffness: 100 });
      cameraY.value = withSpring(initialOffsetY, { damping: 22, stiffness: 100 });
    }
    prevIsNavigatingRef.current = isNavigating;
  }, [isNavigating, targetNavZoom, initialOffsetX, initialOffsetY, cameraX, cameraY, zoom]);

  // 5. Seguimiento del avatar y zoom dinámico progresivo hacia el destino
  useEffect(() => {
    const now = Date.now();
    const isManualPause = isPanning.current || now < panPauseUntilRef.current;

    if (isNavigating) {
      // MODO NAVEGACIÓN ACTIVA:
      if (isManualPause) {
        const remaining = panPauseUntilRef.current - now;
        if (remaining > 0 && !isPanning.current) {
          const timer = setTimeout(() => {
            if (isNavigating && !isPanning.current) {
              zoom.value = withSpring(targetNavZoom, { damping: 24, stiffness: 85 });
              if (userPosition) {
                const currentScale = baseScale * targetNavZoom;
                const targetX = screenWidth / 2 - userPosition.x * currentScale;
                const targetY = safeCenterY - userPosition.y * currentScale;
                cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
                cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
              }
            }
          }, remaining);
          return () => clearTimeout(timer);
        }
        return;
      }

      // Sin pausa manual: actualizar zoom progresivo continuo y centrar en el avatar
      zoom.value = withSpring(targetNavZoom, { damping: 24, stiffness: 85 });
      if (userPosition) {
        const currentScale = baseScale * targetNavZoom;
        const targetX = screenWidth / 2 - userPosition.x * currentScale;
        const targetY = safeCenterY - userPosition.y * currentScale;
        cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
        cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
      }
    } else {
      // MODO EXPLORACIÓN (Sin navegación):
      if (isFollowingUser && userPosition && !isManualPause && zoom.value > 1.2) {
        const currentScale = baseScale * zoom.value;
        const targetX = screenWidth / 2 - userPosition.x * currentScale;
        const targetY = safeCenterY - userPosition.y * currentScale;
        cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
        cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
      } else if (!isManualPause && zoom.value <= 1.2) {
        cameraX.value = withSpring(initialOffsetX, { damping: 22, stiffness: 100 });
        cameraY.value = withSpring(initialOffsetY, { damping: 22, stiffness: 100 });
      }
    }
  }, [
    userPosition,
    isNavigating,
    targetNavZoom,
    isFollowingUser,
    baseScale,
    screenWidth,
    safeCenterY,
    initialOffsetX,
    initialOffsetY,
    cameraX,
    cameraY,
    zoom,
  ]);

  // 6. Ángulo de rotación del mapa (mantiene orientación nivelada sin romper límites)
  const rotationAngle = useDerivedValue(() => {
    return 0; // Fijo nivelado para evitar desbordes y cortes bajo las etiquetas
  });

  // 7. PanResponder para paneo multitáctil, zoom, rotación y tap detection
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 3 || Math.abs(gestureState.dy) > 3;
        },
        onPanResponderGrant: () => {
          isPanning.current = true;
          panPauseUntilRef.current = Date.now() + 5000;
          dragStartX.current = cameraX.value;
          dragStartY.current = cameraY.value;
          lastPinchDist.current = null;
          lastPinchAngle.current = null;
        },
        onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          panPauseUntilRef.current = Date.now() + 5000;
          const touches = evt.nativeEvent.touches;
          const moveDist = Math.hypot(gestureState.dx, gestureState.dy);
          if ((moveDist > 3 || touches.length === 2) && isFollowingUser) {
            setIsFollowingUser(false);
          }

          if (touches.length === 2 && touches[0] && touches[1]) {
            // Gesto de Pinch y Rotación con dos dedos
            const dx = touches[0].pageX - touches[1].pageX;
            const dy = touches[0].pageY - touches[1].pageY;
            const dist = Math.hypot(dx, dy);
            const currentAngle = Math.atan2(dy, dx);

            if (lastPinchDist.current !== null && lastPinchDist.current > 0) {
              const factor = dist / lastPinchDist.current;
              const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value * factor));
              zoom.value = nextZoom;
            }
            if (lastPinchAngle.current !== null) {
              let deltaAngle = currentAngle - lastPinchAngle.current;
              // Normalizar salto angular
              if (deltaAngle > Math.PI) deltaAngle -= 2 * Math.PI;
              if (deltaAngle < -Math.PI) deltaAngle += 2 * Math.PI;
              manualRotation.value = manualRotation.value + deltaAngle;
            }
            lastPinchDist.current = dist;
            lastPinchAngle.current = currentAngle;
          } else {
            // Paneo con 1 dedo: desrotar el desplazamiento de pantalla para mover el mapa 1:1 con el dedo
            lastPinchDist.current = null;
            lastPinchAngle.current = null;
            const rot = rotationAngle.value;
            const cos = Math.cos(-rot);
            const sin = Math.sin(-rot);
            const rotatedDx = gestureState.dx * cos - gestureState.dy * sin;
            const rotatedDy = gestureState.dx * sin + gestureState.dy * cos;

            cameraX.value = dragStartX.current + rotatedDx;
            cameraY.value = dragStartY.current + rotatedDy;
          }
        },
        onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          lastPinchDist.current = null;
          lastPinchAngle.current = null;
          isPanning.current = false;
          // Si el movimiento fue mínimo, tratar como Tap (Hit-testing de tiendas con desrotación)
          const moveDist = Math.hypot(gestureState.dx, gestureState.dy);
          if (moveDist < 6 && onStorePress) {
            const touchX = evt.nativeEvent.locationX;
            const touchY = evt.nativeEvent.locationY;
            const cx = screenWidth / 2;
            const cy = screenHeight / 2;
            const rot = rotationAngle.value;
            const cos = Math.cos(-rot);
            const sin = Math.sin(-rot);

            // Desrotar el punto de toque con respecto al centro de pantalla
            const dx = touchX - cx;
            const dy = touchY - cy;
            const unrotX = cx + (dx * cos - dy * sin);
            const unrotY = cy + (dx * sin + dy * cos);

            const currentScale = baseScale * zoom.value;
            const mallX = (unrotX - cameraX.value) / currentScale;
            const mallY = (unrotY - cameraY.value) / currentScale;

            for (const item of scene.items) {
              if (item.kind === 'store') {
                if (isPointInsidePolygon({ x: mallX, y: mallY }, item.points)) {
                  onStorePress(item.id);
                  break;
                }
              }
            }
          }
        },
      }),
    [cameraX, cameraY, zoom, manualRotation, rotationAngle, baseScale, screenWidth, screenHeight, scene.items, onStorePress, isFollowingUser]
  );

  // Matriz de transformación 2D combinada (con rotación alrededor del centro de pantalla)
  const transform = useDerivedValue(() => [
    { translateX: screenWidth / 2 },
    { translateY: screenHeight / 2 },
    { rotate: rotationAngle.value },
    { translateX: -screenWidth / 2 },
    { translateY: -screenHeight / 2 },
    { translateX: cameraX.value },
    { translateY: cameraY.value },
    { scale: baseScale * zoom.value },
  ]);

  // 8. Reset de rotación al Norte
  const handleResetNorth = useCallback(() => {
    manualRotation.value = withSpring(0, { damping: 18, stiffness: 120 });
    onResetNorth?.();
    if (onToggleCameraMode && cameraMode === 'heading-up') {
      onToggleCameraMode();
    }
  }, [manualRotation, onResetNorth, onToggleCameraMode, cameraMode]);

  // 9. Re-centrado manual (reactiva auto-follow y zoom de navegación)
  const handleRecenter = useCallback(() => {
    setIsFollowingUser(true);
    panPauseUntilRef.current = 0;
    if (isNavigating) {
      zoom.value = withSpring(targetNavZoom, { damping: 22, stiffness: 85 });
      if (userPosition) {
        const currentScale = baseScale * targetNavZoom;
        const targetX = screenWidth / 2 - userPosition.x * currentScale;
        const targetY = safeCenterY - userPosition.y * currentScale;
        cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
        cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
      }
    } else if (userPosition) {
      const targetX = screenWidth / 2 - userPosition.x * baseScale * zoom.value;
      const targetY = safeCenterY - userPosition.y * baseScale * zoom.value;
      cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
      cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
    } else {
      cameraX.value = withSpring(initialOffsetX);
      cameraY.value = withSpring(initialOffsetY);
      zoom.value = withSpring(1);
    }
  }, [userPosition, isNavigating, targetNavZoom, baseScale, zoom, screenWidth, safeCenterY, initialOffsetX, initialOffsetY, cameraX, cameraY]);

  // Exponer métodos imperativos (zoomIn, zoomOut, resetView, recenterOnUser)
  React.useImperativeHandle(ref, () => ({
    zoomIn: () => {
      panPauseUntilRef.current = Date.now() + 5000;
      zoom.value = withSpring(Math.min(MAX_ZOOM, zoom.value * 1.35), { damping: 16, stiffness: 120 });
    },
    zoomOut: () => {
      panPauseUntilRef.current = Date.now() + 5000;
      zoom.value = withSpring(Math.max(MIN_ZOOM, zoom.value / 1.35), { damping: 16, stiffness: 120 });
    },
    resetView: () => {
      panPauseUntilRef.current = 0;
      cameraX.value = withSpring(initialOffsetX);
      cameraY.value = withSpring(initialOffsetY);
      zoom.value = withSpring(1);
      manualRotation.value = withSpring(0);
    },
    recenterOnUser: () => {
      handleRecenter();
    },
  }), [zoom, cameraX, cameraY, manualRotation, initialOffsetX, initialOffsetY, handleRecenter]);

  // 9. Ángulo norte para brújula
  const northAngleDeg = scene.meta.northAngle
    ? (scene.meta.northAngle * 180) / Math.PI
    : 0;

  const currentRotation = cameraMode === 'heading-up' && userHeading !== undefined
    ? (-userHeading - Math.PI / 2)
    : 0;
  const compassNeedleDeg = (currentRotation * 180) / Math.PI - northAngleDeg;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Canvas style={styles.canvas}>
        {/* Fondo limpio arquitectónico con iluminación ambiental sutil */}
        <SkiaRect x={0} y={0} width={screenWidth} height={screenHeight}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(screenWidth, screenHeight)}
            colors={['#F8FAFC', '#F1F5F9', '#EDF2F7']}
          />
        </SkiaRect>

        {/* Aura de luz ambiental suave y cálida */}
        <Circle cx={screenWidth * 0.5} cy={screenHeight * 0.15} r={280}>
          <RadialGradient
            c={vec(screenWidth * 0.5, screenHeight * 0.15)}
            r={280}
            colors={['rgba(254, 243, 199, 0.35)', 'rgba(254, 243, 199, 0.08)', 'transparent']}
          />
        </Circle>

        {/* Aura de luz azul cielo sutil en base */}
        <Circle cx={screenWidth * 0.5} cy={screenHeight * 0.85} r={280}>
          <RadialGradient
            c={vec(screenWidth * 0.5, screenHeight * 0.85)}
            r={280}
            colors={['rgba(224, 242, 254, 0.40)', 'rgba(224, 242, 254, 0.08)', 'transparent']}
          />
        </Circle>

        <Group transform={transform}>
          {/* Sombra suave de la losa del centro comercial */}
          <RoundedRect
            x={compiled.viewBox.x - 18}
            y={compiled.viewBox.y - 14}
            width={compiled.viewBox.w + 36}
            height={compiled.viewBox.h + 36}
            r={28}
            color="rgba(15, 23, 42, 0.05)"
          />
          {/* Losa arquitectónica blanca */}
          <RoundedRect
            x={compiled.viewBox.x - 20}
            y={compiled.viewBox.y - 20}
            width={compiled.viewBox.w + 40}
            height={compiled.viewBox.h + 40}
            r={28}
            color="#FFFFFF"
          />
          <RoundedRect
            x={compiled.viewBox.x - 20}
            y={compiled.viewBox.y - 20}
            width={compiled.viewBox.w + 40}
            height={compiled.viewBox.h + 40}
            r={28}
            color="#E2E8F0"
            style="stroke"
            strokeWidth={1}
          />

          {/* Capa 1: Pasillos (Caminerías con borde arquitectónico para destacarse claramente) */}
          {compiled.corridors.map((c) => (
            <React.Fragment key={c.id}>
              <Path
                path={c.path}
                color="#FFFFFF"
                style="fill"
              />
              <Path
                path={c.path}
                color="#E2E8F0"
                style="stroke"
                strokeWidth={1 / (baseScale * zoom.value)}
              />
            </React.Fragment>
          ))}

          {/* Capa 2: Zonas temáticas/cardinales */}
          {compiled.zones.map((z) => (
            <Path
              key={z.id}
              path={z.path}
              color={z.color}
              style="fill"
              opacity={0.06}
            />
          ))}

          {/* Capa 3: Locales comerciales con Glow y Realce de Tienda Destino */}
          {compiled.stores.map((s) => {
            const currentScale = baseScale * zoom.value;
            const isTarget = s.id === selectedStoreId || s.isDestination;
            return (
              <React.Fragment key={s.id}>
                {/* Glow exterior radiante en la tienda destino */}
                {isTarget && (
                  <Path
                    path={s.path}
                    color="rgba(37, 99, 235, 0.28)"
                    style="stroke"
                    strokeWidth={8 / currentScale}
                  />
                )}
                {/* Relleno del local */}
                <Path
                  path={s.path}
                  color={isTarget ? '#EFF6FF' : s.fill}
                  style="fill"
                  opacity={s.isVisible ? 1 : 0.25}
                />
                {/* Contorno del local */}
                <Path
                  path={s.path}
                  color={isTarget ? '#2563EB' : s.stroke}
                  style="stroke"
                  strokeWidth={isTarget ? 2.6 / currentScale : 0.75 / currentScale}
                  opacity={s.isVisible ? 1 : 0.35}
                />
              </React.Fragment>
            );
          })}

          {/* Capa 4: Plazas con diseño arquitectónico suave y anillos concéntricos sutiles */}
          {compiled.plazas.map((p) => {
            const currentScale = baseScale * zoom.value;
            const theme = getPlazaTheme(p.label, p.id);
            return (
              <React.Fragment key={p.id}>
                {/* 1. Halo exterior suave */}
                <Circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r + 4 / currentScale}
                  color={theme.glow}
                  style="fill"
                />
                {/* 2. Cuerpo de la plaza en tono pastel suave */}
                <Circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  color={theme.fill}
                  style="fill"
                  opacity={0.92}
                />
                {/* 3. Borde arquitectónico de la plaza */}
                <Circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  color={theme.stroke}
                  style="stroke"
                  strokeWidth={1.2 / currentScale}
                />
                {/* 4. Anillo interior decorativo estilo rotonda */}
                <Circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r * 0.58}
                  color={theme.stroke}
                  style="stroke"
                  strokeWidth={0.75 / currentScale}
                  opacity={0.6}
                />
                {/* 5. Punto central */}
                <Circle
                  cx={p.cx}
                  cy={p.cy}
                  r={2.2 / currentScale}
                  color={theme.ink}
                  style="fill"
                  opacity={0.8}
                />
              </React.Fragment>
            );
          })}

          {/* Capa 4.1: Mobiliario arquitectónico: Jardineras (plantas) y Bancas (asientos) */}
          {compiled.props.map((prop) => {
            const currentScale = baseScale * zoom.value;
            if (prop.propKind === 'planter') {
              const potR = 3.6 / currentScale;
              const leafR = 2.6 / currentScale;
              const innerR = 1.4 / currentScale;
              return (
                <React.Fragment key={prop.id}>
                  {/* Sombra sutil de la jardinera */}
                  <Circle
                    cx={prop.x}
                    cy={prop.y + 0.6 / currentScale}
                    r={potR}
                    color="rgba(15, 23, 42, 0.12)"
                    style="fill"
                  />
                  {/* Base de la maceta */}
                  <Circle
                    cx={prop.x}
                    cy={prop.y}
                    r={potR}
                    color="#FFFFFF"
                    style="fill"
                  />
                  <Circle
                    cx={prop.x}
                    cy={prop.y}
                    r={potR}
                    color="#CBD5E1"
                    style="stroke"
                    strokeWidth={0.7 / currentScale}
                  />
                  {/* Corona de follaje verde esmeralda */}
                  <Circle
                    cx={prop.x}
                    cy={prop.y}
                    r={leafR}
                    color="#10B981"
                    style="fill"
                  />
                  {/* Núcleo verde menta suave */}
                  <Circle
                    cx={prop.x - 0.4 / currentScale}
                    cy={prop.y - 0.4 / currentScale}
                    r={innerR}
                    color="#6EE7B7"
                    style="fill"
                  />
                </React.Fragment>
              );
            }

            if (prop.propKind === 'bench') {
              const bW = 8.5 / currentScale;
              const bH = 3.2 / currentScale;
              return (
                <Group
                  key={prop.id}
                  origin={vec(prop.x, prop.y)}
                  transform={[{ rotate: prop.angle ?? 0 }]}
                >
                  {/* Sombra del banco */}
                  <RoundedRect
                    x={prop.x - bW / 2}
                    y={prop.y - bH / 2 + 0.5 / currentScale}
                    width={bW}
                    height={bH}
                    r={1.2 / currentScale}
                    color="rgba(15, 23, 42, 0.10)"
                  />
                  {/* Estructura del banco */}
                  <RoundedRect
                    x={prop.x - bW / 2}
                    y={prop.y - bH / 2}
                    width={bW}
                    height={bH}
                    r={1.2 / currentScale}
                    color="#F1F5F9"
                  />
                  <RoundedRect
                    x={prop.x - bW / 2}
                    y={prop.y - bH / 2}
                    width={bW}
                    height={bH}
                    r={1.2 / currentScale}
                    color="#CBD5E1"
                    style="stroke"
                    strokeWidth={0.6 / currentScale}
                  />
                  {/* Listón de madera cálida */}
                  <RoundedRect
                    x={prop.x - (bW - 2 / currentScale) / 2}
                    y={prop.y - (bH - 1.4 / currentScale) / 2}
                    width={bW - 2 / currentScale}
                    height={bH - 1.4 / currentScale}
                    r={0.6 / currentScale}
                    color="#D97706"
                  />
                </Group>
              );
            }

            return null;
          })}

          {/* Capa 4.2: Siluetas de peatones / personas en pasillos */}
          {compiled.pedestrians.map((ped) => {
            const currentScale = baseScale * zoom.value;
            const shoulderW = 4.8 / currentScale;
            const shoulderH = 2.4 / currentScale;
            const headR = 1.4 / currentScale;
            const pedColor = ped.color ?? '#3B82F6';
            return (
              <Group
                key={ped.id}
                origin={vec(ped.x, ped.y)}
                transform={[{ rotate: ped.heading ?? 0 }]}
              >
                {/* Sombra del peatón */}
                <Circle
                  cx={ped.x}
                  cy={ped.y + 0.5 / currentScale}
                  r={2.4 / currentScale}
                  color="rgba(15, 23, 42, 0.12)"
                  style="fill"
                />
                {/* Torso / hombros */}
                <RoundedRect
                  x={ped.x - shoulderW / 2}
                  y={ped.y - shoulderH / 2}
                  width={shoulderW}
                  height={shoulderH}
                  r={shoulderH / 2}
                  color={pedColor}
                />
                {/* Cabeza */}
                <Circle
                  cx={ped.x}
                  cy={ped.y}
                  r={headR}
                  color="#FFFFFF"
                  style="fill"
                />
                <Circle
                  cx={ped.x}
                  cy={ped.y}
                  r={headR}
                  color={pedColor}
                  style="stroke"
                  strokeWidth={0.5 / currentScale}
                />
              </Group>
            );
          })}

          {/* Capa 4.3: Puntos de Interés de Servicios: Baños (WC) y Ascensores */}
          {compiled.pois.map((poi) => {
            const isElev = poi.poiKind === 'elevator';
            const isAcc = poi.id.includes('acc') || (poi.label && poi.label.toLowerCase().includes('accesible'));
            const poiText = isElev ? 'Ascensor' : (isAcc ? 'WC Acc' : 'WC');
            const poiW = isElev ? 32 : (isAcc ? 28 : 18);
            const poiH = 11;
            const textOffset = isElev ? 13 : (isAcc ? 11 : 6.5);
            const bgColor = isAcc || isElev ? '#F0F9FF' : '#EFF6FF';
            const strokeColor = isAcc || isElev ? '#0284C7' : '#3B82F6';
            const textColor = isAcc || isElev ? '#0369A1' : '#1D4ED8';

            return (
              <React.Fragment key={poi.id}>
                {/* Sombra sutil */}
                <RoundedRect
                  x={poi.x - poiW / 2}
                  y={poi.y - poiH / 2 + 1}
                  width={poiW}
                  height={poiH}
                  r={poiH / 2}
                  color="rgba(15, 23, 42, 0.10)"
                />
                {/* Cápsula de servicio estilo Apple Maps */}
                <RoundedRect
                  x={poi.x - poiW / 2}
                  y={poi.y - poiH / 2}
                  width={poiW}
                  height={poiH}
                  r={poiH / 2}
                  color={bgColor}
                />
                <RoundedRect
                  x={poi.x - poiW / 2}
                  y={poi.y - poiH / 2}
                  width={poiW}
                  height={poiH}
                  r={poiH / 2}
                  color={strokeColor}
                  style="stroke"
                  strokeWidth={0.85}
                />
                <SkiaText
                  x={poi.x - textOffset}
                  y={poi.y + 2.8}
                  text={poiText}
                  font={fontPoi}
                  color={textColor}
                />
              </React.Fragment>
            );
          })}

          {/* Capa 5.0: Halo exterior de la ruta (Glow translúcido azul zafiro) */}
          {compiled.routes.map((r, idx) => {
            const currentScale = baseScale * zoom.value;
            const haloStrokeW = 8.5 / currentScale;
            return (
              <React.Fragment key={`route-halo-${idx}`}>
                {r.fullPath && (
                  <Path
                    path={r.fullPath}
                    color="rgba(37, 99, 235, 0.22)"
                    style="stroke"
                    strokeWidth={haloStrokeW}
                    strokeCap="round"
                    strokeJoin="round"
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Capa 5.1: Tramo restante con dash animado de flujo continuo hacia el destino */}
          {compiled.routes.map((r, idx) => {
            const currentScale = baseScale * zoom.value;
            const strokeW = 3.2 / currentScale;
            const dashOn = 10.0 / currentScale;
            const dashOff = 6.0 / currentScale;
            return (
              <React.Fragment key={`route-rem-${idx}`}>
                {r.remainingPath && (
                  <Path
                    path={r.remainingPath}
                    color="#3B82F6"
                    style="stroke"
                    strokeWidth={strokeW}
                    strokeCap="round"
                    strokeJoin="round"
                  >
                    <DashPathEffect
                      intervals={[dashOn, dashOff]}
                      phase={dashPhase}
                    />
                  </Path>
                )}
              </React.Fragment>
            );
          })}

          {/* Capa 5.2: Tramo inmediato (sólido y vibrante, guía el próximo tramo) */}
          {compiled.routes.map((r, idx) => {
            const currentScale = baseScale * zoom.value;
            const immStrokeW = 4.4 / currentScale;
            return (
              <React.Fragment key={`route-imm-${idx}`}>
                {r.immediatePath && (
                  <Path
                    path={r.immediatePath}
                    color="#1D4ED8"
                    style="stroke"
                    strokeWidth={immStrokeW}
                    strokeCap="round"
                    strokeJoin="round"
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Capa 5.3: Chevrons direccionales (flechas aerodinámicas en ruta inmediata) */}
          {compiled.routes.map((r, idx) => (
            <React.Fragment key={`route-chevrons-${idx}`}>
              {r.chevrons
                .filter((c) => c.isImmediate)
                .map((c, cIdx) => (
                  <React.Fragment key={`chev-${idx}-${cIdx}`}>
                    {/* Borde sutil azul oscuro para máximo contraste sobre el trazo */}
                    <Path
                      path={c.path}
                      color="#1E40AF"
                      style="stroke"
                      strokeWidth={0.6 / (baseScale * zoom.value)}
                    />
                    {/* Relleno blanco nítido */}
                    <Path
                      path={c.path}
                      color="#FFFFFF"
                      style="fill"
                      opacity={0.96}
                    />
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}

          {/* Capa 5.1: Trail del Usuario (Migas de Pan) */}
          {compiled.userTrails.map((trail, tIdx) => (
            <React.Fragment key={`user-trail-${tIdx}`}>
              {trail.map((seg, sIdx) => (
                <Path
                  key={`seg-${tIdx}-${sIdx}`}
                  path={seg.path}
                  color="#60A5FA"
                  style="stroke"
                  strokeWidth={4 / (baseScale * zoom.value)}
                  strokeCap="round"
                  strokeJoin="round"
                  opacity={seg.opacity}
                />
              ))}
            </React.Fragment>
          ))}

          {/* Capa 5.5: Badges de Ofertas Comerciales (Elegantes pins Apple Maps con halo suave) */}
          {compiled.offerBadges.map((ob, i) => {
            const currentScale = baseScale * zoom.value;
            const haloR = 12 / currentScale;
            const pinR = 6.5 / currentScale;
            const dotR = 2.2 / currentScale;
            return (
              <React.Fragment key={`offer-${ob.storeId}-${i}`}>
                {/* Halo translúcido suave */}
                <Circle
                  cx={ob.x}
                  cy={ob.y}
                  r={haloR}
                  color="rgba(244, 63, 94, 0.20)"
                  style="fill"
                />
                {/* Núcleo del pin */}
                <Circle
                  cx={ob.x}
                  cy={ob.y}
                  r={pinR}
                  color="#F43F5E"
                  style="fill"
                />
                <Circle
                  cx={ob.x}
                  cy={ob.y}
                  r={pinR}
                  color="#FFFFFF"
                  style="stroke"
                  strokeWidth={1.2 / currentScale}
                />
                {/* Punto blanco central */}
                <Circle
                  cx={ob.x}
                  cy={ob.y}
                  r={dotR}
                  color="#FFFFFF"
                  style="fill"
                />
              </React.Fragment>
            );
          })}

          {/* Capa 6: Pin de Destino con Faro de Luz en Suelo y Billboard con LOGO OFICIAL de Tienda */}
          {compiled.destinationPins.map((dp, i) => {
            const currentScale = baseScale * zoom.value;
            const pinTheme = getCategoryPinTheme(dp.category);

            // Anillos de faro / beacon de destino en el suelo
            const beaconR1 = 11 / currentScale;
            const beaconR2 = 18 / currentScale;

            if (destLogoImage) {
              // Billboard elevado con el logo oficial
              const badgeW = 34 / currentScale;
              const badgeH = 28 / currentScale;
              const badgeR = 8 / currentScale;
              const badgeY = dp.y - badgeH - 12 / currentScale;
              const badgeX = dp.x - badgeW / 2;

              // Puntero triangular que baja de la tarjeta al suelo
              const pointerPath = Skia.Path.Make();
              pointerPath.moveTo(dp.x - 5 / currentScale, badgeY + badgeH - 0.5 / currentScale);
              pointerPath.lineTo(dp.x, dp.y);
              pointerPath.lineTo(dp.x + 5 / currentScale, badgeY + badgeH - 0.5 / currentScale);
              pointerPath.close();

              return (
                <React.Fragment key={`dest-logo-${dp.storeId}-${i}`}>
                  {/* Sombra en el suelo */}
                  <Circle
                    cx={dp.x}
                    cy={dp.y + 1.2 / currentScale}
                    r={6 / currentScale}
                    color="rgba(15, 23, 42, 0.30)"
                    style="fill"
                  />
                  {/* Halo luminoso / beacon en el suelo */}
                  <Circle
                    cx={dp.x}
                    cy={dp.y}
                    r={beaconR1}
                    color="rgba(37, 99, 235, 0.20)"
                    style="fill"
                  />
                  <Circle
                    cx={dp.x}
                    cy={dp.y}
                    r={beaconR2}
                    color="rgba(56, 189, 248, 0.45)"
                    style="stroke"
                    strokeWidth={1.2 / currentScale}
                  />

                  {/* Sombra del Billboard */}
                  <RoundedRect
                    x={badgeX}
                    y={badgeY + 1.8 / currentScale}
                    width={badgeW}
                    height={badgeH}
                    r={badgeR}
                    color="rgba(15, 23, 42, 0.25)"
                  />

                  {/* Puntero triangular hacia el suelo */}
                  <Path path={pointerPath} color="#FFFFFF" style="fill" />
                  <Path
                    path={pointerPath}
                    color={pinTheme.fill}
                    style="stroke"
                    strokeWidth={1.2 / currentScale}
                  />

                  {/* Tarjeta del Billboard en blanco puro */}
                  <RoundedRect
                    x={badgeX}
                    y={badgeY}
                    width={badgeW}
                    height={badgeH}
                    r={badgeR}
                    color="#FFFFFF"
                  />
                  <RoundedRect
                    x={badgeX}
                    y={badgeY}
                    width={badgeW}
                    height={badgeH}
                    r={badgeR}
                    color={pinTheme.fill}
                    style="stroke"
                    strokeWidth={1.5 / currentScale}
                  />

                  {/* LOGO OFICIAL de la tienda renderizado nítidamente */}
                  <SkiaImage
                    image={destLogoImage}
                    x={badgeX + 3.5 / currentScale}
                    y={badgeY + 3.5 / currentScale}
                    width={badgeW - 7 / currentScale}
                    height={badgeH - 7 / currentScale}
                    fit="contain"
                  />
                </React.Fragment>
              );
            }

            // Fallback: Pin 3D oficial estilo Google Maps
            const pinH = 22 / currentScale;
            const pinR = 7.5 / currentScale;
            const headCy = dp.y - pinH + pinR;
            const innerHoleR = 2.8 / currentScale;

            const pinPath = Skia.Path.Make();
            pinPath.moveTo(dp.x, dp.y);
            // Curva izquierda hacia el hombro de la cabeza
            pinPath.cubicTo(
              dp.x - pinR * 1.15, dp.y - pinH * 0.45,
              dp.x - pinR, headCy,
              dp.x - pinR, headCy
            );
            // Arco superior semicircular
            pinPath.arcToOval(
              { x: dp.x - pinR, y: headCy - pinR, width: pinR * 2, height: pinR * 2 },
              180,
              180,
              false
            );
            // Curva derecha de regreso a la punta
            pinPath.cubicTo(
              dp.x + pinR, headCy,
              dp.x + pinR * 1.15, dp.y - pinH * 0.45,
              dp.x, dp.y
            );
            pinPath.close();

            // Bisel / Highlight 3D derecho
            const bevelPath = Skia.Path.Make();
            bevelPath.moveTo(dp.x, dp.y);
            bevelPath.cubicTo(
              dp.x + pinR * 1.15, dp.y - pinH * 0.45,
              dp.x + pinR, headCy,
              dp.x + pinR, headCy
            );
            bevelPath.arcToOval(
              { x: dp.x - pinR, y: headCy - pinR, width: pinR * 2, height: pinR * 2 },
              0,
              -90,
              false
            );
            bevelPath.lineTo(dp.x, headCy);
            bevelPath.close();

            return (
              <React.Fragment key={`dest-${dp.storeId}-${i}`}>
                {/* 1. Sombra elíptica en el suelo */}
                <Circle
                  cx={dp.x}
                  cy={dp.y + 1.2 / currentScale}
                  r={5.5 / currentScale}
                  color="rgba(15, 23, 42, 0.28)"
                  style="fill"
                />

                {/* 2. Cuerpo del Pin 3D coloreado con la categoría */}
                <Path
                  path={pinPath}
                  color={pinTheme.fill}
                  style="fill"
                />

                {/* 3. Bisel 3D con reflejo volumétrico suave */}
                <Path
                  path={bevelPath}
                  color={pinTheme.bevel}
                  style="fill"
                  opacity={0.45}
                />

                {/* 4. Contorno nítido de contraste */}
                <Path
                  path={pinPath}
                  color={pinTheme.stroke}
                  style="stroke"
                  strokeWidth={0.8 / currentScale}
                />

                {/* 5. Agujero blanco circular central */}
                <Circle
                  cx={dp.x}
                  cy={headCy}
                  r={innerHoleR}
                  color="#FFFFFF"
                  style="fill"
                />
              </React.Fragment>
            );
          })}

          {/* Capa 8: Etiquetas de Locales y Plazas (Cápsulas flotantes estilo Apple Maps) */}
          {compiled.labels.map((lbl, idx) => {
            const isDest = lbl.priority === 1;
            const isPlaza = lbl.priority === 2;
            const plazaTheme = isPlaza ? getPlazaTheme(lbl.text, lbl.plazaId) : null;
            const font = isDest ? fontDest : isPlaza ? fontPlaza : fontStore;
            const pillFill = isDest ? '#FEF3C7' : isPlaza ? plazaTheme!.fill : 'rgba(255, 255, 255, 0.94)';
            const pillStroke = isDest ? '#F59E0B' : isPlaza ? plazaTheme!.stroke : 'rgba(203, 213, 225, 0.9)';
            const textColor = isDest ? '#92400E' : isPlaza ? plazaTheme!.ink : '#1E293B';
            const charWidth = isDest ? 6.2 : isPlaza ? 5.8 : 4.8;
            const pillW = Math.max(26, lbl.text.length * charWidth + (isPlaza ? 12 : 8));
            const pillH = isDest ? 15 : isPlaza ? 13.5 : 11;

            return (
              <React.Fragment key={`lbl-${idx}`}>
                {/* Sombra sutil de la cápsula */}
                <RoundedRect
                  x={lbl.x - pillW / 2}
                  y={lbl.y - pillH / 2 + 1}
                  width={pillW}
                  height={pillH}
                  r={pillH / 2}
                  color="rgba(15, 23, 42, 0.08)"
                />
                {/* Relleno frosted glass */}
                <RoundedRect
                  x={lbl.x - pillW / 2}
                  y={lbl.y - pillH / 2}
                  width={pillW}
                  height={pillH}
                  r={pillH / 2}
                  color={pillFill}
                />
                {/* Borde sutil nítido */}
                <RoundedRect
                  x={lbl.x - pillW / 2}
                  y={lbl.y - pillH / 2}
                  width={pillW}
                  height={pillH}
                  r={pillH / 2}
                  color={pillStroke}
                  style="stroke"
                  strokeWidth={0.85}
                />
                {/* Texto legible de alta precisión */}
                <SkiaText
                  x={lbl.x - (lbl.text.length * charWidth) / 2}
                  y={lbl.y + (isDest ? 3.5 : isPlaza ? 3.0 : 2.5)}
                  text={lbl.text}
                  font={font}
                  color={textColor}
                />
              </React.Fragment>
            );
          })}

          {/* Capa 9 (Z-Index Máximo Absoluto): Avatar del Usuario sobre cualquier elemento del mapa, con Linterna Potente y Radar Onda Expansiva (Gota de Agua) */}
          {compiled.userPins.map((up, i) => {
            const currentScale = baseScale * zoom.value;
            const dest = compiled.destinationPins[0];
            const nextRoutePt = compiled.routes.length > 0 && compiled.routes[0].points.length > 1
              ? compiled.routes[0].points[1]
              : undefined;

            return (
              <FlatMapUserAvatarWithEffects
                key={`user-avatar-top-${i}`}
                x={up.x}
                y={up.y}
                userHeading={userHeading}
                destination={dest ? { x: dest.x, y: dest.y } : undefined}
                nextRoutePoint={nextRoutePt}
                currentScale={currentScale}
                pulse={pulse}
                userAvatarImage={userAvatarImage}
              />
            );
          })}
        </Group>
      </Canvas>

      {/* Brújula / Indicador de Norte e Interacción de Giro */}
      {showCompass && (
        <TouchableOpacity
          style={[styles.compassButton, { top: Math.max(insets.top, 24) + 124 }]}
          onPress={handleResetNorth}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.compassArrowContainer,
              { transform: [{ rotate: `${compassNeedleDeg}deg` }] },
            ]}
          >
            <Text style={styles.compassText}>N</Text>
            <View style={styles.compassNeedle} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  canvas: {
    flex: 1,
  },
  compassButton: {
    position: 'absolute',
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    zIndex: 20,
  },
  compassArrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#EF4444',
    marginBottom: -1,
  },
  compassNeedle: {
    width: 2.5,
    height: 9,
    backgroundColor: '#EF4444',
    borderRadius: 1.5,
  },
});
