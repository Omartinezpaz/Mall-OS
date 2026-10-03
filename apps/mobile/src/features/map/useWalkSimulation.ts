import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { sambilMall, type RouteResult, type NavNode, type MallMapData } from '@mallos/map-engine';

interface UseWalkSimulationProps {
  mallData?: MallMapData;
  activeRoute: RouteResult | null;
  targetStoreName?: string;
  onArrival?: () => void;
  onFollowUserChange?: (follow: boolean) => void;
}

export function useWalkSimulation({
  mallData = sambilMall,
  activeRoute,
  targetStoreName = 'el local',
  onArrival,
  onFollowUserChange,
}: UseWalkSimulationProps) {
  const [isWalking, setIsWalking] = useState(false);
  const [walkSpeed, setWalkSpeed] = useState<number>(1);
  const [walkProgress, setWalkProgress] = useState<number>(0);
  const [arrivalMessage, setArrivalMessage] = useState<string | null>(null);
  const [userPlaneCoords, setUserPlaneCoords] = useState<{ x: number; y: number } | undefined>(undefined);
  const [userHeadingAngle, setUserHeadingAngle] = useState<number>(0);
  const [userNodeId, setUserNodeId] = useState<string>('pj-floor-autopista');

  const walkAnimRef = useRef<number | null>(null);

  const routeWaypoints = useMemo(() => {
    if (!activeRoute || activeRoute.nodeIds.length < 2) return [];
    const nodeMap = new Map<string, NavNode>(mallData.nodes.map((n) => [n.id, n]));
    return activeRoute.nodeIds
      .map((id) => nodeMap.get(id))
      .filter((n): n is NavNode => Boolean(n))
      .map((n) => ({ x: n.x, y: n.y, id: n.id }));
  }, [mallData, activeRoute]);

  const stopWalk = useCallback(() => {
    if (walkAnimRef.current) {
      cancelAnimationFrame(walkAnimRef.current);
      walkAnimRef.current = null;
    }
    setIsWalking(false);
  }, []);

  const startWalk = useCallback(() => {
    if (routeWaypoints.length < 2) return;
    stopWalk();
    if (onFollowUserChange) {
      onFollowUserChange(true);
    }
    setIsWalking(true);
    setArrivalMessage(null);

    const segments: { from: { x: number; y: number; id: string }; to: { x: number; y: number; id: string }; dist: number }[] = [];
    let totalDist = 0;
    for (let i = 0; i < routeWaypoints.length - 1; i++) {
      const from = routeWaypoints[i]!;
      const to = routeWaypoints[i + 1]!;
      const dist = Math.hypot(to.x - from.x, to.y - from.y);
      segments.push({ from, to, dist });
      totalDist += dist;
    }

    if (totalDist === 0) return;

    const speedUnitsPerSec = 65 * walkSpeed;
    const totalDurationMs = (totalDist / speedUnitsPerSec) * 1000;
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / totalDurationMs);
      setWalkProgress(progress);

      const targetTraveled = progress * totalDist;
      let accumulated = 0;
      let currentPos = { x: routeWaypoints[0]!.x, y: routeWaypoints[0]!.y };
      let heading = 0;
      let activeNodeId = routeWaypoints[0]!.id;

      for (const seg of segments) {
        if (accumulated + seg.dist >= targetTraveled) {
          const segProgress = (targetTraveled - accumulated) / seg.dist;
          currentPos = {
            x: seg.from.x + (seg.to.x - seg.from.x) * segProgress,
            y: seg.from.y + (seg.to.y - seg.from.y) * segProgress,
          };
          heading = (Math.atan2(seg.to.y - seg.from.y, seg.to.x - seg.from.x) * 180) / Math.PI;
          activeNodeId = segProgress > 0.5 ? seg.to.id : seg.from.id;
          break;
        }
        accumulated += seg.dist;
        currentPos = { x: seg.to.x, y: seg.to.y };
        activeNodeId = seg.to.id;
      }

      setUserPlaneCoords(currentPos);
      setUserHeadingAngle(heading);
      setUserNodeId(activeNodeId);

      if (progress < 1) {
        walkAnimRef.current = requestAnimationFrame(frame);
      } else {
        setIsWalking(false);
        const finalNode = routeWaypoints[routeWaypoints.length - 1];
        if (finalNode) {
          setUserNodeId(finalNode.id);
          setUserPlaneCoords({ x: finalNode.x, y: finalNode.y });
        }
        setArrivalMessage(`¡Llegaste a ${targetStoreName}! [SIMULACIÓN]`);
        if (onArrival) {
          onArrival();
        }
        setTimeout(() => setArrivalMessage(null), 4000);
      }
    };

    walkAnimRef.current = requestAnimationFrame(frame);
  }, [routeWaypoints, walkSpeed, stopWalk, targetStoreName, onArrival, onFollowUserChange]);

  useEffect(() => {
    return () => {
      if (walkAnimRef.current) {
        cancelAnimationFrame(walkAnimRef.current);
      }
    };
  }, []);

  const simulateStep = useCallback(() => {
    if (!userPlaneCoords && userNodeId) {
      const n = mallData.nodes.find((node: NavNode) => node.id === userNodeId);
      if (n) {
        setUserPlaneCoords({ x: n.x + 4, y: n.y + 4 });
      }
    } else if (userPlaneCoords) {
      setUserPlaneCoords((prev) => (prev ? { x: prev.x + 3, y: prev.y + 2 } : undefined));
    }
  }, [mallData, userPlaneCoords, userNodeId]);

  return {
    isWalking,
    walkSpeed,
    setWalkSpeed,
    walkProgress,
    arrivalMessage,
    userPlaneCoords,
    setUserPlaneCoords,
    userHeadingAngle,
    userNodeId,
    setUserNodeId,
    routeWaypoints,
    startWalk,
    stopWalk,
    simulateStep,
  };
}
