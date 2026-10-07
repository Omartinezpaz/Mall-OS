import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as Speech from 'expo-speech';
import type { NavigationPlan, NavStepInstruction } from '@mallos/map-engine';

export interface NavigationHUDProps {
  plan?: NavigationPlan;
  currentStepIndex?: number;
  progress?: number;
  onCancel?: () => void;
  onVoiceToggle?: () => void;
  voiceEnabled?: boolean;

  // Propiedades de compatibilidad
  currentStep?: NavStepInstruction;
  totalDistanceMeters?: number;
  walkingMinutes?: number;
  destinationName?: string;
  stepIndex?: number;
  totalSteps?: number;
  onExitNavigation?: () => void;
}

const ICON_MAP: Record<string, string> = {
  straight: '⬆️',
  'turn-left': '⬅️',
  'turn-right': '➡️',
  'slight-left': '↖️',
  'slight-right': '↗️',
  'stairs-up': '🔼',
  'stairs-down': '🔽',
  'elevator-up': '🛗',
  'elevator-down': '🛗',
  arrival: '📍',
};

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  plan,
  currentStepIndex = 0,
  progress: explicitProgress,
  onCancel,
  onVoiceToggle,
  voiceEnabled = false,
  currentStep: legacyStep,
  totalDistanceMeters: legacyDistance,
  walkingMinutes: legacyMinutes,
  destinationName: legacyDestName,
  stepIndex: legacyStepIndex,
  totalSteps: legacyTotalSteps,
  onExitNavigation,
}) => {
  const activeStepIndex = plan ? currentStepIndex : (legacyStepIndex ?? 1) - 1;
  const currentStep = plan ? plan.steps[activeStepIndex] : legacyStep;
  const nextStep = plan ? plan.steps[activeStepIndex + 1] : undefined;

  const destName = plan?.destinationName ?? legacyDestName ?? 'Destino';
  const destFloor = plan?.destinationFloorName ?? 'Nivel Comercial';

  // Distancia y tiempo restante
  const remainingMeters = plan
    ? plan.steps.slice(activeStepIndex).reduce((acc, s) => acc + s.distanceMeters, 0)
    : (legacyDistance ?? 0);

  const remainingMinutes = plan
    ? Math.max(1, Math.ceil(remainingMeters / (1.2 * 60)))
    : (legacyMinutes ?? 1);

  const totalStepCount = plan?.steps.length ?? legacyTotalSteps ?? 1;
  const calcProgress = explicitProgress ?? Math.min(1, Math.max(0.05, (activeStepIndex + 1) / totalStepCount));

  // Animación de barra de progreso
  const progressAnim = useRef(new Animated.Value(calcProgress)).current;
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: calcProgress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [calcProgress, progressAnim]);

  // Manejo de Locución TTS con expo-speech
  useEffect(() => {
    if (voiceEnabled && currentStep) {
      Speech.stop();
      Speech.speak(currentStep.primaryText, {
        language: 'es-VE',
        pitch: 1.0,
        rate: 0.95,
      });
    } else {
      Speech.stop();
    }
  }, [activeStepIndex, voiceEnabled, currentStep]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  if (!currentStep) return null;

  const isArrival = currentStep.icon === 'arrival';
  const handleExit = onCancel ?? onExitNavigation;

  return (
    <>
      {/* Card superior: destino + distancia + tiempo */}
      <View style={styles.topCard}>
        {handleExit && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              Speech.stop();
              handleExit();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}

        <View style={styles.topCardContent}>
          <Text style={styles.destinationName} numberOfLines={1}>
            {destName}
          </Text>
          <Text style={styles.destinationMeta}>
            {Math.round(remainingMeters)} m · ~{remainingMinutes} min · {destFloor}
          </Text>
        </View>

        {onVoiceToggle && (
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={onVoiceToggle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.voiceText}>{voiceEnabled ? '🔊' : '🔇'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Barra de progreso */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      {/* Card inferior: instrucción actual + próxima */}
      <View style={styles.bottomCard}>
        <View style={styles.instructionRow}>
          <View
            style={[
              styles.iconCircle,
              isArrival && styles.iconCircleArrival,
            ]}
          >
            <Text style={styles.iconText}>{ICON_MAP[currentStep.icon] ?? '⬆️'}</Text>
          </View>

          <View style={styles.instructionTextContainer}>
            <Text style={styles.primaryText} numberOfLines={2}>
              {currentStep.primaryText}
            </Text>
            {currentStep.secondaryText && (
              <Text style={styles.secondaryText} numberOfLines={1}>
                {currentStep.secondaryText}
              </Text>
            )}
          </View>

          <Text style={styles.distancePill}>
            {currentStep.distanceMeters > 0
              ? `${currentStep.distanceMeters} m`
              : '✓'}
          </Text>
        </View>

        {nextStep && !isArrival && (
          <View style={styles.nextRow}>
            <Text style={styles.nextIcon}>{ICON_MAP[nextStep.icon] ?? '⬆️'}</Text>
            <Text style={styles.nextText} numberOfLines={1}>
              Luego: {nextStep.primaryText}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  topCardContent: {
    flex: 1,
  },
  destinationName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  destinationMeta: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  voiceButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  voiceText: {
    fontSize: 16,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 6,
    marginHorizontal: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconCircleArrival: {
    backgroundColor: '#DCFCE7',
  },
  iconText: {
    fontSize: 22,
  },
  instructionTextContainer: {
    flex: 1,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  secondaryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  distancePill: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3B82F6',
    marginLeft: 8,
  },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  nextIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  nextText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
});
