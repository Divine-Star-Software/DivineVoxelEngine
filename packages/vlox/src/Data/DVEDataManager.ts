import { DimensionsRegister } from "./World/DimensionsRegister.js";
import { WorldPainter } from "./World/WorldPainter.js";
import { WorldRegister } from "./World/WorldRegister.js";
import { RegionHeaderRegister } from "./RegionHeaderRegister.js";
import { Chunk } from "./World/Classes/Chunk.js";
import { Column } from "./World/Classes/Column.js";
import { Region } from "./World/Classes/Region.js";
import { DVEDataSyncNode } from "./DVEDataSyncNode.js";
import { DataManager } from "../Interfaces/Data/DataManager.js";
export class DVEDataManager extends DataManager {
  world = new WorldPainter();
  dataSync = new DVEDataSyncNode();

  registers = {
    dimensions: DimensionsRegister,
    world: new WorldRegister(),
    regionHeader: RegionHeaderRegister,
  };
  worldDataTags = {
    chunks: Chunk.StateStruct,
    column: Column.StateStruct,
    region: Region.StateStruct,
  };
}
