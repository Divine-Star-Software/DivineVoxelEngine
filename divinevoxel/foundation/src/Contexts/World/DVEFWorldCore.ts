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

export class DVEFWorldCore extends DVEWorldCore {
  static instance: DVEFWorldCore;
  threads = new DVEFWorldThreads();
  dataSync = new DVEFDataSync();
  queues = new DVEFoundationTasksQueues();
  dataRegiser = new DVEFDataReigster();
  dataTagBulders = new DVEFDataTags();

  constructor() {
    super();
    console.log("CONSTRUCT THE WORLD core", DVEFWorldCore.instance);
    this.queues.init(this);
    DVEFWorldCore.instance = this;
  }

  async init() {
    console.log("init dve world core",this)

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
