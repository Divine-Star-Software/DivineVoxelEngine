/// <reference types="babylonjs" />
import { Util } from "../Global/Util.helper.js";
import { BuilderManager } from "./Builders/BuilderManager.js";
import { ChunkMaterial } from "./Builders/ChunkMaterial.js";
import { ChunkManager } from "./Chunks/ChunkManager.js";
import { World } from "./World/World.js";
export declare class DivineVoxelEngine {
    world: World;
    chunkManager: ChunkManager;
    builderManager: BuilderManager;
    chunkMaterial: ChunkMaterial;
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
