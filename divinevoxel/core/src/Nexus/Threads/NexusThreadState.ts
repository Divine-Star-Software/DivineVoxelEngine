import { WorldComm } from "./NexusTheads.js";

export const NexusThreadState = {
 _settingsSynced: false,

 isReady() {
  return WorldComm.isReady() && this._settingsSynced;
 },
};
