import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type {
 VoxelInteface,
 VoxelProcessData,
} from "Meta/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/Voxels/VoxelHelper.interface";
import { BuildAmbientOcclusion } from "../WorldData/Functions/ChunkAO.js";
import type { WorldData } from "World/WorldData/WorldData";
import type { VoxelManager } from "./VoxelManager.js";
import { DivineVoxelEngineWorld } from "index.js";

export class VoxelHelper implements VoxelHelperInterface {
 constructor(public DVEW: DivineVoxelEngineWorld) {}

 getTrueShapeId(id: string) {
  return this.DVEW.voxelManager.shapeMap[id];
 }

 getTrueFluidShapeId(id: string) {
  return this.DVEW.voxelManager.fluidShapeMap[id];
 }

 processVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void {
  if (
   this.DVEW.engineSettings.settings.lighting?.doRGBLight ||
   this.DVEW.engineSettings.settings.lighting?.doSunLight
  ) {
   this.calculateVoxelLight(data, voxel);
  }
  if (this.DVEW.engineSettings.settings.lighting?.doAO) {
   this.calculateVoxelAO(data, voxel);
  }
 }

 calculateVoxelLight(data: VoxelProcessData, voxel: VoxelInteface): void {
  if (
   !this.DVEW.engineSettings.settings.lighting?.doSunLight ||
   !this.DVEW.engineSettings.settings.lighting?.doRGBLight
  )
   return;
  this.DVEW.worldData.calculdateVoxelLight(
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

 calculateVoxelAO(data: VoxelProcessData, voxel: VoxelInteface) {
  if (!this.DVEW.engineSettings.settings.lighting?.doAO) return;
  if (data.exposedFaces[0]) {
   BuildAmbientOcclusion(
    this.DVEW.worldData,
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
    this.DVEW.worldData,
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
    this.DVEW.worldData,
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
    this.DVEW.worldData,
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
    this.DVEW.worldData,
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
    this.DVEW.worldData,
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
