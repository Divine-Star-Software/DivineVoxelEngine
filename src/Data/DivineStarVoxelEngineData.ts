import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderComm } from "./InterComms/Render/RenderComm.js";
import { EngineSettingsData } from "Meta/index.js";

export const DVED = {
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

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.settings.syncWithWorldBounds(this.worldBounds);
  this.__settingsHaveBeenSynced = true;
 },
 reStart() {},

 isReady() {
  return (
   DVED.__connectedToWorld &&
   DVED.matrixHub.worldPort !== undefined &&
   DVED.worldComm.port !== null &&
   DVED.__settingsHaveBeenSynced
  );
 },

 $INIT() {},
};

export type DivineVoxelEngineData = typeof DVED;
