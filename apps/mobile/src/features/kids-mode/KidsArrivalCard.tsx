import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { audioManager } from '../../lib/audio-manager';
import { GlassSurface } from '../../components/GlassSurface';
import { AppIcon } from '../../components/AppIcon';
import type { KidsRiddle } from './kids-data';

interface KidsArrivalCardProps {
  riddle: KidsRiddle;
  playerName: string;
  isListening?: boolean;
  onOpenScanner: () => void;
  onReturnToTreasureMap: () => void;
}

export const KidsArrivalCard: React.FC<KidsArrivalCardProps> = ({
  riddle,
  playerName,
  isListening = false,
  onOpenScanner,
  onReturnToTreasureMap,
}) => {
  const handleOpenScannerWithVoice = () => {
    audioManager.speak({
      text: '¡Muy bien! Enfoca con la cámara el código QR del producto.',
      priority: 'high',
      language: 'es-VE',
      pitch: 1.05,
      rate: 0.95,
      delayMs: 150,
    });
    onOpenScanner();
  };

  return (
    <View style={styles.overlay}>
      <GlassSurface
        variant="dark"
        intensity="strong"
        radius="xl"
        style={styles.card}
      >
        {/* Header Badge */}
        <View style={styles.headerRow}>
          <View style={[styles.arrivalBadge, isListening && styles.listeningBadge]}>
            <AppIcon name={isListening ? 'volume-high' : 'checkmark-circle'} size={16} color={isListening ? '#38BDF8' : '#10B981'} />
            <Text style={[styles.arrivalBadgeText, isListening && styles.listeningBadgeText]}>
              {isListening ? '🔊 ESCUCHANDO INSTRUCCIONES...' : '¡LLEGASTE AL LOCAL!'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onReturnToTreasureMap}
            activeOpacity={0.7}
          >
            <AppIcon name="close" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Store Title */}
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{riddle.storeName}</Text>
          <Text style={styles.floorSub}>{riddle.floorName} · {riddle.category}</Text>
        </View>

        {/* Mission / Product Deal Box */}
        <View style={styles.missionBox}>
          <View style={styles.dealHeaderRow}>
            <View style={styles.discountPill}>
              <Text style={styles.discountText}>{riddle.featuredProduct.discountBadge}</Text>
            </View>
            <Text style={styles.priceText}>{riddle.featuredProduct.price}</Text>
          </View>
          <Text style={styles.productName}>{riddle.featuredProduct.name}</Text>
          <Text style={styles.missionDesc}>
            {riddle.featuredProduct.description}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={handleOpenScannerWithVoice}
            activeOpacity={0.88}
          >
            <AppIcon name="qr-code" size={18} color="#FFFFFF" />
            <Text style={styles.scanBtnText}>📸 Escanear QR en Tienda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={onReturnToTreasureMap}
            activeOpacity={0.8}
          >
            <Text style={styles.backBtnText}>Volver al Mapa del Tesoro 🗺️</Text>
          </TouchableOpacity>
        </View>
      </GlassSurface>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 24,
    left: 14,
    right: 14,
    zIndex: 60,
  },
  card: {
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.5)',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  arrivalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
    gap: 6,
  },
  listeningBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38BDF8',
  },
  arrivalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  listeningBadgeText: {
    color: '#38BDF8',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeInfo: {
    marginBottom: 12,
  },
  storeName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  floorSub: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  missionBox: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  dealHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  discountPill: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  priceText: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '900',
  },
  productName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
    marginVertical: 2,
  },
  missionDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
  },
  actionsContainer: {
    gap: 8,
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED',
    height: 48,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  scanBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  backBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
});
