import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import { audioManager } from '../../lib/audio-manager';
import {
  type KidsRiddle as KidsRiddleType,
  type AgeGroup,
  AGE_GROUP_CONFIG,
} from './kids-data';
import { useKidsMode } from './useKidsMode';

interface KidsRiddleProps {
  riddle: KidsRiddleType;
  ageGroup: AgeGroup;
  onSuccess: () => void;
  onBack: () => void;
}

export const KidsRiddle: React.FC<KidsRiddleProps> = ({
  riddle,
  ageGroup,
  onSuccess,
  onBack,
}) => {
  const { submitAnswer, isFamilyMode } = useKidsMode();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSpeakingRiddle, setIsSpeakingRiddle] = useState<boolean>(false);

  const config = AGE_GROUP_CONFIG[ageGroup];

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((speaking) => {
      if (!speaking) {
        setIsSpeakingRiddle(false);
      }
    });
    return () => {
      unsubscribe();
      audioManager.stop();
    };
  }, []);

  const handleSpeakRiddle = () => {
    if (isSpeakingRiddle) {
      audioManager.stop(true);
      setIsSpeakingRiddle(false);
      return;
    }

    const optionsText = riddle.options.map((opt, i) => `Opción ${i + 1}: ${opt.label}`).join('. ');
    const fullText = `Acertijo de ${riddle.storeName}. ${riddle.prompt}. ${showHint ? `Pista: ${riddle.hint}. ` : ''}Las opciones son: ${optionsText}`;

    setIsSpeakingRiddle(true);
    audioManager.speak({
      text: fullText,
      priority: 'high',
      language: 'es-VE',
      pitch: 1.05,
      rate: 0.95,
      onDone: () => setIsSpeakingRiddle(false),
      onError: () => setIsSpeakingRiddle(false),
    });
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setFeedback(null);

    const result = submitAnswer(optionId);
    if (result.correct) {
      onSuccess();
    } else {
      setFeedback({
        message: result.explanation,
        isError: true,
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Navigation Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <AppIcon name="arrow-back" size={20} color="#334155" />
        </TouchableOpacity>
        <View style={styles.stationBadge}>
          <Text style={[styles.stationBadgeText, { color: config.accentColor }]}>
            ESTACIÓN {riddle.number} DE 5
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Store Location Card */}
      <View style={[styles.storeCard, { borderColor: config.color, backgroundColor: config.bgTint }]}>
        <View style={styles.storeIconBox}>
          <AppIcon name="storefront" size={22} color={config.accentColor} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.storeTagRow}>
            <Text style={styles.storeFloorText}>{riddle.floorName}</Text>
            <Text style={styles.storeCategoryText}>• {riddle.category}</Text>
          </View>
          <Text style={styles.storeNameText}>{riddle.storeName}</Text>
          <Text style={[styles.sponsorText, { color: config.accentColor }]}>{riddle.sponsorName}</Text>
        </View>
      </View>

      {/* Verified Micro-Deal Product Banner */}
      <View style={styles.verifiedProductCard}>
        <View style={styles.verifiedCheckBadge}>
          <AppIcon name="checkmark-circle" size={16} color="#10B981" />
          <Text style={styles.verifiedBadgeText}>QR VERIFICADO EN TIENDA</Text>
        </View>
        <Text style={styles.verifiedProductName}>{riddle.featuredProduct.name}</Text>
        <Text style={styles.verifiedProductPrice}>
          Oferta: {riddle.featuredProduct.price} ({riddle.featuredProduct.discountBadge})
        </Text>
      </View>

      {/* Family Mode Alert */}
      {isFamilyMode && (
        <View style={styles.familyNotice}>
          <Text style={styles.familyNoticeEmoji}>👨‍👩‍👧</Text>
          <Text style={styles.familyNoticeText}>
            ¡Momento en Equipo! Conversen la pista antes de responder.
          </Text>
        </View>
      )}

      {/* Riddle Question Box */}
      <View style={styles.questionCard}>
        <View style={styles.badgeRow}>
          <View style={[styles.questionTag, { backgroundColor: config.color }]}>
            <Text style={styles.questionTagText}>ACERTIJO</Text>
          </View>
          <Text style={styles.badgeTitle}>{riddle.badge}</Text>

          {/* Audio Speaker Button for Question */}
          <TouchableOpacity
            style={[styles.riddleSpeakerBtn, isSpeakingRiddle && styles.riddleSpeakerBtnActive]}
            onPress={handleSpeakRiddle}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppIcon
              name={isSpeakingRiddle ? "volume-high" : "volume-medium"}
              size={15}
              color={isSpeakingRiddle ? "#2563EB" : "#64748B"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.promptText}>{riddle.prompt}</Text>

        {/* Hint Toggle */}
        <TouchableOpacity
          style={styles.hintToggle}
          onPress={() => setShowHint(!showHint)}
          activeOpacity={0.8}
        >
          <AppIcon name="bulb" size={16} color="#F59E0B" />
          <Text style={styles.hintToggleText}>
            {showHint ? 'Ocultar Pista' : '¿Necesitas una Pista?'}
          </Text>
        </TouchableOpacity>

        {showHint && (
          <View style={styles.hintBox}>
            <Text style={styles.hintText}>{riddle.hint}</Text>
          </View>
        )}
      </View>

      {/* Feedback Banner on Error */}
      {feedback?.isError && (
        <View style={styles.errorFeedback}>
          <AppIcon name="alert-circle" size={18} color="#DC2626" />
          <Text style={styles.errorFeedbackText}>{feedback.message}</Text>
        </View>
      )}

      {/* Options List */}
      <Text style={styles.optionsHeader}>Selecciona tu respuesta:</Text>
      <View style={styles.optionsGrid}>
        {riddle.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionBtn,
                isSelected && { borderColor: config.color, backgroundColor: config.bgTint, transform: [{ scale: 1.02 }] },
              ]}
              onPress={() => handleSelectOption(opt.id)}
              activeOpacity={0.85}
            >
              {opt.emoji && <Text style={styles.optionEmoji}>{opt.emoji}</Text>}
              <Text style={[styles.optionLabel, isSelected && { color: config.accentColor, fontWeight: '800' }]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ height: 32 }} />
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
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stationBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stationBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 12,
    gap: 12,
    marginBottom: 12,
  },
  storeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  storeTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeFloorText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  storeCategoryText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  storeNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  sponsorText: {
    fontSize: 11,
    fontWeight: '700',
  },
  verifiedProductCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 10,
    marginBottom: 12,
  },
  verifiedCheckBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  verifiedBadgeText: {
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verifiedProductName: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  verifiedProductPrice: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  familyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 10,
    gap: 8,
    marginBottom: 12,
  },
  familyNoticeEmoji: {
    fontSize: 18,
  },
  familyNoticeText: {
    flex: 1,
    fontSize: 12,
    color: '#047857',
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  questionTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  questionTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  promptText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 12,
  },
  hintToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  hintToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  hintBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#78350F',
    fontWeight: '600',
    lineHeight: 16,
  },
  errorFeedback: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 14,
  },
  errorFeedbackText: {
    flex: 1,
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '700',
  },
  optionsHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  optionsGrid: {
    gap: 10,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 12,
  },
  optionEmoji: {
    fontSize: 24,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  riddleSpeakerBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginLeft: 'auto',
  },
  riddleSpeakerBtnActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#93C5FD',
  },
});
