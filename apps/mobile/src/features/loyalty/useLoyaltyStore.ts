import { useState, useCallback, useEffect } from 'react';

export interface LoyaltyReward {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  discount: string;
  costPoints: number;
  badge: string;
  claimed: boolean;
  expiresIn: string;
}

export interface LoyaltyState {
  points: number;
  userLevel: number;
  levelName: string;
  visitsCount: number;
  visitsTarget: number;
  visitedStoreIds: string[];
  rewards: LoyaltyReward[];
  welcomeClaimed: boolean;
}

const INITIAL_STATE: LoyaltyState = {
  points: 120,
  userLevel: 5,
  levelName: 'Explorador Pro',
  visitsCount: 1,
  visitsTarget: 3,
  visitedStoreIds: ['st_pb_01'],
  welcomeClaimed: false,
  rewards: [
    {
      id: 'rew_01',
      storeId: 'st_pb_01',
      storeName: 'ZARA',
      title: 'Cupón de $10 en compras sobre $40',
      discount: '$10 OFF',
      costPoints: 50,
      badge: 'Exclusivo',
      claimed: false,
      expiresIn: '2 días',
    },
    {
      id: 'rew_02',
      storeId: 'local_farmatodo',
      storeName: 'Farmatodo',
      title: '2x1 en Cuidado Personal & Skincare',
      discount: '2x1 PROMO',
      costPoints: 30,
      badge: 'Destacado',
      claimed: false,
      expiresIn: 'Hoy',
    },
    {
      id: 'rew_03',
      storeId: 'local_cines_unidos',
      storeName: 'Cines Unidos',
      title: 'Combo Cotufas Mediano Gratis',
      discount: 'GRATIS',
      costPoints: 80,
      badge: 'Popular',
      claimed: false,
      expiresIn: '5 días',
    },
  ],
};

// Singleton in-memory state for session persistence across screens
let globalLoyaltyState: LoyaltyState = { ...INITIAL_STATE };
const listeners = new Set<(state: LoyaltyState) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener(globalLoyaltyState));
}

export function useLoyaltyStore() {
  const [state, setState] = useState<LoyaltyState>(globalLoyaltyState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  // Check-in o visita a tienda
  const recordVisit = useCallback((storeId: string, earnedPoints = 25) => {
    const alreadyVisited = globalLoyaltyState.visitedStoreIds.includes(storeId);
    const nextVisited = alreadyVisited
      ? globalLoyaltyState.visitedStoreIds
      : [...globalLoyaltyState.visitedStoreIds, storeId];
    const nextVisitsCount = Math.min(
      globalLoyaltyState.visitsTarget,
      globalLoyaltyState.visitsCount + (alreadyVisited ? 0 : 1)
    );
    const nextPoints = globalLoyaltyState.points + earnedPoints;

    globalLoyaltyState = {
      ...globalLoyaltyState,
      points: nextPoints,
      visitedStoreIds: nextVisited,
      visitsCount: nextVisitsCount,
    };
    notifyListeners();
  }, []);

  // Canjear cupón o recompensa
  const claimReward = useCallback((rewardId: string): boolean => {
    const reward = globalLoyaltyState.rewards.find((r) => r.id === rewardId);
    if (!reward || reward.claimed || globalLoyaltyState.points < reward.costPoints) {
      return false;
    }
    const nextRewards = globalLoyaltyState.rewards.map((r) =>
      r.id === rewardId ? { ...r, claimed: true } : r
    );
    globalLoyaltyState = {
      ...globalLoyaltyState,
      points: globalLoyaltyState.points - reward.costPoints,
      rewards: nextRewards,
    };
    notifyListeners();
    return true;
  }, []);

  return {
    ...state,
    isLoaded: true,
    recordVisit,
    claimReward,
  };
}
