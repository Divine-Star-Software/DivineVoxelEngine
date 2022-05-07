import type { DivineVoxelEngineRender } from "../../DivineVoxelEngineRender";
/**# Builder Comm
 * ---
 * Handles communcation with the builder threads and the fluid builder thread.
 * Sends the mesh data from them to the mesh manager.
 */
export declare class BuilderComm {
    private DVER;
    numBuilders: number;
    count: number;
    builders: Worker[];
    fluidBuilder: Worker;
    buildRequestFunctions: Record<number, (chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any) => void>;
    constructor(DVER: DivineVoxelEngineRender);
    reStart(): void;
    setBuilderWorkers(workers: Worker[]): void;
    createBuilderWorkers(path: string): void;
    _initBuilderWorkers(): void;
    createFluidBuilderWorker(path: string): void;
    setFluidBuilderWorker(worker: Worker): void;
    _initFluidBuilder(): void;
    connectBuilderToFluidBuilder(): void;
    _handlFluideBuildMeshMessage(event: MessageEvent): Promise<void>;
    _handleBuildMeshMessage(event: MessageEvent): Promise<void>;
    _syncSettings(): void;
}
