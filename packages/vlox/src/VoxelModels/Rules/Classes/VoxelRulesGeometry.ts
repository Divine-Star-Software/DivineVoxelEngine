import { GetOcclusionFaces } from "../Functions/GetOcclusionFaces";
import { OcclusionFaceContainer } from "./OcclusionFace";
import { BuildGeomtryInputs } from "../Functions/BuildGeomtryInputs";
import { BuildStateData } from "../../../VoxelData/Functions/BuildStateData";
import { PrcoessedVoxelGeometryData } from "../../../VoxelData/VoxelSyncData";

export class VoxelRuleGeometry {
  occlusionPlane: OcclusionFaceContainer;
  inputs: ReturnType<typeof BuildGeomtryInputs>;

  faceCount = 0;
  vertexCount = 0;
  state: ReturnType<typeof BuildStateData>;

  constructor(
    public id: string,
    public data: PrcoessedVoxelGeometryData,
    occlusionPlane?: OcclusionFaceContainer,
    inputs?: ReturnType<typeof BuildGeomtryInputs>
  ) {
    if (!occlusionPlane && data.ogData.doNotBuildRules !== true) {
      this.occlusionPlane = GetOcclusionFaces(this.id, this, data.nodes);
    } else {
      if (occlusionPlane) this.occlusionPlane = occlusionPlane;
    }

    !inputs && (this.inputs = BuildGeomtryInputs(this));
  }

  clone() {
    const newVoxel = new VoxelRuleGeometry(
      this.id,
      this.data,
      this.occlusionPlane.clone(),
      this.inputs
    );
    newVoxel.vertexCount = this.vertexCount;
    newVoxel.faceCount = this.faceCount;

    return newVoxel;
  }
}
