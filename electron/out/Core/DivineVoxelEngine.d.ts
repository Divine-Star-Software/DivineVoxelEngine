/// <reference types="babylonjs" />
import type { DVEInitData } from "Meta/Core/DVE.js";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import { Util } from "../Global/Util.helper.js";
import { BuilderWorkerManager } from "./Builders/BuilderWorkerManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { MeshManager } from "./Meshes/MeshManager.js";
import { EngineSettings } from "../Global/EngineSettings.js";
export declare class DivineVoxelEngine {
    world: World;
    engineSettings: EngineSettings;
    renderManager: RenderManager;
    builderManager: BuilderWorkerManager;
    meshManager: MeshManager;
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
