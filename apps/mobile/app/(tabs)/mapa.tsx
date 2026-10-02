import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PILOT_STORES } from '../../src/features/directory';

export default function MapaScreen() {
  const router = useRouter();
  const [floor, setFloor] = useState<number>(0);

  const storesOnFloor = PILOT_STORES.filter((s) => s.floor === floor);

  return (
    <View style={styles.container}>
      {/* Selector de Pisos */}
      <View style={styles.floorSelector}>
        <TouchableOpacity
          style={[styles.floorBtn, floor === 0 && styles.floorBtnActive]}
          onPress={() => setFloor(0)}
          activeOpacity={0.7}
        >
          <Text style={[styles.floorBtnText, floor === 0 && styles.floorBtnTextActive]}>
            Planta Baja (PB)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.floorBtn, floor === 1 && styles.floorBtnActive]}
          onPress={() => setFloor(1)}
          activeOpacity={0.7}
        >
          <Text style={[styles.floorBtnText, floor === 1 && styles.floorBtnTextActive]}>
            Piso 1 (P1)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Plano Visual Simulado SVG */}
      <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <Text style={styles.mapTitle}>
            🗺️ {floor === 0 ? 'Planta Baja · Nivel Principal' : 'Piso 1 · Nivel Superior'}
          </Text>
          <View style={styles.offlineBadge}>
            <Text style={styles.offlineBadgeText}>⚡ 100% OFFLINE</Text>
          </View>
        </View>

        {/* Distribución esquemática interactiva */}
        <View style={styles.mapGrid}>
          {storesOnFloor.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.unitBox,
                store.hasActiveOffers && styles.unitBoxPromo,
              ]}
              onPress={() => router.push(`/local/${store.id}`)}
              activeOpacity={0.7}
            >
              <Text style={styles.unitCode}>{store.unit}</Text>
              <Text style={styles.unitName} numberOfLines={1}>
                {store.name}
              </Text>
              {store.hasActiveOffers && (
                <Text style={styles.unitPromoTag}>🏷️ Oferta</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.mapHelpText}>
          Toca cualquier local del plano para ver su ficha y horario de atención.
        </Text>
      </View>

      {/* Directorio Rápido del Piso */}
      <Text style={styles.sectionTitle}>
        Locales en {floor === 0 ? 'Planta Baja' : 'Piso 1'} ({storesOnFloor.length})
      </Text>
      <ScrollView contentContainerStyle={styles.storesList}>
        {storesOnFloor.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.storeRow}
            onPress={() => router.push(`/local/${store.id}`)}
          >
            <View style={styles.storeBadge}>
              <Text style={styles.storeBadgeText}>{store.unit}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.storeRowName}>{store.name}</Text>
              <Text style={styles.storeRowCategory}>{store.category}</Text>
            </View>
            <Text style={styles.storeRowArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    gap: 12,
  },
  floorSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  floorBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  floorBtnActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  floorBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  floorBtnTextActive: {
    color: '#0F172A',
  },
  mapCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  offlineBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  offlineBadgeText: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '800',
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 8,
  },
  unitBox: {
    width: '48%',
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 4,
  },
  unitBoxPromo: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  unitCode: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
  },
  unitName: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  unitPromoTag: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  mapHelpText: {
    color: '#64748B',
    fontSize: 11,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  storesList: {
    gap: 8,
    paddingBottom: 20,
  },
  storeRow: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  storeBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  storeBadgeText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  storeRowName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  storeRowCategory: {
    color: '#94A3B8',
    fontSize: 12,
  },
  storeRowArrow: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700',
  },
});
