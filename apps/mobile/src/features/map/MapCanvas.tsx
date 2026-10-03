/**
 * MapCanvas: lienzo interactivo del mapa con aceleración nativa por hardware.
 *
 * Por qué es más fluido que la versión anterior:
 *  - La cámara (arrastre, zoom) y el avatar viven en valores `Animated` con driver nativo: moverlos
 *    NO vuelve a renderizar React ni a recrear los ~200 nodos SVG.
 *  - El mapa se dibuja una sola vez (memo) y solo cambia si cambia la escena.
 *  - Los toques se resuelven con matemática propia (pickStoreAt / screenToSvg), no con onPress de SVG,
 *    que compite con el gesto de arrastre.
 */
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Animated, Easing, PanResponder, StyleSheet, View, type GestureResponderEvent, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Polygon, Polyline, Rect, Text as SvgText } from 'react-native-svg';
import {
  baseScreen,
  cameraCentering,
  computeFit,
  pickStoreAt,
  pointAtProgress,
  screenToSvg,
  walkDurationMs,
  zoomAround,
  type Camera,
  type Point,
  type Scene,
  type SceneItem,
  type WalkTrack,
} from '@mallos/map-engine';

const MIN_ZOOM = 0.7;
const MAX_ZOOM = 4;
const TAP_SLOP = 8;
const AVATAR = 18;
const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

export interface MapCanvasHandle {
  zoomBy: (factor: number) => void;
  reset: () => void;
  focusOn: (p: Point, zoom?: number) => void;
}

export interface MapCanvasProps {
  scene: Scene;
  /** Posición del usuario (coordenadas del viewBox) cuando no hay recorrido. */
  userSvg?: Point;
  /** Recorrido animado. Si existe, el avatar sigue este recorrido. */
  track?: WalkTrack | null;
  walking?: boolean;
  /** Multiplicador de velocidad (1, 2…). */
  speed?: number;
  /** La cámara sigue al avatar. Un gesto del usuario llama a onUserGesture (el padre debe pausar y quitar el seguimiento). */
  follow?: boolean;
  onUserGesture?: () => void;
  /** Con true, el toque en el mapa se informa solo por onTapMap (modo "Estoy aquí"). */
  placing?: boolean;
  onPickStore?: (storeId: string) => void;
  /** Toque que no cayó sobre un local (o en modo `placing`), en coordenadas del viewBox. */
  onTapMap?: (p: Point) => void;
  onWalkEnd?: () => void;
}

// ---------- Dibujo del mapa (memoizado: no se repinta al mover la cámara ni el avatar) ----------
function renderItem(it: SceneItem, i: number): React.ReactElement | null {
  switch (it.kind) {
    case 'polygon':
      return <Polygon key={i} points={it.points.map((p) => `${p.x},${p.y}`).join(' ')} fill={it.fill} stroke={it.stroke} strokeWidth={it.strokeWidth} strokeLinejoin="round" opacity={it.opacity ?? 1} />;
    case 'polyline':
      return <Polyline key={i} points={it.points.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke={it.stroke} strokeWidth={it.strokeWidth} strokeDasharray={it.dash} strokeLinecap="round" strokeLinejoin="round" opacity={it.opacity ?? 1} />;
    case 'circle':
      return <Circle key={i} cx={it.x} cy={it.y} r={it.r} fill={it.fill} stroke={it.stroke} strokeWidth={it.strokeWidth ?? 1} opacity={it.opacity ?? 1} />;
    case 'ellipse':
      return <Ellipse key={i} cx={it.x} cy={it.y} rx={it.rx} ry={it.ry} fill={it.fill} opacity={it.opacity ?? 1} />;
    case 'text':
      // React Native SVG no soporta paint-order: el halo se dibuja como un texto gemelo debajo.
      return (
        <G key={i}>
          {it.halo ? <SvgText x={it.x} y={it.y} textAnchor="middle" fontSize={it.size} fontWeight={String(it.weight)} fill={it.halo} stroke={it.halo} strokeWidth={3} strokeLinejoin="round">{it.text}</SvgText> : null}
          <SvgText x={it.x} y={it.y} textAnchor="middle" fontSize={it.size} fontWeight={String(it.weight)} fill={it.fill}>{it.text}</SvgText>
        </G>
      );
    case 'badge': {
      const h = it.size / 2;
      const s = it.size;
      return (
        <G key={i} x={it.x} y={it.y}>
          <Rect x={-h} y={-h} width={s} height={s} rx={s * 0.28} fill={it.fill} stroke="#FFFFFF" strokeWidth={1.5} />
          {it.glyph === 'stairs' ? (
            <Polyline points={`${-0.3 * s},${0.28 * s} ${-0.1 * s},${0.28 * s} ${-0.1 * s},${0.08 * s} ${0.1 * s},${0.08 * s} ${0.1 * s},${-0.12 * s} ${0.3 * s},${-0.12 * s}`} fill="none" stroke="#FFFFFF" strokeWidth={s * 0.11} strokeLinecap="round" strokeLinejoin="round" />
          ) : it.glyph === 'elevator' ? (
            <G>
              <Polygon points={`0,${-0.3 * s} ${-0.14 * s},${-0.08 * s} ${0.14 * s},${-0.08 * s}`} fill="#FFFFFF" />
              <Polygon points={`0,${0.3 * s} ${-0.14 * s},${0.08 * s} ${0.14 * s},${-0.08 * s}`} fill="#FFFFFF" />
            </G>
          ) : (
            <SvgText y={s * 0.22} textAnchor="middle" fontSize={s * (it.glyph === 'wc' ? 0.4 : 0.64)} fontWeight="bold" fill="#FFFFFF">
              {it.glyph === 'info' ? 'i' : it.glyph === 'wc' ? 'WC' : '$'}
            </SvgText>
          )}
        </G>
      );
    }
    case 'pin':
      return (
        <G key={i} x={it.x} y={it.y}>
          <Path d="M0 22C-14 6-12-12 0-12C12-12 14 6 0 22Z" fill={it.fill} stroke="#FFFFFF" strokeWidth={2} />
          <Circle cx={0} cy={-1} r={4.5} fill="#FFFFFF" />
        </G>
      );
  }
}

const SceneLayer = memo(function SceneLayer({ scene, W, H }: { scene: Scene; W: number; H: number }) {
  const { x, y, w, h } = scene.viewBox;
  return (
    <Svg width={W} height={H} viewBox={`${x} ${y} ${w} ${h}`}>
      <Rect x={x} y={y} width={w} height={h} fill="#F8FAFC" />
      {scene.items.map(renderItem)}
    </Svg>
  );
});

// ---------- Componente ----------
export const MapCanvas = forwardRef<MapCanvasHandle, MapCanvasProps>(function MapCanvas(props, ref) {
  const { scene, userSvg, track = null, walking = false, speed = 1, follow = false } = props;
  const [size, setSize] = useState({ W: 360, H: 640 });
  const [camMode, setCamMode] = useState<'free' | 'follow'>('free');
  const fit = useMemo(() => computeFit(scene.viewBox, size.W, size.H), [scene.viewBox, size.W, size.H]);

  // Valores nativos: se mueven sin pasar por React.
  const zoomV = useRef(new Animated.Value(1)).current;
  const txV = useRef(new Animated.Value(0)).current;
  const tyV = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const camRef = useRef<Camera>({ zoom: 1, tx: 0, ty: 0 });
  const progressRef = useRef(0);

  // Constantes nativas para componer expresiones
  const consts = useMemo(() => ({ one: new Animated.Value(1), minusOne: new Animated.Value(-1), halfW: new Animated.Value(size.W / 2), halfH: new Animated.Value(size.H / 2) }), [size.W, size.H]);

  // Referencias para el PanResponder
  const live = useRef({ ...props, fit, camMode });
  live.current = { ...props, fit, camMode };

  const applyCam = useCallback((c: Camera) => {
    const cam = { zoom: clampZoom(c.zoom), tx: c.tx, ty: c.ty };
    camRef.current = cam;
    zoomV.setValue(cam.zoom);
    txV.setValue(cam.tx);
    tyV.setValue(cam.ty);
  }, [zoomV, txV, tyV]);

  useImperativeHandle(ref, () => ({
    zoomBy: (factor) => {
      const f = live.current.fit;
      const next = clampZoom(camRef.current.zoom * factor);
      applyCam(zoomAround(camRef.current, { x: f.W / 2, y: f.H / 2 }, next, f));
    },
    reset: () => applyCam({ zoom: 1, tx: 0, ty: 0 }),
    focusOn: (p, zoom) => applyCam(cameraCentering(p, live.current.fit, clampZoom(zoom ?? 1.6))),
  }), [applyCam]);

  // ----- Recorrido animado (driver nativo: cero trabajo de JS por cuadro) -----
  useEffect(() => {
    progress.setValue(0);
    progressRef.current = 0;
  }, [track, progress]);

  useEffect(() => {
    let cancelled = false;
    let anim: Animated.CompositeAnimation | null = null;
    progress.stopAnimation((v) => {
      if (cancelled) return;
      progressRef.current = v;
      if (!track || !walking) return;
      const remaining = Math.max(0, 1 - v);
      anim = Animated.timing(progress, { toValue: 1, duration: Math.max(1, walkDurationMs(track.totalMeters, speed) * remaining), easing: Easing.linear, useNativeDriver: true });
      anim.start(({ finished }) => {
        if (finished) {
          progressRef.current = 1;
          live.current.onWalkEnd?.();
        }
      });
    });
    return () => {
      cancelled = true;
      anim?.stop();
    };
  }, [track, walking, speed, progress]);

  // ----- Modo seguimiento: la cámara deriva del progreso, sin JS -----
  useEffect(() => {
    if (follow && track) {
      setCamMode('follow');
      return;
    }
    if (!follow && camMode === 'follow') {
      progress.stopAnimation((v) => {
        if (track) applyCam(cameraCentering(pointAtProgress(track, v), live.current.fit, camRef.current.zoom));
        setCamMode('free');
      });
    }
  }, [follow, track, camMode, progress, applyCam]);

  // ----- Posiciones del avatar y de la cámara de seguimiento -----
  const walkNodes = useMemo(() => {
    if (!track) return null;
    const xs = track.xs.map((x, i) => baseScreen({ x, y: track.ys[i] as number }, fit).x);
    const ys = track.xs.map((x, i) => baseScreen({ x, y: track.ys[i] as number }, fit).y);
    const ax = progress.interpolate({ inputRange: track.inputRange, outputRange: xs });
    const ay = progress.interpolate({ inputRange: track.inputRange, outputRange: ys });
    return {
      ax,
      ay,
      followTx: Animated.multiply(Animated.multiply(zoomV, consts.minusOne), Animated.subtract(ax, consts.halfW)),
      followTy: Animated.multiply(Animated.multiply(zoomV, consts.minusOne), Animated.subtract(ay, consts.halfH)),
    };
  }, [track, fit, progress, zoomV, consts]);

  const staticAvatar = useMemo(() => (userSvg ? baseScreen(userSvg, fit) : null), [userSvg, fit]);
  const invZoom = useMemo(() => Animated.divide(consts.one, zoomV), [consts, zoomV]);
  const followingNow = camMode === 'follow' && walkNodes !== null;

  // ----- Gestos -----
  const g = useRef({ cam0: { zoom: 1, tx: 0, ty: 0 } as Camera, dist0: 1, anchor0: { x: 0, y: 0 }, multi: false, moved: 0, base: { dx: 0, dy: 0 }, notified: false });
  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          g.current = { cam0: { ...camRef.current }, dist0: 1, anchor0: { x: 0, y: 0 }, multi: false, moved: 0, base: { dx: 0, dy: 0 }, notified: false };
        },
        onPanResponderMove: (e: GestureResponderEvent, gs) => {
          const s = g.current;
          const L = live.current;
          if (L.camMode === 'follow') {
            if (!s.notified && Math.hypot(gs.dx, gs.dy) > TAP_SLOP) {
              s.notified = true;
              L.onUserGesture?.();
            }
            return;
          }
          const t = e.nativeEvent.touches;
          if (t.length >= 2) {
            const a = t[0], b = t[1];
            if (!a || !b) return;
            const mid = { x: (a.locationX + b.locationX) / 2, y: (a.locationY + b.locationY) / 2 };
            const dist = Math.hypot(a.locationX - b.locationX, a.locationY - b.locationY);
            if (!s.multi) {
              s.multi = true;
              s.cam0 = { ...camRef.current };
              s.dist0 = Math.max(1, dist);
              s.anchor0 = mid;
            }
            const c = zoomAround(s.cam0, s.anchor0, clampZoom((s.cam0.zoom * dist) / s.dist0), L.fit);
            applyCam({ zoom: c.zoom, tx: c.tx + (mid.x - s.anchor0.x), ty: c.ty + (mid.y - s.anchor0.y) });
            s.moved = 99;
          } else {
            if (s.multi) {
              s.multi = false;
              s.cam0 = { ...camRef.current };
              s.base = { dx: gs.dx, dy: gs.dy };
            }
            s.moved = Math.max(s.moved, Math.hypot(gs.dx, gs.dy));
            applyCam({ zoom: s.cam0.zoom, tx: s.cam0.tx + gs.dx - s.base.dx, ty: s.cam0.ty + gs.dy - s.base.dy });
          }
        },
        onPanResponderRelease: (e: GestureResponderEvent) => {
          const s = g.current;
          const L = live.current;
          if (s.multi || s.moved >= TAP_SLOP || L.camMode === 'follow') return;
          const p = screenToSvg({ x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }, L.fit, camRef.current);
          if (L.placing) {
            L.onTapMap?.(p);
            return;
          }
          const id = pickStoreAt(L.scene, p);
          if (id) L.onPickStore?.(id);
          else L.onTapMap?.(p);
        },
      }),
    [applyCam],
  );

  const onLayout = (e: LayoutChangeEvent) => setSize({ W: e.nativeEvent.layout.width, H: e.nativeEvent.layout.height });

  return (
    <View style={styles.root} onLayout={onLayout}>
      <Animated.View
        renderToHardwareTextureAndroid
        style={[StyleSheet.absoluteFill, { transform: [{ translateX: followingNow && walkNodes ? walkNodes.followTx : txV }, { translateY: followingNow && walkNodes ? walkNodes.followTy : tyV }, { scale: zoomV }] }]}
      >
        <SceneLayer scene={scene} W={size.W} H={size.H} />
        {walkNodes ? (
          <Animated.View pointerEvents="none" style={[styles.avatarBox, { transform: [{ translateX: Animated.subtract(walkNodes.ax, AVATAR) }, { translateY: Animated.subtract(walkNodes.ay, AVATAR) }, { scale: invZoom }] }]}>
            <View style={styles.avatarHalo} />
            <View style={styles.avatarDot} />
          </Animated.View>
        ) : staticAvatar ? (
          <Animated.View pointerEvents="none" style={[styles.avatarBox, { transform: [{ translateX: staticAvatar.x - AVATAR }, { translateY: staticAvatar.y - AVATAR }, { scale: invZoom }] }]}>
            <View style={styles.avatarHalo} />
            <View style={styles.avatarDot} />
          </Animated.View>
        ) : null}
      </Animated.View>
      {/* Capa de toques: no se transforma, así que locationX/Y son coordenadas del contenedor. */}
      <View style={StyleSheet.absoluteFill} {...pan.panHandlers} />
    </View>
  );
});

const HALO = AVATAR * 2;
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC', overflow: 'hidden' },
  avatarBox: { position: 'absolute', left: 0, top: 0, width: HALO, height: HALO, alignItems: 'center', justifyContent: 'center' },
  avatarHalo: { position: 'absolute', width: HALO, height: HALO, borderRadius: HALO / 2, backgroundColor: '#3B82F6', opacity: 0.22 },
  avatarDot: { width: AVATAR * 0.7, height: AVATAR * 0.7, borderRadius: AVATAR, backgroundColor: '#2563EB', borderWidth: 2.5, borderColor: '#FFFFFF' },
});
