import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type {
 VoxelInteface,
 VoxelProcessData,
} from "Meta/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/Voxels/VoxelHelper.interface";
import { BuildAmbientOcclusion } from "./Functions/ChunkAO.js";
import type { WorldData } from "World/WorldData/WorldData";
import type { VoxelManager } from "./VoxelManager.js";
import { DivineVoxelEngineBuilder, DivineVoxelEngineWorld } from "index.js";

import type { VoxelData } from "../../Meta/index";

import {
 CalculateVoxelLight,
 VoxelLightMixCalc,
} from "./Functions/CalculateVoxelLight.js";
import type { VoxelByte } from "Global/Util/VoxelByte.js";
import type { LightByte } from "Global/Util/LightByte.js";

export class VoxelHelper {
 voxellightMixCalc = VoxelLightMixCalc;
 calculdateVoxelLight = CalculateVoxelLight;

 voxelByte: VoxelByte;
 lightByte: LightByte;
 substanceRules: Record<string, boolean> = {
  "solid-solid": false,
  "solid-flora": true,
  "solid-transparent": true,
  "solid-fluid": true,
  "solid-magma": true,

  "transparent-solid": true,
  "transparent-flora": true,
  "transparent-transparent": true,
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
 };

 constructor(public DVEB: DivineVoxelEngineBuilder) {
  this.voxelByte = this.DVEB.UTIL.getVoxelByte();
  this.lightByte = this.DVEB.UTIL.getLightByte();
 }

 getTrueShapeId(id: string) {
  return this.DVEB.voxelManager.shapeMap[id];
 }

 getTrueFluidShapeId(id: string) {
  return this.DVEB.voxelManager.fluidShapeMap[id];
 }

 voxelFaceCheck(
  voxel: VoxelData,
  voxelData: number,
  x: number,
  y: number,
  z: number
 ) {
  const voxelCheck = this.DVEB.worldMatrix.getVoxel(x, y, z);
  return true;
  /*    if(voxelCheck == "dve:air")return true;

    if (voxelCheck && voxelCheck == "dve:air") {
     const neighborVoxel: string = voxelCheck[0];
  
     if (
      this.substanceRules[
       `${voxel.data.substance}-${neighborVoxel.data.substance}`
      ]
     ) {
      return true;
     } else {
      return false;
     }
    } else {
     return true;
    } */
 }

 /**# Get Light
  * ---
  * Returns the raw light value for a voxel.
  * @param x
  * @param y
  * @param z
  * @returns
  */
 getLight(x: number, y: number, z: number): number {
  const rawVoxelData = this.DVEB.worldMatrix.getData(x, y, z);

  if (rawVoxelData >= 0) {
   const voxelId = this.voxelByte.getId(rawVoxelData);
   if (voxelId == 0) {
    return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
   } else {
    const voxel = this.DVEB.worldMatrix.getVoxel(x, y, z);
    if (!voxel) return 0;
    const voxelData = this.DVEB.voxelManager.getVoxel(voxel[0]);

    if (voxelData.lightSource && voxelData.lightValue) {
     return voxelData.lightValue;
    }
    if (voxelData.substance == "solid") {
     return 0;
    }
    return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
   }
  }
  return 0;
 }

 processVoxelLight(data: VoxelProcessData, voxel: VoxelData): void {
  if (
   this.DVEB.engineSettings.settings.lighting?.doRGBLight ||
   this.DVEB.engineSettings.settings.lighting?.doSunLight
  ) {
   this.calculateVoxelLight(data, voxel);
  }
  if (this.DVEB.engineSettings.settings.lighting?.doAO) {
   this.calculateVoxelAO(data, voxel);
  }
 }

 calculateVoxelLight(data: VoxelProcessData, voxel: VoxelData): void {
  if (
   !this.DVEB.engineSettings.settings.lighting?.doSunLight &&
   !this.DVEB.engineSettings.settings.lighting?.doRGBLight
  )
   return;
  this.calculdateVoxelLight(
   voxel,
   data.voxelData,
   data.lightTemplate,
   data.exposedFaces,
   data.chunkX,
   data.chunkY,
   data.chunkZ,
   data.x,
   data.y,
   data.z
  );
 }

 calculateVoxelAO(data: VoxelProcessData, voxel: VoxelData) {
  if (!this.DVEB.engineSettings.settings.lighting?.doAO) return;
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
    "west"
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
    "east"
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
    "north"
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
    "south"
   );
  }
 }
}
