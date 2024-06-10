//functions
import DataLoaderTasks from "./DataLoaderTasks.js";
import { WorldDataSerializer } from "./WorldDataSerializer.js";

export type DivineVoxelEngineDataLoaderConstructorInitData = {};

export class DivineVoxelEngineDataLoaderConstructor {
  static instance: DivineVoxelEngineDataLoaderConstructor;
  environment = <"node" | "browser">"browser";

  serializer: WorldDataSerializer;
  constructor(data: DivineVoxelEngineDataLoaderConstructorInitData) {
    if (DivineVoxelEngineDataLoaderConstructor.instance)
      return DivineVoxelEngineDataLoaderConstructor.instance;
    DivineVoxelEngineDataLoaderConstructor.instance = this;
    this.serializer = new WorldDataSerializer();
  }

  async init() {

    DataLoaderTasks(this);
  }
}
