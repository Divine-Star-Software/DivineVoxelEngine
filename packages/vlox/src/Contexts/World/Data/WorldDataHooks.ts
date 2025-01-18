import { DivineVoxelEngineWorld } from "..";
import { DataHooks } from "../../../Data/DataHooks";
import { WorldDataGenerator } from "./Generators/WorldDataGenerator.js";

//import type { DataLoaderTool } from "Tools/Loader/DataLoaderTool.js";
export default function (){
  /*   const DVEW = DivineVoxelEngineWorld.instance;
  let dataLoaderTool: null | DataLoaderTool = null;
  if (DVEW.settings.saveWorldData()) {
    dataLoaderTool = DVEW.getDataLoaderTool();
  } */
  /*
[chunks]
*/
  const DVE = DivineVoxelEngineWorld.instance;

  DataHooks.chunk.onGetAsync.regiser("world", async (data) => {
    data.chunk = WorldDataGenerator.chunk.create();
    return data;
  });
  DataHooks.chunk.onGetSync.regiser("world", (data) => {
    data.chunk = WorldDataGenerator.chunk.create();
    return data;
  });
  DataHooks.chunk.onNew.subscribe("world", (data) => {
    DVE.dataSync.worldData.chunk.sync(data);
  });
  DataHooks.chunk.onRemove.subscribe("world", (data) => {
    /*     if (!dataLoaderTool) {
      DVE.dataSync.worldData.chunk.unSync(data);
      return;
    }
    dataLoaderTool.setLocation(data).saveColumn(() => {
      DVE.dataSync.worldData.chunk.unSync(data);
    }); */
  });
  /*
[columns]
*/

  DataHooks.column.onGetAsync.regiser("world", async (data) => {
    data.column = WorldDataGenerator.column.create();
    return data;
  });
  DataHooks.column.onGetSync.regiser("world", (data) => {
    data.column = WorldDataGenerator.column.create();
    return data;
  });
  DataHooks.column.onNew.subscribe("world", (data)  => {
    DVE.dataSync.worldData.column.sync(data);
  });
  DataHooks.column.onRemove.subscribe("world", (data) => {
    /*     if (!dataLoaderTool) {
    DVE.dataSync.worldData.column.unSync(data);
    return;
  }
  dataLoaderTool.setLocation(data).saveColumn(() => {
    DVE.dataSync.worldData.column.unSync(data);
  }); */
  });
  /*
[region]
*/
  DataHooks.region.onGetAsync.regiser("world", async (data) => {
    data.region = WorldDataGenerator.region.create();
    return data;
  });
  DataHooks.region.onGetSync.regiser("world", (data) => {
    data.region = WorldDataGenerator.region.create();
    return data;
  });
  DataHooks.region.onNew.subscribe("world", (data) => {
    DVE.dataSync.worldData.region.sync(data);
  });
  DataHooks.region.onRemove.subscribe("world", (data) => {
    /*     if (!dataLoaderTool) {
  DVE.dataSync.worldData.column.unSync(data);
  return;
}
dataLoaderTool.setLocation(data).saveColumn(() => {
  DVE.dataSync.worldData.column.unSync(data);
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
    DVE.queues.addQueue(data.id);
    DVE.dataSync.worldData.dimesnion.sync(data.id);

    return data;
  });
};
