import type { VoxelConstructorObject } from "Meta/index";
import type { DataTool } from "Tools/Data/DataTool";
import type { VoxelShapeInterface } from "./VoxelShape.types";
export declare type ConstructorDataTool = DataTool & {
    getVoxelShapeObj(): VoxelShapeInterface;
    getVoxelObj(): VoxelConstructorObject;
};
