import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import type { MapStore, StoreOffer } from '@mallos/map-engine';
import { AppIcon } from '../../components/AppIcon';
import { MallOsSpriteIcon } from '../../components/MallOsSpriteIcon';
import { getStoreById, getStoreFacade, getStoreLogo } from '../directory';
import { notifyStoreArrival } from '../concierge/useConcierge';

interface StorefrontHUDProps {
  store: MapStore | null;
  offers: StoreOffer[];
  floorName: string;
  onClose: () => void;
  onNavigateToStore?: (storeId: string) => void;
  onOpenStoreDetail?: (storeId: string) => void;
  onClaimOffer?: (offerId: string) => void;
  isArrived?: boolean;
}

export function StorefrontHUD({
  store,
  offers,
  floorName,
  onClose,
  onNavigateToStore,
  onOpenStoreDetail,
  onClaimOffer,
  isArrived = false,
}: StorefrontHUDProps) {
  const router = useRouter();
  if (!store) return null;

  // Obtener perfil detallado de la tienda
  const storeProfile = getStoreById(store.id) || getStoreById(store.slug);
  const storeName = storeProfile?.name || store.name;
  const storeCategory =
    storeProfile?.category ||
    (store.category ? store.category.charAt(0).toUpperCase() + store.category.slice(1) : 'Comercio');
  const storeUnit = storeProfile?.unit || `Local ${store.id.toUpperCase()}`;
  const storeDescription =
    storeProfile?.description ||
    `${storeName} en Sambil. Moda, calidad, productos exclusivos y atención personalizada para toda la familia.`;

  // Fachada real y logo oficial
  const facadeSource = getStoreFacade(store.id, store.slug, store.category);
  const logoSource = getStoreLogo(store.id, store.slug);

  const storeOffers = offers.filter(
    (o) => o.storeId === store.id || (storeProfile && o.storeId === storeProfile.id)
  );

  const handleOpenDetail = () => {
    if (onOpenStoreDetail) {
      onOpenStoreDetail(storeProfile?.id || store.id);
    } else {
      router.push(`/local/${storeProfile?.id || store.id}`);
    }
  };

  const handleOpenCatalog = () => {
    router.push({
      pathname: '/local/catalogo',
      params: { storeId: storeProfile?.id || store.id },
    });
  };

  return (
    <View style={styles.container}>
      {/* Fachada real de la tienda con gradiente para máximo contraste */}
      <View style={styles.bgImageWrapper}>
        <Image source={facadeSource} style={styles.bgImage} resizeMode="cover" />
        <View style={styles.darkGradientOverlay} />
      </View>

      {/* Header con Logo oficial, Nombres, Categoría y Botón Cerrar */}
      <View style={styles.header}>
        <View style={styles.headerLeftCol}>
          {/* Logo oficial en caja de alto contraste */}
          {logoSource ? (
            <View style={styles.storeLogoBox}>
              <Image source={logoSource} style={styles.storeLogoImage} resizeMode="contain" />
            </View>
          ) : (
            <View style={styles.storeIconBox}>
              <MallOsSpriteIcon name="tiendas" size={20} showCircle={false} color="#FFFFFF" />
            </View>
          )}

          {/* Información principal de la tienda */}
          <TouchableOpacity
            style={styles.headerInfo}
            onPress={handleOpenDetail}
            activeOpacity={0.8}
          >
            {isArrived ? (
              <View style={styles.arrivedBadge}>
                <AppIcon name="checkmark" size={11} color="#FFFFFF" strokeWidth={3} />
                <Text style={styles.arrivedBadgeText}>¡DESTINO ALCANZADO!</Text>
              </View>
            ) : (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{storeCategory.toUpperCase()}</Text>
              </View>
            )}

            <View style={styles.nameRow}>
              <Text style={styles.storeName} numberOfLines={1}>
                {storeName}
              </Text>
              <AppIcon name="chevron-forward" size={16} color="#60A5FA" />
            </View>

            <View style={styles.floorRow}>
              <MallOsSpriteIcon name="ubicacion" size={13} showCircle={false} color="#93C5FD" />
              <Text style={styles.floorText}>
                {floorName} · {storeUnit}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.75}>
          <AppIcon name="close" size={18} color="#CBD5E1" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Banner / Estado de Llegada vs Información de la Tienda */}
      {isArrived ? (
        <View style={styles.arrivalCalloutBox}>
          <View style={styles.arrivalCalloutHeader}>
            <View style={styles.arrivalPulseDot} />
            <Text style={styles.arrivalCalloutTitle}>
              ¡Has llegado a {storeName}!
            </Text>
          </View>
          <Text style={styles.arrivalCalloutDesc} numberOfLines={2}>
            {storeDescription}
          </Text>
          <View style={styles.statusHoursRow}>
            <View style={styles.openPill}>
              <View style={styles.openDot} />
              <Text style={styles.openPillText}>ABIERTO AHORA</Text>
            </View>
            <Text style={styles.hoursText}>Horario hoy: 10:00 - 21:00</Text>
          </View>
        </View>
      ) : (
        <View style={styles.infoBox}>
          <Text style={styles.storeDescText} numberOfLines={2}>
            {storeDescription}
          </Text>
          <View style={styles.statusHoursRow}>
            <View style={styles.openPill}>
              <View style={styles.openDot} />
              <Text style={styles.openPillText}>ABIERTO</Text>
            </View>
            <Text style={styles.hoursText}>Horario hoy: 10:00 - 21:00</Text>
          </View>
        </View>
      )}

      {/* Ofertas y Promociones Activas si existen */}
      {storeOffers.length > 0 && (
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>PROMO ACTIVA EN TIENDA</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll}>
            {storeOffers.map((offer) => (
              <View key={offer.id} style={styles.offerCard}>
                <View style={styles.offerBadgeContainer}>
                  <Text style={styles.offerBadgeText}>{offer.badge}</Text>
                </View>
                <Text style={styles.offerTitle} numberOfLines={1}>
                  {offer.title}
                </Text>
                <Text style={styles.offerDesc} numberOfLines={2}>
                  {offer.description}
                </Text>
                {onClaimOffer && (
                  <TouchableOpacity
                    style={styles.claimButton}
                    onPress={() => onClaimOffer(offer.id)}
                  >
                    <Text style={styles.claimButtonText}>Canjear Cupón</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Botones de Acción Personalizados según el estado de Llegada */}
      <View style={styles.actionsRow}>
        {isArrived ? (
          <>
            <TouchableOpacity
              style={styles.primaryArrivedBtn}
              onPress={handleOpenDetail}
              activeOpacity={0.88}
            >
              <AppIcon name="storefront" size={16} color="#FFFFFF" />
              <Text style={styles.primaryArrivedBtnText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryCatalogBtn}
              onPress={handleOpenCatalog}
              activeOpacity={0.85}
            >
              <AppIcon name="shirt" size={15} color="#FFFFFF" />
              <Text style={styles.secondaryCatalogBtnText}>Catálogo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pointsConciergeBtn}
              onPress={() => {
                notifyStoreArrival(storeProfile?.id || store.id, storeName);
                router.push('/concierge');
              }}
              activeOpacity={0.88}
            >
              <AppIcon name="gift" size={15} color="#FBBF24" />
              <Text style={styles.pointsConciergeBtnText}>+50 Pts</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.viewStoreButton}
              onPress={handleOpenDetail}
              activeOpacity={0.85}
            >
              <AppIcon name="storefront" size={16} color="#FFFFFF" />
              <Text style={styles.viewStoreButtonText}>Ver Tienda</Text>
            </TouchableOpacity>

            {onNavigateToStore && (
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => onNavigateToStore(store.id)}
                activeOpacity={0.85}
              >
                <MallOsSpriteIcon name="navegacion" size={16} showCircle={false} color="#FFFFFF" />
                <Text style={styles.navigateButtonText}>Guiarme hasta aquí</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 14,
    right: 14,
    padding: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 12,
    zIndex: 45,
  },
  bgImageWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 15, 30, 0.72)', // Tono oscuro balanceado para ver la fachada clara pero con máximo contraste
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
    marginRight: 8,
  },
  storeLogoBox: {
    width: 52,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  storeLogoImage: {
    width: '100%',
    height: '100%',
  },
  storeIconBox: {
    width: 52,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(37, 99, 235, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  arrivedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#34D399',
  },
  arrivedBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(37, 99, 235, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  floorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  floorText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  arrivalCalloutBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.5)',
    gap: 6,
  },
  arrivalCalloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arrivalPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  arrivalCalloutTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  arrivalCalloutDesc: {
    color: '#CBD5E1',
    fontSize: 11,
    lineHeight: 16,
  },
  infoBox: {
    marginTop: 10,
    gap: 6,
  },
  storeDescText: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statusHoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  openPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  openPillText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '800',
  },
  hoursText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  offersSection: {
    marginTop: 10,
  },
  sectionTitle: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  offersScroll: {
    flexDirection: 'row',
  },
  offerCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
    padding: 8,
    width: 200,
    marginRight: 8,
  },
  offerBadgeContainer: {
    backgroundColor: '#EA580C',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginBottom: 4,
  },
  offerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  offerTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 1,
  },
  offerDesc: {
    color: '#E2E8F0',
    fontSize: 10,
    lineHeight: 13,
  },
  claimButton: {
    marginTop: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.3)',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#FCD34D',
    fontSize: 10,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  primaryArrivedBtn: {
    flex: 1.3,
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#34D399',
  },
  primaryArrivedBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryCatalogBtn: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryCatalogBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  pointsConciergeBtn: {
    flex: 1.1,
    backgroundColor: '#D97706',
    borderWidth: 1.2,
    borderColor: '#FCD34D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 5,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
  },
  pointsConciergeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  viewStoreButton: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  viewStoreButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  navigateButton: {
    flex: 1.3,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
