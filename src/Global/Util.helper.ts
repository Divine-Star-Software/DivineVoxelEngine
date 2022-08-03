import { InfoByte } from "./Util/InfoByte.js";
import { LightByte } from "./Util/LightByte.js";
import { VoxelByte } from "./Util/VoxelByte.js";
import { Flat3DArray } from "./Util/Flat3DArray.js";
import { WorldBounds } from "./Util/WorldBounds.js";
import { GetWorkerPort } from "./Util/GetWorkerPort.js";
import { CreatePromiseCheck } from "./Util/CreatePromiseCheck.js";
import { FaceByte } from "./Util/FaceByte.js";
import { HeightByte } from "./Util/HeightByte.js";
import { HeightMapArray } from "./Util/HeightMapArray.js";
import { MeshFaceDataByte } from "./Util/MeshFaceDataBytes.js";
import { DataEncoder } from "./Util/DataEncoder.js";
import { EntityFlat3dArray } from "./Util/EntityFlat3dArray.js";

export const Util = {
 createPromiseCheck: CreatePromiseCheck,
 getWorkerPort: GetWorkerPort,
 getEnviorment(): "node" | "browser" {
  let environment: "node" | "browser" = "browser";
  //@ts-ignore
  if (typeof process !== "undefined" && typeof Worker === "undefined") {
   environment = "node";
  }
  return environment;
 },

 getEntityFlat3dArray() {
  return EntityFlat3dArray;
 },
 getDataEncoder() {
  return DataEncoder;
 },
 getMeshFaceDataByte() {
  return MeshFaceDataByte;
 },
 getFlat3DArray() {
  return Flat3DArray;
 },
 getFaceByte() {
  return FaceByte;
 },
 getHeightMapArray() {
  return HeightMapArray;
 },
 getHeightByte() {
  return HeightByte;
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
