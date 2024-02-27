import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { MappedDataRegister } from "./Register/MappedDataRegister.js";
import { VoxelTags } from "./Voxel/VoxelTags.js";
import { WorldBounds } from "./World/WorldBounds.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";

import { WorldSpaces } from "./World/WorldSpaces.js";
import { RegionHeaderRegister } from "./Register/RegionHeaderRegister.js";
import { SubstanceTags } from "./Substance/SubstanceTags.js";
import { Chunk } from "./World/Classes/Chunk.js";
import { Column } from "./World/Classes/Column.js";
import { Region } from "./World/Classes/Region.js";
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
  chunks: Chunk.Tags,
  column: Column.Tags,
  region: Region.Tags,
 },
};
