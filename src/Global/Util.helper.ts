import { DirectionNames } from "Meta/Util.types.js";
import { BitArray } from "./Util/ByteArray.js";
import { InfoByte } from "./Util/InfoByte.js";
import { LightByte } from "./Util/LightByte.js";
import { VoxelByte } from "./Util/VoxelByte.js";

export class Util {
 infoByte = new InfoByte();
 exposedFaceRecord: Record<DirectionNames, number> = {
  top: 0,
  bottom: 1,
  west: 2,
  east: 3,
  north: 4,
  south: 5,
 };

 isFaceExposexd(
  voxelExposedFaceEncodedBit: number,
  faceDirection: DirectionNames
 ) {
  this.infoByte.setNumberValue(voxelExposedFaceEncodedBit);
  return this.infoByte.getBit(this.exposedFaceRecord[faceDirection]) == 1;
 }

 calculateGameZone(positionZ: number, positionX: number) {
  const chunkpositionZ = (positionZ >> 4) << 4;
  const chunkpositionX = (positionX >> 4) << 4;
  return [chunkpositionZ, chunkpositionX];
 }

 getVoxelByte() {
     return new VoxelByte();
 }

 getLightByte() {
     return new LightByte();
 }

 getInfoByte(number: number = 0) {
  return new InfoByte(number);
 }

 getBitArray(nums: number[]) {
  return new BitArray(nums);
 }

 degtoRad(degrees: number) {
  return degrees * (Math.PI / 180);
 }
 radToDeg(radians: number) {
  return radians * (180 / Math.PI);
 }
}
