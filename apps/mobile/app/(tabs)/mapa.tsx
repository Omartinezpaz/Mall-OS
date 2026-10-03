import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  IsometricMap,
  type IsometricMapHandle,
} from '../../src/features/map/IsometricMap';
import { StorefrontHUD } from '../../src/features/map/StorefrontHUD';
import { MapHeader, type LevelItem } from '../../src/features/map/MapHeader';
import { WalkControlCard } from '../../src/features/map/WalkControlCard';
import { useWalkSimulation } from '../../src/features/map/useWalkSimulation';
import { useMallTime } from '../../src/features/map/useMallTime';
import { PILOT_STORES } from '../../src/features/directory';
import {
  sambilMall,
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_DIVERSION,
  type RouteResult,
} from '@mallos/map-engine';

const LEVELS: LevelItem[] = [
  { id: LEVEL_AUTOPISTA, label: 'L1 · Autopista', name: 'Nivel Autopista · Nivel 1' },
  { id: LEVEL_ACUARIO, label: 'L2 · Acuario', name: 'Nivel Acuario · Nivel 2' },
  { id: LEVEL_LIBERTADOR, label: 'L3 · Libertador', name: 'Nivel Libertador · Nivel 3' },
  { id: LEVEL_DIVERSION, label: 'L4 · Diversión', name: 'Nivel Diversión / Terrazas · Nivel 4' },
];

export default function MapaScreen() {
  const mapRef = useRef<IsometricMapHandle | null>(null);

  // Estados interactivos
  const [selectedLevel, setSelectedLevel] = useState(LEVEL_AUTOPISTA);
  const [selectedStoreId, setSelectedStoreId] = useState<string>('tijerazo');
  const [followUser, setFollowUser] = useState<boolean>(false);
  const [isPlacingUser, setIsPlacingUser] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(true);
  const [showStorefrontHUD, setShowStorefrontHUD] = useState<boolean>(true);
  const [activeRoute, setActiveRoute] = useState<RouteResult | null>(null);

  // Hook de tiempo simulado/real
  const {
    currentHour,
    setCurrentHour,
    isSimulatingTime,
    setIsSimulatingTime,
    openCount,
    totalStores,
    resetToRealTime,
  } = useMallTime(sambilMall);

  // Tienda seleccionada
  const selectedStore = useMemo(() => {
    const storeFromMall = sambilMall.stores.find((s) => s.id === selectedStoreId);
    const pilotStore = PILOT_STORES.find(
      (s) => s.id === selectedStoreId || s.slug === selectedStoreId
    );

    if (storeFromMall) {
      return {
        id: storeFromMall.id,
        name: storeFromMall.name,
        category: storeFromMall.category,
        unit: `Local ${storeFromMall.id.toUpperCase()}`,
        floor: storeFromMall.floorId === LEVEL_AUTOPISTA ? 1 : storeFromMall.floorId === LEVEL_ACUARIO ? 2 : storeFromMall.floorId === LEVEL_LIBERTADOR ? 3 : 4,
      };
    }

    if (pilotStore) {
      return {
        id: pilotStore.id,
        name: pilotStore.name,
        category: pilotStore.category,
        unit: pilotStore.unit,
        floor: pilotStore.floor,
      };
    }

    return {
      id: 'tijerazo',
      name: 'Tiendas Tijerazo',
      category: 'fashion',
      unit: 'Local AC-01',
      floor: 1,
    };
  }, [selectedStoreId]);

  // Hook de Simulación de Caminata Waypoint
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
    routeWaypoints,
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Viewport del Mapa Isométrico 2.5D Fullscreen */}
      <View style={StyleSheet.absoluteFillObject}>
        <IsometricMap
          mapRef={mapRef}
          selectedStoreId={selectedStoreId}
          destinationStoreId={isNavigating ? selectedStoreId : undefined}
          onSelectStore={(id) => {
            setSelectedStoreId(id);
            setIsNavigating(true);
            setShowStorefrontHUD(true);
            mapRef.current?.focusOnStore(id);
          }}
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

      {/* Top Header Flotante con selector de pisos, horas y modo de cámara */}
      <MapHeader
        levels={LEVELS}
        selectedLevel={selectedLevel}
        onSelectLevel={(lvl) => setSelectedLevel(lvl)}
        currentHour={currentHour}
        openCount={openCount}
        totalStores={totalStores}
        isSimulatingTime={isSimulatingTime}
        onToggleTimeSimulation={() => setIsSimulatingTime(!isSimulatingTime)}
        onSelectHour={(h) => setCurrentHour(h)}
        onResetRealTime={resetToRealTime}
        followUser={followUser}
        onToggleFollowUser={() => {
          const nextFollow = !followUser;
          setFollowUser(nextFollow);
          if (nextFollow) {
            mapRef.current?.recenterOnUser();
          }
        }}
      />

      {/* Tarjeta Flotante: Control de Simulación de Recorrido */}
      {isNavigating && (
        <WalkControlCard
          isWalking={isWalking}
          walkSpeed={walkSpeed}
          walkProgress={walkProgress}
          activeRoute={activeRoute}
          hasWaypoints={routeWaypoints.length >= 2}
          onStartWalk={startWalk}
          onStopWalk={stopWalk}
          onToggleSpeed={() => setWalkSpeed((s) => (s === 1 ? 2 : 1))}
          onSimulateStep={simulateStep}
        />
      )}

      {/* Banner de Modo "Estoy Aquí" */}
      {isPlacingUser && (
        <View style={styles.placementBanner}>
          <Text style={styles.placementIcon}>📍</Text>
          <Text style={styles.placementText}>
            Toca el pasillo en el mapa para marcar tu posición.
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

      {/* Controles flotantes laterales de Zoom y Ubicación */}
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
          style={styles.controlBtn}
          onPress={() => mapRef.current?.resetView()}
          activeOpacity={0.7}
        >
          <Text style={styles.controlIcon}>⟲</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlBtn, isPlacingUser && styles.controlBtnActive]}
          onPress={() => setIsPlacingUser(!isPlacingUser)}
          activeOpacity={0.7}
        >
          <Text style={styles.controlIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Bottom Sheet: Vitrina Digital HUD o Quick Pill Plegado */}
      {showStorefrontHUD ? (
        <StorefrontHUD
          storeId={selectedStoreId}
          currentHour={currentHour}
          onClose={() => setShowStorefrontHUD(false)}
          onStartNavigation={() => {
            setIsNavigating(true);
            startWalk();
          }}
          isNavigating={isNavigating}
        />
      ) : (
        <View style={styles.collapsedPillWrapper}>
          <TouchableOpacity
            style={styles.collapsedPill}
            onPress={() => setShowStorefrontHUD(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.collapsedPillIcon}>🛍️</Text>
            <Text style={styles.collapsedPillText}>
              Ver vitrina de <Text style={{ fontWeight: '800' }}>{selectedStore.name}</Text>
            </Text>
            <Text style={styles.collapsedPillArrow}>▲</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  placementBanner: {
    position: 'absolute',
    top: 156,
    left: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 8,
    zIndex: 35,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  placementIcon: {
    fontSize: 14,
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
    paddingVertical: 4,
    borderRadius: 8,
  },
  cancelPlacementText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  arrivalToast: {
    position: 'absolute',
    top: 160,
    alignSelf: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    zIndex: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  arrivalToastIcon: {
    fontSize: 14,
  },
  arrivalToastText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  mapControls: {
    position: 'absolute',
    right: 12,
    top: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  controlBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  controlBtnActive: {
    backgroundColor: '#EEF2FF',
  },
  controlText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  controlIcon: {
    fontSize: 14,
  },
  collapsedPillWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 40,
  },
  collapsedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    gap: 10,
  },
  collapsedPillIcon: {
    fontSize: 16,
  },
  collapsedPillText: {
    flex: 1,
    color: '#0F172A',
    fontSize: 12,
  },
  collapsedPillArrow: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '800',
  },
});
