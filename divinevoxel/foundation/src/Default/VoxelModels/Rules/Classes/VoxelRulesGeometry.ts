import { Vec3Array } from "@amodx/math";
import { VoxelGeometryData } from "../../VoxelModel.types";
import { GetOcclusionFaces } from "../Functions/GetOcclusionFaces";
import { OcclusionFaceContainer } from "./OcclusionFace";
import { BuildGeomtryInputs } from "../Functions/BuildGeomtryInputs";
import { BuildStateData } from "../Functions/BuildStateData";

export class VoxelRuleGeometry {

  occlusionPlane: OcclusionFaceContainer;

  faceCount = 0;
  vertexCount = 0;
  state: ReturnType<typeof BuildStateData>;
  inputs: ReturnType<typeof BuildGeomtryInputs>;
  constructor(
    public id: string,
    public data: VoxelGeometryData,
    public position?: Vec3Array,
    public scale?: Vec3Array,
    public rotation?: Vec3Array
  ) {
    this.init(data);
  }


  private init(data: VoxelGeometryData) {
    this.occlusionPlane = GetOcclusionFaces(this.id, this, data.nodes);
    this.inputs = BuildGeomtryInputs(this);
  }

  clone() {
    const newVoxel = new VoxelRuleGeometry(
      this.id,
      this.data,
      this.position,
      this.scale,
      this.rotation
    );
    newVoxel.vertexCount = this.vertexCount;
    newVoxel.faceCount = this.faceCount;
    newVoxel.occlusionPlane = this.occlusionPlane.clone();
    return newVoxel;
  }
}