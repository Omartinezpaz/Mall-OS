import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AppIcon } from '../../components/AppIcon';
import type { ConciergeQuickReply } from './concierge-data';

interface ConciergeQuickRepliesProps {
  replies: ConciergeQuickReply[];
  onSelectReply: (query: string) => void;
}

export const ConciergeQuickReplies: React.FC<ConciergeQuickRepliesProps> = ({
  replies,
  onSelectReply,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {replies.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.chip}
            onPress={() => onSelectReply(item.query)}
            activeOpacity={0.75}
          >
            <AppIcon name={item.icon} size={13} color="#4F46E5" />
            <Text style={styles.chipText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  scrollContent: {
    paddingHorizontal: 14,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
});

