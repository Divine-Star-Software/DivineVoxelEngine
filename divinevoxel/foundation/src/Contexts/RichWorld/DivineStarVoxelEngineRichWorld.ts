//intercomms
import { RichWorldThreads } from "./Threads/RichWorldThreads.js";
//functions
import InitWorker from "./InitWorker.js";
import { ThreadComm } from "@divinestar/threads/";
import { RichDataTool } from "./Tools/RichDataTool.js"
import { DataTool } from "../../Default/Tools/Data/DataTool.js";
import { DVEDataCore } from "@divinevoxel/core/Interfaces/Data/DVEDataCore.js";
import { RichWorldTasks } from "./Tasks/RichWorldTasks.js";

export type DivineVoxelEngineRichWorldInitData = {
  data: DVEDataCore;

};

export class DivineVoxelEngineRichWorld {
  static instance: DivineVoxelEngineRichWorld;
  environment = <"node" | "browser">"browser";

  TC = ThreadComm;
  data: DVEDataCore;
  threads = new RichWorldThreads();

  constructor(data: DivineVoxelEngineRichWorldInitData) {
    if (DivineVoxelEngineRichWorld.instance)
      return DivineVoxelEngineRichWorld.instance;

    DivineVoxelEngineRichWorld.instance = this;

   
    this.data = data.data;
  }

  tasks = RichWorldTasks;



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
