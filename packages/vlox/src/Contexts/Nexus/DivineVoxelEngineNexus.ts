//intercomms
//functions

import { Threads } from "@amodx/threads/";
import { DataTool } from "../../Tools/Data/DataTool.js";

import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
import { NexusThreads } from "./NexusTheads.js";

export class DivineVoxelEngineNexus {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineNexus;

  TC = Threads;

  threads = new NexusThreads();

  constructor(data: {}) {
    if (DivineVoxelEngineNexus.instance) return DivineVoxelEngineNexus.instance;

    DivineVoxelEngineNexus.instance = this;
  }

  getRichDataTool() {
    return new RichDataTool();
  }
  getDataTool() {
    return new DataTool();
  }
}
