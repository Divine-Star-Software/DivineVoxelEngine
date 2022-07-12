import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Constructor/VoxelShape.types";
import { DirectionNames } from "Meta/Util.types.js";

type BoxFaceFunction = (data: VoxelShapeAddData) => void;

const shapeDimensions = {
 width: 0.5,
 depth: 0.5,
 height: 0.5,
};

const processDefaultFaceData = (
 face: DirectionNames,
 data: VoxelShapeAddData
) => {
 const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
 DVEB.shapeBuilder.addFace(face, data.position, shapeDimensions, data, flip);
 const uv = data.unTemplate[data.uvTemplateIndex];
 DVEB.uvHelper.addUVs(face, {
  uvs: data.uvs,
  uv: uv,
  width: { start: 0, end: 1 },
  height: { start: 0, end: 1 },
  flipped: flip,
  rotoate: 0,
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
 data.uvTemplateIndex += 1;
 data.overylayUVTemplateIndex += 4;
 data.lightIndex += 4;
 data.colorIndex += 4;
 data.aoIndex += 4;
};

const faceFunctions: Record<number, BoxFaceFunction> = {
 //add top face
 0: (data: VoxelShapeAddData) => {
  processDefaultFaceData("top", data);
 },
 //add bottom face
 1: (data: VoxelShapeAddData) => {
  processDefaultFaceData("bottom", data);
 },
 //add east face
 2: (data: VoxelShapeAddData) => {
  processDefaultFaceData("east", data);
 },
 //add west face
 3: (data: VoxelShapeAddData) => {
  processDefaultFaceData("west", data);
 },
 //add north face
 4: (data: VoxelShapeAddData) => {
  processDefaultFaceData("south", data);
 },
 //add south face
 5: (data: VoxelShapeAddData) => {
  processDefaultFaceData("north", data);
 },
};

export const BoxVoxelShape: VoxelShapeInterface = {
 id: "Box",
 addToChunkMesh(data: VoxelShapeAddData) {
  data.position.x += shapeDimensions.width;
  data.position.z += shapeDimensions.depth;
  data.position.y += shapeDimensions.height;
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
   faceFunctions[0](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
   faceFunctions[1](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
   faceFunctions[2](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
   faceFunctions[3](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
   faceFunctions[4](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
   faceFunctions[5](data);
  }
  return DVEB.shapeHelper.produceShapeReturnData(data);
 },
};
