/// <reference types="babylonjs" />
import type { DVE, DVEInitData } from "Meta/Core/DVE.js";
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
    $INIT(data: DVEInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
}
