import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NavStepInstruction } from '@mallos/map-engine';

interface NavigationHUDProps {
  currentStep?: NavStepInstruction;
  totalDistanceMeters: number;
  walkingMinutes: number;
  destinationName: string;
  stepIndex: number;
  totalSteps: number;
  onExitNavigation: () => void;
}

const STEP_ICONS: Record<string, string> = {
  straight: '↑',
  'turn-left': '↰',
  'turn-right': '↱',
  'slight-left': '↖',
  'slight-right': '↗',
  'stairs-up': '🪜',
  'stairs-down': '🪜',
  'elevator-up': '🛗',
  'elevator-down': '🛗',
  arrival: '📍',
};

export function NavigationHUD({
  currentStep,
  totalDistanceMeters,
  walkingMinutes,
  destinationName,
  stepIndex,
  totalSteps,
  onExitNavigation,
}: NavigationHUDProps) {
  const icon = currentStep ? STEP_ICONS[currentStep.icon] ?? '↑' : '↑';
  const primaryText = currentStep?.primaryText ?? `Guiando a ${destinationName}`;
  const secondaryText = currentStep?.secondaryText ?? `${totalDistanceMeters} m restantes · ~${walkingMinutes} min`;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>

        <View style={styles.contentCol}>
          <Text style={styles.primaryText} numberOfLines={1}>
            {primaryText}
          </Text>
          <Text style={styles.secondaryText} numberOfLines={1}>
            {secondaryText}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onExitNavigation}
          activeOpacity={0.7}
        >
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de progreso de la ruta */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressBar,
            { width: `${Math.min(100, Math.max(5, (stepIndex / Math.max(1, totalSteps)) * 100))}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    top: 50,
    left: 14,
    right: 70, // Espacio para el selector vertical de pisos a la derecha
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  iconText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  contentCol: {
    flex: 1,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.2,
  },
  secondaryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 2,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '700',
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 2,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
});
