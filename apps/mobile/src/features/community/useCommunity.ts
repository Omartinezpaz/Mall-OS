import { useState, useEffect, useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';
import { COMMUNITY_PRESENCE_EXPIRATION_MINUTES } from '@mallos/validators';
import { CommunityMember, CommunityState } from './types';
import { DEFAULT_COMMUNITY_CODE, INITIAL_COMMUNITY_MEMBERS } from './community-data';

let globalCommunityState: CommunityState = {
  myCode: DEFAULT_COMMUNITY_CODE,
  isSharingPresence: true,
  tier: 'free',
  maxContacts: 3,
  members: [...INITIAL_COMMUNITY_MEMBERS],
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function useCommunity() {
  const [state, setState] = useState<CommunityState>(globalCommunityState);

  useEffect(() => {
    const handleUpdate = () => setState({ ...globalCommunityState });
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const toggleSharingPresence = useCallback(() => {
    globalCommunityState = {
      ...globalCommunityState,
      isSharingPresence: !globalCommunityState.isSharingPresence,
    };
    notify();
  }, []);

  const copyCodeToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(globalCommunityState.myCode);
    return true;
  }, []);

  const copyLinkToClipboard = useCallback(async () => {
    const link = `https://mallos.app/invite/${globalCommunityState.myCode}`;
    await Clipboard.setStringAsync(link);
    return link;
  }, []);

  const addContactByCode = useCallback(
    (code: string, nickname?: string, relation: CommunityMember['relation'] = 'friend'): { success: boolean; message: string } => {
      const cleanCode = code.trim().toUpperCase();

      if (cleanCode.length < 6) {
        return { success: false, message: 'El código debe tener al menos 6 caracteres alfanuméricos.' };
      }

      if (cleanCode === globalCommunityState.myCode) {
        return { success: false, message: 'No puedes agregar tu propio código de invitación.' };
      }

      // Validar límite en plan gratuito
      const activeAccepted = globalCommunityState.members.filter((m) => m.status === 'accepted');
      if (globalCommunityState.tier === 'free' && activeAccepted.length >= globalCommunityState.maxContacts) {
        return {
          success: false,
          message: `Has alcanzado el límite de ${globalCommunityState.maxContacts} contactos del plan gratuito. Actualiza a Club Premium para agregar contactos ilimitados.`,
        };
      }

      // Relación label
      const relationLabels: Record<string, string> = {
        family: 'Familia',
        friend: 'Amigo',
        partner: 'Pareja',
        child: 'Hijo',
      };

      const newMember: CommunityMember = {
        id: `comm-${Date.now()}`,
        name: nickname?.trim() || `Contacto (${cleanCode.slice(-4)})`,
        relation,
        relationLabel: relationLabels[relation] || 'Amigo',
        status: 'accepted',
        isInMall: true,
        floorId: 'nivel_autopista',
        floorName: 'Nivel Autopista',
        zoneStoreId: 'farmatodo',
        zoneName: 'Farmatodo · Pasillo Central',
        minutesAgo: 0,
        avatarColor: '#3B82F6',
        monogram: (nickname?.trim()?.[0] || 'C').toUpperCase(),
        isKidsModeActive: false,
        isSharing: true,
      };

      globalCommunityState = {
        ...globalCommunityState,
        members: [newMember, ...globalCommunityState.members],
      };
      notify();

      return { success: true, message: `¡${newMember.name} agregado exitosamente a tu comunidad!` };
    },
    []
  );

  const removeContact = useCallback((contactId: string) => {
    globalCommunityState = {
      ...globalCommunityState,
      members: globalCommunityState.members.filter((m) => m.id !== contactId),
    };
    notify();
  }, []);

  // Evaluación de presencia activa según política de 15 minutos de inactividad
  const evaluatedMembers = state.members.map((m) => {
    const isExpired = (m.minutesAgo ?? 0) >= COMMUNITY_PRESENCE_EXPIRATION_MINUTES;
    const isPresenceActive = m.isInMall && m.status === 'accepted' && m.isSharing && !isExpired;
    return {
      ...m,
      isExpired,
      isPresenceActive,
    };
  });

  const activeInMall = evaluatedMembers.filter((m) => m.isPresenceActive);
  const outsideMall = evaluatedMembers.filter((m) => m.status === 'accepted' && !m.isPresenceActive);
  const kidsInMode = activeInMall.filter((m) => m.isKidsModeActive);

  return {
    members: state.members,
    activeInMall,
    outsideMall,
    kidsInMode,
    myCode: state.myCode,
    myInviteLink: `https://mallos.app/invite/${state.myCode}`,
    isSharingPresence: state.isSharingPresence,
    tier: state.tier,
    maxContacts: state.maxContacts,
    toggleSharingPresence,
    copyCodeToClipboard,
    copyLinkToClipboard,
    addContactByCode,
    removeContact,
  };
}
