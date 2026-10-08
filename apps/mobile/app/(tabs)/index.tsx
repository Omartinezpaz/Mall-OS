import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../../src/components/AppIcon';
import { MallOsSpriteIcon, type MallOsIconId } from '../../src/components/MallOsSpriteIcon';
import { useLoyaltyStore } from '../../src/features/loyalty/useLoyaltyStore';
import { useKidsMode } from '../../src/features/kids-mode/useKidsMode';
import {
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
} from '@mallos/map-engine';

const SAMBIL_LEVELS: Array<{ id: string; short: string; name: string; count: number; icon: MallOsIconId; color: string }> = [
  { id: LEVEL_AUTOPISTA, short: 'L1', name: 'Autopista', count: 108, icon: 'otros', color: '#2563EB' },
  { id: LEVEL_ACUARIO, short: 'L2', name: 'Acuario', count: 82, icon: 'tecnologia', color: '#0284C7' },
  { id: LEVEL_LIBERTADOR, short: 'L3', name: 'Libertador', count: 74, icon: 'moda', color: '#7C3AED' },
  { id: LEVEL_FERIA, short: 'L4', name: 'Feria', count: 46, icon: 'restaurantes', color: '#EA580C' },
  { id: LEVEL_DIVERSION, short: 'L5', name: 'Diversión', count: 28, icon: 'entretenimiento', color: '#DB2777' },
];

const SAMBIL_ANCHORS: Array<{ id: string; name: string; floor: string; category: string; badge: string; color: string; bg: string; icon: MallOsIconId }> = [
  { id: 'local_farmatodo', name: 'Farmatodo', floor: 'Nivel Autopista', category: 'Farmacia & Belleza', badge: '2x1 Promo', color: '#16A34A', bg: '#F0FDF4', icon: 'salud' },
  { id: 'st_pb_01', name: 'ZARA', floor: 'Nivel Autopista', category: 'Moda Internacional', badge: '30% OFF', color: '#2563EB', bg: '#EFF6FF', icon: 'moda' },
  { id: 'st_pb_02', name: 'Nike Store', floor: 'Nivel Autopista', category: 'Calzado & Deporte', badge: 'Nuevo', color: '#D97706', bg: '#FFFBEB', icon: 'deportes' },
  { id: 'local_cines_unidos', name: 'Cines Unidos', floor: 'Nivel Diversión', category: 'Salas de Cine & IMAX', badge: 'Cartelera', color: '#9333EA', bg: '#FAF5FF', icon: 'entretenimiento' },
  { id: 'local_4', name: 'Tiendas Tijerazo', floor: 'Nivel Autopista', category: 'Tienda por Dept.', badge: 'Destacado', color: '#DC2626', bg: '#FEF2F2', icon: 'moda' },
  { id: 'local_bnc', name: 'Banco Nac. de Crédito', floor: 'Nivel Autopista', category: 'Banca & Servicios', badge: 'Cajeros', color: '#059669', bg: '#ECFDF5', icon: 'finanzas' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 24);
  const loyalty = useLoyaltyStore();
  const kids = useKidsMode();

  const handleOpenMapWithFloor = (floorId: string) => {
    router.push({
      pathname: '/(tabs)/mapa',
      params: { floorId },
    });
  };

  const handleOpenMapWithStore = (storeId: string) => {
    router.push({
      pathname: '/(tabs)/mapa',
      params: { storeId },
    });
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: topSafe + 8 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header: Mall OS & Loyalty Badge */}
        <View style={styles.topBar}>
          <View>
            <View style={styles.liveBeaconRow}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>ABIERTO AHORA</Text>
            </View>
            <Text style={styles.mallTitle}>Mall Demo</Text>
            <Text style={styles.mallSubtitle}>Plataforma Demo · 124 tiendas en 5 niveles</Text>
          </View>

          <TouchableOpacity
            style={styles.loyaltyBadge}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <AppIcon name="star" size={13} color="#F59E0B" />
            <Text style={styles.loyaltyPoints}>{loyalty.points} pts</Text>
          </TouchableOpacity>
        </View>

        {/* Buscador Directo */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/directorio')}
        >
          <AppIcon name="search" size={18} color="#94A3B8" />
          <Text style={styles.searchPlaceholder}>¿Qué buscas hoy en el Sambil?</Text>
        </TouchableOpacity>

        {/* Hero Interactive Map Banner */}
        <TouchableOpacity
          style={styles.heroBanner}
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/mapa')}
        >
          <View style={styles.heroPatternOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroTagBadge}>
              <AppIcon name="navigate" size={12} color="#38BDF8" />
              <Text style={styles.heroTagText}>MAPA INTERACTIVO 2D / 2.5D</Text>
            </View>
            <Text style={styles.heroTitle}>Navegación paso a paso en el Sambil</Text>
            <Text style={styles.heroSub}>
              Encuentra tiendas, rutas accesibles entre pisos y calcula tu tiempo de caminata en vivo.
            </Text>
            <View style={styles.heroCTA}>
              <Text style={styles.heroCTAText}>Abrir Mapa</Text>
              <AppIcon name="arrow-forward" size={14} color="#0F172A" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Banner Gamificación: Modo Exploradores */}
        <TouchableOpacity
          style={styles.kidsBanner}
          activeOpacity={0.88}
          onPress={() => router.push('/kids-mode')}
        >
          <View style={styles.kidsIconBox}>
            <Text style={{ fontSize: 24 }}>{kids.avatar || '🎮'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.kidsBadgeRow}>
              <Text style={styles.kidsBadgeText}>BÚSQUEDA DEL TESORO</Text>
              {kids.ageGroup && (
                <Text style={styles.kidsStarsBadge}>⭐ {kids.stars}/5</Text>
              )}
            </View>
            <Text style={styles.kidsTitle}>
              {kids.ageGroup ? `Aventura: ${kids.playerName}` : 'Modo Exploradores del Mall'}
            </Text>
            <Text style={styles.kidsSub} numberOfLines={2}>
              {kids.prizeUnlocked
                ? '🏆 ¡Premio final listo para reclamar!'
                : kids.ageGroup
                ? 'Continúa resolviendo acertijos y gana premios.'
                : 'Juego para Niños, Teens y Jóvenes · Premios reales en tiendas.'}
            </Text>
          </View>
          <View style={styles.kidsArrowBtn}>
            <AppIcon name="chevron-forward" size={18} color="#D97706" />
          </View>
        </TouchableOpacity>

        {/* Selector de Niveles del Sambil */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Niveles del Mall</Text>
          <Text style={styles.sectionSub}>Toca para ver el mapa del piso</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.levelsScroll}
        >
          {SAMBIL_LEVELS.map((lvl) => (
            <TouchableOpacity
              key={lvl.id}
              style={styles.levelCard}
              activeOpacity={0.8}
              onPress={() => handleOpenMapWithFloor(lvl.id)}
            >
              <View style={[styles.levelBadgeCircle, { backgroundColor: lvl.color }]}>
                <Text style={styles.levelBadgeText}>{lvl.short}</Text>
              </View>
              <Text style={styles.levelName}>Nivel {lvl.name}</Text>
              <Text style={styles.levelCount}>{lvl.count} locales</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tiendas Principales / Anclas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tiendas Destacadas</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/directorio')}>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.anchorsGrid}>
          {SAMBIL_ANCHORS.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.anchorCard}
              activeOpacity={0.85}
              onPress={() => handleOpenMapWithStore(store.id)}
            >
              <View style={[styles.anchorIconBox, { backgroundColor: store.bg }]}>
                <MallOsSpriteIcon name={store.icon} size={22} showCircle={false} color={store.color} />
              </View>
              <View style={styles.anchorInfo}>
                <View style={styles.anchorTitleRow}>
                  <Text style={styles.anchorName} numberOfLines={1}>{store.name}</Text>
                  {store.badge && (
                    <View style={[styles.anchorBadge, { backgroundColor: store.color }]}>
                      <Text style={styles.anchorBadgeText}>{store.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.anchorCategory}>{store.category}</Text>
                <View style={styles.anchorFloorRow}>
                  <MallOsSpriteIcon name="ubicacion" size={10} showCircle={false} color="#94A3B8" />
                  <Text style={styles.anchorFloorText}>{store.floor}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  liveBeaconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  mallTitle: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  mallSubtitle: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 1,
  },
  loyaltyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  loyaltyPoints: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 20,
    borderWidth: 1.5,
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
    fontSize: 13,
    fontWeight: '600',
  },
  heroBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  heroPatternOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(56, 189, 248, 0.04)',
  },
  heroContent: {
    gap: 8,
  },
  heroTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 5,
  },
  heroTagText: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  heroSub: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },
  heroCTA: {
    alignSelf: 'flex-start',
    backgroundColor: '#38BDF8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroCTAText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionSub: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },
  levelsScroll: {
    gap: 10,
    paddingVertical: 2,
  },
  levelCard: {
    width: 105,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  levelBadgeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  levelName: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  levelCount: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  anchorsGrid: {
    gap: 10,
  },
  anchorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  anchorIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchorInitials: {
    fontSize: 16,
    fontWeight: '900',
  },
  anchorInfo: {
    flex: 1,
    gap: 2,
  },
  anchorTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  anchorName: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  anchorBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  anchorBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  anchorCategory: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
  anchorFloorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  anchorFloorText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  kidsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    padding: 14,
    marginTop: 14,
    gap: 12,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  kidsIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  kidsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  kidsBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 0.6,
  },
  kidsStarsBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    backgroundColor: '#FDE68A',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  kidsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#78350F',
  },
  kidsSub: {
    fontSize: 11,
    color: '#92400E',
    marginTop: 2,
    lineHeight: 14,
  },
  kidsArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
