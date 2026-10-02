import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PILOT_STORES, filterStores, getCategories } from '../../src/features/directory';

export default function DirectorioScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedFloor, setSelectedFloor] = useState<number | undefined>();

  const categories = useMemo(() => getCategories(), []);

  const filteredStores = useMemo(() => {
    return filterStores(PILOT_STORES, search, selectedCategory, selectedFloor);
  }, [search, selectedCategory, selectedFloor]);

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Buscar por nombre, rubro o local..."
            placeholderTextColor="#64748B"
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

        {/* Filtro de Pisos */}
        <View style={styles.floorFilterRow}>
          <TouchableOpacity
            style={[styles.floorChip, selectedFloor === undefined && styles.floorChipActive]}
            onPress={() => setSelectedFloor(undefined)}
          >
            <Text
              style={[styles.floorChipText, selectedFloor === undefined && styles.floorChipTextActive]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floorChip, selectedFloor === 0 && styles.floorChipActive]}
            onPress={() => setSelectedFloor(selectedFloor === 0 ? undefined : 0)}
          >
            <Text
              style={[styles.floorChipText, selectedFloor === 0 && styles.floorChipTextActive]}
            >
              Planta Baja (PB)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.floorChip, selectedFloor === 1 && styles.floorChipActive]}
            onPress={() => setSelectedFloor(selectedFloor === 1 ? undefined : 1)}
          >
            <Text
              style={[styles.floorChipText, selectedFloor === 1 && styles.floorChipTextActive]}
            >
              Piso 1 (P1)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Carrusel de Categorías */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === undefined && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(undefined)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === undefined && styles.categoryChipTextActive,
              ]}
            >
              Todas ({PILOT_STORES.length})
            </Text>
          </TouchableOpacity>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <TouchableOpacity
                key={cat.slug}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(isActive ? undefined : cat.slug)}
              >
                <Text
                  style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}
                >
                  {cat.name} ({cat.count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista de Tiendas */}
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔎</Text>
            <Text style={styles.emptyTitle}>No encontramos resultados</Text>
            <Text style={styles.emptySubtitle}>
              Prueba con otro término o borra los filtros aplicados.
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSearch('');
                setSelectedCategory(undefined);
                setSelectedFloor(undefined);
              }}
            >
              <Text style={styles.resetButtonText}>Limpiar filtros</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storeCard}
            activeOpacity={0.7}
            onPress={() => router.push(`/local/${item.id}`)}
          >
            <View style={styles.storeInfo}>
              <View style={styles.storeTitleRow}>
                <Text style={styles.storeName}>{item.name}</Text>
                {item.hasActiveOffers && (
                  <View style={styles.offerBadge}>
                    <Text style={styles.offerBadgeText}>🏷️ OFERTA</Text>
                  </View>
                )}
              </View>
              <Text style={styles.storeCategory}>{item.category}</Text>
              <Text style={styles.storeDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.storeFooter}>
                <View style={styles.unitPill}>
                  <Text style={styles.unitText}>
                    Piso {item.floor === 0 ? 'PB' : `P${item.floor}`} · {item.unit}
                  </Text>
                </View>
                <Text style={styles.viewDetailText}>Ver local →</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    paddingVertical: 10,
  },
  clearIcon: {
    color: '#94A3B8',
    fontSize: 14,
    padding: 4,
  },
  floorFilterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  floorChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  floorChipActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  floorChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  floorChipTextActive: {
    color: '#0F172A',
  },
  categoryScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoryChipActive: {
    backgroundColor: '#334155',
    borderColor: '#10B981',
  },
  categoryChipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#34D399',
    fontWeight: '700',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  storeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
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
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  offerBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  offerBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  storeCategory: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  storeDescription: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  unitPill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unitText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
  viewDetailText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 12,
    backgroundColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
});
