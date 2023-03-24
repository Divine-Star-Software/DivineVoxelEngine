import { VoxelShapeTool } from "../Tools/VoxelShapeTool.js";
export class ShapeToolType {
    data = {};
    builder = new VoxelShapeTool();
    setMesher(dataTool) {
        this.data = dataTool;
        this.builder.quad.setMesherTool(dataTool);
    }
}
export const ShapeTool = new ShapeToolType();
