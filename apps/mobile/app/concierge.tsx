import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConciergeScreen } from '../src/features/concierge/ConciergeScreen';

export default function ConciergeRoute() {
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 20);

  return (
    <View style={[styles.container, { paddingTop: topSafe }]}>
      <StatusBar barStyle="light-content" backgroundColor="#090D16" />
      <ConciergeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
  },
});
