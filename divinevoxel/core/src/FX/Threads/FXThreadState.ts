import { WorldComm } from  "./FXThreads.js";

export const FXThreadState = {
 _settingsSynced: false,

 isReady() {
  return WorldComm.isReady() && this._settingsSynced;
 },
};
