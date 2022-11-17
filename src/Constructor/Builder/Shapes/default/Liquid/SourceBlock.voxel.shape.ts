import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Constructor/VoxelShape.types";

import { VoxelMesher } from "../../../Tools/VoxelMesher.js";
import { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types.js";

const vertexLevels = {
 v1l: 0,
 v2l: 0,
 v3l: 0,
 v4l: 0,

 v1v: 0,
 v2v: 0,
 v3v: 0,
 v4v: 0,
};

const sourceBlockTest = (data: VoxelShapeAddData) => {
 if (data.flowTemplate && data.flowTemplateIndex != undefined) {
  if (
   data.flowTemplate[data.flowTemplateIndex] == 15 &&
   data.flowTemplate[data.flowTemplateIndex + 1] == 15 &&
   data.flowTemplate[data.flowTemplateIndex + 2] == 15 &&
   data.flowTemplate[data.flowTemplateIndex + 3] == 15
  ) {
   return true;
  }
 }

 return false;
};

const flowState = { state: 0 };
const getAngle = (data: VoxelShapeAddData): TextureRotations => {
 if (sourceBlockTest(data)) {
  flowState.state = 0;
  return 0;
 }
 const v1 = vertexLevels.v1l;
 const v2 = vertexLevels.v2l;
 const v3 = vertexLevels.v3l;
 const v4 = vertexLevels.v4l;

 if (v1 == v2 && v3 == v4 && v1 == v4 && v2 == v3) {
  flowState.state = 0;
  return 0;
 }

 if (v2 == v3 && v1 == v4 && v2 > v1) {
  //flowing south
  flowState.state = 1;
  return 0;
 }
 if (v2 == v3 && v1 == v4 && v2 < v1) {
  //flowing north
  flowState.state = 2;
  return 0;
 }
 if (v2 == v1 && v3 == v4 && v1 > v4) {
  //flowing east
  flowState.state = 2;
  return 90;
 }
 if (v3 == v4 && v2 == v1 && v4 > v1) {
  //flowing west
  flowState.state = 1;
  return 90;
 }

 if (v2 < v4) {
  //flowing north west
  flowState.state = 2;
  return 315;
 }
 if (v2 > v4) {
  //flowing south east
  flowState.state = 1;
  return 315;
 }
 if (v1 > v3) {
  //flowing north east
  flowState.state = 2;
  return 45;
 }
 if (v1 < v3) {
  //flowing south west
  flowState.state = 1;
  return 45;
 }

 return 0;
};

const calculateVertexLevels = (data: VoxelShapeAddData) => {
 if (data.flowTemplate && data.flowTemplateIndex != undefined) {
  vertexLevels.v1l = data.flowTemplate[data.flowTemplateIndex];
  vertexLevels.v2l = data.flowTemplate[data.flowTemplateIndex + 1];
  vertexLevels.v3l = data.flowTemplate[data.flowTemplateIndex + 2];
  vertexLevels.v4l = data.flowTemplate[data.flowTemplateIndex + 3];
  vertexLevels.v1v = vertexLevels.v1l / 15 - 1;
  vertexLevels.v2v = vertexLevels.v2l / 15 - 1;
  vertexLevels.v3v = vertexLevels.v3l / 15 - 1;
  vertexLevels.v4v = vertexLevels.v4l / 15 - 1;
 }
};

const clearVertexLevels = (data: VoxelShapeAddData) => {
 if (data.flowTemplate && data.flowTemplateIndex != undefined) {
  vertexLevels.v1l = 0;
  vertexLevels.v2l = 0;
  vertexLevels.v3l = 0;
  vertexLevels.v4l = 0;
  vertexLevels.v1v = 0;
  vertexLevels.v2v = 0;
  vertexLevels.v3v = 0;
  vertexLevels.v4v = 0;
 }
};

export const LiquidVoxelShape: VoxelShapeInterface = {
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

  if (
   data.face == "top" &&
   data.neighborVoxel.getSubstance() != "liquid" &&
   data.currentVoxel.getStringId() != data.neighborVoxel.getStringId()
  ) {
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
  return data.default;
 },
 registerShapeAOFlipOverride(shapeId, func) {
  this.aoAddOverrideFunctions[shapeId] = func;
 },
 aoFlipOverride(data) {
  return false;
 },
 id: "LiquidSourceBlock",
 addToChunkMesh() {
  const data = VoxelMesher._data;
  VoxelMesher.quad.setDimensions(1, 1);
  flowState.state = 0;
  let topFaceExposed = false;
  if (VoxelMesher.face.loadIn("top").isExposed()) {
   calculateVertexLevels(data);
   topFaceExposed = true;
   const angle = getAngle(data);
   VoxelMesher.quad
    .setTransform(1, 0, vertexLevels.v1v, 0)
    .setTransform(2, 0, vertexLevels.v2v, 0)
    .setTransform(3, 0, vertexLevels.v3v, 0)
    .setTransform(4, 0, vertexLevels.v4v, 0)
    .uvs.setRoation(angle);

   VoxelMesher.quad
    .setDirection("top")
    .updatePosition(0.5, 1, 0.5)
    .addData(4, flowState.state, false)
    .create()
    .clearTransform()
    .uvs.setRoation(0);
  }

  if (VoxelMesher.face.loadIn("bottom").isExposed()) {
   VoxelMesher.quad
    .setDirection("bottom")
    .updatePosition(0.5, 0, 0.5)
    .addData(4, flowState.state, false)
    .create();
  }

  if(topFaceExposed) {
 //   VoxelMesher.quad.setDimensions(1, .8);
  }
  flowState.state = 1;
  VoxelMesher.quad.uvs.setRoation(0);
  if (VoxelMesher.face.loadIn("east").isExposed()) {
   VoxelMesher.quad
    .setDirection("east")
    .setFlipped(false)
    .updatePosition(1, 0.5, 0.5)
    .setTransform(1, 0, vertexLevels.v4v, 0)
    .setTransform(2, 0, vertexLevels.v3v, 0)
    .light.add()
    .oUVS.add()
    .setAnimationState(flowState.state)
    .create()
    .clearTransform();
   if (topFaceExposed) {
    VoxelMesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v4v);
    VoxelMesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v3v);
    VoxelMesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
   } else {
    VoxelMesher.quad.uvs.setRoation(0).add();
   }
  }
  if (VoxelMesher.face.loadIn("west").isExposed()) {
   VoxelMesher.quad
    .setDirection("west")
    .updatePosition(0, 0.5, 0.5)
    .setTransform(1, 0, vertexLevels.v2v, 0)
    .setTransform(2, 0, vertexLevels.v1v, 0)
    .light.add()
    .oUVS.add()
    .setAnimationState(flowState.state)
    .create()
    .clearTransform();
   if (topFaceExposed) {
    VoxelMesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v2v);
    VoxelMesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v1v);
    VoxelMesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
   } else {
    VoxelMesher.quad.uvs.add();
   }
  }
  if (VoxelMesher.face.loadIn("south").isExposed()) {
   VoxelMesher.quad
    .setDirection("south")
    .updatePosition(0.5, 0.5, 0)
    .setTransform(1, 0, vertexLevels.v1v, 0)
    .setTransform(2, 0, vertexLevels.v4v, 0)
    .light.add()
    .oUVS.add()
    .setAnimationState(flowState.state)
    .create()
    .clearTransform();
   if (topFaceExposed) {
    VoxelMesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v1v);
    VoxelMesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v4v);
    VoxelMesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
   } else {
    VoxelMesher.quad.uvs.add();
   }
  }
  if (VoxelMesher.face.loadIn("north").isExposed()) {
   VoxelMesher.quad
    .setDirection("north")
    .updatePosition(0.5, 0.5, 1)
    .setTransform(1, 0, vertexLevels.v3v, 0)
    .setTransform(2, 0, vertexLevels.v2v, 0)
    .light.add()
    .oUVS.add()
    .setAnimationState(flowState.state)
    .create()
    .clearTransform();

   if (topFaceExposed) {
    VoxelMesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v3v);
    VoxelMesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v2v);
    VoxelMesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
   } else {
    VoxelMesher.quad.uvs.add();
   }
  }

  clearVertexLevels(data);
 },
};
