/// <reference types="babylonjs" />
import type { DVE, DVEInitData, DVEOptions } from "Meta/Core/DVE.js";
import { Util } from "../Global/Util.helper.js";
import { BuilderWorkerManager } from "./Builders/BuilderWorkerManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { MeshManager } from "./Meshes/MeshManager.js";
export declare class DivineVoxelEngine implements DVE {
    world: World;
    renderManager: RenderManager;
    builderManager: BuilderWorkerManager;
    meshManager: MeshManager;
    util: Util;
    constructor();
    _handleOptions(data: DVEOptions): void;
    reStart(data: DVEOptions): Promise<void>;
    $INIT(data: DVEInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
}
