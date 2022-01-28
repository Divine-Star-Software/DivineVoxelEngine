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
    createBuilderWorker(path: string): void;
    createFluidBuilderWorker(path: string): void;
    _handlFluideBuildMeshMessage(event: MessageEvent): Promise<void>;
    _handleBuildMeshMessage(event: MessageEvent): Promise<void>;
    _syncSettings(): void;
}
