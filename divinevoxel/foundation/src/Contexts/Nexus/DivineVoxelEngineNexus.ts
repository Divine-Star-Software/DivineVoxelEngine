//intercomms
//functions
import InitWorker from "./InitWorker.js";
import { Threads } from "@amodx/threads/";
import { DataTool } from "../../Default/Tools/Data/DataTool.js";
import { DVEDataCore } from "@divinevoxel/core/Interfaces/Data/DVEDataCore.js";
import { RichDataTool } from "../../Default/Tools/Data/RichDataTool.js";
import { NexusThreads } from "./Threads/NexusTheads.js";

export type DivineVoxelEngineNexusInitData = {
  data: DVEDataCore;
};

export class DivineVoxelEngineNexus {
  static instance: DivineVoxelEngineNexus;
  environment = <"node" | "browser">"browser";

  TC = Threads;
  data: DVEDataCore;
  threads = new NexusThreads();

  constructor(data: DivineVoxelEngineNexusInitData) {
    if (DivineVoxelEngineNexus.instance) return DivineVoxelEngineNexus.instance;

    DivineVoxelEngineNexus.instance = this;

    this.data = data.data;
  }

  async init() {
    await InitWorker(this);
  }

  getRichDataTool() {
    return new RichDataTool();
  }
  getDataTool() {
    return new DataTool();
  }
}
