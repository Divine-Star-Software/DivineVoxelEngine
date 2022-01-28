import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { VoxelShapeAddData, VoxelShapeAddReturnData, VoxelShapeInterface } from "Meta/Builder/Shapes/VoxelShape.interface";
export declare class FluidSourceBlockVoxelShape implements VoxelShapeInterface {
    shapeHelper: ShapeHelperInterface;
    id: string;
    width: number;
    depth: number;
    height: number;
    constructor(shapeHelper: ShapeHelperInterface);
    faces: Record<number, (data: VoxelShapeAddData) => VoxelShapeAddReturnData>;
    addToChunkMesh(data: VoxelShapeAddData): {
        newIndicieIndex: number;
        newUVTemplateIndex: number;
        newColorIndex: number;
        newlightIndex: number;
        newAOIndex: number;
    };
}
