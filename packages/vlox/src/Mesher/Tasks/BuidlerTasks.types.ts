import { LocationData } from "../../Math";
import { DVENodeMeshAttributes } from "../../Interfaces/Render/Nodes/DVERenderNode.types";
export type BuildNodeMesh = [location: LocationData, type: string, data: any];

export type SetNodeMesh = [
  location: LocationData,
  attributes: DVENodeMeshAttributes
];
