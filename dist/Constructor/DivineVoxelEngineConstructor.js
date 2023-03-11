//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { Builder } from "./Builder/Builder.js";
import { Propagation } from "./Propagation/Propagation.js";
import { WorldGeneration } from "./WorldGeneration/WorldGeneration.js";
import { TasksQueue } from "./Tasks/TasksQueue.js";
import { Analyzer } from "./Analyzer/Analyzer.js";
//data
import { DataManager } from "../Data/DataManager.js";
import { DataSyncNode } from "../Data/DataSyncNode.js";
import { VoxelConstructors } from "./Builder/Constructors/Voxel/VoxelConstructors.js";
//threadcomm
import { ThreadComm } from "threadcomm";
import { WorldComm, ParentComm } from "./Threads/ConstrcutorTheads.js";
import { Tasks } from "./Tasks/ConstructorTasks.js";
//functions
import { InitWorker } from "./Init/InitWorker.js";
import { GetConstructorDataTool } from "./Tools/Data/ConstructorDataTool.js";
import { ConstructorHooks } from "./Hooks/ConstructorHooks.js";
export const DVEC = {
    environment: "browser",
    UTIL: Util,
    settings: EngineSettings,
    propagation: Propagation,
    worldGen: WorldGeneration,
    builder: Builder,
    analyzer: Analyzer,
    dataSyncNode: DataSyncNode,
    data: DataManager,
    voxelManager: VoxelConstructors,
    TC: ThreadComm,
    parentComm: ParentComm,
    worldComm: WorldComm,
    tasks: Tasks,
    tasksQueue: TasksQueue,
    hooks: ConstructorHooks,
    async $INIT() {
        await InitWorker(this);
    },
    getDataTool() {
        return GetConstructorDataTool();
    },
};
DVEC.environment = Util.getEnviorment();
