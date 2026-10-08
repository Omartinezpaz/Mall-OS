import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { MapStore, StoreOffer } from '@mallos/map-engine';
import { GlassSurface } from '../../components/GlassSurface';

interface StorefrontHUDProps {
  store: MapStore | null;
  offers: StoreOffer[];
  floorName: string;
  onClose: () => void;
  onNavigateToStore: (storeId: string) => void;
  onClaimOffer?: (offerId: string) => void;
}

export function StorefrontHUD({
  store,
  offers,
  floorName,
  onClose,
  onNavigateToStore,
  onClaimOffer,
}: StorefrontHUDProps) {
  if (!store) return null;

  const storeOffers = offers.filter((o) => o.storeId === store.id);

  return (
    <GlassSurface variant="dark" intensity="strong" radius="xl" style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{store.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.storeName} numberOfLines={1}>
            {store.name}
          </Text>
          <Text style={styles.floorText}>
            <Ionicons name="location-outline" size={13} color="#94A3B8" /> {floorName}
          </Text>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Ofertas y Promociones Activas */}
      {storeOffers.length > 0 ? (
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>PROMO DESTACADA</Text>
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
                {offer.rewardPoints && (
                  <View style={styles.pointsPill}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={styles.pointsText}>+{offer.rewardPoints} pts por visita</Text>
                  </View>
                )}
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
      ) : (
        <View style={styles.noOffersBox}>
          <Text style={styles.noOffersText}>Tienda abierta · Acumula puntos con tu visita</Text>
        </View>
      )}

      {/* Botón de Navegación Rápida */}
      <TouchableOpacity
        style={styles.navigateButton}
        onPress={() => onNavigateToStore(store.id)}
        activeOpacity={0.8}
      >
        <Ionicons name="navigate" size={18} color="#FFFFFF" />
        <Text style={styles.navigateButtonText}>Guiarme hasta aquí</Text>
      </TouchableOpacity>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 14,
    right: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    zIndex: 45,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 2,
  },
  categoryText: {
    color: '#60A5FA',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  storeName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  floorText: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offersSection: {
    marginTop: 8,
  },
  sectionTitle: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  offersScroll: {
    flexDirection: 'row',
  },
  offerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
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
    color: '#94A3B8',
    fontSize: 10,
    lineHeight: 13,
  },
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  pointsText: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '700',
  },
  claimButton: {
    marginTop: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
  },
  noOffersBox: {
    paddingVertical: 4,
  },
  noOffersText: {
    color: '#64748B',
    fontSize: 11,
    fontStyle: 'italic',
  },
  navigateButton: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    gap: 6,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
