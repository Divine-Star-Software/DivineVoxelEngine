//shapes
import { CrossedPanels } from "./Panel/CrossedPanels.voxel.shape.js";
import { BoxVoxelShape } from "./Box/Box.voxel.shape.js";
import { LiquidVoxelShape } from "./Liquid/Liquid.voxel.shape.js";
import { HalfBoxVoxelShape } from "./Box/HalfBox.voxel.shape.js";
import { PanelVoxelShape } from "./Panel/Panel.voxel.shape.js";
import { StairVoxelShape } from "./Stair/Stair.voxel.shape.js";
export function RegisterDefaultShapes(builder) {
    builder.shapeManager.registerShape(BoxVoxelShape);
    builder.shapeManager.registerShape(HalfBoxVoxelShape);
    builder.shapeManager.registerShape(StairVoxelShape);
    builder.shapeManager.registerShape(PanelVoxelShape);
    builder.shapeManager.registerShape(LiquidVoxelShape);
    builder.shapeManager.registerShape(CrossedPanels);
}
