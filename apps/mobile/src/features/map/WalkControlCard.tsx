import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { RouteResult } from '@mallos/map-engine';

interface WalkControlCardProps {
  isWalking: boolean;
  walkSpeed: number;
  walkProgress: number;
  activeRoute: RouteResult | null;
  hasWaypoints: boolean;
  onStartWalk: () => void;
  onStopWalk: () => void;
  onToggleSpeed: () => void;
  onSimulateStep: () => void;
}

export function WalkControlCard({
  isWalking,
  walkSpeed,
  walkProgress,
  activeRoute,
  hasWaypoints,
  onStartWalk,
  onStopWalk,
  onToggleSpeed,
  onSimulateStep,
}: WalkControlCardProps) {
  return (
    <View style={styles.floatingContainer}>
      <View style={styles.card}>
        <View style={styles.infoCol}>
          <View style={styles.badgeRow}>
            <View style={styles.badgeSimulacion}>
              <Text style={styles.badgeSimulacionText}>SIMULACIÓN</Text>
            </View>
            <Text style={styles.titleText}>
              {isWalking ? `Guiando (${walkSpeed}x)` : 'Ruta'}
            </Text>
          </View>
          {activeRoute && (
            <Text style={styles.metricsText}>
              {Math.round(activeRoute.distanceMeters)}m · {activeRoute.walkingMinutes} min
            </Text>
          )}
        </View>

        <View style={styles.actionsRow}>
          {isWalking ? (
            <TouchableOpacity style={styles.pauseBtn} onPress={onStopWalk} activeOpacity={0.8}>
              <Text style={styles.pauseBtnText}>⏸ Pausar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.startBtn, !hasWaypoints && styles.disabledBtn]}
              onPress={onStartWalk}
              activeOpacity={0.8}
              disabled={!hasWaypoints}
            >
              <Text style={styles.startBtnText}>🚶 Simular</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.speedBtn} onPress={onToggleSpeed} activeOpacity={0.8}>
            <Text style={styles.speedText}>{walkSpeed}x</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stepBtn} onPress={onSimulateStep} activeOpacity={0.8}>
            <Text style={styles.stepText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de progreso de simulación ultra delgada */}
      {isWalking && (
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${walkProgress * 100}%` }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: 104,
    left: 12,
    right: 12,
    zIndex: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    gap: 8,
  },
  infoCol: {
    gap: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeSimulacion: {
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgeSimulacionText: {
    color: '#92400E',
    fontSize: 8,
    fontWeight: '800',
  },
  titleText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
  metricsText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  startBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  pauseBtn: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  speedBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  speedText: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: '800',
  },
  stepBtn: {
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  stepText: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 1.5,
    overflow: 'hidden',
    marginTop: 4,
    marginHorizontal: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 1.5,
  },
});
