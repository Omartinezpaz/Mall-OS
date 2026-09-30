import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// Lista local empaquetada para carga offline instantánea (<100ms)
const LOCAL_STORES = [
  { id: '1', name: 'Supermercado San Diego', unit: 'PB-01', category: 'Supermercados', floor: 0 },
  { id: '2', name: 'Panadería Los Cedros', unit: 'PB-02', category: 'Gastronomía', floor: 0 },
  { id: '3', name: 'Charcutería La Estancia', unit: 'PB-03', category: 'Alimentos', floor: 0 },
  { id: '4', name: 'Farmacia SAAS', unit: 'PB-04', category: 'Salud', floor: 0 },
  { id: '5', name: 'McDonald\'s', unit: 'PB-05', category: 'Comida Rápida', floor: 0 },
  { id: '6', name: 'Fitness Club Los Teques', unit: 'P1-01', category: 'Deportes', floor: 1 },
];

export default function DirectorioScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = LOCAL_STORES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar local, producto o categoría..."
          placeholderTextColor="#64748B"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storeCard}
            onPress={() => router.push(`/local/${item.id}`)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.storeName}>{item.name}</Text>
              <Text style={styles.storeMeta}>{item.category} • Piso {item.floor === 0 ? 'PB' : item.floor} ({item.unit})</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  searchContainer: { padding: 16, backgroundColor: '#0F172A' },
  searchInput: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  list: { padding: 16, paddingTop: 0, gap: 10 },
  storeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  storeName: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
  storeMeta: { color: '#94A3B8', fontSize: 13, marginTop: 4 },
  arrow: { color: '#10B981', fontSize: 18, fontWeight: 'bold' },
});
