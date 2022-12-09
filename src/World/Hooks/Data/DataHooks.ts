import { DataHooks } from "../../../Data/DataHooks.js";
import { DataCreator } from "../../Data/Creator.js";
import { DataSync } from "../../Data/DataSync.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";

export const RegisterDataHooks = () => {
 const tasks = DVEW.getTasksTool();
 /*
[chunks]
*/
 DataHooks.chunk.onGetAsync.addToRun(async () => DataCreator.chunk.getBuffer());
 DataHooks.chunk.onGetSync.addToRun(() => DataCreator.chunk.getBuffer());
 DataHooks.chunk.onNew.addToRun(async (data) => {
  DataSync.chunk.sync(data[0], data[1], data[2], data[3]);
 });
 /*
[columns]
*/
 DataHooks.column.onGetAsync.addToRun(async () =>
  DataCreator.column.getBuffer()
 );
 DataHooks.column.onGetSync.addToRun(() => DataCreator.column.getBuffer());
 DataHooks.column.onNew.addToRun(async (data) =>
  DataSync.column.sync(data[0], data[1], data[2], data[3])
 );
 /*
[region]
*/
 DataHooks.region.onGetAsync.addToRun(async () =>
  DataCreator.region.getBuffer()
 );
 DataHooks.region.onGetSync.addToRun(() => DataCreator.region.getBuffer());
 DataHooks.region.onNew.addToRun(async (data) => {
  DataSync.region.sync(data[0], data[1], data[2], data[3]);
 });
 /*
[paint]
*/
 DataHooks.paint.onAddToRGBUpdate.addToRun((data) => {
  tasks.light.rgb.update.add(data[1], data[2], data[3], "main");
 });
 DataHooks.paint.onRichVoxelPaint.addToRun((data) => {
  DVEW.richWorldComm.setInitalData(data);
 });
 /*
[dimensions]
*/
 DataHooks.dimension.onRegisterDimension.addToRun((data) => {
  DVEW.cQueues.addQueue(data.id);
  DataSync.dimesnion.sync(data);
 });
};
