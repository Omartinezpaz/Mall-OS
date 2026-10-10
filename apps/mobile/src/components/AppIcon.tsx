import React from 'react';
import Svg, { Path, Circle, Rect, Polyline, Line, G } from 'react-native-svg';

export type AppIconName =
  | 'search'
  | 'close'
  | 'close-circle'
  | 'checkmark'
  | 'walk'
  | 'chevron-forward'
  | 'chevron-down'
  | 'chevron-back'
  | 'location'
  | 'storefront'
  | 'trophy'
  | 'navigate'
  | 'arrow-up'
  | 'arrow-back'
  | 'arrow-forward'
  | 'volume-high'
  | 'volume-mute'
  | 'star'
  | 'apps'
  | 'shirt'
  | 'fast-food'
  | 'business'
  | 'medkit'
  | 'film'
  | 'construct'
  | 'hardware-chip'
  | 'gift'
  | 'restaurant'
  | 'game-controller'
  | 'map'
  | 'cube'
  | 'add'
  | 'remove'
  | 'eye'
  | 'refresh'
  | 'notifications'
  | 'bell'
  | 'person'
  | 'profile'
  | 'call'
  | 'phone'
  | 'attach'
  | 'paperclip'
  | 'external-link'
  | 'share'
  | 'send'
  | 'trash'
  | 'pricetag'
  | 'tag'
  | 'compass'
  | 'home';

interface AppIconProps {
  name: AppIconName | string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

export function AppIcon({
  name,
  size = 20,
  color = '#FFFFFF',
  strokeWidth = 2,
  style,
}: AppIconProps) {
  const renderIcon = () => {
    switch (name) {
      case 'checkmark':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="20 6 9 17 4 12" />
          </G>
        );

      case 'checkmark-done':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="17 7 8 16 3 11" />
            <Polyline points="21 7 12 16 9.5 13.5" />
          </G>
        );

      case 'walk':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="13" cy="4" r="2" />
            <Path d="m9 20 3-6 2 2v4M6 13l3-2 3 2 4-2M14 9l-2-2-4 1" />
          </G>
        );

      case 'close-circle':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="10" />
            <Line x1="15" y1="9" x2="9" y2="15" />
            <Line x1="9" y1="9" x2="15" y2="15" />
          </G>
        );

      case 'search':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="11" cy="11" r="8" />
            <Path d="M21 21l-4.35-4.35" />
          </G>
        );

      case 'close':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="18" y1="6" x2="6" y2="18" />
            <Line x1="6" y1="6" x2="18" y2="18" />
          </G>
        );


      case 'chevron-forward':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="9 18 15 12 9 6" />
          </G>
        );

      case 'chevron-down':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="6 9 12 15 18 9" />
          </G>
        );

      case 'chevron-back':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="15 18 9 12 15 6" />
          </G>
        );

      case 'location':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <Circle cx="12" cy="10" r="3" />
          </G>
        );

      case 'storefront':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <Polyline points="9 22 9 12 15 12 15 22" />
          </G>
        );

      case 'trophy':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <Path d="M4 22h16" />
            <Path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-2c-.55 0-1-.45-1-1v-2.34" />
            <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </G>
        );

      case 'navigate':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polygon points="3 11 22 2 13 21 11 13 3 11" fill={color} opacity="0.3" />
            <Polyline points="3 11 22 2 13 21 11 13 3 11" />
          </G>
        );

      case 'arrow-up':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="12" y1="19" x2="12" y2="5" />
            <Polyline points="5 12 12 5 19 12" />
          </G>
        );

      case 'arrow-back':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="19" y1="12" x2="5" y2="12" />
            <Polyline points="12 19 5 12 12 5" />
          </G>
        );

      case 'arrow-forward':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="5" y1="12" x2="19" y2="12" />
            <Polyline points="12 5 19 12 12 19" />
          </G>
        );

      case 'volume-high':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <Path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <Path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </G>
        );

      case 'volume-mute':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <Line x1="23" y1="9" x2="17" y2="15" />
            <Line x1="17" y1="9" x2="23" y2="15" />
          </G>
        );

      case 'star':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill={color} strokeLinecap="round" strokeLinejoin="round">
            <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </G>
        );

      case 'apps':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="3" y="3" width="7" height="7" rx="1.5" />
            <Rect x="14" y="3" width="7" height="7" rx="1.5" />
            <Rect x="14" y="14" width="7" height="7" rx="1.5" />
            <Rect x="3" y="14" width="7" height="7" rx="1.5" />
          </G>
        );

      case 'shirt':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 2L3 6v15a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4H6z" />
            <Path d="M16 2a4 4 0 0 1-8 0" />
          </G>
        );

      case 'fast-food':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 11h16" />
            <Path d="M5 11c0-4 3.1-7 7-7s7 3 7 7" />
            <Rect x="5" y="14" width="14" height="6" rx="2" />
          </G>
        );

      case 'business':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
          </G>
        );

      case 'medkit':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="6" width="20" height="15" rx="2" />
            <Path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <Path d="M12 10v7M8.5 13.5h7" />
          </G>
        );

      case 'film':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="2" y="2" width="20" height="20" rx="2.18" />
            <Line x1="7" y1="2" x2="7" y2="22" />
            <Line x1="17" y1="2" x2="17" y2="22" />
            <Line x1="2" y1="12" x2="22" y2="12" />
          </G>
        );

      case 'construct':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </G>
        );

      case 'hardware-chip':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Rect x="4" y="4" width="16" height="16" rx="2" />
            <Rect x="9" y="9" width="6" height="6" />
            <Line x1="9" y1="1" x2="9" y2="4" />
            <Line x1="15" y1="1" x2="15" y2="4" />
            <Line x1="9" y1="20" x2="9" y2="23" />
            <Line x1="15" y1="20" x2="15" y2="23" />
            <Line x1="20" y1="9" x2="23" y2="9" />
            <Line x1="20" y1="14" x2="23" y2="14" />
            <Line x1="1" y1="9" x2="4" y2="9" />
            <Line x1="1" y1="14" x2="4" y2="14" />
          </G>
        );

      case 'gift':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="20 12 20 22 4 22 4 12" />
            <Rect x="2" y="7" width="20" height="5" />
            <Line x1="12" y1="22" x2="12" y2="7" />
            <Path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <Path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </G>
        );

      case 'restaurant':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
            <Path d="M15 11v11" />
            <Path d="M6 2v20" />
            <Path d="M9 2a3 3 0 0 1-3 3H3" />
          </G>
        );

      case 'game-controller':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="6" y1="12" x2="10" y2="12" />
            <Line x1="8" y1="10" x2="8" y2="14" />
            <Line x1="15" y1="13" x2="15.01" y2="13" strokeWidth={3} />
            <Line x1="18" y1="11" x2="18.01" y2="11" strokeWidth={3} />
            <Rect x="2" y="6" width="20" height="12" rx="6" />
          </G>
        );

      case 'map':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <Line x1="8" y1="2" x2="8" y2="18" />
            <Line x1="16" y1="6" x2="16" y2="22" />
          </G>
        );

      case 'cube':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <Polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <Line x1="12" y1="22.08" x2="12" y2="12" />
          </G>
        );

      case 'add':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="12" y1="5" x2="12" y2="19" />
            <Line x1="5" y1="12" x2="19" y2="12" />
          </G>
        );

      case 'remove':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="5" y1="12" x2="19" y2="12" />
          </G>
        );

      case 'eye':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <Circle cx="12" cy="12" r="3" />
          </G>
        );

      case 'refresh':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M23 4v6h-6" />
            <Path d="M1 20v-6h6" />
            <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </G>
        );

      case 'notifications':
      case 'bell':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </G>
        );

      case 'person':
      case 'profile':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <Circle cx="12" cy="7" r="4" />
          </G>
        );

      case 'call':
      case 'phone':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </G>
        );

      case 'attach':
      case 'paperclip':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </G>
        );

      case 'external-link':
      case 'share':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <Polyline points="15 3 21 3 21 9" />
            <Line x1="10" y1="14" x2="21" y2="3" />
          </G>
        );

      case 'send':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Line x1="22" y1="2" x2="11" y2="13" />
            <Polygon points="22 2 15 22 11 13 2 9 22 2" fill={color} opacity={0.2} />
            <Polygon points="22 2 15 22 11 13 2 9 22 2" />
          </G>
        );

      case 'trash':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="3 6 5 6 21 6" />
            <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <Line x1="10" y1="11" x2="10" y2="17" />
            <Line x1="14" y1="11" x2="14" y2="17" />
          </G>
        );

      case 'pricetag':
      case 'tag':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <Circle cx="7" cy="7" r="1.5" />
          </G>
        );

      case 'compass':
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="10" />
            <Polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} opacity={0.3} />
            <Polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </G>
        );

      case 'home':
      default:
        return (
          <G stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <Polyline points="9 22 9 12 15 12 15 22" />
          </G>
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {renderIcon()}
    </Svg>
  );
}

// Helpers for Polygon
function Polygon({ points, fill, opacity }: { points: string; fill?: string; opacity?: string | number }) {
  return <Path d={pointsToPath(points)} fill={fill} opacity={opacity} />;
}

function pointsToPath(points: string): string {
  const parts = points.trim().split(/\s+/);
  if (parts.length < 2) return '';
  let d = '';
  for (let i = 0; i < parts.length; i += 2) {
    const x = parts[i];
    const y = parts[i + 1];
    d += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
  }
  return d + 'Z';
}
