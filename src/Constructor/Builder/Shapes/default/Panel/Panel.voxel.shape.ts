import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";
import { VoxelMesher } from "../../../Tools/VoxelMesher.js";

let animationState = 0;

const shapeStates: Record<number, () => void> = {
 0: () => {
  VoxelMesher.face.loadIn("top");
  VoxelMesher.quad
   .setDirection("south")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 0.05)
   .create();
  VoxelMesher.face.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("north")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 0.05)
   .create();
 },
 1: () => {
  VoxelMesher.face.loadIn("top");
  VoxelMesher.quad
   .setDirection("north")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 0.95)
   .create();
  VoxelMesher.face.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("south")
   .addData(1, animationState)
   .updatePosition(0.5, 0.5, 0.95)
   .create();
 },
 2: () => {
  VoxelMesher.face.loadIn("top");
  VoxelMesher.quad
   .setDirection("east")
   .addData(1, animationState)
   .updatePosition(0.95, 0.5, 0.5)
   .create();
  VoxelMesher.face.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("west")
   .addData(1, animationState)
   .updatePosition(0.95, 0.5, 0.5)
   .create();
 },
 3: () => {
  VoxelMesher.face.loadIn("top");
  VoxelMesher.quad
   .setDirection("west")
   .addData(1, animationState)
   .updatePosition(0.05, 0.5, 0.5)
   .create();
  VoxelMesher.face.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("east")
   .addData(1, animationState)
   .updatePosition(0.05, 0.5, 0.5)
   .create();
 },
 4: () => {
  VoxelMesher.face.loadIn("top");
  VoxelMesher.quad
   .setDirection("top")
   .addData(1, animationState)
   .updatePosition(0.5, 0.05, 0.5)
   .create();
  VoxelMesher.face.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("bottom")
   .addData(1, animationState)
   .updatePosition(0.5, 0.05, 0.5)
   .create();
 },
 5: () => {
  VoxelMesher.face.loadIn("top");
  VoxelMesher.quad
   .setDirection("bottom")
   .addData(1, animationState)
   .updatePosition(0.5, 0.95, 0.5)
   .create();
  VoxelMesher.face.loadIn("bottom");
  VoxelMesher.quad
   .setDirection("top")
   .addData(1, animationState)
   .updatePosition(0.5, 0.95, 0.5)
   .create();
 },
};

export const PanelVoxelShape: VoxelShapeInterface = {
 id: "Panel",
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
  if (data.currentVoxel.getSubstance() == "flora") {
   return false;
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
  animationState = 0;
  if (VoxelMesher.data.getSubstance() == "flora") {
   animationState = 2;
  }
  VoxelMesher.quad.setDimensions(1, 1);
  const shapeState = VoxelMesher.data.getShapeState();
  shapeStates[shapeState]();
 },
};
