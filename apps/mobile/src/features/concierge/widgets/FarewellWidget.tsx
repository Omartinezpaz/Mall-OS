import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';

interface FarewellWidgetProps {
  pointsEarned: number;
  drinkName?: string;
  storeName?: string;
  onRestart: () => void;
  onExploreMall: () => void;
}

export const FarewellWidget: React.FC<FarewellWidgetProps> = ({
  pointsEarned = 150,
  drinkName,
  storeName = 'McCafé',
  onRestart,
  onExploreMall,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topBadge}>
        <AppIcon name="checkmark-done" size={14} color="#059669" />
        <Text style={styles.topBadgeText}>Experiencia de Compra Completada</Text>
      </View>

      <Text style={styles.title}>¡Feliz día en Sambil Chacao!</Text>
      <Text style={styles.subtitle}>
        Esperamos que tu visita haya sido placentera. Hemos registrado tus beneficios de fidelidad con éxito.
      </Text>

      {/* Rewards Box */}
      <View style={styles.rewardsBox}>
        <View style={styles.rewardItem}>
          <View style={styles.rewardIconBg}>
            <AppIcon name="trophy" size={18} color="#D97706" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rewardLabel}>Puntos Sambil acumulados</Text>
            <Text style={styles.rewardValue}>+{pointsEarned} Pts Club</Text>
          </View>
        </View>

        {drinkName && (
          <View style={[styles.rewardItem, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#E2E8F0' }]}>
            <View style={[styles.rewardIconBg, { backgroundColor: '#ECFDF5' }]}>
              <AppIcon name="gift" size={18} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rewardLabel}>Cortesía lista para retirar</Text>
              <Text style={styles.rewardValue}>{drinkName} en {storeName}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Dual CTA buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={onExploreMall}
          activeOpacity={0.8}
        >
          <AppIcon name="map" size={15} color="#FFFFFF" />
          <Text style={styles.exploreBtnText}>Ver en mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.restartBtn}
          onPress={onRestart}
          activeOpacity={0.8}
        >
          <AppIcon name="refresh" size={15} color="#334155" />
          <Text style={styles.restartBtnText}>Nueva consulta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  topBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 14,
  },
  rewardsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rewardIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  rewardValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  exploreBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    borderRadius: 12,
  },
  exploreBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  restartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  restartBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
});
