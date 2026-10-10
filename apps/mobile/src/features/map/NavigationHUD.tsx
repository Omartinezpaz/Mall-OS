import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { audioManager } from '../../lib/audio-manager';
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
  isWalking?: boolean;

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
  isWalking = true,
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

  // Manejo de Locución TTS con audioManager coordinado
  const lastSpokenStepIndexRef = useRef<number | null>(null);
  const prevVoiceEnabledRef = useRef<boolean>(voiceEnabled);

  useEffect(() => {
    // Si el usuario desactiva la voz explícitamente, detener locución de pasos
    if (prevVoiceEnabledRef.current && !voiceEnabled) {
      audioManager.stop();
    }
    prevVoiceEnabledRef.current = voiceEnabled;

    if (voiceEnabled && currentStep && lastSpokenStepIndexRef.current !== activeStepIndex) {
      lastSpokenStepIndexRef.current = activeStepIndex;
      audioManager.speak({
        text: currentStep.primaryText,
        priority: 'normal',
        language: 'es-VE',
        pitch: 1.0,
        rate: 0.95,
      });
    }
  }, [activeStepIndex, voiceEnabled, currentStep]);

  if (!currentStep) return null;

  const isArrival = currentStep.icon === 'arrival' || remainingMeters <= 5;
  const handleExit = onCancel ?? onExitNavigation;

  if (isArrival) {
    return (
      <View style={styles.container}>
        <View style={styles.arrivalBadgeCard}>
          <View style={styles.arrivalCheckCircle}>
            <AppIcon name="checkmark" size={14} color="#10B981" strokeWidth={3.5} />
          </View>
          <Text style={styles.arrivalBadgeText}>¡DESTINO ALCANZADO!</Text>
          {handleExit && (
            <TouchableOpacity
              style={styles.arrivalCloseBtn}
              onPress={() => {
                audioManager.stop(true);
                handleExit();
              }}
              activeOpacity={0.7}
            >
              <AppIcon name="close" size={14} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.whiteNavCard}>
        {/* Icono de Giro / Maniobra Azul */}
        <View style={styles.turnIconBox}>
          <AppIcon
            name={ICON_MAP[currentStep.icon] ?? 'arrow-forward'}
            size={22}
            color="#2563EB"
            strokeWidth={2.8}
          />
        </View>

        {/* Instrucción de Navegación Clara y Prominente */}
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
            onPress={() => {
              if (voiceEnabled) {
                audioManager.stop(true);
              }
              onVoiceToggle();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <AppIcon
              name={voiceEnabled ? 'volume-high' : 'volume-mute'}
              size={17}
              color={voiceEnabled ? '#2563EB' : '#94A3B8'}
            />
          </TouchableOpacity>
        )}

        {/* Botón de Cancelar / Salir */}
        {handleExit && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.exitBtn]}
            onPress={() => {
              audioManager.stop(true);
              handleExit();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <AppIcon name="close" size={15} color="#64748B" strokeWidth={2.2} />
          </TouchableOpacity>
        )}
      </View>

      {/* Barra de progreso integrada sutil */}
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
    paddingHorizontal: 14,
  },
  // 1. Tarjeta Blanca Turn-by-Turn GPS
  whiteNavCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    gap: 12,
  },
  turnIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionContainer: {
    flex: 1,
  },
  primaryInstruction: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  secondaryInstruction: {
    color: '#64748B',
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 2,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  exitBtn: {
    backgroundColor: '#F1F5F9',
  },
  progressTrack: {
    height: 3.5,
    backgroundColor: 'rgba(226, 232, 240, 0.8)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
    marginHorizontal: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },

  // 2. Cápsula Verde Esmeralda de Llegada
  arrivalBadgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#10B981',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
    gap: 10,
  },
  arrivalCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrivalBadgeText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  arrivalCloseBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});

