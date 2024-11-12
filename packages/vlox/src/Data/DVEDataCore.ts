import { DVEDataManager } from "./DVEDataManager";
import { DVEDataSyncNode } from "./DVEDataSyncNode";

export  class DVEDataCore {
  dataManager = new DVEDataManager();
  dataSync = new DVEDataSyncNode();
}
