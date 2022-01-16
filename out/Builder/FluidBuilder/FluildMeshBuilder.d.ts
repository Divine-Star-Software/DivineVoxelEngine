import type { ShapeManager } from "Builder/Shapes/ShapeManager";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
import type { MeshData } from "Meta/Util.types";
export declare class FluidMeshBuilder {
    private shapeManager;
    private UTIL;
    infoByte: InfoByte;
    constructor(shapeManager: ShapeManager, UTIL: Util);
    templateMap: Record<string, number[]>;
    savedTemplates: Record<string, any[]>;
    removeTemplate(chunkX: number, chunkZ: number): void;
    generateMesh(): {
        positions: number[];
        indices: number[];
        colors: number[];
        uvs: number[];
    };
    buildMesh(chunkX: number, chunkZ: number, newPositionsTemplate: Uint16Array, newFaceTemplate: Uint8Array, newShapeTemplate: Uint16Array, newUvTemplate: Uint16Array, newLightTemplate: Float32Array, newAoTemplate: Float32Array): MeshData;
}
