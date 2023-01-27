import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
import { Register } from "../Register/Register.js";
class VDTags extends RemoteTagManager {
 voxelMap = new Uint16Array();
 substanceRecord = Register.voxels.substanceRecord;
 materialMap = Register.voxels.materialMap;
 colliderMap = Register.voxels.colliderMap;

 constructor(public id: string) {
  super(id);
 }

 sync(voxelMap: Uint16Array) {
  this.voxelMap = voxelMap;
 }

 setVoxel(id: number) {
  const index = this.voxelMap[id];
  this.setTagIndex(index);
 }

 getTrueSubstance(id: number) {
  this.setVoxel(id);
  return this.substanceRecord[this.getTag("#dve_substance")];
 }

 getMaterial(id: number) {
  this.setVoxel(id);
  const material = this.materialMap[this.getTag("#dve_material")];
  if (!material) return "none";
  return material;
 }
 getCollider(id: number) {
  this.setVoxel(id);
  const collider = this.colliderMap[this.getTag("#dve_collider_id")];
  if (!collider) return "none";
  return collider;
 }
}

export const VoxelTags = new VDTags("voxel-data");
