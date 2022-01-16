import { FullChunkTemplate } from "Meta/Chunks/Chunk.types";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types";
/**# Builder Manager Worker
 * ---
 * Handles communication with the mesh builders thread.
 */
export declare class BuilderManager {
    count: number;
    numBuilders: number;
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: Record<VoxelSubstanceType, number>;
    mainThreadCom: Worker;
    builders: MessagePort[];
    fluidBuilder: MessagePort;
    fluidMeshHasBeenUpdated: boolean;
    setMainThreadCom(worker: Worker): void;
    addFluidBuilder(port: MessagePort): void;
    addBuilder(port: MessagePort): void;
    requestChunkBeRemoved(chunkX: number, chunkZ: number): void;
    requestFluidMeshBeReBuilt(): void;
    requestFullChunkBeBuilt(chunkX: number, chunkZ: number, template: FullChunkTemplate): void;
}
