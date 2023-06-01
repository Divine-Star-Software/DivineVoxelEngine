import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { MappedDataRegister } from "./Register/MappedDataRegister.js";
import { VoxelTags } from "./Voxel/VoxelTags.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { ChunkTags } from "./World/Chunk/ChunkTags.js";
import { ColumnTags } from "./World/Column/ColumnTags.js";
import { RegionTags } from "./World/Region/RegionTags.js";
import { WorldSpaces } from "./World/WorldSpaces.js";
import { RegionHeaderRegister } from "./World/Region/RegionHeaderRegister.js";
import { SubstanceTags } from "./Substance/SubstanceTags.js";
export const DataManager = {
 world: WorldPainter,
 worldBounds: WorldBounds,
 spaces: WorldSpaces,

 registers: {
  dimensions: DimensionsRegister,
  world: WorldRegister,
  mapped: MappedDataRegister,
  regionHeader: RegionHeaderRegister,
 },
 tags: {
  voxels: VoxelTags,
  substances: SubstanceTags,
  chunks: ChunkTags,
  column: ColumnTags,
  region: RegionTags,
 },
};
