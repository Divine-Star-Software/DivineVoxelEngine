import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
import type { FullChunkTemplate } from "Meta/index";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export declare class BuilderCommManager {
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        magma: number;
    };
    count: number;
    numBuilders: number;
    builders: InterCommInterface[];
    addBuilder(port: InterCommPortTypes): void;
    requestFullChunkBeRemoved(chunkX: number, chunkY: number, chunkZ: number): void;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
}
