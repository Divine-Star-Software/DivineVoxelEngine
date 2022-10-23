import { ChunkReader } from "./Chunk/ChunkReader.js";
import { ChunkState } from "./Chunk/ChunkState.js";
import { HeightMapData } from "./Chunk/HeightMapData.js";
import { DimensionsData } from "./Dimensions/DimensionsData.js";
import { Register } from "./Register/Register.js";
import { VoxelData } from "./Voxel/VoxelData.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldData } from "./World/WorldData.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { ColumnData } from "./Column/Column.js";
export const DataManager = {
 dimensions: DimensionsData,
 voxel: VoxelData,
 world: WorldData,
 worldRegister: WorldRegister,
 worldColumn: ColumnData,
 worldBounds: WorldBounds,
 maps: Register,
 chunks: {
  reader: ChunkReader,
  heightMap: HeightMapData,
  state: ChunkState,
 },
};
