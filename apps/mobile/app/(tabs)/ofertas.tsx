import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getOffers, activateLocalCoupon } from '../../src/features/offers';

export default function OfertasScreen() {
  const router = useRouter();
  const [offers, setOffers] = useState(() => getOffers());

  const handleActivate = (offerId: string, offerTitle: string) => {
    try {
      const coupon = activateLocalCoupon(offerId);
      // Actualiza lista de ofertas para reflejar el stock reducido
      setOffers([...getOffers()]);
      router.push(`/cupon/${coupon.id}`);
    } catch (err: any) {
      Alert.alert('Aviso', err.message || 'No se pudo activar el cupón.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner Superior */}
      <View style={styles.headerSection}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>EXCLUSIVO VISITANTES</Text>
        </View>
        <Text style={styles.headerTitle}>Cupones y Beneficios</Text>
        <Text style={styles.headerSubtitle}>
          Activa tu cupón gratis y preséntalo en caja para disfrutar del beneficio.
        </Text>
      </View>

      {/* Lista de Ofertas */}
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🏷️</Text>
            <Text style={styles.emptyTitle}>No hay ofertas disponibles hoy</Text>
            <Text style={styles.emptySubtitle}>
              Los comercios están preparando nuevas promociones para ti. ¡Vuelve pronto!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.offerCard}>
            {/* Header del Card */}
            <View style={styles.cardHeader}>
              <View style={styles.storeBadge}>
                <Text style={styles.storeNameText}>{item.storeName}</Text>
                <Text style={styles.storeUnitText}>
                  · Piso {item.storeFloor === 0 ? 'PB' : `P${item.storeFloor}`} ({item.storeUnit})
                </Text>
              </View>
              <View style={styles.benefitBadge}>
                <Text style={styles.benefitBadgeText}>{item.benefitLabel}</Text>
              </View>
            </View>

            {/* Título y Descripción */}
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.offerDescription}>{item.description}</Text>

            {/* Términos y Stock */}
            <View style={styles.metaRow}>
              <Text style={styles.stockText}>
                🔥 Quedan <Text style={styles.stockHighlight}>{item.remainingCoupons}</Text> de {item.totalCoupons} cupones
              </Text>
              <Text style={styles.termsText}>1 por persona</Text>
            </View>

            {/* Botón de Activación */}
            <TouchableOpacity
              style={styles.activateButton}
              activeOpacity={0.8}
              onPress={() => handleActivate(item.id, item.title)}
            >
              <Text style={styles.activateButtonText}>✨ Obtener Cupón Gratis</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerSection: {
    padding: 16,
    paddingBottom: 12,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    gap: 6,
  },
  headerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  headerBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  listContainer: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  offerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  storeBadge: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  storeNameText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  storeUnitText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  benefitBadge: {
    backgroundColor: '#047857',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  benefitBadgeText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '800',
  },
  offerTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },
  offerDescription: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#0F172A',
  },
  stockText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '500',
  },
  stockHighlight: {
    color: '#34D399',
    fontWeight: '800',
  },
  termsText: {
    color: '#64748B',
    fontSize: 11,
  },
  activateButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activateButtonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 17,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
  },
});
