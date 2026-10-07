import { useMemo } from 'react';
import type { NavigationPlan, Point } from '@mallos/map-engine';

export interface StepProgress {
  currentStepIndex: number;
  progress: number;
}

export function useStepProgress(
  plan: NavigationPlan | null,
  userPosition: Point | undefined,
  mapNodes: Array<{ id: string; x: number; y: number }>
): StepProgress {
  return useMemo(() => {
    if (!plan || !userPosition || plan.steps.length === 0) {
      return { currentStepIndex: 0, progress: 0 };
    }

    const nodeById = new Map(mapNodes.map((n) => [n.id, n]));

    let closestIndex = 0;
    let closestDist = Infinity;
    for (let i = 0; i < plan.steps.length; i++) {
      const step = plan.steps[i]!;
      const node = nodeById.get(step.targetNodeId);
      if (!node) continue;
      const d = Math.hypot(userPosition.x - node.x, userPosition.y - node.y);
      if (d < closestDist) {
        closestDist = d;
        closestIndex = i;
      }
    }

    const total = plan.steps.length;
    const progress = Math.min(1, (closestIndex + 0.5) / total);

    return { currentStepIndex: closestIndex, progress };
  }, [plan, userPosition, mapNodes]);
}
