import { BuildAmbientOcclusion } from "../Chunks/Functions/ChunkAO.js";
export class VoxelHelper {
    util;
    worldData;
    textureManager;
    constructor(util, worldData, textureManager) {
        this.util = util;
        this.worldData = worldData;
        this.textureManager = textureManager;
    }
    calculateVoxelAO(data) {
        if (data.exposedFaces[0]) {
            BuildAmbientOcclusion(this.worldData, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "top");
        }
        if (data.exposedFaces[1]) {
            BuildAmbientOcclusion(this.worldData, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "bottom");
        }
        if (data.exposedFaces[2]) {
            BuildAmbientOcclusion(this.worldData, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "west");
        }
        if (data.exposedFaces[3]) {
            BuildAmbientOcclusion(this.worldData, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "east");
        }
        if (data.exposedFaces[4]) {
            BuildAmbientOcclusion(this.worldData, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "north");
        }
        if (data.exposedFaces[5]) {
            BuildAmbientOcclusion(this.worldData, data.chunkVoxels, data.aoTemplate, data.chunkX, data.chunkZ, data.x, data.y, data.z, "south");
        }
    }
}
