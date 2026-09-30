import React from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/offline/cache';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#0F172A' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="m/[slug]" options={{ title: 'Cambiando de Mall' }} />
        <Stack.Screen name="local/[id]" options={{ title: 'Detalle del Local' }} />
        <Stack.Screen name="cupon/[id]" options={{ title: 'Mi Cupón' }} />
        <Stack.Screen name="concierge" options={{ title: 'Asistente Concierge', presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
