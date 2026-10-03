import React from 'react';
import Svg, {
  G,
  Path,
  Rect,
  Circle,
  Polygon,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

interface ElementProps {
  x: number;
  y: number;
  scale?: number;
}

/**
 * 2.5D Isometric Shop Storefront with awning & "SHOP" canopy
 */
export function IsometricShop({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Base Floor */}
      <Polygon points="0,30 40,10 80,30 40,50" fill="#E2E8F0" />
      
      {/* Back & Left Wall */}
      <Polygon points="0,30 40,10 40,-20 0,0" fill="#94A3B8" />
      {/* Right Wall */}
      <Polygon points="40,10 80,30 80,0 40,-20" fill="#CBD5E1" />

      {/* Storefront Interior / Glass */}
      <Polygon points="10,25 38,11 38,-10 10,4" fill="#0F172A" />
      <Polygon points="42,11 70,25 70,4 42,-10" fill="#1E293B" />

      {/* Awning / Canopy */}
      <Polygon points="5,15 40,-2 75,15 40,32" fill="#3B82F6" />
      <Polygon points="5,15 40,32 40,38 5,21" fill="#1D4ED8" />
      <Polygon points="40,32 75,15 75,21 40,38" fill="#2563EB" />

      {/* "SHOP" Sign */}
      <Rect x="28" y="24" width="24" height="8" rx="2" fill="#0F172A" transform="rotate(-15 40 28)" />
      <SvgText x="32" y="30" fill="#FFFFFF" fontSize="5" fontWeight="900" transform="rotate(-15 40 28)">
        SHOP
      </SvgText>
    </G>
  );
}

/**
 * 2.5D Isometric Central Fountain with water pool and flower planters
 */
export function IsometricFountain({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Plaza Basin */}
      <Polygon points="0,25 35,5 70,25 35,45" fill="#E2E8F0" />
      <Polygon points="5,23 35,8 65,23 35,38" fill="#38BDF8" opacity="0.85" />

      {/* Fountain Center Pillar */}
      <Polygon points="30,22 40,17 40,5 30,10" fill="#64748B" />
      <Polygon points="40,17 50,22 50,10 40,5" fill="#94A3B8" />

      {/* Top Basin */}
      <Polygon points="25,8 35,3 45,8 35,13" fill="#0284C7" />
      <Circle cx="35" cy="4" r="3" fill="#E0F2FE" />

      {/* Corner Flower Pots */}
      <Circle cx="12" cy="18" r="4" fill="#10B981" />
      <Circle cx="58" cy="18" r="4" fill="#10B981" />
      <Circle cx="35" cy="40" r="4" fill="#10B981" />
    </G>
  );
}

/**
 * 2.5D Isometric Escalators (Stairs between levels)
 */
export function IsometricEscalator({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Glass Balustrade & Metallic Structure */}
      <Polygon points="0,40 30,10 35,12 5,42" fill="#38BDF8" opacity="0.6" />
      <Polygon points="5,42 35,12 45,17 15,47" fill="#64748B" />
      <Polygon points="15,47 45,17 50,19 20,49" fill="#94A3B8" />

      {/* Handrails (Blue/Dark) */}
      <Polygon points="0,38 30,8 32,9 2,39" fill="#1E293B" />
      <Polygon points="18,47 48,17 50,18 20,48" fill="#1E293B" />

      {/* Steps Grooves */}
      <Path d="M 8,43 L 13,40 M 14,37 L 19,34 M 20,31 L 25,28 M 26,25 L 31,22 M 32,19 L 37,16" stroke="#FFFFFF" strokeWidth="1.5" />
    </G>
  );
}

/**
 * 2.5D Isometric Planter with Tree
 */
export function IsometricTree({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Wooden Box Planter */}
      <Polygon points="0,15 15,7 30,15 15,23" fill="#D97706" />
      <Polygon points="0,15 15,23 15,30 0,22" fill="#92400E" />
      <Polygon points="15,23 30,15 30,22 15,30" fill="#B45309" />

      {/* Trunk */}
      <Rect x="13" y="-5" width="4" height="16" fill="#78350F" />

      {/* Canopy / Foliage */}
      <Circle cx="15" cy="-8" r="14" fill="#10B981" />
      <Circle cx="12" cy="-12" r="10" fill="#34D399" opacity="0.7" />
    </G>
  );
}

/**
 * 2.5D Isometric Wooden Bench
 */
export function IsometricBench({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      <Polygon points="0,8 20,-2 26,1 6,11" fill="#F59E0B" />
      <Polygon points="0,8 6,11 6,14 0,11" fill="#B45309" />
      <Polygon points="6,11 26,1 26,4 6,14" fill="#D97706" />
      <Rect x="2" y="11" width="2" height="6" fill="#1E293B" />
      <Rect x="22" y="2" width="2" height="6" fill="#1E293B" />
    </G>
  );
}

/**
 * 2.5D Restroom Sign
 */
export function IsometricRestroomSign({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      <Polygon points="0,15 20,5 20,-10 0,0" fill="#2563EB" />
      <Polygon points="20,5 24,7 24,-8 20,-10" fill="#1D4ED8" />
      <SvgText x="5" y="3" fill="#FFFFFF" fontSize="8" fontWeight="bold">
        🚻
      </SvgText>
    </G>
  );
}

/**
 * 2.5D Pulsing User Location Radar Pin
 */
export function IsometricLocationRadar({ x, y, scale = 1 }: ElementProps) {
  return (
    <G transform={`translate(${x}, ${y}) scale(${scale})`}>
      <Circle cx="0" cy="0" r="28" fill="#3B82F6" opacity="0.15" />
      <Circle cx="0" cy="0" r="18" fill="#3B82F6" opacity="0.3" />
      <Circle cx="0" cy="0" r="8" fill="#2563EB" />
      <Circle cx="0" cy="0" r="4" fill="#FFFFFF" />
    </G>
  );
}
