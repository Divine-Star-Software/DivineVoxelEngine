import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
import { LightByte } from "Global/Util/LightByte";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export class ShapeHelper implements ShapeHelperInterface {
 infoByte: InfoByte;
 lightByte: LightByte;

 constructor(public util: Util) {
  this.infoByte = this.util.getInfoByte();
  this.lightByte = this.util.getLightByte();
 }

 toLinearSpace(r: number, g: number, b: number, a: number) {
  r = Math.pow(r, 2.2);
  g = Math.pow(g, 2.2);
  b = Math.pow(b, 2.2);
  a = a * 1;
  return [r, g, b, a];
 }

 lightMap: number[] = [
  0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74, 0.85,
  0.97, 1,
 ];
 calculateLightColor(
  RGBlightColors: number[],
  sunlightColors: number[],
  lightTemplate: Float32Array,
  startIndex: number
 ) {
  const alpha = 1;
  for (let v = 0; v < 4; v++) {
   const values = this.lightByte.getLightValues(lightTemplate[startIndex + v]);
   const w = this.lightMap[values[0]];
   const r = this.lightMap[values[1]];
   const g = this.lightMap[values[2]];
   const b = this.lightMap[values[3]];
   sunlightColors.push(w,w,w,1);
   RGBlightColors.push(r, g, b, alpha);
  }
 }
 calculateSunightColor(
    sunLight: number[],
    sunLightTemplate: Int32Array,
    sunLightIndex: number
   ) {
    for (let v = 0; v < 4; v++) {
     const values = this.lightByte.getLightValues(sunLightTemplate[sunLightIndex + v]);
     const w = this.lightMap[values[0]];
     sunLight.push(w, w, w, 1);
    }
   }
 calculateAOColor(
  colors: number[],
  chunkAmbientOcculusion: Float32Array,
  startIndex: number
 ) {
  const Cr = 1;
  const Cg = 1;
  const Cb = 1;
  const Ca = 1;

  for (let v = 0; v < 4; v++) {
   const aColor = chunkAmbientOcculusion[startIndex + v];
   const Ar = aColor * Cr;
   const Ag = aColor * Cg;
   const Ab = aColor * Cb;
   const Aa = aColor * Ca;

   const newColor = this.toLinearSpace(Ar, Ag, Ab, Aa);
   colors.push(newColor[0], newColor[1], newColor[2], 1);
  }
 }
}
