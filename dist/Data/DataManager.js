import { ChunkReader } from "./Chunk/ChunkReader.js";
import { ChunkState } from "./Chunk/ChunkState.js";
import { HeightMapData } from "./Chunk/HeightMapData.js";
import { DimensionsRegister } from "./Dimensions/DimensionsRegister.js";
import { Register } from "./Register/Register.js";
import { VoxelData } from "./Voxel/VoxelData.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { ColumnData } from "./Column/Column.js";
export const DataManager = {
    dimensions: DimensionsRegister,
    voxel: VoxelData,
    world: WorldPainter,
    worldRegister: WorldRegister,
    worldColumn: ColumnData,
    worldBounds: WorldBounds,
    register: Register,
    chunks: {
        reader: ChunkReader,
        heightMap: HeightMapData,
        state: ChunkState,
    },
};
