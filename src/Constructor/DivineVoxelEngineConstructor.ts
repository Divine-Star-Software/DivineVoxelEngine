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
import { ItemManager } from "./Items/ItemManager.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
//inter comms
import { ParentComm } from "./InterComms/Parent/ParentComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//matrix
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { MatrixMap } from "../Matrix/MatrixMap.js";
import { VoxelMatrix } from "../Matrix/VoxelMatrix.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { Tasks } from "./Tasks/Tasks.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";


export const DVEC = {
 environment: <"node" | "browser">"browser",
 __settingsHaveBeenSynced: false,
 __queueStatesSet: false,
 _3dFlatArray: Util.getFlat3DArray(),
 worldBounds: WorldBounds,
 UTIL: Util,
 settings: EngineSettings,

 dataSyncNode : DataSyncNode,
 data : DataManager,

 DVEB: DVEB,
 DVEP: DVEP,
 DVEWG: DVEWG,

 tasks: Tasks,



 worldMatrix: WorldMatrix,
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
    DVEC.worldComm.isPortSet() &&
    DVEC.__settingsHaveBeenSynced
   );
  } else {
   return (
    DVEC.worldComm.isPortSet() &&
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
