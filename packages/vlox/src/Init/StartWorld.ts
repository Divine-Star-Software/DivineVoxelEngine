import InitDataSync from "../Data/Sync/InitDataSync";
import { DivineVoxelEngineWorld } from "../Contexts/World/DivineVoxelEngineWorld";
import { Threads } from "@amodx/threads/";
import { CreatePromiseCheck } from "@amodx/core/Intervals/CreatePromiseCheck.js";
import { WorldLock } from "../Contexts/World/Lock/WorldLock";
import InitWorldTasks from "../Contexts/World/Tasks/WorldTasks";
import { DataLoaderTool } from "../DataLoader/World/Tools/DataLoaderTool";
import { DataHooks } from "../Data/Sync/DataHooks";
import { Chunk, Column, Region } from "../Data/World/Classes";
import { Environment } from "@amodx/core/Environment/Environment";
import { VoxelTagStates } from "../VoxelState/VoxelTagStates";
import { SchemaRegister } from "../VoxelState/SchemaRegister";
type StartWorldProps = {};
export async function StartWorld(props: StartWorldProps = {}) {
  const DVEW = new DivineVoxelEngineWorld();
  InitWorldTasks(DVEW);
  DivineVoxelEngineWorld.environment = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  Threads.threadName = "world";
  let parent = "render";
  if (DivineVoxelEngineWorld.environment == "node") {
    parent = "server";
  }
  await Threads.init("world", parent);
  let ready = false;
  InitDataSync({
    onSync(data) {
      console.error("sync data world", data);
      if (data.threads.nexus) {
        DVEW.threads.addThread(DVEW.threads.nexus);
      }
      if (data.modelData) {
        const modelData = data.modelData;
        for (const model of modelData.models) {
          SchemaRegister.registerModel(model.id, model.schema);
        }
        for (const voxel of modelData.voxels) {
          SchemaRegister.registerVoxel(
            voxel.id,
            voxel.modelId,
            voxel.modSchema
          );
        }
        VoxelTagStates.load(modelData.tagState);
      }

      ready = true;
    },
  });

  DataHooks.chunk.onGetAsync.regiser("world", async (data) => {
    data.chunk = Chunk.CreateNew();
    return data;
  });
  DataHooks.chunk.onGetSync.regiser("world", (data) => {
    data.chunk = Chunk.CreateNew();
    return data;
  });
  DataHooks.chunk.onNew.subscribe("world", (data) => {
    DVEW.dataSync.worldData.chunk.sync(data);
  });
  DataHooks.chunk.onRemove.subscribe("world", (data) => {
    /*     if (!dataLoaderTool) {
      DVEW.dataSync.worldData.chunk.unSync(data);
      return;
    }
    dataLoaderTool.setLocation(data).saveColumn(() => {
      DVEW.dataSync.worldData.chunk.unSync(data);
    }); */
  });
  /*
[columns]
*/

  DataHooks.column.onGetAsync.regiser("world", async (data) => {
    data.column = Column.CreateNew({});
    return data;
  });
  DataHooks.column.onGetSync.regiser("world", (data) => {
    data.column = Column.CreateNew({});
    return data;
  });
  DataHooks.column.onNew.subscribe("world", (data) => {
    DVEW.dataSync.worldData.column.sync(data);
  });
  DataHooks.column.onRemove.subscribe("world", (data) => {
    /*     if (!dataLoaderTool) {
    DVEW.dataSync.worldData.column.unSync(data);
    return;
  }
  dataLoaderTool.setLocation(data).saveColumn(() => {
    DVEW.dataSync.worldData.column.unSync(data);
  }); */
  });
  /*
[region]
*/
  DataHooks.region.onGetAsync.regiser("world", async (data) => {
    data.region = Region.CreateNew();
    return data;
  });
  DataHooks.region.onGetSync.regiser("world", (data) => {
    data.region = Region.CreateNew();
    return data;
  });
  DataHooks.region.onNew.subscribe("world", (data) => {
    DVEW.dataSync.worldData.region.sync(data);
  });
  DataHooks.region.onRemove.subscribe("world", (data) => {
    /*     if (!dataLoaderTool) {
  DVEW.dataSync.worldData.column.unSync(data);
  return;
}
dataLoaderTool.setLocation(data).saveColumn(() => {
  DVEW.dataSync.worldData.column.unSync(data);
}); */
  });
  /*
[paint]
*/
  DataHooks.paint.onRichVoxelPaint.subscribe("world", (data) => {
    // DVEW.richworld.setInitalData(data);
  });
  /*
[dimensions]
*/
  DataHooks.dimension.onRegisterDimension.regiser("world", (data) => {
    DVEW.queues.addQueue(data.id);
    DVEW.dataSync.worldData.dimesnion.sync(data.id);

    return data;
  });
  WorldLock.init(new DataLoaderTool());

  await CreatePromiseCheck({
    check: () => ready,
    checkInterval: 1,
  });

  await DVEW.dataSync.init(DVEW);

  return DVEW;
}
