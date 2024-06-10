import { DataRegister } from "./Data/DataRegister";
import { DataSync } from "./Data/DataSync";
import { DataStructBuilders } from "./Data/DataStructBuilders";
import { WorldThreadManager } from "./Threads/WorldThreads";
import { ThreadComm } from "@divinestar/threads";
import { DivineVoxelEngineWorld } from "../../Contexts/World";

export abstract class DVEWorldCore {
  static instance: DVEWorldCore;
  TC = ThreadComm;
  getDVEW() {
    return DivineVoxelEngineWorld.instance;
  }
  abstract threads: WorldThreadManager;
  abstract dataSync: DataSync;
  abstract dataRegiser: DataRegister;
  abstract dataTagBulders: DataStructBuilders;
  abstract init(): Promise<void>;
  constructor() {
    DVEWorldCore.instance = this;
  }
}
