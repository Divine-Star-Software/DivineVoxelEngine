import type { DataLoaderTool } from "Tools/Loader/DataLoaderTool.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { WorldDataGenerator } from "../../Data/Generators/WorldDataGenerator.js";
import { DataSync } from "../../Data/DataSync.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

export const RegisterDataHooks = () => {
 const tasks = DVEW.getTasksTool();
 let dataLoaderTool: null | DataLoaderTool = null;
 if (DVEW.settings.saveWorldData()) {
  dataLoaderTool = DVEW.getDataLoaderTool();
 }
 /*
[chunks]
*/
 DataHooks.chunk.onGetAsync.addToRun(async () =>
  WorldDataGenerator.chunk.create()
 );
 DataHooks.chunk.onGetSync.addToRun(() => WorldDataGenerator.chunk.create());
 DataHooks.chunk.onNew.addToRun(async (data) => {
  DataSync.worldData.chunk.sync(data);
 });
 DataHooks.chunk.onRemove.addToRun((data) => {
  if (!dataLoaderTool) {
   DataSync.worldData.chunk.unSync(data);
   return;
  }
  dataLoaderTool.setLocation(data).saveColumn(() => {
   DataSync.worldData.chunk.unSync(data);
  });
 });
 /*
[columns]
*/
 DataHooks.column.onGetAsync.addToRun(async () =>
  WorldDataGenerator.column.create()
 );
 DataHooks.column.onGetSync.addToRun(() => WorldDataGenerator.column.create());
 DataHooks.column.onNew.addToRun(async (data) => DataSync.worldData.column.sync(data));
 DataHooks.column.onRemove.addToRun((data) => {
  if (!dataLoaderTool) {
   DataSync.worldData.column.unSync(data);
   return;
  }
  dataLoaderTool.setLocation(data).saveColumn(() => {
   DataSync.worldData.column.unSync(data);
  });
 });
 /*
[region]
*/
 DataHooks.region.onGetAsync.addToRun(async () =>
  WorldDataGenerator.region.create()
 );
 DataHooks.region.onGetSync.addToRun(() => WorldDataGenerator.region.create());
 DataHooks.region.onNew.addToRun(async (data) => {
 
  DataSync.worldData.region.sync(data);
 });
 DataHooks.region.onRemove.addToRun((data) => {
  if (!dataLoaderTool) {
   DataSync.worldData.region.unSync(data);
   return;
  }
  dataLoaderTool.setLocation(data).saveRegion(() => {
   DataSync.worldData.region.unSync(data);
  });
 });
 /*
[paint]
*/
 DataHooks.paint.onRichVoxelPaint.addToRun((data) => {
 // DVEW.richWorldComm.setInitalData(data);
 });
 /*
[dimensions]
*/
 DataHooks.dimension.onRegisterDimension.addToRun((data) => {
  DVEW.cQueues.addQueue(data.id);
  DataSync.worldData.dimesnion.sync(data.id);
 });
};
