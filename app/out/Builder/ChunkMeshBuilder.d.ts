import type { Util } from "Global/Util.helper";
import type { InfoByte } from "Global/Util/InfoByte";
import type { MeshData } from "Meta/Util.types";
import type { ShapeManager } from "./Shapes/ShapeManager";
export declare class ChunkMeshBuilder {
    private shapeManager;
    private UTIL;
    infoByte: InfoByte;
    constructor(shapeManager: ShapeManager, UTIL: Util);
    buildChunkMesh(chunkX: number, chunkZ: number, positionsTemplate: Uint16Array, faceTemplate: Uint8Array, shapeTemplate: Uint16Array, uvTemplate: Uint16Array, lightTemplate: Float32Array, aoTemplate: Float32Array): MeshData;
}
