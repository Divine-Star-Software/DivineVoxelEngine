import { GetRealtiveChunkData } from "./GetRelativeChunkData.js";
export function ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, blockX, blockY, blockZ, x, y, z) {
    const check = GetRealtiveChunkData(worldData, chunk, chunkX, chunkZ, blockX, blockY, blockZ, x, y, z);
    if (!check) {
        return 1;
    }
    if (!check[0]) {
        return 1;
    }
    const voxelPalletId = check[0];
    const voxelTrueId = voxelPallet[voxelPalletId][0];
    const checkVoxel = voxelManager.getVoxel(voxelTrueId);
    if (checkVoxel.data.substance !== voxel.data.substance) {
        return 1;
    }
    return 0.75;
}
export function BuildAmbientOcclusion(worldData, voxelManager, voxel, voxelPallet, chunk, amientOcculusionTemplate, chunkX, chunkZ, x, y, z, face) {
    // +x
    if (face == "west") {
        amientOcculusionTemplate.push(ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, -1));
    }
    // -x
    if (face == "east") {
        amientOcculusionTemplate.push(ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 1));
    }
    // +y
    if (face == "top") {
        amientOcculusionTemplate.push(ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, -1));
    }
    // -y
    if (face == "bottom") {
        amientOcculusionTemplate.push(ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 0) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 1));
    }
    // +z
    if (face == "south") {
        amientOcculusionTemplate.push(ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, 1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, 1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, 1));
    }
    // -z
    if (face == "north") {
        amientOcculusionTemplate.push(ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, 1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 1, -1, -1), ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, 0, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, 0, -1, -1) *
            ChunkOcculsionCalcuation(worldData, voxelManager, voxel, voxelPallet, chunk, chunkX, chunkZ, x, y, z, -1, -1, -1));
    }
}
