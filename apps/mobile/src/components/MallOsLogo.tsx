import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Polygon,
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
          {/* Primary Top Facet Gradient - Cyan / Emerald */}
          <LinearGradient id="topFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isMono ? '#94A3B8' : '#38BDF8'} />
            <Stop offset="100%" stopColor={isMono ? '#475569' : '#2563EB'} />
          </LinearGradient>

          {/* Left Facet Gradient - Deep Royal */}
          <LinearGradient id="leftFacet" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={isMono ? '#64748B' : '#1D4ED8'} />
            <Stop offset="100%" stopColor={isMono ? '#1E293B' : '#0F172A'} />
          </LinearGradient>

          {/* Right Facet Gradient - Luminous Accent */}
          <LinearGradient id="rightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={isMono ? '#475569' : '#10B981'} />
            <Stop offset="100%" stopColor={isMono ? '#0F172A' : '#059669'} />
          </LinearGradient>

          {/* Central Digital Core / Pulse */}
          <LinearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
          </LinearGradient>
        </Defs>

        {/* Isometric Layered Architectural Logo (Mall OS Emblem) */}
        <G>
          {/* Level 1: Bottom Base Plane (Isometric Floor Slab) */}
          <Path
            d="M 60,78 L 100,56 L 60,34 L 20,56 Z"
            fill="url(#leftFacet)"
            opacity="0.4"
          />

          {/* Level 2: Middle Suspended Floor Plane */}
          <Path
            d="M 60,64 L 94,45 L 60,26 L 26,45 Z"
            fill="url(#topFacet)"
            opacity="0.75"
          />

          {/* Isometric Left Pillar ("M" left leg) */}
          <Path
            d="M 26,45 L 42,36 L 42,76 L 26,85 Z"
            fill="url(#leftFacet)"
          />

          {/* Isometric Right Pillar ("M" right leg) */}
          <Path
            d="M 94,45 L 78,36 L 78,76 L 94,85 Z"
            fill="url(#rightFacet)"
          />

          {/* Center Valley / Apex Fold ("M" digital chevron) */}
          <Path
            d="M 42,36 L 60,52 L 78,36 L 60,20 Z"
            fill="url(#topFacet)"
          />

          {/* Center Vertical Core Drop */}
          <Path
            d="M 60,52 L 60,88 L 42,76 L 42,40 Z"
            fill="url(#leftFacet)"
            opacity="0.85"
          />
          <Path
            d="M 60,52 L 78,40 L 78,76 L 60,88 Z"
            fill="url(#rightFacet)"
            opacity="0.95"
          />

          {/* Luminous Neon Edge Highlights */}
          <Path
            d="M 26,45 L 60,26 L 94,45"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Path
            d="M 42,36 L 60,52 L 78,36"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </G>
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
