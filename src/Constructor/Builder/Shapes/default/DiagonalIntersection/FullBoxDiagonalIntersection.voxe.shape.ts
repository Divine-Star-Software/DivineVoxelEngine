import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Constructor/VoxelShape.types";
import { Builder } from "../../../Builder.js";

const shapeDimensions = {
 width: 0.5,
 depth: 0.5,
 height: 0.5,
};

const processFace = (face: "north" | "south", data: VoxelShapeAddData) => {
 const uv = data.unTemplate[data.uvTemplateIndex];
 const rotation = Builder.shapeHelper.getTextureRotation(data.face, face);
 const flip = Builder.shapeHelper.shouldFaceFlip(data.face, face);
 for (let i = 0; i < 2; i++) {
  Builder.uvHelper.addUVs(face, {
   uvs: data.uvs,
   uv: uv,
   width: { start: 0, end: 1 },
   height: { start: 0, end: 1 },
   flipped: flip,
   rotoate: rotation,
  });
  Builder.uvHelper.processOverlayUVs(data);

  Builder.shapeHelper.calculateAOColorFromValue(
   data.AOColors,
   data.aoTemplate[data.aoIndex]
  );

  Builder.shapeHelper.calculateLightColorFromValue(
   data.RGBLightColors,
   data.sunLightColors,
   data.lightTemplate[data.lightIndex]
  );
 }

 if (data.substance == "flora") {
  let animData = Builder.shapeHelper.meshFaceData.setAnimationType(1, 0);
  Builder.shapeHelper.addFaceData(animData, data.faceData);
  Builder.shapeHelper.addFaceData(animData, data.faceData);
 } else {
  Builder.shapeHelper.addFaceData(0, data.faceData);
  Builder.shapeHelper.addFaceData(0, data.faceData);
 }

 data.uvTemplateIndex += 1;
 data.overylayUVTemplateIndex += 4;
 data.lightIndex += 1;
 data.colorIndex += 1;
 data.aoIndex += 1;
};

const transform1 = {
 v1: { x: 0, y: 0, z: -1 },
 v2: { x: 0, y: 0, z: 0 },
 v3: { x: 0, y: 0, z: 0 },
 v4: { x: 0, y: 0, z: -1 },
};
const transform2 = {
 v1: { x: 0, y: 0, z: 1 },
 v2: { x: 0, y: 0, z: 0 },
 v3: { x: 0, y: 0, z: 0 },
 v4: { x: 0, y: 0, z: 1 },
};
const faceFunctions: Record<number, (data: VoxelShapeAddData) => void> = {
 0: (data: VoxelShapeAddData) => {
  Builder.shapeBuilder.addFace(
   "north",
   data.position,
   shapeDimensions,
   data,
   false,
   transform1
  );
  Builder.shapeBuilder.addFace(
   "south",
   data.position,
   shapeDimensions,
   data,
   false,
   transform2
  );
  processFace("north", data);
 },

 1: (data: VoxelShapeAddData) => {
  data.position.z -= 1;
  Builder.shapeBuilder.addFace(
   "north",
   data.position,
   shapeDimensions,
   data,
   false,
   transform2
  );
  data.position.z += 2;
  Builder.shapeBuilder.addFace(
   "south",
   data.position,
   shapeDimensions,
   data,
   false,
   transform1
  );
  processFace("north", data);
 },
};

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
  if (this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
   return this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
  }
  return data.default;
 },
 aoAddOverride(data) {
  if (this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
   return this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
  }
  return data.default;
 },
 registerShapeAOFlipOverride(shapeId, func) {
  this.aoAddOverrideFunctions[shapeId] = func;
 },
 aoFlipOverride(data) {
  return false;
 },
 addToChunkMesh(data: VoxelShapeAddData) {
  data.position.x += shapeDimensions.width;
  data.position.z += shapeDimensions.depth;
  data.position.y += shapeDimensions.height;
  faceFunctions[0](data);
  faceFunctions[1](data);
  return Builder.shapeHelper.produceShapeReturnData(data);
 },
};
