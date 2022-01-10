import type { DirectionNames } from "Meta/Util.types";
import type { ShapeHelperInterface } from "Meta/Voxels/Shapes/ShapeHelper.interface";
import type { InfoByte } from "Global/Util/InfoByte";
import type { Util } from "Global/Util.helper";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export class ShapeHelper implements ShapeHelperInterface {
 infoByte: InfoByte;

 exposedFaceRecord: Record<DirectionNames, number> = {
  top: 0,
  bottom: 1,
  west: 2,
  east: 3,
  north: 4,
  south: 5,
 };

 constructor(private util: Util) {
  this.infoByte = util.getInfoByte();
 }

 isFaceExposexd(
  voxelExposedFaceEncodedBit: number,
  faceDirection: DirectionNames
 ) {
    this.infoByte.setNumberValue(voxelExposedFaceEncodedBit);
  return this.infoByte.getBit(this.exposedFaceRecord[faceDirection]) == 1;
 }

 toLinearSpace(r: number, g: number, b: number, a: number) {
  r = Math.pow(r, 2.2);
  g = Math.pow(g, 2.2);
  b = Math.pow(b, 2.2);
  a = a * 1;
  return [r, g, b, a];
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
