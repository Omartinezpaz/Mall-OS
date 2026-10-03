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
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Circle, Defs, RadialGradient, LinearGradient, Stop, Path } from 'react-native-svg';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: { label: string; route?: string }[];
}

const QUICK_PROMPTS = [
  '¿Dónde puedo comer?',
  '¿Qué hay de nuevo hoy?',
  'Tengo 2 horas, ¿qué me recomiendas?',
  '¿Dónde está Nike?',
  '¿Hay ofertas activas hoy?',
];

export default function ConciergeScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: '¡Hola Daniela 👋!\n\n¿En qué puedo ayudarte hoy en el mall?',
      timestamp: 'Ahora',
    },
  ]);

  // Offline AI recommendation engine
  const generateOfflineResponse = (query: string): { text: string; actions?: { label: string; route?: string }[] } => {
    const q = query.toLowerCase();

    if (q.includes('comer') || q.includes('restaurante') || q.includes('café') || q.includes('panadería') || q.includes('comida') || q.includes('almorzar')) {
      return {
        text: '🍽️ Opciones gastronómicas recomendadas:\n\n• Panadería Los Cedros (PB-02): Café de especialidad, desayunos y pastelería.\n• Food Court (Nivel 1): Diversidad culinaria, almuerzos y comida rápida.\n\n¿Deseas activar un cupón o que te marque la ruta en el mapa?',
        actions: [
          { label: 'Ver en Mapa 🧭', route: '/(tabs)/mapa' },
          { label: 'Ver cupones de comida 🏷️', route: '/(tabs)/ofertas' },
        ],
      };
    }

    if (q.includes('nike') || q.includes('zapato') || q.includes('deporte') || q.includes('calzado') || q.includes('ropa deportiva')) {
      return {
        text: '👟 Nike Store está ubicada en el Nivel 1 (Local 102).\n\n⏱ Aprox. 2 minutos a pie desde la entrada principal.\n🏷️ Oferta activa hoy: 20% OFF en calzado y ropa deportiva seleccionada.',
        actions: [
          { label: 'Cómo llegar a Nike 🧭', route: '/(tabs)/mapa' },
          { label: 'Activar 20% OFF 🏷️', route: '/(tabs)/ofertas' },
        ],
      };
    }

    if (q.includes('oferta') || q.includes('descuento') || q.includes('cupón') || q.includes('cupon') || q.includes('promo')) {
      return {
        text: `🏷️ Promociones exclusivas disponibles hoy en el mall:\n\n• Nike (N1-102): 20% OFF en calzado y ropa.\n• Panadería Los Cedros (PB-02): Café + Pastel de cortesía.\n• Fitness Club (N1-01): Pase de cortesía de 1 día.`,
        actions: [
          { label: 'Explorar cupones ✨', route: '/(tabs)/ofertas' },
        ],
      };
    }

    if (q.includes('2 horas') || q.includes('recomiendas') || q.includes('tiempo') || q.includes('plan') || q.includes('tarde')) {
      return {
        text: `💡 Itinerario recomendado para hoy (2 horas):\n\n1. ☕ Café & Desayuno (30 min): Los Cedros en Planta Baja.\n2. 🛍️ Compras & Moda (50 min): Explora Nivel 1 (Nike, Zara) con 20% OFF.\n3. 🛒 Servicios & Hogar (40 min): Supermercado San Diego en PB.`,
        actions: [
          { label: 'Abrir Plano del Mall 🗺️', route: '/(tabs)/mapa' },
          { label: 'Ver Cupones Activos 🏷️', route: '/(tabs)/ofertas' },
        ],
      };
    }

    return {
      text: `🏢 En Mall del Sol contamos con las mejores tiendas y gastronomía organizadas en Planta Baja y Nivel 1. Puedes preguntarme por tiendas, promociones del día, cómo llegar a un local o sugerencias de itinerario.`,
      actions: [
        { label: 'Ver Directorio Completo 📋', route: '/(tabs)/directorio' },
        { label: 'Ver Ofertas del Día ✨', route: '/(tabs)/ofertas' },
      ],
    };
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
      const response = generateOfflineResponse(text);
      const botMessage: Message = {
        id: `b_${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: response.actions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: '¡Hola Daniela 👋!\n\n¿En qué puedo ayudarte hoy en el mall?',
        timestamp: 'Ahora',
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.8}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mall Concierge</Text>
          <Text style={styles.headerSubtitle}>Tu asistente personal en el mall</Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset} activeOpacity={0.8}>
          <Text style={styles.resetButtonText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* 3D Glowing Crystal Orb Visual (Screen 8 Mockup) */}
      <View style={styles.orbContainer}>
        <Svg width={96} height={96} viewBox="0 0 120 120">
          <Defs>
            <RadialGradient id="outerGlowLight" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
              <Stop offset="70%" stopColor="#C7D2FE" stopOpacity="0.1" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="sphereGradLight" cx="35%" cy="30%" r="65%">
              <Stop offset="0%" stopColor="#EEF2FF" stopOpacity="1" />
              <Stop offset="30%" stopColor="#6366F1" stopOpacity="1" />
              <Stop offset="70%" stopColor="#4338CA" stopOpacity="1" />
              <Stop offset="100%" stopColor="#312E81" stopOpacity="1" />
            </RadialGradient>
            <LinearGradient id="ringGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <Stop offset="50%" stopColor="#818CF8" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
            </LinearGradient>
          </Defs>

          <Circle cx="60" cy="60" r="56" fill="url(#outerGlowLight)" />
          <Path
            d="M 18,62 A 44 14 0 1,0 102,62 A 44 14 0 1,0 18,62"
            fill="none"
            stroke="url(#ringGradLight)"
            strokeWidth="3"
            transform="rotate(-15 60 60)"
            opacity="0.8"
          />
          <Circle cx="60" cy="60" r="32" fill="url(#sphereGradLight)" />
          <Circle cx="50" cy="48" r="8" fill="#FFFFFF" opacity="0.6" />
          <Circle cx="47" cy="45" r="3" fill="#FFFFFF" opacity="0.9" />
        </Svg>
      </View>

      {/* Message Stream */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }: { item: Message }) => {
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

              {/* Action Buttons if generated by assistant */}
              {item.quickActions && item.quickActions.length > 0 && (
                <View style={styles.actionsRow}>
                  {item.quickActions.map((action: { label: string; route?: string }, idx: number) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.actionChip}
                      onPress={() => action.route && router.push(action.route as any)}
                    >
                      <Text style={styles.actionChipText}>{action.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          );
        }}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingBubble}>
              <ActivityIndicator size="small" color="#4F46E5" />
              <Text style={styles.loadingText}>Concierge está pensando...</Text>
            </View>
          ) : null
        }
      />

      {/* Suggested Prompts Carousel (Screen 8 Chips) */}
      <View style={styles.promptsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promptsScroll}
        >
          {QUICK_PROMPTS.map((prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptChip}
              onPress={() => handleSendMessage(prompt)}
              activeOpacity={0.7}
            >
              <Text style={styles.promptChipText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Text Input Bar */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Escribe tu consulta..."
          placeholderTextColor="#94A3B8"
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
          activeOpacity={0.85}
        >
          <Text style={styles.sendButtonText}>➔</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 16,
  },
  orbContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  messagesList: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 12,
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
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  botText: {
    color: '#0F172A',
    fontSize: 14,
    lineHeight: 21,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  actionChip: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  actionChipText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '700',
  },
  timestamp: {
    color: '#94A3B8',
    fontSize: 10,
    marginHorizontal: 4,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  loadingText: {
    color: '#64748B',
    fontSize: 12,
  },
  promptsContainer: {
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  promptsScroll: {
    paddingHorizontal: 18,
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  promptChipText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    fontSize: 14,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#4F46E5',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
});

