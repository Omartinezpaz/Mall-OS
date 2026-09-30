import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export default function ConciergeScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: '¡Hola! Soy el Concierge digital de Mall OS Los Nuevos Teques. ¿En qué puedo orientarte hoy?',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulación de respuesta orientada a los datos del CC
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'En la Planta Baja (PB-02) encuentras la Panadería Los Cedros, abierta hasta las 8:00 PM con promoción de café + pastel.',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}
          >
            <Text style={item.sender === 'user' ? styles.userText : styles.botText}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Escribe tu consulta sobre el mall..."
          placeholderTextColor="#64748B"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendBtnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  chatList: { padding: 16, gap: 12 },
  bubble: { maxWidth: '80%', padding: 14, borderRadius: 16 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#10B981', borderBottomRightRadius: 4 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#1E293B', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#334155' },
  userText: { color: '#0F172A', fontSize: 15, fontWeight: '500' },
  botText: { color: '#F8FAFC', fontSize: 15, lineHeight: 22 },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sendBtn: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendBtnText: { color: '#0F172A', fontWeight: 'bold' },
});
