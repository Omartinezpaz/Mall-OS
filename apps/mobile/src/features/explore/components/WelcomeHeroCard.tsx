import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';

interface WelcomeHeroCardProps {
  visitsCount: number;
  visitsTarget: number;
  onPressCTA?: () => void;
}

export const WelcomeHeroCard: React.FC<WelcomeHeroCardProps> = ({
  visitsCount = 1,
  visitsTarget = 3,
  onPressCTA,
}) => {
  const isCompleted = visitsCount >= visitsTarget;

  return (
    <View style={styles.cardContainer}>
      {/* Background Gradient / Shape accents */}
      <View style={styles.badgeRow}>
        <View style={styles.giftBadge}>
          <Text style={styles.giftIcon}>🎁</Text>
          <Text style={styles.giftText}>RECOMPENSA DE VISITAS</Text>
        </View>
        <Text style={styles.tagExclusive}>EXCLUSIVO APP</Text>
      </View>

      <Text style={styles.headline}>
        Gana $10 de descuento
      </Text>
      <Text style={styles.subhead}>
        Visita {visitsTarget} tiendas en tu recorrido y desbloquea cupones directos en caja.
      </Text>

      {/* Progress Dots / Tracker (Yummy Style ⚪ ⚪ ⚪) */}
      <View style={styles.progressRow}>
        <View style={styles.dotsContainer}>
          {Array.from({ length: visitsTarget }).map((_, idx) => {
            const filled = idx < visitsCount;
            return (
              <View
                key={idx}
                style={[
                  styles.dot,
                  filled && styles.dotFilled,
                ]}
              >
                {filled && <AppIcon name="checkmark" size={10} color="#FFFFFF" />}
              </View>
            );
          })}
          <Text style={styles.progressCountText}>
            {visitsCount}/{visitsTarget} visitadas
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.ctaButton, isCompleted && styles.ctaButtonCompleted]}
          onPress={onPressCTA}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>
            {isCompleted ? 'Canjear' : 'Comenzar'}
          </Text>
          <AppIcon
            name={isCompleted ? 'gift' : 'arrow-forward'}
            size={13}
            color="#0F172A"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
    overflow: 'hidden',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  giftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  giftIcon: {
    fontSize: 11,
  },
  giftText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  tagExclusive: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headline: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  subhead: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
    marginBottom: 14,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.6)',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    borderWidth: 1.5,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotFilled: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  progressCountText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  ctaButton: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ctaButtonCompleted: {
    backgroundColor: '#10B981',
  },
  ctaButtonText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
});
