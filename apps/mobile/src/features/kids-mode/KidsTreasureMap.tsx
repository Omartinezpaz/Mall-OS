import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import { audioManager } from '../../lib/audio-manager';
import {
  type AgeGroup,
  type KidsRiddle,
  AGE_GROUP_CONFIG,
} from './kids-data';
import { useKidsMode } from './useKidsMode';
import { KIDS_IMAGES, getStationIllustration } from './kids-images';

interface KidsTreasureMapProps {
  onOpenRiddle: (index: number) => void;
  onOpenQRScanner: (index: number) => void;
  onOpenPrize: () => void;
  onReset: () => void;
  onNavigateToStore: (storeId: string) => void;
}

export const KidsTreasureMap: React.FC<KidsTreasureMapProps> = ({
  onOpenRiddle,
  onOpenQRScanner,
  onOpenPrize,
  onReset,
  onNavigateToStore,
}) => {
  const {
    ageGroup,
    playerName,
    avatar,
    isFamilyMode,
    currentRiddleIndex,
    completedRiddleIds,
    unlockedQRStoreIds,
    stars,
    prizeUnlocked,
    riddles,
    prize,
  } = useKidsMode();

  const [isNarratorSpeaking, setIsNarratorSpeaking] = useState<boolean>(false);
  const [speakingStationId, setSpeakingStationId] = useState<string | null>(null);

  const handleConfirmReset = () => {
    Alert.alert(
      'Reiniciar juego',
      '¿Deseas reiniciar tu aventura del mapa del tesoro y empezar de nuevo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, reiniciar',
          style: 'destructive',
          onPress: () => {
            audioManager.stop(true);
            onReset();
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((speaking) => {
      if (!speaking) {
        setIsNarratorSpeaking(false);
        setSpeakingStationId(null);
      }
    });
    return () => {
      unsubscribe();
      audioManager.stop();
    };
  }, []);

  const handleToggleNarrator = () => {
    if (isNarratorSpeaking) {
      audioManager.stop(true);
      setIsNarratorSpeaking(false);
      setSpeakingStationId(null);
      return;
    }

    const currentRiddle = riddles[currentRiddleIndex];
    const narrationText = stars === 5
      ? `¡Felicidades ${playerName}! Has completado todas las estaciones y desbloqueaste el gran premio del tesoro. ¡Toca el botón dorado de premio para ver tu cupón de regalo!`
      : `¡Hola ${playerName}! Bienvenido al Mapa del Tesoro. Tu siguiente misión es la estación número ${currentRiddleIndex + 1}, ${currentRiddle?.storeName || 'la tienda'}. Toca "Ver en Mapa" para comenzar a caminar, luego escanea el código QR del producto físico en la vitrina para desbloquear tu estrella.`;

    setIsNarratorSpeaking(true);
    setSpeakingStationId(null);

    audioManager.speak({
      text: narrationText,
      priority: 'high',
      language: 'es-VE',
      pitch: 1.05,
      rate: 0.95,
      onDone: () => setIsNarratorSpeaking(false),
      onError: () => setIsNarratorSpeaking(false),
    });
  };

  const handleSpeakStation = (riddle: KidsRiddle, idx: number) => {
    if (speakingStationId === riddle.id) {
      audioManager.stop(true);
      setSpeakingStationId(null);
      return;
    }

    const isCompleted = completedRiddleIds.includes(riddle.id);
    const stationSpeech = isCompleted
      ? `Estación número ${idx + 1}: ${riddle.storeName} en ${riddle.floorName}. ¡Misión completada y estrella ganada!`
      : `Estación número ${idx + 1}: ${riddle.storeName} en ${riddle.floorName}. Tu objetivo es buscar ${riddle.featuredProduct.name} y escanear su código QR para responder el acertijo.`;

    setSpeakingStationId(riddle.id);
    setIsNarratorSpeaking(false);

    audioManager.speak({
      text: stationSpeech,
      priority: 'high',
      language: 'es-VE',
      pitch: 1.05,
      rate: 0.95,
      onDone: () => setSpeakingStationId(null),
      onError: () => setSpeakingStationId(null),
    });
  };

  if (!ageGroup || !prize) return null;

  const config = AGE_GROUP_CONFIG[ageGroup];
  const activeProductRiddle = riddles[currentRiddleIndex] || riddles[0];
  const productBgImage = activeProductRiddle?.featuredProduct?.imageUrl;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Visual Treasure Map Header Banner */}
      <View style={styles.treasureHeaderBanner}>
        <Image
          source={KIDS_IMAGES.paginaMpt}
          style={styles.treasureHeaderBannerImg}
          resizeMode="cover"
        />
        <View style={styles.treasureHeaderBannerOverlay} />
        <View style={styles.treasureHeaderBannerContent}>
          <View style={styles.treasureHeaderBadge}>
            <AppIcon name="compass" size={11} color="#FBBF24" />
            <Text style={styles.treasureHeaderBadgeText}>MAPA OFICIAL DEL TESORO</Text>
          </View>
          <Text style={styles.treasureHeaderTitle}>Aventura de Estaciones Sambil</Text>
          <Text style={styles.treasureHeaderSub}>Encuentra las 5 pistas en los niveles y canjea tu premio</Text>
        </View>
      </View>

      {/* Top Profile Card */}
      <View style={[styles.profileCard, { borderColor: '#E2E8F0' }]}>
        <View style={styles.profileRow}>
          <View style={[styles.avatarBadge, { backgroundColor: config.color }]}>
            <Text style={styles.avatarText}>{avatar}</Text>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.badgeRow}>
              <View style={[styles.levelBadge, { backgroundColor: config.color }]}>
                <Text style={styles.levelBadgeText}>{config.badge}</Text>
              </View>
              {isFamilyMode && (
                <View style={styles.familyBadge}>
                  <Text style={styles.familyBadgeText}>👨‍👩‍👧 EN FAMILIA</Text>
                </View>
              )}
            </View>
            <Text style={styles.playerNameText}>{playerName}</Text>
            <Text style={styles.levelTitleText}>{config.title}</Text>
          </View>

          <TouchableOpacity
            style={styles.restartPillBtn}
            onPress={handleConfirmReset}
            activeOpacity={0.7}
          >
            <AppIcon name="refresh" size={13} color="#DC2626" />
            <Text style={styles.restartPillText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>

        {/* Audio Guide Narrator Button */}
        <TouchableOpacity
          style={[
            styles.audioGuideBar,
            { borderColor: config.color },
            isNarratorSpeaking && styles.audioGuideBarActive,
          ]}
          onPress={handleToggleNarrator}
          activeOpacity={0.8}
        >
          <View style={[styles.audioIconCircle, { backgroundColor: isNarratorSpeaking ? '#2563EB' : config.accentColor }]}>
            <AppIcon name={isNarratorSpeaking ? 'volume-high' : 'volume-medium'} size={15} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.audioGuideTitle, isNarratorSpeaking && { color: '#2563EB' }]}>
              {isNarratorSpeaking ? '🔊 Escuchando Guía de Voz...' : '🔊 Escuchar Guía del Tesoro'}
            </Text>
            <Text style={styles.audioGuideSub}>
              {isNarratorSpeaking ? 'Toca para pausar el audio' : 'Toca para escuchar las instrucciones en voz alta'}
            </Text>
          </View>
          <View style={[styles.audioPlayBadge, isNarratorSpeaking && { backgroundColor: '#DBEAFE' }]}>
            <Text style={[styles.audioPlayBadgeText, isNarratorSpeaking && { color: '#1D4ED8' }]}>
              {isNarratorSpeaking ? 'PAUSAR' : 'REPRODUCIR'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 5 Stars Progress Bar inside Beveled Card with Shadow and Product Image */}
        <View style={styles.progressSection}>
          {productBgImage ? (
            <>
              <Image
                source={{ uri: productBgImage }}
                style={styles.progressBgImage}
                resizeMode="cover"
              />
              <View style={styles.progressOverlay} />
            </>
          ) : null}

          {/* Top Bevel Highlight */}
          <View style={styles.bevelHighlight} />

          <View style={styles.progressInnerContent}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((starNum) => {
                const isEarned = starNum <= stars;
                return (
                  <View key={starNum} style={styles.starCol}>
                    <Text style={[styles.starIcon, isEarned ? styles.starEarned : styles.starEmpty]}>
                      {isEarned ? '⭐' : '☆'}
                    </Text>
                    <Text style={[styles.starLabel, isEarned && { color: config.accentColor, fontWeight: '800' }]}>
                      #{starNum}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${(stars / 5) * 100}%`, backgroundColor: config.accentColor },
                ]}
              />
            </View>

            <View style={styles.progressFooterRow}>
              <Text style={styles.progressSummary}>
                {stars === 5 ? '¡Todos los acertijos resueltos! 🏆' : `${stars} de 5 tiendas visitadas`}
              </Text>
              {activeProductRiddle?.featuredProduct && stars < 5 && (
                <View style={[styles.targetProductBadge, { borderColor: config.color }]}>
                  <Text style={[styles.targetProductBadgeText, { color: config.accentColor }]} numberOfLines={1}>
                    🎯 {activeProductRiddle.featuredProduct.name}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Prize Banner if Unlocked */}
      {prizeUnlocked && (
        <TouchableOpacity
          style={styles.unlockedPrizeCard}
          onPress={onOpenPrize}
          activeOpacity={0.88}
        >
          <View style={styles.trophyIconBox}>
            <Text style={{ fontSize: 28 }}>🏆</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.unlockedPrizeBadge}>¡PREMIO DESBLOQUEADO!</Text>
            <Text style={styles.unlockedPrizeTitle}>{prize.headline}</Text>
            <Text style={styles.unlockedPrizeSub}>Toca aquí para ver tu código de canje en {prize.sponsor}</Text>
          </View>
          <AppIcon name="chevron-forward" size={20} color="#B45309" />
        </TouchableOpacity>
      )}

      {/* Instructions Pill */}
      <View style={styles.flowExplainer}>
        <Text style={styles.flowExplainerText}>
          📍 1. Ve al local con el mapa ➔ 📷 2. Escanea el QR del producto ➔ 🧩 3. Responde y gana ⭐
        </Text>
      </View>

      {/* Stations Trail Header */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeader}>Ruta de Visitas en Tiendas</Text>
        <View style={styles.objectivesCountPill}>
          <Text style={styles.objectivesCountText}>
            🎯 {stars}/5 Objetivos Alcanzados
          </Text>
        </View>
      </View>

      {/* 5 Stations List */}
      <View style={styles.stationsList}>
        {riddles.map((riddle, idx) => {
          const isCompleted = completedRiddleIds.includes(riddle.id);
          const isQRUnlocked = unlockedQRStoreIds.includes(riddle.storeId);
          const isCurrent = idx === currentRiddleIndex && !prizeUnlocked;
          const isLocked = idx > currentRiddleIndex && !isCompleted;

          return (
            <View
              key={riddle.id}
              style={[
                styles.stationCard,
                isCurrent && { borderColor: config.color, borderWidth: 1.8, backgroundColor: '#FFFFFF' },
                isCompleted && styles.stationCardCompleted,
                isLocked && styles.stationCardLocked,
              ]}
            >
              {/* Glass Header with Store Background Image */}
              <View style={[styles.stationHeaderGlass, isLocked && { borderBottomWidth: 0 }]}>
                <Image
                  source={getStationIllustration(ageGroup, idx)}
                  style={styles.stationHeaderImage}
                  resizeMode="cover"
                />

                {/* Glass Frosted Overlay */}
                <View
                  style={[
                    styles.stationGlassOverlay,
                    isCompleted && styles.stationGlassOverlayCompleted,
                    isCurrent && styles.stationGlassOverlayCurrent,
                    isLocked && styles.stationGlassOverlayLocked,
                  ]}
                />

                {/* Top Bevel Highlight */}
                <View style={styles.stationGlassBevel} />

                {/* Header Content Row */}
                <View style={styles.stationMainRow}>
                  {/* Station Number / Status Icon */}
                  <View
                    style={[
                      styles.stationNumBox,
                      isCompleted && { backgroundColor: '#10B981' },
                      isCurrent && { backgroundColor: config.color },
                      isLocked && { backgroundColor: 'rgba(255, 255, 255, 0.85)', borderWidth: 1, borderColor: '#CBD5E1' },
                    ]}
                  >
                    {isCompleted ? (
                      <AppIcon name="checkmark" size={18} color="#FFFFFF" />
                    ) : isCurrent ? (
                      <Text style={styles.stationNumText}>{idx + 1}</Text>
                    ) : (
                      <AppIcon name="lock-closed" size={15} color="#64748B" />
                    )}
                  </View>

                  {/* Station Info */}
                  <View style={styles.stationInfo}>
                    <View style={styles.stationMetaRow}>
                      <Text style={[styles.stationFloorText, isLocked && styles.stationFloorTextLocked]}>
                        {riddle.floorName}
                      </Text>
                      <Text style={[styles.stationBadgeText, isLocked && styles.stationBadgeTextLocked]}>
                        • {riddle.badge}
                      </Text>
                    </View>
                    <Text style={[styles.stationStoreName, isLocked && styles.stationStoreNameLocked]} numberOfLines={1}>
                      {riddle.storeName}
                    </Text>
                  </View>

                  {/* Status Pill & Audio Speaker Button */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {!isLocked && (
                      <TouchableOpacity
                        style={[
                          styles.stationSpeakerBtn,
                          speakingStationId === riddle.id && styles.stationSpeakerBtnActive,
                        ]}
                        onPress={() => handleSpeakStation(riddle, idx)}
                        activeOpacity={0.7}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <AppIcon
                          name={speakingStationId === riddle.id ? 'volume-high' : 'volume-medium'}
                          size={15}
                          color={speakingStationId === riddle.id ? '#2563EB' : '#475569'}
                        />
                      </TouchableOpacity>
                    )}

                    {isCompleted ? (
                      <View style={styles.completedPill}>
                        <Text style={styles.completedPillText}>⭐ Conquistado</Text>
                      </View>
                    ) : isCurrent ? (
                      <View style={[styles.activeStatusPill, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: config.color }]}>
                        <Text style={[styles.activeStatusPillText, { color: config.accentColor }]}>En curso</Text>
                      </View>
                    ) : (
                      <View style={styles.lockedStatusPill}>
                        <Text style={styles.lockedStatusPillText}>Por conseguir</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Card Body for Active and Completed Stations */}
              {(!isLocked || isCompleted) && (
                <View style={styles.stationCardBody}>
                  {/* Objetivos Alcanzados / Checklist de la Estación */}
                  <View style={styles.objectivesBlock}>
                    <Text style={styles.objectivesHeaderTitle}>
                      {isCompleted ? '✓ OBJETIVOS ALCANZADOS' : 'OBJETIVOS DE LA ESTACIÓN'}
                    </Text>
                    
                    <View style={styles.objectiveRow}>
                      <View style={[styles.objectiveDot, (isQRUnlocked || isCompleted) ? styles.objectiveDotDone : styles.objectiveDotPending]}>
                        <AppIcon name={(isQRUnlocked || isCompleted) ? 'checkmark' : 'walk'} size={10} color={(isQRUnlocked || isCompleted) ? '#FFFFFF' : '#94A3B8'} />
                      </View>
                      <Text style={[styles.objectiveText, (isQRUnlocked || isCompleted) && styles.objectiveTextDone]}>
                        1. Llegar a {riddle.storeName} ({riddle.floorName})
                      </Text>
                    </View>

                    <View style={styles.objectiveRow}>
                      <View style={[styles.objectiveDot, (isQRUnlocked || isCompleted) ? styles.objectiveDotDone : styles.objectiveDotPending]}>
                        <AppIcon name={(isQRUnlocked || isCompleted) ? 'checkmark' : 'qr-code'} size={10} color={(isQRUnlocked || isCompleted) ? '#FFFFFF' : '#94A3B8'} />
                      </View>
                      <Text style={[styles.objectiveText, (isQRUnlocked || isCompleted) && styles.objectiveTextDone]}>
                        2. Escanear QR en vitrina ({riddle.featuredProduct.name})
                      </Text>
                    </View>

                    <View style={styles.objectiveRow}>
                      <View style={[styles.objectiveDot, isCompleted ? styles.objectiveDotDone : styles.objectiveDotPending]}>
                        <AppIcon name={isCompleted ? 'checkmark' : 'bulb'} size={10} color={isCompleted ? '#FFFFFF' : '#94A3B8'} />
                      </View>
                      <Text style={[styles.objectiveText, isCompleted && styles.objectiveTextDone]}>
                        3. Resolver acertijo: {riddle.badge} (+1 ⭐)
                      </Text>
                    </View>
                  </View>

                  {/* Micro-Deal In-Store Badge ($1 - $5 product) */}
                  <View style={styles.dealRow}>
                    <View style={[styles.dealPill, { backgroundColor: config.bgTint, borderColor: config.color }]}>
                      <Text style={[styles.dealPillTag, { color: config.accentColor }]}>
                        🏷️ {riddle.featuredProduct.discountBadge}
                      </Text>
                      <Text style={styles.dealPillTitle}>
                        {riddle.featuredProduct.name} ({riddle.featuredProduct.price})
                      </Text>
                    </View>
                  </View>

                  {/* Action Buttons for Current Active Station */}
                  {isCurrent && (
                    <View style={styles.stationActionRow}>
                      <TouchableOpacity
                        style={styles.mapActionBtn}
                        onPress={() => onNavigateToStore(riddle.storeId)}
                        activeOpacity={0.8}
                      >
                        <AppIcon name="navigate" size={14} color="#0284C7" />
                        <Text style={styles.mapActionBtnText}>Ver en Mapa</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.qrActionBtn,
                          { backgroundColor: config.accentColor },
                        ]}
                        onPress={() => {
                          if (isQRUnlocked) {
                            onOpenRiddle(idx);
                          } else {
                            onOpenQRScanner(idx);
                          }
                        }}
                        activeOpacity={0.88}
                      >
                        <AppIcon name={isQRUnlocked ? "help-circle" : "qr-code"} size={14} color="#FFFFFF" />
                        <Text style={styles.qrActionBtnText}>
                          {isQRUnlocked ? 'Responder Acertijo 🧩' : 'Escanear QR en Tienda 📸'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Botón explícito para reiniciar el juego */}
      <View style={styles.footerRestartContainer}>
        <TouchableOpacity
          style={styles.footerRestartBtn}
          onPress={handleConfirmReset}
          activeOpacity={0.8}
        >
          <AppIcon name="refresh" size={16} color="#DC2626" />
          <Text style={styles.footerRestartText}>Reiniciar juego y empezar de nuevo</Text>
        </TouchableOpacity>
        <Text style={styles.footerRestartHint}>
          Tu progreso se guarda automáticamente durante 12 horas. Puedes reiniciar el juego en cualquier momento.
        </Text>
      </View>

      <View style={{ height: 40 }} />
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
    paddingTop: 12,
  },
  treasureHeaderBanner: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 115,
    justifyContent: 'flex-end',
  },
  treasureHeaderBannerImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  treasureHeaderBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
  },
  treasureHeaderBannerContent: {
    padding: 16,
    gap: 4,
  },
  treasureHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
    gap: 5,
    alignSelf: 'flex-start',
  },
  treasureHeaderBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#FBBF24',
    letterSpacing: 0.6,
  },
  treasureHeaderTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 6,
  },
  treasureHeaderSub: {
    fontSize: 11.5,
    color: '#FFFFFF',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatarBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
  },
  profileInfo: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  familyBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  familyBadgeText: {
    color: '#059669',
    fontSize: 9,
    fontWeight: '800',
  },
  playerNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  levelTitleText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  restartPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  restartPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#DC2626',
  },
  footerRestartContainer: {
    marginTop: 20,
    marginBottom: 8,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  footerRestartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    width: '100%',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  footerRestartText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
  footerRestartHint: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  progressSection: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#CBD5E1',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  progressBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  progressOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.48)',
  },
  bevelHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  progressInnerContent: {
    padding: 14,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  starCol: {
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  starEarned: {
    opacity: 1,
  },
  starEmpty: {
    color: '#94A3B8',
    opacity: 0.55,
  },
  starLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  barTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(241, 245, 249, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  progressSummary: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#1E293B',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  targetProductBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    maxWidth: '55%',
  },
  targetProductBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  unlockedPrizeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  trophyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockedPrizeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  unlockedPrizeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#78350F',
    marginVertical: 2,
  },
  unlockedPrizeSub: {
    fontSize: 11,
    color: '#92400E',
  },
  flowExplainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  flowExplainerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  objectivesCountPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  objectivesCountText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '800',
  },
  stationsList: {
    gap: 14,
  },
  stationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },
  stationCardCompleted: {
    backgroundColor: '#FFFFFF',
    borderColor: '#86EFAC',
  },
  stationCardLocked: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    opacity: 0.9,
  },
  stationHeaderGlass: {
    position: 'relative',
    height: 94,
    paddingHorizontal: 14,
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.75)',
  },
  stationHeaderImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  stationGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
  },
  stationGlassOverlayCurrent: {
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
  },
  stationGlassOverlayCompleted: {
    backgroundColor: 'rgba(236, 253, 245, 0.38)',
  },
  stationGlassOverlayLocked: {
    backgroundColor: 'rgba(248, 250, 252, 0.38)',
  },
  stationGlassBevel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  stationMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stationCardBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 8,
  },
  stationNumBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  stationNumText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  stationInfo: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  stationMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stationFloorText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#475569',
  },
  stationFloorTextLocked: {
    color: '#64748B',
  },
  stationBadgeText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  stationBadgeTextLocked: {
    color: '#94A3B8',
  },
  stationStoreName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 1,
  },
  stationStoreNameLocked: {
    color: '#334155',
  },
  completedPill: {
    backgroundColor: 'rgba(220, 252, 231, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  completedPillText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '800',
  },
  activeStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  activeStatusPillText: {
    fontSize: 11,
    fontWeight: '800',
  },
  lockedStatusPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  lockedStatusPillText: {
    color: '#64748B',
    fontSize: 10.5,
    fontWeight: '700',
  },
  objectivesBlock: {
    marginTop: 2,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 6,
  },
  objectivesHeaderTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#64748B',
    marginBottom: 2,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  objectiveDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectiveDotDone: {
    backgroundColor: '#10B981',
  },
  objectiveDotPending: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  objectiveText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    flex: 1,
  },
  objectiveTextDone: {
    color: '#0F172A',
    fontWeight: '700',
  },
  dealRow: {
    marginTop: 10,
  },
  dealPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
  },
  dealPillTag: {
    fontSize: 10,
    fontWeight: '800',
  },
  dealPillTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  stationActionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  mapActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    gap: 5,
  },
  mapActionBtnText: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '800',
  },
  qrActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    gap: 6,
    elevation: 2,
  },
  qrActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  audioGuideBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  audioGuideBarActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  audioIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioGuideTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  audioGuideSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 1,
  },
  audioPlayBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  audioPlayBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },
  stationSpeakerBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stationSpeakerBtnActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#93C5FD',
  },
});
