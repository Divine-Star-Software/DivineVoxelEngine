import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";

export type sideTypes = "normal" | "stair-top" | "stair-side" | "side";

export type stairBuildData = {
 type: sideTypes;
 _2dDimensionType?: boolean;
 reverse?: boolean;
 transform1?: {
  x: number;
  y: number;
  z: number;
 };
 transform2?: {
  x: number;
  y: number;
  z: number;
 };
};

export const stairCachedPosition = {
 x: 0,
 y: 0,
 z: 0,
};
const position = {
 x: 0,
 y: 0,
 z: 0,
};

const boxDimensions = {
 width: 0.5,
 depth: 0.5,
 height: 0.5,
};
const topHalf1 = {
 width: 0.5,
 depth: 0.25,
 height: 0.5,
};
const topHalf2 = {
 width: 0.25,
 depth: 0.5,
 height: 0.5,
};
const sideHalf = {
 width: 0.5,
 depth: 0.5,
 height: 0.25,
};
const sideQuater1 = {
 width: 0.5,
 depth: 0.25,
 height: 0.25,
};
const sideQuater2 = {
 width: 0.25,
 depth: 0.5,
 height: 0.25,
};

const tempAOTemplte = (
 type: "top" | "side",
 side: "top" | "bottom",
 data: VoxelShapeAddData,
 v1 = 1,
 v2 = 1
) => {
 if (type == "top") {
  if (side == "top") {
   return [
    data.aoTemplate[data.aoIndex],
    v1,
    v2,
    data.aoTemplate[data.aoIndex + 3],
   ];
  }
  if (side == "bottom") {
   return [
    v1,
    data.aoTemplate[data.aoIndex + 2],
    data.aoTemplate[data.aoIndex + 3],
    v2,
   ];
  }
 }
 if (type == "side") {
  if (side == "top") {
   return [
    v1,
    data.aoTemplate[data.aoIndex],
    data.aoTemplate[data.aoIndex + 1],
    v2,
   ];
  }
  if (side == "bottom") {
   return [
    v1,
    v2,
    data.aoTemplate[data.aoIndex + 2],
    data.aoTemplate[data.aoIndex + 3],
   ];
  }
 }
 return [1, 1, 1, 1];
};

const tempLightTemplte = (
 type: "top" | "side",
 side: "top" | "bottom",
 data: VoxelShapeAddData
) => {
 if (type == "top") {
  if (side == "top") {
   return [
    data.lightTemplate[data.lightIndex],
    data.lightTemplate[data.lightIndex + 1],
    data.lightTemplate[data.lightIndex + 2],
    data.lightTemplate[data.lightIndex + 3],
   ];
  }
  if (side == "bottom") {
   return [
    data.lightTemplate[data.lightIndex],
    data.lightTemplate[data.lightIndex + 1],
    data.lightTemplate[data.lightIndex + 2],
    data.lightTemplate[data.lightIndex + 3],
   ];
  }
 }
 if (type == "side") {
  if (side == "top") {
   return [
    data.lightTemplate[data.lightIndex],
    data.lightTemplate[data.lightIndex + 1],
    data.lightTemplate[data.lightIndex + 2],
    data.lightTemplate[data.lightIndex + 3],
   ];
  }
  if (side == "bottom") {
   return [
    data.lightTemplate[data.lightIndex],
    data.lightTemplate[data.lightIndex + 1],
    data.lightTemplate[data.lightIndex + 2],
    data.lightTemplate[data.lightIndex + 3],
   ];
  }
 }
 return [1, 1, 1, 1];
};

const setPositon = (x: number, y: number, z: number) => {
 position.x = x;
 position.y = y;
 position.z = z;
};

const processDefaultFaceData = (
 face: DirectionNames,
 data: VoxelShapeAddData
) => {
 const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
 DVEB.shapeBuilder.addFace(face, position, boxDimensions, data, flip);
 const rotation = DVEB.shapeHelper.getTextureRotation(data.face, face);
 const uv = data.unTemplate[data.uvTemplateIndex];

 DVEB.uvHelper.addUVs(face, {
  uvs: data.uvs,
  uv: uv,
  width: { start: 0, end: 1 * data.LOD },
  height: { start: 0, end: 1 * data.LOD },
  flipped: flip,
  rotoate: rotation,
 });
 DVEB.uvHelper.processOverlayUVs(data);
 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  data.lightTemplate,
  data.lightIndex
 );
 DVEB.shapeHelper.calculateAOColor(
  data.AOColors,
  data.aoTemplate,
  data.aoIndex
 );

 DVEB.shapeHelper.addFaceData(0, data.faceData);
 incrementIndexes(data);
};

const incrementIndexes = (data: VoxelShapeAddData) => {
 data.uvTemplateIndex += 1;
 data.overylayUVTemplateIndex += 4;
 data.lightIndex += 4;
 data.colorIndex += 4;
 data.aoIndex += 4;
};
const addHalfUV = (
 face: DirectionNames,
 data: VoxelShapeAddData,
 uv: number,
 rotation: Rotations = 0,
 start: number,
 end: number,
 ws = 0,
 we = 1
) => {
 DVEB.uvHelper.addUVs(face, {
  uvs: data.uvs,
  uv: uv,
  width: { start: ws, end: we },
  height: { start: start, end: end },
  flipped: false,
  rotoate: rotation,
 });
 DVEB.uvHelper.processOverlayUVs(data);
};

const addStairTop = (
 face: DirectionNames,
 stairData: stairBuildData,
 data: VoxelShapeAddData
) => {
 const uv = data.unTemplate[data.uvTemplateIndex];
 let dimensions = topHalf1;
 let doing2nd = false;
 let reversed = false;
 if (stairData._2dDimensionType) {
  dimensions = topHalf2;
  doing2nd = true;
 }
 if (stairData.reverse) {
  reversed = true;
 }

 setPositon(
  stairCachedPosition.x + dimensions.width,
  stairCachedPosition.y + dimensions.height,
  stairCachedPosition.z + dimensions.depth
 );
 if (stairData.transform1) {
  position.x = position.x + stairData.transform1.x;
  position.y = position.y + stairData.transform1.y;
  position.z = position.z + stairData.transform1.z;
 }

 //upper
 DVEB.shapeBuilder.addFace(face, position, dimensions, data, false);

 if (!doing2nd) {
  addHalfUV(face, data, uv, 180, 0, 0.5);
 } else {
  addHalfUV(face, data, uv, 180, 0, 1, 0, 0.5);
 }

 if (!reversed) {
  DVEB.shapeHelper.calculateAOColor(
   data.AOColors,
   tempAOTemplte("top", "top", data),
   0
  );
 } else {
  if (!doing2nd) {
   DVEB.shapeHelper.calculateAOColor(data.AOColors, [1, 0.6, 0.6, 1], 0);
  } else {
   DVEB.shapeHelper.calculateAOColor(data.AOColors, [1, 1, 0.6, 0.6], 0);
  }
 }

 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  tempLightTemplte("top", "top", data),
  0
 );
 //lower
 setPositon(
  stairCachedPosition.x + dimensions.width,
  stairCachedPosition.y + dimensions.height,
  stairCachedPosition.z + dimensions.depth
 );
 if (stairData.transform2) {
  position.x = position.x + stairData.transform2.x;
  position.y = position.y + stairData.transform2.y;
  position.z = position.z + stairData.transform2.z;
 }

 DVEB.shapeBuilder.addFace(face, position, dimensions, data, false);

 if (!doing2nd) {
  addHalfUV(face, data, uv, 180, 0.5, 1);
 } else {
  addHalfUV(face, data, uv, 180, 0, 1, 0.5, 1);
 }

 if (!reversed) {
  if (!doing2nd) {
   DVEB.shapeHelper.calculateAOColor(data.AOColors, [0.6, 1, 1, 0.6], 0);
  } else {
   DVEB.shapeHelper.calculateAOColor(data.AOColors, [0.6, 0.6, 1, 1], 0);
  }
 } else {
  DVEB.shapeHelper.calculateAOColor(
   data.AOColors,
   tempAOTemplte("top", "top", data),
   0
  );
 }

 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  tempLightTemplte("top", "top", data),
  0
 );
 incrementIndexes(data);
};

const addStairSide = (
 face: DirectionNames,
 stairData: stairBuildData,
 data: VoxelShapeAddData
) => {
 const uv = data.unTemplate[data.uvTemplateIndex];
 setPositon(
  stairCachedPosition.x + sideHalf.width,
  stairCachedPosition.y + sideHalf.height,
  stairCachedPosition.z + sideHalf.depth
 );
 if (stairData.transform1) {
  position.x = position.x + stairData.transform1.x;
  position.y = position.y + stairData.transform1.y;
  position.z = position.z + stairData.transform1.z;
 }

 //lower
 DVEB.shapeBuilder.addFace(face, position, sideHalf, data, false);
 addHalfUV(face, data, uv, 0, 0.5, 1);
 DVEB.shapeHelper.calculateAOColor(
  data.AOColors,
  tempAOTemplte("side", "bottom", data),
  0
 );
 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  tempLightTemplte("side", "bottom", data),
  0
 );
 //upper
 if (stairData.transform2) {
  position.x = position.x + stairData.transform2.x;
  position.y = position.y + stairData.transform2.y;
  position.z = position.z + stairData.transform2.z;
 }

 DVEB.shapeBuilder.addFace(face, position, sideHalf, data, false);
 addHalfUV(face, data, uv, 0, 0, 0.5);
 DVEB.shapeHelper.calculateAOColor(data.AOColors, [1, 1, 0.6, 0.6], 0);
 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  tempLightTemplte("side", "top", data),
  0
 );
 incrementIndexes(data);
};

const addSide = (
 face: DirectionNames,
 stairData: stairBuildData,
 data: VoxelShapeAddData
) => {
 const eastUV = data.unTemplate[data.uvTemplateIndex];
 setPositon(
  stairCachedPosition.x + sideHalf.width,
  stairCachedPosition.y + sideHalf.height,
  stairCachedPosition.z + sideHalf.depth
 );
 if (stairData.transform1) {
  position.x = position.x + stairData.transform1.x;
  position.y = position.y + stairData.transform1.y;
  position.z = position.z + stairData.transform1.z;
 }

 //lower
 DVEB.shapeBuilder.addFace(face, position, sideHalf, data, false);
 addHalfUV(face, data, eastUV, 360, 0, 1, 0.5, 1);
 DVEB.shapeHelper.calculateAOColor(
  data.AOColors,
  tempAOTemplte("side", "bottom", data),
  0
 );
 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  tempLightTemplte("side", "bottom", data),
  0
 );
 //upper
 let quaterDim = sideQuater1;
 if (stairData._2dDimensionType) {
  quaterDim = sideQuater2;
 }
 setPositon(
  stairCachedPosition.x + quaterDim.width,
  stairCachedPosition.y + quaterDim.height,
  stairCachedPosition.z + quaterDim.depth
 );
 if (stairData.transform2) {
  position.x = position.x + stairData.transform2.x;
  position.y = position.y + stairData.transform2.y;
  position.z = position.z + stairData.transform2.z;
 }

 DVEB.shapeBuilder.addFace(face, position, quaterDim, data, false);
 addHalfUV(face, data, eastUV, 360, 0, 0.5, 0, 0.5);
 DVEB.shapeHelper.calculateAOColor(
  data.AOColors,
  tempAOTemplte("side", "top", data),
  0
 );
 DVEB.shapeHelper.calculateLightColor(
  data.RGBLightColors,
  data.sunLightColors,
  tempLightTemplte("side", "top", data),
  0
 );
 incrementIndexes(data);
};

const addNomral = (
 face: DirectionNames,
 stairData: stairBuildData,
 data: VoxelShapeAddData
) => {
 setPositon(
  stairCachedPosition.x + boxDimensions.width,
  stairCachedPosition.y + boxDimensions.height,
  stairCachedPosition.z + boxDimensions.depth
 );

 processDefaultFaceData(face, data);
};

const stairFunctions: Record<
 sideTypes,
 (
  face: DirectionNames,
  stairData: stairBuildData,
  data: VoxelShapeAddData
 ) => void
> = {
 normal: addNomral,
 side: addSide,
 "stair-top": addStairTop,
 "stair-side": addStairSide,
};

export const buildStair = (
 data: VoxelShapeAddData,
 stairData: Record<DirectionNames, stairBuildData>
) => {
 if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
  stairFunctions[stairData.top.type]("top", stairData.top, data);
 }
 if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
  stairFunctions[stairData.bottom.type]("bottom", stairData.bottom, data);
 }
 if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
  stairFunctions[stairData.east.type]("east", stairData.east, data);
 }
 if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
  stairFunctions[stairData.west.type]("west", stairData.west, data);
 }
 if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
  stairFunctions[stairData.south.type]("south", stairData.south, data);
 }
 if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
  stairFunctions[stairData.north.type]("north", stairData.north, data);
 }
};
