//objects
import { Util } from "../Global/Util.helper.js";
import { RenderedEntitesManager } from "./RenderedEntites/RenderedEntites.manager.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { RenderManager } from "./Render/RenderManager.js";
//inter comms
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { BuilderCommManager } from "./InterComms/Builders/BuilderCommManager.js";
import { PropagationCommManager } from "./InterComms/Propagators/PropagationCommManager.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
//functions
import { InitWorkers } from "./Init/InitWorkers.js";
import { BuildInitalMeshes } from "./Init/BuildInitalMeshes.js";
export const DVER = {
    worldBounds: Util.getWorldBounds(),
    worldComm: WorldComm,
    nexusComm: NexusComm,
    builderCommManager: BuilderCommManager,
    propagationCommManager: PropagationCommManager,
    engineSettings: EngineSettings,
    renderManager: RenderManager,
    meshManager: MeshManager,
    textureManager: TextureManager,
    renderedEntites: RenderedEntitesManager,
    UTIL: Util,
    _handleOptions() {
        const data = this.engineSettings.settings;
        if (data.textureOptions) {
            if (data.textureOptions.width && data.textureOptions.height) {
                this.renderManager.textureCreator.defineTextureDimensions(data.textureOptions.width, data.textureOptions.height);
            }
        }
    },
    _syncSettings(data) {
        this.engineSettings.syncSettings(data);
        const copy = this.engineSettings.getSettingsCopy();
        this.worldComm.sendMessage("sync-settings", [copy]);
        if (this.nexusComm.port) {
            this.nexusComm.sendMessage("sync-settings", [copy]);
        }
        this.builderCommManager.syncSettings(copy);
        this.propagationCommManager.syncSettings(copy);
    },
    async reStart(data) {
        this._syncSettings(data);
        this._handleOptions();
    },
    async $INIT(initData) {
        InitWorkers(this, initData);
    },
    async $SCENEINIT(data) {
        await BuildInitalMeshes(this, data.scene);
        if (this.engineSettings.settings.nexus?.enabled) {
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
