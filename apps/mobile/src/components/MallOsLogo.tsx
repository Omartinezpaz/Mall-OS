import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Mask,
  G,
  Rect,
} from 'react-native-svg';

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
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Defs>
          {/* Left Ribbon Loop Gradient */}
          <LinearGradient id="leftRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isMono ? '#475569' : '#38BDF8'} />
            <Stop offset="50%" stopColor={isMono ? '#334155' : '#3B82F6'} />
            <Stop offset="100%" stopColor={isMono ? '#1E293B' : '#1D4ED8'} />
          </LinearGradient>

          {/* Right Ribbon Loop Gradient */}
          <LinearGradient id="rightRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isMono ? '#94A3B8' : '#C084FC'} />
            <Stop offset="50%" stopColor={isMono ? '#64748B' : '#8B5CF6'} />
            <Stop offset="100%" stopColor={isMono ? '#334155' : '#6D28D9'} />
          </LinearGradient>

          {/* Center Crossing Ribbon Loop Gradient */}
          <LinearGradient id="centerRibbon" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={isMono ? '#1E293B' : '#1E40AF'} />
            <Stop offset="50%" stopColor={isMono ? '#475569' : '#6366F1'} />
            <Stop offset="100%" stopColor={isMono ? '#64748B' : '#9333EA'} />
          </LinearGradient>

          {/* Glossy Specular Highlight */}
          <LinearGradient id="gloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* 3D Ribbon Letter "M" Vector Curves */}
        {/* Left Loop Arch */}
        <Path
          d="M 24,96 C 18,80 18,48 30,34 C 42,20 54,34 54,54 C 54,74 38,98 24,96 Z"
          fill="url(#leftRibbon)"
        />

        {/* Center Intersecting Fold */}
        <Path
          d="M 36,44 C 48,28 60,40 60,60 C 60,84 48,96 42,94 C 36,92 32,80 36,44 Z"
          fill="url(#centerRibbon)"
          opacity="0.95"
        />

        {/* Center to Right Arch */}
        <Path
          d="M 60,60 C 60,40 72,28 84,44 C 88,80 84,92 78,94 C 72,96 60,84 60,60 Z"
          fill="url(#rightRibbon)"
          opacity="0.95"
        />

        {/* Right Loop Arch */}
        <Path
          d="M 96,96 C 82,98 66,74 66,54 C 66,34 78,20 90,34 C 102,48 102,80 96,96 Z"
          fill="url(#rightRibbon)"
        />

        {/* Dynamic Specular Highlights */}
        <Path
          d="M 28,40 C 32,28 44,28 48,42"
          stroke="url(#gloss)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 72,42 C 76,28 88,28 92,40"
          stroke="url(#gloss)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>

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
    gap: 12,
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
