import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Banner de Bienvenida */}
      <View style={styles.heroCard}>
        <Text style={styles.heroBadge}>PILOTO OFICIAL</Text>
        <Text style={styles.heroTitle}>CC Los Nuevos Teques</Text>
        <Text style={styles.heroSubtitle}>Tu centro comercial en la palma de tu mano.</Text>
      </View>

      {/* Botón Asistente IA */}
      <TouchableOpacity
        style={styles.conciergeButton}
        onPress={() => router.push('/concierge')}
      >
        <Text style={styles.conciergeIcon}>✨</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.conciergeTitle}>¿Buscas algo en el mall?</Text>
          <Text style={styles.conciergeSubtitle}>Pregúntale al Asistente Concierge IA</Text>
        </View>
        <Text style={styles.conciergeArrow}>→</Text>
      </TouchableOpacity>

      {/* Acciones Rápidas */}
      <Text style={styles.sectionTitle}>Explorar</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/(tabs)/directorio')}
        >
          <Text style={styles.gridEmoji}>🏪</Text>
          <Text style={styles.gridTitle}>Directorio</Text>
          <Text style={styles.gridSubtitle}>30 locales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridCard}
          onPress={() => router.push('/(tabs)/mapa')}
        >
          <Text style={styles.gridEmoji}>🗺️</Text>
          <Text style={styles.gridTitle}>Mapa SVG</Text>
          <Text style={styles.gridSubtitle}>Offline por pisos</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  heroBadge: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
  },
  conciergeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10B981',
    marginBottom: 24,
    gap: 12,
  },
  conciergeIcon: {
    fontSize: 24,
  },
  conciergeTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: 'bold',
  },
  conciergeSubtitle: {
    color: '#34D399',
    fontSize: 12,
  },
  conciergeArrow: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  gridEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: 'bold',
  },
  gridSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
});
