import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface CategoryIconProps {
  slug: string;
  size?: number;
  showBackground?: boolean;
  bgColor?: string;
  iconColor?: string;
}

export function CategoryIcon({
  slug,
  size = 52,
  showBackground = true,
  bgColor = '#4F46E5',
  iconColor = '#FFFFFF',
}: CategoryIconProps) {
  const normSlug = slug.toLowerCase();
  const iconSize = size * 0.48;

  const renderVector = () => {
    switch (normSlug) {
      case 'moda':
        // T-Shirt / Fashion vector
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
          </Svg>
        );

      case 'restaurantes':
      case 'comida':
        // Fork & Knife
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M18 2v20M21 2v6a3 3 0 0 1-3 3M18 11v11" />
            <Path d="M5 2v7a3 3 0 0 0 3 3v10M8 2v7M2 2v7a6 6 0 0 0 6 6" />
          </Svg>
        );

      case 'entretenimiento':
      case 'ocio':
        // Cinema clapper / Ticket
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="6" width="20" height="12" rx="2" />
            <Path d="M6 12h.01M18 12h.01M12 6v12" strokeDasharray="2 2" />
          </Svg>
        );

      case 'belleza':
        // Sparkle / Star / Pin
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
          </Svg>
        );

      case 'tecnologia':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="5" y="2" width="14" height="20" rx="3" />
            <Path d="M12 18h.01" />
          </Svg>
        );

      case 'deportes':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12" />
          </Svg>
        );

      case 'hogar':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10z" />
          </Svg>
        );

      case 'salud':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 5v14M5 12h14" />
          </Svg>
        );

      case 'servicios':
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="3" />
            <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </Svg>
        );

      case 'finanzas':
      default:
        return (
          <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="5" width="20" height="14" rx="2" />
            <Path d="M2 10h20M6 15h2" />
          </Svg>
        );
    }
  };

  if (!showBackground) {
    return renderVector();
  }

  return (
    <View
      style={[
        styles.circleWrapper,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
      ]}
    >
      {renderVector()}
    </View>
  );
}

const styles = StyleSheet.create({
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});
