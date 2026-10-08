import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKidsMode } from '../src/features/kids-mode/useKidsMode';
import { KidsOnboarding } from '../src/features/kids-mode/KidsOnboarding';
import { KidsTreasureMap } from '../src/features/kids-mode/KidsTreasureMap';
import { KidsQRScanner } from '../src/features/kids-mode/KidsQRScanner';
import { KidsRiddle } from '../src/features/kids-mode/KidsRiddle';
import { KidsVictory } from '../src/features/kids-mode/KidsVictory';
import { KidsPrize } from '../src/features/kids-mode/KidsPrize';

type KidsScreenView = 'map' | 'scanner' | 'riddle' | 'victory' | 'prize';

export default function KidsModeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ view?: string; storeId?: string; t?: string }>();
  const insets = useSafeAreaInsets();
  const topSafe = Math.max(insets.top, StatusBar.currentHeight ?? 0, 20);

  const {
    ageGroup,
    playerName,
    startAdventure,
    resetAdventure,
    unlockStoreQR,
    riddles,
    currentRiddleIndex,
    lastVisitedStoreId,
    prizeUnlocked,
  } = useKidsMode();

  const [currentView, setCurrentView] = useState<KidsScreenView>('map');
  const [activeRiddleIdx, setActiveRiddleIdx] = useState<number>(0);
  const lastHandledParamsTokenRef = React.useRef<string | null>(null);

  // Manejo de apertura directa desde el mapa (ej. llegar a la tienda y abrir escáner)
  useEffect(() => {
    if (params.view === 'scanner') {
      const token = `${params.view}_${params.storeId || ''}_${params.t || ''}`;
      if (lastHandledParamsTokenRef.current === token) return;
      lastHandledParamsTokenRef.current = token;

      if (params.storeId && riddles.length > 0) {
        const foundIdx = riddles.findIndex((r) => r.storeId === params.storeId);
        if (foundIdx !== -1) {
          setActiveRiddleIdx(foundIdx);
        } else {
          setActiveRiddleIdx(currentRiddleIndex);
        }
      } else {
        setActiveRiddleIdx(currentRiddleIndex);
      }
      setCurrentView('scanner');
    }
  }, [params.view, params.storeId, params.t, riddles, currentRiddleIndex]);

  const handleStartAdventure = (group: any, name: string, avatar: string, isFamily: boolean) => {
    startAdventure(group, name, avatar, isFamily);
    setCurrentView('map');
  };

  const handleOpenQRScanner = (idx: number) => {
    setActiveRiddleIdx(idx);
    setCurrentView('scanner');
  };

  const handleOpenRiddle = (idx: number) => {
    setActiveRiddleIdx(idx);
    setCurrentView('riddle');
  };

  const handleQRScanned = () => {
    const targetRiddle = riddles[activeRiddleIdx] || riddles[currentRiddleIndex];
    if (targetRiddle) {
      unlockStoreQR(targetRiddle.storeId);
    }
    setCurrentView('riddle');
  };

  const handleRiddleSuccess = () => {
    setCurrentView('victory');
  };

  const handleVictoryContinue = () => {
    if (prizeUnlocked) {
      setCurrentView('prize');
    } else {
      const nextIdx = Math.min(riddles.length - 1, currentRiddleIndex);
      setActiveRiddleIdx(nextIdx);
      const nextRiddle = riddles[nextIdx];
      if (nextRiddle) {
        handleNavigateToStoreMap(nextRiddle.storeId);
      } else {
        setCurrentView('map');
      }
    }
  };

  const handleNavigateToStoreMap = (storeId: string) => {
    const storeIdx = riddles.findIndex((r) => r.storeId === storeId);
    let originStoreId: string | undefined = undefined;
    if (lastVisitedStoreId && lastVisitedStoreId !== storeId) {
      originStoreId = lastVisitedStoreId;
    } else if (storeIdx > 0) {
      originStoreId = riddles[storeIdx - 1].storeId;
    }

    router.push({
      pathname: '/(tabs)/mapa',
      params: {
        storeId,
        originStoreId: originStoreId || undefined,
        kidsMode: 'true',
        playerName: playerName || 'Explorador',
        t: String(Date.now()),
      },
    });
  };

  const activeRiddle = riddles[activeRiddleIdx] || riddles[currentRiddleIndex];

  return (
    <View style={[styles.container, { paddingTop: topSafe }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {!ageGroup ? (
        <KidsOnboarding
          onStart={handleStartAdventure}
          onClose={() => router.back()}
        />
      ) : currentView === 'victory' ? (
        <KidsVictory
          onContinue={handleVictoryContinue}
          onViewTreasureMap={() => setCurrentView('map')}
        />
      ) : currentView === 'prize' ? (
        <KidsPrize
          onNavigateToMap={handleNavigateToStoreMap}
          onRestart={() => {
            resetAdventure();
            setCurrentView('map');
          }}
          onClose={() => router.back()}
        />
      ) : currentView === 'scanner' && activeRiddle ? (
        <KidsQRScanner
          riddle={activeRiddle}
          ageGroup={ageGroup}
          onScanned={handleQRScanned}
          onNavigateToStore={handleNavigateToStoreMap}
          onBack={() => setCurrentView('map')}
        />
      ) : currentView === 'riddle' && activeRiddle ? (
        <KidsRiddle
          riddle={activeRiddle}
          ageGroup={ageGroup}
          onSuccess={handleRiddleSuccess}
          onBack={() => setCurrentView('map')}
        />
      ) : (
        <KidsTreasureMap
          onOpenRiddle={handleOpenRiddle}
          onOpenQRScanner={handleOpenQRScanner}
          onOpenPrize={() => setCurrentView('prize')}
          onReset={resetAdventure}
          onNavigateToStore={handleNavigateToStoreMap}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

