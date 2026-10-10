import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
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
  const [isSpeakingArrival, setIsSpeakingArrival] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((speaking) => {
      if (!speaking) {
        setIsSpeakingArrival(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleReplayArrivalAudio = () => {
    if (isSpeakingArrival) {
      audioManager.stop(true);
      setIsSpeakingArrival(false);
      return;
    }
    setIsSpeakingArrival(true);
    audioManager.speak({
      text: `¡Llegaste a ${riddle.storeName}! Tu misión es buscar ${riddle.featuredProduct.name} en el exhibidor y escanear su código QR.`,
      priority: 'high',
      language: 'es-VE',
      pitch: 1.05,
      rate: 0.95,
      onDone: () => setIsSpeakingArrival(false),
      onError: () => setIsSpeakingArrival(false),
    });
  };

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

  const isAudioActive = isListening || isSpeakingArrival;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        {/* Header Badge */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={[styles.arrivalBadge, isAudioActive && styles.listeningBadge]}
            onPress={handleReplayArrivalAudio}
            activeOpacity={0.8}
          >
            <AppIcon
              name={isAudioActive ? 'volume-high' : 'checkmark-circle'}
              size={15}
              color={isAudioActive ? '#2563EB' : '#059669'}
            />
            <Text style={[styles.arrivalBadgeText, isAudioActive && styles.listeningBadgeText]}>
              {isAudioActive ? '🔊 ESCUCHANDO INSTRUCCIÓN' : '¡LLEGASTE AL LOCAL! 🔊'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onReturnToTreasureMap}
            activeOpacity={0.7}
          >
            <AppIcon name="close" size={16} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Store Title */}
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{riddle.storeName}</Text>
          <Text style={styles.floorSub}>{riddle.floorName} · {riddle.category}</Text>
        </View>

        {/* Mission / Product Deal Box with Product Image Background */}
        <View style={styles.missionBox}>
          {riddle.featuredProduct.imageUrl ? (
            <>
              <Image
                source={{ uri: riddle.featuredProduct.imageUrl }}
                style={styles.missionBgImage}
                resizeMode="cover"
              />
              {/* Glass Frosted Overlay: keeps image perfectly visible while guaranteeing 100% crisp readable text */}
              <View style={styles.missionBoxOverlay} />
            </>
          ) : null}

          <View style={styles.missionContent}>
            <View style={styles.dealHeaderRow}>
              <View style={styles.discountPill}>
                <Text style={styles.discountText}>{riddle.featuredProduct.discountBadge}</Text>
              </View>
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>{riddle.featuredProduct.price}</Text>
              </View>
            </View>
            <Text style={styles.productName}>{riddle.featuredProduct.name}</Text>
            <Text style={styles.missionDesc}>
              {riddle.featuredProduct.description}
            </Text>
          </View>
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
      </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
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
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 6,
  },
  listeningBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  arrivalBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  listeningBadgeText: {
    color: '#2563EB',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeInfo: {
    marginBottom: 12,
  },
  storeName: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  floorSub: {
    color: '#64748B',
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 2,
  },
  missionBox: {
    position: 'relative',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  missionBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  missionBoxOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
  },
  missionContent: {
    padding: 14,
  },
  dealHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  discountPill: {
    backgroundColor: 'rgba(254, 243, 199, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  discountText: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '800',
  },
  pricePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  priceText: {
    color: '#059669',
    fontSize: 15,
    fontWeight: '900',
  },
  productName: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    marginVertical: 3,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  missionDesc: {
    color: '#334155',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  actionsContainer: {
    gap: 10,
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    height: 50,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  scanBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '800',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  backBtnText: {
    color: '#475569',
    fontSize: 12.5,
    fontWeight: '700',
  },
});
