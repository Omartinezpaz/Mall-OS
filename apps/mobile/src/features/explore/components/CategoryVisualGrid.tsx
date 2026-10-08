import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MallOsSpriteIcon, type MallOsIconId } from '../../../components/MallOsSpriteIcon';

export interface VisualCategory {
  id: string;
  name: string;
  icon: MallOsIconId;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  categoryKey: string;
}

const VISUAL_CATEGORIES: VisualCategory[] = [
  {
    id: 'cat_fashion',
    name: 'Moda',
    icon: 'moda',
    iconColor: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    categoryKey: 'fashion',
  },
  {
    id: 'cat_food',
    name: 'Comida',
    icon: 'restaurantes',
    iconColor: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    categoryKey: 'food',
  },
  {
    id: 'cat_banks',
    name: 'Bancos',
    icon: 'finanzas',
    iconColor: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    categoryKey: 'finance',
  },
  {
    id: 'cat_pharmacy',
    name: 'Farmacia',
    icon: 'salud',
    iconColor: '#16A34A',
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    categoryKey: 'pharmacy',
  },
  {
    id: 'cat_cinema',
    name: 'Cines',
    icon: 'entretenimiento',
    iconColor: '#9333EA',
    bgColor: '#FAF5FF',
    borderColor: '#E9D5FF',
    categoryKey: 'entertainment',
  },
  {
    id: 'cat_tech',
    name: 'Tecnología',
    icon: 'tecnologia',
    iconColor: '#0284C7',
    bgColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    categoryKey: 'electronics',
  },
  {
    id: 'cat_home',
    name: 'Hogar',
    icon: 'hogar',
    iconColor: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    categoryKey: 'home',
  },
  {
    id: 'cat_services',
    name: 'Servicios',
    icon: 'servicios',
    iconColor: '#475569',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    categoryKey: 'services',
  },
];

interface CategoryVisualGridProps {
  selectedCategory?: string;
  onSelectCategory: (categoryKey: string) => void;
}

export const CategoryVisualGrid: React.FC<CategoryVisualGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <Text style={styles.sectionSub}>Explora por tipo de local</Text>
      </View>

      <View style={styles.grid}>
        {VISUAL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.categoryKey;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.card,
                { backgroundColor: cat.bgColor, borderColor: isSelected ? '#2563EB' : cat.borderColor },
                isSelected && styles.cardActive,
              ]}
              onPress={() => onSelectCategory(cat.categoryKey)}
              activeOpacity={0.75}
            >
              <View style={[styles.iconBox, { backgroundColor: isSelected ? '#2563EB' : 'rgba(255, 255, 255, 0.75)' }]}>
                <MallOsSpriteIcon
                  name={cat.icon}
                  size={24}
                  showCircle={false}
                  color={isSelected ? '#FFFFFF' : cat.iconColor}
                />
              </View>
              <Text
                style={[
                  styles.cardLabel,
                  isSelected && styles.cardLabelActive,
                ]}
                numberOfLines={1}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
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
    gap: 10,
    justifyContent: 'space-between',
  },
  card: {
    width: '23%',
    aspectRatio: 0.95,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardActive: {
    borderWidth: 2,
    shadowColor: '#2563EB',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  cardLabel: {
    color: '#1E293B',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardLabelActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
});
