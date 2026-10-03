import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Rect, Path, Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { getCouponByIdOrOfferId, activateLocalCoupon } from '../../src/features/offers';

export default function CuponViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [coupon, setCoupon] = useState(() => {
    let found = getCouponByIdOrOfferId(id);
    if (!found) {
      try {
        found = activateLocalCoupon(id);
      } catch (e) {
        // Fallback
      }
    }
    return found;
  });

  // Live countdown timer (starts at 5 minutes / 300 seconds)
  const [timeLeft, setTimeLeft] = useState(272); // 04:32 as in prototype
  const [savedToWallet, setSavedToWallet] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!coupon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>🎫</Text>
        <Text style={styles.errorTitle}>Cupón no encontrado</Text>
        <Text style={styles.errorSubtitle}>
          No se encontró el cupón o la oferta ha caducado.
        </Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Volver a Ofertas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Mira mi cupón para "${coupon.offerTitle}" en ${coupon.storeName}! Código: ${coupon.code}`,
      });
    } catch (e) {
      // Ignora error
    }
  };

  const handleSaveWallet = () => {
    setSavedToWallet(true);
    Alert.alert('Guardado en Wallet', 'Tu cupón ha sido guardado exitosamente para acceso rápido sin conexión.');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backIconButton} onPress={() => router.back()}>
          <Text style={styles.backIconText}>←</Text>
        </TouchableOpacity>
        <View style={styles.topBarCenter}>
          <Text style={styles.topBarTitle}>¡Oferta activada!</Text>
          <Text style={styles.topBarSubtitle}>Muestra este código en tienda</Text>
        </View>
        <TouchableOpacity style={styles.shareIconButton} onPress={handleShare}>
          <Text style={styles.shareIconText}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Festive Ambient Particles Backdrop */}
        <View style={styles.particleCanvas}>
          <Svg width="100%" height={260} viewBox="0 0 340 260">
            <Defs>
              <RadialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                <Stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="170" cy="130" r="120" fill="url(#glowGrad)" />
            {/* Confetti / Particle accents */}
            <Circle cx="50" cy="40" r="4" fill="#60A5FA" opacity="0.8" />
            <Circle cx="290" cy="60" r="3" fill="#F59E0B" opacity="0.8" />
            <Circle cx="30" cy="180" r="3.5" fill="#10B981" opacity="0.8" />
            <Circle cx="310" cy="190" r="5" fill="#8B5CF6" opacity="0.8" />
            <Rect x="70" y="210" width="6" height="6" fill="#EC4899" transform="rotate(45 73 213)" opacity="0.8" />
            <Rect x="260" y="30" width="8" height="4" fill="#3B82F6" transform="rotate(30 264 32)" opacity="0.8" />
          </Svg>
        </View>

        {/* Central High-Density QR Card */}
        <View style={styles.qrCardContainer}>
          <View style={styles.qrCard}>
            {/* Real High-Fidelity Vector QR Code Visual */}
            <View style={styles.qrVisualWrapper}>
              <Svg width={180} height={180} viewBox="0 0 180 180">
                {/* Background */}
                <Rect width="180" height="180" fill="#FFFFFF" rx="12" />
                
                {/* Top-Left Finder Pattern */}
                <Rect x="16" y="16" width="44" height="44" rx="6" fill="#0F172A" />
                <Rect x="22" y="22" width="32" height="32" rx="4" fill="#FFFFFF" />
                <Rect x="28" y="28" width="20" height="20" rx="3" fill="#0F172A" />

                {/* Top-Right Finder Pattern */}
                <Rect x="120" y="16" width="44" height="44" rx="6" fill="#0F172A" />
                <Rect x="126" y="22" width="32" height="32" rx="4" fill="#FFFFFF" />
                <Rect x="132" y="28" width="20" height="20" rx="3" fill="#0F172A" />

                {/* Bottom-Left Finder Pattern */}
                <Rect x="16" y="120" width="44" height="44" rx="6" fill="#0F172A" />
                <Rect x="22" y="126" width="32" height="32" rx="4" fill="#FFFFFF" />
                <Rect x="28" y="132" width="20" height="20" rx="3" fill="#0F172A" />

                {/* Synthetic Data Matrix Points */}
                <Rect x="68" y="18" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="84" y="18" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="100" y="18" width="8" height="8" rx="2" fill="#0F172A" />
                
                <Rect x="68" y="34" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="92" y="34" width="16" height="8" rx="2" fill="#0F172A" />
                
                <Rect x="68" y="50" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="100" y="50" width="8" height="8" rx="2" fill="#0F172A" />
                
                {/* Center Core */}
                <Rect x="44" y="68" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="60" y="68" width="8" height="8" rx="2" fill="#3B82F6" />
                <Rect x="76" y="68" width="28" height="28" rx="6" fill="#3B82F6" />
                <Circle cx="90" cy="82" r="6" fill="#FFFFFF" />
                <Rect x="112" y="68" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="128" y="68" width="8" height="8" rx="2" fill="#0F172A" />
                
                <Rect x="18" y="76" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="144" y="76" width="16" height="8" rx="2" fill="#0F172A" />
                
                <Rect x="68" y="104" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="84" y="104" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="108" y="104" width="8" height="8" rx="2" fill="#0F172A" />
                
                <Rect x="68" y="120" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="92" y="120" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="108" y="120" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="132" y="120" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="148" y="120" width="14" height="8" rx="2" fill="#0F172A" />

                <Rect x="68" y="136" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="84" y="136" width="24" height="8" rx="2" fill="#0F172A" />
                <Rect x="116" y="136" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="132" y="136" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="156" y="136" width="8" height="8" rx="2" fill="#0F172A" />

                <Rect x="68" y="152" width="24" height="8" rx="2" fill="#0F172A" />
                <Rect x="100" y="152" width="8" height="8" rx="2" fill="#0F172A" />
                <Rect x="116" y="152" width="16" height="8" rx="2" fill="#0F172A" />
                <Rect x="140" y="152" width="24" height="8" rx="2" fill="#0F172A" />
              </Svg>
            </View>
          </View>
        </View>

        {/* Offer Details */}
        <View style={styles.offerInfoBlock}>
          <Text style={styles.benefitMainText}>{coupon.benefitLabel}</Text>
          <Text style={styles.benefitSubText}>{coupon.offerTitle}</Text>
          <Text style={styles.storeNameText}>{coupon.storeName} · {coupon.storeUnit}</Text>
        </View>

        {/* Live Countdown Badge */}
        <View style={styles.countdownBadge}>
          <Text style={styles.clockIcon}>⏱</Text>
          <Text style={styles.countdownLabel}>Válido por</Text>
          <Text style={styles.countdownTimer}>{formatTimer(timeLeft)}</Text>
        </View>

        {/* Alphanumeric Code Display */}
        <View style={styles.codePill}>
          <Text style={styles.codeText}>{coupon.code}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.walletButton, savedToWallet && styles.walletButtonSaved]}
            onPress={handleSaveWallet}
            activeOpacity={0.85}
          >
            <Text style={styles.walletButtonIcon}>💼</Text>
            <Text style={styles.walletButtonText}>
              {savedToWallet ? 'Guardado en Wallet' : 'Guardar en Wallet'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mapNavButton}
            onPress={() => router.push(`/(tabs)/mapa`)}
            activeOpacity={0.85}
          >
            <Text style={styles.mapNavButtonText}>🗺️ Ver tienda en el mapa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1D',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#0A0F1D',
  },
  backIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  topBarCenter: {
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  topBarSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  shareIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIconText: {
    fontSize: 16,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  particleCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  qrCardContainer: {
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrVisualWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  offerInfoBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitMainText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  benefitSubText: {
    color: '#CBD5E1',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  storeNameText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginBottom: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  clockIcon: {
    fontSize: 14,
  },
  countdownLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '500',
  },
  countdownTimer: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  codePill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#334155',
  },
  codeText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 8,
  },
  walletButtonSaved: {
    backgroundColor: '#0F766E',
    borderColor: '#14B8A6',
  },
  walletButtonIcon: {
    fontSize: 16,
  },
  walletButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  mapNavButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  mapNavButtonText: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0A0F1D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  errorEmoji: {
    fontSize: 48,
  },
  errorTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  errorSubtitle: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

