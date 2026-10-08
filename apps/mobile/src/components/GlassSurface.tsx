import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import { glass, radii } from '@mallos/design-tokens';

export interface GlassSurfaceProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  intensity?: keyof typeof glass.intensity;
  radius?: keyof typeof radii;
  style?: StyleProp<ViewStyle>;
}

/**
 * Superficie con efecto glassmorphism ultra-estable (Zero Native Crash).
 * Utiliza composición pura de View con alpha blending y bordes sutiles.
 */
export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  variant = 'dark',
  radius = 'xl',
  style,
}) => {
  return (
    <View
      style={[
        styles.base,
        {
          borderRadius: radii[radius],
          backgroundColor: glass[variant].backgroundColor,
          borderColor: glass[variant].borderColor,
          borderWidth: glass[variant].borderWidth,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
