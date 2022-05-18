import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Builder/Shapes/VoxelShape.interface";

type BoxFaceFunction = (data: VoxelShapeAddData) => void;

const shapeDimensions = {
 width: 0.5,
 depth: 0.5,
 height: 0.5,
};

const processDefaultFaceData = (data: VoxelShapeAddData, double = false) => {
 const uv = data.unTemplate[data.uvTemplateIndex];
 data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
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
 if (double) {
  data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
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
 }
 data.uvTemplateIndex += 1;
 data.lightIndex += 4;
 data.colorIndex += 4;
 data.aoIndex += 4;
};

const faceFunctions: Record<number, BoxFaceFunction> = {
 //add top face
 0: (data: VoxelShapeAddData) => {
  DVEB.shapeBuilder.addFace("top", data.position, shapeDimensions, data);
  data.position.y += shapeDimensions.height;
  DVEB.shapeBuilder.addFace("bottom", data.position, shapeDimensions, data);
  data.position.y -= shapeDimensions.height;
  processDefaultFaceData(data, true);
 },
 //add bottom face
 1: (data: VoxelShapeAddData) => {
  DVEB.shapeBuilder.addFace("bottom", data.position, shapeDimensions, data);
  processDefaultFaceData(data);
 },
 //add west face
 2: (data: VoxelShapeAddData) => {
  DVEB.shapeBuilder.addFace("west", data.position, shapeDimensions, data);
  processDefaultFaceData(data);
 },
 //add east face
 3: (data: VoxelShapeAddData) => {
  DVEB.shapeBuilder.addFace("east", data.position, shapeDimensions, data);
  processDefaultFaceData(data);
 },
 //add north
 4: (data: VoxelShapeAddData) => {
  DVEB.shapeBuilder.addFace("north", data.position, shapeDimensions, data);
  processDefaultFaceData(data);
 },
 //add south face
 5: (data: VoxelShapeAddData) => {
  DVEB.shapeBuilder.addFace("south", data.position, shapeDimensions, data);
  processDefaultFaceData(data);
 },
};

export const FluidSourceBlockVoxelShape: VoxelShapeInterface = {
 id: "FluidSourceBlock",
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
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
   faceFunctions[2](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
   faceFunctions[3](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
   faceFunctions[4](data);
  }
  if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
   faceFunctions[5](data);
  }
  return DVEB.shapeHelper.produceShapeReturnData(data);
 },
};