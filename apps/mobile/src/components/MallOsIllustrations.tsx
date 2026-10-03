import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

/**
 * 1. 2.5D Isometric Full Mall Overview Model
 */
export function IsometricMallComplex({ width = 300, height = 200 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 200">
      <Defs>
        <LinearGradient id="groundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#1E293B" />
          <Stop offset="100%" stopColor="#0F172A" />
        </LinearGradient>
        <LinearGradient id="blockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#F8FAFC" />
          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>
        <LinearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
        </LinearGradient>
      </Defs>

      {/* Isometric Floor Slab 1 (Base) */}
      <Polygon points="150,20 280,85 150,150 20,85" fill="url(#groundGrad)" stroke="#334155" strokeWidth="1.5" />

      {/* Internal Corridors (Light tiles) */}
      <Polygon points="150,45 250,95 150,145 50,95" fill="#E2E8F0" opacity="0.15" />

      {/* Left Wing Store Blocks */}
      <Polygon points="50,85 90,65 110,75 70,95" fill="url(#blockGrad)" />
      <Polygon points="50,85 70,95 70,110 50,100" fill="#94A3B8" />
      <Polygon points="70,95 110,75 110,90 70,110" fill="#64748B" />

      {/* Right Wing Store Blocks */}
      <Polygon points="190,75 230,55 250,65 210,85" fill="url(#blockGrad)" />
      <Polygon points="190,75 210,85 210,100 190,90" fill="#94A3B8" />
      <Polygon points="210,85 250,65 250,80 210,100" fill="#64748B" />

      {/* Central Atrium & Glass Roof */}
      <Polygon points="130,75 170,55 190,65 150,85" fill="url(#blueGlow)" />
      
      {/* Central Fountain */}
      <Circle cx="150" cy="100" r="14" fill="#38BDF8" opacity="0.6" />
      <Circle cx="150" cy="100" r="6" fill="#0284C7" />

      {/* Escalator connector */}
      <Polygon points="115,100 135,90 140,93 120,103" fill="#60A5FA" />

      {/* Little green trees */}
      <Circle cx="80" cy="120" r="6" fill="#10B981" />
      <Circle cx="220" cy="120" r="6" fill="#10B981" />
      <Circle cx="150" cy="50" r="5" fill="#10B981" />

      {/* Wayfinding Route Highlight */}
      <Path
        d="M 60,90 L 110,115 L 150,105 L 200,80"
        stroke="#3B82F6"
        strokeWidth="3.5"
        strokeDasharray="4 3"
        fill="none"
      />
      <Circle cx="60" cy="90" r="5" fill="#2563EB" />
      <Circle cx="200" cy="80" r="6" fill="#EF4444" />
    </Svg>
  );
}

/**
 * 2. 2.5D Panoramic Glass Elevator Tower
 */
export function IsometricElevatorTower({ width = 100, height = 140 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 140">
      <Defs>
        <LinearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <Stop offset="50%" stopColor="#93C5FD" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
        </LinearGradient>
      </Defs>

      {/* Main Structural Frame */}
      <Polygon points="50,10 85,25 85,120 50,105" fill="#1E293B" stroke="#475569" strokeWidth="1" />
      <Polygon points="15,25 50,10 50,105 15,120" fill="#334155" stroke="#475569" strokeWidth="1" />

      {/* Glass Front Panel */}
      <Polygon points="22,32 50,20 50,98 22,110" fill="url(#glassGrad)" />
      <Polygon points="50,20 78,32 78,110 50,98" fill="url(#glassGrad)" />

      {/* Elevator Capsule 1 (Top) */}
      <Polygon points="26,45 50,35 74,45 50,55" fill="#60A5FA" />
      <Polygon points="26,45 50,55 50,75 26,65" fill="#2563EB" />
      <Polygon points="50,55 74,45 74,65 50,75" fill="#1D4ED8" />
      <Circle cx="50" cy="62" r="4" fill="#FFFFFF" opacity="0.8" />

      {/* Vertical Cables */}
      <Path d="M 50,12 L 50,105" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" />
    </Svg>
  );
}

/**
 * 3. Circular Mall Signage Icons (Restroom, Escalator, Elevator, Entrance)
 */
export function CircularSignIcon({
  type,
  size = 48,
}: {
  type: 'restroom' | 'escalator' | 'elevator' | 'entrance';
  size?: number;
}) {
  const renderContent = () => {
    switch (type) {
      case 'restroom':
        return (
          <G transform="translate(14, 14)">
            {/* Male / Female Sign */}
            <Circle cx="7" cy="4" r="2.5" fill="#FFFFFF" />
            <Path d="M 4,8 L 10,8 L 9,16 L 5,16 Z" fill="#FFFFFF" />
            <Circle cx="17" cy="4" r="2.5" fill="#FFFFFF" />
            <Path d="M 14,8 L 20,8 L 21,13 L 19,13 L 19,16 L 15,16 L 15,13 L 13,13 Z" fill="#FFFFFF" />
          </G>
        );

      case 'escalator':
        return (
          <G transform="translate(12, 12)">
            {/* Steps and Person */}
            <Path d="M 3,18 L 9,18 L 15,6 L 21,6" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <Circle cx="13" cy="2" r="2" fill="#FFFFFF" />
            <Path d="M 11,5 L 15,5 L 14,10 L 10,10 Z" fill="#FFFFFF" />
          </G>
        );

      case 'elevator':
        return (
          <G transform="translate(12, 12)">
            <Rect x="4" y="3" width="16" height="18" rx="2" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <Path d="M 12,3 L 12,21" stroke="#FFFFFF" strokeWidth="1.5" />
            <Path d="M 8,8 L 6,10 L 10,10 Z" fill="#FFFFFF" />
            <Path d="M 16,16 L 14,14 L 18,14 Z" fill="#FFFFFF" />
          </G>
        );

      case 'entrance':
      default:
        return (
          <G transform="translate(12, 12)">
            <Path d="M 4,4 L 14,4 L 14,20 L 4,20" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <Path d="M 10,12 L 20,12 M 16,8 L 20,12 L 16,16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </G>
        );
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Defs>
        <RadialGradient id="signGrad" cx="30%" cy="30%" r="70%">
          <Stop offset="0%" stopColor="#3B82F6" />
          <Stop offset="100%" stopColor="#1E3A8A" />
        </RadialGradient>
      </Defs>
      <Circle cx="24" cy="24" r="22" fill="url(#signGrad)" stroke="#60A5FA" strokeWidth="1.5" />
      {renderContent()}
    </Svg>
  );
}

/**
 * 4. Store Status Indicator Card (e.g., Nike, Zara, Apple, H&M)
 */
export function StoreStatusCard({
  brand,
  category,
  logo,
  isOpen = true,
  onPress,
}: {
  brand: string;
  category: string;
  logo: string;
  isOpen?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.statusCard} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.statusLogoBadge}>
        <Text style={styles.statusLogoText}>{logo}</Text>
      </View>

      <View style={styles.statusInfo}>
        <Text style={styles.statusBrand}>{brand}</Text>
        <Text style={styles.statusCategory}>{category}</Text>
      </View>

      <View style={styles.statusIndicator}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isOpen ? '#10B981' : '#EF4444' },
          ]}
        />
        <Text
          style={[
            styles.statusLabel,
            { color: isOpen ? '#34D399' : '#F87171' },
          ]}
        >
          {isOpen ? 'Abierto' : 'Cerrado'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/**
 * 5. Interactive UI Element Showcase (Buttons, Switches, Chips, Sliders)
 */
export function UIElementsGallery() {
  return (
    <View style={styles.galleryContainer}>
      <Text style={styles.galleryHeader}>Formas y Elementos de UI</Text>

      {/* Button styles row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Botón principal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Botón secundario</Text>
        </TouchableOpacity>

        <View style={styles.chipPill}>
          <Text style={styles.chipPillText}>Chip</Text>
        </View>
      </View>

      {/* Search Input and Toggles */}
      <View style={styles.searchRow}>
        <View style={styles.searchMock}>
          <Text style={styles.searchMockIcon}>🔍</Text>
          <Text style={styles.searchMockPlaceholder}>Buscar...</Text>
        </View>

        {/* Toggle Switch */}
        <View style={styles.toggleActive}>
          <View style={styles.toggleKnobActive} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusLogoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLogoText: {
    fontSize: 18,
  },
  statusInfo: {
    flex: 1,
  },
  statusBrand: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
  },
  statusCategory: {
    color: '#64748B',
    fontSize: 12,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  galleryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  galleryHeader: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  secondaryBtnText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
  },
  chipPill: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  chipPillText: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchMock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 8,
  },
  searchMockIcon: {
    fontSize: 14,
  },
  searchMockPlaceholder: {
    color: '#64748B',
    fontSize: 13,
  },
  toggleActive: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  toggleKnobActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});
