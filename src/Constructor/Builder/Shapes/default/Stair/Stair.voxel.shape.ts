import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type { VoxelShapeInterface } from "Meta/Constructor/VoxelShape.types";
import { buildStair, stairCachedPosition } from "./StairBuilder.js";
import { exposedChecks, StairData } from "./StairData.js";

export const StairVoxelShape: VoxelShapeInterface = {
 id: "Stair",
 cullFace(data) {
  if (exposedChecks[data.shapeState]) {
   return exposedChecks[data.shapeState](data);
  }
  return true;
 },
 aoOverRide(data) {
  return data.substanceResult;
 },
 addToChunkMesh(data) {
  stairCachedPosition.x = data.position.x;
  stairCachedPosition.y = data.position.y;
  stairCachedPosition.z = data.position.z;
  if (StairData[data.shapeState] !== undefined) {
   buildStair(data, StairData[data.shapeState]);
  }
  return DVEB.shapeHelper.produceShapeReturnData(data);
 },
};
