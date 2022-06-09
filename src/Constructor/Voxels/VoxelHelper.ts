//types
import type { VoxelProcessData } from "Meta/Voxels/Voxel.types";
import type {
 DirectionNames,
 VoxelBuilderThreadObject,
 VoxelData,
} from "Meta/index";
//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { Util } from "../../Global/Util.helper.js";

//functions
import { BuildAmbientOcclusion } from "./Functions/ChunkAO.js";
import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";

export const VoxelHelper = {
 voxellightMixCalc: VoxelLightMixCalc,
 calculdateVoxelLight: CalculateVoxelLight,

 voxelByte: Util.getVoxelByte(),
 lightByte: Util.getLightByte(),
 substanceRules: <Record<string, boolean>>{
  "solid-solid": false,
  "solid-flora": true,
  "solid-transparent": true,
  "solid-fluid": true,
  "solid-magma": true,

  "transparent-solid": true,
  "transparent-flora": true,
  "transparent-transparent": false,
  "transparent-fluid": true,
  "transparent-magma": true,

  "flora-solid": true,
  "flora-flora": true,
  "flora-transparent": true,
  "flora-fluid": true,
  "flora-magma": true,

  "fluid-solid": false,
  "fluid-flora": true,
  "fluid-transparent": true,
  "fluid-fluid": false,
  "fluid-magma": true,

  "magma-solid": false,
  "magma-flora": true,
  "magma-transparent": true,
  "magma-fluid": true,
  "magma-magma": false,
 },

 lightValueFunctions: {
  r: (value: number) => {
   return VoxelHelper.lightByte.getR(value);
  },
  g: (value: number) => {
   return VoxelHelper.lightByte.getG(value);
  },
  b: (value: number) => {
   return VoxelHelper.lightByte.getB(value);
  },
  s: (value: number) => {
   return VoxelHelper.lightByte.getS(value);
  },
 },

 getTrueShapeId(id: string) {
  return DVEC.voxelManager.shapeMap[id];
 },

 getTrueFluidShapeId(id: string) {
  return DVEC.voxelManager.fluidShapeMap[id];
 },

 voxelFaceCheck(
  face: DirectionNames,
  voxel: VoxelBuilderThreadObject,
  x: number,
  y: number,
  z: number
 ) {
  const checkVoxelId = DVEC.worldMatrix.getVoxel(x, y, z);
  if (checkVoxelId && checkVoxelId[0] == "dve:air") return true;
  if (!checkVoxelId) return true;
  const checkVoxelObject = DVEC.voxelManager.getVoxel(checkVoxelId[0]);
  if (
   this.substanceRules[
    `${voxel.data.substance}-${checkVoxelObject.data.substance}`
   ]
  ) {
   return true;
  } else {
   return false;
  }
 },

 /**# Get Light
  * ---
  * Returns the raw light value for a voxel.
  */
 getLight(x: number, y: number, z: number): number {
  const rawVoxelData = DVEC.worldMatrix.getData(x, y, z);
  if (rawVoxelData < 0) return -1;

  if (rawVoxelData >= 0) {
   const voxelId = this.voxelByte.getId(rawVoxelData);
   if (voxelId == 0) {
    return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
   } else {
    const voxel = DVEC.worldMatrix.getVoxel(x, y, z);
    if (!voxel) return -1;
    const voxelData = DVEC.voxelManager.getVoxel(voxel[0]);

    if (voxelData.data.lightSource && voxelData.data.lightValue) {
     return voxelData.data.lightValue;
    }
    if (voxelData.data.substance == "solid") {
     return -1;
    }
    return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
   }
  }
  return -1;
 },

 setAir(x: number, y: number, z: number, lightValue: number) {
  let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
  DVEC.worldMatrix.setData(x, y, z, data);
 },

 setFullSun(x: number, y: number, z: number) {
  const value = this.getLight(x, y, z);
  const newValue = this.lightByte.setS(0xf, value);
  this.setLight(x, y, z, newValue);
 },

 setLight(x: number, y: number, z: number, lightValue: number) {
  let data = DVEC.worldMatrix.getData(x, y, z);
  if (data === -1) return;
  data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
  DVEC.worldMatrix.setData(x, y, z, data);
 },

 getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s") {
  return this.lightValueFunctions[type](this.getLight(x, y, z));
 },

 processVoxelLight(data: VoxelProcessData, voxel: VoxelData): void {
  if (
   DVEC.settings.settings.lighting?.doRGBLight ||
   DVEC.settings.settings.lighting?.doSunLight
  ) {
   this.calculateVoxelLight(data, voxel);
  }
  if (DVEC.settings.settings.lighting?.doAO) {
   this.calculateVoxelAO(data, voxel);
  }
 },

 calculateVoxelLight(data: VoxelProcessData, voxel: VoxelData): void {
  if (
   !DVEC.settings.settings.lighting?.doSunLight &&
   !DVEC.settings.settings.lighting?.doRGBLight
  )
   return;
  this.calculdateVoxelLight(
   data,
   data.chunkX + data.x,
   data.chunkY + data.y,
   data.chunkZ + data.z
  );
 },

 calculateVoxelAO(data: VoxelProcessData, voxel: VoxelData) {
  if (!DVEC.settings.settings.lighting?.doAO) return;
  if (data.exposedFaces[0]) {
   BuildAmbientOcclusion(
    voxel,
    data.aoTemplate,
    data.chunkX,
    data.chunkY,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "top"
   );
  }
  if (data.exposedFaces[1]) {
   BuildAmbientOcclusion(
    voxel,
    data.aoTemplate,
    data.chunkX,
    data.chunkY,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "bottom"
   );
  }
  if (data.exposedFaces[2]) {
   BuildAmbientOcclusion(
    voxel,
    data.aoTemplate,
    data.chunkX,
    data.chunkY,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "east"
   );
  }
  if (data.exposedFaces[3]) {
   BuildAmbientOcclusion(
    voxel,
    data.aoTemplate,
    data.chunkX,
    data.chunkY,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "west"
   );
  }
  if (data.exposedFaces[4]) {
   BuildAmbientOcclusion(
    voxel,
    data.aoTemplate,
    data.chunkX,
    data.chunkY,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "south"
   );
  }
  if (data.exposedFaces[5]) {
   BuildAmbientOcclusion(
    voxel,
    data.aoTemplate,
    data.chunkX,
    data.chunkY,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "north"
   );
  }
 },
};
