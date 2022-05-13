import type { VoxelShapeAddData, VoxelShapeAddReturnData, VoxelShapeInterface } from "Meta/Builder/Shapes/VoxelShape.interface";
import { ShapeHelper } from "../ShapeHelper";
export declare class FluidSourceBlockVoxelShape implements VoxelShapeInterface {
    shapeHelper: ShapeHelper;
    id: string;
    width: number;
    depth: number;
    height: number;
    constructor(shapeHelper: ShapeHelper);
    faces: Record<number, (data: VoxelShapeAddData) => VoxelShapeAddReturnData>;
    addToChunkMesh(data: VoxelShapeAddData): {
        newIndicieIndex: number;
        newUVTemplateIndex: number;
        newColorIndex: number;
        newlightIndex: number;
        newAOIndex: number;
    };
}
