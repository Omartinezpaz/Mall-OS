import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStoreById, getStoreFacade, getStoreLogo } from '../../src/features/directory';
import { getStoreCatalog } from '../../src/features/catalog';
import { AppIcon } from '../../src/components/AppIcon';
import { MallOsSpriteIcon } from '../../src/components/MallOsSpriteIcon';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);

  const store = getStoreById(id);

  const catalogProducts = React.useMemo(() => {
    if (!store) return [];
    return getStoreCatalog(store.id, store.name, store.categorySlug);
  }, [store]);

  if (!store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>🏪</Text>
        <Text style={styles.errorTitle}>Local no encontrado</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const coverSource = getStoreFacade(store.id, store.slug, store.categorySlug);
  const logoSource = getStoreLogo(store.id, store.slug);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Visita ${store.name} en Sambil Mall (${store.floorName}, ${store.unit})!`,
      });
    } catch {}
  };

  const handleNavigateToMap = () => {
    router.push({
      pathname: '/(tabs)/mapa',
      params: {
        storeId: store.id,
        t: String(Date.now()),
      },
    });
  };

  const handleOpenCatalog = () => {
    router.push({
      pathname: '/local/catalogo',
      params: {
        storeId: store.id,
      },
    });
  };

  const storeInitials = store.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Hero Photo: Fachada oficial de la tienda */}
        <View style={styles.coverContainer}>
          <Image source={coverSource} style={styles.coverImage} resizeMode="cover" />
          <View style={styles.coverOverlay} />

          {/* Floating Back Button */}
          <TouchableOpacity
            style={[styles.floatingCircleBtn, styles.floatingBack, { top: Math.max(insets.top + 8, 44) }]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <AppIcon name="chevron-back" size={20} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Floating Favorite & Share Buttons */}
          <View style={[styles.floatingActionsRow, { top: Math.max(insets.top + 8, 44) }]}>
            <TouchableOpacity
              style={styles.floatingCircleBtn}
              onPress={() => setIsFavorite(!isFavorite)}
              activeOpacity={0.8}
            >
              <AppIcon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? '#EF4444' : '#FFFFFF'}
                strokeWidth={2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.floatingCircleBtn}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <AppIcon name="share-outline" size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tarjeta Principal Blanca del Local */}
        <View style={styles.mainCard}>
          {/* Floating Store Avatar Logo Box */}
          <View style={styles.brandLogoBox}>
            {logoSource ? (
              <Image source={logoSource} style={styles.brandLogoImage} resizeMode="contain" />
            ) : (
              <Text style={styles.brandLogoText}>{store.name.length <= 8 ? store.name.toUpperCase() : storeInitials}</Text>
            )}
          </View>

          {/* Header Title & Status Badge */}
          <View style={styles.headerTitleRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ABIERTO</Text>
            </View>
          </View>

          {/* Subtitle / Category */}
          <Text style={styles.categorySubtitle}>
            {store.category} · Moda & Accesorios
          </Text>

          {/* Rating & Location Pills */}
          <View style={styles.pillsRow}>
            <View style={styles.pillItem}>
              <Text style={styles.pillStar}>⭐</Text>
              <Text style={styles.pillText}>4.8 (2.4k reseñas)</Text>
            </View>

            <View style={styles.pillItem}>
              <MallOsSpriteIcon name="ubicacion" size={14} showCircle={false} color="#2563EB" />
              <Text style={styles.pillText}>{store.floorName}, {store.unit}</Text>
            </View>
          </View>

          {/* Section: Sobre la tienda */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Sobre la tienda</Text>
            <Text style={styles.bodyDescription}>
              {store.description ||
                `${store.name} es una de las principales tiendas de moda y estilo en Sambil. Su modelo de negocio abarca el diseño, la calidad y el servicio premium, ofreciendo las mejores tendencias de temporada.`}
            </Text>
          </View>

          {/* Section: Novedades */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Novedades</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleOpenCatalog}>
                <Text style={styles.viewCatalogLink}>Ver catálogo</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsScroll}
            >
              {catalogProducts.map((prod) => (
                <TouchableOpacity
                  key={prod.id}
                  style={styles.productCard}
                  onPress={handleOpenCatalog}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: prod.image }} style={styles.productImage} resizeMode="cover" />
                  <Text style={styles.productTitle} numberOfLines={1}>{prod.title}</Text>
                  <Text style={styles.productSubtitle} numberOfLines={1}>{prod.category}</Text>
                  <Text style={styles.productPrice}>${prod.price.toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Section: Horarios de atención */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleHeaderRow}>
              <View style={styles.scheduleHeaderLeft}>
                <Text style={styles.scheduleIcon}>🕒</Text>
                <Text style={styles.scheduleCardTitle}>Horarios de atención</Text>
              </View>
              <Text style={styles.scheduleTimezoneTag}>HORA LOCAL</Text>
            </View>

            <View style={styles.scheduleList}>
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleDay}>Lunes - Jueves</Text>
                <Text style={styles.scheduleHours}>10:00 - 21:00</Text>
              </View>

              <View style={styles.scheduleRowHighlight}>
                <Text style={styles.scheduleDayHighlight}>Viernes - Sábado</Text>
                <Text style={styles.scheduleHoursHighlight}>10:00 - 22:30</Text>
              </View>

              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleDay}>Domingo</Text>
                <Text style={styles.scheduleHours}>11:00 - 20:00</Text>
              </View>
            </View>
          </View>

          {/* Section: Servicios disponibles */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Servicios disponibles</Text>
            <View style={styles.servicesGrid}>
              <View style={styles.serviceItem}>
                <View style={styles.serviceIconBox}>
                  <Text style={styles.serviceEmoji}>📦</Text>
                </View>
                <Text style={styles.serviceLabel}>Pick-up en tienda</Text>
              </View>

              <View style={styles.serviceItem}>
                <View style={[styles.serviceIconBox, { backgroundColor: '#ECFDF5' }]}>
                  <Text style={styles.serviceEmoji}>💳</Text>
                </View>
                <Text style={styles.serviceLabel}>Pagos QR</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Sticky Bottom CTA Button: Ver ruta en el mapa */}
      <View style={[styles.stickyBottomWrapper, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={styles.mapRouteCta}
          onPress={handleNavigateToMap}
          activeOpacity={0.88}
        >
          <View style={styles.ctaIconCircle}>
            <MallOsSpriteIcon name="navegacion" size={20} showCircle={false} color="#FFFFFF" />
          </View>
          <View style={styles.ctaTextCol}>
            <Text style={styles.ctaTitle}>Ver ruta en el mapa</Text>
            <Text style={styles.ctaSubtitle}>Tiempo est. 3 min caminando</Text>
          </View>
          <AppIcon name="arrow-forward" size={20} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 40,
  },
  coverContainer: {
    height: 280,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.25)',
  },
  floatingCircleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  floatingBack: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
  },
  floatingActionsRow: {
    position: 'absolute',
    right: 18,
    flexDirection: 'row',
    gap: 10,
    zIndex: 10,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  brandLogoBox: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -48,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    padding: 6,
    overflow: 'hidden',
  },
  brandLogoImage: {
    width: '100%',
    height: '100%',
  },
  brandLogoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 16,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },
  pillStar: {
    fontSize: 12,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  sectionBlock: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  viewCatalogLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  bodyDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  productsScroll: {
    gap: 14,
    paddingVertical: 4,
  },
  productCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  productSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2563EB',
    marginTop: 4,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 16,
    marginBottom: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  scheduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scheduleIcon: {
    fontSize: 14,
  },
  scheduleCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  scheduleTimezoneTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  scheduleList: {
    gap: 8,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  scheduleDay: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  scheduleHours: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  scheduleRowHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  scheduleDayHighlight: {
    fontSize: 13,
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#1D4ED8',
  },
  scheduleHoursHighlight: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  servicesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },
  serviceIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceEmoji: {
    fontSize: 18,
  },
  serviceLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  stickyBottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  mapRouteCta: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTextCol: {
    flex: 1,
  },
  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  ctaSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
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
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
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
