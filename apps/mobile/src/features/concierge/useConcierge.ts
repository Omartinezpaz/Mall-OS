import { useState, useCallback } from 'react';
import {
  type ConciergeIntent,
  type ConciergeStoreSuggestion,
  findMatchingIntent,
  CONCIERGE_QUICK_REPLIES,
} from './concierge-data';

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  intent?: ConciergeIntent | null;
  stores?: ConciergeStoreSuggestion[];
  actionCta?: {
    label: string;
    actionType: 'navigate' | 'kids_mode' | 'offers' | 'directory';
    targetId?: string;
  };
}

const INITIAL_MESSAGES: ConciergeMessage[] = [
  {
    id: 'msg_welcome',
    sender: 'assistant',
    text: '¡Hola! Soy tu Concierge IA del Mall. ¿En qué te puedo ayudar hoy? Puedes preguntarme por restaurantes, baños, ofertas de hoy, cartelera de cine o tiendas.',
    timestamp: formatTime(new Date()),
  },
];

function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function useConcierge() {
  const [messages, setMessages] = useState<ConciergeMessage[]>(INITIAL_MESSAGES);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const sendMessage = useCallback((queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    const userMsgId = `user_${Date.now()}`;
    const userMessage: ConciergeMessage = {
      id: userMsgId,
      sender: 'user',
      text: trimmed,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    // Simulación de latencia de IA (700ms)
    setTimeout(() => {
      const match = findMatchingIntent(trimmed);

      let replyText = '';
      let replyStores: ConciergeStoreSuggestion[] | undefined = undefined;
      let replyCta: ConciergeMessage['actionCta'] = undefined;

      if (match) {
        replyText = match.replyMessage;
        replyStores = match.stores;
        replyCta = match.actionCta;
      } else {
        replyText = `Entiendo que buscas "${trimmed}". Te sugiero consultar nuestro Directorio interactivo por pisos o acercarte al Módulo de Información en Nivel Autopista.`;
        replyCta = {
          label: 'Ver Directorio General',
          actionType: 'directory',
        };
      }

      const botMessage: ConciergeMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: formatTime(new Date()),
        intent: match,
        stores: replyStores,
        actionCta: replyCta,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsThinking(false);
    }, 700);
  }, []);

  const clearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setIsThinking(false);
  }, []);

  return {
    messages,
    isThinking,
    sendMessage,
    clearChat,
    quickReplies: CONCIERGE_QUICK_REPLIES,
  };
}
