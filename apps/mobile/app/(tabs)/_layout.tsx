import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

export const TAB_COLORS: Record<string, string> = {
  index: '#FBBF24',      // Ámbar / Oro
  directorio: '#3B82F6', // Azul vibrante
  mapa: '#E11D48',       // Carmesí / Coral neón
  ofertas: '#10B981',    // Verde Yummy
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const activeColor = TAB_COLORS[name] || '#E11D48';
  const inactiveColor = '#64748B'; // Slate 500
  const color = focused ? '#FFFFFF' : inactiveColor;
  const size = focused ? 23 : 22;

  let iconSvg: React.ReactNode = null;

  switch (name) {
    case 'index':
      // Home icon
      iconSvg = (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={focused ? "2.3" : "2"} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M9 22V12h6v10" />
        </Svg>
      );
      break;
    case 'directorio':
      // Search / Explore icon
      iconSvg = (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={focused ? "2.3" : "2"} strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="11" cy="11" r="8" />
          <Path d="M21 21l-4.35-4.35" />
        </Svg>
      );
      break;
    case 'mapa':
      // Compass / Map icon
      iconSvg = (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={focused ? "2.3" : "2"} strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="12" r="10" />
          <Path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" fill={focused ? "rgba(255, 255, 255, 0.28)" : undefined} />
        </Svg>
      );
      break;
    case 'ofertas':
      // Tag / Offers icon
      iconSvg = (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={focused ? "2.3" : "2"} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <Circle cx="7" cy="7" r="1.5" fill={color} />
        </Svg>
      );
      break;
    default:
      iconSvg = (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="7" r="4" />
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        </Svg>
      );
  }

  if (focused) {
    return (
      <View
        style={[
          styles.floatingBtn,
          {
            backgroundColor: activeColor,
            shadowColor: activeColor,
          },
        ]}
      >
        {iconSvg}
      </View>
    );
  }

  return (
    <View style={styles.inactiveIconWrapper}>
      {iconSvg}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF', // Fondo blanco limpio
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 8,
          position: 'relative',
          elevation: 12,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '700',
          letterSpacing: 0.2,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarActiveTintColor: TAB_COLORS.index,
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="directorio"
        options={{
          title: 'Explorar',
          tabBarActiveTintColor: TAB_COLORS.directorio,
          tabBarIcon: ({ focused }) => <TabIcon name="directorio" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarActiveTintColor: TAB_COLORS.mapa,
          tabBarIcon: ({ focused }) => <TabIcon name="mapa" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ofertas"
        options={{
          title: 'Ofertas',
          tabBarActiveTintColor: TAB_COLORS.ofertas,
          tabBarIcon: ({ focused }) => <TabIcon name="ofertas" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    borderWidth: 3.5,
    borderColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    elevation: 8,
  },
  inactiveIconWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

