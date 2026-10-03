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
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.badgeSimulacion}>
          <Text style={styles.badgeSimulacionText}>SIMULACIÓN</Text>
        </View>
        <Text style={styles.statusText}>
          {isWalking ? `Recorrido (${walkSpeed}x · ~1.2 m/s)` : 'Ruta Asistida'}
        </Text>
        {activeRoute && (
          <Text style={styles.metaText}>
            {Math.round(activeRoute.distanceMeters)}m · {activeRoute.walkingMinutes} min
          </Text>
        )}
      </View>

      <View style={styles.buttonsRow}>
        {isWalking ? (
          <TouchableOpacity style={styles.stopBtn} onPress={onStopWalk} activeOpacity={0.8}>
            <Text style={styles.btnText}>⏸ Pausar Simulación</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.startBtn}
            onPress={onStartWalk}
            activeOpacity={0.8}
            disabled={!hasWaypoints}
          >
            <Text style={styles.btnText}>🚶 Simular Recorrido</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.speedBtn} onPress={onToggleSpeed} activeOpacity={0.8}>
          <Text style={styles.speedText}>{walkSpeed}x</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.stepBtn} onPress={onSimulateStep} activeOpacity={0.8}>
          <Text style={styles.stepText}>+1 Paso</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de progreso visual */}
      {isWalking && (
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${walkProgress * 100}%` }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    gap: 8,
    zIndex: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeSimulacion: {
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  badgeSimulacionText: {
    color: '#92400E',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  statusText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  metaText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '800',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  startBtn: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  speedBtn: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  speedText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '800',
  },
  stepBtn: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  stepText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
});
