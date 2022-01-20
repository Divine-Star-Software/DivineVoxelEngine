import type { ShapeManager } from "Builder/Shapes/ShapeManager";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
export declare class FluidMeshBuilder {
    private shapeManager;
    private UTIL;
    infoByte: InfoByte;
    constructor(shapeManager: ShapeManager, UTIL: Util);
    templateMap: Record<string, number[]>;
    savedTemplates: Record<string, any[]>;
    removeTemplate(chunkX: number, chunkY: number, chunkZ: number): void;
    generateMesh(): number[][];
    addTemplate(chunkX: number, chunkY: number, chunkZ: number, newPositionsTemplate: Uint16Array, newFaceTemplate: Uint8Array, newShapeTemplate: Uint16Array, newUvTemplate: Uint16Array, newLightTemplate: Float32Array, newAoTemplate: Float32Array): void;
}
