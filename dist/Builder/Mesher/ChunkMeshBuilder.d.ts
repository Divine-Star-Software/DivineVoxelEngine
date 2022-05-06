import type { InfoByte } from "Global/Util/InfoByte";
import { FullChunkTemplate, VoxelSubstanceType } from "Meta/index";
import { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";
export declare class ChunkMeshBuilder {
    private DVEB;
    infoByte: InfoByte;
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        magma: number;
    };
    constructor(DVEB: DivineVoxelEngineBuilder);
    buildChunkMeshO(chunkType: number, chunkX: number, chunkY: number, chunkZ: number, positionsTemplate: Uint16Array, faceTemplate: Uint8Array, shapeTemplate: Uint16Array, uvTemplate: Uint16Array, colorTemplate: Float32Array, lightTemplate: Float32Array, aoTemplate: Float32Array): Promise<void>;
    buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): Promise<void>;
}
