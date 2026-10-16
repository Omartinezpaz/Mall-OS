import { z } from 'zod';

// ============================================================================
// MENSAJES Y ROLES DE CONVERSACIÓN
// ============================================================================

export type MessageRole = 'user' | 'assistant' | 'system' | 'model';

export interface ConciergeMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp?: number;
}

// ============================================================================
// ESQUEMAS ZOD PARA HERRAMIENTAS (FUNCTION CALLING)
// ============================================================================

export const searchStoresSchema = z.object({
  query: z.string().describe('Término de búsqueda, nombre de tienda, producto o categoría (ej. ZARA, zapatos, café)'),
  category: z.string().optional().describe('Categoría opcional (ej. moda, gastronomia, tecnologia, salud)'),
  floor: z.string().optional().describe('Nivel o piso del centro comercial si el usuario lo especificó'),
});

export type SearchStoresArgs = z.infer<typeof searchStoresSchema>;

export const getStoreDetailsSchema = z.object({
  storeId: z.string().describe('Identificador único o slug de la tienda (ej. zara, farmatodo, local_38)'),
});

export type GetStoreDetailsArgs = z.infer<typeof getStoreDetailsSchema>;

export const getOffersSchema = z.object({
  storeId: z.string().optional().describe('ID de tienda para filtrar ofertas específicas'),
  category: z.string().optional().describe('Categoría para filtrar ofertas'),
});

export type GetOffersArgs = z.infer<typeof getOffersSchema>;

export const getRouteSchema = z.object({
  targetStoreId: z.string().describe('ID o slug de la tienda de destino'),
  originFloor: z.string().optional().describe('Piso o ubicación de origen si se conoce'),
});

export type GetRouteArgs = z.infer<typeof getRouteSchema>;

// ============================================================================
// RESULTADOS DE HERRAMIENTAS
// ============================================================================

export interface StoreResult {
  id: string;
  name: string;
  category: string;
  floor: string | number;
  unit?: string;
  description?: string;
  openingHours?: string;
  phone?: string;
}

export interface OfferResult {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  description?: string;
  benefitLabel: string;
  startsAt?: string;
  endsAt?: string;
}

export interface RouteResult {
  storeId: string;
  storeName: string;
  targetFloor: string;
  instructions: string[];
  estimatedMinutes: number;
}

// ============================================================================
// EVENTOS DE STREAMING SSE
// ============================================================================

export type SSEEventType = 'text' | 'tool_call' | 'tool_result' | 'done' | 'error';

export interface SSEEventText {
  type: 'text';
  text: string;
}

export interface SSEEventToolCall {
  type: 'tool_call';
  toolName: string;
  args: Record<string, unknown>;
}

export interface SSEEventToolResult {
  type: 'tool_result';
  toolName: string;
  result: unknown;
}

export interface SSEEventDone {
  type: 'done';
}

export interface SSEEventError {
  type: 'error';
  error: string;
}

export type ConciergeEvent =
  | SSEEventText
  | SSEEventToolCall
  | SSEEventToolResult
  | SSEEventDone
  | SSEEventError;

// ============================================================================
// INTERFAZ DE PROVEEDOR DE IA (RULES.md §7)
// ============================================================================

export interface ChatCompletionOptions {
  mallId: string;
  messages: ConciergeMessage[];
  maxTokens?: number;
  temperature?: number;
}

export interface AiProvider {
  name: string;
  streamChat(options: ChatCompletionOptions): AsyncGenerator<ConciergeEvent, void, unknown>;
}
