import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Canvas,
  Group,
  Path,
} from '@shopify/react-native-skia';
import {
  useFrameCallback,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  computeFit,
  cameraFollowSmooth,
  type Camera,
  type Point,
  type Scene,
  type SceneItem,
} from '@mallos/map-engine';
import { compileScene } from './skia/compile-scene';
import { UserAvatar } from './UserAvatar';
import { VisionCone } from './VisionCone';
import { UserTrail } from './UserTrail';

const MIN_DT = 1 / 240;
const MAX_DT = 1 / 20;

export interface IsometricSkiaMapProps {
  scene: Scene;
  target: Point;
  zoom?: number;
  stiffness?: number;
}

export const IsometricSkiaMap: React.FC<IsometricSkiaMapProps> = ({
  scene,
  target,
  zoom = 1.5,
  stiffness = 8,
}) => {
  const { width, height } = useWindowDimensions();

  // 1) Compilar escena una sola vez en GPU paths (inmutable salvo cambio de escena)
  const compiled = useMemo(() => compileScene(scene), [scene]);

  // 2) Ajuste del viewBox de la escena a las dimensiones del contenedor
  const fit = useMemo(
    () => computeFit(compiled.viewBox, width, height),
    [compiled.viewBox, width, height]
  );

  // 3) Cámara y pulso de avatar como shared values (sin re-renders de React)
  const camera = useSharedValue<Camera>({ zoom: 1, tx: 0, ty: 0 });
  const pulse = useSharedValue(0);
  const lastTime = useSharedValue(0);

  // 4) Loop de animación en UI Thread con interpolación exponencial y respiración a 0.8 Hz
  useFrameCallback((frameInfo) => {
    const now = (frameInfo.timestamp ?? performance.now()) / 1000;
    const dt =
      lastTime.value === 0
        ? MIN_DT
        : Math.min(MAX_DT, Math.max(MIN_DT, now - lastTime.value));
    lastTime.value = now;

    camera.value = cameraFollowSmooth({
      current: camera.value,
      target,
      fit,
      zoom,
      dt,
      stiffness,
    });

    pulse.value = (pulse.value + dt * 0.8) % 1;
  });

  // 5) Transformación combinada de traslación y escala centrada
  const transform = useDerivedValue(() => [
    { translateX: camera.value.tx },
    { translateY: camera.value.ty },
    { scale: camera.value.zoom, origin: { x: width / 2, y: height / 2 } },
  ]);

  // Capas de presencia del usuario
  const userTrail = scene.items.filter((i): i is Extract<SceneItem, { kind: 'userTrail' }> => i.kind === 'userTrail');
  const visionCones = scene.items.filter((i): i is Extract<SceneItem, { kind: 'visionCone' }> => i.kind === 'visionCone');
  const userPins = scene.items.filter((i): i is Extract<SceneItem, { kind: 'userPin' }> => i.kind === 'userPin');

  return (
    <Canvas style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Group transform={transform}>
        {/* Capa 1: Locales y geometría base */}
        {compiled.polygons.map((p) => (
          <React.Fragment key={p.id}>
            <Path
              path={p.path}
              color={p.fill}
              style="fill"
              opacity={p.opacity}
            />
            {p.strokeWidth > 0 && (
              <Path
                path={p.path}
                color={p.stroke}
                style="stroke"
                strokeWidth={p.strokeWidth}
                opacity={p.opacity}
              />
            )}
          </React.Fragment>
        ))}

        {/* Capa 2: Trail de migas del recorrido */}
        {userTrail.map((t, i) => (
          <UserTrail key={`trail-${i}`} item={t} />
        ))}

        {/* Capa 3: Cono de visión direccional */}
        {visionCones.map((c, i) => (
          <VisionCone key={`cone-${i}`} item={c} />
        ))}

        {/* Capa 4: Avatar con respiración y pulso a 60 FPS */}
        {userPins.map((p, i) => (
          <UserAvatar key={`pin-${i}`} item={p} pulse={pulse} />
        ))}
      </Group>
    </Canvas>
  );
};

