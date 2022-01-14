import type { Util } from "Global/Util.helper";
import type { TextureManagerInterface } from "Meta/World/Textures/TextureManager.interface";
import type { VoxelAOCalcData } from "Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "Meta/World/Voxels/VoxelHelper.interface";
import { BuildAmbientOcclusion } from "../Chunks/Functions/ChunkAO.js";
import type { WorldData } from "World/WorldData/WorldData";

export class VoxelHelper implements VoxelHelperInterface {
 constructor(
  public util: Util,
  public worldData: WorldData,
  public textureManager: TextureManagerInterface
 ) {}

 calculateVoxelAO(
data : VoxelAOCalcData
 ) {
  if (data.exposedFaces[0]) {
   BuildAmbientOcclusion(
    this.worldData,
    data.chunkVoxels,
    data.aoTemplate,
    data.chunkX,
    data.chunkZ,
    data.x,
    data.y,
    data.z,
    "top"
   );
  }
  if (data.exposedFaces[1]) {
    BuildAmbientOcclusion(
     this.worldData,
     data.chunkVoxels,
     data.aoTemplate,
     data.chunkX,
     data.chunkZ,
     data.x,
     data.y,
     data.z,
     "bottom"
    );
   }
   if (data.exposedFaces[2]) {
    BuildAmbientOcclusion(
     this.worldData,
     data.chunkVoxels,
     data.aoTemplate,
     data.chunkX,
     data.chunkZ,
     data.x,
     data.y,
     data.z,
     "west"
    );
   }
   if (data.exposedFaces[3]) {
    BuildAmbientOcclusion(
     this.worldData,
     data.chunkVoxels,
     data.aoTemplate,
     data.chunkX,
     data.chunkZ,
     data.x,
     data.y,
     data.z,
     "east"
    );
   }
   if (data.exposedFaces[4]) {
    BuildAmbientOcclusion(
     this.worldData,
     data.chunkVoxels,
     data.aoTemplate,
     data.chunkX,
     data.chunkZ,
     data.x,
     data.y,
     data.z,
     "north"
    );
   }
   if (data.exposedFaces[5]) {
    BuildAmbientOcclusion(
     this.worldData,
     data.chunkVoxels,
     data.aoTemplate,
     data.chunkX,
     data.chunkZ,
     data.x,
     data.y,
     data.z,
     "south"
    );
   }
 }
}
