import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStoreById } from '../../src/features/directory';
import { getStoreCatalog, CatalogProduct } from '../../src/features/catalog';
import { AppIcon } from '../../src/components/AppIcon';
import { MallOsSpriteIcon } from '../../src/components/MallOsSpriteIcon';

export default function StoreCatalogScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ storeId?: string }>();
  const storeId = Array.isArray(params.storeId) ? params.storeId[0] : params.storeId;

  const store = getStoreById(storeId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const allProducts = useMemo(() => {
    if (!store) return [];
    return getStoreCatalog(store.id, store.name, store.categorySlug);
  }, [store]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allProducts.filter((p) => {
      const matchesSearch =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  const toggleFavorite = (prodId: string) => {
    setFavorites((prev) => ({ ...prev, [prodId]: !prev[prodId] }));
  };

  const handleNavigateToStore = () => {
    if (!store) return;
    setSelectedProduct(null);
    router.push({
      pathname: '/(tabs)/mapa',
      params: {
        storeId: store.id,
        t: String(Date.now()),
      },
    });
  };

  if (!store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>🛍️</Text>
        <Text style={styles.errorTitle}>Catálogo no disponible</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Superior */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 6, 40) }]}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.backCircleBtn}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <AppIcon name="chevron-back" size={20} color="#0F172A" strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.storeHeaderInfo}>
            <Text style={styles.storeHeaderTitle} numberOfLines={1}>{store.name}</Text>
            <Text style={styles.storeHeaderSubtitle}>Catálogo Oficial · {store.floorName}</Text>
          </View>

          <TouchableOpacity
            style={styles.mapShortcutBtn}
            onPress={handleNavigateToStore}
            activeOpacity={0.75}
          >
            <MallOsSpriteIcon name="navegacion" size={16} showCircle={false} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Barra de Búsqueda de Productos */}
        <View style={styles.searchBarBox}>
          <AppIcon name="search" size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Buscar en el catálogo de ${store.name}...`}
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Píldoras de Categorías del Catálogo */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat === 'all' ? 'Todos los productos' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid de Productos (2 Columnas) */}
      <ScrollView
        style={styles.productListScroll}
        contentContainerStyle={[
          styles.productListContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsCountRow}>
          <Text style={styles.resultsCountText}>
            Mostrando {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'}
          </Text>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => {
            const isFav = Boolean(favorites[product.id]);
            return (
              <TouchableOpacity
                key={product.id}
                style={styles.gridCard}
                onPress={() => {
                  setSelectedProduct(product);
                  setSelectedSize(product.sizes ? product.sizes[0] : null);
                }}
                activeOpacity={0.88}
              >
                {/* Imagen del Producto */}
                <View style={styles.cardImageContainer}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  {product.badge && (
                    <View style={styles.cardBadge}>
                      <Text style={styles.cardBadgeText}>{product.badge}</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(product.id)}
                    activeOpacity={0.8}
                  >
                    <AppIcon
                      name={isFav ? 'heart' : 'heart-outline'}
                      size={16}
                      color={isFav ? '#EF4444' : '#0F172A'}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                </View>

                {/* Información del Producto */}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardCategory} numberOfLines={1}>
                    {product.category.toUpperCase()}
                  </Text>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {product.title}
                  </Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.cardPrice}>${product.price.toFixed(2)}</Text>
                    {product.originalPrice && (
                      <Text style={styles.cardOriginalPrice}>
                        ${product.originalPrice.toFixed(2)}
                      </Text>
                    )}
                  </View>

                  {/* Tallas disponibles */}
                  {product.sizes && product.sizes.length > 0 && (
                    <View style={styles.sizesPreviewRow}>
                      <Text style={styles.sizesPreviewText}>
                        Tallas: {product.sizes.slice(0, 4).join(' ')}
                        {product.sizes.length > 4 ? '...' : ''}
                      </Text>
                    </View>
                  )}

                  {/* Ubicación y Disponibilidad en Tienda */}
                  <View style={styles.stockRow}>
                    <View style={styles.stockDot} />
                    <Text style={styles.stockText} numberOfLines={1}>
                      {product.storeLocationSnippet}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Sticky Bottom CTA: Ver Tienda en el Mapa */}
      <View style={[styles.bottomStickyBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
        <TouchableOpacity
          style={styles.bottomCtaButton}
          onPress={handleNavigateToStore}
          activeOpacity={0.88}
        >
          <View style={styles.bottomCtaIconBox}>
            <MallOsSpriteIcon name="navegacion" size={18} showCircle={false} color="#FFFFFF" />
          </View>
          <View style={styles.bottomCtaTextBox}>
            <Text style={styles.bottomCtaTitle}>Ver ruta a {store.name}</Text>
            <Text style={styles.bottomCtaSubtitle}>{store.floorName} · {store.unit}</Text>
          </View>
          <AppIcon name="chevron-forward" size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Modal de Detalle de Producto */}
      <Modal
        visible={Boolean(selectedProduct)}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProduct(null)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalDismissArea}
            onPress={() => setSelectedProduct(null)}
            activeOpacity={1}
          />
          {selectedProduct && (
            <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom + 12, 24) }]}>
              <View style={styles.modalDragHandle} />

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Imagen Grande */}
                <View style={styles.modalImageWrapper}>
                  <Image
                    source={{ uri: selectedProduct.image }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                  {selectedProduct.badge && (
                    <View style={styles.modalBadge}>
                      <Text style={styles.modalBadgeText}>{selectedProduct.badge}</Text>
                    </View>
                  )}
                </View>

                {/* Header del Producto */}
                <View style={styles.modalBody}>
                  <Text style={styles.modalCategory}>
                    {selectedProduct.category.toUpperCase()} · {store.name}
                  </Text>
                  <Text style={styles.modalTitle}>{selectedProduct.title}</Text>

                  <View style={styles.modalPriceRow}>
                    <Text style={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</Text>
                    {selectedProduct.originalPrice && (
                      <Text style={styles.modalOriginalPrice}>
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </Text>
                    )}
                    <View style={styles.modalStockBadge}>
                      <Text style={styles.modalStockBadgeText}>Disponible en tienda</Text>
                    </View>
                  </View>

                  {/* Selector de Tallas */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <View style={styles.modalSizesBlock}>
                      <Text style={styles.modalSectionLabel}>Seleccionar Talla / Medida:</Text>
                      <View style={styles.modalSizesGrid}>
                        {selectedProduct.sizes.map((s) => (
                          <TouchableOpacity
                            key={s}
                            style={[
                              styles.sizeChip,
                              selectedSize === s && styles.sizeChipActive,
                            ]}
                            onPress={() => setSelectedSize(s)}
                            activeOpacity={0.75}
                          >
                            <Text
                              style={[
                                styles.sizeChipText,
                                selectedSize === s && styles.sizeChipTextActive,
                              ]}
                            >
                              {s}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Descripción */}
                  <View style={styles.modalDescBlock}>
                    <Text style={styles.modalSectionLabel}>Descripción</Text>
                    <Text style={styles.modalDescText}>{selectedProduct.description}</Text>
                  </View>

                  {/* Ubicación dentro de la tienda */}
                  <View style={styles.locationInStoreCard}>
                    <MallOsSpriteIcon name="ubicacion" size={16} showCircle={false} color="#2563EB" />
                    <View style={styles.locationInStoreInfo}>
                      <Text style={styles.locationInStoreTitle}>Ubicación física en el local:</Text>
                      <Text style={styles.locationInStoreDesc}>
                        {selectedProduct.storeLocationSnippet} ({store.floorName}, {store.unit})
                      </Text>
                    </View>
                  </View>

                  {/* Botón de acción */}
                  <TouchableOpacity
                    style={styles.modalMapCta}
                    onPress={handleNavigateToStore}
                    activeOpacity={0.88}
                  >
                    <MallOsSpriteIcon name="navegacion" size={18} showCircle={false} color="#FFFFFF" />
                    <Text style={styles.modalMapCtaText}>Localizar este producto en el mapa</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 12,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeHeaderInfo: {
    flex: 1,
  },
  storeHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  storeHeaderSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  mapShortcutBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '500',
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  categoryChipActive: {
    backgroundColor: '#0F172A',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  productListScroll: {
    flex: 1,
  },
  productListContent: {
    padding: 16,
  },
  resultsCountRow: {
    marginBottom: 12,
  },
  resultsCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  cardImageContainer: {
    width: '100%',
    height: 175,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: {
    padding: 12,
    gap: 3,
  },
  cardCategory: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 17,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563EB',
  },
  cardOriginalPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  sizesPreviewRow: {
    marginTop: 2,
  },
  sizesPreviewText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  stockDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#10B981',
  },
  stockText: {
    fontSize: 10,
    color: '#64748B',
    flex: 1,
  },
  bottomStickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  bottomCtaButton: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  bottomCtaIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCtaTextBox: {
    flex: 1,
  },
  bottomCtaTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  bottomCtaSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  modalDismissArea: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: '85%',
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalImageWrapper: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    position: 'relative',
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  modalBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  modalBody: {
    gap: 12,
  },
  modalCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  modalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2563EB',
  },
  modalOriginalPrice: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  modalStockBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalStockBadgeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '800',
  },
  modalSizesBlock: {
    gap: 8,
    marginTop: 4,
  },
  modalSectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSizesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  sizeChipActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  sizeChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  sizeChipTextActive: {
    color: '#FFFFFF',
  },
  modalDescBlock: {
    gap: 6,
    marginTop: 4,
  },
  modalDescText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  locationInStoreCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 16,
    padding: 12,
    gap: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  locationInStoreInfo: {
    flex: 1,
  },
  locationInStoreTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E40AF',
  },
  locationInStoreDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D4ED8',
    marginTop: 1,
  },
  modalMapCta: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    marginTop: 12,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalMapCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  errorEmoji: {
    fontSize: 48,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  backBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
