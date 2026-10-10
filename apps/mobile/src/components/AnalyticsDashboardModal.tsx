import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { getAnalyticsSummary, clearAnalytics, type AnalyticsSummary } from '../lib/analytics';
import { MallOsSpriteIcon } from './MallOsSpriteIcon';

interface AnalyticsDashboardModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  visible,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await getAnalyticsSummary();
    setSummary(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible, loadData]);

  const handleCopySummary = async () => {
    if (!summary) return;
    const text = [
      `📊 MALL OS · MÉTRICAS DEL DEMO`,
      `Total Eventos: ${summary.totalEvents}`,
      `Rutas Trazadas / Tiendas Consultadas: ${summary.byType['map_route_calculated'] ?? 0 + (summary.byType['concierge_store_routed'] ?? 0)}`,
      `Mensajes Concierge: ${summary.byType['concierge_message_sent'] ?? 0}`,
      `Compras Registradas: ${summary.purchasesCount}`,
      `Estaciones Modo Niño: ${summary.kidsStationsCount}`,
      `Modo Accesible Usado: ${(summary.byType['map_accessible_mode_toggled'] ?? 0) + (summary.byType['concierge_accessibility_activated'] ?? 0)}`,
      `---`,
      `Top Tiendas: ${summary.topStoresRouted.map((s) => `${s.storeId} (${s.count})`).join(', ') || 'N/A'}`,
    ].join('\n');

    await Clipboard.setStringAsync(text);
    Alert.alert('Copiado', 'Resumen de analíticas copiado al portapapeles para tu presentación.');
  };

  const handleClear = () => {
    Alert.alert(
      'Reiniciar Métricas',
      '¿Deseas borrar el historial local de analíticas para iniciar una nueva prueba limpia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            await clearAnalytics();
            loadData();
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>DEMO TELEMETRY</Text>
              </View>
              <Text style={styles.title}>Métricas en Vivo</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.loadingText}>Compilando telemetría local...</Text>
            </View>
          ) : (
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
              {/* Tarjetas KPI */}
              <View style={styles.kpiGrid}>
                <View style={styles.kpiCard}>
                  <Text style={styles.kpiValue}>{summary?.totalEvents ?? 0}</Text>
                  <Text style={styles.kpiLabel}>Total Eventos</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={[styles.kpiValue, { color: '#2563EB' }]}>
                    {(summary?.byType['map_route_calculated'] ?? 0) +
                      (summary?.byType['concierge_store_routed'] ?? 0)}
                  </Text>
                  <Text style={styles.kpiLabel}>Rutas Trazadas</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={[styles.kpiValue, { color: '#10B981' }]}>
                    {summary?.purchasesCount ?? 0}
                  </Text>
                  <Text style={styles.kpiLabel}>Compras Hechas</Text>
                </View>
                <View style={styles.kpiCard}>
                  <Text style={[styles.kpiValue, { color: '#F59E0B' }]}>
                    {summary?.kidsStationsCount ?? 0}
                  </Text>
                  <Text style={styles.kpiLabel}>Estaciones Niño</Text>
                </View>
              </View>

              {/* Desglose por Canal */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Desglose por Módulo</Text>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Mensajes Concierge IA</Text>
                  <Text style={styles.rowValue}>
                    {summary?.byType['concierge_message_sent'] ?? 0}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Intents Comerciales</Text>
                  <Text style={styles.rowValue}>
                    {summary?.byType['concierge_intent_matched'] ?? 0}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Uso de Modo Accesible</Text>
                  <Text style={styles.rowValue}>
                    {(summary?.byType['map_accessible_mode_toggled'] ?? 0) +
                      (summary?.byType['concierge_accessibility_activated'] ?? 0)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Llegadas Físicas (Arrival)</Text>
                  <Text style={styles.rowValue}>{summary?.byType['map_arrival'] ?? 0}</Text>
                </View>
              </View>

              {/* Top Tiendas */}
              {summary && summary.topStoresRouted.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Tiendas Más Consultadas</Text>
                  {summary.topStoresRouted.map((item, idx) => (
                    <View key={item.storeId} style={styles.row}>
                      <Text style={styles.rowLabel}>
                        {idx + 1}. {item.storeId.replace(/_/g, ' ').toUpperCase()}
                      </Text>
                      <Text style={styles.rowValueBadge}>{item.count} rutas</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Acciones */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionBtnPrimary} onPress={handleCopySummary}>
                  <Text style={styles.actionBtnPrimaryText}>Copiar Resumen para Pitch</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtnSecondary} onPress={loadData}>
                  <Text style={styles.actionBtnSecondaryText}>Actualizar Datos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtnDanger} onPress={handleClear}>
                  <Text style={styles.actionBtnDangerText}>Reiniciar Métricas</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B',
  },
  scroll: {
    maxHeight: '100%',
  },
  scrollContent: {
    padding: 20,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  kpiCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  rowLabel: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowValueBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  actionsContainer: {
    gap: 10,
    marginTop: 8,
  },
  actionBtnPrimary: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBtnPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  actionBtnSecondary: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionBtnSecondaryText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 13,
  },
  actionBtnDanger: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionBtnDangerText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 12,
  },
});
