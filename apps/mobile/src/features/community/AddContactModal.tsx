import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CommunityRelation } from './types';

interface AddContactModalProps {
  visible: boolean;
  onClose: () => void;
  onAddContact: (code: string, nickname?: string, relation?: CommunityRelation) => { success: boolean; message: string };
}

const RELATIONS: Array<{ key: CommunityRelation; label: string }> = [
  { key: 'family', label: 'Familia' },
  { key: 'partner', label: 'Pareja' },
  { key: 'child', label: 'Hijo/a' },
  { key: 'friend', label: 'Amigo/a' },
];

export function AddContactModal({ visible, onClose, onAddContact }: AddContactModalProps) {
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [relation, setRelation] = useState<CommunityRelation>('family');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    if (!code.trim()) {
      setFeedback({ type: 'error', message: 'Ingresa el código alfanumérico del contacto.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      const result = onAddContact(code, nickname, relation);
      setIsSubmitting(false);

      if (result.success) {
        setFeedback({ type: 'success', message: result.message });
        setTimeout(() => {
          setCode('');
          setNickname('');
          setFeedback(null);
          onClose();
        }, 1200);
      } else {
        setFeedback({ type: 'error', message: result.message });
      }
    }, 400);
  };

  const handleClose = () => {
    setCode('');
    setNickname('');
    setFeedback(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Agregar Contacto</Text>
              <Text style={styles.subtitle}>Conéctate con tus seres queridos en el mall</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>CÓDIGO DE INVITACIÓN (EJ: CARLOS-9X4A)</Text>
            <TextInput
              style={styles.inputCode}
              placeholder="CÓDIGO ALFANUMÉRICO"
              placeholderTextColor="#94A3B8"
              value={code}
              onChangeText={(txt) => {
                setCode(txt.toUpperCase());
                if (feedback) setFeedback(null);
              }}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={16}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>NOMBRE O APODO (OPCIONAL)</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Ej: Sofía, Carlos, Abuelo"
              placeholderTextColor="#94A3B8"
              value={nickname}
              onChangeText={setNickname}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>TIPO DE PARENTESCO</Text>
            <View style={styles.relationsRow}>
              {RELATIONS.map((item) => {
                const isSelected = relation === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[styles.relationChip, isSelected && styles.relationChipActive]}
                    onPress={() => setRelation(item.key)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.relationChipText, isSelected && styles.relationChipTextActive]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Feedback */}
          {feedback && (
            <View
              style={[
                styles.feedbackBox,
                feedback.type === 'error' ? styles.feedbackError : styles.feedbackSuccess,
              ]}
            >
              <Text
                style={[
                  styles.feedbackText,
                  feedback.type === 'error' ? styles.feedbackTextError : styles.feedbackTextSuccess,
                ]}
              >
                {feedback.message}
              </Text>
            </View>
          )}

          {/* Actions */}
          <TouchableOpacity
            style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
            onPress={handleAdd}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Vincular a Mi Comunidad</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  inputCode: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1.5,
  },
  inputText: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  relationsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  relationChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  relationChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  relationChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  relationChipTextActive: {
    color: '#FFFFFF',
  },
  feedbackBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  feedbackError: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  feedbackSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#6EE7B7',
  },
  feedbackText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  feedbackTextError: {
    color: '#DC2626',
  },
  feedbackTextSuccess: {
    color: '#059669',
  },
  submitBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
