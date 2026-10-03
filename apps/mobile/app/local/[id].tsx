import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Share,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { getStoreById } from '../../src/features/directory';

const STORE_COVERS: Record<string, string> = {
  'panaderia-los-cedros': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
  'supermercado-san-diego': 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80',
  'fitness-club-los-teques': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
  'charcuteria-la-estancia': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
  'farmacia-saas': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80',
  'st_pb_02': 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
};

export default function StoreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'descripcion' | 'productos' | 'ubicacion'>('descripcion');
  const [isFavorite, setIsFavorite] = useState(false);

  const store = getStoreById(id);

  if (!store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>🏪</Text>
        <Text style={styles.errorTitle}>Local no encontrado</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const coverUrl =
    STORE_COVERS[store.id] ||
    STORE_COVERS[store.slug] ||
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `¡Visita ${store.name} en Mall del Sol (Nivel ${store.floor === 0 ? 'PB' : store.floor}, Local ${store.unit})!`,
      });
    } catch (e) {
      // Ignorar
    }
  };

  const handleCall = () => {
    if (store.phone) Linking.openURL(`tel:${store.phone}`);
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cover Hero Photo */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: coverUrl }} style={styles.coverImage} />
          <View style={styles.coverOverlay} />

          {/* Floating Back Button */}
          <TouchableOpacity style={styles.floatingBack} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          {/* Floating Favorite Heart Button */}
          <TouchableOpacity
            style={styles.floatingFavorite}
            onPress={() => setIsFavorite(!isFavorite)}
            activeOpacity={0.8}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta Principal Blanca del Local (Screen 4 Mockup) */}
        <View style={styles.mainCard}>
          <View style={styles.logoAndHeaderRow}>
            <View style={styles.brandLogoBox}>
              <Text style={styles.brandEmoji}>👟</Text>
            </View>

            <View style={styles.titleInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.categoryMeta}>{store.category}</Text>
              <Text style={styles.locationMeta}>
                📍 Nivel {store.floor === 0 ? 'PB' : store.floor} · {store.unit} · 180 m
              </Text>
            </View>
          </View>

          {/* Rating & Horario */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>⭐ 4.8 (324 reseñas)</Text>
            <Text style={styles.scheduleText}>🕒 Horario: 10:00 AM - 9:00 PM</Text>
          </View>

          {/* Banner de Oferta Destacada en Negro/Índigo (Screen 4 Style) */}
          <View style={styles.blackOfferCard}>
            <View style={styles.blackOfferLeft}>
              <Text style={styles.blackOfferTitle}>20% OFF</Text>
              <Text style={styles.blackOfferSub}>En productos seleccionados</Text>
            </View>
            <TouchableOpacity
              style={styles.activateOfferBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/ofertas')}
            >
              <Text style={styles.activateOfferBtnText}>Activar oferta</Text>
            </TouchableOpacity>
          </View>

          {/* Botones de Acción Rápida Circulares */}
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionPill}
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/mapa')}
            >
              <View style={styles.actionIconCircle}>
                <Text style={styles.actionIconEmoji}>🧭</Text>
              </View>
              <Text style={styles.actionLabel}>Cómo llegar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionPill}
              activeOpacity={0.7}
              onPress={handleCall}
            >
              <View style={styles.actionIconCircle}>
                <Text style={styles.actionIconEmoji}>📞</Text>
              </View>
              <Text style={styles.actionLabel}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionPill}
              activeOpacity={0.7}
              onPress={handleShare}
            >
              <View style={styles.actionIconCircle}>
                <Text style={styles.actionIconEmoji}>📤</Text>
              </View>
              <Text style={styles.actionLabel}>Compartir</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs de Navegación Interior */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'descripcion' && styles.tabBtnActive]}
              onPress={() => setActiveTab('descripcion')}
            >
              <Text style={[styles.tabText, activeTab === 'descripcion' && styles.tabTextActive]}>
                Descripción
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'productos' && styles.tabBtnActive]}
              onPress={() => setActiveTab('productos')}
            >
              <Text style={[styles.tabText, activeTab === 'productos' && styles.tabTextActive]}>
                Productos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'ubicacion' && styles.tabBtnActive]}
              onPress={() => setActiveTab('ubicacion')}
            >
              <Text style={[styles.tabText, activeTab === 'ubicacion' && styles.tabTextActive]}>
                Ubicación
              </Text>
            </TouchableOpacity>
          </View>

          {/* Contenido según Tab */}
          <View style={styles.tabContent}>
            {activeTab === 'descripcion' && (
              <Text style={styles.bodyDescription}>
                {store.name} inspira a todos los atletas del mundo. Encuentra las últimas colecciones en calzado, ropa y accesorios deportivos de vanguardia.
              </Text>
            )}

            {activeTab === 'productos' && (
              <View style={styles.scheduleTable}>
                {Object.entries(store.openingHours).map(([day, hours]) => (
                  <View key={day} style={styles.scheduleRow}>
                    <Text style={styles.scheduleDay}>{day.toUpperCase()}</Text>
                    <Text style={styles.scheduleHours}>
                      {hours.map(([o, c]) => `${o} - ${c}`).join(', ')}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'ubicacion' && (
              <View style={styles.locationBox}>
                <Text style={styles.locationTitle}>Plano del Centro Comercial</Text>
                <Text style={styles.locationSub}>
                  Ubicado en el Nivel {store.floor === 0 ? 'Planta Baja' : `Piso ${store.floor}`}, local {store.unit}.
                </Text>
                <TouchableOpacity
                  style={styles.openMapBtn}
                  onPress={() => router.push('/(tabs)/mapa')}
                >
                  <Text style={styles.openMapBtnText}>Abrir Plano Interactivo 2.5D →</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingBottom: 40,
  },
  coverContainer: {
    height: 240,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
  },
  floatingBack: {
    position: 'absolute',
    top: 50,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  backArrow: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  floatingFavorite: {
    position: 'absolute',
    top: 50,
    right: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -26,
    padding: 22,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  logoAndHeaderRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  brandLogoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandEmoji: {
    fontSize: 30,
  },
  titleInfo: {
    flex: 1,
    gap: 2,
  },
  storeName: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  categoryMeta: {
    color: '#4F46E5',
    fontSize: 13,
    fontWeight: '700',
  },
  locationMeta: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  ratingText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
  blackOfferCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  blackOfferLeft: {
    flex: 1,
    gap: 2,
  },
  blackOfferTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  blackOfferSub: {
    color: '#94A3B8',
    fontSize: 12,
  },
  activateOfferBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activateOfferBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  actionPill: {
    alignItems: 'center',
    gap: 6,
  },
  actionIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIconEmoji: {
    fontSize: 20,
  },
  actionLabel: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '600',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginTop: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
  },
  tabText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  tabContent: {
    paddingTop: 8,
  },
  bodyDescription: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 22,
  },
  scheduleTable: {
    gap: 6,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  scheduleDay: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  scheduleHours: {
    color: '#0F172A',
    fontSize: 12,
  },
  locationBox: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locationTitle: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  locationSub: {
    color: '#64748B',
    fontSize: 12,
  },
  openMapBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  openMapBtnText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  errorEmoji: {
    fontSize: 48,
  },
  errorTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
  },
  backBtn: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
