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
        <Text style={styles.sectionSub}>EXPLORA POR TIPO</Text>
      </View>

      <View style={styles.grid}>
        {VISUAL_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.categoryKey;
          return (
            <TouchableOpacity
              key={cat.id}
              style={styles.itemWrapper}
              onPress={() => onSelectCategory(cat.categoryKey)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.circleBox,
                  { backgroundColor: cat.bgColor },
                  isSelected && styles.circleBoxActive,
                ]}
              >
                <MallOsSpriteIcon
                  name={cat.icon}
                  size={26}
                  showCircle={false}
                  color={isSelected ? '#2563EB' : cat.iconColor}
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected && styles.categoryLabelActive,
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
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  itemWrapper: {
    width: '23%',
    alignItems: 'center',
  },
  circleBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  circleBoxActive: {
    borderWidth: 2.5,
    borderColor: '#2563EB',
    transform: [{ scale: 1.05 }],
  },
  categoryLabel: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  categoryLabelActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
});
