import { DimensionsRegister } from "./World/DimensionsRegister.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { RegionHeaderRegister } from "./RegionHeaderRegister.js";
import { Chunk } from "./World/Classes/Chunk.js";
import { Column } from "./World/Classes/Column.js";
import { Region } from "./World/Classes/Region.js";
import { DVEFDataSyncNode } from "./DVEFDataSyncNode.js";
import { DataManager } from "@divinevoxel/core/Interfaces/Data/DataManager.js";
export class DVEFDataManager extends DataManager {
  world = new WorldPainter();
  dataSync = new DVEFDataSyncNode();

  registers = {
    dimensions: DimensionsRegister,
    world: new WorldRegister(),
    regionHeader: RegionHeaderRegister,
  };
  worldDataTags = {
    chunks: Chunk.Tags,
    column: Column.Tags,
    region: Region.Tags,
  };
}
