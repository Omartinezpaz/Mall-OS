import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getOffers, activateLocalCoupon } from '../../src/features/offers';
import { MallOsSpriteIcon } from '../../src/components/MallOsSpriteIcon';

export default function OfertasScreen() {
  const router = useRouter();
  const [offers, setOffers] = useState(() => getOffers());

  const heroOffer = offers[0] || {
    id: 'off_gran_oportunidad',
    storeName: 'Tiendas del Mall',
    storeFloor: 1,
    storeUnit: 'Nivel 1 · Tiendas Participantes',
    title: '¡Gran Oportunidad! Hasta 30% OFF',
    benefitLabel: 'Hasta 30% OFF',
    description: 'Consigue tu oferta especial con descuentos del 5%, 10%, 20% y 30% en tiendas y productos seleccionados.',
    validUntil: 'Válida hoy · 15 sep 2026',
    remainingCoupons: 68,
    totalCoupons: 100,
  };

  const handleActivate = (offerId: string) => {
    try {
      const coupon = activateLocalCoupon(offerId);
      setOffers([...getOffers()]);
      router.push(`/cupon/${coupon.id}`);
    } catch (err: any) {
      Alert.alert('Aviso', err.message || 'No se pudo activar el cupón.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      {/* Top Bar */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Ofertas del Mall</Text>
        <Text style={styles.headerSubtitle}>Mall Demo · Promociones exclusivas y cupones canjeables</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Featured Offer Banner (Full Width Extremo a Extremo) */}
        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.9}
          onPress={() => handleActivate(heroOffer.id)}
        >
          <Image
            source={require('../../assets/offers/banner_ofertas.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.bodyContent}>
          {/* Offer Specs Chips */}
          <View style={styles.chipsRow}>
            <View style={styles.specChip}>
              <View style={styles.specIconBox}>
                <MallOsSpriteIcon name="promociones" size={16} showCircle={false} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.specChipLabel}>Válida hoy</Text>
                <Text style={styles.specChipValue}>15 sep 2026</Text>
              </View>
            </View>

            <View style={styles.specChip}>
              <View style={styles.specIconBox}>
                <MallOsSpriteIcon name="ubicacion" size={16} showCircle={false} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.specChipLabel}>Ubicación</Text>
                <Text style={styles.specChipValue}>
                  Nivel {heroOffer.storeFloor === 0 ? 'PB' : heroOffer.storeFloor} · Tienda
                </Text>
              </View>
            </View>
          </View>

          {/* Offer Description Details */}
          <View style={styles.detailsBlock}>
            <Text style={styles.detailsTitle}>Detalles de la oferta</Text>
            <Text style={styles.detailsText}>{heroOffer.description}</Text>
          </View>

          {/* CTA Action Buttons (Screen 6 Mockup) */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.primaryActivateBtn}
              activeOpacity={0.88}
              onPress={() => handleActivate(heroOffer.id)}
            >
              <Text style={styles.primaryActivateBtnText}>Activar oferta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryMapBtn}
              activeOpacity={0.85}
              onPress={() => router.push({ pathname: '/(tabs)/mapa', params: { storeId: heroOffer.storeId, t: Date.now().toString() } })}
            >
              <Text style={styles.secondaryMapBtnText}>Ver tienda en el mapa</Text>
            </TouchableOpacity>
          </View>

          {/* More Offers Section (Tarjetas enriquecidas y relacionadas con el carrusel del mapa) */}
          <View style={styles.moreOffersSection}>
            <Text style={styles.moreOffersTitle}>Más promociones activas</Text>

            {offers.slice(1).map((item) => {
              const glow = item.glowColor || '#2563EB';
              const badgeBg = item.badgeColor || '#E11D48';

              return (
                <View key={item.id} style={[styles.offerRichCard, { borderColor: `${glow}33` }]}>
                  {/* Banner / Foto del producto o tienda */}
                  <View style={styles.offerCardBannerContainer}>
                    {item.imageUrl ? (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.offerCardBannerImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.offerCardBannerPlaceholder, { backgroundColor: `${glow}18` }]} />
                    )}
                    {/* Badge flotante de descuento */}
                    <View style={[styles.offerBadgeOverlay, { backgroundColor: badgeBg }]}>
                      <Text style={styles.offerBadgeOverlayText}>{item.badge || item.benefitLabel}</Text>
                    </View>
                  </View>

                  <View style={styles.offerCardBody}>
                    {/* Header de la Tienda con Logo oficial y Unidad */}
                    <View style={styles.offerStoreHeader}>
                      {item.logo ? (
                        <View style={styles.offerLogoContainer}>
                          <Image source={item.logo} style={styles.offerLogoImage} resizeMode="contain" />
                        </View>
                      ) : (
                        <View style={[styles.offerIconContainer, { backgroundColor: `${glow}18` }]}>
                          <MallOsSpriteIcon name="promociones" size={18} color={glow} showCircle={false} />
                        </View>
                      )}
                      <View style={styles.offerStoreMeta}>
                        <Text style={styles.offerStoreName}>{item.storeName}</Text>
                        <Text style={styles.offerStoreUnit}>
                          Piso {item.storeFloor === 0 ? 'PB' : `P${item.storeFloor}`} · {item.storeUnit}
                        </Text>
                      </View>
                      <View style={styles.stockChip}>
                        <Text style={styles.stockChipText}>{item.remainingCoupons} disponibles</Text>
                      </View>
                    </View>

                    {/* Título y Descripción de la Oferta */}
                    <Text style={styles.offerTitleText}>{item.title}</Text>
                    <Text style={styles.offerDescText}>{item.description}</Text>

                    {/* Acciones Duales: Obtener Cupón y Ver Ruta en el Mapa */}
                    <View style={styles.offerActionsRow}>
                      <TouchableOpacity
                        style={styles.actionCouponBtn}
                        activeOpacity={0.88}
                        onPress={() => handleActivate(item.id)}
                      >
                        <Text style={styles.actionCouponBtnText}>Obtener Cupón →</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionMapBtn}
                        activeOpacity={0.85}
                        onPress={() => {
                          router.push({
                            pathname: '/(tabs)/mapa',
                            params: { storeId: item.storeId, t: Date.now().toString() },
                          });
                        }}
                      >
                        <MallOsSpriteIcon name="ubicacion" size={14} color="#1D4ED8" showCircle={false} />
                        <Text style={styles.actionMapBtnText}>Ver en mapa</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBar: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 40,
  },
  heroCard: {
    width: '100%',
    aspectRatio: 3168 / 1344,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  bodyContent: {
    paddingHorizontal: 18,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  specChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  specIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specChipLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  specChipValue: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  detailsBlock: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  detailsTitle: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  detailsText: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 20,
  },
  actionButtons: {
    gap: 10,
    marginBottom: 28,
  },
  primaryActivateBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryActivateBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryMapBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  secondaryMapBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  moreOffersSection: {
    gap: 12,
    paddingBottom: 20,
  },
  moreOffersTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  offerRichCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  offerCardBannerContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  offerCardBannerImage: {
    width: '100%',
    height: '100%',
  },
  offerCardBannerPlaceholder: {
    width: '100%',
    height: '100%',
  },
  offerBadgeOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  offerBadgeOverlayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  offerCardBody: {
    padding: 16,
    gap: 10,
  },
  offerStoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  offerLogoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  offerLogoImage: {
    width: '100%',
    height: '100%',
  },
  offerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerStoreMeta: {
    flex: 1,
  },
  offerStoreName: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  offerStoreUnit: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 1,
  },
  stockChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockChipText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
  },
  offerTitleText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  offerDescText: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
  },
  offerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  actionCouponBtn: {
    flex: 1.2,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  actionCouponBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  actionMapBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  actionMapBtnText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
  },
});

