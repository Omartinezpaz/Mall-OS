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
import { AppIcon } from '../../components/AppIcon';
import { MallOsSpriteIcon, type MallOsIconId } from '../../components/MallOsSpriteIcon';

export interface CategoryChip {
  id: string;
  label: string;
  icon: MallOsIconId | string;
  categoryKeys: string[];
  accentColor: string;
  pastelBg: string;
}

export const SEARCH_CATEGORIES: CategoryChip[] = [
  { id: 'all', label: 'Todos', icon: 'categorias', categoryKeys: [], accentColor: '#E11D48', pastelBg: '#FFE4E6' }, // Rojo
  { id: 'food', label: 'Comida', icon: 'restaurantes', categoryKeys: ['food', 'restaurant', 'cafe', 'fastfood'], accentColor: '#10B981', pastelBg: '#D1FAE5' }, // Verde Yummy
  { id: 'fashion', label: 'Moda', icon: 'moda', categoryKeys: ['fashion', 'apparel', 'shoes', 'jewelry'], accentColor: '#E11D48', pastelBg: '#FFE4E6' }, // Rojo
  { id: 'tech', label: 'Tech', icon: 'tecnologia', categoryKeys: ['tech', 'electronics', 'computers'], accentColor: '#2563EB', pastelBg: '#DBEAFE' }, // Azul
  { id: 'finance', label: 'Bancos', icon: 'finanzas', categoryKeys: ['finance', 'bank', 'atm'], accentColor: '#D97706', pastelBg: '#FEF3C7' }, // Oro
  { id: 'pharmacy', label: 'Farmacias', icon: 'salud', categoryKeys: ['pharmacy', 'health', 'beauty'], accentColor: '#10B981', pastelBg: '#D1FAE5' }, // Verde Yummy
  { id: 'entertainment', label: 'Cines', icon: 'entretenimiento', categoryKeys: ['entertainment', 'cinema', 'games'], accentColor: '#2563EB', pastelBg: '#DBEAFE' }, // Azul
  { id: 'home', label: 'Hogar', icon: 'hogar', categoryKeys: ['home', 'decor', 'department_store'], accentColor: '#D97706', pastelBg: '#FEF3C7' }, // Oro
  { id: 'services', label: 'Servicios', icon: 'servicios', categoryKeys: ['services', 'telecom', 'optical'], accentColor: '#10B981', pastelBg: '#D1FAE5' }, // Verde Yummy
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
      {/* Input de Búsqueda Flotante tipo Glassmorphism Cyber-Dark */}
      <View style={[styles.searchBar, isFocused && styles.searchBarFocused]}>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
          <AppIcon name="home" size={18} color="#10B981" strokeWidth={2.2} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="¿A dónde quieres ir?"
          placeholderTextColor="#64748B"
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 250);
          }}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {query.length > 0 ? (
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn} activeOpacity={0.7}>
            <AppIcon name="close" size={14} color="#94A3B8" strokeWidth={2.5} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.searchActionBtn} activeOpacity={0.85}>
            <AppIcon name="search" size={15} color="#FFFFFF" strokeWidth={2.5} />
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
                style={[
                  styles.chip,
                  { backgroundColor: isSelected ? cat.accentColor : '#FFFFFF' },
                  isSelected
                    ? { borderColor: cat.accentColor, shadowColor: cat.accentColor }
                    : { borderColor: '#E2E8F0' },
                ]}
                onPress={() => {
                  onSelectCategory(cat.id === 'all' ? null : cat.id);
                }}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.chipIconBox,
                    {
                      backgroundColor: isSelected
                        ? 'rgba(255, 255, 255, 0.25)'
                        : cat.pastelBg,
                    },
                  ]}
                >
                  <MallOsSpriteIcon
                    name={cat.icon}
                    size={15}
                    showCircle={false}
                    color={isSelected ? '#FFFFFF' : cat.accentColor}
                  />
                </View>
                <Text
                  style={[
                    styles.chipLabel,
                    isSelected ? styles.chipLabelSelected : { color: '#1E293B' },
                  ]}
                >
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
                    <MallOsSpriteIcon name={item.category || 'otros'} size={18} showCircle={false} color="#2563EB" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    paddingLeft: 10,
    paddingRight: 6,
    paddingVertical: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  searchBarFocused: {
    borderColor: '#E11D48',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.14,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#ECFDF5', // Verde pastel suave estilo Yummy
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1.2,
    borderColor: '#A7F3D0',
  },
  searchActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#E11D48', // Carmesí / Rojo vivo
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
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
    marginRight: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    width: 24,
    height: 24,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingLeft: 5,
    paddingRight: 12,
    paddingVertical: 5,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    gap: 6,
  },
  chipIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  chipLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  dropdownContainer: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    maxHeight: 220,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
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
