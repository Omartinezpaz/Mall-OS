import type { MallMapData } from '../types';
import { validateMapData } from '../validate';
import { findRoute } from '../routing';

export interface MapQualityReport {
  mallSlug: string;
  floorsCount: number;
  storesCount: number;
  navNodesCount: number;
  doorsCount: number;
  propsCount: number;
  verticalLinksCount: number;
  geometryErrors: {
    outOfBounds: number;
    overlaps: number;
    invalidRectangles: number;
  };
  navigationErrors: {
    unreachableStores: number;
    brokenEdges: number;
    invalidVerticalLinks: number;
    blockedDoors: number;
  };
  unreachableStoreIds: string[];
  rawValidationIssuesCount: number;
  isValid: boolean;
  formattedSummary: string;
}

export function generateMallQualityReport(mall: MallMapData): MapQualityReport {
  const validationIssues = validateMapData(mall);
  const errors = validationIssues.filter((i) => i.severity === 'error');

  const doors = mall.nodes.filter((n) => n.kind === 'door');
  const verticalNodes = mall.nodes.filter((n) => n.kind === 'stairs' || n.kind === 'elevator');
  const propsCount = mall.floors.reduce((acc, f) => acc + (f.props?.length ?? 0), 0);

  // Check reachability for all stores from entrance
  const entranceNode = mall.nodes.find((n) => n.kind === 'entrance') ?? mall.nodes[0];
  const unreachableStoreIds: string[] = [];

  if (entranceNode) {
    for (const store of mall.stores) {
      if (!store.doorNodeId) {
        unreachableStoreIds.push(store.id);
        continue;
      }
      const route = findRoute(mall, entranceNode.id, store.doorNodeId);
      if (!route) {
        unreachableStoreIds.push(store.id);
      }
    }
  }

  const outOfBounds = errors.filter((e) => e.code === 'NODE_OUT_OF_BOUNDS' || e.code === 'STORE_OUT_OF_BOUNDS' || e.code === 'PROP_OUT_OF_BOUNDS').length;
  const overlaps = errors.filter((e) => e.code === 'EDGE_CROSSES_OBSTACLE').length;
  const invalidRectangles = errors.filter((e) => e.code === 'INVALID_DIMENSIONS').length;

  const brokenEdges = errors.filter((e) => e.code === 'DISCONNECTED_NODE' || e.code === 'NODE_NOT_FOUND').length;
  const invalidVerticalLinks = errors.filter((e) => e.code === 'INVALID_VERTICAL_LINK').length;
  const blockedDoors = errors.filter((e) => e.code === 'DOOR_NODE_BLOCKED').length;

  const isValid = errors.length === 0 && unreachableStoreIds.length === 0;

  const formattedSummary = [
    `======================================================`,
    `  ${mall.mallSlug.toUpperCase()} — MAP QUALITY & INTEGRITY REPORT`,
    `======================================================`,
    `Floors:                 ${mall.floors.length}`,
    `Stores:                 ${mall.stores.length}`,
    `Navigation Nodes:       ${mall.nodes.length}`,
    `Doors:                  ${doors.length}`,
    `Props / POIs:           ${propsCount}`,
    `Vertical Nodes:         ${verticalNodes.length}`,
    ``,
    `[Geometry Integrity]`,
    `  Out of bounds:        ${outOfBounds}`,
    `  Edge / Store overlaps:${overlaps}`,
    `  Invalid rectangles:   ${invalidRectangles}`,
    ``,
    `[Navigation & Graph]`,
    `  Unreachable stores:   ${unreachableStoreIds.length}`,
    `  Broken edges:         ${brokenEdges}`,
    `  Invalid vertical links:${invalidVerticalLinks}`,
    `  Blocked doors:        ${blockedDoors}`,
    `  Total Errors:         ${errors.length}`,
    ``,
    `Status: ${isValid ? 'PASSED (Production Ready)' : 'FAILED (Fix Required)'}`,
    `======================================================`,
  ].join('\n');

  return {
    mallSlug: mall.mallSlug,
    floorsCount: mall.floors.length,
    storesCount: mall.stores.length,
    navNodesCount: mall.nodes.length,
    doorsCount: doors.length,
    propsCount,
    verticalLinksCount: verticalNodes.length,
    geometryErrors: {
      outOfBounds,
      overlaps,
      invalidRectangles,
    },
    navigationErrors: {
      unreachableStores: unreachableStoreIds.length,
      brokenEdges,
      invalidVerticalLinks,
      blockedDoors,
    },
    unreachableStoreIds,
    rawValidationIssuesCount: validationIssues.length,
    isValid,
    formattedSummary,
  };
}
