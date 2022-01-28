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
    getTrueShapeId(id) {
        return this.voxelManager.shapeMap[id];
    }
    getTrueFluidShapeId(id) {
        return this.voxelManager.fluidShapeMap[id];
    }
    processVoxelLight(data, voxel) {
        this.worldData.calculdateVoxelLight(voxel, data.voxelData, data.lightTemplate, data.exposedFaces, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z);
        if (data.exposedFaces[0]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "top");
        }
        if (data.exposedFaces[1]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "bottom");
        }
        if (data.exposedFaces[2]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "west");
        }
        if (data.exposedFaces[3]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "east");
        }
        if (data.exposedFaces[4]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "north");
        }
        if (data.exposedFaces[5]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "south");
        }
    }
    calculateVoxelLight(data, voxel) {
        this.worldData.calculdateVoxelLight(voxel, data.voxelData, data.lightTemplate, data.exposedFaces, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z);
    }
    calculateVoxelAO(data, voxel) {
        if (data.exposedFaces[0]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "top");
        }
        if (data.exposedFaces[1]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "bottom");
        }
        if (data.exposedFaces[2]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "west");
        }
        if (data.exposedFaces[3]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "east");
        }
        if (data.exposedFaces[4]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "north");
        }
        if (data.exposedFaces[5]) {
            BuildAmbientOcclusion(this.worldData, voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "south");
        }
    }
}
