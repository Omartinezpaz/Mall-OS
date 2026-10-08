import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import { glass, radii, supportsNativeBlur } from '@mallos/design-tokens';

let BlurViewComponent: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ExpoBlur = require('expo-blur');
  if (ExpoBlur && ExpoBlur.BlurView) {
    BlurViewComponent = ExpoBlur.BlurView;
  }
} catch {
  BlurViewComponent = null;
}

export interface GlassSurfaceProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  intensity?: keyof typeof glass.intensity;
  radius?: keyof typeof radii;
  style?: StyleProp<ViewStyle>;
}

/**
 * Superficie con glassmorphism seguro.
 * Si expo-blur o el soporte nativo no están disponibles (como en OTA con APK anterior o Android <12),
 * renderiza un fondo oscuro sólido elegante sin crashear.
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

  if (!BlurViewComponent || !supportsNativeBlur()) {
    return <View style={[styles.base, baseStyle, style]}>{children}</View>;
  }

  const BlurView = BlurViewComponent;
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

