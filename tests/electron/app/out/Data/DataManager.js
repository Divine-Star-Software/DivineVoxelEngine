import { ChunkSpace } from "./Chunk/ChunkSpace.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";
import { Register } from "./Register/Register.js";
import { VoxelTags } from "./Voxel/VoxelData.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { ChunkTags } from "./Chunk/ChunkTags.js";
import { ColumnTags } from "./Column/ColumnTags.js";
export const DataManager = {
    dimensions: DimensionsRegister,
    voxelTags: VoxelTags,
    world: WorldPainter,
    worldRegister: WorldRegister,
    columnTags: ColumnTags,
    worldBounds: WorldBounds,
    register: Register,
    chunkTags: ChunkTags,
    chunks: {
        space: ChunkSpace,
    },
};
