import { useEffect, useRef, useState, useCallback } from 'react';
import type { MallMapData, Point, RouteResult } from '@mallos/map-engine';

export interface UseWalkSimulationProps {
  mallData: MallMapData;
  activeRoute: RouteResult | null;
  targetStoreName?: string;
  /** Velocidad base de caminata en m/s. Default 1.2. */
  speedMps?: number;
  /** Multiplicador de velocidad (1, 2, 4, 8, 16). Default 2. */
  speedMultiplier?: number;
  /** Longitud del trail en metros. Default 15. */
  trailMeters?: number;
  /** Distancia entre muestras del trail en metros. Default 0.5. */
  trailSampleMeters?: number;
  onArrival?: () => void;
}

export interface WalkSimulationState {
  isWalking: boolean;
  position: Point | undefined;
  /** Heading en radianes (atan2(Δy, Δx)). undefined cuando está detenido. */
  heading: number | undefined;
  /** Últimos trailMeters metros recorridos, en coordenadas del plano. */
  trail: Point[];
  /** Progreso normalizado 0..1 a lo largo de la ruta. */
  walkProgress: number;
  /** Multiplicador actual (1, 2, 4, 8, 16). */
  speedMultiplier: number;
  setSpeedMultiplier: (n: number) => void;
  startWalk: () => void;
  stopWalk: () => void;
  resetWalk: () => void;
  arrivalMessage: string | null;
  clearArrivalMessage: () => void;
}

function getEffectiveSpeedMps(multiplier: number): number {
  switch (multiplier) {
    case 1:
      return 2.5; // ~2.5 m/s (caminata ágil)
    case 2:
      return 6.0; // ~6.0 m/s
    case 4:
      return 15.0; // ~15.0 m/s (recorre 100m en ~6s)
    case 8:
      return 35.0; // ~35.0 m/s (recorre 200m en ~5s)
    case 16:
      return 80.0; // ~80.0 m/s (instantáneo)
    default:
      return multiplier * 3.0;
  }
}

export function useWalkSimulation(props: UseWalkSimulationProps): WalkSimulationState {
  const {
    mallData,
    activeRoute,
    targetStoreName,
    speedMps = 1.2,
    speedMultiplier: initialMultiplier = 2,
    trailMeters = 15,
    trailSampleMeters = 0.5,
    onArrival,
  } = props;

  const metersPerUnit = mallData.metersPerUnit ?? 0.52;
  const trailUnits = trailMeters / metersPerUnit;
  const sampleUnits = trailSampleMeters / metersPerUnit;

  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState<Point | undefined>(undefined);
  const [heading, setHeading] = useState<number | undefined>(undefined);
  const [trail, setTrail] = useState<Point[]>([]);
  const [walkProgress, setWalkProgress] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(initialMultiplier);
  const [arrivalMessage, setArrivalMessage] = useState<string | null>(null);

  const lastSampleRef = useRef<Point | undefined>(undefined);
  const lastProgressRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const routeLengthRef = useRef(1);
  const arrivalTimerRef = useRef<NodeJS.Timeout | number | undefined>(undefined);

  const clearArrivalMessage = useCallback(() => {
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    setArrivalMessage(null);
  }, []);

  // Calcular waypoints y RESETEAR progreso cada vez que activeRoute cambie
  const waypoints = useRef<Point[]>([]);
  useEffect(() => {
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    setArrivalMessage(null);
    setIsWalking(false);
    setWalkProgress(0);
    lastProgressRef.current = 0;
    setHeading(undefined);

    if (!activeRoute || activeRoute.nodeIds.length === 0) {
      waypoints.current = [];
      setPosition(undefined);
      setTrail([]);
      return;
    }

    const byId = new Map(mallData.nodes.map((n) => [n.id, n]));
    waypoints.current = activeRoute.nodeIds
      .map((id) => byId.get(id))
      .filter((n): n is NonNullable<typeof n> => Boolean(n))
      .map((n) => ({ x: n.x, y: n.y }));

    // Longitud total de la ruta
    let total = 0;
    for (let i = 1; i < waypoints.current.length; i++) {
      total += Math.hypot(
        waypoints.current[i].x - waypoints.current[i - 1].x,
        waypoints.current[i].y - waypoints.current[i - 1].y
      );
    }
    routeLengthRef.current = Math.max(1, total);

    // Posición inicial = primer waypoint
    if (waypoints.current.length > 0) {
      const startPt = waypoints.current[0];
      setPosition(startPt);
      setTrail([startPt]);
      lastSampleRef.current = startPt;
    }
  }, [activeRoute?.nodeIds?.join(','), mallData.nodes]);

  // Loop de animación a 60 FPS
  useEffect(() => {
    if (!isWalking || waypoints.current.length < 2) return;

    let cancelled = false;
    let lastFrameTime = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
      lastFrameTime = now;

      // Avanzar a lo largo de la ruta con tabla calibrada de velocidad
      const effectiveSpeedMps = getEffectiveSpeedMps(speedMultiplier);
      const speedUnits = effectiveSpeedMps / metersPerUnit; // unidades/segundo
      const progressDelta = (speedUnits * dt) / routeLengthRef.current;
      const newProgress = Math.min(1, lastProgressRef.current + progressDelta);

      // Interpolar posición
      const pos = interpolateAlongRoute(waypoints.current, newProgress);

      // Heading (radianes en atan2(Δy, Δx))
      const lastPos = lastSampleRef.current;
      if (lastPos) {
        const dx = pos.x - lastPos.x;
        const dy = pos.y - lastPos.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.1) {
          setHeading(Math.atan2(dy, dx));
        }
      }

      // Trail: agregar muestra cada sampleUnits
      if (lastPos) {
        const dist = Math.hypot(pos.x - lastPos.x, pos.y - lastPos.y);
        if (dist >= sampleUnits) {
          setTrail((prev) => {
            const next = [...prev, pos];
            // Recortar a trailUnits
            let totalDist = 0;
            for (let i = next.length - 1; i > 0; i--) {
              totalDist += Math.hypot(
                next[i].x - next[i - 1].x,
                next[i].y - next[i - 1].y
              );
              if (totalDist > trailUnits) {
                return next.slice(i);
              }
            }
            return next;
          });
          lastSampleRef.current = pos;
        }
      }

      setPosition(pos);
      setWalkProgress(newProgress);
      lastProgressRef.current = newProgress;

      if (newProgress >= 1) {
        setIsWalking(false);
        setHeading(undefined);
        const msg = targetStoreName ? `¡Llegaste a ${targetStoreName}!` : '¡Llegaste a tu destino!';
        setArrivalMessage(msg);
        if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
        arrivalTimerRef.current = setTimeout(() => {
          setArrivalMessage(null);
        }, 4500);
        onArrival?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    isWalking,
    speedMps,
    speedMultiplier,
    metersPerUnit,
    sampleUnits,
    trailUnits,
    targetStoreName,
    onArrival,
  ]);

  // Controles
  const startWalk = useCallback(() => {
    if (!activeRoute) return;
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    setArrivalMessage(null);
    if (lastProgressRef.current >= 0.98) {
      lastProgressRef.current = 0;
      setWalkProgress(0);
      if (waypoints.current.length > 0) {
        setPosition(waypoints.current[0]);
        setTrail([waypoints.current[0]]);
        lastSampleRef.current = waypoints.current[0];
      }
    }
    setIsWalking(true);
  }, [activeRoute]);

  const stopWalk = useCallback(() => {
    setIsWalking(false);
    setHeading(undefined);
  }, []);

  const resetWalk = useCallback(() => {
    setIsWalking(false);
    lastProgressRef.current = 0;
    setWalkProgress(0);
    setHeading(undefined);
    if (arrivalTimerRef.current) clearTimeout(arrivalTimerRef.current);
    setArrivalMessage(null);
    if (waypoints.current.length > 0) {
      setPosition(waypoints.current[0]);
      setTrail([waypoints.current[0]]);
      lastSampleRef.current = waypoints.current[0];
    } else {
      setPosition(undefined);
      setTrail([]);
      lastSampleRef.current = undefined;
    }
  }, []);

  return {
    isWalking,
    position,
    heading,
    trail,
    walkProgress,
    speedMultiplier,
    setSpeedMultiplier,
    startWalk,
    stopWalk,
    resetWalk,
    arrivalMessage,
    clearArrivalMessage,
  };
}

// Helper: interpolar posición a lo largo de la polilínea de waypoints
function interpolateAlongRoute(waypoints: Point[], progress: number): Point {
  if (waypoints.length === 0) return { x: 0, y: 0 };
  if (waypoints.length === 1) return waypoints[0];

  let total = 0;
  const segments: number[] = [];
  for (let i = 1; i < waypoints.length; i++) {
    const d = Math.hypot(
      waypoints[i].x - waypoints[i - 1].x,
      waypoints[i].y - waypoints[i - 1].y
    );
    segments.push(d);
    total += d;
  }

  if (total === 0) return waypoints[0];

  const targetDist = progress * total;
  let acc = 0;
  for (let i = 0; i < segments.length; i++) {
    if (acc + segments[i] >= targetDist) {
      const segDist = segments[i];
      const t = segDist > 0 ? (targetDist - acc) / segDist : 0;
      return {
        x: waypoints[i].x + (waypoints[i + 1].x - waypoints[i].x) * t,
        y: waypoints[i].y + (waypoints[i + 1].y - waypoints[i].y) * t,
      };
    }
    acc += segments[i];
  }
  return waypoints[waypoints.length - 1];
}
