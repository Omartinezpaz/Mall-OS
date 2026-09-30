import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MapaScreen() {
  const [floor, setFloor] = useState<number>(0);

  return (
    <View style={styles.container}>
      {/* Selector de Pisos */}
      <View style={styles.floorSelector}>
        <TouchableOpacity
          style={[styles.floorBtn, floor === 0 && styles.floorBtnActive]}
          onPress={() => setFloor(0)}
        >
          <Text style={[styles.floorBtnText, floor === 0 && styles.floorBtnTextActive]}>Planta Baja (PB)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.floorBtn, floor === 1 && styles.floorBtnActive]}
          onPress={() => setFloor(1)}
        >
          <Text style={[styles.floorBtnText, floor === 1 && styles.floorBtnTextActive]}>Piso 1</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor del Mapa SVG Offline */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapInfo}>🗺️ Plano SVG Empaquetado ({floor === 0 ? 'Planta Baja' : 'Piso 1'})</Text>
        <Text style={styles.mapSub}>Carga instantánea offline sin conexión de datos.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 16 },
  floorSelector: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  floorBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  floorBtnActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  floorBtnText: { color: '#94A3B8', fontWeight: 'bold' },
  floorBtnTextActive: { color: '#0F172A' },
  mapContainer: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  mapInfo: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
  mapSub: { color: '#64748B', fontSize: 13, marginTop: 6 },
});
