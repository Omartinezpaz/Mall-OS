import { useState, useEffect, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';

// ============================================================================
// SINGLETON GLOBAL: Modo Accesible (Persistente y Sincronizado entre Mapa y Concierge)
// ============================================================================

let isAccessibleEnabled = false;
let isLoaded = false;
const listeners = new Set<(enabled: boolean) => void>();

const ACCESSIBLE_STORAGE_FILE = `${FileSystem.documentDirectory ?? ''}accessible_mode_v1.json`;

async function loadPersistedState() {
  if (isLoaded) return;
  isLoaded = true;
  try {
    if (!FileSystem.documentDirectory) return;
    const info = await FileSystem.getInfoAsync(ACCESSIBLE_STORAGE_FILE);
    if (!info.exists) return;
    const raw = await FileSystem.readAsStringAsync(ACCESSIBLE_STORAGE_FILE);
    const parsed = JSON.parse(raw);
    if (typeof parsed?.isAccessibleEnabled === 'boolean') {
      isAccessibleEnabled = parsed.isAccessibleEnabled;
      notifyListeners();
    }
  } catch (err) {
    console.warn('[AccessibleMode] Error cargando estado persistido:', err);
  }
}

async function persistState() {
  try {
    if (!FileSystem.documentDirectory) return;
    await FileSystem.writeAsStringAsync(
      ACCESSIBLE_STORAGE_FILE,
      JSON.stringify({ isAccessibleEnabled, updatedAt: Date.now() })
    );
  } catch (err) {
    console.warn('[AccessibleMode] Error guardando estado persistido:', err);
  }
}

function notifyListeners() {
  for (const listener of listeners) {
    try {
      listener(isAccessibleEnabled);
    } catch (err) {
      console.warn('[AccessibleMode] Error notificando listener:', err);
    }
  }
}

// Iniciar carga en importación
loadPersistedState();

export function getIsAccessibleMode(): boolean {
  return isAccessibleEnabled;
}

export function setGlobalAccessibleMode(enabled: boolean): void {
  if (isAccessibleEnabled === enabled) return;
  isAccessibleEnabled = enabled;
  notifyListeners();
  persistState();
}

export function toggleGlobalAccessibleMode(): boolean {
  setGlobalAccessibleMode(!isAccessibleEnabled);
  return isAccessibleEnabled;
}

export function subscribeAccessibleMode(callback: (enabled: boolean) => void): () => void {
  listeners.add(callback);
  callback(isAccessibleEnabled);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Hook reactivo para consumir y alternar el Modo Accesible global.
 * Sincronizado instantáneamente entre el Mapa Skia y el Concierge IA.
 */
export function useAccessibleMode() {
  const [isAccessibleMode, setIsAccessible] = useState<boolean>(isAccessibleEnabled);

  useEffect(() => {
    const unsub = subscribeAccessibleMode((enabled) => {
      setIsAccessible(enabled);
    });
    return unsub;
  }, []);

  const toggleAccessibleMode = useCallback(() => {
    return toggleGlobalAccessibleMode();
  }, []);

  const setAccessibleMode = useCallback((enabled: boolean) => {
    setGlobalAccessibleMode(enabled);
  }, []);

  return {
    isAccessibleMode,
    toggleAccessibleMode,
    setAccessibleMode,
  };
}
