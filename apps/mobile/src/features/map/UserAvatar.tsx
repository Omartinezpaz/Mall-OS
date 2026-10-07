import React from 'react';
import { Circle, Group } from '@shopify/react-native-skia';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import type { SceneItem } from '@mallos/map-engine';

interface Props {
  item: Extract<SceneItem, { kind: 'userPin' }>;
  pulse: SharedValue<number>;
}

export const UserAvatar: React.FC<Props> = ({ item, pulse }) => {
  // Radio pulsante con respiración suave (0.8 Hz)
  const radius = useDerivedValue(
    () => item.radius + 1.8 * Math.sin(pulse.value * Math.PI * 2)
  );
  const haloRadius = useDerivedValue(
    () => item.radius * 2.2 + 3.5 * Math.sin(pulse.value * Math.PI * 2)
  );

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
