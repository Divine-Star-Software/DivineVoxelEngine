import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
import { VoxelSubstanceType } from "Meta/index.js";
import { Register } from "../Register/Register.js";
class VDTags extends RemoteTagManager {
 voxelMap = new Uint16Array();
 substanceRecord = Register.voxels.substanceRecord;
 materialMap = Register.voxels.materialMap;
 colliderMap = Register.voxels.colliderMap;
 voxelData = {
  substance: <VoxelSubstanceType>"solid",
  shapeId: 0,
  hardness: 0,
  material: "none",
  checkCollision: 0,
  colliderId: "none",
  lightSource: 0,
  lightValue: 0,
  isRich: 0,
 };
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

 getVoxelData(id: number) {
  this.setVoxel(id);
  this.voxelData.substance = this.getTrueSubstance(id);
  this.voxelData.shapeId = this.getTag("#dve_shape_id");
  this.voxelData.hardness = this.getTag("#dve_hardness");
  this.voxelData.material = this.getMaterial(id);
  this.voxelData.checkCollision = this.getTag("#dve_check_collisions");
  this.voxelData.colliderId = this.getCollider(id);
  this.voxelData.lightSource = this.getTag("#dve_is_light_source");
  this.voxelData.lightValue = this.getTag("#dve_light_value");
  return this.voxelData;
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
