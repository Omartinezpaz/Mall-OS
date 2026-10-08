import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { MapStore } from '@mallos/map-engine';

interface TrendingStoreItem {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  floorLabel: string;
  badge?: string;
  bgColor: string;
  accentColor: string;
}

const TRENDING_STORES: TrendingStoreItem[] = [
  {
    id: 'st_pb_01',
    name: 'ZARA',
    category: 'fashion',
    categoryLabel: 'Moda',
    floorLabel: 'Nivel Autopista',
    badge: '30% OFF',
    bgColor: '#EFF6FF',
    accentColor: '#2563EB',
  },
  {
    id: 'local_farmatodo',
    name: 'Farmatodo',
    category: 'pharmacy',
    categoryLabel: 'Farmacia',
    floorLabel: 'Nivel Autopista',
    badge: '2x1 Promo',
    bgColor: '#F0FDF4',
    accentColor: '#16A34A',
  },
  {
    id: 'st_pb_02',
    name: 'Nike Store',
    category: 'fashion',
    categoryLabel: 'Sportswear',
    floorLabel: 'Nivel Autopista',
    badge: 'Nuevo',
    bgColor: '#FFFBEB',
    accentColor: '#D97706',
  },
  {
    id: 'local_cines_unidos',
    name: 'Cines Unidos',
    category: 'entertainment',
    categoryLabel: 'Cines',
    floorLabel: 'Nivel Diversión',
    badge: 'Cartelera',
    bgColor: '#FAF5FF',
    accentColor: '#9333EA',
  },
  {
    id: 'local_4',
    name: 'Tiendas Tijerazo',
    category: 'fashion',
    categoryLabel: 'Tienda por Dept.',
    floorLabel: 'Nivel Autopista',
    badge: 'Favorito',
    bgColor: '#FEF2F2',
    accentColor: '#DC2626',
  },
  {
    id: 'local_bnc',
    name: 'Banco Nac. de Crédito',
    category: 'finance',
    categoryLabel: 'Banca',
    floorLabel: 'Nivel Autopista',
    bgColor: '#ECFDF5',
    accentColor: '#059669',
  },
];

interface TrendingStoresGridProps {
  onSelectStore: (storeId: string) => void;
}

export const TrendingStoresGrid: React.FC<TrendingStoresGridProps> = ({
  onSelectStore,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.trendIcon}>📈</Text>
          <Text style={styles.sectionTitle}>Tendencias en el Sambil</Text>
        </View>
        <Text style={styles.sectionSub}>Las más visitadas hoy</Text>
      </View>

      <View style={styles.grid}>
        {TRENDING_STORES.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.card}
            onPress={() => onSelectStore(store.id)}
            activeOpacity={0.8}
          >
            {/* Store Top Banner Placeholder */}
            <View style={[styles.cardBanner, { backgroundColor: store.bgColor }]}>
              {store.badge && (
                <View style={[styles.badgePill, { backgroundColor: store.accentColor }]}>
                  <Text style={styles.badgePillText}>{store.badge}</Text>
                </View>
              )}
              <View style={[styles.initialsCircle, { backgroundColor: '#FFFFFF', borderColor: store.accentColor }]}>
                <Text style={[styles.initialsText, { color: store.accentColor }]}>
                  {store.name.slice(0, 2).toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Store Info */}
            <View style={styles.cardBody}>
              <Text style={styles.storeName} numberOfLines={1}>
                {store.name}
              </Text>
              <Text style={styles.categoryLabel}>
                {store.categoryLabel}
              </Text>

              <View style={styles.footerRow}>
                <View style={styles.floorRow}>
                  <Ionicons name="location-outline" size={11} color="#94A3B8" />
                  <Text style={styles.floorText} numberOfLines={1}>
                    {store.floorLabel}
                  </Text>
                </View>
                <View style={styles.arrowCircle}>
                  <Ionicons name="arrow-forward" size={11} color="#2563EB" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 12,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendIcon: {
    fontSize: 16,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardBanner: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgePill: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  badgePillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  initialsText: {
    fontSize: 14,
    fontWeight: '900',
  },
  cardBody: {
    padding: 10,
  },
  storeName: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  categoryLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  floorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  floorText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
  },
  arrowCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
