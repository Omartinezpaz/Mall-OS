import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  IsometricMap,
  type IsometricMapHandle,
} from '../../src/features/map/IsometricMap';
import { StorefrontHUD } from '../../src/features/map/StorefrontHUD';
import { VerticalFloorSelector } from '../../src/features/map/VerticalFloorSelector';
import { NavigationHUD } from '../../src/features/map/NavigationHUD';
import { DestinationBar } from '../../src/features/map/DestinationBar';
import { useWalkSimulation } from '../../src/features/map/useWalkSimulation';
import { useMallTime } from '../../src/features/map/useMallTime';
import { PILOT_STORES } from '../../src/features/directory';
import {
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
  generateNavigationPlan,
  type RouteResult,
} from '@mallos/map-engine';

export default function MapaScreen() {
  const mapRef = useRef<IsometricMapHandle | null>(null);

  // Estados interactivos
  const [selectedLevel, setSelectedLevel] = useState<string>(LEVEL_AUTOPISTA);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('tijerazo');
  const [followUser, setFollowUser] = useState<boolean>(true);
  const [isPlacingUser, setIsPlacingUser] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(true);
  const [showStorefrontHUD, setShowStorefrontHUD] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<RouteResult | null>(null);

  // Hook de tiempo simulado/real
  const {
    currentHour,
    openCount,
    totalStores,
  } = useMallTime(sambilMall);

  // Tienda seleccionada y metadatos
  const selectedStore = useMemo(() => {
    const storeFromMall = sambilMall.stores.find((s) => s.id === selectedStoreId);
    const pilotStore = PILOT_STORES.find(
      (s) => s.id === selectedStoreId || s.slug === selectedStoreId
    );

    let floorNum = 1;
    let floorName = 'Nivel Autopista';
    const floorId = storeFromMall?.floorId ?? (pilotStore?.floor === 2 ? LEVEL_ACUARIO : pilotStore?.floor === 3 ? LEVEL_LIBERTADOR : pilotStore?.floor === 4 ? LEVEL_FERIA : pilotStore?.floor === 5 ? LEVEL_DIVERSION : LEVEL_AUTOPISTA);

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
      id: 'tijerazo',
      name: 'Tiendas Tijerazo',
      category: 'fashion',
      unit: 'Local AC-01',
      floor: 1,
      floorName: 'Nivel Autopista',
      floorId: LEVEL_AUTOPISTA,
    };
  }, [selectedStoreId]);

  // Hook de Simulación de Caminata Waypoint con rumbo visual
  const {
    isWalking,
    walkSpeed,
    setWalkSpeed,
    walkProgress,
    arrivalMessage,
    userPlaneCoords,
    setUserPlaneCoords,
    userHeadingAngle,
    userNodeId,
    setUserNodeId,
    startWalk,
    stopWalk,
    simulateStep,
  } = useWalkSimulation({
    activeRoute,
    targetStoreName: selectedStore.name,
    onArrival: () => {
      setShowStorefrontHUD(true);
    },
    onFollowUserChange: (follow) => {
      setFollowUser(follow);
    },
  });

  // Generación de plan de navegación paso a paso
  const navigationPlan = useMemo(() => {
    if (!activeRoute) return null;
    return generateNavigationPlan(sambilMall, activeRoute, selectedStoreId);
  }, [activeRoute, selectedStoreId]);

  // Cálculo del paso actual según progreso y posición de nodo
  const currentStepIndex = useMemo(() => {
    if (!navigationPlan || !navigationPlan.steps.length) return 0;
    const foundIndex = navigationPlan.steps.findIndex((s) => s.targetNodeId === userNodeId);
    if (foundIndex >= 0) return foundIndex;
    const idx = Math.min(
      Math.floor((walkProgress / 100) * navigationPlan.steps.length),
      navigationPlan.steps.length - 1
    );
    return Math.max(0, idx);
  }, [navigationPlan, userNodeId, walkProgress]);

  const currentStep = navigationPlan?.steps[currentStepIndex];
  const userFloorId = useMemo(() => {
    const node = sambilMall.nodes.find((n) => n.id === userNodeId);
    return node?.floorId ?? selectedLevel;
  }, [userNodeId, selectedLevel]);

  // Manejar selección de tienda desde mapa o búsqueda
  const handleSelectStore = useCallback((storeId: string) => {
    setSelectedStoreId(storeId);
    setIsNavigating(true);
    setShowStorefrontHUD(false);
    mapRef.current?.focusOnStore(storeId);
  }, []);

  // Salir del modo navegación a modo exploración libre
  const handleExitNavigation = useCallback(() => {
    stopWalk();
    setIsNavigating(false);
    setShowStorefrontHUD(false);
    setActiveRoute(null);
  }, [stopWalk]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Viewport del Mapa Isométrico 2.5D Fullscreen Edge-to-Edge */}
      <View style={StyleSheet.absoluteFillObject}>
        <IsometricMap
          mapRef={mapRef}
          selectedStoreId={selectedStoreId}
          destinationStoreId={isNavigating ? selectedStoreId : undefined}
          onSelectStore={handleSelectStore}
          floorId={selectedLevel}
          userNodeId={userNodeId}
          userPlaneCoords={userPlaneCoords}
          userHeadingAngle={userHeadingAngle}
          onUserNodeChange={(nodeId) => {
            setUserNodeId(nodeId);
            const n = sambilMall.nodes.find((node) => node.id === nodeId);
            if (n) {
              setUserPlaneCoords({ x: n.x, y: n.y });
            }
          }}
          isPlacingUser={isPlacingUser}
          onFinishPlacingUser={() => setIsPlacingUser(false)}
          currentHour={currentHour}
          onRouteChange={(route) => setActiveRoute(route)}
          followUser={followUser}
        />
      </View>

      {/* Top Floating Area */}
      <SafeAreaView style={styles.topSafeArea} pointerEvents="box-none">
        {isNavigating ? (
          <View style={styles.topHUDContainer}>
            <NavigationHUD
              currentStep={currentStep}
              totalDistanceMeters={navigationPlan?.totalDistanceMeters ?? Math.round(activeRoute?.distanceMeters ?? 0)}
              walkingMinutes={navigationPlan?.walkingMinutes ?? activeRoute?.walkingMinutes ?? 1}
              destinationName={selectedStore.name}
              stepIndex={currentStepIndex + 1}
              totalSteps={navigationPlan?.steps.length ?? 1}
              onExitNavigation={handleExitNavigation}
            />
          </View>
        ) : (
          <View style={styles.exploreHeader}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandTitle}>SAMBIL CHACAO</Text>
              <Text style={styles.brandSubtitle}>
                {openCount}/{totalStores} tiendas abiertas · {currentHour}:00
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>

      {/* Selector vertical de pisos (Derecha) */}
      <View style={styles.verticalFloorWrapper}>
        <VerticalFloorSelector
          selectedFloorId={selectedLevel}
          onSelectFloor={(lvl) => {
            setSelectedLevel(lvl);
          }}
          destinationFloorId={isNavigating ? selectedStore.floorId : undefined}
          userFloorId={userFloorId}
        />
      </View>

      {/* Controles de Vista de Mapa (Zoom + Seguir + Marcar Posición) */}
      <View style={styles.mapControls}>
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
          style={[styles.controlBtn, followUser && styles.controlBtnActive]}
          onPress={() => {
            const next = !followUser;
            setFollowUser(next);
            if (next) {
              mapRef.current?.recenterOnUser();
            }
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.controlIcon, followUser && styles.controlIconActive]}>🎯</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlBtn, isPlacingUser && styles.controlBtnActive]}
          onPress={() => setIsPlacingUser(!isPlacingUser)}
          activeOpacity={0.7}
        >
          <Text style={styles.controlIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Banner flotante de Modo "Estoy Aquí" */}
      {isPlacingUser && (
        <View style={styles.placementBanner}>
          <Text style={styles.placementIcon}>📍</Text>
          <Text style={styles.placementText}>
            Toca cualquier punto del pasillo para fijar tu ubicación.
          </Text>
          <TouchableOpacity
            style={styles.cancelPlacementBtn}
            onPress={() => setIsPlacingUser(false)}
          >
            <Text style={styles.cancelPlacementText}>Listo</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast flotante de Notificación de Llegada */}
      {arrivalMessage && (
        <View style={styles.arrivalToast}>
          <Text style={styles.arrivalToastIcon}>🎉</Text>
          <Text style={styles.arrivalToastText}>{arrivalMessage}</Text>
        </View>
      )}

      {/* Bottom Floating Bar / Vitrina */}
      {isNavigating && !showStorefrontHUD && (
        <View style={styles.bottomBarContainer}>
          <DestinationBar
            storeName={selectedStore.name}
            floorLabel={`${selectedStore.floorName} · ${selectedStore.unit}`}
            distanceMeters={navigationPlan?.totalDistanceMeters ?? Math.round(activeRoute?.distanceMeters ?? 0)}
            walkingMinutes={navigationPlan?.walkingMinutes ?? activeRoute?.walkingMinutes ?? 1}
            isWalking={isWalking}
            walkSpeed={walkSpeed}
            onToggleWalk={() => {
              if (isWalking) {
                stopWalk();
              } else {
                startWalk();
              }
            }}
            onToggleSpeed={() => setWalkSpeed((s) => (s === 1 ? 2 : 1))}
            onSimulateStep={simulateStep}
            onOpenStorefront={() => setShowStorefrontHUD(true)}
            onExitRoute={handleExitNavigation}
          />
        </View>
      )}

      {/* Bottom Sheet Vitrina Digital completa */}
      {showStorefrontHUD && (
        <StorefrontHUD
          storeId={selectedStoreId}
          currentHour={currentHour}
          onClose={() => setShowStorefrontHUD(false)}
          onStartNavigation={() => {
            setShowStorefrontHUD(false);
            setIsNavigating(true);
            startWalk();
          }}
          isNavigating={isNavigating}
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
    paddingTop: 10,
  },
  exploreHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  brandBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.7)',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  brandTitle: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  verticalFloorWrapper: {
    position: 'absolute',
    right: 12,
    top: 140,
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.5)',
  },
  controlBtnActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
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
  placementBanner: {
    position: 'absolute',
    top: 130,
    left: 16,
    right: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 8,
    zIndex: 45,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  placementIcon: {
    fontSize: 15,
  },
  placementText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cancelPlacementBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  cancelPlacementText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
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
