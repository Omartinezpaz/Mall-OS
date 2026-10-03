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

  // Hook de Simulación de Caminata Waypoint a 1.2 m/s
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

      {/* Top Header Modular con selector de pisos, horas y modo de cámara */}
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

      {/* Banner de Ayuda si está en Modo "Estoy Aquí" */}
      {isPlacingUser && (
        <View style={styles.placementBanner}>
          <Text style={styles.placementIcon}>📍</Text>
          <Text style={styles.placementText}>
            Toca cualquier punto del pasillo en el mapa para marcar tu posición inicial.
          </Text>
          <TouchableOpacity
            style={styles.cancelPlacementBtn}
            onPress={() => setIsPlacingUser(false)}
          >
            <Text style={styles.cancelPlacementText}>Cancelar</Text>
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

      {/* Viewport del Mapa Isométrico 2.5D */}
      <View style={styles.mapViewport}>
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

        {/* Tarjeta Flotante Superior: Control de Simulación de Recorrido */}
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

        {/* Controles flotantes de Zoom, Reset y Ubicación */}
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
      </View>

      {/* Floating Bottom Sheet: Vitrina Digital HUD o Resumen Plegado */}
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
        <View style={styles.collapsedSheet}>
          <TouchableOpacity
            style={styles.openHudBtn}
            onPress={() => setShowStorefrontHUD(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.openHudIcon}>🛍️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.openHudTitle}>Vitrina de {selectedStore.name}</Text>
              <Text style={styles.openHudSubtitle}>Toca para ver productos destacados y ofertas</Text>
            </View>
            <Text style={styles.openHudArrow}>▲</Text>
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
  },
  placementBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  placementIcon: {
    fontSize: 16,
  },
  placementText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelPlacementBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cancelPlacementText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  arrivalToast: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  arrivalToastIcon: {
    fontSize: 16,
  },
  arrivalToastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  mapViewport: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 15,
  },
  controlBtn: {
    width: 42,
    height: 42,
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
    fontSize: 20,
    fontWeight: '700',
  },
  controlIcon: {
    fontSize: 16,
  },
  collapsedSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
  },
  openHudBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  openHudIcon: {
    fontSize: 22,
  },
  openHudTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  openHudSubtitle: {
    color: '#64748B',
    fontSize: 11,
  },
  openHudArrow: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
