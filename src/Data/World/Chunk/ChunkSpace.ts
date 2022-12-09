import { Vector3 } from "Meta/Util.types.js";
import { Flat3DArray } from "../../Util/Flat3DArray.js";
import { WorldBounds } from "../WorldBounds.js";

export const ChunkSpace = {
 syncSettings() {
  //set index sizes
  this.hmBounds.x = WorldBounds.chunkXSize;
  this.hmBounds.z = WorldBounds.chunkXSize;
 },
 hmBounds: {
  x: 16,
  y: 2,
  z: 16,
 },
 getHeightMapIndex(x: number, y: number, z: number) {
  return x + y * this.hmBounds.x + z * this.hmBounds.z * this.hmBounds.y;
 },
 getVoxelDataIndex(x: number, y: number, z: number) {
  const voxPos = WorldBounds.getVoxelPosition(x, y, z);
  return Flat3DArray.getIndex(voxPos.x, voxPos.y, voxPos.z);
 },

 getHeightMapIndexUseObj(pos: Vector3) {
  const voxPos = WorldBounds.getVoxelPosition(pos.x, pos.y, pos.z);
  return (
   voxPos.x +
   voxPos.y * this.hmBounds.x +
   voxPos.z * this.hmBounds.z * this.hmBounds.y
  );
 },
 getVoxelDataIndexUseObj(pos: Vector3) {
  const voxPos = WorldBounds.getVoxelPosition(pos.x, pos.y, pos.z);
  return Flat3DArray.getIndex(voxPos.x, voxPos.y, voxPos.z);
 },
};
