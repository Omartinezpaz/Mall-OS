import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { ExploreHeader } from '../../src/features/explore/components/ExploreHeader';
import { WelcomeHeroCard } from '../../src/features/explore/components/WelcomeHeroCard';
import { CategoryVisualGrid } from '../../src/features/explore/components/CategoryVisualGrid';
import { DealsNearYouCarousel, type DealItem } from '../../src/features/explore/components/DealsNearYouCarousel';
import { TrendingStoresGrid } from '../../src/features/explore/components/TrendingStoresGrid';
import { useLoyaltyStore } from '../../src/features/loyalty/useLoyaltyStore';
import { DEMO_SAMBIL_OFFERS, sambilMall } from '@mallos/map-engine';

export default function ExplorarScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 20);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [refreshing, setRefreshing] = useState(false);

  const loyalty = useLoyaltyStore();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }, []);

  // Ofertas enriquecidas con metadatos del mall
  const dealsData: DealItem[] = useMemo(() => {
    return DEMO_SAMBIL_OFFERS.map((offer) => {
      const store = sambilMall.stores.find((s) => s.id === offer.storeId);
      return {
        ...offer,
        storeName: store?.name ?? 'Tienda Destacada',
        floorLabel: 'Nivel Autopista',
        distanceMeters: Math.floor(Math.random() * 80) + 25,
        category: store?.category ?? 'fashion',
      };
    });
  }, []);

  // Navegar a mapa con tienda seleccionada (guía paso a paso)
  const handleGuideToStore = useCallback(
    (storeId: string) => {
      router.push({
        pathname: '/(tabs)/mapa',
        params: { storeId },
      });
    },
    [router]
  );

  // Navegar a perfil de la tienda con fachada y catálogo
  const handleOpenStoreProfile = useCallback(
    (storeId: string) => {
      router.push({
        pathname: '/local/[id]',
        params: { id: storeId },
      });
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Header Superior: Ubicación & Recompensas */}
      <View style={{ paddingTop: topSafe }}>
        <ExploreHeader
          mallName="Mall Demo"
          points={loyalty.points}
          userLevel={loyalty.userLevel}
          levelName={loyalty.levelName}
          onPointsPress={() => {}}
        />

        {/* Barra de Búsqueda Flotante (Yummy Style) */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Circle cx="11" cy="11" r="8" />
              <Path d="M21 21l-4.35-4.35" />
            </Svg>
            <TextInput
              placeholder="¿Qué buscas hoy en el mall?"
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              clearButtonMode="while-editing"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} hitSlop={8}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Circle cx="12" cy="12" r="10" />
                  <Path d="M15 9l-6 6M9 9l6 6" />
                </Svg>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563EB" />
        }
      >
        {/* 1. Hero Card: Recompensa de Bienvenida y Desafío de Visitas */}
        <WelcomeHeroCard
          visitsCount={loyalty.visitsCount}
          visitsTarget={loyalty.visitsTarget}
          onPressCTA={() => handleOpenStoreProfile('st_pb_01')}
        />

        {/* 2. Grid Visual de Categorías (Iconos Grandes + Fondos) */}
        <CategoryVisualGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory((prev) => (prev === cat ? undefined : cat));
          }}
        />

        {/* 3. Carrusel: Ofertas cerca de ti */}
        <DealsNearYouCarousel
          deals={dealsData}
          onGuideToStore={handleGuideToStore}
        />

        {/* 4. Grid 2 Columnas: Directorio oficial con logos y fachadas */}
        <TrendingStoresGrid
          selectedCategory={selectedCategory}
          searchQuery={search}
          onSelectStore={handleOpenStoreProfile}
          onClearCategoryFilter={() => setSelectedCategory(undefined)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 0,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
