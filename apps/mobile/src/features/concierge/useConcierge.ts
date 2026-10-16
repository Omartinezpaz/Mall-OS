import { useState, useCallback, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import {
  PARENT_CATEGORIES,
  SUBCATEGORIES,
  getCatalogOptionsForSubcategory,
  type ParentCategory,
  type Subcategory,
  type CatalogStoreOption,
  type CatalogProduct,
} from './data/concierge-catalog';
import { DRINKS, type ConciergeDrink } from './data/concierge-drinks';
import {
  INFO_INTENTS,
  findMatchingInfoIntent,
  type InfoIntent,
  type InfoIntentResponse,
} from './data/concierge-info';
import {
  getIsAccessibleMode,
  setGlobalAccessibleMode,
  toggleGlobalAccessibleMode,
  useAccessibleMode,
} from '../accessible/useAccessibleMode';
import { track } from '../../lib/analytics';
import { streamConciergeChat, type ConciergeApiMessage } from './conciergeApi';

// ============================================================================
// Tipos de Estado y Eventos de la State Machine
// ============================================================================

export type ConciergeState =
  | 'ESPERA_ACTIVA'
  | 'FILTRANDO_CATEGORIA'
  | 'FILTRANDO_SUBCATEGORIA'
  | 'MOSTRANDO_TIENDAS'
  | 'MOSTRANDO_PRODUCTOS_TIENDA'
  | 'EN_RUTA_TIENDA'
  | 'EN_TIENDA'
  | 'CONFIRMANDO_COMPRA'
  | 'CALIFICANDO_COMPRA'
  | 'OFRECIENDO_BEBIDA'
  | 'ENCUESTA_FINAL'
  | 'DESPEDIDA';

export type FlowEvent =
  | { type: 'USER_MESSAGE'; text: string }
  | { type: 'SELECT_CATEGORY'; categoryId: string }
  | { type: 'SELECT_SUBCATEGORY'; subcategoryId: string }
  | { type: 'VIEW_STORE_PRODUCTS'; storeId: string }
  | { type: 'OPEN_PRODUCT_DETAIL'; productId: string }
  | { type: 'GO_BACK_TO_STORES' }
  | { type: 'SELECT_STORE'; storeId: string }
  | { type: 'STORE_ARRIVED'; storeId: string }
  | { type: 'CONFIRM_PURCHASE_FOUND'; found: boolean }
  | { type: 'JUST_LOOKING' }
  | { type: 'SELECT_PURCHASED_PRODUCT'; product: { id: string; name: string } }
  | { type: 'RATE_PURCHASE'; rating: number }
  | { type: 'SELECT_DRINK'; drinkId: string }
  | { type: 'RATE_CONCIERGE'; rating: number }
  | { type: 'START_NEW_SESSION' }
  | { type: 'TOGGLE_ACCESSIBLE'; enabled?: boolean }
  | { type: 'CANCEL' }
  | { type: 'RESET' };

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  intent?: InfoIntent | null;
  infoResponse?: InfoIntentResponse;
  categories?: ParentCategory[];
  subcategories?: Subcategory[];
  storeOptions?: CatalogStoreOption[];
  activeStoreId?: string;
  activeStoreProducts?: CatalogProduct[];
  activeStoreName?: string;
  drinks?: ConciergeDrink[];
  actionCta?: {
    label: string;
    actionType: 'navigate' | 'kids_mode' | 'offers' | 'directory' | 'open_screen' | 'toggle_accessible';
    targetId?: string;
    payload?: string;
  };
  // Widgets interactivos del funnel de ventas
  confirmationPrompt?: { storeName: string; storeId: string };
  productPicker?: { storeName: string; storeId: string; products: CatalogProduct[] };
  ratingWidget?: { title?: string; subtitle?: string; type: 'purchase' | 'concierge'; submittedRating?: number };
  drinkWidget?: { drinks: ConciergeDrink[]; selectedDrinkId?: string };
  farewellWidget?: { pointsEarned: number; drinkName?: string; storeName?: string };
}

const STORAGE_FILE_URI = `${FileSystem.documentDirectory}concierge_state_v2.json`;

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ============================================================================
// SINGLETON GLOBAL: Sobrevive a desmontes de pantalla y navegación del mapa
// ============================================================================

interface GlobalConciergeStore {
  state: ConciergeState;
  messages: ConciergeMessage[];
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  selectedStore: CatalogStoreOption | null;
  selectedProduct: CatalogProduct | { id: string; name: string } | null;
  selectedDrink: ConciergeDrink | null;
  purchaseRating: number | null;
  conciergeRating: number | null;
  hydrated: boolean;
}

const globalStore: GlobalConciergeStore = {
  state: 'ESPERA_ACTIVA',
  messages: [
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: '¡Hola! Soy tu Concierge IA de Sambil Chacao. ¿Qué deseas encontrar hoy? Puedes explorar nuestras tiendas o consultarme servicios.',
      timestamp: formatTime(new Date()),
      categories: PARENT_CATEGORIES,
    },
  ],
  selectedCategory: null,
  selectedSubcategory: null,
  selectedStore: null,
  selectedProduct: null,
  selectedDrink: null,
  purchaseRating: null,
  conciergeRating: null,
  hydrated: false,
};

const listeners = new Set<(s: GlobalConciergeStore) => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener({ ...globalStore }));
}

const PERSISTENCE_TTL_MS = 12 * 60 * 60 * 1000; // 12 Horas de persistencia activa
let lastInteractionTimestamp = Date.now();

async function persistStateImmediately() {
  try {
    lastInteractionTimestamp = Date.now();
    const toSave = JSON.stringify({
      savedAt: lastInteractionTimestamp,
      state: globalStore.state,
      messages: globalStore.messages.slice(-30),
      selectedCategory: globalStore.selectedCategory,
      selectedSubcategory: globalStore.selectedSubcategory,
      selectedStore: globalStore.selectedStore,
      selectedProduct: globalStore.selectedProduct,
    });
    await FileSystem.writeAsStringAsync(STORAGE_FILE_URI, toSave);
  } catch (err) {
    console.warn('Error persisting concierge state:', err);
  }
}

function resetConciergeToInitial() {
  globalStore.state = 'ESPERA_ACTIVA';
  globalStore.messages = [
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: '¡Hola! Soy tu Concierge IA de Sambil Chacao. ¿Qué deseas encontrar hoy? Puedes explorar nuestras tiendas o consultarme servicios.',
      timestamp: formatTime(new Date()),
      categories: PARENT_CATEGORIES,
    },
  ];
  globalStore.selectedCategory = null;
  globalStore.selectedSubcategory = null;
  globalStore.selectedStore = null;
  globalStore.selectedProduct = null;
  globalStore.selectedDrink = null;
  lastInteractionTimestamp = Date.now();
  notifyListeners();
  FileSystem.deleteAsync(STORAGE_FILE_URI, { idempotent: true }).catch(() => {});
}

async function hydrateOnce() {
  if (globalStore.hydrated) return;
  try {
    const fileInfo = await FileSystem.getInfoAsync(STORAGE_FILE_URI);
    if (fileInfo.exists) {
      const content = await FileSystem.readAsStringAsync(STORAGE_FILE_URI);
      const data = JSON.parse(content);

      // Verificación estricta de TTL: 12 horas
      const now = Date.now();
      const savedAt = typeof data.savedAt === 'number' ? data.savedAt : 0;
      const isExpired = now - savedAt > PERSISTENCE_TTL_MS;

      if (!isExpired && data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        globalStore.messages = data.messages;
        if (data.state) globalStore.state = data.state;
        if (data.selectedCategory) globalStore.selectedCategory = data.selectedCategory;
        if (data.selectedSubcategory) globalStore.selectedSubcategory = data.selectedSubcategory;
        if (data.selectedStore) globalStore.selectedStore = data.selectedStore;
        if (data.selectedProduct) globalStore.selectedProduct = data.selectedProduct;
        lastInteractionTimestamp = savedAt;
      } else {
        // Si han pasado más de 12 horas, limpiar almacenamiento y reiniciar sesión limpia
        resetConciergeToInitial();
      }
    }
  } catch (e) {
    console.warn('Hydration warning:', e);
  } finally {
    globalStore.hydrated = true;
    notifyListeners();
  }
}

/**
 * Notificador global de llegada a tienda (Puente Mapa ↔ QR ↔ Concierge).
 * Puede invocarse desde cualquier parte de la app (ej. llegada en mapa, escaneo de QR).
 */
export function notifyStoreArrival(storeId: string, storeName?: string) {
  if (!storeId) return;

  // Evitar duplicar el prompt si el último mensaje ya es de llegada para la misma tienda
  const lastMsg = globalStore.messages[globalStore.messages.length - 1];
  if (
    globalStore.state === 'CONFIRMANDO_COMPRA' &&
    lastMsg?.confirmationPrompt?.storeId === storeId
  ) {
    return;
  }

  const allOptions = globalStore.selectedSubcategory
    ? getCatalogOptionsForSubcategory(globalStore.selectedSubcategory)
    : [];

  const foundStore: CatalogStoreOption =
    allOptions.find((o) => o.storeId === storeId || o.storeId === `store-${storeId}`) ||
    globalStore.selectedStore || {
      storeId,
      storeName: storeName || (storeId.includes('zara') ? 'ZARA' : 'la tienda'),
      targetNodeId: 'node-67',
      floorLabel: 'Nivel Autopista (L1)',
      highlight: '',
      products: [],
    };

  if (storeName && foundStore.storeName === 'la tienda') {
    foundStore.storeName = storeName;
  }

  globalStore.selectedStore = foundStore;
  globalStore.state = 'CONFIRMANDO_COMPRA';

  const msg: ConciergeMessage = {
    id: `bot_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    sender: 'assistant',
    text: `¡Veo que has llegado a ${foundStore.storeName}! ¿Encontraste lo que buscabas?`,
    timestamp: formatTime(new Date()),
    confirmationPrompt: {
      storeName: foundStore.storeName,
      storeId: foundStore.storeId,
    },
  };

  globalStore.messages = [...globalStore.messages, msg];
  notifyListeners();
  persistStateImmediately();
}

export function useConcierge(options?: { isAccessibleMode?: boolean }) {
  const { isAccessibleMode: globalIsAccessible } = useAccessibleMode();
  const isAccessible = options?.isAccessibleMode !== undefined ? options.isAccessibleMode : globalIsAccessible;
  const [storeState, setStoreState] = useState<GlobalConciergeStore>({ ...globalStore });
  const [isThinking, setIsThinking] = useState<boolean>(false);

  useEffect(() => {
    listeners.add(setStoreState);
    if (!globalStore.hydrated) {
      hydrateOnce();
    } else {
      // Si la app estuvo en background o suspendida más de 12 horas, reiniciar
      const now = Date.now();
      if (now - lastInteractionTimestamp > PERSISTENCE_TTL_MS) {
        resetConciergeToInitial();
      }
    }
    return () => {
      listeners.delete(setStoreState);
    };
  }, []);

  const appendAssistantMessage = useCallback(
    (text: string, extra?: Partial<ConciergeMessage>) => {
      const msg: ConciergeMessage = {
        id: `bot_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        sender: 'assistant',
        text,
        timestamp: formatTime(new Date()),
        ...extra,
      };
      globalStore.messages = [...globalStore.messages, msg];
      notifyListeners();
      persistStateImmediately();
    },
    []
  );

  const dispatch = useCallback(
    (event: FlowEvent) => {
      // Escape universal
      if (event.type === 'CANCEL') {
        globalStore.state = 'ESPERA_ACTIVA';
        globalStore.selectedCategory = null;
        globalStore.selectedSubcategory = null;
        globalStore.selectedStore = null;
        appendAssistantMessage('Entendido, cancelamos esa búsqueda. ¿En qué más te puedo colaborar?', {
          categories: PARENT_CATEGORIES,
        });
        return;
      }

      if (event.type === 'STORE_ARRIVED') {
        notifyStoreArrival(event.storeId);
        return;
      }

      switch (event.type) {
        case 'CONFIRM_PURCHASE_FOUND': {
          const storeName = globalStore.selectedStore?.storeName || 'la tienda';
          if (event.found) {
            globalStore.state = 'CALIFICANDO_COMPRA';
            const products = globalStore.selectedStore?.products || [];
            appendAssistantMessage(
              `¡Excelente noticia! Cuéntanos qué artículo compraste en ${storeName} para acreditarte 50 Puntos Sambil y preparar tu recompensa.`,
              {
                productPicker: {
                  storeName,
                  storeId: globalStore.selectedStore?.storeId || 'store_default',
                  products,
                },
              }
            );
          } else {
            globalStore.state = 'MOSTRANDO_TIENDAS';
            const subcat = globalStore.selectedSubcategory;
            const alternatives = subcat
              ? getCatalogOptionsForSubcategory(subcat).filter((s) => s.storeId !== globalStore.selectedStore?.storeId)
              : getCatalogOptionsForSubcategory('ropa_general');
            appendAssistantMessage(
              `Lamento que no encontraras lo que buscabas en ${storeName}. En Sambil Chacao tenemos estas otras opciones destacadas que te pueden gustar:`,
              {
                storeOptions: alternatives.length > 0 ? alternatives : getCatalogOptionsForSubcategory('ropa_general'),
              }
            );
          }
          break;
        }

        case 'JUST_LOOKING': {
          globalStore.state = 'ESPERA_ACTIVA';
          appendAssistantMessage(
            `¡Entendido! Disfruta tu recorrido por Sambil Chacao. Si deseas consultar otra tienda, ruta o servicios, pregúntame cuando gustes.`,
            {
              categories: PARENT_CATEGORIES,
            }
          );
          break;
        }

        case 'SELECT_PURCHASED_PRODUCT': {
          const storeName = globalStore.selectedStore?.storeName || 'la tienda';
          globalStore.selectedProduct = event.product;
          globalStore.state = 'CALIFICANDO_COMPRA';
          track('concierge_purchase_registered', {
            storeName,
            storeId: globalStore.selectedStore?.storeId,
            productName: event.product.name,
          });
          appendAssistantMessage(
            `¡Excelente elección! Hemos registrado tu compra de "${event.product.name}" (+50 Pts Club Sambil). ¿Cómo calificarías tu experiencia en ${storeName}?`,
            {
              ratingWidget: {
                title: `Califica tu experiencia en ${storeName}`,
                subtitle: 'Tu valoración premia a los mejores locales de Sambil Chacao.',
                type: 'purchase',
              },
            }
          );
          break;
        }

        case 'SELECT_CATEGORY': {
          const cat = PARENT_CATEGORIES.find((c) => c.id === event.categoryId);
          if (!cat) return;
          globalStore.selectedCategory = cat.id;
          const availableSub = SUBCATEGORIES.filter((s) => cat.subcategoryIds.includes(s.id));

          globalStore.state = 'FILTRANDO_SUBCATEGORIA';
          appendAssistantMessage(
            `Excelente elección: ${cat.label}. ¿Qué tipo de artículo específico estás buscando?`,
            { subcategories: availableSub }
          );
          break;
        }

        case 'SELECT_SUBCATEGORY': {
          const sub = SUBCATEGORIES.find((s) => s.id === event.subcategoryId);
          if (!sub) return;
          globalStore.selectedSubcategory = sub.id;
          const storeOpts = getCatalogOptionsForSubcategory(sub.id);

          globalStore.state = 'MOSTRANDO_TIENDAS';
          const questionText = sub.followUpQuestion ? ` ${sub.followUpQuestion}` : '';
          const firstStore = storeOpts[0];
          appendAssistantMessage(
            `Para ${sub.label}, estas son las tiendas oficiales disponibles.${questionText}`,
            {
              storeOptions: storeOpts,
              activeStoreId: firstStore?.storeId,
              activeStoreProducts: firstStore?.products,
              activeStoreName: firstStore?.storeName,
            }
          );
          break;
        }

        // Usuario selecciona o cambia de tienda para ver su catálogo de productos
        case 'VIEW_STORE_PRODUCTS': {
          const allOptions = globalStore.selectedSubcategory
            ? getCatalogOptionsForSubcategory(globalStore.selectedSubcategory)
            : (globalStore.messages[globalStore.messages.length - 1]?.storeOptions || []);
          const found = allOptions.find((o) => o.storeId === event.storeId);
          if (!found) return;

          globalStore.selectedStore = found;
          globalStore.state = 'MOSTRANDO_PRODUCTOS_TIENDA';

          // Actualizar en el lugar en el último mensaje del asistente si ya tiene opciones de tienda
          const lastMsg = globalStore.messages[globalStore.messages.length - 1];
          if (lastMsg && lastMsg.sender === 'assistant' && lastMsg.storeOptions) {
            lastMsg.activeStoreId = found.storeId;
            lastMsg.activeStoreProducts = found.products;
            lastMsg.activeStoreName = found.storeName;
            notifyListeners();
            persistStateImmediately();
            return;
          }

          appendAssistantMessage(
            `Mostrando catálogo destacado de ${found.storeName} (${found.floorLabel || 'en el mall'}):`,
            {
              storeOptions: allOptions,
              activeStoreId: found.storeId,
              activeStoreProducts: found.products,
              activeStoreName: found.storeName,
              actionCta: {
                label: `Trazar ruta a ${found.storeName}`,
                actionType: 'navigate',
                targetId: found.storeId,
              },
            }
          );
          break;
        }

        case 'OPEN_PRODUCT_DETAIL': {
          if (!globalStore.selectedStore) return;
          const prod = globalStore.selectedStore.products.find(
            (p) => p.id === event.productId
          );
          if (prod) {
            globalStore.selectedProduct = prod;
            notifyListeners();
          }
          break;
        }

        case 'GO_BACK_TO_STORES': {
          const storeOpts = globalStore.selectedSubcategory
            ? getCatalogOptionsForSubcategory(globalStore.selectedSubcategory)
            : [];
          globalStore.state = 'MOSTRANDO_TIENDAS';
          appendAssistantMessage('Aquí tienes nuevamente las tiendas disponibles:', {
            storeOptions: storeOpts,
          });
          break;
        }

        case 'SELECT_STORE': {
          const allOptions = globalStore.selectedSubcategory
            ? getCatalogOptionsForSubcategory(globalStore.selectedSubcategory)
            : [];
          const storeOpt = allOptions.find((o) => o.storeId === event.storeId) || {
            storeId: event.storeId,
            storeName: 'Tienda Seleccionada',
            targetNodeId: 'node-67',
            products: [],
          };
          globalStore.selectedStore = storeOpt;

          globalStore.state = 'EN_RUTA_TIENDA';
          track('concierge_store_routed', {
            storeId: storeOpt.storeId,
            storeName: storeOpt.storeName,
          });
          appendAssistantMessage(
            `¡Perfecto! Te he trazado la ruta más rápida hacia ${storeOpt.storeName} (${storeOpt.floorLabel || 'en el mall'}).`,
            {
              actionCta: {
                label: `Guiarme a ${storeOpt.storeName}`,
                actionType: 'navigate',
                targetId: storeOpt.storeId,
              },
            }
          );
          break;
        }

        case 'RATE_PURCHASE': {
          globalStore.purchaseRating = event.rating;
          globalStore.state = 'OFRECIENDO_BEBIDA';
          appendAssistantMessage(
            `¡Gracias por calificar tu compra con ${event.rating} estrellas! (+50 Pts adicionales). Como cortesía por registrar tu compra, te invitamos a una bebida en McCafé. ¿Te provoca algo frío o caliente?`,
            {
              drinkWidget: {
                drinks: DRINKS,
              },
            }
          );
          break;
        }

        case 'SELECT_DRINK': {
          const drink = DRINKS.find((d) => d.id === event.drinkId) || DRINKS[0]!;
          globalStore.selectedDrink = drink;
          globalStore.state = 'ENCUESTA_FINAL';
          track('concierge_drink_selected', {
            drinkId: drink.id,
            drinkName: drink.name,
            storeName: drink.storeName,
          });
          appendAssistantMessage(
            `¡Excelente elección! Hemos emitido tu cortesía para "${drink.name}" en ${drink.storeName}. Para cerrar tu sesión de compras, ¿cómo calificarías la atención de tu Concierge IA hoy?`,
            {
              ratingWidget: {
                title: 'Califica la atención de tu Concierge IA',
                subtitle: 'Tu opinión nos ayuda a ofrecerte la mejor hospitalidad digital en Sambil Chacao.',
                type: 'concierge',
              },
              actionCta: {
                label: `Ver ruta a ${drink.storeName}`,
                actionType: 'navigate',
                targetId: drink.storeId,
              },
            }
          );
          break;
        }

        case 'RATE_CONCIERGE': {
          globalStore.conciergeRating = event.rating;
          globalStore.state = 'DESPEDIDA';
          appendAssistantMessage(
            `¡Muchísimas gracias por tu valoración de ${event.rating} estrellas! Ha sido un absoluto placer acompañarte en tu recorrido por Sambil Chacao.`,
            {
              farewellWidget: {
                pointsEarned: 150,
                drinkName: globalStore.selectedDrink?.name,
                storeName: globalStore.selectedDrink?.storeName,
              },
            }
          );
          break;
        }

        case 'START_NEW_SESSION': {
          resetConciergeToInitial();
          break;
        }

        case 'TOGGLE_ACCESSIBLE': {
          const nextVal = event.enabled !== undefined ? event.enabled : !getIsAccessibleMode();
          setGlobalAccessibleMode(nextVal);
          track('concierge_accessibility_activated', { enabled: nextVal });
          if (nextVal) {
            appendAssistantMessage(
              'He activado el Modo Accesible Global. Las rutas del mapa evitarán escaleras fijas y mecánicas, priorizando ascensores panorámicos y baños accesibles.',
              {
                actionCta: {
                  label: 'Ver mapa accesible',
                  actionType: 'navigate',
                  targetId: 'elev-pc-1',
                },
              }
            );
          } else {
            appendAssistantMessage(
              'Modo Accesible desactivado. Las rutas del mapa han vuelto a la configuración estándar con escaleras y rampas.',
              {
                categories: PARENT_CATEGORIES,
              }
            );
          }
          break;
        }

        case 'USER_MESSAGE': {
          const raw = event.text.trim();
          if (!raw) return;

          track('concierge_message_sent', { length: raw.length });

          const userMsg: ConciergeMessage = {
            id: `usr_${Date.now()}`,
            sender: 'user',
            text: raw,
            timestamp: formatTime(new Date()),
          };
          globalStore.messages = [...globalStore.messages, userMsg];
          notifyListeners();
          persistStateImmediately();
          setIsThinking(true);

          setTimeout(() => {
            const lower = raw.toLowerCase();

            // Detectar cancelación
            if (['cancelar', 'olvidalo', 'olvídalo', 'volver', 'no gracias', 'salir'].some((w) => lower.includes(w))) {
              setIsThinking(false);
              dispatch({ type: 'CANCEL' });
              return;
            }

            // Detectar desactivación de accesibilidad
            if (
              ['desactivar modo accesible', 'desactivar accesibilidad', 'quitar modo accesible', 'desactivar silla'].some((w) =>
                lower.includes(w)
              )
            ) {
              setIsThinking(false);
              dispatch({ type: 'TOGGLE_ACCESSIBLE', enabled: false });
              return;
            }

            // Detectar activación de accesibilidad
            if (
              ['activar modo accesible', 'modo accesible', 'activar accesibilidad', 'silla de ruedas', 'movilidad reducida', 'con coche de bebe', 'con cochecito'].some((w) =>
                lower.includes(w)
              )
            ) {
              setIsThinking(false);
              dispatch({ type: 'TOGGLE_ACCESSIBLE', enabled: true });
              return;
            }

            // Detectar respuesta en CONFIRMANDO_COMPRA
            if (globalStore.state === 'CONFIRMANDO_COMPRA') {
              setIsThinking(false);
              if (['si', 'sí', 'compre', 'compré', 'claro', 'listo', 'exacto'].some((w) => lower.includes(w))) {
                dispatch({ type: 'CONFIRM_PURCHASE_FOUND', found: true });
                return;
              }
              if (['no', 'nada', 'ningun', 'ningún'].some((w) => lower.includes(w))) {
                dispatch({ type: 'CONFIRM_PURCHASE_FOUND', found: false });
                return;
              }
              if (['solo', 'mirando', 'paseando', 'viendo'].some((w) => lower.includes(w))) {
                dispatch({ type: 'JUST_LOOKING' });
                return;
              }
            }

            // Detectar llegada manual a tienda
            if (['llegue', 'llegué', 'estoy en la tienda', 'estoy en zara', 'estoy en tienda'].some((w) => lower.includes(w))) {
              setIsThinking(false);
              dispatch({ type: 'STORE_ARRIVED', storeId: globalStore.selectedStore?.storeId || 'store-zara' });
              return;
            }

            const runLocalFallback = () => {
              // 1. Matching en los 12 Intents Informativos
              const infoMatch = findMatchingInfoIntent(raw);
              if (infoMatch) {
                track('concierge_intent_matched', {
                  intentId: infoMatch.id,
                  category: infoMatch.label,
                });
                const resp = isAccessible && infoMatch.accessibleResponse
                  ? infoMatch.accessibleResponse
                  : infoMatch.response;

                let actionCta: ConciergeMessage['actionCta'] = undefined;
                if (resp.actionType === 'route' && resp.targetNodeId) {
                  actionCta = {
                    label: resp.actionLabel || 'Trazar ruta en el mapa',
                    actionType: 'navigate',
                    targetId: resp.targetStoreId || resp.targetNodeId,
                  };
                } else if (resp.actionType === 'toggle') {
                  actionCta = {
                    label: isAccessible ? 'Desactivar modo accesible' : (resp.actionLabel || 'Activar modo accesible'),
                    actionType: 'toggle_accessible',
                  };
                } else if (resp.actionType === 'open_screen' && resp.actionPayload) {
                  actionCta = {
                    label: resp.actionLabel || 'Abrir',
                    actionType: 'open_screen',
                    payload: resp.actionPayload,
                  };
                }

                setIsThinking(false);
                appendAssistantMessage(resp.body, {
                  intent: infoMatch,
                  infoResponse: resp,
                  actionCta,
                });
                return;
              }

              // 2. Matching en Subcategorías Comerciales
              const matchedSub = SUBCATEGORIES.find((s) => {
                const normSearch = s.searchableText;
                const normInput = raw
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '');
                const inputWords = normInput.split(/\s+/);
                return inputWords.some((w) => w.length >= 3 && normSearch.includes(w));
              });

              if (matchedSub) {
                setIsThinking(false);
                dispatch({ type: 'SELECT_SUBCATEGORY', subcategoryId: matchedSub.id });
                return;
              }

              // 3. Fallback inteligente a categorías principales
              setIsThinking(false);
              appendAssistantMessage(
                `Entiendo que buscas "${raw}". Puedes elegir una categoría principal o consultarme por baños, Wi-Fi, horarios o estacionamiento:`,
                {
                  categories: PARENT_CATEGORIES,
                }
              );
            };

            // Intentar streaming con Gemini vía API del servidor con fallback transparente
            const apiMessages: ConciergeApiMessage[] = globalStore.messages
              .slice(-6)
              .map((m) => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text,
              }));

            const assistantMsgId = `bot_${Date.now()}`;
            let hasReceivedStreamedContent = false;
            let targetAssistantMsg: ConciergeMessage | null = null;

            streamConciergeChat({
              messages: apiMessages,
              mallId: 'sambil-chacao',
              onTextChunk: (chunk) => {
                if (!hasReceivedStreamedContent) {
                  hasReceivedStreamedContent = true;
                  setIsThinking(false);
                  targetAssistantMsg = {
                    id: assistantMsgId,
                    sender: 'assistant',
                    text: chunk,
                    timestamp: formatTime(new Date()),
                  };
                  globalStore.messages = [...globalStore.messages, targetAssistantMsg];
                } else if (targetAssistantMsg) {
                  targetAssistantMsg.text += chunk;
                  // Forzar actualización de inmutabilidad para re-renderizado
                  globalStore.messages = [...globalStore.messages];
                }
                notifyListeners();
              },
              onToolResult: (toolName, result) => {
                if (targetAssistantMsg && result && typeof result === 'object') {
                  const res = result as Record<string, unknown>;
                  if (toolName === 'getRoute' && res.storeId) {
                    targetAssistantMsg.actionCta = {
                      label: `Guiarme a ${res.storeName || 'la tienda'}`,
                      actionType: 'navigate',
                      targetId: String(res.storeId),
                    };
                  } else if (toolName === 'getStoreDetails' && res.id) {
                    targetAssistantMsg.actionCta = {
                      label: `Ver en el mapa`,
                      actionType: 'navigate',
                      targetId: String(res.id),
                    };
                  }
                  globalStore.messages = [...globalStore.messages];
                  notifyListeners();
                }
              },
              onDone: () => {
                setIsThinking(false);
                persistStateImmediately();
              },
              onError: () => {
                // Si la red falla o excede el timeout de 2s antes de emitir texto, conmutar a intents locales
                if (!hasReceivedStreamedContent) {
                  runLocalFallback();
                } else {
                  setIsThinking(false);
                  persistStateImmediately();
                }
              },
            }).catch(() => {
              if (!hasReceivedStreamedContent) {
                runLocalFallback();
              }
            });
          }, 300);
          break;
        }

        case 'RESET': {
          globalStore.state = 'ESPERA_ACTIVA';
          globalStore.selectedCategory = null;
          globalStore.selectedSubcategory = null;
          globalStore.selectedStore = null;
          globalStore.selectedDrink = null;
          globalStore.messages = [
            {
              id: `msg_welcome_${Date.now()}`,
              sender: 'assistant',
              text: '¡Hola de nuevo! ¿En qué puedo orientarte hoy en Sambil Chacao?',
              timestamp: formatTime(new Date()),
              categories: PARENT_CATEGORIES,
            },
          ];
          notifyListeners();
          persistStateImmediately();
          break;
        }
      }
    },
    [isAccessible, appendAssistantMessage]
  );

  const sendMessage = useCallback(
    (text: string) => {
      dispatch({ type: 'USER_MESSAGE', text });
    },
    [dispatch]
  );

  const clearChat = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return {
    state: storeState.state,
    messages: storeState.messages,
    selectedStore: storeState.selectedStore,
    selectedProduct: storeState.selectedProduct,
    isThinking,
    sendMessage,
    dispatch,
    clearChat,
    quickReplies: [
      { id: 'qr_shop_done', label: 'Registrar compra', icon: 'storefront', query: 'Ya llegué a la tienda y compré algo' },
      { id: 'qr_food', label: '¿Dónde comer?', icon: 'fast-food', query: '¿Dónde puedo comer o tomar un café?' },
      { id: 'qr_offers', label: 'Ofertas de hoy', icon: 'pricetag', query: '¿Cuáles son las mejores promociones y eventos de hoy?' },
      { id: 'qr_wc', label: 'Baños y accesos', icon: 'water', query: '¿Dónde están los baños y accesos para sillas de ruedas?' },
      { id: 'qr_kids', label: 'Modo Niño', icon: 'game-controller', query: '¿Cómo funciona el juego del tesoro de Modo Niño?' },
      { id: 'qr_parking', label: 'Estacionamiento', icon: 'car', query: '¿Cómo funciona el estacionamiento y dónde pago?' },
      { id: 'qr_wifi', label: 'Clave Wi-Fi', icon: 'wifi', query: '¿Cuál es la red Wi-Fi gratuita del mall?' },
    ],
  };
}
