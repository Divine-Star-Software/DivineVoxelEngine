import type { DivineVoxelEngine } from "../DivineVoxelEngine";
export declare class BuilderManager {
    private DVE;
    numBuilders: number;
    count: number;
    builders: Worker[];
    fluidBuilder: Worker;
    buildRequestFunctions: Record<number, (chunkKey: string, chunkX: number, chunkZ: number, data: any) => void>;
    constructor(DVE: DivineVoxelEngine);
    createBuilderWorker(path: string): void;
    createFluidBuilderWorker(path: string): void;
    _handlFluideBuildMeshMessage(event: MessageEvent): Promise<void>;
    _handleBuildMeshMessage(event: MessageEvent): Promise<void>;
}
