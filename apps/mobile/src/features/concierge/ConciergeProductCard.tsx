import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect, Polygon } from 'react-native-svg';
import { AppIcon } from '../../components/AppIcon';
import type { CatalogProduct, CatalogStoreOption } from './data/concierge-catalog';

interface ConciergeProductCardProps {
  product: CatalogProduct;
  store: CatalogStoreOption;
  onPressDetail: (product: CatalogProduct, store: CatalogStoreOption) => void;
  onNavigateToStore: (storeId: string) => void;
}

// Default images si el producto no trae galería propia
const FALLBACK_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&auto=format&fit=crop&q=80',
    label: 'Verde Oliva',
    colorHex: '#4A5B42',
  },
  {
    url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80',
    label: 'Arena',
    colorHex: '#D2B48C',
  },
  {
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&auto=format&fit=crop&q=80',
    label: 'Negro',
    colorHex: '#1E293B',
  },
];

export const ConciergeProductCard: React.FC<ConciergeProductCardProps> = ({
  product,
  store,
  onPressDetail,
  onNavigateToStore,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(Dimensions.get('window').width - 70);

  // Lista de imágenes a mostrar en la galería swipeable
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [{ url: product.imageUrl, label: 'Principal', colorHex: '#4F46E5' }]
      : FALLBACK_IMAGES;

  const priceText =
    product.priceRange.min === product.priceRange.max
      ? `$${product.priceRange.min.toFixed(2)} USD`
      : `$${product.priceRange.min} - $${product.priceRange.max} USD`;

  const highlights = product.highlights || product.tags.slice(0, 3);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (cardWidth > 0) {
      const newIndex = Math.round(offsetX / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < galleryImages.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <View
      style={styles.cardContainer}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0) setCardWidth(w);
      }}
    >
      {/* 1. Galería / Contenedor Visual con Efecto Vidrio / Glassmorphism */}
      <View style={styles.galleryWrapper}>
        {/* Capa de Fondo Vidrio Translúcido con Reflejos y Brillo */}
        <Svg
          style={StyleSheet.absoluteFillObject}
          width="100%"
          height="100%"
        >
          <Defs>
            {/* Gradiente base translúcido suave estilo vidrio esmerilado */}
            <LinearGradient id="glassBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#F6FAFE" stopOpacity="0.95" />
              <Stop offset="40%" stopColor="#E5F0FC" stopOpacity="0.85" />
              <Stop offset="75%" stopColor="#D5E6FA" stopOpacity="0.75" />
              <Stop offset="100%" stopColor="#C4DCF7" stopOpacity="0.85" />
            </LinearGradient>

            {/* Brillo especular superior diagonal (luz suave reflejada en cristal) */}
            <LinearGradient id="glassShineDiagonal" x1="0%" y1="0%" x2="70%" y2="100%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <Stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <Stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </LinearGradient>

            {/* Halo de luz suave en la esquina superior derecha */}
            <RadialGradient id="glassAura" cx="82%" cy="18%" rx="55%" ry="55%">
              <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <Stop offset="45%" stopColor="#BFDBFE" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#BFDBFE" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Relleno Base de Cristal */}
          <Rect width="100%" height="100%" fill="url(#glassBaseGrad)" />
          {/* Halo de Luz */}
          <Rect width="100%" height="100%" fill="url(#glassAura)" />
          {/* Reflejo Angular de Vidrio */}
          <Polygon points="0,0 260,0 100,250 0,250" fill="url(#glassShineDiagonal)" opacity="0.65" />
        </Svg>

        {/* Línea de brillo/bisel superior de cristal */}
        <View style={styles.glassTopShineLine} pointerEvents="none" />

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          style={[styles.galleryScroll, { width: cardWidth }]}
        >
          {galleryImages.map((img, idx) => (
            <View key={`img-${idx}`} style={[styles.imageSlide, { width: cardWidth }]}>
              <View style={styles.imageInnerContainer}>
                <Image
                  source={{ uri: img.url }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Badge de Marca flotante (Top Left) */}
        <View style={styles.brandPill}>
          <View style={styles.brandMonogramBadge}>
            <Text style={styles.brandMonogramText}>
              {(store.brandMonogram || store.storeName.charAt(0)).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.brandNameText}>{store.storeName.toUpperCase()}</Text>
        </View>

        {/* Badge de Stock flotante (Top Right) */}
        <View style={styles.stockBadge}>
          <View style={styles.stockDot} />
          <Text style={styles.stockBadgeText}>STOCK DISPONIBLE</Text>
        </View>

        {/* Badge de Nivel / Ubicación flotante sobre la foto (Bottom Left) */}
        <View style={styles.floorOverlayBadge}>
          <AppIcon name="location-outline" size={11} color="#2563EB" />
          <Text style={styles.floorOverlayText}>
            {(store.floorLabel || 'Nivel Autopista · Pasillo Norte').toUpperCase()}
          </Text>
        </View>

        {/* Puntos de Navegación Dinámicos (Dots) */}
        {galleryImages.length > 1 && (
          <View style={styles.dotsContainer}>
            {galleryImages.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <View
                  key={`dot-${idx}`}
                  style={[
                    styles.dot,
                    isActive ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              );
            })}
          </View>
        )}
      </View>

      {/* 2. Cuerpo del Producto (Light & Modern - Tipografía Editorial) */}
      <View style={styles.contentBody}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Highlights / Atributos vendibles */}
        {highlights.length > 0 && (
          <View style={styles.highlightsRow}>
            {highlights.map((item, idx) => (
              <View key={`${item}-${idx}`} style={styles.highlightChip}>
                <Text style={styles.highlightText}>{item.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Caja de Precio Referencial Soft-White */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>PRECIO REFERENCIAL</Text>
          <Text style={styles.priceValue}>{priceText}</Text>
        </View>

        {/* Botones de Acción (Azul Moderno + Ruta Blanca con Bisel) */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.detailBtn}
            onPress={() => onPressDetail(product, store)}
            activeOpacity={0.85}
          >
            <Text style={styles.detailBtnText}>Ver detalles</Text>
            <AppIcon name="arrow-forward" size={14} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.routeBtn}
            onPress={() => onNavigateToStore(store.storeId)}
            activeOpacity={0.8}
          >
            <AppIcon name="navigate" size={13} color="#2563EB" />
            <Text style={styles.routeBtnText}>Ruta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  // Área de Galería Visual con Efecto Vidrio / Cristal Suave
  galleryWrapper: {
    height: 250,
    backgroundColor: '#EBF4FE',
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(219, 234, 254, 0.7)',
  },
  glassTopShineLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 2,
  },
  galleryScroll: {
    height: '100%',
  },
  imageSlide: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  imageInnerContainer: {
    width: '74%',
    height: '92%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  brandPill: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    gap: 7,
  },
  brandMonogramBadge: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E11D48', // Carmesí / Rojo Vivo
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMonogramText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  brandNameText: {
    color: '#0F172A',
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  stockBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6FAF3', // Fondo menta suave pastel
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981', // Verde vibrante
  },
  stockBadgeText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  floorOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  floorOverlayText: {
    color: '#1E293B',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 16,
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },

  // Cuerpo de la tarjeta
  contentBody: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  productTitle: {
    color: '#0F172A',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 24,
    marginBottom: 6,
  },
  productDescription: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  highlightsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  highlightChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },
  highlightText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  priceContainer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 14,
  },
  priceLabel: {
    color: '#94A3B8',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  priceValue: {
    color: '#2563EB', // Azul Moderno vibrante de precio
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  detailBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#2563EB', // Azul Moderno Vibrante
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
  detailBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  routeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  routeBtnText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '800',
  },
});
