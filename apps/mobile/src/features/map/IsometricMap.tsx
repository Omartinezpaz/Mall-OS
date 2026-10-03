import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import Svg, {
  Polygon,
  Polyline,
  Circle,
  Ellipse,
  Text as SvgText,
  G,
  Rect,
  Path,
} from 'react-native-svg';
import {
  demoMall,
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_DIVERSION,
  buildScene,
  findRouteToStore,
  findNearestNode,
  project,
  unproject,
  type Scene,
  type SceneItem,
  type RouteResult,
  type MallMapData,
  DEFAULT_ISO,
} from '@mallos/map-engine';
import { categoryPalette } from '@mallos/design-tokens';

// Horarios de apertura y cierre por local [horaAbre, horaCierra]
export const STORE_SCHEDULES: Record<string, [number, number]> = {
  // Sambil Chacao - Nivel Autopista
  tijerazo: [10, 20],
  macuto: [10, 20],
  cines_unidos: [12, 23.5],
  lc_waikiki: [10, 21],
  bath_body: [10, 21],
  estivaneli: [10, 20],
  mng: [10, 21],
  tommy: [10, 21],
  springfield: [10, 20],
  las_villas: [10, 20],
  stradivarius: [10, 21],
  bershka: [10, 21],
  pull_bear: [10, 21],
  farmatodo: [7, 23],
  victoria_secret: [10, 21],
  skechers: [10, 21],
  palacio_blumer: [10, 20],
  banco_tesoro: [8.5, 15.5],
  big_shoes: [10, 20],
  fit_body_care: [9, 21],
  pets_planet: [9, 20],
  mc_cafe: [8, 22],
  sandro: [10, 20],
  la_corte: [10, 20],
  pawnee: [10, 20],
  yuju: [11, 21],
  el_king_gourmet: [10, 22],
  mini_good: [10, 21],
  heladeria_4d: [11, 22],
  planeta_sport: [10, 21],
  piedy: [10, 20],
  holic_shop: [10, 20],
  hollywood_star: [10, 20],
  jump: [10, 21],
  movinet: [9, 20],
  glam_eclat: [10, 20],
  harem_shoes: [10, 20],
  euphoria: [10, 20],
  jeep_cat: [10, 21],
  apolo: [10, 20],
  sportland: [10, 21],
  bnc: [8.5, 15.5],
  bellagio: [10, 19],
  hg_fashion: [10, 20],
  vmagic: [10, 20],
  lucy_lingerie: [10, 20],
  converse: [10, 21],
  london_jeans: [10, 20],
  maral_joyeros: [10, 19],
  canguro: [9, 21],
  panots: [10, 20],
  gran_via: [10, 20],
  line: [10, 20],
  fashion_look: [10, 20],
  optica_billi: [9, 20],
  womens_secret: [10, 21],
  urban_market: [10, 21],
  mookshield: [9, 20],
  jasis: [10, 20],
  crocs: [10, 21],
  mario_hernandez: [10, 20],
  brands_shop: [10, 20],
  lucchi: [10, 20],
  opticolor_auto: [9, 20],
  calza_fex: [10, 20],
  top_ten_18: [10, 20],
  bhype: [10, 21],
  psycobunny: [10, 21],
  aishop: [10, 20],
  jadu_cosmetics: [10, 20],
  xc2: [10, 20],
  libby_lu: [10, 20],
  usa_jeans: [10, 20],
  reinaldo_sport: [10, 21],
  juventus: [10, 20],
  sport_market: [10, 21],
  al_giorno: [10, 20],
  james_bark: [10, 21],
  rs: [10, 21],
  boom_shoes: [10, 20],
  salome: [10, 20],
  prime_bodegon: [9, 22],

  // Sambil Chacao - Nivel Acuario
  zara: [10, 21],
  ninja_park: [11, 21],
  nike_sambil: [10, 21],
  miniso: [10, 21],
  adidas: [10, 21],
  reebok: [10, 20],
  tecniciencia: [9, 20],
  timberland: [10, 20],
  guess: [10, 21],
  us_polo: [10, 21],
  columbia: [10, 20],
  pawer: [10, 20],

  // Sambil Chacao - Nivel Libertador
  samsung: [10, 20],
  apple_reseller: [10, 20],
  balu: [10, 21],
  aldo: [10, 20],
  joyeria_branger: [10, 19],
  opticolor: [9, 19],
  xiaomi: [10, 20],

  // Sambil Chacao - Nivel Diversión / Terrazas
  mango_bajito: [9, 21],
  anfiteatro: [12, 24],
  bonsai_sushi: [11, 23],
  migas_cafe: [8, 22],
  pizza_hut: [11, 22],
  burger_king: [11, 22],
  allegre: [12, 23],
  tibon_grill: [12, 23],

  // Legacy / Benchmark Demo Mall
  super: [7, 21],
  gym: [5, 22],
  panaderia: [6, 19],
  charcuteria: [8, 18],
  farmacia: [8, 20],
  banco: [8, 15.5],
  muebleria: [9, 18],
  comida: [10, 22],
  banos: [0, 24],
  servicios: [8, 20],
  st_pb_01: [9, 21],
  st_pb_02: [10, 21],
  st_pb_03: [10, 20],
};

export function isStoreOpenAt(storeId: string, hour: number): boolean {
  const schedule = STORE_SCHEDULES[storeId] || [9, 21];
  return hour >= schedule[0] && hour < schedule[1];
}

export function formatTimeHours(hour: number): string {
  const h = Math.floor(hour) % 12 || 12;
  const m = String(Math.round((hour % 1) * 60)).padStart(2, '0');
  const period = hour % 24 < 12 ? 'am' : 'pm';
  return `${h}:${m} ${period}`;
}

export interface IsometricMapHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  recenterOnUser: () => void;
  focusOnStore: (storeId: string) => void;
}

interface IsometricMapProps {
  mallData?: MallMapData;
  selectedStoreId?: string;
  destinationStoreId?: string;
  onSelectStore?: (storeId: string) => void;
  floorId?: string;
  userNodeId?: string;
  userPlaneCoords?: { x: number; y: number };
  userHeadingAngle?: number;
  onUserNodeChange?: (nodeId: string) => void;
  isPlacingUser?: boolean;
  onFinishPlacingUser?: () => void;
  currentHour?: number;
  onRouteChange?: (route: RouteResult | null) => void;
  mapRef?: React.RefObject<IsometricMapHandle | null>;
  followUser?: boolean;
}

export function IsometricMap({
  mallData = sambilMall,
  selectedStoreId,
  destinationStoreId,
  onSelectStore,
  floorId = LEVEL_AUTOPISTA,
  userNodeId = 'pj-floor-autopista',
  userPlaneCoords,
  userHeadingAngle = 0,
  onUserNodeChange,
  isPlacingUser = false,
  onFinishPlacingUser,
  currentHour,
  onRouteChange,
  mapRef,
  followUser = false,
}: IsometricMapProps) {
  const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });
  const containerSizeRef = useRef({ width: 360, height: 400 });

  // Hora actual del centro comercial (por defecto hora real del dispositivo)
  const effectiveHour = useMemo(() => {
    if (currentHour !== undefined) return currentHour;
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  }, [currentHour]);

  // Lista de tiendas cerradas en este momento
  const dimmedStoreIds = useMemo(() => {
    return mallData.stores
      .filter((s) => !isStoreOpenAt(s.id, effectiveHour))
      .map((s) => s.id);
  }, [mallData, effectiveHour]);

  // Calcula ruta activa si hay destino seleccionado
  const targetStoreId = destinationStoreId || selectedStoreId;
  const route = useMemo(() => {
    if (!targetStoreId) return null;
    return findRouteToStore(mallData, userNodeId, targetStoreId);
  }, [mallData, userNodeId, targetStoreId]);

  // Notifica al padre cuando la ruta cambia
  useEffect(() => {
    if (onRouteChange) {
      onRouteChange(route);
    }
  }, [route, onRouteChange]);

  // Construye la escena isométrica estática de forma eficiente
  const scene: Scene = useMemo(() => {
    return buildScene(mallData, {
      floorId,
      palette: categoryPalette,
      selectedStoreId: targetStoreId,
      dimmedStoreIds,
      routeNodeIds: route?.nodeIds,
      routePhase: 0,
      detail: 'medium',
      labels: 'all',
      selectedLift: 3,
    });
  }, [mallData, floorId, targetStoreId, dimmedStoreIds, route]);

  const { x: vx, y: vy, w: vw, h: vh } = scene.viewBox;

  // Nodo o coordenada continua del usuario
  const userNode = useMemo(() => {
    return (
      mallData.nodes.find((n) => n.id === userNodeId) ||
      mallData.nodes.find((n) => n.floorId === floorId) ||
      mallData.nodes[0]
    );
  }, [mallData, userNodeId, floorId]);

  const rawUserCoords =
    userPlaneCoords ||
    (userNode ? { x: userNode.x, y: userNode.y } : { x: 80, y: 220 });

  const userIsoPos = useMemo(() => {
    return project(rawUserCoords.x, rawUserCoords.y, 1.5, DEFAULT_ISO);
  }, [rawUserCoords]);

  // Si followUser está activo, mantiene la cámara suavemente centrada en el avatar
  useEffect(() => {
    if (!followUser) return;
    // Calcula la traslación necesaria para centrar el userIsoPos en la pantalla
    const targetTx = -userIsoPos.x * 0.4;
    const targetTy = -userIsoPos.y * 0.4;
    setTransform((prev) => ({
      ...prev,
      translateX: targetTx,
      translateY: targetTy,
    }));
  }, [followUser, userIsoPos.x, userIsoPos.y]);

  // Exponer métodos al padre (Zoom +, Zoom -, Reset, Recenter, FocusOnStore)
  useEffect(() => {
    if (!mapRef) return;
    (mapRef as React.MutableRefObject<IsometricMapHandle | null>).current = {
      zoomIn: () => {
        setTransform((prev) => ({
          ...prev,
          scale: Math.min(3.5, prev.scale * 1.3),
        }));
      },
      zoomOut: () => {
        setTransform((prev) => ({
          ...prev,
          scale: Math.max(0.7, prev.scale / 1.3),
        }));
      },
      resetView: () => {
        setTransform({ scale: 1, translateX: 0, translateY: 0 });
      },
      recenterOnUser: () => {
        setTransform({
          scale: 1.35,
          translateX: -userIsoPos.x * 0.4,
          translateY: -userIsoPos.y * 0.4,
        });
      },
      focusOnStore: (storeId: string) => {
        const store = mallData.stores.find((s) => s.id === storeId);
        if (store) {
          const storeIso = project(
            store.x + store.w / 2,
            store.y + store.h / 2,
            0,
            DEFAULT_ISO
          );
          setTransform({
            scale: 1.4,
            translateX: -storeIso.x * 0.4,
            translateY: -storeIso.y * 0.4,
          });
        }
      },
    };
  }, [mapRef, userIsoPos, mallData]);

  // Gestos táctiles: Arrastre (Pan) y Pellizco (Pinch to Zoom)
  const initialTouchDistRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1);
  const lastPanRef = useRef({ x: 0, y: 0 });
  const touchMovementRef = useRef<number>(0);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          touchMovementRef.current = 0;
          if (evt.nativeEvent.touches.length === 2) {
            const [t1, t2] = evt.nativeEvent.touches;
            if (t1 && t2) {
              const dist = Math.hypot(t1.pageX - t2.pageX, t1.pageY - t2.pageY);
              initialTouchDistRef.current = dist;
              initialScaleRef.current = transform.scale;
            }
          } else {
            lastPanRef.current = { x: transform.translateX, y: transform.translateY };
          }
        },
        onPanResponderMove: (evt: GestureResponderEvent, gesture: PanResponderGestureState) => {
          touchMovementRef.current += Math.abs(gesture.dx) + Math.abs(gesture.dy);

          if (evt.nativeEvent.touches.length === 2 && initialTouchDistRef.current) {
            const [t1, t2] = evt.nativeEvent.touches;
            if (t1 && t2) {
              const currentDist = Math.hypot(t1.pageX - t2.pageX, t1.pageY - t2.pageY);
              const factor = currentDist / Math.max(1, initialTouchDistRef.current);
              const newScale = Math.min(3.5, Math.max(0.7, initialScaleRef.current * factor));
              setTransform((prev) => ({ ...prev, scale: newScale }));
            }
          } else if (evt.nativeEvent.touches.length === 1) {
            setTransform((prev) => ({
              ...prev,
              translateX: lastPanRef.current.x + gesture.dx,
              translateY: lastPanRef.current.y + gesture.dy,
            }));
          }
        },
        onPanResponderRelease: (evt: GestureResponderEvent) => {
          initialTouchDistRef.current = null;
          // Si el movimiento fue mínimo (< 10px), se considera un toque / clic en el mapa
          if (touchMovementRef.current < 10) {
            const { locationX, locationY } = evt.nativeEvent;
            const { width, height } = containerSizeRef.current;

            // Transforma coordenadas de pantalla a espacio viewBox del SVG
            const scaleX = vw / width;
            const scaleY = vh / height;
            const svgX = ((locationX - width / 2 - transform.translateX) / transform.scale) * scaleX + (vx + vw / 2);
            const svgY = ((locationY - height / 2 - transform.translateY) / transform.scale) * scaleY + (vy + vh / 2);

            if (isPlacingUser) {
              // Modo "Estoy aquí": Desproyecta a plano 2D y ubica el nodo de pasillo más cercano
              const planePt = unproject(svgX, svgY, 0, DEFAULT_ISO);
              const nearest = findNearestNode(mallData, floorId, planePt, ['corridor', 'entrance']);
              if (nearest && onUserNodeChange) {
                onUserNodeChange(nearest.id);
              }
              if (onFinishPlacingUser) {
                onFinishPlacingUser();
              }
            }
          }
        },
      }),
    [transform, vw, vh, vx, vy, isPlacingUser, floorId, onUserNodeChange, onFinishPlacingUser, mallData]
  );

  // Renderizador SVG de elementos del motor
  const renderItem = (it: SceneItem, index: number) => {
    switch (it.kind) {
      case 'polygon': {
        const pointsStr = it.points.map((p) => `${p.x},${p.y}`).join(' ');
        return (
          <Polygon
            key={`poly-${index}`}
            points={pointsStr}
            fill={it.fill}
            stroke={it.stroke}
            strokeWidth={it.strokeWidth}
            strokeLinejoin="round"
            opacity={it.opacity ?? 1}
            onPress={
              it.storeId && onSelectStore && !isPlacingUser
                ? () => onSelectStore(it.storeId!)
                : undefined
            }
          />
        );
      }
      case 'polyline': {
        const pointsStr = it.points.map((p) => `${p.x},${p.y}`).join(' ');
        return (
          <Polyline
            key={`line-${index}`}
            points={pointsStr}
            fill="none"
            stroke={it.stroke}
            strokeWidth={it.strokeWidth}
            strokeDasharray={it.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={it.opacity ?? 1}
          />
        );
      }
      case 'circle': {
        return (
          <Circle
            key={`circle-${index}`}
            cx={it.x}
            cy={it.y}
            r={it.r}
            fill={it.fill}
            stroke={it.stroke}
            strokeWidth={it.strokeWidth ?? 1}
            opacity={it.opacity ?? 1}
          />
        );
      }
      case 'ellipse': {
        return (
          <Ellipse
            key={`ellipse-${index}`}
            cx={it.x}
            cy={it.y}
            rx={it.rx}
            ry={it.ry}
            fill={it.fill}
            opacity={it.opacity ?? 1}
          />
        );
      }
      case 'text': {
        return (
          <SvgText
            key={`text-${index}`}
            x={it.x}
            y={it.y}
            textAnchor="middle"
            fontSize={it.size}
            fontWeight={String(it.weight)}
            fill={it.fill}
            stroke={it.halo}
            strokeWidth={it.halo ? 3 : 0}
            strokeLinejoin="round"
            onPress={
              it.storeId && onSelectStore && !isPlacingUser
                ? () => onSelectStore(it.storeId!)
                : undefined
            }
          >
            {it.text}
          </SvgText>
        );
      }
      case 'badge': {
        const half = it.size / 2;
        return (
          <G key={`badge-${index}`} x={it.x} y={it.y}>
            <Rect
              x={-half}
              y={-half}
              width={it.size}
              height={it.size}
              rx={it.size * 0.28}
              fill={it.fill}
              stroke="#FFFFFF"
              strokeWidth={1.5}
            />
            <SvgText
              y={it.size * 0.22}
              textAnchor="middle"
              fontSize={it.size * 0.6}
              fontWeight="bold"
              fill="#FFFFFF"
            >
              {it.glyph === 'info' ? 'i' : it.glyph === 'wc' ? 'WC' : '$'}
            </SvgText>
          </G>
        );
      }
      case 'pin': {
        return (
          <G key={`pin-${index}`} x={it.x} y={it.y}>
            <Path
              d="M0 22C-14 6-12-12 0-12C12-12 14 6 0 22Z"
              fill={it.fill}
              stroke="#FFFFFF"
              strokeWidth={2}
            />
            <Circle cx={0} cy={-1} r={4.5} fill="#FFFFFF" />
          </G>
        );
      }
      default:
        return null;
    }
  };


  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        containerSizeRef.current = {
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        };
      }}
      {...panResponder.panHandlers}
    >
      <Svg
        viewBox={`${vx} ${vy} ${vw} ${vh}`}
        width="100%"
        height="100%"
        style={styles.svg}
      >
        <Rect x={vx} y={vy} width={vw} height={vh} fill="#F8FAFC" />

        {/* Grupo con soporte de Pan & Zoom transform */}
        <G
          transform={`translate(${transform.translateX}, ${transform.translateY}) scale(${transform.scale})`}
          origin={`${vx + vw / 2}, ${vy + vh / 2}`}
        >
          {/* Capas del mapa de @mallos/map-engine */}
          {scene.items.map((it, idx) => renderItem(it, idx))}

          {/* Avatar del usuario con baliza interactiva de alta visibilidad */}
          <G key="user-location-beacon">
            {/* Halo exterior azul */}
            <Circle
              cx={userIsoPos.x}
              cy={userIsoPos.y}
              r={14}
              fill="#3B82F6"
              opacity={0.22}
            />
            {/* Núcleo de baliza de navegación */}
            <Circle
              cx={userIsoPos.x}
              cy={userIsoPos.y}
              r={7}
              fill="#2563EB"
              stroke="#FFFFFF"
              strokeWidth={2.5}
            />
            {/* Indicador de avatar 'Tú' */}
            <G transform={`translate(${userIsoPos.x} ${userIsoPos.y - 14})`}>
              <Rect
                x={-16}
                y={-10}
                width={32}
                height={16}
                rx={8}
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
              <SvgText
                y={2}
                textAnchor="middle"
                fontSize={9}
                fontWeight="bold"
                fill="#FFFFFF"
              >
                Tú
              </SvgText>
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  svg: {
    flex: 1,
  },
});
