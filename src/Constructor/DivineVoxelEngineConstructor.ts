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
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//matrix
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";

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

 queues: QueuesManager,

 worldMatrix: WorldMatrix,
 matrixHub: MatrixHub,

 renderComm: RenderComm,
 worldComm: WorldComm,

 voxelManager: VoxelManager,
 itemManager: ItemManager,

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.__settingsHaveBeenSynced = true;
  DVEB.syncSettings(data);
 },
 reStart() {},

 isReady() {
  return (
   DVEC.__connectedToWorld &&
    DVEC.matrixHub.worldPort !== undefined &&
    DVEC.worldComm.port !== null &&
    DVEC.__settingsHaveBeenSynced,
   DVEB.textureManager.isReady()
  );
 },

 async $INIT(initData: DVECInitData) {
  this.settings.setContext("DVEC");
  await InitWorker(this, initData);
  this.worldComm.sendMessage("ready", []);
 },
};
export type DivineVoxelEngineConstructor = typeof DVEC;

DVEC.environment = Util.getEnviorment();
