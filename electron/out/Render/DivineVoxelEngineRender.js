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
import { WorldComm } from "./InterComms/World/WorldComm.js";
//functions
import { BuildInitalMeshes } from "./Init/BuildInitalMeshes.js";
export const DVER = {
    worldBounds: Util.getWorldBounds(),
    worldComm: WorldComm,
    nexusComm: NexusComm,
    builderCommManager: BuilderCommManager,
    engineSettings: EngineSettings,
    renderManager: RenderManager,
    meshManager: MeshManager,
    textureManager: TextureManager,
    renderedEntites: RenderedEntitesManager,
    util: Util,
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
    },
    async reStart(data) {
        this._syncSettings(data);
        this._handleOptions();
    },
    async $INIT(data) {
        this.engineSettings.syncSettings(data);
        this._handleOptions();
        if (typeof data.worldWorker == "string") {
            const worker = this.__createWorker(data.worldWorker);
            this.worldComm.setPort(worker);
        }
        else if (data.worldWorker instanceof Worker) {
            this.worldComm.setPort(data.worldWorker);
        }
        else {
            throw Error("Supplied data for World Worker is not correct. Must be path to worker or a worker.");
        }
        if (typeof data.builderWorker == "string") {
            this.builderCommManager.createBuilders(data.builderWorker);
        }
        else if (Array.isArray(data.builderWorker) &&
            data.builderWorker[0] instanceof Worker) {
            this.builderCommManager.setBuilders(data.builderWorker);
        }
        else {
            throw Error("Supplied data for Builder Workers is not correct. Must be path to worker or an array workers.");
        }
        if (data.nexusWorker && data.nexus?.enabled) {
            if (typeof data.nexusWorker == "string") {
                const worker = this.__createWorker(data.nexusWorker);
                this.nexusComm.setPort(worker);
            }
            else if (data.nexusWorker instanceof Worker) {
                this.nexusComm.setPort(data.nexusWorker);
            }
            else {
                throw Error("Supplied data for Nexus Worker is not correct. Must be path to worker or a worker.");
            }
            this.nexusComm.$INIT();
        }
        this._syncSettings(data);
        this.textureManager.generateTexturesData();
        this.builderCommManager.$INIT();
        //terminate all workers
        window.addEventListener("beforeunload", () => {
            for (const builder of this.builderCommManager.builders) {
                //@ts-ignore
                builder.port.terminate();
            }
            //@ts-ignore
            this.worldComm.port.terminate();
            if (this.nexusComm.port) {
                //@ts-ignore
                this.nexusComm.port.terminate();
            }
        });
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
