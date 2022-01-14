/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { BaseWorldData } from "Meta/Global/BaseWorldData.type.js";
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
    requestWorldUpdate(type: "block-add" | "block-remove", position: PositionMatrix): void;
    setShadowGen(shadowGen: BABYLON.ShadowGenerator): void;
    getChunkMeshFacetData(chunkX: number, chunkZ: number, faceID: number): false | BABYLON.Vector3;
    getChunkMesh(chunkX: number, chunkZ: number): false | BABYLON.Mesh;
    setScene(scene: BABYLON.Scene): void;
    setMaterial(material: BABYLON.MultiMaterial): void;
    getWorker(): Worker;
    sendPlayerSharedArrays(arrays: SharedArrayBuffer[]): void;
    startWorldGen(): void;
    handleMessage(event: MessageEvent, world: this): void;
    getBaseWorldData(): Promise<BaseWorldData>;
    createWorldWorker(workerPath: string): void;
}
