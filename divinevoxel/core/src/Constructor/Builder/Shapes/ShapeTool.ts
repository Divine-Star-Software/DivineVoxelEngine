import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";
import { VoxelShapeTool } from "../Tools/VoxelShapeTool.js";

export class ShapeToolType {
 data = <VoxelMesherDataTool>{};
 builder = new VoxelShapeTool();

 setMesher(dataTool: VoxelMesherDataTool) {
  this.data = dataTool;
  
  this.builder.quad.setMesherTool(dataTool);
 }
}

export const ShapeTool = new ShapeToolType();
