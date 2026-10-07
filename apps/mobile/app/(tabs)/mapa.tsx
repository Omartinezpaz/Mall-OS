import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { useWalkSimulation } from '../../src/features/map/useWalkSimulation';
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
  generateNavigationPlan,
  buildFlatScene,
  DEMO_SAMBIL_OFFERS,
  type RouteResult,
  type MapStore,
} from '@mallos/map-engine';
import { categoryPalette } from '@mallos/design-tokens';

export default function MapaScreen() {
  const mapRef = useRef<IsometricMapHandle | null>(null);
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 24);

  // Estados interactivos
  const [mapMode, setMapMode] = useState<'guide' | 'explore'>('guide');
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVEL_AUTOPISTA);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('local_4');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [guideOrientationMode, setGuideOrientationMode] = useState<'north-up' | 'heading-up'>('north-up');
  const [cameraMode, setCameraMode] = useState<'ground' | 'isometric' | 'aerial'>('ground');
  const [followUser, setFollowUser] = useState<boolean>(true);
  const [isNavigating, setIsNavigating] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [showStorefrontHUD, setShowStorefrontHUD] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<RouteResult | null>(null);
  const [userStartNodeId, setUserStartNodeId] = useState<string>('node-plaza Jardin');

  // Hook de tiempo simulado/real
  const {
    currentHour,
    openCount,
    totalStores,
  } = useMallTime(sambilMall);

  // Nodos del piso actual
  const currentFloorNodes = useMemo(() => {
    return sambilMall.nodes.filter((n) => n.floorId === selectedLevel);
  }, [selectedLevel]);

  // Tienda seleccionada y metadatos
  const selectedStore = useMemo(() => {
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

    return {
      id: 'local_4',
      name: 'Tiendas Tijerazo',
      category: 'fashion',
      unit: 'Local AC-01',
      floor: 1,
      floorName: 'Nivel Autopista',
      floorId: LEVEL_AUTOPISTA,
    };
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
      setShowStorefrontHUD(true);
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
    return generateNavigationPlan(sambilMall, activeRoute, selectedStoreId);
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
  const isArrivalReached = !walk.isWalking && (walk.walkProgress >= 0.98 || walk.arrivalMessage !== null);
  const effectiveRouteNodeIds = isArrivalReached ? undefined : activeRoute?.nodeIds;

  // Escena plana 2D optimizada (Modo Guía)
  const flatScene = useMemo(() => {
    return buildFlatScene(sambilMall, {
      floorId: selectedLevel,
      palette: categoryPalette,
      selectedStoreId: isNavigating ? selectedStoreId : undefined,
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

  // Manejar selección de tienda desde mapa o búsqueda
  const handleSelectStore = useCallback((storeId: string) => {
    const store = sambilMall.stores.find((s) => s.id === storeId);
    if (store && store.floorId !== selectedLevel) {
      setSelectedLevel(store.floorId);
    }
    setSelectedStoreId(storeId);
    setIsNavigating(true);
    setShowStorefrontHUD(false);
    mapRef.current?.focusOnStore(storeId);
  }, [selectedLevel]);

  // Salir del modo navegación
  const handleExitNavigation = useCallback(() => {
    walk.stopWalk();
    setIsNavigating(false);
    setShowStorefrontHUD(false);
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
            selectedStoreId={selectedStoreId}
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
            selectedStoreId={selectedStoreId}
            destinationStoreId={isNavigating ? selectedStoreId : undefined}
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
        {isNavigating && navigationPlan ? (
          <View style={styles.topHUDContainer}>
            <NavigationHUD
              plan={navigationPlan}
              currentStepIndex={stepProgress.currentStepIndex}
              progress={stepProgress.progress}
              voiceEnabled={voiceEnabled}
              onVoiceToggle={() => setVoiceEnabled((v) => !v)}
              onCancel={handleExitNavigation}
            />
          </View>
        ) : (
          <View style={styles.exploreHeaderContainer}>
            <View style={styles.exploreHeader}>
              <View style={styles.brandBadge}>
                <Text style={styles.brandTitle}>SAMBIL CHACAO</Text>
                <Text style={styles.brandSubtitle}>
                  {openCount}/{totalStores} tiendas abiertas · {currentHour}:00
                </Text>
              </View>

              {/* Selector de Modo Guía 2D vs Explorar 2.5D */}
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
                    🧭 Guía 2D
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

            {/* Barra flotante de búsqueda y categorías */}
            <MapSearchBar
              stores={sambilMall.stores}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              onSelectStore={handleSelectStore}
              currentFloorId={selectedLevel}
            />
          </View>
        )}
      </View>

      {/* Selector vertical de pisos (Derecha) */}
      <View style={[styles.verticalFloorWrapper, { top: topSafe + 120 }]}>
        <VerticalFloorSelector
          selectedFloorId={selectedLevel}
          onSelectFloor={(lvl) => {
            setSelectedLevel(lvl);
          }}
          destinationFloorId={isNavigating ? selectedStore.floorId : undefined}
          userFloorId={selectedLevel}
        />
      </View>

      {/* Controles de Vista de Mapa (Modo Switcher / Zoom / Perspectiva) */}
      {!isNavigating && !showStorefrontHUD && (
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={[styles.controlBtn, mapMode === 'guide' && styles.controlBtnActive]}
            onPress={() => setMapMode((m) => (m === 'guide' ? 'explore' : 'guide'))}
            activeOpacity={0.7}
          >
            <Text style={styles.controlIcon}>{mapMode === 'guide' ? '🗺️' : '📐'}</Text>
          </TouchableOpacity>

          {mapMode === 'explore' && (
            <>
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={() => mapRef.current?.zoomIn()}
                activeOpacity={0.7}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={() => mapRef.current?.zoomOut()}
                activeOpacity={0.7}
              >
                <Text style={styles.controlText}>−</Text>
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
                <Text style={styles.controlIcon}>
                  {cameraMode === 'ground' ? '👁️' : cameraMode === 'isometric' ? '📐' : '🗺️'}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={[styles.controlBtn, followUser && styles.controlBtnActive]}
            onPress={() => {
              const next = !followUser;
              setFollowUser(next);
              if (next && mapMode === 'explore') {
                mapRef.current?.recenterOnUser();
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.controlIcon, followUser && styles.controlIconActive]}>🎯</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast flotante de Notificación de Llegada */}
      {walk.arrivalMessage && (
        <View style={styles.arrivalToast}>
          <Text style={styles.arrivalToastIcon}>🎉</Text>
          <Text style={styles.arrivalToastText}>{walk.arrivalMessage}</Text>
        </View>
      )}

      {/* Bottom Floating Bar / Barra de Navegación y Simulación */}
      {isNavigating && !showStorefrontHUD && (
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
            onOpenStorefront={() => setShowStorefrontHUD(true)}
            onExitRoute={handleExitNavigation}
          />
        </View>
      )}

      {/* Bottom Sheet Vitrina Digital completa */}
      {showStorefrontHUD && (
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
      {!isNavigating && !showStorefrontHUD && (
        <View style={styles.exploreBottomPillWrapper}>
          <TouchableOpacity
            style={styles.exploreBottomPill}
            onPress={() => {
              setIsNavigating(true);
              setShowStorefrontHUD(true);
            }}
            activeOpacity={0.88}
          >
            <View style={styles.explorePillIconBox}>
              <Text style={styles.explorePillIcon}>🏬</Text>
            </View>
            <View style={styles.explorePillInfo}>
              <Text style={styles.explorePillTitle}>{selectedStore.name}</Text>
              <Text style={styles.explorePillSub}>
                {selectedStore.floorName} · Toca para ver vitrina y trazar ruta
              </Text>
            </View>
            <Text style={styles.explorePillArrow}>➔</Text>
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
  verticalFloorWrapper: {
    position: 'absolute',
    right: 12,
    top: 175,
    zIndex: 35,
  },
  mapControls: {
    position: 'absolute',
    left: 12,
    bottom: 120,
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
    top: 130,
    alignSelf: 'center',
    backgroundColor: '#10B981',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 50,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  arrivalToastIcon: {
    fontSize: 16,
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
