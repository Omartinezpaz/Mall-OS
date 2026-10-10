import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { audioManager } from '../../lib/audio-manager';
import { AppIcon } from '../../components/AppIcon';
import { MallOsSpriteIcon } from '../../components/MallOsSpriteIcon';
import { ConciergeProductCard } from './ConciergeProductCard';
import { ConciergeProductSheet } from './ConciergeProductSheet';
import { RatingWidget } from './widgets/RatingWidget';
import { ProductPickerWidget } from './widgets/ProductPickerWidget';
import { DrinkCardsWidget } from './widgets/DrinkCardsWidget';
import { FarewellWidget } from './widgets/FarewellWidget';
import { ConfirmationPurchaseWidget } from './widgets/ConfirmationPurchaseWidget';
import type { CatalogProduct, CatalogStoreOption } from './data/concierge-catalog';
import type { ConciergeMessage } from './useConcierge';

interface ConciergeBubbleProps {
  message: ConciergeMessage;
  onNavigateToStore: (storeId: string) => void;
  onActionCta: (actionType: string, targetId?: string) => void;
  onCategorySelect?: (categoryId: string) => void;
  onSubcategorySelect?: (subcategoryId: string) => void;
  onStoreViewProducts?: (storeId: string) => void;
  onDrinkSelect?: (drinkId: string) => void;
  onConfirmPurchase?: (found: boolean) => void;
  onJustLooking?: () => void;
  onSelectPurchasedProduct?: (product: { id: string; name: string }) => void;
  onRatePurchase?: (rating: number) => void;
  onRateConcierge?: (rating: number) => void;
  onRestartSession?: () => void;
}

export const ConciergeBubble: React.FC<ConciergeBubbleProps> = ({
  message,
  onNavigateToStore,
  onActionCta,
  onCategorySelect,
  onSubcategorySelect,
  onStoreViewProducts,
  onDrinkSelect,
  onConfirmPurchase,
  onJustLooking,
  onSelectPurchasedProduct,
  onRatePurchase,
  onRateConcierge,
  onRestartSession,
}) => {
  const isUser = message.sender === 'user';
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sheetProduct, setSheetProduct] = useState<CatalogProduct | null>(null);
  const [sheetStore, setSheetStore] = useState<CatalogStoreOption | null>(null);

  const handleToggleVoice = () => {
    if (isPlayingAudio) {
      audioManager.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      audioManager.speak({
        text: message.text,
        priority: 'normal',
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
          <View style={styles.userFooterRow}>
            <Text style={styles.userTimeText}>{message.timestamp}</Text>
            <AppIcon name="checkmark-done" size={13} color="rgba(255, 255, 255, 0.75)" strokeWidth={2.2} />
          </View>
        </View>
      </View>
    );
  }

  const hasProducts = Boolean(message.activeStoreProducts && message.activeStoreProducts.length > 0);

  return (
    <View style={styles.botRow}>
      <View style={styles.botContentCol}>
        {/* Burbuja Principal de Texto (Blanca Limpia con Bordes Curvos Grandes) */}
        <View style={styles.botBubble}>
          <View style={styles.botHeaderRow}>
            <Text style={styles.botTitle}>Concierge Oficial</Text>
            <TouchableOpacity
              style={[styles.audioBtn, isPlayingAudio && styles.audioBtnActive]}
              onPress={handleToggleVoice}
              activeOpacity={0.7}
            >
              <AppIcon
                name={isPlayingAudio ? 'volume-high' : 'volume-medium'}
                size={13}
                color={isPlayingAudio ? '#2563EB' : '#64748B'}
              />
              <Text style={[styles.audioBtnText, isPlayingAudio && { color: '#2563EB' }]}>
                {isPlayingAudio ? 'Detener' : 'Escuchar'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.botText}>{message.text}</Text>

          {/* Bullets informativos si aplica */}
          {message.infoResponse?.bullets && message.infoResponse.bullets.length > 0 && (
            <View style={styles.bulletsContainer}>
              {message.infoResponse.bullets.map((b, idx) => (
                <View key={`b-${idx}`} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Chips de Categorías Padre */}
          {message.categories && message.categories.length > 0 && (
            <View style={styles.chipsContainer}>
              {message.categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.chipBtn}
                  onPress={() => onCategorySelect ? onCategorySelect(cat.id) : onActionCta('category', cat.id)}
                  activeOpacity={0.75}
                >
                  <MallOsSpriteIcon name={cat.iconId || 'categorias'} size={20} showCircle={false} color="#2563EB" />
                  <Text style={styles.chipText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Chips de Subcategorías */}
          {message.subcategories && message.subcategories.length > 0 && (
            <View style={styles.chipsContainer}>
              {message.subcategories.map((sub) => (
                <TouchableOpacity
                  key={sub.id}
                  style={[styles.chipBtn, styles.subchipBtn]}
                  onPress={() => onSubcategorySelect ? onSubcategorySelect(sub.id) : onActionCta('subcategory', sub.id)}
                  activeOpacity={0.75}
                >
                  <MallOsSpriteIcon name={sub.iconId || 'moda'} size={20} showCircle={false} color="#0284C7" />
                  <Text style={[styles.chipText, styles.subchipText]}>{sub.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Selector Horizontal de Tiendas (Siempre visible cuando hay opciones de tienda) */}
          {message.storeOptions && message.storeOptions.length > 0 && (
            <View style={{ marginTop: 12, marginBottom: 2 }}>
              <View style={styles.storeChipsRow}>
                {message.storeOptions.map((opt) => {
                  const isActive = opt.storeId === message.activeStoreId;
                  return (
                    <TouchableOpacity
                      key={opt.storeId}
                      style={[
                        styles.storeChipBtn,
                        isActive && styles.storeChipBtnActive,
                      ]}
                      onPress={() => onStoreViewProducts && onStoreViewProducts(opt.storeId)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.storeChipText,
                          isActive && styles.storeChipTextActive,
                        ]}
                      >
                        {opt.storeName}
                      </Text>
                      {isActive && <View style={styles.storeChipDot} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Tarjetas de Bebidas de Cortesía */}
          {message.drinks && message.drinks.length > 0 && (
            <View style={styles.storesContainer}>
              {message.drinks.map((drink) => (
                <TouchableOpacity
                  key={drink.id}
                  style={styles.storeCard}
                  onPress={() => onDrinkSelect ? onDrinkSelect(drink.id) : onNavigateToStore(drink.storeId)}
                  activeOpacity={0.8}
                >
                  <View style={styles.storeHeaderRow}>
                    <View style={styles.drinkIconContainer}>
                      <MallOsSpriteIcon name="cafeteria" size={24} showCircle={false} color="#451A03" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={styles.storeName}>{drink.name}</Text>
                      <Text style={styles.storeFloor}>
                        {drink.storeName} · ${drink.priceUsd.toFixed(2)} USD
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.storeDealText}>{drink.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Action CTA Button */}
          {message.actionCta && (
            <TouchableOpacity
              style={styles.actionCtaBtn}
              onPress={() => onActionCta(message.actionCta!.actionType, message.actionCta!.targetId || message.actionCta!.payload)}
              activeOpacity={0.85}
            >
              <Text style={styles.actionCtaBtnText}>{message.actionCta.label} →</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Widget 1: Confirmación de Compra "¿Encontraste lo que buscabas?" */}
        {message.confirmationPrompt && (
          <ConfirmationPurchaseWidget
            storeName={message.confirmationPrompt.storeName}
            onConfirmPurchase={(found) => onConfirmPurchase?.(found)}
            onJustLooking={() => onJustLooking?.()}
          />
        )}

        {/* Widget 2: Selector de Producto Comprado */}
        {message.productPicker && (
          <ProductPickerWidget
            storeName={message.productPicker.storeName}
            products={message.productPicker.products}
            onSelectProduct={(p) => onSelectPurchasedProduct?.(p)}
          />
        )}

        {/* Widget 3: Calificación con Estrellas (Compra o Concierge) */}
        {message.ratingWidget && (
          <RatingWidget
            title={message.ratingWidget.title}
            subtitle={message.ratingWidget.subtitle}
            submittedRating={message.ratingWidget.submittedRating}
            onRate={(stars) => {
              if (message.ratingWidget?.type === 'purchase') {
                onRatePurchase?.(stars);
              } else {
                onRateConcierge?.(stars);
              }
            }}
          />
        )}

        {/* Widget 4: Selector de Bebidas Frías/Calientes */}
        {message.drinkWidget && (
          <DrinkCardsWidget
            drinks={message.drinkWidget.drinks}
            selectedDrinkId={message.drinkWidget.selectedDrinkId}
            onSelectDrink={(d) => onDrinkSelect?.(d.id)}
          />
        )}

        {/* Widget 5: Despedida y Resumen de Puntos de Fidelidad */}
        {message.farewellWidget && (
          <FarewellWidget
            pointsEarned={message.farewellWidget.pointsEarned}
            drinkName={message.farewellWidget.drinkName}
            storeName={message.farewellWidget.storeName}
            onRestart={() => onRestartSession?.()}
            onExploreMall={() => onActionCta('navigate', 'local_13')}
          />
        )}

        {/* Vitrina de Productos con Tarjeta de Tienda Activa */}
        {hasProducts && (() => {
          const activeStoreOpt = message.storeOptions?.find(
            (o) => o.storeId === message.activeStoreId
          ) || {
            storeId: message.activeStoreId || 'store-zara',
            storeName: message.activeStoreName || 'ZARA',
            targetNodeId: 'node-67',
            floorLabel: 'Nivel Acuario (L2)',
            brandMonogram: 'Z',
            products: [],
          };

          return (
            <View style={styles.productsContainer}>
              {/* Tarjeta de Tienda Activa (Cabecera estilo UI Imagen) */}
              <View style={styles.activeStoreCard}>
                <View style={styles.activeStoreInfoLeft}>
                  <View style={styles.activeStoreMonogram}>
                    <Text style={styles.activeStoreMonogramText}>
                      {(activeStoreOpt.brandMonogram || activeStoreOpt.storeName.charAt(0)).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.activeStoreNameCol}>
                    <Text style={styles.activeStoreName}>{activeStoreOpt.storeName}</Text>
                    <Text style={styles.activeStoreFloor}>
                      {activeStoreOpt.floorLabel || 'Nivel Acuario (L2)'}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.activeStoreRouteBtn}
                  onPress={() => onNavigateToStore(activeStoreOpt.storeId)}
                  activeOpacity={0.8}
                >
                  <AppIcon name="paper-plane" size={13} color="#FFFFFF" />
                  <Text style={styles.activeStoreRouteText}>Trazar ruta</Text>
                </TouchableOpacity>
              </View>

              {/* Título de Colección Destacada */}
              <View style={styles.collectionHeaderRow}>
                <Text style={styles.collectionTitle}>
                  COLECCIÓN DESTACADA ({message.activeStoreProducts?.length || 0})
                </Text>
                <Text style={styles.collectionBrandName}>
                  {activeStoreOpt.storeName.toUpperCase()}
                </Text>
              </View>

              {/* Lista de Tarjetas de Productos */}
              {message.activeStoreProducts!.map((prod) => (
                <ConciergeProductCard
                  key={prod.id}
                  product={prod}
                  store={activeStoreOpt}
                  onPressDetail={(p, s) => {
                    setSheetProduct(p);
                    setSheetStore(s);
                  }}
                  onNavigateToStore={onNavigateToStore}
                />
              ))}
            </View>
          );
        })()}
      </View>

      {/* Modal / Bottom Sheet de Detalle de Producto */}
      <ConciergeProductSheet
        visible={!!sheetProduct}
        product={sheetProduct}
        store={sheetStore}
        onClose={() => {
          setSheetProduct(null);
          setSheetStore(null);
        }}
        onNavigateToStore={onNavigateToStore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  userBubble: {
    maxWidth: '82%',
    backgroundColor: '#2563EB', // Azul vibrante idéntico a la imagen de referencia
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 4, // Esquina superior derecha sin biselado (recta)
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  userFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 3,
  },
  userTimeText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '500',
  },
  botRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  botContentCol: {
    flex: 1,
  },
  botBubble: {
    alignSelf: 'flex-start',
    maxWidth: '88%',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopLeftRadius: 4, // Esquina superior izquierda sin biselado para el asistente
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFFFFF', // Blanco nítido con sombra suave
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  botHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  botTitle: {
    color: '#2563EB',
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  audioBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
    borderWidth: 1,
  },
  audioBtnText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  botText: {
    color: '#1E293B',
    fontSize: 14.5,
    fontWeight: '400',
    lineHeight: 22,
  },
  bulletsContainer: {
    marginTop: 10,
    marginBottom: 4,
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#2563EB',
    marginTop: 8,
  },
  bulletText: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  chipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  subchipBtn: {
    backgroundColor: '#F0F9FF',
    borderColor: '#BAE6FD',
  },
  chipText: {
    color: '#1E40AF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  subchipText: {
    color: '#0369A1',
  },
  storeChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 6,
  },
  storeChipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  storeChipBtnActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#2563EB',
  },
  storeChipText: {
    color: '#334155',
    fontSize: 12.5,
    fontWeight: '700',
  },
  storeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  storeChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  productsContainer: {
    marginTop: 10,
    width: '100%',
  },
  activeStoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  activeStoreInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  activeStoreMonogram: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStoreMonogramText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  activeStoreNameCol: {
    flex: 1,
  },
  activeStoreName: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  activeStoreFloor: {
    color: '#64748B',
    fontSize: 11.5,
    marginTop: 1,
    fontWeight: '500',
  },
  activeStoreRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#4338CA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeStoreRouteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  collectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  collectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#64748B',
  },
  collectionBrandName: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#2563EB',
  },
  storesContainer: {
    marginTop: 10,
    gap: 8,
  },
  storeCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  storeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drinkIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeName: {
    color: '#0F172A',
    fontSize: 13.5,
    fontWeight: '800',
  },
  storeFloor: {
    color: '#64748B',
    fontSize: 11.5,
    marginTop: 1,
  },
  storeDealText: {
    color: '#475569',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  actionCtaBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  actionCtaBtnText: {
    color: '#2563EB',
    fontSize: 12.5,
    fontWeight: '800',
  },
});
