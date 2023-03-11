import { WorldComm } from "./DataLoaderThreads.js";
export const DataLoaderThreadState = {
    _settingsSynced: false,
    isReady() {
        return WorldComm.isPortSet() && this._settingsSynced;
    }
};
