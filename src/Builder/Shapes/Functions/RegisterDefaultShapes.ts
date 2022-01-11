import type { ShapeHelperInterface } from "Meta/Builder/Shapes/ShapeHelper.interface";
import { BoxVoxelShape } from "../default/Box.voxel.shape.js";
import type { ShapeManager } from "../ShapeManager";

export function RegisterDefaultShapes(shpaeManager : ShapeManager,shapeHelper : ShapeHelperInterface) {
    const boxVoxel = new BoxVoxelShape(shapeHelper);
    shpaeManager.registerShape(0,boxVoxel); 
}