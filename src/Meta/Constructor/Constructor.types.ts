import type { VoxelConstructorObject } from "Meta/index";
import type { DataTool } from "Tools/Data/DataTool";
import type { VoxelShape } from "./VoxelShape.types";

export type ConstructorDataTool = DataTool & {
 getVoxelShapeObj(): VoxelShape;
 getVoxelObj(): VoxelConstructorObject;
};
