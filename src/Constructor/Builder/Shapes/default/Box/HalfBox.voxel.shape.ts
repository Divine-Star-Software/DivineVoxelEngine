import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";
import { VoxelMesher } from "../../../Tools/VoxelMesher.js";

export const HalfBoxVoxelShape: VoxelShapeInterface = {
 id: "HalfBox",
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
  if (data.neighborVoxel.getVoxelShapeObj().id == "Box") {
   if (data.face == "bottom") {
    if (data.currentVoxel.getShapeState() == 0) {
     return false;
    }
   }
   if (data.face == "top") {
    if (data.currentVoxel.getShapeState() == 1) {
     return false;
    }
   }

   return true;
  }
  return data.default;
 },
 aoAddOverride(data) {
  if (this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
   return this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](
    data
   );
  }
  const shapeState = data.currentVoxel.getShapeState();
  const neighborShape = data.neighborVoxel.getVoxelShapeObj();
  if (neighborShape.id == "Box") {
   if (shapeState == 1) {
    if (data.face == "top") {
     if (data.neighborVoxel.position.y > data.currentVoxel.position.y) {
      return true;
     }
    }
    if (data.neighborVoxel.position.y == data.currentVoxel.position.y) {
     return true;
    }
    return false;
   }
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
  VoxelMesher.quad.setDimensions(1, 1);
  let animationState = 0;
  if (VoxelMesher.data.getSubstance() == "flora") {
   animationState = 3;
  }
  const shapeState = VoxelMesher.data.getShapeState();
  let yAdd = 0;
  if (shapeState == 1) {
   yAdd = 0.5;
  }

  if (VoxelMesher.templateData.loadIn("top").isExposed()) {
   VoxelMesher.quad
    .setDirection("top")
    .updatePosition(0.5, 0.5 + yAdd, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (VoxelMesher.templateData.loadIn("bottom").isExposed()) {
   VoxelMesher.quad
    .setDirection("bottom")
    .updatePosition(0.5, 0 + yAdd, 0.5)
    .addData(4, animationState)
    .create();
  }

  VoxelMesher.quad.setDimensions(1, 0.5).uvs.setWidth(0, 1).setHeight(0, 0.5);

  if (VoxelMesher.templateData.loadIn("east").isExposed()) {
   VoxelMesher.quad
    .setDirection("east")
    .updatePosition(1, 0.25 + yAdd, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (VoxelMesher.templateData.loadIn("west").isExposed()) {
   VoxelMesher.quad
    .setDirection("west")
    .updatePosition(0, 0.25 + yAdd, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (VoxelMesher.templateData.loadIn("south").isExposed()) {
   VoxelMesher.quad
    .setDirection("south")
    .updatePosition(0.5, 0.25 + yAdd, 0)
    .addData(4, animationState)
    .create();
  }
  if (VoxelMesher.templateData.loadIn("north").isExposed()) {
   VoxelMesher.quad
    .setDirection("north")
    .updatePosition(0.5, 0.25 + yAdd, 1)
    .addData(4, animationState)
    .create();
  }
 },
};
