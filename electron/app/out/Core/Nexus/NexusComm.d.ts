/// <reference types="babylonjs" />
import type { DivineVoxelEngine } from "../DivineVoxelEngine.js";
/**# NexusComm
 * ---
 * Handles communication with the nexus thread.
 */
export declare class NexusComm {
    private DVE;
    worker: Worker;
    scene: BABYLON.Scene;
    messageFunctions: Record<string, (data: any[], event: MessageEvent) => void>;
    constructor(DVE: DivineVoxelEngine);
    reStart(): void;
    getWorker(): Worker;
    startWorldGen(): void;
    handleMessage(event: MessageEvent): void;
    createNexusWorker(workerPath: string): void;
    setNexusWorker(worker: Worker): void;
    _initWorker(): void;
    _syncSettings(): void;
}
