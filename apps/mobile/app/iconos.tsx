import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import {
  MALLOS_ICONS_LIST,
  type MallOsIconGroup,
  type MallOsIconDefinition,
} from '@mallos/design-tokens';
import { MallOsSpriteIcon } from '../src/components/MallOsSpriteIcon';

type DisplayMode = 'auto' | 'base' | 'badge';

export default function IconLabScreen() {
  const router = useRouter();

  if (!__DEV__) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 24 }]}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', textAlign: 'center' }}>
          Icon Lab (Modo Desarrollo)
        </Text>
        <Text style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
          Esta herramienta solo está habilitada en modo desarrollo (`__DEV__`).
        </Text>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)')}
          style={{ marginTop: 20, backgroundColor: '#2563EB', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 8 }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Volver a la App</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState<number>(48);
  const [globalMode, setGlobalMode] = useState<DisplayMode>('auto');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [cardModes, setCardModes] = useState<Record<string, 'base' | 'badge'>>({});
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const groups: { id: string; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'category', label: 'Categorías' },
    { id: 'mall', label: 'Infraestructura' },
    { id: 'map', label: 'Entorno Mapa' },
    { id: 'navigation', label: 'Navegación / UI' },
  ];

  const filteredIcons = useMemo(() => {
    return MALLOS_ICONS_LIST.filter((icon) => {
      const matchesSearch =
        icon.name.toLowerCase().includes(search.toLowerCase()) ||
        icon.category.toLowerCase().includes(search.toLowerCase()) ||
        icon.symbolId.toLowerCase().includes(search.toLowerCase()) ||
        icon.id.toLowerCase().includes(search.toLowerCase());

      const matchesGroup =
        selectedGroup === 'all' || icon.group === selectedGroup;

      return matchesSearch && matchesGroup;
    });
  }, [search, selectedGroup]);

  const toggleCardMode = (id: string, currentShowCircle: boolean) => {
    setCardModes((prev) => ({
      ...prev,
      [id]: currentShowCircle ? 'base' : 'badge',
    }));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setStringAsync(text);
    } catch {
      // Ignorar en entornos sin soporte
    }
    setCopiedNotification(`Copiado: ${label}`);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mall OS Icon Lab</Text>
          <Text style={styles.headerSubtitle}>
            Catálogo Oficial · {MALLOS_ICONS_LIST.length} Símbolos Vectoriales (v2)
          </Text>
        </View>
      </View>

      {/* Floating Notification */}
      {copiedNotification && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ {copiedNotification}</Text>
        </View>
      )}

      {/* Control Panel */}
      <View style={styles.controlPanel}>
        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Buscar por nombre, ID o categoría..."
            placeholderTextColor="#64748B"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Mode and Size Row */}
        <View style={styles.filterRow}>
          {/* Mode Selector */}
          <View style={styles.buttonGroup}>
            {(['auto', 'base', 'badge'] as DisplayMode[]).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.filterTab,
                  globalMode === mode && styles.filterTabActive,
                ]}
                onPress={() => setGlobalMode(mode)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    globalMode === mode && styles.filterTabTextActive,
                  ]}
                >
                  {mode === 'auto' ? 'Normal' : mode === 'base' ? 'Base' : 'Badge'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size Switcher */}
          <View style={styles.buttonGroup}>
            {[24, 48, 64].map((sz) => (
              <TouchableOpacity
                key={sz}
                style={[
                  styles.sizeChip,
                  selectedSize === sz && styles.sizeChipActive,
                ]}
                onPress={() => setSelectedSize(sz)}
              >
                <Text
                  style={[
                    styles.sizeChipText,
                    selectedSize === sz && styles.sizeChipTextActive,
                  ]}
                >
                  {sz}px
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Group Selector Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupScroll}
        >
          {groups.map((grp) => (
            <TouchableOpacity
              key={grp.id}
              style={[
                styles.groupChip,
                selectedGroup === grp.id && styles.groupChipActive,
              ]}
              onPress={() => setSelectedGroup(grp.id)}
            >
              <Text
                style={[
                  styles.groupChipText,
                  selectedGroup === grp.id && styles.groupChipTextActive,
                ]}
              >
                {grp.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsCount}>
          Mostrando {filteredIcons.length} de {MALLOS_ICONS_LIST.length} iconos
        </Text>
        <Text style={styles.resultsHint}>Toca una tarjeta para alternar Base / Badge</Text>
      </View>

      {/* Grid of Icons */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.grid}>
        {filteredIcons.map((item) => {
          const cardMode = cardModes[item.id];
          const showCircle =
            cardMode === 'base'
              ? false
              : cardMode === 'badge'
              ? true
              : globalMode === 'base'
              ? false
              : globalMode === 'badge'
              ? true
              : true;

          return (
            <View key={item.id} style={styles.iconCard}>
              {/* Alignment / Preview Box */}
              <TouchableOpacity
                style={styles.previewBox}
                activeOpacity={0.7}
                onPress={() => toggleCardMode(item.id, showCircle)}
              >
                <MallOsSpriteIcon
                  name={item.id}
                  size={selectedSize}
                  showCircle={showCircle}
                  color={showCircle ? '#FFFFFF' : item.color}
                />
              </TouchableOpacity>

              {/* Icon Info */}
              <View style={styles.cardBody}>
                <View style={styles.titleRow}>
                  <View
                    style={[styles.colorDot, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.iconName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>

                <Text style={styles.iconCategory}>{item.category}</Text>

                <View style={styles.symbolBadge}>
                  <Text style={styles.iconCode} numberOfLines={1}>
                    {showCircle ? item.badgeSymbolId : item.symbolId}
                  </Text>
                </View>

                {/* Developer Copy Toolbar */}
                <View style={styles.copyToolbar}>
                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() => copyToClipboard(item.id, `ID: ${item.id}`)}
                  >
                    <Text style={styles.copyBtnText}>ID</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() => copyToClipboard(item.symbolId, `Symbol: ${item.symbolId}`)}
                  >
                    <Text style={styles.copyBtnText}>Symbol</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() =>
                      copyToClipboard(
                        `<MallOsSpriteIcon name="${item.id}" size={${selectedSize}} />`,
                        `JSX: <MallOsSpriteIcon name="${item.id}" />`
                      )
                    }
                  >
                    <Text style={styles.copyBtnText}>JSX</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth > 600 ? '23%' : '47%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070C18',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 14,
    backgroundColor: '#0A0F24',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  toast: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  controlPanel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#0A0F24',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    gap: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    height: 40,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 0,
  },
  clearText: {
    color: '#94A3B8',
    fontSize: 14,
    padding: 4,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  filterTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sizeChip: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  sizeChipActive: {
    backgroundColor: '#3B82F6',
  },
  sizeChipText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  sizeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  groupScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 4,
  },
  groupChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  groupChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#6366F1',
  },
  groupChipText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  groupChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(10, 15, 36, 0.6)',
  },
  resultsCount: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
  resultsHint: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 10,
    paddingBottom: 40,
  },
  iconCard: {
    width: cardWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    gap: 8,
  },
  previewBox: {
    height: 76,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  colorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  iconName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  iconCategory: {
    color: '#64748B',
    fontSize: 10,
  },
  symbolBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.15)',
  },
  iconCode: {
    color: '#38BDF8',
    fontSize: 9,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  copyToolbar: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  copyBtn: {
    flex: 1,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  copyBtnText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
  },
});
