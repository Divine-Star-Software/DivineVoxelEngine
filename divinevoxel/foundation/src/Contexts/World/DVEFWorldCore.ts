import { DVEWorldCore } from "@divinevoxel/core/Interfaces/World/DVEWorldCore";
import { DVEFWorldThreads } from "./DVEFWorldThreads";
import { DVEFDataSync } from "./DVEFDataSync";
import { DVEFoundationTasksQueues } from "./Tasks/DVEFoundationTasksQueues"
import { DataLoaderTool } from "../../Default/DataLoader/World/Tools/DataLoaderTool";
import { WorldLock } from "./Lock/WorldLock";
import { RegisterDataHooks } from "./WorldDataHooks";
import { DVEFDataReigster } from "./Data/DVEFDataRegister";
import { DVEFDataStructs } from "./Data/DVEFDataStructs";
import InitWorldTasks,{WorldTasks} from "./Tasks/WorldTasks";
import { Distance3D, LocationData } from "@divinevoxel/core/Math";
import { WorldRegister } from "../../Data/World/WorldRegister";
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
  dataTagBulders: DVEFDataStructs;
  tasks = new WorldTasks(this);

  constructor(public props: DVEFWorldCoreProps = {}) {
    super();

    DVEFWorldCore.instance = this;
    this.threads = new DVEFWorldThreads(this);

    this.dataSync = new DVEFDataSync();
    this.queues = new DVEFoundationTasksQueues();
    this.dataRegiser = new DVEFDataReigster();
    this.dataTagBulders = new DVEFDataStructs();
    this.queues.init(this);
    InitWorldTasks(this);
  }

  async init() {
    RegisterDataHooks();
    WorldLock.init(new DataLoaderTool());
  }

  removeColumnsOutsideRadius(origion: LocationData, radius: number) {
    const [dimesnionId, x, y, z] = origion;
    const dimension = WorldRegister.instance.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const location = WorldRegister.instance.columnTool.getLocationData();
        const distnace = Distance3D(location[1], 0, location[3], x, 0, z);
        if (distnace > radius) {
          this.dataSync.worldData.column.unSync(location);
          WorldRegister.instance.column.remove(location);
        }
      });
    });
  }

}
