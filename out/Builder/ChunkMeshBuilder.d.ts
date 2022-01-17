import type { Util } from "Global/Util.helper";
import type { InfoByte } from "Global/Util/InfoByte";
import { DivineVoxelEngineBuilder } from "./DivineVoxelEngineBuilder";
import type { ShapeManager } from "./Shapes/ShapeManager";
export declare class ChunkMeshBuilder {
    private DVEB;
    private shapeManager;
    private UTIL;
    infoByte: InfoByte;
    constructor(DVEB: DivineVoxelEngineBuilder, shapeManager: ShapeManager, UTIL: Util);
    buildChunkMesh(chunkType: number, chunkX: number, chunkZ: number, positionsTemplate: Uint16Array, faceTemplate: Uint8Array, shapeTemplate: Uint16Array, uvTemplate: Uint16Array, lightTemplate: Float32Array, aoTemplate: Float32Array): void;
}
