import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import { MallOsSpriteIcon } from '../../components/MallOsSpriteIcon';
import { track } from '../../lib/analytics';
import type { CatalogProduct, CatalogStoreOption } from './data/concierge-catalog';

interface ConciergeProductSheetProps {
  visible: boolean;
  product: CatalogProduct | null;
  store: CatalogStoreOption | null;
  onClose: () => void;
  onNavigateToStore: (storeId: string) => void;
}

export const ConciergeProductSheet: React.FC<ConciergeProductSheetProps> = ({
  visible,
  product,
  store,
  onClose,
  onNavigateToStore,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!product || !store) return null;

  const brandColor = store.brandColor || '#0F172A';
  const brandAccent = store.brandAccent || '#4F46E5';
  const brandMonogram = store.brandMonogram || store.storeName.charAt(0);

  const priceText =
    product.priceRange.min === product.priceRange.max
      ? `$${product.priceRange.min.toFixed(2)} USD`
      : `$${product.priceRange.min} - $${product.priceRange.max} USD`;

  const availableSizes = product.mockSizes || ['XS', 'S', 'M', 'L', 'XL'];
  const availableColors = product.mockColors || ['Negro', 'Blanco', 'Azul'];

  const currentSize = selectedSize || availableSizes[1] || availableSizes[0];
  const currentColor = selectedColor || availableColors[0];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Drag Handle superior */}
              <View style={styles.dragHandleContainer}>
                <View style={styles.dragHandle} />
              </View>

              <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* 1. Header con Tienda y Marca */}
                <View style={styles.headerRow}>
                  <View style={[styles.brandBadge, { borderColor: brandAccent }]}>
                    {store.logoUrl ? (
                      <Image
                        source={{ uri: store.logoUrl }}
                        style={styles.sheetLogoImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={[styles.sheetLogoPlaceholder, { backgroundColor: brandColor }]}>
                        <Text style={[styles.sheetLogoInitial, { color: brandAccent }]}>
                          {brandMonogram}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.brandTitle}>{store.storeName.toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <AppIcon name="close" size={18} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* 2. Hero Ampliado del Producto */}
                <View
                  style={[
                    styles.heroBannerLarge,
                    { backgroundColor: brandColor },
                  ]}
                >
                  <View style={styles.watermarkBig}>
                    <Text style={[styles.watermarkBigText, { color: brandAccent }]}>
                      {brandMonogram}
                    </Text>
                  </View>

                  <View style={[styles.bigIconCircle, { borderColor: brandAccent }]}>
                    <MallOsSpriteIcon
                      name={product.iconId || 'moda'}
                      size={36}
                      showCircle={false}
                      color={brandAccent}
                    />
                  </View>

                  <View style={styles.heroLocationPill}>
                    <AppIcon name="location-outline" size={12} color="#FFFFFF" />
                    <Text style={styles.heroLocationText}>
                      {store.floorLabel || 'Sambil Chacao'}
                    </Text>
                  </View>
                </View>

                {/* 3. Título & Precio Principal */}
                <View style={styles.titleSection}>
                  <Text style={styles.productTitleLarge}>{product.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceHighlight}>{priceText}</Text>
                    <View style={styles.availableTag}>
                      <View style={styles.availableDot} />
                      <Text style={styles.availableTagText}>Disponible en tienda</Text>
                    </View>
                  </View>
                </View>

                {/* 4. Descripción Extendida */}
                <View style={styles.sectionBlock}>
                  <Text style={styles.sectionHeading}>DESCRIPCIÓN COMERCIAL</Text>
                  <Text style={styles.descriptionText}>
                    {product.description}. Confección seleccionada y verificada para la experiencia oficial del centro comercial. Consulta disponibilidad directa y asesoría con el personal en el local.
                  </Text>
                </View>

                {/* 5. Selector de Tallas */}
                {availableSizes.length > 0 && (
                  <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeadingRow}>
                      <Text style={styles.sectionHeading}>TALLA / FORMATO</Text>
                      <Text style={styles.selectedOptionHint}>Seleccionado: {currentSize}</Text>
                    </View>
                    <View style={styles.optionsRow}>
                      {availableSizes.map((sz) => {
                        const isSelected = sz === currentSize;
                        return (
                          <TouchableOpacity
                            key={sz}
                            style={[
                              styles.optionChip,
                              isSelected && {
                                backgroundColor: '#4F46E5',
                                borderColor: '#4338CA',
                              },
                            ]}
                            onPress={() => setSelectedSize(sz)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.optionChipText,
                                isSelected && { color: '#FFFFFF', fontWeight: '800' },
                              ]}
                            >
                              {sz}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* 6. Selector de Colores / Variantes */}
                {availableColors.length > 0 && (
                  <View style={styles.sectionBlock}>
                    <View style={styles.sectionHeadingRow}>
                      <Text style={styles.sectionHeading}>VARIANTE / COLOR</Text>
                      <Text style={styles.selectedOptionHint}>Seleccionado: {currentColor}</Text>
                    </View>
                    <View style={styles.optionsRow}>
                      {availableColors.map((col) => {
                        const isSelected = col === currentColor;
                        return (
                          <TouchableOpacity
                            key={col}
                            style={[
                              styles.colorChip,
                              isSelected && {
                                borderColor: '#4F46E5',
                                backgroundColor: '#EEF2FF',
                              },
                            ]}
                            onPress={() => setSelectedColor(col)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.colorChipText,
                                isSelected && { color: '#4F46E5', fontWeight: '800' },
                              ]}
                            >
                              {col}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* 7. Highlights de Calidad */}
                {product.highlights && product.highlights.length > 0 && (
                  <View style={styles.sectionBlock}>
                    <Text style={styles.sectionHeading}>CARACTERÍSTICAS DESTACADAS</Text>
                    <View style={styles.bulletList}>
                      {product.highlights.map((h, i) => (
                        <View key={`${h}-${i}`} style={styles.bulletRow}>
                          <AppIcon name="checkmark" size={14} color="#16A34A" />
                          <Text style={styles.bulletText}>{h}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                <View style={{ height: 90 }} />
              </ScrollView>

              {/* Footer Fijo con Acciones Principales */}
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  style={[styles.saveBtn, isSaved && styles.saveBtnActive]}
                  onPress={() => setIsSaved(!isSaved)}
                  activeOpacity={0.8}
                >
                  <AppIcon
                    name="bookmark"
                    size={18}
                    color={isSaved ? '#4F46E5' : '#64748B'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.navigatePrimaryBtn}
                  onPress={() => {
                    track('concierge_store_routed', {
                      storeId: store.storeId,
                      storeName: store.storeName,
                      productName: product.name,
                    });
                    onClose();
                    onNavigateToStore(store.storeId);
                  }}
                  activeOpacity={0.8}
                >
                  <AppIcon name="navigate" size={16} color="#FFFFFF" />
                  <Text style={styles.navigatePrimaryText}>
                    Trazar ruta a {store.storeName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    maxHeight: '88%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  sheetLogoImage: {
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  sheetLogoPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sheetLogoInitial: {
    fontSize: 13,
    fontWeight: '900',
  },
  brandTitle: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBannerLarge: {
    height: 160,
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  watermarkBig: {
    position: 'absolute',
    right: -15,
    bottom: -30,
    opacity: 0.14,
  },
  watermarkBigText: {
    fontSize: 140,
    fontWeight: '900',
  },
  bigIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  heroLocationPill: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  heroLocationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  titleSection: {
    marginBottom: 16,
  },
  productTitleLarge: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    lineHeight: 26,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceHighlight: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  availableTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  availableDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  availableTagText: {
    color: '#15803D',
    fontSize: 10.5,
    fontWeight: '700',
  },
  sectionBlock: {
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionHeading: {
    color: '#64748B',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  selectedOptionHint: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
  },
  descriptionText: {
    color: '#475569',
    fontSize: 13.5,
    lineHeight: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    minWidth: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionChipText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
  },
  colorChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorChipText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  bulletList: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletText: {
    color: '#334155',
    fontSize: 12.5,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  saveBtn: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  saveBtnActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  navigatePrimaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    height: 46,
    borderRadius: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  navigatePrimaryText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
