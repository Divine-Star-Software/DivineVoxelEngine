import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";

const cachedPosition = {
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
const topHalf = {
 width: 0.5,
 depth: 0.25,
 height: 0.5,
};
const sideHalf = {
 width: 0.5,
 depth: 0.5,
 height: 0.25,
};
const sideQuater = {
 width: 0.5,
 depth: 0.25,
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
    v1,
    data.aoTemplate[data.aoIndex],
    data.aoTemplate[data.aoIndex + 1],
    v2,
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
    data.aoTemplate[data.aoIndex + 2],
    data.aoTemplate[data.aoIndex + 3],
    v1,
    v2,
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
 start: number,
 end: number,
 ws = 0,
 we = 1,
 rotation: Rotations = 0
) => {
 DVEB.uvHelper.addUVs(face, {
  uvs: data.uvs,
  uv: uv,
  width: { start: ws, end: we },
  height: { start: start, end: end },
  flipped: false,
  rotoate: rotation,
 });
};

const shapeStates: Record<number, (data: VoxelShapeAddData) => void> = {
 0: (data) => {
  /**
#####################
#  TOP
##################### 
*/
  const topUV = data.unTemplate[data.uvTemplateIndex];
  setPositon(
   cachedPosition.x + topHalf.width,
   cachedPosition.y + topHalf.height,
   cachedPosition.z + topHalf.depth
  );
  //upper
  DVEB.shapeBuilder.addFace("top", position, topHalf, data, false);
  addHalfUV("top", data, topUV, 0, 0.5);
  DVEB.shapeHelper.calculateAOColor(data.AOColors, [1, 1, 1, 1], 0);
  //lower
  position.y -= 0.5;
  position.z += 0.5;
  DVEB.shapeBuilder.addFace("top", position, topHalf, data, false);
  addHalfUV("top", data, topUV, 0.5, 1);
  DVEB.shapeHelper.calculateAOColor(data.AOColors, [0.6, 1, 1, 0.6], 0);
  incrementIndexes(data);

  //################## Nomral
  setPositon(
   cachedPosition.x + boxDimensions.width,
   cachedPosition.y + boxDimensions.height,
   cachedPosition.z + boxDimensions.depth
  );
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
   processDefaultFaceData("bottom", data);
  }

  /**
#####################
#  EAST
##################### 
*/
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
   const eastUV = data.unTemplate[data.uvTemplateIndex];
   setPositon(
    cachedPosition.x + sideHalf.width,
    cachedPosition.y + sideHalf.height,
    cachedPosition.z + sideHalf.depth
   );
   //lower
   DVEB.shapeBuilder.addFace("east", position, sideHalf, data, false);
   addHalfUV("east", data, eastUV, 0.5, 1);
   DVEB.shapeHelper.calculateAOColor(
    data.AOColors,
    tempAOTemplte("side", "bottom", data),
    0
   );
   //upper
   setPositon(
    cachedPosition.x + sideQuater.width,
    cachedPosition.y + sideQuater.height,
    cachedPosition.z + sideQuater.depth
   );
   position.y += 0.5;
   DVEB.shapeBuilder.addFace("east", position, sideQuater, data, false);
   addHalfUV("east", data, eastUV, 0, 0.5, 0, 0.5);
   DVEB.shapeHelper.calculateAOColor(
    data.AOColors,
    tempAOTemplte("side", "bottom", data),
    0
   );
   incrementIndexes(data);
  }
  /**
#####################
#  WEST
##################### 
*/
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
   const westUV = data.unTemplate[data.uvTemplateIndex];
   setPositon(
    cachedPosition.x + sideHalf.width,
    cachedPosition.y + sideHalf.height,
    cachedPosition.z + sideHalf.depth
   );
   //lower
   DVEB.shapeBuilder.addFace("west", position, sideHalf, data, false);
   addHalfUV("west", data, westUV, 0.5, 1);
   DVEB.shapeHelper.calculateAOColor(
    data.AOColors,
    tempAOTemplte("side", "bottom", data),
    0
   );
   //upper
   setPositon(
    cachedPosition.x + sideQuater.width,
    cachedPosition.y + sideQuater.height,
    cachedPosition.z + sideQuater.depth
   );
   position.y += 0.5;
   DVEB.shapeBuilder.addFace("west", position, sideQuater, data, false);
   addHalfUV("west", data, westUV, 0.5, 0, 0.5, 0);
   DVEB.shapeHelper.calculateAOColor(
    data.AOColors,
    tempAOTemplte("side", "bottom", data),
    0
   );
   incrementIndexes(data);
  }

  //################## Nomral
  setPositon(
   cachedPosition.x + boxDimensions.width,
   cachedPosition.y + boxDimensions.height,
   cachedPosition.z + boxDimensions.depth
  );
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
   processDefaultFaceData("south", data);
  }
  /**
#####################
#  NORTH
##################### 
*/
  const southUV = data.unTemplate[data.uvTemplateIndex];
  setPositon(
   cachedPosition.x + sideHalf.width,
   cachedPosition.y + sideHalf.height,
   cachedPosition.z + sideHalf.depth
  );
  //lower
  DVEB.shapeBuilder.addFace("north", position, sideHalf, data, false);
  addHalfUV("south", data, southUV, 0.5, 1);
  DVEB.shapeHelper.calculateAOColor(
   data.AOColors,
   tempAOTemplte("side", "top", data),
   0
  );
  //upper
  position.y += 0.5;
  position.z -= 0.5;
  DVEB.shapeBuilder.addFace("north", position, sideHalf, data, false);
  addHalfUV("south", data, southUV, 0, 0.5);
  DVEB.shapeHelper.calculateAOColor(data.AOColors, [1, 1, 0.6, 0.6], 0);
  incrementIndexes(data);
 },
};

export const StairVoxelShape: VoxelShapeInterface = {
 id: "Stair",
 cullFace(
  face,
  substanceResult,
  shapeState,
  voxelData,
  neighborVoxelData,
  neighborVoxelShape,
  neighborVoxelShapeState
 ) {
  if (exposedChecks[shapeState]) {
   return exposedChecks[shapeState](
    face,
    shapeState,
    neighborVoxelShape,
    neighborVoxelShapeState
   );
  }
  return substanceResult;
 },
 addToChunkMesh(data) {
  /*   data.position.x += shapeDimensions.width * data.LOD;
  data.position.z += shapeDimensions.depth * data.LOD;
  data.position.y += shapeDimensions.height * data.LOD; */
  cachedPosition.x = data.position.x;
  cachedPosition.y = data.position.y;
  cachedPosition.z = data.position.z;

  shapeStates[data.shapeState](data);

  return DVEB.shapeHelper.produceShapeReturnData(data);
 },
};

const exposedChecks: Record<
 number,
 (
  face: DirectionNames,
  shapeState: number,
  nshape: VoxelShapeInterface,
  nshapeState: number
 ) => boolean
> = {
 0: (face, shapeState, nshape, nshapeState) => {
  if (face == "top" || face == "south") {
   return true;
  }
  if (nshape.id == "Stair") {
   if (face == "east" || face == "west") {
    if (shapeState == shapeState) return false;
   }
  }
  if (face == "bottom" || face == "north") {
   if (nshape.id == "Box") {
    if (shapeState == shapeState) return false;
   }
  }
  return true;
 },
};
