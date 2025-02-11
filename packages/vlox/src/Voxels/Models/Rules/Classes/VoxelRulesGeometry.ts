import { GetOcclusionFaces } from "../Functions/GetOcclusionFaces";
import { BuildGeomtryInputs } from "../Functions/BuildGeomtryInputs";
import { BuildStateData } from "../../../../Voxels/Functions/BuildStateData";
import { CompiledVoxelGeometryData } from "../../CompiledVoxelModel.types";

export class VoxelRuleGeometry {
  inputs: ReturnType<typeof BuildGeomtryInputs>;

  faceIds: number[] = [];
  faceCount = 0;
  vertexCount = 0;
  state: ReturnType<typeof BuildStateData>;

  constructor(
    public id: string,
    public data: CompiledVoxelGeometryData
  ) {
    if (data.ogData.doNotBuildRules !== true) {
      this.faceIds = GetOcclusionFaces(this.id, this, data.nodes);
    }

    this.inputs = BuildGeomtryInputs(this);
  }
}
