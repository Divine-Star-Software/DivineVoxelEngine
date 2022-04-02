import type { DivineVoxelEngine } from "../DivineVoxelEngine";
export declare class BuilderWorkerManager {
    private DVE;
    numBuilders: number;
    count: number;
    builders: Worker[];
    fluidBuilder: Worker;
    buildRequestFunctions: Record<number, (chunkKey: string, chunkX: number, chunkY: number, chunkZ: number, data: any) => void>;
    constructor(DVE: DivineVoxelEngine);
    reStart(): void;
    setBuilderWorkers(workers: Worker[]): void;
    createBuilderWorkers(path: string): void;
    _initBuilderWorkers(): void;
    createFluidBuilderWorker(path: string): void;
    setFluidBuilderWorker(worker: Worker): void;
    _initFluidBuilder(): void;
    _handlFluideBuildMeshMessage(event: MessageEvent): Promise<void>;
    _handleBuildMeshMessage(event: MessageEvent): Promise<void>;
    _syncSettings(): void;
}
