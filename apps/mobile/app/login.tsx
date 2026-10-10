import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { GoogleLogo } from '../src/components/GoogleLogo';
import { useAuth } from '../src/features/auth/useAuth';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithGoogle, signInAsGuest } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Animaciones de flotación y entrada suave
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    // Entrada inicial
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Flotación continua del logo 3D
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGoogleLogin = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 350);
    } catch (err) {
      console.log('[Login] Error Google auth:', err);
      // Fallback a invitado seguro si hay error en demo
      await signInAsGuest();
      router.replace('/(tabs)');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGuestLogin = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInAsGuest();
      router.replace('/(tabs)');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Aura de Fondo Zafiro / Royal Blue Glow */}
      <View style={styles.backgroundAura}>
        <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} viewBox="0 0 400 800">
          <Defs>
            <RadialGradient id="royalGlow" cx="50%" cy="42%" r="65%">
              <Stop offset="0%" stopColor="#2563EB" stopOpacity="0.85" />
              <Stop offset="45%" stopColor="#1D4ED8" stopOpacity="0.55" />
              <Stop offset="85%" stopColor="#0A256B" stopOpacity="0.2" />
              <Stop offset="100%" stopColor="#061338" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="topGlow" cx="70%" cy="20%" r="45%">
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#0B2F86" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="200" cy="350" r="320" fill="url(#royalGlow)" />
          <Circle cx="280" cy="160" r="180" fill="url(#topGlow)" />
        </Svg>
      </View>

      {/* Barra Superior con botón Saltar a Demo */}
      <View style={styles.topBar}>
        <View style={styles.topBadgePill}>
          <Text style={styles.topBadgeText}>MALL OS · ACCESO OFICIAL</Text>
        </View>

        <TouchableOpacity
          style={styles.skipBtn}
          activeOpacity={0.75}
          onPress={handleGuestLogin}
        >
          <Text style={styles.skipBtnText}>Saltar</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido Central: Logo Oficial 3D + Título */}
      <Animated.View
        style={[
          styles.centerSection,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: floatAnim }],
          },
        ]}
      >
        <View style={styles.logoCardContainer}>
          <Image
            source={require('../assets/logo_mallos_official.jpg')}
            style={styles.logoImage3D}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.brandTitle}>Mall OS</Text>
        <Text style={styles.brandTagline}>El Sistema Operativo del Centro Comercial</Text>
        <Text style={styles.brandSub}>
          Navegación en interiores, tiendas, catálogo y concierge inteligente
        </Text>
      </Animated.View>

      {/* Sección Inferior de Acciones / Login */}
      <View style={styles.bottomSection}>
        {/* Botón Principal: Continuar con Google */}
        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.88}
          onPress={handleGoogleLogin}
          disabled={isSigningIn}
        >
          {isSigningIn ? (
            <ActivityIndicator size="small" color="#1F2937" />
          ) : (
            <>
              <GoogleLogo size={22} />
              <Text style={styles.googleButtonText}>Continuar con Google</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Botón Secundario: Explorar como Invitado */}
        <TouchableOpacity
          style={styles.guestButton}
          activeOpacity={0.8}
          onPress={handleGuestLogin}
          disabled={isSigningIn}
        >
          <Text style={styles.guestButtonText}>Continuar como Invitado</Text>
        </TouchableOpacity>

        {/* Indicadores de Puntos Inferiores (Estilo Onboarding) */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.termsText}>
          Al ingresar aceptas los términos de uso y política de privacidad de Mall OS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07184A',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 24,
  },
  backgroundAura: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 56 : 46,
    zIndex: 10,
  },
  topBadgePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  topBadgeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  skipBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  skipBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    width: '100%',
  },
  logoCardContainer: {
    width: 170,
    height: 170,
    borderRadius: 38,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 26,
    elevation: 12,
    marginBottom: 20,
  },
  logoImage3D: {
    width: '100%',
    height: '100%',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -0.8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  brandTagline: {
    color: '#E0E7FF',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  brandSub: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 17,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 40 : 28,
    gap: 12,
  },
  googleButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  googleButtonText: {
    color: '#1F2937',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  guestButton: {
    width: '100%',
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#38BDF8',
  },
  termsText: {
    color: '#94A3B8',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
    maxWidth: 280,
    lineHeight: 14,
  },
});
