import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../../src/components/AppIcon';
import { MallOsLogo } from '../../src/components/MallOsLogo';
import { MallOsSpriteIcon, type MallOsIconId } from '../../src/components/MallOsSpriteIcon';
import { useLoyaltyStore } from '../../src/features/loyalty/useLoyaltyStore';
import { useKidsMode } from '../../src/features/kids-mode/useKidsMode';
import { useAuth } from '../../src/features/auth/useAuth';
import { GoogleLogo } from '../../src/components/GoogleLogo';
import { AnimatedConciergeAvatar } from '../../src/features/concierge/AnimatedConciergeAvatar';
import { AnalyticsDashboardModal } from '../../src/components/AnalyticsDashboardModal';
import {
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
} from '@mallos/map-engine';

// Slaider automático de fotos reales del mall (visual continuo, sin enlaces ni textos)
const MALL_HERO_IMAGES = [
  require('../../assets/home/mall_slide_2.jpg'),
  require('../../assets/home/mall_slide_3.jpg'),
  require('../../assets/home/mall_slide_4.png'),
  require('../../assets/home/mall_slide_5.png'),
];

const SAMBIL_LEVELS: Array<{
  id: string;
  short: string;
  name: string;
  count: number;
  icon: MallOsIconId;
  color: string;
  image: any;
}> = [
  {
    id: LEVEL_AUTOPISTA,
    short: 'L1',
    name: 'Autopista',
    count: 108,
    icon: 'otros',
    color: '#2563EB',
    image: require('../../assets/levels/nivel_autopista.png'),
  },
  {
    id: LEVEL_ACUARIO,
    short: 'L2',
    name: 'Acuario',
    count: 82,
    icon: 'tecnologia',
    color: '#0284C7',
    image: require('../../assets/levels/nivel_acuario.png'),
  },
  {
    id: LEVEL_LIBERTADOR,
    short: 'L3',
    name: 'Libertador',
    count: 74,
    icon: 'moda',
    color: '#7C3AED',
    image: require('../../assets/levels/nivel_libertador.png'),
  },
  {
    id: LEVEL_FERIA,
    short: 'L4',
    name: 'Feria',
    count: 46,
    icon: 'restaurantes',
    color: '#EA580C',
    image: require('../../assets/levels/nivel_feria.png'),
  },
  {
    id: LEVEL_DIVERSION,
    short: 'L5',
    name: 'Diversión',
    count: 28,
    icon: 'entretenimiento',
    color: '#DB2777',
    image: require('../../assets/levels/nivel_diversion.png'),
  },
];

const SAMBIL_ANCHORS: Array<{
  id: string;
  floorId: string;
  name: string;
  floor: string;
  category: string;
  badge?: string;
  color: string;
  bg: string;
  logo: any;
}> = [
  // ==========================================
  // NIVEL 1: AUTOPISTA (LEVEL_AUTOPISTA)
  // ==========================================
  {
    id: 'local_farmatodo',
    floorId: LEVEL_AUTOPISTA,
    name: 'Farmatodo',
    floor: 'Nivel Autopista',
    category: 'Farmacia & Belleza',
    badge: '2x1 Promo',
    color: '#16A34A',
    bg: '#F0FDF4',
    logo: require('../../assets/stores/logo_farmatodo.png'),
  },
  {
    id: 'local_4',
    floorId: LEVEL_AUTOPISTA,
    name: 'Tiendas Tijerazo',
    floor: 'Nivel Autopista',
    category: 'Tienda por Dept.',
    badge: 'Destacado',
    color: '#DC2626',
    bg: '#FEF2F2',
    logo: require('../../assets/stores/logo_tijerazo.jpg'),
  },
  {
    id: 'local_bnc',
    floorId: LEVEL_AUTOPISTA,
    name: 'Banco Nac. de Crédito',
    floor: 'Nivel Autopista',
    category: 'Banca & Servicios',
    badge: 'Cajeros 24/7',
    color: '#059669',
    bg: '#ECFDF5',
    logo: require('../../assets/stores/logo_bnc.jpg'),
  },
  {
    id: 'local_9',
    floorId: LEVEL_AUTOPISTA,
    name: 'Bath & Body Works',
    floor: 'Nivel Autopista',
    category: 'Fragancias & Cuidado Personal',
    badge: 'Exclusivo',
    color: '#0284C7',
    bg: '#F0F9FF',
    logo: require('../../assets/stores/logo_bath_body_works.png'),
  },
  {
    id: 'local_77',
    floorId: LEVEL_AUTOPISTA,
    name: 'Banco Provincial',
    floor: 'Nivel Autopista',
    category: 'Banca & Servicios',
    badge: 'Agencia',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    logo: require('../../assets/stores/logo_provincial.jpg'),
  },
  {
    id: 'local_18',
    floorId: LEVEL_AUTOPISTA,
    name: 'Banco del Tesoro',
    floor: 'Nivel Autopista',
    category: 'Banca & Servicios',
    badge: 'Taquilla',
    color: '#B45309',
    bg: '#FEF3C7',
    logo: require('../../assets/stores/logo_banco_tesoro.jpeg'),
  },
  {
    id: 'local_8',
    floorId: LEVEL_AUTOPISTA,
    name: 'Palacio del Blumer',
    floor: 'Nivel Autopista',
    category: 'Lencería & Ropa Interior',
    badge: 'Tendencia',
    color: '#E11D48',
    bg: '#FFF1F2',
    logo: require('../../assets/stores/logo_palacio_del_blumer.png'),
  },
  {
    id: 'local_1',
    floorId: LEVEL_AUTOPISTA,
    name: 'Liah Spa',
    floor: 'Nivel Autopista',
    category: 'Estética & Bienestar',
    badge: 'Spa VIP',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    logo: require('../../assets/stores/logo_liah_spa.png'),
  },
  {
    id: 'local_10',
    floorId: LEVEL_AUTOPISTA,
    name: 'Sansa',
    floor: 'Nivel Autopista',
    category: 'Calzado & Moda',
    badge: 'Colección',
    color: '#EA580C',
    bg: '#FFF7ED',
    logo: require('../../assets/stores/logo_sansa.jpg'),
  },

  // ==========================================
  // NIVEL 2: ACUARIO (LEVEL_ACUARIO)
  // ==========================================
  {
    id: 'st_pb_01',
    floorId: LEVEL_ACUARIO,
    name: 'ZARA (2.500 m²)',
    floor: 'Nivel Acuario',
    category: 'Moda Internacional',
    badge: '30% OFF',
    color: '#2563EB',
    bg: '#EFF6FF',
    logo: require('../../assets/stores/logo_zara.png'),
  },
  {
    id: 'st_pb_02',
    floorId: LEVEL_ACUARIO,
    name: 'Nike Store Sambil',
    floor: 'Nivel Acuario',
    category: 'Calzado & Deporte',
    badge: 'Nuevo',
    color: '#D97706',
    bg: '#FFFBEB',
    logo: require('../../assets/stores/logo_nike.jpg'),
  },
  {
    id: 'miniso',
    floorId: LEVEL_ACUARIO,
    name: 'Miniso',
    floor: 'Nivel Acuario',
    category: 'Hogar & Novedades',
    badge: '3x2 Global',
    color: '#DC2626',
    bg: '#FEF2F2',
    logo: { uri: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=80' },
  },
  {
    id: 'ninja_park',
    floorId: LEVEL_ACUARIO,
    name: 'Ninja Park Aventura',
    floor: 'Nivel Acuario',
    category: 'Entretenimiento & Juegos',
    badge: 'Atracción',
    color: '#7C3AED',
    bg: '#F5F3FF',
    logo: { uri: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&auto=format&fit=crop&q=80' },
  },

  // ==========================================
  // NIVEL 3: LIBERTADOR (LEVEL_LIBERTADOR)
  // ==========================================
  {
    id: 'samsung',
    floorId: LEVEL_LIBERTADOR,
    name: 'Samsung Experience Store',
    floor: 'Nivel Libertador',
    category: 'Tecnología & Gadgets',
    badge: 'Oficial',
    color: '#0284C7',
    bg: '#F0F9FF',
    logo: { uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=80' },
  },
  {
    id: 'apple_reseller',
    floorId: LEVEL_LIBERTADOR,
    name: 'Mundo Mac Apple Premium',
    floor: 'Nivel Libertador',
    category: 'Tecnología & Audio',
    badge: 'Apple Reseller',
    color: '#475569',
    bg: '#F8FAFC',
    logo: { uri: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&auto=format&fit=crop&q=80' },
  },
  {
    id: 'balu',
    floorId: LEVEL_LIBERTADOR,
    name: 'Balú Moda',
    floor: 'Nivel Libertador',
    category: 'Moda & Tendencias',
    badge: 'Colección',
    color: '#DB2777',
    bg: '#FDF2F8',
    logo: { uri: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&auto=format&fit=crop&q=80' },
  },

  // ==========================================
  // NIVEL 4: FERIA (LEVEL_FERIA)
  // ==========================================
  {
    id: 'bonsai_sushi',
    floorId: LEVEL_FERIA,
    name: 'Bonsai Sushi Bar & Lounge',
    floor: 'Nivel Feria',
    category: 'Gastronomía & Sushi',
    badge: 'Gourmet',
    color: '#EA580C',
    bg: '#FFF7ED',
    logo: { uri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&auto=format&fit=crop&q=80' },
  },
  {
    id: 'migas_cafe',
    floorId: LEVEL_FERIA,
    name: "Miga's Café",
    floor: 'Nivel Feria',
    category: 'Gastronomía & Café',
    badge: 'Especialidad',
    color: '#B45309',
    bg: '#FEF3C7',
    logo: { uri: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80' },
  },

  // ==========================================
  // NIVEL 5: DIVERSIÓN (LEVEL_DIVERSION)
  // ==========================================
  {
    id: 'local_cines_unidos',
    floorId: LEVEL_DIVERSION,
    name: 'Cines Unidos',
    floor: 'Nivel Diversión',
    category: 'Salas de Cine & IMAX',
    badge: 'Cartelera',
    color: '#9333EA',
    bg: '#FAF5FF',
    logo: require('../../assets/stores/logo_cines_unidos.jpg'),
  },
  {
    id: 'mango_bajito',
    floorId: LEVEL_DIVERSION,
    name: 'Mango Bajito (2.136 m²)',
    floor: 'Nivel Diversión',
    category: 'Hogar & Departamentos',
    badge: 'Mega Tienda',
    color: '#D97706',
    bg: '#FFFBEB',
    logo: { uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=80' },
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 24);
  const loyalty = useLoyaltyStore();
  const kids = useKidsMode();
  const { user, signOut } = useAuth();

  // Estado del filtro de nivel de piso
  const [selectedFloorId, setSelectedFloorId] = useState<string | null>(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleToggleFloorFilter = (floorId: string) => {
    setSelectedFloorId((prev) => (prev === floorId ? null : floorId));
  };

  // Navegación obligatoria al perfil de la tienda (NUNCA al mapa)
  const handleOpenStoreProfile = (storeId: string) => {
    router.push({
      pathname: '/local/[id]',
      params: { id: storeId },
    });
  };

  const selectedLevel = useMemo(() => {
    if (!selectedFloorId) return null;
    return SAMBIL_LEVELS.find((lvl) => lvl.id === selectedFloorId) ?? null;
  }, [selectedFloorId]);

  const displayedStores = useMemo(() => {
    if (!selectedFloorId) return SAMBIL_ANCHORS;
    return SAMBIL_ANCHORS.filter((store) => store.floorId === selectedFloorId);
  }, [selectedFloorId]);

  // Slaider automático de fotos del mall (cambio cada 5 segundos)
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % MALL_HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeHeroImage = MALL_HERO_IMAGES[heroSlideIdx] ?? MALL_HERO_IMAGES[0];

  // Carruzel de 3 banners de funcionalidades (rotación automática cada 6 segundos)
  const [featureBannerIdx, setFeatureBannerIdx] = useState(0);
  const featureScrollRef = useRef<ScrollView>(null);
  const { width: windowWidth } = useWindowDimensions();
  const bannerCardWidth = windowWidth - 32;

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatureBannerIdx((prev) => {
        const next = (prev + 1) % 3;
        featureScrollRef.current?.scrollTo({
          x: next * bannerCardWidth,
          animated: true,
        });
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerCardWidth]);

  const goToFeatureSlide = (idx: number) => {
    setFeatureBannerIdx(idx);
    featureScrollRef.current?.scrollTo({
      x: idx * bannerCardWidth,
      animated: true,
    });
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================================= */}
        {/* CABECERA PRINCIPAL: Identidad Mall OS + Buscador Integrado */}
        {/* ========================================================= */}
        <View style={[styles.topHeaderContainer, { paddingTop: topSafe + 8 }]}>
          {/* Fila superior: Logo DEMO MALL OS + Notificaciones + Perfil */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.brandRow}
              activeOpacity={0.88}
              delayLongPress={800}
              onLongPress={() => setShowAnalyticsModal(true)}
            >
              <View style={styles.brandEmblemBox}>
                <MallOsLogo size={22} variant="white" />
              </View>
              <View style={styles.brandTextColumn}>
                <Text style={styles.brandTitle}>DEMO</Text>
                <Text style={styles.brandSubtitle}>MALL OS</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.topActionsRow}>
              {/* Botón Campana Notificaciones */}
              <TouchableOpacity
                style={styles.iconCircleBtn}
                activeOpacity={0.8}
                onPress={() => setShowNotificationsModal(true)}
              >
                <AppIcon name="notifications" size={19} color="#FFFFFF" />
                <View style={styles.redBadgeCircle}>
                  <Text style={styles.redBadgeText}>1</Text>
                </View>
              </TouchableOpacity>

              {/* Botón Perfil / Puntos */}
              <TouchableOpacity
                style={styles.iconCircleBtn}
                activeOpacity={0.8}
                onPress={() => setShowProfileModal(true)}
              >
                <AppIcon name="person" size={19} color="#FFFFFF" />
                <View style={[styles.redBadgeCircle, { backgroundColor: '#F59E0B' }]}>
                  <Text style={styles.redBadgeText}>★</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buscador Integrado estilo Cápsula */}
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/directorio')}
          >
            <AppIcon name="search" size={19} color="#64748B" />
            <Text style={styles.searchPlaceholder}>Buscar un local, producto o marca...</Text>
          </TouchableOpacity>
        </View>

        {/* ========================================================= */}
        {/* CUERPO PRINCIPAL: Cuadro de Fotos del Mall + Acceso rápido + Módulos */}
        {/* ========================================================= */}
        <View style={styles.bodyContainer}>
          {/* EL CUADRO HERO DEL MALL: Proporción 4:3 exacta, 100% visible, sin zoom ni recortes */}
          <View style={styles.mallHeroCard}>
            <Image
              source={activeHeroImage}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />

            {/* Degradado sutil inferior para legibilidad de los badges */}
            <View style={styles.mallHeroDarkGradient} />

            {/* Insignia de Ubicación Oficial */}
            <View style={styles.mallHeroLocationBadge}>
              <AppIcon name="location" size={12} color="#38BDF8" />
              <Text style={styles.mallHeroLocationText}>Sambil Chacao · Caracas</Text>
            </View>

            {/* Puntos de Paginación en Cápsula de Cristal */}
            <View style={styles.mallHeroDotsPill}>
              {MALL_HERO_IMAGES.map((_, idx) => (
                <View
                  key={`slide-dot-${idx}`}
                  style={idx === heroSlideIdx ? styles.dotActive : styles.dotInactive}
                />
              ))}
            </View>
          </View>
          {/* Barra de Acciones Rápidas (Chips de acceso directo) */}
          <View style={styles.quickActionsBar}>
            <TouchableOpacity
              style={styles.quickActionChip}
              activeOpacity={0.8}
              onPress={() => router.push('/concierge')}
            >
              <View style={[styles.quickActionIconCircle, { backgroundColor: '#EFF6FF' }]}>
                <MallOsLogo size={14} />
              </View>
              <Text style={styles.quickActionText}>Concierge IA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionChip}
              activeOpacity={0.8}
              onPress={() => router.push('/kids-mode')}
            >
              <View style={[styles.quickActionIconCircle, { backgroundColor: '#FEF3C7' }]}>
                <AppIcon name="compass" size={13} color="#D97706" />
              </View>
              <Text style={styles.quickActionText}>Modo Niño</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionChip}
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/mapa')}
            >
              <View style={[styles.quickActionIconCircle, { backgroundColor: '#E0F2FE' }]}>
                <AppIcon name="navigate" size={13} color="#0284C7" />
              </View>
              <Text style={styles.quickActionText}>Mapa 2.5D</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionChip}
              activeOpacity={0.8}
              onPress={() => router.push('/(tabs)/ofertas')}
            >
              <View style={[styles.quickActionIconCircle, { backgroundColor: '#FFFBEB' }]}>
                <AppIcon name="star" size={13} color="#F59E0B" />
              </View>
              <Text style={styles.quickActionText}>{loyalty.points} pts</Text>
            </TouchableOpacity>
          </View>

        {/* Carruzel Automático de 3 Banners de Funcionalidades (6 segundos) */}
        <View style={styles.featureCarouselContainer}>
          <ScrollView
            ref={featureScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            decelerationRate="fast"
            snapToInterval={bannerCardWidth}
            snapToAlignment="start"
            onMomentumScrollEnd={(e) => {
              const newIdx = Math.round(e.nativeEvent.contentOffset.x / bannerCardWidth);
              if (newIdx >= 0 && newIdx < 3 && newIdx !== featureBannerIdx) {
                setFeatureBannerIdx(newIdx);
              }
            }}
            style={{ width: bannerCardWidth }}
            contentContainerStyle={{ width: bannerCardWidth * 3 }}
          >
            {/* Slide 0: Concierge IA */}
            <TouchableOpacity
              style={[styles.featureSlideCard, { width: bannerCardWidth }]}
              activeOpacity={0.92}
              onPress={() => router.push('/concierge')}
            >
              <Image
                source={require('../../assets/home/banner_concierge_carousel.png')}
                style={styles.heroBackgroundImage}
                resizeMode="cover"
              />
              <View style={styles.bannerTopFloatingRow}>
                <View style={styles.conciergeTagBadge}>
                  <View style={styles.liveDotSmall} />
                  <Text style={styles.conciergeTagText}>CONCIERGE OFICIAL · ASISTENTE DEL MALL</Text>
                </View>
                <View style={styles.conciergePillChip}>
                  <AppIcon name="chatbubble" size={10} color="#38BDF8" />
                  <Text style={styles.conciergePillText}>IA 24/7</Text>
                </View>
              </View>

              <View style={styles.bannerBottomFloatingRow}>
                <View style={styles.bannerGlassInfo}>
                  <Text style={styles.bannerGlassTitle}>¿Dónde comer, ofertas o baños?</Text>
                  <Text style={styles.bannerGlassSub} numberOfLines={1}>
                    Pregúntale al concierge y obtén la ruta directa
                  </Text>
                </View>
                <View style={styles.heroFloatingCTA}>
                  <Text style={styles.heroCTAText}>Chatear</Text>
                  <AppIcon name="arrow-forward" size={12} color="#0F172A" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Slide 1: Modo Niño - Búsqueda del Tesoro */}
            <TouchableOpacity
              style={[
                styles.featureSlideCard,
                styles.kidsSlideCard,
                { width: bannerCardWidth },
              ]}
              activeOpacity={0.92}
              onPress={() => router.push('/kids-mode')}
            >
              <Image
                source={require('../../assets/home/banner_tesoro_carousel.jpg')}
                style={styles.heroBackgroundImage}
                resizeMode="cover"
              />
              <View style={styles.bannerTopFloatingRow}>
                <View style={styles.kidsTagBadge}>
                  <AppIcon name="compass" size={11} color="#FBBF24" />
                  <Text style={styles.kidsBadgeText}>BÚSQUEDA DEL TESORO</Text>
                </View>
                {kids.ageGroup ? (
                  <View style={styles.kidsStarsBadgeRow}>
                    <AppIcon name="star" size={10} color="#FBBF24" />
                    <Text style={styles.kidsStarsBadge}>{kids.stars}/5</Text>
                  </View>
                ) : (
                  <View style={styles.kidsActionChip}>
                    <Text style={styles.kidsActionChipText}>¡Jugar!</Text>
                    <AppIcon name="chevron-forward" size={11} color="#FBBF24" />
                  </View>
                )}
              </View>

              <View style={styles.bannerBottomFloatingRow}>
                {kids.prizeUnlocked ? (
                  <View style={styles.kidsPrizeBadge}>
                    <AppIcon name="trophy" size={11} color="#FBBF24" />
                    <Text style={styles.kidsPrizeText}>¡Premio listo en tienda!</Text>
                  </View>
                ) : (
                  <View style={styles.bannerGlassInfo}>
                    <Text style={styles.bannerGlassTitle}>Aventura Interactiva</Text>
                    <Text style={styles.bannerGlassSub} numberOfLines={1}>
                      Acertijos y premios para niños en el mall
                    </Text>
                  </View>
                )}
                <View style={[styles.heroFloatingCTA, { backgroundColor: '#F59E0B' }]}>
                  <Text style={styles.heroCTAText}>¡Jugar!</Text>
                  <AppIcon name="arrow-forward" size={12} color="#0F172A" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Slide 2: Mapa 2.5D - Navegación Paso a Paso */}
            <TouchableOpacity
              style={[styles.featureSlideCard, { width: bannerCardWidth }]}
              activeOpacity={0.92}
              onPress={() => router.push('/(tabs)/mapa')}
            >
              <Image
                source={require('../../assets/home/banner_navegacion_carousel.png')}
                style={styles.heroBackgroundImage}
                resizeMode="cover"
              />
              <View style={styles.bannerTopFloatingRow}>
                <View style={styles.heroTagBadge}>
                  <AppIcon name="navigate" size={11} color="#38BDF8" />
                  <Text style={styles.heroTagText}>NAVEGACIÓN PASO A PASO</Text>
                </View>
                <View style={styles.mapPillBadge}>
                  <AppIcon name="map" size={10} color="#38BDF8" />
                  <Text style={styles.mapPillText}>Mapa 2.5D</Text>
                </View>
              </View>

              <View style={styles.bannerBottomFloatingRow}>
                <View style={styles.bannerGlassInfo}>
                  <Text style={styles.bannerGlassTitle}>Rutas en Tiempo Real</Text>
                  <Text style={styles.bannerGlassSub} numberOfLines={1}>
                    Guiado volumétrico 3D piso a piso
                  </Text>
                </View>
                <View style={styles.heroFloatingCTA}>
                  <Text style={styles.heroCTAText}>Abrir Mapa</Text>
                  <AppIcon name="arrow-forward" size={12} color="#0F172A" />
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Indicadores de Paginación del Carruzel de 6s */}
          <View style={styles.featureCarouselDotsRow}>
            {[0, 1, 2].map((idx) => (
              <TouchableOpacity
                key={`feature-dot-${idx}`}
                onPress={() => goToFeatureSlide(idx)}
                activeOpacity={0.7}
                style={[
                  styles.featureDotBase,
                  idx === featureBannerIdx ? styles.featureDotActive : styles.featureDotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Selector de Niveles del Sambil - Actúa como FILTRO de tiendas por piso */}
        <View style={styles.sectionHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Niveles del Mall</Text>
            <Text style={styles.sectionSub}>Toca un piso para ver sus tiendas</Text>
          </View>
          {selectedFloorId && (
            <TouchableOpacity
              style={styles.clearFilterChip}
              activeOpacity={0.8}
              onPress={() => setSelectedFloorId(null)}
            >
              <Text style={styles.clearFilterChipText}>Ver todos</Text>
              <AppIcon name="close" size={12} color="#2563EB" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.levelsScroll}
        >
          {SAMBIL_LEVELS.map((lvl) => {
            const isSelected = selectedFloorId === lvl.id;
            return (
              <TouchableOpacity
                key={lvl.id}
                style={[
                  styles.levelCard,
                  isSelected && [
                    styles.levelCardSelected,
                    { borderColor: lvl.color },
                  ],
                ]}
                activeOpacity={0.85}
                onPress={() => handleToggleFloorFilter(lvl.id)}
              >
                <View style={styles.levelImageWrapper}>
                  <Image
                    source={lvl.image}
                    style={styles.levelImage}
                    resizeMode="cover"
                  />
                  <View style={[styles.levelBadgeCircle, { backgroundColor: lvl.color }]}>
                    <Text style={styles.levelBadgeText}>{lvl.short}</Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.levelSelectedBadge, { backgroundColor: lvl.color }]}>
                      <AppIcon name="checkmark" size={10} color="#FFFFFF" />
                      <Text style={styles.levelSelectedBadgeText}>Piso activo</Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.levelName,
                    isSelected && { color: lvl.color, fontWeight: '900' },
                  ]}
                  numberOfLines={1}
                >
                  Nivel {lvl.name}
                </Text>
                <Text style={styles.levelCount}>{lvl.count} locales</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tiendas Principales / Anclas Filtradas por Piso */}
        <View style={styles.sectionHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>
              {selectedLevel ? `Tiendas · Nivel ${selectedLevel.name}` : 'Tiendas Destacadas'}
            </Text>
            <Text style={styles.sectionSub}>
              {selectedLevel
                ? `Mostrando ${displayedStores.length} tiendas · Toca para ver la tienda`
                : 'Toca cualquier tienda para ver su información y catálogo'}
            </Text>
          </View>
          {selectedLevel ? (
            <TouchableOpacity
              style={styles.clearFilterPill}
              activeOpacity={0.8}
              onPress={() => setSelectedFloorId(null)}
            >
              <Text style={styles.clearFilterPillText}>Ver todos los pisos</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.push('/(tabs)/directorio')}>
              <Text style={styles.seeAllText}>Directorio</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.anchorsGrid}>
          {displayedStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.anchorCard}
              activeOpacity={0.85}
              onPress={() => handleOpenStoreProfile(store.id)}
            >
              <View style={[styles.anchorLogoBox, { backgroundColor: store.bg }]}>
                <Image
                  source={typeof store.logo === 'string' ? { uri: store.logo } : store.logo}
                  style={styles.anchorLogo}
                  resizeMode="contain"
                />
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
                  <View style={styles.storeCardActionHint}>
                    <Text style={styles.storeCardActionHintText}>Ver tienda</Text>
                    <AppIcon name="chevron-forward" size={11} color="#2563EB" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        </View>
      </ScrollView>
      <AnalyticsDashboardModal
        visible={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
      />

      {/* Modal Notificaciones Oficiales */}
      <Modal
        visible={showNotificationsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotificationsModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowNotificationsModal(false)}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <View style={styles.modalHeaderIconBadge}>
                <AppIcon name="notifications" size={18} color="#2563EB" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Notificaciones del Mall</Text>
                <Text style={styles.modalSub}>Sambil Chacao · Avisos en vivo</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowNotificationsModal(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AppIcon name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notifDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.notifItemTitle}>Palacio del Blumer · 20% DCTO</Text>
                <Text style={styles.notifItemText}>
                  Oferta de reapertura disponible hoy en Nivel Autopista Local 8.
                </Text>
              </View>
            </View>

            <View style={styles.notificationItem}>
              <View style={[styles.notifDot, { backgroundColor: '#F59E0B' }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.notifItemTitle}>Club Sambil · Gana +50 Puntos</Text>
                <Text style={styles.notifItemText}>
                  Pregúntale al Concierge IA o califica tu visita para acumular saldo.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.modalPrimaryBtn}
              activeOpacity={0.88}
              onPress={() => {
                setShowNotificationsModal(false);
                router.push('/(tabs)/ofertas');
              }}
            >
              <Text style={styles.modalPrimaryBtnText}>Ver todas las ofertas</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Perfil / Club Sambil */}
      <Modal
        visible={showProfileModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowProfileModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowProfileModal(false)}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <View style={[styles.modalHeaderIconBadge, { backgroundColor: '#FEF3C7' }]}>
                <AppIcon name="person" size={18} color="#D97706" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitle}>Mi Perfil Mall OS</Text>
                <Text style={styles.modalSub}>Visitante Frecuente · Demo</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowProfileModal(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AppIcon name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileStatsBox}>
              <View style={styles.profileStatItem}>
                <Text style={styles.profileStatValue}>{loyalty.points}</Text>
                <Text style={styles.profileStatLabel}>Puntos Club</Text>
              </View>
              <View style={styles.profileStatDivider} />
              <View style={styles.profileStatItem}>
                <Text style={styles.profileStatValue}>Nivel 5</Text>
                <Text style={styles.profileStatLabel}>Pisos activos</Text>
              </View>
              <View style={styles.profileStatDivider} />
              <View style={styles.profileStatItem}>
                <Text style={styles.profileStatValue}>{kids.stars}/5</Text>
                <Text style={styles.profileStatLabel}>Estrellas Niño</Text>
              </View>
            </View>

            {/* Estado de Autenticación / Google Login */}
            <View style={styles.authProfileSection}>
              {user?.provider === 'google' ? (
                <View style={styles.authLoggedInCard}>
                  <View style={styles.authGoogleBadgeRow}>
                    <GoogleLogo size={16} />
                    <Text style={styles.authGoogleBadgeText}>Conectado con Google</Text>
                  </View>
                  <Text style={styles.authEmailText}>{user.email}</Text>
                  <TouchableOpacity
                    style={styles.signOutBtn}
                    onPress={async () => {
                      setShowProfileModal(false);
                      await signOut();
                      router.replace('/login');
                    }}
                  >
                    <Text style={styles.signOutBtnText}>Cerrar sesión</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.connectGoogleBtn}
                  activeOpacity={0.85}
                  onPress={() => {
                    setShowProfileModal(false);
                    router.push('/login');
                  }}
                >
                  <GoogleLogo size={18} />
                  <Text style={styles.connectGoogleBtnText}>Iniciar sesión con Google</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.modalPrimaryBtn}
              activeOpacity={0.88}
              onPress={() => {
                setShowProfileModal(false);
                router.push('/(tabs)/directorio');
              }}
            >
              <Text style={styles.modalPrimaryBtnText}>Explorar directorio del mall</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
  scrollContent: {
    paddingBottom: 40,
  },
  topHeaderContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#0F172A',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  mallHeroCard: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 4,
  },
  mallHeroDarkGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  mallHeroLocationBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mallHeroLocationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  mallHeroDotsPill: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandEmblemBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTextColumn: {
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: -2,
  },
  topActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  redBadgeCircle: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  redBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 46,
    borderRadius: 23,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 4,
  },
  searchPlaceholder: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  heroPromoCard: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  promoCardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  promoCardDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  promoTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  promoTagText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  promoTextContentGlass: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 58,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  promoMainTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  promoSubTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  promoDotsRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dotActive: {
    width: 16,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
  },
  dotInactive: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  bodyContainer: {
    marginTop: 0,
    backgroundColor: '#F8FAFC',
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  quickActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },
  quickActionChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 5,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  quickActionIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalHeaderIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  modalSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginTop: 4,
  },
  notifItemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },
  notifItemText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  modalPrimaryBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  modalPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  profileStatsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileStatItem: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  profileStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  profileStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  authProfileSection: {
    marginTop: 4,
    marginBottom: 4,
  },
  authLoggedInCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 4,
  },
  authGoogleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authGoogleBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  authEmailText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
  },
  signOutBtn: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingVertical: 2,
  },
  signOutBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  connectGoogleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  connectGoogleBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  featureCarouselContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 4,
  },
  featureSlideCard: {
    height: 165,
    borderRadius: 22,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    backgroundColor: '#0F172A',
  },
  kidsSlideCard: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    shadowColor: '#F59E0B',
  },
  featureCarouselDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 2,
  },
  featureDotBase: {
    height: 6,
    borderRadius: 3,
  },
  featureDotActive: {
    width: 22,
    backgroundColor: '#2563EB',
  },
  featureDotInactive: {
    width: 6,
    backgroundColor: '#CBD5E1',
  },
  conciergeTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  conciergeTagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  conciergePillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 7,
    paddingVertical: 3.5,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  conciergePillText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  mapPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 7,
    paddingVertical: 3.5,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  mapPillText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  bannerGlassInfo: {
    backgroundColor: 'rgba(15, 23, 42, 0.62)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    maxWidth: '68%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  bannerGlassTitle: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '900',
    letterSpacing: -0.2,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  bannerGlassSub: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '600',
    marginTop: 1,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  heroBanner: {
    width: '100%',
    aspectRatio: 3168 / 1344,
    borderRadius: 22,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  heroBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroTagText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  heroFloatingCTA: {
    backgroundColor: 'rgba(56, 189, 248, 0.90)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  heroCTAText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '900',
  },
  bannerTopFloatingRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  bannerBottomFloatingRow: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
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
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  levelImageWrapper: {
    width: 104,
    height: 72,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  levelImage: {
    width: '100%',
    height: '100%',
  },
  levelBadgeCircle: {
    position: 'absolute',
    top: 5,
    left: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
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
    borderRadius: 20,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  anchorLogoBox: {
    width: 76,
    height: 68,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 4,
  },
  anchorLogo: {
    width: '100%',
    height: '100%',
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
    width: '100%',
    aspectRatio: 3168 / 1344,
    borderRadius: 22,
    marginTop: 14,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  kidsBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  kidsTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 4,
  },
  kidsBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  kidsStarsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 3,
  },
  kidsStarsBadge: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  kidsActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 2,
  },
  kidsActionChipText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  kidsPrizeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    gap: 4,
  },
  kidsPrizeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2.5,
  },
  kidsRoundArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  conciergeTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    gap: 4,
  },
  conciergeTopBtnText: {
    color: '#4338CA',
    fontSize: 12,
    fontWeight: '800',
  },
  conciergeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 14,
    marginTop: 14,
    gap: 12,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  conciergeIconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  conciergeVideoThumb: {
    width: '100%',
    height: '100%',
  },
  conciergeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  liveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  conciergeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.6,
  },
  conciergeTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  conciergeSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    lineHeight: 14,
  },
  conciergeArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  levelCardSelected: {
    borderWidth: 2.5,
    backgroundColor: '#F8FAFC',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  levelSelectedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  levelSelectedBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  clearFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 4,
  },
  clearFilterChipText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
  },
  clearFilterPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  clearFilterPillText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
  },
  storeCardActionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  storeCardActionHintText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '800',
  },
});
