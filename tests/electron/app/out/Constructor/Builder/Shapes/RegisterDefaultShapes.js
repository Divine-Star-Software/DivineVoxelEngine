//shapes
import { CrossedPanels } from "./default/Panel/CrossedPanels.voxel.shape.js";
import { BoxVoxelShape } from "./default/Box/Box.voxel.shape.js";
import { LiquidVoxelShape } from "./default/Liquid/Liquid.voxel.shape.js";
import { HalfBoxVoxelShape } from "./default/Box/HalfBox.voxel.shape.js";
import { PanelVoxelShape } from "./default/Panel/Panel.voxel.shape.js";
import { StairVoxelShape } from "./default/Stair/Stair.voxel.shape.js";
export function RegisterDefaultShapes(builder) {
    builder.shapeManager.registerShape(BoxVoxelShape);
    builder.shapeManager.registerShape(HalfBoxVoxelShape);
    builder.shapeManager.registerShape(StairVoxelShape);
    builder.shapeManager.registerShape(PanelVoxelShape);
    builder.shapeManager.registerShape(LiquidVoxelShape);
    builder.shapeManager.registerShape(CrossedPanels);
}
