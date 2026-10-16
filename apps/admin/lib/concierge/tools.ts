import { type FunctionDeclaration, Type } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import mallData from './data/mall-data.json';
import type {
  StoreResult,
  OfferResult,
  RouteResult,
} from './types';
import {
  searchStoresSchema,
  getStoreDetailsSchema,
  getOffersSchema,
  getRouteSchema,
} from './types';

// ============================================================================
// CLIENTE SUPABASE OPCIONAL CON TIMEOUT Y CIRCUIT BREAKER
// ============================================================================

const SUPABASE_TIMEOUT_MS = 1000;
let supabaseCooldownUntil = 0;

function getSupabaseClient() {
  const now = Date.now();
  if (now < supabaseCooldownUntil) {
    return null; // Enfriamiento activo tras timeout o fallo previo
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || key.includes('tu-') || url.includes('tu-proyecto')) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

function markSupabaseUnavailable() {
  supabaseCooldownUntil = Date.now() + 30 * 1000; // 30 segundos de enfriamiento
}

async function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T | null> {
  let timer: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });

  try {
    const result = await Promise.race([Promise.resolve(promise), timeoutPromise]);
    if (timer) clearTimeout(timer);
    return result;
  } catch {
    if (timer) clearTimeout(timer);
    return null;
  }
}

// Helper para normalizar texto eliminando tildes y mayúsculas
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

interface LocalStoreItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  floor: string;
  unit: string;
  openingHours: string;
  description: string;
  phone?: string;
}

interface LocalOfferItem {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  benefitLabel: string;
  description?: string;
}

interface LocalMallItem {
  id: string;
  slug: string;
  name: string;
  city: string;
  floors: string[];
  stores: LocalStoreItem[];
  offers?: LocalOfferItem[];
}

// Obtener datos del centro comercial local
function getLocalMall(mallId: string): LocalMallItem {
  const normalizedId = normalize(mallId);
  const found = (mallData.malls as LocalMallItem[]).find(
    (m) =>
      m.id.toLowerCase() === normalizedId ||
      m.slug.toLowerCase() === normalizedId ||
      normalize(m.name).includes(normalizedId)
  );

  return found || (mallData.malls[0] as LocalMallItem);
}

// ============================================================================
// DECLARACIONES DE HERRAMIENTAS PARA GEMINI (@google/genai)
// ============================================================================

export const searchStoresToolDeclaration: FunctionDeclaration = {
  name: 'searchStores',
  description: 'Busca tiendas y locales comerciales en el mall por nombre, producto, categoría o piso.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'Término de búsqueda, nombre de tienda, producto o rubro (ej. ZARA, café, zapatos, farmacia)',
      },
      category: {
        type: Type.STRING,
        description: 'Categoría opcional (ej. moda, gastronomia, tecnologia, salud, deportes)',
      },
      floor: {
        type: Type.STRING,
        description: 'Nivel o piso del centro comercial (ej. Planta Baja, Nivel Feria, Nivel Acuario)',
      },
    },
    required: ['query'],
  },
};

export const getStoreDetailsToolDeclaration: FunctionDeclaration = {
  name: 'getStoreDetails',
  description: 'Obtiene información detallada de una tienda: ubicación exacta, horario, teléfono y descripción.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      storeId: {
        type: Type.STRING,
        description: 'Identificador único o slug de la tienda (ej. zara, farmatodo, s0000000-0000-0000-0000-000000000001)',
      },
    },
    required: ['storeId'],
  },
};

export const getOffersToolDeclaration: FunctionDeclaration = {
  name: 'getOffers',
  description: 'Consulta promociones, descuentos y cupones vigentes en las tiendas del mall.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      storeId: {
        type: Type.STRING,
        description: 'ID o slug opcional de una tienda específica para filtrar sus ofertas',
      },
      category: {
        type: Type.STRING,
        description: 'Categoría opcional para filtrar ofertas',
      },
    },
  },
};

export const getRouteToolDeclaration: FunctionDeclaration = {
  name: 'getRoute',
  description: 'Calcula las instrucciones de orientación o ruta para llegar a una tienda dentro del mall.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      targetStoreId: {
        type: Type.STRING,
        description: 'ID o slug de la tienda a la que el visitante desea dirigirse',
      },
      originFloor: {
        type: Type.STRING,
        description: 'Piso o nivel de origen donde se encuentra el visitante (opcional)',
      },
    },
    required: ['targetStoreId'],
  },
};

export const CONCIERGE_TOOLS: FunctionDeclaration[] = [
  searchStoresToolDeclaration,
  getStoreDetailsToolDeclaration,
  getOffersToolDeclaration,
  getRouteToolDeclaration,
];

// ============================================================================
// IMPLEMENTACIÓN HÍBRIDA DE EJECUCIÓN (SUPABASE + FALLBACK JSON LOCAL)
// ============================================================================

export async function executeSearchStores(
  mallId: string,
  rawArgs: unknown
): Promise<StoreResult[]> {
  const args = searchStoresSchema.parse(rawArgs);
  const q = normalize(args.query);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const queryBuilder = supabase
        .from('stores')
        .select('id, name, slug, description, floor, unit, phone, opening_hours, categories(name)')
        .eq('mall_id', mallId)
        .ilike('name', `%${args.query}%`)
        .limit(5);

      const response = await withTimeout(queryBuilder, SUPABASE_TIMEOUT_MS);

      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((row: Record<string, unknown>) => ({
          id: String(row.id),
          name: String(row.name),
          category: (row.categories as { name?: string } | null)?.name || 'Comercio',
          floor: (row.floor as string | number) ?? 'PB',
          unit: row.unit ? String(row.unit) : undefined,
          description: row.description ? String(row.description) : undefined,
          phone: row.phone ? String(row.phone) : undefined,
        }));
      }

      if (!response) {
        markSupabaseUnavailable();
      }
    } catch {
      markSupabaseUnavailable();
    }
  }

  // Fallback a mall-data.json
  const mall = getLocalMall(mallId);
  const matched = mall.stores.filter((s) => {
    const matchName = normalize(s.name).includes(q);
    const matchCat = s.category && normalize(s.category).includes(q);
    const matchDesc = s.description && normalize(s.description).includes(q);
    return matchName || matchCat || matchDesc;
  });

  return matched.slice(0, 5).map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    floor: s.floor,
    unit: s.unit,
    description: s.description,
    openingHours: s.openingHours,
    phone: s.phone,
  }));
}

export async function executeGetStoreDetails(
  mallId: string,
  rawArgs: unknown
): Promise<StoreResult | null> {
  const args = getStoreDetailsSchema.parse(rawArgs);
  const targetId = normalize(args.storeId);

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const queryBuilder = supabase
        .from('stores')
        .select('id, name, slug, description, floor, unit, phone, opening_hours, categories(name)')
        .eq('mall_id', mallId)
        .or(`id.eq.${args.storeId},slug.eq.${args.storeId}`)
        .maybeSingle();

      const response = await withTimeout(queryBuilder, SUPABASE_TIMEOUT_MS);

      if (response && response.data) {
        const row = response.data as Record<string, unknown>;
        return {
          id: String(row.id),
          name: String(row.name),
          category: (row.categories as { name?: string } | null)?.name || 'Comercio',
          floor: (row.floor as string | number) ?? 'PB',
          unit: row.unit ? String(row.unit) : undefined,
          description: row.description ? String(row.description) : undefined,
          phone: row.phone ? String(row.phone) : undefined,
        };
      }

      if (!response) {
        markSupabaseUnavailable();
      }
    } catch {
      markSupabaseUnavailable();
    }
  }

  // Fallback local
  const mall = getLocalMall(mallId);
  const store = mall.stores.find(
    (s) =>
      s.id.toLowerCase() === targetId ||
      s.slug.toLowerCase() === targetId ||
      normalize(s.name).includes(targetId)
  );

  if (!store) return null;

  return {
    id: store.id,
    name: store.name,
    category: store.category,
    floor: store.floor,
    unit: store.unit,
    description: store.description,
    openingHours: store.openingHours,
    phone: store.phone,
  };
}

export async function executeGetOffers(
  mallId: string,
  rawArgs: unknown
): Promise<OfferResult[]> {
  const args = getOffersSchema.parse(rawArgs || {});

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      let queryBuilder = supabase
        .from('offers')
        .select('id, store_id, title, description, benefit_label, starts_at, ends_at, stores(name)')
        .eq('mall_id', mallId)
        .eq('status', 'active');

      if (args.storeId) {
        queryBuilder = queryBuilder.eq('store_id', args.storeId);
      }

      const response = await withTimeout(queryBuilder.limit(5), SUPABASE_TIMEOUT_MS);

      if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data.map((row: Record<string, unknown>) => ({
          id: String(row.id),
          storeId: String(row.store_id),
          storeName: (row.stores as { name?: string } | null)?.name || 'Tienda',
          title: String(row.title),
          description: row.description ? String(row.description) : undefined,
          benefitLabel: String(row.benefit_label),
          startsAt: row.starts_at ? String(row.starts_at) : undefined,
          endsAt: row.ends_at ? String(row.ends_at) : undefined,
        }));
      }

      if (!response) {
        markSupabaseUnavailable();
      }
    } catch {
      markSupabaseUnavailable();
    }
  }

  // Fallback local
  const mall = getLocalMall(mallId);
  let offers = mall.offers || [];

  if (args.storeId) {
    const sid = normalize(args.storeId);
    offers = offers.filter((o) => normalize(o.storeId).includes(sid));
  }

  return offers.slice(0, 5).map((o) => ({
    id: o.id,
    storeId: o.storeId,
    storeName: o.storeName,
    title: o.title,
    benefitLabel: o.benefitLabel,
    description: o.description,
  }));
}

export async function executeGetRoute(
  mallId: string,
  rawArgs: unknown
): Promise<RouteResult | null> {
  const args = getRouteSchema.parse(rawArgs);
  const store = await executeGetStoreDetails(mallId, { storeId: args.targetStoreId });

  if (!store) {
    return null;
  }

  const floorStr = String(store.floor);
  const instructions: string[] = [];

  if (args.originFloor && args.originFloor !== floorStr) {
    instructions.push(`Toma el ascensor panorámico o escaleras mecánicas hacia ${floorStr}.`);
  } else {
    instructions.push(`Dirígete por el pasillo central en ${floorStr}.`);
  }

  if (store.unit) {
    instructions.push(`Localiza el local comercial ${store.unit}.`);
  }
  instructions.push(`La entrada principal de ${store.name} estará a tu vista.`);

  return {
    storeId: store.id,
    storeName: store.name,
    targetFloor: floorStr,
    instructions,
    estimatedMinutes: 2,
  };
}

/**
 * Despachador universal de herramientas para Gemini.
 */
export async function executeConciergeTool(
  mallId: string,
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  switch (toolName) {
    case 'searchStores':
      return await executeSearchStores(mallId, args);
    case 'getStoreDetails':
      return await executeGetStoreDetails(mallId, args);
    case 'getOffers':
      return await executeGetOffers(mallId, args);
    case 'getRoute':
      return await executeGetRoute(mallId, args);
    default:
      throw new Error(`Herramienta desconocida: ${toolName}`);
  }
}
