//functions
import DataLoaderTasks from './DataLoaderTasks'
import { DataHanlderWrapper } from "./DataHandlerWrapper.js";
import { DVEDataHandler } from "../../Interfaces/DataLoader/DVEDataHandler.js";

export type DivineVoxelEngineDataLoaderWorldInitData = {
  dataHanlder: DVEDataHandler;
};

export class DivineVoxelEngineDataLoaderWorld {
  static instance: DivineVoxelEngineDataLoaderWorld;
  environment = <"node" | "browser">"browser";

  dataHandler = new DataHanlderWrapper();
  constructor(data: DivineVoxelEngineDataLoaderWorldInitData) {
    if (DivineVoxelEngineDataLoaderWorld.instance)
      return DivineVoxelEngineDataLoaderWorld.instance;
    DivineVoxelEngineDataLoaderWorld.instance = this;
    this.dataHandler.init(data.dataHanlder);
  }

  async init() {
    DataLoaderTasks(this);
  }
}
