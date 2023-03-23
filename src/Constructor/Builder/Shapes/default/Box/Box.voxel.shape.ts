import type { FaceDataOverride } from "../../../Types/Override.types.js";
import type { DirectionNames } from "Meta/Util.types.js";

import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadVertexData } from "../../../Classes/VertexData.js";

const animationState = new QuadVertexData();

export const BoxVoxelShape = {
 _createFace() {
  animationState.setAll(
    ShapeTool.data.voxel.getSubstance() == "#dve_flora" ? 3 : 0
  )
  ShapeTool.builder.quad
   .setDimensions(1, 1)
   .setFlipped(ShapeTool.data.isFaceFlipped())
   .AO.add(ShapeTool.data.getWorldAO())
   .light.add(ShapeTool.data.getWorldLight())
   .textures.add(ShapeTool.data.getUV())
   .overlayTexture.add(ShapeTool.data.getOverlayTextures())
   .animationState.add(animationState)
   .create();
 },
 add: {
  top() {
   ShapeTool.builder.quad.setDirection("top").updatePosition(0.5, 1, 0.5);
   BoxVoxelShape._createFace();
  },
  bottom() {
   ShapeTool.builder.quad.setDirection("bottom").updatePosition(0.5, 0, 0.5);
   BoxVoxelShape._createFace();
  },
  north() {
   ShapeTool.builder.quad.setDirection("north").updatePosition(0.5, 0.5, 1);
   BoxVoxelShape._createFace();
  },
  south() {
   ShapeTool.builder.quad.setDirection("south").updatePosition(0.5, 0.5, 0);
   BoxVoxelShape._createFace();
  },
  east() {
   ShapeTool.builder.quad.setDirection("east").updatePosition(1, 0.5, 0.5);
   BoxVoxelShape._createFace();
  },
  west() {
   ShapeTool.builder.quad.setDirection("west").updatePosition(0, 0.5, 0.5);
   BoxVoxelShape._createFace();
  },
 },
};

//cullface
OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_box", (data) => {
 return BoxCullFunctions[data.face](data);
});
OverrideManager.registerOverride("CullFace", "#dve_box", "Panel", (data) => {
 return true;
});
OverrideManager.registerOverride(
 "DarkenFaceUnderneath",
 "#dve_box",
 "All",
 (data) => {
  return true;
 }
);
OverrideManager.registerOverride(
 "CullFace",
 "#dve_box",
 "#dve_halfbox",
 (data) => {
  if (data.face == "top") {
   if (data.neighborVoxel.getShapeState() == 0) {
    return true;
   }
   return false;
  }
  return true;
 }
);
OverrideManager.registerOverride(
 "CullFace",
 "#dve_box",
 "#dve_stair",
 (data) => {
  StairCullFunctions[data.face](data);
  return true;
 }
);
//ao
OverrideManager.registerOverride("AO", "#dve_box", "Panel", (data) => {
 return false;
});
OverrideManager.registerOverride("AO", "#dve_box", "#dve_half_box", (data) => {
 if (data.face == "top") {
  if (data.neighborVoxel.getShapeState() == 0) {
   return true;
  }
  return false;
 }
 return true;
});

const StairCullFunctions: Record<
 DirectionNames,
 (data: FaceDataOverride) => boolean
> = {
 top: (data) => {
  const nVoxelShapeState = data.neighborVoxel.getShapeState();
  if (
   (nVoxelShapeState >= 0 && nVoxelShapeState <= 3) ||
   (nVoxelShapeState >= 8 && nVoxelShapeState <= 11)
  ) {
   return false;
  }
  return true;
 },
 bottom: (data) => {
  const nVoxelShapeState = data.neighborVoxel.getShapeState();
  if (
   (nVoxelShapeState >= 4 && nVoxelShapeState <= 7) ||
   (nVoxelShapeState >= 12 && nVoxelShapeState <= 15)
  ) {
   return false;
  }
  return true;
 },
 east: (data) => {
  const nVoxelShapeState = data.neighborVoxel.getShapeState();
  if (nVoxelShapeState == 1 || nVoxelShapeState == 5) return false;
  return true;
 },
 west: (data) => {
  const nVoxelShapeState = data.neighborVoxel.getShapeState();
  if (nVoxelShapeState == 3 || nVoxelShapeState == 7) return false;
  return true;
 },
 north: (data) => {
  const nVoxelShapeState = data.neighborVoxel.getShapeState();
  if (nVoxelShapeState == 0 || nVoxelShapeState == 4) return false;
  return true;
 },
 south: (data) => {
  const nVoxelShapeState = data.neighborVoxel.getShapeState();
  if (nVoxelShapeState == 2 || nVoxelShapeState == 6) return false;
  return true;
 },
};

//cull leaf faces
const BoxCullFunctions: Record<
 DirectionNames,
 (data: FaceDataOverride) => boolean
> = {
 top: (data) => {
  if (
   data.currentVoxel.getSubstance() == "#dve_flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2] + 1,
    data.currentVoxel.location[3]
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2] + 2,
    data.currentVoxel.location[3]
   )
  ) {
   return false;
  }
  return data.default;
 },
 bottom: (data) => {
  if (
   data.currentVoxel.getSubstance() == "#dve_flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2] - 1,
    data.currentVoxel.location[3]
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2] - 2,
    data.currentVoxel.location[3]
   )
  ) {
   return false;
  }
  return data.default;
 },
 east: (data) => {
  if (
   data.currentVoxel.getSubstance() == "#dve_flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1] + 1,
    data.currentVoxel.location[2],
    data.currentVoxel.location[3]
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1] + 2,
    data.currentVoxel.location[2],
    data.currentVoxel.location[3]
   )
  ) {
   return false;
  }
  return data.default;
 },
 west: (data) => {
  if (
   data.currentVoxel.getSubstance() == "#dve_flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1] - 1,
    data.currentVoxel.location[2],
    data.currentVoxel.location[3]
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1] - 2,
    data.currentVoxel.location[2],
    data.currentVoxel.location[3]
   )
  ) {
   return false;
  }
  return data.default;
 },
 north: (data) => {
  if (
   data.currentVoxel.getSubstance() == "#dve_flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2],
    data.currentVoxel.location[3] + 1
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2],
    data.currentVoxel.location[3] + 2
   )
  ) {
   return false;
  }
  return data.default;
 },
 south: (data) => {
  if (
   data.currentVoxel.getSubstance() == "#dve_flora" &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2],
    data.currentVoxel.location[3] - 1
   ) &&
   data.currentVoxel.isSameVoxel(
    data.currentVoxel.location[1],
    data.currentVoxel.location[2],
    data.currentVoxel.location[3] - 2
   )
  ) {
   return false;
  }
  return data.default;
 },
};
