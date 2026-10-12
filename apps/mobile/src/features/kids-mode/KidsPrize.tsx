import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { AppIcon } from '../../components/AppIcon';
import {
  type AgeGroup,
  AGE_GROUP_CONFIG,
} from './kids-data';
import { useKidsMode } from './useKidsMode';

interface KidsPrizeProps {
  onNavigateToMap: (storeId: string) => void;
  onRestart: () => void;
  onClose: () => void;
}

export const KidsPrize: React.FC<KidsPrizeProps> = ({
  onNavigateToMap,
  onRestart,
  onClose,
}) => {
  const { ageGroup, playerName, prize, prizeCode, claimed, claimPrize } = useKidsMode();
  const [copied, setCopied] = useState<boolean>(false);

  if (!ageGroup || !prize) return null;
  const config = AGE_GROUP_CONFIG[ageGroup];

  const handleCopyCode = async () => {
    if (prizeCode) {
      await Clipboard.setStringAsync(prizeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleClaimAndRoute = () => {
    claimPrize();
    onNavigateToMap(prize.sponsorStoreId);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.trophyPill}>
          <Text style={styles.trophyPillText}>🏆 5/5 COMPLETADO</Text>
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
          <AppIcon name="close" size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Main Prize Header */}
      <View style={styles.centerHero}>
        <View style={styles.trophyCircle}>
          <Text style={{ fontSize: 44 }}>🏆</Text>
        </View>
        <Text style={styles.heroTitle}>¡Felicitaciones, {playerName}!</Text>
        <Text style={styles.heroSub}>{prize.title}</Text>
      </View>

      {/* Digital Voucher Card */}
      <View style={[styles.voucherCard, { borderColor: config.color }]}>
        <View style={[styles.voucherTopHeader, { backgroundColor: config.accentColor }]}>
          <Text style={styles.voucherTopBadge}>CUPÓN DIGITAL VÁLIDO EN TIENDA</Text>
        </View>

        <View style={styles.voucherBody}>
          <Text style={styles.sponsorName}>{prize.sponsor}</Text>
          <Text style={styles.prizeHeadline}>{prize.headline}</Text>
          <Text style={styles.prizeDesc}>{prize.description}</Text>

          {/* Perks List */}
          <View style={styles.perksList}>
            {prize.perks.map((perk, i) => (
              <View key={i} style={styles.perkRow}>
                <AppIcon name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.perkText}>{perk}</Text>
              </View>
            ))}
          </View>

          {/* QR & Code Box */}
          <View style={styles.codeBox}>
            <View style={styles.qrPlaceholder}>
              <AppIcon name="qr-code" size={48} color="#0F172A" />
            </View>
            <View style={styles.codeCol}>
              <Text style={styles.codeLabel}>CÓDIGO DE CANJE:</Text>
              <Text style={styles.codeValue}>{prizeCode || 'QUIZ-SAMBIL-DEMO'}</Text>
              <TouchableOpacity
                style={[styles.copyBtn, copied && styles.copyBtnDone]}
                onPress={handleCopyCode}
                activeOpacity={0.8}
              >
                <AppIcon name={copied ? 'checkmark' : 'copy'} size={14} color={copied ? '#16A34A' : '#475569'} />
                <Text style={[styles.copyBtnText, copied && { color: '#16A34A' }]}>
                  {copied ? '¡Copiado!' : 'Copiar Código'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.validityNotice}>
            Válido por {prize.validDays} días a partir de hoy en el Mall Demo.
          </Text>
        </View>
      </View>

      {/* Primary Action: Route to Store */}
      <TouchableOpacity
        style={[styles.routeBtn, { backgroundColor: config.accentColor }]}
        onPress={handleClaimAndRoute}
        activeOpacity={0.88}
      >
        <AppIcon name="navigate" size={20} color="#FFFFFF" />
        <Text style={styles.routeBtnText}>Trazar Ruta para Reclamar en {prize.sponsor}</Text>
      </TouchableOpacity>

      {/* Restart / Play Another Level */}
      <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.8}>
        <Text style={styles.restartBtnText}>Jugar otra categoría o reiniciar 🔄</Text>
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  trophyPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  trophyPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  centerHero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  heroSub: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  voucherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  voucherTopHeader: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  voucherTopBadge: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  voucherBody: {
    padding: 16,
  },
  sponsorName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  prizeHeadline: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 6,
  },
  prizeDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
    marginBottom: 12,
  },
  perksList: {
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  qrPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  codeCol: {
    flex: 1,
  },
  codeLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  codeValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1,
    marginVertical: 2,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  copyBtnDone: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  validityNotice: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  routeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 16,
    gap: 8,
    marginBottom: 12,
    elevation: 3,
  },
  routeBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  restartBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  restartBtnText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
});
