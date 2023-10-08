import { WorldComm } from "./RichWorldThreads.js";

export const RichWorldThreadState = {
 _settingsSynced: false,

 isReady() {
  return WorldComm.isReady() && this._settingsSynced;
 },
};
