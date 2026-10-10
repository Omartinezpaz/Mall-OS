import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppIcon } from '../../../components/AppIcon';
import { MallOsSpriteIcon } from '../../../components/MallOsSpriteIcon';
import type { ConciergeDrink } from '../data/concierge-drinks';

interface DrinkCardsWidgetProps {
  drinks: ConciergeDrink[];
  onSelectDrink: (drink: ConciergeDrink) => void;
  selectedDrinkId?: string;
}

export const DrinkCardsWidget: React.FC<DrinkCardsWidgetProps> = ({
  drinks,
  onSelectDrink,
  selectedDrinkId,
}) => {
  const [filterTemp, setFilterTemp] = useState<'all' | 'cold' | 'hot'>('all');

  const filteredDrinks = useMemo(() => {
    if (filterTemp === 'all') return drinks;
    if (filterTemp === 'cold') {
      return drinks.filter((d) => d.temperature === 'cold' || d.temperature === 'frappe');
    }
    return drinks.filter((d) => d.temperature === 'hot');
  }, [drinks, filterTemp]);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.courtesyBadge}>
          <AppIcon name="gift" size={13} color="#059669" />
          <Text style={styles.courtesyBadgeText}>Cortesía Exclusiva</Text>
        </View>
        <Text style={styles.storeTag}>McCafé · Nivel Autopista</Text>
      </View>

      <Text style={styles.title}>¿Te provoca algo frío o caliente?</Text>
      <Text style={styles.subtitle}>
        Por registrar tu compra en Sambil Chacao, tu bebida de cortesía va por nuestra cuenta.
      </Text>

      {/* Temperature Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, filterTemp === 'all' && styles.tabBtnActive]}
          onPress={() => setFilterTemp('all')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, filterTemp === 'all' && styles.tabBtnTextActive]}>
            Todas ({drinks.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, filterTemp === 'cold' && styles.tabBtnActive]}
          onPress={() => setFilterTemp('cold')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, filterTemp === 'cold' && styles.tabBtnTextActive]}>
            Frías & Frappé
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, filterTemp === 'hot' && styles.tabBtnActive]}
          onPress={() => setFilterTemp('hot')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, filterTemp === 'hot' && styles.tabBtnTextActive]}>
            Calientes & Café
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal List of Drink Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredDrinks.map((drink) => {
          const isSelected = selectedDrinkId === drink.id;
          const isCold = drink.temperature === 'cold' || drink.temperature === 'frappe';

          return (
            <TouchableOpacity
              key={drink.id}
              style={[styles.drinkCard, isSelected && styles.drinkCardSelected]}
              onPress={() => onSelectDrink(drink)}
              activeOpacity={0.8}
            >
              <View style={styles.drinkTopRow}>
                <View
                  style={[
                    styles.tempPill,
                    { backgroundColor: isCold ? '#E0F2FE' : '#FEF3C7' },
                  ]}
                >
                  <Text
                    style={[
                      styles.tempPillText,
                      { color: isCold ? '#0369A1' : '#B45309' },
                    ]}
                  >
                    {drink.temperature === 'frappe'
                      ? 'Frappé'
                      : isCold
                      ? 'Fría'
                      : 'Caliente'}
                  </Text>
                </View>

                {drink.tier === 'signature' && (
                  <View style={styles.signatureBadge}>
                    <Text style={styles.signatureText}>Especial</Text>
                  </View>
                )}
              </View>

              <View style={styles.drinkIconContainer}>
                <MallOsSpriteIcon
                  name={isCold ? 'bebidas' : 'cafeteria'}
                  size={26}
                  showCircle={false}
                  color={isCold ? '#0284C7' : '#92400E'}
                />
              </View>

              <Text style={styles.drinkName} numberOfLines={2}>
                {drink.name}
              </Text>

              <Text style={styles.drinkDesc} numberOfLines={2}>
                {drink.description}
              </Text>

              <View style={styles.drinkFooterRow}>
                <Text style={styles.freePriceText}>GRATIS</Text>
                <Text style={styles.originalPriceText}>${drink.priceUsd.toFixed(2)}</Text>
              </View>

              <View style={[styles.actionBtn, isSelected && styles.actionBtnSelected]}>
                <Text style={[styles.actionBtnText, isSelected && styles.actionBtnTextSelected]}>
                  {isSelected ? 'Seleccionada' : 'Elegir'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  courtesyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  courtesyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  storeTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  title: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  tabBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtnActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 0,
    height: 215,
  },
  scrollContent: {
    paddingRight: 10,
    gap: 10,
    alignItems: 'flex-start',
  },
  drinkCard: {
    width: 145,
    height: 205,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'space-between',
  },
  drinkCardSelected: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  drinkTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tempPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tempPillText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  signatureBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  signatureText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#B45309',
  },
  drinkIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  drinkName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    height: 32,
    marginBottom: 2,
  },
  drinkDesc: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 13,
    height: 26,
    marginBottom: 8,
  },
  drinkFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  freePriceText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
  },
  originalPriceText: {
    fontSize: 10,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingVertical: 5,
    alignItems: 'center',
  },
  actionBtnSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  actionBtnTextSelected: {
    color: '#FFFFFF',
  },
});
