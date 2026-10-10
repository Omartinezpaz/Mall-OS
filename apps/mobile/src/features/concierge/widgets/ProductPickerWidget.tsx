import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';
import { MallOsSpriteIcon } from '../../../components/MallOsSpriteIcon';
import type { CatalogProduct } from '../data/concierge-catalog';

interface ProductPickerWidgetProps {
  storeName: string;
  products: CatalogProduct[];
  onSelectProduct: (product: { id: string; name: string }) => void;
  selectedProductId?: string;
}

export const ProductPickerWidget: React.FC<ProductPickerWidgetProps> = ({
  storeName,
  products,
  onSelectProduct,
  selectedProductId,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badgeReward}>
          <AppIcon name="gift" size={13} color="#D97706" />
          <Text style={styles.badgeRewardText}>+50 Pts Sambil</Text>
        </View>
        <Text style={styles.headerSubtitle}>Registra tu compra para puntos y cortesías</Text>
      </View>

      <Text style={styles.title}>¿Qué compraste en {storeName}?</Text>

      {/* Horizontal Carousel of Available Products in Store */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((item) => {
          const isSelected = selectedProductId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.productCard, isSelected && styles.productCardSelected]}
              onPress={() => onSelectProduct({ id: item.id, name: item.name })}
              activeOpacity={0.8}
            >
              <View style={styles.productIconContainer}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode="cover" />
                ) : (
                  <MallOsSpriteIcon name={item.iconId || 'moda'} size={24} showCircle={false} color="#2563EB" />
                )}
              </View>

              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={styles.productPrice}>
                ${item.priceRange.min} - ${item.priceRange.max} USD
              </Text>

              <View style={[styles.selectBtn, isSelected && styles.selectBtnSelected]}>
                <Text style={[styles.selectBtnText, isSelected && styles.selectBtnTextSelected]}>
                  {isSelected ? 'Comprado' : 'Elegir'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Fallback Option for unlisted item */}
        <TouchableOpacity
          style={[styles.productCard, styles.otherProductCard]}
          onPress={() => onSelectProduct({ id: 'prod_otro', name: 'Otro artículo' })}
          activeOpacity={0.8}
        >
          <View style={[styles.productIconContainer, styles.otherIconContainer]}>
            <AppIcon name="cube" size={24} color="#64748B" />
          </View>
          <Text style={styles.productName} numberOfLines={2}>
            Otro artículo
          </Text>
          <Text style={styles.productPrice}>De esta tienda</Text>
          <View style={styles.selectBtn}>
            <Text style={styles.selectBtnText}>Elegir</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badgeReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeRewardText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  headerSubtitle: {
    fontSize: 10.5,
    color: '#64748B',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    height: 184,
  },
  scrollContent: {
    paddingRight: 10,
    gap: 10,
    alignItems: 'flex-start',
  },
  productCard: {
    width: 130,
    height: 180,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  otherProductCard: {
    borderStyle: 'dashed',
  },
  productIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  otherIconContainer: {
    backgroundColor: '#F1F5F9',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'center',
    height: 30,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 8,
  },
  selectBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'center',
  },
  selectBtnSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  selectBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  selectBtnTextSelected: {
    color: '#FFFFFF',
  },
});
