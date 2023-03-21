//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//intercomms
import { WorldComm, ParentComm } from "./Threads/FXThreads.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
export const DVEFX = {
    environment: "browser",
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    worldComm: WorldComm,
    parentComm: ParentComm,
    async $INIT() {
        await InitWorker(this);
    },
    getRichDataTool() {
        return new RichDataTool();
    },
    getDataTool() {
        return new DataTool();
    }
};
