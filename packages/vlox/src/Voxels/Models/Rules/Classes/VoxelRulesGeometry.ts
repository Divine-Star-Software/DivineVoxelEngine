import { BuildStateData } from "../../../../Voxels/Functions/BuildStateData";
import {
  CullingProcedureData,
  VoxelGeometryData,
  VoxelGeometryNodes,
} from "../../../../Voxels/Models/VoxelModel.types";
import { CompileGeomtryNodes } from "../Functions/Compile/CompileGeomtryNodes";
import { CompiledGeomtryNodes } from "../../../../Mesher/Models/Nodes/Types/GeomtryNode.types";
import { GeomtryInput } from "./GeomtryInput";
import { VoxelGeometryTransform } from "Mesher/Geomtry/Geometry.types";
export interface VoxelRuleGeometryData {
  id: string;
  cullingProcedure: CullingProcedureData;
  ogData: VoxelGeometryData;
  nodes: {
    node: VoxelGeometryNodes;
    tranform: VoxelGeometryTransform;
  }[];
}
export class VoxelRuleGeometry {
  state: ReturnType<typeof BuildStateData>;
  input: GeomtryInput;
  compiled: CompiledGeomtryNodes[];

  constructor(
    public id: string,
    public data: VoxelRuleGeometryData
  ) {
    this.input = new GeomtryInput(data.ogData);

    this.compiled = CompileGeomtryNodes(
      data.ogData.doNotBuildRules !== true,
      this.input,
      data.nodes
    );
  }
}
