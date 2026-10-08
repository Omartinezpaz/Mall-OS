import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassSurface } from '../../../components/GlassSurface';
import { AppIcon } from '../../../components/AppIcon';

interface ExploreHeaderProps {
  mallName?: string;
  points: number;
  userLevel: number;
  levelName: string;
  onPointsPress?: () => void;
}

export const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  mallName = 'Sambil Chacao',
  points,
  userLevel,
  levelName,
  onPointsPress,
}) => {
  return (
    <View style={styles.header}>
      {/* Selector / Píldora de Ubicación */}
      <View style={styles.locationPill}>
        <View style={styles.pinCircle}>
          <AppIcon name="location" size={13} color="#EF4444" />
        </View>
        <Text style={styles.locationText} numberOfLines={1}>
          {mallName}
        </Text>
        <AppIcon name="chevron-down" size={14} color="#64748B" strokeWidth={2.5} />
      </View>

      {/* Píldora de Puntos & Nivel (Yummy-style) */}
      <TouchableOpacity
        onPress={onPointsPress}
        activeOpacity={0.8}
      >
        <GlassSurface
          variant="dark"
          intensity="normal"
          radius="pill"
          style={styles.pointsBadge}
        >
          <View style={styles.crownCircle}>
            <AppIcon name="trophy" size={12} color="#F59E0B" />
          </View>
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsNumber}>{points} pts</Text>
            <Text style={styles.levelTag}>Nv. {userLevel}</Text>
          </View>
        </GlassSurface>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '55%',
  },
  pinCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    flexShrink: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  crownCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsInfo: {
    alignItems: 'flex-start',
  },
  pointsNumber: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
  },
  levelTag: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
  },
});

