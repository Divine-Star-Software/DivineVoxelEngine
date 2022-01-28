import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import type { VoxelShapeAddData, VoxelShapeAddReturnData, VoxelShapeInterface } from "Meta/Builder/Shapes/VoxelShape.interface";
declare type BoxFaceFunction = (data: VoxelShapeAddData) => VoxelShapeAddReturnData;
export declare class BoxVoxelShape implements VoxelShapeInterface {
    shapeHelper: ShapeHelperInterface;
    id: string;
    width: number;
    depth: number;
    height: number;
    constructor(shapeHelper: ShapeHelperInterface);
    faces: Record<number, BoxFaceFunction>;
    addToChunkMesh(data: VoxelShapeAddData): {
        newIndicieIndex: number;
        newUVTemplateIndex: number;
        newColorIndex: number;
        newlightIndex: number;
        newAOIndex: number;
    };
}
export {};
