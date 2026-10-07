import React, { useMemo } from 'react';
import { Group, Path, Skia } from '@shopify/react-native-skia';
import type { SceneItem } from '@mallos/map-engine';

interface Props {
  item: Extract<SceneItem, { kind: 'visionCone' }>;
}

export const VisionCone: React.FC<Props> = ({ item }) => {
  const path = useMemo(() => {
    const p = Skia.Path.Make();
    p.moveTo(item.apex.x, item.apex.y);
    for (const pt of item.arc) {
      p.lineTo(pt.x, pt.y);
    }
    p.close();
    return p;
  }, [item]);

  return (
    <Group>
      <Path
        path={path}
        color="#4F46E5"
        style="fill"
        opacity={item.opacity}
      />
    </Group>
  );
};
