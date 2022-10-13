//types
import type { EngineSettingsData } from "Meta/index.js";
import type { DVECInitData } from "Meta/Constructor/DVEC.js";
//objects
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { DVEB } from "./Builder/DivineVoxelEngineBuilder.js";
import { DVEP } from "./Propagation/DivineVoxelEnginePropagation.js";
import { DVEWG } from "./WorldGeneration/DivineVoxelEngineWorldGeneration.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { QueuesManager } from "./Queues/QueuesManager.js";
import { ItemManager } from "./Items/ItemManager.js";
//inter comms
import { ParentComm } from "./InterComms/Parent/ParentComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { MatrixMap } from "../Matrix/MatrixMap.js";
import { VoxelMatrix } from "../Matrix/VoxelMatrix.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { Tasks } from "./Tasks/Tasks.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";

export const DVEC = {
 environment: <"node" | "browser">"browser",
 __settingsHaveBeenSynced: false,
 __connectedToWorld: false,
 __queueStatesSet: false,
 _3dFlatArray: Util.getFlat3DArray(),
 worldBounds: Util.getWorldBounds(),
 UTIL: Util,
 settings: EngineSettings,

 DVEB: DVEB,
 DVEP: DVEP,
 DVEWG: DVEWG,

 tasks: Tasks,

 queues: QueuesManager,

 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,
 matrixMap: MatrixMap,
 voxelMatrix: VoxelMatrix,

 parentComm: ParentComm,
 worldComm: WorldComm,
 TC: ThreadComm,

 voxelManager: VoxelManager,
 itemManager: ItemManager,

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.__settingsHaveBeenSynced = true;
  this.worldMatrix.chunkReader.syncSettings();
  DVEB.syncSettings(data);
 },
 reStart() {},

 isReady() {
  if (this.environment == "node") {
   return (
    DVEC.__connectedToWorld &&
    DVEC.matrixHub.worldPort !== undefined &&
    DVEC.worldComm.port !== null &&
    DVEC.matrixHub.isReady() &&
    DVEC.__settingsHaveBeenSynced
   );
  } else {
   return (
    DVEC.__connectedToWorld &&
    DVEC.matrixHub.worldPort !== undefined &&
    DVEC.worldComm.port !== null &&
    DVEC.matrixHub.isReady() &&
    DVEC.__settingsHaveBeenSynced &&
    DVEB.textureManager.isReady()
   );
  }
 },

 async $INIT(initData: DVECInitData) {
  await InitWorker(this, initData);
 },
};
export type DivineVoxelEngineConstructor = typeof DVEC;

DVEC.environment = Util.getEnviorment();
