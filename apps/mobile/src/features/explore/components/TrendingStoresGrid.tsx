import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';
import { MallOsSpriteIcon } from '../../../components/MallOsSpriteIcon';

export interface DirectoryStoreItem {
  id: string;
  name: string;
  categoryKeys: string[];
  categoryLabel: string;
  floorLabel: string;
  badge?: string;
  bgColor: string;
  accentColor: string;
  logo: any;
}

export const DIRECTORY_STORES: DirectoryStoreItem[] = [
  {
    id: 'local_farmatodo',
    name: 'Farmatodo',
    categoryKeys: ['pharmacy', 'services'],
    categoryLabel: 'Farmacia & Belleza',
    floorLabel: 'PISO AUTOPISTA',
    badge: '2x1 Promo',
    bgColor: '#F0FDF4',
    accentColor: '#16A34A',
    logo: require('../../../../assets/stores/logo_farmatodo.png'),
  },
  {
    id: 'st_pb_01',
    name: 'ZARA',
    categoryKeys: ['fashion'],
    categoryLabel: 'Moda Internacional',
    floorLabel: 'PISO AUTOPISTA',
    badge: '30% OFF',
    bgColor: '#EFF6FF',
    accentColor: '#2563EB',
    logo: require('../../../../assets/stores/logo_zara.png'),
  },
  {
    id: 'st_pb_02',
    name: 'Nike Store',
    categoryKeys: ['fashion'],
    categoryLabel: 'Sportswear & Calzado',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Nuevo',
    bgColor: '#FFFBEB',
    accentColor: '#D97706',
    logo: require('../../../../assets/stores/logo_nike.jpg'),
  },
  {
    id: 'local_cines_unidos',
    name: 'Cines Unidos',
    categoryKeys: ['entertainment'],
    categoryLabel: 'Cines & Cartelera',
    floorLabel: 'PISO DIVERSIÓN',
    badge: 'Cartelera',
    bgColor: '#FAF5FF',
    accentColor: '#9333EA',
    logo: require('../../../../assets/stores/logo_cines_unidos.jpg'),
  },
  {
    id: 'local_4',
    name: 'Tiendas Tijerazo',
    categoryKeys: ['fashion', 'home'],
    categoryLabel: 'Tienda por Dept.',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Destacado',
    bgColor: '#FEF2F2',
    accentColor: '#DC2626',
    logo: require('../../../../assets/stores/logo_tijerazo.jpg'),
  },
  {
    id: 'local_bnc',
    name: 'Banco Nac. de Crédito',
    categoryKeys: ['finance', 'services'],
    categoryLabel: 'Banca & Servicios',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Cajeros',
    bgColor: '#ECFDF5',
    accentColor: '#059669',
    logo: require('../../../../assets/stores/logo_bnc.jpg'),
  },
  {
    id: 'local_9',
    name: 'Bath & Body Works',
    categoryKeys: ['pharmacy', 'services'],
    categoryLabel: 'Fragancias & Cuidado',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Exclusivo',
    bgColor: '#F0F9FF',
    accentColor: '#0284C7',
    logo: require('../../../../assets/stores/logo_bath_body_works.png'),
  },
  {
    id: 'local_77',
    name: 'Banco Provincial',
    categoryKeys: ['finance', 'services'],
    categoryLabel: 'Banca & Servicios',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Agencia',
    bgColor: '#EFF6FF',
    accentColor: '#1D4ED8',
    logo: require('../../../../assets/stores/logo_provincial.jpg'),
  },
  {
    id: 'local_18',
    name: 'Banco del Tesoro',
    categoryKeys: ['finance', 'services'],
    categoryLabel: 'Banca & Taquilla',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Taquilla',
    bgColor: '#FEF3C7',
    accentColor: '#B45309',
    logo: require('../../../../assets/stores/logo_banco_tesoro.jpeg'),
  },
  {
    id: 'local_8',
    name: 'Palacio del Blumer',
    categoryKeys: ['fashion'],
    categoryLabel: 'Lencería & Ropa Íntima',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Tendencia',
    bgColor: '#FFF1F2',
    accentColor: '#E11D48',
    logo: require('../../../../assets/stores/logo_palacio_del_blumer.png'),
  },
  {
    id: 'local_1',
    name: 'Liah Spa',
    categoryKeys: ['services', 'pharmacy'],
    categoryLabel: 'Estética & Bienestar',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Spa VIP',
    bgColor: '#F5F3FF',
    accentColor: '#8B5CF6',
    logo: require('../../../../assets/stores/logo_liah_spa.png'),
  },
  {
    id: 'local_10',
    name: 'Sansa',
    categoryKeys: ['fashion'],
    categoryLabel: 'Calzado & Moda',
    floorLabel: 'PISO AUTOPISTA',
    badge: 'Colección',
    bgColor: '#FFF7ED',
    accentColor: '#EA580C',
    logo: require('../../../../assets/stores/logo_sansa.jpg'),
  },
];

interface TrendingStoresGridProps {
  selectedCategory?: string;
  searchQuery?: string;
  onSelectStore: (storeId: string) => void;
  onClearCategoryFilter?: () => void;
}

export const TrendingStoresGrid: React.FC<TrendingStoresGridProps> = ({
  selectedCategory,
  searchQuery,
  onSelectStore,
  onClearCategoryFilter,
}) => {
  const filteredStores = useMemo(() => {
    let list = DIRECTORY_STORES;

    if (selectedCategory) {
      list = list.filter((s) => s.categoryKeys.includes(selectedCategory));
    }

    if (searchQuery && searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.categoryLabel.toLowerCase().includes(q) ||
          s.floorLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <MallOsSpriteIcon name="destacados" size={16} showCircle={false} color="#2563EB" />
          <Text style={styles.sectionTitle}>Directorio</Text>
        </View>
        <Text style={styles.sectionSub}>LOCALES Y SERVICIOS</Text>
      </View>

      {selectedCategory && (
        <View style={styles.filterChipRow}>
          <Text style={styles.filterChipText}>
            Filtrado por categoría ({filteredStores.length} {filteredStores.length === 1 ? 'local' : 'locales'})
          </Text>
          {onClearCategoryFilter && (
            <TouchableOpacity onPress={onClearCategoryFilter} style={styles.clearFilterBtn} hitSlop={8}>
              <Text style={styles.clearFilterText}>Ver todos</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {filteredStores.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🏪</Text>
          <Text style={styles.emptyTitle}>No hay locales con este filtro</Text>
          {onClearCategoryFilter && (
            <TouchableOpacity onPress={onClearCategoryFilter} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Mostrar todos los locales</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.grid}>
          {filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.card}
              onPress={() => onSelectStore(store.id)}
              activeOpacity={0.8}
            >
              {/* Top row: Store Official Logo on left + Badge on right */}
              <View style={styles.cardTopRow}>
                <View style={styles.storeLogoBox}>
                  <Image source={store.logo} style={styles.storeLogo} resizeMode="contain" />
                </View>

                {store.badge ? (
                  <View style={[styles.badgePill, { backgroundColor: store.bgColor }]}>
                    <Text style={[styles.badgePillText, { color: store.accentColor }]}>
                      {store.badge}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Store Title & Category */}
              <View style={styles.cardContent}>
                <Text style={styles.storeName} numberOfLines={1}>
                  {store.name}
                </Text>
                <Text style={styles.categoryLabel} numberOfLines={1}>
                  {store.categoryLabel}
                </Text>
              </View>

              {/* Footer row: Location on left + Arrow on right */}
              <View style={styles.footerRow}>
                <View style={styles.floorRow}>
                  <MallOsSpriteIcon name="ubicacion" size={11} showCircle={false} color="#94A3B8" />
                  <Text style={styles.floorText} numberOfLines={1}>
                    {store.floorLabel}
                  </Text>
                </View>
                <AppIcon name="chevron-forward" size={14} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 12,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSub: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  filterChipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  filterChipText: {
    fontSize: 12,
    color: '#1D4ED8',
    fontWeight: '700',
  },
  clearFilterBtn: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  clearFilterText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '800',
    textDecorationLine: 'underline',
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
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: 'space-between',
    minHeight: 145,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  storeLogoBox: {
    width: 58,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  storeLogo: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  cardContent: {
    marginBottom: 10,
  },
  storeName: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  categoryLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  floorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  floorText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
  },
  resetBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  resetBtnText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 12,
  },
});
