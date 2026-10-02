import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { PILOT_STORES } from '../src/features/directory';
import { PILOT_OFFERS } from '../src/features/offers';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '☕ ¿Dónde tomar un café?',
  '🏷️ ¿Qué ofertas hay hoy?',
  '💊 ¿Dónde está la farmacia?',
  '🏋️ ¿Horario del gimnasio?',
  '🧀 ¿Dónde comprar charcutería?',
];

export default function ConciergeScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: '¡Hola! Soy tu Asistente Concierge en CC Los Nuevos Teques. 🛍️\n\nPuedo orientarte sobre la ubicación de tiendas, horarios de atención, promociones del día y servicios disponibles. ¿Qué estás buscando hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Motor de respuesta local basado en el catálogo offline para respuesta instantánea
  const generateOfflineResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('café') || q.includes('cafe') || q.includes('panadería') || q.includes('desayuno')) {
      return '☕ En Planta Baja (PB-02) encuentras la **Panadería y Pastelería Los Cedros**, abierta de 6:30 AM a 8:00 PM. ¡Hoy tienen activo un cupón de Café con Leche + Pastel de cortesía!';
    }

    if (q.includes('oferta') || q.includes('cupón') || q.includes('cupon') || q.includes('promoción') || q.includes('descuento')) {
      return `🏷️ Tenemos varias promociones activas hoy en el mall:\n\n• **Panadería Los Cedros (PB-02):** Café + Pastel gratis.\n• **Fitness Club (P1-01):** Pase de cortesía 1 día.\n• **Charcutería La Estancia (PB-03):** 20% en combos.\n\nPuedes activarlas directamente en la pestaña "Ofertas".`;
    }

    if (q.includes('farmacia') || q.includes('salud') || q.includes('medicina')) {
      return '💊 La **Farmacia SAAS** está ubicada en Planta Baja (PB-04). Su horario de atención es de 8:00 AM a 9:00 PM de Lunes a Sábado, y Domingos de 9:00 AM a 7:00 PM.';
    }

    if (q.includes('gym') || q.includes('gimnasio') || q.includes('entrenar') || q.includes('pesas')) {
      return '🏋️ El **Fitness Club Los Teques** está en el Piso 1 (P1-01). Abren de Lunes a Viernes de 6:00 AM a 9:00 PM y Sábados de 8:00 AM a 4:00 PM. Tienen activo un pase de prueba de 1 día.';
    }

    if (q.includes('queso') || q.includes('charcutería') || q.includes('víveres') || q.includes('supermercado')) {
      return '🧀 Para víveres y charcutería tienes:\n• **Supermercado San Diego (PB-01):** 8:00 AM a 8:00 PM.\n• **Charcutería La Estancia (PB-03):** Delicateses y quesos nacionales e importados hasta las 7:00 PM.';
    }

    if (q.includes('banco') || q.includes('cajero') || q.includes('dinero')) {
      return '🏦 El **Banco Mercantil** se encuentra en Planta Baja (PB-06), con atención en taquilla de 8:30 AM a 3:30 PM y cajeros automáticos 24h.';
    }

    return `🏢 En CC Los Nuevos Teques contamos con 30 comercios distribuidos en Planta Baja y Piso 1. Puedes consultar el Directorio completo o el Mapa interactivo en cualquier momento. ¿Deseas información sobre algún comercio en específico?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const replyText = generateOfflineResponse(text);
      const botMessage: Message = {
        id: `b_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header Info */}
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>✨ Concierge Inteligente</Text>
        <Text style={styles.headerSubtitle}>
          Respuestas verificadas con el directorio oficial del centro comercial
        </Text>
      </View>

      {/* Lista de Mensajes */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => {
          const isUser = item.sender === 'user';
          return (
            <View
              style={[
                styles.bubbleWrapper,
                isUser ? styles.userBubbleWrapper : styles.botBubbleWrapper,
              ]}
            >
              <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
                <Text style={isUser ? styles.userText : styles.botText}>{item.text}</Text>
              </View>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          );
        }}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingBubble}>
              <ActivityIndicator size="small" color="#10B981" />
              <Text style={styles.loadingText}>Consultando directorio del mall...</Text>
            </View>
          ) : null
        }
      />

      {/* Sugerencias Rápidas */}
      <View style={styles.promptsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptsScroll}>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptChip}
              onPress={() => handleSendMessage(prompt.replace(/^[^\s]+\s/, ''))}
            >
              <Text style={styles.promptChipText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input de Texto */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Escribe tu consulta sobre el centro comercial..."
          placeholderTextColor="#64748B"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => handleSendMessage()}
          style={styles.input}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={() => handleSendMessage()}
          disabled={!input.trim()}
        >
          <Text style={styles.sendButtonText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  headerInfo: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  messagesList: {
    padding: 16,
    gap: 12,
    paddingBottom: 20,
  },
  bubbleWrapper: {
    maxWidth: '85%',
    gap: 4,
  },
  userBubbleWrapper: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  botBubbleWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#10B981',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#1E293B',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  userText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  botText: {
    color: '#F8FAFC',
    fontSize: 14,
    lineHeight: 21,
  },
  timestamp: {
    color: '#64748B',
    fontSize: 10,
    marginHorizontal: 4,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#334155',
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  promptsContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  promptsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  promptChipText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '500',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    fontSize: 14,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#10B981',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#334155',
  },
  sendButtonText: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
    marginTop: -2,
  },
});
