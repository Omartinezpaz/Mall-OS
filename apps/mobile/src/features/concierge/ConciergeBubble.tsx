import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Speech from 'expo-speech';
import { AppIcon } from '../../components/AppIcon';
import { GlassSurface } from '../../components/GlassSurface';
import type { ConciergeMessage } from './useConcierge';

interface ConciergeBubbleProps {
  message: ConciergeMessage;
  onNavigateToStore: (storeId: string) => void;
  onActionCta: (actionType: string, targetId?: string) => void;
}

export const ConciergeBubble: React.FC<ConciergeBubbleProps> = ({
  message,
  onNavigateToStore,
  onActionCta,
}) => {
  const isUser = message.sender === 'user';
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleVoice = () => {
    if (isPlayingAudio) {
      Speech.stop();
      setIsPlayingAudio(false);
    } else {
      Speech.stop();
      setIsPlayingAudio(true);
      Speech.speak(message.text, {
        language: 'es-VE',
        pitch: 1.0,
        rate: 0.95,
        onDone: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false),
      });
    }
  };

  if (isUser) {
    return (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{message.text}</Text>
          <Text style={styles.userTime}>{message.timestamp}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.botRow}>
      {/* Bot Avatar */}
      <View style={styles.botAvatar}>
        <Text style={{ fontSize: 18 }}>🤖</Text>
      </View>

      <View style={styles.botContentCol}>
        {/* Main Message Bubble */}
        <GlassSurface
          variant="dark"
          intensity="normal"
          radius="lg"
          style={styles.botBubble}
        >
          <View style={styles.botHeaderRow}>
            <Text style={styles.botTitle}>Mall OS Concierge</Text>
            <TouchableOpacity
              style={[styles.audioBtn, isPlayingAudio && styles.audioBtnActive]}
              onPress={handleToggleVoice}
              activeOpacity={0.7}
            >
              <AppIcon
                name={isPlayingAudio ? 'volume-high' : 'volume-medium'}
                size={14}
                color={isPlayingAudio ? '#38BDF8' : '#94A3B8'}
              />
              <Text style={[styles.audioBtnText, isPlayingAudio && { color: '#38BDF8' }]}>
                {isPlayingAudio ? 'Detener' : 'Escuchar'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.botText}>{message.text}</Text>

          {/* Store Recommendations Grid */}
          {message.stores && message.stores.length > 0 && (
            <View style={styles.storesContainer}>
              {message.stores.map((store) => (
                <View key={store.storeId} style={styles.storeCard}>
                  <View style={styles.storeHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.storeName}>{store.storeName}</Text>
                      <Text style={styles.storeFloor}>{store.floorName} · {store.category}</Text>
                    </View>
                    {store.badge && (
                      <View style={styles.storeBadge}>
                        <Text style={styles.storeBadgeText}>{store.badge}</Text>
                      </View>
                    )}
                  </View>

                  {store.dealHighlight && (
                    <Text style={styles.storeDealText}>✨ {store.dealHighlight}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.routeBtn}
                    onPress={() => onNavigateToStore(store.storeId)}
                    activeOpacity={0.8}
                  >
                    <AppIcon name="navigate" size={13} color="#FFFFFF" />
                    <Text style={styles.routeBtnText}>Trazar ruta en el mapa</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Action CTA Button */}
          {message.actionCta && (
            <TouchableOpacity
              style={styles.actionCtaBtn}
              onPress={() => onActionCta(message.actionCta!.actionType, message.actionCta!.targetId)}
              activeOpacity={0.85}
            >
              <Text style={styles.actionCtaBtnText}>{message.actionCta.label} →</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.botTime}>{message.timestamp}</Text>
        </GlassSurface>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 6,
    paddingHorizontal: 14,
  },
  userBubble: {
    maxWidth: '80%',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderBottomRightRadius: 4,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  userTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    textAlign: 'right',
    marginTop: 4,
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 2,
  },
  botContentCol: {
    flex: 1,
    maxWidth: '88%',
  },
  botBubble: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  botHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  botTitle: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  audioBtnActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38BDF8',
    borderWidth: 1,
  },
  audioBtnText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },
  botText: {
    color: '#F1F5F9',
    fontSize: 13.5,
    fontWeight: '400',
    lineHeight: 20,
  },
  storesContainer: {
    marginTop: 10,
    gap: 8,
  },
  storeCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  storeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  storeName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  storeFloor: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 1,
  },
  storeBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  storeBadgeText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '800',
  },
  storeDealText: {
    color: '#FCD34D',
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 4,
  },
  routeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#6366F1',
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  routeBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  actionCtaBtn: {
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderWidth: 1,
    borderColor: '#38BDF8',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  actionCtaBtnText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
  },
  botTime: {
    color: '#64748B',
    fontSize: 9.5,
    textAlign: 'right',
    marginTop: 6,
  },
});
