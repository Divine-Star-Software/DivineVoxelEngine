//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
import { WorldDataSerialize } from "./Serializers/WorldDataSerializer.js";
//intercomms
import { WorldComm, ParentComm } from "./Threads/DataLoaderThreads.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataLoaderTasks } from "./Tasks/DataLoaderTasks.js";
import { DataHanlderWrapper } from "./DataHandler/DataHandlerWrapper.js";
import { ThreadComm } from "threadcomm";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { DataHandler } from "./DataHandler/DataHandlerBaes.js";

export const DVEDL = {
 environment: <"node" | "browser">"browser",

 TC: ThreadComm,
 UTIL: Util,
 settings: EngineSettings,

 dataSyncNode: DataSyncNode,
 data: DataManager,

 worldComm: WorldComm,
 parentComm: ParentComm,

 tasks: DataLoaderTasks,

 serializer: WorldDataSerialize,

 dataHandler: DataHanlderWrapper,

 async $INIT(dataHanlder: DataHandler) {
  this.dataHandler.$INIT(dataHanlder);
  await InitWorker(this);
 },
 getRichDataTool() {
  return new RichDataTool();
 },
 getDataTool() {
  return new DataTool();
 },
};

export type DivineVoxelEngineData = typeof DVEDL;
