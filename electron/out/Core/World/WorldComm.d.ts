import type { DivineVoxelEngine } from "Core/DivineVoxelEngine.js";
import { BaseWorldData } from "Meta/World/BaseWorldData.type.js";
import { PositionMatrix } from "Meta/Util.types.js";
/**# World Comm
 * ---
 * Handles communication with the world thread.
 */
export declare class WorldComm {
    private DVE;
    waitingForWolrdData: boolean;
    baseWorldData: BaseWorldData | null;
    worker: Worker;
    constructor(DVE: DivineVoxelEngine);
    requestWorldUpdate(type: "voxel-add" | "voxel-remove", position: PositionMatrix): void;
    getWorker(): Worker;
    start(): void;
    reStart(): void;
    handleMessage(event: MessageEvent, world: this): void;
    getBaseWorldData(): Promise<BaseWorldData>;
    createWorldWorker(workerPath: string): void;
    setWorldWorker(worker: Worker): void;
    _initWorker(): void;
    _syncSettings(): void;
}
