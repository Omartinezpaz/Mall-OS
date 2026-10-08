import { useState, useEffect, useCallback } from 'react';
import { Vibration } from 'react-native';
import {
  type AgeGroup,
  type KidsRiddle,
  type KidsPrize,
  KIDS_RIDDLES,
  KIDS_PRIZES,
} from './kids-data';

export interface KidsModeState {
  ageGroup: AgeGroup | null;
  playerName: string;
  avatar: string;
  isFamilyMode: boolean;
  currentRiddleIndex: number;
  completedRiddleIds: string[];
  unlockedQRStoreIds: string[];
  lastVisitedStoreId: string | null;
  stars: number;
  prizeUnlocked: boolean;
  prizeCode: string | null;
  claimed: boolean;
  startedAt: number | null;
  lastUnlockedAt: number | null;
}

const DEFAULT_STATE: KidsModeState = {
  ageGroup: null,
  playerName: 'Explorador',
  avatar: '🦁',
  isFamilyMode: false,
  currentRiddleIndex: 0,
  completedRiddleIds: [],
  unlockedQRStoreIds: [],
  lastVisitedStoreId: null,
  stars: 0,
  prizeUnlocked: false,
  prizeCode: null,
  claimed: false,
  startedAt: null,
  lastUnlockedAt: null,
};

let globalState: KidsModeState = { ...DEFAULT_STATE };
const listeners = new Set<(state: KidsModeState) => void>();

function notifyListeners() {
  for (const listener of listeners) {
    listener({ ...globalState });
  }
}

function generatePrizeCode(ageGroup: AgeGroup): string {
  const prefix = ageGroup === 'child' ? 'KID' : ageGroup === 'teen' ? 'TEN' : 'YNG';
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `QUIZ-${prefix}-${randomChars}${digits.toString().substring(0, 2)}`;
}

export function useKidsMode() {
  const [state, setState] = useState<KidsModeState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const startAdventure = useCallback(
    (ageGroup: AgeGroup, playerName: string = 'Explorador', avatar: string = '🦁', isFamilyMode: boolean = false) => {
      globalState = {
        ageGroup,
        playerName: playerName.trim() || 'Explorador',
        avatar,
        isFamilyMode,
        currentRiddleIndex: 0,
        completedRiddleIds: [],
        unlockedQRStoreIds: [],
        lastVisitedStoreId: null,
        stars: 0,
        prizeUnlocked: false,
        prizeCode: null,
        claimed: false,
        startedAt: Date.now(),
        lastUnlockedAt: null,
      };
      notifyListeners();
    },
    []
  );

  const riddles: KidsRiddle[] = state.ageGroup ? KIDS_RIDDLES[state.ageGroup] : [];
  const currentRiddle: KidsRiddle | undefined = riddles[state.currentRiddleIndex];
  const prize: KidsPrize | undefined = state.ageGroup ? KIDS_PRIZES[state.ageGroup] : undefined;

  const submitAnswer = useCallback(
    (optionId: string): { correct: boolean; explanation: string; isFinished: boolean } => {
      if (!currentRiddle || !state.ageGroup) {
        return { correct: false, explanation: 'No hay acertijo activo', isFinished: false };
      }

      const isCorrect = optionId === currentRiddle.correctOptionId;

      if (isCorrect) {
        try {
          Vibration.vibrate([0, 50, 40, 60]);
        } catch {
          // Ignorar si haptics no está disponible
        }

        const nextIndex = state.currentRiddleIndex + 1;
        const newCompleted = [...state.completedRiddleIds, currentRiddle.id];
        const newStars = Math.min(5, newCompleted.length);
        const isFinished = nextIndex >= riddles.length;

        globalState = {
          ...globalState,
          completedRiddleIds: newCompleted,
          lastVisitedStoreId: currentRiddle.storeId,
          stars: newStars,
          currentRiddleIndex: isFinished ? state.currentRiddleIndex : nextIndex,
          prizeUnlocked: isFinished,
          prizeCode: isFinished && !globalState.prizeCode ? generatePrizeCode(state.ageGroup) : globalState.prizeCode,
          lastUnlockedAt: Date.now(),
        };
        notifyListeners();

        return {
          correct: true,
          explanation: currentRiddle.explanation,
          isFinished,
        };
      } else {
        try {
          Vibration.vibrate(120);
        } catch {
          // Fallback silencioso
        }

        return {
          correct: false,
          explanation: currentRiddle.hint,
          isFinished: false,
        };
      }
    },
    [currentRiddle, state.ageGroup, state.currentRiddleIndex, state.completedRiddleIds, riddles.length]
  );

  const unlockStoreQR = useCallback((storeId: string) => {
    const nextUnlocked = globalState.unlockedQRStoreIds.includes(storeId)
      ? globalState.unlockedQRStoreIds
      : [...globalState.unlockedQRStoreIds, storeId];

    globalState = {
      ...globalState,
      unlockedQRStoreIds: nextUnlocked,
      lastVisitedStoreId: storeId,
    };
    notifyListeners();
  }, []);

  const resetAdventure = useCallback(() => {
    globalState = { ...DEFAULT_STATE };
    notifyListeners();
  }, []);

  const claimPrize = useCallback(() => {
    globalState = {
      ...globalState,
      claimed: true,
    };
    notifyListeners();
  }, []);

  return {
    ...state,
    riddles,
    currentRiddle,
    prize,
    startAdventure,
    submitAnswer,
    unlockStoreQR,
    resetAdventure,
    claimPrize,
    totalRiddles: riddles.length,
    progressPercentage: riddles.length > 0 ? (state.stars / riddles.length) * 100 : 0,
  };
}
