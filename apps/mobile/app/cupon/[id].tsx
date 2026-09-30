import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CuponViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.ticket}>
        <Text style={styles.ticketHeader}>CUPÓN DE DESCUENTO</Text>
        <Text style={styles.offerTitle}>Combo Café con Leche + Pastel</Text>
        <Text style={styles.storeName}>Panadería Los Cedros (PB-02)</Text>

        {/* QR Dinámico Placeholder */}
        <View style={styles.qrContainer}>
          <Text style={styles.qrCode}>[ QR: ABC23489 ]</Text>
          <Text style={styles.codeText}>CÓDIGO: ABC23489</Text>
        </View>

        <Text style={styles.instructions}>
          Muestre este código en caja al momento de pagar para validar su beneficio.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <Text style={styles.backBtnText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20, justifyContent: 'center' },
  ticket: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  ticketHeader: { color: '#10B981', fontSize: 12, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  offerTitle: { color: '#F8FAFC', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  storeName: { color: '#94A3B8', fontSize: 14, marginTop: 4, marginBottom: 24 },
  qrContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
    width: '100%',
    marginBottom: 20,
  },
  qrCode: { color: '#34D399', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  codeText: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold', letterSpacing: 3 },
  instructions: { color: '#64748B', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  backBtn: { marginTop: 24, padding: 14, backgroundColor: '#334155', borderRadius: 10, alignItems: 'center' },
  backBtnText: { color: '#F8FAFC', fontWeight: 'bold' },
});
