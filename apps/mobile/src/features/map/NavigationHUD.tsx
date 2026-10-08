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
import { GlassSurface } from '../../components/GlassSurface';
import { AppIcon, type AppIconName } from '../../components/AppIcon';

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

const ICON_MAP: Record<string, AppIconName> = {
  straight: 'arrow-up',
  'turn-left': 'arrow-back',
  'turn-right': 'arrow-forward',
  'slight-left': 'arrow-forward',
  'slight-right': 'arrow-forward',
  'stairs-up': 'arrow-up',
  'stairs-down': 'arrow-forward',
  'elevator-up': 'arrow-up',
  'elevator-down': 'arrow-forward',
  arrival: 'location',
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
      <GlassSurface variant="dark" intensity="strong" radius="xl" style={styles.topCard}>
        {/* Icono de Giro / Hito */}
        <View
          style={[
            styles.iconCircle,
            isArrival && styles.iconCircleArrival,
          ]}
        >
          <AppIcon
            name={ICON_MAP[currentStep.icon] ?? 'arrow-up'}
            size={18}
            color={isArrival ? '#10B981' : '#38BDF8'}
          />
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
            <AppIcon
              name={voiceEnabled ? 'volume-high' : 'volume-mute'}
              size={16}
              color={voiceEnabled ? '#38BDF8' : '#94A3B8'}
            />
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
            <AppIcon name="close" size={16} color="#EF4444" strokeWidth={2.5} />
          </TouchableOpacity>
        )}
      </GlassSurface>


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
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
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
    backgroundColor: 'rgba(6, 95, 70, 0.4)',
    borderColor: '#10B981',
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
  exitBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
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

