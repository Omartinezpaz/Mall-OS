import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import Svg, {
  Polygon,
  Polyline,
  Circle,
  Path,
  G,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {
  sambilMall,
  type MallMapData,
  type RouteResult,
  type NavNode,
  type MapStore,
} from '@mallos/map-engine';

export interface NavigationMapHandle {
  recenterOnUser: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleHeadingUp: () => void;
}

export interface NavigationMapProps {
  mapRef?: React.RefObject<NavigationMapHandle | null>;
  mallData?: MallMapData;
  floorId: string;
  destinationStoreId?: string;
  userPlaneCoords?: { x: number; y: number } | null;
  userHeadingAngle?: number;
  activeRoute?: RouteResult | null;
  headingUp?: boolean;
  onSelectStore?: (storeId: string) => void;
}

export function NavigationMap({
  mapRef,
  mallData = sambilMall,
  floorId,
  destinationStoreId,
  userPlaneCoords,
  userHeadingAngle = 0,
  activeRoute,
  headingUp = false,
  onSelectStore,
}: NavigationMapProps) {
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({
    width: 390,
    height: 700,
  });

  const [zoom, setZoom] = useState<number>(2.4);
  const [isHeadingUp, setIsHeadingUp] = useState<boolean>(headingUp);
  const [manualOffset, setManualOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);

  const currentFloor = useMemo(() => {
    return mallData.floors.find((f) => f.id === floorId) ?? mallData.floors[0]!;
  }, [mallData, floorId]);

  const targetStore = useMemo(() => {
    if (!destinationStoreId) return null;
    return mallData.stores.find((s) => s.id === destinationStoreId) ?? null;
  }, [mallData, destinationStoreId]);

  // Nodos del piso actual
  const floorNodes = useMemo(() => {
    return mallData.nodes.filter((n) => (n.floorId ?? currentFloor.id) === currentFloor.id);
  }, [mallData, currentFloor]);

  const nodeMap = useMemo(() => {
    return new Map<string, NavNode>(floorNodes.map((n) => [n.id, n]));
  }, [floorNodes]);

  // Ruta proyectada sobre el piso actual
  const routePoints = useMemo(() => {
    if (!activeRoute || !activeRoute.nodeIds || activeRoute.nodeIds.length === 0) return [];
    const pts: { x: number; y: number; id: string }[] = [];
    for (const id of activeRoute.nodeIds) {
      const node = nodeMap.get(id);
      if (node) {
        pts.push({ x: node.x, y: node.y, id: node.id });
      }
    }
    return pts;
  }, [activeRoute, nodeMap]);

  // Posición de la cámara predictiva: Usuario en el 62% vertical de la pantalla
  const cameraCenter = useMemo(() => {
    if (userPlaneCoords) {
      return { x: userPlaneCoords.x, y: userPlaneCoords.y };
    }
    if (routePoints.length > 0) {
      return { x: routePoints[0]!.x, y: routePoints[0]!.y };
    }
    return { x: currentFloor.width / 2, y: currentFloor.height / 2 };
  }, [userPlaneCoords, routePoints, currentFloor]);

  // Recenter handler
  const recenter = () => {
    setManualOffset({ x: 0, y: 0 });
    setZoom(2.4);
  };

  useEffect(() => {
    if (mapRef) {
      (mapRef as React.MutableRefObject<NavigationMapHandle | null>).current = {
        recenterOnUser: recenter,
        zoomIn: () => setZoom((z) => Math.min(4.5, z * 1.25)),
        zoomOut: () => setZoom((z) => Math.max(1.2, z * 0.8)),
        toggleHeadingUp: () => setIsHeadingUp((h) => !h),
      };
    }
  }, [mapRef]);

  // Pan Responder para navegación táctil libre
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.hypot(gesture.dx, gesture.dy) > 4,
      onPanResponderGrant: () => {
        setIsPanning(true);
      },
      onPanResponderMove: (_, gesture: PanResponderGestureState) => {
        setManualOffset((prev) => ({
          x: prev.x + gesture.dx * 0.4,
          y: prev.y + gesture.dy * 0.4,
        }));
      },
      onPanResponderRelease: () => {
        setIsPanning(false);
      },
    });
  }, []);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setContainerSize({ width, height });
    }
  };

  // Transformación Top-Down predictiva
  // Posiciona el centro del usuario en (viewport.width / 2, viewport.height * 0.62)
  const targetScreenX = containerSize.width * 0.5 + manualOffset.x;
  const targetScreenY = containerSize.height * 0.60 + manualOffset.y;

  const transformMatrix = useMemo(() => {
    const scale = zoom;
    const rot = isHeadingUp ? -userHeadingAngle : 0;

    return `translate(${targetScreenX}, ${targetScreenY}) rotate(${rot}) scale(${scale}) translate(${-cameraCenter.x}, ${-cameraCenter.y})`;
  }, [zoom, isHeadingUp, userHeadingAngle, targetScreenX, targetScreenY, cameraCenter]);

  return (
    <View style={styles.container} onLayout={onLayout} {...panResponder.panHandlers}>
      <Svg style={StyleSheet.absoluteFillObject} width={containerSize.width} height={containerSize.height}>
        <Defs>
          {/* Gradiente luminoso para la ruta activa de navegación */}
          <LinearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#10B981" stopOpacity="1" />
            <Stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="userPulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

        <G transform={transformMatrix}>
          {/* 1. Huella Base / Planta General (Atenuada) */}
          {currentFloor.footprint && currentFloor.footprint.length >= 3 && (
            <Polygon
              points={currentFloor.footprint.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="#090E1A"
              stroke="#1E293B"
              strokeWidth={2}
            />
          )}

          {/* 2. Áreas de Pasillos Transitables (Suelo limpio iluminado) */}
          {currentFloor.areas?.map((area) => {
            const areaPoints = area.polygon ?? (area.rect ? [
              { x: area.rect.x, y: area.rect.y },
              { x: area.rect.x + area.rect.w, y: area.rect.y },
              { x: area.rect.x + area.rect.w, y: area.rect.y + area.rect.h },
              { x: area.rect.x, y: area.rect.y + area.rect.h },
            ] : null);

            if (!areaPoints || areaPoints.length < 3) return null;

            if (area.kind === 'corridor') {
              return (
                <Polygon
                  key={area.id}
                  points={areaPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="rgba(30, 41, 59, 0.75)"
                  stroke="rgba(56, 189, 248, 0.2)"
                  strokeWidth={1}
                />
              );
            }
            if (area.kind === 'plaza') {
              const xs = areaPoints.map((p) => p.x);
              const ys = areaPoints.map((p) => p.y);
              const cx = area.center?.x ?? xs.reduce((a, b) => a + b, 0) / xs.length;
              const cy = area.center?.y ?? ys.reduce((a, b) => a + b, 0) / ys.length;
              return (
                <G key={area.id}>
                  <Polygon
                    points={areaPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(245, 158, 11, 0.12)"
                    stroke="rgba(245, 158, 11, 0.4)"
                    strokeWidth={1.5}
                  />
                  <SvgText
                    x={cx}
                    y={cy + 3}
                    fill="rgba(245, 158, 11, 0.85)"
                    fontSize={7.5}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {area.label ?? 'PLAZA'}
                  </SvgText>
                </G>
              );
            }
            return null;
          })}

          {/* 3. Tiendas No-Destino (Atenuadas y sin ruido para despejar la vista) */}
          {mallData.stores
            .filter((s) => s.floorId === currentFloor.id && s.id !== destinationStoreId)
            .map((store) => {
              const storePts = store.polygon ?? [
                { x: store.x, y: store.y },
                { x: store.x + store.w, y: store.y },
                { x: store.x + store.w, y: store.y + store.h },
                { x: store.x, y: store.y + store.h },
              ];
              if (storePts.length < 3) return null;
              return (
                <Polygon
                  key={store.id}
                  points={storePts.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="rgba(15, 23, 42, 0.6)"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth={0.8}
                />
              );
            })}

          {/* 4. Tienda Destino Resaltada con Brillo Esmeralda */}
          {targetStore && targetStore.floorId === currentFloor.id && (() => {
            const destPts = targetStore.polygon ?? [
              { x: targetStore.x, y: targetStore.y },
              { x: targetStore.x + targetStore.w, y: targetStore.y },
              { x: targetStore.x + targetStore.w, y: targetStore.y + targetStore.h },
              { x: targetStore.x, y: targetStore.y + targetStore.h },
            ];
            const targetX = targetStore.labelPos?.x ?? targetStore.x + targetStore.w / 2;
            const targetY = targetStore.labelPos?.y ?? targetStore.y + targetStore.h / 2;

            return (
              <G>
                <Polygon
                  points={destPts.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="rgba(16, 185, 129, 0.35)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                />
                <Circle
                  cx={targetX}
                  cy={targetY}
                  r={10}
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
                <SvgText
                  x={targetX}
                  y={targetY + 3}
                  fill="#FFFFFF"
                  fontSize={9}
                  fontWeight="900"
                  textAnchor="middle"
                >
                  🏬
                </SvgText>
                <SvgText
                  x={targetX}
                  y={targetY - 13}
                  fill="#10B981"
                  fontSize={8.5}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {targetStore.name}
                </SvgText>
              </G>
            );
          })()}

          {/* 5. Núcleos Verticales (Escaleras & Ascensores en ruta) */}
          {currentFloor.props?.map((prop) => {
            if (prop.kind === 'escalator' || prop.kind === 'elevator') {
              const px = prop.rect.x + prop.rect.w / 2;
              const py = prop.rect.y + prop.rect.h / 2;
              return (
                <G key={prop.id}>
                  <Circle cx={px} cy={py} r={6} fill="rgba(6, 182, 212, 0.3)" stroke="#06B6D4" strokeWidth={1} />
                  <SvgText x={px} y={py + 3} fill="#FFFFFF" fontSize={7} textAnchor="middle">
                    {prop.kind === 'escalator' ? '🪜' : '🛗'}
                  </SvgText>
                </G>
              );
            }
            return null;
          })}

          {/* 6. RUTA DE NAVEGACIÓN PROGRESIVA (Protagonista Absoluta) */}
          {routePoints.length >= 2 && (
            <G>
              {/* Sombra / Glow exterior */}
              <Polyline
                points={routePoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="rgba(16, 185, 129, 0.25)"
                strokeWidth={18}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Borde de alto contraste */}
              <Polyline
                points={routePoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={9}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Cinta central de navegación luminosa */}
              <Polyline
                points={routePoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth={6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Waypoints / Nodos de la ruta */}
              {routePoints.map((p, idx) => {
                const isLast = idx === routePoints.length - 1;
                if (isLast) return null;
                return (
                  <Circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={2.8}
                    fill="#FFFFFF"
                    stroke="#0F172A"
                    strokeWidth={1}
                  />
                );
              })}
            </G>
          )}

          {/* 7. USER PUCK INMERSIVO ("Tú Estás Aquí") */}
          {userPlaneCoords && (
            <G>
              {/* Halo de precisión / Pulso */}
              <Circle
                cx={userPlaneCoords.x}
                cy={userPlaneCoords.y}
                r={24}
                fill="url(#userPulseGradient)"
              />
              <Circle
                cx={userPlaneCoords.x}
                cy={userPlaneCoords.y}
                r={16}
                fill="rgba(56, 189, 248, 0.15)"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth={1}
              />

              {/* Cono de Rumbo / Dirección Visual */}
              {(() => {
                const len = 22;
                const spread = 28 * (Math.PI / 180);
                const headingRad = (userHeadingAngle * Math.PI) / 180;
                const p1x = userPlaneCoords.x + Math.sin(headingRad) * len;
                const p1y = userPlaneCoords.y - Math.cos(headingRad) * len;
                const p2x = userPlaneCoords.x + Math.sin(headingRad + spread) * (len * 0.6);
                const p2y = userPlaneCoords.y - Math.cos(headingRad + spread) * (len * 0.6);
                const p3x = userPlaneCoords.x + Math.sin(headingRad - spread) * (len * 0.6);
                const p3y = userPlaneCoords.y - Math.cos(headingRad - spread) * (len * 0.6);

                return (
                  <Polygon
                    points={`${userPlaneCoords.x},${userPlaneCoords.y} ${p2x},${p2y} ${p1x},${p1y} ${p3x},${p3y}`}
                    fill="rgba(56, 189, 248, 0.35)"
                  />
                );
              })()}

              {/* Puck Central (Círculo azul/blanco de navegación) */}
              <Circle
                cx={userPlaneCoords.x}
                cy={userPlaneCoords.y}
                r={7}
                fill="#38BDF8"
                stroke="#FFFFFF"
                strokeWidth={2.5}
              />
              <Circle
                cx={userPlaneCoords.x}
                cy={userPlaneCoords.y}
                r={2.5}
                fill="#FFFFFF"
              />
            </G>
          )}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
    overflow: 'hidden',
  },
});
