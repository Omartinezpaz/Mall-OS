import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { formatTimeHours } from './IsometricMap';

export interface LevelItem {
  id: string;
  label: string;
  name: string;
}

interface MapHeaderProps {
  levels: LevelItem[];
  selectedLevel: string;
  onSelectLevel: (levelId: string) => void;
  currentHour: number;
  openCount: number;
  totalStores: number;
  isSimulatingTime: boolean;
  onToggleTimeSimulation: () => void;
  onSelectHour: (hour: number) => void;
  onResetRealTime: () => void;
  followUser: boolean;
  onToggleFollowUser: () => void;
}

export function MapHeader({
  levels,
  selectedLevel,
  onSelectLevel,
  currentHour,
  openCount,
  totalStores,
  isSimulatingTime,
  onToggleTimeSimulation,
  onSelectHour,
  onResetRealTime,
  followUser,
  onToggleFollowUser,
}: MapHeaderProps) {
  return (
    <View style={styles.floatingContainer}>
      {/* Non-Official Illustrative Disclaimer Banner */}
      <View style={styles.disclaimerPill}>
        <Text style={styles.disclaimerText}>
          📐 Mall Demo · Plano esquemático ilustrativo
        </Text>
      </View>

      <View style={styles.headerBar}>
        {/* Selector de Nivel (L1, L2, L3, L4) */}
        <View style={styles.levelSelector}>
          {levels.map((lvl) => {
            const isActive = selectedLevel === lvl.id;
            return (
              <TouchableOpacity
                key={lvl.id}
                style={[styles.levelBtn, isActive && styles.levelBtnActive]}
                onPress={() => onSelectLevel(lvl.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.levelBtnText, isActive && styles.levelBtnTextActive]}>
                  {lvl.label.split(' · ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Chip de Tiempo / Horario */}
        <TouchableOpacity
          style={[styles.timeChip, isSimulatingTime && styles.timeChipActive]}
          onPress={onToggleTimeSimulation}
          activeOpacity={0.8}
        >
          <Text style={styles.timeChipIcon}>⏰</Text>
          <Text style={styles.timeChipText}>{formatTimeHours(currentHour)}</Text>
          <View style={styles.openPill}>
            <Text style={styles.openPillText}>{openCount}/{totalStores}</Text>
          </View>
        </TouchableOpacity>

        {/* Modo Cámara: Libre vs Seguir */}
        <TouchableOpacity
          style={[styles.cameraModeBtn, followUser && styles.cameraModeBtnActive]}
          activeOpacity={0.8}
          onPress={onToggleFollowUser}
        >
          <Text style={styles.cameraModeIcon}>{followUser ? '🎥' : '🧭'}</Text>
        </TouchableOpacity>
      </View>

      {/* Selector Deslizable de Horas Simuladas */}
      {isSimulatingTime && (
        <View style={styles.timeBarContainer}>
          <Text style={styles.timeBarLabel}>Horario:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.timeSlotsRow}>
            {[8, 10, 12, 14, 16, 18, 20, 22].map((hour) => (
              <TouchableOpacity
                key={hour}
                style={[
                  styles.timeSlotBtn,
                  Math.abs(currentHour - hour) < 0.5 && styles.timeSlotBtnActive,
                ]}
                onPress={() => onSelectHour(hour)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    Math.abs(currentHour - hour) < 0.5 && styles.timeSlotTextActive,
                  ]}
                >
                  {formatTimeHours(hour)}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.timeSlotNowBtn} onPress={onResetRealTime}>
              <Text style={styles.timeSlotNowText}>Real</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top: 42,
    left: 12,
    right: 12,
    zIndex: 30,
    gap: 6,
  },
  disclaimerPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  disclaimerText: {
    color: '#CBD5E1',
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    gap: 6,
  },
  levelSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 2,
    gap: 2,
  },
  levelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  levelBtnActive: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  levelBtnText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
  },
  levelBtnTextActive: {
    color: '#FFFFFF',
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  timeChipActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  timeChipIcon: {
    fontSize: 11,
  },
  timeChipText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '700',
  },
  openPill: {
    backgroundColor: '#DCFCE7',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  openPillText: {
    color: '#166534',
    fontSize: 9,
    fontWeight: '800',
  },
  cameraModeBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cameraModeBtnActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  cameraModeIcon: {
    fontSize: 14,
  },
  timeBarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  timeBarLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  timeSlotsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  timeSlotBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  timeSlotBtnActive: {
    backgroundColor: '#4F46E5',
  },
  timeSlotText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
  timeSlotTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  timeSlotNowBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  timeSlotNowText: {
    fontSize: 10,
    color: '#4F46E5',
    fontWeight: '800',
  },
});
