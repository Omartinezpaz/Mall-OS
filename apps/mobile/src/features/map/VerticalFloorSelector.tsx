import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  LEVEL_AUTOPISTA,
  LEVEL_ACUARIO,
  LEVEL_LIBERTADOR,
  LEVEL_FERIA,
  LEVEL_DIVERSION,
} from '@mallos/map-engine';

export interface FloorItem {
  id: string;
  shortLabel: string;
  label: string;
  level: number;
}

export const SAMBIL_FLOORS: FloorItem[] = [
  { id: LEVEL_DIVERSION, shortLabel: 'L5', label: 'Diversión / Terraza', level: 5 },
  { id: LEVEL_FERIA, shortLabel: 'L4', label: 'Feria / Anfiteatro', level: 4 },
  { id: LEVEL_LIBERTADOR, shortLabel: 'L3', label: 'Libertador', level: 3 },
  { id: LEVEL_ACUARIO, shortLabel: 'L2', label: 'Acuario', level: 2 },
  { id: LEVEL_AUTOPISTA, shortLabel: 'L1', label: 'Autopista', level: 1 },
];

interface VerticalFloorSelectorProps {
  selectedFloorId: string;
  onSelectFloor: (floorId: string) => void;
  destinationFloorId?: string;
  userFloorId?: string;
}

export function VerticalFloorSelector({
  selectedFloorId,
  onSelectFloor,
  destinationFloorId,
  userFloorId,
}: VerticalFloorSelectorProps) {
  return (
    <View style={styles.container}>
      {SAMBIL_FLOORS.map((floor) => {
        const isSelected = selectedFloorId === floor.id;
        const hasDestination = destinationFloorId === floor.id;
        const hasUser = userFloorId === floor.id;

        return (
          <TouchableOpacity
            key={floor.id}
            style={[styles.floorBtn, isSelected && styles.floorBtnActive]}
            onPress={() => onSelectFloor(floor.id)}
            activeOpacity={0.8}
          >
            {/* Badge de usuario o destino */}
            {hasUser && <View style={styles.userDot} />}
            {hasDestination && !hasUser && <View style={styles.destDot} />}

            <Text style={[styles.floorText, isSelected && styles.floorTextActive]}>
              {floor.shortLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 14,
    top: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 20,
    padding: 5,
    gap: 6,
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  floorBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  floorBtnActive: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  floorText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  floorTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  userDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  destDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
});
