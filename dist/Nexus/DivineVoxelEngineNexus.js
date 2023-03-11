//comms
import { WorldComm, ParentComm } from "./Threads/NexusTheads.js";
//objects
import { Util } from "../Global/Util.helper.js";
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
//functions
import { InitNexusWorker } from "./Init/InitNexusWorker.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
import { WorldPainter } from "../Data/World/WorldPainter.js";
import { ThreadComm } from "threadcomm";
export const DVEN = {
    environment: "browser",
    TC: ThreadComm,
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    worldData: WorldPainter,
    worldComm: WorldComm,
    parentComm: ParentComm,
    async $INIT() {
        await InitNexusWorker(this);
    },
};
DVEN.environment = Util.getEnviorment();
