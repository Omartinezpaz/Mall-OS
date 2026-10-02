import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getCouponByIdOrOfferId, activateLocalCoupon } from '../../src/features/offers';

export default function CuponViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [coupon, setCoupon] = useState(() => {
    let found = getCouponByIdOrOfferId(id);
    if (!found) {
      try {
        found = activateLocalCoupon(id);
      } catch (e) {
        // Fallback
      }
    }
    return found;
  });

  const [copied, setCopied] = useState(false);

  if (!coupon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>🎫</Text>
        <Text style={styles.errorTitle}>Cupón no encontrado</Text>
        <Text style={styles.errorSubtitle}>
          No se encontró el cupón o la oferta ha caducado.
        </Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Volver a Ofertas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Mira mi cupón para "${coupon.offerTitle}" en ${coupon.storeName}! Código: ${coupon.code}`,
      });
    } catch (e) {
      // Ignora error de compartir
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Tarjeta Ticket */}
      <View style={styles.ticketCard}>
        {/* Header del Ticket */}
        <View style={styles.ticketHeader}>
          <Text style={styles.ticketBadge}>CUPÓN VÁLIDO</Text>
          <Text style={styles.benefitLabel}>{coupon.benefitLabel}</Text>
          <Text style={styles.offerTitle}>{coupon.offerTitle}</Text>
          <Text style={styles.storeInfo}>
            {coupon.storeName} · {coupon.storeUnit}
          </Text>
        </View>

        {/* Línea divisoria punteada estilo ticket */}
        <View style={styles.dashedLineContainer}>
          <View style={styles.notchLeft} />
          <View style={styles.dashedLine} />
          <View style={styles.notchRight} />
        </View>

        {/* Código QR y Código Alfanumérico */}
        <View style={styles.qrSection}>
          <View style={styles.qrBox}>
            {/* Visualizador de QR geométrico renderizado */}
            <View style={styles.qrMatrix}>
              <View style={styles.qrCornerTL} />
              <View style={styles.qrCornerTR} />
              <View style={styles.qrCornerBL} />
              <View style={styles.qrCenterDot} />
              <Text style={styles.qrCenterText}>{coupon.code}</Text>
            </View>
          </View>

          <Text style={styles.codeLabel}>CÓDIGO DE CANJE</Text>
          <Text style={styles.codeValue}>{coupon.code}</Text>

          <Text style={styles.instructions}>
            Muestra esta pantalla al cajero al momento de pagar para aplicar el beneficio.
          </Text>
        </View>

        {/* Términos y Vencimiento */}
        <View style={styles.ticketFooter}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Validez</Text>
            <Text style={styles.metaValue}>24 horas desde la activación</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Condiciones</Text>
            <Text style={styles.metaValue}>{coupon.terms}</Text>
          </View>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤 Compartir con un amigo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.doneButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  ticketCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  ticketHeader: {
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  ticketBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#34D399',
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    letterSpacing: 1,
  },
  benefitLabel: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  offerTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  storeInfo: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  dashedLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: 24,
  },
  notchLeft: {
    width: 14,
    height: 24,
    backgroundColor: '#0F172A',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderRightWidth: 1,
    borderRightColor: '#334155',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: '#334155',
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  notchRight: {
    width: 14,
    height: 24,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#334155',
  },
  qrSection: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    gap: 10,
  },
  qrBox: {
    width: 180,
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  qrMatrix: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: '#0F172A',
    borderRadius: 8,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCornerTL: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 32,
    height: 32,
    backgroundColor: '#0F172A',
    borderRadius: 4,
  },
  qrCornerTR: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 32,
    height: 32,
    backgroundColor: '#0F172A',
    borderRadius: 4,
  },
  qrCornerBL: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 32,
    height: 32,
    backgroundColor: '#0F172A',
    borderRadius: 4,
  },
  qrCenterDot: {
    width: 16,
    height: 16,
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  qrCenterText: {
    position: 'absolute',
    bottom: 8,
    color: '#0F172A',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  codeLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  codeValue: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  instructions: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
  ticketFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 12,
  },
  metaItem: {
    gap: 2,
  },
  metaLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metaValue: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 18,
  },
  actionButtons: {
    gap: 10,
  },
  shareButton: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  shareButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  doneButton: {
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  errorEmoji: {
    fontSize: 48,
  },
  errorTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  errorSubtitle: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
