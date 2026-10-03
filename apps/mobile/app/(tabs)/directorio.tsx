import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { PILOT_STORES, filterStores } from '../../src/features/directory';
import { CategoryIcon } from '../../src/components/CategoryIcon';
import { OFFICIAL_CATEGORIES } from '@mallos/design-tokens';

const FEATURED_STORES = [
  {
    id: 'st_pb_02',
    name: 'Nike',
    category: 'Moda · Sneakers · Sportswear',
    location: 'Nivel 1 · 180 m',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
    logo: '👟',
  },
  {
    id: 'st_pb_01',
    name: 'ZARA',
    category: 'Moda · Tendencias',
    location: 'Nivel 1 · 250 m',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    logo: '👗',
  },
  {
    id: 'st_pb_03',
    name: 'Apple Store',
    category: 'Tecnología · Gadgets',
    location: 'Nivel 1 · 120 m',
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
    logo: '🍎',
  },
];

export default function ExplorarScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedFloor, setSelectedFloor] = useState<number | undefined>();

  const filteredStores = useMemo(() => {
    return filterStores(PILOT_STORES, search, selectedCategory, selectedFloor);
  }, [search, selectedCategory, selectedFloor]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      {/* Top Header & Search */}
      <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>Explorar</Text>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="11" cy="11" r="8" />
            <Path d="M21 21l-4.35-4.35" />
          </Svg>
          <TextInput
            placeholder="Buscar tiendas, restaurantes..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            clearButtonMode="while-editing"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={10}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pill Filters (Matching Screen 3 Prototype) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedCategory === undefined && styles.filterPillActive,
            ]}
            onPress={() => setSelectedCategory(undefined)}
          >
            <Text
              style={[
                styles.filterPillText,
                selectedCategory === undefined && styles.filterPillTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>
          {OFFICIAL_CATEGORIES.slice(0, 5).map((cat) => (
            <TouchableOpacity
              key={cat.slug}
              style={[
                styles.filterPill,
                selectedCategory === cat.slug && styles.filterPillActive,
              ]}
              onPress={() =>
                setSelectedCategory(selectedCategory === cat.slug ? undefined : cat.slug)
              }
            >
              <Text
                style={[
                  styles.filterPillText,
                  selectedCategory === cat.slug && styles.filterPillTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tiendas Destacadas Section */}
        {!search && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tiendas destacadas</Text>
              <TouchableOpacity onPress={() => setSelectedCategory('moda')}>
                <Text style={styles.sectionLink}>Ver todas</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScroll}
            >
              {FEATURED_STORES.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  style={styles.featuredCard}
                  activeOpacity={0.88}
                  onPress={() => router.push(`/local/${store.id}`)}
                >
                  <Image source={{ uri: store.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay} />

                  {/* Brand Logo / Badge */}
                  <View style={styles.brandBadge}>
                    <Text style={styles.brandBadgeIcon}>{store.logo}</Text>
                  </View>

                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredName}>{store.name}</Text>
                    <Text style={styles.featuredLocation}>{store.location}</Text>
                    <View style={styles.discountPill}>
                      <Text style={styles.discountPillText}>{store.discount}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categorías 2x2 Official Grid */}
        {!search && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categorías</Text>
              <TouchableOpacity onPress={() => setSelectedCategory(undefined)}>
                <Text style={styles.sectionLink}>Ver todas</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoriesGrid}>
              {OFFICIAL_CATEGORIES.slice(0, 4).map((cat) => (
                <TouchableOpacity
                  key={cat.slug}
                  style={styles.categoryCard}
                  activeOpacity={0.85}
                  onPress={() =>
                    setSelectedCategory(selectedCategory === cat.slug ? undefined : cat.slug)
                  }
                >
                  <CategoryIcon slug={cat.slug} size={48} bgColor="#4F46E5" />
                  <View style={styles.catCardTextWrap}>
                    <Text style={styles.categoryCardName}>{cat.name}</Text>
                    <Text style={styles.categoryCardCount}>{cat.countLabel}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Directory Store List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {search ? 'Resultados de búsqueda' : 'Directorio de tiendas'}
            </Text>
            <Text style={styles.storeCount}>{filteredStores.length} locales</Text>
          </View>

          {/* Floor filters */}
          <View style={styles.floorFilterRow}>
            <TouchableOpacity
              style={[styles.floorChip, selectedFloor === undefined && styles.floorChipActive]}
              onPress={() => setSelectedFloor(undefined)}
            >
              <Text
                style={[
                  styles.floorChipText,
                  selectedFloor === undefined && styles.floorChipTextActive,
                ]}
              >
                Todos los niveles
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.floorChip, selectedFloor === 0 && styles.floorChipActive]}
              onPress={() => setSelectedFloor(selectedFloor === 0 ? undefined : 0)}
            >
              <Text
                style={[
                  styles.floorChipText,
                  selectedFloor === 0 && styles.floorChipTextActive,
                ]}
              >
                Planta Baja (PB)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.floorChip, selectedFloor === 1 && styles.floorChipActive]}
              onPress={() => setSelectedFloor(selectedFloor === 1 ? undefined : 1)}
            >
              <Text
                style={[
                  styles.floorChipText,
                  selectedFloor === 1 && styles.floorChipTextActive,
                ]}
              >
                Nivel 1
              </Text>
            </TouchableOpacity>
          </View>

          {/* Store Cards */}
          <View style={styles.storesList}>
            {filteredStores.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🔎</Text>
                <Text style={styles.emptyTitle}>No encontramos resultados</Text>
                <Text style={styles.emptySubtitle}>Prueba con otro término o borra los filtros.</Text>
              </View>
            ) : (
              filteredStores.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  style={styles.storeCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/local/${store.id}`)}
                >
                  <View style={styles.storeInfo}>
                    <View style={styles.storeTitleRow}>
                      <Text style={styles.storeName}>{store.name}</Text>
                      {store.hasActiveOffers && (
                        <View style={styles.offerBadge}>
                          <Text style={styles.offerBadgeText}>20% OFF</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.storeCategory}>{store.category}</Text>
                    <Text style={styles.storeDescription} numberOfLines={2}>
                      {store.description}
                    </Text>
                    <View style={styles.storeFooter}>
                      <View style={styles.unitPill}>
                        <Text style={styles.unitText}>
                          Nivel {store.floor === 0 ? 'PB' : store.floor} · {store.unit}
                        </Text>
                      </View>
                      <View style={styles.storeFooterActions}>
                        <TouchableOpacity
                          style={styles.locateBtn}
                          onPress={(e) => {
                            e.stopPropagation();
                            router.push('/(tabs)/mapa');
                          }}
                        >
                          <Text style={styles.locateBtnText}>🧭 Ubicar</Text>
                        </TouchableOpacity>
                        <Text style={styles.viewDetailText}>Ver local →</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerSection: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  pageTitle: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: '#0F172A',
    fontSize: 14,
    paddingVertical: 10,
  },
  clearIcon: {
    color: '#94A3B8',
    fontSize: 14,
    padding: 4,
  },
  filterPillsScroll: {
    gap: 8,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  filterPillText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionLink: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  storeCount: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredScroll: {
    gap: 14,
    paddingRight: 18,
  },
  featuredCard: {
    width: 200,
    height: 180,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    position: 'relative',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  brandBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  brandBadgeIcon: {
    fontSize: 18,
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    gap: 2,
  },
  featuredName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  featuredLocation: {
    color: '#CBD5E1',
    fontSize: 12,
    marginBottom: 4,
  },
  discountPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    alignItems: 'flex-start',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  catCardTextWrap: {
    gap: 2,
  },
  categoryCardName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
  categoryCardCount: {
    color: '#64748B',
    fontSize: 12,
  },
  floorFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  floorChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  floorChipActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  floorChipText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  floorChipTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  storesList: {
    gap: 12,
    paddingBottom: 40,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  storeInfo: {
    gap: 6,
  },
  storeTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    flex: 1,
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  offerBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  offerBadgeText: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  storeCategory: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '600',
  },
  storeDescription: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
  },
  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  unitPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unitText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '600',
  },
  storeFooterActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locateBtn: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locateBtnText: {
    color: '#0284C7',
    fontSize: 11,
    fontWeight: '700',
  },
  viewDetailText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 36,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#64748B',
    fontSize: 13,
  },
});
