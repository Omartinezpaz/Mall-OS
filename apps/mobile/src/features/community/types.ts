export type CommunityRelation = 'family' | 'friend' | 'partner' | 'child';
export type CommunityStatus = 'pending' | 'accepted' | 'blocked';

export interface CommunityMember {
  id: string;
  name: string;
  relation: CommunityRelation;
  relationLabel: string;
  status: CommunityStatus;
  isInMall: boolean;
  floorId: string;
  floorName: string;
  zoneStoreId?: string | null;
  zoneName: string;
  minutesAgo: number;
  avatarColor: string;
  monogram: string;
  isKidsModeActive?: boolean;
  kidsModeChallenge?: string;
  isSharing: boolean;
  isPresenceActive?: boolean;
  isExpired?: boolean;
}

export interface CommunityState {
  myCode: string;
  isSharingPresence: boolean;
  tier: 'free' | 'premium';
  maxContacts: number;
  members: CommunityMember[];
}
