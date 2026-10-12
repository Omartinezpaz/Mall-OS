import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import {
  type AgeGroup,
  AGE_GROUP_CONFIG,
} from './kids-data';
import { KIDS_IMAGES } from './kids-images';

interface KidsOnboardingProps {
  onStart: (ageGroup: AgeGroup, name: string, avatar: string, isFamilyMode: boolean) => void;
  onClose?: () => void;
}

const AVATARS = ['🦁', '🚀', '🦄', '⚡', '🎮', '👑', '⚽', '🌟', '🐊', '🐯'];

export const KidsOnboarding: React.FC<KidsOnboardingProps> = ({ onStart, onClose }) => {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('child');
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🦁');
  const [isFamilyMode, setIsFamilyMode] = useState<boolean>(false);

  const activeConfig = AGE_GROUP_CONFIG[selectedAge];

  const handleStart = () => {
    const finalName = playerName.trim() || (selectedAge === 'child' ? 'Pequeño Explorador' : selectedAge === 'teen' ? 'Agente Secreto' : 'Gamer Urbano');
    onStart(selectedAge, finalName, selectedAvatar, isFamilyMode);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Top Bar Header */}
      <View style={styles.headerRow}>
        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>🎮 MODO EXPLORADORES</Text>
        </View>
        {onClose && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
            <AppIcon name="close" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Hero Intro with Treasure Map Graphic Banner */}
      <View style={styles.heroBannerCard}>
        <Image
          source={KIDS_IMAGES.paginaMpt}
          style={styles.heroBgImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Búsqueda del Tesoro</Text>
          <Text style={styles.heroSubtitle}>
            Recorre el mall, resuelve 5 acertijos interactivos y gana premios reales al instante.
          </Text>
        </View>
      </View>

      {/* Selector de Rango de Edad */}
      <Text style={styles.sectionLabel}>1. Elige tu categoría de juego</Text>
      <View style={styles.ageSelectorContainer}>
        {(Object.keys(AGE_GROUP_CONFIG) as AgeGroup[]).map((groupKey) => {
          const cfg = AGE_GROUP_CONFIG[groupKey];
          const isSelected = selectedAge === groupKey;
          return (
            <TouchableOpacity
              key={groupKey}
              style={[
                styles.ageCard,
                isSelected && { borderColor: cfg.color, backgroundColor: cfg.bgTint },
              ]}
              onPress={() => setSelectedAge(groupKey)}
              activeOpacity={0.85}
            >
              <View style={[styles.ageEmojiBox, { backgroundColor: isSelected ? cfg.color : '#F1F5F9' }]}>
                <Text style={styles.ageEmojiText}>{cfg.emoji}</Text>
              </View>
              <View style={styles.ageCardContent}>
                <View style={styles.ageBadgeRow}>
                  <Text style={[styles.ageBadgeText, { color: cfg.accentColor }]}>{cfg.badge}</Text>
                  <Text style={styles.ageDifficultyText}>{cfg.difficulty}</Text>
                </View>
                <Text style={[styles.ageCardTitle, isSelected && { color: cfg.accentColor }]}>{cfg.title}</Text>
                <Text style={styles.ageCardSubtitle}>{cfg.subtitle}</Text>
              </View>
              <View style={[styles.radioCircle, isSelected && { borderColor: cfg.color }]}>
                {isSelected && <View style={[styles.radioDot, { backgroundColor: cfg.color }]} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Avatar Picker */}
      <Text style={styles.sectionLabel}>2. Elige tu avatar</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarScroll}>
        {AVATARS.map((av) => {
          const isSelected = selectedAvatar === av;
          return (
            <TouchableOpacity
              key={av}
              style={[
                styles.avatarItem,
                isSelected && { borderColor: activeConfig.color, backgroundColor: activeConfig.bgTint, transform: [{ scale: 1.08 }] },
              ]}
              onPress={() => setSelectedAvatar(av)}
              activeOpacity={0.7}
            >
              <Text style={styles.avatarEmoji}>{av}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Nombre del Jugador */}
      <Text style={styles.sectionLabel}>3. Nombre del Explorador / Equipo</Text>
      <View style={styles.inputWrapper}>
        <AppIcon name="person" size={18} color="#94A3B8" />
        <TextInput
          style={styles.nameInput}
          placeholder={selectedAge === 'child' ? 'Ej. Mateo, Sofi...' : 'Ej. Los Titanes del Mall...'}
          placeholderTextColor="#94A3B8"
          value={playerName}
          onChangeText={setPlayerName}
          maxLength={24}
        />
      </View>

      {/* Toggle Modo Familia */}
      <TouchableOpacity
        style={[styles.familyCard, isFamilyMode && styles.familyCardActive]}
        onPress={() => setIsFamilyMode(!isFamilyMode)}
        activeOpacity={0.85}
      >
        <View style={styles.familyIconBox}>
          <Text style={styles.familyEmoji}>👨‍👩‍👧</Text>
        </View>
        <View style={styles.familyTextCol}>
          <Text style={styles.familyTitle}>Modo Familia (Jugar en Equipo)</Text>
          <Text style={styles.familySubtitle}>
            Diseñado para que padres e hijos resuelvan los acertijos juntos.
          </Text>
        </View>
        <View style={[styles.toggleSwitch, isFamilyMode && styles.toggleSwitchActive]}>
          <View style={[styles.toggleThumb, isFamilyMode && styles.toggleThumbActive]} />
        </View>
      </TouchableOpacity>

      {/* Start Button */}
      <TouchableOpacity
        style={[styles.startBtn, { backgroundColor: activeConfig.accentColor }]}
        onPress={handleStart}
        activeOpacity={0.88}
      >
        <Text style={styles.startBtnText}>¡Empezar Aventura! 🗺️</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  badgePillText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '800',
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
  heroBannerCard: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 115,
  },
  heroBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
  },
  heroContent: {
    padding: 16,
    gap: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    fontSize: 12.5,
    color: '#FFFFFF',
    lineHeight: 17,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  ageSelectorContainer: {
    gap: 12,
    marginBottom: 14,
  },
  ageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  ageEmojiBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageEmojiText: {
    fontSize: 22,
  },
  ageCardContent: {
    flex: 1,
  },
  ageBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  ageBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  ageDifficultyText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  ageCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  ageCardSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  avatarScroll: {
    marginBottom: 14,
    flexGrow: 0,
  },
  avatarItem: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  nameInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  familyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 10,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  familyCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  familyIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  familyEmoji: {
    fontSize: 20,
  },
  familyTextCol: {
    flex: 1,
  },
  familyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  familySubtitle: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 14,
    marginTop: 2,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#CBD5E1',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#10B981',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  startBtn: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
