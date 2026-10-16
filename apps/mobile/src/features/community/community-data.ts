import { CommunityMember } from './types';

export const DEFAULT_COMMUNITY_CODE = 'OSCAR-7K2P';
export const COMMUNITY_PRESENCE_EXPIRATION_MINUTES = 15;

export const INITIAL_COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: 'comm-1',
    name: 'María',
    relation: 'partner',
    relationLabel: 'Esposa',
    status: 'accepted',
    isInMall: true,
    floorId: 'nivel_autopista',
    floorName: 'Nivel Autopista',
    zoneStoreId: 'zara',
    zoneName: 'ZARA · Frente a Vitrina Principal',
    minutesAgo: 2,
    avatarColor: '#EC4899', // Rosa / Carmesí elegante
    monogram: 'M',
    isKidsModeActive: false,
    isSharing: true,
  },
  {
    id: 'comm-2',
    name: 'Mateo',
    relation: 'child',
    relationLabel: 'Hijo',
    status: 'accepted',
    isInMall: true,
    floorId: 'nivel_autopista',
    floorName: 'Nivel Autopista',
    zoneStoreId: 'local_8',
    zoneName: 'Plaza Acuario · Cerca de Palacio del Blumer',
    minutesAgo: 1,
    avatarColor: '#F59E0B', // Ámbar dorado / Explorador
    monogram: 'M',
    isKidsModeActive: true,
    kidsModeChallenge: 'Reto 2 de 4 · En busca del tesoro',
    isSharing: true,
  },
  {
    id: 'comm-3',
    name: 'Carlos',
    relation: 'friend',
    relationLabel: 'Amigo',
    status: 'accepted',
    isInMall: true,
    floorId: 'nivel_autopista',
    floorName: 'Nivel Autopista',
    zoneStoreId: 'local_110',
    zoneName: 'Área BNC y Cafetería · Pasillo Norte',
    minutesAgo: 6,
    avatarColor: '#10B981', // Verde esmeralda
    monogram: 'C',
    isKidsModeActive: false,
    isSharing: true,
  },
  {
    id: 'comm-4',
    name: 'Carmen',
    relation: 'family',
    relationLabel: 'Mamá',
    status: 'accepted',
    isInMall: false,
    floorId: 'nivel_autopista',
    floorName: 'Nivel Autopista',
    zoneStoreId: null,
    zoneName: 'Fuera del centro comercial',
    minutesAgo: 140,
    avatarColor: '#8B5CF6', // Púrpura suave
    monogram: 'C',
    isKidsModeActive: false,
    isSharing: false,
  },
];
