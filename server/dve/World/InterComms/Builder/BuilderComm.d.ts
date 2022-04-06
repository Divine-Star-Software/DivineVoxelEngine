import type { DivineVoxelEngineWorld } from "index";
import { FullChunkTemplate } from "Meta/Chunks/Chunk.types";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
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
    voxelTypeMap: Record<VoxelSubstanceType, number>;
    mainThreadCom: Worker;
    builders: MessagePort[];
    fluidBuilder: MessagePort;
    fluidMeshHasBeenUpdated: boolean;
    setMainThreadCom(worker: Worker): void;
    connectFluidBuilder(port: MessagePort): void;
    connectBuilder(port: MessagePort): void;
    requestFullChunkBeRemoved(chunkX: number, chunkZ: number): void;
    requestFluidMeshBeReBuilt(): void;
    requestFullChunkBeBuiltAsync(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): Promise<void>;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
}
