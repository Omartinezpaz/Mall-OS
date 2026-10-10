import { useState, useEffect, useCallback } from 'react';
import { Vibration } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {
  type AgeGroup,
  type KidsRiddle,
  type KidsPrize,
  KIDS_RIDDLES,
  KIDS_PRIZES,
} from './kids-data';
import { notifyStoreArrival } from '../concierge/useConcierge';
import { track } from '../../lib/analytics';

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

const KIDS_STORAGE_FILE = `${FileSystem.documentDirectory ?? ''}kids_mode_state_v1.json`;
const KIDS_PERSISTENCE_TTL_MS = 12 * 60 * 60 * 1000; // 12 Horas de persistencia activa
let lastKidsInteractionTimestamp = Date.now();
let saveTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePersist() {
  if (saveTimer) clearTimeout(saveTimer);
  lastKidsInteractionTimestamp = Date.now();
  saveTimer = setTimeout(async () => {
    try {
      if (!FileSystem.documentDirectory) return;
      const data = JSON.stringify({
        version: 1,
        state: globalState,
        savedAt: lastKidsInteractionTimestamp,
      });
      await FileSystem.writeAsStringAsync(KIDS_STORAGE_FILE, data);
    } catch {
      // Ignorar fallos de I/O silenciosamente
    }
  }, 250);
}

export async function hydrateKidsModeFromStorage(): Promise<void> {
  try {
    if (!FileSystem.documentDirectory) return;
    const info = await FileSystem.getInfoAsync(KIDS_STORAGE_FILE);
    if (!info.exists) return;

    const raw = await FileSystem.readAsStringAsync(KIDS_STORAGE_FILE);
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1 && parsed.state) {
      const now = Date.now();
      const savedAt = typeof parsed.savedAt === 'number' ? parsed.savedAt : 0;
      const isExpired = now - savedAt > KIDS_PERSISTENCE_TTL_MS;

      if (isExpired) {
        // Han pasado más de 12 horas: limpiar almacenamiento y reiniciar de cero
        await clearKidsModeStorage();
        globalState = { ...DEFAULT_STATE };
        lastKidsInteractionTimestamp = now;
        notifyListeners();
        return;
      }

      const s = parsed.state;
      if (s.ageGroup === null || ['child', 'teen', 'young'].includes(s.ageGroup)) {
        globalState = {
          ...DEFAULT_STATE,
          ...s,
        };
        lastKidsInteractionTimestamp = savedAt;
        notifyListeners();
      }
    }
  } catch {
    // Si el archivo está corrupto, arranca con estado default
    globalState = { ...DEFAULT_STATE };
    notifyListeners();
  }
}

export async function clearKidsModeStorage(): Promise<void> {
  try {
    if (!FileSystem.documentDirectory) return;
    const info = await FileSystem.getInfoAsync(KIDS_STORAGE_FILE);
    if (info.exists) {
      await FileSystem.deleteAsync(KIDS_STORAGE_FILE, { idempotent: true });
    }
  } catch {}
}

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

    // Si la app estuvo en background o suspendida más de 12 horas, reiniciar
    const now = Date.now();
    if (globalState.ageGroup && now - lastKidsInteractionTimestamp > KIDS_PERSISTENCE_TTL_MS) {
      globalState = { ...DEFAULT_STATE };
      lastKidsInteractionTimestamp = now;
      notifyListeners();
      clearKidsModeStorage().catch(() => {});
    }

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
      schedulePersist();
      track('kids_adventure_started', { ageGroup, playerName, isFamilyMode });
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
        schedulePersist();

        track('kids_station_completed', {
          riddleId: currentRiddle.id,
          storeId: currentRiddle.storeId,
          stars: newStars,
          isFinished,
        });

        if (isFinished) {
          track('kids_prize_unlocked', {
            ageGroup: state.ageGroup,
            prizeName: prize?.title,
          });
        }

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
    [currentRiddle, state.ageGroup, state.currentRiddleIndex, state.completedRiddleIds, riddles.length, prize]
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
    schedulePersist();
    notifyStoreArrival(storeId);
  }, []);

  const resetAdventure = useCallback(() => {
    globalState = { ...DEFAULT_STATE };
    lastKidsInteractionTimestamp = Date.now();
    notifyListeners();
    clearKidsModeStorage().catch(() => {});
  }, []);

  const claimPrize = useCallback(() => {
    globalState = {
      ...globalState,
      claimed: true,
    };
    notifyListeners();
    schedulePersist();
    track('kids_prize_claimed', {
      ageGroup: state.ageGroup,
      prizeName: prize?.title,
      sponsor: prize?.sponsor,
    });
  }, [state.ageGroup, prize]);

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
