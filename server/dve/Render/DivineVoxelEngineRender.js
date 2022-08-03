//objects
import { Util } from "../Global/Util.helper.js";
import { RenderedEntitesManager } from "./RenderedEntites/RenderedEntites.manager.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { RenderManager } from "./Render/RenderManager.js";
//inter comms
import { DataComm } from "./InterComms/Data/DataComm.js";
import { FXComm } from "./InterComms/FX/FXComm.js";
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//functions
import { InitWorkers } from "./Init/InitWorkers.js";
import { BuildInitalMeshes } from "./Init/BuildInitalMeshes.js";
import { ConstructorCommManager } from "./InterComms/Constructor/ConstructorCommManager.js";
import { RichWorldComm } from "./InterComms/RichWorld/RichWorldComm.js";
export const DVER = {
    worldBounds: Util.getWorldBounds(),
    worldComm: WorldComm,
    nexusComm: NexusComm,
    dataComm: DataComm,
    fxComm: FXComm,
    richWorldComm: RichWorldComm,
    constructorCommManager: ConstructorCommManager,
    settings: EngineSettings,
    renderManager: RenderManager,
    meshManager: MeshManager,
    textureManager: TextureManager,
    renderedEntites: RenderedEntitesManager,
    UTIL: Util,
    _handleOptions() {
        const data = this.settings.settings;
        if (data.textureOptions) {
            if (data.textureOptions.width && data.textureOptions.height) {
                this.renderManager.textureCreator.defineTextureDimensions(data.textureOptions.width, data.textureOptions.height);
            }
        }
    },
    _syncSettings(data) {
        this.settings.syncSettings(data);
        this.settings.syncWithWorldBounds(this.worldBounds);
        const copy = this.settings.getSettingsCopy();
        this.renderManager.syncSettings(copy);
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
    async reStart(data) {
        this._syncSettings(data);
        this._handleOptions();
    },
    async $INIT(initData) {
        this.settings.setContext("DVER");
        InitWorkers(this, initData);
    },
    async $SCENEINIT(data) {
        await BuildInitalMeshes(this, data.scene);
        if (this.settings.settings.nexus?.enabled) {
            this.renderedEntites.setScene(data.scene);
        }
        this.worldComm.sendMessage("start", []);
    },
    __createWorker(path) {
        return new Worker(new URL(path, import.meta.url), {
            type: "module",
        });
    },
};
