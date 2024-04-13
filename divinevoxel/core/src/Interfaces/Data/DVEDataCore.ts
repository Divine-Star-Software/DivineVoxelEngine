import { DataManager } from "./DataManager";
import { RemoteDataSyncNode } from "./RemoteDataSyncNode";

export abstract class DVEDataCore {
  abstract dataManager: DataManager;
  abstract dataSync: RemoteDataSyncNode;
}
