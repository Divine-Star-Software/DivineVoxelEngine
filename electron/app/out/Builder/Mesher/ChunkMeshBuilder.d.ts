import type { InfoByte } from "Global/Util/InfoByte";
import { FullChunkTemplate, VoxelSubstanceType } from "Meta/index";
import { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";
export declare class ChunkMeshBuilder {
    private DVEB;
    infoByte: typeof InfoByte;
    voxelBuildOrder: VoxelSubstanceType[];
    voxelTypeMap: {
        solid: number;
        flora: number;
        fluid: number;
        magma: number;
    };
    constructor(DVEB: DivineVoxelEngineBuilder);
    buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: FullChunkTemplate): void;
}
