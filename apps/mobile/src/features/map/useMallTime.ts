import { useState, useMemo } from 'react';
import { sambilMall, type MallMapData } from '@mallos/map-engine';
import { isStoreOpenAt } from './IsometricMap';

export function useMallTime(mallData: MallMapData = sambilMall) {
  const [currentHour, setCurrentHour] = useState<number>(() => {
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60;
  });
  const [isSimulatingTime, setIsSimulatingTime] = useState(false);

  const openCount = useMemo(() => {
    return mallData.stores.filter((s) => isStoreOpenAt(s.id, currentHour)).length;
  }, [mallData, currentHour]);

  const resetToRealTime = () => {
    const now = new Date();
    setCurrentHour(now.getHours() + now.getMinutes() / 60);
  };

  return {
    currentHour,
    setCurrentHour,
    isSimulatingTime,
    setIsSimulatingTime,
    openCount,
    totalStores: mallData.stores.length,
    resetToRealTime,
  };
}
