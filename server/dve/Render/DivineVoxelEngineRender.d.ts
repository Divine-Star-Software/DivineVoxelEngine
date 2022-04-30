/// <reference types="babylonjs" />
import type { DVERInitData } from "Meta/Render/DVER";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { Util } from "../Global/Util.helper.js";
import { BuilderComm } from "./InterComms/Builders/BuilderComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderManager } from "./Render/RenderManager.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RenderedEntitesManager } from "./RenderedEntites/RenderedEntites.manager.js";
import { TextureManager } from "./Textures/TextureManager.js";
export declare class DivineVoxelEngineRender {
    worldComm: WorldComm;
    nexusComm: NexusComm;
    engineSettings: EngineSettings;
    renderManager: RenderManager;
    builderManager: BuilderComm;
    meshManager: MeshManager;
    textureManager: TextureManager;
    renderedEntites: RenderedEntitesManager;
    util: Util;
    constructor();
    _handleOptions(): void;
    _syncSettings(data: EngineSettingsData): void;
    reStart(data: EngineSettingsData): Promise<void>;
    $INIT(data: DVERInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
}
export declare const DVER: DivineVoxelEngineRender;
