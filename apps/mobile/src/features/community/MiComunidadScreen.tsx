import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCommunity } from './useCommunity';
import { AddContactModal } from './AddContactModal';
import { CommunityMember } from './types';

export function MiComunidadScreen() {
  const router = useRouter();
  const {
    activeInMall,
    outsideMall,
    kidsInMode,
    myCode,
    myInviteLink,
    isSharingPresence,
    tier,
    maxContacts,
    toggleSharingPresence,
    copyCodeToClipboard,
    copyLinkToClipboard,
    addContactByCode,
    removeContact,
  } = useCommunity();

  const [modalVisible, setModalVisible] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopyCode = async () => {
    await copyCodeToClipboard();
    setCopyFeedback('Código copiado');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleCopyLink = async () => {
    await copyLinkToClipboard();
    setCopyFeedback('Enlace copiado');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleViewOnMap = (member: CommunityMember) => {
    if (member.zoneStoreId) {
      router.push({
        pathname: '/(tabs)/mapa',
        params: {
          storeId: member.zoneStoreId,
          communityContact: member.name,
          contactRelation: member.relationLabel,
        },
      });
    } else {
      router.push('/(tabs)/mapa');
    }
  };

  const handleConfirmRemove = (member: CommunityMember) => {
    Alert.alert(
      'Eliminar Contacto',
      `¿Deseas desvincular a ${member.name} de tu comunidad?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removeContact(member.id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B132B" />

      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={styles.screenTitle}>Mi Comunidad</Text>
          <View style={styles.statusBadge}>
            <View style={styles.greenPulseDot} />
            <Text style={styles.statusBadgeText}>Red Privada · Sambil Chacao</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addContactBtn}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addContactBtnText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Mi Código de Invitación Card */}
        <View style={styles.inviteCard}>
          <Text style={styles.inviteCardPreTitle}>MI CÓDIGO DE INVITACIÓN</Text>
          <View style={styles.codeRow}>
            <View style={styles.codePill}>
              <Text style={styles.codeText}>{myCode}</Text>
            </View>
            <View style={styles.codeActions}>
              <TouchableOpacity
                style={styles.actionPill}
                onPress={handleCopyCode}
                activeOpacity={0.7}
              >
                <Text style={styles.actionPillText}>Copiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionPillPrimary}
                onPress={handleCopyLink}
                activeOpacity={0.7}
              >
                <Text style={styles.actionPillPrimaryText}>Compartir link</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.inviteCardFootnote}>
            {copyFeedback ? `✓ ${copyFeedback}` : 'Compártelo con tu familia y amigos para ubicarse en el mall.'}
          </Text>
        </View>

        {/* Presence Sharing Toggle Card */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Compartir mi presencia en el mall</Text>
            <Text style={styles.privacySubtitle}>
              {isSharingPresence
                ? 'Activo: tus contactos aprobados ven en qué nivel te encuentras.'
                : 'Pausado: tu ubicación está oculta para todos tus contactos.'}
            </Text>
          </View>
          <Switch
            value={isSharingPresence}
            onValueChange={toggleSharingPresence}
            trackColor={{ false: '#334155', true: '#4F46E5' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Section: En el Mall Ahora */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.liveIndicatorDot} />
            <Text style={styles.sectionTitle}>EN EL MALL AHORA ({activeInMall.length})</Text>
          </View>
          <Text style={styles.sectionSub}>Sincronización en tiempo real</Text>
        </View>

        {activeInMall.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyCardText}>No hay contactos conectados en este momento.</Text>
          </View>
        ) : (
          <View style={styles.membersList}>
            {activeInMall.map((member) => (
              <View
                key={member.id}
                style={[
                  styles.memberCard,
                  member.isKidsModeActive && styles.kidsMemberCard,
                ]}
              >
                {/* Avatar Column */}
                <View style={[styles.avatarCircle, { backgroundColor: member.avatarColor }]}>
                  <Text style={styles.avatarMonogram}>{member.monogram}</Text>
                </View>

                {/* Info Column */}
                <View style={styles.memberInfo}>
                  <View style={styles.memberNameRow}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <View style={styles.relationBadge}>
                      <Text style={styles.relationBadgeText}>{member.relationLabel}</Text>
                    </View>
                  </View>

                  {/* Kids Mode Special Indicator */}
                  {member.isKidsModeActive ? (
                    <View style={styles.kidsBadgeRow}>
                      <View style={styles.kidsShieldIcon}>
                        <Text style={styles.kidsShieldText}>★</Text>
                      </View>
                      <Text style={styles.kidsBadgeLabel}>
                        Modo Niño: {member.kidsModeChallenge}
                      </Text>
                    </View>
                  ) : null}

                  <Text style={styles.memberZoneText}>{member.zoneName}</Text>
                  <Text style={styles.memberTimeText}>
                    {member.minutesAgo === 0 ? 'Actualizado hace un momento' : `Hace ${member.minutesAgo} min`}
                  </Text>
                </View>

                {/* Action Column */}
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[
                      styles.viewMapButton,
                      member.isKidsModeActive && styles.viewMapButtonKids,
                    ]}
                    onPress={() => handleViewOnMap(member)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewMapButtonText}>Ver en Mapa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.moreOptionsBtn}
                    onPress={() => handleConfirmRemove(member)}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.moreOptionsText}>⋯</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Section: Fuera del Mall */}
        {outsideMall.length > 0 ? (
          <View style={styles.outsideSection}>
            <Text style={styles.outsideSectionTitle}>
              CONTACTOS FUERA DEL MALL ({outsideMall.length})
            </Text>
            {outsideMall.map((member) => (
              <View key={member.id} style={styles.outsideMemberCard}>
                <View style={[styles.avatarCircleSmall, { backgroundColor: member.avatarColor }]}>
                  <Text style={styles.avatarMonogramSmall}>{member.monogram}</Text>
                </View>
                <View style={styles.outsideInfo}>
                  <View style={styles.memberNameRow}>
                    <Text style={styles.outsideMemberName}>{member.name}</Text>
                    <View style={styles.relationBadgeMuted}>
                      <Text style={styles.relationBadgeTextMuted}>{member.relationLabel}</Text>
                    </View>
                  </View>
                  <Text style={styles.outsideStatusText}>
                    {!member.isSharing
                      ? 'Ubicación en pausa (privacidad activa)'
                      : member.isExpired
                      ? `Inactivo (+${member.minutesAgo} min · expirado)`
                      : 'Fuera del centro comercial'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.moreOptionsBtn}
                  onPress={() => handleConfirmRemove(member)}
                  activeOpacity={0.6}
                >
                  <Text style={styles.moreOptionsTextMuted}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        {/* Tier Quota Card */}
        <View style={styles.tierCard}>
          <View style={styles.tierLeft}>
            <Text style={styles.tierTitle}>Plan Gratuito de Hospitalidad</Text>
            <Text style={styles.tierSub}>
              {activeInMall.length + outsideMall.length} de {maxContacts} contactos utilizados
            </Text>
          </View>
          <View style={styles.tierBadge}>
            <Text style={styles.tierBadgeText}>Club Premium: Ilimitado</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal Agregar Contacto */}
      <AddContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddContact={addContactByCode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0F172A',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusBadgeText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  addContactBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addContactBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inviteCard: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  inviteCardPreTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#818CF8',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  codePill: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  codeText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#38BDF8',
    letterSpacing: 2,
  },
  codeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionPill: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionPillText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  actionPillPrimary: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionPillPrimaryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  inviteCardFootnote: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 10,
    lineHeight: 16,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
  },
  privacyTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 3,
  },
  privacySubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#CBD5E1',
    letterSpacing: 0.6,
  },
  sectionSub: {
    fontSize: 11,
    color: '#64748B',
  },
  emptyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyCardText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  membersList: {
    gap: 12,
    marginBottom: 24,
  },
  memberCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  kidsMemberCard: {
    borderColor: 'rgba(245, 158, 11, 0.35)',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarMonogram: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  memberInfo: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  relationBadge: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  relationBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A5B4FC',
  },
  kidsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 3,
    marginBottom: 4,
  },
  kidsShieldIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kidsShieldText: {
    color: '#0F172A',
    fontSize: 9,
    fontWeight: '900',
  },
  kidsBadgeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FBBF24',
  },
  memberZoneText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#38BDF8',
    marginTop: 2,
  },
  memberTimeText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  cardActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  viewMapButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewMapButtonKids: {
    backgroundColor: '#D97706',
  },
  viewMapButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  moreOptionsBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreOptionsText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '800',
  },
  outsideSection: {
    marginTop: 10,
    marginBottom: 24,
  },
  outsideSectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  outsideMemberCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  avatarCircleSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  avatarMonogramSmall: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  outsideInfo: {
    flex: 1,
  },
  outsideMemberName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
  },
  relationBadgeMuted: {
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  relationBadgeTextMuted: {
    fontSize: 10,
    color: '#64748B',
  },
  outsideStatusText: {
    fontSize: 12,
    color: '#64748B',
  },
  moreOptionsTextMuted: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
  tierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.25)',
  },
  tierLeft: {
    flex: 1,
  },
  tierTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A5B4FC',
  },
  tierSub: {
    fontSize: 12,
    color: '#818CF8',
    marginTop: 2,
  },
  tierBadge: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tierBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
});
