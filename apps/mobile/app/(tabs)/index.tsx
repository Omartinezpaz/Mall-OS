import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Defs, RadialGradient, Stop, LinearGradient } from 'react-native-svg';
import { CategoryIcon } from '../../src/components/CategoryIcon';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greetingText}>Hola, Daniela 👋</Text>
            <TouchableOpacity style={styles.mallSelector} activeOpacity={0.7}>
              <Text style={styles.mallName}>Mall del Sol</Text>
              <Text style={styles.dropdownArrow}>▾</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weatherBadge}>
            <Text style={styles.weatherText}>☀️ 24°C</Text>
          </View>
        </View>

        {/* Buscador Rápido tipo Pill */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/directorio')}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="11" cy="11" r="8" />
            <Path d="M21 21l-4.35-4.35" />
          </Svg>
          <Text style={styles.searchPlaceholder}>¿Qué quieres hacer hoy?</Text>
        </TouchableOpacity>

        {/* Hero Campaign Banner (Fashion Luxury) */}
        <View style={styles.heroBanner}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTag}>TEMPORADA 2026</Text>
              <Text style={styles.heroTitle}>Nueva colección{'\n'}Otoño · Invierno</Text>
              <TouchableOpacity
                style={styles.heroButton}
                activeOpacity={0.85}
                onPress={() => router.push('/(tabs)/ofertas')}
              >
                <Text style={styles.heroButtonText}>Descubrir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Explora por Categoría (4 Botones Circulares Índigo Royal) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explora por categoría</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/directorio')}>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoriesRow}>
          <TouchableOpacity
            style={styles.categoryItem}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <CategoryIcon slug="moda" size={56} bgColor="#4F46E5" />
            <Text style={styles.categoryName}>Moda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <CategoryIcon slug="restaurantes" size={56} bgColor="#4F46E5" />
            <Text style={styles.categoryName}>Restaurantes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <CategoryIcon slug="entretenimiento" size={56} bgColor="#4F46E5" />
            <Text style={styles.categoryName}>Entretenimiento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryItem}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <CategoryIcon slug="belleza" size={56} bgColor="#4F46E5" />
            <Text style={styles.categoryName}>Belleza</Text>
          </TouchableOpacity>
        </View>

        {/* Mall Concierge IA Card */}
        <TouchableOpacity
          style={styles.conciergeCard}
          activeOpacity={0.85}
          onPress={() => router.push('/concierge')}
        >
          <View style={styles.conciergeOrb}>
            <Svg width={40} height={40} viewBox="0 0 40 40">
              <Defs>
                <RadialGradient id="orbGrad" cx="35%" cy="30%" r="65%">
                  <Stop offset="0%" stopColor="#DDD6FE" stopOpacity="1" />
                  <Stop offset="40%" stopColor="#7C3AED" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#4C1D95" stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <Circle cx="20" cy="20" r="18" fill="url(#orbGrad)" />
              <Circle cx="15" cy="14" r="4" fill="#FFFFFF" opacity="0.6" />
            </Svg>
          </View>
          <View style={styles.conciergeInfo}>
            <Text style={styles.conciergeCardTitle}>Mall Concierge IA</Text>
            <Text style={styles.conciergeCardSub}>Tu asistente inteligente dentro del mall</Text>
          </View>
          <View style={styles.conciergeBadge}>
            <Text style={styles.conciergeBadgeText}>Preguntar →</Text>
          </View>
        </TouchableOpacity>

        {/* Hoy en el Mall (Clean Luxury Feed) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hoy en el mall</Text>
        </View>

        <View style={styles.feedContainer}>
          {/* Card 1: Concierto en Vivo */}
          <TouchableOpacity
            style={styles.whiteFeedCard}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
              }}
              style={styles.eventThumb}
            />
            <View style={styles.feedCardInfo}>
              <Text style={styles.feedCardTitle}>Concierto en vivo</Text>
              <Text style={styles.feedCardMeta}>7:00 PM · Plaza Central</Text>
            </View>
            <View style={styles.gratisBadge}>
              <Text style={styles.gratisBadgeText}>GRATIS</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: Nike 20% OFF Promo */}
          <TouchableOpacity
            style={styles.whiteFeedCard}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/ofertas')}
          >
            <View style={styles.nikeLogoBox}>
              <Svg width={28} height={12} viewBox="0 0 24 10" fill="#FFFFFF">
                <Path d="M21.71 0.29C15.67 3.51 10.3 6.94 5.6 10C3.73 8.35 1.87 6.42 0 4.21C0.93 6.07 2.33 7.86 4.2 9.38C2.33 9.77 0.93 9.4 0 8.27C4.67 11.23 9.8 11.75 15.4 9.83C18.67 8.7 21.47 5.48 23.8 0.17C23.1 0.21 22.4 0.25 21.71 0.29Z" />
              </Svg>
            </View>
            <View style={styles.feedCardInfo}>
              <Text style={styles.feedCardTitle}>20% OFF en Nike</Text>
              <Text style={styles.feedCardMeta}>Productos seleccionados</Text>
            </View>
            <View style={styles.hoyBadge}>
              <Text style={styles.hoyBadgeText}>Hoy</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 40,
    gap: 18,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  mallSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  mallName: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  dropdownArrow: {
    color: '#64748B',
    fontSize: 12,
  },
  weatherBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  weatherText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchPlaceholder: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '400',
  },
  heroBanner: {
    height: 185,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  heroContent: {
    gap: 6,
    maxWidth: '75%',
  },
  heroTag: {
    color: '#F1F5F9',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    opacity: 0.9,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
    lineHeight: 25,
    letterSpacing: -0.4,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  heroButtonText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  seeAllText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryName: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  conciergeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    gap: 12,
  },
  conciergeOrb: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conciergeInfo: {
    flex: 1,
  },
  conciergeCardTitle: {
    color: '#1E1B4B',
    fontSize: 14,
    fontWeight: '800',
  },
  conciergeCardSub: {
    color: '#6D28D9',
    fontSize: 11,
    marginTop: 1,
  },
  conciergeBadge: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  conciergeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  feedContainer: {
    gap: 10,
  },
  whiteFeedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  eventThumb: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  nikeLogoBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedCardInfo: {
    flex: 1,
    gap: 2,
  },
  feedCardTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  feedCardMeta: {
    color: '#64748B',
    fontSize: 12,
  },
  gratisBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  gratisBadgeText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  hoyBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hoyBadgeText: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
});
