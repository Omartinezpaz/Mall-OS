import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import {
  type KidsRiddle,
  type AgeGroup,
  AGE_GROUP_CONFIG,
} from './kids-data';

interface KidsQRScannerProps {
  riddle: KidsRiddle;
  ageGroup: AgeGroup;
  onScanned: () => void;
  onNavigateToStore: (storeId: string) => void;
  onBack: () => void;
}

export const KidsQRScanner: React.FC<KidsQRScannerProps> = ({
  riddle,
  ageGroup,
  onScanned,
  onNavigateToStore,
  onBack,
}) => {
  const config = AGE_GROUP_CONFIG[ageGroup];
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSimulateScan = () => {
    try {
      Vibration.vibrate([0, 60, 40, 60]);
    } catch {
      // Ignorar
    }
    setSuccess(true);
    setIsScanning(false);
    setTimeout(() => {
      onScanned();
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <AppIcon name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerPill}>
          <Text style={styles.headerPillText}>ESCÁNER DE TIENDA</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Target Store Banner */}
      <View style={styles.storeTargetCard}>
        <View style={styles.storeIconBox}>
          <AppIcon name="storefront" size={20} color="#0F172A" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.storeFloorText}>{riddle.floorName} · {riddle.category}</Text>
          <Text style={styles.storeNameText}>{riddle.storeName}</Text>
        </View>
        <TouchableOpacity
          style={styles.routeBtn}
          onPress={() => onNavigateToStore(riddle.storeId)}
          activeOpacity={0.8}
        >
          <AppIcon name="navigate" size={14} color="#38BDF8" />
          <Text style={styles.routeBtnText}>Ruta</Text>
        </TouchableOpacity>
      </View>

      {/* Scanner Visual Frame */}
      <View style={styles.scannerViewport}>
        <View style={[styles.targetBox, success && styles.targetBoxSuccess]}>
          <View style={[styles.cornerTL, { borderColor: success ? '#10B981' : config.color }]} />
          <View style={[styles.cornerTR, { borderColor: success ? '#10B981' : config.color }]} />
          <View style={[styles.cornerBL, { borderColor: success ? '#10B981' : config.color }]} />
          <View style={[styles.cornerBR, { borderColor: success ? '#10B981' : config.color }]} />

          {success ? (
            <View style={styles.successBadge}>
              <AppIcon name="checkmark-circle" size={48} color="#10B981" />
              <Text style={styles.successText}>¡QR VALIDADO!</Text>
            </View>
          ) : (
            <View style={styles.laserBox}>
              <View style={[styles.laserLine, { backgroundColor: config.color }]} />
              <AppIcon name="qr-code" size={64} color="rgba(255, 255, 255, 0.35)" />
            </View>
          )}
        </View>

        <Text style={styles.scanInstruction}>
          Apunta la cámara al código QR ubicado en la vitrina o mostrador de la tienda.
        </Text>
      </View>

      {/* Micro-Deal Product Card ($1 - $5) */}
      <View style={styles.dealCard}>
        <View style={styles.dealBadgeRow}>
          <View style={[styles.dealPill, { backgroundColor: config.color }]}>
            <Text style={styles.dealPillText}>{riddle.featuredProduct.discountBadge}</Text>
          </View>
          <Text style={styles.dealPriceText}>
            {riddle.featuredProduct.price}
            {riddle.featuredProduct.originalPrice && (
              <Text style={styles.dealOriginalPrice}> {riddle.featuredProduct.originalPrice}</Text>
            )}
          </Text>
        </View>
        <Text style={styles.dealName}>{riddle.featuredProduct.name}</Text>
        <Text style={styles.dealDesc}>{riddle.featuredProduct.description}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.simulateBtn, { backgroundColor: config.accentColor }]}
          onPress={handleSimulateScan}
          activeOpacity={0.88}
        >
          <AppIcon name="qr-code" size={18} color="#FFFFFF" />
          <Text style={styles.simulateBtnText}>Validar QR en Tienda 📸</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerPillText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  storeTargetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 12,
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  storeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeFloorText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },
  storeNameText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  routeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  routeBtnText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
  },
  scannerViewport: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetBox: {
    width: 220,
    height: 220,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  targetBoxSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  laserBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  laserLine: {
    width: 180,
    height: 2,
    borderRadius: 1,
    marginBottom: 12,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  successBadge: {
    alignItems: 'center',
    gap: 6,
  },
  successText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  scanInstruction: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 16,
  },
  dealCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  dealBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dealPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dealPillText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  dealPriceText: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '900',
  },
  dealOriginalPrice: {
    color: '#64748B',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  dealName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginVertical: 2,
  },
  dealDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 14,
  },
  actionsRow: {
    gap: 8,
  },
  simulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 14,
    gap: 8,
    elevation: 3,
  },
  simulateBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
