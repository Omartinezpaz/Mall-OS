import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';

interface ConfirmationPurchaseWidgetProps {
  storeName: string;
  onConfirmPurchase: (found: boolean) => void;
  onJustLooking: () => void;
}

export const ConfirmationPurchaseWidget: React.FC<ConfirmationPurchaseWidgetProps> = ({
  storeName,
  onConfirmPurchase,
  onJustLooking,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.badgeRow}>
        <AppIcon name="storefront" size={13} color="#2563EB" />
        <Text style={styles.badgeText}>Visita en {storeName}</Text>
      </View>

      <Text style={styles.title}>¿Encontraste lo que buscabas?</Text>
      <Text style={styles.subtitle}>
        Cuéntanos para ofrecerte alternativas en el mall o premiar tu compra con beneficios exclusivos.
      </Text>

      <View style={styles.actionsCol}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => onConfirmPurchase(true)}
          activeOpacity={0.8}
        >
          <View style={styles.btnIconBgPrimary}>
            <AppIcon name="checkmark" size={14} color="#FFFFFF" strokeWidth={2.4} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.btnPrimaryText}>¡Sí, compré algo!</Text>
            <Text style={styles.btnSubtextPrimary}>Gana puntos y bebida de cortesía</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => onConfirmPurchase(false)}
          activeOpacity={0.8}
        >
          <View style={styles.btnIconBgSecondary}>
            <AppIcon name="search" size={14} color="#64748B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.btnSecondaryText}>No encontré lo que buscaba</Text>
            <Text style={styles.btnSubtextSecondary}>Ver otras tiendas similares en el mall</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnGhost}
          onPress={onJustLooking}
          activeOpacity={0.7}
        >
          <Text style={styles.btnGhostText}>Solo estaba mirando</Text>
        </TouchableOpacity>
      </View>
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
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  title: {
    fontSize: 14.5,
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
  actionsCol: {
    gap: 8,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  btnIconBgPrimary: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnSubtextPrimary: {
    fontSize: 10,
    color: '#94A3B8',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  btnIconBgSecondary: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  btnSubtextSecondary: {
    fontSize: 10,
    color: '#64748B',
  },
  btnGhost: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  btnGhostText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
});
