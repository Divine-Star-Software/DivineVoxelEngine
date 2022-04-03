/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "../DivineVoxelEngine.js";
/**# Nexus
 * ---
 * Handles communication with the DVEN thread.
 */
export declare class Nexus {
    private DVE;
    worker: Worker;
    scene: BABYLON.Scene;
    constructor(DVE: DivineVoxelEngine);
    reStart(): void;
    getWorker(): Worker;
    startWorldGen(): void;
    handleMessage(event: MessageEvent, world: this): void;
    createNexusWorker(workerPath: string): void;
    _syncSettings(): void;
}
