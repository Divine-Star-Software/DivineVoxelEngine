import { DimensionsData } from "./Dimensions/DimensionsData.js";
import { Maps } from "./Maps/Maps.js";
import { VoxelData } from "./Voxel/VoxelData.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldData } from "./World/WorldData.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { WorldColumnData } from "./WorldColumn/WorldColumn.js";
export const DataManager = {
 dimensions: DimensionsData,
 voxel: VoxelData,
 world: WorldData,
 worldRegister: WorldRegister,
 worldColumn : WorldColumnData,
 worldBounds: WorldBounds,
 maps: Maps,
};
