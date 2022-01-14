/// <reference types="babylonjs" />
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./Builders/BuilderManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
import { MeshManager } from "./Meshes/MeshManager.js";
export declare class DivineVoxelEngine {
    world: World;
    renderManager: RenderManager;
    builderManager: BuilderManager;
    meshManager: MeshManager;
    util: Util;
    constructor();
    $INIT(data: {
        worldWorkerPath: string;
        builderWorkerPath: string;
    }): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
}
