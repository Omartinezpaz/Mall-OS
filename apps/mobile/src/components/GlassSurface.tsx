import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { glass, radii, supportsNativeBlur } from '@mallos/design-tokens';

export interface GlassSurfaceProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  intensity?: keyof typeof glass.intensity;
  radius?: keyof typeof radii;
  style?: StyleProp<ViewStyle>;
}

/**
 * Superficie con glassmorphism.
 * iOS y Android 12+: blur nativo con BlurView.
 * Android <12 y fallback: fondo sólido premium con opacidad y borde sutil.
 */
export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  variant = 'dark',
  intensity = 'normal',
  radius = 'xl',
  style,
}) => {
  const baseStyle: ViewStyle = {
    borderRadius: radii[radius],
    backgroundColor: glass[variant].backgroundColor,
    borderColor: glass[variant].borderColor,
    borderWidth: glass[variant].borderWidth,
    overflow: 'hidden',
  };

  if (!supportsNativeBlur()) {
    return <View style={[styles.base, baseStyle, style]}>{children}</View>;
  }

  return (
    <BlurView
      intensity={glass.intensity[intensity]}
      tint={variant === 'dark' ? 'dark' : 'light'}
      style={[styles.base, baseStyle, style]}
    >
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
