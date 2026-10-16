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
import { audioManager } from '../../src/lib/audio-manager';
import {
  IsometricMap,
  type IsometricMapHandle,
  isStoreOpenAt,
} from '../../src/features/map/IsometricMap';
import {
  FlatMapCanvas,
  type FlatMapCanvasHandle,
} from '../../src/features/map/FlatMapCanvas';
import { StorefrontHUD } from '../../src/features/map/StorefrontHUD';
import { VerticalFloorSelector } from '../../src/features/map/VerticalFloorSelector';
import { NavigationHUD } from '../../src/features/map/NavigationHUD';
import { DestinationBar } from '../../src/features/map/DestinationBar';
import { MapSearchBar, SEARCH_CATEGORIES } from '../../src/features/map/MapSearchBar';
import { MapOffersCarousel } from '../../src/features/map/MapOffersCarousel';
import { GlassSurface } from '../../src/components/GlassSurface';
import { AppIcon } from '../../src/components/AppIcon';
import { MallOsSpriteIcon } from '../../src/components/MallOsSpriteIcon';
import { MallOsLogo } from '../../src/components/MallOsLogo';
import { useAccessibleMode } from '../../src/features/accessible/useAccessibleMode';
import { useWalkSimulation } from '../../src/features/map/useWalkSimulation';
import { useKidsMode } from '../../src/features/kids-mode/useKidsMode';
import { KidsArrivalCard } from '../../src/features/kids-mode/KidsArrivalCard';
import { notifyStoreArrival } from '../../src/features/concierge/useConcierge';
import { track } from '../../src/lib/analytics';


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
  const flatMapRef = useRef<FlatMapCanvasHandle | null>(null);
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 24);

  // Parámetros de navegación externa (ej. Modo Niño)
  const params = useLocalSearchParams<{
    storeId?: string;
    originStoreId?: string;
    kidsMode?: string;
    playerName?: string;
    communityContact?: string;
    contactRelation?: string;
    t?: string;
  }>();
  const kids = useKidsMode();
  const isKidsMode = (Array.isArray(params.kidsMode) ? params.kidsMode[0] : params.kidsMode) === 'true';
  const lastHandledTokenRef = useRef<string | null>(null);
  const { isAccessibleMode, toggleAccessibleMode } = useAccessibleMode();

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
  const [hasArrived, setHasArrived] = useState<boolean>(false);
  const [showKidsArrival, setShowKidsArrival] = useState<boolean>(false);
  const [kidsAudioPhase, setKidsAudioPhase] = useState<'idle' | 'intro' | 'arrival' | 'done'>('idle');
  const [activeRoute, setActiveRoute] = useState<RouteResult | null>(null);
  const [userStartNodeId, setUserStartNodeId] = useState<string>('node-plaza Jardin');
  const currentUserNodeIdRef = useRef<string>('node-plaza Jardin');
  const arrivalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const storeFromMall = sambilMall.stores.find(
      (s) => s.id === selectedStoreId || s.slug === selectedStoreId || s.aliases?.includes(selectedStoreId)
    );
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
      const rawName = storeFromMall.name || '';
      const isLegible = !rawName.toLowerCase().includes('no legible') && rawName.trim().length > 0;
      const cleanName = isLegible ? rawName : (pilotStore?.name || `Local ${storeFromMall.id.toUpperCase()}`);

      return {
        id: storeFromMall.id,
        name: cleanName,
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
      const calculatedRoute = findRouteToStore(sambilMall, userStartNodeId, selectedStoreId, {
        accessibleOnly: isAccessibleMode,
      });
      setActiveRoute(calculatedRoute);
      if (calculatedRoute) {
        track('map_route_calculated', {
          toStoreId: selectedStoreId,
          storeName: selectedStore?.name,
          isAccessible: isAccessibleMode,
          distanceMeters: Math.round(calculatedRoute.distanceMeters),
        });
      }
    } else {
      setActiveRoute(null);
    }
  }, [isNavigating, selectedStoreId, userStartNodeId, isAccessibleMode, selectedStore?.name]);

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

      // Fijar nodo de llegada de forma síncrona para futuras rutas sin destruir la ruta actual
      if (activeRoute && activeRoute.nodeIds.length > 0) {
        const lastNode = activeRoute.nodeIds[activeRoute.nodeIds.length - 1];
        currentUserNodeIdRef.current = lastNode;
      }

      // Si estamos en Modo Niño, abrir KidsArrivalCard con locución especial de misión
      if (isKidsMode) {
        setShowStorefrontHUD(false);
        setShowKidsArrival(true);
        setKidsAudioPhase('arrival');
        const arrivalStoreName = selectedStore?.name || 'la tienda';
        audioManager.speak({
          text: `¡Llegaste a ${arrivalStoreName}! Busca el producto físico con el código QR para desbloquear el acertijo.`,
          priority: 'critical',
          language: 'es-VE',
          pitch: 1.05,
          rate: 0.95,
          onDone: () => setKidsAudioPhase('done'),
          onError: () => setKidsAudioPhase('done'),
        });
        track('map_arrival', { storeId: selectedStoreId, storeName: arrivalStoreName, mode: 'kids' });
      } else {
        setShowKidsArrival(false);
        setHasArrived(true);
        // Permitir que el usuario aprecie la llegada a la puerta con el badge de destino alcanzado
        if (arrivalTimerRef.current) {
          clearTimeout(arrivalTimerRef.current);
        }
        arrivalTimerRef.current = setTimeout(() => {
          setShowStorefrontHUD(true);
        }, 850);
        if (selectedStoreId) {
          notifyStoreArrival(selectedStoreId, selectedStore?.name);
          track('map_arrival', { storeId: selectedStoreId, storeName: selectedStore?.name, mode: 'standard' });
        }
      }
    },
  });

  // Generación de plan de navegación paso a paso
  const navigationPlan = useMemo(() => {
    if (!activeRoute) return null;
    return generateNavigationPlan(sambilMall, activeRoute, selectedStoreId ?? undefined, {
      accessibleOnly: isAccessibleMode,
    });
  }, [activeRoute, selectedStoreId, isAccessibleMode]);

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

  // Mantener la línea de recorrido visible durante toda la navegación (incluso al llegar a destino hasta que se cierre)
  const isArrivalReached = hasArrived || (!walk.isWalking && (walk.walkProgress >= 0.95 || walk.arrivalMessage !== null));
  const effectiveRouteNodeIds = !isNavigating ? undefined : activeRoute?.nodeIds;

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
      offers: activeCategory === 'offers' ? DEMO_SAMBIL_OFFERS : undefined,
      accessibleOnly: isAccessibleMode,
    });
  }, [selectedLevel, isNavigating, selectedStoreId, highlightedStoreIds, effectiveRouteNodeIds, walk.position, walk.heading, walk.trail, activeCategory, isAccessibleMode]);

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
    const store = sambilMall.stores.find((s) => s.id === storeId || s.slug === storeId || s.aliases?.includes(storeId));
    const targetFloorId = store?.floorId ?? selectedLevel;
    const canonicalStoreId = store ? store.id : storeId;

    // Calcular el nodo origen exacto
    let originNodeId = currentUserNodeIdRef.current;

    // Si se especifica una tienda de origen previa (ej. estación anterior del Modo Niño)
    if (customOriginStoreId) {
      const originStore = sambilMall.stores.find((s) => s.id === customOriginStoreId || s.slug === customOriginStoreId || s.aliases?.includes(customOriginStoreId));
      if (originStore?.doorNodeId) {
        originNodeId = originStore.doorNodeId;
        if (originStore.floorId !== selectedLevel) {
          setSelectedLevel(originStore.floorId);
        }
      }
    } else if (walk.position) {
      // Buscar nodo origen en el piso ACTUAL del usuario (selectedLevel),
      // no en targetFloorId, permitiendo que la ruta inter-piso trace el camino correcto al ascensor/escalera
      const nearest = findNearestNode(sambilMall, selectedLevel, walk.position);
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
    const nextRoute = findRouteToStore(sambilMall, originNodeId, canonicalStoreId, {
      accessibleOnly: isAccessibleMode,
    });
    setActiveRoute(nextRoute);

    walk.stopWalk();
    walk.resetWalk();
    setHasArrived(false);
    setSelectedStoreId(canonicalStoreId);
    setIsNavigating(true);
    setShowStorefrontHUD(false);
    setShowKidsArrival(false);
    mapRef.current?.focusOnStore(canonicalStoreId);
  }, [selectedLevel, walk, isAccessibleMode]);

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

    const resolvedStore = sambilMall.stores.find(
      (s) => s.id === rawStoreId || s.slug === rawStoreId || s.aliases?.includes(rawStoreId)
    );
    const targetStoreId = resolvedStore ? resolvedStore.id : rawStoreId;

    // 1. Trazar ruta hacia la tienda directamente respetando la tienda de partida previa
    handleSelectStore(targetStoreId, rawOriginStoreId || undefined);

    // 2. Si viene de Modo Niño, reproducir la bienvenida motivacional de aventura con prioridad
    if (isKids) {
      setKidsAudioPhase('intro');
      setShowKidsArrival(false);
      const stationNumber = activeKidsRiddle?.number ?? 1;
      const targetStore = sambilMall.stores.find((s) => s.id === rawStoreId || s.slug === rawStoreId || s.aliases?.includes(rawStoreId));
      const targetStoreName = targetStore?.name || activeKidsRiddle?.storeName || 'tu destino';
      const adventureGreeting = stationNumber === 1
        ? `¡Estamos listos para empezar esta gran aventura! ¿Estás listo, ${targetPlayerName}? Sigue la ruta en el mapa hacia ${targetStoreName}.`
        : `¡Vamos por la estación número ${stationNumber}, ${targetPlayerName}! Sigue la ruta en el mapa hacia ${targetStoreName}.`;

      audioManager.speak({
        text: adventureGreeting,
        priority: 'high',
        language: 'es-VE',
        pitch: 1.05,
        rate: 0.95,
        delayMs: 320, // Colchón de inicialización para Android al cambiar de pantalla
        onDone: () => setKidsAudioPhase('idle'),
        onError: () => setKidsAudioPhase('idle'),
      });
    } else {
      const rawContactName = Array.isArray(params.communityContact) ? params.communityContact[0] : params.communityContact;
      if (rawContactName) {
        audioManager.speak({
          text: `Trazando ruta para encontrarte con ${rawContactName}.`,
          priority: 'high',
          language: 'es-VE',
          pitch: 1.0,
          rate: 0.95,
          delayMs: 300,
        });
      }
    }
  }, [params.storeId, params.originStoreId, params.kidsMode, params.playerName, params.communityContact, params.contactRelation, params.t, handleSelectStore, kids.playerName, activeKidsRiddle?.number, activeKidsRiddle?.storeName]);

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
    if (activeRoute && activeRoute.nodeIds.length > 0 && hasArrived) {
      const lastNode = activeRoute.nodeIds[activeRoute.nodeIds.length - 1];
      setUserStartNodeId(lastNode);
    }
    walk.stopWalk();
    walk.resetWalk();
    setHasArrived(false);
    setIsNavigating(false);
    setShowStorefrontHUD(false);
    setShowKidsArrival(false);
    setActiveRoute(null);
  }, [walk, activeRoute, hasArrived]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Renderizado de Mapa según el modo activo */}
      <View style={StyleSheet.absoluteFillObject}>
        {mapMode === 'guide' ? (
          <FlatMapCanvas
            ref={flatMapRef}
            scene={flatScene}
            floorId={selectedLevel}
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
            isNavigating={isNavigating}
            walkProgress={walk.walkProgress}
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
              voiceEnabled={voiceEnabled && kidsAudioPhase === 'idle'}
              isWalking={walk.isWalking}
              onVoiceToggle={() => setVoiceEnabled((v) => !v)}
              onCancel={handleExitNavigation}
            />
          </View>
        ) : !showStorefrontHUD && !showKidsArrival ? (
          <View style={styles.exploreHeaderContainer}>
            <View style={styles.exploreHeader}>
              <View style={styles.brandBadge}>
                <View style={styles.brandRowContainer}>
                  <View style={styles.brandLogoBox}>
                    <MallOsLogo size={20} />
                  </View>
                  <View style={styles.brandTextColumn}>
                    <Text style={styles.brandTitle}>MALL OS</Text>
                    <Text style={styles.brandSubtitle}>
                      {openFloorCount} de {currentFloorStores.length} locales · {timeFormatted}
                    </Text>
                  </View>
                </View>
                {isAccessibleMode && (
                  <View style={styles.accessibleBadge}>
                    <MallOsSpriteIcon name="accesible" size={11} showCircle={false} color="#0284C7" />
                    <Text style={styles.accessibleBadgeText}>Modo Accesible</Text>
                  </View>
                )}
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
                    <View style={styles.modeSwitchInner}>
                      <AppIcon name="navigate" size={12} color={mapMode === 'guide' ? '#FFFFFF' : '#64748B'} />
                      <Text
                        style={[
                          styles.modeSwitchText,
                          mapMode === 'guide' && styles.modeSwitchTextActive,
                        ]}
                      >
                        2D
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modeSwitchBtn,
                      mapMode === 'explore' && styles.modeSwitchBtnActive,
                    ]}
                    onPress={() => setMapMode('explore')}
                    activeOpacity={0.8}
                  >
                    <View style={styles.modeSwitchInner}>
                      <AppIcon name="layers" size={12} color={mapMode === 'explore' ? '#FFFFFF' : '#64748B'} />
                      <Text
                        style={[
                          styles.modeSwitchText,
                          mapMode === 'explore' && styles.modeSwitchTextActive,
                        ]}
                      >
                        2.5D
                      </Text>
                    </View>
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

      {/* Controles Cilíndricos Verticales del Lado Derecho (Zoom In, Zoom Out, GPS) */}
      {!showStorefrontHUD && !showKidsArrival && (
        <View style={[styles.rightFloatingControls, isNavigating && { bottom: 155 }]}>
          {/* Botones de Zoom In / Zoom Out Cilíndricos */}
          <View style={styles.cyberControlPill}>
            <TouchableOpacity
              style={styles.cyberZoomBtn}
              onPress={() => {
                if (mapMode === 'guide') {
                  flatMapRef.current?.zoomIn();
                } else {
                  mapRef.current?.zoomIn();
                }
              }}
              activeOpacity={0.75}
            >
              <AppIcon name="add" size={18} color="#1E293B" strokeWidth={2.5} />
            </TouchableOpacity>

            <View style={styles.cyberDivider} />

            <TouchableOpacity
              style={styles.cyberZoomBtn}
              onPress={() => {
                if (mapMode === 'guide') {
                  flatMapRef.current?.zoomOut();
                } else {
                  mapRef.current?.zoomOut();
                }
              }}
              activeOpacity={0.75}
            >
              <AppIcon name="remove" size={18} color="#1E293B" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* Botón Recentrado / GPS */}
          <TouchableOpacity
            style={[
              styles.cyberGpsBtn,
              followUser && styles.cyberGpsBtnActive,
            ]}
            onPress={() => {
              setFollowUser(true);
              if (mapMode === 'guide') {
                flatMapRef.current?.recenterOnUser();
              } else {
                mapRef.current?.recenterOnUser();
              }
            }}
            activeOpacity={0.8}
          >
            <AppIcon
              name="navigate"
              size={18}
              color={followUser ? '#E11D48' : '#64748B'}
              strokeWidth={2.2}
            />
          </TouchableOpacity>

          {/* Botón Modo Accesible Global */}
          <TouchableOpacity
            style={[
              styles.cyberGpsBtn,
              isAccessibleMode && styles.cyberAccessibleBtnActive,
            ]}
            onPress={() => {
              try {
                Vibration.vibrate(40);
              } catch {}
              const nextVal = toggleAccessibleMode();
              track('map_accessible_mode_toggled', { enabled: nextVal });
              audioManager.speak({
                text: nextVal
                  ? 'Modo accesible activado. Rutas por ascensores panorámicos y rampas.'
                  : 'Modo accesible desactivado.',
                priority: 'low',
                language: 'es-VE',
                pitch: 1.0,
                rate: 1.0,
              });
            }}
            activeOpacity={0.8}
            accessibilityLabel="Alternar Modo Accesible"
          >
            <MallOsSpriteIcon
              name="accesible"
              size={18}
              showCircle={false}
              color={isAccessibleMode ? '#FFFFFF' : '#0284C7'}
            />
          </TouchableOpacity>
        </View>
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
          store={sambilMall.stores.find((s) => s.id === selectedStoreId) ?? (selectedStore as any)}
          offers={DEMO_SAMBIL_OFFERS}
          floorName={selectedStore.floorName}
          onClose={() => setShowStorefrontHUD(false)}
          onNavigateToStore={(id) => {
            setShowStorefrontHUD(false);
            handleSelectStore(id);
            walk.startWalk();
          }}
          onOpenStoreDetail={(id) => {
            router.push(`/local/${id}`);
          }}
          isArrived={isArrivalReached}
        />
      )}

      {/* Bottom "Ofertas Flash (EN VIVO)" Carousel cuando no se navega */}
      {!isNavigating && !showStorefrontHUD && !showKidsArrival && !selectedStore && (
        <View style={styles.offersCarouselWrapper}>
          <MapOffersCarousel
            onSelectOffer={(storeId) => {
              handleSelectStore(storeId);
            }}
          />
        </View>
      )}

      {/* Explore Mode Bottom Store Preview Pill (cuando se selecciona un local) */}
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
                <AppIcon name="storefront" size={18} color="#F43F5E" />
              </View>
              <View style={styles.explorePillInfo}>
                <Text style={styles.explorePillTitle}>{selectedStore.name}</Text>
                <Text style={styles.explorePillSub}>
                  {selectedStore.floorName} · Toca para ver vitrina y trazar ruta
                </Text>
              </View>
              <AppIcon name="chevron-forward" size={18} color="#F43F5E" strokeWidth={2.5} />
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  brandRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogoBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  brandTextColumn: {
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#2563EB', // Azul Cobalto
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  topRightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 3,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  modeSwitchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modeSwitchBtnActive: {
    backgroundColor: '#2563EB',
  },
  modeSwitchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modeSwitchText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
  },
  modeSwitchTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  verticalFloorWrapperNav: {
    position: 'absolute',
    right: 14,
    zIndex: 35,
  },
  rightFloatingControls: {
    position: 'absolute',
    right: 14,
    bottom: 120,
    alignItems: 'center',
    gap: 12,
    zIndex: 40,
  },
  cyberControlPill: {
    width: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cyberFloorBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cyberFloorBtnActive: {
    backgroundColor: '#FFE4E6',
  },
  cyberFloorText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#64748B',
  },
  cyberFloorTextActive: {
    color: '#E11D48',
    fontWeight: '900',
  },
  cyberZoomBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cyberDivider: {
    width: 28,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  cyberGpsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cyberGpsBtnActive: {
    borderColor: '#E11D48',
    backgroundColor: '#FFF1F2',
    shadowColor: '#E11D48',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  cyberAccessibleBtnActive: {
    borderColor: '#0284C7',
    backgroundColor: '#0284C7',
    shadowColor: '#0284C7',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  accessibleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(2, 132, 199, 0.25)',
  },
  accessibleBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0284C7',
  },

  offersCarouselWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    zIndex: 35,
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
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
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
