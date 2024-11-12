//intercomms
//functions
import InitWorker from "./InitWorker.js";
import { Threads } from "@amodx/threads/";
import { DataTool } from "../../Tools/Data/DataTool.js";

import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
import { NexusThreads } from "./Threads/NexusTheads.js";
import { DVEDataCore } from "../../Data/DVEDataCore.js";

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
