import { VoxelSubstanceType } from "Meta/index";
export declare const QueuesManager: {
    _numChunksRebuilding: number;
    _numRGBLightUpdates: number;
    _numRGBLightRemoves: number;
    _RGBLightRemoveQue: number[][];
    _RGBLightUpdateQue: number[][];
    _chunkRebuildQueMap: Record<string, Record<VoxelSubstanceType | "all", boolean>>;
    _chunkRebuildQue: number[][];
    addToRGBUpdateQue(x: number, y: number, z: number): void;
    addToRGBRemoveQue(x: number, y: number, z: number): void;
    runRGBUpdateQue(): void;
    runRGBRemoveQue(): void;
    awaitAllRGBLightUpdates(): Promise<boolean>;
    awaitAllRGBLightRemove(): Promise<boolean>;
    addToRebuildQue(x: number, y: number, z: number, substance: VoxelSubstanceType | "all"): void;
    runRebuildQue(): void;
    awaitAllChunksToBeBuilt(): Promise<boolean>;
};
