import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { StoreOffer } from '@mallos/map-engine';

export interface DealItem extends StoreOffer {
  storeName: string;
  floorLabel: string;
  distanceMeters: number;
  category: string;
}

interface DealsNearYouCarouselProps {
  deals: DealItem[];
  onGuideToStore: (storeId: string) => void;
  onClaimDeal?: (dealId: string) => void;
}

export const DealsNearYouCarousel: React.FC<DealsNearYouCarouselProps> = ({
  deals,
  onGuideToStore,
  onClaimDeal,
}) => {
  if (deals.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.fireIcon}>🔥</Text>
          <Text style={styles.sectionTitle}>Ofertas cerca de ti</Text>
        </View>
        <Text style={styles.sectionTag}>DISTANCIA CORTA</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {deals.map((deal) => (
          <View key={deal.id} style={styles.dealCard}>
            {/* Top Badge & Distance */}
            <View style={styles.cardHeader}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>{deal.badge}</Text>
              </View>
              <View style={styles.distancePill}>
                <Ionicons name="walk" size={11} color="#64748B" />
                <Text style={styles.distanceText}>{deal.distanceMeters}m</Text>
              </View>
            </View>

            {/* Store & Offer Content */}
            <Text style={styles.storeName} numberOfLines={1}>
              {deal.storeName}
            </Text>
            <Text style={styles.floorSub} numberOfLines={1}>
              {deal.floorLabel}
            </Text>

            <Text style={styles.offerTitle} numberOfLines={2}>
              {deal.title}
            </Text>

            {deal.rewardPoints && (
              <View style={styles.rewardTag}>
                <Ionicons name="star" size={10} color="#F59E0B" />
                <Text style={styles.rewardText}>+{deal.rewardPoints} pts con visita</Text>
              </View>
            )}

            {/* CTA Button: Guíame hasta aquí */}
            <TouchableOpacity
              style={styles.guideBtn}
              onPress={() => onGuideToStore(deal.storeId)}
              activeOpacity={0.8}
            >
              <Ionicons name="navigate" size={13} color="#FFFFFF" />
              <Text style={styles.guideBtnText}>Guíame</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fireIcon: {
    fontSize: 16,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  sectionTag: {
    color: '#3B82F6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dealCard: {
    width: 210,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  distancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  distanceText: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
  },
  storeName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  floorSub: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  offerTitle: {
    color: '#334155',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  rewardTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 3,
    marginBottom: 10,
  },
  rewardText: {
    color: '#B45309',
    fontSize: 9,
    fontWeight: '700',
  },
  guideBtn: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 5,
  },
  guideBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
