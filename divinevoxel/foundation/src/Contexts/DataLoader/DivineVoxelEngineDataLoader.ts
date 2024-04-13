//objects

import { WorldDataSerialize } from "./Serializers/WorldDataSerializer.js";
//intercomms
import { DataLoaderThreads } from "./Threads/DataLoaderThreads.js";
//functions
import InitWorker from "./InitWorker.js";
import { DataLoaderTasks } from "./Tasks/DataLoaderTasks.js";
import { DataHanlderWrapper } from "./DataHandler/DataHandlerWrapper.js";
import { ThreadComm } from "@divinestar/threads/";
import { RichDataTool } from "../../Default/Tools/Data/RichDataTool.js";
import { DataTool } from "../../Default/Tools/Data/DataTool.js";
import { DataHandler } from "./DataHandler/DataHandlerBaes.js";
import { DVEDataCore } from "@divinevoxel/core/Interfaces/Data/DVEDataCore.js";

export type DivineVoxelEngineDataLoaderInitData = {
  data: DVEDataCore;
  dataHanlder: DataHandler;
};

export class DivineVoxelEngineDataLoader {
  static instance: DivineVoxelEngineDataLoader;
  environment = <"node" | "browser">"browser";

  TC = ThreadComm;
  data: DVEDataCore;
  threads = new DataLoaderThreads();

  constructor(data: DivineVoxelEngineDataLoaderInitData) {
    if (DivineVoxelEngineDataLoader.instance)
      return DivineVoxelEngineDataLoader.instance;

    DivineVoxelEngineDataLoader.instance = this;

    this.dataHandler.$INIT(data.dataHanlder);
    this.data = data.data;
  }

  tasks = DataLoaderTasks;

  serializer = WorldDataSerialize;

  dataHandler = DataHanlderWrapper;

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
