/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { BaseWorldData } from "Meta/World/BaseWorldData.type.js";
import { PositionMatrix } from "Meta/Util.types.js";
export declare class World {
    private DVE;
    waitingForWolrdData: boolean;
    baseWorldData: BaseWorldData | null;
    runningBlockUpdate: boolean;
    worker: Worker;
    scene: BABYLON.Scene;
    material: BABYLON.MultiMaterial;
    shadowGen: BABYLON.ShadowGenerator;
    chunkMeshes: Record<number, Record<number, BABYLON.Mesh>>;
    constructor(DVE: DivineVoxelEngine);
    reStart(): void;
    requestWorldUpdate(type: "voxel-add" | "voxel-remove", position: PositionMatrix): void;
    getWorker(): Worker;
    startWorldGen(): void;
    handleMessage(event: MessageEvent, world: this): void;
    getBaseWorldData(): Promise<BaseWorldData>;
    createWorldWorker(workerPath: string): void;
    setWorldWorker(worker: Worker): void;
    _initWorker(): void;
    _syncSettings(): void;
}
