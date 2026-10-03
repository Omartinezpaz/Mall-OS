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
    <View style={styles.container}>
      {/* Non-Official Illustrative Disclaimer Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.disclaimerText}>
          📐 Plano esquemático ilustrativo · No oficial (Sambil Chacao Prototipo Demo)
        </Text>
      </View>

      <View style={styles.headerBar}>
        {/* Selector de Nivel (L1, L2, L3) */}
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
                  {lvl.label}
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

        {/* Modo Cámara: Libre vs Seguimiento */}
        <TouchableOpacity
          style={[styles.cameraModeBtn, followUser && styles.cameraModeBtnActive]}
          activeOpacity={0.8}
          onPress={onToggleFollowUser}
        >
          <Text style={styles.cameraModeIcon}>{followUser ? '🎥' : '🧭'}</Text>
          <Text style={[styles.cameraModeText, followUser && styles.cameraModeTextActive]}>
            {followUser ? 'Seguir' : 'Libre'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selector Deslizable de Horas Simuladas */}
      {isSimulatingTime && (
        <View style={styles.timeBarContainer}>
          <Text style={styles.timeBarLabel}>Horario simulado:</Text>
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
              <Text style={styles.timeSlotNowText}>Hora Real</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    zIndex: 20,
  },
  disclaimerBanner: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingTop: 44,
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimerText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
  },
  levelSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    padding: 3,
    gap: 2,
  },
  levelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelBtnActive: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  levelBtnText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  levelBtnTextActive: {
    color: '#FFFFFF',
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  timeChipActive: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  timeChipIcon: {
    fontSize: 13,
  },
  timeChipText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
  openPill: {
    backgroundColor: '#DCFCE7',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  openPillText: {
    color: '#166534',
    fontSize: 10,
    fontWeight: '800',
  },
  cameraModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  cameraModeBtnActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  cameraModeIcon: {
    fontSize: 13,
  },
  cameraModeText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
  },
  cameraModeTextActive: {
    color: '#4F46E5',
  },
  timeBarContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeBarLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  timeSlotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  timeSlotBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  timeSlotBtnActive: {
    backgroundColor: '#4F46E5',
  },
  timeSlotText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  timeSlotTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  timeSlotNowBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  timeSlotNowText: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '700',
  },
});
