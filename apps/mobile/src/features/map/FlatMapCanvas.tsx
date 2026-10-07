import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';
import {
  Canvas,
  Group,
  Path,
  Circle,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  useFrameCallback,
  withSpring,
} from 'react-native-reanimated';
import type { FlatScene, Point } from '@mallos/map-engine';
import { compileFlatScene } from './skia/compile-flat-scene';

export interface FlatMapCanvasProps {
  scene: FlatScene;
  userPosition?: Point;
  userHeading?: number;
  selectedStoreId?: string;
  onStorePress?: (storeId: string) => void;
  onResetNorth?: () => void;
  showCompass?: boolean;
  followUser?: boolean;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4.5;
const PADDING = 20;

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
  selectedStoreId,
  onStorePress,
  onResetNorth,
  showCompass = true,
  followUser = true,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

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
  const zoom = useSharedValue(1);
  const pulse = useSharedValue(0);

  const dragStartX = useRef(initialOffsetX);
  const dragStartY = useRef(initialOffsetY);
  const lastPinchDist = useRef<number | null>(null);
  const isPanning = useRef<boolean>(false);

  // 4. Pulso suave para pins y avatar
  useFrameCallback((frameInfo) => {
    const dt = 1 / 60;
    pulse.value = (pulse.value + dt * 0.8) % 1;
  });

  // 5. Auto-seguimiento suave del avatar cuando camina
  useEffect(() => {
    if (followUser && userPosition && !isPanning.current) {
      const currentScale = baseScale * zoom.value;
      const targetX = screenWidth / 2 - userPosition.x * currentScale;
      const targetY = screenHeight / 2 - userPosition.y * currentScale;
      cameraX.value = withSpring(targetX, { damping: 20, stiffness: 90 });
      cameraY.value = withSpring(targetY, { damping: 20, stiffness: 90 });
    }
  }, [userPosition, followUser, baseScale, zoom, screenWidth, screenHeight, cameraX, cameraY]);

  // 6. PanResponder para paneo multitáctil, zoom y tap detection (hit-testing)
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
        },
        onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          const touches = evt.nativeEvent.touches;
          if (touches.length === 2 && touches[0] && touches[1]) {
            // Gesto de Pinch (dos dedos)
            const dx = touches[0].pageX - touches[1].pageX;
            const dy = touches[0].pageY - touches[1].pageY;
            const dist = Math.hypot(dx, dy);

            if (lastPinchDist.current !== null && lastPinchDist.current > 0) {
              const factor = dist / lastPinchDist.current;
              const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom.value * factor));
              zoom.value = nextZoom;
            }
            lastPinchDist.current = dist;
          } else {
            // Paneo con 1 dedo
            lastPinchDist.current = null;
            cameraX.value = dragStartX.current + gestureState.dx;
            cameraY.value = dragStartY.current + gestureState.dy;
          }
        },
        onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          lastPinchDist.current = null;
          isPanning.current = false;
          // Si el movimiento fue mínimo, tratar como Tap (Hit-testing de tiendas)
          const moveDist = Math.hypot(gestureState.dx, gestureState.dy);
          if (moveDist < 6 && onStorePress) {
            const touchX = evt.nativeEvent.locationX;
            const touchY = evt.nativeEvent.locationY;
            const currentScale = baseScale * zoom.value;
            const mallX = (touchX - cameraX.value) / currentScale;
            const mallY = (touchY - cameraY.value) / currentScale;

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
    [cameraX, cameraY, zoom, baseScale, scene.items, onStorePress]
  );

  // 7. Matriz de transformación 2D combinada
  const transform = useDerivedValue(() => [
    { translateX: cameraX.value },
    { translateY: cameraY.value },
    { scale: baseScale * zoom.value },
  ]);

  // 7. Re-centrado manual
  const handleRecenter = useCallback(() => {
    if (userPosition) {
      const targetX = screenWidth / 2 - userPosition.x * baseScale * zoom.value;
      const targetY = screenHeight / 2 - userPosition.y * baseScale * zoom.value;
      cameraX.value = withSpring(targetX);
      cameraY.value = withSpring(targetY);
    } else {
      cameraX.value = withSpring(initialOffsetX);
      cameraY.value = withSpring(initialOffsetY);
      zoom.value = withSpring(1);
    }
  }, [userPosition, baseScale, zoom, screenWidth, screenHeight, initialOffsetX, initialOffsetY, cameraX, cameraY]);

  // 8. Ángulo norte para brújula
  const northAngleDeg = scene.meta.northAngle
    ? (scene.meta.northAngle * 180) / Math.PI
    : 0;

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

          {/* Capa 3: Locales comerciales */}
          {compiled.stores.map((s) => {
            const isTarget = s.id === selectedStoreId || s.isDestination;
            return (
              <React.Fragment key={s.id}>
                <Path
                  path={s.path}
                  color={isTarget ? '#DBEAFE' : s.fill}
                  style="fill"
                  opacity={s.isVisible ? 1 : 0.4}
                />
                <Path
                  path={s.path}
                  color={isTarget ? '#2563EB' : s.stroke}
                  style="stroke"
                  strokeWidth={isTarget ? 3 / (baseScale * zoom.value) : 1 / (baseScale * zoom.value)}
                  opacity={s.isVisible ? 1 : 0.5}
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
                opacity={0.3}
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
                  strokeWidth={4.5 / (baseScale * zoom.value)}
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
                  strokeWidth={6 / (baseScale * zoom.value)}
                  strokeCap="round"
                  strokeJoin="round"
                />
              )}
            </React.Fragment>
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

          {/* Capa 7: Pin de Usuario (Beacon) */}
          {compiled.userPins.map((up, i) => (
            <React.Fragment key={`user-${i}`}>
              <Circle
                cx={up.x}
                cy={up.y}
                r={18 / (baseScale * zoom.value)}
                color="#BFDBFE"
                style="fill"
                opacity={0.4}
              />
              <Circle
                cx={up.x}
                cy={up.y}
                r={7 / (baseScale * zoom.value)}
                color="#2563EB"
                style="fill"
              />
              <Circle
                cx={up.x}
                cy={up.y}
                r={7 / (baseScale * zoom.value)}
                color="#FFFFFF"
                style="stroke"
                strokeWidth={2 / (baseScale * zoom.value)}
              />
            </React.Fragment>
          ))}
        </Group>
      </Canvas>

      {/* Brújula / Indicador de Norte */}
      {showCompass && (
        <TouchableOpacity
          style={styles.compassButton}
          onPress={onResetNorth ?? handleRecenter}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.compassArrowContainer,
              { transform: [{ rotate: `${-northAngleDeg}deg` }] },
            ]}
          >
            <Text style={styles.compassText}>N</Text>
            <View style={styles.compassNeedle} />
          </View>
        </TouchableOpacity>
      )}

      {/* Botón de Auto-centrado */}
      <TouchableOpacity
        style={styles.recenterButton}
        onPress={handleRecenter}
        activeOpacity={0.8}
      >
        <Text style={styles.recenterIcon}>📍</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    top: 54,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  compassArrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EF4444',
  },
  compassNeedle: {
    width: 3,
    height: 10,
    backgroundColor: '#EF4444',
    borderRadius: 1.5,
    marginTop: 1,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recenterIcon: {
    fontSize: 20,
  },
});
