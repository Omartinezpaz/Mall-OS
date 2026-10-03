import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DestinationBarProps {
  storeName: string;
  floorLabel: string;
  distanceMeters: number;
  walkingMinutes: number;
  isWalking: boolean;
  walkSpeed: number;
  onToggleWalk: () => void;
  onToggleSpeed: () => void;
  onSimulateStep: () => void;
  onOpenStorefront: () => void;
  onExitRoute: () => void;
}

export function DestinationBar({
  storeName,
  floorLabel,
  distanceMeters,
  walkingMinutes,
  isWalking,
  walkSpeed,
  onToggleWalk,
  onToggleSpeed,
  onSimulateStep,
  onOpenStorefront,
  onExitRoute,
}: DestinationBarProps) {
  return (
    <View style={styles.container}>
      {/* Información principal de destino */}
      <TouchableOpacity
        style={styles.storeInfoCol}
        onPress={onOpenStorefront}
        activeOpacity={0.8}
      >
        <View style={styles.destHeader}>
          <Text style={styles.destLabel}>DESTINO</Text>
          <Text style={styles.etaBadge}>{distanceMeters}m · ~{walkingMinutes} min</Text>
        </View>
        <Text style={styles.storeName} numberOfLines={1}>
          {storeName}
        </Text>
        <Text style={styles.floorSubtext} numberOfLines={1}>
          {floorLabel} · Toca para ver vitrina
        </Text>
      </TouchableOpacity>

      {/* Controles de caminata y simulación */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.walkBtn, isWalking && styles.walkBtnActive]}
          onPress={onToggleWalk}
          activeOpacity={0.8}
        >
          <Text style={styles.walkBtnText}>
            {isWalking ? '⏸ Pausa' : '▶ Caminar'}
          </Text>
        </TouchableOpacity>

        {isWalking && (
          <TouchableOpacity
            style={styles.speedBtn}
            onPress={onToggleSpeed}
            activeOpacity={0.7}
          >
            <Text style={styles.speedBtnText}>{walkSpeed}x</Text>
          </TouchableOpacity>
        )}

        {!isWalking && (
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={onSimulateStep}
            activeOpacity={0.7}
          >
            <Text style={styles.stepBtnText}>+1 Paso</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.exitBtn}
          onPress={onExitRoute}
          activeOpacity={0.7}
        >
          <Text style={styles.exitBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 14,
    right: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  storeInfoCol: {
    flex: 1,
    marginRight: 10,
  },
  destHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  destLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 0.5,
  },
  etaBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  floorSubtext: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walkBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  walkBtnActive: {
    backgroundColor: '#059669',
  },
  walkBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  speedBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  speedBtnText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  stepBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  stepBtnText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  exitBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  exitBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '800',
  },
});
