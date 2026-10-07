import React from 'react';
import { Group, Path } from '@shopify/react-native-skia';
import type { SceneItem } from '@mallos/map-engine';

interface Props {
  item: Extract<SceneItem, { kind: 'userTrail' }>;
}

export const UserTrail: React.FC<Props> = ({ item }) => (
  <Group>
    {item.segments.map((seg, i) => {
      if (seg.points.length < 2) return null;
      const pathStr = `M ${seg.points.map((p) => `${p.x} ${p.y}`).join(' L ')}`;
      return (
        <Path
          key={`trail-seg-${i}`}
          path={pathStr}
          color="#4F46E5"
          style="stroke"
          strokeWidth={3.5}
          strokeCap="round"
          strokeJoin="round"
          opacity={seg.opacity}
        />
      );
    })}
  </Group>
);
