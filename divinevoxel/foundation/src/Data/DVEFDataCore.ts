import { DVEDataCore } from "@divinevoxel/core/Interfaces/Data/DVEDataCore";
import { DVEFDataManager } from "./DVEFDataManager";
import { DVEFDataSyncNode } from "../Data/DVEFDataSyncNode";

export class DVEFDataCore extends DVEDataCore {
  dataManager = new DVEFDataManager();
  dataSync = new DVEFDataSyncNode();
}
