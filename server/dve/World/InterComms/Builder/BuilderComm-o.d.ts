import type { DivineVoxelEngineWorld } from "index";
import { FullChunkTemplate } from "Meta/Chunks/Chunk.types";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
export declare const BuilderComms: {};
/**# Builder Comm
 * ---
 * Handles communication with the mesh builders thread.
 */
export declare class BuilderComm {
    private DVEW;
    count: number;
    numBuilders: number;
    constructor(DVEW: DivineVoxelEngineWorld);
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: Record<Partial<VoxelSubstanceType>, number>;
    mainThreadCom: Worker;
    builders: MessagePort[];
    setMainThreadCom(worker: Worker): void;
    connectBuilder(port: MessagePort): void;
    requestFullChunkBeRemoved(chunkX: number, chunkZ: number): void;
    requestFullChunkBeBuiltAsync(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): Promise<void>;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
}
