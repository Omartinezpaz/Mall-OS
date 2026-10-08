import { useState, useMemo } from 'react';
import { sambilMall, type MallMapData } from '@mallos/map-engine';
import { isStoreOpenAt } from './IsometricMap';

export function useMallTime(mallData: MallMapData = sambilMall) {
  const [currentDate] = useState(() => new Date());

  const currentHour = currentDate.getHours() + currentDate.getMinutes() / 60;

  const timeFormatted = useMemo(() => {
    const h = currentDate.getHours();
    const m = currentDate.getMinutes();
    const padH = String(h).padStart(2, '0');
    const padM = String(m).padStart(2, '0');
    return `${padH}:${padM}`;
  }, [currentDate]);

  const openCount = useMemo(() => {
    return mallData.stores.filter((s) => isStoreOpenAt(s.id, currentHour, s.slug)).length;
  }, [mallData, currentHour]);

  return {
    currentHour,
    timeFormatted,
    openCount,
    totalStores: mallData.stores.length,
  };
}
