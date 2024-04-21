import { DVEWorldCore } from "@divinevoxel/core/Interfaces/World/DVEWorldCore";
import { DVEFWorldThreads } from "./DVEFWorldThreads";
import { DVEFDataSync } from "./DVEFDataSync";
import { DVEFoundationTasksQueues } from "./Tasks/DVEFoundationTasksQueues";

import { BuilderTool } from "../../Default/Tools/Build/BuilderTool";
import { DataTool } from "../../Default/Tools/Data/DataTool";
import { RegionDataTool } from "../../Default/Tools/Data/WorldData/RegionDataTool";
import { ColumnDataTool } from "../../Default/Tools/Data/WorldData/ColumnDataTool";
import { HeightMapTool } from "../../Default/Tools/Data/WorldData/HeightMapTool";
import { TaskTool } from "../../Default/Tools/Tasks/TasksTool";
import { DataLoaderTool } from "../../Default/Tools/Loader/DataLoaderTool";
import { RichDataTool } from "../../Default/Tools/Data/RichDataTool";
import { ChunkDataTool } from "../../Default/Tools/Data/WorldData/ChunkDataTool";
import { WorldLock } from "./Lock/WorldLock";
import { RegisterDataHooks } from "./WorldDataHooks";
import { DVEFDataReigster } from "./Data/DVEFDataRegister";
import { DVEFDataTags } from "./Data/DVEFDataTags";
import { AdvancedBrush } from "../../Default/Tools/Brush/AdvancedBrushTool";
import WorldTasks from "./Tasks/WorldTasks";
export type DVEFWorldCoreProps = {
  nexusEnabled?: boolean;
  richWorldEnabled?: boolean;
  dataLoaderEnabled?: boolean;
};
export class DVEFWorldCore extends DVEWorldCore {
  static instance: DVEFWorldCore;
  threads: DVEFWorldThreads;
  dataSync: DVEFDataSync;
  queues: DVEFoundationTasksQueues;
  dataRegiser: DVEFDataReigster;
  dataTagBulders: DVEFDataTags;

  constructor(public props: DVEFWorldCoreProps = {}) {
    super();

    DVEFWorldCore.instance = this;
    this.threads = new DVEFWorldThreads(this);

    this.dataSync = new DVEFDataSync();
    this.queues = new DVEFoundationTasksQueues();
    this.dataRegiser = new DVEFDataReigster();
    this.dataTagBulders = new DVEFDataTags();
    this.queues.init(this);
    WorldTasks(this);
  }

  async init() {
    RegisterDataHooks();
    WorldLock.init(new DataLoaderTool());
  }

  getAllTools() {
    return {
      brush: this.getBrush(),
      builder: this.getBuilder(),
      data: this.getDataTool(),
      chunkData: this.getChunkDataTool(),
      columnData: this.getColumnDataTool(),
      regonData: this.getRegionTool(),
      heightMap: this.getHeightMapTool(),
      tasks: this.getTasksTool(),
    };
  }

  getBrush() {
    return new AdvancedBrush();
  }
  getBuilder() {
    return new BuilderTool();
  }
  getDataTool() {
    return new DataTool();
  }
  getRegionTool() {
    return new RegionDataTool();
  }
  getChunkDataTool() {
    return new ChunkDataTool();
  }
  getColumnDataTool() {
    return new ColumnDataTool();
  }
  getHeightMapTool() {
    return new HeightMapTool();
  }
  getTasksTool() {
    return new TaskTool();
  }
  getDataLoaderTool() {
    return new DataLoaderTool();
  }
  getRichDataTool() {
    return new RichDataTool();
  }
}
