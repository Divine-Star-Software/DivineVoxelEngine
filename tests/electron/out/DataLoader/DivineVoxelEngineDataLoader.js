//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { DataManager } from "../Data/DataManager.js";
import { WorldDataSerialize } from "./Serializers/WorldDataSerializer.js";
//intercomms
import { WorldComm } from "./Threads/World/WorldComm.js";
import { ParentComm } from "./Threads/Parent/ParentComm.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { DataLoaderTasks } from "./Tasks/DataLoaderTasks.js";
import { DataHanlderWrapper } from "./DataHandler/DataHandlerWrapper.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
export const DVEDL = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    TC: ThreadComm,
    UTIL: Util,
    settings: EngineSettings,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    worldComm: WorldComm,
    parentComm: ParentComm,
    tasks: DataLoaderTasks,
    serializer: WorldDataSerialize,
    dataHandler: DataHanlderWrapper,
    syncSettings(data) {
        this.settings.syncSettings(data);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        return DVEDL.worldComm.isPortSet() && DVEDL.__settingsHaveBeenSynced;
    },
    async $INIT(dataHanlder) {
        this.dataHandler.$INIT(dataHanlder);
        await InitWorker(this);
    },
};
