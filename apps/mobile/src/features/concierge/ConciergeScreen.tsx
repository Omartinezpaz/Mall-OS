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
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppIcon } from '../../components/AppIcon';
import { GlassSurface } from '../../components/GlassSurface';
import { useConcierge } from './useConcierge';
import { ConciergeBubble } from './ConciergeBubble';
import { ConciergeQuickReplies } from './ConciergeQuickReplies';

interface ConciergeScreenProps {
  onClose?: () => void;
}

export const ConciergeScreen: React.FC<ConciergeScreenProps> = ({ onClose }) => {
  const router = useRouter();
  const { messages, isThinking, sendMessage, clearChat, quickReplies } = useConcierge();
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom upon new message or thinking state
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages.length, isThinking]);

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
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={onClose ? onClose : () => router.back()}
          activeOpacity={0.7}
        >
          <AppIcon name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleCol}>
          <View style={styles.headerTitleRow}>
            <Text style={{ fontSize: 16 }}>🤖</Text>
            <Text style={styles.headerTitle}>Concierge IA</Text>
          </View>
          <View style={styles.beaconRow}>
            <View style={styles.liveDot} />
            <Text style={styles.beaconText}>ASISTENTE INTELIGENTE DEL MALL</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.headerBtn}
          onPress={clearChat}
          activeOpacity={0.7}
        >
          <AppIcon name="trash" size={18} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Messages Scroll Area */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <ConciergeBubble
            key={msg.id}
            message={msg}
            onNavigateToStore={handleNavigateToStore}
            onActionCta={handleActionCta}
          />
        ))}

        {/* Thinking Indicator Bubble */}
        {isThinking && (
          <View style={styles.thinkingRow}>
            <View style={styles.botAvatar}>
              <Text style={{ fontSize: 18 }}>🤖</Text>
            </View>
            <GlassSurface
              variant="dark"
              intensity="strong"
              radius="lg"
              style={styles.thinkingBubble}
            >
              <ActivityIndicator size="small" color="#38BDF8" />
              <Text style={styles.thinkingText}>Concierge está buscando opciones...</Text>
            </GlassSurface>
          </View>
        )}
      </ScrollView>

      {/* Quick Reply Chips */}
      <ConciergeQuickReplies
        replies={quickReplies}
        onSelectReply={(q) => sendMessage(q)}
      />

      {/* Bottom Input Bar */}
      <View style={styles.inputContainer}>
        <GlassSurface
          variant="dark"
          intensity="strong"
          radius="pill"
          style={styles.inputPill}
        >
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Pregunta por tiendas, comida, baños..."
            placeholderTextColor="#64748B"
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <AppIcon
              name="send"
              size={16}
              color={inputText.trim() ? '#FFFFFF' : '#475569'}
            />
          </TouchableOpacity>
        </GlassSurface>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.1)',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  headerTitleCol: {
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  beaconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  beaconText: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingVertical: 12,
  },
  thinkingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 14,
    gap: 8,
  },
  botAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  thinkingText: {
    color: '#94A3B8',
    fontSize: 12,
    fontStyle: 'italic',
  },
  inputContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#090D16',
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.1)',
  },
  inputPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  sendBtnDisabled: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
  },
});
