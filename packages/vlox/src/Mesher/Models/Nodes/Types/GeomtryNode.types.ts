import { CompiledQuadVoxelGeomtryNode } from "./QuadVoxelGometryNodeTypes";
import { CompiledTriangleVoxelGeomtryNode } from "./TriangleVoxelGometryNodeTypes";

export type CompiledCustomGeomtryNode = {
  type: "custom";
  id: string;
};
export type CompiledGeomtryNodes =
  | CompiledQuadVoxelGeomtryNode
  | CompiledTriangleVoxelGeomtryNode
  | CompiledCustomGeomtryNode;
