import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import {
  type AgeGroup,
  AGE_GROUP_CONFIG,
} from './kids-data';
import { useKidsMode } from './useKidsMode';

interface KidsTreasureMapProps {
  onOpenRiddle: (index: number) => void;
  onOpenQRScanner: (index: number) => void;
  onOpenPrize: () => void;
  onReset: () => void;
  onNavigateToStore: (storeId: string) => void;
}

export const KidsTreasureMap: React.FC<KidsTreasureMapProps> = ({
  onOpenRiddle,
  onOpenQRScanner,
  onOpenPrize,
  onReset,
  onNavigateToStore,
}) => {
  const {
    ageGroup,
    playerName,
    avatar,
    isFamilyMode,
    currentRiddleIndex,
    completedRiddleIds,
    unlockedQRStoreIds,
    stars,
    prizeUnlocked,
    riddles,
    prize,
  } = useKidsMode();

  if (!ageGroup || !prize) return null;

  const config = AGE_GROUP_CONFIG[ageGroup];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Profile Card */}
      <View style={[styles.profileCard, { borderColor: config.color, backgroundColor: config.bgTint }]}>
        <View style={styles.profileRow}>
          <View style={[styles.avatarBadge, { backgroundColor: config.color }]}>
            <Text style={styles.avatarText}>{avatar}</Text>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.badgeRow}>
              <View style={[styles.levelBadge, { backgroundColor: config.color }]}>
                <Text style={styles.levelBadgeText}>{config.badge}</Text>
              </View>
              {isFamilyMode && (
                <View style={styles.familyBadge}>
                  <Text style={styles.familyBadgeText}>👨‍👩‍👧 EN FAMILIA</Text>
                </View>
              )}
            </View>
            <Text style={styles.playerNameText}>{playerName}</Text>
            <Text style={styles.levelTitleText}>{config.title}</Text>
          </View>

          <TouchableOpacity style={styles.resetBtn} onPress={onReset} activeOpacity={0.7}>
            <AppIcon name="refresh" size={16} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* 5 Stars Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((starNum) => {
              const isEarned = starNum <= stars;
              return (
                <View key={starNum} style={styles.starCol}>
                  <Text style={[styles.starIcon, isEarned ? styles.starEarned : styles.starEmpty]}>
                    {isEarned ? '⭐' : '☆'}
                  </Text>
                  <Text style={[styles.starLabel, isEarned && { color: config.accentColor }]}>
                    #{starNum}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                { width: `${(stars / 5) * 100}%`, backgroundColor: config.accentColor },
              ]}
            />
          </View>
          <Text style={styles.progressSummary}>
            {stars === 5 ? '¡Todos los acertijos resueltos! 🏆' : `${stars} de 5 tiendas visitadas`}
          </Text>
        </View>
      </View>

      {/* Prize Banner if Unlocked */}
      {prizeUnlocked && (
        <TouchableOpacity
          style={styles.unlockedPrizeCard}
          onPress={onOpenPrize}
          activeOpacity={0.88}
        >
          <View style={styles.trophyIconBox}>
            <Text style={{ fontSize: 28 }}>🏆</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.unlockedPrizeBadge}>¡PREMIO DESBLOQUEADO!</Text>
            <Text style={styles.unlockedPrizeTitle}>{prize.headline}</Text>
            <Text style={styles.unlockedPrizeSub}>Toca aquí para ver tu código de canje en McCafé</Text>
          </View>
          <AppIcon name="chevron-forward" size={20} color="#B45309" />
        </TouchableOpacity>
      )}

      {/* Instructions Pill */}
      <View style={styles.flowExplainer}>
        <Text style={styles.flowExplainerText}>
          📍 1. Ve al local con el mapa ➔ 📷 2. Escanea el QR del producto ➔ 🧩 3. Responde y gana ⭐
        </Text>
      </View>

      {/* Stations Trail Header */}
      <Text style={styles.sectionHeader}>Ruta de Visitas en Tiendas</Text>

      {/* 5 Stations List */}
      <View style={styles.stationsList}>
        {riddles.map((riddle, idx) => {
          const isCompleted = completedRiddleIds.includes(riddle.id);
          const isQRUnlocked = unlockedQRStoreIds.includes(riddle.storeId);
          const isCurrent = idx === currentRiddleIndex && !prizeUnlocked;
          const isLocked = idx > currentRiddleIndex && !isCompleted;

          return (
            <View
              key={riddle.id}
              style={[
                styles.stationCard,
                isCurrent && { borderColor: config.color, borderWidth: 2, backgroundColor: '#FFFFFF' },
                isCompleted && styles.stationCardCompleted,
                isLocked && styles.stationCardLocked,
              ]}
            >
              {/* Header Row of Station */}
              <View style={styles.stationMainRow}>
                {/* Station Number / Status Icon */}
                <View
                  style={[
                    styles.stationNumBox,
                    isCompleted && { backgroundColor: '#10B981' },
                    isCurrent && { backgroundColor: config.color },
                    isLocked && { backgroundColor: '#E2E8F0' },
                  ]}
                >
                  {isCompleted ? (
                    <AppIcon name="checkmark" size={18} color="#FFFFFF" />
                  ) : isCurrent ? (
                    <Text style={styles.stationNumText}>{idx + 1}</Text>
                  ) : (
                    <AppIcon name="lock-closed" size={16} color="#94A3B8" />
                  )}
                </View>

                {/* Station Info */}
                <View style={styles.stationInfo}>
                  <View style={styles.stationMetaRow}>
                    <Text style={styles.stationFloorText}>{riddle.floorName}</Text>
                    <Text style={styles.stationBadgeText}>• {riddle.badge}</Text>
                  </View>
                  <Text style={styles.stationStoreName}>{riddle.storeName}</Text>
                </View>

                {/* Status Pill */}
                {isCompleted && (
                  <View style={styles.completedPill}>
                    <Text style={styles.completedPillText}>⭐ Lista</Text>
                  </View>
                )}
              </View>

              {/* Micro-Deal In-Store Badge ($1 - $5 product) */}
              {!isLocked && (
                <View style={styles.dealRow}>
                  <View style={[styles.dealPill, { backgroundColor: config.bgTint, borderColor: config.color }]}>
                    <Text style={[styles.dealPillTag, { color: config.accentColor }]}>
                      🏷️ {riddle.featuredProduct.discountBadge}
                    </Text>
                    <Text style={styles.dealPillTitle}>
                      {riddle.featuredProduct.name} ({riddle.featuredProduct.price})
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Buttons for Current Active Station */}
              {isCurrent && (
                <View style={styles.stationActionRow}>
                  <TouchableOpacity
                    style={styles.mapActionBtn}
                    onPress={() => onNavigateToStore(riddle.storeId)}
                    activeOpacity={0.8}
                  >
                    <AppIcon name="navigate" size={14} color="#0284C7" />
                    <Text style={styles.mapActionBtnText}>Ver en Mapa</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.qrActionBtn,
                      { backgroundColor: config.accentColor },
                    ]}
                    onPress={() => {
                      if (isQRUnlocked) {
                        onOpenRiddle(idx);
                      } else {
                        onOpenQRScanner(idx);
                      }
                    }}
                    activeOpacity={0.88}
                  >
                    <AppIcon name={isQRUnlocked ? "help-circle" : "qr-code"} size={14} color="#FFFFFF" />
                    <Text style={styles.qrActionBtnText}>
                      {isQRUnlocked ? 'Responder Acertijo 🧩' : 'Escanear QR en Tienda 📸'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  profileCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatarBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
  },
  profileInfo: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  familyBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  familyBadgeText: {
    color: '#059669',
    fontSize: 9,
    fontWeight: '800',
  },
  playerNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  levelTitleText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  resetBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  starCol: {
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 22,
  },
  starEarned: {
    opacity: 1,
  },
  starEmpty: {
    color: '#CBD5E1',
    opacity: 0.6,
  },
  starLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 2,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    marginBottom: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressSummary: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textAlign: 'center',
  },
  unlockedPrizeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  trophyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedPrizeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  unlockedPrizeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#78350F',
    marginVertical: 2,
  },
  unlockedPrizeSub: {
    fontSize: 11,
    color: '#92400E',
  },
  flowExplainer: {
    backgroundColor: '#EEF2F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  flowExplainerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4,
  },
  stationsList: {
    gap: 12,
  },
  stationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stationMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stationCardCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  stationCardLocked: {
    backgroundColor: '#F8FAFC',
    opacity: 0.6,
  },
  stationNumBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationNumText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  stationInfo: {
    flex: 1,
  },
  stationMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stationFloorText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  stationBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
  stationStoreName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 1,
  },
  completedPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedPillText: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '700',
  },
  dealRow: {
    marginTop: 10,
  },
  dealPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
  },
  dealPillTag: {
    fontSize: 10,
    fontWeight: '800',
  },
  dealPillTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  stationActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  mapActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    gap: 5,
  },
  mapActionBtnText: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '800',
  },
  qrActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    gap: 6,
    elevation: 2,
  },
  qrActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
