/// <reference types="babylonjs" />
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./Builders/BuilderManager.js";
import { ChunkManager } from "./Chunks/ChunkManager.js";
import { World } from "./World/World.js";
import { RenderManager } from "./Render/RenderManager.js";
export declare class DivineVoxelEngine {
    world: World;
    renderManager: RenderManager;
    chunkManager: ChunkManager;
    builderManager: BuilderManager;
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
