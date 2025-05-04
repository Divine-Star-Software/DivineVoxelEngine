import { Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../Math";
import { RawVoxelData } from "../../Voxels/Types/Voxel.types";
import { VoxelCursor } from "../../Voxels/Cursor/VoxelCursor";

export interface VoxelPickResultData {
  /**The origin of the ray */
  rayOrigin: Vector3Like;
  /**The direction of the ray */
  rayDirection: Vector3Like;
  /**The length of the ray */
  rayLength: number;
  /**The space position of the voxel */
  position: Vector3Like;
  /**The normal of the unit voxel that was hit */
  normal: Vector3Like;
  /**The distance from the ray start to the intersection point */
  distance: number;
  /**Position + the unit  normal */
  normalPosition: Vector3Like;

  /**The voxel data */
  voxelData: RawVoxelData;

  /**Closest unit normal of the ray direction */
  unitRayDirection: Vector3Like;
  /**Closest voxel face of the ray direction */
  unitRayVoxelFace: VoxelFaces;
  /**Closest unit normal of the picked normal */
  unitNormal: Vector3Like;
  /**Closest voxel face of the picked normal */
  unitNormalFace: VoxelFaces;
  delta: number;
}

export class VoxelPickResult implements VoxelPickResultData {
  voxel: VoxelCursor;
  static FromJSON(data: VoxelPickResultData) {
    return new VoxelPickResult(
      data.rayOrigin,
      data.rayDirection,
      data.rayLength,
      data.voxelData,
      data.position,
      data.normal,
      data.distance,
      data.normalPosition,
      data.unitRayDirection,
      data.unitRayVoxelFace,
      data.unitNormal,
      data.unitNormalFace,
      data.delta
    );
  }
  constructor(
    public rayOrigin: Vector3Like,
    public rayDirection: Vector3Like,
    public rayLength: number,
    public voxelData: RawVoxelData,
    public position: Vector3Like,
    public normal: Vector3Like,
    public distance: number,
    public normalPosition: Vector3Like,
    public unitRayDirection: Vector3Like,
    public unitRayVoxelFace: VoxelFaces,
    public unitNormal: Vector3Like,
    public unitNormalFace: VoxelFaces,
    public delta: number
  ) {
    this.voxel = new VoxelCursor();
    this.voxel.setRaw(voxelData);
    this.voxel.loadIn();
  }

  toJSON(): VoxelPickResultData {
    return {
      rayOrigin: { ...this.rayOrigin },
      rayDirection: { ...this.rayDirection },
      rayLength: this.rayLength,
      position: { ...this.position },
      normal: { ...this.normal },
      distance: this.distance,
      normalPosition: { ...this.normalPosition },
      unitRayDirection: { ...this.unitRayDirection },
      unitRayVoxelFace: this.unitRayVoxelFace,
      unitNormal: { ...this.unitNormal },
      unitNormalFace: this.unitNormalFace,
      voxelData: [...this.voxelData],
      delta: this.delta,
    };
  }
}
