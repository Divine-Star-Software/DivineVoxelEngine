//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { Builder } from "./Builder/Builder.js";
import { Propagation } from "./Propagation/Propagation.js";
import { WorldGeneration } from "./WorldGeneration/WorldGeneration.js";
//data
import { DataManager } from "../Data/DataManager.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { ItemManager } from "./Managers/Items/ItemManager.js";
import { VoxelManager } from "./Managers/Voxels/VoxelManager.js";
//threadcomm
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { ParentComm } from "./Threads/Parent/ParentComm.js";
import { WorldComm } from "./Threads/World/WorldComm.js";
import { Tasks } from "./Tasks/Tasks.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { GetConstructorDataTool } from "./Tools/Data/ConstructorDataTool.js";
export const DVEC = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    UTIL: Util,
    settings: EngineSettings,
    propagation: Propagation,
    worldGen: WorldGeneration,
    builder: Builder,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    itemManager: ItemManager,
    voxelManager: VoxelManager,
    TC: ThreadComm,
    parentComm: ParentComm,
    worldComm: WorldComm,
    tasks: Tasks,
    syncSettings(data) {
        this.settings.syncSettings(data);
        Builder.syncSettings(data);
        this.__settingsHaveBeenSynced = true;
    },
    reStart() { },
    isReady() {
        if (this.environment == "node") {
            return (DVEC.worldComm.isPortSet() &&
                DVEC.__settingsHaveBeenSynced &&
                DataSyncNode.isReady());
        }
        else {
            return (DVEC.worldComm.isPortSet() &&
                DVEC.__settingsHaveBeenSynced &&
                Builder.textureManager.isReady() &&
                DataSyncNode.isReady());
        }
    },
    async $INIT() {
        await InitWorker(this);
    },
    getDataTool() {
        return GetConstructorDataTool();
    },
};
DVEC.environment = Util.getEnviorment();
