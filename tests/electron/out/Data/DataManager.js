import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { Register } from "./Register/Register.js";
import { VoxelTags } from "./Voxel/VoxelTags.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { ChunkTags } from "./World/Chunk/ChunkTags.js";
import { ColumnTags } from "./World/Column/ColumnTags.js";
import { RegionTags } from "./World/Region/RegionTags.js";
import { WorldSpaces } from "./World/WorldSpaces.js";
import { RegionHeaderRegister } from "./World/Region/RegionHeaderRegister.js";
export const DataManager = {
    dimensions: DimensionsRegister,
    voxelTags: VoxelTags,
    world: WorldPainter,
    worldRegister: WorldRegister,
    columnTags: ColumnTags,
    worldBounds: WorldBounds,
    spaces: WorldSpaces,
    register: Register,
    chunkTags: ChunkTags,
    regionTags: RegionTags,
    regionHeaderReigster: RegionHeaderRegister,
};
