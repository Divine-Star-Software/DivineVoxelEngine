import type { ShapeHelperInterface } from "Meta/Contents/Builder/Shapes/ShapeHelper.interface";
import type { VoxelShapeAddData, VoxelShapeAddReturnData, VoxelShapeInterface } from "Meta/Contents/Builder/Shapes/VoxelShape.interface";
declare type BoxFaceFunction = (data: VoxelShapeAddData) => VoxelShapeAddReturnData;
export declare class BoxVoxelShape implements VoxelShapeInterface {
    shapeHelper: ShapeHelperInterface;
    width: number;
    depth: number;
    height: number;
    constructor(shapeHelper: ShapeHelperInterface);
    faces: Record<number, BoxFaceFunction>;
    addToChunkMesh(data: VoxelShapeAddData): {
        newIndicieIndex: number;
        newUVTemplateIndex: number;
        newLightIndex: number;
        newAOIndex: number;
    };
}
export {};
