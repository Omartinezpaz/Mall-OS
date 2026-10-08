import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import type { MapStore } from '@mallos/map-engine';
import { AppIcon, type AppIconName } from '../../components/AppIcon';

export interface CategoryChip {
  id: string;
  label: string;
  icon: AppIconName;
  categoryKeys: string[];
}

export const SEARCH_CATEGORIES: CategoryChip[] = [
  { id: 'all', label: 'Todos', icon: 'apps', categoryKeys: [] },
  { id: 'fashion', label: 'Moda', icon: 'shirt', categoryKeys: ['fashion', 'apparel', 'shoes', 'jewelry'] },
  { id: 'food', label: 'Comida', icon: 'fast-food', categoryKeys: ['food', 'restaurant', 'cafe', 'fastfood'] },
  { id: 'finance', label: 'Bancos', icon: 'business', categoryKeys: ['finance', 'bank', 'atm'] },
  { id: 'pharmacy', label: 'Farmacias', icon: 'medkit', categoryKeys: ['pharmacy', 'health', 'beauty'] },
  { id: 'entertainment', label: 'Cines', icon: 'film', categoryKeys: ['entertainment', 'cinema', 'games'] },
  { id: 'services', label: 'Servicios', icon: 'construct', categoryKeys: ['services', 'telecom', 'optical'] },
  { id: 'tech', label: 'Tech', icon: 'hardware-chip', categoryKeys: ['tech', 'electronics', 'computers'] },
  { id: 'home', label: 'Hogar', icon: 'home', categoryKeys: ['home', 'decor', 'department_store'] },
];

interface MapSearchBarProps {
  stores: MapStore[];
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onSelectStore: (storeId: string) => void;
  currentFloorId?: string;
}

export function MapSearchBar({
  stores,
  activeCategory,
  onSelectCategory,
  onSelectStore,
  currentFloorId,
}: MapSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Normalizador de búsqueda
  const normalize = (t: string) =>
    t
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Resultados de búsqueda
  const searchResults = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];

    return stores
      .filter((s) => {
        const nameMatch = normalize(s.name).includes(q);
        const catMatch = normalize(s.category).includes(q);
        const slugMatch = s.slug ? normalize(s.slug).includes(q) : false;
        const aliasMatch = s.aliases?.some((a) => normalize(a).includes(q)) ?? false;
        return nameMatch || catMatch || slugMatch || aliasMatch;
      })
      .slice(0, 10);
  }, [stores, query]);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const handleSelectResult = useCallback(
    (storeId: string) => {
      setQuery('');
      setIsFocused(false);
      onSelectStore(storeId);
    },
    [onSelectStore]
  );

  const getFloorName = (floorId: string) => {
    if (floorId === 'floor-autopista' || floorId === 'floor_1') return 'P1 · Autopista';
    if (floorId === 'floor-acuario' || floorId === 'floor_2') return 'P2 · Acuario';
    if (floorId === 'floor-libertador' || floorId === 'floor_3') return 'P3 · Libertador';
    if (floorId === 'floor-feria' || floorId === 'floor_4') return 'P4 · Feria';
    if (floorId === 'floor-diversion' || floorId === 'floor_5') return 'P5 · Diversión';
    return 'Piso actual';
  };

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      {/* Input de Búsqueda Flotante */}
      <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
        <AppIcon name="search" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar tienda, banco, café o producto..."
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Breve delay para permitir el click en resultados
            setTimeout(() => setIsFocused(false), 250);
          }}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn} activeOpacity={0.7}>
            <AppIcon name="close" size={14} color="#64748B" strokeWidth={2.5} />
          </TouchableOpacity>
        )}
      </View>

      {/* Chips horizontales de categoría */}
      <View style={styles.chipsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          {SEARCH_CATEGORIES.map((cat) => {
            const isSelected =
              cat.id === 'all'
                ? activeCategory === null
                : activeCategory === cat.id;

            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => {
                  onSelectCategory(cat.id === 'all' ? null : cat.id);
                }}
                activeOpacity={0.8}
              >
                <AppIcon
                  name={cat.icon}
                  size={15}
                  color={isSelected ? '#FFFFFF' : '#334155'}
                  style={styles.chipIcon}
                />
                <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Dropdown de Resultados de Búsqueda */}
      {query.trim().length > 0 && searchResults.length > 0 && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isCurrentFloor = item.floorId === currentFloorId;
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleSelectResult(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.resultIconBox}>
                    <AppIcon name="storefront" size={17} color="#2563EB" />
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.resultSub}>
                      {getFloorName(item.floorId)} {isCurrentFloor ? '· (Piso actual)' : ''}
                    </Text>
                  </View>
                  <View style={styles.resultArrowBox}>
                    <AppIcon name="chevron-forward" size={16} color="#2563EB" strokeWidth={2.5} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}



      {query.trim().length > 0 && searchResults.length === 0 && (
        <View style={styles.dropdownContainer}>
          <View style={styles.noResultsBox}>
            <Text style={styles.noResultsText}>No se encontraron locales para "{query}"</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingTop: 8,
    zIndex: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  searchBarFocused: {
    borderColor: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    padding: 0,
  },
  clearBtn: {
    padding: 4,
    marginLeft: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  chipsContainer: {
    marginTop: 8,
  },
  chipsScroll: {
    paddingRight: 10,
    gap: 6,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  chipSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#1D4ED8',
  },
  chipIcon: {
    marginRight: 5,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  chipLabelSelected: {
    color: '#FFFFFF',
  },
  dropdownContainer: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: 220,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  resultIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  resultIcon: {
    fontSize: 16,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  resultSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  resultArrowBox: {
    paddingLeft: 8,
  },
  resultArrow: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  noResultsBox: {
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
});
