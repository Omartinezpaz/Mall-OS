import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStoreById } from '../../src/features/directory';

const DAYS_MAP: Record<string, string> = {
  mon: 'Lunes',
  tue: 'Martes',
  wed: 'Miércoles',
  thu: 'Jueves',
  fri: 'Viernes',
  sat: 'Sábado',
  sun: 'Domingo',
};

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const store = getStoreById(id);

  if (!store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>🏪</Text>
        <Text style={styles.errorTitle}>Local no encontrado</Text>
        <Text style={styles.errorSubtitle}>El comercio que buscas no existe o fue deshabilitado.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Volver al Directorio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCall = () => {
    if (store.phone) {
      Linking.openURL(`tel:${store.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (store.phone) {
      const cleanNumber = store.phone.replace(/[^0-9]/g, '');
      Linking.openURL(`https://wa.me/${cleanNumber}`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{store.category}</Text>
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>
              Piso {store.floor === 0 ? 'PB' : `P${store.floor}`} · {store.unit}
            </Text>
          </View>
        </View>

        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.description}>{store.description}</Text>

        {/* Acciones de Contacto */}
        <View style={styles.actionRow}>
          {store.phone && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.whatsappButton]}
                onPress={handleWhatsApp}
              >
                <Text style={styles.actionButtonText}>💬 WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}
                onPress={handleCall}
              >
                <Text style={styles.actionButtonText}>📞 Llamar</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={[styles.actionButton, styles.mapButton]}
            onPress={() => router.push('/(tabs)/mapa')}
          >
            <Text style={styles.actionButtonText}>🗺️ Ver en Mapa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horarios */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🕒 Horarios de Atención</Text>
        <View style={styles.scheduleList}>
          {Object.entries(store.openingHours).map(([dayKey, ranges]) => (
            <View key={dayKey} style={styles.scheduleRow}>
              <Text style={styles.dayLabel}>{DAYS_MAP[dayKey] || dayKey}</Text>
              <Text style={styles.hoursLabel}>
                {ranges.map(([open, close]) => `${open} - ${close}`).join(', ')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Promociones / Cupones si tiene */}
      {store.hasActiveOffers && (
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>🏷️ Ofertas disponibles en este local</Text>
          <TouchableOpacity
            style={styles.offerCard}
            onPress={() => router.push('/(tabs)/ofertas')}
          >
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>VÁLIDO HOY</Text>
            </View>
            <Text style={styles.offerTitle}>Beneficio exclusivo para visitantes</Text>
            <Text style={styles.offerSubtitle}>
              Activa tu cupón y muéstralo en caja para obtener tu descuento.
            </Text>
            <Text style={styles.offerCta}>Ver cupón →</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
  },
  unitBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unitText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
  storeName: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  description: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappButton: {
    backgroundColor: '#059669',
  },
  callButton: {
    backgroundColor: '#334155',
  },
  mapButton: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  actionButtonText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  scheduleList: {
    gap: 8,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
  },
  dayLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  hoursLabel: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },
  offersSection: {
    gap: 10,
  },
  offerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10B981',
    gap: 8,
  },
  offerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  offerBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
  },
  offerTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  offerSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  offerCta: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
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
  backButton: {
    marginTop: 12,
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
});
