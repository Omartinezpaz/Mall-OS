import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  subtitle: string;
  level: number;
  icon: keyof typeof Ionicons.glyphMap;
  storeCount: number;
}

export const SAMBIL_FLOORS: FloorItem[] = [
  {
    id: LEVEL_DIVERSION,
    shortLabel: 'L5',
    label: 'Nivel Diversión',
    subtitle: 'Terraza, Cines & Entretenimiento',
    level: 5,
    icon: 'game-controller-outline',
    storeCount: 28,
  },
  {
    id: LEVEL_FERIA,
    shortLabel: 'L4',
    label: 'Nivel Feria',
    subtitle: 'Feria de Comida & Fast Food',
    level: 4,
    icon: 'restaurant-outline',
    storeCount: 46,
  },
  {
    id: LEVEL_LIBERTADOR,
    shortLabel: 'L3',
    label: 'Nivel Libertador',
    subtitle: 'Moda, Calzado & Joyerías',
    level: 3,
    icon: 'shirt-outline',
    storeCount: 74,
  },
  {
    id: LEVEL_ACUARIO,
    shortLabel: 'L2',
    label: 'Nivel Acuario',
    subtitle: 'Tecnología, Hogar & Servicios',
    level: 2,
    icon: 'hardware-chip-outline',
    storeCount: 82,
  },
  {
    id: LEVEL_AUTOPISTA,
    shortLabel: 'L1',
    label: 'Nivel Autopista',
    subtitle: 'Tiendas Ancla, Bancos & Farmacias',
    level: 1,
    icon: 'storefront-outline',
    storeCount: 108,
  },
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
  const [modalVisible, setModalVisible] = useState(false);

  const activeFloor =
    SAMBIL_FLOORS.find((f) => f.id === selectedFloorId) ?? SAMBIL_FLOORS[4];

  return (
    <>
      {/* Botón Flotante Compacto (Píldora Moderna) */}
      <TouchableOpacity
        style={styles.triggerPill}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <View style={styles.badgeCircle}>
          <Text style={styles.badgeText}>{activeFloor?.shortLabel ?? 'L1'}</Text>
        </View>
        <Text style={styles.floorPillLabel} numberOfLines={1}>
          {activeFloor?.label?.replace('Nivel ', '') ?? 'Autopista'}
        </Text>
        <Ionicons name="chevron-down" size={14} color="#94A3B8" />

        {/* Indicador si el usuario o destino están en este piso */}
        {userFloorId === selectedFloorId && <View style={styles.statusDot} />}
      </TouchableOpacity>

      {/* Modal / Bottom Sheet de Selección de Niveles */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sheetContainer}>
                {/* Indicador de arrastre */}
                <View style={styles.dragHandle} />

                <View style={styles.sheetHeader}>
                  <View>
                    <Text style={styles.sheetTitle}>Niveles del Mall</Text>
                    <Text style={styles.sheetSubtitle}>
                      Selecciona un piso para ver su mapa
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeBtn}
                    hitSlop={10}
                  >
                    <Ionicons name="close" size={18} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {/* Lista de Pisos con Diseño Card */}
                <View style={styles.floorsList}>
                  {SAMBIL_FLOORS.map((floor) => {
                    const isSelected = selectedFloorId === floor.id;
                    const hasUser = userFloorId === floor.id;
                    const hasDest = destinationFloorId === floor.id;

                    return (
                      <TouchableOpacity
                        key={floor.id}
                        style={[
                          styles.floorCard,
                          isSelected && styles.floorCardSelected,
                        ]}
                        onPress={() => {
                          onSelectFloor(floor.id);
                          setModalVisible(false);
                        }}
                        activeOpacity={0.75}
                      >
                        <View style={styles.floorCardLeft}>
                          <View
                            style={[
                              styles.floorIconBox,
                              isSelected && styles.floorIconBoxSelected,
                            ]}
                          >
                            <Ionicons
                              name={floor.icon}
                              size={18}
                              color={isSelected ? '#FFFFFF' : '#2563EB'}
                            />
                          </View>
                          <View style={styles.floorTextInfo}>
                            <View style={styles.floorTitleRow}>
                              <Text
                                style={[
                                  styles.floorName,
                                  isSelected && styles.floorNameSelected,
                                ]}
                              >
                                {floor.shortLabel} · {floor.label}
                              </Text>
                              {hasUser && (
                                <View style={styles.userBadge}>
                                  <Text style={styles.userBadgeText}>Tú aquí</Text>
                                </View>
                              )}
                              {hasDest && !hasUser && (
                                <View style={styles.destBadge}>
                                  <Text style={styles.destBadgeText}>Destino</Text>
                                </View>
                              )}
                            </View>
                            <Text style={styles.floorSubtitle}>
                              {floor.subtitle} · {floor.storeCount} locales
                            </Text>
                          </View>
                        </View>

                        {isSelected && (
                          <View style={styles.checkCircle}>
                            <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 22,
    paddingLeft: 4,
    paddingRight: 10,
    paddingVertical: 4,
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
  },
  badgeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  floorPillLabel: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    maxWidth: 90,
  },
  statusDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#475569',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floorsList: {
    gap: 10,
  },
  floorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  floorCardSelected: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    borderColor: '#2563EB',
  },
  floorCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  floorIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floorIconBoxSelected: {
    backgroundColor: '#2563EB',
  },
  floorTextInfo: {
    flex: 1,
  },
  floorTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  floorName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  floorNameSelected: {
    color: '#38BDF8',
  },
  userBadge: {
    backgroundColor: '#065F46',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 5,
  },
  userBadgeText: {
    color: '#34D399',
    fontSize: 9,
    fontWeight: '800',
  },
  destBadge: {
    backgroundColor: '#7C2D12',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 5,
  },
  destBadgeText: {
    color: '#FB923C',
    fontSize: 9,
    fontWeight: '800',
  },
  floorSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
