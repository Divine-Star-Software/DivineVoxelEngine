import { InfoByte } from "./Util/InfoByte.js";
import { LightByte } from "./Util/LightByte.js";
import { VoxelByte } from "./Util/VoxelByte.js";
import { Flat3DArray } from "./Util/Flat3DArray.js";
import { WorldBounds } from "./Util/WorldBounds.js";

export const Util = {
 calculateGameZone(positionZ: number, positionX: number) {
  const chunkpositionZ = (positionZ >> 4) << 4;
  const chunkpositionX = (positionX >> 4) << 4;
  return [chunkpositionZ, chunkpositionX];
 },
 getFlat3DArray() {
  return Flat3DArray;
 },
 getVoxelByte() {
  return VoxelByte;
 },
 getLightByte() {
  return LightByte;
 },
 getWorldBounds() {
  return WorldBounds;
 },
 getInfoByte(number: number = 0) {
  InfoByte.setNumberValue(number);
  return InfoByte;
 },
 degtoRad(degrees: number) {
  return degrees * (Math.PI / 180);
 },
 radToDeg(radians: number) {
  return radians * (180 / Math.PI);
 },
};
