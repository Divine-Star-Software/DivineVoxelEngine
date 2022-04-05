/// <reference types="babylonjs" />
import type { DVEInitData } from "Meta/Core/DVE.js";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { Util } from "../Global/Util.helper.js";
import { BuilderComm } from "./InterComms/Builders/BuilderComm.js";
import { WorldComm } from "./InterComms/World/WorldComm.js";
import { RenderManager } from "./Render/RenderManager.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { NexusComm } from "./InterComms/Nexus/NexusComm.js";
import { RenderedEntitesManager } from "./RenderedEntites/RenderedEntites.manager.js";
export declare class DivineVoxelEngine {
    worldComm: WorldComm;
    nexusComm: NexusComm;
    engineSettings: EngineSettings;
    renderManager: RenderManager;
    builderManager: BuilderComm;
    meshManager: MeshManager;
    renderedEntites: RenderedEntitesManager;
    util: Util;
    constructor();
    _handleOptions(): void;
    _syncSettings(data: EngineSettingsData): void;
    reStart(data: EngineSettingsData): Promise<void>;
    $INIT(data: DVEInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
}
export declare const DVE: DivineVoxelEngine;
