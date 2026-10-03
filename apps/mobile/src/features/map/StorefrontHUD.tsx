import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getStorefront } from './storefront-data';
import { formatTimeHours, isStoreOpenAt, STORE_SCHEDULES } from './IsometricMap';

interface StorefrontHUDProps {
  storeId: string;
  currentHour?: number;
  onClose: () => void;
  onStartNavigation: () => void;
  isNavigating?: boolean;
}

export function StorefrontHUD({
  storeId,
  currentHour = 14,
  onClose,
  onStartNavigation,
  isNavigating = false,
}: StorefrontHUDProps) {
  const router = useRouter();
  const storefront = getStorefront(storeId);
  const isOpen = isStoreOpenAt(storeId, currentHour);
  const schedule = STORE_SCHEDULES[storeId] || [9, 21];
  const [demoActionFeedback, setDemoActionFeedback] = useState<string | null>(null);

  const handleDemoWhatsApp = () => {
    setDemoActionFeedback('Canal de contacto simulado (Modo Demostración)');
    setTimeout(() => setDemoActionFeedback(null), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Barra de arrastre superior */}
      <View style={styles.dragHandleContainer}>
        <View style={styles.dragHandle} />
      </View>

      {/* Banner de Aviso: Modo Demostración */}
      <View style={styles.demoNoticeBar}>
        <Text style={styles.demoNoticeIcon}>ℹ️</Text>
        <Text style={styles.demoNoticeText}>
          VITRINA EN DEMOSTRACIÓN · Datos e inventario simulados para el piloto
        </Text>
      </View>

      {/* Cabecera de la Tienda */}
      <View style={styles.headerRow}>
        <View style={styles.storeAvatarBox}>
          <Text style={styles.storeAvatarEmoji}>{storefront.icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.titleBadgeRow}>
            <Text style={styles.storeName}>{storefront.name}</Text>
            <View
              style={[
                styles.statusBadge,
                isOpen ? styles.statusBadgeOpen : styles.statusBadgeClosed,
              ]}
            >
              <Text
                style={[
                  styles.statusBadgeText,
                  isOpen ? styles.statusTextOpen : styles.statusTextClosed,
                ]}
              >
                {isOpen
                  ? `Abierto · Cierra ${formatTimeHours(schedule[1])}`
                  : `Cerrado · Abre ${formatTimeHours(schedule[0])}`}
              </Text>
            </View>
          </View>
          <Text style={styles.storeMeta}>
            {storefront.category} · {storefront.unit} · ⭐ {storefront.rating} ({storefront.reviewCount})
          </Text>
        </View>

        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Botones de Acción: Contacto Demo y Cómo Llegar */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.whatsAppBtn}
          onPress={handleDemoWhatsApp}
          activeOpacity={0.85}
        >
          <Text style={styles.whatsAppBtnIcon}>💬</Text>
          <Text style={styles.whatsAppBtnText}>Consultar Local (Demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navigateActionBtn, isNavigating && styles.navigateActionBtnActive]}
          onPress={onStartNavigation}
          activeOpacity={0.85}
        >
          <Text style={styles.navigateActionIcon}>{isNavigating ? '🚶' : '📍'}</Text>
          <Text style={styles.navigateActionText}>
            {isNavigating ? 'Guiando Ruta' : 'Cómo Llegar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toast de feedback para acciones demo */}
      {demoActionFeedback && (
        <View style={styles.demoFeedbackToast}>
          <Text style={styles.demoFeedbackText}>{demoActionFeedback}</Text>
        </View>
      )}

      {/* Banner de Promoción Flash Activa */}
      {storefront.activePromotion && (
        <View style={styles.promoBanner}>
          <View style={styles.promoPill}>
            <Text style={styles.promoPillText}>{storefront.activePromotion.discountLabel}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>{storefront.activePromotion.title}</Text>
            <Text style={styles.promoMeta}>⏰ Expira en {storefront.activePromotion.expiresIn}</Text>
          </View>
          <TouchableOpacity
            style={styles.activateCouponBtn}
            onPress={() => router.push('/(tabs)/ofertas')}
          >
            <Text style={styles.activateCouponText}>Ver Cupón</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Vitrina Virtual de Productos Destacados (100% Offline con Iconos y Beneficios) */}
      {storefront.products.length > 0 && (
        <View style={styles.showcaseSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🛍️ Vitrina Virtual (Exhibición digital)</Text>
            <Text style={styles.sectionSubtitle}>{storefront.products.length} productos destacados</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScrollContainer}
          >
            {storefront.products.map((p) => (
              <View key={p.id} style={styles.productCard}>
                {/* Ilustración / Icono de Categoría Offline */}
                <View style={styles.productIconBox}>
                  <Text style={styles.productIllustrationEmoji}>{p.icon}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountBadgeText}>{p.discountBadge}</Text>
                  </View>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {p.name}
                  </Text>
                  <Text style={styles.productCategory}>{p.category}</Text>
                  <Text style={styles.productDesc} numberOfLines={2}>
                    {p.description}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Métodos de Pago Aceptados */}
      <View style={styles.paymentsSection}>
        <Text style={styles.paymentsLabel}>Métodos de pago aceptados:</Text>
        <View style={styles.paymentChipsRow}>
          {storefront.paymentMethods.map((method, idx) => (
            <View key={`pay-${idx}`} style={styles.paymentChip}>
              <Text style={styles.paymentChipIcon}>
                {method.includes('Pago Móvil')
                  ? '📲'
                  : method.includes('Divisas')
                  ? '💵'
                  : method.includes('Punto')
                  ? '💳'
                  : '🏷️'}
              </Text>
              <Text style={styles.paymentChipText}>{method}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
    gap: 10,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 2,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  demoNoticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
  },
  demoNoticeIcon: {
    fontSize: 11,
  },
  demoNoticeText: {
    color: '#92400E',
    fontSize: 10,
    fontWeight: '700',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeAvatarBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  storeAvatarEmoji: {
    fontSize: 24,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  storeName: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusBadgeOpen: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeClosed: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusTextOpen: {
    color: '#166534',
  },
  statusTextClosed: {
    color: '#991B1B',
  },
  storeMeta: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  closeBtnText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  whatsAppBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingVertical: 11,
    gap: 6,
  },
  whatsAppBtnIcon: {
    fontSize: 14,
  },
  whatsAppBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  navigateActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingVertical: 11,
    gap: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  navigateActionBtnActive: {
    backgroundColor: '#3730A3',
  },
  navigateActionIcon: {
    fontSize: 14,
  },
  navigateActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  demoFeedbackToast: {
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  demoFeedbackText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    gap: 8,
  },
  promoPill: {
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  promoPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  promoTitle: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
  promoMeta: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '600',
  },
  activateCouponBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  activateCouponText: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '800',
  },
  showcaseSection: {
    gap: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#64748B',
    fontSize: 10,
  },
  productsScrollContainer: {
    gap: 10,
    paddingVertical: 2,
  },
  productCard: {
    width: 145,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  productIconBox: {
    height: 70,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productIllustrationEmoji: {
    fontSize: 32,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  productInfo: {
    padding: 8,
    gap: 2,
  },
  productName: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
  productCategory: {
    color: '#64748B',
    fontSize: 9,
  },
  productDesc: {
    color: '#94A3B8',
    fontSize: 9,
    lineHeight: 12,
    marginTop: 2,
  },
  paymentsSection: {
    gap: 4,
  },
  paymentsLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  paymentChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  paymentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 4,
  },
  paymentChipIcon: {
    fontSize: 10,
  },
  paymentChipText: {
    color: '#334155',
    fontSize: 10,
    fontWeight: '600',
  },
});
