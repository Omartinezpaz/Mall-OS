import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppIcon } from '../../components/AppIcon';
import { useConcierge } from './useConcierge';
import { ConciergeBubble } from './ConciergeBubble';
import { ConciergeQuickReplies } from './ConciergeQuickReplies';
import { AnimatedConciergeAvatar } from './AnimatedConciergeAvatar';

interface ConciergeScreenProps {
  onClose?: () => void;
  topInset?: number;
}

export const ConciergeScreen: React.FC<ConciergeScreenProps> = ({ onClose, topInset = 0 }) => {
  const router = useRouter();
  const { messages, isThinking, sendMessage, clearChat, dispatch, quickReplies } = useConcierge();
  const [inputText, setInputText] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const messageLayouts = useRef<{ [msgId: string]: number }>({});
  const lastScrolledMsgId = useRef<string | null>(null);

  // Escuchar apertura y cierre del teclado para colapsar hero y maximizar área de chat
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () => {
      setIsKeyboardVisible(true);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Levitación sutil y armónica del avatar 3D (60fps native driver)
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 6,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatAnim]);

  const scrollToMessage = (msgId: string) => {
    const y = messageLayouts.current[msgId];
    if (typeof y === 'number') {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 10), animated: true });
      lastScrolledMsgId.current = msgId;
    }
  };

  useEffect(() => {
    if (messages.length === 0) return;
    const latestMsg = messages[messages.length - 1];
    if (!latestMsg) return;

    const timer = setTimeout(() => {
      if (messageLayouts.current[latestMsg.id] !== undefined) {
        scrollToMessage(latestMsg.id);
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [messages.length]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const query = inputText;
    setInputText('');
    sendMessage(query);
  };

  const handleNavigateToStore = (storeId: string) => {
    router.push({
      pathname: '/(tabs)/mapa',
      params: { storeId },
    });
  };

  const handleActionCta = (actionType: string, targetId?: string) => {
    if (actionType === 'navigate' && targetId) {
      router.push({
        pathname: '/(tabs)/mapa',
        params: { storeId: targetId },
      });
    } else if (actionType === 'kids_mode') {
      router.push('/kids-mode');
    } else if (actionType === 'offers') {
      router.push('/(tabs)/ofertas');
    } else if (actionType === 'directory') {
      router.push('/(tabs)/directorio');
    } else if (actionType === 'open_screen' && targetId) {
      router.push(targetId as any);
    } else if (actionType === 'category' && targetId) {
      dispatch({ type: 'SELECT_CATEGORY', categoryId: targetId });
    } else if (actionType === 'subcategory' && targetId) {
      dispatch({ type: 'SELECT_SUBCATEGORY', subcategoryId: targetId });
    } else if (actionType === 'toggle_accessible') {
      dispatch({ type: 'TOGGLE_ACCESSIBLE' });
    }
  };

  return (
    <View style={styles.screenRoot}>
      {/* 1. UPPER HALF: ESCENARIO IDÉNTICO AL FONDO DEL VIDEO CON ROBOT 3D Y ZOOM */}
      <View style={[styles.cosmicStage, { paddingTop: topInset + (isKeyboardVisible ? 2 : 4) }]}>
        {/* Top Bar: Flecha volver + Campana con badge (1) */}
        <View style={styles.stageTopBar}>
          <TouchableOpacity
            style={styles.stageBackBtn}
            onPress={onClose ? onClose : () => router.back()}
            activeOpacity={0.7}
          >
            <AppIcon name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>

          {isKeyboardVisible && (
            <View style={styles.keyboardTopTitle}>
              <Text style={styles.keyboardTopTitleText}>Sambil Chacao · Concierge IA</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.stageBellBtn}
            activeOpacity={0.7}
            onPress={() => sendMessage('¿Cuáles son las novedades y notificaciones del mall?')}
          >
            <AppIcon name="notifications" size={22} color="#0F172A" />
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Centro: Robot Orbe 3D flotante con ZOOM de frames y altura compacta (Se oculta al chatear/abrir teclado para dar 100% espacio a los mensajes) */}
        {!isKeyboardVisible && (
          <View style={styles.heroCenterContainer}>
            <Animated.View style={[styles.heroFloatingAvatar, { transform: [{ translateY: floatAnim }] }]}>
              <AnimatedConciergeAvatar
                size={104}
                imageStyle={styles.heroAvatarImage}
                intervalMs={140}
              />
            </Animated.View>

            {/* Pastilla Flotante Mall OS */}
            <TouchableOpacity
              style={styles.mallOsPill}
              activeOpacity={0.8}
              onPress={() => sendMessage('¿Qué servicios ofrece Sambil Chacao?')}
            >
              <AppIcon name="search" size={14} color="rgba(255, 255, 255, 0.9)" />
              <Text style={styles.mallOsPillText}>Mall OS</Text>
              <AppIcon name="external-link" size={13} color="rgba(255, 255, 255, 0.9)" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 2. LOWER HALF: WHITE BOTTOM SHEET CON PERFIL, GRID 2x2, CHAT Y BARRA DE ENTRADA */}
      <KeyboardAvoidingView
        style={styles.sheetCard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {/* Tirador Drag Handle */}
        <View style={styles.dragHandle} />

        {/* Cabecera del Concierge Oficial */}
        <View style={styles.sheetHeader}>
          <View style={styles.sheetHeaderLeft}>
            <View style={styles.sheetAvatarContainer}>
              <AnimatedConciergeAvatar
                size={40}
                imageStyle={{ width: '100%', height: '100%' }}
                intervalMs={160}
              />
            </View>

            <View style={styles.sheetTitleCol}>
              <View style={styles.sheetTitleRow}>
                <Text style={styles.sheetTitleText}>Sambil Chacao</Text>
                <View style={styles.verifiedBadge}>
                  <AppIcon name="checkmark" size={10} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>
              <Text style={styles.sheetSubtitleText}>Mall OS · Concierge</Text>
            </View>
          </View>

          <View style={styles.sheetHeaderRight}>
            <TouchableOpacity
              style={styles.sheetCallBtn}
              activeOpacity={0.7}
              onPress={() => sendMessage('Hola, deseo asistencia guiada por el mall')}
            >
              <AppIcon name="call" size={18} color="#475569" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetTrashBtn}
              onPress={clearChat}
              activeOpacity={0.7}
            >
              <AppIcon name="trash" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scroll de Contenido: Grid 2x2 inicial o Mensajes */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Mensajes del chat */}
          {messages.map((msg) => (
            <View
              key={msg.id}
              onLayout={(e) => {
                const y = e.nativeEvent.layout.y;
                messageLayouts.current[msg.id] = y;
                const latestMsg = messages[messages.length - 1];
                if (latestMsg && latestMsg.id === msg.id && lastScrolledMsgId.current !== msg.id) {
                  scrollToMessage(msg.id);
                }
              }}
            >
              <ConciergeBubble
                message={msg}
                onNavigateToStore={handleNavigateToStore}
                onActionCta={handleActionCta}
                onCategorySelect={(catId) => dispatch({ type: 'SELECT_CATEGORY', categoryId: catId })}
                onSubcategorySelect={(subId) => dispatch({ type: 'SELECT_SUBCATEGORY', subcategoryId: subId })}
                onStoreViewProducts={(storeId) => dispatch({ type: 'VIEW_STORE_PRODUCTS', storeId })}
                onDrinkSelect={(drinkId) => dispatch({ type: 'SELECT_DRINK', drinkId })}
                onConfirmPurchase={(found) => dispatch({ type: 'CONFIRM_PURCHASE_FOUND', found })}
                onJustLooking={() => dispatch({ type: 'JUST_LOOKING' })}
                onSelectPurchasedProduct={(product) => dispatch({ type: 'SELECT_PURCHASED_PRODUCT', product })}
                onRatePurchase={(rating) => dispatch({ type: 'RATE_PURCHASE', rating })}
                onRateConcierge={(rating) => dispatch({ type: 'RATE_CONCIERGE', rating })}
                onRestartSession={() => dispatch({ type: 'START_NEW_SESSION' })}
              />
            </View>
          ))}

          {/* Cuadrícula 2x2 de accesos directos de Sambil Chacao */}
          {messages.length <= 1 && (
            <View style={styles.quickGridContainer}>
              <Text style={styles.quickGridSectionTitle}>Descubre el mall</Text>
              
              <View style={styles.quickGridRow}>
                {/* 1. Tiendas y Moda */}
                <TouchableOpacity
                  style={styles.quickGridCard}
                  activeOpacity={0.7}
                  onPress={() => sendMessage('Quiero ver tiendas de ropa y moda')}
                >
                  <View style={[styles.quickCardIconWrap, { backgroundColor: '#FEF3C7' }]}>
                    <AppIcon name="shirt" size={18} color="#D97706" />
                  </View>
                  <View style={styles.quickCardTextCol}>
                    <Text style={styles.quickCardTitle}>Ropa y Moda</Text>
                    <Text style={styles.quickCardSub}>ZARA, Tijerazo...</Text>
                  </View>
                </TouchableOpacity>

                {/* 2. Directorio Sambil */}
                <TouchableOpacity
                  style={styles.quickGridCard}
                  activeOpacity={0.7}
                  onPress={() => sendMessage('Muéstrame el directorio oficial del mall')}
                >
                  <View style={[styles.quickCardIconWrap, { backgroundColor: '#EFF6FF' }]}>
                    <AppIcon name="compass" size={18} color="#2563EB" />
                  </View>
                  <View style={styles.quickCardTextCol}>
                    <Text style={styles.quickCardTitle}>Sambil Chacao</Text>
                    <Text style={styles.quickCardSub}>Directorio y mapa</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.quickGridRow}>
                {/* 3. Cafés y Comida */}
                <TouchableOpacity
                  style={styles.quickGridCard}
                  activeOpacity={0.7}
                  onPress={() => sendMessage('Dónde comer o tomar un café')}
                >
                  <View style={[styles.quickCardIconWrap, { backgroundColor: '#FFEDD5' }]}>
                    <AppIcon name="restaurant" size={18} color="#EA580C" />
                  </View>
                  <View style={styles.quickCardTextCol}>
                    <Text style={styles.quickCardTitle}>Café y Comida</Text>
                    <Text style={styles.quickCardSub}>Feria y bistrós</Text>
                  </View>
                </TouchableOpacity>

                {/* 4. Ofertas y Promociones */}
                <TouchableOpacity
                  style={styles.quickGridCard}
                  activeOpacity={0.7}
                  onPress={() => sendMessage('Cuáles son las ofertas del día')}
                >
                  <View style={[styles.quickCardIconWrap, { backgroundColor: '#FEE2E2' }]}>
                    <AppIcon name="pricetag" size={18} color="#DC2626" />
                  </View>
                  <View style={styles.quickCardTextCol}>
                    <Text style={styles.quickCardTitle}>Ofertas de Hoy</Text>
                    <Text style={styles.quickCardSub}>Descuentos activos</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Thinking Indicator Bubble */}
          {isThinking && (
            <View style={styles.thinkingRow}>
              <View style={styles.botAvatar}>
                <AnimatedConciergeAvatar
                  size={32}
                  imageStyle={{ width: '100%', height: '100%' }}
                  intervalMs={160}
                />
              </View>
              <View style={styles.thinkingBubble}>
                <ActivityIndicator size="small" color="#2563EB" />
                <Text style={styles.thinkingText}>Consultando directorio oficial del mall...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Reply Chips (Ocultos mientras se teclea para dar máximo espacio vertical al chat) */}
        {!isKeyboardVisible && (
          <ConciergeQuickReplies
            replies={quickReplies}
            onSelectReply={(q) => sendMessage(q)}
          />
        )}

        {/* Bottom Input Bar con Icono de Clip, Input y Botón de Enviar Azul */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachBtn}
            activeOpacity={0.7}
            onPress={() => sendMessage('Quiero consultar por una foto o producto')}
          >
            <AppIcon name="paperclip" size={22} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.inputPill}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe al concierge..."
              placeholderTextColor="#94A3B8"
              returnKeyType="send"
              onSubmitEditing={handleSend}
              multiline={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <AppIcon name="send" size={17} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: '#A8B1B8', // Fondo idéntico al estudio del video
  },

  // 1. ESCENARIO DEL ROBOT (IDÉNTICO AL FONDO DEL VIDEO)
  cosmicStage: {
    backgroundColor: '#A8B1B8',
    paddingHorizontal: 16,
    paddingBottom: 6,
    alignItems: 'center',
  },
  stageTopBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  keyboardTopTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardTopTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  stageBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageBellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#A8B1B8',
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  heroCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 2,
  },
  heroFloatingAvatar: {
    width: 104,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  heroAvatarImage: {
    width: 100,
    height: 100,
  },
  mallOsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 16,
    paddingHorizontal: 13,
    height: 30,
    gap: 7,
    marginTop: 2,
  },
  mallOsPillText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // 2. BOTTOM SHEET BLANCO
  sheetCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  dragHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sheetHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sheetAvatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sheetTitleCol: {
    justifyContent: 'center',
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sheetTitleText: {
    fontSize: 16.5,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  verifiedBadge: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetSubtitleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 1,
  },
  sheetHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetCallBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTrashBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // CHAT SCROLL
  chatArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatContent: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  // CUADRÍCULA 2x2
  quickGridContainer: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quickGridSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  quickGridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  quickGridCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  quickCardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCardTextCol: {
    flex: 1,
  },
  quickCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  quickCardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },

  // THINKING BUBBLE
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 4,
    gap: 8,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F172A',
    borderWidth: 1.2,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  thinkingText: {
    color: '#64748B',
    fontSize: 12.5,
    fontWeight: '500',
  },

  // BARRA INFERIOR DE ENTRADA
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 10,
  },
  attachBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPill: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 4,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textInput: {
    flex: 1,
    color: '#0F172A',
    fontSize: 14,
    lineHeight: 18,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
    elevation: 3,
  },
  sendBtnDisabled: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
});
