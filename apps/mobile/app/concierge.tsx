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
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

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
  '¿Dónde está Nike?',
  '¿Hay ofertas activas?',
  'Tengo 2 horas, ¿qué me recomiendas?',
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
      text: '¡Hola Daniela! 👋\n\nSoy el asistente virtual de Mall OS. ¿En qué te puedo ayudar hoy?',
      timestamp: '11:26 a. m.',
    },
  ]);

  // Offline AI recommendation engine
  const generateOfflineResponse = (query: string): { text: string; actions?: { label: string; route?: string }[] } => {
    const q = query.toLowerCase();

    if (q.includes('comer') || q.includes('restaurante') || q.includes('café') || q.includes('panadería') || q.includes('comida') || q.includes('almorzar')) {
      return {
        text: '🍽️ *Opciones gastronómicas recomendadas:*\n\n• *Panadería Los Cedros* (PB-02): Café de especialidad, desayunos y pastelería.\n• *Food Court* (Nivel 1): Variedad culinaria y comida rápida.\n\n¿Deseas activar un cupón o ver la ruta en el mapa?',
        actions: [
          { label: '🧭 Ver en Mapa', route: '/(tabs)/mapa' },
          { label: '🏷️ Ver Cupones de Comida', route: '/(tabs)/ofertas' },
        ],
      };
    }

    if (q.includes('nike') || q.includes('zapato') || q.includes('deporte') || q.includes('calzado') || q.includes('ropa deportiva')) {
      return {
        text: '👟 *Nike Store* está ubicada en el *Nivel 1 (Local 102)*.\n\n⏱️ Aprox. 2 minutos a pie.\n🏷️ *20% OFF* en calzado seleccionado hoy.',
        actions: [
          { label: '🧭 Cómo llegar a Nike', route: '/(tabs)/mapa' },
          { label: '🏷️ Activar 20% OFF', route: '/(tabs)/ofertas' },
        ],
      };
    }

    if (q.includes('oferta') || q.includes('descuento') || q.includes('cupón') || q.includes('cupon') || q.includes('promo')) {
      return {
        text: `🏷️ *Promociones activas hoy en el mall:*\n\n• *Nike* (Nivel 1): 20% OFF en calzado.\n• *Los Cedros* (PB): Café + Pastel de cortesía.\n• *Fitness Club* (N1): Pase gratis de 1 día.`,
        actions: [
          { label: '✨ Explorar Cupones', route: '/(tabs)/ofertas' },
        ],
      };
    }

    if (q.includes('2 horas') || q.includes('recomiendas') || q.includes('tiempo') || q.includes('plan') || q.includes('tarde')) {
      return {
        text: `💡 *Itinerario recomendado (2 horas):*\n\n1. ☕ *Café & Desayuno* (30 min): Los Cedros en PB.\n2. 🛍️ *Compras & Moda* (50 min): Explora Nivel 1 (Nike, Zara) con descuentos.\n3. 🛒 *Hogar & Mercado* (40 min): Supermercado en PB.`,
        actions: [
          { label: '🗺️ Abrir Mapa 2.5D', route: '/(tabs)/mapa' },
          { label: '🏷️ Ver Cupones', route: '/(tabs)/ofertas' },
        ],
      };
    }

    return {
      text: `🏢 En *Mall OS* encuentras todas las tiendas, ofertas y navegación paso a paso. Puedes preguntarme por tiendas específicas, cómo llegar, o promociones activas.`,
      actions: [
        { label: '📋 Directorio de Tiendas', route: '/(tabs)/directorio' },
        { label: '✨ Ver Ofertas', route: '/(tabs)/ofertas' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: timeStr,
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
        text: '¡Hola Daniela! 👋\n\nSoy el asistente virtual de Mall OS. ¿En qué te puedo ayudar hoy?',
        timestamp: '11:26 a. m.',
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />

      {/* WhatsApp Header Bar */}
      <View style={styles.whatsAppHeader}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.headerBackArrow}>←</Text>
          {/* Avatar con icono bot / concierge */}
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🤖</Text>
            <View style={styles.onlineBadge} />
          </View>
        </TouchableOpacity>

        <View style={styles.headerInfoCol}>
          <Text style={styles.headerContactName}>Mall Concierge</Text>
          <Text style={styles.headerStatusText}>en línea</Text>
        </View>

        <View style={styles.headerActionsRow}>
          <TouchableOpacity style={styles.headerActionIcon} onPress={handleReset} activeOpacity={0.7}>
            <Text style={styles.headerActionEmoji}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area with WhatsApp Texture / Tone */}
      <View style={styles.chatBackground}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            <View style={styles.chatHeaderAnnouncements}>
              {/* WhatsApp Date Chip */}
              <View style={styles.dateChip}>
                <Text style={styles.dateChipText}>HOY</Text>
              </View>

              {/* WhatsApp Security / Info Banner */}
              <View style={styles.encryptionCard}>
                <Text style={styles.encryptionIcon}>🔒</Text>
                <Text style={styles.encryptionText}>
                  Asistente inteligente oficial de Mall OS. Las respuestas se procesan con datos verificados del mall.
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }: { item: Message }) => {
            const isUser = item.sender === 'user';
            return (
              <View
                style={[
                  styles.messageRow,
                  isUser ? styles.messageRowUser : styles.messageRowAssistant,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isUser ? styles.bubbleUser : styles.bubbleAssistant,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>

                  {/* WhatsApp Quick Reply Buttons for Bot */}
                  {item.quickActions && item.quickActions.length > 0 && (
                    <View style={styles.buttonsContainer}>
                      {item.quickActions.map((action, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.actionButton}
                          onPress={() => action.route && router.push(action.route as any)}
                          activeOpacity={0.75}
                        >
                          <Text style={styles.actionButtonText}>{action.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Timestamp + Double Checkmarks */}
                  <View style={styles.timestampRow}>
                    <Text style={styles.timestampText}>{item.timestamp}</Text>
                    {isUser && <Text style={styles.blueCheckmarks}>✓✓</Text>}
                  </View>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            loading ? (
              <View style={styles.typingBubble}>
                <ActivityIndicator size="small" color="#075E54" />
                <Text style={styles.typingText}>Escribiendo...</Text>
              </View>
            ) : null
          }
        />

        {/* Suggested Quick Prompts Pills */}
        <View style={styles.quickPromptsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickPromptsScroll}
          >
            {QUICK_PROMPTS.map((prompt, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.quickPromptPill}
                onPress={() => handleSendMessage(prompt)}
                activeOpacity={0.75}
              >
                <Text style={styles.quickPromptText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* WhatsApp Bottom Input Bar */}
        <View style={styles.inputContainer}>
          <View style={styles.inputPill}>
            <TouchableOpacity style={styles.inputIconBtn}>
              <Text style={styles.inputIconText}>😊</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Mensaje"
              placeholderTextColor="#8696A0"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={() => handleSendMessage()}
              style={styles.textInput}
              returnKeyType="send"
              multiline
            />

            <TouchableOpacity style={styles.inputIconBtn}>
              <Text style={styles.inputIconText}>📎</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendCircleBtn,
              input.trim() ? styles.sendCircleBtnActive : styles.sendCircleBtnMic,
            ]}
            onPress={() => handleSendMessage()}
            activeOpacity={0.85}
          >
            {input.trim() ? (
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M22 2L11 13" />
                <Path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </Svg>
            ) : (
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <Path d="M12 19v4" />
                <Path d="M8 23h8" />
              </Svg>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#075E54',
  },
  whatsAppHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    paddingTop: 48,
    paddingBottom: 10,
    paddingHorizontal: 8,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerBackArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#128C7E',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#25D366',
    borderWidth: 1.5,
    borderColor: '#075E54',
  },
  headerInfoCol: {
    flex: 1,
    marginLeft: 4,
  },
  headerContactName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerStatusText: {
    color: '#D1FAE5',
    fontSize: 11,
  },
  headerActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 6,
  },
  headerActionIcon: {
    padding: 6,
  },
  headerActionEmoji: {
    fontSize: 18,
  },
  chatBackground: {
    flex: 1,
    backgroundColor: '#EFEAE2',
  },
  messagesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  chatHeaderAnnouncements: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  dateChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  dateChipText: {
    color: '#54656F',
    fontSize: 11,
    fontWeight: '700',
  },
  encryptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
    maxWidth: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  encryptionIcon: {
    fontSize: 11,
  },
  encryptionText: {
    flex: 1,
    color: '#54656F',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 14,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAssistant: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleAssistant: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 2,
  },
  bubbleUser: {
    backgroundColor: '#D9FDD3',
    borderTopRightRadius: 2,
  },
  messageText: {
    color: '#111B21',
    fontSize: 14.5,
    lineHeight: 19,
  },
  buttonsContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 4,
    gap: 4,
  },
  actionButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#008069',
    fontSize: 12,
    fontWeight: '700',
  },
  timestampRow: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
  },
  timestampText: {
    color: '#667781',
    fontSize: 10,
  },
  blueCheckmarks: {
    color: '#53BDEB',
    fontSize: 12,
    fontWeight: '800',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  typingText: {
    color: '#667781',
    fontSize: 12,
    fontStyle: 'italic',
  },
  quickPromptsWrapper: {
    paddingVertical: 6,
    backgroundColor: 'rgba(239, 234, 226, 0.95)',
  },
  quickPromptsScroll: {
    paddingHorizontal: 10,
    gap: 6,
  },
  quickPromptPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#D1D7DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickPromptText: {
    color: '#111B21',
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 4,
    gap: 6,
    backgroundColor: 'transparent',
  },
  inputPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 8,
    minHeight: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIconBtn: {
    padding: 6,
  },
  inputIconText: {
    fontSize: 18,
  },
  textInput: {
    flex: 1,
    color: '#111B21',
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 6,
    maxHeight: 100,
  },
  sendCircleBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  sendCircleBtnActive: {
    backgroundColor: '#00A884',
  },
  sendCircleBtnMic: {
    backgroundColor: '#00A884',
  },
});

