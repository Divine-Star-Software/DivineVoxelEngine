import { Builder } from "../../../Builder.js";
import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";
import { buildStair, stairCachedPosition } from "./StairBuilder.js";
import { StairData } from "./StairData.js";
import { StairAOBoxOverrides } from "./StairAO.overrides.js";
import { StairCullFace } from "./Stair.cullface.js";

export const StairVoxelShape: VoxelShapeInterface = {
 id: "Stair",
 cullFaceOverrideFunctions: {},
 aoAddOverrideFunctions: {},
 aoFlipOverrideFunctions: {},
 registerShapeForCullFaceOverride(shapeId, func) {
  this.cullFaceOverrideFunctions[shapeId] = func;
 },
 registerShapeAOAddOverride(shapeId, func) {
  this.aoAddOverrideFunctions[shapeId] = func;
 },
 cullFaceOverride(data) {
  if (
   this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]
  ) {
   return this.cullFaceOverrideFunctions[
    data.neighborVoxel.getVoxelShapeObj().id
   ](data);
  }
  return StairCullFace(data);
 },
 aoAddOverride(data) {
  if (this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
   return this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](
    data
   );
  }
  return data.default;
 },
 registerShapeAOFlipOverride(shapeId, func) {
  this.aoAddOverrideFunctions[shapeId] = func;
 },
 aoFlipOverride(data) {
  if (data.face == "top" || data.face == "bottom") return true;
  return false;
 },
 addToChunkMesh(data) {
  stairCachedPosition.x = data.position.x;
  stairCachedPosition.y = data.position.y;
  stairCachedPosition.z = data.position.z;
  if (StairData[data.shapeState] !== undefined) {
   buildStair(data, StairData[data.shapeState]);
  }
  return Builder.shapeHelper.produceShapeReturnData(data);
 },
};
StairVoxelShape.registerShapeAOAddOverride("Box", (data) => {
 return data.default;
});
