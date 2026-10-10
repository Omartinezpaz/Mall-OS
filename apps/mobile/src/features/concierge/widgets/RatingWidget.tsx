import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';

interface RatingWidgetProps {
  title?: string;
  subtitle?: string;
  onRate: (rating: number) => void;
  submittedRating?: number;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Regular',
  2: 'Aceptable',
  3: 'Buena experiencia',
  4: '¡Muy buena!',
  5: '¡Excelente servicio!',
};

export const RatingWidget: React.FC<RatingWidgetProps> = ({
  title = '¿Cómo calificarías tu experiencia?',
  subtitle = 'Tu opinión nos ayuda a premiarte y mejorar el servicio.',
  onRate,
  submittedRating,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(submittedRating ?? null);
  const isSubmitted = typeof submittedRating === 'number' || selectedRating !== null;

  const handleSelect = (stars: number) => {
    if (submittedRating) return;
    setSelectedRating(stars);
    onRate(stars);
  };

  const activeScore = submittedRating ?? selectedRating ?? 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((starVal) => {
          const isFilled = starVal <= activeScore;
          return (
            <TouchableOpacity
              key={starVal}
              style={styles.starBtn}
              onPress={() => handleSelect(starVal)}
              disabled={Boolean(submittedRating)}
              activeOpacity={0.7}
            >
              <AppIcon
                name="star"
                size={28}
                color={isFilled ? '#F59E0B' : '#E2E8F0'}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {activeScore > 0 && (
        <View style={styles.feedbackBadge}>
          <AppIcon name="checkmark" size={12} color="#059669" />
          <Text style={styles.feedbackText}>{RATING_LABELS[activeScore] || 'Calificado'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 4,
  },
  starBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
  },
  feedbackBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    backgroundColor: '#ECFDF5',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
});
