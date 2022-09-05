import { DVEW } from "../DivineVoxelEngineWorld.js";

export const MatrixMap = {
 shapeMap: <Record<string, number>>{},

 __shapeMapSet: false,

 isReady() {
  if (DVEW.environment == "node") {
   return true;
  } else {
   return this.__shapeMapSet;
  }
 },

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.__shapeMapSet = true;
 },

 flush() {
  (this as any).shapeMap = null;
 },
};
