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
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  useFrameCallback,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { FlatScene, Point } from '@mallos/map-engine';
import { compileFlatScene } from './skia/compile-flat-scene';

export interface FlatMapCanvasProps {
  scene: FlatScene;
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
}

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 3.5;
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

export const FlatMapCanvas: React.FC<FlatMapCanvasProps> = ({
  scene,
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
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [isFollowingUser, setIsFollowingUser] = useState<boolean>(followUser);

  // Sincronizar si cambia followUser externo
  useEffect(() => {
    setIsFollowingUser(followUser);
  }, [followUser]);

  // 1. Compilar la escena plana a primitivas GPU
  const compiled = useMemo(() => compileFlatScene(scene), [scene]);

  // 2. Escala y ajuste inicial al viewBox del piso
  const { scale: baseScale, offsetX: initialOffsetX, offsetY: initialOffsetY } = useMemo(() => {
    const availW = Math.max(100, screenWidth - PADDING * 2);
    const availH = Math.max(100, screenHeight - PADDING * 2);
    const s = Math.min(availW / compiled.viewBox.w, availH / compiled.viewBox.h);
    const ox = (screenWidth - compiled.viewBox.w * s) / 2 - compiled.viewBox.x * s;
    const oy = (screenHeight - compiled.viewBox.h * s) / 2 - compiled.viewBox.y * s;
    return { scale: s, offsetX: ox, offsetY: oy };
  }, [compiled.viewBox, screenWidth, screenHeight]);

  // 3. Variables compartidas de cámara y animación
  const cameraX = useSharedValue(initialOffsetX);
  const cameraY = useSharedValue(initialOffsetY);
  const zoom = useSharedValue(1.15);
  const pulse = useSharedValue(0);

  const dragStartX = useRef(initialOffsetX);
  const dragStartY = useRef(initialOffsetY);
  const lastPinchDist = useRef<number | null>(null);
  const lastPinchAngle = useRef<number | null>(null);
  const manualRotation = useSharedValue(0);
  const isPanning = useRef<boolean>(false);
  const panPauseUntilRef = useRef<number>(0);
  const hasInitialized = useRef<boolean>(false);

  // 4. Pulso suave para pins y avatar
  useFrameCallback((frameInfo) => {
    const dt = 1 / 60;
    pulse.value = (pulse.value + dt * 0.8) % 1;
  });

  // Centrado inicial en el avatar con zoom óptimo de navegación
  useEffect(() => {
    if (userPosition && !hasInitialized.current) {
      hasInitialized.current = true;
      const initialZ = 1.35;
      zoom.value = initialZ;
      const s = baseScale * initialZ;
      cameraX.value = screenWidth / 2 - userPosition.x * s;
      cameraY.value = screenHeight / 2 - userPosition.y * s;
    }
  }, [userPosition, baseScale, screenWidth, screenHeight, cameraX, cameraY, zoom]);

  // 5. Auto-seguimiento centrado directo del avatar cuando camina (con pausa inteligente al panear)
  useEffect(() => {
    if (isFollowingUser && userPosition && !isPanning.current) {
      const now = Date.now();
      if (now < panPauseUntilRef.current) {
        const remaining = panPauseUntilRef.current - now;
        const timer = setTimeout(() => {
          if (isFollowingUser && userPosition && !isPanning.current) {
            const currentScale = baseScale * zoom.value;
            cameraX.value = screenWidth / 2 - userPosition.x * currentScale;
            cameraY.value = screenHeight / 2 - userPosition.y * currentScale;
          }
        }, remaining);
        return () => clearTimeout(timer);
      }
      const currentScale = baseScale * zoom.value;
      const targetX = screenWidth / 2 - userPosition.x * currentScale;
      const targetY = screenHeight / 2 - userPosition.y * currentScale;
      cameraX.value = targetX;
      cameraY.value = targetY;
    }
  }, [userPosition, isFollowingUser, baseScale, zoom, screenWidth, screenHeight, cameraX, cameraY]);

  // 6. Ángulo de rotación del mapa (heading-up vs manual vs north-up)
  const rotationAngle = useDerivedValue(() => {
    if (cameraMode === 'heading-up' && userHeading !== undefined) {
      return -userHeading - Math.PI / 2;
    }
    return manualRotation.value;
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
          dragStartX.current = cameraX.value;
          dragStartY.current = cameraY.value;
          lastPinchDist.current = null;
          lastPinchAngle.current = null;
        },
        onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          panPauseUntilRef.current = Date.now() + 3500;
          const touches = evt.nativeEvent.touches;
          const moveDist = Math.hypot(gestureState.dx, gestureState.dy);
          if (moveDist > 6 && isFollowingUser) {
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

  // 9. Re-centrado manual (reactiva auto-follow)
  const handleRecenter = useCallback(() => {
    setIsFollowingUser(true);
    if (userPosition) {
      const targetX = screenWidth / 2 - userPosition.x * baseScale * zoom.value;
      const targetY = screenHeight / 2 - userPosition.y * baseScale * zoom.value;
      cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
      cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
    } else {
      cameraX.value = withSpring(initialOffsetX);
      cameraY.value = withSpring(initialOffsetY);
      zoom.value = withSpring(1);
    }
  }, [userPosition, baseScale, zoom, screenWidth, screenHeight, initialOffsetX, initialOffsetY, cameraX, cameraY]);

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
        <Group transform={transform}>
          {/* Capa 1: Pasillos */}
          {compiled.corridors.map((c) => (
            <Path
              key={c.id}
              path={c.path}
              color={c.fill}
              style="fill"
            />
          ))}

          {/* Capa 2: Zonas temáticas/cardinales */}
          {compiled.zones.map((z) => (
            <Path
              key={z.id}
              path={z.path}
              color={z.color}
              style="fill"
              opacity={0.08}
            />
          ))}

          {/* Capa 3: Locales comerciales (Alto Contraste) */}
          {compiled.stores.map((s) => {
            const isTarget = s.id === selectedStoreId || s.isDestination;
            return (
              <React.Fragment key={s.id}>
                <Path
                  path={s.path}
                  color={isTarget ? '#DBEAFE' : s.fill}
                  style="fill"
                  opacity={s.isVisible ? 1 : 0.25}
                />
                <Path
                  path={s.path}
                  color={isTarget ? '#2563EB' : s.stroke}
                  style="stroke"
                  strokeWidth={isTarget ? 3 / (baseScale * zoom.value) : 1.2 / (baseScale * zoom.value)}
                  opacity={s.isVisible ? 1 : 0.35}
                />
              </React.Fragment>
            );
          })}

          {/* Capa 4: Plazas */}
          {compiled.plazas.map((p) => (
            <React.Fragment key={p.id}>
              <Circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                color={p.fill}
                style="fill"
                opacity={0.85}
              />
              <Circle
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                color="#6366F1"
                style="stroke"
                strokeWidth={1.5 / (baseScale * zoom.value)}
                opacity={0.35}
              />
            </React.Fragment>
          ))}

          {/* Capa 5: Rutas */}
          {compiled.routes.map((r, idx) => (
            <React.Fragment key={`route-${idx}`}>
              {r.remainingPath && (
                <Path
                  path={r.remainingPath}
                  color="#93C5FD"
                  style="stroke"
                  strokeWidth={5 / (baseScale * zoom.value)}
                  strokeCap="round"
                  strokeJoin="round"
                  opacity={0.7}
                />
              )}
              {r.immediatePath && (
                <Path
                  path={r.immediatePath}
                  color="#2563EB"
                  style="stroke"
                  strokeWidth={7.5 / (baseScale * zoom.value)}
                  strokeCap="round"
                  strokeJoin="round"
                />
              )}
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
                  strokeWidth={4.5 / (baseScale * zoom.value)}
                  strokeCap="round"
                  strokeJoin="round"
                  opacity={seg.opacity}
                />
              ))}
            </React.Fragment>
          ))}

          {/* Capa 5.2: Cono de Visión Direccional */}
          {compiled.visionCones.map((cone, cIdx) => (
            <Path
              key={`vision-cone-${cIdx}`}
              path={cone.path}
              color="#3B82F6"
              style="fill"
              opacity={cone.opacity}
            />
          ))}

          {/* Capa 5.5: Badges de Ofertas Comerciales (Modo 2) */}
          {compiled.offerBadges.map((ob, i) => (
            <React.Fragment key={`offer-${ob.storeId}-${i}`}>
              <Circle
                cx={ob.x}
                cy={ob.y}
                r={10 / (baseScale * zoom.value)}
                color="#EA580C"
                style="fill"
              />
              <Circle
                cx={ob.x}
                cy={ob.y}
                r={10 / (baseScale * zoom.value)}
                color="#FFFFFF"
                style="stroke"
                strokeWidth={2 / (baseScale * zoom.value)}
              />
            </React.Fragment>
          ))}

          {/* Capa 6: Pin de Destino */}
          {compiled.destinationPins.map((dp, i) => (
            <React.Fragment key={`dest-${dp.storeId}-${i}`}>
              <Circle
                cx={dp.x}
                cy={dp.y}
                r={8 / (baseScale * zoom.value)}
                color="#EF4444"
                style="fill"
              />
              <Circle
                cx={dp.x}
                cy={dp.y}
                r={14 / (baseScale * zoom.value)}
                color="#FCA5A5"
                style="stroke"
                strokeWidth={2 / (baseScale * zoom.value)}
                opacity={0.8}
              />
            </React.Fragment>
          ))}

          {/* Capa 7: Pin de Usuario (Beacon con Halo + Flecha Direccional) */}
          {compiled.userPins.map((up, i) => {
            const currentScale = baseScale * zoom.value;
            let arrowPath: string | null = null;
            if (userHeading !== undefined) {
              const tipLen = 14 / currentScale;
              const wingLen = 7 / currentScale;
              const tipX = up.x + Math.cos(userHeading) * tipLen;
              const tipY = up.y + Math.sin(userHeading) * tipLen;
              const leftX = up.x + Math.cos(userHeading + 2.5) * wingLen;
              const leftY = up.y + Math.sin(userHeading + 2.5) * wingLen;
              const rightX = up.x + Math.cos(userHeading - 2.5) * wingLen;
              const rightY = up.y + Math.sin(userHeading - 2.5) * wingLen;
              arrowPath = `M ${tipX} ${tipY} L ${leftX} ${leftY} L ${up.x} ${up.y} L ${rightX} ${rightY} Z`;
            }

            return (
              <React.Fragment key={`user-${i}`}>
                <Circle
                  cx={up.x}
                  cy={up.y}
                  r={18 / currentScale}
                  color="#BFDBFE"
                  style="fill"
                  opacity={0.45}
                />
                <Circle
                  cx={up.x}
                  cy={up.y}
                  r={7.5 / currentScale}
                  color="#2563EB"
                  style="fill"
                />
                <Circle
                  cx={up.x}
                  cy={up.y}
                  r={7.5 / currentScale}
                  color="#FFFFFF"
                  style="stroke"
                  strokeWidth={2 / currentScale}
                />
                {arrowPath && (
                  <Path
                    path={arrowPath}
                    color="#FFFFFF"
                    style="fill"
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Capa 8: Etiquetas de Locales y Plazas (GPU Skia Text & Pills) */}
          {compiled.labels.map((lbl, idx) => {
            const isDest = lbl.priority === 1;
            const isPlaza = lbl.priority === 2;
            const font = isDest ? fontDest : isPlaza ? fontPlaza : fontStore;
            const pillFill = isDest ? '#FEF3C7' : isPlaza ? '#EEF2FF' : '#FFFFFF';
            const pillStroke = isDest ? '#F59E0B' : isPlaza ? '#818CF8' : '#CBD5E1';
            const textColor = isDest ? '#B45309' : isPlaza ? '#3730A3' : '#0F172A';
            const charWidth = isDest ? 6.2 : isPlaza ? 5.8 : 4.8;
            const pillW = Math.max(26, lbl.text.length * charWidth + 8);
            const pillH = isDest ? 15 : isPlaza ? 13 : 11;

            return (
              <React.Fragment key={`lbl-${idx}`}>
                <RoundedRect
                  x={lbl.x - pillW / 2}
                  y={lbl.y - pillH / 2}
                  width={pillW}
                  height={pillH}
                  r={pillH / 2}
                  color={pillFill}
                />
                <RoundedRect
                  x={lbl.x - pillW / 2}
                  y={lbl.y - pillH / 2}
                  width={pillW}
                  height={pillH}
                  r={pillH / 2}
                  color={pillStroke}
                  style="stroke"
                  strokeWidth={1}
                />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
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
