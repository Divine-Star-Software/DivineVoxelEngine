//types
import type { DirectionNames } from "Meta/Util.types.js";
import type { VoxelShapeAddData, VoxelShapeAddReturnData } from "Meta/index";
//objects
import { Util } from "../../../Global/Util.helper.js";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export const ShapeHelper = {
 faceByte: Util.getFaceByte(),
 lightByte: Util.getLightByte(),
 meshFaceData: Util.getMeshFaceDataByte(),
 //Use for producing the light gradient
 lightMap: [
  0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
  0.85, 0.97, 1,
 ],

 shouldFaceFlip(faceBit: number, faceDirection: DirectionNames) {
  return this.faceByte.getFaceRotateState(faceDirection, faceBit) == 1;
 },

 getTextureRotation(faceBit: number, faceDirection: DirectionNames) {
  return this.faceByte.getFaceTextureState(faceDirection, faceBit);
 },

 isFaceExposexd(faceBit: number, faceDirection: DirectionNames) {
  return this.faceByte.isFaceExposed(faceDirection, faceBit);
 },

 produceShapeReturnData(shapeData: VoxelShapeAddData): VoxelShapeAddReturnData {
  return {
   newIndicieIndex: shapeData.indicieIndex,
   newUVTemplateIndex: shapeData.uvTemplateIndex,
   newOverlayUVTemplateIndex: shapeData.overylayUVTemplateIndex,
   newColorIndex: shapeData.colorIndex,
   newlightIndex: shapeData.lightIndex,
   newAOIndex: shapeData.aoIndex,
   newFlowTemplateIndex: shapeData.flowTemplateIndex,
  };
 },

 toLinearSpace(r: number, g: number, b: number, a: number) {
  r = r ** 2.2;
  g = g ** 2.2;
  b = b ** 2.2;
  a = a * 1;
  return [r, g, b, a];
 },

 addFaceData(faceData: number, faceDataArray: number[]) {
  faceDataArray.push(faceData, faceData, faceData, faceData);
 },

 calculateLightColor(
  RGBlightColors: number[],
  sunlightColors: number[],
  lightTemplate: number[],
  startIndex: number
 ) {
  for (let v = 0; v < 4; v++) {
   const values = this.lightByte.getLightValues(lightTemplate[startIndex + v]);
   const s = this.lightMap[values[0]];
   const r = this.lightMap[values[1]];
   const g = this.lightMap[values[2]];
   const b = this.lightMap[values[3]];
   sunlightColors.push(s, s, s, 1);
   RGBlightColors.push(r, g, b, 1);
  }
 },

 calculateLightColorFromValue(
  RGBlightColors: number[],
  sunlightColors: number[],
  lightValue: number
 ) {
  const values = this.lightByte.getLightValues(lightValue);
  const w = this.lightMap[values[0]];
  const r = this.lightMap[values[1]];
  const g = this.lightMap[values[2]];
  const b = this.lightMap[values[3]];
  for (let v = 0; v < 4; v++) {
   sunlightColors.push(w, w, w, 1);
   RGBlightColors.push(r, g, b, 1);
  }
 },

 calculateSunightColor(
  sunLight: number[],
  sunLightTemplate: number[],
  sunLightIndex: number
 ) {
  for (let v = 0; v < 4; v++) {
   const values = this.lightByte.getLightValues(
    sunLightTemplate[sunLightIndex + v]
   );
   const w = this.lightMap[values[0]];
   sunLight.push(w, w, w, 1);
  }
 },

 calculateAOColor(
  aoColors: number[],
  aoTemplate: number[],
  aoTemplateIndex: number
 ) {
  for (let v = 0; v < 4; v++) {
   const aColor = aoTemplate[aoTemplateIndex + v];
   const newColor = this.toLinearSpace(aColor, aColor, aColor, aColor);
   aoColors.push(newColor[0], newColor[1], newColor[2], 1);
  }
 },
 calculateAOColorFromValue(aoColors: number[], aoValue: number) {
  for (let v = 0; v < 4; v++) {
   const newColor = this.toLinearSpace(aoValue, aoValue, aoValue, aoValue);
   aoColors.push(newColor[0], newColor[1], newColor[2], 1);
  }
 },
};
