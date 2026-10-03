import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { MallOsLogo } from '../src/components/MallOsLogo';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Slide {
  id: string;
  theme: 'atrium' | 'waves' | 'clean';
  title: string;
  subtitle: string;
  buttonLabel: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    theme: 'atrium',
    title: 'Todo el mall en tu mano',
    subtitle: 'Encuentra tiendas, navega con mapa interactivo y disfruta promociones exclusivas.',
    buttonLabel: 'Comenzar',
  },
  {
    id: '2',
    theme: 'waves',
    title: 'Descubre. Explora. Disfruta.',
    subtitle: 'Rutas inteligentes paso a paso y asistencia con Concierge IA en tiempo real.',
    buttonLabel: 'Siguiente',
  },
  {
    id: '3',
    theme: 'clean',
    title: 'Tu centro comercial, ahora en tus manos.',
    subtitle: 'La experiencia de compras digital más rápida y fluida sin necesidad de registro.',
    buttonLabel: 'Entrar a Mall OS',
  },
];

export default function SplashScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const renderSlideBackground = (theme: Slide['theme']) => {
    switch (theme) {
      case 'atrium':
        return (
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&auto=format&fit=crop&q=80',
            }}
            style={styles.slideBg}
            resizeMode="cover"
          >
            <View style={styles.darkOverlay} />
          </ImageBackground>
        );

      case 'waves':
        return (
          <View style={[styles.slideBg, { backgroundColor: '#070C1A' }]}>
            <Svg width="100%" height="100%" viewBox="0 0 375 812" style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
                  <Stop offset="50%" stopColor="#312E81" stopOpacity="0.4" />
                  <Stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
                </LinearGradient>
                <LinearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                  <Stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.05" />
                </LinearGradient>
              </Defs>
              <Path d="M 0,200 C 120,120 220,260 375,180 L 375,812 L 0,812 Z" fill="url(#waveGrad1)" />
              <Path d="M 0,350 C 140,240 240,420 375,300 L 375,812 L 0,812 Z" fill="url(#waveGrad2)" />
              <Circle cx="180" cy="180" r="140" fill="#3B82F6" opacity="0.08" />
            </Svg>
          </View>
        );

      case 'clean':
      default:
        return (
          <View style={[styles.slideBg, { backgroundColor: '#0B132B' }]}>
            <Svg width="100%" height="100%" viewBox="0 0 375 812" style={StyleSheet.absoluteFill}>
              <Defs>
                <LinearGradient id="cleanGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                  <Stop offset="0%" stopColor="#1E293B" stopOpacity="0.6" />
                  <Stop offset="100%" stopColor="#0B132B" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              <Path d="M 0,0 L 375,0 L 375,812 L 0,812 Z" fill="url(#cleanGlow)" />
            </Svg>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Top Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.replace('/(tabs)')}
        hitSlop={10}
      >
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>

      {/* Horizontal Carousel */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slideItem}>
            {renderSlideBackground(item.theme)}

            <View style={styles.slideContent}>
              {/* Center Logo */}
              <View style={styles.centerBrand}>
                <MallOsLogo size={90} />
                <Text style={styles.brandTitle}>Mall OS</Text>
                <Text style={styles.brandTagline}>The Digital Layer of the Mall</Text>
              </View>

              {/* Bottom Card */}
              <View style={styles.bottomCard}>
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination & Next Button Overlay */}
      <View style={styles.footerOverlay}>
        {/* Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.ctaButtonText}>
            {SLIDES[currentIndex]?.buttonLabel || 'Continuar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070C1A',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  slideItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  slideBg: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 12, 26, 0.78)',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 150,
  },
  centerBrand: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 10,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  brandTagline: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  bottomCard: {
    alignItems: 'center',
    gap: 12,
  },
  slideTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 12,
  },
  footerOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
    gap: 18,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#3B82F6',
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
