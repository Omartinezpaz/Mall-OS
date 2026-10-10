import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface MallOsLogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'white' | 'monochrome';
}

export function MallOsLogo({
  size = 48,
  showText = false,
  variant = 'full',
}: MallOsLogoProps) {
  const isLight = variant === 'white';
  const isMono = variant === 'monochrome';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageWrapper,
          {
            width: size,
            height: size,
            borderRadius: Math.round(size * 0.28),
          },
        ]}
      >
        <Image
          source={require('../../assets/logo_mallos_official.jpg')}
          style={styles.logoImage}
          resizeMode="cover"
        />
      </View>

      {showText && (
        <View style={styles.textBlock}>
          <Text
            style={[
              styles.brandTitle,
              isLight && styles.brandTitleLight,
              isMono && styles.brandTitleMono,
            ]}
          >
            Mall OS
          </Text>
          <Text
            style={[
              styles.brandTagline,
              isLight && styles.brandTaglineLight,
              isMono && styles.brandTaglineMono,
            ]}
          >
            The Digital Layer of the Mall
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageWrapper: {
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  textBlock: {
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  brandTitleLight: {
    color: '#0F172A',
  },
  brandTitleMono: {
    color: '#F8FAFC',
  },
  brandTagline: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  brandTaglineLight: {
    color: '#64748B',
  },
  brandTaglineMono: {
    color: '#64748B',
  },
});
