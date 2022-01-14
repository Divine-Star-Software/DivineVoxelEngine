import { BuildAmbientOcclusion } from "../Chunks/Functions/ChunkAO.js";
export class VoxelHelper {
    util;
    worldData;
    textureManager;
    voxelManager;
    constructor(util, worldData, textureManager, voxelManager) {
        this.util = util;
        this.worldData = worldData;
        this.textureManager = textureManager;
        this.voxelManager = voxelManager;
    }
    calculateVoxelAO(data, voxel) {
        if (data.exposedFaces[0]) {
            BuildAmbientOcclusion(this.worldData, this.voxelManager, voxel, data.voxelPallete, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "top");
        }
        if (data.exposedFaces[1]) {
            BuildAmbientOcclusion(this.worldData, this.voxelManager, voxel, data.voxelPallete, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "bottom");
        }
        if (data.exposedFaces[2]) {
            BuildAmbientOcclusion(this.worldData, this.voxelManager, voxel, data.voxelPallete, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "west");
        }
        if (data.exposedFaces[3]) {
            BuildAmbientOcclusion(this.worldData, this.voxelManager, voxel, data.voxelPallete, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "east");
        }
        if (data.exposedFaces[4]) {
            BuildAmbientOcclusion(this.worldData, this.voxelManager, voxel, data.voxelPallete, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "north");
        }
        if (data.exposedFaces[5]) {
            BuildAmbientOcclusion(this.worldData, this.voxelManager, voxel, data.voxelPallete, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "south");
        }
    }
}
