import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const OFFERS = [
  {
    id: 'o1',
    title: 'Combo Café con Leche + Pastel',
    store: 'Panadería Los Cedros',
    benefit: 'Combo Especial',
    stock: 50,
  },
  {
    id: 'o2',
    title: 'Pase de Cortesía 1 Día',
    store: 'Fitness Club Los Teques',
    benefit: '1 Día Gratis',
    stock: 30,
  },
];

export default function OfertasScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={OFFERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.badgeRow}>
              <Text style={styles.storeName}>{item.store}</Text>
              <Text style={styles.benefitBadge}>{item.benefit}</Text>
            </View>
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.stockInfo}>Disponibles: {item.stock} cupones</Text>

            <TouchableOpacity
              style={styles.activateBtn}
              onPress={() => router.push(`/cupon/${item.id}`)}
            >
              <Text style={styles.activateBtnText}>Obtener Cupón Gratis</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  list: { padding: 16, gap: 14 },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { color: '#94A3B8', fontSize: 13, fontWeight: '600' },
  benefitBadge: {
    backgroundColor: '#064E3B',
    color: '#34D399',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 'bold',
  },
  offerTitle: { color: '#F8FAFC', fontSize: 17, fontWeight: 'bold', marginVertical: 8 },
  stockInfo: { color: '#64748B', fontSize: 12, marginBottom: 14 },
  activateBtn: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  activateBtnText: { color: '#0F172A', fontWeight: 'bold', fontSize: 14 },
});
