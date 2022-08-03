import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type { VoxelShapeAddData } from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";
export type sideTypes = "normal" | "stair-top" | "stair-side" | "side";
type StairAO = [number, number, number, number];
type _3Array = [number, number, number];
export type StairUVData = {
 r: Rotations;
 ws: number;
 we: number;
 hs: number;
 he: number;
};
export type stairBuildData = {
 type: sideTypes;
 flip?: {
  1?: boolean;
  2?: boolean;
 };
 dimensions?: {
  1: _3Array;
  2?: _3Array;
 };
 uvs?: {
  1: StairUVData;
  2: StairUVData;
 };
 StairAO?: {
  1: StairAO;
  2: StairAO;
 };
 transform?: {
  1?: _3Array;
  2?: _3Array;
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
const sd = {
 width: 0.5,
 depth: 0.5,
 height: 0.5,
};

const getAO = (aoValue: number, data: VoxelShapeAddData) => {
 if (aoValue <= 0) {
  return data.aoTemplate[data.aoIndex + Math.abs(aoValue)];
 }
 return aoValue;
};
const processAO = (stairAO: StairAO, data: VoxelShapeAddData) => {
 DVEB.shapeHelper.calculateAOColor(
  data.AOColors,
  [
   getAO(stairAO[0], data),
   getAO(stairAO[1], data),
   getAO(stairAO[2], data),
   getAO(stairAO[3], data),
  ],
  0
 );
};

const getBrighttestLight = (data: VoxelShapeAddData) => {
 let max = data.lightTemplate[data.lightIndex];
 if (max < data.lightTemplate[data.lightIndex + 1]) {
  max = data.lightTemplate[data.lightIndex + 1];
 }
 if (max < data.lightTemplate[data.lightIndex + 2]) {
  max = data.lightTemplate[data.lightIndex + 2];
 }
 if (max < data.lightTemplate[data.lightIndex + 3]) {
  max = data.lightTemplate[data.lightIndex + 3];
 }
 return max;
};

const processLight = (data: VoxelShapeAddData) => {
 const light = getBrighttestLight(data);
 DVEB.shapeHelper.calculateLightColorFromValue(
  data.RGBLightColors,
  data.sunLightColors,
  light
 );
};

const setPositon = (x: number, y: number, z: number) => {
 position.x = x;
 position.y = y;
 position.z = z;
};

const incrementIndexes = (data: VoxelShapeAddData) => {
 data.uvTemplateIndex += 1;
 data.overylayUVTemplateIndex += 4;
 data.lightIndex += 4;
 data.colorIndex += 4;
 data.aoIndex += 4;
};

const addUVs = (
 face: DirectionNames,
 data: VoxelShapeAddData,
 flip: boolean,
 uv: number,
 uvData: StairUVData
) => {
 DVEB.uvHelper.addUVs(face, {
  uvs: data.uvs,
  uv: uv,
  width: { start: uvData.ws, end: uvData.we },
  height: { start: uvData.hs, end: uvData.he },
  flipped: flip,
  rotoate: uvData.r,
 });
 DVEB.uvHelper.processOverlayUVs(data);
};

const addSide = (
 face: DirectionNames,
 stairData: stairBuildData,
 data: VoxelShapeAddData
) => {
 const uv = data.unTemplate[data.uvTemplateIndex];
 let dimensions = boxDimensions;
 let flip = false;
 if (stairData.flip && stairData.flip[1]) {
  flip = stairData.flip[1];
 }
 if (stairData.dimensions && stairData.dimensions[1]) {
  sd.width = stairData.dimensions[1][0];
  sd.depth = stairData.dimensions[1][1];
  sd.height = stairData.dimensions[1][2];
  dimensions = sd;
 }
 setPositon(
  stairCachedPosition.x + dimensions.width,
  stairCachedPosition.y + dimensions.height,
  stairCachedPosition.z + dimensions.depth
 );
 if (stairData.transform && stairData.transform[1]) {
  position.x = position.x + stairData.transform[1][0];
  position.y = position.y + stairData.transform[1][1];
  position.z = position.z + stairData.transform[1][2];
 }

 //lower
 DVEB.shapeBuilder.addFace(face, position, dimensions, data, flip);
 if (stairData.uvs && stairData.uvs[1]) {
  addUVs(face, data, flip, uv, stairData.uvs[1]);
 }
 if (stairData.StairAO && stairData.StairAO[1]) {
  processAO(stairData.StairAO[1], data);
 }

 processLight(data);

 //upper
 flip = false;
 if (stairData.flip && stairData.flip[2]) {
  flip = stairData.flip[2];
 }

 if (stairData.dimensions && stairData.dimensions[2]) {
  sd.width = stairData.dimensions[2][0];
  sd.depth = stairData.dimensions[2][1];
  sd.height = stairData.dimensions[2][2];
  dimensions = sd;
 }

 setPositon(
  stairCachedPosition.x + dimensions.width,
  stairCachedPosition.y + dimensions.height,
  stairCachedPosition.z + dimensions.depth
 );
 if (stairData.transform && stairData.transform[2]) {
  position.x = position.x + stairData.transform[2][0];
  position.y = position.y + stairData.transform[2][1];
  position.z = position.z + stairData.transform[2][2];
 }

 DVEB.shapeBuilder.addFace(face, position, dimensions, data, flip);
 if (stairData.uvs && stairData.uvs[2]) {
  addUVs(face, data, flip, uv, stairData.uvs[2]);
 }
 if (stairData.StairAO && stairData.StairAO[2]) {
  processAO(stairData.StairAO[2], data);
 }

 processLight(data);

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
 "stair-top": addSide,
 "stair-side": addSide,
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
