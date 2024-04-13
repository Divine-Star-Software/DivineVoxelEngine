import { LocationData } from "@divinevoxel/core/Math";
import { DVENodeMeshAttributes } from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types";
export type BuildNodeMesh = [location: LocationData, type: string, data: any];

export type SetNodeMesh = [
  location: LocationData,
  attributes: DVENodeMeshAttributes
];
