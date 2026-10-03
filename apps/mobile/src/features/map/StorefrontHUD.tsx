import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [demoActionFeedback, setDemoActionFeedback] = useState<string | null>(null);

  const handleDemoWhatsApp = () => {
    setDemoActionFeedback('Canal de atención simulado · Modo Demostración');
    setTimeout(() => setDemoActionFeedback(null), 3000);
  };

  return (
    <View style={styles.floatingWrapper}>
      <View style={[styles.cardContainer, isExpanded && styles.cardContainerExpanded]}>
        {/* Barra superior de arrastre / alternador de modo */}
        <TouchableOpacity
          style={styles.dragHandleArea}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.dragHandle} />
        </TouchableOpacity>

        {/* Header Compacto (Siempre visible en Peek y Expandido) */}
        <View style={styles.headerRow}>
          <View style={styles.storeAvatarBox}>
            <Text style={styles.storeAvatarEmoji}>{storefront.icon}</Text>
          </View>

          <TouchableOpacity
            style={styles.headerTextCol}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.8}
          >
            <View style={styles.titleRow}>
              <Text style={styles.storeName} numberOfLines={1}>
                {storefront.name}
              </Text>
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
                  {isOpen ? 'Abierto' : 'Cerrado'}
                </Text>
              </View>
            </View>
            <Text style={styles.storeMeta} numberOfLines={1}>
              {storefront.category} · {storefront.unit} · ⭐ {storefront.rating}
            </Text>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.expandToggleBtn}
              onPress={() => setIsExpanded(!isExpanded)}
              activeOpacity={0.7}
            >
              <Text style={styles.expandToggleIcon}>{isExpanded ? '▼' : '▲'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de Acción Primarios */}
        <View style={styles.actionButtonsRow}>
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

          <TouchableOpacity
            style={styles.detailsToggleBtn}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsToggleText}>
              {isExpanded ? 'Ver Mapa' : 'Ver Vitrina'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenido Extendido: Solo visible cuando isExpanded es true */}
        {isExpanded && (
          <ScrollView
            style={styles.expandedContentScroll}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {/* Aviso de Modo Demostración */}
            <View style={styles.demoNoticeBar}>
              <Text style={styles.demoNoticeIcon}>ℹ️</Text>
              <Text style={styles.demoNoticeText}>
                VITRINA EN DEMOSTRACIÓN · Datos e inventario simulados para el piloto
              </Text>
            </View>

            {/* Horario detallado */}
            <View style={styles.scheduleRow}>
              <Text style={styles.scheduleLabel}>Horario de atención hoy:</Text>
              <Text style={styles.scheduleValue}>
                {formatTimeHours(schedule[0])} – {formatTimeHours(schedule[1])}
              </Text>
            </View>

            {/* Banner de Promoción Activa si existe */}
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

            {/* Vitrina Virtual de Productos Destacados */}
            {storefront.products.length > 0 && (
              <View style={styles.showcaseSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>🛍️ Vitrina Virtual</Text>
                  <Text style={styles.sectionSubtitle}>{storefront.products.length} productos</Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.productsScrollContainer}
                >
                  {storefront.products.map((p) => (
                    <View key={p.id} style={styles.productCard}>
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

            {/* Contacto Demo */}
            <TouchableOpacity
              style={styles.whatsAppBtn}
              onPress={handleDemoWhatsApp}
              activeOpacity={0.85}
            >
              <Text style={styles.whatsAppBtnIcon}>💬</Text>
              <Text style={styles.whatsAppBtnText}>Consultar al Local (WhatsApp Demo)</Text>
            </TouchableOpacity>

            {demoActionFeedback && (
              <View style={styles.demoFeedbackToast}>
                <Text style={styles.demoFeedbackText}>{demoActionFeedback}</Text>
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
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    zIndex: 40,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    gap: 8,
  },
  cardContainerExpanded: {
    maxHeight: 460,
  },
  dragHandleArea: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  storeAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  storeAvatarEmoji: {
    fontSize: 22,
  },
  headerTextCol: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storeName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    flexShrink: 1,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  statusBadgeOpen: {
    backgroundColor: '#DCFCE7',
  },
  statusBadgeClosed: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 9,
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
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expandToggleBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  expandToggleIcon: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  closeBtnText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  navigateActionBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingVertical: 10,
    gap: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  navigateActionBtnActive: {
    backgroundColor: '#3730A3',
  },
  navigateActionIcon: {
    fontSize: 14,
  },
  navigateActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  detailsToggleBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailsToggleText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
  },
  expandedContentScroll: {
    marginTop: 6,
  },
  demoNoticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
    marginBottom: 8,
  },
  demoNoticeIcon: {
    fontSize: 10,
  },
  demoNoticeText: {
    color: '#92400E',
    fontSize: 9,
    fontWeight: '700',
    flex: 1,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 8,
  },
  scheduleLabel: {
    color: '#64748B',
    fontSize: 11,
  },
  scheduleValue: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    gap: 6,
    marginBottom: 8,
  },
  promoPill: {
    backgroundColor: '#4F46E5',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  promoPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  promoTitle: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
  promoMeta: {
    color: '#4F46E5',
    fontSize: 9,
    fontWeight: '600',
  },
  activateCouponBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  activateCouponText: {
    color: '#4F46E5',
    fontSize: 9,
    fontWeight: '800',
  },
  showcaseSection: {
    gap: 6,
    marginBottom: 8,
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
    gap: 8,
    paddingVertical: 2,
  },
  productCard: {
    width: 125,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  productIconBox: {
    height: 56,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  productIllustrationEmoji: {
    fontSize: 24,
  },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#4F46E5',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  productInfo: {
    padding: 6,
    gap: 1,
  },
  productName: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: '700',
  },
  productCategory: {
    color: '#64748B',
    fontSize: 8,
  },
  productDesc: {
    color: '#94A3B8',
    fontSize: 8,
    lineHeight: 10,
    marginTop: 1,
  },
  whatsAppBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 9,
    gap: 6,
    marginBottom: 8,
  },
  whatsAppBtnIcon: {
    fontSize: 12,
  },
  whatsAppBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  demoFeedbackToast: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 6,
  },
  demoFeedbackText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  paymentsSection: {
    gap: 4,
    paddingBottom: 4,
  },
  paymentsLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '600',
  },
  paymentChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  paymentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 3,
  },
  paymentChipIcon: {
    fontSize: 9,
  },
  paymentChipText: {
    color: '#334155',
    fontSize: 9,
    fontWeight: '600',
  },
});
