import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useAuth } from '../src/features/auth/useAuth';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [percent, setPercent] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('Comprobando actualizaciones en la nube...');
  const hasNavigated = useRef<boolean>(false);

  const navigateToNext = () => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    if (user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/login');
    }
  };

  useEffect(() => {
    // 1. Pulso sutil para el logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Listener para porcentaje en tiempo real
    const listenerId = progressAnim.addListener(({ value }) => {
      const p = Math.min(100, Math.round(value * 100));
      setPercent(p);
    });

    let isCancelled = false;

    // 3. Flujo inteligente: Comprobar OTA Updates -> Descargar -> Recargar o Continuar
    async function checkAndUpdate() {
      // Progreso inicial de arranque
      Animated.timing(progressAnim, {
        toValue: 0.15,
        duration: 900,
        useNativeDriver: false,
      }).start();

      let hasUpdate = false;

      try {
        if (Updates.isEnabled) {
          setStatusText('Buscando actualizaciones OTA...');
          const check = await Promise.race([
            Updates.checkForUpdateAsync(),
            new Promise<{ isAvailable: false }>((resolve) =>
              setTimeout(() => resolve({ isAvailable: false }), 3500)
            ),
          ]);

          if (check.isAvailable && !isCancelled) {
            hasUpdate = true;
            setStatusText('Descargando nueva versión del Mall...');

            // Progreso durante la descarga de la OTA
            Animated.timing(progressAnim, {
              toValue: 0.85,
              duration: 3500,
              useNativeDriver: false,
            }).start();

            await Updates.fetchUpdateAsync();

            if (!isCancelled) {
              setStatusText('¡Actualización instalada! Reiniciando...');
              Animated.timing(progressAnim, {
                toValue: 1.0,
                duration: 500,
                useNativeDriver: false,
              }).start(async () => {
                await Updates.reloadAsync();
              });
              return;
            }
          }
        }
      } catch (err) {
        console.log('[Splash] Verificación de updates:', err);
      }

      if (isCancelled || hasUpdate) return;

      // Si no hay actualizaciones pendientes, ejecutar carga normal fluida
      setStatusText('Iniciando motor gráfico Skia 2D & CAD...');
      Animated.timing(progressAnim, {
        toValue: 0.45,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        if (isCancelled) return;
        setStatusText('Cargando planos Mall Demo (5 niveles)...');
        Animated.timing(progressAnim, {
          toValue: 0.75,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => {
          if (isCancelled) return;
          setStatusText('Sincronizando 124 tiendas, rutas y vitrinas...');
          Animated.timing(progressAnim, {
            toValue: 1.0,
            duration: 900,
            useNativeDriver: false,
          }).start(() => {
            if (!isCancelled) {
              setStatusText('¡Bienvenido a Mall Demo!');
              setTimeout(() => {
                navigateToNext();
              }, 250);
            }
          });
        });
      });
    }

    checkAndUpdate();

    return () => {
      isCancelled = true;
      progressAnim.removeListener(listenerId);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const updateChannel = Updates.channel ?? 'preview';
  const updateIdShort = Updates.updateId ? Updates.updateId.slice(0, 8) : null;
  const versionSubtitle = updateIdShort
    ? `Versión 1.0.0 · ${updateChannel} (${updateIdShort})`
    : `Versión 1.0.0 · ${updateChannel}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Decorative Radial Background Aura */}
      <View style={styles.backgroundAura}>
        <Svg width={SCREEN_WIDTH} height={SCREEN_WIDTH * 1.5} viewBox="0 0 400 600">
          <Defs>
            <RadialGradient id="splashGlow" cx="50%" cy="40%" r="55%">
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
              <Stop offset="50%" stopColor="#1D4ED8" stopOpacity="0.25" />
              <Stop offset="100%" stopColor="#0B52BA" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="emeraldGlow" cx="65%" cy="35%" r="35%">
              <Stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
              <Stop offset="100%" stopColor="#0B52BA" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="200" cy="240" r="220" fill="url(#splashGlow)" />
          <Circle cx="260" cy="210" r="140" fill="url(#emeraldGlow)" />
        </Svg>
      </View>

      {/* Botón Saltar */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={navigateToNext}
        activeOpacity={0.7}
      >
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>

      {/* Contenido Central: Logo Oficial y Marca */}
      <View style={styles.centerContainer}>
        <Animated.View style={[styles.logoWrapper, { transform: [{ scale: pulseAnim }] }]}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.officialLogo}
            resizeMode="contain"
          />
        </Animated.View>

        <Text style={styles.brandTitle}>Mall OS</Text>
        <Text style={styles.brandTagline}>The Digital Layer of the Mall</Text>
      </View>

      {/* Barra de Carga Inferior */}
      <View style={styles.bottomLoadingContainer}>
        <View style={styles.statusRow}>
          <Text style={styles.statusText}>{statusText}</Text>
          <Text style={styles.percentText}>{percent}%</Text>
        </View>

        {/* Track de la barra */}
        <View style={styles.progressBarTrack}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>

        <Text style={styles.versionText}>{versionSubtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B52BA',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundAura: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 56 : 48,
    marginRight: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
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
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
    borderRadius: 28,
  },
  officialLogo: {
    width: 110,
    height: 110,
    borderRadius: 28,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginTop: 20,
  },
  brandTagline: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
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
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  progressBarTrack: {
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 4,
    shadowColor: '#38BDF8',
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
