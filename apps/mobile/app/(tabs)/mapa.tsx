import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import {
  IsometricMap,
  type IsometricMapHandle,
  isStoreOpenAt,
} from '../../src/features/map/IsometricMap';
import { FlatMapCanvas } from '../../src/features/map/FlatMapCanvas';
import { StorefrontHUD } from '../../src/features/map/StorefrontHUD';
import { VerticalFloorSelector } from '../../src/features/map/VerticalFloorSelector';
import { NavigationHUD } from '../../src/features/map/NavigationHUD';
import { DestinationBar } from '../../src/features/map/DestinationBar';
import { MapSearchBar, SEARCH_CATEGORIES } from '../../src/features/map/MapSearchBar';
import { GlassSurface } from '../../src/components/GlassSurface';
import { AppIcon } from '../../src/components/AppIcon';
import { useWalkSimulation } from '../../src/features/map/useWalkSimulation';
import { useKidsMode } from '../../src/features/kids-mode/useKidsMode';
import { KidsArrivalCard } from '../../src/features/kids-mode/KidsArrivalCard';


import { useStepProgress } from '../../src/features/map/useStepProgress';
import { useMallTime } from '../../src/features/map/useMallTime';
import { PILOT_STORES } from '../../src/features/directory';
import {
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
  findRouteToStore,
  findNearestNode,
  generateNavigationPlan,
  buildFlatScene,
  DEMO_SAMBIL_OFFERS,
  type RouteResult,
  type MapStore,
} from '@mallos/map-engine';
import { categoryPalette } from '@mallos/design-tokens';

export default function MapaScreen() {
  const router = useRouter();
  const mapRef = useRef<IsometricMapHandle | null>(null);
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 24);

  // Parámetros de navegación externa (ej. Modo Niño)
  const params = useLocalSearchParams<{
    storeId?: string;
    originStoreId?: string;
    kidsMode?: string;
    playerName?: string;
    t?: string;
  }>();
  const kids = useKidsMode();
  const isKidsMode = (Array.isArray(params.kidsMode) ? params.kidsMode[0] : params.kidsMode) === 'true';
  const lastHandledTokenRef = useRef<string | null>(null);

  // Estados interactivos
  const [mapMode, setMapMode] = useState<'guide' | 'explore'>('guide');
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVEL_AUTOPISTA);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [guideOrientationMode, setGuideOrientationMode] = useState<'north-up' | 'heading-up'>('north-up');
  const [cameraMode, setCameraMode] = useState<'ground' | 'isometric' | 'aerial'>('ground');
  const [followUser, setFollowUser] = useState<boolean>(true);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [showStorefrontHUD, setShowStorefrontHUD] = useState<boolean>(false);
  const [showKidsArrival, setShowKidsArrival] = useState<boolean>(false);
  const [kidsAudioPhase, setKidsAudioPhase] = useState<'idle' | 'intro' | 'arrival' | 'done'>('idle');
  const [activeRoute, setActiveRoute] = useState<RouteResult | null>(null);
  const [userStartNodeId, setUserStartNodeId] = useState<string>('node-plaza Jardin');
  const currentUserNodeIdRef = useRef<string>('node-plaza Jardin');

  // Acertijo activo de Modo Niño según la tienda seleccionada
  const activeKidsRiddle = useMemo(() => {
    if (!kids.ageGroup) return undefined;
    const found = kids.riddles.find((r) => r.storeId === selectedStoreId);
    return found || kids.currentRiddle;
  }, [kids.ageGroup, kids.riddles, kids.currentRiddle, selectedStoreId]);

  // Hook de tiempo simulado/real
  const {
    currentHour,
    timeFormatted,
    openCount,
    totalStores,
  } = useMallTime(sambilMall);

  // Nodos del piso actual
  const currentFloorNodes = useMemo(() => {
    return sambilMall.nodes.filter((n) => n.floorId === selectedLevel);
  }, [selectedLevel]);

  // Tienda seleccionada y metadatos
  const selectedStore = useMemo(() => {
    if (!selectedStoreId) return null;
    const storeFromMall = sambilMall.stores.find((s) => s.id === selectedStoreId);
    const pilotStore = PILOT_STORES.find(
      (s) => s.id === selectedStoreId || s.slug === selectedStoreId
    );

    let floorNum = 1;
    let floorName = 'Nivel Autopista';
    const floorId =
      storeFromMall?.floorId ??
      (pilotStore?.floor === 2
        ? LEVEL_ACUARIO
        : pilotStore?.floor === 3
        ? LEVEL_LIBERTADOR
        : pilotStore?.floor === 4
        ? LEVEL_FERIA
        : pilotStore?.floor === 5
        ? LEVEL_DIVERSION
        : LEVEL_AUTOPISTA);

    if (floorId === LEVEL_ACUARIO) {
      floorNum = 2;
      floorName = 'Nivel Acuario';
    } else if (floorId === LEVEL_LIBERTADOR) {
      floorNum = 3;
      floorName = 'Nivel Libertador';
    } else if (floorId === LEVEL_FERIA) {
      floorNum = 4;
      floorName = 'Nivel Feria';
    } else if (floorId === LEVEL_DIVERSION) {
      floorNum = 5;
      floorName = 'Nivel Diversión';
    }

    if (storeFromMall) {
      return {
        id: storeFromMall.id,
        name: storeFromMall.name,
        category: storeFromMall.category,
        unit: `Local ${storeFromMall.id.toUpperCase()}`,
        floor: floorNum,
        floorName,
        floorId,
      };
    }

    if (pilotStore) {
      return {
        id: pilotStore.id,
        name: pilotStore.name,
        category: pilotStore.category,
        unit: pilotStore.unit,
        floor: pilotStore.floor,
        floorName,
        floorId,
      };
    }

    return null;
  }, [selectedStoreId]);

  // Cálculo de ruta Dijkstra hacia la tienda seleccionada
  useEffect(() => {
    if (isNavigating && selectedStoreId) {
      const calculatedRoute = findRouteToStore(sambilMall, userStartNodeId, selectedStoreId);
      setActiveRoute(calculatedRoute);
    } else {
      setActiveRoute(null);
    }
  }, [isNavigating, selectedStoreId, userStartNodeId]);

  // Hook de simulación de caminata con trail, heading y controles
  const walk = useWalkSimulation({
    mallData: sambilMall,
    activeRoute,
    targetStoreName: selectedStore?.name,
    speedMps: 1.2,
    speedMultiplier: 2,
    trailMeters: 15,
    trailSampleMeters: 0.5,
    onArrival: () => {
      // Vibración nativa háptica de llegada (patrón [espera, vibra, espera, vibra])
      try {
        Vibration.vibrate([0, 100, 50, 100]);
      } catch {}

      // Fijar nodo de llegada de forma síncrona
      if (activeRoute && activeRoute.nodeIds.length > 0) {
        const lastNode = activeRoute.nodeIds[activeRoute.nodeIds.length - 1];
        currentUserNodeIdRef.current = lastNode;
        setUserStartNodeId(lastNode);
      }

      // Si estamos en Modo Niño, abrir KidsArrivalCard con locución especial de misión
      if (isKidsMode) {
        setShowStorefrontHUD(false);
        setShowKidsArrival(true);
        setKidsAudioPhase('arrival');
        const arrivalStoreName = selectedStore?.name || 'la tienda';
        Speech.stop();
        Speech.speak(`¡Llegaste a ${arrivalStoreName}! Busca el producto físico con el código QR para desbloquear el acertijo.`, {
          language: 'es-VE',
          pitch: 1.05,
          rate: 0.95,
          onDone: () => setKidsAudioPhase('done'),
          onError: () => setKidsAudioPhase('done'),
        });
      } else {
        setShowKidsArrival(false);
        setShowStorefrontHUD(false);
        setTimeout(() => {
          setShowStorefrontHUD(true);
        }, 2000);
      }
    },
  });

  // Al comenzar a caminar, orientar automáticamente hacia la marcha del avatar (Google Maps style)
  useEffect(() => {
    if (walk.isWalking) {
      setGuideOrientationMode('heading-up');
    }
  }, [walk.isWalking]);

  // Generación de plan de navegación paso a paso
  const navigationPlan = useMemo(() => {
    if (!activeRoute) return null;
    return generateNavigationPlan(sambilMall, activeRoute, selectedStoreId ?? undefined);
  }, [activeRoute, selectedStoreId]);

  // Seguimiento de paso actual y porcentaje con useStepProgress
  const stepProgress = useStepProgress(navigationPlan, walk.position, currentFloorNodes);

  // Tiendas destacadas por filtro de categoría activa
  const highlightedStoreIds = useMemo(() => {
    if (!activeCategory) return undefined;
    const catItem = SEARCH_CATEGORIES.find((c) => c.id === activeCategory);
    if (!catItem || catItem.categoryKeys.length === 0) return undefined;
    return sambilMall.stores
      .filter((s) => catItem.categoryKeys.includes(s.category))
      .map((s) => s.id);
  }, [activeCategory]);

  // Limpiar la línea de recorrido una vez que se llega al destino
  const isArrivalReached = !walk.isWalking && (walk.walkProgress >= 0.98 || walk.arrivalMessage !== null || showStorefrontHUD);
  const effectiveRouteNodeIds = (isArrivalReached || !isNavigating) ? undefined : activeRoute?.nodeIds;

  // Escena plana 2D optimizada (Modo Guía)
  const flatScene = useMemo(() => {
    return buildFlatScene(sambilMall, {
      floorId: selectedLevel,
      palette: categoryPalette,
      selectedStoreId: isNavigating && selectedStoreId ? selectedStoreId : undefined,
      highlightedStoreIds,
      routeNodeIds: effectiveRouteNodeIds,
      userPosition: walk.position,
      userHeading: walk.heading,
      userTrail: walk.trail,
      zoom: 1,
      labels: 'auto',
      offers: DEMO_SAMBIL_OFFERS,
    });
  }, [selectedLevel, isNavigating, selectedStoreId, highlightedStoreIds, effectiveRouteNodeIds, walk.position, walk.heading, walk.trail]);

  // Conteo de tiendas del piso seleccionado y horarios
  const currentFloorStores = useMemo(() => {
    return sambilMall.stores.filter((s) => s.floorId === selectedLevel);
  }, [selectedLevel]);

  const openFloorCount = useMemo(() => {
    return currentFloorStores.filter((s) => isStoreOpenAt(s.id, currentHour, s.slug)).length;
  }, [currentFloorStores, currentHour]);

  // Manejar selección de tienda desde mapa o búsqueda
  const handleSelectStore = useCallback((storeId: string, customOriginStoreId?: string) => {
    setActiveCategory(null);
    const store = sambilMall.stores.find((s) => s.id === storeId || s.slug === storeId);
    const targetFloorId = store?.floorId ?? selectedLevel;

    // Calcular el nodo origen exacto
    let originNodeId = currentUserNodeIdRef.current;

    // Si se especifica una tienda de origen previa (ej. estación anterior del Modo Niño)
    if (customOriginStoreId) {
      const originStore = sambilMall.stores.find((s) => s.id === customOriginStoreId || s.slug === customOriginStoreId);
      if (originStore?.doorNodeId) {
        originNodeId = originStore.doorNodeId;
        if (originStore.floorId !== selectedLevel) {
          setSelectedLevel(originStore.floorId);
        }
      }
    } else if (walk.position) {
      const nearest = findNearestNode(sambilMall, targetFloorId, walk.position);
      if (nearest) {
        originNodeId = nearest.id;
      }
    }

    if (store && !customOriginStoreId && store.floorId !== selectedLevel) {
      setSelectedLevel(store.floorId);
    }

    currentUserNodeIdRef.current = originNodeId;
    setUserStartNodeId(originNodeId);

    // Calcular la ruta inmediatamente para evitar lag de estado
    const nextRoute = findRouteToStore(sambilMall, originNodeId, storeId);
    setActiveRoute(nextRoute);

    walk.stopWalk();
    walk.resetWalk();
    setSelectedStoreId(storeId);
    setIsNavigating(true);
    setShowStorefrontHUD(false);
    setShowKidsArrival(false);
    mapRef.current?.focusOnStore(storeId);
  }, [selectedLevel, walk]);

  // Auto-selección y enrutamiento cuando se navega con parámetros (ej. Modo Niño)
  useEffect(() => {
    if (!params.storeId) return;

    const rawStoreId = Array.isArray(params.storeId) ? params.storeId[0] : params.storeId;
    if (!rawStoreId) return;

    const rawOriginStoreId = Array.isArray(params.originStoreId) ? params.originStoreId[0] : params.originStoreId;
    const rawKidsMode = Array.isArray(params.kidsMode) ? params.kidsMode[0] : params.kidsMode;
    const isKids = rawKidsMode === 'true';
    const rawPlayerName = Array.isArray(params.playerName) ? params.playerName[0] : params.playerName;
    const targetPlayerName = rawPlayerName || kids.playerName || 'Explorador';
    const timeToken = Array.isArray(params.t) ? params.t[0] : (params.t ?? '');

    const currentToken = `${rawStoreId}_${rawOriginStoreId ?? ''}_${timeToken}_${isKids}`;
    if (lastHandledTokenRef.current === currentToken) return;
    lastHandledTokenRef.current = currentToken;

    // 1. Trazar ruta hacia la tienda directamente respetando la tienda de partida previa
    handleSelectStore(rawStoreId, rawOriginStoreId || undefined);

    // 2. Si viene de Modo Niño, reproducir la bienvenida motivacional de aventura con prioridad
    if (isKids) {
      setKidsAudioPhase('intro');
      setShowKidsArrival(false);
      const stationNumber = activeKidsRiddle?.number ?? 1;
      const targetStore = sambilMall.stores.find((s) => s.id === rawStoreId || s.slug === rawStoreId);
      const targetStoreName = targetStore?.name || activeKidsRiddle?.storeName || 'tu destino';
      const adventureGreeting = stationNumber === 1
        ? `¡Estamos listos para empezar esta gran aventura! ¿Estás listo, ${targetPlayerName}? Sigue la ruta en el mapa hacia ${targetStoreName}.`
        : `¡Vamos por la estación número ${stationNumber}, ${targetPlayerName}! Sigue la ruta en el mapa hacia ${targetStoreName}.`;

      Speech.stop();
      Speech.speak(adventureGreeting, {
        language: 'es-VE',
        pitch: 1.05,
        rate: 0.95,
        onDone: () => setKidsAudioPhase('idle'),
        onError: () => setKidsAudioPhase('idle'),
      });
    }
  }, [params.storeId, params.originStoreId, params.kidsMode, params.playerName, params.t, handleSelectStore, kids.playerName, activeKidsRiddle?.number, activeKidsRiddle?.storeName]);

  // Manejar filtro por categoría
  const handleSelectCategory = useCallback((categoryId: string | null) => {
    setActiveCategory(categoryId);
    if (categoryId !== null) {
      setSelectedStoreId(null);
      setActiveRoute(null);
      setIsNavigating(false);
      setShowStorefrontHUD(false);
      setShowKidsArrival(false);
      walk.stopWalk();
      walk.resetWalk();
    }
  }, [walk]);

  // Salir del modo navegación
  const handleExitNavigation = useCallback(() => {
    walk.stopWalk();
    walk.resetWalk();
    setIsNavigating(false);
    setShowStorefrontHUD(false);
    setShowKidsArrival(false);
    setActiveRoute(null);
  }, [walk]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090D16" />

      {/* Renderizado de Mapa según el modo activo */}
      <View style={StyleSheet.absoluteFillObject}>
        {mapMode === 'guide' ? (
          <FlatMapCanvas
            scene={flatScene}
            userPosition={walk.position}
            userHeading={walk.heading}
            userTrail={walk.trail}
            selectedStoreId={selectedStoreId ?? undefined}
            onStorePress={handleSelectStore}
            cameraMode={guideOrientationMode}
            onToggleCameraMode={() =>
              setGuideOrientationMode((prev) => (prev === 'north-up' ? 'heading-up' : 'north-up'))
            }
            showCompass={true}
            followUser={followUser}
          />
        ) : (
          <IsometricMap
            mapRef={mapRef}
            selectedStoreId={selectedStoreId ?? undefined}
            destinationStoreId={isNavigating && selectedStoreId ? selectedStoreId : undefined}
            onSelectStore={handleSelectStore}
            floorId={selectedLevel}
            userNodeId={userStartNodeId}
            userPlaneCoords={walk.position}
            userHeadingAngle={
              walk.heading !== undefined ? (walk.heading * 180) / Math.PI : undefined
            }
            userTrail={walk.trail}
            onUserNodeChange={(nodeId) => {
              setUserStartNodeId(nodeId);
            }}
            currentHour={currentHour}
            cameraMode={cameraMode}
            onRouteChange={(route) => setActiveRoute(route)}
            followUser={followUser}
          />
        )}
      </View>

      {/* Top Floating Area */}
      <View
        style={[
          styles.topSafeArea,
          { paddingTop: topSafe + 4 },
        ]}
        pointerEvents="box-none"
      >
        {isNavigating && !showStorefrontHUD && !showKidsArrival && navigationPlan ? (
          <View style={styles.topHUDContainer}>
            <NavigationHUD
              plan={navigationPlan}
              currentStepIndex={stepProgress.currentStepIndex}
              progress={stepProgress.progress}
              voiceEnabled={voiceEnabled && kidsAudioPhase === 'idle' && walk.isWalking}
              isWalking={walk.isWalking}
              onVoiceToggle={() => setVoiceEnabled((v) => !v)}
              onCancel={handleExitNavigation}
            />
          </View>
        ) : !showStorefrontHUD && !showKidsArrival ? (
          <View style={styles.exploreHeaderContainer}>
            <View style={styles.exploreHeader}>
              <View style={styles.brandBadge}>
                <Text style={styles.brandTitle}>MALL DEMO</Text>
                <Text style={styles.brandSubtitle}>
                  {openFloorCount} de {currentFloorStores.length} locales · {timeFormatted}
                </Text>
              </View>

              {/* Selector de Piso y Selector de Modo Guía 2D vs Explorar 2.5D */}
              <View style={styles.topRightControls}>
                <VerticalFloorSelector
                  selectedFloorId={selectedLevel}
                  onSelectFloor={(lvl) => {
                    setSelectedLevel(lvl);
                  }}
                  destinationFloorId={isNavigating && selectedStore ? selectedStore.floorId : undefined}
                  userFloorId={selectedLevel}
                />
                <View style={styles.modeSwitchContainer}>
                  <TouchableOpacity
                    style={[
                      styles.modeSwitchBtn,
                      mapMode === 'guide' && styles.modeSwitchBtnActive,
                    ]}
                    onPress={() => setMapMode('guide')}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.modeSwitchText,
                        mapMode === 'guide' && styles.modeSwitchTextActive,
                      ]}
                    >
                      🧭 2D
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modeSwitchBtn,
                      mapMode === 'explore' && styles.modeSwitchBtnActive,
                    ]}
                    onPress={() => setMapMode('explore')}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.modeSwitchText,
                        mapMode === 'explore' && styles.modeSwitchTextActive,
                      ]}
                    >
                      📐 2.5D
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Barra flotante de búsqueda y categorías */}
            <MapSearchBar
              stores={sambilMall.stores}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              onSelectStore={handleSelectStore}
              currentFloorId={selectedLevel}
            />
          </View>
        ) : null}
      </View>

      {/* Floating Floor Selector solo en modo navegación activa */}
      {isNavigating && !showStorefrontHUD && selectedStore && (
        <View
          style={[
            styles.verticalFloorWrapperNav,
            { top: topSafe + 84 },
          ]}
        >
          <VerticalFloorSelector
            selectedFloorId={selectedLevel}
            onSelectFloor={(lvl) => {
              setSelectedLevel(lvl);
            }}
            destinationFloorId={selectedStore.floorId}
            userFloorId={selectedLevel}
          />
        </View>
      )}

      {/* Controles de Vista de Mapa (Modo Switcher / Zoom / Perspectiva) */}
      {!isNavigating && !showStorefrontHUD && (
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={[styles.controlBtn, mapMode === 'guide' && styles.controlBtnActive]}
            onPress={() => setMapMode((m) => (m === 'guide' ? 'explore' : 'guide'))}
            activeOpacity={0.7}
          >
            <AppIcon
              name={mapMode === 'guide' ? 'map' : 'cube'}
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {mapMode === 'explore' && (
            <>
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={() => mapRef.current?.zoomIn()}
                activeOpacity={0.7}
              >
                <AppIcon name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={() => mapRef.current?.zoomOut()}
                activeOpacity={0.7}
              >
                <AppIcon name="remove" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={() => {
                  setCameraMode((prev) =>
                    prev === 'ground' ? 'isometric' : prev === 'isometric' ? 'aerial' : 'ground'
                  );
                }}
                activeOpacity={0.7}
              >
                <AppIcon
                  name={cameraMode === 'ground' ? 'eye' : cameraMode === 'isometric' ? 'cube' : 'map'}
                  size={16}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Botón Flotante de Recentrado / GPS (Bottom Right - Clean Marketplace) */}
      {!showStorefrontHUD && (
        <TouchableOpacity
          style={[
            styles.recenterFab,
            { bottom: isNavigating ? 96 : 30 },
            followUser && styles.recenterFabActive,
          ]}
          onPress={() => {
            setFollowUser(true);
            if (mapMode === 'explore') {
              mapRef.current?.recenterOnUser();
            }
          }}
          activeOpacity={0.8}
        >
          <AppIcon
            name="navigate"
            size={18}
            color={followUser ? '#38BDF8' : '#FFFFFF'}
          />
        </TouchableOpacity>
      )}

      {/* Toast flotante de Notificación de Llegada */}
      {walk.arrivalMessage && !showStorefrontHUD && (
        <View
          style={[
            styles.arrivalToast,
            { bottom: isNavigating ? 110 : 35 },
          ]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={styles.arrivalToastContent}
            onPress={walk.clearArrivalMessage}
            activeOpacity={0.85}
          >
            <AppIcon name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text style={styles.arrivalToastText}>{walk.arrivalMessage}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Floating Bar / Barra de Navegación y Simulación */}
      {isNavigating && !showStorefrontHUD && !showKidsArrival && selectedStore && (
        <View style={styles.bottomBarContainer}>
          <DestinationBar
            storeName={selectedStore.name}
            floorLabel={`${selectedStore.floorName} · ${selectedStore.unit}`}
            distanceMeters={
              navigationPlan?.totalDistanceMeters ??
              Math.round(activeRoute?.distanceMeters ?? 0)
            }
            walkingMinutes={
              navigationPlan?.walkingMinutes ??
              activeRoute?.walkingMinutes ??
              1
            }
            isWalking={walk.isWalking}
            walkSpeed={walk.speedMultiplier}
            onToggleWalk={() => {
              if (walk.isWalking) {
                walk.stopWalk();
              } else {
                walk.startWalk();
              }
            }}
            onToggleSpeed={() => {
              walk.setSpeedMultiplier(
                walk.speedMultiplier === 1
                  ? 2
                  : walk.speedMultiplier === 2
                  ? 4
                  : walk.speedMultiplier === 4
                  ? 8
                  : walk.speedMultiplier === 8
                  ? 16
                  : 1
              );
            }}
            onResetWalk={() => walk.resetWalk()}
            onForceArrival={isKidsMode ? () => walk.forceArrival() : undefined}
            onOpenStorefront={() => setShowStorefrontHUD(true)}
            onExitRoute={handleExitNavigation}
          />
        </View>
      )}

      {/* Overlay de Llegada a Tienda en Modo Niño (Misión QR) */}
      {showKidsArrival && activeKidsRiddle && (
        <KidsArrivalCard
          riddle={activeKidsRiddle}
          playerName={kids.playerName}
          isListening={kidsAudioPhase === 'arrival'}
          onOpenScanner={() => {
            setShowKidsArrival(false);
            handleExitNavigation();
            router.push({
              pathname: '/kids-mode',
              params: {
                view: 'scanner',
                storeId: selectedStoreId ?? activeKidsRiddle.storeId,
                t: String(Date.now()),
              },
            });
          }}
          onReturnToTreasureMap={() => {
            setShowKidsArrival(false);
            handleExitNavigation();
            router.push({
              pathname: '/kids-mode',
            });
          }}
        />
      )}

      {/* Bottom Sheet Vitrina Digital completa */}
      {showStorefrontHUD && !showKidsArrival && selectedStore && (
        <StorefrontHUD
          store={sambilMall.stores.find((s) => s.id === selectedStoreId) ?? null}
          offers={DEMO_SAMBIL_OFFERS}
          floorName={selectedStore.floorName}
          onClose={() => setShowStorefrontHUD(false)}
          onNavigateToStore={(id) => {
            setShowStorefrontHUD(false);
            handleSelectStore(id);
            walk.startWalk();
          }}
        />
      )}

      {/* Explore Mode Bottom Store Preview Pill */}
      {!isNavigating && !showStorefrontHUD && !showKidsArrival && selectedStore && (
        <View style={styles.exploreBottomPillWrapper}>
          <TouchableOpacity
            onPress={() => {
              setIsNavigating(true);
              setShowStorefrontHUD(true);
            }}
            activeOpacity={0.88}
          >
            <GlassSurface
              variant="dark"
              intensity="strong"
              radius="xl"
              style={styles.exploreBottomPill}
            >
              <View style={styles.explorePillIconBox}>
                <AppIcon name="storefront" size={18} color="#818CF8" />
              </View>
              <View style={styles.explorePillInfo}>
                <Text style={styles.explorePillTitle}>{selectedStore.name}</Text>
                <Text style={styles.explorePillSub}>
                  {selectedStore.floorName} · Toca para ver vitrina y trazar ruta
                </Text>
              </View>
              <AppIcon name="chevron-forward" size={18} color="#38BDF8" strokeWidth={2.5} />
            </GlassSurface>

          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
    position: 'relative',
  },
  topSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
  },
  topHUDContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  exploreHeaderContainer: {
    paddingTop: 4,
  },
  exploreHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  brandTitle: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  topRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 14,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.7)',
  },
  modeSwitchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  modeSwitchBtnActive: {
    backgroundColor: '#2563EB',
  },
  modeSwitchText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
  },
  modeSwitchTextActive: {
    color: '#FFFFFF',
  },
  verticalFloorWrapperNav: {
    position: 'absolute',
    right: 14,
    zIndex: 35,
  },
  recenterFab: {
    position: 'absolute',
    right: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 35,
  },
  recenterFabActive: {
    backgroundColor: '#0F172A',
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  mapControls: {
    position: 'absolute',
    left: 12,
    bottom: 30,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.8)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 30,
  },
  controlBtn: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.5)',
  },
  controlBtnActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.35)',
  },
  controlText: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
  },
  controlIcon: {
    fontSize: 16,
  },
  controlIconActive: {
    fontSize: 18,
  },
  arrivalToast: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 50,
  },
  arrivalToastContent: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  arrivalToastIcon: {
    fontSize: 15,
  },
  arrivalToastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    zIndex: 40,
  },
  exploreBottomPillWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 14,
    right: 14,
    zIndex: 40,
  },
  exploreBottomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    gap: 12,
  },
  explorePillIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  explorePillIcon: {
    fontSize: 18,
  },
  explorePillInfo: {
    flex: 1,
  },
  explorePillTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  explorePillSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  explorePillArrow: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '900',
  },
});
