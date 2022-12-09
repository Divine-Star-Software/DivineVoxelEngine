import { ChunkSpace } from "./World/Chunk/ChunkSpace.js";
import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { Register } from "./Register/Register.js";
import { VoxelTags } from "./Voxel/VoxelData.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { ChunkTags } from "./World/Chunk/ChunkTags.js";
import { ColumnTags } from "./World/Column/ColumnTags.js";
import { RegionTags } from "./World/Region/RegionTags.js";
export const DataManager = {
    dimensions: DimensionsRegister,
    voxelTags: VoxelTags,
    world: WorldPainter,
    worldRegister: WorldRegister,
    columnTags: ColumnTags,
    worldBounds: WorldBounds,
    register: Register,
    chunkTags: ChunkTags,
    regionTags: RegionTags,
    chunks: {
        space: ChunkSpace,
    },
};
