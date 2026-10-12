import React from 'react';
import { Circle, Group } from '@shopify/react-native-skia';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import type { SceneItem } from '@mallos/map-engine';

interface Props {
  item: Extract<SceneItem, { kind: 'userPin' }>;
  pulse: SharedValue<number>;
}

export const UserAvatar: React.FC<Props> = ({ item, pulse }) => {
  // Radio pulsante con respiración suave (0.8 Hz) protegido contra NaN / undefined
  const radius = useDerivedValue(() => {
    const baseR = Number.isFinite(item?.radius) ? item.radius : 4;
    const p = Number.isFinite(pulse?.value) ? pulse.value : 0;
    return baseR + 1.8 * Math.sin(p * Math.PI * 2);
  });
  const haloRadius = useDerivedValue(() => {
    const baseR = Number.isFinite(item?.radius) ? item.radius : 4;
    const p = Number.isFinite(pulse?.value) ? pulse.value : 0;
    return baseR * 2.2 + 3.5 * Math.sin(p * Math.PI * 2);
  });

  return (
    <Group>
      {/* Halo exterior pulsante semitransparente */}
      <Circle cx={item.x} cy={item.y} r={haloRadius} color="#4F46E5" opacity={0.18} />
      {/* Pin de localización principal */}
      <Circle cx={item.x} cy={item.y} r={radius} color="#4F46E5" />
      {/* Núcleo de avatar blanco */}
      <Circle cx={item.x} cy={item.y} r={2.8} color="#FFFFFF" />
    </Group>
  );
};
