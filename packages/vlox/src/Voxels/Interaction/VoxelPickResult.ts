import {  Vector3Like } from "@amodx/math";
import { VoxelCursorInterface } from "../../Voxels/Cursor/VoxelCursor.interface";
import { closestVoxelFace, closestUnitNormal } from "../../Math/UtilFunctions";
import { VoxelFaces } from "../../Math";

export class VoxelPickResult {
  /**Closest unit normal of the ray direction */
  unitRayDirection: Vector3Like;
  /**Closest voxel face of the ray direction */
  unitRayVoxelFace: VoxelFaces;
  /**Closest unit normal of the picked normal */
  unitNormal: Vector3Like;
  /**Closest voxel face of the picked normal */
  unitNormalFace: VoxelFaces;
  delta: number;

  constructor(
    /**The origin of the ray */
    public rayOrigin: Vector3Like,
    /**The direction of the ray */
    public rayDirection: Vector3Like,
    /**The length of the ray */
    public rayLength: number,
    /**Cursor for the voxel that was hit */
    public voxel: VoxelCursorInterface,
    /**The space position of the voxel */
    public position: Vector3Like,
    /**The normal of the unit voxel that was hit */
    public normal: Vector3Like,
    /**The distance from the ray start to the intersection point */
    public distance: number,
    /**Position + the unit  normal */
    public normalPosition: Vector3Like
  ) {
    this.unitRayDirection = Vector3Like.FromArray(
      closestUnitNormal(this.rayDirection)
    );
    this.unitRayVoxelFace = closestVoxelFace(this.unitRayDirection);

    this.unitNormal = Vector3Like.FromArray(closestUnitNormal(this.normal));
    this.unitNormalFace = closestVoxelFace(this.unitNormal);
  }
}
