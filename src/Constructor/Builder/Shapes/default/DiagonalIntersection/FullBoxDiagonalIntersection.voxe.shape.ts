import { VoxelMesher } from "../../../Tools/VoxelMesher.js";
import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";

export const FullBoxDiagonalIntersection: VoxelShapeInterface = {
 id: "FullBoxDiagonalIntersection",
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
  return data.default;
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
  return false;
 },
 addToChunkMesh() {
  let animationState = 0;
  if (VoxelMesher.data.getSubstance() == "flora") {
   animationState = 1;
  }
  VoxelMesher.quad.setDimensions(1, 1);
  VoxelMesher.setTemplateIncrement(false).templateData.loadIn("top");
  VoxelMesher.quad
   .setDirection("north")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 1)
   .setTransform(1, 0, 0, -1)
   .setTransform(4, 0, 0, -1)
   .create()
   .clearTransform();
  VoxelMesher.setTemplateIncrement(true).templateData.loadIn("top");
  VoxelMesher.quad
   .setDirection("north")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 0)
   .setTransform(1, 0, 0, 1)
   .setTransform(4, 0, 0, 1)
   .create()
   .clearTransform();

  VoxelMesher.setTemplateIncrement(false).templateData.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("south")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 0)
   .setTransform(1, 0, 0, 1)
   .setTransform(4, 0, 0, 1)
   .create()
   .clearTransform();

  VoxelMesher.setTemplateIncrement(true).templateData.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("south")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 1)
   .setTransform(1, 0, 0, -1)
   .setTransform(4, 0, 0, -1)
   .create()
   .clearTransform();
 },
};
