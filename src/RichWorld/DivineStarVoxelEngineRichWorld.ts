//types
import type { EngineSettingsData } from "Meta/index.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//types
import { DVERWInitData } from "Meta/RichWorld/DVERW.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//intercomms
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { RichData } from "./RichData/RichData.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";

export const DVERW = {
 environment: <"node" | "browser">"browser",
 __settingsHaveBeenSynced: false,
 __connectedToWorld: false,
 __queueStatesSet: false,
 _3dFlatArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),
 UTIL: Util,
 settings: EngineSettings,

 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,

 worldComm: WorldComm,
 renderComm: RenderComm,

 richData: RichData,

 voxelManager : VoxelManager,

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.__settingsHaveBeenSynced = true;
 },
 reStart() {},

 isReady() {
  return (
   DVERW.__connectedToWorld &&
   DVERW.matrixHub.worldPort !== undefined &&
   DVERW.worldComm.port !== null &&
   DVERW.__settingsHaveBeenSynced
  );
 },

 async $INIT(data: DVERWInitData) {
  await InitWorker(this, data);
 },
};

export type DivineVoxelEngineRichWorld = typeof DVERW;
