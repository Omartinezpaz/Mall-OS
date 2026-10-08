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
    id: 'off_nike_20',
    storeName: 'Nike',
    storeFloor: 1,
    storeUnit: 'Local 102',
    title: '20% OFF',
    benefitLabel: '20% OFF',
    description: 'En productos seleccionados. 20% de descuento en toda la colección de calzado y ropa deportiva.',
    validUntil: 'Válida hoy · 15 sep 2026',
    remainingCoupons: 14,
    totalCoupons: 50,
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
        {/* Hero Featured Offer Card (Prototype Screen 6 Style) */}
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />

          {/* Top Floating Badge */}
          <View style={styles.brandPill}>
            <MallOsSpriteIcon name="deportes" size={14} showCircle={false} color="#FFFFFF" />
            <Text style={styles.brandPillText}>{heroOffer.storeName}</Text>
          </View>

          {/* Hero Content */}
          <View style={styles.heroInfo}>
            <Text style={styles.heroDiscountTitle}>{heroOffer.title}</Text>
            <Text style={styles.heroTargetSubtitle}>En productos seleccionados</Text>
            <Text style={styles.heroStoreLabel}>
              {heroOffer.storeName} · Nivel {heroOffer.storeFloor === 0 ? 'PB' : heroOffer.storeFloor}
            </Text>
          </View>
        </View>

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
            onPress={() => router.push(`/(tabs)/mapa`)}
          >
            <Text style={styles.secondaryMapBtnText}>Ver tienda en el mapa</Text>
          </TouchableOpacity>
        </View>

        {/* More Offers Section */}
        <View style={styles.moreOffersSection}>
          <Text style={styles.moreOffersTitle}>Más promociones activas</Text>

          {offers.slice(1).map((item) => (
            <View key={item.id} style={styles.offerMiniCard}>
              <View style={styles.miniCardHeader}>
                <View style={styles.miniStoreInfo}>
                  <Text style={styles.miniStoreName}>{item.storeName}</Text>
                  <Text style={styles.miniStoreUnit}>
                    Piso {item.storeFloor === 0 ? 'PB' : `P${item.storeFloor}`} · {item.storeUnit}
                  </Text>
                </View>
                <View style={styles.miniBenefitBadge}>
                  <Text style={styles.miniBenefitText}>{item.benefitLabel}</Text>
                </View>
              </View>

              <Text style={styles.miniOfferTitle}>{item.title}</Text>
              <Text style={styles.miniOfferDesc}>{item.description}</Text>

              <TouchableOpacity
                style={styles.miniActivateBtn}
                activeOpacity={0.8}
                onPress={() => handleActivate(item.id)}
              >
                <Text style={styles.miniActivateBtnText}>Obtener Cupón →</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },
  heroCard: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F172A',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  brandPill: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  brandIcon: {
    fontSize: 14,
  },
  brandPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  heroInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroDiscountTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  heroTargetSubtitle: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  heroStoreLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
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
  offerMiniCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  miniCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniStoreInfo: {
    gap: 2,
  },
  miniStoreName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
  miniStoreUnit: {
    color: '#64748B',
    fontSize: 12,
  },
  miniBenefitBadge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  miniBenefitText: {
    color: '#EA580C',
    fontSize: 11,
    fontWeight: '800',
  },
  miniOfferTitle: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
  miniOfferDesc: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 17,
  },
  miniActivateBtn: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  miniActivateBtnText: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
});

