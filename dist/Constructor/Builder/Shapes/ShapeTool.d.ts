import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";
import { VoxelShapeTool } from "../Tools/VoxelShapeTool.js";
export declare class ShapeToolType {
    data: VoxelMesherDataTool;
    builder: VoxelShapeTool;
    setMesher(dataTool: VoxelMesherDataTool): void;
}
export declare const ShapeTool: ShapeToolType;
