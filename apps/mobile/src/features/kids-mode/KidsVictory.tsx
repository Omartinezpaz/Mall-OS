import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Speech from 'expo-speech';
import {
  type AgeGroup,
  AGE_GROUP_CONFIG,
} from './kids-data';
import { useKidsMode } from './useKidsMode';

interface KidsVictoryProps {
  onContinue: () => void;
  onViewTreasureMap: () => void;
}

export const KidsVictory: React.FC<KidsVictoryProps> = ({
  onContinue,
  onViewTreasureMap,
}) => {
  const { ageGroup, playerName, stars, prizeUnlocked, currentRiddle, riddles } = useKidsMode();

  useEffect(() => {
    Speech.stop();
    const celebrationText = prizeUnlocked
      ? `¡Felicidades, ${playerName || 'Explorador'}! ¡Conseguiste las 5 estrellas y desbloqueaste tu premio final!`
      : `¡Excelente trabajo, ${playerName || 'Explorador'}! Ganaste una estrella del mall.`;

    Speech.speak(celebrationText, {
      language: 'es-VE',
      pitch: 1.1,
      rate: 0.95,
    });
  }, [prizeUnlocked, playerName]);

  const justCompletedRiddle = (stars > 0 && riddles[stars - 1]) ? riddles[stars - 1] : currentRiddle;

  if (!ageGroup) return null;
  const config = AGE_GROUP_CONFIG[ageGroup];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Golden Star Animation / Badge */}
      <View style={styles.burstCard}>
        <View style={styles.starCircle}>
          <Text style={styles.starEmoji}>⭐</Text>
        </View>
        <Text style={styles.victoryTitle}>¡ACERTASTE!</Text>
        <Text style={[styles.starRewardText, { color: config.accentColor }]}>
          +1 Estrella del Mall Conquistada
        </Text>
      </View>

      {/* Explanation Box */}
      {justCompletedRiddle && (
        <View style={styles.explanationCard}>
          <Text style={styles.explanationHeader}>Pista Descifrada:</Text>
          <Text style={styles.explanationText}>{justCompletedRiddle.explanation}</Text>
          <Text style={[styles.storeBadge, { color: config.accentColor }]}>
            📍 Estación completada en {justCompletedRiddle.storeName} ({justCompletedRiddle.floorName})
          </Text>
        </View>
      )}

      {/* Progress Pill Card */}
      <View style={[styles.progressCard, { backgroundColor: config.bgTint, borderColor: config.color }]}>
        <Text style={styles.progressCardTitle}>Tu Progreso del Tesoro</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((starNum) => (
            <Text
              key={starNum}
              style={[
                styles.starIcon,
                starNum <= stars ? styles.starFilled : styles.starEmpty,
              ]}
            >
              {starNum <= stars ? '⭐' : '☆'}
            </Text>
          ))}
        </View>
        <Text style={[styles.progressCardSub, { color: config.accentColor }]}>
          {stars === 5 ? '¡Has completado todas las 5 estrellas! 🏆' : `Llevas ${stars} de ${riddles.length} estrellas`}
        </Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={[styles.continueBtn, { backgroundColor: config.accentColor }]}
        onPress={onContinue}
        activeOpacity={0.88}
      >
        <Text style={styles.continueBtnText}>
          {prizeUnlocked ? '¡Desbloquear Premio Final! 🏆' : 'Siguiente Estación 🗺️'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapBtn} onPress={onViewTreasureMap} activeOpacity={0.8}>
        <Text style={styles.mapBtnText}>Ver Mapa del Tesoro</Text>
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    alignItems: 'center',
  },
  burstCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  starCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FEF3C7',
    borderWidth: 3,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
  },
  starEmoji: {
    fontSize: 48,
  },
  victoryTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: 'SpaceGrotesk-Bold',
    letterSpacing: 0.5,
  },
  starRewardText: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  explanationCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  explanationHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 20,
    marginBottom: 8,
  },
  storeBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressCard: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    marginBottom: 24,
  },
  progressCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  starIcon: {
    fontSize: 26,
  },
  starFilled: {
    opacity: 1,
  },
  starEmpty: {
    color: '#CBD5E1',
    opacity: 0.5,
  },
  progressCardSub: {
    fontSize: 12,
    fontWeight: '800',
  },
  continueBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  mapBtn: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBtnText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
});
