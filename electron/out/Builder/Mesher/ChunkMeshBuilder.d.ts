import type { FullChunkTemplate, VoxelSubstanceType } from "Meta/index";
export declare const ChunkMeshBuilder: {
    infoByte: {
        maxBit: number;
        minBit: number;
        maxDec: number;
        minDec: number;
        byteValue: number;
        getNumberValue(): number;
        setNumberValue(newValue: number): void;
        getBit(index: number): 0 | 1;
        getBitsArray(bitIndex: number, byteLength: number): (0 | 1)[];
        getHalfByteDec(bitIndex: number): number;
        setHalfByteBits(index: number, value: number): void;
        setBit(index: number, value: 0 | 1): void;
        toArray(): (0 | 1)[];
        toString(delimiter?: string): string;
    };
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        fluid: number;
        magma: number;
    };
    buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
};
