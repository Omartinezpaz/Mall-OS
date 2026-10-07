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
    <View style={styles.container}>
      <View style={styles.topCard}>
        {/* Icono de Giro / Hito */}
        <View
          style={[
            styles.iconCircle,
            isArrival && styles.iconCircleArrival,
          ]}
        >
          <Text style={styles.iconText}>{ICON_MAP[currentStep.icon] ?? '⬆️'}</Text>
        </View>

        {/* Instrucción de Navegación */}
        <View style={styles.instructionContainer}>
          <Text style={styles.primaryInstruction} numberOfLines={1}>
            {currentStep.primaryText}
          </Text>
          <Text style={styles.secondaryInstruction} numberOfLines={1}>
            {Math.round(remainingMeters)} m · ~{remainingMinutes} min · {destName}
          </Text>
        </View>

        {/* Botón de Voz */}
        {onVoiceToggle && (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onVoiceToggle}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>{voiceEnabled ? '🔊' : '🔇'}</Text>
          </TouchableOpacity>
        )}

        {/* Botón de Cancelar / Salir */}
        {handleExit && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.exitBtn]}
            onPress={() => {
              Speech.stop();
              handleExit();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.exitIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Barra de progreso integrada */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#475569',
  },
  iconCircleArrival: {
    backgroundColor: '#065F46',
    borderColor: '#10B981',
  },
  iconText: {
    fontSize: 18,
  },
  instructionContainer: {
    flex: 1,
  },
  primaryInstruction: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  secondaryInstruction: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  actionIcon: {
    fontSize: 14,
  },
  exitBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  exitIcon: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderRadius: 1.5,
    overflow: 'hidden',
    marginTop: 4,
    marginHorizontal: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 1.5,
  },
});
