import { AppState, type AppStateStatus } from 'react-native';
import * as FileSystem from 'expo-file-system';

// ============================================================================
// Tipos de Eventos de Analytics
// ============================================================================

export type AnalyticsEventName =
  // Modo Niño
  | 'kids_adventure_started'
  | 'kids_station_completed'
  | 'kids_prize_unlocked'
  | 'kids_prize_claimed'
  // Concierge IA
  | 'concierge_message_sent'
  | 'concierge_intent_matched'
  | 'concierge_store_routed'
  | 'concierge_purchase_registered'
  | 'concierge_drink_selected'
  | 'concierge_accessibility_activated'
  // Mapa
  | 'map_route_calculated'
  | 'map_arrival'
  | 'map_accessible_mode_toggled'
  | 'map_store_viewed'
  // Fidelización
  | 'loyalty_points_earned'
  | 'loyalty_reward_claimed';

export interface AnalyticsEvent {
  id: string;
  name: AnalyticsEventName;
  ts: number;
  props?: Record<string, unknown>;
}

export interface AnalyticsSummary {
  totalEvents: number;
  firstEventTs: number | null;
  lastEventTs: number | null;
  byType: Record<string, number>;
  topStoresRouted: Array<{ storeId: string; count: number }>;
  purchasesCount: number;
  kidsStationsCount: number;
  recentEvents: AnalyticsEvent[];
}

// ============================================================================
// Buffer y Persistencia Local (JSONL)
// ============================================================================

const ANALYTICS_FILE = `${FileSystem.documentDirectory ?? ''}analytics_v1.jsonl`;
const FLUSH_THRESHOLD = 5;

let memoryBuffer: AnalyticsEvent[] = [];
let isFlushing = false;
let flushPromise: Promise<void> | null = null;

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Registra un evento de analítica de forma silenciosa y en memoria.
 * Escribe automáticamente a disco al acumular 5 eventos o al ir la app a background.
 */
export function track(name: AnalyticsEventName, props?: Record<string, unknown>): void {
  try {
    const event: AnalyticsEvent = {
      id: generateId(),
      name,
      ts: Date.now(),
      props: props ? { ...props } : undefined,
    };

    memoryBuffer.push(event);

    if (memoryBuffer.length >= FLUSH_THRESHOLD) {
      flush();
    }
  } catch (err) {
    // Silencioso en producción
    if (__DEV__) console.warn('[Analytics] Error tracking event:', err);
  }
}

/**
 * Escribe todos los eventos pendientes en el buffer al archivo JSONL local.
 */
export async function flush(): Promise<void> {
  if (memoryBuffer.length === 0) return;
  if (isFlushing && flushPromise) return flushPromise;

  isFlushing = true;
  flushPromise = (async () => {
    try {
      if (!FileSystem.documentDirectory) return;
      const toWrite = [...memoryBuffer];
      memoryBuffer = [];

      const lines = toWrite.map((e) => JSON.stringify(e)).join('\n') + '\n';

      const fileInfo = await FileSystem.getInfoAsync(ANALYTICS_FILE);
      if (fileInfo.exists) {
        // Appending mediante lectura previa o escritura acumulada
        const currentContent = await FileSystem.readAsStringAsync(ANALYTICS_FILE);
        await FileSystem.writeAsStringAsync(ANALYTICS_FILE, currentContent + lines);
      } else {
        await FileSystem.writeAsStringAsync(ANALYTICS_FILE, lines);
      }
    } catch (err) {
      if (__DEV__) console.warn('[Analytics] Error flushing buffer:', err);
    } finally {
      isFlushing = false;
      flushPromise = null;
    }
  })();

  return flushPromise;
}

/**
 * Obtiene el resumen consolidado de métricas para mostrar en la reunión o dashboard.
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  await flush();

  const summary: AnalyticsSummary = {
    totalEvents: 0,
    firstEventTs: null,
    lastEventTs: null,
    byType: {},
    topStoresRouted: [],
    purchasesCount: 0,
    kidsStationsCount: 0,
    recentEvents: [],
  };

  try {
    if (!FileSystem.documentDirectory) return summary;
    const info = await FileSystem.getInfoAsync(ANALYTICS_FILE);
    if (!info.exists) return summary;

    const raw = await FileSystem.readAsStringAsync(ANALYTICS_FILE);
    const lines = raw.trim().split('\n').filter(Boolean);

    const storeRouteCounts: Record<string, number> = {};
    const parsedEvents: AnalyticsEvent[] = [];

    for (const line of lines) {
      try {
        const ev = JSON.parse(line) as AnalyticsEvent;
        parsedEvents.push(ev);

        summary.totalEvents++;
        if (!summary.firstEventTs || ev.ts < summary.firstEventTs) {
          summary.firstEventTs = ev.ts;
        }
        if (!summary.lastEventTs || ev.ts > summary.lastEventTs) {
          summary.lastEventTs = ev.ts;
        }

        summary.byType[ev.name] = (summary.byType[ev.name] ?? 0) + 1;

        if (ev.name === 'map_route_calculated' || ev.name === 'concierge_store_routed') {
          const store = (ev.props?.toStoreId || ev.props?.storeId) as string | undefined;
          if (store) {
            storeRouteCounts[store] = (storeRouteCounts[store] ?? 0) + 1;
          }
        }

        if (ev.name === 'concierge_purchase_registered') {
          summary.purchasesCount++;
        }

        if (ev.name === 'kids_station_completed') {
          summary.kidsStationsCount++;
        }
      } catch {
        // Ignorar línea corrupta
      }
    }

    summary.topStoresRouted = Object.entries(storeRouteCounts)
      .map(([storeId, count]) => ({ storeId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    summary.recentEvents = parsedEvents.slice(-20).reverse();
  } catch (err) {
    if (__DEV__) console.warn('[Analytics] Error reading summary:', err);
  }

  return summary;
}

/**
 * Reinicia las métricas locales si se desea empezar un nuevo ciclo de pruebas.
 */
export async function clearAnalytics(): Promise<void> {
  memoryBuffer = [];
  try {
    if (FileSystem.documentDirectory) {
      await FileSystem.deleteAsync(ANALYTICS_FILE, { idempotent: true });
    }
  } catch (err) {
    if (__DEV__) console.warn('[Analytics] Error clearing analytics file:', err);
  }
}

// ============================================================================
// Listener de AppState para salvar eventos al pasar a segundo plano
// ============================================================================

AppState.addEventListener('change', (nextState: AppStateStatus) => {
  if (nextState === 'background' || nextState === 'inactive') {
    flush();
  }
});
