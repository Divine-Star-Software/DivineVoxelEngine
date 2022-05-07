import { DivineVoxelEngineWorld } from "index.js";
import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
import type { FullChunkTemplate } from "Meta/index";
import type { VoxelSubstanceType } from "Meta/Voxels/Voxel.types";
/**# Builder Comm Manager
 * ---
 * Handles all builder inter comms.
 */
export declare class BuilderCommManager {
    DVEW: DivineVoxelEngineWorld;
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        magma: number;
    };
    count: number;
    numBuilders: number;
    builders: InterCommInterface[];
    ready: Record<string, boolean>;
    constructor(DVEW: DivineVoxelEngineWorld);
    addBuilder(port: InterCommPortTypes): void;
    syncChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
    isReady(): boolean;
    requestFullChunkBeRemoved(chunkX: number, chunkY: number, chunkZ: number): void;
    requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): void;
    requestFullChunkBeBuiltO(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
}
