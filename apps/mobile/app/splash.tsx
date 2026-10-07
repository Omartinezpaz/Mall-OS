import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MallOsLogo } from '../src/components/MallOsLogo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_DURATION_MS = 10000; // 10 segundos

const LOADING_PHASES = [
  { until: 0.25, text: 'Iniciando motor gráfico Skia 2D & CAD...' },
  { until: 0.55, text: 'Cargando mapas Sambil Chacao (5 niveles)...' },
  { until: 0.85, text: 'Sincronizando 124 tiendas, rutas y ofertas...' },
  { until: 1.0, text: '¡Bienvenido a Mall OS!' },
];

export default function SplashScreen() {
  const router = useRouter();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [percent, setPercent] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>(LOADING_PHASES[0]!.text);
  const hasNavigated = useRef<boolean>(false);

  const navigateToHome = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    router.replace('/(tabs)');
  };

  useEffect(() => {
    // 1. Animación suave de la barra de progreso (0% -> 100% en 10s)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: TOTAL_DURATION_MS,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        navigateToHome();
      }
    });

    // 2. Pulso sutil para el logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Listener para actualizar texto y porcentaje en tiempo real
    const listenerId = progressAnim.addListener(({ value }) => {
      const p = Math.min(100, Math.round(value * 100));
      setPercent(p);

      const currentPhase = LOADING_PHASES.find((phase) => value <= phase.until) ?? LOADING_PHASES[LOADING_PHASES.length - 1]!;
      setStatusText(currentPhase.text);
    });

    return () => {
      progressAnim.removeListener(listenerId);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background Atrium Image con Overlay */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&auto=format&fit=crop&q=80',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.darkGradientOverlay} />

        {/* Botón Saltar */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={navigateToHome}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Saltar</Text>
        </TouchableOpacity>

        {/* Contenido Central: Logo y Marca */}
        <View style={styles.centerContainer}>
          <Animated.View style={[styles.logoWrapper, { transform: [{ scale: pulseAnim }] }]}>
            <MallOsLogo size={110} />
          </Animated.View>

          <Text style={styles.brandTitle}>Mall OS</Text>
          <Text style={styles.brandTagline}>The Digital Layer of the Mall</Text>
        </View>

        {/* Barra de Carga Inferior (10 segundos) */}
        <View style={styles.bottomLoadingContainer}>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>{statusText}</Text>
            <Text style={styles.percentText}>{percent}%</Text>
          </View>

          {/* Track de la barra */}
          <View style={styles.progressBarTrack}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>

          <Text style={styles.versionText}>Versión 1.0.0 · Sambil Chacao</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 12, 26, 0.72)',
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 56 : 48,
    marginRight: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 10,
  },
  skipText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  logoWrapper: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginTop: 18,
  },
  brandTagline: {
    color: '#94A3B8',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginTop: 6,
  },
  bottomLoadingContainer: {
    width: SCREEN_WIDTH - 48,
    marginBottom: Platform.OS === 'ios' ? 44 : 36,
    gap: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
  },
  percentText: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  progressBarTrack: {
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  versionText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 4,
  },
});
