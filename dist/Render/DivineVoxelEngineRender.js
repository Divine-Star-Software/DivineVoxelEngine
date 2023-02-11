//objects
import { Util } from "../Global/Util.helper.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { MeshManager } from "./Scene/MeshManager.js";
import { RenderManager } from "./Render/RenderManager.js";
//inter comms
import { DataComm } from "./Threads/Data/DataComm.js";
import { FXComm } from "./Threads/FX/FXComm.js";
import { NexusComm } from "./Threads/Nexus/NexusComm.js";
import { WorldComm } from "./Threads/World/WorldComm.js";
import { ConstructorCommManager } from "./Threads/Constructor/ConstructorCommManager.js";
import { RichWorldComm } from "./Threads/RichWorld/RichWorldComm.js";
//functions
import { InitWorkers } from "./Init/InitWorkers.js";
import { $INITFunction } from "./Init/InitRender.js";
import { RenderTasks } from "./Tasks/RenderTasks.js";
import { WorldBounds } from "../Data/World/WorldBounds.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { WorldSpaces } from "../Data/World/WorldSpaces.js";
import { SceneTool } from "./Tools/SceneTool.js";
export const DVER = {
    UTIL: Util,
    TC: ThreadComm,
    currentCom: ThreadComm.parent,
    worldComm: WorldComm,
    nexusComm: NexusComm,
    dataComm: DataComm,
    fxComm: FXComm,
    richWorldComm: RichWorldComm,
    constructorCommManager: ConstructorCommManager,
    settings: EngineSettings,
    render: RenderManager,
    meshManager: MeshManager,
    data: {
        worldBounds: WorldBounds,
        spaces: WorldSpaces,
    },
    textures: TextureManager,
    tasks: RenderTasks,
    syncSettingsWithWorkers(data) {
        this.settings.syncSettings(data);
        const copy = this.settings.getSettingsCopy();
        this.render.syncSettings(copy);
        this.worldComm.sendMessage("sync-settings", [copy]);
        if (this.nexusComm.port) {
            this.nexusComm.sendMessage("sync-settings", [copy]);
        }
        if (this.dataComm.port) {
            this.dataComm.sendMessage("sync-settings", [copy]);
        }
        if (this.fxComm.port) {
            this.fxComm.sendMessage("sync-settings", [copy]);
        }
        if (this.richWorldComm.port) {
            this.richWorldComm.sendMessage("sync-settings", [copy]);
        }
        this.constructorCommManager.syncSettings(copy);
    },
    async $INIT(initData) {
        await InitWorkers(this, initData);
    },
    async $SCENEINIT(data) {
        await $INITFunction(this, data.scene);
        this.worldComm.sendMessage("start", []);
    },
    __createWorker(path) {
        return new Worker(new URL(path, import.meta.url), {
            type: "module",
        });
    },
    getSceneTool() {
        return new SceneTool();
    },
};
