import { DirectionNames } from "Meta/Util.types";

export interface ShapeHelperInterface {
 toLinearSpace(r: number, g: number, b: number, a: number): number[];
 calculateAOColor(
  colors: number[],
  chunkAmbientOcculusion: Float32Array,
  startIndex: number
 ): void;

 
 isFaceExposexd(voxelExposedFaceEncodedBit : number,faceDirection : DirectionNames)  : boolean;

}
