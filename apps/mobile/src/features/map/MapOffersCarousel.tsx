import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppIcon } from '../../components/AppIcon';
import { MallOsSpriteIcon, type MallOsIconId } from '../../components/MallOsSpriteIcon';
import { getOffers, type OfferItem } from '../offers';

interface MapOffersCarouselProps {
  onSelectOffer: (storeId: string) => void;
}

export function MapOffersCarousel({ onSelectOffer }: MapOffersCarouselProps) {
  const router = useRouter();
  const allOffers = getOffers();
  // Se alimenta directamente de las ofertas activas del mall (excluyendo el banner global)
  const offers = allOffers.filter(
    (o) => o.id !== 'o0000000-0000-0000-0000-000000000001'
  );

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Encabezado con título, badge EN VIVO y enlace directo a la pestaña Ofertas */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Ofertas Flash</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>EN VIVO</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewAllBtn}
          onPress={() => router.push('/(tabs)/ofertas')}
          activeOpacity={0.75}
        >
          <Text style={styles.viewAllText}>Ver todas →</Text>
        </TouchableOpacity>
      </View>

      {/* Carrusel horizontal de tarjetas blancas limpias con glow y bordes finos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
      >
        {offers.map((offer) => {
          const glow = offer.glowColor || '#2563EB';
          const badgeBg = offer.badgeColor || '#E11D48';

          return (
            <TouchableOpacity
              key={offer.id}
              style={[
                styles.card,
                { borderColor: `${glow}44` },
              ]}
              onPress={() => onSelectOffer(offer.storeId)}
              activeOpacity={0.88}
            >
              {/* Imagen de Portada de la Marca / Tienda en la parte superior */}
              <View style={styles.cardBannerContainer}>
                {offer.imageUrl ? (
                  <Image
                    source={{ uri: offer.imageUrl }}
                    style={styles.cardBannerImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.cardBannerPlaceholder, { backgroundColor: `${glow}18` }]} />
                )}
                {/* Píldora de Descuento sobre la imagen */}
                <View
                  style={[
                    styles.discountBadgeOverlay,
                    { backgroundColor: badgeBg },
                  ]}
                >
                  <Text style={styles.discountBadgeOverlayText}>{offer.badge || offer.benefitLabel}</Text>
                </View>
              </View>

              {/* Cuerpo de la Tarjeta */}
              <View style={styles.cardBody}>
                <View style={styles.storeHeaderRow}>
                  {offer.logo ? (
                    <View style={styles.logoBox}>
                      <Image source={offer.logo} style={styles.logoImage} resizeMode="contain" />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.iconBox,
                        {
                          backgroundColor: `${glow}18`,
                          borderColor: `${glow}44`,
                        },
                      ]}
                    >
                      <MallOsSpriteIcon
                        name={(offer.icon as MallOsIconId) || 'promociones'}
                        size={14}
                        color={glow}
                        showCircle={false}
                      />
                    </View>
                  )}
                  <Text style={styles.storeName} numberOfLines={1}>
                    {offer.storeName}
                  </Text>
                </View>

                <Text style={styles.offerTitle} numberOfLines={1}>
                  {offer.title}
                </Text>
                <Text style={styles.offerDesc} numberOfLines={1}>
                  {offer.description}
                </Text>

                {/* Botón VER RUTA con flecha neón */}
                <View style={styles.cardFooter}>
                  <Text style={[styles.verRutaText, { color: glow }]}>
                    VER RUTA
                  </Text>
                  <AppIcon name="arrow-forward" size={12} color={glow} strokeWidth={2.5} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#F43F5E',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E11D48',
  },
  liveText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#E11D48',
    letterSpacing: 0.5,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1D4ED8',
    letterSpacing: -0.2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 176,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.2,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardBannerContainer: {
    width: '100%',
    height: 78,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  cardBannerImage: {
    width: '100%',
    height: '100%',
  },
  cardBannerPlaceholder: {
    width: '100%',
    height: '100%',
  },
  discountBadgeOverlay: {
    position: 'absolute',
    top: 7,
    right: 7,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  discountBadgeOverlayText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  cardBody: {
    padding: 10,
  },
  storeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 2,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  storeName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  offerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 1,
  },
  offerDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  verRutaText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

});

