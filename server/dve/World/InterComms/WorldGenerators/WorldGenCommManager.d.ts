import type { InterCommInterface, InterCommPortTypes } from "Meta/Comms/InterComm.types";
import { VoxelSubstanceType } from "Meta/index.js";
/**# World Gen Comm Manager
 * ---
 * Handles all world gen comms. .
 */
export declare const WorldGenCommManager: {
    count: number;
    numWorldGens: number;
    states: Int32Array;
    __numLightUpdates: number;
    worldGens: InterCommInterface[];
    worldGensConnected: number;
    $INIT(): void;
    addWorldGen(port: InterCommPortTypes): void;
    syncChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number): void;
    releaseChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number): void;
    syncRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number): void;
    releaseRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number): void;
    isReady(): boolean;
    _chunkRebuildQueMap: Record<string, Record<VoxelSubstanceType | "all", boolean>>;
    _chunkRebuildQue: number[][];
    __addToRebuildQue(x: number, y: number, z: number, substance: VoxelSubstanceType | "all"): void;
    awaitAllLightUpdates(): Promise<boolean>;
    runRebuildQue(): void;
    runRGBFloodFillAt(x: number, y: number, z: number): void;
    runRGBFloodRemoveAt(x: number, y: number, z: number): void;
    areRGBLightUpdatesAllDone(): boolean;
};
