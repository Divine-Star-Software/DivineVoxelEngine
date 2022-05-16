import type { DivineVoxelEngineRender } from "Render/DivineVoxelEngineRender.js";
/**# World Comm
 * ---
 * Handles communication with the world thread.
 */
export declare class WorldComm {
    private DVER;
    worker: Worker;
    constructor(DVER: DivineVoxelEngineRender);
    getWorker(): Worker;
    start(): void;
    reStart(): void;
    handleMessage(event: MessageEvent, world: this): void;
    createWorldWorker(workerPath: string): void;
    setWorldWorker(worker: Worker): void;
    _initWorker(): void;
    _syncSettings(): void;
}
