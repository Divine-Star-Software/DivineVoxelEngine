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
    buildRequestFunctions: Record<number, (chunkKey: string, data: any) => void>;
    constructor(DVER: DivineVoxelEngineRender);
    reStart(): void;
    setBuilderWorkers(workers: Worker[]): void;
    createBuilderWorkers(path: string): void;
    _initBuilderWorkers(): void;
    _handleBuildMeshMessage(event: MessageEvent): Promise<void>;
    _syncSettings(): void;
}
