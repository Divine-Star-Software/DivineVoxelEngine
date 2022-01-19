import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export class ShapeHelper implements ShapeHelperInterface {
 infoByte: InfoByte;

 constructor(public util: Util) {
  this.infoByte = this.util.getInfoByte();
 }

 toLinearSpace(r: number, g: number, b: number, a: number) {
  r = Math.pow(r, 2.2);
  g = Math.pow(g, 2.2);
  b = Math.pow(b, 2.2);
  a = a * 1;
  return [r, g, b, a];
 }

 lightMap: Record<number, number> = {
  0: 0.05,
  1: 0.1,
  2: 0.2,
  3: 0.3,
  4: 0.4,
  5: 0.45,
  6: 0.5,
  7: 0.55,
  8: 0.6,
  9: 0.65,
  10: 0.7,
  11: 0.75,
  12: 0.8,
  13: 0.85,
  14: 0.9,
  15: 1,
 };

 calculateFullColor(
  fullColors: number[],
  fullTemplate: Float32Array,
  startIndex: number
 ) {
/*   const r = 1;
  const g = 1;
  const b = 1;
  const a = 1;
  fullColors.push(
   r,
   b,
   g,
   a,

   r,
   b,
   g,
   a,

   g,
   b,
   r,
   a,

   g,
   b,
   r,
   a
  );

  const test = []; */

  const alpha = 1;
  for (let v = 0; v < 4; v++) {
   this.infoByte.setNumberValue(fullTemplate[startIndex + v]);

   const w = this.lightMap[this.infoByte.getHalfByteDec(0)];
   const r = this.lightMap[this.infoByte.getHalfByteDec(4)];
   const g = this.lightMap[this.infoByte.getHalfByteDec(8)];
   const b = this.lightMap[this.infoByte.getHalfByteDec(12)];
//console.log(r,g,b);
   fullColors.push(r, g, b, alpha);
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
