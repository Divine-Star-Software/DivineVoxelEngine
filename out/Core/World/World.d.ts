/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { BaseWorldData } from "Meta/Global/BaseWorldData.type.js";
import { PositionMatrix } from "Meta/Util.types.js";
import { ChunkMesh } from "../Render/Meshes/Chunk/ChunkMesh.js";
export declare class World {
    private DS;
    waitingForWolrdData: boolean;
    baseWorldData: BaseWorldData | null;
    runningBlockUpdate: boolean;
    worker: Worker;
    chunkBuilder: ChunkMesh;
    scene: BABYLON.Scene;
    material: BABYLON.MultiMaterial;
    shadowGen: BABYLON.ShadowGenerator;
    chunkMeshes: Record<number, Record<number, BABYLON.Mesh>>;
    constructor(DS: DivineVoxelEngine);
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
