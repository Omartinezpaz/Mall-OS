import React from 'react';
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { queryClient } from '../src/offline/cache';

export default function RootLayout() {
  // Carga de fuentes no bloqueante (offline-first: si fallan o tardan, la app arranca igual)
  useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'SpaceGrotesk-SemiBold': SpaceGrotesk_600SemiBold,
    'SpaceGrotesk-Bold': SpaceGrotesk_700Bold,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#F8FAFC',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#0F172A' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="iconos" options={{ title: 'Iconos Mall OS' }} />
        <Stack.Screen name="m/[slug]" options={{ title: 'Cambiando de Mall' }} />
        <Stack.Screen name="local/[id]" options={{ title: 'Detalle del Local' }} />
        <Stack.Screen name="cupon/[id]" options={{ title: 'Mi Cupón' }} />
        <Stack.Screen name="kids-mode" options={{ title: 'Exploradores del Mall', headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="concierge" options={{ title: 'Asistente Concierge', presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}


