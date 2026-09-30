import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.storeName}>Ficha del Comercio #{id}</Text>
        <Text style={styles.meta}>Planta Baja • Local PB-02</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horarios de Atención</Text>
        <Text style={styles.bodyText}>Lunes a Sábado: 06:30 AM - 08:00 PM</Text>
        <Text style={styles.bodyText}>Domingos: 07:00 AM - 02:00 PM</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contacto y Teléfono</Text>
        <Text style={styles.bodyText}>+58 412 000-0002</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  content: { padding: 16, gap: 16 },
  headerCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  storeName: { color: '#F8FAFC', fontSize: 22, fontWeight: 'bold' },
  meta: { color: '#10B981', fontSize: 14, marginTop: 4, fontWeight: '600' },
  section: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  bodyText: { color: '#CBD5E1', fontSize: 14, lineHeight: 22 },
});
