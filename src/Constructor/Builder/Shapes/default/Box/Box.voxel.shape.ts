import type { VoxelShape } from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
import type { FaceDataOverride } from "Meta/Constructor/OverRide.types.js";
import { OverrideManager } from "../../../Overrides/OverridesManager.js";

export const BoxVoxelShape: VoxelShape = {
 id: "Box",
 build(mesher) {
  mesher.quad.setDimensions(1, 1);
  let animationState = 0;
  if (mesher.data.getSubstance() == "flora") {
   animationState = 3;
  }
  if (mesher.templateData.loadIn("top").isExposed()) {
   mesher.quad
    .setDirection("top")
    .updatePosition(0.5, 1, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (mesher.templateData.loadIn("bottom").isExposed()) {
   mesher.quad
    .setDirection("bottom")
    .updatePosition(0.5, 0, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (mesher.templateData.loadIn("east").isExposed()) {
   mesher.quad
    .setDirection("east")
    .updatePosition(1, 0.5, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (mesher.templateData.loadIn("west").isExposed()) {
   mesher.quad
    .setDirection("west")
    .updatePosition(0, 0.5, 0.5)
    .addData(4, animationState)
    .create();
  }
  if (mesher.templateData.loadIn("south").isExposed()) {
   mesher.quad
    .setDirection("south")
    .updatePosition(0.5, 0.5, 0)
    .addData(4, animationState)
    .create();
  }
  if (mesher.templateData.loadIn("north").isExposed()) {
   mesher.quad
    .setDirection("north")
    .updatePosition(0.5, 0.5, 1)
    .addData(4, animationState)
    .create();
  }
 },
};

//cull leaf faces
const boxCullFunctions: Record<
 DirectionNames,
 (data: FaceDataOverride) => boolean
> = {
 top: (data) => {
  if (
   data.currentVoxel.getSubstance() == "flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y + 1,
    data.currentVoxel.position.z
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y + 2,
    data.currentVoxel.position.z
   )
  ) {
   return false;
  }
  return data.default;
 },
 bottom: (data) => {
  if (
   data.currentVoxel.getSubstance() == "flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y - 1,
    data.currentVoxel.position.z
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y - 2,
    data.currentVoxel.position.z
   )
  ) {
   return false;
  }
  return data.default;
 },
 east: (data) => {
  if (
   data.currentVoxel.getSubstance() == "flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x + 1,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x + 2,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z
   )
  ) {
   return false;
  }
  return data.default;
 },
 west: (data) => {
  if (
   data.currentVoxel.getSubstance() == "flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x - 1,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x - 2,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z
   )
  ) {
   return false;
  }
  return data.default;
 },
 north: (data) => {
  if (
   data.currentVoxel.getSubstance() == "flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z + 1
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z + 2
   )
  ) {
   return false;
  }
  return data.default;
 },
 south: (data) => {
  if (
   data.currentVoxel.getSubstance() == "flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z - 1
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.position.x,
    data.currentVoxel.position.y,
    data.currentVoxel.position.z - 2
   )
  ) {
   return false;
  }
  return data.default;
 },
};

//cullface
OverrideManager.registerOverride("CullFace", "Box", "Box", (data) => {

 return boxCullFunctions[data.face](data);
});
OverrideManager.registerOverride("CullFace", "Box", "Panel", (data) => {
 return true;
});
OverrideManager.registerOverride("CullFace", "Box", "HalfBox", (data) => {
 if (data.face == "top") {
  if (data.neighborVoxel.getShapeState() == 0) {
   return true;
  }
  return false;
 }
 return true;
});
OverrideManager.registerOverride("CullFace", "Box", "Stair", (data) => {
 stairCullFunctions[data.face](data);
 return true;
});
//ao
OverrideManager.registerOverride("AO", "Box", "Panel", (data) => {
 return false;
});
OverrideManager.registerOverride("AO", "Box", "HalfBox", (data) => {
 if (data.face == "top") {
  if (data.neighborVoxel.getShapeState() == 0) {
   return true;
  }
  return false;
 }
 return true;
});

const stairCullFunctions: Record<
 DirectionNames,
 (data: FaceDataOverride) => boolean
> = {
 top: (data) => {
  const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
  if (
   (neighborVoxelShapeState >= 0 && neighborVoxelShapeState <= 3) ||
   (neighborVoxelShapeState >= 8 && neighborVoxelShapeState <= 11)
  ) {
   return false;
  }
  return true;
 },
 bottom: (data) => {
  const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
  if (
   (neighborVoxelShapeState >= 4 && neighborVoxelShapeState <= 7) ||
   (neighborVoxelShapeState >= 12 && neighborVoxelShapeState <= 15)
  ) {
   return false;
  }
  return true;
 },
 east: (data) => {
  const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
  if (neighborVoxelShapeState == 1 || neighborVoxelShapeState == 5)
   return false;
  return true;
 },
 west: (data) => {
  const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
  if (neighborVoxelShapeState == 3 || neighborVoxelShapeState == 7)
   return false;
  return true;
 },
 north: (data) => {
  const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
  if (neighborVoxelShapeState == 0 || neighborVoxelShapeState == 4)
   return false;
  return true;
 },
 south: (data) => {
  const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
  if (neighborVoxelShapeState == 2 || neighborVoxelShapeState == 6)
   return false;
  return true;
 },
};
