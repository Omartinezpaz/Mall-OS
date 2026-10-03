import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, Ellipse, G } from 'react-native-svg';
import {
  type MallOsIconId,
  getMallOsIcon,
  normalizeMallOsIconId,
} from '@mallos/design-tokens';

export type { MallOsIconId };

interface MallOsSpriteIconProps {
  name: MallOsIconId | string;
  size?: number;
  color?: string;
  showCircle?: boolean;
  circleColor?: string;
}

export function MallOsSpriteIcon({
  name,
  size = 48,
  color = '#FFFFFF',
  showCircle = true,
  circleColor,
}: MallOsSpriteIconProps) {
  const canonicalId = normalizeMallOsIconId(name);
  const meta = getMallOsIcon(canonicalId);

  const bg = circleColor || meta.color;
  const innerSize = showCircle ? size * 0.52 : size;

  const renderPath = () => {
    switch (canonicalId) {
      case 'moda':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
            <Path d="M7 9.5 4.5 12v8h15v-8L17 9.5" />
          </G>
        );

      case 'restaurantes':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M7 3v8M4.5 3v4a2.5 2.5 0 0 0 5 0V3M7 11v10M15.5 3v18M15.5 3c3 2 3 6 0 8" />
          </G>
        );

      case 'entretenimiento':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 7h16v10H4zM8 7 6.5 4M16 7 17.5 4M9 12h6M12 9v6" />
          </G>
        );

      case 'belleza':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 21c-4-3-7-6.3-7-10.2C5 8 7.1 6 9.4 6c1.2 0 2.1.5 2.6 1.4C12.5 6.5 13.4 6 14.6 6 16.9 6 19 8 19 10.8 19 14.7 16 18 12 21Z" />
          </G>
        );

      case 'tecnologia':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="7" y="3" width="10" height="18" rx="2" />
            <Path d="M10 6h4M11 18h2" />
          </G>
        );

      case 'deportes':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 9h16M4 15h16M7 5h2v14H7zM15 5h2v14h-2z" />
          </G>
        );

      case 'hogar':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-6h6v6" />
          </G>
        );

      case 'salud':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
          </G>
        );

      case 'servicios':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="3" />
            <Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.8v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1A1.7 1.7 0 0 0 7.4 15a1.7 1.7 0 0 0-1.6-1H5.6v-2.8h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L7 8.2l2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2.8V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9" />
          </G>
        );

      case 'finanzas':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="4" y="6" width="16" height="12" rx="2" />
            <Path d="M4 10h16M8 15h3" />
          </G>
        );

      case 'supermercado':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 5h2l2 11h9l2-8H7" />
            <Circle cx="10" cy="19" r="1.5" />
            <Circle cx="17" cy="19" r="1.5" />
          </G>
        );

      case 'comida-rapida':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 10h14M7 10c.5-4 2.2-6 5-6s4.5 2 5 6M6 14h12l-1 6H7z" />
          </G>
        );

      case 'libreria':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 4h5a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5zM19 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5z" />
          </G>
        );

      case 'mascotas':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M8 10c-2 0-3-2-3-4 0-1.2.8-2 1.8-2 1.5 0 2.2 1.6 2.2 3.2C9 8.8 8.7 10 8 10ZM16 10c2 0 3-2 3-4 0-1.2-.8-2-1.8-2-1.5 0-2.2 1.6-2.2 3.2 0 1.6.3 2.8 1 2.8ZM12 11c-3 0-6 2.5-6 5.5C6 19 8.2 21 12 21s6-2 6-4.5C18 13.5 15 11 12 11Z" />
          </G>
        );

      case 'automotriz':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="m5 14 2-5h10l2 5v5H5zM7 9h10M5 14h14" />
            <Circle cx="8" cy="18" r="1.5" />
            <Circle cx="16" cy="18" r="1.5" />
          </G>
        );

      case 'viajes':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="m12 3 3 7 6 3-6 2-3 6-3-6-6-2 6-3z" />
          </G>
        );

      case 'regalos':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7H9a2 2 0 1 1 0-4c2 0 3 4 3 4ZM12 7h3a2 2 0 1 0 0-4c-2 0-3 4-3 4Z" />
          </G>
        );

      case 'fotografia':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="4" y="7" width="16" height="12" rx="2" />
            <Path d="m8 7 1.5-3h5L16 7" />
            <Circle cx="12" cy="13" r="3" />
          </G>
        );

      case 'arte-cultura':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 4c-5 0-8 3-8 7 0 3 2 5 5 5h1c1 0 1.5-1 1.5-2s.8-2 2-2H16c2.5 0 4-1.8 4-4 0-2.8-3.2-4-8-4Z" />
            <Circle cx="8" cy="10" r="1" />
            <Circle cx="11" cy="7.5" r="1" />
            <Circle cx="15" cy="8" r="1" />
          </G>
        );

      case 'bebes':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="7" />
            <Path d="M9 10h.01M15 10h.01M9 15c1.8 1.5 4.2 1.5 6 0M8 5c1-2 7-2 8 0" />
          </G>
        );

      case 'otros':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="6" cy="12" r="1.2" fill={color} />
            <Circle cx="12" cy="12" r="1.2" fill={color} />
            <Circle cx="18" cy="12" r="1.2" fill={color} />
          </G>
        );

      case 'tu-cuenta':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="8" r="3" />
            <Path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
          </G>
        );

      case 'escaleras':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 19h4v-4h4v-4h4V7h3M5 19V7" />
          </G>
        );

      case 'escalera-mecanica':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 19h3l7-10h6 M8 12l3-3 M5 16l3-3" />
          </G>
        );

      case 'ascensor':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="6" y="4" width="12" height="16" rx="2" />
            <Path d="m10 10 2-2 2 2M10 14l2 2 2-2" />
          </G>
        );

      case 'banos':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="8" cy="6" r="2" />
            <Path d="M8 9v6M5 12h6M7 15v5M11 15v5" />
            <Circle cx="16" cy="6" r="2" />
            <Path d="M16 9v11" />
          </G>
        );

      case 'cajero':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="4" y="5" width="16" height="14" rx="2" />
            <Path d="M7 9h10M8 14h4" />
          </G>
        );

      case 'entrada':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 5v14h6v-5h4v5h4V5l-7-3Z M8 12h.01" />
          </G>
        );

      case 'salida':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 5h8v14H6 M12 12h8M17 9l3 3-3 3" />
          </G>
        );

      case 'parking':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="5" y="4" width="14" height="16" rx="2" />
            <Path d="M9 7h4a3 3 0 0 1 0 6H9v4" />
          </G>
        );

      case 'ubicacion':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
            <Circle cx="12" cy="10" r="2.5" />
          </G>
        );

      case 'user-location':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="3" fill={color} />
            <Circle cx="12" cy="12" r="6" strokeDasharray="2,2" />
          </G>
        );

      case 'promociones':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 5h14v14H5zM8 16l8-8" />
            <Circle cx="9" cy="9" r="1" />
            <Circle cx="15" cy="15" r="1" />
          </G>
        );

      case 'descuentos':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M5 5h14v14H5zM8 16l8-8M9 9h.01M15 15h.01" />
          </G>
        );

      case 'sostenibilidad':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M20 4C11 4 6 8 6 14c0 3 2 5 5 5 6 0 9-5 9-15ZM4 20c3-4 7-6 12-8" />
          </G>
        );

      case 'seguridad':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M12 3 20 6v6c0 5-3.3 8-8 9-4.7-1-8-4-8-9V6z" />
            <Path d="m8.5 12 2.2 2.2 4.8-5" />
          </G>
        );

      case 'arbol':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="9" r="4" />
            <Path d="M12 13v7 M10 16l2-3 2 3" />
          </G>
        );

      case 'banco-asiento':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 12h16 M4 9h16 M6 12v6 M18 12v6 M4 9v9 M20 9v9" />
          </G>
        );

      case 'fuente':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Ellipse cx="12" cy="16" rx="7" ry="3" />
            <Path d="M12 16V8 M9 11c0-3 3-3 3-3s3 0 3 3" />
          </G>
        );

      case 'papelera':
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 7h12l-2 11H8L6 7Z M4 7h16 M10 4h4" />
          </G>
        );

      case 'informacion':
      default:
        return (
          <G fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="9" />
            <Path d="M12 10v6M12 7h.01" />
          </G>
        );
    }
  };

  if (!showCircle) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        {renderPath()}
      </Svg>
    );
  }

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
        },
      ]}
    >
      <Svg width={innerSize} height={innerSize} viewBox="0 0 24 24">
        {renderPath()}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});
