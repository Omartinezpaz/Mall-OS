import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MallResolverScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  React.useEffect(() => {
    // Simula resolución de branding y redirección al inicio
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#10B981" />
      <Text style={styles.text}>Cargando centro comercial: {slug}...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: { color: '#94A3B8', marginTop: 16, fontSize: 14 },
});
